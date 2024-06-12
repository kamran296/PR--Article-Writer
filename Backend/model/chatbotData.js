const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default:
          "You are a helpful assistant. Answer the user's questions accurately based on the provided data.",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
