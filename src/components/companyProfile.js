import React from 'react';
import '../css/companyProfile.css';

const CompanyProfile = (selectedTopic) => {
  const companyDetails = {
    name: "Artisbay Inc.",
    founded: "November 2024",
    address: "Miyagi Ken Sendai city",
    mainBusiness: "An online-based platform for the sale and export of used vehicles and auto parts.",
    annualSales: "[To be confirmed in 2026]",
    url: "https://artisbay.com",
    registeredinJapan: "License No. 7370001051924",
    email: 'contact@artisbay.com'
  };

  return (
    <div className="company-profile-wrapper">
      {/*<img src={`${process.env.PUBLIC_URL}/images/companyProfile.jpg`} alt={'company-profile'} className="topic-image" />*/}

      <div className="company-profile-container">
      <table className="bank-info-table">
        <tbody>
            <tr>
                <th>Company Name</th>
                <td>{companyDetails.name}</td>
            </tr>
            <tr>
                <th>Founded</th>
                <td>{companyDetails.founded}</td>
            </tr>
            <tr>
                <th>Address</th>
                <td>{companyDetails.address}</td>
            </tr>
            <tr>
                <th>Main Business Activity</th>
                <td>{companyDetails.mainBusiness}</td>
            </tr>
            <tr>
                <th>annual Sales</th>
                <td>{companyDetails.annualSales}</td>
            </tr>
            <tr>
                <th>URL</th>
                <td>{companyDetails.url}</td>
            </tr>
            <tr>
                <th>Registered in Japan</th>
                <td>{companyDetails.registeredinJapan}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{companyDetails.email}</td>
            </tr>
        </tbody>
    </table>
      </div>
    </div>
  );
};

export default CompanyProfile;
