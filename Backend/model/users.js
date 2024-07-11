const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
    isAdmin: { type: String, default: "member" },
  },
  { timestamps: true }
);

const userdb = new mongoose.model("users", users);

module.exports = userdb;
