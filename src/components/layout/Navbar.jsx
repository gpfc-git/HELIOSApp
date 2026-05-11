import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("helios_user") ?? "null");
    } catch {
      return null;
    }
  })();
  const isAdmin = user?.role === "admin";

  function handleLogout() {
    localStorage.removeItem("helios_token");
    localStorage.removeItem("helios_user");
    navigate("/login", { replace: true });
  }

  const navLinkClass = ({ isActive }) =>
    `font-body-base text-body-base transition-colors ${
      isActive
        ? "text-primary border-b-2 border-primary pb-1"
        : "text-text-muted hover:text-on-surface-variant"
    }`;

  return (
    <header className="sticky top-0 w-full flex items-center justify-between px-section-padding h-navbar-height bg-surface border-b border-border z-50">
      <div className="flex items-center gap-8">
        <span className="font-wordmark text-wordmark text-primary tracking-widest select-none">
          HELIOS DECK
        </span>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/signals" className={navLinkClass}>
            Catalog
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-2">
          <button
            className="hover:bg-accent-dim transition-all p-2 rounded-lg text-on-surface-variant"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
          <button
            className="hover:bg-accent-dim transition-all p-2 rounded-lg text-on-surface-variant"
            title="Settings"
          >
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
          </button>
        </div>
        <div className="border-l border-border pl-4">
          <button
            onClick={handleLogout}
            className="font-body-base text-body-base text-text-muted hover:text-danger transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
