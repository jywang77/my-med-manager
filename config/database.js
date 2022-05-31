const mongoose = require("mongoose");

require("dotenv").config();

// Database

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  hash: String,
  salt: String,
});

const User = connection.model("User", UserSchema);

// Export the connection

module.exports = connection;
