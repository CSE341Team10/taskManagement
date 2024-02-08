const express = require("express");
const router = express.Router();

/**********************************************
 * Route to use for all User Profile Management
 **********************************************/
router.use("/users", require("./userRoutes"));

/**********************************************
 * Route to use for comments
 **********************************************/
router.use("/comments", require("./commentRoutes"));

module.exports = router;
