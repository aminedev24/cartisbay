import React, { useState } from 'react';
import '../css/contact.css';
import CountryList from './countryList'; // Import the CountryList

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
    enquiry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        country: '',
        phone: '',
        enquiry: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="container">
      <div className="contact-container">
        <h1>We like to hear from you!</h1>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
        </p>
        {submitted && <p className="success-message">Thank you for your message! We will get back to you shortly.</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name<span className="required">*</span></label>
          <input type="text" id="name" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />

          <label htmlFor="email">E-mail<span className="required">*</span></label>
          <input type="email" id="email" name="email" placeholder="E-mail" required value={formData.email} onChange={handleChange} />

          <label htmlFor="country">Country<span className="required">*</span></label>
          <select id="country" name="country" required value={formData.country} onChange={handleChange}>
            <option value="" disabled>Select</option>
            {CountryList().map(country => (
              <option key={country.value} value={country.value}>{country.label}</option>
            ))}
          </select>


          <label htmlFor="phone">Phone<span className="required">*</span></label>
          <input type="tel" id="phone" name="phone" placeholder="Telephone or Mobile" required value={formData.phone} onChange={handleChange} />

          <label htmlFor="enquiry">Enquiry Type<span className="required">*</span></label>
          <select id="enquiry" name="enquiry" required value={formData.enquiry} onChange={handleChange}>
            <option value="" disabled>Select</option>
            <option value="General">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
            {/* Add more enquiry types as needed */}
          </select>

          <label htmlFor="message">Message<span className="required">*</span></label>
          <textarea id="message" name="message" placeholder="Message" rows="5" required value={formData.message} onChange={handleChange}></textarea>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;