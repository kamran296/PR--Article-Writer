// const mongoose = require("mongoose");

// const users = new mongoose.Schema(
//   {
//     googleId: String,
//     displayName: String,
//     email: String,
//     image: String,
//     isAdmin: { type: String, default: "member" },
//   },
//   { timestamps: true }
// );

// const userdb = new mongoose.model("users", users);

// module.exports = userdb;

const mongoose = require("mongoose");
const crypto = require("crypto");

// Encryption setup
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes
const IV = crypto.randomBytes(16); // Initialization vector

function encrypt(text) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    IV
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${IV.toString("hex")}:${encrypted}`; // Combine IV and encrypted data
}

const users = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
    isAdmin: {
      type: String,
      default: "TealpI9ODeNqwU+16wxYh1nEvegpSGmGNpudWQu+U50=",
      // Encrypt the value before saving
    },
  },
  { timestamps: true }
);

const userdb = mongoose.model("users", users);

module.exports = userdb;
