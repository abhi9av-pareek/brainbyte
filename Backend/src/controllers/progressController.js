import User from "../Models/user.js";
import Problem from "../Models/problem.js";
import Submission from "../Models/submission.js";
import Bookmark from "../Models/bookmark.js";

/**
 * Fetch progress stats for dashboard widgets
 */
export const getProgressDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("xp streak dsaProgress")
      .populate("dsaProgress.solvedProblems", "title difficulty topic xpReward");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalProblemsCount = await Problem.countDocuments();
    const solvedCount = user.dsaProgress?.solvedProblems?.length || 0;

    // Fetch recent submissions
    const recentSubmissions = await Submission.find({ userId })
      .populate("problemId", "title difficulty topic")
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch user's bookmarked problems
    const userBookmarks = await Bookmark.find({ userId })
      .populate("problemId", "title difficulty topic problemNumber");

    const dsaXP = user.dsaProgress?.solvedProblems?.reduce((sum, p) => sum + (p.xpReward || 0), 0) || 0;

    // Auto reset check for daily goal and streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastSolved = user.dsaProgress?.lastSolvedDate
      ? new Date(user.dsaProgress.lastSolvedDate)
      : null;

    let currentStreak = user.streak || 0;
    let dailyGoalCompleted = user.dsaProgress?.dailyGoalProgress || 0;
    let needsSave = false;

    if (lastSolved) {
      lastSolved.setHours(0, 0, 0, 0);
      const diffTime = today.getTime() - lastSolved.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 1) {
        // Reset daily progress on a new calendar day
        if (user.dsaProgress.dailyGoalProgress !== 0) {
          user.dsaProgress.dailyGoalProgress = 0;
          dailyGoalCompleted = 0;
          needsSave = true;
        }
        // Expire streak if skipped more than 1 day
        if (diffDays > 1 && user.streak !== 0) {
          user.streak = 0;
          currentStreak = 0;
          needsSave = true;
        }
      }
    } else {
      if (user.dsaProgress && user.dsaProgress.dailyGoalProgress !== 0) {
        user.dsaProgress.dailyGoalProgress = 0;
        dailyGoalCompleted = 0;
        needsSave = true;
      }
    }

    if (needsSave) {
      await user.save();
    }

    res.status(200).json({
      solvedCount,
      totalProblems: totalProblemsCount,
      currentStreak,
      totalXP: dsaXP,
      dailyGoal: {
        target: user.dsaProgress?.dailyGoalCount || 2,
        completed: dailyGoalCompleted,
        percentage: Math.min(
          100,
          Math.round(
            (dailyGoalCompleted / (user.dsaProgress?.dailyGoalCount || 2)) * 100
          )
        )
      },
      topicProgress: user.dsaProgress?.topicStatus || [],
      recentActivity: recentSubmissions.map((s) => ({
        _id: s._id,
        problemId: s.problemId?._id,
        problemTitle: s.problemId?.title || "Deleted Problem",
        difficulty: s.problemId?.difficulty,
        topic: s.problemId?.topic,
        status: s.status,
        timestamp: s.createdAt
      })),
      bookmarks: userBookmarks.map((b) => ({
        _id: b._id,
        problemId: b.problemId?._id,
        problemNumber: b.problemId?.problemNumber,
        title: b.problemId?.title || "Deleted Problem",
        difficulty: b.problemId?.difficulty,
        topic: b.problemId?.topic,
        notes: b.notes,
        bookmarkedAt: b.createdAt
      }))
    });
  } catch (err) {
    console.error("Error fetching progress dashboard:", err.message);
    res.status(500).json({ message: "Server error fetching progress dashboard stats" });
  }
};

/**
 * Toggle problem bookmark with notes
 */
export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // problem id
    const { notes } = req.body;

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const existingBookmark = await Bookmark.findOne({ userId, problemId: problem._id });
    
    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      
      // Update User bookmarks array if exists in User model (maintains quiz backward compatibility)
      await User.findByIdAndUpdate(userId, {
        $pull: { bookmarks: { questionId: problem._id.toString() } }
      });

      return res.status(200).json({ bookmarked: false, message: "Bookmark removed" });
    } else {
      // Add bookmark
      const newBookmark = new Bookmark({
        userId,
        problemId: problem._id,
        notes: notes || ""
      });
      await newBookmark.save();

      // Maintain legacy user model bookmarks for compliance
      await User.findByIdAndUpdate(userId, {
        $push: {
          bookmarks: {
            questionId: problem._id.toString(),
            subject: "DSA",
            topic: problem.topic,
            questionText: problem.title,
            notes: notes || ""
          }
        }
      });

      return res.status(200).json({ bookmarked: true, notes: notes || "", message: "Bookmark added" });
    }
  } catch (err) {
    console.error("Error toggling bookmark:", err.message);
    res.status(500).json({ message: "Server error toggling problem bookmark" });
  }
};

/**
 * Update daily goals target count
 */
export const updateDailyGoalCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { target } = req.body;

    if (!target || typeof target !== "number" || target < 1) {
      return res.status(400).json({ message: "Invalid target daily goals value" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.dsaProgress) {
      user.dsaProgress = { solvedProblems: [], topicStatus: [], dailyGoalCount: 2, dailyGoalProgress: 0 };
    }

    user.dsaProgress.dailyGoalCount = target;
    await user.save();

    const completed = user.dsaProgress.dailyGoalProgress || 0;
    const percentage = Math.min(100, Math.round((completed / target) * 100));

    res.status(200).json({
      target,
      completed,
      percentage
    });
  } catch (err) {
    console.error("Error updating daily goal count:", err.message);
    res.status(500).json({ message: "Server error updating daily goal count" });
  }
};
