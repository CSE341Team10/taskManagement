const commentControllers = require("../controllers/commentControllers");

const express = require("express");
const router = express.Router();
//const { userValidation, validateUser } = require("../middleware/userValidation");

// Route to get all comments
router.get("/", commentControllers.getAll);

// Route to get a comment by commentID
router.get("/:id", commentControllers.getCommentById);

// Route to get a comment by authorID
router.get("/user/:id", commentControllers.getCommentByUserId);

// Route to get a comment by taskID
router.get("/task/:id", commentControllers.getCommentByTaskId);

// Route to create a comment
router.post("/", commentControllers.createComment);

// Route to update a comment by commentID
router.put("/:id", commentControllers.updateCommentById);

// Route to delete a comment by commentID
router.delete('/:id', commentControllers.deleteCommentById);


module.exports = router;
