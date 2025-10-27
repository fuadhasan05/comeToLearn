import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lesson_id: String,
  title: String,
  duration_minutes: Number,
  video_url: String,
});

const imageSchema = new mongoose.Schema({
  url: String,
  alt_text: String,
});

const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true, unique: true },
  title: String,
  short_title: String,
  price: Number,
  currency: String,
  is_free: Boolean,
  category: String,
  image: imageSchema,
  lessons: [lessonSchema],
  date_created: Date,
  is_published: Boolean,
});

export default mongoose.model("Course", courseSchema);
