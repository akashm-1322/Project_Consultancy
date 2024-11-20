// Models/Contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  destination: { type: String, required: true },
  message: { type: String, required: true },
  dateofjoining: {type: String, required: true},
});

module.exports = ContactSchema;
