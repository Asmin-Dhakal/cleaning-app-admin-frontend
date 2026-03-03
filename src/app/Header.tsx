import { useLogout } from "../features/auth/hooks/useAuth";

export const Header = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>

      <button
        onClick={handleLogout}
        disabled={logout.isPending}
        className="text-red-600 hover:text-red-700 font-medium"
      >
        {logout.isPending ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
};
