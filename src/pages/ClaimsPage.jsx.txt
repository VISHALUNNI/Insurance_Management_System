import React, { useState } from 'react';
import './ClaimPage.css'

const ClaimsPage = () => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimDetails, setClaimDetails] = useState('');

  const handleClaimSubmission = (e) => {
    e.preventDefault();

    // Implement your claim submission logic here
    console.log('Policy Number:', policyNumber);
    console.log('Claim Details:', claimDetails);

    // You can add further logic to submit the claim data to a server or store it in your application state
  };

  return (
    <div className='claims-page'>
      <h1>File a Claim</h1>
      <form onSubmit={handleClaimSubmission}>
        <div className="form-group">
          <label htmlFor="policyNumber">Policy Number:</label>
          <input
            type="text"
            id="policyNumber"
            name="policyNumber"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="claimDetails">Claim Details:</label>
          <textarea
            id="claimDetails"
            name="claimDetails"
            value={claimDetails}
            onChange={(e) => setClaimDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Claim</button>
      </form>
    </div>
  );
};

export default ClaimsPage;
