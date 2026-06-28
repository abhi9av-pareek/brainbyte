import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: { type: String, default: "" },
  expectedOutput: { type: String, default: "" },
  explanation: { type: String, default: "" },
  isPublic: { type: Boolean, default: false } // public test case (visible) vs hidden (used on submit)
}, { _id: false });

const starterCodeSchema = new mongoose.Schema({
  cpp: { type: String, default: "" },
  java: { type: String, default: "" },
  python: { type: String, default: "" },
  javascript: { type: String, default: "" },
  go: { type: String, default: "" }
}, { _id: false });

const problemSchema = new mongoose.Schema({
  problemId: { type: String, required: true, unique: true }, // unique string ID, e.g. "dsa-1"
  problemNumber: { type: Number, required: true, unique: true }, // 1-indexed problem order
  title: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  topic: { type: String, required: true, index: true }, // e.g., "Arrays", "Strings", "Trees", etc.
  companies: { type: [String], default: [], index: true }, // e.g. ["Google", "Amazon"]
  xpReward: { type: Number, default: 20 },
  estimatedTime: { type: Number, default: 45 }, // in minutes
  statement: { type: String, required: true },
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  constraints: { type: String, required: true },
  examples: [{
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String, default: "" }
  }],
  starterCode: { type: starterCodeSchema, required: true },
  testCases: { type: [testCaseSchema], required: true }
}, { timestamps: true });

const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);
export default Problem;
