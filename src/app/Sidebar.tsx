import { NavLink } from "react-router-dom";
import { Home, Building2, Users, Calendar, Settings } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/buildings", icon: Building2, label: "Buildings" },
    { to: "/clients", icon: Users, label: "Clients" },
    { to: "/schedule", icon: Calendar, label: "Schedule" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Cleaning Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
