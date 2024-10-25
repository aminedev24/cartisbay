import React from "react";
import CountryFlag from "react-country-flag"; // Import the CountryFlag component
import "../css/RightSidebar.css"; // Import the CSS file for styling

const countries = [
  { name: "Namibia", code: "NA" },
  { name: "Dr-Congo", code: "cd" },
];

const RightSidebar = () => {
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
          <div class="input-group">
            <input type="text" id="full-name" required />
            <label for="full-name">Full Name</label>
          </div>
          <div class="input-group">
            <input type="email" id="email" required />
            <label for="email">Email</label>
          </div>
          <div class="input-group">
            <input type="password" id="password" required />
            <label for="password">Password</label>
          </div>
          <div class="input-group">
            <input type="text" id="country" required />
            <label for="country">Country</label>
          </div>
          <div class="input-group">
            <input type="tel" id="phone" required />
            <label for="phone">Phone Number</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Local Services Section */}
      <div className="local-services">
        <div className="header">
          <span className="service-icon">
            <i className="fas fa-map-marker-alt"></i>{" "}
            {/* Icon for Local Services */}
          </span>
          <h4>Local Services</h4>
        </div>
        <ul className="country-list">
          {countries.map((country) => (
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
