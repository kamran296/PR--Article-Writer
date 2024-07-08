const mongoose = require("mongoose");

const lorData = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default: "AI Letter of Recommendation writer",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const LorData = mongoose.model("LorData", lorData);

module.exports = LorData;
