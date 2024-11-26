const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createField , getFields , updateField , deleteField} = require('../Controllers/FieldControllers');

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


// Routes for managing fields
router.post('/',upload.single('imageUrl'), createField);
router.get('/', getFields);
router.put('/:id', updateField);
router.delete('/:id', deleteField);

module.exports = router;
