import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Footer = () => (
  <footer className="bg-dark text-white py-4">
    <Container>
    <h3 className='text-center'>Contact Info</h3>
        <Col className="d-flex fs-5 text-right justify-content-center">
          <div>
          <p><FaLocationDot/> Address</p>
          <p><FaPhone/> Phone 1</p>
          <p><FaPhone/> Phone 2</p>
          <p><IoIosMail/> Mail</p>
          <div style={{ display : 'flex' , flexDirection : 'row' , columnGap : '10px'}}>
            <div><FaFacebook style={{ color: '#3b5998' , borderRadius: '50%' , fontSize: '32px'}}/></div>
            <div><FaInstagram style={{ color: '#e1306c' , borderRadius: '50%' , fontSize: '32px'}}/></div>
            <div><FaWhatsapp style={{ color: '#25d366' , borderRadius: '50%' , fontSize: '32px'}}/></div>
            <div><FaTwitter style={{ color: '#1da1f2' , borderRadius: '50%' , fontSize: '32px'}}/></div>
          </div>
          </div>
        </Col>
    </Container>
  </footer>
);

export default Footer;