import express from 'express';
const router = express.Router();

import DepartmentControllers from "../Controllers/DepartmentControllers.js";
const {getDepartments , addDepartments } = DepartmentControllers;

router.get("/", getDepartments); // Get all fields
router.post("/", addDepartments); // Delete a field

export default router;
