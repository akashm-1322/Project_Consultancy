// seedComments.js
const mongoose = require('mongoose');
const Contact = require('../Models/Contact');  // Assuming your schema is defined in 'models/comment.js'
const {connectMainDB} = require('../Config/db');

const contacts = [
    {
      name: 'Ravi Kumar',
      email: 'ravi.kumar@example.com',
      phone: '9876543210',
      type: 'Study Abroad',
      message: 'I am interested in studying abroad. Please provide details.',
      destination: 'Germany',
      dateofjoining: new Date('2023-05-15'),
    },
    {
      name: 'Aarti Devi',
      email: 'aarti.devi@example.com',
      phone: '9876543211',
      type: 'Work Abroad',
      message: 'I am looking for job opportunities abroad.',
      destination: 'Canada',
      dateofjoining: new Date('2023-06-10'),
    },
    {
      name: 'Suresh Nair',
      email: 'suresh.nair@example.com',
      phone: '9876543212',
      type: 'Travel Abroad',
      message: 'I want to visit beautiful places abroad.',
      destination: 'Switzerland',
      dateofjoining: new Date('2023-07-05'),
    },
    {
      name: 'Priya Reddy',
      email: 'priya.reddy@example.com',
      phone: '9876543213',
      type: 'Language Coaching',
      message: 'I am interested in learning German for my studies.',
      destination: 'German',
      dateofjoining: new Date('2023-08-02'),
    },
    {
      name: 'Vijay Kumar',
      email: 'vijay.kumar@example.com',
      phone: '9876543214',
      type: 'Domestic Placements',
      message: 'Looking for placement opportunities in India.',
      destination: 'India',
      dateofjoining: new Date('2023-06-18'),
    },
    {
      name: 'Anjali Singh',
      email: 'anjali.singh@example.com',
      phone: '9876543215',
      type: 'Study Abroad',
      message: 'I want to pursue higher education in Europe.',
      destination: 'Poland',
      dateofjoining: new Date('2023-09-04'),
    },
    {
      name: 'Rajesh Babu',
      email: 'rajesh.babu@example.com',
      phone: '9876543216',
      type: 'Work Abroad',
      message: 'Please guide me to find work opportunities in the Middle East.',
      destination: 'Saudi Arabia',
      dateofjoining: new Date('2023-07-12'),
    },
    {
      name: 'Geetha Rani',
      email: 'geetha.rani@example.com',
      phone: '9876543217',
      type: 'Travel Abroad',
      message: 'Looking to visit historical sites abroad.',
      destination: 'Italy',
      dateofjoining: new Date('2023-08-20'),
    },
    {
      name: 'Karthik Balan',
      email: 'karthik.balan@example.com',
      phone: '9876543218',
      type: 'Language Coaching',
      message: 'I want to learn a new language for career development.',
      destination: 'German',
      dateofjoining: new Date('2023-05-30'),
    },
    {
      name: 'Sangeetha S',
      email: 'sangeetha.s@example.com',
      phone: '9876543219',
      type: 'Work Abroad',
      message: 'Interested in relocating for work opportunities.',
      destination: 'Australia',
      dateofjoining: new Date('2023-06-25'),
    },
    {
      name: 'Pradeep Raj',
      email: 'pradeep.raj@example.com',
      phone: '9876543220',
      type: 'Travel Abroad',
      message: 'Planning to visit cultural sites abroad.',
      destination: 'Greece',
      dateofjoining: new Date('2023-04-15'),
    },
    {
      name: 'Lakshmi S',
      email: 'lakshmi.s@example.com',
      phone: '9876543221',
      type: 'Study Abroad',
      message: 'I want to explore study opportunities in Asia.',
      destination: 'Singapore',
      dateofjoining: new Date('2023-07-22'),
    },
    {
      name: 'Rohit Sharma',
      email: 'rohit.sharma@example.com',
      phone: '9876543222',
      type: 'Domestic Placements',
      message: 'Looking for job placements within India.',
      destination: 'India',
      dateofjoining: new Date('2023-05-10'),
    },
    {
      name: 'Shalini Rao',
      email: 'shalini.rao@example.com',
      phone: '9876543223',
      type: 'Work Abroad',
      message: 'Interested in job opportunities in Europe.',
      destination: 'Ireland',
      dateofjoining: new Date('2023-06-30'),
    },
    {
      name: 'Arvind Kumar',
      email: 'arvind.kumar@example.com',
      phone: '9876543224',
      type: 'Travel Abroad',
      message: 'Want to experience new cultures while traveling.',
      destination: 'Luxembourg',
      dateofjoining: new Date('2023-07-10'),
    },
    {
      name: 'Deepa Raj',
      email: 'deepa.raj@example.com',
      phone: '9876543225',
      type: 'Language Coaching',
      message: 'Need coaching for learning German to work abroad.',
      destination: 'German',
      dateofjoining: new Date('2023-09-01'),
    },
  ];
 
    // Insert the comments into MongoDB
async function insertContacts() {
    try {
      await connectMainDB();
      await Contact.insertMany(contacts);  // Insert all comments
      console.log('Comments inserted successfully!');
    } catch (error) {
      console.error('Error inserting comments:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  insertContacts();
  