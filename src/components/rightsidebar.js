import React, { useState, useEffect } from "react";
import CountryFlag from "react-country-flag";
import "../css/RightSidebar.css";
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
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fade, setFade] = useState(true); // Track fading state

  const images = [
    `${process.env.PUBLIC_URL}/images/local-services-comp.jpg`,
    `${process.env.PUBLIC_URL}/images/fromeurope.jpeg`
  ];
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Start fading out the current image

      setTimeout(() => {
        // Update image after fade-out completes
        setCurrentImage((prevImage) => {
          const nextImageIndex = (images.indexOf(prevImage) + 1) % images.length;
          return images[nextImageIndex];
        });
        setFade(true); // Start fading in the new image
      }, 500); // This delay should match the fade-out time in CSS
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(intervalId);
  }, [images]);

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

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = {
      'full-name': fullName,
      email,
      password,
      country: selectedCountry,
      phone,
      company
    };

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
            <label htmlFor="country">Country</label>
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
      {/* 
        <div className="video-section">
        <img
          src={currentImage}
          alt="cars from"
          className={`fade-image ${fade ? 'fade-in' : 'fade-out'}`}
        />
      </div>

     
      
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
       */}
    </div>
  );
};

export default RightSidebar;