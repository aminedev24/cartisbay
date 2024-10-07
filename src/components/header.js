import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1><Link to="/" onClick={() => setIsMenuOpen(false)}>Artisbay</Link></h1>
      </div>
      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        <Link to="howtobuy" onClick={() => setIsMenuOpen(false)}>How To Buy</Link>
      </nav>
      <button className="hamburger" onClick={toggleMenu}>
      ☰ 
      </button>
    </header>
  );
};

export default Header;
