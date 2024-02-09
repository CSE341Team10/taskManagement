const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

// Schema for the tasks collection in MongoDB
const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        dueDate: { type: String },
        priorityLevel: { type: String, required: true },
        status: { type: String },
        userId: { type: ObjectId },
    }, { versionKey: false }
);

// Create the Task model using the schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;