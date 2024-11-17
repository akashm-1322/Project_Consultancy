// Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc } from '../../../firebaseConfig';
import './Testimonials.css';

const Testimonials = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', message: '' });

  useEffect(() => {
    // Fetch comments when the page loads
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials')); // Fetch comments from Firestore
      const fetchedComments = querySnapshot.docs.map(doc => doc.data());
      setComments(fetchedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.name || !newComment.message) return;

    try {
      // Add comment to Firestore
      await addDoc(collection(db, 'testimonials'), {
        name: newComment.name,
        message: newComment.message,
        createdAt: new Date(),
      });

      // Update state to show the new comment
      setComments(prevComments => [...prevComments, newComment]);
      setNewComment({ name: '', message: '' });
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  const handleInputChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="testimonials-page">
      <div className="banner">
        <h1 className="banner-title">Comments</h1>
        <p className="banner-subtitle">Hear from our users and share your thoughts!</p>
      </div>
      <div className="content">
        <div className="comments-section">
          <h2>Comments:</h2>
          <div className="comments-list">
            {comments.map((comment, idx) => (
              <div key={idx} className="comment">
                <p><strong>{comment.name}:</strong> {comment.message}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="comment-form">
          <h3>Leave a Comment:</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newComment.name}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            placeholder="Your Testimonial"
            value={newComment.message}
            onChange={handleInputChange}
          />
          <button onClick={handleCommentSubmit}>
            Submit Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
