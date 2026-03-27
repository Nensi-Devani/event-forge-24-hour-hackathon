import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,
  rules: String,
  banner: String,

  type: {
    type: String,
    enum: ["technical", "non-technical"],
    required: true
  },

  // Team Constraints
  minTeamSize: Number,
  maxTeamSize: Number,

  maxTeams: Number,

  registrationDeadline: Date,

  // Payment
  isPaid: {
    type: Boolean,
    default: false
  },

  registrationFee: {
    type: Number,
    default: 0
  },

  currency: {
    type: String,
    default: "INR"
  },

  // Judges
  judges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  // Feature flags
  hasSubmission: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Event", eventSchema);