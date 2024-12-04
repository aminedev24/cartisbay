import React, { useState } from 'react';
import { countries } from './countries';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const RegisterForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = {
      'full-name': fullName,
      email,
      password,
      country: selectedCountry,
      phone,
      company,
    };

    try {
      const response = await fetch('https://artisbay.com/server/signup.php', {
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
        return;
      }

      if (result.success) {
        //console.log(result.success);
        navigate('/'); // Redirect to the homepage
        window.location.reload();
      } else if (result.errors) {
        result.errors.forEach(error => console.error(error));
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCountryChange = (event) => {
    const country = countries.find((c) => c.name === event.target.value);
    setSelectedCountry(event.target.value);
    setPhoneCode(country ? country.phoneCode : "");
  };

  const handleInputChange = (setter, event) => {
    setter(event.target.value);
    if (event.target.value) {
      event.target.classList.add("not-empty");
    } else {
      event.target.classList.remove("not-empty");
    }
  };

  return (
    <div className="register-container">
      <div className="account-container">
        <div className="header">
          <span className="person-icon">
            <i className="fas fa-user-plus"></i>
          </span>
          <h2>Create an Account</h2>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
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
              {countries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <input
              name="company"
              type="company"
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
      </div>
    </div>
  );
};

export default RegisterForm;
