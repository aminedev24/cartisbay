import React, { useState, useEffect, useRef } from "react";
import Stocklist from "./stockList";
import carData from "./carData"; // Import car data
import "../css/homepage.css"; // Add your CSS file for homepage styling
import { Link } from "react-router-dom";
import LeftSidebar from "./sidebar";
import RightSidebar from "./rightsidebar";
import SearchForm from "./searchContainer";
import MediaSlider from "./slider";
import Makestypes from "./makestypes";
import { FaHandPointer } from "react-icons/fa";

function HomePage() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    location: "",
    searchTerm: "",
  });

  useEffect(() => {
    setCars(carData);
  }, []);

  const cards = [
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/usedtires.png`,

      link: "/used-tires",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/howToBuy.png`,

      link: "/help?topic=How%20to%20Buy%20used%20cars",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/cardismantling.png`,

      link: "/car-dismantling",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/auction.png`,

      link: "/help?topic=auction",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/Thumbnails/machinery.png`,

      link: "/help?topic=Machinery",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/howtopay.png`,

      link: "/help?topic=About%20payement",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/Thumbnails/security.png`,

      link: "/help?topic=security",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/Thumbnails/eco.png`,

      link: "/help?topic=our%20commitment%20to%C2%A0Sustainability",
    },
  ];

  const links1 = [
    { text: "OVERVIEW", path: "/help?topic=Overview" },
    { text: "COMPANY PROFILE", path: "/help?topic=Company%20Profile" },
    { text: "BANK INFORMATION", path: "/help?topic=Bank%20Information" },
    { text: "WHY CHOOSE ARTISBAY INC", path: "/help?topic=Why%20Choose%20Artisbay%20Inc." },
    { text: "TERMS AND CONDITIONS", path: "/help?topic=Terms%20%26%20Conditions" },
    { text: "ANTI SOCIAL FORCES POLICY", path: "/help?topic=Anti-Social%20Force%20Policy" },
    { text: "HOW TO BUY CARS ON ARTISBAY INC", path: "/help?topic=How%20to%20Buy%20used%20cars" },
    
];

const links2 = [
    { text: "ABOUT USED TIRES", path: "/help?topic=about%20used%20Tires" },
    { text: "ABOUT DISMANTLED CARS", path: "/help?topic=about%20Dismantled%20Cars" },
    { text: "ABOUT PAYMENT", path: "/help?topic=About%20payement" },
    { text: "SECURITY", path: "/help?topic=security" },
    { text: "PAYPAL", path: "/help?topic=paypal" },
    { text: "TELEGRAPHIC TRANSFER", path: "/help?topic=telegraphic%20transfer" }
];

  return (
    <div className="layout">
      <div className="container">
        <div className="main-content">
          <div className="homepage">
            <MediaSlider />
            <SearchForm />
          </div>
          <RightSidebar />
        </div>
        <div className="info-cards-container">
          {cards.map((card, index) => (
            <Link to={card.link} className="info-card-link" key={index}>
              <div className="info-card">
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  className="info-card-image"
                />
              </div>
            </Link>
          ))}
        </div>

        <Makestypes />
        <div class="usefulLinks_wrapper">
          <div class="usefulLinks_container">
            <img className="title-img" src={`${process.env.PUBLIC_URL}/images/usefullLinksTitle.png`} alt="usefullLinks" />
            
            <div className="links">
            <ul>
                {links1.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.text}</Link>
                    </li>
                ))}
            </ul>
            <ul>
                {links2.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
            <div class="image-usefulLinks_container">
              <img
                alt="A large signboard with the ARTISBAY logo and the text 'ARTISBAY INC. DESIGNED TO SERVE YOU' in front of a modern building with glass windows."
                src={`${process.env.PUBLIC_URL}/images/companyProfile.jpg`}
              />
            </div>
           
          </div>
        </div>
        {/*
        <section className="stocklist-section">
          <Stocklist cars={cars} filters={filters} setFilters={setFilters} />
        </section>

        */}

        <div>
          <div className="ad-header-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/tiresbannerhome.jpeg`}
              className="ad-banner"
            />
            <Link to="/help?topic=about%20used%20Tires">
              <button className="order-now">read more</button>
            </Link>
          </div>

          <div className="ad-header-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/dismantlinghome.jpeg`}
              className="ad-banner"
            />
            <Link to="/car-dismantling">
              <button className="dismantling-btn">read more</button>
            </Link>
          </div>

          <div className="ad-header-container">
            <div className='bordered'>
            <img
              src={`${process.env.PUBLIC_URL}/images/paymentmethodshome.png`}
              className="ad-banner"
            />
            <Link to="/help?topic=security">
              <button className="security-btn">read more</button>
            </Link>
            <Link to="/help?topic=paypal">
              <button className="paypal-btn">read more</button>
            </Link>
            <Link to="/help?topic=telegraphic%20transfer">
              <button className="bank-btn">read more</button>
            </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <section className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <div className="small-banner-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/ecofriendlyhome.png`}
              className="small-banner"
              alt="eco friendly banner"
            />
            <Link to="/help?topic=Sustainability">
              <button className="small-banner-btn eco-btn">Read more</button>
            </Link>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/images/whychooseushome.png`}
            alt="Why Choose Us"
          />

          <p className="bold-text">
            With over 40 years of experience and a passion for quality, we
            deliver high-standard used vehicles, tires, and parts tailored to
            your needs. Our transparent processes and detailed documentation
            ensure confidence and trust in every transaction.{" "}
            <Link
              className="cta-link"
              to="/help?topic=Why%20Artisbay%20Inc."
            >
              Read more
            </Link>
          </p>
        </section>

        {/* Contact CTA Section */}
        <section className="contact-cta">
          <h2>Need help?</h2>
          <p>
            Contact us today and let us help you import your next car with ease!
          </p>
          <Link className="cta-button" to="/contact">
            Contact Us
          </Link>
        </section>

       
      </div>
    </div>
  );
}

export default HomePage;
