import User from "../Models/user.js";

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
        nickname: user.nickname || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
        xp: user.xp,
        streak: user.streak,
        totalQuestionsAttempted: user.totalQuestionsAttempted,
        totalCorrect: user.totalCorrect,
        createdAt: user.createdAt,
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
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
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
    if (updates.bio && updates.bio.length > 160) {
      return res
        .status(400)
        .json({ success: false, message: "Bio must be 160 characters or fewer" });
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
        nickname: user.nickname || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
        xp: user.xp,
        streak: user.streak,
        totalQuestionsAttempted: user.totalQuestionsAttempted,
        totalCorrect: user.totalCorrect,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
