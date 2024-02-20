const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { isAuthenticated } = require("../middleware/authenticate");

// GET all categorys:
router.get("/", categoryController.getAllCategories);

// GET a single category:
router.get("/:id", categoryController.getCategoryById);

// GET all categorys by task:
router.get("/task/:id", categoryController.getCategoriesByTaskId);

// POST for adding a new category:
router.post("/", isAuthenticated, categoryController.createCategory);

// PUT udpating category by id:
router.put("/:id", isAuthenticated, categoryController.updateCategory);

// DELETE existing category by id:
router.delete("/:id", isAuthenticated, categoryController.deleteCategory);

module.exports = router;
