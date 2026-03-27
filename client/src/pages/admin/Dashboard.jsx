import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import KpiCard from '../../components/ui/KpiCard';
import RecentRegistrations from '../../components/ui/RecentRegistrations';

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <PageHeader 
        title="Administrative Overview" 
        subtitle="Welcome back, Chief Admin. Here's what's happening today."
        actions={
          <>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-primary font-bold text-sm rounded-lg hover:bg-surface-container-highest transition-colors active:scale-95">
              <span className="material-symbols-outlined text-lg">file_download</span>
              Export Data
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg">add</span>
              Create Event
            </button>
          </>
        }
      />

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard 
          title="Total Events" value="148" subtitle="24 Active"
          icon="calendar_today" trendValue="+12%" trendType="up"
          bgClass="bg-blue-50" textClass="text-primary" colorClass="text-tertiary-container bg-tertiary-fixed"
        />
        <KpiCard 
          title="Registrations" value="3,290" subtitle="Last 30d"
          icon="how_to_reg" trendValue="+8%" trendType="up"
          bgClass="bg-purple-50" textClass="text-secondary" colorClass="text-on-tertiary-fixed-variant bg-tertiary-fixed"
        />
        <KpiCard 
          title="Total Revenue" value="$84.2k" subtitle="USD Net"
          icon="payments" trendValue="+24%" trendType="up"
          bgClass="bg-green-50" textClass="text-emerald-700" colorClass="text-emerald-800 bg-emerald-100"
        />
        <KpiCard 
          title="Pending Eval" value="19" subtitle="Urgent"
          icon="rate_review" trendValue="High" trendType="critical"
          bgClass="bg-orange-50" textClass="text-orange-700" colorClass="text-error bg-error-container"
        />
      </section>

      {/* Main Insights Section (Bento Style) */}
      <section className="grid grid-cols-12 gap-8 mb-10">
        {/* Registration Trend Chart Area */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">Daily Registration Trend</h3>
              <p className="text-sm text-slate-400">Activity volume across all active events</p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold bg-white text-primary rounded shadow-sm">7 Days</button>
              <button className="px-3 py-1 text-xs font-bold text-slate-500">30 Days</button>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] flex items-end gap-2 px-2">
            {[40, 65, 55, 85, 95, 45, 30].map((height, i) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              const isPeak = height === 95;
              return (
                <div key={i} className="flex-1 rounded-t-lg relative group" style={{ height: `${height}%` }}>
                  <div className={`absolute inset-x-0 bottom-0 rounded-t-lg h-full transition-colors duration-300 ${isPeak ? 'bg-gradient-primary' : 'bg-surface-container-low group-hover:bg-primary/20'}`}></div>
                  <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase ${isPeak ? 'font-bold text-primary' : 'font-semibold text-slate-400'}`}>
                    {days[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions / Mini Map */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-primary p-6 rounded-xl text-white relative overflow-hidden group shadow-lg shadow-primary/20">
            <div className="relative z-10">
              <h4 className="font-headline text-lg font-bold mb-2">Venue Distribution</h4>
              <p className="text-blue-100 text-xs mb-4">You have events running across 12 major hubs.</p>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold hover:bg-white/30 transition-colors">
                View Map
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[160px]">public</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-xl flex-1 shadow-sm border border-slate-100 dark:border-slate-800">
            <h4 className="font-headline font-bold text-on-surface mb-4">System Health</h4>
            <div className="space-y-4">
              <HealthItem label="API Latency" value="42ms" color="bg-emerald-500" textClass="text-emerald-600" width="98%" />
              <HealthItem label="Database Load" value="28%" color="bg-primary" textClass="text-primary" width="28%" />
              <HealthItem label="Storage" value="74%" color="bg-orange-500" textClass="text-orange-600" width="74%" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Registrations */}
      <RecentRegistrations />

      {/* Global FAB */}
      <div className="fixed bottom-10 right-10">
        <button className="w-14 h-14 bg-gradient-primary text-white rounded-full flex items-center justify-center shadow-[0px_20px_40px_rgba(0,24,72,0.15)] active:scale-90 transition-all hover:rotate-90 duration-300">
          <span className="material-symbols-outlined text-2xl">settings_input_component</span>
        </button>
      </div>
    </>
  );
}

function HealthItem({ label, value, color, textClass, width }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate-500 font-medium">{label}</span>
        <span className={`text-xs font-bold ${textClass}`}>{value}</span>
      </div>
      <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width }}></div>
      </div>
    </div>
  );
}
