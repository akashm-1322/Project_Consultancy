const Field = require('../Models/Field'); 
const multer = require('multer');

// Create a new field
exports.createField = async (req, res) => {
  try {
    const { names, vacancies, countryData } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const newField = new Field({
      names,
      vacancies,
      countryData,
      imageUrl: `/uploads/${req.file.filename}`, // Save file path
    });

    const savedField = await newField.save();
    res.status(201).json({ message: 'Field created successfully', field: savedField });
  } catch (error) {
    console.error('Error creating Field:', error);
    res.status(500).json({ error: 'Failed to create Field' });
  }
};

// Get fields with pagination and sorting
exports.getFields = async (req, res) => {

    const { page = 1, limit = 10, sortKey = 'name', sortDirection = 'asc' } = req.query;

    const sortOptions = {};
    // Sort fields
    if (sortKey) {
      sortOptions[sortKey] = sortDirection === 'asc' ? 1 : -1;
    }

    try {
      // First, get the total count of documents (for pagination purposes)
      const total = await Field.countDocuments();
  
      // Fetch countries with sorting and pagination
      const fields = await Field.find()
        .sort(sortOptions) // Apply sorting
        .skip((page - 1) * limit) // Pagination: skip previous pages
        .limit(Number(limit)); // Limit results to current page
  
      res.status(200).json({ fields, total });
    } catch (error) {
      console.error('Error fetching fields:', error);
      res.status(500).json({ error: 'Failed to fetch fields' });
    }
};

// Update a field
exports.updateField = (req, res) => {
  try {
    const { id } = req.params;
    const { names, vacancies, countryData } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const fieldIndex = Field.findIndex((field) => field.id === parseInt(id, 10));
    if (fieldIndex === -1) {
      return res.status(404).json({ error: 'Field not found' });
    }

    // Update field
    const updatedField = {
      ...Field[fieldIndex],
      names: names || Field[fieldIndex].names,
      vacancies: vacancies || Field[fieldIndex].vacancies,
      countryData: countryData || Field[fieldIndex].countryData,
      imageUrl: imageUrl || Field[fieldIndex].imageUrl,
    };

    Field[fieldIndex] = updatedField;

    res.status(200).json(updatedField);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update field' });
  }
};

// Delete a field
exports.deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    const fie = await Field.findById(id);
    if (!fie) {
    return res.status(404).json({ message: "Field not found." });
    }
    else if (fie && fie.deleted) {
      return res.status(400).json({ message: "Field is already marked as deleted." });
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid field ID format." });
}
    const deletedField = await Field.findByIdAndDelete(id);
    if (!deletedField) {
    return res.status(404).json({ message: "Field not found or already deleted." });
}
    res.status(200).json({ message: 'Field deleted successfully' });
  } catch (error) {
    console.error('Error deleting field:', error);
    res.status(500).json({ message: 'Error deleting field.' });
  }
};
