import React from 'react';
import { Link } from 'react-router-dom';
const AuctionLanding = () => {
  return (
    <div className='terms-container'>
      <h4>Source Cars from Japanese Auctions with Artisbay Inc.</h4>
      <p>
        At Artisbay Inc., we connect overseas buyers with reliable suppliers in Japan, granting you access to high-quality cars directly from auctions at exceptionally fair prices. Whether you’re an individual buyer or a dealer, our goal is to simplify the process and maximize your value.
      </p>
      <h4>Why Choose Artisbay?</h4>
      <ul>
        <li>Fair and Transparent Pricing</li>
        <li>Tailored Dealer Packages</li>
        <li>Efficient Work</li>
      </ul>
      <h4>How It Works</h4>
      <ol>
        <li>Send Your Deposit</li>
        <li>Discuss Your Requirements</li>
        <li>We Secure the Car</li>
        <li>Final Payment and Shipping</li>
      </ol>
      <h4>Already Found the Car You Want? Let Us Handle the Rest</h4>
      <p>
        If you’re already browsing auction platforms and have a specific car in mind, we can help you secure it! Simply provide us with:
      </p>
      <ul>
        <li>The lot number</li>
        <li>The make and model</li>
        <li>The auction date</li>
      </ul>
      <h4>Service Fee</h4>
      <p>
        We charge a transparent service fee per car. Please get in touch with us to learn more about the fee structure and additional services available.
      </p>
      <h4>Exclusive Benefits</h4>
      <ul>
        <li>Flexible Payment Options</li>
        <li>Container Consolidation Services</li>
      </ul>
      <h4>Why Japanese Car Auctions?</h4>
      <p>
        Japanese car auctions, operated by major auction houses like USS, TAA, and JU, are among the most reliable and efficient markets for sourcing quality vehicles. With over <strong>45,000 vehicles listed daily</strong> across more than 190 auction houses, buyers can access a massive inventory that ranges from economy cars to luxury models.
      </p>
      <h4>Start Your Auction Journey with Artisbay Inc.</h4>
      <p>
        Take control of your car-sourcing experience with Artisbay Inc. Whether you’re ready to buy or need assistance with the process, we’re here to help.
      </p>
      <p>
        <strong><Link className='cta-link' to='/contact'>Contact us today</Link></strong> to discuss your needs and secure the best vehicles from Japanese auctions.
      </p>
      <p>
        Already know what you want? <Link to='/invoice' className='cta-link'>Request an invoice</Link> now to make a deposit and start your purchase immediately!      
      </p>
    </div>
  );
};

export default AuctionLanding;
