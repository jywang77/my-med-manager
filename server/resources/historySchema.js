const mongoose = require("mongoose");

const history = new mongoose.Schema({
  linkedUser: String,
  linkedMed: String,
  time: String,
  date: String,
  checked: Boolean,
});

module.exports = mongoose.model("History", history);
