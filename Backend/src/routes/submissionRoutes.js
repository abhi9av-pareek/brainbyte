import express from "express";
import { runCode, submitCode, getProblemSubmissions } from "../controllers/submissionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/run", verifyToken, runCode);
router.post("/:id/submit", verifyToken, submitCode);
router.get("/:id/submissions", verifyToken, getProblemSubmissions);

export default router;
