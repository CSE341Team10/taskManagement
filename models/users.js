const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    githubUserId: { type: String, required: true },
    username: { type: String },
    email: { type: String },
    displayName: { type: String },
  });
  
const User = mongoose.model("User", userSchema);

module.exports = { User };