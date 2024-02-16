const User = require("../models/userModels.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersController = {};

/*********************************************************
 * Function to get a list of all user profiles from the database.
 ********************************************************/
usersController.getAllProfiles = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = 'This is to get a list of all user profiles from the database.'
    try {
        const profiles = await User.find({});
        return res.status(200).json(profiles);
    } catch (error) {
        console.error("Error fetching medications:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get a single user profile by githubId from the database.
 ********************************************************/
usersController.getUserProfileByGitHubId = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = 'This is to get a single user from the database.'
    try {
        const githubUserId = req.params.id;
        const user = await User.findOne({ githubUserId: githubUserId});

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to create a user profile
 * ******************************************************/
usersController.createUserProfile = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = 'This is to create a user in the database.'
    try {
        const { username, displayName, firstName, lastName, userRole, email, password, profilePic, githubUserId } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            displayName,
            firstName,
            lastName,
            userRole,
            email,
            password: hashedPassword,
            profilePic,
            githubUserId
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.error("Error creating user profile:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to update the user's profile
 *********************************************************/
usersController.updateUserProfile = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = 'This is to update a user in the database.'
    try {
        const githubUserId = req.params.id;
        const { username, displayName, firstName, lastName, userRole, email, password, profilePic } = req.body;

        updateFields = {
            username,
            displayName,
            firstName,
            lastName,
            userRole,
            email,
            password,
            profilePic,
        };

        if (password && password !== "not provided") {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        const updatedProfile = await User.findOneAndUpdate(
            { githubUserId: githubUserId },
            updateFields,
            {
                new: true,
            }
        );

        if (updatedProfile) {
            res.json({
                message: `${updatedProfile.displayName} has been updated successfully!`,
            });
        } else {
            res.status(404).json({ error: "User profile not found." });
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to delete a user profile
 * ******************************************************/
usersController.deleteUserProfile = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = 'This is to delete a user in the database.'
    try {
        const githubUserId = req.params.id;
        const deletedProfile = await User.findOneAndDelete({ githubUserId: githubUserId });

        if (deletedProfile) {
            res.json({
                message: `${deletedProfile.displayName} has been deleted successfully!`,
            });
        } else {
            res.status(404).json({ error: "User profile not found." });
        }
    } catch (error) {
        console.error("Error deleting user profile:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = usersController;
