import React from 'react';
import '../css/contact.css';

const Contact = () => {
  return (
    <div className="container">
      <div className="contact-container">
        <h1>
            We like to hear from you!
          </h1>
          <p>
            Contact Us
          </p>
          <p>
            If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
          </p>
        <form>
            <label htmlFor="name">Your Name<span className="required">*</span></label>
            <input type="text" id="name" name="name" placeholder="Full Name" required />

            <label htmlFor="email">E-mail<span className="required">*</span></label>
            <input type="email" id="email" name="email" placeholder="E-mail" required />

            <label htmlFor="country">Country<span className="required">*</span></label>
            <select id="country" name="country" required>
                <option value="" disabled selected>Select</option>
            </select>

            <label htmlFor="phone">Phone<span className="required">*</span></label>
            <input type="text" id="phone" name="phone" placeholder="Telephone or Mobile" required />

            <label htmlFor="enquiry">Enquiry Type<span className="required">*</span></label>
            <select id="enquiry" name="enquiry" required>
                <option value="" disabled selected>Select</option>
              
            </select>

            <label htmlFor="message">Message<span class="required">*</span></label>
            <textarea id="message" name="message" placeholder="Message" rows="5" required></textarea>

            <button type="submit">SUBMIT</button>
        </form>
    </div>
    </div>

  );
};

export default Contact;
