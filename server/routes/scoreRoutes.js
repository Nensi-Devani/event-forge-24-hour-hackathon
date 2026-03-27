import express from "express";
import {
  submitScore, getRoundScores, getJudgeEvents,
  getTeamsForScoring, getRoundResults,
} from "../controllers/scoreController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Judge routes
router.get("/judge/my-events", protect, authorize("judge"), getJudgeEvents);
router.post("/", protect, authorize("judge"), submitScore);

// Protected routes (judge & admin)
router.get("/event/:eventId/round/:roundId", protect, getRoundScores);
router.get("/event/:eventId/teams", protect, getTeamsForScoring);
router.get("/event/:eventId/results", protect, getRoundResults);

export default router;
