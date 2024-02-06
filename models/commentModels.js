const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");

/**********************************************
 * Schema for the comment collection in MongoDB
 **********************************************/

const commentSchema = new mongoose.Schema({
    userId: { type: ObjectId},
    taskId: { type: ObjectId},
    comment: { type: String},
});

// Create the Comment model using the schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
