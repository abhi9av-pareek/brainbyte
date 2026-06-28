import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  notes: { type: String, default: "" }
}, { timestamps: true });

// Prevent duplicate bookmarks for the same user and problem
bookmarkSchema.index({ userId: 1, problemId: 1 }, { unique: true });

const Bookmark = mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
