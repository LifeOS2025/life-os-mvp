import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If there is no authenticated user, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a user is authenticated, render the nested child route (e.g., Dashboard).
  return <Outlet />;
};

export default ProtectedRoute;
