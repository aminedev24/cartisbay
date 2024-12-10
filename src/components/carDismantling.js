import React, { useEffect } from "react";
import "../css/carDismantling.css"; // Import the CSS file
import LeftSidebar from "./sidebar";
import { Link } from "react-router-dom";
const CarDismantling = () => {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-content">
      <section className="carDismantling-container">
        {/* Image */}

        <div className="image-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/cutting&dism.jpeg`}
            alt="Car dismantling process"
            className="image"
          />
        </div>

        <div className="image-container cutting">
          <img
            src={`${process.env.PUBLIC_URL}/images/cuttingstyles.jpeg`}
            alt="Car dismantling process"
            className="image"
          />
        </div>
        <div className="pdf-container">
          <h2>Car Cutting and Dismantling Styles</h2>
          <div className="cutting-style">
            <h3>1. Nose Cut</h3>
            <ul>
              <li>Front bumper</li>
              <li>Headlights</li>
              <li>Grille</li>
              <li>Radiator support</li>
              <li>Occasionally includes the hood and front fenders</li>
            </ul>
            <p className="bold-text">
              Ideal for customers needing only the front-end body panels and
              accessories for repairs or replacements.
            </p>
          </div>
          <div className="cutting-style">
            <h3>2. Half Cut</h3>
            <ul>
              <li>
                Front Half: Includes the engine, transmission, dashboard, and
                front axle.
              </li>
              <li>
                Rear Half: Includes the rear axle, suspension, and rear body
                structure.
              </li>
            </ul>
            <p className="bold-text">
              A cost-efficient method to ship essential components while
              reducing container space usage.
            </p>
          </div>
          <div className="cutting-style">
            <h3>3. Rear Cut</h3>
            <ul>
              <li>Rear axle</li>
              <li>Suspension</li>
              <li>Trunk</li>
              <li>Rear bumper and tail lights</li>
            </ul>
            <p className="bold-text">
              Suitable for customers focused on rear-end repairs or spare parts
              needs.
            </p>
          </div>
          <div className="cutting-style">
            <h3>4. Combination Cuts</h3>
            <p className="bold-text">
              A mix of different cutting styles tailored to customer needs. For
              example:
            </p>
            <ul>
              <li>
                Nose Cut + Rear Cut: Shipping the front and rear ends separately
                while omitting the middle section to save space.
              </li>
              <li>
                Half Cut + Rear Cut: Combining a front half with additional rear
                components for specific use cases.
              </li>
            </ul>
            <p className="bold-text">
              This flexible approach allows customers to optimize costs and
              container space based on their requirements.
            </p>
          </div>
          <p className="bold-text">
            Each of these cutting styles can be further customized depending on
            your needs. Let us know your preferences, and we’ll handle the
            dismantling and packing process to maximize efficiency and ensure
            safe shipping.
          </p>
        </div>

        <div className="pdf-container howToOrder">
          <h1>How to Order Dismantled Cars</h1>
          <ol>
            <li>
              <strong>Submit Your Order Requirements:</strong> Share your
              detailed requirements for the vehicles, including make, model,
              year, condition, and any specific preference.
            </li>
            <li>
              <strong>Receive an Estimate and Pay the Initial Deposit:</strong>{" "}
              We will provide an estimated total cost based on your order. To
              start the process, a 30% deposit is required.
              <br />
              <h3>Payment Methods:</h3>
              <ul>
                <li>Telegraphic Transfer (T/T)</li>
                <li>PayPal</li>
              </ul>
            </li>
            <li>
              <strong>Staged Payments and Vehicle Selection:</strong> We will
              source vehicles from Japanese auctions that meet your
              requirements. After purchasing the first batch of vehicles, you
              will be required to make subsequent payments to continue sourcing
              additional cars. This process will repeat until the entire
              container is filled.
            </li>
            <li>
              <strong>Confirm Dismantling Instructions:</strong> Once all
              vehicles for your order are secured, we’ll finalize dismantling
              details, including parts to retain, packaging preferences, and any
              other instructions.
            </li>
            <li>
              <strong>Dismantling and Packing:</strong> Our team professionally
              dismantles the vehicles and carefully packs the parts to maximize
              container space while ensuring their safety during transit.
            </li>
            <li>
              <strong>Transparent Documentation:</strong> You will receive
              detailed photo and video documentation at every stage—vehicle
              purchase, dismantling, packing, and loading—so you have complete
              visibility.
            </li>
            <li>
              <strong>Final Payment and Shipment:</strong> Before the shipment
              is dispatched, the full balance must be paid. Once payment is
              received, we will ship the container to your specified
              destination.
            </li>
            <li>
              <strong>Receive Your Order:</strong> Your shipment will arrive
              securely packed and organized, ready for your use or business
              needs.
            </li>
          </ol>
        </div>

        <div className='cta-container'> 
          <p className='cta-text'>Have any questions? We're here to help!</p> 
          <button className='cta-btn'>
            <Link to='/contact'>Contact Us</Link> 
          </button>
        </div>

      </section>
    </div>
  );
};

export default CarDismantling;
