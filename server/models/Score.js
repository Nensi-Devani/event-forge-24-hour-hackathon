import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },

  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  roundId: mongoose.Schema.Types.ObjectId, // from event.rounds

  criteriaScores: [
    {
      criteriaName: String,
      score: Number
    }
  ],

  totalScore: Number

}, { timestamps: true });

export default mongoose.model("Score", scoreSchema);