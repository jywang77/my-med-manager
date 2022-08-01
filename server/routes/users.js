const express = require("express");
const passport = require("passport");
const { genPassword } = require("../resources/passwordUtils");
const User = require("../resources/userSchema");

const router = express.Router();

// login
router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("login failed: " + user);
      return res.status(401).send(false);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log("login successful: " + req.session.passport.user);
      return res.status(200).send(true);
    });
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

    res.status(409).send(usernameEmail);
  }

  if (!existingUsername && !existingEmail) {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      salt: salt,
    });

    newUser.save().then((user) => {
      console.log(user);
    });

    res.status(200).send(true);
  }
});

// logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).send(false);
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
