import Event from "../models/Event.js";
import Team from "../models/Team.js";
import Score from "../models/Score.js";
import { createNotification } from "./notificationController.js";

// POST /api/events — Create event (admin)
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/events — List events (paginated)
export const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const type = req.query.type || "";

    const filter = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (type) filter.type = type;

    const total = await Event.countDocuments(filter);
    const events = await Event.find(filter)
      .populate("judges", "name email techStack")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ events, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/events/:id — Get single event
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("judges", "name email techStack")
      .populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/events/:id — Update event (admin)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("judges", "name email techStack");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/events/:id — Delete event (admin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    // Also clean up related teams and scores
    await Team.deleteMany({ event: req.params.id });
    await Score.deleteMany({ event: req.params.id });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/events/:id/judges — Assign judges to event
export const assignJudges = async (req, res) => {
  try {
    const { judges } = req.body; // array of user IDs
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { judges },
      { new: true }
    ).populate("judges", "name email techStack");
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Send notifications to all assigned judges
    judges.forEach(async (judgeId) => {
      await createNotification(
        judgeId,
        "Assigned as Judge",
        `You have been assigned to evaluate teams in the event "${event.title}".`,
        "judge_approval",
        "/judge/dashboard"
      );
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/events/:id/leaderboard — Leaderboard for an event
export const getLeaderboard = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const teams = await Team.find({ event: eventId }).populate("leader", "name email");

    // Get all scores for this event
    const scores = await Score.find({ event: eventId });

    // Aggregate scores per team
    const teamScores = teams.map((team) => {
      const teamScoreList = scores.filter(
        (s) => s.team.toString() === team._id.toString()
      );
      const totalScore = teamScoreList.reduce((sum, s) => sum + (s.totalScore || 0), 0);
      return {
        team: { _id: team._id, teamName: team.teamName, leader: team.leader, members: team.members },
        totalScore,
        roundScores: teamScoreList,
      };
    });

    teamScores.sort((a, b) => b.totalScore - a.totalScore);

    // Add rank
    teamScores.forEach((t, i) => (t.rank = i + 1));

    res.json({ event: { _id: event._id, title: event.title, rounds: event.rounds }, leaderboard: teamScores });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/events/stats — Dashboard stats (admin)
export const getStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalTeams = await Team.countDocuments();
    const activeEvents = await Event.countDocuments({
      registrationDeadline: { $gte: new Date() },
    });
    res.json({ totalEvents, totalTeams, activeEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
