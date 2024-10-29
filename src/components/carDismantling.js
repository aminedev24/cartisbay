import React from 'react';
import '../css/carDismantling.css'; // Import the CSS file
import LeftSidebar from './sidebar';

const CarDismantling = () => {
  return (
    <div className='main-content'>
    <section className="carDismantling-container">
      {/* Image */}
      <LeftSidebar />
      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/car-dismantling-lp.jpg`}
          alt="Car dismantling process"
          className="image"
        />
      </div>

      {/* Text Content */}
      <div className="text-container">
        <h2 className="title">
          Tailored Car Dismantling and Shipping from Japan
        </h2>
        <p className="paragraph">
          We offer you the flexibility to choose cars directly from Japan’s main auctions, purchasing them only when they meet your specific requirements. Our approach balances cost efficiency with securing the right vehicles without missing opportunities at auction.
        </p>
        <p className="paragraph">
          Each car is dismantled exactly to your specifications, maximizing container space by carefully organizing and wrapping each part to prevent damage and ensure security during transport.
        </p>
        <p className="paragraph">
          We provide photo options at every stage—before, during, and after loading—so you have complete visibility. With us, you get a fully customized, secure, and cost-effective car dismantling and shipping service that meets your needs.
        </p>
      </div>
    </section>
    </div>
  );
};

export default CarDismantling;
