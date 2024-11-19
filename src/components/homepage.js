import React, { useState, useEffect, useRef } from "react";
import Stocklist from "./stockList";
import carData from "./carData"; // Import car data
import "../css/homepage.css"; // Add your CSS file for homepage styling
import { Link } from "react-router-dom";
import LeftSidebar from "./sidebar";
import RightSidebar from "./rightsidebar";
import SearchForm from "./searchContainer";
import MediaSlider from "./slider";

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
      imgSrc: `${process.env.PUBLIC_URL}/images/usedTires.png`,
      title: "Used tires",
      link: "/used-tires",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/howtobuyen.jpg`,
      title: "How to Buy",
      link: "/help?topic=How%20to%20Buy%20used%20cars",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/car-dismantling.jpg`,
      title: "Car Dismantling",
      link: "/car-dismantling",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/auctions.png`,
      title: "Auctions",
      link: "/auctions",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/howtopayen.jpg`,
      title: "How to Pay",
      link: "/help?topic=About%20payement",
    },
  ];

  return (
    <div className="layout">
    <div className="container">
      <LeftSidebar setFilters={setFilters} />

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
                  <h3 className="info-card-title">{card.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <section className="stocklist-section">
            <Stocklist cars={cars} filters={filters} setFilters={setFilters} />
          </section>

          {/* Featured Cars Section */}
          <section className="featured-cars">
            <h2>Featured Cars</h2>
            <div className="featured-car-list">
              {cars.slice(0, 3).map((car) => (
                <div key={car.id} className="featured-car">
                  <img src={car.image} alt={car.name} />
                  <h3>{car.name}</h3>
                  <p>${car.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="why-choose-us">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>Experienced in global car export logistics</li>
              <li>Wide selection of vehicles from trusted manufacturers</li>
              <li>Competitive pricing and shipping options</li>
            </ul>
          </section>

          {/* Customer Testimonials */}
          <section className="testimonials">
            <h2>What Our Customers Say</h2>
            <div className="testimonial">
              <p>"Great experience with fast shipping. Highly recommend!"</p>
              <span>- John Doe</span>
            </div>
            <div className="testimonial">
              <p>"Reliable service and quality cars. Will buy again!"</p>
              <span>- Jane Smith</span>
            </div>
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
