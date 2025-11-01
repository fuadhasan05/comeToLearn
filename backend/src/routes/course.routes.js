import express from "express";
import {
  getAllCourses,
  getCourseById,
  getCourseByRoute,
  createCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

// ✅ All courses (only published)
router.get("/", getAllCourses);

// ✅ Get course by route (slug)
router.get("/route/:route", getCourseByRoute);

// ✅ Get course by ID
router.get("/:id", getCourseById);

// ✅ Create new course (Admin only ideally)
router.post("/", createCourse);

export default router;
