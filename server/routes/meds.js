const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("This will store users' meds info");
});

module.exports = router;
