const mongoose = require("mongoose");

/**********************************************
* Schema for the user collection in MongoDB
**********************************************/
const userSchema = new mongoose.Schema({
    githubUserId: { type: String, required: true },
    username: { type: String, required: true},
    displayName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    userRole: { type: String },
    registrationDate: { type: Date },
    password: { type: String },
    email: { type: String },
    profilePic: { type: String },
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;