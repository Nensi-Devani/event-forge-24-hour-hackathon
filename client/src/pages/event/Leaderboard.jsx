import React from 'react';
import Header from '../../components/layout/Header';

export default function EventLeaderboard() {
  const rankings = [
    { rank: '04', name: 'Static Void', icon: 'bolt', color: 'blue', scores: [18.5, 17.0, 19.2, 16.5, 18.0], total: '89.2' },
    { rank: '05', name: 'Sky Net', icon: 'rocket_launch', color: 'indigo', scores: [17.0, 18.5, 17.8, 18.2, 16.5], total: '88.0' },
    { rank: '06', name: 'Code Crafters', icon: 'terminal', color: 'teal', scores: [16.8, 17.2, 18.0, 19.0, 15.5], total: '86.5' },
    { rank: '07', name: 'Bit Busters', icon: 'memory', color: 'purple', scores: [19.0, 16.0, 16.5, 15.8, 17.5], total: '84.8' },
    { rank: '08', name: 'Bright Sparks', icon: 'lightbulb', color: 'rose', scores: [15.5, 16.8, 17.2, 17.0, 18.1], total: '84.6' },
  ];

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-8 py-12 flex-1 w-full">
        {/* Hero Title Section */}
        <div className="mb-16 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-4">Live Standings</span>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-on-surface tracking-tighter mb-4">Nexus Hack 2024</h1>
              <p className="text-xl text-outline max-w-2xl leading-relaxed">Evaluating the frontier of technological innovation. Witness the final rankings of the world's most talented developers.</p>
            </div>
            <div className="flex items-center gap-4 justify-center lg:justify-end">
              <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-primary">
                <p className="text-xs text-outline font-bold uppercase tracking-wider font-label">Total Teams</p>
                <p className="text-3xl font-headline font-extrabold text-primary">128</p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-tertiary">
                <p className="text-xs text-outline font-bold uppercase tracking-wider font-label">Status</p>
                <p className="text-3xl font-headline font-extrabold text-tertiary">Finalized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Podium Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mb-24 mt-20">
          {/* 2nd Place */}
          <div className="order-2 lg:order-1 group">
            <div className="relative bg-surface-container-lowest p-8 rounded-2xl shadow-sm transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
              <div className="absolute -top-12 h-24 w-24 rounded-full border-4 border-surface-container-highest overflow-hidden bg-surface shadow-xl">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW6-v0fPkPUNews2wnGCu8ZkWEZ5lOnpYJR1d70cTBpA_o5mTHWj773MXHxypJk8yJpQlz0nUG5DbtoDCDdEXGQq9JbZ1yVlVvDmp7FndW2jYN6MVRZYSveL_23ZEdmJo-bsMhROscATcbp1bKdPUqWuk7QabQOXO452SVzAW3r8QwZ6DiGFMz_1zTAJ7SfeR5CUGep9DnfJqJNjrhY5ygeGwdV1ipshZiSHDD9DWtOkgItWFb6SUSDoKXFpF5Y8-4ubtx0sUZy4i5" alt="Runner up" />
              </div>
              <div className="mt-12 w-full">
                <span className="inline-block bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase">Runner Up</span>
                <h3 className="text-2xl font-headline font-extrabold text-on-surface mb-1">CyberSentinels</h3>
                <p className="text-primary font-headline font-bold text-4xl mb-6">94.2</p>
                <div className="w-full bg-surface-container rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-semibold text-outline">Rank</span>
                  <span className="text-xl font-headline font-extrabold text-slate-500">02</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="order-1 lg:order-2 group z-10">
            <div className="relative bg-gradient-to-br from-primary-container to-primary p-10 rounded-3xl shadow-[0px_20px_40px_rgba(0,24,72,0.12)] transition-all duration-300 group-hover:-translate-y-4 flex flex-col items-center text-center scale-110">
              <div className="absolute -top-16 h-32 w-32 rounded-full border-4 border-primary-container overflow-hidden bg-white shadow-2xl">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZH0TyH2afhTvUfZb4-f93qHUTFt_yX0gtYDosWWXFzKyDhl391Y-dVDQ0B9PPkST0IgWZxFJtbT1HeAuTQsvvDwfwCxI_H6E2eq2wUSE9lU1PX_qaCs3RqxWoBteOtr-hKu9vIW50ZssYGAyLHOY_ym7jlLpQVhuAbkBHKL5X3KoS-BnCQJKntsmS1l-q38rvWr3veKcuyhPLHwSukguJGW57j0L_XcTJe67JVhOVQoQF7k5kAd5kqs2L2NbSShlTII6bSLN_G_QE" alt="Winner" />
              </div>
              <div className="mt-16 text-on-primary w-full">
                <div className="flex justify-center mb-4">
                  <span className="material-symbols-outlined text-amber-400 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <h3 className="text-3xl font-headline font-extrabold mb-1 tracking-tight">Quantum Leap</h3>
                <p className="text-primary-fixed text-5xl font-headline font-extrabold mb-8 tracking-tighter">98.5</p>
                <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase font-bold tracking-widest opacity-80 font-label">Final Score</span>
                    <span className="text-xs uppercase font-bold tracking-widest opacity-80 font-label">Rank</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-headline font-bold">Gold Medal</span>
                    <span className="text-4xl font-headline font-extrabold">01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 lg:order-3 group">
            <div className="relative bg-surface-container-lowest p-8 rounded-2xl shadow-sm transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
              <div className="absolute -top-12 h-24 w-24 rounded-full border-4 border-surface-container-highest overflow-hidden bg-surface shadow-xl">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfi1iPKmuXtxyjJKjXk-cYEfZOE9v2FlD_1T1oLH4_MSBhwISscXHXU7LWNm028IEAmwNvdpQ2Z747NCEPD_tXu1FX7ChH1Q4fsX979pbB65q1ed9H1T_rveMsd-zSxDts0m6zVl27x7hPF8FqODvbTo2EUjnBu0CWPZjMY0gJFOHXNKO7vn_sLyksHoURCj-JIV3QDPD_uppU1k2pxjNrLSNd9I9pKeg96-AHYNbN2bGrJHAujLMxhXWxCg37bWO2s3GyGOI8PdV5" alt="Third place" />
              </div>
              <div className="mt-12 w-full">
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase">Third Place</span>
                <h3 className="text-2xl font-headline font-extrabold text-on-surface mb-1">Neural Knights</h3>
                <p className="text-primary font-headline font-bold text-4xl mb-6">91.8</p>
                <div className="w-full bg-surface-container rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-semibold text-outline">Rank</span>
                  <span className="text-xl font-headline font-extrabold text-orange-600/70">03</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ranking Table Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h2 className="text-2xl font-headline font-extrabold text-on-surface">Full Rankings</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-outline text-xl">filter_list</span>
              <select className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-on-surface pr-8 outline-none">
                <option>Sort by Score (High-Low)</option>
                <option>Sort by Team Name</option>
                <option>Innovation Leader</option>
              </select>
            </div>
            <div className="flex items-center bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-outline text-xl">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm font-medium w-40 outline-none" placeholder="Filter by name..." type="text" />
            </div>
          </div>
        </div>

        {/* Detailed Ranking Table */}
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-8 py-6 text-xs font-bold text-outline uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-6 text-xs font-bold text-outline uppercase tracking-wider">Team Name</th>
                  <th className="px-6 py-6 text-xs font-bold text-outline uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-6 text-xs font-bold text-outline uppercase tracking-wider">Arch.</th>
                  <th className="px-6 py-6 text-xs font-bold text-outline uppercase tracking-wider">Function</th>
                  <th className="px-6 py-6 text-xs font-bold text-outline uppercase tracking-wider">UI/UX</th>
                  <th className="px-6 py-6 text-xs font-bold text-outline uppercase tracking-wider">Innovation</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary uppercase tracking-wider text-right">Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {rankings.map((team, idx) => (
                  <tr key={team.rank} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className={`px-8 py-6 font-headline font-extrabold text-lg ${idx > 0 ? 'text-outline' : ''}`}>{team.rank}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full bg-${team.color}-100 flex items-center justify-center`}>
                          <span className={`material-symbols-outlined text-${team.color}-600 text-sm`}>{team.icon}</span>
                        </div>
                        <span className="font-bold text-on-surface">{team.name}</span>
                      </div>
                    </td>
                    {team.scores.map((score, sIdx) => (
                      <td key={sIdx} className="px-6 py-6 text-sm font-medium text-on-surface-variant">{score.toFixed(1)}</td>
                    ))}
                    <td className="px-8 py-6 text-right">
                      <span className="font-headline font-bold text-primary text-lg">{team.total}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination / Load More */}
          <div className="p-8 flex justify-center border-t border-surface-container">
            <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
              View Full Leaderboard
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Footer Visual Hint */}
        <div className="mt-20 flex flex-col items-center gap-6 opacity-40 grayscale">
          <p className="text-sm font-bold tracking-[0.3em] uppercase">Powered by</p>
          <div className="flex gap-12 flex-wrap justify-center">
            <span className="text-xl font-headline font-black tracking-tighter">CLOUDCORE</span>
            <span className="text-xl font-headline font-black tracking-tighter">DATAVIZ</span>
            <span className="text-xl font-headline font-black tracking-tighter">SECURELABS</span>
          </div>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-10 right-10 bg-gradient-to-br from-primary-container to-primary h-16 w-16 rounded-full flex items-center justify-center text-on-primary shadow-lg hover:shadow-xl active:scale-90 transition-transform z-50 group">
        <span className="material-symbols-outlined text-3xl">share</span>
        <span className="absolute right-20 bg-on-surface text-surface-container-lowest px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Share Rankings</span>
      </button>
    </div>
  );
}
