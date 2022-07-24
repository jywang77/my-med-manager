const mongoose = require("mongoose");

// storing users into mongodb
const user = new mongoose.Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,
});

module.exports = mongoose.model("User", user);
