const Contact = require('../Models/Contact');

exports.createContact = async (req, res) => {
  const { name, email, phone, type, message, destination, dateofjoining } = req.body;
  try {
    const newContact = new Contact({ name, email, phone, type, message, destination, dateofjoining });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error creating contact' });
  }
};
