const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const app = express();

// defaults
const {
  PORT = 3001,
  NODE_ENV = "development",
  SESS_LIFETIME = 1000 * 60 * 60 * 24, // 1 day
} = process.env;

const IN_PROD = NODE_ENV === "production";

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
    name: "myMedManager",
    secret: process.env.SESS_SECRET,
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  // For debug, doesnt do anything
  console.log(req.session);
  console.log(req.user);
  next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

// allows communication with localhost 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

// importing routes
const usersRouter = require("./routes/users");
const medsRouter = require("./routes/meds");

app.use("/users", usersRouter);
app.use("/meds", medsRouter);

// port
app.listen(PORT, () => {
  console.log("Server started on port 3001");
});
