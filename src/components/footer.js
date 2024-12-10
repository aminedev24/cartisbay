import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className='footer-section'>
          <Link className='logo' to='/'>
              <img width='130' src={`${process.env.PUBLIC_URL}/images/logo3new.png`} alt="Logo" />
          </Link>
        </div>
        <div className='footer-section logo-container'>
         
          <p className="logo-description">Artisbay Inc. An online-based platform for the sale and export of used vehicles and auto parts.</p>
          <a href="mailto:contact@artisbay.com">contact@artisbay.com</a>
        </div>
        <div className="footer-section">
         
          <ul>
            <li><Link to={'/help?topic=help'}>Help</Link></li>
            <li><Link to="/help?topic=Company%20Profile">Company Profile</Link></li>
            <li><Link to="/help?topic=Terms%20%26%20Conditions">Terms & Conditions</Link></li>
            <li><Link to="/help?topic=Anti-Social%20Force%20Policy">Anti-Social Force Policy</Link></li>
            <li><Link to="/help?topic=privacy%20policy">Privacy</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/used-tires">Used tires</Link></li>
            <li><Link to="/car-dismantling">Cars cutting & Dismantling</Link></li>
            <li><Link to="/help?topic=Sustainability">Eco friendly</Link></li>
          </ul>
        </div>
      </div>
      <p>&copy; 2024 Artisbay. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;