import React, { useRef, useState } from "react";
import "../css/usedTires.css";
import LeftSidebar from "./sidebar";
import OrderForm from "./usedTiresForm";

const UsedTires = () => {
  const targetRef = useRef(null);
  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [orders, setOrders] = useState({});
  const [totalUnits, setTotalUnits] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    maker: "",
    width: "",
    aspectRatio: "",
    rimDiameter: "",
    loadIndex: "",
    speedRating: "",
    quantity: "",
    type: "",
  });

  const updateFormData = (updatedData) => setFormData(updatedData);


  return (
    <div>
      <div className="used-tires-page">
        <header class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">
              Why Choose Artisbay Inc. for Your Used Tires
            </h1>
          </div>
        </header>

        <section class="reasons">
          <div class="reason">
            <img
              src={`${process.env.PUBLIC_URL}/images/premium-selection.png`}
              alt="Premium Selection"
            />
            <h2>Premium Selection</h2>
            <p>
              Discover our curated collection of high-quality used tires,
              expertly chosen to deliver unbeatable value, performance, and
              safety.
            </p>
          </div>
          <div class="reason">
            <img
              src={`${process.env.PUBLIC_URL}/images/nesting-tires.png`}
              alt="Space-Optimized Shipping"
            />
            <h2>Space-Optimized Shipping</h2>
            <p>
              By utilizing our 40-foot containers, we maximize your order’s
              volume without compromising on quality.
            </p>
          </div>
          <div class="reason">
            <img
              src={`${process.env.PUBLIC_URL}/images/bulking.png`}
              alt="Wholesale Pricing & Bulk Availability"
            />
            <h2>Wholesale Pricing & Bulk Availability</h2>
            <p>
              Take advantage of our competitive wholesale prices tailored for
              bulk purchases.
            </p>
          </div>
          <div class="reason">
            <img
              src={`${process.env.PUBLIC_URL}/images/manually-inspected.png`}
              alt="Meticulous Inspection"
            />
            <h2>Meticulous Inspection</h2>
            <p>
              Each tire undergoes a manual inspection to meet our strict quality
              standards.
            </p>
          </div>
        </section>

        <div className="order-steps-container">
          <h1>4 Simple Steps to Your Wholesale Tire Order</h1>
          <div className="step-card">
            <h3>Step 1: Send Your Order Details</h3>
            <p>
              Reach out to discuss your needs, and we’ll guide you through the
              ordering process, ensuring all your requirements are covered.
              Provide us with a list of your required tire sizes and quantities
              using our convenient form, designed to capture every detail and
              make ordering simple.
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
                Contact our suppliers to compare prices and secure the best
                deals.
              </li>
              <li>
                Keep you updated once half of your order is stored, at which
                point you’ll be asked to complete the balance payment.
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
                Book the earliest available container vessel and share all
                booking details.
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
              <strong>Get in touch with us today to start your order!</strong>{" "}
              Our order form is here to simplify the process, so you can send us
              your tire requirements quickly and accurately.
            </p>
            <button className="order-now-btn" onClick={openModal}>
              {Object.keys(orders).length > 0 ? 'Resume Order': 'Start Order'}
             
            </button>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
              <OrderForm 
                formData={formData}
                setFormData={updateFormData}
                orders={orders}
                setOrders={setOrders}
                totalUnits={totalUnits}
                setTotalUnits={setTotalUnits}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsedTires;
