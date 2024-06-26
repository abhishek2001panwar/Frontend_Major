import { Course } from "../models/courses.model.js";

//controller for all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      message: "Courses fetched/retrived successfully",
      courses: courses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//controller for posting courses

export const postCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    const newCourse = new Course({
      title,
      description,
      content,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json({
      message: "Course created successfully",
      data: savedCourse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// controller for single course

export const getCourse = async (req, res) => {
  try {
    const { id } = req.params; // Yahan 'params' se 'id' extract karna chahiye
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    return res.status(200).json({
      message: "Course retrieved successfully",
      course: course,
    });
  } catch (error) {
    console.error("Error getting course:", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// controller for updating course

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseupdate = await Course.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
    });
    res.status(200).json({
      message: "Course updated successfully",
      courseupdate: courseupdate,
    });
  } catch (error) {
    console.log(error);
  }
};

// controller for deleting course

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // Yahan 'params' se 'id' extract karna chahiye
    const course = await Course.findByIdAndDelete(id);
    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
