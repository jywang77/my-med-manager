// imports
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../resources/userSchema");

const router = express.Router();

// middleware
require("../resources/passportConfig")(passport);

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
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.send(true);
  }
});

// logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      throw err;
    }
    res.send(req.isAuthenticated());
  });
});

// stores the info of the current user that is logged in
router.get("/current", (req, res) => {
  res.send(req.isAuthenticated());
});

module.exports = router;
