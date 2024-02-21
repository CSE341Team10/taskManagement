const { body, param, validationResult } = require("express-validator");

const categoryValidation = [
  body("categoryName").optional().isString().trim().escape(),
  body("categoryDescription").optional().isString().trim().escape(),
];

const validateCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const categoryDeleteValidation = [param("id").isMongoId()];

const categoryUpdateValidation = [param("id").isMongoId()];

const categoryGetValidation = [param("id").isMongoId()];

const categoryGetByTaskIdValidation = [param("id").isMongoId()];

module.exports = {
  categoryValidation,
  validateCategory,
  categoryDeleteValidation,
  categoryUpdateValidation,
  categoryGetValidation,
  categoryGetByTaskIdValidation,
};
