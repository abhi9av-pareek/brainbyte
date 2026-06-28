import Submission from "../Models/submission.js";
import Problem from "../Models/problem.js";
import AIReview from "../Models/aiReview.js";
import { requestAIReview } from "../utils/ai/deepseekClient.js";

/**
 * Request or retrieve a cached DeepSeek AI code review analysis
 */
export const getSubmissionAIReview = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const userId = req.user.id;

    // Check if review already cached
    const cachedReview = await AIReview.findOne({ submissionId });
    if (cachedReview) {
      return res.status(200).json(cachedReview);
    }

    // Retrieve corresponding submission details
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found." });
    }

    // Secure check: verify user owns the submission
    if (submission.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access to submission analysis." });
    }

    // Fetch problem details to guide the AI context
    const problem = await Problem.findById(submission.problemId);
    if (!problem) {
      return res.status(404).json({ message: "Associated DSA problem not found." });
    }

    // Call DeepSeek NIM wrapper to fetch code analysis
    const analysis = await requestAIReview(
      problem,
      submission.code,
      submission.language,
      submission.status
    );

    // Save and cache review in database
    const newAIReview = new AIReview({
      submissionId: submission._id,
      userId,
      problemId: problem._id,
      codeAnalyzed: submission.code,
      language: submission.language,
      analysis
    });

    await newAIReview.save();

    res.status(201).json(newAIReview);
  } catch (err) {
    console.error("Error generating code AI review:", err.message);
    res.status(500).json({ message: "Server error generating AI code audit reviews." });
  }
};
