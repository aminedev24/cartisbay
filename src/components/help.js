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
import UsedTiresFAQ from './aboutusedtires';
import Auction from './auction';
import TelegraphicTransfer from './telegraphicTransfer';
import PrivacyPolicy from './privacy';
import SellInArtisbay from './sellinartisbay';
import BankInformation from './bankInfo';
// Define the topics
const topics = {
  help: [
    { name: "help", content: <h1 className='help-header'>All you need to know <br />about us</h1>, image:`${process.env.PUBLIC_URL}/images/helpcopy.jpeg` },
    { name: "Overview", component: <ArtisbayOverview />, image:`${process.env.PUBLIC_URL}/images/overview.jpg`},
    { name: "Company Profile", component: <CompanyProfile/>, image : `${process.env.PUBLIC_URL}/images/companyprofilecopy.jpg`},
    { name: "Bank Information", content: <BankInformation/>, image: `${process.env.PUBLIC_URL}/images/helpcopy.jpeg`},
    { name: "Why Artisbay Inc.", content: <ArtisbayInfo />, image: `${process.env.PUBLIC_URL}/images/whychooseusrecent.jpeg` },
    { name: "sell on artisbay", component: <SellInArtisbay />, image:`${process.env.PUBLIC_URL}/images/sellonab.png` },
    { name: "Terms & Conditions", content: <TermsAndConditions />, image:  `${process.env.PUBLIC_URL}/images/terms&conditions.png` },
    { name: "Anti-Social Force Policy", content: <AntiSocialForcesPolicy />, image: `${process.env.PUBLIC_URL}/images/asf.png` },
    { name: "How to Buy used cars", component: <HowToBuy /> ,image:`${process.env.PUBLIC_URL}/images/howtobuyrecent2.jpeg`},
    { name: "about used Tires", component: <UsedTiresFAQ />, image: `${process.env.PUBLIC_URL}/images/tiresfromjapanrecent.jpeg`},
  ],
  buying: [
    { name: "about Dismantled Cars", content: <CarDismantlingService />, image: `${process.env.PUBLIC_URL}/images/dismantling&cutting.jpeg`},
    { name: "About payement", component: <PaymentMethods />, image:`${process.env.PUBLIC_URL}/images/aboutpaymentrecent.jpeg` },
    { name: "paypal", content: <PaypalInfo />, image:`${process.env.PUBLIC_URL}/images/paypalbannerrecent.jpeg` },
    { name: "telegraphic transfer", content: <TelegraphicTransfer />, image: `${process.env.PUBLIC_URL}/images/telegraphictransferrecent.jpeg` },
    { name: "security", content: <PaymentPolicy />, image:  `${process.env.PUBLIC_URL}/images/securityalert.png`},
    { name: "privacy policy", content: <PrivacyPolicy />, image:  `${process.env.PUBLIC_URL}/images/privacybanner.png`},
    { name: "Sustainability", content: <EnvironmentalMessage />, image: `${process.env.PUBLIC_URL}/images/eco3.png` },
    { name: "auction", content: <Auction />, image: `${process.env.PUBLIC_URL}/images/comingsoon.jpeg` },
    { name: "Machinery", content:'', image: `${process.env.PUBLIC_URL}/images/comingsoon.jpeg` }
  ]
};
const HelpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const topicParam = query.get('topic');
  const initialTopic = topics.help.find(topic => topic.name === topicParam) || topics.help[0];
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const foundTopic = topics.help.find(topic => topic.name === topicParam) || 
                       topics.buying.find(topic => topic.name === topicParam);
    if (foundTopic) {
      setSelectedTopic(foundTopic);
    }
    setIsLoading(false); // Set loading to false after determining the topic
  }, [topicParam]);

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    navigate(`/help?topic=${encodeURIComponent(topic.name)}`); // Update the URL
  };

  useEffect(() => {
    selectedTopic.name == "Bank Information" ? window.scrollTo(0,700):window.scrollTo(0, 0);
    
    console.log(selectedTopic.name)
  }, [location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="help-page">
      {selectedTopic.image && (
        <img style={{visibility: selectedTopic.name =="Bank Information" ? 'hidden': '' }} src={selectedTopic.image} alt={selectedTopic.name} className="topic-image" />
      )}
      <div className={`help-main-content ${
            selectedTopic.name === 'help' ? 'help-lp' : 
            selectedTopic.name === 'Sustainability' ? 'commitment-topic-lp' : ''
        }`}
      >
        <div className="sidebar">
          <button className='btn-header' onClick={() => handleTopicChange(topics.help[0])}><h2>Help</h2></button>
          <img width={'50px'} src={`${process.env.PUBLIC_URL}/images/arrows.png`} />
          {topics.help.map((topic, index) => (
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
          <h2 className={selectedTopic.name === 'our commitment to Sustainability' ? 'help-header': ''}>{selectedTopic.name === 'help' ? '' : selectedTopic.name}</h2>
          {selectedTopic.component || <>{selectedTopic.content}</>}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;