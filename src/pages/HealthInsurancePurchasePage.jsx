import React from 'react';
import { Link } from 'react-router-dom';
import './PurchasePolicyPage.css';

const HealthInsurancePurchasePage = () => {
  return (
    <div>
      <div className='kk'>
        <h2>Health Insurance Purchase</h2>
        <p>Select the coverage period for Health Insurance:</p>
        <div>
          <Link to="/purchase-options?policyType=Health&coverage=3">
            <button>3 Years</button>
          </Link>
        </div>
        <div>
          <Link to="/purchase-options?policyType=Health&coverage=5">
            <button>5 Years</button>
          </Link>
        </div>
        <div>
          <Link to="/purchase-options?policyType=Health&coverage=10">
            <button>10 Years</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthInsurancePurchasePage;
