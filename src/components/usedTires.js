import React from 'react';
import '../css/usedTires.css'; // Import the CSS file for styling
import LeftSidebar from './sidebar';
const UsedTires = () => {
  return (
    <div className='main-content'>
    
    <section className="usedTires-container">
        <LeftSidebar />
      {/* Image Container */}
      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/used-tires-banner.jpg`} // Update with the correct image path
          alt="High-Quality Used Tires"
          className="image"
        />
      </div>

      {/* Text Content */}
      <div className="text-container">
        <h2 className="title">High-Quality Used Tires for Every Need</h2>
        <p className="paragraph">
          Explore our premium selection of high-quality used tires, expertly chosen to bring you value, performance, and safety. We offer a variety of all-season and summer tires in sizes from 13 to 18 inches, catering to diverse vehicle needs. Every tire is manually inspected to ensure it meets our quality standards before shipping.
        </p>
        <p className="paragraph">
          With our 40-foot containers, we can fit up to 2,000 tires, but by nesting smaller tires within larger ones, we can load around 3,000 pieces, optimizing space for efficient delivery. We provide photos and, in some cases, videos of your order before loading, so you know exactly what to expect.
        </p>
        <p className="paragraph">
          Trust us to deliver dependable, thoroughly-checked used tires for all your driving needs.
        </p>
      </div>
    </section>
    </div>
  );
};

export default UsedTires;
