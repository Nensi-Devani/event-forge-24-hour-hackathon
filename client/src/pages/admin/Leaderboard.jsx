import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function AdminLeaderboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { API.get('/events?limit=100').then(res => setEvents(res.data.events || [])).catch(console.error); }, []);

  useEffect(() => {
    if (selectedEvent) {
      setLoading(true);
      API.get(`/events/${selectedEvent}/leaderboard`).then(res => {
        setLeaderboard(res.data.leaderboard || []);
        setEvent(res.data.event);
      }).catch(console.error).finally(() => setLoading(false));
    }
  }, [selectedEvent]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Leaderboard</h1>
        <p className="text-on-surface-variant mt-1">View event-wise team rankings.</p>
      </div>

      <div className="mb-8 max-w-md">
        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Select Event</label>
        <select value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/40">
          <option value="">Choose an event...</option>
          {events.map(ev => <option key={ev._id} value={ev._id}>{ev.title}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : leaderboard.length > 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
          <table className="w-full text-left">
            <thead><tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Team</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Leader</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Members</th>
              <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-wider text-right">Total Score</th>
            </tr></thead>
            <tbody className="divide-y divide-surface-container">
              {leaderboard.map((entry) => (
                <tr key={entry.team._id} className={`hover:bg-surface-container-low/50 ${entry.rank <= 3 ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <span className={`font-headline font-extrabold text-lg ${entry.rank === 1 ? 'text-amber-500' : entry.rank === 2 ? 'text-slate-400' : entry.rank === 3 ? 'text-orange-500' : 'text-outline'}`}>
                      {String(entry.rank).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">{entry.team.teamName}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{entry.team.leader?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">{(entry.team.members?.length || 0) + 1}</td>
                  <td className="px-6 py-4 text-right font-headline font-bold text-primary text-lg">{entry.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedEvent ? (
        <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border"><span className="material-symbols-outlined text-4xl text-outline mb-2 block">leaderboard</span><p className="text-on-surface-variant">No scores yet.</p></div>
      ) : null}
    </div>
  );
}
