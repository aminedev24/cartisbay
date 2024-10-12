// src/components/RightSidebar.js
import React from 'react';
import '../css/RightSidebar.css'; // Import the CSS file for styling

const RightSidebar = () => {
    return (
        <div className="right-sidebar">
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
