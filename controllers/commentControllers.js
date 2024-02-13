const { ObjectId } = require("mongodb");
const Comment = require("../models/commentModels.js");
const commentsController = {};

/*********************************************************
 * Function to get a list of all comments from the database.
 ********************************************************/
commentsController.getAllComments = async function (req, res) {
    //#swagger.tags = ['Comments Management']
    //#swagger.description = 'This is to get a list of all comments from the database.'

    try {
        const comment = await Comment.find(
            {},
            {
                userId: 1,
                taskId: 1,
                comment: 1,
                createdAt: 1,
                updatedAt: 1,
            }
        );
        return res.json(comment);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get a single comment by commentId from the database.
 ********************************************************/
commentsController.getCommentsById = async function (req, res) {
    //#swagger.tags = ['Comments Management']
    //#swagger.description = 'This is to get a comment by Id from the database.'

    try {
        console.log('Received user ID:', req.params.id);
        const commentId = req.params.id;
        const comment = await Comment.findOne({ _id: commentId });

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
 * Function to get comment(s) by userId from the database.
 ********************************************************/
commentsController.getCommentsByUserId = async function (req, res) {
    //#swagger.tags = ['Comments Management']
    //#swagger.description = 'This is to get a comment by userId from the database.'

    try {
        const userId = req.params.id;
        const objectIdUserId = new ObjectId(userId);
        const comment = await Comment.find({ userId: objectIdUserId });

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
 * Function to get all comment(s) of a user from the database.
 ********************************************************/
commentsController.getAllCommentsByUser = async function (req, res) {
    //#swagger.tags = ['Comments Management']
    //#swagger.description = 'This is to get all comment by the user logged from the database.'
    
    try {
        const userId = req.session.user._id;
        const comment = await Comment.find({ userId: userId });

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
 * Function to get comment(s) by taskID from the database.
 ********************************************************/
commentsController.getCommentsByTaskId = async function (req, res) {
    //#swagger.tags = ['Comments Management']
    //#swagger.description = 'This is to get a comment by taskId from the database.'
    try {        
        const taskId = req.params.id;
        const objectIdTaskId = new ObjectId(taskId);
        const comment = await Comment.find({ taskId: objectIdTaskId });

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
    //#swagger.description = 'This is to update a comment by commentId in the database.'

    try {
        //const commentId = new ObjectId(req.params.id);
        const commentId = req.params.id;
        // Update is available only for task and comment. The user remains the same.
        const { taskId, comment } = req.body;

        updateFields = {
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
    //#swagger.description= 'Create a comment'

    if (!req.body.comment) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const newComment = new Comment({
        // userId: req.session.user._id, // the user Id is the user logged in
        userId: req.body.userId,
        taskId: req.body.taskId,
        comment: req.body.comment,
    });
    // Save Comment in the database
    newComment
        .save(newComment)
        .then((data) => {
            res.send({
                message: `Comment has been created successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Comment.",
            });
        });
};

/*********************************************************
 * Function to delete a comment
 *********************************************************/
commentsController.deleteCommentById = (req, res) => {
    //#swagger.tags=['Comments Management']
    //#swagger.description= 'Delete a comment by ID'

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must be a valid comment id to delete a comment");
    }

    const commentId = new ObjectId(req.params.id);

    // Delete the comment
    Comment.deleteOne({ _id: commentId })
        .then((result) => {
            if (result.deletedCount > 0) {
                res.send({ message: "Comment deleted successfully" });
            } else {
                res.status(404).send({
                    message: "Comment not found or no changes made",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting the Comment.",
            });
        });
};

module.exports = commentsController;
