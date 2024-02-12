const commentControllers = require("../controllers/commentControllers");

const express = require("express");
const router = express.Router();
const { commentValidation } = require("../middleware/userValidation");
const authenticate = require('../middleware/authenticate');

// Route to get all comments
router.get("/", authenticate.isAuthenticated, commentControllers.getAllComments);

// Route to get a comment by commentID
router.get("/:id", authenticate.isAuthenticated, commentControllers.getCommentsById);

// Route to get a comment(s) by authorID
router.get("/user/:id", authenticate.isAuthenticated, commentControllers.getCommentsByUserId);

// Route to get a comment(s) by taskID
router.get("/task/:id", authenticate.isAuthenticated, commentControllers.getCommentsByTaskId);

// Route to create a comment
router.post("/", authenticate.isAuthenticated, commentValidation, commentControllers.createComment);

// Route to update a comment by commentID
router.put("/:id", authenticate.isAuthenticated, commentValidation, commentControllers.updateCommentById);

// Route to delete a comment by commentID
router.delete("/:id", authenticate.isAuthenticated, commentControllers.deleteCommentById);

module.exports = router;
