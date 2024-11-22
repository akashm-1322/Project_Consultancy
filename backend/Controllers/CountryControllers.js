const Country = require('../Models/Country');

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries' });
  }
};

exports.createCountry = async (req, res) => {
  const { name, code, type, shape, totalVacancies } = req.body;
  try {
    const newCountry = new Country({ name, code, type, shape, totalVacancies });
    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating country' });
  }
};
