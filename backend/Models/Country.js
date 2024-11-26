const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, required: true },
  shapeImage: { type: String }, // Store image URL
  vacancies: { type: Number, required: true },
});

module.exports = mongoose.model('Country', countrySchema);
