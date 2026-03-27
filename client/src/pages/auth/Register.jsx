import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Register() {
  const [role, setRole] = useState('participant');

  return (
    <div className="bg-background min-h-screen text-on-surface font-body antialiased flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8 py-16">
        <div className="bg-surface-container-lowest max-w-lg w-full rounded-[2.5rem] p-10 shadow-lg border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-[#0052CC] font-headline mb-2 tracking-tight">Create an Account</h1>
            <p className="text-on-surface-variant text-sm">Join event-forge to discover, participate, and build amazing things.</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setRole('participant')}
                  className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    role === 'participant' 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">code</span> Participant
                </button>
                <button 
                  type="button"
                  onClick={() => setRole('judge')}
                  className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    role === 'judge' 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">gavel</span> Judge
                </button>
              </div>
            </div>

            {role === 'judge' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Technical Specialization</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">psychology</span>
                  <select className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none appearance-none font-body text-on-surface" defaultValue="">
                    <option value="" disabled>Select your expertise area</option>
                    <option value="ai">AI / Machine Learning</option>
                    <option value="blockchain">Blockchain / DeFi</option>
                    <option value="frontend">Frontend & UI/UX</option>
                    <option value="backend">Backend & Scalability</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">First Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">person</span>
                  <input 
                    type="text" 
                    className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none" 
                    placeholder="Jane" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 px-4 text-sm transition-all outline-none" 
                  placeholder="Doe" 
                />
              </div>
            </div>

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
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input 
                  type="password" 
                  className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none" 
                  placeholder="Create a strong password" 
                />
              </div>
            </div>

            <button type="button" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-outline">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
