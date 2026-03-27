import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  message: String,
  type: {
    type: String,
    enum: ["team_invite", "judge_approval", "score_update", "event_update", "general"],
    default: "general",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  link: String,
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
