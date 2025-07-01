import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  // Get user and signOut function from our Auth context
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>LifeOS Dashboard</h1>
      {/* Display the user's email if available */}
      {user && <p>Welcome, {user.email}</p>}
      <button onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
