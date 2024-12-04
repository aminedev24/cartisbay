import React from 'react';
import '../css/carDismantling.css'; // Import the CSS file
import LeftSidebar from './sidebar';

const CarDismantling = () => {
  return (
    <div className='main-content'>
    <section className="carDismantling-container">
      {/* Image */}

      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/cardismantlingandcutting.png`}
          alt="Car dismantling process"
          className="image"
        />
      </div>

   
    </section>
    </div>
  );
};

export default CarDismantling;
