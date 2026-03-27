import express from "express";
import {
  getUsers, getUser, createUser, updateUser, deleteUser,
  changeRole, getPendingJudges, getUserStats,
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are admin-only
router.use(protect, authorize("admin"));

router.get("/stats", getUserStats);
router.get("/pending-judges", getPendingJudges);
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/role", changeRole);

export default router;
