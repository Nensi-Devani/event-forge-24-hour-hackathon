import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Login() {
  return (
    <div className="bg-background min-h-screen text-on-surface font-body antialiased flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-surface-container-lowest max-w-md w-full rounded-[2rem] p-10 shadow-lg border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0052CC] font-headline mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm">Sign in to manage your events and teams.</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                <input 
                  type="email" 
                  className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider font-label">Password</label>
                <Link to="#" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input 
                  type="password" 
                  className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button type="button" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-outline">
              Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
