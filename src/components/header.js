import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';
import TopBar from './topbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef([]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current) {
      const dropdowns = dropdownRef.current;
      const isClickInsideDropdown = dropdowns.some((dropdown) => dropdown && dropdown.contains(event.target));
      if (!isClickInsideDropdown) {
        setActiveDropdown(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='header-container'>
      <TopBar />
      <header className="main-header">
        <div className="header-top">
          <div className="app-name">Artisbay</div>
          <div className="header-search">
            <input type="text" placeholder="Search..." />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="header-icons">
            <div className="header-item">Contact</div>
            <div className="header-item">
              <i className="fas fa-shopping-cart icon"></i> Cart
            </div>
            <div
              className="header-item dropdown"
              ref={(el) => (dropdownRef.current[0] = el)}
              onClick={() => toggleDropdown('login')}
            >
              <i className="fas fa-user icon"></i> Login
              <div className={`dropdown-content login ${activeDropdown === 'login' ? 'show' : ''}`}>
                <a href="#">Profile</a>
                <a href="#">Logout</a>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="left-links">
          {/* Used Cars Links */}
            <div className="used-cars">
              <i className="fas fa-car icon"></i> 
              <a href="#">Used Cars</a>
            </div>

            {/* Used Tires Links */}
            <div className="used-tires">
              <i className="fas fa-circle-notch icon"></i> 
              <a href="#">Used Tires</a>
            </div>

          </div>

          {/* Right-side links */}
          <div className="right-links">
            <div
              className="nav-item dropdown"
              ref={(el) => (dropdownRef.current[3] = el)}
              onClick={() => toggleDropdown('localServices')}
            >
              Local Services <span className="arrow">🔽</span>
              <div className={`dropdown-content ${activeDropdown === 'localServices' ? 'show' : ''}`}>
                <a href="#">Repairs</a>
                <a href="#">Maintenance</a>
              </div>
            </div>
            <div className="nav-item">Reviews</div>
            <div className="nav-item">Help</div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
