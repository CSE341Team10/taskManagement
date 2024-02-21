const router = require("express").Router();
const taskController = require("../controllers/taskController");
const { taskValidationRules, validateTask } = require("../middleware/taskValidation");
const { isAuthenticated } = require("../middleware/authenticate");

// GET request for all tasks:
router.get("/", isAuthenticated, taskController.getAllTasks);
// GET request for a single task:
router.get("/:id", isAuthenticated, taskController.getTaskById);
// GET request for all tasks by a specific user:
router.get("/user/:id", isAuthenticated, taskController.getTasksByUserId);
// GET request for all tasks by a specific category:
router.get("/category/:id", isAuthenticated, taskController.getTasksByCategoryId);
// POST request for adding a new task:
router.post("/", isAuthenticated, taskValidationRules(), validateTask, taskController.createTask);
// PUT request for udpating an existing task:
router.put("/:id", isAuthenticated, taskValidationRules(), validateTask, taskController.updateTask);
// DELETE request for deleting an existing task:
router.delete("/:id", isAuthenticated, taskController.deleteTask);

module.exports = router;