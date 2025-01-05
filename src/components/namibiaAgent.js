import React from "react";
import "../css/namibiaAgent.css"; // Import the CSS file

const NamibiaAgent = () => {
  return (
    <div className="namibia-agent-container">
      {/* Banner Section */}
      <div className="banner">
        <img
          src={`${process.env.PUBLIC_URL}/images/localServices/namibiaBanner.png`}
          alt="Simplify Logistics"
          className="banner-image"
        />
      </div>

      {/* Introduction Section */}
      <div className="introduction-section">
        <div className="introduction-text">
          <h2>Streamlined Logistics, Trusted Expertise</h2>
          <p>
            At Artisbay Inc., we understand that importing vehicles, tires, or parts into Namibia requires efficient and reliable clearing services. That’s why we’ve partnered with <strong>IT Import and Export CC</strong>, a trusted clearing agent with over 10 years of experience, to offer you hassle-free logistics solutions in Walvis Bay.
          </p>
        </div>
      </div>

      <div className="introduction-banner">
          <img
            src={`${process.env.PUBLIC_URL}/images/localServices/simplifyLogistics.png`}
            className="banner"
            alt="Background"
          />
      
      </div>

      {/* Why Choose Our Namibia Agent Section */}
      <div className="why-choose-section">
        <h2>Why Choose Our Services?</h2>
        <div className="why-choose-grid">
          <div className="why-choose-item">
            <h3>Reliable Clearing Agent</h3>
            <p>
              With over a decade of experience, IT Import and Export CC ensures smooth customs clearance and dependable service.
            </p>
          </div>
          <div className="why-choose-item">
            <h3>Trusted Partner</h3>
            <p>
              Our long-standing partnership guarantees your goods are handled with care and expertise.
            </p>
          </div>
          <div className="why-choose-item">
            <h3>Bonded Warehouse</h3>
            <p>
              Safe and secure storage facilities for your consignments while clearing processes are completed.
            </p>
          </div>
        </div>
      </div>

      <div className="why-choose-agent-section">
        <img
          src={`${process.env.PUBLIC_URL}/images/localServices/whynamibiaagent2.png`}
          className="banner"
          alt="Background"
        />
      
      </div>

      {/* Comprehensive Services Section */}
      <div className="comprehensive-services-section">
        <div className="services-header">
          <h2>Our Comprehensive Services</h2>
          <p>
            We offer a full range of logistics solutions tailored to meet your unique requirements. Explore our core services below.
          </p>
        </div>
        <div className="services-list">
          <div className="service-box">
            <div className="service-icon">🚛</div>
            <h3>Consolidation Service</h3>
            <p>
              Combine smaller consignments for cost-efficient shipping and handling.
            </p>
          </div>
          <div className="service-box">
            <div className="service-icon">📜</div>
            <h3>Customs Clearing & Documentation</h3>
            <p>
              Hassle-free declaration and customs clearing, including preparation of duty, permits, and all import paperwork.
            </p>
          </div>
          <div className="service-box">
            <div className="service-icon">📦</div>
            <h3>Nationwide Delivery</h3>
            <p>
              Efficient delivery to major cities like Swakopmund and Windhoek, as well as border deliveries to Botswana, Angola, and Zambia.
            </p>
          </div>
          <div className="service-box">
            <div className="service-icon">🛠️</div>
            <h3>Consignment Management</h3>
            <p>
              From unloading at the port to final delivery, we manage your goods every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h2>Get Started Today!</h2>
        <div className="contact-info">
          <p>
            Simplify your logistics now with our trusted clearing services!
          </p>
          <p>
            Contact Us: <a href="mailto:contact@artisbay.com">contact@artisbay.com</a>
          </p>
          <p>Or Contact our agent:</p>
          <p><strong>IT IMPORT AND EXPORT CC</strong></p>
          <p>CEO: Isak Titus</p>
          <p>Phone/WhatsApp: <a href="tel:+264812294597">+264 812 294 597</a></p>
          <p>
            Address: CORNER OFFICE, SAM NUYOMA STREET, OPPOSITE KFC, WALVIS BAY, NAMIBIA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NamibiaAgent;