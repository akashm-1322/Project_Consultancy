const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  names: {
    type: [String],
    required: true,
  },
  vacancies: {
    type: [Number],
    required: true,
  },
  countryData: {
    type: String,
    required: true,
  },
  fieldData: {
    type: String,
    required: true, // Set as required for creation but optional for updates
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Field", FieldSchema);
