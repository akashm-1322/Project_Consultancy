import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

// List of background colors
const colors = [
  '#f9e0e0', '#f4e8cf', '#dbe4cf', '#cfe4d7',
  '#cfe3f4', '#d8d2f2', '#f2d2ea', '#f7cccc',
];

const Testimonials = () => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newComment, setNewComment] = useState({ name: '', message: '' });
  const [bgColor, setBgColor] = useState(colors[0]);

  const API_URI_COMMENT = 'http://localhost:5500/api/comment';

  // Fetch Comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(API_URI_COMMENT);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Change Comment Index and Background
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? comments.length - 1 : prevIndex - 1));
    changeBackground();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === comments.length - 1 ? 0 : prevIndex + 1));
    changeBackground();
  };

  const changeBackground = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  // Handle Input Changes and Comment Submission
  const handleInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.name || !newComment.message) return;

    try {
      const response = await axios.post(API_URI_COMMENT, newComment);
      setComments((prevComments) => [response.data.comment, ...prevComments]);
      setNewComment({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: bgColor,
        transition: 'background-color 1s ease',
        py: 6,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        }}
      >
        What Our Users Say
      </Typography>
      <Divider sx={{ width: '10%', height: '4px', backgroundColor: '#555', mb: 2 }} />

      {/* Comment Display */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: '90%',
            maxWidth: '600px',
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 5,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          <Avatar sx={{ bgcolor: '#d7ccc8', width: 56, height: 56 }}>
            <AiOutlineUser size={32} />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
          >
            {comments[currentIndex]?.name || 'Loading...'}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
          >
            "{comments[currentIndex]?.message || 'No comments available'}"
          </Typography>
        </Paper>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          startIcon={<FaChevronLeft />}
          sx={{
            textTransform: 'none',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          endIcon={<FaChevronRight />}
          sx={{
            textTransform: 'none',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          Next
        </Button>
      </Box>

      {/* Add Comment Form */}
      <Paper
        elevation={8}
        sx={{
          width: '90%',
          maxWidth: '600px',
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 5,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="600"
          gutterBottom
          sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
        >
          Add Your Comment
        </Typography>
        <TextField
          label="Your Name"
          variant="outlined"
          name="name"
          fullWidth
          value={newComment.name}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Your Comment"
          variant="outlined"
          name="message"
          fullWidth
          multiline
          rows={4}
          value={newComment.message}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCommentSubmit}
          sx={{
            alignSelf: 'flex-end',
            textTransform: 'none',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          Submit Comment
        </Button>
      </Paper>
    </Box>
  );
};

export default Testimonials;
