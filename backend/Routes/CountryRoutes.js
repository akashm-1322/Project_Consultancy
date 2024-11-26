const express = require('express');
const multer = require('multer');
const { createCountries, getCountries , deleteCountry , updateCountry } = require('../Controllers/CountryControllers');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('shapeImage'), createCountries); // Add a new country
router.get('/', getCountries); // Get all countries

// DELETE route for deleting a country
router.delete('/:id', deleteCountry);

// PUT route for updating a country
router.put('/:id', upload.single('shapeImage'), updateCountry);

module.exports = router;
