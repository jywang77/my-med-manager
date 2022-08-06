// imports
const express = require("express");
const Meds = require("../resources/medSchema");
const isAuth = require("../resources/authMiddleware").isAuth;

const router = express.Router();

// add medication
router.post("/add", isAuth, (req, res) => {
  res.send(true);
});

// edit a medication
router.patch("/edit", isAuth, (req, res) => {
  res.send("This will edit med info");
});

// delete a medication
router.delete("/delete", isAuth, (req, res) => {
  res.send("This will delete a med");
});

// get list of all medications
router.get("/all", isAuth, (req, res) => {
  res.send("This will get a list of all meds");
});

module.exports = router;
