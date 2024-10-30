import React, {useState} from 'react';
import '../css/usedTires.css';
import LeftSidebar from './sidebar';

const UsedTires = () => {

  const [formData, setFormData] = useState({
    maker: 'Yokohama',
    width: '',
    aspectRatio: '',
    rimDiameter: '',
    loadRating: '',
    speedRating: ''
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="main-content">
   <section className="usedTires-container">
      {/* Main Image */}
      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/used-tires-lp-comp.jpg`}
          alt="High-Quality Used Tires"
          className="image"
        />
      </div>

      {/* Text Content */}
      <div className="text-container">
        <h2 className="title">High-Quality Used Tires for Every Need</h2>

        {/* Premium Selection Section */}
        <div className="section">
          <img
            src={`${process.env.PUBLIC_URL}/images/premium-selection.jpg`}
            alt="Premium Selection"
            className="inline-image"
          />
          <p className="paragraph">
            Explore our premium selection of high-quality used tires, expertly chosen to bring you value, performance, and safety.
          </p>
        </div>

        {/* Doubling the Tires Section */}
        <div className="section">
          <img
            src={`${process.env.PUBLIC_URL}/images/doubling-tires.jpg`}
            alt="Doubling the Tires"
            className="inline-image"
          />
          <p className="paragraph">
            By nesting smaller tires within larger ones, we can load around 3,000 pieces, optimizing space for efficient delivery.
          </p>
        </div>

        {/* Manually Inspected Section */}
        <div className="section">
          <img
            src={`${process.env.PUBLIC_URL}/images/manually-inspected.jpg`}
            alt="Manually Inspected"
            className="inline-image"
          />
          <p className="paragraph">
            Every tire is manually inspected to ensure it meets our quality standards before shipping, so you know exactly what to expect.
          </p>
        </div>

        <p className="paragraph">
          Trust us to deliver dependable, thoroughly-checked used tires for all your driving needs.
        </p>
      </div>

      {/* Steps and Additional Info */}
      <div className="steps-container">
        <h3 className="sub-title">3 Simple Steps to Your Wholesale Tire Order</h3>
        <ol className="steps-list">
          <li><strong>Connect with Artisbay Inc:</strong> Reach out to discuss your needs, and we’ll guide you through the ordering process.</li>
          <li><strong>Send Your Order Details:</strong> Provide us with a list of your required tire sizes and the quantity for each.</li>
          <li><strong>Secure Your Order:</strong> Make a deposit of at least 30% of the agreed total C&F price to confirm your order.</li>
        </ol>

        <h3 className="sub-title">Preparation Process</h3>
        <p className="paragraph">Relax while we source and prepare the best quality used tires for you. Here's what we do:</p>
        <ul className="process-list">
          <li>Contact our suppliers to compare prices and secure the best deals.</li>
          <li>Keep you updated once half of your order has been stored, at which point you’ll be asked to complete the balance payment for us to continue.</li>
          <li>Share pictures of the tires, so you can be assured of the quality every step of the way.</li>
        </ul>

        <h3 className="sub-title">Shipping</h3>
        <p className="paragraph">When the order is ready, we’ll:</p>
        <ul className="shipping-list">
          <li>Book the earliest available container vessel and share booking details with you.</li>
          <li>Provide the estimated time of departure (ETD) and the estimated time of arrival (ETA) as soon as they are confirmed by the shipping company.</li>
          <li>Stay in touch to assist with any further needs until your order reaches you.</li>
        </ul>

        <p className="contact-us">Get in touch with us today to start your order!</p>
        <p className="contact-us-button">
          <a href="/contact" className="button">Contact Us</a>
        </p>
      </div>
    </section>

      <div className="order-form-container">
      <h2>Order Your Tires</h2>
      <form className="tire-order-form">
        {/* Maker */}
        <label>
          Maker:
          <select name="maker" value={formData.maker} onChange={handleChange}>
            <option value="Yokohama">Yokohama</option>
            <option value="Bridgestone">Bridgestone</option>
            <option value="Michelin">Michelin</option>
            <option value="Continental">Continental</option>
          </select>
        </label>

        {/* Width */}
        <label>
          Width (in MM):
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            placeholder="e.g., 195"
          />
        </label>

        {/* Aspect Ratio */}
        <label>
          Aspect Ratio:
          <input
            type="number"
            name="aspectRatio"
            value={formData.aspectRatio}
            onChange={handleChange}
            placeholder="e.g., 55"
          />
        </label>

        {/* Radial Construction */}
        <label>
          Radial Construction:
          <input type="text" value="R" disabled />
        </label>

        {/* Rim Diameter */}
        <label>
          Rim Diameter:
          <input
            type="number"
            name="rimDiameter"
            value={formData.rimDiameter}
            onChange={handleChange}
            placeholder="e.g., 16"
          />
        </label>

        {/* Load Rating */}
        <label>
          Load Rating:
          <input
            type="number"
            name="loadRating"
            value={formData.loadRating}
            onChange={handleChange}
            placeholder="e.g., 87"
          />
        </label>

        {/* Speed Rating */}
        <label>
          Speed Rating:
          <input
            type="text"
            name="speedRating"
            value={formData.speedRating}
            onChange={handleChange}
            placeholder="e.g., V"
          />
        </label>
      </form>

      {/* Output Section */}
      <div className="output">
        <h3>Your Tire Selection:</h3>
        <p>{`${formData.width} / ${formData.aspectRatio} R ${formData.rimDiameter} ${formData.loadRating} ${formData.speedRating}`}</p>
      </div>
      </div>


    </div>
  );
};

export default UsedTires;
