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
        <div className="features-container">
            <div className="feature">
                <span className="feature-icon"><i className="fas fa-heart"></i></span>
                <p>Favorites</p>
            </div>
            <div className="feature">
                <span className="feature-icon"><i className="fas fa-search"></i></span>
                <p>Save Search</p>
            </div>
            <div className="feature">
                <span className="feature-icon"><i className="fas fa-comments"></i></span>
                <p>Easy Enquiry</p>
            </div>
           
        </div>
        <button className="create-account-btn">Create an Account</button>
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
