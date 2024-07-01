const mongoose = require("mongoose");

const articleData = new mongoose.Schema({
  messages: [
    {
      role: { type: String, default: "system" },
      content: {
        type: String,
        default: "You are an AI article writer.",
      },
    },
    { role: { type: String, default: "user" }, content: { type: String } },
    { role: { type: String, default: "assistant" }, content: { type: String } },
  ],
});

const Article = mongoose.model("Article", articleData);

modeul.export = Article;
