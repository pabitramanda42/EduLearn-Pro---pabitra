const express = require("express");
const router = express.Router();

// Controllers
const {
  createCourse,
  getCourseDetails,
  getAllCourses,
  getFullCourseDetails,
  editCourse,
  deleteCourse,
  getInstructorCourses,
} = require("../controllers/course");

const { updateCourseProgress } = require("../controllers/courseProgress");

const {
  createCategory,
  showAllCategories,
  getCategoryPageDetails,
} = require("../controllers/category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSection");

const {
  createRating,
  getAverageRating,
  getAllRatingReview,
} = require("../controllers/ratingAndReview");

// Middlewares
const { auth, isAdmin, isInstructor, isStudent } = require("../middleware/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can only be created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);

// Sections
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Sub-sections
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Course Details
router.post("/getCourseDetails", getCourseDetails);
router.get("/getAllCourses", getAllCourses);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// Course Edit/Delete
router.post("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Admin only)
// ********************************************************************************************************
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails);

// ********************************************************************************************************
//                                      Rating & Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingReview);

module.exports = router;
