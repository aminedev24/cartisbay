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
      imgSrc: `${process.env.PUBLIC_URL}/images/homepage/thumbnails/usedTires.png`,
    
      link: "/used-tires",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/homepage/thumbnails/howtobuyen.jpg`,
      
      link: "/help?topic=How%20to%20Buy%20used%20cars",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/homepage/thumbnails/car-dismantling.jpg`,
     
      link: "/help?topic=about%20Dismantled%20Cars",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/homepage/thumbnails/auctions.png`,
    
      link: "/help?topic=auction",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/homepage/thumbnails/howtopayen.jpg`,
     
      link: "/help?topic=About%20payement",
    },
  ];

  return (
    <div className="layout">
    <div className="container">
      

      <div className="main-content">
        <div className="homepage">
          {/* Stocklist */}
      

          <MediaSlider />
          <SearchForm />

        
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

          <div>
            <div className="ad-header-container">
                <div className="ad-banner"></div> {/* Banner Image */}
                <div className="small-image-container">
                    <div className="overlay"></div> {/* Overlay for better readability */}

                    <div className="icon-container">
                        <FaHandPointer className="small-icon" />
                        <span className="click-text">Click Here</span>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/images/formsh.png`} alt="Small Image" className="small-image" /> {/* Small Image */}
                </div>
            </div>

            <div className="text-content">
                <h2>Why choose tires from japan</h2>
                <p>Ready to stock up on high-quality used tires? Visit our dedicated <Link className='cta-link' to='/used-tires'>Wholesale Tire Orders</Link> page to explore our selection and place your order today. With Artisbay Inc., you’re guaranteed quality, reliability, and exceptional service.
                </p>
            </div>
        </div>

          <section className="stocklist-section">
            <Stocklist cars={cars} filters={filters} setFilters={setFilters} />
          </section>

          {/* Why Choose Us Section */}
          <section className="why-choose-us">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>1. Expertise and Experience</li>
              <li>2. High-Quality Products</li>
              <li>3. Customized Services for Every Need</li>
            </ul>
          </section>

        

          {/* Contact CTA Section */}
          <section className="contact-cta">
            <h2>Ready to Export?</h2>
            <p>
              Contact us today and let us help you export your next car with
              ease!
            </p>
            <Link className="cta-button" to="/contact">
              Contact Us
            </Link>
          </section>
        </div>
      </div>
      <RightSidebar />
    </div>
    </div>
  );
}

export default HomePage;
