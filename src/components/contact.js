import React, { useState, useEffect } from 'react';
import '../css/contact.css';
import CountryList from './countryList'; // Import the CountryList
import useCheckScreenSize from './screenSize'; // Adjust the path as necessary
import { useLocation } from 'react-router-dom';

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
  const [userData, setUserData] = useState({ // New state to store user data
    fullName: '',
    email: '',
    phone: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  console.log(isPortrait, isSmallScreen);

  // Dynamically set API URL based on environment
  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'  // Development URL
    : '/server';  // Production URL (relative path)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/getUserInfo.php`, {
          method: 'GET',
          credentials: 'include' // Send cookies
        });

        const data = await response.json();
        console.log(data);
        if (data.error) {
          alert(data.error); // Handle errors (e.g., user not logged in)
        } else {
          setUserData({
            fullName: data.data.full_name,
            email: data.data.email,
            phone: data.data.phone,
            country: data.data.country
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('An error occurred while fetching user data.');
      }
    };

    fetchUserData();
  }, []); // This useEffect will run once when the component is mounted

  useEffect(() => {
    // If user data is fetched, update the formData state
    if (userData.fullName) {
      setFormData({
        name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
      });
    }
  }, [userData]); // Update formData whenever userData changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/send_email.php`, { // Adjust the path as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData), // Convert formData to URL-encoded string
      });

      console.log(formData)
      const result = await response.json();

      if (result.status === 'success') {
        setSubmitted(true);
      } else {
        alert(result.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className='form-wrapper'
      style={{
        height: isSmallScreen ? '90vh': ''
      }}
    >
      <div 
        className="contact-container"
        style={{
          scale: isSmallScreen && isPortrait ? '1.5' : isSmallScreen ? '.8' : '', // Set scale based on both conditions
        }}
      >
        <h1>We like to hear from you!</h1>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
        </p>
        {submitted && <p className="success-message">Thank you for your message! We will get back to you shortly.</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name<span className="required">*</span></label>
          <input readOnly={!!userData.fullName}  type="text" id="name" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />

          <label htmlFor="email">E-mail<span className="required">*</span></label>
          <input readOnly={!!userData.email}  type="email" id="email" name="email" placeholder="E-mail" required value={formData.email} onChange={handleChange} />

          <label htmlFor="country">Country<span className="required">*</span></label>
          <select disabled={!!userData.country} id="country" name="country" required value={formData.country} onChange={handleChange}>
            <option value="" disabled>Select</option>
            {CountryList().map(country => (
              <option key={country.label} value={country.label}>{country.label}</option>
            ))}
          </select>

          <label htmlFor="phone">Phone<span className="required">*</span></label>
          <input readOnly={!!userData.phone} type="tel" id="phone" name="phone" placeholder="Telephone or Mobile" required value={formData.phone} onChange={handleChange} />

          <label htmlFor="enquiry">Enquiry Type<span className="required">*</span></label>
          <select id="enquiry" name="enquiry" required value={formData.enquiry} onChange={handleChange}>
            <option value="" disabled>Select</option>
            <option value="General">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
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
