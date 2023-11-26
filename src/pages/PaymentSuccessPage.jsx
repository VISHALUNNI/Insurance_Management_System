// PaymentSuccessPage.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../config/SupabaseClient';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { policyType, coverage } = new URLSearchParams(location.search);

  useEffect(() => {
    // Notify the admin when the component mounts
    notifyAdmin(policyType, coverage);
  }, [policyType, coverage]);

  const notifyAdmin = async (policyType, coverage) => {
    try {
      // Update the admin notifications table in Supabase
      await supabase.from('adminnotifications').upsert([
        {
          message: `New purchase - ${policyType} Insurance for ${coverage} years`,
          timestamp: new Date().toISOString(),
        },
      ]);

      console.log('Admin notified successfully.');
    } catch (error) {
      console.error('Error notifying admin:', error.message);
    }
  };

  return (
    <div>
      <div className='kk'>
        <h2>Payment Success</h2>
        <p>Thank you for purchasing {policyType} Insurance for {coverage} years!</p>
        {/* Notify the admin here if needed */}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
