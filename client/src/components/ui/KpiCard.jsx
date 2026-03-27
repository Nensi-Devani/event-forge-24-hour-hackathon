import React from 'react';

export default function KpiCard({ title, value, subtitle, icon, trendValue, trendType, colorClass, bgClass, textClass }) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between h-40 group hover:translate-y-[-4px] transition-transform duration-300 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg ${bgClass} ${textClass}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${colorClass}`}>
          {trendValue}
        </span>
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-headline text-3xl font-extrabold text-on-surface">
            {value}
          </span>
          <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
