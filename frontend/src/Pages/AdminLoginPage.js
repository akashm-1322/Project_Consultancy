// src/pages/AdminLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs } from '../firebaseConfig';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const querySnapshot = await getDocs(collection(db, "admins"));
      const admins = querySnapshot.docs.map(doc => doc.data());

      const admin = admins.find(admin => admin.username === username && admin.password === password);

      if (admin) {
        localStorage.setItem('isAuthenticated', true);  // Store authentication status
        navigate('/home');  // Redirect to home page after successful login
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
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AdminLoginPage;
