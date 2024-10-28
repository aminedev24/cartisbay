import React, { useState } from "react";
import CountryFlag from "react-country-flag"; // Import the CountryFlag component
import "../css/RightSidebar.css"; // Import the CSS file for styling

const RightSidebar = () => {
  const countries = [
    { name: "United States", code: "US", phoneCode: "+1" },
    { name: "Canada", code: "CA", phoneCode: "+1" },
    { name: "Japan", code: "JP", phoneCode: "+81" },
    { name: "Germany", code: "DE", phoneCode: "+49" },
    { name: "France", code: "FR", phoneCode: "+33" },
    { name: "United Kingdom", code: "GB", phoneCode: "+44" },
    { name: "China", code: "CN", phoneCode: "+86" },
    { name: "India", code: "IN", phoneCode: "+91" },
    { name: "Australia", code: "AU", phoneCode: "+61" },
    { name: "Brazil", code: "BR", phoneCode: "+55" },
    { name: "South Africa", code: "ZA", phoneCode: "+27" },
    { name: "Mexico", code: "MX", phoneCode: "+52" },
    { name: "Nigeria", code: "NG", phoneCode: "+234" },
  ];

  const localServices = [
    { name: "Namibia", code: "NA" },
    { name: "Dr-congo", code: "CD" },
  ];

  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

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
        <form className="signup-form">
          <div className="input-group">
            <input type="text" id="full-name" required />
            <label htmlFor="full-name">Full Name</label>
          </div>
          <div className="input-group">
            <input type="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input type="password" id="password" required />
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
          <div className="input-group">
            <input
              type="tel"
              id="phone"
              required
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              placeholder={phoneCode ? `${phoneCode} Phone Number` : "Phone Number"}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <video  src={`${process.env.PUBLIC_URL}/vids/local-services.mp4`}  autoPlay loop muted className="video"></video>
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
