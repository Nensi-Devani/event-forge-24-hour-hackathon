import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
    { name: "Events", path: "/admin/events", icon: "event" },
    { name: "Teams", path: "/admin/teams", icon: "groups" },
    { name: "Participants", path: "/admin/participants", icon: "person" },
    { name: "Judges", path: "/admin/judges", icon: "gavel" },
    { name: "Payments", path: "/admin/payments", icon: "payments" },
    { name: "Scoring", path: "/admin/scoring", icon: "score" },
    { name: "Leaderboard", path: "/admin/leaderboard", icon: "leaderboard" },
    { name: "Reports", path: "/admin/reports", icon: "monitoring" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-slate-900 flex flex-col py-6 pr-4 z-40">
      <div className="px-8 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
        </div>
        <div>
          <h1 className="font-headline font-bold text-[#0052CC] text-lg leading-tight">Event Portal</h1>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Admin Console</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={
                isActive
                  ? "flex items-center gap-3 px-8 py-3 bg-white dark:bg-slate-800 text-[#0052CC] font-semibold rounded-r-full shadow-sm transition-transform duration-200 hover:translate-x-1"
                  : "flex items-center gap-3 px-8 py-3 text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-transform duration-200 hover:translate-x-1 active:opacity-80"
              }
            >
              <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-6 mt-auto flex flex-col gap-1">
        <Link to="/" className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors w-full text-left">
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-sm font-medium">Back to Portal</span>
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-error transition-colors w-full text-left">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
