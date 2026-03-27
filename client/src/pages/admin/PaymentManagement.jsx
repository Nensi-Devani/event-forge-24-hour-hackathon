import React from 'react';

export default function PaymentManagement() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Payment Management</h1>
        <p className="text-on-surface-variant mt-1">Track event registration payments.</p>
      </div>
      <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-slate-100 dark:border-slate-800">
        <span className="material-symbols-outlined text-6xl text-outline mb-4 block">payments</span>
        <h2 className="text-lg font-headline font-bold text-on-surface-variant mb-2">Payment Integration Coming Soon</h2>
        <p className="text-sm text-outline max-w-md mx-auto">This section will display payment records for paid events. Configure your payment gateway in the settings.</p>
      </div>
    </div>
  );
}
