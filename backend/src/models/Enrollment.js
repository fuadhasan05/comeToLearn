import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  lesson_id: String,
  completed: Boolean,
  last_watched: Date
});

const enrollmentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    index: true
  },
  course_id: {
    type: String,
    required: true
  },
  enrollment_date: {
    type: Date,
    default: Date.now
  },
  last_accessed: {
    type: Date,
    default: Date.now
  },
  progress: [progressSchema],
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
enrollmentSchema.index({ user_id: 1, course_id: 1 }, { unique: true });

export default mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);