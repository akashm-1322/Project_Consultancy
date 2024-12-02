import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, required: true },
  shapeImage: { type: String }, // Store image URL
  vacancies: { type: Number, required: true },
});

const Country =  mongoose.model('Country', countrySchema);
export default Country;
