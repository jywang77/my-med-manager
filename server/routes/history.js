// imports
const express = require("express");
const History = require("../resources/historySchema");
const isAuth = require("../resources/authMiddleware").isAuth;

const router = express.Router();

// add history
router.post("/add", isAuth, async (req, res) => {
  // search in db to see if exists
  // if exists, next
  // if does not exist, send back true
  console.log(req.body);
});

// edit checkbox true false
router.patch("/edit", isAuth, async (req, res) => {});

// get checkbox info for a medication
router.get("/med", isAuth, async (req, res) => {});

module.exports = router;
