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

      link: "/help?topic=about%20Dismantled%20Cars",
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
    }
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
        {/*
        <section className="stocklist-section">
          <Stocklist cars={cars} filters={filters} setFilters={setFilters} />
        </section>

        */}
        
        
        <div>
          <div className="ad-header-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/tiresfromjapanhome.jpeg`}
              className="ad-banner"
            />
            <Link to='/help?topic=about%20used%20Tires'><button className="order-now">read more</button></Link>
        
          </div>

          <div className="ad-header-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/dismantlingbannerforhome.jpeg`}
              className="ad-banner"
            />
            <Link to='/help?topic=about%20Dismantled%20Cars'><button className="dismantling-btn">read more</button></Link>
        
          </div>
            
         
          <div className="ad-container">

          <div className="bordered">
              <p className="bold-text">
                Be careful, avoid being scammed! Confirm our correct bank account before you send your money!
              </p>
              <div className='small-banners'>
                <div className="small-banner-container">
                  <img
                  src={`${process.env.PUBLIC_URL}/images/dontbevictim.png`}
                  className="small-banner"
                  alt="security alert banner"
                />
                <Link to='/help?topic=security'><button className="small-banner-btn">Read more</button></Link>
                
                </div>
              </div>
             
            

            </div>
            <div className="bordered">
              <p className="bold-text">
                Discover the convenience of PayPal for secure and fast payments.
                Sign up today and start experiencing seamless transactions.
              </p>
             
              <img
                src={`${process.env.PUBLIC_URL}/images/paypalbannerhome.png`}
                className="ad-banner"
                alt="PayPal Banner"
              />
              <button className="cta-btn"><Link to='/help?topic=paypal'>Details</Link></button>

            </div>
            <div className="bordered">
              <p className="bold-text">
                Don't miss out! Register now to unlock exclusive benefits and
                gain access to a world of easy online services.
              </p>
              <img
                src={`${process.env.PUBLIC_URL}/images/registernowhome.jpeg`}
                className="ad-banner"
                alt="Register Now Banner"
              />
              <Link to='/register'><button className="register-now-btn">Register now</button></Link>
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
                <Link to='/help?topic=our%20commitment%20to%C2%A0Sustainability'><button className="small-banner-btn eco-btn">Read more</button></Link>
                
            </div>
            <img src={`${process.env.PUBLIC_URL}/images/whychooseushome.png`} alt="Why Choose Us" />
            
            <p className='bold-text'>
                With over 40 years of experience and a passion for quality, 
                we deliver high-standard used vehicles, tires, and parts tailored to your needs. 
                Our transparent processes and detailed documentation ensure confidence and trust 
                in every transaction. <Link className="cta-link" to="/help?topic=Why%20Choose%20Artisbay%20Inc.">
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
