const mongoose = require('mongoose');

const JobDataSchema = new mongoose.Schema({
  basePayMax: {
    type: Number,
    required: true,
  },
  basePayMin: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('JobData', JobDataSchema);
