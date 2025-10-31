import Enrollment from '../models/Enrollment.js';
import Course from '../models/course.js';

// @desc    Get user's enrolled courses with details
// @route   GET /api/enrollments
// @access  Private
export const getUserEnrollments = async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Get all enrollments for the user
    const enrollments = await Enrollment.find({ user_id }).lean();

    // Get course details for all enrolled courses
    const courseIds = enrollments.map(e => e.course_id);
    const courses = await Course.find({ course_id: { $in: courseIds } }).lean();

    // Combine enrollment data with course details
    const enrolledCourses = enrollments.map(enrollment => {
      const course = courses.find(c => c.course_id === enrollment.course_id);
      if (!course) return null;

      const completedLessons = enrollment.progress?.filter(p => p.completed)?.length || 0;
      const totalLessons = course.lessons?.length || 0;
      
      return {
        ...course,
        enrollment_date: enrollment.enrollment_date,
        last_accessed: enrollment.last_accessed,
        completed: enrollment.completed,
        progress: {
          completed: completedLessons,
          total: totalLessons,
          percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
        }
      };
    }).filter(Boolean);

    // Calculate overall stats
    const stats = {
      totalCourses: enrolledCourses.length,
      completedLessons: enrolledCourses.reduce((sum, course) => sum + course.progress.completed, 0),
      totalHours: enrolledCourses.reduce((sum, course) => {
        return sum + (course.lessons?.reduce((mins, lesson) => mins + (lesson.duration_minutes || 0), 0) || 0);
      }, 0) / 60,
      certificates: enrolledCourses.filter(course => course.completed).length
    };

    res.status(200).json({
      success: true,
      data: {
        courses: enrolledCourses,
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
};