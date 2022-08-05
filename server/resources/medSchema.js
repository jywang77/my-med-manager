const mongoose = require("mongoose");

const med = new mongoose.Schema({
  linkedUser: String,
  medName: String,
  dose: String,
  instructions: String,
  time: String,
  freq: String,
  refill: Boolean,
  reminder: Date,
  notes: String,
});

module.exports = mongoose.model("Med", med);
