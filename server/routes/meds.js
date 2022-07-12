const express = require("express");
const router = express.Router();

// add medication
router.post("/add", (req, res) => {
  res.send("This will add a new med");
});

// edit a medication
router.patch("/edit", (req, res) => {
  res.send("This will edit med info");
});

// delete a medication
router.delete("/delete", (req, res) => {
  res.send("This will delete a med");
});

// get list of all medications
router.get("/all", (req, res) => {
  res.send("This will get a list of all meds");
});

module.exports = router;
