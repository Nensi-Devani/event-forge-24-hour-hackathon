import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function AdminSidebar({ isOpen, onClose }) {
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
    // { name: "Scoring", path: "/admin/scoring", icon: "score" },
    // { name: "Leaderboard", path: "/admin/leaderboard", icon: "leaderboard" },
    { name: "Reports", path: "/admin/reports", icon: "monitoring" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}
      
      <aside 
        className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest dark:bg-slate-900 border-r border-slate-100 flex flex-col py-6 pr-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
            </div>
            <div>
              <h1 className="font-headline font-bold text-[#0052CC] text-lg leading-tight truncate">Event Portal</h1>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Admin Console</p>
            </div>
          </div>
          <button className="lg:hidden p-2 text-outline hover:bg-surface-container rounded-full shrink-0" onClick={onClose}>
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
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
      <div className="px-6 mt-auto flex flex-col gap-1 pt-4 border-t border-slate-100">
        <Link to="/" onClick={onClose} className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors w-full text-left rounded-lg hover:bg-surface-container-low">
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-sm font-medium">Back to Portal</span>
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-error transition-colors w-full text-left rounded-lg hover:bg-surface-container-low">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
      </aside>
    </>
  );
}
