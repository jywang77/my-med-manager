const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// empty array for dev purposes
const allUsers = [];

// login
router.route("/login").post((req, res) => {
  const loginUser = {
    username: req.body.username,
    password: req.body.password,
  };

  console.log("User logged in: " + JSON.stringify(loginUser));
});

// create account
router.route("/create").post(async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createUser = {
      id: Date.now().toString(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    allUsers.push(createUser);
    console.log("User created: " + JSON.stringify(createUser));
  } catch {
    console.error("Error: user could not be created.");
  }
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
