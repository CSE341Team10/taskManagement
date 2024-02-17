const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

// GET all categorys:
router.get("/", categoryController.getAllCategories);

// GET a single category:
router.get("/:id", categoryController.getCategoryById);

// GET all categorys by task:
router.get("/task/:id", categoryController.getCategoriesByTaskId);

// POST for adding a new category:
router.post("/", categoryController.createCategory);

// PUT udpating category by id:
router.put("/:id", categoryController.updateCategory);

// DELETE existing category by id:
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
