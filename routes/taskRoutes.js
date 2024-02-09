const router = require("express").Router();
const taskController = require("../controllers/taskController");

// GET request for all tasks:
router.get("/", taskController.getAllTasks);
// GET request for a single task:
router.get("/:id", taskController.getTaskById);
// GET request for all tasks by a specific user:
router.get("/user/:id", taskController.getTasksByUserId);
// POST request for adding a new task:
router.post("/", taskController.createTask);
// PUT request for udpating an existing task:
router.put("/:id", taskController.updateTask);
// DELETE request for deleting an existing task:
router.delete("/:id", taskController.deleteTask);

module.exports = router;