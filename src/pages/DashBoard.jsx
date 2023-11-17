import React, { useEffect, useState } from 'react';
import supabase from './config/SupabaseClient';

const Dashboard = () => {
  const [userPolicies, setUserPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user policies from the Supabase database
    const fetchUserPolicies = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
            .from('insurance_policies')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          setUserPolicies(data);
        }
      } catch (error) {
        console.error('Error fetching user policies:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPolicies();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userPolicies.length === 0 ? (
            <p>No policies found for this user.</p>
          ) : (
            <ul>
              {userPolicies.map((policy) => (
                <li key={policy.id}>
                  <strong>{policy.policy_type}</strong> - {policy.policy_details}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
