import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Events', path: '/admin/events', icon: 'event' },
    { name: 'Teams', path: '/admin/teams', icon: 'groups' }, // or Participants
    { name: 'Users', path: '/admin/participants', icon: 'person' },
    { name: 'Payments', path: '/admin/payments', icon: 'payments' },
    { name: 'Judges', path: '/admin/judges', icon: 'gavel' },
    { name: 'Scoring', path: '/admin/scoring', icon: 'score' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#eef4ff] dark:bg-slate-900 flex flex-col py-6 pr-4 z-40">
      <div className="px-8 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            hub
          </span>
        </div>
        <div>
          <h1 className="font-headline font-bold text-[#0052CC] text-lg leading-tight">
            Event Portal
          </h1>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
            Admin Console
          </p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={isActive
                ? 'flex items-center gap-3 px-8 py-3 bg-white dark:bg-slate-800 text-[#0052CC] font-semibold rounded-r-full shadow-sm transition-transform duration-200 hover:translate-x-1'
                : 'flex items-center gap-3 px-8 py-3 text-slate-600 dark:text-slate-400 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-transform duration-200 hover:translate-x-1 active:opacity-80'
              }
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-6 mt-auto">
        <div className="p-4 rounded-xl bg-primary-container/10 border border-primary-container/20 mb-6">
          <p className="text-xs font-semibold text-primary mb-2">Enterprise Plan</p>
          <p className="text-[11px] text-slate-500 mb-3">You are using 85% of your event capacity.</p>
          <button className="w-full py-2 bg-gradient-primary text-white text-xs font-bold rounded-lg active:scale-95 transition-all">
            Upgrade Plan
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <button className="flex items-center gap-3 px-2 py-2 text-slate-600 dark:text-slate-400 hover:text-error transition-colors w-full text-left">
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
