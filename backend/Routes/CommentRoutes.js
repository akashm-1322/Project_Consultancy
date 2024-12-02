import express from 'express';
const router = express.Router();

import CommentControllers from '../Controllers/CommentControllers.js';
const { createComment, getComments } = CommentControllers;

router.post('/', createComment);
router.get('/', getComments);

export default router;
