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
  const [phoneCode, setPhoneCode] = useState("");
  
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
            credentials: 'include',
          });
    
          if (!response.ok) {
            console.error('Failed to fetch user data:', response.statusText);
            return;
          }
    
          const data = await response.json();
    
          // Check if data and expected fields exist
          if (!data || data.error || !data.data) {
            console.error('Invalid or missing data returned from API:', data);
            return;
          }
    
          // Ensure all fields are present and set defaults if needed
          const { full_name = '', email = '', phone = '', country = '' } = data.data;
    
          setUserData({
            fullName: full_name,
            email: email,
            phone: phone,
            country: country,
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
    console.log(name)
    // Update form data first
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Handle phone code for country selection
    if (name === 'country') {
      try {
        const selectedCountry = CountryList().find(
          (country) => country.label === value
        );
        
        if (selectedCountry?.countryCode) {
          setPhoneCode(selectedCountry.countryCode);
        } else {
          // Reset phone code if no country found
          setPhoneCode('');
          console.warn('No country code found for:', value);
        }
      } catch (error) {
        console.error('Error setting phone code:', error);
        setPhoneCode('');
      }
    }
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
    <div className='form-wrapper contact-wrapper'>
  <div className="signup-container contact-container">
    <form className="signup-form contact-form" onSubmit={handleSubmit}>
      {!sell &&
         <img 
         src={`${process.env.PUBLIC_URL}/images/logo3new.png`} 
         alt="Logo" 
         className="logo-form" 
       />
      }
     

      {!sell && <h2>We like to hear from you!</h2>}
      <h3>Contact Us</h3>
      <p className='contact-prompt'>
      If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
      </p>

      <div className="input-group">
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          placeholder='your name'
          required
        />
        <label>Your Name <span className="required">*</span></label>
      </div>

      <div className="input-group">
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          placeholder='email'
          required
        />
        <label>E-mail<span className="required">*</span></label>
      </div>

      <div className="input-group">
     
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={formData.country ? "not-empty" : ""}
          required
        >
          <option value="">Select Country</option>
          {sell ? (
            <option value="Japan">Japan</option>
          ) : (
            CountryList().sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
              <option key={country.code} value={country.label}>
                {country.label}
              </option>
            ))
          )}
        </select>
        <label>Country<span className="required">*</span></label>
      </div>

      <div className="input-group phone-number-group">
      {phoneCode && <span className="phone-code">{phoneCode}</span>}

        <input
          type="tel"
          name="phone"
          className={phoneCode ? "shrink" : ''}
          value={formData.phone}
          onChange={handleChange}
          placeholder="phone number"
          readOnly={!!userData.phone}
          required
        />
        <label>Phone<span className="required">*</span></label>
      </div>

      {!sell && (
        <div className="input-group">
          <select
            name="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
            className={formData.enquiry ? "not-empty" : ""}
            required
          >
            <option value="">Select Enquiry Type</option>
            <option value="General">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
          </select>
          <label>Enquiry type<span className="required">*</span></label>
        </div>
      )}

      {sell && (
        <div className="input-group">
          <input
            type="text"
            name="company"
            value={formData.company}
            placeholder='company'
            onChange={handleChange}
          />
          <label>Company</label>
        </div>
      )}

      <div className="input-group">
      <label>Message<span className="required">*</span></label>
        <textarea
          name="message"
          placeholder='your message'
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
        ></textarea>
        
      </div>

      {messageInfo && (
        <div className={`message ${messageInfo.type === 'success' ? 'success' : 'error'}`}>
          {messageInfo.text}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'SUBMIT'}
      </button>
    </form>
  </div>
</div>
  );
};

export default Contact;
