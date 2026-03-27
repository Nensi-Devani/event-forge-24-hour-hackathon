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
import Notification from "./models/Notification.js";

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB!");

    // Clear existing
    await User.deleteMany({});
    await Event.deleteMany({});
    await Team.deleteMany({});
    await Score.deleteMany({});
    await VerificationToken.deleteMany({});
    await RoundResult.deleteMany({});
    await Notification.deleteMany({});
    console.log("Cleared existing data.");

    const password = await bcrypt.hash("Password123!", 10);

    // 1. Create Users
    console.log("Creating users...");
    const admin = await User.create({
      name: "Admin User", email: "admin@test.com", password, role: "admin",
      isEmailVerified: true, avatar: "https://i.pravatar.cc/150?u=admin"
    });

    const judge1 = await User.create({
      name: "Expert Judge 1", email: "judge1@test.com", password, role: "judge",
      techStack: ["React", "Node.js", "AI"], isEmailVerified: true, avatar: "https://i.pravatar.cc/150?u=j1"
    });
    
    const judge2 = await User.create({
      name: "Expert Judge 2", email: "judge2@test.com", password, role: "judge",
      techStack: ["Python", "Machine Learning"], isEmailVerified: true, avatar: "https://i.pravatar.cc/150?u=j2"
    });

    const judge3 = await User.create({
      name: "Design Judge 3", email: "judge3@test.com", password, role: "judge",
      techStack: ["Figma", "UI/UX", "CSS"], isEmailVerified: true, avatar: "https://i.pravatar.cc/150?u=j3"
    });

    const participants = [];
    for (let i = 1; i <= 20; i++) {
      participants.push(await User.create({
        name: `Hacker ${i}`, email: `hacker${i}@test.com`, password, role: "participant",
        isEmailVerified: true, avatar: `https://i.pravatar.cc/150?u=h${i}`
      }));
    }

    // 2. Create Events
    console.log("Creating 6 rich events...");
    const now = new Date();
    
    // Event 1: Active
    const event1 = await Event.create({
      title: "Global AI Hackathon 2026",
      description: "Build the next generation of AI-powered applications. Join thousands of developers around the world for a 48-hour coding sprint.",
      rules: "1. All code must be original.\n2. Teams must use at least one AI API.",
      type: "technical",
      banner: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
      minTeamSize: 2, maxTeamSize: 4, maxTeams: 100,
      startDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Started 2 days ago
      endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),   // Ends in 2 days
      registrationDeadline: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      isPaid: true, registrationFee: 500,
      judges: [judge1._id, judge2._id],
      rounds: [
        {
          name: "Ideation Phase", roundNumber: 1, isSubmissionRequired: true,
          evaluationCriteria: [{ name: "Innovation", maxScore: 20 }, { name: "Feasibility", maxScore: 20 }],
          qualification: { type: "top_n", value: 5 }
        },
        {
          name: "Final Pitch", roundNumber: 2, isSubmissionRequired: false,
          evaluationCriteria: [{ name: "Technical Execution", maxScore: 40 }, { name: "Presentation", maxScore: 10 }],
          qualification: { type: "top_n", value: 1 }
        }
      ],
      createdBy: admin._id
    });

    // Event 2: Past
    const event2 = await Event.create({
      title: "Cybersecurity CTF 2025",
      description: "Find the flags, secure the servers, and win the ultimate prize.",
      rules: "No attacking infrastructure. Stay within scope.",
      type: "technical", banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
      minTeamSize: 1, maxTeamSize: 3, maxTeams: 50,
      startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000),
      registrationDeadline: new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000),
      isPaid: false, judges: [judge1._id],
      rounds: [{ name: "Main Flag Capture", roundNumber: 1, evaluationCriteria: [{ name: "Flags Captured", maxScore: 100 }] }],
      createdBy: admin._id
    });

    // Event 3: Upcoming (Non-Technical)
    const event3 = await Event.create({
      title: "Future Innovators Pitch Deck",
      description: "Pitch your startup idea to top VCs and secure your seed funding! You literally just need a slide deck.",
      rules: "10 slides max. 5 minutes total pitch time.",
      type: "non-technical", banner: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1600&auto=format&fit=crop",
      minTeamSize: 1, maxTeamSize: 5, maxTeams: 30,
      startDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000),
      registrationDeadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
      isPaid: true, registrationFee: 1000, judges: [judge3._id],
      rounds: [{ name: "Elevator Pitch", roundNumber: 1, evaluationCriteria: [{ name: "Market potential", maxScore: 50 }, { name: "Delivery", maxScore: 50 }] }],
      createdBy: admin._id
    });

    // Event 4: Active (Game Dev)
    const event4 = await Event.create({
      title: "Indie Game Jam Summer",
      description: "Build a functioning indie game over the weekend. Theme will be announced at the starting ceremony.",
      rules: "All assets must be created during the event or be openly licensed tools.",
      type: "technical", banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1600&auto=format&fit=crop",
      minTeamSize: 2, maxTeamSize: 6, maxTeams: 40,
      startDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      registrationDeadline: new Date(now.getTime() + 5 * 60 * 60 * 1000), // Closes in 5 hours
      isPaid: false, judges: [judge1._id, judge3._id],
      rounds: [{ name: "Prototype Review", roundNumber: 1, evaluationCriteria: [{ name: "Gameplay", maxScore: 60 }, { name: "Art Style", maxScore: 40 }] }],
      createdBy: admin._id
    });

    // Event 5: Upcoming (Web3)
    const event5 = await Event.create({
      title: "Web3 Decoded Summit",
      description: "Decentralized apps, smart contracts, and the future of finance.",
      rules: "Must deploy on testnet.",
      type: "technical", banner: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1600&auto=format&fit=crop",
      minTeamSize: 1, maxTeamSize: 3, maxTeams: 200,
      startDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 62 * 24 * 60 * 60 * 1000),
      registrationDeadline: new Date(now.getTime() + 50 * 24 * 60 * 60 * 1000),
      isPaid: false, judges: [judge2._id],
      rounds: [{ name: "Smart Contract Logic", roundNumber: 1, evaluationCriteria: [{ name: "Security", maxScore: 80 }] }],
      createdBy: admin._id
    });

    // Event 6: Past (Hardware)
    const event6 = await Event.create({
      title: "IoT Hardware Challenge",
      description: "Wire up sensors, boards, and actuators to build smart hardware solutions.",
      rules: "Bring your own microcontrollers.",
      type: "technical", banner: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1600&auto=format&fit=crop",
      minTeamSize: 2, maxTeamSize: 5, maxTeams: 20,
      startDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() - 58 * 24 * 60 * 60 * 1000),
      registrationDeadline: new Date(now.getTime() - 65 * 24 * 60 * 60 * 1000),
      isPaid: true, registrationFee: 200, judges: [judge1._id],
      rounds: [{ name: "Hardware Demo", roundNumber: 1, evaluationCriteria: [{ name: "Working prototype", maxScore: 100 }] }],
      createdBy: admin._id
    });

    // 3. Create Teams for Active Events
    console.log("Creating teams & simulating scores...");
    const team1 = await Team.create({ teamName: "Neural Ninjas", event: event1._id, leader: participants[0]._id, members: [participants[1]._id] });
    const team2 = await Team.create({ teamName: "Prompt Engineers", event: event1._id, leader: participants[2]._id, members: [participants[3]._id] });
    const team3 = await Team.create({ teamName: "Data Miners", event: event1._id, leader: participants[4]._id, members: [participants[5]._id] });
    const team4 = await Team.create({ teamName: "Byte Wizards", event: event1._id, leader: participants[6]._id, members: [participants[7]._id] });
    
    // Teams for Game Jam
    const team5 = await Team.create({ teamName: "Pixel Pushers", event: event4._id, leader: participants[8]._id, members: [participants[9]._id, participants[10]._id] });
    const team6 = await Team.create({ teamName: "Polycount Masters", event: event4._id, leader: participants[11]._id, members: [participants[12]._id, participants[13]._id] });

    // Teams for Past Event (CTF)
    const team7 = await Team.create({ teamName: "0Day Exploiters", event: event2._id, leader: participants[14]._id, members: [participants[15]._id] });
    const team8 = await Team.create({ teamName: "Rootkits", event: event2._id, leader: participants[16]._id, members: [] });

    const roundId = event1.rounds[0]._id;

    // Simulate Judge 1 Scores (Event 1)
    await Score.create({ team: team1._id, event: event1._id, roundId, judge: judge1._id, criteriaScores: [{ criteriaName: "Innovation", score: 18 }, { criteriaName: "Feasibility", score: 15 }], totalScore: 33 });
    await Score.create({ team: team2._id, event: event1._id, roundId, judge: judge1._id, criteriaScores: [{ criteriaName: "Innovation", score: 15 }, { criteriaName: "Feasibility", score: 18 }], totalScore: 33 });
    await Score.create({ team: team3._id, event: event1._id, roundId, judge: judge1._id, criteriaScores: [{ criteriaName: "Innovation", score: 10 }, { criteriaName: "Feasibility", score: 12 }], totalScore: 22 });

    // Simulate Judge 2 Scores (Event 1)
    await Score.create({ team: team1._id, event: event1._id, roundId, judge: judge2._id, criteriaScores: [{ criteriaName: "Innovation", score: 16 }, { criteriaName: "Feasibility", score: 14 }], totalScore: 30 });
    await Score.create({ team: team2._id, event: event1._id, roundId, judge: judge2._id, criteriaScores: [{ criteriaName: "Innovation", score: 20 }, { criteriaName: "Feasibility", score: 16 }], totalScore: 36 });
    await Score.create({ team: team3._id, event: event1._id, roundId, judge: judge2._id, criteriaScores: [{ criteriaName: "Innovation", score: 14 }, { criteriaName: "Feasibility", score: 10 }], totalScore: 24 });

    // Calculate Averages and create RoundResults for Event 1
    await RoundResult.create({ team: team1._id, event: event1._id, roundId, totalScore: 31.5, rank: 2, isQualified: true });
    await RoundResult.create({ team: team2._id, event: event1._id, roundId, totalScore: 34.5, rank: 1, isQualified: true });
    await RoundResult.create({ team: team3._id, event: event1._id, roundId, totalScore: 23, rank: 3, isQualified: true });

    // Scores for Event 2 (CTF) - Single Judge
    const ctfRound = event2.rounds[0]._id;
    await Score.create({ team: team7._id, event: event2._id, roundId: ctfRound, judge: judge1._id, criteriaScores: [{ criteriaName: "Flags Captured", score: 95 }], totalScore: 95 });
    await Score.create({ team: team8._id, event: event2._id, roundId: ctfRound, judge: judge1._id, criteriaScores: [{ criteriaName: "Flags Captured", score: 40 }], totalScore: 40 });
    await RoundResult.create({ team: team7._id, event: event2._id, roundId: ctfRound, totalScore: 95, rank: 1, isQualified: true });
    await RoundResult.create({ team: team8._id, event: event2._id, roundId: ctfRound, totalScore: 40, rank: 2, isQualified: true });


    // 4. Notifications
    console.log("Creating dummy notifications...");
    await Notification.create({ user: participants[0]._id, title: "Welcome to Event Forge", message: "Your profile is verified. You can now register for events.", type: "general", link: "/events" });
    await Notification.create({ user: judge1._id, title: "Assigned as Judge", message: `You have been assigned to evaluate teams in "${event1.title}".`, type: "judge_approval", link: "/judge/dashboard" });
    await Notification.create({ user: judge3._id, title: "Assigned as Judge", message: `You have been assigned to evaluate teams in "${event4.title}".`, type: "judge_approval", link: "/judge/dashboard" });

    console.log("Seed complete! Database is fully populated with 6 test events and multi-team data.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
