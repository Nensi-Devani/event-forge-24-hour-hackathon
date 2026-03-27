import React from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function JudgeManagement() {
  const judges = [
    {
      name: 'Marcus Sterling',
      email: 'm.sterling@techcorp.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA_0xi-Zwww66xpH8Z6bpAHGWg5x1wM8ysQyMhLpZ0zpDe2YMWJe_nTjh3IZVQgWFJDaJWepTXmz7--9nSTkkqH-2t5pSAE930cV1yPodZ3jxfGL4qDKSVhmCc364qvHuIRzKJAAjEpaeKcCW_htz0SsmQ9wEXXZsk5NechyxODsma87kkZgLTmYzHy0da_HPbca8pILRqdH9fzuTiWJP_7MSOdQs33Orr5TK04_e-BpveiCyxstNzFRyRWM979nynKUznoKZtJ-oE',
      expertise: ['AI / ML', 'Systems Architecture'],
      teams: '12 Teams',
      track: 'Track: Fintech',
      status: 'Active',
      statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      dotColor: 'bg-tertiary'
    },
    {
      name: 'Elena Rodriguez',
      email: 'elena.r@designhub.io',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmKt1EgNja4S6HONQda8g2GGTQe9dkyxlAL6JZXcWrDG4hP9c-FdCleticMvoqnxBXL3gHdpAoQWH-EtRVrVs6An2qGqF5DVTwWmHTL9_a4nAGubulsz0zr931zXRqU9NA-G3N-BzU-QdwMf7fNKWOM18Y6oB7rVeVJnrq4n9FnCwcAvN_VNbh2shGoX17S2eVNTY---356xuilLHHXZhHtujuqWPEOZAAgb0PeGy15sK2xd4WFAxON6Ugc98H_1xPpPJTp-GHAKp9',
      expertise: ['UX / UI', 'Product Strategy'],
      teams: '08 Teams',
      track: 'Track: Social Impact',
      status: 'Active',
      statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      dotColor: 'bg-tertiary'
    },
    {
      name: 'Jordan Klein',
      email: 'jordan@kleinvc.com',
      initials: 'JK',
      expertise: ['Blockchain', 'Fintech'],
      teams: '00 Teams',
      track: 'Not Assigned',
      status: 'Inactive',
      statusColor: 'bg-error-container text-on-error-container',
      dotColor: 'bg-error'
    },
    {
      name: 'Dr. Sarah Chen',
      email: 's.chen@university.edu',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6GhgMuusMOmTxpKkQCN-XemfUe0fhktauuviT4SXILEXm5NJGA9uNfbyVjRuB_1NcJqHSME0cBcCudj7lGf7XzQDGnZlAdCbB0ZN2iMJJy7_1Tbz6K1kj7OI_P1HV42BQpTDDFBFyUJDSOeRBw3W0nLND8hMJqfl4YUYsaVenoKRtjS-wfmZGXvJnPzQaPaW-z1xtAj0YrQOraQ2EhLQdo4Xeert9jcQ85b_c2Ad4M0-_lv2lR1Jw7TAWIavICPniucK35SDhJd0f',
      expertise: ['Health Tech', 'Data Science'],
      teams: '15 Teams',
      track: 'Track: BioTech',
      status: 'Active',
      statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      dotColor: 'bg-tertiary'
    }
  ];

  return (
    <div className="flex bg-surface text-on-surface min-h-screen font-body antialiased">
      <AdminSidebar />
      
      {/* Main Content Canvas */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 h-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-8 flex-1">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-headline">Nexus Management</h2>
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl overflow-hidden transition-all">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none focus:ring-0 text-sm placeholder:text-slate-400 outline-none" placeholder="Search Users" type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-br from-primary-container to-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-900/10 hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-sm">download</span>
              Export Data
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors"><span className="material-symbols-outlined">notifications</span></button>
              <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors"><span className="material-symbols-outlined">help_outline</span></button>
            </div>
          </div>
        </header>

        <div className="px-8 pt-10 pb-12">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <nav className="flex items-center gap-2 text-xs font-bold text-primary mb-2 uppercase tracking-tighter">
                <span>Events</span>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span>Global Hackathon 2024</span>
              </nav>
              <h1 className="text-4xl font-black text-on-background tracking-tight font-headline">Judge Management</h1>
              <p className="text-on-surface-variant mt-2 max-w-2xl">Manage evaluation panels, expertise assignment, and judge status for the current event cycle.</p>
            </div>
            <button className="flex items-center gap-3 bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all shadow-sm">
              <span className="material-symbols-outlined">person_add</span>
              Add Judge
            </button>
          </div>

          {/* Bento Layout: Stats Summary & List */}
          <div className="grid grid-cols-12 gap-8">
            {/* Stats Bar */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">Total Judges</p>
                <p className="text-3xl font-black text-primary font-headline">24</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">Active Panels</p>
                <p className="text-3xl font-black text-primary font-headline">08</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">Avg Score Delay</p>
                <p className="text-3xl font-black text-primary font-headline">4.2<span className="text-sm font-medium text-slate-400 ml-1 tracking-normal font-body">hrs</span></p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-label">Pending Invitations</p>
                <p className="text-3xl font-black text-secondary font-headline">03</p>
              </div>
            </div>

            {/* Main Data Table Container */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="px-8 py-6 flex items-center justify-between bg-surface-container-low/50 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg font-headline">Active Judges List</h3>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                    Filters
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/20">
                      <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">Judge Name</th>
                      <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">Expertise</th>
                      <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">Assigned Teams</th>
                      <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label">Status</th>
                      <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest font-label text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {judges.map((judge, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            {judge.avatar ? (
                              <img className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10" src={judge.avatar} alt={judge.name} />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-black font-headline">{judge.initials}</div>
                            )}
                            <div>
                              <p className="font-bold text-on-surface">{judge.name}</p>
                              <p className="text-xs text-slate-500">{judge.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-2">
                            {judge.expertise.map((exp, eIdx) => (
                              <span key={eIdx} className={`px-3 py-1 ${eIdx === 0 ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-surface-container-high text-on-surface-variant'} text-[10px] font-black uppercase rounded-full`}>
                                {exp}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-medium text-on-surface">{judge.teams}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">{judge.track}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${judge.statusColor} text-[10px] font-black uppercase`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${judge.dotColor}`}></span>
                            {judge.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                            <button className="p-2 text-slate-400 hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination/Footer */}
              <div className="px-8 py-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-surface-container-low/20">
                <p className="text-xs text-slate-500 font-medium">Showing <span className="text-on-surface font-bold">4</span> of <span className="text-on-surface font-bold">24</span> judges</p>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-surface-container-lowest text-slate-400 cursor-not-allowed shadow-sm"><span className="material-symbols-outlined">chevron_left</span></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-xs font-bold shadow-sm">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-lowest text-slate-500 text-xs font-bold transition-colors">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-lowest text-slate-500 text-xs font-bold transition-colors">3</button>
                  <button className="p-2 rounded-lg hover:bg-surface-container-lowest text-slate-600 transition-colors shadow-sm"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
              </div>
            </div>

            {/* Side Card: Expertise Distribution */}
            <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg mb-6 font-headline">Panel Expertise</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 font-label">
                    <span>AI & MACHINE LEARNING</span>
                    <span className="text-primary">45%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 font-label">
                    <span>UX & PRODUCT DESIGN</span>
                    <span className="text-secondary">30%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 font-label">
                    <span>WEB3 & BLOCKCHAIN</span>
                    <span className="text-tertiary">25%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-4 bg-primary-fixed/30 rounded-lg border border-primary/10">
                <p className="text-xs font-bold text-primary flex items-center gap-2 font-label tracking-wide">
                  <span className="material-symbols-outlined text-sm">info</span>
                  PANEL OPTIMIZATION
                </p>
                <p className="text-xs text-on-primary-fixed-variant mt-2 leading-relaxed">
                  You have a high density of AI experts. Consider adding more Product Strategists for balanced scoring.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile Only) */}
      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-primary-container to-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50 md:hidden">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}
