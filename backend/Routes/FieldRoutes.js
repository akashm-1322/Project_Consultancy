const express = require('express');
const router = express.Router();
const FieldController = require('../Controllers/FieldControllers');

router.get('/', FieldController.getFields);
router.post('/', FieldController.createField);

module.exports = router;
