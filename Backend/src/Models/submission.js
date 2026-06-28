import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true, index: true },
  code: { type: String, required: true },
  language: { type: String, enum: ["cpp", "java", "python", "javascript", "go"], required: true },
  status: { 
    type: String, 
    enum: ["Accepted", "Wrong Answer", "Runtime Error", "Compilation Error", "Time Limit Exceeded", "Memory Limit Exceeded"], 
    required: true 
  },
  passedCount: { type: Number, required: true },
  totalCount: { type: Number, required: true },
  runtime: { type: Number }, // execution runtime in milliseconds
  memory: { type: Number }, // execution memory in Kilobytes
  errorDetails: {
    compileOutput: { type: String },
    failedTestCase: {
      input: { type: String },
      expectedOutput: { type: String },
      userOutput: { type: String }
    }
  }
}, { timestamps: true });

const Submission = mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
export default Submission;
