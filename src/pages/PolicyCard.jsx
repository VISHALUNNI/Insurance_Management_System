// PolicyCard.jsx

import React from 'react';

const PolicyCard = ({ policy }) => {
  return (
    <div className="policy-card">
      <h3>{policy.policy_type}</h3>
      <p>
        <strong>Policy Number:</strong> {policy.policy_number}
      </p>
      <p>
        <strong>Start Date:</strong> {new Date(policy.start_date).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(policy.end_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Amount:</strong> {policy.amount}
      </p>
    </div>
  );
};

export default PolicyCard;
    