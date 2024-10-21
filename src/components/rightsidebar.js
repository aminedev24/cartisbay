// src/components/RightSidebar.js
import React from 'react';
import '../css/RightSidebar.css'; // Import the CSS file for styling

const RightSidebar = () => {
    return (
        <div className="right-sidebar">

            <div className="image-section">
                <img src={`${process.env.PUBLIC_URL}/images/shipping.jpg`} alt="shipping" className="sidebar-image" />
                <img src={`${process.env.PUBLIC_URL}/images/create_account.png`} alt="Second" className="sidebar-image" />
            </div>

            <div className="account-container">
    <div className="header">
        <span className="person-icon"><i className="fas fa-user-plus"></i></span>
        <h2>Create an Account</h2>
    </div>

    {/* Account Creation Form */}
    <form className="account-form">
        {/* Full Name */}
        <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="Enter your full name"
            />
        </div>

        {/* Email */}
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
            />
        </div>

        {/* Phone Number */}
        <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="Enter your phone number"
            />
        </div>

        {/* Country */}
        <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
                type="text"
                id="country"
                name="country"
                required
                placeholder="Enter your country"
            />
        </div>

        {/* Create Account Button */}
        <button type="submit" className="create-account-btn">Create an Account</button>
    </form>
</div>


            <h2>Useful Links</h2>
            <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Blog</a></li>
            </ul>
        </div>
    );
};

export default RightSidebar;
