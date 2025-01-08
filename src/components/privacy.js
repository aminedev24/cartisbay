import React from 'react';
import { Link } from 'react-router-dom';
import AgreementForm from './agreementForm';
import ProfilePage from './profile2';
const PrivacyPolicy = ({userProfile}) => {
  return (
    <div className='terms-container'>
      {userProfile ? <h1>Privacy</h1> : ''}
      <p>At Artisbay Inc., we are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, store, and share your information when you interact with our services.</p>
      
      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, and billing details.</li>
        <li><strong>Transaction Information:</strong> Details of orders, payments, shipment records, and auction data.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our website and services, including IP address, browser type, and cookies.</li>
        <li><strong>Visual Documentation:</strong> Photos or videos of cars, tires, or other products related to your orders, captured during dismantling, packing, or shipping for transparency and service verification. These may also be stored in our database for marketing purposes or to improve our services.</li>
      </ul>
      
      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Processing orders and providing our services, including vehicle dismantling, packing, and shipping.</li>
        <li>Documenting and sharing photo or video records of cars, tires, or other products to ensure transparency during the shipping process.</li>
        <li>Using stored photos or videos for marketing, such as showcasing our services, or to improve operational processes.</li>
        <li>Communicating with you about your transactions or inquiries.</li>
        <li>Improving our platform and customer experience.</li>
        <li>Supporting marketing efforts, such as promoting responsible recycling or new product offerings.</li>
        <li>Complying with legal obligations and ensuring security.</li>
      </ul>
      
      <h2>3. Sharing Your Information</h2>
      <ul>
        <li><strong>Service Providers:</strong> Logistics companies, auction houses, or other partners directly involved in fulfilling your orders, including dismantling, packing, and shipping.</li>
        <li><strong>Legal Authorities:</strong> When required to comply with applicable laws or protect our legal rights.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
      </ul>
      <p>We never sell your information to third parties.</p>
      
      <h2>4. Your Rights</h2>
      <ul>
        <li>Access, update, or delete your personal information.</li>
        <li>Opt-out of marketing communications.</li>
        <li>Request a copy of the information we hold about you.</li>
      </ul>
      <p>To exercise your rights, contact us at [Insert Contact Email].</p>
      
      <h2>5. Security of Your Information</h2>
      <p>We implement industry-standard security measures to protect your data. However, no online service can guarantee 100% security.</p>
      
      <h2>6. Cookies</h2>
      <p>We use cookies to enhance your experience. You can manage cookie preferences in your browser settings.</p>
      
      <h2>7. Updates to This Policy</h2>
      <p>This Privacy Policy may be updated periodically. The latest version will always be available on our website.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, <Link className='cta-link' to='/contact'>please contact us.</Link></p>
      {userProfile && <AgreementForm />}

    </div>
  );
};

export default PrivacyPolicy;
