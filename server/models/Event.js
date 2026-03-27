import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  rules: String,

  type: {
    type: String,
    enum: ["technical", "non-technical"]
  },

  banner: String,

  // Team rules
  minTeamSize: Number,
  maxTeamSize: Number,
  maxTeams: Number,

  registrationDeadline: Date,
  startDate: Date,
  endDate: Date,

  // Payment
  isPaid: {
    type: Boolean,
    default: false
  },
  registrationFee: Number,

  // Judges
  judges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  // Embedded rounds
  rounds: [
    {
      name: String,
      roundNumber: Number,

      rules: String,

      evaluationCriteria: [
        {
          name: String,
          maxScore: Number
        }
      ],

      isSubmissionRequired: {
        type: Boolean,
        default: false
      },

      // Qualification
      qualification: {
        type: {
          type: String,
          enum: ["top_n", "min_score", "percentage"]
        },
        value: Number
      }
    }
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export default mongoose.model("Event", eventSchema);