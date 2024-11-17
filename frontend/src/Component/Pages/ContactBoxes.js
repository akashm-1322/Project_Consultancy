import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./ContactBoxes.css";

const ContactBoxes = () => {
  return (
    <div className="contact-boxes">
  <div className="contact-box">
    <FaPhone className="contact-icon" />
    <div className="tooltip top">+91 98849 45606</div>
    <div className="tooltip left">82705 28540</div>
  </div>
  <div className="contact-box">
    <FaEnvelope className="contact-icon" />
    <div className="tooltip top">J99Recruitmentservices@gmail.com</div>
  </div>
  <div className="contact-box">
    <FaMapMarkerAlt className="contact-icon" />
    <div className="tooltip top">
      No. 5/1, CS COMPLEX, 1st FLOOR, MULLAI NAGAR, RAYAKOTTA ROAD, HOSUR-635109.
    </div>
  </div>
</div>

  );
};

export default ContactBoxes;
