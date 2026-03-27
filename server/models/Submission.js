import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },

  round: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Round"
  },

  // Dynamic fields
  data: {
    type: Map,
    of: String
  }

}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);