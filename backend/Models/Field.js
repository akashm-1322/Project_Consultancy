const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    name: { type: String, required: true },
    vacancies: { type: Number, required: true },
    imageUrl: { type: String },
});

module.exports = mongoose.model('Field', FieldSchema);


