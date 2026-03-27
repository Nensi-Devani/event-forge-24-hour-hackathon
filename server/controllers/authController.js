import User from "../models/User.js";
import VerificationToken from "../models/VerificationToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, role, techStack } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "judge" ? "judge" : "participant",
      techStack: role === "judge" && techStack ? techStack : [],
      isEmailVerified: false,
    });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await VerificationToken.create({
      email,
      token: otp,
      type: "USER_VERIFY",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    });

    try {
      await sendEmail(
        email,
        "Event Forge - Email Verification",
        `<div style="font-family:sans-serif;padding:20px;">
          <h2>Email Verification</h2>
          <p>Your verification OTP is:</p>
          <h1 style="color:#0052CC;letter-spacing:8px;">${otp}</h1>
          <p>This OTP expires in 10 minutes.</p>
        </div>`
      );
    } catch (mailErr) {
      console.log("Mail sending failed (OTP still saved):", mailErr.message);
    }

    res.status(201).json({
      message: "Registration successful. Please verify your email with the OTP sent.",
      email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const tokenDoc = await VerificationToken.findOne({
      email,
      token: otp,
      type: "USER_VERIFY",
    });

    if (!tokenDoc) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (tokenDoc.expiresAt < new Date()) {
      await VerificationToken.deleteOne({ _id: tokenDoc._id });
      return res.status(400).json({ message: "OTP has expired. Please register again." });
    }

    await User.updateOne({ email }, { isEmailVerified: true });
    await VerificationToken.deleteOne({ _id: tokenDoc._id });

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        techStack: user.techStack,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};