const userControllers = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticate");
const { userValidation, userDeleteValidation, userUpdateValidation, getUserProfileByGitHubIdValidation, validateUser } = require("../middleware/userValidation");

// Route to get all user profiles
router.get("/", isAuthenticated, userControllers.getAllProfiles);

// Route to get a user profile by githubUserId
router.get("/:id", isAuthenticated, getUserProfileByGitHubIdValidation, userControllers.getUserProfileByGitHubId);

// Route to create a user profile
router.post("/", isAuthenticated, userValidation, validateUser, userControllers.createUserProfile);

// Route to update the user's profile
router.put("/:id", isAuthenticated, userUpdateValidation, validateUser, userControllers.updateUserProfile);

// Route to delete a user profile
router.delete("/:id", isAuthenticated, userDeleteValidation, userControllers.deleteUserProfile);

module.exports = router;
