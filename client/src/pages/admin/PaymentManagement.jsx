import React from "react";

export default function PaymentManagement() {
  const transactions = [
<<<<<<< HEAD
    {
      id: "#TXN-88291",
      team: "Velocity Strikers",
      event: "Nexus Summer Open",
      amount: "$150.00",
      date: "Oct 24, 2023",
      method: "Credit Card",
      methodIcon: "credit_card",
      status: "Paid",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    },
    {
      id: "#TXN-88292",
      team: "Iron Titans",
      event: "Fall Championship",
      amount: "$150.00",
      date: "Oct 25, 2023",
      method: "PayPal",
      methodIcon: "account_balance_wallet",
      methodIconColor: "text-blue-500",
      status: "Pending",
      statusColor: "bg-surface-container-high text-slate-600",
      activeRow: true,
    },
    {
      id: "#TXN-88293",
      team: "Cloud Runners",
      event: "Elite Invitational",
      amount: "$150.00",
      date: "Oct 26, 2023",
      method: "Credit Card",
      methodIcon: "credit_card",
      status: "Refunded",
      statusColor: "bg-error-container text-on-error-container",
    },
    {
      id: "#TXN-88294",
      team: "Neon Knights",
      event: "Regional Qualifiers",
      amount: "$150.00",
      date: "Oct 27, 2023",
      method: "Credit Card",
      methodIcon: "credit_card",
      status: "Paid",
      statusColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      activeRow: true,
    },
=======
    { id: '#TXN-88291', team: 'Velocity Strikers', event: 'Nexus Summer Open', amount: '₹150.00', date: 'Oct 24, 2023', method: 'Credit Card', methodIcon: 'credit_card', status: 'Paid', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
    { id: '#TXN-88292', team: 'Iron Titans', event: 'Fall Championship', amount: '₹150.00', date: 'Oct 25, 2023', method: 'PayPal', methodIcon: 'account_balance_wallet', methodIconColor: 'text-blue-500', status: 'Pending', statusColor: 'bg-surface-container-high text-slate-600', activeRow: true },
    { id: '#TXN-88293', team: 'Cloud Runners', event: 'Elite Invitational', amount: '₹150.00', date: 'Oct 26, 2023', method: 'Credit Card', methodIcon: 'credit_card', status: 'Refunded', statusColor: 'bg-error-container text-on-error-container' },
    { id: '#TXN-88294', team: 'Neon Knights', event: 'Regional Qualifiers', amount: '₹150.00', date: 'Oct 27, 2023', method: 'Credit Card', methodIcon: 'credit_card', status: 'Paid', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', activeRow: true },
>>>>>>> 3a7f44ac2d84a0ea0fa3a21b1db0bf947bde24c5
  ];

  return (
    <section className="bg-surface text-on-surface min-h-screen font-body antialiased overflow-x-hidden">
      <div className="min-h-screen">
        <header className="flex items-center justify-between w-full px-8 py-4 h-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-headline">
            Payments
          </h2>
        </header>

        <div className="p-8 space-y-10">
          {/* Revenue Summary Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Total Revenue */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,24,72,0.06)] flex flex-col justify-between h-48 relative overflow-hidden group border border-slate-100 dark:border-slate-800">
              <div className="z-10">
<<<<<<< HEAD
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">
                  Total Revenue
                </p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">
                  $142,550.00
                </h3>
=======
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">Total Revenue</p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">₹142,550.00</h3>
>>>>>>> 3a7f44ac2d84a0ea0fa3a21b1db0bf947bde24c5
              </div>
              <div className="z-10 flex items-center gap-2 text-tertiary font-bold text-sm">
                <span className="material-symbols-outlined">trending_up</span>
                <span>+12.5% from last month</span>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">
                  payments
                </span>
              </div>
            </div>

            {/* Card 2: Pending Payments */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,24,72,0.06)] flex flex-col justify-between h-48 relative overflow-hidden group border-b-4 border-blue-500">
              <div className="z-10">
<<<<<<< HEAD
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">
                  Pending Payments
                </p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">
                  $8,450.00
                </h3>
=======
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">Pending Payments</p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">₹8,450.00</h3>
>>>>>>> 3a7f44ac2d84a0ea0fa3a21b1db0bf947bde24c5
              </div>
              <div className="z-10 flex items-center gap-2 text-slate-500 font-bold text-sm">
                <span className="material-symbols-outlined">schedule</span>
                <span>56 invoices awaiting action</span>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">
                  pending_actions
                </span>
              </div>
            </div>

            {/* Card 3: Refunds */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_20px_40px_rgba(0,24,72,0.06)] flex flex-col justify-between h-48 relative overflow-hidden group border border-slate-100 dark:border-slate-800">
              <div className="z-10">
<<<<<<< HEAD
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">
                  Refunds processed
                </p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">
                  $1,200.00
                </h3>
=======
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 font-label">Refunds processed</p>
                <h3 className="text-4xl font-extrabold text-on-surface font-headline">₹1,200.00</h3>
>>>>>>> 3a7f44ac2d84a0ea0fa3a21b1db0bf947bde24c5
              </div>
              <div className="z-10 flex items-center gap-2 text-error font-bold text-sm">
                <span className="material-symbols-outlined">history</span>
                <span>8 requests this cycle</span>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">
                  keyboard_return
                </span>
              </div>
            </div>
          </section>

          {/* Filters & Data Table */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold font-headline text-on-surface">
                Transaction History
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                  <button className="px-4 py-2 text-xs font-bold bg-white rounded-md shadow-sm text-primary">
                    All Time
                  </button>
                  <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-on-surface transition-colors">
                    30 Days
                  </button>
                  <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-on-surface transition-colors">
                    7 Days
                  </button>
                </div>
                <div className="relative">
                  <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg text-sm font-semibold text-slate-700 hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      filter_list
                    </span>
                    Status: All
                  </button>
                </div>
              </div>
            </div>

          <div className="bg-surface-container-lowest rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 font-label">
                      Event Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 font-label text-right">
                      Price
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 font-label text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {eventPayments.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      <td className="px-6 py-5 font-semibold text-on-surface">
                        {item.eventName}
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-on-surface">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          className="px-5 py-2.5 rounded-lg bg-linear-to-br from-primary-container to-primary text-white text-sm font-bold shadow-md hover:opacity-90 active:scale-95 transition-all"
                          onClick={() =>
                            alert(`Payment initiated for ${item.eventName}`)
                          }
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
