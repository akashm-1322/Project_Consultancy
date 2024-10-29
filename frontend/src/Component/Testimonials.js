import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

const testimonials = [
  { name: "John Doe", review: "Great experience with their services!" },
  { name: "Jane Smith", review: "Professional team and helpful guidance." },
];

const Testimonials = () => (
  <Container className= "shadow my-5" style={{background:"#f5eef8"}}>
    <h3 className="text-center">What Our Clients Say</h3>
    <Carousel>
      {testimonials.map((testimony, index) => (
        <Carousel.Item key={index}>
          <p className="text-center">{testimony.review}</p>
          <h5 className="text-center">- {testimony.name}</h5>
        </Carousel.Item>
      ))}
    </Carousel>
  </Container>
);

export default Testimonials;