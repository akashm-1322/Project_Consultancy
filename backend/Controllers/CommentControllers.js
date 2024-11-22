const Comment = require('../Models/Comment');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

exports.createComment = async (req, res) => {
  const { name, message } = req.body;
  try {
    const newComment = new Comment({ name, message });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating comment' });
  }
};
