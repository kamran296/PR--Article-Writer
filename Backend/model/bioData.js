const mongoose = require("mongoose");

const bioWriterData = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default: "AI professional biography writer",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const BioWriterData = mongoose.model("BioWriterData", bioWriterData);

module.exports = BioWriterData;
