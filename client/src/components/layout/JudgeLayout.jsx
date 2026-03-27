import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function JudgeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/judge/dashboard", icon: "dashboard" },
    { name: "My Events", path: "/judge/events", icon: "event" },
    { name: "Scoring", path: "/judge/scoring", icon: "score" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="font-body text-on-surface antialiased bg-background min-h-screen">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-surface border-b border-surface-container-highest sticky top-0 z-30">
        <h1 className="font-headline font-extrabold text-purple-700 text-xl">Judge Panel</h1>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-on-surface hover:bg-surface-container rounded-lg transition-colors">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      <aside className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r border-slate-100 dark:bg-slate-900 flex flex-col py-6 pr-4 z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div className="px-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
          </div>
            <div>
              <h1 className="font-headline font-bold text-purple-700 text-lg leading-tight truncate">Judge Panel</h1>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{user?.name || "Judge"}</p>
            </div>
          </div>
          <button className="lg:hidden p-2 text-outline hover:bg-surface-container rounded-full shrink-0" onClick={() => setSidebarOpen(false)}>
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
                onClick={() => setSidebarOpen(false)}
                className={
                  isActive
                    ? "flex items-center gap-3 px-8 py-3 bg-white dark:bg-slate-800 text-purple-700 font-semibold rounded-r-full shadow-sm transition-transform duration-200 hover:translate-x-1"
                    : "flex items-center gap-3 px-8 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50/50 dark:hover:bg-slate-800/50 transition-transform duration-200 hover:translate-x-1 active:opacity-80"
                }
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-6 mt-auto flex flex-col gap-1 pt-4 border-t border-slate-100">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors w-full text-left rounded-lg hover:bg-surface-container-low">
            <span className="material-symbols-outlined text-xl">home</span>
            <span className="text-sm font-medium">Back to Portal</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-error transition-colors w-full text-left rounded-lg hover:bg-surface-container-low">
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
      <main className="lg:ml-64 min-h-screen p-4 sm:p-6 md:p-8 lg:py-10 lg:pr-10 lg:pl-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
