const mongoose = require("mongoose");

const loaCriticalData = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default: "AI Letter of Appreciation writer for Critical Role LOA",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const LoaCritical = mongoose.model("LoaCritical", loaCriticalData);

module.exports = LoaCritical;
