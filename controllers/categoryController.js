const mongodb = require("../db/mongo");
const ObjectId = require("mongodb").ObjectId;
const Category = require("../models/categoryModel.js");
const Task = require("../models/taskModel.js");

const getAllCategories = async (req, res) => {
  //#swagger.tags=['Categories']
  //#swagger.description='Gets a list of all categories.'
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (err) {
    console.error("There was an error while fetching all categories.", err);
    res
      .status(500)
      .json({ error: "There was an error while fetching all categories." });
  }
};

const getCategoryById = async (req, res) => {
  //#swagger.tags=['Categories']
  //#swagger.description='Gets a specific categories by its ID.'
  try {
    const categoryId = new ObjectId(req.params.id);
    const category = await Category.find({ _id: categoryId });

    if (category.length > 0) {
      res.status(200).json(category[0]);
    } else {
      res.status(404).json({ error: "Category not found." });
    }
  } catch (err) {
    console.error("There was an error while fetching the category.", err);
    res
      .status(500)
      .json({ error: "There was an error while fetching the category." });
  }
};

const getCategoriesByTaskId = async (req, res) => {
  //#swagger.tags=['Categories']
  //#swagger.description='Gets a specific categories by the category's ID.'

  try {
    const taskId = req.params.id;
    const tasks = await Task.find({ _id: taskId });

    if (tasks.length > 0) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ error: "Tasks not found." });
    }
  } catch (err) {
    console.error(
      "There was an error while fetching the tasks by category ID.",
      err
    );
    res.status(500).json({
      error: "There was an error while fetching the tasks by category ID.",
    });
  }
};

const createCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  //#swagger.description='Creates a new category.'
  try {
    const category = new Category({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    });

    await category.save();
    return res
      .status(200)
      .send({ message: "Category was created successfully!" });
  } catch (err) {
    console.error("There was an error while creating the category.", err);
    res
      .status(500)
      .json({ error: "There was an error while creating the category." });
  }
};

const updateCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  //#swagger.description='Updates a specific category by its ID.'
  try {
    const categoryId = new ObjectId(req.params.id);

    // Extract the fields that can be updated from the request body
    const { categoryName, categoryDescription } = req.body;

    // Construct the update object with update operators
    const updateFields = {};
    if (categoryName) updateFields.categoryName = categoryName;
    if (categoryDescription)
      updateFields.categoryDescription = categoryDescription;

    // Use findOneAndUpdate with the update object
    const categoryUpdate = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: updateFields },
      { new: true }
    );

    if (categoryUpdate) {
      return res
        .status(200)
        .json({ message: "Category was successfully updated!" });
    } else {
      res.status(404).json({ error: "Category not found." });
    }
  } catch (err) {
    console.error("There was an error while updating the category.", err);
    res
      .status(500)
      .json({ error: "There was an error while updating the category." });
  }
};

const deleteCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  //#swagger.description='Deletes a specific category by its ID.'
  try {
    const categoryId = new ObjectId(req.params.id);

    const categoryDelete = await Category.deleteOne({ _id: categoryId });

    if (categoryDelete.deletedCount > 0) {
      res.status(200).send({ message: "Category successfully deleted!" });
    } else {
      res.status(404).json({ error: "Category not found." });
    }
  } catch (err) {
    console.error("There was an error while deleting the category.", err);
    res
      .status(500)
      .json({ error: "There was an error while deleting the category." });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoriesByTaskId,
  createCategory,
  updateCategory,
  deleteCategory,
};
