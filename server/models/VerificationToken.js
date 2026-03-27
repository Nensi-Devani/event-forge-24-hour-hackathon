import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  token: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["USER_VERIFY", "TEAM_INVITE"],
    required: true
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  expiresAt: Date

}, { timestamps: true });

export default mongoose.model("VerificationToken", verificationTokenSchema);