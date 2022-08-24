// imports
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const path = require("path");

const app = express();

// connect to mongodb database
mongoose.connect(
  process.env.DB_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose is connected");
  }
);

// session setup
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_STRING,
  collection: "sessions",
});

app.use(
  session({
    key: "user_sid",
    name: "myMedManager",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: true,
      httpOnly: true,
    },
  })
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
require("./resources/passportConfig")(passport);
app.use(cookieParser());

// allows communication with localhost 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);

// importing routes
const usersRouter = require("./routes/users");
const medsRouter = require("./routes/meds");
const historyRouter = require("./routes/history");

app.use("/users", usersRouter);
app.use("/meds", medsRouter);
app.use("/history", historyRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// port
app.listen(process.env.PORT || 3001, () =>
  console.log(`Server started on port ${process.env.PORT || 3001}`)
);
