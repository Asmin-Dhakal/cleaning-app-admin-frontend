import { useTranslation } from "react-i18next";
import { useLogout } from "../features/auth/hooks/useAuth";
import { useTheme } from "./providers/ThemeProvider";
import { LogOut } from "lucide-react";
import { LanguageSelector } from "../shared/components/ui/LanguageSelector";

export const Header = () => {
  const logout = useLogout();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header
      className="flex-shrink-0 px-6 flex justify-between items-center"
      style={{
        height: "4rem",
        backgroundColor: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      <h2
        className="font-semibold"
        style={{ color: theme.colors.text, fontSize: "1.125rem" }}
      >
        {t("header.adminPanel")}
      </h2>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        <button
          onClick={handleLogout}
          disabled={logout.isPending}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: `${theme.colors.danger}15`,
            color: theme.colors.danger,
            border: `1px solid ${theme.colors.danger}30`,
          }}
        >
          <LogOut className="w-4 h-4" />
          {logout.isPending ? t("header.loggingOut") : t("header.logout")}
        </button>
      </div>
    </header>
  );
};
