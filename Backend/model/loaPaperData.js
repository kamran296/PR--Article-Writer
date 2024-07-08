const mongoose = require("mongoose");

const loaPaperData = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default:
          "AI Letter of Appreciation writer for Research Paper publication LOA",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const LoaResearch = mongoose.model("LoaResearch", loaPaperData);

module.exports = LoaResearch;
