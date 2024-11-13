import React from 'react';
import '../css/terms.css';

const CarDismantlingService = () => {
  return (
    <div className='dismantling'>
      <h1>Tailored Car Dismantling and Shipping from Japan</h1>
      <p>
        We offer you the flexibility to choose cars directly from Japan’s main auctions, purchasing them only when they meet your specific requirements.
      </p>
      <p>
        Our approach balances cost efficiency with securing the right vehicles without missing opportunities at auction.
      </p>
      <p>
        Each car is dismantled exactly to your specifications, maximizing container space by carefully organizing and wrapping if necessary each part to prevent damage and ensure security during transport.
      </p>
      <p>
        We provide photo options at every stage—before, during, and after loading—so you have complete visibility. With us, you get a fully customized, secure, and cost-effective car dismantling and shipping service that meets your needs.
      </p>
      <button onClick={() => alert('Contact us to discuss your order')}>Contact us</button>
    </div>
  );
};

export default CarDismantlingService;
