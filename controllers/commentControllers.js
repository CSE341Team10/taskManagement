const { ObjectId } = require("mongodb");
const Comment = require("../models/commentModels.js");
const mongoose = require("mongoose");

const commentsController = {};

/*********************************************************
 * Function to get a list of all comments from the database.
 ********************************************************/
commentsController.getAll = async function (req, res) {
//#swagger.tags = ['Comments Management']
//#swagger.description = This is to get a list of all comments from the database.
    
    try {
        const comment = await Comment.find({},
          {
            userId: 1,
            taskId: 1,
            comment: 1,
          });
        return res.json(comment);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
  };

/*********************************************************
 * Function to get a single comment by commentId from the database.
 ********************************************************/
commentsController.getCommentById = async function (req, res) {
//#swagger.tags = ['Comments Management']
//#swagger.description = This is to get a comment by Id from the database.
    try {
        const commentId = req.params.id;
        const comment = await Comment.findOne({ _id: commentId});

        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: "Comment not found." });
        }
    } catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get a single comment by authorId from the database.
 ********************************************************/
commentsController.getCommentByUserId = async function (req, res) {
  //#swagger.tags = ['Comments Management']
  //#swagger.description = This is to get a comment by userId from the database.
      try {
          const commentID = req.params.id;
          const comment = await Comment.findOne({ userId: commentID});
  
          if (comment) {
              res.json(comment);
          } else {
              res.status(404).json({ error: "Comment not found." });
          }
      } catch (error) {
          console.error("Error fetching comment:", error);
          res.status(500).json({ error: "Internal Server Error." });
      }
  };

/*********************************************************
 * Function to get a single comment by taskID from the database.
 ********************************************************/
commentsController.getCommentByTaskId = async function (req, res) {
  //#swagger.tags = ['Comments Management']
  //#swagger.description = This is to get a comment by taskId from the database.
      try {
          const commentID = req.params.id;
          const comment = await Comment.findOne({ taskId: commentID});
  
          if (comment) {
              res.json(comment);
          } else {
              res.status(404).json({ error: "Comment not found." });
          }
      } catch (error) {
          console.error("Error fetching comment:", error);
          res.status(500).json({ error: "Internal Server Error." });
      }
  };

/*********************************************************
 * Function to update a comment by Id
 *********************************************************/
commentsController.updateCommentById = async function (req, res) {
//#swagger.tags = ['Comments Management']
//#swagger.description = This is to update a comment by commentId in the database.
    try {
        const commentId = new ObjectId(req.params.id);
        const { userId, taskId, comment } = req.body;

        updateFields = {
            userId,
            taskId,
            comment,
        };

        const updatedComment = await Comment.findOneAndUpdate(
            { 
              _id: commentId,
            },
            updateFields,
            {
                new: true,
            }
        );

        if (updatedComment) {
            res.json({
                message: `Comment has been updated successfully!`,
            });
        } else {
            res.status(404).json({ error: "Comment not found." });
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};


/*********************************************************
 * Function to create a comment
 *********************************************************/
commentsController.createComment = (req, res) => {
    //#swagger.tags=['Comments Management']
    //#swagger.description= Create a comment
    // Validate request
    if (!req.body.comment) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
      }
      const newComment = new Comment({
        userId: req.body.userId,
        taskId: req.body.taskId,
        comment: req.body.comment,
      });
      // Save Author in the database
      newComment
        .save(newComment)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Author.',
          });
        });
  };

// Delete a Comment
commentsController.deleteCommentById = (req, res) => {
    //#swagger.tags=['Comments Management']
    //#swagger.description= Delete a comment by ID  
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be a valid comment id to delete a comment');
    }
  
    const commentId = new ObjectId(req.params.id);
  
    // Delete the comment
    Comment.deleteOne({ _id: commentId })
        .then((result) => {
          if (result.deletedCount > 0) {
            res.send({ message: 'Comment deleted successfully' });
          } else {
            res.status(404).send({ message: 'Comment not found or no changes made' });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while deleting the Comment.',
          });
        });
};

module.exports = commentsController;
