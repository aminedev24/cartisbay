import React from "react";
import "../css/namibiaAgent.css"; // Import the CSS file

const NamibiaAgent = () => {
  return (
    <div className="namibia-agent-container">
      <div class="banner">
        <img className="banner-image" alt="Header image with containers and trucks" src={`${process.env.PUBLIC_URL}/images/localServices/namibiabanner.png`}/>
      </div>
      <div class="main-title">
        Streamlined Logistics, Trusted Expertise
      </div>
      <section className="intro-container">
        <div class="intro-content">
          <p>
          At Artisbay Inc., we understand that importing vehicles, tires, or parts into Namibia requires efficient and reliable clearing services. That’s why we’ve partnered with IT Import and Export CC, a trusted clearing agent with over 10 years of experience, to offer you hassle-free logistics solutions in Walvis Bay.
          </p>
          <img alt="Image of a ship and containers" height="200" src="https://storage.googleapis.com/a1aa/image/J1O2pn4iWu4iMlxL51KpxEtXv8TeSFE2EejNHP0de9AuArEoA.jpg" width="300"/>
        </div>
      </section>
      
      <div class="nav">
        <a href="#">
        <i class="fas fa-user">
        </i>
        Agent
        </a>
        <a href="#">
        <i class="fas fa-cogs">
        </i>
        Services
        </a>
        <a href="#">
        <i class="fas fa-box">
        </i>
        Stock
        </a>
        <a href="#">
        <i class="fas fa-gavel">
        </i>
        Auction
        </a>
        <a href="#">
        <i class="fas fa-question-circle">
        </i>
        FAQ
        </a>
      </div>

      <div id="agent" class="banner why-choose-agent-section">
        <img className="banner-image" alt="namibia-agent-banner" src={`${process.env.PUBLIC_URL}/images/localServices/whynamibiaagent2.png`}/>
      </div>
      
      <section className="section-container">
        <div class="section-title">
          Container shipment services
        </div>
        <div class="services">
          <h3>
          1. Consolidation Service
          </h3>
          <p>
          Our Consolidation Service allows vehicles from multiple customers to be combined into a single shared container, ensuring cost-efficient shipping and streamlined handling. This service is made possible through our collaboration with our trusted partner, IT Import and Export CC.
          </p>
          <h3>
          2. Customs Clearing and Documentation
          </h3>
          <p>
          • Hassle-free declaration and customs clearing.
          <br/>
          • Preparation of duty, permits, and all import paperwork for your goods.
          </p>
          <h3>
          3. Nationwide Delivery
          </h3>
          <p>
          • Efficient delivery to major cities, including Swakopmund, Windhoek, and beyond.
          <br/>
          • Border deliveries to Botswana, Angola, and Zambia.
          </p>
          <h3>
          4. Consignment Management
          </h3>
          <p>
          From unloading at the port to final delivery, we manage your goods every step of the way.
          </p>
        </div>
      </section>
      {/*
           <section className="package-section">
        <div class="package-container">
          <div class="title">
            A whole package of premium services!
            <span class="chevrons">
            <img alt="Decorative chevrons" height="20" src="https://storage.googleapis.com/a1aa/image/j0aeNr78oq0SOCLAVnXAxDTZuczmC4IPmzlhYfIC1IKlNfEoA.jpg" width="100"/>
            </span>
          </div>
          <div class="list">
            <div class="list-item">
            <strong>
              Reliable Clearing Agent:
            </strong>
            With over a decade of experience, IT Import and Export CC ensures smooth customs clearance and dependable service.
            </div>
            <div class="list-item">
            <strong>
              Trusted Partner:
            </strong>
            Our long-standing partnership guarantees your goods are handled with care and expertise.
            </div>
            <div class="list-item">
            <strong>
              Bonded Warehouse:
            </strong>
            Safe and secure storage facilities for your consignments while clearing processes are completed.
            </div>
          </div>
        </div>
      </section>
      */}
   
     

      <section className="contact-section-container">
        <div class="contact">
          <div className='contact-text'>
          <p>
          <strong> We are your Partner for Stress-Free Imports</strong>
          </p>
          <p>
            With<strong> Artisbay Inc.</strong> <strong>and IT Import and Export CC</strong>
            , you can rest assured that your goods are in safe hands. We take care of the paperwork, customs processes, and transportation so you can focus on your business.
            <strong>
            Get started today!
            </strong>
          </p>
          <p>
            Contact Us: contact@artisbay.com
            <br/>
            Or Contact our agent:
            <br/>
            <strong>
            IT IMPORT AND EXPORT CC
            </strong>
            <br/>
            CEO: Isak Titus
            <br/>
            Phone/ WhatsApp: 264 812 294 597
            <br/>
            Address: CORNER OFFICE, SAM NUYOMA STREET, OPPOSITE KFC, WALVIS BAY, NAMIBIA.
          </p>
          </div>
          <img alt="Image of a handshake and a ship with containers" height="200" src="https://storage.googleapis.com/a1aa/image/vHYYHeHKTBSHAKfdeuAIekloMsMgWqhPh2uretPIfll4DYlAF.jpg" width="300"/>
        </div>
      </section>
      

      <div className="banner logistics-banner">
          <img
            src={`${process.env.PUBLIC_URL}/images/localServices/simplifylogistics2.png`}
            className="banner"
            alt="Background"
          />
      
      </div>

      <div class="faq">
        Frequently Asked Questions
      </div>
    </div>
  );
};

export default NamibiaAgent;