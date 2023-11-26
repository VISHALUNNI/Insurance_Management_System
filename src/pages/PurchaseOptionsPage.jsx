// PurchaseOptionsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PurchaseOptionsPage = () => {
  return (
    <div>
      <div className='kk'>
        <h2>Purchase Options</h2>
        <p>Choose your coverage period:</p>
        <div>
          {/* Link to a new page for handling payment and policy creation with the selected policy type and coverage */}
          <Link to="/purchase-options?policyType=Health">
            <button>Health Insurance</button>
          </Link>
          <Link to="/purchase-options?policyType=Vehicle">
            <button>Vehicle Insurance</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOptionsPage;
