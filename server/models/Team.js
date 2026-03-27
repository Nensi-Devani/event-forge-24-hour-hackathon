import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  name: String,
  email: String,

  isVerified: {
    type: Boolean,
    default: false
  }
});

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },

  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  members: [memberSchema],

  // Payment
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Team", teamSchema);