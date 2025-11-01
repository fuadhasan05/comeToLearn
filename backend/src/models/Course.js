import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  lesson_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  duration_minutes: {
    type: Number,
    required: true
  },
  video_url: {
    type: String,
    required: true
  }
});

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true
  },
  route: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  short_title: {
    type: String,
    required: true
  },
  price: {
    original: Number,
    discounted: Number,
    currency: {
      type: String,
      default: 'BDT'
    },
    is_discounted: {
      type: Boolean,
      default: false
    },
    discount_percentage: Number
  },
  is_free: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    url: String,
    alt_text: String
  },
  lessons: [lessonSchema],
  date_created: {
    type: Date,
    default: Date.now
  },
  is_published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);