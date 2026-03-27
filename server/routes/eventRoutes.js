import express from "express";
import {
  createEvent, getEvents, getEvent, updateEvent, deleteEvent,
  assignJudges, getLeaderboard, getStats,
} from "../controllers/eventController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, authorize("admin"), getStats);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.get("/:id/leaderboard", getLeaderboard);

// Admin only
router.post("/", protect, authorize("admin"), createEvent);
router.put("/:id", protect, authorize("admin"), updateEvent);
router.delete("/:id", protect, authorize("admin"), deleteEvent);
router.put("/:id/judges", protect, authorize("admin"), assignJudges);

export default router;
