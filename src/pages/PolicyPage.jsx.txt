import React from 'react';
import './PolicyPage.css'
import { Link } from 'react-router-dom';

const policies = [
  {
    title: 'Health Insurance',
    description: 'Health insurance policies offer coverage for medical expenses, including doctor visits, hospital stays, and prescription drugs.',
    path: '/health-insurance'
  },
  {
    title: 'Vehicle Insurance',
    description: 'Vehicle insurance policies provide coverage for your cars, motorcycles, and other vehicles in case of accidents, theft, or damage.',
    path: '/vehicle-insurance'
  },
];

const PolicyCard = ({ title, description,path }) => {
  return (
    <div className="policy-card">
      <h2><Link to={path}>{title}</Link></h2>
      <p>{description}</p>
    </div>
  );
};

const PolicyPage = () => {
  return (
    <div>
      <h1>Insurance Policies</h1>
      <div className="policy-cards-container">
        {policies.map((policy, index) => (
          <PolicyCard key={index} title={policy.title} description={policy.description} path={policy.path} />
        ))}
      </div>
    </div>
  );
};

export default PolicyPage;
