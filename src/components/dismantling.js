import React from 'react';
import '../css/terms.css';
import {Link} from 'react-router-dom';

const CarDismantlingService = () => {
  return (
    <div className='dismantling'>
      {/*<img src={`${process.env.PUBLIC_URL}/images/car-dismantling-lp-comp.jpg`} alt={'car-dismantling-banner'} className="topic-image" />*/}

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
      <Link to='/contact'><button className='cta-btn' >Contact us</button></Link>
    </div>
  );
};

export default CarDismantlingService;
