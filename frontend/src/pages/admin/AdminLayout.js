import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

const AdminLayout = () => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  //
  // useEffect(() => {
  //   if (!isLoading && (!isAuthenticated || (currentUser && currentUser.role !== 'admin' && currentUser.role !== 'staff'))) {
  //      navigate('/');
  //   }
  // }, [isAuthenticated, currentUser, isLoading, navigate]);
  //
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
  //       <div className="text-2xl">loading...</div>
  //     </div>
  //   );
  // }
  //
  // if (!isAuthenticated || (currentUser && currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
  //   return null;
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 