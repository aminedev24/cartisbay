import React, { useState } from "react";
import CountryFlag from "react-country-flag";
import CountryList from './countryList';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [message, setMessage] = useState(""); // State for message
  const [isError, setIsError] = useState(false); // State to track if the message is an error
  const navigate = useNavigate();

    // Dynamically set API URL based on environment
    const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'  // Development URL
    : '/server';  // Production URL (relative path)


  const handleCountryChange = (event) => {
    const country = CountryList().find((c) => c.label === event.target.value);
    setSelectedCountry(event.target.value);
    setPhoneCode(country ? country.countryCode : "");
  };

  const handleInputChange = (setter, event) => {
    setter(event.target.value);
    if (event.target.value) {
      event.target.classList.add("not-empty");
    } else {
      event.target.classList.remove("not-empty");
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setMessage("Signing up..."); // Set message when signup starts
    setIsError(false); // Reset error state
    const formattedPhone = `${phoneCode} ${phone}`.trim();
    
    const formData = {
      'full-name': fullName,
      email,
      password,
      country: selectedCountry,
      phone: formattedPhone,
      company
    };

    try {
      const response = await fetch(`${apiUrl}/signup.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch (error) {
        console.error('Response is not valid JSON:', resultText);
        setMessage("An error occurred. Please try again."); // Set error message
        setIsError(true);
        return;
      }

      if (result.success) {
        setMessage("Signup successful! Redirecting to login..."); // Success message
        setTimeout(() => {
          navigate('/login');
        }, 4000); // Redirect after 2 seconds
      } else if (result.errors) {
        setMessage("Signup failed. Please check your input."); // Error message
        setIsError(true);
        result.errors.forEach(error => console.error(error));
      } else {
        setMessage("An error occurred. Please try again."); // General error message
        setIsError(true);
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred. Please try again."); // Set error message
      setIsError(true);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      {message && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )} {/* Display message */}
      <div className="input-group">
        <input
          name="full-name"
          type="text"
          id="full-name"
          value={fullName}
          onChange={(e) => handleInputChange(setFullName, e)}
          required
        />
        <label htmlFor="full-name">Full Name</label>
      </div>
      <div className="input-group">
        <input
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleInputChange(setEmail, e)}
          required
        />
        <label htmlFor="email">Email </label>
      </div>

      <div className="input-group phone-number-group">
        {phoneCode && <span className="phone-code">{phoneCode}</span>}
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => handleInputChange(setPhone, e)}
          required
          placeholder="Phone Number"
          className={phoneCode ? "shrink" : ''}
        />
      </div>

      <div className="input-group">
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          name="country"
          className={selectedCountry ? "not-empty" : ""}
          required
        >
          <option value="">Select Country</option>
          {CountryList().sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
            <option key={country.code} value={country.label}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <input
          name="company"
          type="text"
          id="company"
          value={company}
          onChange={(e) => handleInputChange(setCompany, e)}
        />
        <label htmlFor="company">Company</label>
      </div>

      <div className="input-group">
        <input
          name="password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleInputChange(setPassword, e)}
          required
        />
        <label htmlFor="password">Password</label>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;