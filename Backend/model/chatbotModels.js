const mongoose = require("mongoose");

const chatbotModel = new mongoose.Schema(
  {
    model: {
      type: String,
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("ChatModel", chatbotModel);
module.exports = chatModel;
