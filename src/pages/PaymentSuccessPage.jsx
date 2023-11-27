import React, { useEffect, useState } from 'react';
import supabase from '../config/SupabaseClient';

const PaymentSuccessPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const policyType = searchParams.get('policyType');
  const coverage = searchParams.get('coverage');

  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    if (!notificationSent) {
      notifyAdmin(policyType, coverage);
      setNotificationSent(true);
    }

    // Cleanup function to ensure the effect runs only once
    return () => {
      console.log('Effect cleanup');
    };
  }, []); // Empty dependency array to run the effect only once

  const notifyAdmin = async (policyType, coverage) => {
    try {
      await supabase.from('adminnotifications').upsert([
        {
          message: `New purchase - ${policyType} Insurance for ${coverage} years`,
          timestamp: new Date().getDate(),
        },{onConflict:['timestamp','message']}
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
