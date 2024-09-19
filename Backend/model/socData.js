// models/ALCData.js
const mongoose = require('mongoose');

const alcDataSchema = new mongoose.Schema({
  Area: {
    type: Number,  // Assuming Area is a numeric code (e.g., 10180)
    required: true,
  },
  SocCode: {
    type: String,  // Assuming SocCode can be alphanumeric (e.g., "Nov-32")
    required: true,
  },
  GeoLvl: {
    type: Number,  // Assuming GeoLvl is a numeric value
    required: true,
  },
  Level1: {
    type: Number,  // Assuming Level1 is a numeric value (wage or salary)
    required: true,
  },
  Level2: {
    type: Number,  // Assuming Level2 is a numeric value (wage or salary)
    required: true,
  },
  Level3: {
    type: Number,  // Assuming Level3 is a numeric value (wage or salary)
    required: true,
  },
  Level4: {
    type: Number,  // Assuming Level4 is a numeric value (wage or salary)
    required: true,
  },
  Average: {
    type: Number,  // Assuming Average is a numeric value
    required: true,
  },
  Label: {
    type: String,  // Assuming Label is a string (e.g., "Annual Wage")
    required: true,
  },
});

module.exports = mongoose.model('ALCData', alcDataSchema);
