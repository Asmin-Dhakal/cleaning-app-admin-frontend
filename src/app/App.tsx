import { AppLayout } from "./AppLayout";
import { AppRoutes } from "./routes/routes";
import { AuthProvider, ThemeProvider } from "./providers";
import { useAuthStore } from "../features/auth/stores/authStore";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <ThemeProvider initialMode="dark">
      <AuthProvider>
        {isAuthenticated ? (
          <div
            className="min-h-screen"
            style={{ backgroundColor: "var(--color-background)" }}
          >
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </div>
        ) : (
          <AppRoutes />
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
