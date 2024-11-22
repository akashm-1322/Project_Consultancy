const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    type: { 
        type: String, 
        enum: ['work abroad', 'study abroad', 'language coaching'], 
        required: true 
    },
    shape: { type: String, required: true }, // Image URL or base64
    totalVacancies: { type: Number, default: 0 },
});

module.exports = mongoose.model('Country', CountrySchema);
