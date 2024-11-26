const Country = require('../Models/Country'); // Import the Country model
const multer = require('multer');
const upload = multer({ destination : './uploads' });

// Create a new country
exports.createCountries = async (req, res) => {
  try {
    const { name, code, type, vacancies } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const newCountry = new Country({
      name,
      code,
      type,
      vacancies,
      shapeImage: `/uploads/${req.file.filename}`, // Save file path
    });

    const savedCountry = await newCountry.save();
    res.status(201).json({ message: 'Country created successfully', country: savedCountry });
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ error: 'Failed to create country' });
  }
};

// Get all countries
exports.getCountries = async (req, res) => {
  const { page = 1, limit = 10, sortKey = 'name', sortDirection = 'asc' } = req.query;

  const sortOptions = {};
  if (sortKey) {
    sortOptions[sortKey] = sortDirection === 'asc' ? 1 : -1;
  }

  try {
    // First, get the total count of documents (for pagination purposes)
    const total = await Country.countDocuments();

    // Fetch countries with sorting and pagination
    const countries = await Country.find()
      .sort(sortOptions) // Apply sorting
      .skip((page - 1) * limit) // Pagination: skip previous pages
      .limit(Number(limit)); // Limit results to current page

    res.status(200).json({ countries, total });
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};



// Controller to handle deleting a country
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.findByIdAndDelete(id);
    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting country', error });
  }
};

// Controller to handle editing a country
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, type, vacancies } = req.body;
    const shapeImage = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      { name, code, type, shapeImage, vacancies },
      { new: true }
    );

    res.status(200).json(updatedCountry);
  } catch (error) {
    console.error('Error updating field:', error);
    res.status(500).json({ message: 'Error updating country', error });
  }
};
