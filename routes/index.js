const express = require("express");
const router = express.Router();

/**********************************************
 * Route to use for all User Profile Management
 **********************************************/
router.use("/users", require("./userRoutes"));

module.exports = router;
