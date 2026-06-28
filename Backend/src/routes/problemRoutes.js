import express from "express";
import { getProblems, getProblemById } from "../controllers/problemController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getProblems);
router.get("/:id", verifyToken, getProblemById);

export default router;
