import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contactNumber, educationLevel } = req.body;

    if (!name || !email || !password || !contactNumber || !educationLevel) {
      return res.status(400).json({
        message:
          "All fields are required (name, email, password, contactNumber, educationLevel)",
      });
    }

    if (!/^[0-9]{10}$/.test(contactNumber)) {
      return res.status(400).json({
        message: "Contact number must be exactly 10 digits",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      educationLevel,
    });

    // 🎯 ADD THIS BLOCK
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      educationLevel: user.educationLevel,
      token, // ✅ THIS FIXES EVERYTHING
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN code
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        nickname: user.nickname || "",
        avatar: user.avatar || "",
        contactNumber: user.contactNumber || "",
        educationLevel: user.educationLevel || "",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GOOGLE AUTH code
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: "Google token is required" });
    }

    // Use access token to fetch user info directly from Google
    const googleResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!googleResponse.ok) {
      return res.status(400).json({ message: "Invalid Google token" });
    }
    
    const payload = await googleResponse.json();
    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      // Use the Google user id (sub) as a random password, though they should login via Google
      const hashedPassword = await bcrypt.hash(sub, 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        contactNumber: "Pending", // Placeholder until they complete their profile
        educationLevel: "Pending",
        avatar: picture || "",
      });
      isNewUser = true;
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      nickname: user.nickname || "",
      avatar: user.avatar || "",
      contactNumber: user.contactNumber || "",
      educationLevel: user.educationLevel || "",
      isNewUser,
      token: jwtToken,
    });
  } catch (error) {
    console.error("GOOGLE AUTH ERROR:", error);
    res.status(500).json({ message: "Failed to authenticate with Google" });
  }
};
