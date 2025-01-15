import React from "react";
import "../css/namibiaAgent.css"; // Import the CSS file

const TanzainaAgent = () => {

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="namibia-agent-container">
      <div className="banner">
        <img className="banner-image" alt="Header image with containers and trucks" src={`${process.env.PUBLIC_URL}/images/localServices/tanzaniabanner.png`}/>
      </div>
      <h1 className="main-title">
        Streamlined Logistics, Trusted Expertise
      </h1>
      <section className="intro-container">
        <div className="intro-content">
          <p>
          At Artisbay Inc., we understand that importing vehicles, tires, or parts into Tanzaina requires efficient and reliable clearing services. That’s why we’ve partnered with <strong>star Voyage Shippers Company Limited</strong>, a trusted clearing agent with over 10 years of experience, to offer you hassle-free logistics solutions in Dar Essalam.
          </p>
          <img alt="Image of a ship and containers" src={`${process.env.PUBLIC_URL}/images/localServices/smallbanner2.png`}/>
        </div>
      </section>
      
      <div className="nav">

        <a onClick={() => scrollToSection('agent')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/agenticon.png`} alt='services icon'/>

        </a>

        <a onClick={() => scrollToSection('services')}>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/servicesicon.png`} alt='services icon'/>
        </a>
        <a onClick={() => scrollToSection('packages')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/stockicon.png`} alt='services icon'/>

        </a>
        <a href="#/help?topic=auction">
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/auctionicon.png`} alt='services icon'/>

        </a>

        <a href='#/help?topic=F%26Q'>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/faqicon.png`} alt='services icon'/>

        </a>
     
      
      </div>

       {/* 
      <div className="banner why-choose-agent-section">
        <img className="banner-image" alt="namibia-agent-banner" src={`${process.env.PUBLIC_URL}/images/localServices/tanzaniaagent.png`}/>
      </div>
      */}


    

      <div className="background tanzania-agent">
            <div className="services-text">
                <strong>RELIABLE CLEARING AND IMPORT SERVICES IN DAR ESSALAM<br /></strong>
                <strong>Nationwide Delivery<br /></strong>
                Efficient delivery to major cities, including Dar es Salaam, Arusha, and beyond.<br />
                <strong>Border deliveries</strong> <br />
                 to DR-Congo, Zambia , Zimbabwe , Malawi, Uganda
            </div>
        </div>
      
      <section id="services" className="section-container">
        <h1 className="section-title">
          Container shipment services
        </h1>
        <div className="services">
          <h3>
          1. Consolidation Service
          </h3>
          <p>
          Our Consolidation Service allows vehicles from multiple customers to be combined into a single shared container, ensuring cost-efficient shipping and streamlined handling. This service is made possible through our collaboration with our trusted partner, <strong>StarVoyage Shippers Company Limited.</strong>
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
          • Efficient delivery to major cities, including Dar Essalam, Arusha and beyond.
          <br/>
          • Border deliveries to DR-Congo, Zambia, Malawi, Uganda, Zimbabwe.
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
                src={`${process.env.PUBLIC_URL}/images/localServices/arrowscopy.png`} 
              />
            </span>
          </div>
          <div className="list">
            <div className="list-item">
              <strong>Reliable Clearing Agent:</strong> With over a decade of experience, StarVoyage Shippers 
              Company Limited ensures smooth customs clearance and dependable service.
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
   
     

      <section  className="contact-section-container">
        <div className="contact">
          <div className='contact-text'>
          <h3>
            We are your Partner for Stress-Free Imports
          </h3>
          <p>
            With<strong> Artisbay Inc. and</strong> <strong> StarVoyage Shippers Company 
            Limited.</strong>
            , you can rest assured that your goods are in safe hands. We take care of the paperwork, customs processes, and transportation so you can focus on your business.
            <strong>
            Get started today!
            </strong>
          </p>
          </div>
          <img alt="Image of a handshake and a ship with containers" height="200" src={`${process.env.PUBLIC_URL}/images/localServices/partner.png`} width="300"/>
        </div>
      </section>
      

     
      <div className="banner logistics-banner">
          <img
            src={`${process.env.PUBLIC_URL}/images/localServices/simplifylogisticsTitle.png`}
            className="banner"
            alt="Background"
          />
        <div id="agent"  className="logistics-container">
            <div className="section">
                <img alt="Star Voyage logo" src={`${process.env.PUBLIC_URL}/images/localServices/starvoyagerlogo2.png`} />
                <h5>
                Documents and paperwork:
                </h5>
                <p>
                StarVoyage Shippers Co.,Ltd
                </p>
                <p>
                Twiga House, 2nd floor, Office No.210,
                </p>
                <p>
                Samora Avenue, Dar es salaam, Tanzania.
                </p>
                <p>
                Tel: +255 752 650 650
                </p>
                <p>
                info@starvoyageshippers.com
                </p>
            </div>
            <div className="section">
                <img className='skybridge' alt="SkyBridge logo" src={`${process.env.PUBLIC_URL}/images/localServices/skybridgelogo.png`}/>
                <h5>
                Clearing and forwarding:
                </h5>
                <p>
                SkyBridge Logistics Co.Ltd
                </p>
                <p>
                Samora Tower, Samore Avenue,
                </p>
                <p>
                Dar Es Salaam
                </p>
                <p>
                Tel: +255 760 202 222
                </p>
                <p>
                sales@skybridgelg.com
                </p>
            </div>
        </div>
      </div>

    
    </div>
  );
};

export default TanzainaAgent;