import React from 'react';
import { Link } from 'react-router-dom';
const PaymentPolicy = () => {
  return (
    <div className='security-notice'>
      <h2>Security Notice for Payments</h2>
      <p><strong>Be careful, avoid being scammed!</strong> Confirm our correct bank account before you send your money!</p>
      <ul>
        <li>The beneficiary for all of our accounts is Artisbay Inc., and we only use the details listed below.</li>
        <li>We do not use any payment services such as Western Union.</li>
        <li>Please be cautious of fake or fraudulent emails pretending to be from Artisbay Inc. Verify that the email address ends with @artisbay.com, as this is the only domain we use.</li>
      </ul>
      <h3>Payment Policy</h3>
      <ol>
        <li><strong>No Third-Party Transactions:</strong> Artisbay Inc. does not allow local partners, clients, or external parties to collect payments on our behalf. Additionally, staff are strictly prohibited from conducting any type of transactions, including TT transfers, on behalf of clients.</li>
        <li><strong>Responsibility Disclaimer:</strong> Any payment made, received, or transferred outside our authorized channels is at the sole discretion and responsibility of the individuals involved. Artisbay Inc. accepts no liability for any costs, losses, or disputes arising from such unauthorized activities.</li>
        <li><strong>Company Rights:</strong> In cases where this policy is violated, Artisbay Inc. reserves the right to cancel, terminate, modify, or suspend any ongoing transactions or deals with the concerned customer.</li>
      </ol>
      <p>For your security, always confirm details directly with us and use only our authorized payment channels. If you have any concerns, <Link className='cta-link' to='/contact'>contact us immediately.</Link></p>
    </div>
  );
};

export default PaymentPolicy;
