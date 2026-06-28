import Problem from "../Models/problem.js";
import User from "../Models/user.js";

/**
 * Get all DSA Problems with topic-wise progress stats and filters
 */
export const getProblems = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topic, difficulty, company, status, search } = req.query;

    // Fetch user progress details
    const user = await User.findById(userId).select("dsaProgress");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const solvedProblemIds = user.dsaProgress?.solvedProblems || [];

    // Build DB Query
    const query = {};
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;
    if (company) query.companies = { $in: [company] };
    if (search) query.title = { $regex: search, $options: "i" };

    if (status) {
      if (status === "Solved") {
        query._id = { $in: solvedProblemIds };
      } else if (status === "Unsolved") {
        query._id = { $nin: solvedProblemIds };
      }
    }

    // Retrieve matching problems
    const allProblems = await Problem.find(query)
      .select("problemNumber problemId title difficulty topic companies xpReward estimatedTime")
      .sort({ problemNumber: 1 });

    // Retrieve ALL sheet problems to compute global stats accurately
    const totalProblemsInSheet = await Problem.find({}).select("_id topic");

    const totalProblems = totalProblemsInSheet.length;
    const solvedCount = solvedProblemIds.length;
    const overallProgressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

    // Calculate topic-wise breakdown stats
    const topicStats = {};
    totalProblemsInSheet.forEach((prob) => {
      if (!topicStats[prob.topic]) {
        topicStats[prob.topic] = { solved: 0, total: 0, percent: 0 };
      }
      topicStats[prob.topic].total += 1;
      if (solvedProblemIds.some((id) => id.toString() === prob._id.toString())) {
        topicStats[prob.topic].solved += 1;
      }
    });

    // Update percentages for each topic
    for (const top in topicStats) {
      const stats = topicStats[top];
      stats.percent = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;
    }

    // Map problems output to flag solved status for UI
    const problemsList = allProblems.map((prob) => {
      const isSolved = solvedProblemIds.some((id) => id.toString() === prob._id.toString());
      return {
        ...prob.toObject(),
        status: isSolved ? "Solved" : "Unsolved"
      };
    });

    res.status(200).json({
      problems: problemsList,
      stats: {
        totalProblems,
        solvedCount,
        overallProgressPercent,
        topicProgress: topicStats
      }
    });
  } catch (err) {
    console.error("Error fetching DSA problems:", err.message);
    res.status(500).json({ message: "Server error fetching sheet problems" });
  }
};

/**
 * Get problem detail (excluding hidden test cases for security)
 */
export const getProblemById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Check if user has bookmarked this problem
    const user = await User.findById(userId).select("bookmarks");
    // Check bookmarks in user's bookmarks array by questionId or database reference
    // Support toggle verification
    const isBookmarked = user?.bookmarks?.some(
      (b) => b.questionId === problem._id.toString() || b.questionId === problem.problemId
    ) || false;

    // Filter public test cases only to expose to client descriptions
    const publicTestCases = problem.testCases.filter((tc) => tc.isPublic === true);

    const problemDetail = {
      _id: problem._id,
      problemId: problem.problemId,
      problemNumber: problem.problemNumber,
      title: problem.title,
      difficulty: problem.difficulty,
      topic: problem.topic,
      companies: problem.companies,
      xpReward: problem.xpReward,
      estimatedTime: problem.estimatedTime,
      statement: problem.statement,
      inputFormat: problem.inputFormat,
      outputFormat: problem.outputFormat,
      constraints: problem.constraints,
      examples: problem.examples,
      starterCode: problem.starterCode,
      publicTestCases,
      isBookmarked
    };

    res.status(200).json(problemDetail);
  } catch (err) {
    console.error("Error getting problem details:", err.message);
    res.status(500).json({ message: "Server error fetching problem details" });
  }
};
