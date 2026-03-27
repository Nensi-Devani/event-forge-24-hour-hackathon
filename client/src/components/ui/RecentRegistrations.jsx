import React from 'react';

export default function RecentRegistrations() {
  const registrations = [
    {
      id: 1,
      name: 'Alex Thompson',
      email: 'alex.t@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU1rALidak3g8uOkzrjzk2P3auVTrsGksf7UUoUgecS5Z6-fUIZoAvBo9P4hf_LNOD5a3TjoriV4Y86cnx3njNePx4TrmIhtPD-VfrxJfK2fWrg_7NqLIAxyf47ALNg-1a2HffCm3dHxyvjIRy3QOPqlOVuSKt2UCFlM12o2kFRysG39Ihng0FiiAwhM5Ej7y-_N6GRukR1X55UUOgzwTW0q-4irNLKpjwnNwX2LF1o9x1NXBHYpd4hWhNX00qZ4lp4sqFeyLqp9H5',
      event: 'Global Tech Summit 2024',
      date: 'Oct 24, 2:15 PM',
      amount: '₹299.00',
      status: 'Completed',
      statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      email: 'm.chen@venture.io',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLJ7QILDlgly9su1w7Drt1md4zfKmhakpaaavlsQQEjtLALU6_NPZk378xZcuKzIdok90ViEK-jPalkGj_V7Q0zone0Poq-_2Y46tCyp6B7PRcymcFz5XZKgSev7mcX0T5Mvww7d4Z4VxY4U-G5xohTXePLyZL4iN2fkC5eiAHB_y5lQ_o_6_rocGZteRg15ztbIfKtYQ-LVDcEvwGBSwzl3Hx_P9S-r9fjSQCBXlpJMJTJm6S5_3ppVpfFZI5RTz0AMtOSGlorCOq',
      event: 'Design Week Workshop',
      date: 'Oct 24, 11:30 AM',
      amount: '₹150.00',
      status: 'Processing',
      statusClass: 'bg-secondary-container text-on-secondary-container'
    },
    {
      id: 3,
      name: 'Sarah Jenkins',
      email: 's.jenkins@media.com',
      avatar: null,
      event: 'Global Tech Summit 2024',
      date: 'Oct 23, 5:45 PM',
      amount: '₹299.00',
      status: 'Completed',
      statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
    }
  ];

  return (
    <div className="col-span-12 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="p-8 flex justify-between items-center border-b border-surface-container-low">
        <h3 className="font-headline text-xl font-bold text-on-surface">Recent Registrations</h3>
        <button className="text-primary font-bold text-sm hover:underline">View All Records</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Registrant</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Event</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {registrations.map(reg => (
              <tr key={reg.id} className="hover:bg-surface-container-low/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    {reg.avatar ? (
                      <img alt="User" className="w-10 h-10 rounded-full object-cover" src={reg.avatar} />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm text-on-surface">{reg.name}</p>
                      <p className="text-[11px] text-slate-400">{reg.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-semibold text-slate-600">{reg.event}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm text-slate-500">{reg.date}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-on-surface">{reg.amount}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${reg.statusClass}`}>
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-surface-container-low/20 flex justify-center">
        <button className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-primary transition-colors">
          Load More Entries
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      </div>
    </div>
  );
}
