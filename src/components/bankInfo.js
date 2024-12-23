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
    <div className="bank-information terms-container">
    <h2>Bank Information</h2>
    <div className="bank-info-grid"> {/* New container for grid layout */}
        <div className="bank-info-item">
            <h2>Beneficiary Name:</h2>
            <p>{bankInfo.beneficiaryName}</p>
        </div>
        <div className="bank-info-item">
            <h2>Bank Name:</h2>
            <p>{bankInfo.bankName}</p>
        </div>
        <div className="bank-info-item">
            <h2>Branch Name:</h2>
            <p>{bankInfo.branchName}</p>
        </div>
        <div className="bank-info-item">
            <h2>Bank Address:</h2>
            <p>{bankInfo.bankAddress}</p>
        </div>
        <div className="bank-info-item">
            <h2>SWIFT Code:</h2>
            <p>{bankInfo.swiftCode}</p>
        </div>
        <div className="bank-info-item">
            <h2>Account Number:</h2>
            <p>{bankInfo.accountNumber}</p>
        </div>
        <div className="bank-info-item">
            <h2>Beneficiary Address:</h2>
            <p>{bankInfo.beneficiaryAddress}</p>
        </div>
    </div>
</div>
  );
};

export default BankInformation;