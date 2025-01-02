import React, { useState, useEffect } from 'react';
import InvoiceModal from './invoice2';
import CountryList from './countryList';
import '../css/invoice.css';

const ProformaInvoiceForm = () => {
    // Predefined Bank Details
    const bankDetails = {
        beneficiaryName: 'Artisbay Inc',
        bankName: 'SUMISHIN SBI NET BANK',
        branchName: 'HOJIN DAI ICHI (BRANCH SORT CODE:106)',
        bankAddress: '3-2-1 Roppongi, Minato-ku, Tokyo-to',
        swiftCode: 'NTSSJPJT',
        accountNumber: '2628940',
        beneficiaryAddress: '5-10-44, Kasagami, Tagajyo, Miyagi, Japan',
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
    const [invoiceCounter, setInvoiceCounter] = useState(''); // Initialize invoice counter
    const [isLoading, setIsLoading] = useState(false); // For handling loading state
    const [error, setError] = useState(null); // For handling errors

    // Function to get the next invoice number from the backend
  const fetchInvoiceNumber = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/getInvoiceNumber.php`);
      const data = await response.json();

      if (data.invoiceNumber) {
        setInvoiceCounter(data.invoiceNumber); // Set the invoice number to state
      } else {
        setError('Failed to fetch invoice number');
      }
    } catch (err) {
      console.error('Error fetching invoice number:', err);
      setError('An error occurred while fetching the invoice number');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch invoice number when the component mounts
  useEffect(() => {
    fetchInvoiceNumber();
  }, []);

  console.log(invoiceCounter)


    const purposeDescriptions = {
        "vehicle purchase": "This payment is to order cars from the auctions in Japan",
        "auto parts order": "This payment is to order auto parts, the details will be available after the purchase",
        "dismantling": "This is a deposit to order dismantled cars, the cars details and chassis numbers will be available after the purchase",
        "tires order": "This is a deposit to order used tires",
    };


    const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'
    : '/server';

    // Fetch user data from the backend and populate form fields
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${apiUrl}/getUserInfo.php`, {
                    method: 'GET',
                    credentials: 'include',
                });
    
                if (!response.ok) {
                    console.error('Failed to fetch user data:', response.statusText);
                    return;
                }
    
                const data = await response.json();
    
                // Validate data and check structure
                if (!data || data.error || !data.data) {
                    console.error('Invalid or missing data returned from API:', data);
                    return;
                }
    
                // Destructure with fallbacks to avoid undefined values
                const {
                    full_name = '',
                    company = '',
                    country = '',
                    phone = '',
                    email = '',
                    address = '',
                } = data.data;
    
                // Set form data safely
                setFormData(prevState => ({
                    ...prevState,
                    fullName: full_name,
                    company: company,
                    country: country,
                    phone: phone,
                    email: email,
                    address: address,
                }));
    
                // Update phone code if country is valid
                if (country) {
                    const selectedCountry = CountryList().find(
                        countryItem => countryItem.label === country
                    );
                    if (selectedCountry?.countryCode) {
                        // Check if the phone number already includes the country code
                        if (phone.startsWith(selectedCountry.countryCode)) {
                            // If it does, set the phone code and remove it from the phone number
                            setPhoneCode(selectedCountry.countryCode);
                            setFormData(prevState => ({
                                ...prevState,
                                phone: phone.replace(selectedCountry.countryCode, ''),
                            }));
                        } else {
                            // If it doesn't, set the phone code
                            setPhoneCode(selectedCountry.countryCode);
                        }
                    } else {
                        setPhoneCode(''); // Clear phone code if no match
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, [apiUrl]);
    

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
    
        // Update the description when the purpose changes
        if (name === 'depositPurpose') {
            const description = purposeDescriptions[value] || '';
            setFormData(prevState => ({
                ...prevState,
                depositDescription: description, // Always update the description when the purpose changes
                [name]: value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            // Fetch the invoice number before proceeding
            await fetchInvoiceNumber();
    
            // Validation logic
            const requiredFields = [
                'fullName', 'country', 'phone', 
                'email', 'depositAmount', 'depositDescription', 'depositPurpose', 'address'
            ];
    
            const isFormValid = requiredFields.every(field => formData[field]);
    
            if (isFormValid) {
                // Combine the phone code and phone number
                const fullPhoneNumber = phoneCode + formData.phone;
    
                // Format the deposit amount with commas and append currency
                const formattedDepositAmount = new Intl.NumberFormat().format(formData.depositAmount) + ' ' + formData.depositCurrency;
    
                // Generate invoice number automatically and set current date
                const newInvoiceData = {
                    customerFullName: formData.fullName,
                    customerCompany: formData.company,
                    customerAddress: formData.address,
                    customerPhone: fullPhoneNumber, // Use the full phone number
                    customerEmail: formData.email,
                    country: formData.country, // Include the country field
                    invoiceNumber: `AB-${invoiceCounter}`, // Use updated invoiceCounter
                    invoiceDate: new Date().toISOString().split('T')[0],
                    depositAmount: formattedDepositAmount, // Store formatted deposit amount
                    depositCurrency: formData.depositCurrency,
                    depositDescription: formData.depositDescription,
                    depositPurpose: formData.depositPurpose,
                    ...bankDetails,
                };
    
                setSubmittedInvoiceData(newInvoiceData);
                setIsModalOpen(true);
                //setInvoiceCounter(prevCounter => prevCounter + 1); // Increment the invoice counter
            } else {
                alert('Please fill in all required fields');
            }
        } catch (error) {
            alert('Failed to fetch invoice number. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    

    const handleEditInvoice = (invoiceData) => {
        // Parse the deposit amount (remove commas and convert to a number)
        const depositAmount = parseFloat(invoiceData.depositAmount.replace(/,/g, ''));
    
        // Extract the phone code from the phone number (e.g., +2135898495)
        const phoneNumber = invoiceData.customerPhone;
        let phoneCode = '';
        let phoneWithoutCode = phoneNumber;
    
        // Find the country that matches the phone code
        const selectedCountry = CountryList().find((country) =>
            phoneNumber.startsWith(country.countryCode)
        );
    
        if (selectedCountry) {
            phoneCode = selectedCountry.countryCode; // Set the phone code
            phoneWithoutCode = phoneNumber.replace(phoneCode, ''); // Remove the phone code from the phone number
        }
    
        console.log(invoiceData)
        // Set the form data to the invoice data for editing
        setFormData({
            fullName: invoiceData.customerFullName,
            company: invoiceData.customerCompany,
            country: invoiceData.country || '', // Set the country if available
            phone: phoneWithoutCode, // Set the phone number without the code
            email: invoiceData.customerEmail,
            depositAmount: depositAmount || '', // Set the parsed deposit amount
            depositCurrency: invoiceData.depositCurrency,
            depositDescription: invoiceData.depositDescription,
            depositPurpose: invoiceData.depositPurpose,
            address: invoiceData.customerAddress,
        });
    
        // Set the phone code based on the extracted code
        setPhoneCode(phoneCode);
    
        // Close the modal and allow the user to edit the form
        setIsModalOpen(false);
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
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            name="address"
                            placeholder='address'
                            required
                        />
                        <label>address<span className="required">*</span></label>
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
                            <option value="vehicle purchase">Vehicle Purchase</option>
                            <option value="auto parts order">Auto Parts Order</option>
                            <option value="dismantling">Dismantling</option>
                            <option value="tires order">Tires order</option>
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
                    onEdit={handleEditInvoice} // Pass the onEdit callback
                />
            )}
        </div>
    );
};

export default ProformaInvoiceForm;