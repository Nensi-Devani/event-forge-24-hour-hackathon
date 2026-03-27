import Score from "../models/Score.js";
import RoundResult from "../models/RoundResult.js";
import Event from "../models/Event.js";
import Team from "../models/Team.js";

// POST /api/scores — Judge submits score for a team in a round
export const submitScore = async (req, res) => {
  try {
    const { team, event, roundId, criteriaScores } = req.body;

    // Verify judge is assigned to this event
    const eventDoc = await Event.findById(event);
    if (!eventDoc) return res.status(404).json({ message: "Event not found" });

    const isAssigned = eventDoc.judges.some(
      (j) => j.toString() === req.user._id.toString()
    );
    if (!isAssigned) {
      return res.status(403).json({ message: "You are not assigned as a judge for this event" });
    }

    // Calculate total score
    const totalScore = criteriaScores.reduce((sum, c) => sum + (c.score || 0), 0);

    // Check if score already exists (update if so)
    const existing = await Score.findOne({
      team,
      event,
      roundId,
    });

    let score;
    if (existing) {
      existing.criteriaScores = criteriaScores;
      existing.totalScore = totalScore;
      score = await existing.save();
    } else {
      score = await Score.create({
        team,
        event,
        roundId,
        criteriaScores,
        totalScore,
      });
    }

    // Update or create RoundResult
    const existingResult = await RoundResult.findOne({ team, event, roundId });
    if (existingResult) {
      existingResult.totalScore = totalScore;
      await existingResult.save();
    } else {
      await RoundResult.create({
        team,
        event,
        roundId,
        totalScore,
        rank: 0,
        isQualified: true,
      });
    }

    // Recalculate ranks for this round
    const allResults = await RoundResult.find({ event, roundId }).sort({ totalScore: -1 });
    for (let i = 0; i < allResults.length; i++) {
      allResults[i].rank = i + 1;
      await allResults[i].save();
    }

    res.status(201).json(score);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/scores/event/:eventId/round/:roundId — All scores for a round
export const getRoundScores = async (req, res) => {
  try {
    const { eventId, roundId } = req.params;
    const scores = await Score.find({ event: eventId, roundId })
      .populate("team", "teamName")
      .sort({ totalScore: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/scores/judge/my-events — Events where judge is approved
export const getJudgeEvents = async (req, res) => {
  try {
    const events = await Event.find({ judges: req.user._id })
      .populate("judges", "name email")
      .sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/scores/event/:eventId/teams — Teams for an event (for judge to score)
export const getTeamsForScoring = async (req, res) => {
  try {
    const { eventId } = req.params;
    const roundId = req.query.roundId;

    const teams = await Team.find({ event: eventId })
      .populate("leader", "name email");

    // Get existing scores for this round if roundId is provided
    let scores = [];
    if (roundId) {
      scores = await Score.find({ event: eventId, roundId });
    }

    const teamsWithScores = teams.map((team) => {
      const score = scores.find(
        (s) => s.team.toString() === team._id.toString()
      );
      return {
        ...team.toObject(),
        scored: !!score,
        score: score || null,
      };
    });

    res.json(teamsWithScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/scores/event/:eventId/results — Round results for an event
export const getRoundResults = async (req, res) => {
  try {
    const { eventId } = req.params;
    const roundId = req.query.roundId;

    const filter = { event: eventId };
    if (roundId) filter.roundId = roundId;

    const results = await RoundResult.find(filter)
      .populate("team", "teamName")
      .sort({ rank: 1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
