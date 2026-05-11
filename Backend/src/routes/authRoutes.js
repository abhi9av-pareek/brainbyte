import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", (req, res) => {
  res.json({
    xp: 120,
    accuracy: 85,
    rank: 7,
    subjects: ["DSA", "React", "Node.js"],
  });
});

export default router;
