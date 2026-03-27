import mongoose from "mongoose";

const roundResultSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  round: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Round",
    required: true
  },

  totalScore: Number,

  averageScore: Number, // across judges

  rank: Number,

  isQualified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("RoundResult", roundResultSchema);