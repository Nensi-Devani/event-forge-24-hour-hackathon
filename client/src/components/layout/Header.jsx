import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-[#f8f9ff] dark:bg-slate-950 shadow-sm border-b border-slate-100 dark:border-slate-800">
      <nav className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-extrabold text-[#0052CC] tracking-tighter font-headline">
            Event Forge
          </Link>
          <div className="hidden md:flex items-center gap-8 font-['Manrope'] font-bold text-sm tracking-tight">
            <Link to="/" className="text-[#0052CC] border-b-2 border-[#0052CC] pb-1">Explore</Link>
            <Link to="/events/1/leaderboard" className="text-slate-500 hover:text-[#0052CC] transition-colors">Leaderboard</Link>
            <Link to="/judge/dashboard" className="text-slate-500 hover:text-[#0052CC] transition-colors">Scoring</Link>
          </div>
        </div>
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-transparent rounded-full text-sm focus:border-primary/40 focus:bg-surface-container-lowest transition-all outline-none shadow-inner"
              placeholder="Search tech events..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/profile?tab=notifications" className="p-2 text-on-surface-variant hover:bg-blue-50 rounded-lg transition-all active:scale-95 duration-200">
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            <button className="p-2 text-on-surface-variant hover:bg-blue-50 rounded-lg transition-all active:scale-95 duration-200">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
          </div>
          <Link to="/login" className="text-primary font-bold  text-white hover:underline mr-2 ml-4">Login</Link>
          <Link to="/register" className="bg-gradient-primary text-white font-bold text-sm px-6 py-2.5 rounded-full hover:shadow-lg transition-all active:scale-95">Register</Link>
          <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shrink-0 block hover:ring-2 hover:ring-primary-container transition-all ml-4">
            <img alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzwtHOiBpXY4DL8m2beRfIUzUZt_0Pkkr_wsDjBwskt5a2wwokxiYdNZFE7Y_BVZ1WSoKeAobuqftjTJKTWX7cGb39O19eXtyHqCjLsw7aVWfSHIXGVvglOQ2aWVzSqwN5n6y2y_UGMH1G9v0CSHetgKaBfC-Mw7ZofHsBxceKsmcWg0uLNlzgC3Zoc-hqsJETg6nCqx231lT2KnjCO0mEaXSDYXInhw5LYj1QyNXBCsz3e4PoDRpcmwTeBOs0Ocxmao8i8I3yJDR" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
