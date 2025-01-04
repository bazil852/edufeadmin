import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Employees from './pages/Employees';
import Investments from './pages/Investments';
import Reports from './pages/Reports';
import UserInvestments from './pages/UserInvestments';
import Announcements from './pages/Announcements';
import FraudDetection from './pages/FraudDetection';
import Chats from './pages/Chats';
import Tickets from './pages/Tickets';
import AuditLogs from './pages/AuditLogs';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="employees" element={<Employees />} />
              <Route path="investments" element={<Investments />} />
              <Route path="reports" element={<Reports />} />
              <Route path="user-investments" element={<UserInvestments />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="fraud-detection" element={<FraudDetection />} />
              <Route path="chats" element={<Chats />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="audit-logs" element={<AuditLogs />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;