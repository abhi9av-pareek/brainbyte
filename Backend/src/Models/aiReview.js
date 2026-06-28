import mongoose from "mongoose";

const aiReviewSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  codeAnalyzed: { type: String, required: true },
  language: { type: String, required: true },
  analysis: {
    timeComplexity: { type: String, required: true },
    spaceComplexity: { type: String, required: true },
    betterApproach: { type: String, required: true },
    optimizationSuggestions: { type: [String], default: [] },
    edgeCasesMissed: { type: [String], default: [] },
    codeQualityRating: { type: String, required: true }, // e.g. "A", "B"
    dryRunExplanation: { type: String, required: true },
    interviewTips: { type: [String], default: [] }
  }
}, { timestamps: true });

const AIReview = mongoose.models.AIReview || mongoose.model("AIReview", aiReviewSchema);
export default AIReview;
