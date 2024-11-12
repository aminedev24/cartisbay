import React, { useState } from 'react';
import HowToBuy from './howtobuy';
import CompanyProfile from './companyProfile';  // Import the CompanyProfile component
import '../css/help.css';
import TermsAndConditions from './terms';
import AntiSocialForcesPolicy from './asf';
import WhyChooseUs from './whyChooseUs';

// Add the new topics to the sidebar
const topics = {
  help: [
    { name: "Company Profile", component: <CompanyProfile />, image: `${process.env.PUBLIC_URL}/images/company-profile.jpg` },
    { name: "How to Buy", component: <HowToBuy />, image: `${process.env.PUBLIC_URL}/images/howtobuybanner.jpeg` },
    { name: "Anti-Social Force Policy", content: <AntiSocialForcesPolicy />, image: "anti-social-force-policy.jpg" },
    { name: "Terms & Conditions", content: <TermsAndConditions />, image: "terms-conditions.jpg" },
    { name: "Why Choose Artisbay Inc.", content:<WhyChooseUs />, image: "why-choose-us.jpg" },
    { name: "Bank Information", content: "Bank information and payment options...", image: "bank-info.jpg" },
    // Additional topics...
  ],
  buying: [
    { name: "How to Buy Used Tires", content: "Step-by-step for buying used tires...", image: "used-tires.jpg" },
    { name: "Dismantled Cars", content: "Information on dismantled cars...", image: "dismantled-cars.jpg" },
    { name: "How to Pay", content: "Instructions on payment methods...", image: "how-to-pay.jpg" },
    // Additional topics...
  ]
};

const HelpPage = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics.help[0]);

  return (
    <div className="help-page">
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${selectedTopic.image})` }}>

      </div>

      {/* Main Content */}
      <div className="help-main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Help</h2>
          {topics.help.map((topic, index) => (
            <button key={index} onClick={() => setSelectedTopic(topic)}>{topic.name}</button>
          ))}
          {topics.buying.map((topic, index) => (
            <button key={index} onClick={() => setSelectedTopic(topic)}>{topic.name}</button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="content-area">
          <h2>{selectedTopic.name}</h2>
          {/* Conditionally render component or content based on topic selection */}
          {selectedTopic.component || <p>{selectedTopic.content}</p>}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
