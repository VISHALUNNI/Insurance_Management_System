// PurchaseDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PurchaseDetailsPage = () => {
  const location = useLocation();
  const { policyType } = new URLSearchParams(location.search);

  const [policyAmount, setPolicyAmount] = useState(0);

  useEffect(() => {
    // Calculate policy amount based on policy type
    const amountMultiplier = {
      Health: 1000,
      Vehicle: 2000,
    };

    const defaultCoverage = 3; // Default coverage is 3 years
    const amount = defaultCoverage * amountMultiplier[policyType];
    setPolicyAmount(amount);
  }, [policyType]);

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
