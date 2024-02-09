const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));

/**********************************************
 * Route to use for all User Profile Management
 **********************************************/
router.use("/users", require("./userRoutes"));

router.use("/tasks", require("./taskRoutes"));

module.exports = router;
