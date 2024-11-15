// src/pages/OpeningPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import { db, collection, getDocs } from './firebaseConfig';
import './OpeningPage.css';

const OpeningPage = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserLogin = () => {
    // Redirect to main user application
    navigate('/home');
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const querySnapshot = await getDocs(collection(db, 'admins'));
      const admins = querySnapshot.docs.map(doc => doc.data());

      const admin = admins.find(admin => admin.username === username && admin.password === password);

      if (admin) {
        localStorage.setItem('isAuthenticated', true); // Store authentication status
        navigate('/home'); // Redirect to main app for authenticated admin
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Error connecting to database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="opening-page">
      <div className="page-content">
        <h1 className="title">Welcome to Our Application</h1>
        <p className="subheading">Select your role to continue:</p>

        {!isAdminLogin ? (
          <div className="button-container">
            <button onClick={handleUserLogin} className="button user-button">
              <FaUser className="button-icon" /> User Page
            </button>

            <button onClick={() => setIsAdminLogin(true)} className="button admin-button">
              <FaSignInAlt className="button-icon" /> Admin Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminLogin} className="admin-login-form">
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={() => setIsAdminLogin(false)} className="back-button">Back</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OpeningPage;
