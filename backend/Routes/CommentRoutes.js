const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/CommentControllers');

router.get('/', CommentController.getComments);
router.post('/', CommentController.createComment);

module.exports = router;
