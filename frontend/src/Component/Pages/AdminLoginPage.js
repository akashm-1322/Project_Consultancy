import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs } from '../../firebaseConfig';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Function to validate the password strength
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setPasswordError('');

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.');
      setLoading(false);
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, 'admins'));
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
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AdminLoginPage;
