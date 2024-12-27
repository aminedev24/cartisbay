import React, { useState } from 'react';
import InvoiceModal from './invoice2';
import CountryList from './countryList';
import '../css/invoice.css';

const ProformaInvoiceForm = () => {
    // Predefined Bank Details
    const bankDetails = {
        beneficiaryName: 'Artisbay Inc.',
        bankName: 'Mizuho Bank, Ltd.',
        branchName: 'Tokyo Central Branch',
        swiftCode: 'MHCBJPJT',
        accountNumber: '1234567890',
        bankAddress: '1-5-5 Otemachi, Chiyoda-ku, Tokyo 100-0004, Japan'
    };

    const [formData, setFormData] = useState({
        fullName: '',
        company: '',
        country: '',
        phone: '',
        email: '',
        depositAmount: '',
        depositCurrency: 'USD',
        depositDescription: '',
        depositPurpose: ''
    });

    const [phoneCode, setPhoneCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittedInvoiceData, setSubmittedInvoiceData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invoiceCounter, setInvoiceCounter] = useState(1000); // Initialize invoice counter

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Handle phone code for country selection
        if (name === 'country') {
            const selectedCountry = CountryList().find(
                (country) => country.label === value
            );
            
            if (selectedCountry?.countryCode) {
                setPhoneCode(selectedCountry.countryCode);
            } else {
                setPhoneCode('');
            }
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validation logic
        const requiredFields = [
            'fullName', 'country', 'phone', 
            'email', 'depositAmount', 'depositDescription', 'depositPurpose'
        ];

        const isFormValid = requiredFields.every(field => formData[field]);

        if (isFormValid) {
            // Generate invoice number automatically and set current date
            const newInvoiceData = {
                customerFullName: formData.fullName,
                customerCompany: formData.company,
                customerPhone: formData.phone,
                customerEmail: formData.email,
                invoiceNumber: invoiceCounter, // Assign the current invoice number
                invoiceDate: new Date().toISOString().split('T')[0], // Set current date in YYYY-MM-DD format
                depositAmount: formData.depositAmount,
                depositCurrency: formData.depositCurrency,
                depositDescription: formData.depositDescription,
                depositPurpose: formData.depositPurpose,
                ...bankDetails // Include bank details
            };

            setSubmittedInvoiceData(newInvoiceData);
            setIsModalOpen(true);
            setIsSubmitting(false);
            setInvoiceCounter(prevCounter => prevCounter + 1); // Increment the invoice counter
        } else {
            alert('Please fill in all required fields');
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSubmittedInvoiceData(null);
    };

    return (
        <div className='form-wrapper invoice-wrapper'>
            <div className="contact-container invoice-container">
                <form className="signup-form invoice-form" onSubmit={handleSubmit}>
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/logo3new.png`} 
                        alt="Logo" 
                        className="logo-form" 
                    />

                    <h1>Proforma Invoice Generation</h1>
                    <p className='invoice-prompt'>
                        Please fill out the details below to generate a proforma invoice.
                    </p>

                    <div className="input-group">
                        <input
                            type="text"
                            value={formData.fullName }
                            onChange={handleChange}
                            name="fullName"
                            placeholder='full name'
                            required
                        />
                        <label>Full Name <span className="required">*</span></label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            name="company"
                            placeholder='company'
                        />
                        <label>Company</label>
                    </div>

                    <div className="input-group">
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={formData.country ? "not-empty" : ""}
                            required
                        >
                            <option value="">Select Country</option>
                            {CountryList().sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
                                <option key={country.code} value={country.label}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        <label>Country <span className="required">*</span></label>
                    </div>

                    <div className="input-group phone-number-group">
                        {phoneCode && <span className="phone-code">{phoneCode}</span>}
                        <input
                            type="tel"
                            name="phone"
                            className={phoneCode ? "shrink" : ''}
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="phone number"
                            required
                        />
                        <label>Phone <span className="required">*</span></label>
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder='email'
                            required
                        />
                        <label>E-mail <span className="required">*</span></label>
                    </div>

                    <div className="input-group">
                        <div className="input-with-addon">
                            <select
                                name="depositCurrency"
                                value={formData.depositCurrency}
                                onChange={handleChange}
                            >
                                <option value="USD">USD</option>
                                <option value="JPY">JPY</option>
                                <option value="EUR">EUR</option>
                            </select>
                            <input
                                type="number"
                                name="depositAmount"
                                value={formData.depositAmount}
                                onChange={handleChange}
                                placeholder='deposit amount'
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <label>Deposit Amount <span className="required">*</span></label>
                    </div>

                    <div className="input-group">
                        <select
                            name="depositPurpose"
                            value={formData.depositPurpose}
                            onChange={handleChange}
                            className={formData.depositPurpose ? "not-empty" : ""}
                            required
                        >
                            <option value="">Select Deposit Purpose</option>
                            <option value="vehicle_purchase">Vehicle Purchase</option>
                            <option value="parts_order">Auto Parts Order</option>
                            <option value="service_fee">Service Fee</option>
                            <option value="other">Other</option>
                        </select>
                        <label>Deposit Purpose <span className="required">*</span></label>
                    </div>

                    <div className="input-group">
                        <textarea
                            name="depositDescription"
                            placeholder='deposit description'
                            value={formData.depositDescription}
                            onChange={handleChange}
                            required
                            rows="5"
                        ></textarea>
                        <label>Deposit Description <span className="required">*</span></label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Generating...' : 'Generate Invoice'}
                    </button>
                </form>
            </div>

            {/* Modal for Invoice */}
            {isModalOpen && submittedInvoiceData && (
                <InvoiceModal 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    invoiceData={submittedInvoiceData}
                />
            )}
        </div>
    );
};

export default ProformaInvoiceForm;