import React, { useState, useEffect } from "react";
import Stocklist from "./stockList";
import carData from './carData'; // Import car data
import '../css/homepage.css'; // Add your CSS file for homepage styling
import { Link } from "react-router-dom";
import LeftSidebar from "./sidebar";
import RightSidebar from "./rightsidebar";
function HomePage() {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        location: '',
        searchTerm: '',
      });

    useEffect(() => {
      setCars(carData);
    }, []);

    return (
        <div className="container">
        <LeftSidebar setFilters={setFilters} />
        <div className="main-content">
        <div className="homepage">
            {/* Stocklist */}
            <section className="stocklist-section">
                <h2>Our Stock</h2>
                <Stocklist cars={cars} filters={filters} setFilters={setFilters} />
            </section>
            {/* Hero Section 
            <section className="hero">
                <div className="hero-content">
                    <h1>Your Trusted Car Export Partner</h1>
                    <p>Discover our wide range of quality cars ready for export worldwide.</p>
                    <button className="cta-button"><Link to="stocklist">Browse Our Stock</Link></button>
                </div>
            </section>
            */}
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
                <p>Contact us today and let us help you export your next car with ease!</p>
                <Link className="cta-button" to="/contact" >Contact Us</Link>
            </section>
        </div>
        </div>
        <RightSidebar />
        </div>
    );
}

export default HomePage;
