import Course from "../models/course.js";

// ✅ Get all published courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ is_published: true });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get course by MongoDB ID
export const getCourseById = async (req, res) => {
  try {
    console.log('Searching for course by ID:', req.params.id);
    let course;
    
    // Try MongoDB ID first
    try {
      course = await Course.findById(req.params.id);
    } catch (err) {
      // If not a valid MongoDB ID, try course_id
      course = await Course.findOne({ course_id: req.params.id });
    }
    
    console.log('Found course by ID:', course ? 'yes' : 'no');
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get course by route (slug)
export const getCourseByRoute = async (req, res) => {
  try {
    console.log('Searching for course by route:', req.params.route);
    const course = await Course.findOne({ route: req.params.route });
    console.log('Found course by route:', course ? 'yes' : 'no');
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Create new course
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
