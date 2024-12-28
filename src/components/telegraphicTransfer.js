import React from 'react';
import { Link } from 'react-router-dom';
const TelegraphicTransfer = () => {
  return (
    <div className = 'terms-container'>
   
      {/*<img style={{ maxHeight : 'unset' }} src={`${process.env.PUBLIC_URL}/images/banktransfer.jpeg`} alt={'company-profile'} className="topic-image" />*/}
      <ol>
      <h2>How to Make a Payment via Telegraphic Transfer (T/T)</h2>
        <li>
          <h2>Receive the Invoice</h2>
          <p>After placing your order, Artisbay Inc. will send you a detailed invoice via email. This invoice will include:</p>
          <ul>
            <li>The total amount due.</li>
            <li>Our official bank account details (beneficiary: Artisbay Inc.).</li>
            <li>A unique invoice reference number for the transaction.</li>
          </ul>
        </li>
        <li>
          <h2>Verify the Payment Details</h2>
          <ul>
            <li>Double-check the bank account information on the invoice to ensure it matches our official details.</li>
            <li>Ensure the email containing the invoice is from @artisbay.com to avoid fraudulent activity.</li>
          </ul>
        </li>
        <li>
          <h2>Initiate the Transfer</h2>
          <ul>
            <li>Visit your bank (in person or via online banking) to initiate the Telegraphic Transfer (T/T).</li>
            <li>Provide the bank with the following details:</li>
            <ul>
              <li>Beneficiary name: Artisbay Inc.</li>
              <li>Bank account number and SWIFT code (as listed on the invoice).</li>
              <li>Invoice reference number to include in the transaction for easy identification.</li>
            </ul>
          </ul>
        </li>
        <li>
          <h2>Confirmation of Payment</h2>
          <ul>
            <li>Once the transfer is completed, request a payment receipt from your bank.</li>
            <li>Share the receipt with Artisbay Inc. via email to confirm your payment. This helps us verify and process your order more quickly.</li>
          </ul>
        </li>
        <li>
          <h2>Order Processing</h2>
          <p>After confirming your payment, we will proceed with your order and keep you updated on its status check out our<Link to='/help?topic=Bank%20Information' className='cta-link'>bank information</Link>for more details.</p>
        </li>
      </ol>
    </div>
  );
};

export default TelegraphicTransfer;
