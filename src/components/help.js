import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HowToBuy from './howtobuy';
import CompanyProfile from './companyProfile';
import '../css/help.css';
import TermsAndConditions from './terms';
import AntiSocialForcesPolicy from './asf';
import WhyChooseUs from './whyChooseUs';
import CarDismantlingService from './dismantling';
import ArtisbayOverview from './overview';
import EnvironmentalMessage from './envirementPolicy';
import PaymentPolicy from './securityNotice';
import PaypalInfo from './paypal'; 
import ArtisbayInfo from './whyArtisbay';
import PaymentMethods from './paymentMethods';

  // Define the topics
  const topics = {
    help: [
      { name: "help", content: <h1>All you need to know <br />about us</h1>, image: 'overview.jpg' },
      { name: "Overview", component: <ArtisbayOverview />, image: 'overview.jpg' },
      { name: "Company Profile", component: <CompanyProfile/> },
      { name: "Bank Information", content: "Bank information and payment options...", image: "bank-info.jpg" },
      { name: "Why Choose Artisbay Inc.", content: <ArtisbayInfo />, image: "why-choose-us.jpg" },
      { name: "Terms & Conditions", content: <TermsAndConditions />, image: "terms-conditions.jpg" },
      { name: "Anti-Social Force Policy", content: <AntiSocialForcesPolicy />, image: "anti-social-force-policy.jpg" },
      { name: "How to Buy", component: <HowToBuy />},
      { name: "How to Buy Used Tires", content: "Step-by-step for buying used tires...", image: "used-tires.jpg" },
    ],
    buying: [
      { name: "about Dismantled Cars", content: <CarDismantlingService />},
      { name: "About payement", component: <PaymentMethods />, image: "how-to-pay.jpg" },
      { name: "security", content: <PaymentPolicy />, image: "envirement.jpg" },
      { name: "paypal", content: <PaypalInfo />, image: "envirement.jpg" },
      { name: "Environment policy", content: <EnvironmentalMessage />, image: "envirement.jpg" }
      
    ]
  };


const HelpPage = () => {
    // Set the selected topic based on the URL parameter or default to the first topic
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const topicParam = query.get('topic');
    const initialTopic = topics.help.find(topic => topic.name === topicParam) || topics.help[0];
    const [selectedTopic, setSelectedTopic] = useState(initialTopic);


  // Update the URL whenever the selected topic changes
  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    navigate(`/help?topic=${encodeURIComponent(topic.name)}`); // Update the URL
  };

  useEffect(() => {
    // Update the selected topic if the URL changes
    if (topicParam) {
      const foundTopic = topics.help.find(topic => topic.name === topicParam);
      if (foundTopic) {
        setSelectedTopic(foundTopic);
      }
    }
  }, [topicParam]);

  console.log(selectedTopic)
  return (
    <div className="help-page">
      <div className={`help-main-content ${selectedTopic.name === 'help' ? 'help-lp' : ''}`}>
        <div className="sidebar">
          <h2>Help</h2>
          <img width={'50px'} src={`${process.env.PUBLIC_URL}/images/arrows.png`} />
          {topics.help.map((topic, index) => (
            // Only render the button if the topic name is not "help"
            topic.name !== 'help' && (
              <button
                key={index}
                onClick={() => handleTopicChange(topic)} // Update topic and URL
                className={selectedTopic.name === topic.name ? 'active' : ''} 
              >
                {topic.name}
              </button>
            )
          ))}
          {topics.buying.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicChange(topic)} // Update topic and URL
              className={selectedTopic.name === topic.name ? 'active' : ''}
            >
              {topic.name}
            </button>
          ))}
        </div>
        <div className={`content-area`}>
          <h2>{selectedTopic.name === 'help' ? '' : selectedTopic.name}</h2>
          {selectedTopic.component || <>{selectedTopic.content}</>}
        </div>
      </div>
    </div>
);
};

export default HelpPage;