import { useLogout } from "../features/auth/hooks/useAuth";
import { useTheme } from "./providers/ThemeProvider";
import { LogOut } from "lucide-react";

export const Header = () => {
  const logout = useLogout();
  const { theme } = useTheme();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header
      className="flex-shrink-0 px-6 py-4 flex justify-between items-center"
      style={{
        backgroundColor: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      <h2
        className="text-base font-semibold"
        style={{ color: theme.colors.text }}
      >
        Admin Panel
      </h2>

      <button
        onClick={handleLogout}
        disabled={logout.isPending}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        style={{
          backgroundColor: `${theme.colors.danger}15`,
          color: theme.colors.danger,
          border: `1px solid ${theme.colors.danger}30`,
        }}
      >
        <LogOut className="w-4 h-4" />
        {logout.isPending ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
};
