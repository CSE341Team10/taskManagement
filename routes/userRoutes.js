const userControllers = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();

// Route to get all user profiles
router.get("/", userControllers.getAllProfiles);

// Route to update the user's profile
router.put("/", userControllers.updateUserProfile);

module.exports = router;