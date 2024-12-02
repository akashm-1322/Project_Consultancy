import express from 'express';
const router = express.Router();
import AdminControllers from '../Controllers/AdminControllers.js';
const { createAdmin, getAdmins , loginAdmin} = AdminControllers;

router.post('/', createAdmin);
router.get('/', getAdmins);
router.post('/login', loginAdmin); 

export default router;
