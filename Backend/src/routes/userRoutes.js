import express from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.patch("/profile", verifyToken, updateProfile);
router.post("/change-password", verifyToken, changePassword);

export default router;
