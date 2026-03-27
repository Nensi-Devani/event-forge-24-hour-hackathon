import React, { useState } from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function JudgeDashboard() {
  const [scores, setScores] = useState({
    problem: 8,
    architecture: 6,
    functionality: 9,
    ux: 7,
    innovation: 8,
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleScoreChange = (criterion, value) => {
    setScores(prev => ({ ...prev, [criterion]: parseInt(value) }));
  };

  return (
    <div className="flex bg-surface text-on-surface font-body selection:bg-secondary-container">
      <AdminSidebar />
      
      {/* Main Content Canvas */}
      <main className="flex-1 ml-64 min-h-screen p-8 lg:p-12">
        {/* Header / Editorial Section */}
        <header className="mb-12 flex justify-between items-end">
          <div className="max-w-2xl">
            <nav className="flex items-center space-x-2 text-secondary mb-4">
              <span className="text-xs font-bold tracking-widest uppercase">Global Hackathon 2024</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-xs font-bold tracking-widest uppercase opacity-60">Scoring Console</span>
            </nav>
            <h2 className="font-headline font-extrabold text-4xl lg:text-5xl text-on-surface tracking-tighter mb-4">Judge Panel</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">Evaluation portal for the <span className="text-primary font-semibold">Assigned Events</span> category. Please assess based on technical depth and innovation.</p>
          </div>
          
          {/* Summary Card of Progress */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex items-center space-x-6 border-l-4 border-primary border border-slate-100 dark:border-slate-800">
            <div className="relative w-16 h-16 flex items-center justify-center border border-slate-50">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container-high" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6"></circle>
                <circle className="text-primary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="44" strokeWidth="6"></circle>
              </svg>
              <span className="absolute font-headline font-bold text-sm">75%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Scoring Progress</p>
              <p className="font-headline font-extrabold text-2xl text-on-surface">12 / 16</p>
              <p className="text-xs text-on-surface-variant font-label">Teams evaluated</p>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout for Teams & Scoring */}
        <div className="grid grid-cols-12 gap-8">
          {/* Team Selection List (Column 1-4) */}
          <section className="col-span-12 lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline font-bold text-lg">Assigned Teams</h3>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">4 Pending</span>
            </div>
            
            {/* Team Card: Active */}
            <div className="group cursor-pointer bg-primary-container p-5 rounded-xl transition-all duration-300 shadow-xl shadow-primary-container/20 border border-transparent">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">rocket_launch</span>
                </div>
                <span className="bg-white/20 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tight">Active Evaluation</span>
              </div>
              <h4 className="font-headline font-bold text-white text-lg leading-tight mb-1">Team Quantum Flux</h4>
              <p className="text-primary-fixed-dim text-sm mb-4">Next-Gen Energy Management</p>
              <div className="flex items-center space-x-2">
                <img className="w-6 h-6 rounded-full border border-white/30 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv0VCiGbva1dClAkHvIvGD6BWkv-uM1cpsd6aczuIhgZGvB1EcazCCIRUFTtJp0QpkXtyD_kMBoMMinaP1CMYXdLTwp7UKUOs4CQoxjS_pl2D-3-7LujHT7PLUzJfkKU6gTsZ2BYCGjzrxdR28adgRGLFmtnUN1eNltPfMU10lBEByRrfmvqqMiKjtmarIipRU28CXSAgq0M7WKt7QkAICHCQxclbfMyknszxiWDF2PW2jv673NkOiCKjBGAqC-tgmm0JTlVseExOW" alt="Team member" />
                <img className="w-6 h-6 rounded-full border border-white/30 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBMXcRigK7oIx2VIVX3i2fL7fA1izTyq2JBTgFRiRa_lzhoPovv4eMYvGXuO-cB64sOF1OnUh0DAl7TXSJFqcPXf1QLYYyB0nY1V6vONrIKJqGq8MSz8zd8h3j1gIuuq2LKQpb_b7OCO8E9Qn0_v9ws2tBAuIclT5Wij3uxMNDvsh9-dq5KIVuUX3A4htDfVXEDa9mqz1dPvZjYldqFDQNvJqvyaPGEoSwDC3HeZi4QX1PgtUU-10dDN-y8a8Oof9zOQcgG91NdUSR" alt="Team member" />
                <span className="text-[10px] text-white/60 font-medium">+2 more</span>
              </div>
            </div>
            
            {/* Team Card: Pending */}
            <div className="group cursor-pointer bg-surface-container-lowest p-5 rounded-xl transition-all duration-300 hover:bg-surface-container-low border border-slate-100 dark:border-slate-800 hover:border-primary-container/20 shadow-sm border border-slate-50">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">biotech</span>
                </div>
                <span className="bg-surface-container-high text-secondary text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tight">Pending</span>
              </div>
              <h4 className="font-headline font-bold text-on-surface text-lg leading-tight mb-1">BioSphere Core</h4>
              <p className="text-on-surface-variant text-sm mb-4">Biodiversity Monitoring Tool</p>
              <div className="flex items-center space-x-2">
                <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoBgMzeHyMKbvNEbcM83gPDlYzGeFBH0qsRWfQCV4e4ynmLA3kgjm7tWyYiDrc9CQ3LlzY4gr1wUXuAVzqpOstddjZNBbDZv8IV13TEjRK1G-61Dav5clf6fIXYV6nzyvNt9Z11zUsPgfGZdbIlaVzExVf232s_kZ9blZ91nwg1uZRbtSqfXAADc24F6qSa2n1kdbpAHJysA-SoKCHYDPRhy3iTLWWcbqczv5hKFnySWS-9fs7aF7zBuGDn08PCTnbhz1TQO_6Dl1E" alt="member" />
                <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZYzhL4E7Zcheov5u6sptdCj-muz55gljVTXn7un7_yOl22kXvRvypZQSXjUNGz-uUXeR3rB4PathAkx13vdmHwcv1OwOyLvPzUQqTaCa08m_Ag7_5dQYhLMiXL-EtQwR5saWiDV5vI4KCUGqGCX4fnyGZKlQxFnZ9ZVb_DhQMhl8cPxU5cOpzX12Sa4B1AUMdp1bYTb7lwMOgORI6vwObvzsOacDrljFyysheUrXkFj9_VYxbP7_rySzVNsdbmp9cD_tuA1K7r69e" alt="member" />
              </div>
            </div>

            {/* Team Card: Scored */}
            <div className="group cursor-pointer bg-surface-container-lowest opacity-70 p-5 rounded-xl grayscale hover:grayscale-0 transition-all duration-300 border border-slate-100 dark:border-slate-800 shadow-sm border border-slate-50">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-tertiary-fixed rounded-lg flex items-center justify-center text-on-tertiary-fixed-variant">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tight">Scored: 42/50</span>
              </div>
              <h4 className="font-headline font-bold text-on-surface text-lg leading-tight mb-1">Neural Bridge</h4>
              <p className="text-on-surface-variant text-sm">AI Communication Interface</p>
            </div>
            
            <button className="w-full py-4 border-2 border-dashed border-outline-variant text-outline rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center space-x-2">
              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              <span>View More Assignments</span>
            </button>
          </section>

          {/* Scoring Panel (Column 5-12) */}
          <section className="col-span-12 lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-xl p-8 lg:p-12 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              {/* Asymmetric Decorator */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="mb-10 flex justify-between items-start">
                  <div>
                    <h3 className="font-headline font-extrabold text-3xl tracking-tight mb-2">Evaluate Submission</h3>
                    <p className="text-on-surface-variant font-body">Review the documentation and demo before submitting final scores.</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-3 bg-surface-container-low text-primary rounded-full hover:bg-primary-container hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined">description</span>
                    </button>
                    <button className="p-3 bg-surface-container-low text-primary rounded-full hover:bg-primary-container hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined">play_circle</span>
                    </button>
                  </div>
                </div>

                {/* Scoring Round Selector */}
                <div className="mb-10 border-b border-surface-container-low flex gap-8">
                  <button className="pb-3 border-b-2 border-primary text-primary font-bold text-sm">
                    Round 1: Video Submission
                  </button>
                  <button className="pb-3 border-b-2 border-transparent text-slate-500 font-bold text-sm hover:text-primary transition-colors">
                    Round 2: Technical Review
                  </button>
                  <button className="pb-3 border-b-2 border-transparent text-slate-500 font-bold text-sm hover:text-primary transition-colors">
                    Round 3: Live Pitch
                  </button>
                </div>

                {/* Sliders Form */}
                <div className="space-y-8">
                  <ScoreCriterion 
                    title="Problem Understanding" 
                    desc="How well did the team define and validate the pain point?" 
                    value={scores.problem} 
                    onChange={(val) => handleScoreChange('problem', val)} 
                  />
                  <ScoreCriterion 
                    title="Architecture" 
                    desc="Scalability, security, and technical stack robustness." 
                    value={scores.architecture} 
                    onChange={(val) => handleScoreChange('architecture', val)} 
                  />
                  <ScoreCriterion 
                    title="Functionality" 
                    desc="Completeness of the demo and feature implementation." 
                    value={scores.functionality} 
                    onChange={(val) => handleScoreChange('functionality', val)} 
                  />
                  <ScoreCriterion 
                    title="UI/UX" 
                    desc="Visual appeal, accessibility, and user flow intuitive levels." 
                    value={scores.ux} 
                    onChange={(val) => handleScoreChange('ux', val)} 
                  />
                  <ScoreCriterion 
                    title="Innovation" 
                    desc="Originality of the solution and unique value proposition." 
                    value={scores.innovation} 
                    onChange={(val) => handleScoreChange('innovation', val)} 
                  />
                </div>

                {/* Feedback Area */}
                <div className="mt-12 pt-12 border-t border-surface-container-high">
                  <label className="block mb-4 font-headline font-bold text-on-surface">Private Feedback for Team</label>
                  <textarea 
                    className="w-full bg-surface-container-low border-transparent rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all outline-none resize-none" 
                    placeholder="Add specific notes on strengths and areas for improvement..." 
                    rows="4"
                  ></textarea>
                </div>

                {/* Submission Footer */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1 font-label">Estimated Total</p>
                    <p className="font-headline font-extrabold text-3xl text-on-surface">{totalScore.toFixed(1)}<span className="text-lg text-outline font-medium">/50</span></p>
                  </div>
                  <div className="flex space-x-4 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-8 py-4 text-secondary font-bold text-sm hover:text-primary transition-colors">Save Draft</button>
                    <button className="flex-1 sm:flex-none px-12 py-4 bg-gradient-to-br from-primary-container to-primary text-white rounded-full font-headline font-extrabold text-base shadow-lg shadow-primary-container/30 active:scale-95 transition-all">
                      Submit Scores
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Section: Insights/Leaderboard Preview */}
        <section className="mt-12 mb-12">
          <div className="bg-surface-container-low rounded-xl p-8 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline font-bold text-xl">Judging Analytics</h3>
              <button className="flex items-center space-x-2 text-primary text-sm font-bold hover:text-primary-container transition-colors">
                <span>Full Leaderboard</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-50">
                <p className="text-xs text-secondary font-bold uppercase mb-2 font-label">My Avg. Score</p>
                <p className="font-headline font-extrabold text-3xl text-on-surface">7.4</p>
                <p className="text-xs text-tertiary font-medium mt-1">+0.2 from session avg</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-50">
                <p className="text-xs text-secondary font-bold uppercase mb-2 font-label">Fastest Review</p>
                <p className="font-headline font-extrabold text-3xl text-on-surface">14m</p>
                <p className="text-xs text-on-surface-variant mt-1">Project: Hydra Engine</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-50">
                <p className="text-xs text-secondary font-bold uppercase mb-2 font-label">Category Rank</p>
                <p className="font-headline font-extrabold text-3xl text-on-surface">3rd</p>
                <p className="text-xs text-on-surface-variant mt-1">Of 12 Lead Judges</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action for Quick Help */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-[0px_20px_40px_rgba(0,24,72,0.15)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined">help_outline</span>
      </button>
    </div>
  );
}

function ScoreCriterion({ title, desc, value, onChange }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="block">
          <span className="font-headline font-bold text-on-surface text-lg">{title}</span>
          <span className="block text-sm text-on-surface-variant">{desc}</span>
        </label>
        <span className="font-headline font-extrabold text-2xl text-primary">{value}<span className="text-sm text-outline font-medium">/10</span></span>
      </div>
      <input 
        className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" 
        max="10" 
        min="0" 
        step="1" 
        type="range" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
