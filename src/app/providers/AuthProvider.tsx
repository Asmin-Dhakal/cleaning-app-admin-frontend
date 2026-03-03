import type { ReactNode, useEffect } from "react";
import { useAuthInit } from "../../features/auth/hooks/useAuthInit";
import { useTokenRefresh } from "../../features/auth/hooks/useTokenRefresh";
import { useAuthStore } from "../../features/auth/stores/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Initialize auth on app load
  useAuthInit();

  // Start token refresh when authenticated
  useTokenRefresh();

  return <>{children}</>;
};
