// src/components/ContactPage.js

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css'; // We'll create this CSS file for styles
import Navbar from './Navbar';
import "@fortawesome/fontawesome-free/css/all.min.css";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { name, email, message } = formData;
  
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'dhruvkapoor1290@gmail.com', 
    };
  
    const userId = 'LwC1q78tlt7K31RBL'; 
  
    emailjs
      .send('service_68iq72h', 'template_s8h57lv', templateParams, userId)
      .then(
        (response) => {
          setStatusMessage('Message sent successfully, We have received your enquiry.');
          console.log('Email sent successfully:', response);
        },
        (error) => {
          setStatusMessage('Failed to send message. Please try again later.');
          console.error('Failed to send email:', error);
        }
      );
  

    emailjs
      .send('service_68iq72h', 'template_p5w3n4e', templateParams, userId)
      .then(
        (response) => {
          setStatusMessage('Message sent successfully to customer!');
          console.log('Customer email sent successfully:', response);
        },
        (error) => {
          setStatusMessage('Failed to send message to customer. Please try again later.');
          console.error('Failed to send customer email:', error);
        }
      );
  };
  
  return (
    <div>
      <header style={{marginTop:"65.4px"}}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out to us with any enquiries or feedback.</p>
      </header>

      {/* Contact Form Section */}
      <section className="contact-form">
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Your message here..."
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Send Message</button>
          </div>
        </form>
        {statusMessage && <p>{statusMessage}</p>}
      </section>

      {/* Contact Details Section */}
      <section className="contact-details">
        <div className="card">
          <h3>Chitkara University</h3>
          <p>Rajpura, Punjab</p>
          <p>India</p>
        </div>
        <div className="card">
          <h3>Contact Info</h3>
          <p>
            <i className="fas fa-phone-alt"></i> +123 456 7890
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@academiapro.com
          </p>
        </div>
        <div className="card">
          <h3>Business Hours</h3>
          <p>
            <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM
          </p>
          <p>
            <strong>Saturday & Sunday:</strong> Closed
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-container">
        <h2>Find Us on the Map</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15826.931586908559!2d76.65326951038121!3d30.513419809448415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1732299277316!5m2!1sen!2sin"
          width="800"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 AcademiaPro. All rights reserved.</p>
        <div className="social-icons">
          <a href="#" ><i className="fab fa-facebook" style={{color:"white"}}></i></a>
          <a href="#"><i className="fab fa-twitter" style={{color:"white"}}></i></a>
          <a href="#"><i className="fab fa-linkedin" style={{color:"white"}}></i></a>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
