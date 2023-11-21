import React from 'react';
import supabase from '../config/SupabaseClient';

const PurchasePolicyPage = () => {
  const handlePurchase = async(policyType) => {
    const alpha = shuffleString('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

const numeric = shuffleString('0123456789');
const code = alpha.slice(0, 4) + numeric.slice(0, 2);
const shuffledCode = shuffleString(code);
function shuffleString(string) {
  return string.split('').sort(() => Math.random() - 0.5).join('');
}

    const { data: { user } } = await supabase.auth.getUser();
    // Calculate start and end dates
    const startDate = new Date().toISOString(); 
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 5);
    const endDateISO = endDate.toISOString();

    // Define the amount for the policy (in this case, Rs. 100,000)
    const amount = 100000;
    
    // Insert the policy details into the 'policies' table
    const { data, error } = await supabase.from('insurance_policies').upsert([
      {
        policy_number: shuffledCode,
        user_id: user.id,
        policy_type: policyType,
        start_date: startDate,
        end_date: endDateISO,
        amount: amount,
      },
    ]).select();

    if (error) {
      console.error('Error purchasing policy:', error.message);
      return;
    }

    alert('Policy purchased successfully Policy ID:', shuffledCode);
  };

  return (
    <div>
      <h2>Purchase Policy</h2>
      <p>Select the type of policy you want to purchase:</p>
      <div>
        <button onClick={() => handlePurchase('Health')}>Health Insurance</button>
      </div>
      <div>
        <button onClick={() => handlePurchase('Vehicle')}>Vehicle Insurance</button>
      </div>
    </div>
  );
};

export default PurchasePolicyPage;