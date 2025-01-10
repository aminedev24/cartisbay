import React from "react";
import "../css/tanzaniaAgent.css"; // Import the CSS file
import FAQComponent from './faq';

const NamibiaAgent = () => {

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

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
          At Artisbay Inc., we understand that importing vehicles, tires, or parts into Namibia requires efficient and reliable clearing services. That’s why we’ve partnered with <strong>IT Import and Export CC</strong>, a trusted clearing agent with over 10 years of experience, to offer you hassle-free logistics solutions in Walvis Bay.
          </p>
          <img alt="Image of a ship and containers" src={`${process.env.PUBLIC_URL}/images/localServices/smallBanner.png`} />
        </div>
      </section>
      
      <div class="nav">

        <a onClick={() => scrollToSection('agent')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/agenticon.png`} alt='services icon'/>

        </a>

        <a onClick={() => scrollToSection('services')}>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/servicesicon.png`} alt='services icon'/>
        </a>
        <a onClick={() => scrollToSection('packages')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/stockicon.png`} alt='services icon'/>

        </a>
        <a href='#/help?topic=auction'>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/auctionicon.png`} alt='services icon'/>

        </a>
        <a onClick={() => scrollToSection('faq')}>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/faqicon.png`} alt='services icon'/>

        </a>
      
      </div>
      {/*
        <div  class="banner why-choose-agent-section">
          <img className="banner-image" alt="namibia-agent-banner" src={`${process.env.PUBLIC_URL}/images/localServices/whynamibiaagent2.png`}/>
        </div>
      */}
      
      
      <div className="background namibia-agent">
            <div className="services-text">
                <span><strong>RELIABLE CLEARING AND IMPORT SERVICES IN WALVIS BAY<br /></strong></span>
                <span><strong>Nationwide Delivery<br /></strong></span>
                <span>Efficient delivery to major cities<br /> </span>
                <span>including Swakopmund, Windhoek, and beyond.<br /></span>
                <span><strong>Border deliveries</strong> <br/></span>
                <span>to Botswana, Angola, and Zambia</span>
            </div>
      </div>
      
      <section id="services" className="section-container">
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
      
      */}


      <section id="packages" className="package-section">
        <div className="package-container">
          <div className="title">
            <h2>A Whole Package of Premium Services!</h2> 
            <span className="chevrons">
              <img 
                alt="Decorative chevrons" 
                src={`${process.env.PUBLIC_URL}/images/localServices/arrows.png`} 
              />
            </span>
          </div>
          <div className="list">
            <div className="list-item">
              <strong>Reliable Clearing Agent:</strong> With over a decade of experience, IT Import and Export CC ensures smooth customs clearance and dependable service.
            </div>
            <div className="list-item">
              <strong>Trusted Partner:</strong> Our long-standing partnership guarantees your goods are handled with care and expertise.
            </div>
            <div className="list-item">
              <strong>Bonded Warehouse:</strong> Safe and secure storage facilities for your consignments while clearing processes are completed.
            </div>
          </div>
        </div>
      </section>
   
     

      <section className="contact-section-container">
        <div class="contact">
          <div className='contact-text'>
          <h2>
            We are your Partner for Stress-Free Imports
          </h2>
          <p>
            With<strong> Artisbay Inc.</strong> <strong>and IT Import and Export CC</strong>
            , you can rest assured that your goods are in safe hands. We take care of the paperwork, customs processes, and transportation so you can focus on your business.
            <strong>
            Get started today!
            </strong>
          </p>
         
          </div>
          <img alt="Image of a handshake and a ship with containers"  src={`${process.env.PUBLIC_URL}/images/localServices/partner.png`}/>
        </div>
      </section>
      
      {/* 
        <div className="banner logistics-banner">
          <img
            src={`${process.env.PUBLIC_URL}/images/localServices/simplifylogistics2.png`}
            className="banner"
            alt="Background"
          />
      
      </div>
      */}
    

      <div id="agent" className="logistics background">
           
            <div className="logistics-agent-info">
               Contact Us: <a href="mailto:contact@artisbay.com">contact@artisbay.com</a><br />

                Or Contact our agent:<br />
                IT IMPORT AND EXPORT CC<br />
                CEO: Isak Titus<br />
                Phone/WhatsApp: 264 812 294 597<br />
                Address: CORNER OFFICE, SAM NUYOMA STREET, OPPOSITE KFC, WALVIS BAY, NAMIBIA
            </div>
        </div>

      <div id="faq" class="faq">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <FAQComponent />
      </div>
    </div>
  );
};

export default NamibiaAgent;