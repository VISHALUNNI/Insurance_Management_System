// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import PolicyCard from './PolicyCard'; // Import the PolicyCard component
import supabase from '../config/SupabaseClient';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [userPolicies, setUserPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user policies from the Supabase database
    const fetchUserPolicies = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
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
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="policy-cards-container">
          {userPolicies.length === 0 ? (
            <p>No policies found for this user.</p>
          ) : (
            userPolicies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
