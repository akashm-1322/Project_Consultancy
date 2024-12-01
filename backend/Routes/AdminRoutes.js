const express = require('express');
const router = express.Router();
const { createAdmin, getAdmins , loginAdmin} = require('../Controllers/AdminControllers');

router.post('/', createAdmin);
router.get('/', getAdmins);
router.post('/login', loginAdmin); 

module.exports = router;
