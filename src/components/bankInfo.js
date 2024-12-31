import React from 'react';
import '../css/bankInfo.css'; // Import the CSS file
import {Link} from 'react-router-dom'; 
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
        <h3 className='notice'>important</h3>
        <p>
            
            Kindly ensure that the bank’s branch name is included alongside the bank’s name and SWIFT code to avoid delays in processing your payment. 
            If you have any questions about the payment process, please don’t hesitate to<Link className='cta-link' to='/contact'>contact us</Link>.
        </p>
    <table className="bank-info-table">
        <tbody>
            <tr>
                <th>Beneficiary Name</th>
                <td>{bankInfo.beneficiaryName}</td>
            </tr>
            <tr>
                <th>Bank Name</th>
                <td>{bankInfo.bankName}</td>
            </tr>
            <tr>
                <th>Branch Name</th>
                <td>{bankInfo.branchName}</td>
            </tr>
            <tr>
                <th>Bank Address</th>
                <td>{bankInfo.bankAddress}</td>
            </tr>
            <tr>
                <th>SWIFT Code</th>
                <td>{bankInfo.swiftCode}</td>
            </tr>
            <tr>
                <th>Account Number</th>
                <td>{bankInfo.accountNumber}</td>
            </tr>
            <tr>
                <th>Beneficiary Address</th>
                <td>{bankInfo.beneficiaryAddress}</td>
            </tr>
        </tbody>
    </table>
</div>
  );
};

export default BankInformation;