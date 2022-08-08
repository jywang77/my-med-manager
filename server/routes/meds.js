// imports
const express = require("express");
const Med = require("../resources/medSchema");
const isAuth = require("../resources/authMiddleware").isAuth;

const router = express.Router();

// add medication
router.post("/add", isAuth, async (req, res) => {
  const newMed = new Med({
    linkedUser: req.body.linkedUser,
    medName: req.body.medName,
    dose: req.body.dose,
    instructions: req.body.instructions,
    time: {
      breakfast: req.body.time.breakfast,
      lunch: req.body.time.lunch,
      dinner: req.body.time.dinner,
      bedtime: req.body.time.bedtime,
    },
    freq: {
      sun: req.body.freq.sun,
      mon: req.body.freq.mon,
      tues: req.body.freq.tues,
      wed: req.body.freq.wed,
      thurs: req.body.freq.thurs,
      fri: req.body.freq.fri,
      sat: req.body.freq.sat,
    },
    refill: req.body.refill,
    refillDate: req.body.refillDate,
    reminderDate: req.body.reminderDate,
    notes: req.body.notes,
  });
  await newMed.save();
  res.status(200).send(true);
});

// edit a medication
router.patch("/edit/:id", isAuth, (req, res) => {
  res.send("This will edit med info");
});

// delete a medication
router.delete("/delete/:id", isAuth, (req, res) => {
  res.send("This will delete a med");
});

// get details for a medication
router.get("/med/:id", isAuth, (req, res) => {
  res.send("This will get the info of a particular med for editing");
});

// get list of all medications for a user
router.get("/all/:linkedUser", isAuth, (req, res) => {
  res.send("This will get a list of all meds");
});

module.exports = router;
