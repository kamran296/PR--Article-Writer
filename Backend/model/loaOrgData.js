const mongoose = require("mongoose");

const loaOrgData = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default:
          "AI Letter of Appreciation writer for Original Contribution LOA",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const LoaOriginal = mongoose.model("LoaOriginal", loaOrgData);

module.exports = LoaOriginal;
