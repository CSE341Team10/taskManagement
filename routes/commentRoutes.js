const commentControllers = require("../controllers/commentControllers");

const express = require("express");
const router = express.Router();
const { commentValidation } = require("../middleware/userValidation");
const { isAuthenticated } = require('../middleware/authenticate');

// Route to get all comments
router.get("/", isAuthenticated, commentControllers.getAllComments);

// Route to get a comment by commentID
router.get("/:id", isAuthenticated, commentControllers.getCommentsById);

// Route to get a comment(s) by authorID
router.get("/user/:id", isAuthenticated, commentControllers.getCommentsByUserId);

// Route to get a comment(s) by taskID
router.get("/task/:id", isAuthenticated, commentControllers.getCommentsByTaskId);

// Route to create a comment
router.post("/", isAuthenticated, commentValidation, commentControllers.createComment);

// Route to update a comment by commentID
router.put("/:id", isAuthenticated, commentValidation, commentControllers.updateCommentById);

// Route to delete a comment by commentID
router.delete("/:id", isAuthenticated, commentControllers.deleteCommentById);

module.exports = router;