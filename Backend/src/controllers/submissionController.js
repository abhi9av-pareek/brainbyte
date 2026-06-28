import Problem from "../Models/problem.js";
import Submission from "../Models/submission.js";
import User from "../Models/user.js";
import compilerFactory from "../utils/compiler/CompilerFactory.js";

/**
 * Run user code with custom input only (no hidden tests)
 */
export const runCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, language, customInput } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: "Code and language are required fields." });
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    const compiler = compilerFactory.getCompiler();
    const publicTestCases = problem.testCases ? problem.testCases.filter(tc => tc.isPublic) : [];
    const testCasesResults = [];

    // Run public test cases
    for (let i = 0; i < publicTestCases.length; i++) {
      const tc = publicTestCases[i];
      const runRes = await compiler.execute(code, language, tc.input, problem.problemId);
      
      // If compilation fails, stop and return the compilation error details immediately
      if (!runRes.success && runRes.errorType === "Compilation Error") {
        return res.status(200).json({
          success: false,
          errorType: "Compilation Error",
          errorMessage: runRes.errorMessage
        });
      }

      testCasesResults.push({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        stdout: runRes.stdout || "",
        stderr: runRes.stderr || "",
        success: runRes.success,
        errorType: runRes.errorType,
        errorMessage: runRes.errorMessage,
        time: runRes.time
      });
    }

    // Also run custom input if provided
    let customResult = null;
    if (customInput && customInput.trim() !== "") {
      const runRes = await compiler.execute(code, language, customInput, problem.problemId);
      customResult = {
        input: customInput,
        stdout: runRes.stdout || "",
        stderr: runRes.stderr || "",
        success: runRes.success,
        errorType: runRes.errorType,
        errorMessage: runRes.errorMessage,
        time: runRes.time
      };
    }

    res.status(200).json({
      success: testCasesResults.every(r => r.success) && (customResult ? customResult.success : true),
      testCasesResults,
      customResult
    });
  } catch (err) {
    console.error("Error executing run code sandbox:", err.message);
    res.status(500).json({ message: "Server error executing sandbox run" });
  }
};

/**
 * Submit user code, run hidden tests, update progress, streak, and XP
 */
export const submitCode = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // problem id
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: "Code and language are required fields." });
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    const compiler = compilerFactory.getCompiler();
    const result = await compiler.submit(code, language, problem.testCases, problem.problemId);

    // Save submission to database
    const newSubmission = new Submission({
      userId,
      problemId: problem._id,
      code,
      language,
      status: result.status,
      passedCount: result.passedCount,
      totalCount: result.totalCount,
      runtime: result.runtime,
      memory: result.memory,
      errorDetails: result.failedTestCase ? {
        failedTestCase: result.failedTestCase
      } : (result.status === "Compilation Error" ? {
        compileOutput: result.failedTestCase?.userOutput || "Compilation failed."
      } : undefined)
    });

    await newSubmission.save();

    // If Accepted, update user progress, streak, and XP
    let xpEarned = 0;
    let currentStreak = 0;

    if (result.status === "Accepted") {
      const user = await User.findById(userId);
      if (user) {
        if (!user.dsaProgress) {
          user.dsaProgress = { solvedProblems: [], topicStatus: [], dailyGoalCount: 2, dailyGoalProgress: 0 };
        }

        const alreadySolved = user.dsaProgress.solvedProblems.some(
          (pId) => pId.toString() === problem._id.toString()
        );

        if (!alreadySolved) {
          user.dsaProgress.solvedProblems.push(problem._id);
          xpEarned = problem.xpReward;
          user.xp = (user.xp || 0) + xpEarned;

          // Increment daily goals
          user.dsaProgress.dailyGoalProgress = (user.dsaProgress.dailyGoalProgress || 0) + 1;

          // Update topic counts
          const topicIndex = user.dsaProgress.topicStatus.findIndex(
            (t) => t.topicName === problem.topic
          );
          if (topicIndex > -1) {
            user.dsaProgress.topicStatus[topicIndex].solvedCount += 1;
          } else {
            user.dsaProgress.topicStatus.push({
              topicName: problem.topic,
              solvedCount: 1
            });
          }
        }

        // Streak calculation
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastSolved = user.dsaProgress.lastSolvedDate
          ? new Date(user.dsaProgress.lastSolvedDate)
          : null;

        if (lastSolved) {
          lastSolved.setHours(0, 0, 0, 0);
          const diffTime = today.getTime() - lastSolved.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            // Solved yesterday, increment streak
            user.streak = (user.streak || 0) + 1;
          } else if (diffDays > 1) {
            // Broke streak, reset to 1
            user.streak = 1;
          }
          // If diffDays === 0, solved today, streak remains same
        } else {
          // First time solving
          user.streak = 1;
        }

        user.dsaProgress.lastSolvedDate = today;
        user.lastActiveDate = new Date();
        currentStreak = user.streak;

        await user.save();
      }
    } else {
      const user = await User.findById(userId);
      currentStreak = user?.streak || 0;
    }

    res.status(200).json({
      status: result.status,
      passedCount: result.passedCount,
      totalCount: result.totalCount,
      runtime: result.runtime,
      memory: result.memory,
      xpEarned,
      streak: currentStreak,
      failedTestCase: result.failedTestCase
    });
  } catch (err) {
    console.error("Error submitting code run execution:", err.message);
    res.status(500).json({ message: "Server error submitting code" });
  }
};

/**
 * Get all past submissions for a specific problem by user
 */
export const getProblemSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // problem database _id

    const submissions = await Submission.find({ userId, problemId: id })
      .select("status passedCount totalCount runtime memory code language createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching problem submissions:", err.message);
    res.status(500).json({ message: "Server error fetching solutions" });
  }
};
