import React, { useState } from "react";
import CountryFlag from "react-country-flag"; // Import the CountryFlag component
import "../css/RightSidebar.css"; // Import the CSS file for styling
import { countries } from './countries';

const RightSidebar = () => {
  const localServices = [
    { name: "Namibia", code: "NA" },
    { name: "Dr-Congo", code: "CD" },
  ];

  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleCountryChange = (event) => {
    const country = countries.find((c) => c.name === event.target.value);
    setSelectedCountry(event.target.value);
    setPhoneCode(country ? country.phoneCode : "");
  };

  const handleCountryBlur = (event) => {
    if (event.target.value) {
      event.target.classList.add("not-empty");
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = {
        'full-name': fullName,
        email,
        password,
        country: selectedCountry,
        phone
    };

    try {
        const response = await fetch('/signup.php', {  // Change this line
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString(),
        });
        
        // Parse the response as text or JSON
        const resultText = await response.text();
        // If the response is JSON, you can try to parse it
        let result;
        try {
            result = JSON.parse(resultText);
        } catch (error) {
            console.error('Response is not valid JSON:', resultText);
            return;
        }

        if (result.success) {
            // Handle success
            console.log(result.success);
        } else if (result.errors) {
            // Handle multiple errors
            result.errors.forEach(error => {
                console.error(error);
            });
        } else {
            // Handle generic error
            console.error(result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


  return (
    <div className="right-sidebar">
      <div className="account-container">
        <div className="header">
          <span className="person-icon">
            <i className="fas fa-user-plus"></i>
          </span>
          <h2>Create an Account</h2>
        </div>

        {/* Account Creation Form */}
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <input
              name="full-name"
              type="text"
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Update state on input change
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
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* Country Selector */}
          <div className="input-group">
            <select
              className="not-empty"
              id="country"
              value={selectedCountry}
              onBlur={handleCountryBlur}
              onChange={handleCountryChange}
              name="country"
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <label htmlFor="country">Country</label>
          </div>

          {/* Phone Number with Country Code */}
          <div className="input-group phone-number-group">
            {phoneCode && (
              <span className="phone-code">{phoneCode}</span>
            )}
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update state on input change
              required
              placeholder="Phone Number"
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <img src={`${process.env.PUBLIC_URL}/images/local-services-comp.jpg`} alt="Local Services" />
      </div>

      {/* Local Services Section */}
      <div className="local-services">
        <div className="header">
          <span className="service-icon">
            <i className="fas fa-map-marker-alt"></i>
          </span>
          <h4>Local Services</h4>
        </div>
        <ul className="country-list">
          {localServices.map((country) => (
            <li key={country.name} className="country-item">
              <CountryFlag
                countryCode={country.code}
                svg
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              {country.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
