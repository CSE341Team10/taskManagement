const { body, param, validationResult } = require("express-validator");
const Category = require("../models/categoryModels");

const categoryValidation = [
  body("categoryName").optional().isString().trim().escape(),
  body("categoryDescription").optional().isString().trim().escape(),
];

module.exports = {
  categoryValidation,
};
