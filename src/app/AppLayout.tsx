import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useTheme } from "./providers/ThemeProvider";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { theme } = useTheme();

  return (
    <div
      className="flex"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.colors.background,
      }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main
          className="flex-1 overflow-auto p-6"
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
