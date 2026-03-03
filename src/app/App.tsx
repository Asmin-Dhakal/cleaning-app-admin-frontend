import { AppLayout } from "./AppLayout";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./providers/AuthProvider";
import { useAuthStore } from "../features/auth/stores/authStore";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated ? (
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        ) : (
          <AppRoutes />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
