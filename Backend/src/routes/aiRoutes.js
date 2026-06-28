import express from "express";
import { getSubmissionAIReview } from "../controllers/aiController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submissions/:submissionId/ai-review", verifyToken, getSubmissionAIReview);

export default router;
