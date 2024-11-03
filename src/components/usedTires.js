import React from 'react';
import '../css/usedTires.css';
import LeftSidebar from './sidebar';
import OrderForm from './usedTiresForm';

const UsedTires = () => {
  return (
    <div className="used-tires-page">
      {/* Hero Section */}
      <section className="hero-section">
        <img src={`${process.env.PUBLIC_URL}/images/used-tires-banner-comp2.jpg`} alt="Used Tires" />
        
      </section>

      {/* Information Cards Section */}
      <section className="info-section">
      <h1>High-Quality Used Tires for Every Need</h1>
        <div className="info-card">
          <img src={`${process.env.PUBLIC_URL}/images/premium-selection.png`} alt="Premium Selection" />
          <p>Explore our premium selection of high-quality used tires, expertly chosen to bring you value, performance, and safety. We offer a variety of all-season and summer tires in sizes from 13 to 18 inches, catering to diverse vehicle needs.</p>
        </div>
        <div className="info-card">
          <img src={`${process.env.PUBLIC_URL}/images/nesting-tires.png`} alt="Doubling the Tires" />
          <p>With our 40-foot containers, we can fit up to 2,000 tires, but by inserting smaller tires inside larger ones, we can load around 3,000 pieces, optimizing space for efficient delivery. We provide photos and in some cases videos of your order before loading, so you know exactly what to expect.</p>
        </div>
        <div className="info-card">
          <img src={`${process.env.PUBLIC_URL}/images/manually-inspected.png`} alt="Manually Inspected" />
          <p>Every tire is manually inspected to ensure it meets our quality standards before shipping. Trust us to deliver dependable, thoroughly-checked used tires for all your driving needs.</p>
        </div>
      </section>

      {/* Steps and Order Form Section */}
      <section className="order-section">
        <div className="steps-card">
          <h4>3 Simple Steps to Your Wholesale Tire Order</h4>
          <ol>
            <li><strong>Connect with Artisbay Inc:</strong> Reach out to discuss your needs, and we’ll guide you through the ordering process.</li>
            <li><strong>Send Your Order Details:</strong> Provide us with a list of your required tire sizes and the quantity for each.</li>
            <li><strong>Secure Your Order:</strong> Make a deposit of at least 30% of the agreed total C&F price to confirm your order.</li>
          </ol>
        </div>

        <div className="preparation-process">
          <h4>Preparation Process</h4>
          <p>Relax while we source and prepare the best quality used tires for you. Here’s what we do:</p>
          <ul>
            <li>Contact our suppliers to compare prices and secure the best deals.</li>
            <li>Keep you updated once half of your order has been stored, at which point you’ll be asked to complete the balance payment for us to continue.</li>
            <li>Share pictures of the tires, so you can be assured of the quality every step of the way.</li>
          </ul>
        </div>

        {/* New Shipping Section */}
        <div className="shipping-process">
          <h4>Shipping</h4>
          <p>When the order is ready, we’ll:</p>
          <ul>
            <li>Book the earliest available container vessel and share booking details with you.</li>
            <li>Provide the estimated time of departure (ETD) and the estimated time of arrival (ETA) as soon as they are confirmed by the shipping company.</li>
            <li>Stay in touch to assist with any further needs until your order reaches you.</li>
          </ul>
          <p>Get in touch with us today to start your order!</p>
        </div>

        <OrderForm />
      </section>
    </div>
  );
};

export default UsedTires;
