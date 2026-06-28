import express from "express";
import { getProgressDashboard, toggleBookmark, updateDailyGoalCount } from "../controllers/progressController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getProgressDashboard);
router.post("/problems/:id/bookmark", verifyToken, toggleBookmark);
router.put("/daily-goal", verifyToken, updateDailyGoalCount);

export default router;
