import express from "express";
import {
  createTeam, verifyInvite, getTeams, getTeam, deleteTeam, getMyTeams,
} from "../controllers/teamController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/verify-invite", protect, verifyInvite);
router.get("/my-teams", protect, getMyTeams);
router.post("/", protect, createTeam);
router.get("/", protect, getTeams);
router.get("/:id", protect, getTeam);
router.delete("/:id", protect, authorize("admin"), deleteTeam);

export default router;
