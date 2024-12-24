import React, { useState, useEffect, useRef } from 'react';
import '../css/contact.css';
import CountryList from './countryList';
import useCheckScreenSize from './screenSize';
import { useLocation } from 'react-router-dom';

const Contact = ({ sell }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: sell ? 'Japan' : '',
    phone: '',
    enquiry: sell ? 'sell on Artisbay' : '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: sell ? 'Japan' : ''
  });

  const [messageInfo, setMessageInfo] = useState(null); // For message type and content
  const messageRef = useRef(); // For scrolling to the message
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'
    : '/server';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/getUserInfo.php`, {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();
        if (data.error) return;

        setUserData({
          fullName: data.data.full_name,
          email: data.data.email,
          phone: data.data.phone,
          country: data.data.country
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.fullName) {
      setFormData((prevData) => ({
        ...prevData,
        name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/send_email.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessageInfo({ type: 'success', text: sell ? "Thank you for your interest in joining Artisbay! We will review your application and get back to you within a few days." :'Thank you for your message! We will get back to you shortly.' });
      } else {
        setMessageInfo({ type: 'error', text: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessageInfo({ type: 'error', text: 'There was an error submitting the form. Please try again later.' });
    } finally {
      setIsSubmitting(false);

      // Scroll to the message
      if (messageRef.current) {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      // Dismiss the message after 5 seconds
      setTimeout(() => {
        setMessageInfo(null);
      }, 10000);
    }
  };

  

  return (
    <div
      className='form-wrapper contact-wrapper'
    >
      <div
        className="contact-container"
       
      >
        {!sell && <h1>We like to hear from you!</h1>}
        <h2>Contact Us</h2>
        <p className='contact-prompt'>
          If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
        </p>
              
          <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name<span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">E-mail<span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="country">Country<span className="required">*</span></label>
          <select
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
          >
            {sell ? (
              <option value="Japan">Japan</option>
            ) : (
              <>
                <option value="" disabled>Select</option>
                {CountryList().map((country) => (
                  <option key={country.label} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </>
            )}
          </select>

          <label htmlFor="phone">Phone<span className="required">*</span></label>
          <input
            readOnly={!!userData.phone}
            type="tel"
            id="phone"
            name="phone"
            placeholder="Telephone or Mobile"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          {!sell && (
            <>
              <label htmlFor="enquiry">Enquiry Type<span className="required">*</span></label>
              <select
                id="enquiry"
                name="enquiry"
                required
                value={formData.enquiry}
                onChange={handleChange}
              >
                <option value="" disabled>Select</option>
                <option value="General">General Inquiry</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
              </select>
            </>
          )}

          {sell && (
            <>
              <label htmlFor='company'>Company</label>
              <input type='text' placeholder='Company' name='company' />
            </>
          )}

          <label htmlFor="message">Message<span className="required">*</span></label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          {messageInfo && (
            <p
              ref={messageRef}
              className={`message ${messageInfo.type === 'success' ? 'success' : 'error'}`}
            >
              {messageInfo.text}
            </p>
          )} 

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'SUBMIT'}
          </button>
        </form>
     
      </div>
    </div>
  );
};

export default Contact;
