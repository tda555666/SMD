const mongoose = require("mongoose");

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date().getTime(),
  },
  refreshToken: {
    type: String
  }
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
