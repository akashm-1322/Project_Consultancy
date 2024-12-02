import Country from '../Models/Country.js'; // Import the Country model
import multer from 'multer';             // Import multer
import axios from 'axios';              // Import axios

const upload = multer({ destination: './uploads' });



const createCountries = async (req, res) => {
  try {
    const { name, code, type, vacancies } = req.body;

    // Check if a country with the same name and type exists
    const existingCountry = await Country.findOne({ name, type });

    if (existingCountry) {
      return res
        .status(400)
        .json({ error: 'Country with the same name and type already exists.' });
    }

    // Create the new country entry
    const newCountry = new Country({
      name,
      code,
      type,
      vacancies,
      shapeImage: `/uploads/${req.file.filename}`, // Save file path
    });

    // Save to the database
    const savedCountry = await newCountry.save();
    res
      .status(201)
      .json({ message: 'Country created successfully', country: savedCountry });
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ error: 'Failed to create country' });
  }
};




// Get all countries
const getCountries = async (req, res) => {
  const { page = 1, limit = 10, sortKey = 'name', sortDirection = 'asc', all = false } = req.query;

  const sortOptions = {};
  if (sortKey) {
    sortOptions[sortKey] = sortDirection === 'asc' ? 1 : -1;
  }

  try {
    let countries;
    if (all === 'true') {
      // Fetch all countries without pagination
      countries = await Country.find().sort(sortOptions);
    } else {
      // Paginated fetch
      countries = await Country.find()
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(Number(limit));
    }

    const total = all === 'true' ? countries.length : await Country.countDocuments();

    res.status(200).json({ countries, total });
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

import fetch from 'node-fetch'; // If using Node.js and fetch is not natively available.

const updateCountryVacancies =  async (req, res) => {
  const { countryId } = req.params;
  const { vacancies } = req.body;

  try {
    // Find the country by ID and update the vacancies field
    const updatedCountry = await Country.findByIdAndUpdate(
      countryId, 
      { $set: { vacancies: vacancies } }, 
      { new: true } // Return the updated document
    );

    if (!updatedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Return the updated country data
    res.json(updatedCountry);
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to handle deleting a country
const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.findByIdAndDelete(id);
    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting country', error });
  }
};

// Update an existing country
const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, type, vacancies } = req.body;
    const shapeImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if another country with the same name and type exists
    const existingCountry = await Country.findOne({ name, _id: { $ne: id } });

    if (existingCountry) {
      if (existingCountry.type === type) {
        return res.status(400).json({ error: 'Another country with the same name and type already exists.' });
      }
    }

    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      { name, code, type, shapeImage, vacancies },
      { new: true }
    );

    res.status(200).json({ message: 'Country updated successfully', country: updatedCountry });
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ error: 'Failed to update country' });
  }
};

export default {createCountries , getCountries , updateCountry , updateCountryVacancies , deleteCountry};