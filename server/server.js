const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allows communication with localhost 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// test
// app.get("/api", (req, res) => {
//   res.json({ users: ["userOne", "userTwo", "userThree"] });
// });

// importing routes
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

// port
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
