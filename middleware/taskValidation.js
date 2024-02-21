const { body, validationResult } = require("express-validator");

const taskValidationRules = () => {
    return [
        body("title").notEmpty().withMessage("title field is required").trim(),
        body("description").optional().isString().trim(),
        body("dueDate").customSanitizer(value => value || "2024-12-31").trim(),
        body("priorityLevel").customSanitizer(value => value || "No-priority").trim(),
        body("status").customSanitizer(value => value || "Pending").trim(),
        body("userId").isLength({ max: 24 }).withMessage("userId must be a 24 character hex string, or an integer").trim(),
        body("categoryId").isLength({ max: 24 }).withMessage("categoryId must be a 24 character hex string, or an integer").trim(),
    ]
};

const validateTask = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
    taskValidationRules,
    validateTask
};