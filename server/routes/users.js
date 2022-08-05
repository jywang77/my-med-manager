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
    if (err) return next(err);
    if (!user) res.status(401).send(false);
    else {
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.status(200).send(true);
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

    res.status(409).send(usernameEmail);
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
    res.status(200).send(true);
  }
});

// logout
router.get("/logout", isAuth, (req, res) => {
  req.logout(function (err) {
    if (err) {
      throw err;
    }
    res.status(200).send(req.isAuthenticated());
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

//-------------------SETTINGS PAGE----------------------

router.patch("/change-name/:id", isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).console.error("Error: user not found");

  try {
    updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/change-username/:id", isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).console.error("Error: user not found");

  const existingUsername = await User.findOne({ username: req.body.username });
  if (existingUsername) {
    res.status(200).send(true);
  } else {
    try {
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
        },
        { new: true }
      );

      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

router.patch("/change-password/:id", isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).console.error("Error: user not found");

  // make sure current password matches password in database
  bcrypt.compare(
    req.body.currentPassword,
    user.password,
    async (err, result) => {
      if (err) throw err;

      // if passwords do not match, return false to front end
      if (!result) {
        res.status(200).send(false);
      } else {
        // if passwords match, update new password and send success message to front end
        try {
          updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              password: await bcrypt.hash(req.body.newPassword, 10),
            },
            { new: true }
          );

          res.status(200).send("Password updated successfully.");
        } catch (err) {
          res.status(500).send(err);
        }
      }
    }
  );
});

router.patch("/change-email/:id", isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).console.error("Error: user not found");

  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    res.status(200).send(true);
  } else {
    try {
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          email: req.body.email,
        },
        { new: true }
      );

      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
