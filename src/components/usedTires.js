import React from "react";
import "../css/usedTires.css";
import LeftSidebar from "./sidebar";
import OrderForm from "./usedTiresForm";

const UsedTires = () => {
  return (
    <div className="used-tires-page">
      {/* Hero Section */}
      <section className="hero-section">
        <img
          src={`${process.env.PUBLIC_URL}/images/used-tires-banner.png`}
          alt="Used Tires"
        />
      </section>

      <div className="why-choose-container">
        <h1>Why Choose Artisbay Inc. for Your Used Tires</h1>

        <div className="image-gallery">
          <img
            src={`${process.env.PUBLIC_URL}/images/premium-selection.png`}
            alt="Premium Selection"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/nesting-tires.png`}
            alt="Space-Optimized Shipping"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/manually-inspected.png`}
            alt="Meticulous Inspection"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/bulking.png`}
            alt="Wholesale Pricing & Bulk Availability"
          />
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>Premium Selection</h3>
            <p>
              Discover our fine collection of high-quality used tires, expertly
              chosen to deliver unbeatable value, performance, and safety. We
              offer a wide range of all-season, summer, and winter tires from 13
              to 18 inches, meeting the needs of various vehicles and driving
              conditions. With our rigorous quality standards, you’re assured of
              dependable tires at a fraction of the cost.
            </p>
          </div>
          <div className="info-card">
            <h3>Space-Optimized Shipping with Tires Nesting</h3>
            <p>
              By utilizing our 40-foot containers, we maximize your order’s
              volume without compromising on quality. Through the innovative
              technique of “tires nesting,” we fit smaller tires inside larger
              ones, allowing us to load up to 3,000 tires per container—compared
              to the standard 2,000. This means more tires delivered in fewer
              shipments, saving you on freight costs. Before loading, we share
              detailed photos and, in some cases, videos, ensuring full
              transparency and peace of mind.
            </p>
          </div>
          <div className="info-card">
            <h3>Meticulous Inspection</h3>
            <p>
              Each tire undergoes a manual inspection by our experts to meet our
              strict quality standards. We check for tread depth, structural
              integrity, and overall condition to guarantee reliability. When
              you buy from Artisbay, you’re investing in tires that have been
              thoroughly evaluated and approved for safe driving.
            </p>
          </div>
          <div className="info-card">
            <h3>Wholesale Pricing & Bulk Availability</h3>
            <p>
              Take advantage of our competitive wholesale prices tailored for
              bulk purchases. Whether you’re a dealership, repair shop, or fleet
              manager, our bulk pricing makes it easy to stock up on
              high-quality tires while keeping costs low.
            </p>
          </div>
        </div>
      </div>

      <div className="order-steps-container">
        <h2>5 Simple Steps to Your Wholesale Tire Order</h2>

        <div className="step-card">
          <h3>Step 1: Connect with Artisbay Inc.</h3>
          <p>
            Reach out to discuss your needs, and we’ll guide you through the
            ordering process, ensuring all your requirements are covered.
          </p>
        </div>

        <div className="step-card">
          <h3>Step 2: Send Your Order Details</h3>
          <p>
            Provide us with a list of your required tire sizes and quantities
            using our convenient form, designed to capture every detail and make
            ordering simple.
          </p>
        </div>

        <div className="step-card">
          <h3>Step 3: Secure Your Order</h3>
          <p>
            Confirm your order with a deposit of at least 30% of the agreed
            total C&F price, securing your place in our inventory.
          </p>
        </div>

        <div className="step-card">
          <h3>Step 4: Preparation Process</h3>
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
          <h3>Step 5: Shipping</h3>
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
  );
};

export default UsedTires;
