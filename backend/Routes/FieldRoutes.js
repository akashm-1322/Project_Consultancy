import express from 'express';
import multer from 'multer';

import FieldControllers from "../Controllers/FieldControllers.js";
const { 
    createField, 
    updateField, 
    getFields, 
    deleteField
  } = FieldControllers;

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("imageUrl"), createField); // Add a new field
router.put("/:id", upload.single("imageUrl"), updateField); // Update a field
router.get("/", getFields); // Get all fields
router.delete("/:id", deleteField); // Delete a field

export default router;
