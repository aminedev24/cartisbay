import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [japanTime, setJapanTime] = useState('');
  const [usdToYenRate] = useState(144.90); // Fixed exchange rate
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isUsedCarsOpen, setUsedCarsOpen] = useState(false);
  const [isLocalServicesOpen, setLocalServicesOpen] = useState(false);

  const toggleDropdown = (setOpen) => {
    setOpen((prev) => !prev);
};

  useEffect(() => {
    // Function to update Japan Standard Time
    const updateJapanTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const japanTimeString = now.toLocaleTimeString('en-US', options);
      setJapanTime(japanTimeString);
    };


    // Update the time every second
    const interval = setInterval(updateJapanTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='header-container'>
      {/* Top bar with time and exchange rate */}
      <div className="top-bar">
        <div className="app-info">
          <span className="app-name">Artisbay</span>
        </div>
        <div className="extra-info">
          <span className="time">Japan Standard Time: {japanTime}</span>
          <span className="exchange-rate">USD/JPY: $1 = ¥{usdToYenRate}</span>
        </div>
      </div>

      {/* Main Header 
      <header className="header">
        <div className="logo">
          <h1><Link to="/" onClick={() => setIsMenuOpen(false)}>Artisbay</Link></h1>
        </div>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/howtobuy" onClick={() => setIsMenuOpen(false)}>How To Buy</Link>
        </nav>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </header>
      */}
       <header className="main-header">
            <div className="header-top">
                <div className="app-name">Artisbay</div>
                <div className="header-search">
                    <input type="text" placeholder="Search..." />
                    <i className="search-icon">🔍</i>
                </div>
                <div className="header-icons">
                    <div className="header-item">Contact</div>
                    <div className="header-item">
                        <i className="icon">❤️</i> Favorites
                    </div>
                    <div className="header-item">
                        <i className="icon">🛒</i> Cart
                    </div>
                    <div className="header-item dropdown" onClick={() => toggleDropdown(setLoginOpen)}>
                        <i className="icon">👤</i> Login
                        <div className={`dropdown-content ${isLoginOpen ? 'show' : ''}`}>
                            <a href="#">Profile</a>
                            <a href="#">Logout</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom">
                <div className="used-cars dropdown" onClick={() => toggleDropdown(setUsedCarsOpen)}>
                    <i className="icon">🚗</i> Used Cars <span className="arrow">🔽</span>
                    <div className={`dropdown-content ${isUsedCarsOpen ? 'show' : ''}`}>
                        <a href="#">Sedans</a>
                        <a href="#">SUVs</a>
                        <a href="#">Trucks</a>
                    </div>
                </div>
                <div className="right-links">
                    <div className="nav-item dropdown" onClick={() => toggleDropdown(setLocalServicesOpen)}>
                        Local Services <span className="arrow">🔽</span>
                        <div className={`dropdown-content ${isLocalServicesOpen ? 'show' : ''}`}>
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
