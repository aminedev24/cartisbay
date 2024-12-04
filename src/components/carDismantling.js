import React,{useEffect} from 'react';
import '../css/carDismantling.css'; // Import the CSS file
import LeftSidebar from './sidebar';

const CarDismantling = () => {

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []); 

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

      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/dismantling&cuttinglp.jpeg`}
          alt="Car dismantling process"
          className="image"
        />
      </div>

      <div className="pdf-container">
      <h1>How to Order Dismantled Cars</h1>
      <ol>
        <li>
          <strong>Submit Your Order Requirements:</strong> Share your detailed requirements for the vehicles, including make, model, year, condition, and any specific preference.
        </li>
        <li>
          <strong>Receive an Estimate and Pay the Initial Deposit:</strong> We will provide an estimated total cost based on your order. To start the process, a 30% deposit is required.<br/>
          <h3>Payment Methods:</h3>
            <ul>
              <li>Telegraphic Transfer (T/T)</li>
              <li>PayPal</li>
            </ul>
           
             
        </li>
        <li>
          <strong>Staged Payments and Vehicle Selection:</strong> We will source vehicles from Japanese auctions that meet your requirements. After purchasing the first batch of vehicles, you will be required to make subsequent payments to continue sourcing additional cars. This process will repeat until the entire container is filled.
        </li>
        <li>
          <strong>Confirm Dismantling Instructions:</strong> Once all vehicles for your order are secured, we’ll finalize dismantling details, including parts to retain, packaging preferences, and any other instructions.
        </li>
        <li>
          <strong>Dismantling and Packing:</strong> Our team professionally dismantles the vehicles and carefully packs the parts to maximize container space while ensuring their safety during transit.
        </li>
        <li>
          <strong>Transparent Documentation:</strong> You will receive detailed photo and video documentation at every stage—vehicle purchase, dismantling, packing, and loading—so you have complete visibility.
        </li>
        <li>
          <strong>Final Payment and Shipment:</strong> Before the shipment is dispatched, the full balance must be paid. Once payment is received, we will ship the container to your specified destination.
        </li>
        <li>
          <strong>Receive Your Order:</strong> Your shipment will arrive securely packed and organized, ready for your use or business needs.
        </li>
      </ol>
    </div>

   
    </section>
    </div>
  );
};

export default CarDismantling;
