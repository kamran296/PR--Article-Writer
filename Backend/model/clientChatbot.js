const mongoose = require("mongoose");

const clientChatSchema = new mongoose.Schema({
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

const ClientChatbot = mongoose.model("ClientChatbot", clientChatSchema);
module.exports = ClientChatbot;
