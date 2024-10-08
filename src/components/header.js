import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [japanTime, setJapanTime] = useState('');
  const [usdToYenRate] = useState(144.90); // Fixed exchange rate

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    <div>
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

      {/* Main Header */}
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
    </div>
  );
};

export default Header;
