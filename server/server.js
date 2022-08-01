const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

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
  "mongodb+srv://admin:moeX15jHKnqiO8nd@cluster0.n2ad1.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose is connected");
  }
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
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
