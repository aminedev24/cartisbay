import React from 'react';
import '../css/bankInfo.css'; // Import the CSS file

const BankInformation = () => {
  const bankInfo = {
    beneficiaryName: 'Artisbay Inc',
    bankName: 'SUMISHIN SBI NET BANK',
    branchName: 'HOJIN DAI ICHI (BRANCH SORT CODE:106)',
    bankAddress: '3-2-1 Roppongi, Minato-ku, Tokyo-to',
    swiftCode: 'NTSSJPJT',
    accountNumber: '2628940',
    beneficiaryAddress: '5-10-44, Kasagami, Tagajyo, Miyagi, Japan',
  };

  return (
    <div className="bank-information">
      <h2>Bank Information</h2>
      <div className="bank-info-item">
        <strong>Beneficiary Name:</strong>
        <span>{bankInfo.beneficiaryName}</span>
      </div>
      <div className="bank-info-item">
        <strong>Bank Name:</strong>
        <span>{bankInfo.bankName}</span>
      </div>
      <div className="bank-info-item">
        <strong>Branch Name:</strong>
        <span>{bankInfo.branchName}</span>
      </div>
      <div className="bank-info-item">
        <strong>Bank Address:</strong>
        <span>{bankInfo.bankAddress}</span>
      </div>
      <div className="bank-info-item">
        <strong>SWIFT Code:</strong>
        <span>{bankInfo.swiftCode}</span>
      </div>
      <div className="bank-info-item">
        <strong>Account Number:</strong>
        <span>{bankInfo.accountNumber}</span>
      </div>
      <div className="bank-info-item">
        <strong>Beneficiary Address:</strong>
        <span>{bankInfo.beneficiaryAddress}</span>
      </div>
    </div>
  );
};

export default BankInformation;