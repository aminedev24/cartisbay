import React,{useRef} from "react";
import "../css/usedTires.css";
import LeftSidebar from "./sidebar";
import OrderForm from "./usedTiresForm";

const UsedTires = () => {
  const targetRef = useRef(null); 
  const handleScroll = () => { 
    if (targetRef.current) { targetRef.current.scrollIntoView({ behavior: 'smooth' }); 
  }};
  return (
    <div>
    <div className="used-tires-page">
      {/* Hero Section */}
      <div className="why-choose-container">
        <h1>Why Choose Artisbay Inc. for Your Used Tires</h1>
        <div className="info-row">
          <div className="info-card">
            <img
              src={`${process.env.PUBLIC_URL}/images/premium-selection.png`}
              alt="Premium Selection"
            />
            <div className="text-content">
              <h3>Premium Selection</h3>
              <p>
                High-quality, carefully selected used tires for all seasons and
                conditions.
              </p>
            </div>
          </div>

          <div className="info-card">
            <img
              src={`${process.env.PUBLIC_URL}/images/nesting-tires.png`}
              alt="Space-Optimized Shipping"
            />
            <div className="text-content">
              <h3>Space-Optimized Shipping</h3>
              <p>
                Efficient “tires nesting” allows up to 3,000 tires per
                container, saving freight costs.
              </p>
            </div>
          </div>

          <div className="info-card">
            <img
              src={`${process.env.PUBLIC_URL}/images/manually-inspected.png`}
              alt="Meticulous Inspection"
            />
            <div className="text-content">
              <h3>Meticulous Inspection</h3>
              <p>
                Manual inspection ensures quality and safety in every tire we
                sell.
              </p>
            </div>
          </div>

          <div className="info-card">
            <img
              src={`${process.env.PUBLIC_URL}/images/bulking.png`}
              alt="Wholesale Pricing & Bulk Availability"
            />
            <div className="text-content">
              <h3>Wholesale Pricing</h3>
              <p>
                Affordable pricing for bulk orders, perfect for dealers and
                fleet managers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="order-steps-container">
        <h1>4 Simple Steps to Your Wholesale Tire Order</h1>
        <div className="step-card">
          <h3>Step 1: Send Your Order Details</h3>
          <p>
            Reach out to discuss your needs, and we’ll guide you through the
            ordering process, ensuring all your requirements are covered.
            Provide us with a list of your required tire sizes and quantities
            using our convenient form, designed to capture every detail and make
            ordering simple.
          </p>
        </div>

        <div className="step-card">
          <h3>Step 2: Secure Your Order</h3>
          <p>
            Confirm your order with a deposit of at least 30% of the agreed
            total C&F price, securing your place in our inventory.
          </p>
        </div>

        <div className="step-card">
          <h3>Step 3: Preparation Process</h3>
          <p>
            Relax while we handle the preparation. Here’s what we do to ensure
            quality and efficiency:
          </p>
          <ul>
            <li>
              Contact our suppliers to compare prices and secure the best deals.
            </li>
            <li>
              Keep you updated once half of your order is stored, at which point
              you’ll be asked to complete the balance payment.
            </li>
            <li>
              Share pictures of the tires with you, so you’re assured of the
              quality at every step.
            </li>
          </ul>
        </div>

        <div className="step-card">
          <h3>Step 4: Shipping</h3>
          <p>When your order is ready, we’ll:</p>
          <ul>
            <li>
              Book the earliest available container vessel and share all booking
              details.
            </li>
            <li>
              Provide the estimated time of departure (ETD) and estimated time
              of arrival (ETA) once confirmed by the shipping company.
            </li>
            <li>
              Stay connected with you to assist with any further needs until
              your order arrives.
            </li>
          </ul>
        </div>

        <div className="order-call-to-action">
          <p>
            <strong>Get in touch with us today to start your order!</strong> Our
            order form is here to simplify the process, so you can send us your
            tire requirements quickly and accurately.
          </p>
        </div>
      </div>
      <OrderForm />
    </div>
    </div>
  );
};

export default UsedTires;
