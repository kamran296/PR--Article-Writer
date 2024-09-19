// models/AreaData.js
const mongoose = require('mongoose');

const areaDataSchema = new mongoose.Schema({
  AreaCode: {
    type: Number,
    required: true,
  },
  CountyTownName: {
    type: String,
    required: true,
  },
  AreaName: {
    type: String,
    required: true,
  },
  StateAb: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  Area: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('AreaData', areaDataSchema);
