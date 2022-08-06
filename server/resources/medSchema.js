const mongoose = require("mongoose");

const med = new mongoose.Schema({
  linkedUser: String,
  medName: String,
  dose: String,
  instructions: String,
  time: {
    breakfast: Boolean,
    lunch: Boolean,
    dinner: Boolean,
    bedtime: Boolean,
  },
  freq: {
    sun: Boolean,
    mon: Boolean,
    tues: Boolean,
    wed: Boolean,
    thurs: Boolean,
    fri: Boolean,
    sat: Boolean,
  },
  refill: Boolean,
  refillDate: Date,
  reminderDate: Date,
  notes: String,
});

module.exports = mongoose.model("Med", med);
