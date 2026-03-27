import Team from "../models/Team.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import VerificationToken from "../models/VerificationToken.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

// POST /api/teams — Create team for an event
export const createTeam = async (req, res) => {
  try {
    const { teamName, eventId, members } = req.body;
    // members = [{ name, email }, ...]

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check registration deadline
    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({ message: "Registration deadline has passed" });
    }

    // Validate team size (leader + members)
    const totalSize = 1 + (members ? members.length : 0);
    if (event.minTeamSize && totalSize < event.minTeamSize) {
      return res.status(400).json({ message: `Minimum team size is ${event.minTeamSize}` });
    }
    if (event.maxTeamSize && totalSize > event.maxTeamSize) {
      return res.status(400).json({ message: `Maximum team size is ${event.maxTeamSize}` });
    }

    // Check max teams limit
    if (event.maxTeams) {
      const currentTeams = await Team.countDocuments({ event: eventId });
      if (currentTeams >= event.maxTeams) {
        return res.status(400).json({ message: "Maximum teams limit reached for this event" });
      }
    }

    // Check if leader is already registered in this event
    const leaderExisting = await Team.findOne({
      event: eventId,
      $or: [
        { leader: req.user._id },
        { "members.user": req.user._id },
      ],
    });
    if (leaderExisting) {
      return res.status(400).json({ message: "You are already registered in this event" });
    }

    // Check if any member is already registered in this event
    for (const member of members || []) {
      const memberUser = await User.findOne({ email: member.email });
      if (memberUser) {
        const memberExisting = await Team.findOne({
          event: eventId,
          $or: [
            { leader: memberUser._id },
            { "members.user": memberUser._id },
          ],
        });
        if (memberExisting) {
          return res.status(400).json({ message: `${member.email} is already registered in this event` });
        }
      }
    }

    // Prepare members array
    const teamMembers = [];
    for (const member of members || []) {
      const memberUser = await User.findOne({ email: member.email });
      teamMembers.push({
        name: member.name,
        email: member.email,
        user: memberUser ? memberUser._id : null,
        isVerified: false,
      });
    }

    const team = await Team.create({
      teamName,
      event: eventId,
      leader: req.user._id,
      members: teamMembers,
    });

    // Send verification emails to members
    for (const member of teamMembers) {
      const token = crypto.randomBytes(32).toString("hex");
      await VerificationToken.create({
        email: member.email,
        token,
        type: "TEAM_INVITE",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      const isRegistered = member.user !== null;
      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      const link = isRegistered
        ? `${clientUrl}/teams/verify-invite?token=${token}`
        : `${clientUrl}/register?redirect=verify-invite&token=${token}`;

      try {
        await sendEmail(
          member.email,
          `Event Forge - Team Invite: ${teamName}`,
          `<div style="font-family:sans-serif;padding:20px;">
            <h2>You're invited to join team "${teamName}"!</h2>
            <p>You've been invited to participate in <b>${event.title}</b>.</p>
            ${!isRegistered ? '<p><b>Note:</b> You need to register on the portal first.</p>' : ''}
            <a href="${link}" style="display:inline-block;background:#0052CC;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;margin-top:12px;">
              ${isRegistered ? 'Accept Invitation' : 'Register & Accept'}
            </a>
          </div>`
        );
      } catch (mailErr) {
        console.log(`Failed to send invite to ${member.email}:`, mailErr.message);
      }
    }

    const populated = await Team.findById(team._id)
      .populate("leader", "name email")
      .populate("event", "title");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/teams/verify-invite — Verify team member invite
export const verifyInvite = async (req, res) => {
  try {
    const { token } = req.body;

    const tokenDoc = await VerificationToken.findOne({ token, type: "TEAM_INVITE" });
    if (!tokenDoc) return res.status(400).json({ message: "Invalid invite token" });
    if (tokenDoc.expiresAt < new Date()) {
      await VerificationToken.deleteOne({ _id: tokenDoc._id });
      return res.status(400).json({ message: "Invite token has expired" });
    }

    const user = await User.findOne({ email: tokenDoc.email });
    if (!user) return res.status(400).json({ message: "Please register on the portal first" });

    // Find the team that has this member email and mark as verified
    const team = await Team.findOneAndUpdate(
      { "members.email": tokenDoc.email, "members.isVerified": false },
      {
        $set: {
          "members.$.isVerified": true,
          "members.$.user": user._id,
        },
      },
      { new: true }
    );

    if (!team) return res.status(400).json({ message: "No pending invite found for this email" });

    await VerificationToken.deleteOne({ _id: tokenDoc._id });

    res.json({ message: "Invite accepted successfully", team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/teams — List teams (paginated, filterable by event)
export const getTeams = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const eventId = req.query.event || "";

    const filter = {};
    if (search) filter.teamName = { $regex: search, $options: "i" };
    if (eventId) filter.event = eventId;

    const total = await Team.countDocuments(filter);
    const teams = await Team.find(filter)
      .populate("leader", "name email")
      .populate("event", "title")
      .populate("members.user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ teams, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/teams/:id — Get single team
export const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("leader", "name email")
      .populate("event", "title")
      .populate("members.user", "name email");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/teams/:id — Delete team (admin)
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/teams/my-teams — Teams for logged-in user
export const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      $or: [
        { leader: req.user._id },
        { "members.user": req.user._id },
      ],
    })
      .populate("event", "title type banner registrationDeadline")
      .populate("leader", "name email")
      .populate("members.user", "name email");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
