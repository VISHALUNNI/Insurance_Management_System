import React from 'react';
import { Link } from 'react-router-dom';
import './PurchasePolicyPage.css';

const VehicleInsurancePurchasePage = () => {
  return (
    <div>
      <div className='kk'>
        <h2>Vehicle Insurance Purchase</h2>
        <p>Select the coverage period for Vehicle Insurance:</p>
        <div>
          <Link to="/purchase-options?policyType=Vehicle&coverage=3">
            <button>3 Years</button>
          </Link>
        </div>
        <div>
          <Link to="/purchase-options?policyType=Vehicle&coverage=5">
            <button>5 Years</button>
          </Link>
        </div>
        <div>
          <Link to="/purchase-options?policyType=Vehicle&coverage=10">
            <button>10 Years</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleInsurancePurchasePage;
