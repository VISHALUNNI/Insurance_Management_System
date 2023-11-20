import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';
import './ClaimPage.css';

const ClaimsPage = () => {
  const navigate = useNavigate();
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimDetails, setClaimDetails] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.user();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchUser();
  }, []);

  const handleClaimSubmission = async (e) => {
    e.preventDefault();

    if (!user) {
      window.alert('Please log in to submit a claim.');
      // If the user is not logged in, navigate to the login page
      navigate('/login');
      return;
    }

    // Implement your claim submission logic here
    console.log('Policy Number:', policyNumber);
    console.log('Claim Details:', claimDetails);

    // You can add further logic to submit the claim data to a server or store it in your application state
  };

  return (
    <div>
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
      <div className='imag'></div>
    </div>
  );
};

export default ClaimsPage;
