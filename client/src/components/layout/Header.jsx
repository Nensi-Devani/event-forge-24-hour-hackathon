import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import API from '../../services/api';

export default function Header() {
  const { user, isAuthenticated, isAdmin, isJudge, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) fetchNotifications();
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications?limit=5');
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) { /* ignore */ }
  };

  const markAllRead = async () => {
    try {
      await API.put('/notifications/read-all');
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) { /* ignore */ }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#f8f9ff] dark:bg-slate-950 shadow-sm border-b border-slate-100 dark:border-slate-800">
      <nav className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-extrabold text-[#0052CC] tracking-tighter font-headline">
            Event Forge
          </Link>
          <div className="hidden md:flex items-center gap-8 font-['Manrope'] font-bold text-sm tracking-tight">
            <Link to="/" className="text-slate-500 hover:text-[#0052CC] transition-colors">Explore</Link>
            {isAuthenticated && (
              <Link to="/teams" className="text-slate-500 hover:text-[#0052CC] transition-colors">Teams</Link>
            )}
            {isJudge && (
              <Link to="/judge/dashboard" className="text-slate-500 hover:text-[#0052CC] transition-colors">Judge Panel</Link>
            )}
            {isAdmin && (
              <Link to="/admin/dashboard" className="text-slate-500 hover:text-[#0052CC] transition-colors">Admin</Link>
            )}
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-4 md:mx-8 hidden sm:block">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-12 pr-4 py-2 bg-surface-container-low border border-transparent rounded-full text-sm focus:border-primary/40 focus:bg-surface-container-lowest transition-all outline-none shadow-inner"
              placeholder="Search events..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => { setShowNotifications(!showNotifications); }}
                  className="p-2 text-on-surface-variant hover:bg-blue-50 rounded-lg transition-all active:scale-95 duration-200 relative"
                >
                  <span className="material-symbols-outlined">notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 z-50 overflow-hidden">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100">
                      <span className="font-bold text-sm">Notifications</span>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-primary font-bold hover:underline">Mark all read</button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-center text-sm text-outline py-8">No notifications</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n._id} className={`px-4 py-3 text-sm border-b border-slate-50 last:border-0 ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                            <p className="font-bold text-on-surface">{n.title}</p>
                            <p className="text-xs text-outline mt-0.5">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:bg-blue-50 rounded-xl px-3 py-1.5 transition-all"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-primary/20" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-on-surface hidden sm:block">{user?.name?.split(' ')[0]}</span>
                  <span className="material-symbols-outlined text-sm text-outline">expand_more</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 z-50 py-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-sm">{user?.name}</p>
                      <p className="text-xs text-outline capitalize">{user?.role}</p>
                    </div>
                    <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface hover:bg-blue-50 transition-colors">
                      <span className="material-symbols-outlined text-sm">person</span> Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                      <span className="material-symbols-outlined text-sm">logout</span> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-block text-primary font-bold text-sm hover:underline mr-2">Login</Link>
              <Link to="/register" className="hidden sm:inline-block bg-gradient-primary text-white font-bold text-sm px-6 py-2.5 rounded-full hover:shadow-lg transition-all active:scale-95">Register</Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span className="material-symbols-outlined">{showMobileMenu ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-xl py-4 px-6 flex flex-col gap-4 z-40">
          <Link to="/" onClick={() => setShowMobileMenu(false)} className="text-on-surface font-bold text-lg hover:text-primary transition-colors">Explore</Link>
          {isAuthenticated ? (
            <>
              <Link to="/teams" onClick={() => setShowMobileMenu(false)} className="text-on-surface font-bold text-lg hover:text-primary transition-colors">Teams</Link>
              {isJudge && <Link to="/judge/dashboard" onClick={() => setShowMobileMenu(false)} className="text-on-surface font-bold text-lg hover:text-primary transition-colors">Judge Panel</Link>}
              {isAdmin && <Link to="/admin/dashboard" onClick={() => setShowMobileMenu(false)} className="text-on-surface font-bold text-lg hover:text-primary transition-colors">Admin Data</Link>}
              <Link to="/profile" onClick={() => setShowMobileMenu(false)} className="text-on-surface font-bold text-lg hover:text-primary transition-colors">My Profile</Link>
              <button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="text-red-500 font-bold text-lg text-left hover:opacity-80 transition-colors">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" onClick={() => setShowMobileMenu(false)} className="border border-primary text-primary font-bold py-3 rounded-full text-center">Login</Link>
              <Link to="/register" onClick={() => setShowMobileMenu(false)} className="bg-primary text-white font-bold py-3 rounded-full text-center">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
