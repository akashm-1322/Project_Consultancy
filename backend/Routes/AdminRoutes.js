const express = require('express');
const router = express.Router();
const { createAdmin, getAdmins } = require('../Controllers/AdminControllers');

router.post('/create', createAdmin);
router.get('/all', getAdmins);

module.exports = router;
