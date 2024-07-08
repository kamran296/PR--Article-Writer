const mongoose = require("mongoose");

const modelList = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
  },
  { timestamps: true }
);

const ModelList = mongoose.model("ArticleModel", modelList);
module.exports = ModelList;
