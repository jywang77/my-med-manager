// imports
const express = require("express");
const History = require("../resources/historySchema");
const isAuth = require("../resources/authMiddleware").isAuth;

const router = express.Router();

// add history
router.post("/add", isAuth, async (req, res) => {
  const existingHistory = await History.findOne({
    linkedUser: req.body.linkedUser,
    linkedMed: req.body.linkedMed,
    date: req.body.date,
    time: req.body.time,
  });
  if (!existingHistory) {
    const newHistory = new History({
      linkedUser: req.body.linkedUser,
      linkedMed: req.body.linkedMed,
      date: req.body.date,
      time: req.body.time,
      checked: req.body.checked,
    });

    await newHistory.save();
  } else {
    res.status(200).send(true);
  }
});

// update history
router.patch("/edit", isAuth, async (req, res) => {
  try {
    updatedHistory = await History.findOneAndUpdate(
      {
        linkedUser: req.body.linkedUser,
        linkedMed: req.body.linkedMed,
        date: req.body.date,
        time: req.body.time,
      },
      {
        checked: req.body.checked,
      },
      { new: true }
    );

    res.status(200).send(updatedHistory);
  } catch (err) {
    res.status(500).console.error(err);
  }
});

// get checkbox info
router.get("/med/:linkedUser/:date", isAuth, async (req, res) => {
  History.find(
    { linkedUser: req.params.linkedUser, date: req.params.date },
    (err, array) => {
      if (err) res.status(500).console.error(err);
      else {
        res.status(200).send(array);
      }
    }
  );
});

module.exports = router;
