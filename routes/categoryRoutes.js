const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { isAuthenticated } = require("../middleware/authenticate");
const {
  categoryValidation,
  validateCategory,
  categoryDeleteValidation,
  categoryGetByTaskIdValidation,
  categoryGetValidation,
  categoryUpdateValidation,
} = require("../middleware/categoryValidation");

// GET all categorys:
router.get("/", validateCategory, categoryController.getAllCategories);

// GET a single category:
router.get("/:id", categoryGetValidation, categoryController.getCategoryById);

// POST for adding a new category:
router.post(
  "/",
  isAuthenticated,
  categoryValidation,
  categoryController.createCategory
);

// PUT udpating category by id:
router.put(
  "/:id",
  isAuthenticated,
  categoryUpdateValidation,
  categoryController.updateCategory
);

// DELETE existing category by id:
router.delete(
  "/:id",
  isAuthenticated,
  categoryDeleteValidation,
  categoryController.deleteCategory
);

module.exports = router;
