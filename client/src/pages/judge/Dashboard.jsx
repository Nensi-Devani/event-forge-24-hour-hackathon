import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function JudgeDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalEvents: 0, totalTeamsScored: 0 });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await API.get('/scores/judge/my-events');
      setEvents(res.data);
      setStats({ totalEvents: res.data.length, totalTeamsScored: 0 });
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full"></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Judge Dashboard</h1>
        <p className="text-on-surface-variant mt-1">Your judging overview and assigned events.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="material-symbols-outlined text-purple-600 text-2xl mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
          <p className="text-2xl font-headline font-extrabold">{stats.totalEvents}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mt-1">Assigned Events</p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="material-symbols-outlined text-green-600 text-2xl mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="text-2xl font-headline font-extrabold">0</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mt-1">Teams Scored</p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="material-symbols-outlined text-amber-600 text-2xl mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>pending</span>
          <p className="text-2xl font-headline font-extrabold">0</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mt-1">Pending</p>
        </div>
      </div>

      {/* Events */}
      <h2 className="text-xl font-headline font-bold mb-4">Your Assigned Events</h2>
      {events.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border">
          <span className="material-symbols-outlined text-5xl text-outline mb-3 block">event_busy</span>
          <p className="text-on-surface-variant font-medium">No events assigned yet</p>
          <p className="text-xs text-outline mt-1">Contact admin to get assigned to events.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map(event => (
            <a key={event._id} href={`/judge/scoring/${event._id}`} className="block bg-surface-container-lowest rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-headline font-bold">{event.title}</h3>
                <span className="material-symbols-outlined text-purple-600">arrow_forward</span>
              </div>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-3">{event.description || 'No description'}</p>
              <div className="flex gap-4 text-xs text-outline font-medium">
                <span>{event.rounds?.length || 0} Rounds</span>
                <span>{event.judges?.length || 0} Judges</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
