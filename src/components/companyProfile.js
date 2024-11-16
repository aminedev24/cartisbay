import React from 'react';
import '../css/companyProfile.css';

const CompanyProfile = (selectedTopic) => {
  const companyDetails = {
    name: "Artisbay Inc.",
    founded: "November 2024",
    address: "Miyagi Ken Sendai city",
    mainBusiness: "Platform for the sale and export of used vehicles Sale and export of new and used auto part",
    annualSales: "[To be confirmed in 2026]",
    url: "https://www.artisbay.com",
  };

  return (
    <div className="company-profile-wrapper">
      <img src={`${process.env.PUBLIC_URL}/images/companyProfile.jpg`} alt={'company-profile'} className="topic-image" />

      <div className="company-profile-container">
        <h2>Company Profile</h2>
        <div className="company-details">
          <div className="detail-item">
            <h3>Company Name:</h3>
            <p>{companyDetails.name}</p>
          </div>
          <div className="detail-item">
            <h3>Founded:</h3>
            <p>{companyDetails.founded}</p>
          </div>
          <div className="detail-item">
            <h3>Address:</h3>
            <p>{companyDetails.address}</p>
          </div>
          <div className="detail-item">
            <h3>Main Business Activities:</h3>
            <p>{companyDetails.mainBusiness}</p>
          </div>
          <div className="detail-item">
            <h3>Annual Sales:</h3>
            <p>{companyDetails.annualSales}</p>
          </div>
          <div className="detail-item">
            <h3>URL:</h3>
            <p><a href={companyDetails.url} target="_blank" rel="noopener noreferrer">{companyDetails.url}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
