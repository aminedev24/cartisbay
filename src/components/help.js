import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HowToBuy from './howtobuy';
import CompanyProfile from './companyProfile';
import '../css/help.css';
import TermsAndConditions from './terms';
import AntiSocialForcesPolicy from './asf';
import WhyChooseUs from './whyChooseUs';

// Define the topics
const topics = {
  help: [
    { name: "Company Profile", component: <CompanyProfile />, image: `${process.env.PUBLIC_URL}/images/company-profile.jpg` },
    { name: "Bank Information", content: "Bank information and payment options...", image: "bank-info.jpg" },
    { name: "Why Choose Artisbay Inc.", content: <WhyChooseUs />, image: "why-choose-us.jpg" },
    { name: "Terms & Conditions", content: <TermsAndConditions />, image: "terms-conditions.jpg" },
    { name: "Anti-Social Force Policy", content: <AntiSocialForcesPolicy />, image: "anti-social-force-policy.jpg" },
    { name: "How to Buy", component: <HowToBuy />, image: `${process.env.PUBLIC_URL}/images/howtobuybanner.jpeg` },
    { name: "How to Buy Used Tires", content: "Step-by-step for buying used tires...", image: "used-tires.jpg" },
  ],
  buying: [
    { name: "Dismantled Cars", content: "Information on dismantled cars...", image: "dismantled-cars.jpg" },
    { name: "How to Pay", content: "Instructions on payment methods...", image: "how-to-pay.jpg" },
  ]
};

const HelpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const topicParam = query.get('topic');

  // Set the selected topic based on the URL parameter or default to the first topic
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

  return (
    <div className="help-page">
      <div className="hero-section" style={{ backgroundImage: `url(${selectedTopic.image})` }}></div>
      <div className="help-main-content">
        <div className="sidebar">
          <h2>Help</h2>
          {topics.help.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicChange(topic)} // Update topic and URL
              className={selectedTopic.name === topic.name ? 'active' : ''}
            >
              {topic.name}
            </button>
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
        <div className="content-area">
          <h2>{selectedTopic.name}</h2>
          {selectedTopic.component || <>{selectedTopic.content}</>}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;