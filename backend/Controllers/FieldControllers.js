const Field = require('../Models/Field');

exports.getFields = async (req, res) => {
  try {
    const fields = await Field.find().populate('countryId');
    res.json(fields);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fields' });
  }
};

exports.createField = async (req, res) => {
  const { countryId, name, vacancies, imageUrl } = req.body;
  try {
    const newField = new Field({ countryId, name, vacancies, imageUrl });
    await newField.save();
    res.status(201).json(newField);
  } catch (error) {
    res.status(400).json({ message: 'Error creating field' });
  }
};
