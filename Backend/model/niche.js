const mongoose = require("mongoose");

const nicheData = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default: "Niche Determination AI",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const NicheData = mongoose.model("NicheData", nicheData);

module.exports = NicheData;
