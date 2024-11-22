import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import './Testimonials.css';

const Testimonials = () => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newComment, setNewComment] = useState({ name: '', message: '' });

  const colors = [
    '#e9d4d4',
    '#e7e1d9',
    '#ddded0',
    '#d2e6ce',
    '#d6e8ea',
    '#d3dbe8',
    '#d2cee4',
    '#dfcddf',
  ];

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('/comments'); // Replace with your backend API endpoint
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? comments.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === comments.length - 1 ? 0 : prevIndex + 1
    );
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
      const response = await axios.post('/comments', newComment); // Replace with your backend API endpoint
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (comments.length === 0) {
    return <p>Loading comments...</p>;
  }

  const randomColor =
    colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="testimonials-page">
      <h1 className="heading">Comments</h1>
      <div className="comment-container" style={{ backgroundColor: randomColor }}>
        <div className="comment-content">
          <AiOutlineUser className="user-icon" />
          <h3>{comments[currentIndex].name}</h3>
          <p>{comments[currentIndex].message}</p>
        </div>
        <div className="navigation">
          <button onClick={handlePrevious}>
            <FaChevronLeft />
          </button>
          <button onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="comment-form" style={{ backgroundColor: randomColor }}>
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
