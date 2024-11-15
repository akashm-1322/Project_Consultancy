// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Add getDocs and collection
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzSuVBCoUNJgViror0_UTJVGeWnlnbm1Q",
  authDomain: "j22datafile.firebaseapp.com",
  projectId: "j22datafile",
  storageBucket: "j22datafile.appspot.com",
  messagingSenderId: "542364516428",
  appId: "1:542364516428:web:9d38dcf2257808b26434e9",
  measurementId: "G-PMZ8VCTR9K"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // Initialize Firestore instance
const analytics = getAnalytics(firebaseApp); // Optional: Initialize Analytics

// Export Firestore instance and analytics (optional)
export { db, analytics, collection, getDocs }; // Export collection and getDocs
