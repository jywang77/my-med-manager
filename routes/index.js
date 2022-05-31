const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = connection.models.User;
//const isAuth = require("./authMiddleware").isAuth;

// POST

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

router.post("/register", (req, res, next) => {
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

  res.redirect("/");
});

// GET

router.get("/", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form><a href="/register">Create account</a>';

  res.send(form);
});

router.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Email:<br><input type="email" name="email">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br>Confirm Password:<br><input type="password" name="confirmPassword">\
                    <br><br><input type="submit" value="Submit"></form><a href="/">Log in</a>';

  res.send(form);
});

router.get("/dashboard", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send('<h1>Dashboard</h1><p><a href="/logout">Logout</a></p>');
  } else {
    res.send('<h1>You are not authenticated</h1><p><a href="/">Login</a></p>');
  }
});

// Logs the user out and sends them back to the home page
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/login-success", (req, res, next) => {
  res.redirect("/dashboard");
});

router.get("/login-failure", (req, res, next) => {
  res.send("Username and password does not match.");
});

module.exports = router;
