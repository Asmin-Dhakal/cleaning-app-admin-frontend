import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../../features/auth/pages/Login";
import { Dashboard } from "../../features/dashboard/pages/Dashboard";
import { ProtectedRoute } from "../../features/auth/components/ProtectedRoute";
import { Clients } from "../../features/clients/pages/Clients";

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
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />

      {/* Redirect any unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
