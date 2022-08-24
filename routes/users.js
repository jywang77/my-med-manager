// imports
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../resources/userSchema");
const Med = require("../resources/medSchema");
const History = require("../resources/historySchema");
const isAuth = require("../resources/authMiddleware").isAuth;

const router = express.Router();

// login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) res.status(500).console.error(err);
    if (!user) res.status(200).send(false);
    else {
      req.logIn(user, (err) => {
        if (err) res.status(500).console.error(err);
        res.status(200).send(true);
      });
    }
  })(req, res, next);
});

// create account
router.post("/create", async (req, res) => {
  const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const badUsername = format.test(req.body.username);
  const existingUsername = await User.findOne({ username: req.body.username });
  const existingEmail = await User.findOne({ email: req.body.email });
  const matchPassword = req.body.password === req.body.password2;

  if (badUsername || existingUsername || existingEmail || !matchPassword) {
    res.status(200).send({
      badUsername: badUsername,
      uniqueUsername: existingUsername,
      uniqueEmail: existingEmail,
      matchPassword: matchPassword,
    });
  }

  if (!badUsername && !existingUsername && !existingEmail && matchPassword) {
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
    if (err) res.status(500).console.error(err);
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
    res.status(500).console.error(err);
  }
});

router.patch("/change-username/:id", isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).console.error("Error: user not found");

  const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const badUsername = format.test(req.body.username);
  const existingUsername = await User.findOne({ username: req.body.username });
  if (existingUsername || badUsername) {
    res.status(200).send({
      badUsername: badUsername,
      existingUsername: existingUsername,
    });
  }
  if (!existingUsername && !badUsername) {
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
      res.status(500).console.error(err);
    }
  }
});

router.patch("/change-password/:id", isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).console.error("Error: user not found");

  const matchPassword = req.body.newPassword === req.body.newPassword2;
  const noPassword = req.body.newPassword.length === 0;

  if (!matchPassword || noPassword) {
    res.status(200).send({
      matchPassword: matchPassword,
      noPassword: noPassword,
      rightPassword: true,
    });
  } else {
    // make sure current password matches password in database
    bcrypt.compare(
      req.body.currentPassword,
      user.password,
      async (err, result) => {
        if (err) res.status(500).console.error(err);
        if (!result) {
          res.status(200).send({
            matchPassword: matchPassword,
            noPassword: noPassword,
            rightPassword: false,
          });
        } else {
          try {
            updatedUser = await User.findByIdAndUpdate(
              req.params.id,
              {
                password: await bcrypt.hash(req.body.newPassword, 10),
              },
              { new: true }
            );

            res.status(200).send({
              matchPassword: matchPassword,
              noPassword: noPassword,
              rightPassword: true,
            });
          } catch (err) {
            res.status(500).console.error(err);
          }
        }
      }
    );
  }
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
      res.status(500).console.error(err);
    }
  }
});

router.delete("/delete-account/:id", isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).console.error("Error: user not found");

  // make sure password matches password in database
  bcrypt.compare(req.body.password, user.password, async (err, result) => {
    if (err) res.status(500).console.error(err);

    // if passwords do not match, return false to front end
    if (!result) {
      res.status(200).send(false);
    } else {
      // if passwords match, delete account
      try {
        await User.findByIdAndRemove(req.params.id).exec();
        await Med.deleteMany({ linkedUser: req.params.id });
        await History.deleteMany({ linkedUser: req.params.id });

        res.status(200).send(true);
      } catch (err) {
        res.status(500).console.error(err);
      }
    }
  });
});

module.exports = router;
