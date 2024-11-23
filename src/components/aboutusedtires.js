import React from 'react';
import {Link} from 'react-router-dom';

const UsedTiresFAQ = () => {
  return (
    <div className='aboutusedtires'>
      <img src={`${process.env.PUBLIC_URL}/images/tiresfromjapan.jpeg`} alt={'howtobuy-banner'} className="topic-image" />

      <h1>Why Choose Used Tires from Japan?</h1>
      <p>
        Japan is renowned for its high standards in vehicle maintenance, and used tires are no exception. Japanese roads are exceptionally well-maintained, and strict speed limits mean that tires endure less wear and tear compared to those in other countries. Additionally, Japanese drivers tend to replace their tires more frequently, ensuring that pre-owned tires are often in excellent condition with plenty of remaining tread life.
      </p>
      <h2>Why Buy Used Tires from Artisbay Inc.?</h2>
      <ul>
        <li><strong>Premium Selection:</strong> High-quality, pre-owned tires sourced from Japan’s well-maintained roads.</li>
        <li><strong>Space-Optimized Shipping:</strong> Expert tire nesting ensures efficient packing, reducing shipping costs.</li>
        <li><strong>Wholesale Pricing:</strong> Competitive rates with bulk availability for all your needs.</li>
        <li><strong>Meticulous Inspection:</strong> Every tire undergoes thorough quality checks for your peace of mind.</li>
      </ul>
      <p>
        Ready to stock up on high-quality used tires? Visit our dedicated <Link className='cta-link' to='/used-tires'>Wholesale Tire Orders</Link> page to explore our selection and place your order today. With Artisbay Inc., you’re guaranteed quality, reliability, and exceptional service.
      </p>


      <h2>What types of used tires does Artisbay Inc. offer?</h2>
      <p>We specialize in high-quality used tires for various vehicles, including passenger cars, SUVs, light trucks, and commercial vehicles. Our inventory includes a wide range of sizes, tread depths, and brands to meet your specific needs.</p>
      
      <h2>How do you ensure the quality of used tires?</h2>
      <p>All our used tires are thoroughly inspected for tread depth, sidewall integrity, and overall condition. Tires that do not meet our strict safety and performance standards are excluded from our inventory.</p>
      
      <h2>Can I request specific brands or sizes?</h2>
      <p>Yes, we offer a wide variety of brands and sizes. Let us know your requirements, and we’ll check our inventory or source them for you.</p>
      
      <h2>Do you provide detailed photos of the tires before purchase?</h2>
      <p>Yes, we provide detailed photos and descriptions, including tread depth and condition, to ensure complete transparency.</p>
      
      <h2>What is the minimum order quantity for used tires?</h2>
      <p>Orders typically start at container-sized shipments. Contact us for specific details and recommendations based on your location and needs.</p>
      
      <h2>Do you offer discounts for bulk purchases?</h2>
      <p>Our prices are wholesale and competitively set. While we do not generally offer additional discounts, we encourage you to contact us to discuss options. Discounts may be considered for returning customers or large quantities based on various factors.</p>
      
      <h2>What are the shipping options for used tires?</h2>
      <p>We ship exclusively via containerized shipments to ensure cost efficiency and quality preservation during transit.</p>
      
      <h2>What loading options are available for containers?</h2>
      <p>We offer two primary loading techniques:</p>
      <ul>
        <li><strong>Double Loading (Nesting Technique):</strong> Tires are nested together to maximize space. This method allows us to load approximately 3,000 tires for standard passenger car sizes (excluding truck and machinery tires).</li>
        <li><strong>Standard Loading:</strong> Tires are loaded individually to simplify unloading and handling. This method accommodates around 2,000 tires for standard passenger car sizes.</li>
      </ul>
      <p>Our team will help you choose the best option based on your order and preferences.</p>
      
      <h2>Are there any guarantees or return policies for used tires?</h2>
      <p>Used tires are sold “as-is.” However, if you encounter any issues, please contact us, and we’ll do our best to assist.</p>
      
      <h2>How can I place an order for used tires?</h2>
      <p>Placing an order is easy:</p>
      <ol>
        <li>Visit our website and fill out the order form with your requirements (quantity, size, brand, etc.).</li>
        <li>Alternatively, contact us directly to discuss your needs.</li>
        <li>We’ll send you a detailed quote and inventory options.</li>
        <li>Confirm your order and arrange payment via T/T or PayPal.</li>
      </ol>
      <div className="cta-container"> 
        <p>
          <strong>Get in touch with us today to start your order!</strong>{" "}
              Our order form is here to simplify the process, so you can send us
              your tire requirements quickly and accurately.
        </p>
          <button className="cta-button"><Link to='/used-tires'>Order Now</Link></button> 
      </div>
    </div>
  );
};

export default UsedTiresFAQ;