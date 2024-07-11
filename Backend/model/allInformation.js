const mongoose = require("mongoose");

const allInformationSchema = new mongoose.Schema({
  modelName: { type: String, required: true, unique: true },
  previousLength: { type: Number, required: true },
  currentLength: { type: Number, default: 0 },
});

const AllInformation = mongoose.model("AllInformation", allInformationSchema);

module.exports = AllInformation;
