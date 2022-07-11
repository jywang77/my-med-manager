const express = require("express");
const router = express.Router();

// login
router.route("/login").post((req, res) => {
  const loginUser = {
    username: req.body.username,
    password: req.body.password,
  };

  console.log("User logged in: " + JSON.stringify(loginUser));
});

// create account
router.route("/create").post((req, res) => {
  const createUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  console.log("User created: " + JSON.stringify(createUser));
});

// access individual users
router
  .route("/id/:id")
  .get((req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
  });

module.exports = router;
