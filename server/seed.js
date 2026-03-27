import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Event from "./models/Event.js";
import Team from "./models/Team.js";
import Score from "./models/Score.js";
import VerificationToken from "./models/VerificationToken.js";
import RoundResult from "./models/RoundResult.js";

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB via db.js...");
    await connectDB();
    console.log("Connected to MongoDB!");

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Team.deleteMany({});
    await Score.deleteMany({});
    await VerificationToken.deleteMany({});
    await RoundResult.deleteMany({});
    console.log("Cleared existing data.");

    // Create Users
    const password = await bcrypt.hash("Password123!", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password,
      role: "admin",
      isEmailVerified: true
    });

    const judge1 = await User.create({
      name: "Expert Judge",
      email: "judge@test.com",
      password,
      role: "judge",
      techStack: ["React", "Node.js", "AI"],
      isEmailVerified: true
    });

    const participant1 = await User.create({
      name: "Student Hacker",
      email: "user@test.com",
      password,
      role: "participant",
      isEmailVerified: true
    });
    
    const participant2 = await User.create({
      name: "Code Ninja",
      email: "ninja@test.com",
      password,
      role: "participant",
      isEmailVerified: true
    });

    console.log("Created users");

    // Create Events
    const event1 = await Event.create({
      title: "Global AI Hackathon 2026",
      description: "Build the next generation of AI-powered applications. Join thousands of developers around the world for a 48-hour coding sprint.",
      rules: "1. All code must be original.\n2. Teams must use at least one AI API.",
      type: "technical",
      banner: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
      minTeamSize: 2,
      maxTeamSize: 4,
      maxTeams: 50,
      registrationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isPaid: false,
      judges: [judge1._id],
      rounds: [
        {
          name: "Ideation Phase",
          roundNumber: 1,
          isSubmissionRequired: true,
          evaluationCriteria: [
            { name: "Innovation", maxScore: 20 },
            { name: "Feasibility", maxScore: 20 }
          ],
          qualification: { type: "top_n", value: 20 }
        },
        {
          name: "Final Pitch",
          roundNumber: 2,
          isSubmissionRequired: false,
          evaluationCriteria: [
            { name: "Technical Execution", maxScore: 40 },
            { name: "Presentation", maxScore: 10 }
          ]
        }
      ],
      createdBy: admin._id
    });

    console.log("Created events");
    console.log("Seed complete! Exiting...");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
