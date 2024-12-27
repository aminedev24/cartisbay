import React from 'react';
import '../css/invoice.css';

// Function to calculate expiry date (5 business days later)
const calculateExpiryDate = (invoiceDate) => {
    const date = new Date(invoiceDate);
    let businessDaysAdded = 0;

    while (businessDaysAdded < 5) {
        date.setDate(date.getDate() + 1);
        // Check if the day is a weekday (Monday to Friday)
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            businessDaysAdded++;
        }
    }

    return date.toLocaleDateString(); // Format the date as needed
};

// Modal Component
const InvoiceModal = ({ isOpen, onClose, invoiceData }) => {
    if (!isOpen) return null;

    const expiryDate = calculateExpiryDate(invoiceData.invoiceDate);

    return (
        <div className="invoice-modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <div className="invoice-container">
                    <div className="invoice-header">
                        <div className="header-left">
                            <img
                                alt="Artisbay Inc. Logo"
                                src={`${process.env.PUBLIC_URL}/images/Signatureforemail.png`} 
                                width="130"
                            />
                          

                            <div className="header">
                            <div className="contact-info">
                                <p>An online platform for the sale and export of used vehicles and auto parts</p>
                                <p>Registered in Japan | License No. 3700-01-051924</p>
                                <p>Email: contact@artisbay.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                        <   div className="contact-info">
                                <p>Artisbay Inc</p>
                            </div>
                            <p><strong>Date:</strong> {invoiceData.invoiceDate}</p>
                            <p><strong>Invoice:</strong> {invoiceData.invoiceNumber}</p>
                            <p><strong>Expiry Date:</strong> {expiryDate}</p>
                            <p><strong>Purpose: </strong>{invoiceData.depositPurpose}</p>
                        </div>
                    </div>
                 
                    <div className="invoice-title">Proforma Invoice</div>
                    
                    {/* Customer Details Section */}
                    <div className="invoice-info">
                        <div className="left">
                            <p><strong>Full name:</strong> {invoiceData.customerFullName}</p>
                            <p><strong>Company:</strong> {invoiceData.customerCompany}</p>
                            <p><strong>Address:</strong> {invoiceData.customerAddress}</p>
                            <p><strong>Phone Number: </strong>{invoiceData.customerPhone}</p>
                            <p><strong>Email:</strong> {invoiceData.customerEmail}</p>
                        </div>
                        <div className="right">
                            <img
                                alt="Artisbay QR code"
                                src={`${process.env.PUBLIC_URL}/images/qr.jpeg`} 
                                width="130"
                            />
                        </div>
                    </div>


                    {/* Bank Details Section */}
                    <div className="invoice-bank-info">
                        <h3>Bank Details</h3>
                        <p><strong>Beneficiary Name:</strong> {invoiceData.beneficiaryName}</p>
                        <p><strong>Bank Name:</strong> {invoiceData.bankName}</p>
                        <p><strong>Branch:</strong> {invoiceData.bankBranch}</p>
                        <p><strong>Swift Code:</strong> {invoiceData.swiftCode}</p>
                        <p><strong>Account Number:</strong> {invoiceData.accountNumber}</p>
                    </div>

                    <div className="important">
                        <span className='notice'>Important</span>
                        <span className="warning">Be careful,</span>
                        <span>avoid being scammed! Confirm our correct bank account before you send your money!</span>
                    </div>

                    <div className="items">
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                </tr>
                            
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{invoiceData.depositDescription}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='amount-container'>
                    <table className='amount-table'>
                        <tbody>
                            <tr>
                                <th>deposit amount</th>
                                <td> {invoiceData.depositAmount} {invoiceData.depositCurrency}</td>
                            </tr>
                            <tr>
                                <th>grand total</th>
                                <td> {invoiceData.depositAmount} {invoiceData.depositCurrency}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                   

                    <div className="invoice-footer">
                        <p>Thank you for your business!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;