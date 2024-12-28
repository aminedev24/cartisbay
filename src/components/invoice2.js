import React from 'react';
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import '../css/invoice.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};


// Modal Component
const InvoiceModal = ({ isOpen, onClose, invoiceData }) => {
    if (!isOpen) return null;

    const expiryDate = calculateExpiryDate(invoiceData.invoiceDate);

    const handlePrint = () => {
        window.print();
    };

    const handleSaveAsPDF = () => {
        const modalContent = document.querySelector('.modal-content');
        const buttons = modalContent.querySelectorAll('.no-print'); // Select elements with the 'no-print' class
    
        // Backup original styles
        const originalStyle = {
            maxHeight: modalContent.style.maxHeight,
            overflowY: modalContent.style.overflowY,
        };
    
        // Hide buttons
        buttons.forEach(button => {
            button.style.display = 'none';
        });
    
        // Temporarily remove height restrictions and scrolling
        modalContent.style.maxHeight = 'none';
        modalContent.style.overflowY = 'visible';
    
        html2canvas(modalContent, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
    
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Artisbay_invoice.pdf`);
    
            // Restore original styles
            modalContent.style.maxHeight = originalStyle.maxHeight;
            modalContent.style.overflowY = originalStyle.overflowY;
    
            // Restore buttons
            buttons.forEach(button => {
                button.style.display = '';
            });
        });
    };
    

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
                                <p style={{display: 'flex', gap : '5px'}}><FaEnvelope className='icon' />Email: contact@artisbay.com</p>
                                <p style={{display: 'flex', gap :'5px'}}><FaGlobe className='icon' />Website: artisbay.com</p>
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
                       
                        <p><strong>Beneficiary Name:</strong> {invoiceData.beneficiaryName}</p>
                        <p><strong>Bank Name:</strong> {invoiceData.bankName}</p>
                        <p><strong>Branch Name:</strong> {invoiceData.branchName}</p>
                        <p><strong>Bank Address:</strong> {invoiceData.bankAddress}</p>
                        <p><strong>Swift Code:</strong> {invoiceData.swiftCode}</p>
                        <p><strong>Account Number:</strong> {invoiceData.accountNumber}</p>
                        <p><strong>Beneficiary Address:</strong> {invoiceData.beneficiaryAddress}</p>
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

                       {/* Action Buttons */}
                       <div className="action-buttons">
                        <button className='no-print' onClick={handlePrint}>Print</button>
                        <button className='no-print' onClick={handleSaveAsPDF}>Save as PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;