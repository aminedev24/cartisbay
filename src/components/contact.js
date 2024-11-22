import React from 'react';
import '../css/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
    <div className="form-container">
      <h1>We like to hear from you!</h1>
      <p>Contact Us</p>
      <p>
        If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
      </p>
      <form>
        <input placeholder="Your Name" required="" type="text" />
        <input placeholder="Your Email" required="" type="email" />
        <textarea placeholder="Your Message" required="" rows="4"></textarea>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  </div>

  );
};

export default Contact;
