const express = require('express');
const router = express.Router();
const CountryController = require('../Controllers/CountryControllers');

router.get('/', CountryController.getCountries);
router.post('/', CountryController.createCountry);

module.exports = router;
