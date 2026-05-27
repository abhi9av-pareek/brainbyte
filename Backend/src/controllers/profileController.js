import User from "../Models/user.js";
import bcrypt from "bcrypt";

/**
 * GET /api/user/profile
 * Returns the authenticated user's full profile.
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      profile: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        educationLevel: user.educationLevel,
        institution: user.institution || "",
        yearOfStudy: user.yearOfStudy || "",
        fieldOfStudy: user.fieldOfStudy || "",
        nickname: user.nickname || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
        xp: user.xp,
        streak: user.streak,
        totalQuestionsAttempted: user.totalQuestionsAttempted,
        totalCorrect: user.totalCorrect,
        createdAt: user.createdAt,
        preferences: user.preferences || {
          defaultDifficulty: "Medium",
          instantFeedback: true,
          shuffleQuestions: true,
          showStreak: true,
          emailNotifications: false,
        },
      },
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PATCH /api/user/profile
 * Updates allowed profile fields for the authenticated user.
 */
export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "nickname",
      "bio",
      "avatar",
      "contactNumber",
      "educationLevel",
      "institution",
      "yearOfStudy",
      "fieldOfStudy",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Handle nested preferences object
    if (req.body.preferences) {
      updates.preferences = req.body.preferences;
    }

    // Validate name is not empty if provided
    if (updates.name !== undefined && !updates.name.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Name cannot be empty" });
    }

    // Validate nickname length
    if (updates.nickname && updates.nickname.length > 20) {
      return res
        .status(400)
        .json({ success: false, message: "Nickname must be 20 characters or fewer" });
    }

    // Validate bio length
    if (updates.bio && updates.bio.length > 300) {
      return res
        .status(400)
        .json({ success: false, message: "Bio must be 300 characters or fewer" });
    }

    // Validate contact number format if provided
    if (updates.contactNumber && !/^[0-9]{10}$/.test(updates.contactNumber)) {
      return res
        .status(400)
        .json({ success: false, message: "Contact number must be exactly 10 digits" });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        educationLevel: user.educationLevel,
        institution: user.institution || "",
        yearOfStudy: user.yearOfStudy || "",
        fieldOfStudy: user.fieldOfStudy || "",
        nickname: user.nickname || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
        xp: user.xp,
        streak: user.streak,
        totalQuestionsAttempted: user.totalQuestionsAttempted,
        totalCorrect: user.totalCorrect,
        createdAt: user.createdAt,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/user/change-password
 * Validates current password and sets new password.
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    if (newPassword === currentPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);
    user.password = hashedNew;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
