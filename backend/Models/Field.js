const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
    names: { type: [String], required: true }, // Array of names
    vacancies: { type: [Number], required: true }, // Array of corresponding vacancies
    imageUrl: { type: String },
    countryData: { type: String, required: true },
})

module.exports = mongoose.model('Field', FieldSchema);
