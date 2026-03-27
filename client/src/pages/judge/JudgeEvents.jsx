import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function JudgeEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/scores/judge/my-events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full"></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">My Assigned Events</h1>
        <p className="text-on-surface-variant mt-2">Events you are approved to judge. Click to start scoring.</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border">
          <span className="material-symbols-outlined text-6xl text-outline mb-4 block">event_busy</span>
          <p className="text-lg font-bold text-on-surface-variant">No assigned events yet</p>
          <p className="text-sm text-outline mt-2">You'll see events here once an admin assigns you as a judge.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <a
              key={event._id}
              href={`/judge/scoring/${event._id}`}
              className="block bg-surface-container-lowest rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-headline font-bold text-on-surface">{event.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                    {event.type || 'technical'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-purple-600 text-2xl">gavel</span>
              </div>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{event.description || 'No description'}</p>
              <div className="flex items-center gap-4 text-xs text-outline font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">format_list_numbered</span>
                  {event.rounds?.length || 0} Rounds
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  {event.judges?.length || 0} Judges
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
