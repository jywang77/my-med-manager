const mongoose = require("mongoose");

const med = new mongoose.Schema({
  id: String,
  med: {
    medName: String,
    dose: String,
    unit: String,
    instructions: String,
    time: String,
    freq: String,
    refill: Boolean,
    reminder: Date,
    notes: String,
  },
});

module.exports = mongoose.model("Med", med);
