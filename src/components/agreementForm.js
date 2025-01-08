import React, { useState, useEffect } from 'react';

const AgreementForm = () => {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    terms: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(false); // Track if data is fetched
  const [alreadyAgreed, setAlreadyAgreed] = useState(false); // Track if the user already agreed to terms

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/submitAgreement.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (response.ok) {
      setIsSubmitted(true);
    }
  };

  // Fetch user data and check if they have already agreed
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile.php`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setFormData({
          fullName: data.full_name,
          email: data.email,
        });

        setFetchedData(true); // Set to true once data is fetched

        // Check if user already agreed to terms
        const agreementResponse = await fetch(`${apiUrl}/checkAgreement.php`, {
          method: 'GET',
          credentials: 'include',
        });

        const agreementData = await agreementResponse.json();
        if (agreementData.already_agreed) {
          setAlreadyAgreed(true); // Set flag if already agreed
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-agreement-container">
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={alreadyAgreed || isSubmitted} // Disable form if already agreed or submitted
            readOnly={fetchedData} // Make it read-only once data is fetched
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={alreadyAgreed || isSubmitted} // Disable form if already agreed or submitted
            readOnly={fetchedData} // Make it read-only once data is fetched
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            disabled={alreadyAgreed || isSubmitted} // Disable form if already agreed or submitted
            required
          />
          I agree to the terms & conditions and privacy
        </label>
        {!alreadyAgreed && (
          <button type="submit" disabled={isSubmitted}>Submit</button>
        )}
      </form>

      {alreadyAgreed && <p className="success">You have already agreed to the terms.</p>}
      {isSubmitted && !alreadyAgreed && <p className="success">Thank you for agreeing to the terms.</p>}
    </div>
  );
};

export default AgreementForm;
