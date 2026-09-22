import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './components/common/PublicRoute';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';

import LoginPage from './pages/LoginPage';
import OTPLoginPage from './pages/OTPLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import MemberManagementPage from './pages/MemberManagementPage';
import UserApprovalPage from './pages/UserApprovalPage';
import OrderManagementPage from './pages/OrderManagementPage';
import PaymentManagementPage from './pages/PaymentManagementPage';
import ReportsPage from './pages/ReportsPage';
import NotificationManagementPage from './pages/NotificationManagementPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import CallsPage from './pages/CallsPage';
import UserRolePage from './pages/UserRolePage';

import './styles/variables.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/otp-login"
            element={
              <PublicRoute>
                <OTPLoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />

          <Route
            path=""
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="members" element={<MemberManagementPage />} />
            <Route path="approvals" element={<UserApprovalPage />} />
            <Route path="orders" element={<OrderManagementPage />} />
            <Route path="payments" element={<PaymentManagementPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="notifications" element={<NotificationManagementPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="calls" element={<CallsPage />} />
            <Route path="roles" element={<UserRolePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

