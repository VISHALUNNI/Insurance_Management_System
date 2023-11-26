import React from 'react';
import { Link } from 'react-router-dom';

const PurchasePolicyPage = () => {
  return (
    <div>
      <div className='kk'>
        <h2>Purchase Policy</h2>
        <p>Select the type of policy you want to purchase:</p>
        <div>
          {/* Link to a new page for handling policy selection */}
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

export default PurchasePolicyPage;