const { body, param, validationResult } = require("express-validator");
const User = require("../models/userModels");

const userValidation = [
    body("username").optional().isString().trim().escape(),
    body("displayName").optional().isString().trim().escape(),
    body("firstName").optional().isString().trim().escape(),
    body("lastName").optional().isString().trim().escape(),
    body("userRole").optional().isString().trim().escape(),
    body("email").optional().isEmail().normalizeEmail(),
    body("password").optional().isString().trim().escape(),
    body("profilePic").optional().isString(),
];

const getUserProfileByGitHubIdValidation = [
      param("id").custom(async (value) => {
          // Check if the githubUserId exists in the users collection
          const user = await User.findOne({ githubUserId: value });
          if (!user) {
              throw new Error("Invalid githubUserId");
          }
          return true;
      }),
  ];


const userUpdateValidation = [
    param("id").custom(async (value) => {
        // Check if the githubUserId exists in the users collection
        const user = await User.findOne({ githubUserId: value });
        if (!user) {
            throw new Error("Invalid githubUserId");
        }
        return true;
    }),
];

const userDeleteValidation = [param("id").isMongoId()];

const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const commentValidation = [
    body("comment").optional().isString().trim().escape(),
];

module.exports = {
    userValidation,
    getUserProfileByGitHubIdValidation,
    userDeleteValidation,
    userUpdateValidation,
    validateUser,
    commentValidation,
};
