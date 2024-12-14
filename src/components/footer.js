import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div class="footer-upper">
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
   <div class="footer">
     <p>&copy; 2024 Artisbay. All Rights Reserved.</p>
   </div>
   </>
  );
};

export default Footer;