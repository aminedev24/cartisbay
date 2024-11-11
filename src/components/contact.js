import React from 'react';
import '../css/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="intro-text">
        If you have any questions or would like to learn more about our offerings, 
        please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers 
        and will respond as promptly as possible.
      </p>
      <p className="inventory-info">
        If you’re interested in exploring our full inventory and would like to register with us, 
        please use this alternate form to gain access to our complete stock list. We look forward to assisting you!
      </p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
