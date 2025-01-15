import React from 'react';
import '../../css/howToBuy.css';
import {Link} from 'react-router-dom';

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
  const icons = [
    { title: "Order", imageUrl: `${process.env.PUBLIC_URL}/images/ordericon.png` },
    { title: "Payment", imageUrl: `${process.env.PUBLIC_URL}/images/paymenticon.png` },
    { title: "Shipment", imageUrl: `${process.env.PUBLIC_URL}/images/shipmenticon.png`},
    { title: "Delivery", imageUrl: `${process.env.PUBLIC_URL}/images/deliveryicon.png`},
  ];
  return (
      <div className="howToBuy-container terms-container">
        {/*<img style={{ maxHeight : 'unset' }} src={`${process.env.PUBLIC_URL}/images/howtobuytransparentbackground.png`} alt={'howtobuy-banner'} className="topic-image" />*/}

        <h2>How to Buy a Used Car on Artisbay Inc.</h2>
         {/* Overview Icons Section */}

         <div className="overview-icons">
          {icons.map((icon, index) => (
            <div className="icon-item" key={index}>
              <img src={icon.imageUrl} alt={`${icon.title} Icon`} />
              <h4>{icon.title}</h4>
            </div>
          ))}
        </div>

        <p className="intro-text">
          At Artisbay Inc., we offer a wide selection of used cars sourced from trusted partners in Japan and overseas.
          Our simple, step-by-step process makes it easy for anyone to purchase their ideal car, even with no prior experience.
        </p>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-text">
                <h4>{step.title}</h4>
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
        <div className="cta-container"> 
          <button className="cta-button"><Link to='/vehicleInquiry'>Order Now</Link></button> 
        </div>
      </div>
    
  );
};

export default HowToBuy;
