import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  avatar: {
    type: String,
    default: ""
  },


  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["participant", "judge", "admin"],
    default: "participant"
  },

  techStack: [String], // for assigning judges

  isEmailVerified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);