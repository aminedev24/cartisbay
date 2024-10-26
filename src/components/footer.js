import React from 'react';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-section">
          <h4>Shop by Make</h4>
          <ul>
            <li><a href="/make/toyota">Toyota</a></li>
            <li><a href="/make/honda">Honda</a></li>
            <li><a href="/make/ford">Ford</a></li>
            <li><a href="/make/nissan">Nissan</a></li>
            {/* Add more makes as needed */}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Shop by Year</h4>
          <ul>
            <li><a href="/year/2024">2024</a></li>
            <li><a href="/year/2023">2023</a></li>
            <li><a href="/year/2022">2022</a></li>
            <li><a href="/year/2021">2021</a></li>
            {/* Add more years as needed */}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Shop by Type</h4>
          <ul>
            <li><a href="/type/suv">SUV</a></li>
            <li><a href="/type/sedan">Sedan</a></li>
            <li><a href="/type/truck">Truck</a></li>
            <li><a href="/type/coupe">Coupe</a></li>
            {/* Add more types as needed */}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Shop by Price</h4>
          <ul>
            <li><a href="/price/under-10000">$10,000 and under</a></li>
            <li><a href="/price/10000-20000">$10,000 - $20,000</a></li>
            <li><a href="/price/20000-30000">$20,000 - $30,000</a></li>
            <li><a href="/price/above-30000">$30,000 and above</a></li>
            {/* Adjust price ranges as needed */}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Shop by Discount</h4>
          <ul>
            <li><a href="/discount/10">10% Off</a></li>
            <li><a href="/discount/20">20% Off</a></li>
            <li><a href="/discount/30">30% Off</a></li>
            <li><a href="/discount/50">50% Off or more</a></li>
          </ul>
        </div>
      </div>

      <p>&copy; 2024 Artisbay. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
