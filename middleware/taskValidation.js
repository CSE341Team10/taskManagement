const { body, validationResult } = require("express-validator");

const taskValidationRules = () => {
    return [
        body("title").notEmpty().withMessage("title field is required").trim(),
        body("description").isString().withMessage("description must be a string.").trim(),
        body("dueDate").isString().withMessage("dueDate must follow YYYY-MM-DD format").trim(),
        body("priorityLevel").customSanitizer(value => value || "No-priority").trim(),
        body("status").default("In progress").trim(),
        body("userId").isLength({ max: 24 }).trim(),
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