// src/pages/AdminPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataDisplay from '../Component/DataDisplay'; // Assuming DataDisplay is your component for displaying data
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      navigate('/admin-login');
    } else {
      // Redirect to home page if the admin is authenticated
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="admin-page">
      <div className="admin-content">
        <h2 className="admin-title">Admin Dashboard</h2>
        <p className="admin-subheading">Manage the data and users efficiently</p>
        <DataDisplay />
      </div>
    </div>
  );
};

export default AdminPage;
