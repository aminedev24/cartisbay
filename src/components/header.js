import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/header.css';
import TopBar from './topbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef([]);
  const location = useLocation();

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
          <Link className='logo' to='/'><img src={`${process.env.PUBLIC_URL}/images/logo.png`} /></Link>
          <div className="header-search">
            <input type="text" placeholder="Search by keyword..." />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="header-icons">
            <div className="header-item">Contact</div>
            <div className="header-item">
              <i className="fas fa-user-plus icon"></i> Register
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
            <div className="used-cars">
              <i className="fas fa-car icon"></i>
              <Link to={'/car-dismantling'}>Car dismantling</Link>
            </div>
            <div className="used-tires">
              <i className="fas fa-circle-notch icon"></i>
              <Link to={'/used-tires'}>Used Tires</Link>
            </div>
          </div>

          <div className="right-links">
            <div
              className="nav-item dropdown"
              ref={(el) => (dropdownRef.current[2] = el)}
              onClick={() => toggleDropdown('localServices')}
            >
              Local Services <span className="arrow">🔽</span>
              <div className={`dropdown-content ${activeDropdown === 'localServices' ? 'show' : ''}`}>
                <a href="#">Namibia</a>
                <a href="#">DR-Congo</a>
              </div>
            </div>
            <div className="nav-item">Reviews</div>
            <div
              className="nav-item dropdown"
              ref={(el) => (dropdownRef.current[1] = el)}
              onClick={() => toggleDropdown('overview')}
            >
              Help <span className="arrow">🔽</span>
              <div className={`dropdown-content help ${activeDropdown === 'overview' ? 'show' : ''}`}>
                <Link to={'/help?topic=Company%20Profile'}>Company Profile</Link>
                <Link to={'/help?topic=Bank%20Information'}>Bank Information</Link>
                <Link to={'/help?topic=Why%20Choose%20Artisbay%20Inc.'}>Why Choose Artisbay</Link>
                <Link to={'/help?topic=Terms%20%26%20Conditions'}>Terms & Conditions</Link>
                <Link to={'/help?topic=Anti-Social%20Force%20Policy'}>Anti-Social Force Policy</Link>
                <Link to={'/help?topic=How%20to%20Buy'}>How To Buy</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      {console.log(document.location.pathname)}
      {location.pathname === '/' && (
        <a href="#"><img src={`${process.env.PUBLIC_URL}/images/blinkingBar.gif`} className='local-services-banner' alt='local-services' loop /></a>
      )}
    </div>
  );
};

export default Header;