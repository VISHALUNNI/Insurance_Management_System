/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const PurchaseDetailsPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const policyType = queryParams.get('policyType');
  const [policyAmount, setPolicyAmount] = useState(0);

  useEffect(() => {
    console.log("hello", policyType);

    const amountMultiplier = {
      Health: 1000,
      Vehicle: 2000,
    };
    const defaultCoverage = 3; // Default coverage is 3 years
    const amount = defaultCoverage * amountMultiplier[policyType];
    setPolicyAmount(amount);

    // Cleanup function to ensure the effect runs only once
    return () => {
      console.log("Effect cleanup");
    };
  
  }, []); 
  return (
    <div>
      <div className='kk'>
        <h2>Purchase Details</h2>
        <p>Policy Type: {policyType}</p>
        <p>Choose your coverage period:</p>
        <div>
          <Link to={`/payment-success?policyType=${policyType}&coverage=3`}>
            <button>3 Years Coverage</button>
          </Link>
          <Link to={`/payment-success?policyType=${policyType}&coverage=5`}>
            <button>5 Years Coverage</button>
          </Link>
          <Link to={`/payment-success?policyType=${policyType}&coverage=10`}>
            <button>10 Years Coverage</button>
          </Link>
        </div>
        <div>
          <p>Total Amount: {policyAmount} INR</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailsPage;
