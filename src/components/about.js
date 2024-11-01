import React from 'react';
import '../css/about.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="mission-statement">
        <h2>Our Mission</h2>
        <p>
          At <span className="brand-name">Artisbay</span>, we aim to deliver top-quality vehicles to customers worldwide,
          ensuring reliability, affordability, and a smooth purchasing experience.
        </p>
      </section>

      <section className="company-history">
        <h2>Company History</h2>
        <p>
          Since our establishment in <strong>2021</strong>, Artisbay has grown from a small local dealership to a leading
          international car export platform, trusted by customers across the globe.
        </p>
      </section>

      <section className="team-overview">
        <h2>Meet the Team</h2>
        <p>
          Our experienced team is dedicated to providing the best customer service, ensuring a seamless car-buying
          experience.
        </p>
        <img src="/images/team.jpg" alt="Our Team" className="team-image" />
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature-item">
            <i className="fas fa-tags"></i>
            <h4>Competitive Pricing</h4>
            <p>We offer some of the best deals on cars with competitive pricing and reliable service.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-car"></i>
            <h4>Wide Selection of Vehicles</h4>
            <p>From sedans to SUVs, we offer a wide variety of vehicles to meet your needs.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-shipping-fast"></i>
            <h4>Trusted Shipping Partners</h4>
            <p>We work with reliable shipping partners to ensure your car reaches you safely and on time.</p>
          </div>
        </div>
      </section>

      <section className="customer-testimonials">
        <h2>Customer Testimonials</h2>
        <div className="testimonials">
          <blockquote>"Fast and reliable service. My car arrived in perfect condition!"</blockquote>
          <span>- John, Australia</span>
          <blockquote>"Artisbay made the buying process smooth and hassle-free."</blockquote>
          <span>- Sarah, UK</span>
        </div>
      </section>


      <section className="sustainability">
        <h2>Sustainability and Future Goals</h2>
        <p>
          Artisbay is committed to reducing its environmental impact by adopting eco-friendly practices and exploring
          green technologies.
        </p>
      </section>
    </div>
  );
};

export default About;
