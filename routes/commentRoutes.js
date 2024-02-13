    const commentControllers = require("../controllers/commentControllers");

const express = require("express");
const router = express.Router();
const { commentValidation } = require("../middleware/userValidation");
const { isAuthenticated } = require('../middleware/authenticate');


// Route to get all comments
router.get("/", commentControllers.getAllComments);

// Route to create a comment
router.post("/", commentValidation, commentControllers.createComment);

// Route to get all comment(s) of user
router.get("/user/", commentControllers.getAllCommentsByUser);

// Route to get a comment by commentID
router.get("/:id", commentControllers.getCommentsById);

// Route to update a comment by commentID
router.put("/:id", commentValidation, commentControllers.updateCommentById);

// Route to delete a comment by commentID
router.delete("/:id", commentControllers.deleteCommentById);

// Route to get a comment(s) by userID
router.get("/user/:id", commentControllers.getCommentsByUserId);

// Route to get a comment(s) by taskID
router.get("/task/:id", commentControllers.getCommentsByTaskId);

module.exports = router;