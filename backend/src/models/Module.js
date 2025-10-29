import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  lesson_index: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String, // Format: "MM:SS"
    default: null
  },
  video_url: {
    type: String,
    default: null
  },
  isLocked: {
    type: Boolean,
    default: true
  }
});

const moduleSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    index: true
  },
  module_index: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  lessons: [lessonSchema]
}, {
  timestamps: true
});

// Compound index for efficient queries
moduleSchema.index({ course_id: 1, module_index: 1 });

export default mongoose.model('Module', moduleSchema);