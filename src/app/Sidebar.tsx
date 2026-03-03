import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  CalendarDays,
  CalendarClock,
  Users,
  Building2,
  DollarSign,
  Receipt,
  BarChart3,
  MessageSquare,
  UserCog,
} from "lucide-react";
import { useTheme } from "./providers/ThemeProvider";

export const Sidebar = () => {
  const { theme } = useTheme();

  const menuItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/bookings", icon: CalendarDays, label: "Bookings" },
    { to: "/appointments", icon: CalendarClock, label: "Appointments" },
    { to: "/clients", icon: Users, label: "Clients" },
    { to: "/properties", icon: Building2, label: "Properties" },
    { to: "/income", icon: DollarSign, label: "Income" },
    { to: "/expenses", icon: Receipt, label: "Expenses" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
    { to: "/feedback", icon: MessageSquare, label: "Feedback" },
    { to: "/cleaners", icon: UserCog, label: "Cleaners" },
  ];

  return (
    <aside
      className="w-64 flex flex-col flex-shrink-0"
      style={{
        backgroundColor: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.border}`,
      }}
    >
      {/* Logo */}
      <div
        className="px-6 flex items-center flex-shrink-0"
        style={{
          height: "4rem",
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <h1
          className="font-extrabold leading-tight truncate"
          style={{
            fontSize: "1.5rem",
            backgroundImage: `linear-gradient(135deg, ${theme.palette.gray300} 0%, ${theme.palette.gray500} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          CleanFlow
        </h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              padding: "10px 14px",
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: isActive ? 600 : 400,
              transition: "all 0.15s ease",
              backgroundColor: isActive ? theme.colors.accent : "transparent",
              color: isActive
                ? theme.colors.textInverse
                : theme.colors.textMuted,
            })}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.dataset.active) {
                el.style.backgroundColor = `${theme.colors.accent}20`;
                el.style.color = theme.colors.text;
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.dataset.active) {
                el.style.backgroundColor = "transparent";
                el.style.color = theme.colors.textMuted;
              }
            }}
          >
            {({ isActive }) => (
              <>
                <item.icon
                  style={{
                    width: "18px",
                    height: "18px",
                    marginRight: "12px",
                    flexShrink: 0,
                    color: isActive
                      ? theme.colors.textInverse
                      : theme.colors.textMuted,
                  }}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
