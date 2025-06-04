import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated || (currentUser && currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute; 