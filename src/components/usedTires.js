import React, { useRef, useState, useEffect } from "react";
import "../css/usedTires.css";
import LeftSidebar from "./sidebar";
import OrderForm from "./usedTiresForm";
import { useLocation } from "react-router-dom";

const UsedTires = () => {
  const ratings = [
    {
      title: "Best Quality (70% and Up)",
      treadDepth: "5.6 mm (7/32 inches) or more",
      sidewallCondition: "Clean; no cracks, bulges, or visible damage.",
      overallCondition:
        "Nearly new with minimal wear and strong structural integrity.",
    },
    {
      title: "Good Quality (50% - 69%)",
      treadDepth: "4 mm to 5.5 mm (5/32 to 7/32 inches)",
      sidewallCondition: "Generally good, no major cracks or bulges.",
      overallCondition: "Shows moderate wear but remains safe.",
    },
    {
      title: "Fair Quality (30% - 49%)",
      treadDepth: "2.4 mm to 3.9 mm (3/32 to 5/32 inches)",
      sidewallCondition:
        "Signs of aging, such as cracks, dry rot, or potential bulging.",
      overallCondition: "Heavily worn with reduced safety and performance.",
    },
    {
      title: "Poor Quality (Below 30%)",
      treadDepth: "1.6 mm to 2.3 mm (2/32 to 3/32 inches)",
      sidewallCondition: "Advanced signs of aging, deep cracks, or bulging.",
      overallCondition: "Unsuitable for road use. Replacement is mandatory.",
    },
  ];

  const targetRef = useRef(null);
  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPromptedForDoubleLoading, setHasPromptedForDoubleLoading] =
    useState(false); // New state variable
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
    tireSize: "",
  });

  const updateFormData = (updatedData) => setFormData(updatedData);

  const faq = [
    {
        Q: "What types of used tires does Artisbay Inc. offer?",
        A: "We specialize in high-quality used tires for various vehicles, including passenger cars, SUVs, light trucks, and commercial vehicles. Our inventory includes a wide range of sizes, tread depths, and brands to meet your specific needs."
    },
    {
        Q: "How do you ensure the quality of used tires?",
        A: "All our used tires are thoroughly inspected for tread depth, sidewall integrity, and overall condition. Tires that do not meet our strict safety and performance standards are excluded from our inventory."
    },
    {
        Q: "Can I request specific brands or sizes?",
        A: "Yes, we offer a wide variety of brands and sizes. Let us know your requirements, and we’ll check our inventory or source them for you."
    },
    {
        Q: "Do you provide detailed photos of the tires before purchase?",
        A: "Yes, we provide detailed photos and descriptions, including tread depth and condition, to ensure complete transparency."
    },
    {
        Q: "What is the minimum order quantity for used tires?",
        A: "Orders typically start at container-sized shipments. Contact us for specific details and recommendations based on your location and needs."
    },
    {
        Q: "Do you offer discounts for bulk purchases?",
        A: "Our prices are wholesale and competitively set. While we do not generally offer additional discounts, we encourage you to contact us to discuss options. Discounts may be considered for returning customers or large quantities based on various factors."
    },
    {
        Q: "What are the shipping options for used tires?",
        A: "We ship exclusively via containerized shipments to ensure cost efficiency and quality preservation during transit."
    },
    {
        Q: "What loading options are available for containers?",
        A: "We offer two primary loading techniques: 1) Double Loading (Nesting Technique): Tires are nested together to maximize space. This method allows us to load approximately 3,000 tires for standard passenger car sizes (excluding truck and machinery tires). 2) Standard Loading: Tires are loaded individually to simplify unloading and handling. This method accommodates around 2,000 tires for standard passenger car sizes. Our team will help you choose the best option based on your order and preferences."
    },
    {
        Q: "Are there any guarantees or return policies for used tires?",
        A: "Used tires are sold 'as-is.' However, if you encounter any issues, please contact us, and we’ll do our best to assist."
    }
];


  return (
    <div>
      <div className="used-tires-page">
        <header class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">Used Tires</h1>
            <button
              className={`order-now-btn ${Object.keys(orders).length > 0 ? "resume-animation" : ""}`}
              onClick={openModal}
            >
              {Object.keys(orders).length > 0 ? "Resume Order" : "Start Order"}
            </button>
          </div>
        </header>
        <div className="usedTires-wrapper">
        <div className="reasons-wrapper">
            <h1>Why Choose Artisbay Inc. for Your Used Tires</h1>
            <section class="reasons">
              <div class="reason">
                <h2>Premium Selection</h2>
                <p>
                  Discover our curated collection of high-quality used tires,
                  expertly chosen to deliver unbeatable value, performance, and
                  safety.
                </p>
              </div>
              <div class="reason">
                <h2>Space-Optimized Shipping</h2>
                <p>
                  By utilizing our 40-foot containers, we maximize your order’s
                  volume without compromising on quality.
                </p>
              </div>
              <div class="reason">
                <h2>Wholesale Pricing & Bulk Availability</h2>
                <p>
                  Take advantage of our competitive wholesale prices tailored
                  for bulk purchases.
                </p>
              </div>
              <div class="reason">
                <h2>Meticulous Inspection</h2>
                <p>
                  Each tire undergoes a manual inspection to meet our strict
                  quality standards.
                </p>
              </div>
            </section>
          </div>

          
          <div className="tire-rating-container">
            <h1 className="tireRating-title">Passenger Car Tire Quality Ratings</h1>
            <div className="rating-grid">
              {ratings.map((rating, index) => (
                <div className="rating-card" key={index}>
                  <h2 className="rating-title">{rating.title}</h2>
                  <ul className="rating-details">
                    <li>
                      <strong>Tread Depth:</strong> {rating.treadDepth}
                    </li>
                    <li>
                      <strong>Sidewall Condition:</strong>{" "}
                      {rating.sidewallCondition}
                    </li>
                    <li>
                      <strong>Overall Condition:</strong>{" "}
                      {rating.overallCondition}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="tire-depth">
              
              <h2>Tire Tread Depth</h2>
              <p>
                Tire tread depth is a key indicator of a tire's remaining
                lifespan and performance. Below is a breakdown of ratings
                commonly used by Japanese exporters for:
              </p>
              <div className="tables">
                <div className="passenger">
                  <h3>passenger cars:</h3>
              <table>
               
                <tr>
                  <th>Tread Depth Remaining</th>
                  <th>Condition</th>
                  <th>Approximate Tread Depth</th>
                </tr>
                <tbody>
                <tr>
                  <td>70% and above</td>
                  <td>Excellent</td>
                  <td>5.6 mm and above</td>
                </tr>
                <tr>
                  <td>50%</td>
                  <td>Good</td>
                  <td>4 mm</td>
                </tr>
                <tr>
                  <td>30%</td>
                  <td>Fair</td>
                  <td>2.4~3 mm</td>
                </tr>
                <tr>
                  <td>Less than 30%</td>
                  <td>Poor (but legal)</td>
                  <td>1.6~2.4 mm</td>
                </tr>
                </tbody>
              </table>
              </div>
              <div className="small-trucks">
              <h3>Small trucks and SUVs:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Tread Depth Remaining</th>
                    <th>Condition</th>
                    <th>Approximate Tread Depth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>70% and above</td>
                    <td>Excellent</td>
                    <td>7 mm and above</td>
                  </tr>
                  <tr>
                    <td>50%</td>
                    <td>Good</td>
                    <td>5-7 mm</td>
                  </tr>
                  <tr>
                    <td>30%</td>
                    <td>Fair</td>
                    <td>3-5 mm</td>
                  </tr>
                  <tr>
                    <td>Less than 30%</td>
                    <td>Poor (but legal)</td>
                    <td>1.6-3 mm</td>
                  </tr>
                </tbody>
              </table>
              </div>
              </div>
              </div>
              <h3>Additional Notes</h3>
              <ol>
                <li>
                  <strong>New Tire Tread Depth:</strong>
                  <ul>
                    <li>
                      A new passenger car tire typically has a tread depth of
                      about 8-9 mm.
                    </li>
                    <li>
                      For other tire types:
                      <ul>
                        <li>Performance tires: Around 7 mm.</li>
                        <li>SUV and light truck tires: 10-12 mm.</li>
                        <li>
                          Winter tires: 9-12 mm for better snow and ice
                          traction.
                        </li>{" "}
                        <li>
                          Truck and bus tires: 12-20 mm, depending on
                          application.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Legal Minimum Tread Depth:</strong>
                  <p>
                    It's important to check the legal minimum tread depth
                    required in your country, as it can vary depending on local
                    laws. For example, in Japan, the legal minimum tread depth
                    for passenger vehicles is 1.6 mm, below which tires are
                    deemed unfit for road use.
                  </p>
                </li>
                <li>
                  <strong>Practical Safety Limit:</strong>
                  <p>
                    Tires with less than 30% tread remaining may still be legal
                    but are generally unsafe for optimal performance, especially
                    in wet or challenging conditions.
                  </p>
                </li>
                <li>
                  <strong>Safety Recommendation:</strong>
                  <p>
                    Regularly checking tread depth is essential for safety, as
                    insufficient tread significantly reduces traction,
                    particularly in wet conditions.
                  </p>
                </li>
              </ol>
          </div>
   
          <div className="order-steps-container">
            <h1>4 Simple Steps to Your Wholesale Tire Order</h1>
            <div className="step-card">
              <h3>Step 1: Send Your Order Details</h3>
              <p>
                Reach out to discuss your needs, and we’ll guide you through the
                ordering process, ensuring all your requirements are covered.
                Provide us with a list of your required tire sizes and
                quantities using our convenient form, designed to capture every
                detail and make ordering simple.
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
                Relax while we handle the preparation. Here’s what we do to
                ensure quality and efficiency:
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
                  Provide the estimated time of departure (ETD) and estimated
                  time of arrival (ETA) once confirmed by the shipping company.
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
                Our order form is here to simplify the process, so you can send
                us your tire requirements quickly and accurately.
              </p>
              <button
                className={`order-now-btn ${Object.keys(orders).length > 0 ? "resume-animation" : ""}`}
                onClick={openModal}
              >
                {Object.keys(orders).length > 0
                  ? "Resume Order"
                  : "Start Order"}
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-btn" onClick={closeModal}>
                  &minus;
                </button>
                <OrderForm
                  formData={formData}
                  setFormData={updateFormData}
                  orders={orders}
                  setOrders={setOrders}
                  totalUnits={totalUnits}
                  setTotalUnits={setTotalUnits}
                  hasPromptedForDoubleLoading={hasPromptedForDoubleLoading}
                  setHasPromptedForDoubleLoading={
                    setHasPromptedForDoubleLoading
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsedTires;
