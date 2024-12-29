import React,{useState} from 'react';
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import '../css/invoice.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';

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
const InvoiceModal = ({ isOpen, onClose, invoiceData, onEdit }) => {
    const [isGeneratingPdf, setIsGeneratingPdf]=useState(false); // Loading state

    if (!isOpen) return null;

    const expiryDate = calculateExpiryDate(invoiceData.invoiceDate);

    const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'
    : '/server';

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

    // Define the compressPdf function
const compressPdf = async (pdfBlob) => {
    const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());
    const compressedPdf = await pdfDoc.save({ useObjectStreams: true }); // Enable compression
    return new Blob([compressedPdf], { type: 'application/pdf' });
};

const generatePdf = async () => {
    const modalContent = document.querySelector('.modal-content');
    const buttons = modalContent.querySelectorAll('.no-print');

    // Declare originalStyle
    const originalStyle = {
        maxHeight: modalContent.style.maxHeight,
        overflowY: modalContent.style.overflowY,
    };

    // Hide buttons and adjust styles
    buttons.forEach(button => (button.style.display = 'none'));
    modalContent.style.maxHeight = 'none';
    modalContent.style.overflowY = 'visible';

    // Generate canvas with reduced quality
    const canvas = await html2canvas(modalContent, {
        scale: 1,
        logging: true,
        useCORS: true,
    });

    // Restore styles and buttons
    modalContent.style.maxHeight = originalStyle.maxHeight;
    modalContent.style.overflowY = originalStyle.overflowY;
    buttons.forEach(button => (button.style.display = ''));

    // Convert canvas to PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Compress the PDF
    const pdfBlob = pdf.output('blob');
    const compressedPdfBlob = await compressPdf(pdfBlob);

    return compressedPdfBlob;
};

const handleSendEmail = async () => {
    try {
        setIsGeneratingPdf(true);

        // Generate and compress the PDF
        const pdfBlob = await generatePdf();
        console.log(`PDF size: ${pdfBlob.size / 1024 / 1024} MB`);
        const bccRecipient = 'contact@artisbay.com'; // Replace with the BCC recipient's email

        // Convert to base64 and send email
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = async () => {
            const base64Pdf = reader.result.split(',')[1];
            const response = await fetch(`${apiUrl}/sendInvoice.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: invoiceData.customerEmail,
                    bcc: bccRecipient, // BCC recipient (hidden from the primary recipient)
                    subject: `Invoice ${invoiceData.invoiceNumber}`,
                    body: `Dear ${invoiceData.customerFullName},\n\nPlease find your invoice attached.\n\nThank you for your business!\n\nBest regards,\nArtisbay Inc.`,
                    attachment: base64Pdf,
                }),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to send email');
            const data = await response.json();
            alert(data.success || 'Email sent successfully!');
        };
    } catch (error) {
        console.error('Error sending email:', error);
        alert(error.message || 'An error occurred while sending the email.');
    } finally {
        setIsGeneratingPdf(false);
    }
};

    const handleEditInvoice = () => {
        onClose(); // Close the modal
        onEdit(invoiceData); // Pass the invoice data to the parent component for editing
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
                                <p><strong>Artisbay Inc</strong></p>
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
                            <p><strong>Country:</strong> {invoiceData.country}</p> {/* Display the country */}
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
                        {/*
                        <button className='no-print' onClick={handlePrint}>Print</button>
                        <button className='no-print' onClick={handleSaveAsPDF}>Save as PDF</button>
                        */}
                        
                        <button className='no-print' onClick={handleSendEmail} disabled={isGeneratingPdf}>
                            {isGeneratingPdf ? 'Generating PDF...' : 'Send via Email'}
                        </button>                        
                        <button className='no-print' onClick={handleEditInvoice}>Edit Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;