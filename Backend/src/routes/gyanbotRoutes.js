import express from "express";
import { chatWithGyanBot } from "../controllers/gyanbotController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/gyanbot/chat — requires authentication
router.post("/chat", verifyToken, chatWithGyanBot);

export default router;
