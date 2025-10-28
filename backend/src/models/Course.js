import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lesson_id: String,
  title: String,
  duration_minutes: Number,
  video_url: String,
});

const priceSchema = new mongoose.Schema({
  original: Number,
  discounted: Number,
  currency: String,
  is_discounted: Boolean,
  discount_percentage: Number,
});

const imageSchema = new mongoose.Schema({
  url: String,
  alt_text: String,
});

const courseSchema = new mongoose.Schema({
  course_id: String,
  route: String,
  title: String,
  short_title: String,
  price: priceSchema,
  is_free: Boolean,
  category: String,
  image: imageSchema,
  lessons: [lessonSchema],
  date_created: Date,
  is_published: Boolean,
});

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
