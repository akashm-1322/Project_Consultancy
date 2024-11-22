const express = require('express');
const router = express.Router();
const ContactController = require('../Controllers/ContactControllers');

router.post('/', ContactController.createContact);

module.exports = router;
