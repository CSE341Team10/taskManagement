const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAuthenticated } = require("../middleware/authenticate");
const comment = require("./commentRoutes");

router.use("/", require("./swagger"));

/**********************************************
 * Route to use for all User Profile Management
 **********************************************/
router.use("/users", require("./userRoutes"));

/**********************************************
 * Route to use for task management
 **********************************************/
router.use("/tasks", require("./taskRoutes"));

/**********************************************
 * Route to use for comments
 **********************************************/
router.use("/comments", isAuthenticated, comment);

/**********************************************
 * Route to use for categories
 **********************************************/
router.use("/categories", require("./categoryRoutes"));

/**********************************************
 * The next 4 router.get routes are for OAuth2.0 with GitHub
 **********************************************/
// Login with GitHub
router.get("/login", passport.authenticate("github"), (req, res) => {});
// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
// Route to serve home message based on user login status
router.get("/", async (req, res) => {
  try {
    if (req.session.user !== undefined) {
      // If user is logged in, retrieve user details from the session
      const userFromSession = req.session.user;
      // Use display name from the session
      res.send(`Logged in as ${userFromSession.displayName}`);
    } else {
      // User is not logged in
      res.send("Logged out");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});
// router.get(
//     "/github/callback",
//     passport.authenticate("github", {
//         failureRedirect: "/api-docs",
//         session: false,
//     }),
//     (req, res) => {
//         req.session.user = req.user;
//         res.redirect("/");
//     }
// );

module.exports = router;
