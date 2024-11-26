const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
