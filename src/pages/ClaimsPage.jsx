import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';
import './ClaimPage.css';

const ClaimsPage = () => {
  console.log("print me")
  const navigate = useNavigate();
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimDetails, setClaimDetails] = useState('');
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data); // Set the user information in the state
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchUser();
  }, []);

  const handleClaimSubmission = async (e) => {
    e.preventDefault();
    console.log(user.user.id)
    if (!user) {
      window.alert('Please log in to submit a claim.');
      navigate('/login');
      return;
    }

    try {
      // Insert claim data into the claims table
      const { data, error } = await supabase
        .from('claims')
        .insert([
          {
            user_id: user.user.id,
            policy_number: policyNumber,
            claim_data: claimDetails,
            claim_date: new Date().toISOString(),
            email: user.user.email,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Claim submitted successfully:', data);
      window.alert('Claim submitted successfully.');
      // You can redirect the user to a confirmation page or perform other actions as needed
    } catch (error) {
      console.error('Error submitting claim:', error.message);
      window.alert('Error submitting claim. Please try again.');
    }
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
