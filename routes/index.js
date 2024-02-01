const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAuthenticated } = require("../middleware/authenticate");

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

// Route to serve home message
router.get("/", async (req, res) => {
    try {
      if (req.session.user !== undefined) {
        // If user is logged in, retrieve user details from the database
        const userFromDB = await findOne({ githubUserId: req.session.user.id });
  
        if (userFromDB) {
          // Use display name from the database if available
          res.send(`Logged in as ${userFromDB.displayName}`);
        } else {
          // Use GitHub display name if not available in the database
          res.send(`Logged in as ${req.session.user.displayName}`);
        }
      } else {
        // User is not logged in
        res.send("Logged out");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  });

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

module.exports = router;