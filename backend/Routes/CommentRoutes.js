const express = require('express');

module.exports = (Comment) => {
  const router = express.Router();

  // Get all comments
  router.get('/', async (req, res) => {
    try {
      const comments = await Comment.find().sort({ createdAt: -1 });
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Error fetching comments' });
    }
  });

  // Add a new comment
  router.post('/', async (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required' });
    }

    try {
      const newComment = new Comment({ name, message });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error saving comment:', error);
      res.status(500).json({ message: 'Error saving comment' });
    }
  });

  return router;
};
