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
    reminderDate2: req.body.reminderDate2,
    notes: req.body.notes,
  });
  await newMed.save();
  res.status(200).send(true);
});

// edit a medication
router.put("/edit/:id", isAuth, async (req, res) => {
  try {
    updatedMed = await Med.findByIdAndUpdate(
      req.params.id,
      {
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
        reminderDate2: req.body.reminderDate2,
        notes: req.body.notes,
      },
      { new: true }
    );

    res.status(200).send(true);
  } catch (err) {
    res.status(500).console.error(err);
  }
});

// delete a medication
router.delete("/delete/:id", isAuth, async (req, res) => {
  try {
    await Med.findByIdAndRemove(req.params.id).exec();
    res.status(200).send(true);
  } catch (err) {
    res.status(500).console.error(err);
  }
});

// get details for a medication
router.get("/med/:id", isAuth, (req, res) => {
  Med.findById(
    req.params.id,
    (err, array) => {
      if (err) res.status(500).console.error(err);
      else {
        res.status(200).send(array);
      }
    },
    { new: true }
  );
});

// get list of all medications for a user
router.get("/all/:linkedUser", isAuth, (req, res) => {
  Med.find({ linkedUser: req.params.linkedUser }, (err, array) => {
    if (err) res.status(500).console.error(err);
    else {
      res.status(200).send(array);
    }
  });
});

// edit refill date
router.patch("/delete-refill/:id", isAuth, async (req, res) => {
  await Med.findByIdAndUpdate(
    req.params.id,
    { reminderDate2: null },
    (err, cb) => {
      if (err) res.status(500).console.error(err);
      else {
        res.status(200).send(true);
      }
    }
  ).clone();
});

module.exports = router;
