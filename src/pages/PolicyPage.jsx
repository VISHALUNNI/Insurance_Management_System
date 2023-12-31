import { useState } from 'react';
import './PolicyPage.css'
import { Link } from 'react-router-dom';
import '../assets/36.png';
import '../assets/7767108.webp';

const policies = [
  {
    name1 : 'health',
    title: 'Health Insurance',
    description: 'Health insurance policies offer coverage for medical expenses, including doctor visits, hospital stays, and prescription drugs.',
    path: '/health-insurance'
  },
  {
    name1 : 'vehi',
    title: 'Vehicle Insurance',
    description: 'Vehicle insurance policies provide coverage for your cars, motorcycles, and other vehicles in case of accidents, theft, or damage.',
    path: '/vehicle-insurance'
  },
];

const PolicyCard = ({ name1, title , description, path }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`policy-card ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={name1} id={`${name1}-image large-image`}></div>
      <h2><Link to={path}>{title}</Link></h2>
      {isHovered && (
        <div className="vehi-description">
          {description}
        </div>
      )}
    </div>
  );
};


const PolicyPage = () => {
  return (
    <div>
    <div className='head'>
    <h1>Insurance Policies</h1>
    <div className="policy-cards-container">
        {policies.map((policy, index) => (
          <PolicyCard key={index} name1={policy.name1} title={policy.title} description={policy.description} path={policy.path} />
        ))}
      </div>
      </div>
    </div>
  );
};


export default PolicyPage;
