// imports
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../resources/userSchema");
const isAuth = require("../resources/authMiddleware").isAuth;

const router = express.Router();

// login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(false);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(true);
      });
    }
  })(req, res, next);
});

// create account
router.post("/create", async (req, res) => {
  const existingUsername = await User.findOne({ username: req.body.username });
  const existingEmail = await User.findOne({ email: req.body.email });

  if (existingUsername || existingEmail) {
    const usernameEmail = {
      uniqueUsername: existingUsername,
      uniqueEmail: existingEmail,
    };

    res.send(usernameEmail);
  }

  if (!existingUsername && !existingEmail) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: "",
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.send(true);
  }
});

// logout
router.get("/logout", isAuth, (req, res) => {
  req.logout(function (err) {
    if (err) {
      throw err;
    }
    res.send(req.isAuthenticated());
  });
});

// is a user logged in
router.get("/isauth", (req, res) => {
  res.send(req.isAuthenticated());
});

// grabs info of current user that is logged in
router.get("/user", isAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
