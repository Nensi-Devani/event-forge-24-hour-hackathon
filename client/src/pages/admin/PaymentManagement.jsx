import React from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function PaymentManagement() {
  const transactions = [
    { id: '#TXN-88291', team: 'Velocity Strikers', event: 'Nexus Summer Open', amount: '$150.00', date: 'Oct 24, 2023', method: 'Credit Card', methodIcon: 'credit_card', status: 'Paid', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
    { id: '#TXN-88292', team: 'Iron Titans', event: 'Fall Championship', amount: '$150.00', date: 'Oct 25, 2023', method: 'PayPal', methodIcon: 'account_balance_wallet', methodIconColor: 'text-blue-500', status: 'Pending', statusColor: 'bg-surface-container-high text-slate-600', activeRow: true },
    { id: '#TXN-88293', team: 'Cloud Runners', event: 'Elite Invitational', amount: '$150.00', date: 'Oct 26, 2023', method: 'Credit Card', methodIcon: 'credit_card', status: 'Refunded', statusColor: 'bg-error-container text-on-error-container' },
    { id: '#TXN-88294', team: 'Neon Knights', event: 'Regional Qualifiers', amount: '$150.00', date: 'Oct 27, 2023', method: 'Credit Card', methodIcon: 'credit_card', status: 'Paid', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', activeRow: true },
  ];

  return (
    <div className="flex bg-surface text-on-surface min-h-screen font-body antialiased">
      <AdminSidebar />
      
      {/* Main Content Canvas */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full pl-8 pr-8 py-4 h-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-headline">Payment Management</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
              <input className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none" placeholder="Search transactions..." type="text" />
            </div>
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-slate-500 hover:text-blue-600 transition-colors">notifications</button>
              <button className="material-symbols-outlined text-slate-500 hover:text-blue-600 transition-colors">help_outline</button>
              <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white shadow-sm">
                <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6u1wHhTbEb24qxQaS2Vuig6_9jNeu2FsjRZ-dHtxh_exnkdGzpWf5Fe5NkuS00D0xg3pxiN8Ob6crRkpBCK03Uzdl_yQHHLsIh0XM6zZ9bLpOStgKKDabP-3bVUh6o-CSW2QnYZeKW9buFcx_b15exmY7FBYVXHm3OxeEPsZb2ua3-v5lMuTRDC_br7OzJB12RRtERLWUUOQPSZuXW6PMBX-R6ocGAOvlLgHCwRVGTzEj20oAoSk6pHFJ7wWASIhprQAeIYqaU0Cc" alt="Admin" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-10">
          {/* Revenue Summary Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Total Revenue */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,24,72,0.06)] flex flex-col justify-between h-48 relative overflow-hidden group border border-slate-100 dark:border-slate-800">
              <div className="z-10">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">Total Revenue</p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">$142,550.00</h3>
              </div>
              <div className="z-10 flex items-center gap-2 text-tertiary font-bold text-sm">
                <span className="material-symbols-outlined">trending_up</span>
                <span>+12.5% from last month</span>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">payments</span>
              </div>
            </div>
            
            {/* Card 2: Pending Payments */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,24,72,0.06)] flex flex-col justify-between h-48 relative overflow-hidden group border-b-4 border-blue-500">
              <div className="z-10">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">Pending Payments</p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">$8,450.00</h3>
              </div>
              <div className="z-10 flex items-center gap-2 text-slate-500 font-bold text-sm">
                <span className="material-symbols-outlined">schedule</span>
                <span>56 invoices awaiting action</span>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">pending_actions</span>
              </div>
            </div>
            
            {/* Card 3: Refunds */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,24,72,0.06)] flex flex-col justify-between h-48 relative overflow-hidden group border border-slate-100 dark:border-slate-800">
              <div className="z-10">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">Refunds processed</p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">$1,200.00</h3>
              </div>
              <div className="z-10 flex items-center gap-2 text-error font-bold text-sm">
                <span className="material-symbols-outlined">history</span>
                <span>8 requests this cycle</span>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">keyboard_return</span>
              </div>
            </div>
          </section>

          {/* Filters & Data Table */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold font-headline text-on-surface">Transaction History</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                  <button className="px-4 py-2 text-xs font-bold bg-white rounded-md shadow-sm text-primary">All Time</button>
                  <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-on-surface transition-colors">30 Days</button>
                  <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-on-surface transition-colors">7 Days</button>
                </div>
                <div className="relative">
                  <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg text-sm font-semibold text-slate-700 hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-lg">filter_list</span>
                    Status: All
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_20px_40px_rgba(0,24,72,0.06)] overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label">Transaction ID</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label">Team Name</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label">Event</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label text-right">Amount</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label">Date</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label">Payment Method</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label">Status</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-label text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {transactions.map((tx, idx) => (
                      <tr key={idx} className={`hover:bg-surface-container-low/30 transition-colors ${tx.activeRow ? 'bg-surface-container-low/10' : ''}`}>
                        <td className="px-6 py-5 font-mono text-sm text-slate-600 font-label">{tx.id}</td>
                        <td className="px-6 py-5 font-bold text-on-surface">{tx.team}</td>
                        <td className="px-6 py-5 text-sm text-slate-500">{tx.event}</td>
                        <td className="px-6 py-5 text-sm font-bold text-on-surface text-right">{tx.amount}</td>
                        <td className="px-6 py-5 text-sm text-slate-500">{tx.date}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className={`material-symbols-outlined text-lg ${tx.methodIconColor || 'text-slate-400'}`}>{tx.methodIcon}</span>
                            {tx.method}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${tx.statusColor}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">more_horiz</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 bg-surface-container-low/50 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-500">Showing <span className="font-bold text-on-surface">1-4</span> of <span className="font-bold text-on-surface">248</span> transactions</p>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white transition-all text-slate-400 hover:text-primary disabled:opacity-30" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">1</button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white text-xs font-bold text-slate-500 hover:text-primary">2</button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white text-xs font-bold text-slate-500 hover:text-primary">3</button>
                  <button className="p-2 rounded-lg hover:bg-white transition-all text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Contextual Insights Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-headline text-on-surface">Payment Methods</h3>
                <span className="text-xs font-bold uppercase text-slate-400 tracking-tighter font-label">Usage split</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Credit/Debit Cards</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">PayPal</span>
                    <span className="font-bold">18%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Bank Transfer</span>
                    <span className="font-bold">4%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#0052cc] to-[#003d9b] p-8 rounded-xl text-white relative overflow-hidden shadow-lg">
              <div className="z-10 relative">
                <h3 className="text-xl font-bold font-headline mb-2">Quarterly Forecast</h3>
                <p className="text-primary-fixed text-sm mb-6 leading-relaxed">Based on current registration trends, revenue is expected to grow by another 15% before the final tournament cutoff.</p>
                <button className="bg-white text-primary px-6 py-2 rounded-full text-xs font-bold hover:bg-primary-fixed transition-colors shadow-sm">View Projection Report</button>
              </div>
              <div className="absolute right-0 bottom-0 p-4 opacity-20 transform translate-x-4 translate-y-4">
                <span className="material-symbols-outlined text-[160px]">auto_graph</span>
              </div>
            </div>
          </section>
        </div>

        {/* FAB for Quick Transaction */}
        <button className="fixed bottom-8 right-8 bg-gradient-to-br from-[#0052cc] to-[#003d9b] text-white h-16 w-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group z-50">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 600" }}>add</span>
          <span className="absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">New Manual Payment</span>
        </button>
      </main>
    </div>
  );
}
