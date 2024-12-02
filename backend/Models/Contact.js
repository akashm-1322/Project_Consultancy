import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String },
  message: { type: String },
  destination: { type: String },
  dateofjoining: { type: Date },
});

const Contact =  mongoose.model('Contact', contactSchema);
export default Contact;
