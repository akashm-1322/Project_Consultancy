import Field from '../models/Field.js';  // Import the Field model
import multer from 'multer';          // Import multer
import path from 'path';              // Import path
import fs from 'fs';                  // Import fs


// Add a new field
const createField = async (req, res) => {
  try {
    const { names, vacancies, countryData, fieldData } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    if (!names || !vacancies || !countryData || !fieldData) {
      return res.status(400).json({ message: "All fields are required." });
    }


    const newField = new Field({
      names,
      vacancies,
      countryData,
      fieldData,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    const savedField = await newField.save();
    res.status(201).json({ message: "Field created successfully.", field: savedField });
  } catch (error) {
    console.error("Error adding field:", error);
    res.status(500).json({ message: "Error adding field." });
  }
};

// Update an existing field
const updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const { names, vacancies, countryData, fieldData } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;


    // Handle file deletion if a new image is uploaded
    if (req.file && Field.imageUrl) {
      const oldImagePath = path.join(__dirname, "../uploads", Field.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedField = await Field.findByIdAndUpdate(
      id,
      { names, vacancies, countryData, fieldData },
      { new: true }
    );


    res.status(200).json({ message: "Field updated successfully.", field  : updatedField});
  } catch (error) {
    console.error("Error updating field:", error);
    res.status(500).json({ message: "Error updating field." });
  }
};

// Get all fields
const getFields = async (req, res) => {
  const { page = 1, limit = 10, sortKey = 'name', sortDirection = 'asc', all = false } = req.query;

  const sortOptions = {};
  if (sortKey) {
    sortOptions[sortKey] = sortDirection === 'asc' ? 1 : -1;
  }

  try {
    let fields;
    if (all === 'true') {
      // Fetch all countries without pagination
      fields = await Field.find().sort(sortOptions);
    } else {
      // Paginated fetch
      fields = await Field.find()
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(Number(limit));
    }

    const total = all === 'true' ? fields.length : await Field.countDocuments();

    res.status(200).json({ fields, total });
  } catch (error) {
    console.error('Error fetching fields data:', error);
    res.status(500).json({ error: 'Failed to fetch fields data' });
  }
};


// Delete a field
const deleteField = async (req, res) => {
  try {
    const { id } = req.params;

    const field = await Field.findById(id);

    if (!field) {
      return res.status(404).json({ message: "Field not found." });
    }

    // Handle file deletion
    if (field.imageUrl) {
      const oldImagePath = path.join(__dirname, "../uploads", field.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await Field.findByIdAndDelete(id);
    res.status(200).json({ message: "Field deleted successfully." });
  } catch (error) {
    console.error("Error deleting field:", error);
    res.status(500).json({ message: "Error deleting field." });
  }
};


export default {getFields , createField , updateField , deleteField};