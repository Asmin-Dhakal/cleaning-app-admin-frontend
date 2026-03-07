import type { ReactNode } from "react";
import { useAuthInit } from "../../features/auth/hooks/useAuthInit";
import { useAuthStore } from "../../features/auth/stores/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Initialize auth and token refresh on app load
  useAuthInit();

  return <>{children}</>;
};
