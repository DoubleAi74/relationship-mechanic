import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: [true, "Firebase UID is required"],
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  targetDays: {
    type: Number,
    required: [true, "Target days is required"],
    min: [1, "Target days must be at least 1"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model recompilation in development
export default mongoose.models.User || mongoose.model("User", UserSchema);
