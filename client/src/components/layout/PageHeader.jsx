import React from 'react';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <header className="flex justify-between items-end mb-10">
      <div>
        <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-1">
          {title}
        </h2>
        <p className="text-slate-500 font-medium">{subtitle}</p>
      </div>
      {actions && (
        <div className="flex items-center gap-4">
          {actions}
        </div>
      )}
    </header>
  );
}
