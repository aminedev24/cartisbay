import React from 'react';
import '../css/companyProfile.css';

const CompanyProfile = (selectedTopic) => {
  const companyDetails = {
    name: "Artisbay Inc.",
    founded: "November 2024",
    address: "Miyagi Ken Sendai city",
    mainBusiness: "Platform for the sale and export of used vehicles Sale",
    annualSales: "[To be confirmed in 2026]",
    url: "https://artisbay.com",
    registeredinJapan: "License No. 7370001051924"
  };

  return (
    <div className="company-profile-wrapper">
      {/*<img src={`${process.env.PUBLIC_URL}/images/companyProfile.jpg`} alt={'company-profile'} className="topic-image" />*/}

      <div className="company-profile-container">
        <div className="company-details">
          <div className="detail-item">
            <h2>Company Name:</h2>
            <p>{companyDetails.name}</p>
          </div>
          <div className="detail-item">
            <h2>Founded:</h2>
            <p>{companyDetails.founded}</p>
          </div>
          <div className="detail-item">
            <h2>Address:</h2>
            <p>{companyDetails.address}</p>
          </div>
          <div className="detail-item">
            <h2>Main Business Activities:</h2>
            <p>{companyDetails.mainBusiness}</p>
          </div>
          <div className="detail-item">
            <h2>Annual Sales:</h2>
            <p>{companyDetails.annualSales}</p>
          </div>
          <div className="detail-item">
            <h2>URL:</h2>
            <p><a href={companyDetails.url} target="_blank" rel="noopener noreferrer">{companyDetails.url}</a></p>
          </div>
          <div className="detail-item">
            <h2>Registered in Japan</h2>
            <p>{companyDetails.registeredinJapan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
