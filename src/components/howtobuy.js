import React from 'react';
import '../css/howToBuy.css';

const HowToBuy = () => {
  const steps = [
    {
      title: "1. Order",
      details: [
        "Search for your vehicle on our website.",
        "Check the price for your destination on the car's page.",
        'Click "Request a Quote."',
        "Our sales team will contact you to finalize the purchase.",
      ],
      imageUrl:  `${process.env.PUBLIC_URL}/images/order.png`,
    },
    {
      title: "2. Payment",
      details: [
        "After receiving the invoice, pay via bank transfer or PayPal.",
        "We'll confirm receipt of your payment.",
        "Note: Bank fees are the customer's responsibility.",
      ],
      imageUrl:  `${process.env.PUBLIC_URL}/images/payment.png`,
    },
    {
      title: "3. Shipment",
      details: [
        "After payment, we'll send you the shipping schedule.",
        "Once shipped, we'll prepare documents like the Bill of Lading (B/L).",
        "Documents will be sent via DHL or can be picked up locally, depending on your region.",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/shipment.png`,
    },
    {
      title: "4. Delivery",
      details: [
        "Your vehicle arrives at the destination port.",
        "Clear customs with a local agent.",
        "Before driving, inspect brakes, oil, and coolant.",
        "Enjoy your car, and drive safely!",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/delivery.png`,
    },
  ];

  return (
    <div className="howToBuy-wrapper">
      <div className="howToBuy-container">
        <div className="howToBuy-image">
          <img src={`${process.env.PUBLIC_URL}/images/howtobuybanner.jpeg`} alt="How to Buy" />
        </div>
        <h2>How to Buy a Used Car on Artisbay Inc.</h2>
        <p className="intro-text">
          At Artisbay Inc., we offer a wide selection of used cars sourced from trusted partners in Japan and overseas.
          Our simple, step-by-step process makes it easy for anyone to purchase their ideal car, even with no prior experience.
        </p>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-text">
                <h3>{step.title}</h3>
                <ul>
                  {step.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div className="step-image">
                <img src={step.imageUrl} alt={step.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;
