import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import './Testimonials.css';

const Testimonials = () => {
  const [comment, setComment] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newComment, setNewComment] = useState({ name: '', message: '' });
  const [bgColor, setBgColor] = useState('#e9d4d4');  // Initial background color
  
  // List of background colors
  const colors = [
    '#e9d4d4', '#e7e1d9', '#ddded0', '#d2e6ce', 
    '#d6e8ea', '#d3dbe8', '#d2cee4', '#dfcddf',
  ];


  const API_URI_COMMENT = 'http://localhost:5500/api/comment';

  const fetchComments = async () => {
    try {
      const response = await axios.get(API_URI_COMMENT);
      setComment(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? comment.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === comment.length - 1 ? 0 : prevIndex + 1
    );
    changeBackground();  // Change background color when moving to next comment
  };

  const handleInputChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.name || !newComment.message) return;

    try {
      const response = await axios.post('/', newComment);
      setComment((prevComments) => [response.data.comments, ...prevComments]);
      setNewComment({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const changeBackground = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  // Ensure comments are available before rendering
  if (comment.length === 0) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="testimonials-page" style={{ backgroundColor: bgColor }}>
      <h1 className="heading">Comments</h1>
      
      {/* Display the current comment based on currentIndex */}
      {comment.length > 0 && (
        <div className="comment-container">
          <div className="comment-content">
            <AiOutlineUser className="user-icon" />
            <h3>{comment[currentIndex].name}</h3>
            <p>{comment[currentIndex].message}</p>
          </div>
        </div>
      )}
      
      <div className="navigation">
        <button onClick={handlePrevious}>
          <FaChevronLeft />
        </button>
        <button onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className="comment-form" style={{ backgroundColor: bgColor }}>
        <h2>Add Your Comment</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={newComment.name}
          onChange={handleInputChange}
        />
        <textarea
          name="message"
          placeholder="Your Comment"
          value={newComment.message}
          onChange={handleInputChange}
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
    </div>
  );
};

export default Testimonials;
