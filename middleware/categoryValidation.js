const { body, validationResult } = require("express-validator");

const categoryValidationRules = () => {
    return [
        body("categoryName").notEmpty().withMessage("Category name is required").trim(),
        body("categoryDescription").optional().isString().withMessage("Category description must be a string").trim(),
    ];
};

const validateCategory = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.array().map((err) => ({ [err.param]: err.msg }));

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
    categoryValidationRules,
    validateCategory
};