// imports
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require("../resources/userSchema");

const router = express.Router();

// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

router.use(cookieParser("secretcode"));
router.use(passport.initialize());
router.use(passport.session());
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

// stores the info of the current user that is logged in
router.get("/current", (req, res) => {
  res.send(req.user);
});

// logout
router.post("/logout", (req, res) => {
  res.send("logout route");
});

module.exports = router;
