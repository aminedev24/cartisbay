import React from "react";
import CountryFlag from "react-country-flag"; // Import the CountryFlag component
import "../css/RightSidebar.css"; // Import the CSS file for styling

const countries = [
    { name: "Japan", code: "JP" },
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Australia", code: "AU" },
    { name: "United Kingdom", code: "GB" },
    { name: "Germany", code: "DE" },
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
                <form className="account-form">
                    {/* Full Name */}
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name" />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="Enter your email" />
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number" />
                    </div>

                    {/* Country */}
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input type="text" id="country" name="country" required placeholder="Enter your country" />
                    </div>

                    {/* Create Account Button */}
                    <button type="submit" className="create-account-btn">
                        Create an Account
                    </button>
                </form>
            </div>


            {/* Local Services Section */}
            <div className="local-services">
                <div className="header">
                    <span className="service-icon">
                        <i className="fas fa-map-marker-alt"></i> {/* Icon for Local Services */}
                    </span>
                    <h4>Local Services</h4>
                </div>
                <ul className="country-list">
                    {countries.map((country) => (
                        <li key={country.name} className="country-item">
                            <CountryFlag countryCode={country.code} svg style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                            {country.name}
                        </li>
                    ))}
                </ul>
            </div>

            
            <h2>Useful Links</h2>
            <ul>
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Services</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
                <li>
                    <a href="#">FAQ</a>
                </li>
                <li>
                    <a href="#">Blog</a>
                </li>
            </ul>
        </div>

        
    );
};

export default RightSidebar;
