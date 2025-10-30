const express = require("express");
const router = express.Router();

// import controllers
const {
  createCategory,
  showAllCategories,
  getCategoryPageDetails,
} = require("../controllers/category");

// ========== Routes ==========

// Create a new category
router.post("/createCategory", createCategory);

// Get all categories
router.get("/showAllCategories", showAllCategories);

// Get details for a category page
router.post("/getCategoryPageDetails", getCategoryPageDetails);

module.exports = router;
