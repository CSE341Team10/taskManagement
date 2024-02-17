const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");

// mongodb schema for category
const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categoryDescription: { type: String },
    taskId: { type: ObjectId },
  },
  { versionKey: false }
);

// Create category
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
