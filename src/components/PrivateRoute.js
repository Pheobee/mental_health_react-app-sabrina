import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const PrivateRoute = ({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && getUserRole() !== role) {
    return <Navigate to="/" />; // Redirect to homepage if role doesn't match
  }

  return children;
};

export default PrivateRoute;
