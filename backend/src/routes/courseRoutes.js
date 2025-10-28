import express from "express";
import Course from "../models/course.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({ is_published: true });
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single course by route (slug)
router.get("/:route", async (req, res) => {
  try {
    const course = await Course.findOne({ route: req.params.route });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
