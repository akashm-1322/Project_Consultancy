// src/components/DataDisplay.js
import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../firebaseConfig'; // Import Firestore methods

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts")); // Fetch documents from "contacts"
        const contactsData = querySnapshot.docs.map(doc => doc.data()); // Map through the docs and get the data
        setData(contactsData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array means it will run once on mount

  return (
    <div className="data-display">
      <h1>Contacts Data</h1>
      <table>
        <thead>
          <tr>
            <th>Designation</th>
            <th>Email</th>
            <th>Message</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.designation}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
