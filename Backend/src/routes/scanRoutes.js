import express from "express";
import {
  extractFromImage,
  completeScanQuiz,
  getScanHistory,
  getScanRecord,
  deleteScanRecord,
  getScanAnalytics,
  extractPdfText,
} from "../controllers/scanController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/extract",        verifyToken, extractFromImage);
router.post("/extract-pdf-text", verifyToken, extractPdfText);
router.patch("/:id/complete",  verifyToken, completeScanQuiz);
router.get("/history",         verifyToken, getScanHistory);
router.get("/analytics",       verifyToken, getScanAnalytics);
router.get("/:id",             verifyToken, getScanRecord);
router.delete("/:id",          verifyToken, deleteScanRecord);

export default router;
