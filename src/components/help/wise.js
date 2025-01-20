import React from 'react';

const WisePaymentInstructions = () => {
  return (
    <div className='terms-container'>
      <h3>Payment via Wise</h3>
      <p>Sending Money to Artisbay Inc. via Wise</p>
      <p>Wise is a convenient option for sending money to Artisbay Inc. It offers low fees, fast transfers, and real exchange rates, making it a practical solution for international payments.</p>
      <h3>How to Use Wise:</h3>
      <ol>
        <li>Create an Account: If you’re new to Wise, visit <a target="_blank" href='https://wise.com/' className='cta-link'>Wise’s website </a> and sign up for an account.</li>
        <li>Enter Payment Details: Add Artisbay Inc. as the recipient. You’ll need our bank details, including the account number, SWIFT/BIC code, and other relevant information provided in your invoice.</li>
        <li>Enter the Amount: Specify the amount you want to transfer, and Wise will show the exact fees and exchange rate upfront.</li>
        <li>Make the Payment: Fund the transfer using your bank account, debit card, or other available payment methods.</li>
        <li>Confirm and Track: Review all details before confirming. Once sent, you can track the status of your transfer online or through the Wise app.</li>
      </ol>
      <p>Ready to get an invoice? <a className='cta-link' href="#/invoice">Click here</a>.</p>
      <p>Wanna check the help section on Wise’s website? <a target="_blank" className='cta-link' href="https://wise.com/help">Click here</a>.</p>
      <p>Need more help from us? <a className='cta-link' href="#/contact">Contact us</a>.</p>
    </div>
  );
};

export default WisePaymentInstructions;
