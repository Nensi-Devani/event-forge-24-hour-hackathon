import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  name: String,
  roundNumber: Number,

  rules: String,

  // Evaluation Criteria
  evaluationCriteria: [
    {
      name: String,
      minScore: Number,
      totalScore: Number
    }
  ],

  startDate: Date,
  endDate: Date,

  isSubmissionRequired: {
    type: Boolean,
    default: false
  },

  // NEW: Qualification Logic
  qualification: {
    type: {
      type: String,
      enum: ["top_n", "min_score", "percentage"],
      required: true
    },

    value: Number
    // examples:
    // top_n → 10 (top 10 teams go next round)
    // min_score → 50 (minimum 50 marks)
    // percentage → 60 (top 60% teams)
  }

}, { timestamps: true });

export default mongoose.model("Round", roundSchema);