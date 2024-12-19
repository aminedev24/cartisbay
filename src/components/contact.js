import React, { useState, useEffect } from 'react';
import '../css/contact.css';
import CountryList from './countryList';
import useCheckScreenSize from './screenSize';
import { useLocation } from 'react-router-dom';

const Contact = ({ sell }) => {
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
  const [userData, setUserData] = useState({
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
      setFormData({
        name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
      });
    }
  }, [userData]);

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
        setSubmitted(true);
      } else {
        alert(result.message);
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
      className='form-wrapper contact-wrapper'
      style={{ height: isSmallScreen ? '90vh' : '' }}
    >
      <div 
        className="contact-container"
       
      >
        <h1>We like to hear from you!</h1>
        <h2>Contact Us</h2>
        <p className='contact-prompt'>
          If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
        </p>
        {submitted && <p className="success-message">Thank you for your message! We will get back to you shortly.</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name<span className="required">*</span></label>
          <input 
            readOnly={!!userData.fullName} 
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
            readOnly={!!userData.email} 
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
            disabled={!!userData.country} 
            id="country" 
            name="country" 
            required 
            value={formData.country} 
            onChange={handleChange}
          >
         
            {sell ? (
              <option value="Japan">Japan</option>
            ) : (
              
              CountryList().map(country => (
                <>
                <option value="" disabled>Select</option>
                <option key={country.label} value={country.label}>
                  {country.label}
                </option>
                </>
              ))
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

          <label  style={{display: sell ? 'none': ''}}  htmlFor="enquiry">Enquiry Type<span className="required">*</span></label>
          <select 
            id="enquiry" 
            name="enquiry" 
            required 
            value={formData.enquiry} 
            onChange={handleChange}
            style={{display: sell ? 'none': ''}}
          >
            
            {sell ? <option value='Sales'>Sles</option> : 
              <>
              <option value="" disabled>Select</option>
               <option value="General">General Inquiry</option>
               <option value="Support">Support</option>
               <option value="Sales">Sales</option>
               </>
            }
           
          </select>

          {sell ? 
          <>
          <label htmlFor='company'>Company</label>
          <input type='text' placeholder='company'name='company' />
          </>
          :
          ''
          }

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

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
