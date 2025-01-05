import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';
import useCheckScreenSize from './screenSize';

const Footer = () => {

  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  return (
    <div 
      className='footer-container'
      style={{ 
        position: 'relative',
        bottom: '0',
        width: '100%'
      }}  
    >
    <div class="footer-upper">
      <div className='footer-inner'>
        <Link to='/'><img alt="Autocom Japan logo"  src={ `${process.env.PUBLIC_URL}/images/logo3new.png`} width="130"/></Link>
        <div class="info">
        <h1>
          Artisbay Inc.
        </h1>
        <p>
          Artisbay Inc. An online-based platform for the sale and export of used vehicles and auto parts.
        </p>
        <p>
            email: <a href="mailto:contact@artisbay.com">contact@artisbay.com</a>
        </p>
        </div>
      </div>

   </div>
   <div class="footer">
     <p>&copy; 2025 Artisbay. All Rights Reserved.</p>
   </div>
   </div>
  );
};

export default Footer;