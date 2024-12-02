import Comment from '../Models/Comment.js';

// Create Comment
const createComment = async (req, res) => {
  try {
    const { name, message } = req.body;
    const comment = new Comment({ name, message });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

// Get Comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

export default { createComment, getComments };
