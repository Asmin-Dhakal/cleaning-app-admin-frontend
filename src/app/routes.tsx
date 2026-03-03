import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../features/auth/pages/Login";
import { Dashboard } from "../features/dashboard/pages/Dashboard";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect any unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
