import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Team from "../models/Team.js";
import Event from "../models/Event.js";

// GET /api/users — List users (paginated, filterable by role)
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const role = req.query.role || "";

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role) filter.role = role;

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/:id — Get single user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/users — Admin creates user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, techStack } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "participant",
      techStack: role === "judge" ? techStack || [] : [],
      isEmailVerified: true, // Admin-created users are auto-verified
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      techStack: user.techStack,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/:id — Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, techStack } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (role) update.role = role;
    if (techStack) update.techStack = techStack;

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/users/:id — Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Cleanup related user references
    await Team.deleteMany({ leader: req.params.id });
    await Team.updateMany({ members: req.params.id }, { $pull: { members: req.params.id } });
    if (user.role === 'judge') {
      await Event.updateMany({ judges: req.params.id }, { $pull: { judges: req.params.id } });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/:id/role — Change user role
export const changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["participant", "judge", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/pending-judges — List judges pending approval
export const getPendingJudges = async (req, res) => {
  try {
    const judges = await User.find({ role: "judge", isEmailVerified: true })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(judges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users/stats — User stats for admin dashboard
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalParticipants = await User.countDocuments({ role: "participant" });
    const totalJudges = await User.countDocuments({ role: "judge" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const unverified = await User.countDocuments({ isEmailVerified: false });
    res.json({ totalUsers, totalParticipants, totalJudges, totalAdmins, unverified });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/profile — User updates their own profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.name) user.name = req.body.name;
    if (req.body.avatar) user.avatar = req.body.avatar;
    if (req.body.techStack && (user.role === 'judge' || user.role === 'admin' || user.role === 'participant')) {
      user.techStack = req.body.techStack;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      techStack: updatedUser.techStack,
      avatar: updatedUser.avatar
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/password — User updates their own password
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
