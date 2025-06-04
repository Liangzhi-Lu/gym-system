import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/user/ProfilePage';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetailPage from './pages/courses/CourseDetailPage';
import SchedulesPage from './pages/courses/SchedulesPage';
import MembershipPage from './pages/membership/MembershipPage';
import OrdersPage from './pages/orders/OrdersPage';
import OrderDetailPage from './pages/orders/OrderDetailPage';
import NotFoundPage from './pages/NotFoundPage';

import DashboardPage from './pages/admin/DashboardPage';
import UserManagementPage from './pages/admin/users/UserManagementPage';
import CourseManagementPage from './pages/admin/courses/CourseManagementPage';
import CategoryManagementPage from './pages/admin/courses/CategoryManagementPage';
import ScheduleManagementPage from './pages/admin/courses/ScheduleManagementPage';
import EnrollmentManagementPage from './pages/admin/courses/EnrollmentManagementPage';
import InstructorManagementPage from './pages/admin/instructors/InstructorManagementPage';
import MembershipPlanManagementPage from './pages/admin/membership/MembershipPlanManagementPage';
import OrderManagementPage from './pages/admin/orders/OrderManagementPage';
import MemberManagementPage from './pages/admin/members/MemberManagementPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUserPage from './pages/admin/AdminUserPage';

import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import { useAuth } from './context/AuthContext';

import ReportsPage from './pages/admin/reports/ReportsPage';
import SettingsPage from './pages/admin/settings/SettingsPage';


function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen  text-white">
        <div className="text-2xl">Loading Application...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/home" element={<AdminDashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="courses" element={<CourseManagementPage />} />
        <Route path="categories" element={<CategoryManagementPage />} />
        <Route path="schedules" element={<ScheduleManagementPage />} />
        <Route path="enrollments" element={<EnrollmentManagementPage />} />
        <Route path="instructors" element={<InstructorManagementPage />} />
        <Route path="membership" element={<MembershipPlanManagementPage />} />
        <Route path="orders" element={<OrderManagementPage />} />
        <Route path="members" element={<MemberManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/profile" replace />}
        />
        <Route
          path="register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/profile" replace />}
        />

        <Route path="profile" element={<ProfilePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
        <Route path="schedules" element={<SchedulesPage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path="orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="orders/:id" element={<PrivateRoute><OrderDetailPage /></PrivateRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App; 