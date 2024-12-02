// seedComments.js
const mongoose = require('mongoose');
const Comment = require('../Models/Comment');  // Assuming your schema is defined in 'models/comment.js'
const {connectMainDB} = require('../Config/db');

const comments = [
    // 25 positive comments
    { name: "Rajesh", message: "J99 Consultancy Recruitment Services is excellent! They helped me land my dream job." },
    { name: "Suresh", message: "The team at J99 Consultancy is very professional. Great experience!" },
    { name: "Arun", message: "I had a fantastic experience with J99 Consultancy. They provided great support throughout the hiring process." },
    { name: "Vijay", message: "I'm very happy with J99 Consultancy's services. Highly recommend them!" },
    { name: "Ananya", message: "Thanks to J99 Consultancy, I was able to find the right job opportunity quickly." },
    { name: "Naren", message: "Great job by J99 Consultancy! They have a strong network of employers and great services." },
    { name: "Prakash", message: "J99 Consultancy really helped me navigate the job market with their expert guidance." },
    { name: "Ravi", message: "Very professional team at J99 Consultancy. They understand the job market well." },
    { name: "Priya", message: "Thanks to J99 Consultancy, I got a fantastic offer! The whole process was smooth and easy." },
    { name: "Hari", message: "The support provided by J99 Consultancy was top-notch. Truly appreciate their work." },
    { name: "Mani", message: "Amazing experience working with J99 Consultancy. They are incredibly helpful and prompt." },
    { name: "Venkat", message: "J99 Consultancy was very helpful in my job search, and they supported me every step of the way." },
    { name: "Shruti", message: "I am grateful to J99 Consultancy for helping me land a job that perfectly suits my skills." },
    { name: "Siva", message: "Highly satisfied with the services offered by J99 Consultancy. They really helped me find the right role." },
    { name: "Kumar", message: "J99 Consultancy helped me connect with the right employer. Fantastic service!" },
    { name: "Ganesh", message: "I am extremely happy with the professional services of J99 Consultancy." },
    { name: "Prabu", message: "Great job by J99 Consultancy! The recruitment process was easy and effective." },
    { name: "Bala", message: "I highly recommend J99 Consultancy for anyone looking for jobs in the South Indian market." },
    { name: "Vikram", message: "The team at J99 Consultancy is incredibly helpful and knowledgeable." },
    { name: "Ajay", message: "Thanks to J99 Consultancy, I was able to get multiple job offers in a short period." },
    { name: "Sankar", message: "Professional and efficient! J99 Consultancy helped me secure a job that matches my skill set." },
    { name: "Anil", message: "Very supportive team! J99 Consultancy helped me throughout the hiring process." },
    { name: "Aishwarya", message: "Highly recommend J99 Consultancy. They provided excellent services to me!" },
    { name: "Senthil", message: "I had an amazing experience with J99 Consultancy. Very reliable and effective." },
    { name: "Saravanan", message: "The team at J99 Consultancy was extremely professional and helpful in my job search." },
    { name: "Jagan", message: "I am thankful to J99 Consultancy for their support. They truly understand the recruitment process." },
  
    // 25 mixed (positive-negative) comments (70% positive, 30% negative)
    { name: "Divya", message: "J99 Consultancy was helpful at first, but I felt a bit lost during the later stages of the process." },
    { name: "Saran", message: "J99 Consultancy was great at first, but I did not get enough updates about my application. Still, they helped me get a job in the end." },
    { name: "Sathya", message: "The team was nice, but I wish they had communicated more regularly about the job opportunities." },
    { name: "Deepak", message: "J99 Consultancy was helpful initially, but the job placement process took longer than expected." },
    { name: "Karthik", message: "I had a good experience, but the interview preparation could have been more detailed." },
    { name: "Sreya", message: "Very professional service, but I was not happy with the response time when I needed updates." },
    { name: "Vignesh", message: "The experience was okay, but I felt that the consultancy could have done a better job of matching my skills to jobs." },
    { name: "Likith", message: "J99 Consultancy helped me land a job, but I felt the communication was a bit slow at times." },
    { name: "Sridhar", message: "Good service, but the recruitment process could have been more transparent." },
    { name: "Kavya", message: "I was satisfied with the job placement, but the consultancy could improve its follow-up during the process." },
    { name: "Hitesh", message: "Great service, but I felt that the job matches could have been more in line with my qualifications." },
    { name: "Surya", message: "J99 Consultancy was helpful, but I did not get much support during the interview phase." },
    { name: "Raghav", message: "I am happy with my job, but I wish the team had been more responsive to my queries." },
    { name: "Rakshan", message: "Good consultancy, but I was disappointed by the lack of updates during the job search." },
    { name: "Arav", message: "The team was professional, but I felt a lack of personalization in the job opportunities they presented." },
    { name: "Adithya", message: "I had mixed feelings. I got a job, but the process was not as smooth as I hoped." },
    { name: "Nandini", message: "J99 Consultancy provided great service but I didn’t get enough options that fit my preferences." },
    { name: "Kishan", message: "I had an okay experience. The support was good, but there was a lack of transparency at times." },
    { name: "Raja", message: "The consultancy helped me land a job, but they could have been more responsive during the recruitment stages." },
    { name: "Gautam", message: "Great service, but I felt the job suggestions could have been more aligned with my career goals." },
    { name: "Keerthi", message: "J99 Consultancy helped me secure a job, but I wasn’t impressed by the initial communication." },
    { name: "Gaurav", message: "The team was helpful, but I didn’t feel they fully understood my career objectives." },
    { name: "Babu", message: "Overall good, but I felt the consultancy could have been more transparent about the timeline." },
    { name: "Udhay", message: "Satisfied with the service, but I didn’t get enough guidance before the interviews." },
    { name: "Jagan", message: "Good overall, but I wished there were more communication during the selection process." },
    { name: "Kavya", message: "The process took longer than expected, but I appreciate the job placement in the end." }
  ];

  // Insert the comments into MongoDB
async function insertComments() {
    try {
      await connectMainDB();
      await Comment.insertMany(comments);  // Insert all comments
      console.log('Comments inserted successfully!');
    } catch (error) {
      console.error('Error inserting comments:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  insertComments();