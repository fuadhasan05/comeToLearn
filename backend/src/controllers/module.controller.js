import Module from "../models/Module.js";

// @desc    Get all modules for a specific course
// @route   GET /api/modules?course_id=CALC-001
// @access  Public
export const getModulesByCourse = async (req, res) => {
  try {
    const { course_id } = req.query;

    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: "course_id is required",
      });
    }

    const modules = await Module.find({ course_id })
      .sort({ module_index: 1 })
      .lean();

    // Sort lessons within each module
    modules.forEach((module) => {
      if (module.lessons && module.lessons.length > 0) {
        module.lessons.sort((a, b) => a.lesson_index - b.lesson_index);
      }
    });

    res.status(200).json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// @desc    Get a single module by ID
// @route   GET /api/modules/:id
// @access  Public
export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    res.status(200).json({
      success: true,
      data: module,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new module
// @route   POST /api/modules
// @access  Private/Admin
export const createModule = async (req, res) => {
  try {
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: "course_id is required",
      });
    }

    // Find the highest module_index for this course
    const lastModule = await Module.findOne({ course_id })
      .sort({ module_index: -1 })
      .lean();

    const module_index = lastModule ? lastModule.module_index + 1 : 1;

    // Add module_index if not provided
    const moduleData = {
      ...req.body,
      module_index: req.body.module_index || module_index,
    };

    // Add lesson_index if not provided
    if (moduleData.lessons) {
      moduleData.lessons = moduleData.lessons.map((lesson, idx) => ({
        ...lesson,
        lesson_index: lesson.lesson_index || idx + 1,
      }));
    }

    const module = await Module.create(moduleData);

    res.status(201).json({
      success: true,
      data: module,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a module
// @route   PUT /api/modules/:id
// @access  Private/Admin
export const updateModule = async (req, res) => {
  try {
    // Add lesson_index if not provided
    const moduleData = { ...req.body };
    if (moduleData.lessons) {
      moduleData.lessons = moduleData.lessons.map((lesson, idx) => ({
        ...lesson,
        lesson_index: lesson.lesson_index || idx + 1,
      }));
    }

    const module = await Module.findByIdAndUpdate(req.params.id, moduleData, {
      new: true,
      runValidators: true,
    });

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    res.status(200).json({
      success: true,
      data: module,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a module
// @route   DELETE /api/modules/:id
// @access  Private/Admin
export const deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Module deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
