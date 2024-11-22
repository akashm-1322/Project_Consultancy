const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminControllers');

router.post('/login', AdminController.login);

module.exports = router;
