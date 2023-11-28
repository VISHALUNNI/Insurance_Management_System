import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PurchasePolicyPage = () => {
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    // Check if the component has already rendered
    if (!hasRendered) {
      console.log("PurchasePolicyPage rendered");
      // Add any additional logic you need to run only once

      // Update the state to indicate that the component has rendered
      setHasRendered(true);
    }
  }, [hasRendered]); // Add hasRendered to the dependency array

  return (
    <div>
      <div className='kk'>
        <h2>Purchase Policy</h2>
        <p>Select the type of policy you want to purchase:</p>
        <div>
          {/* Link to a new page for handling policy selection */}
          <Link to="/purchase-details?policyType=Health">
            <button>Health Insurance</button>
          </Link>
          <Link to="/purchase-details?policyType=Vehicle">
            <button>Vehicle Insurance</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchasePolicyPage;
