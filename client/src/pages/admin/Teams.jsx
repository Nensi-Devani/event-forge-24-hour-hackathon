import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, [page, search, eventFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [teamsRes, eventsRes] = await Promise.all([
        API.get(`/teams?page=${page}&limit=10&search=${search}&event=${eventFilter}`),
        API.get('/events?limit=100'),
      ]);
      setTeams(teamsRes.data.teams || []);
      setTotal(teamsRes.data.total || 0);
      setPages(teamsRes.data.pages || 1);
      setEvents(eventsRes.data.events || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this team?')) return;
    try { await API.delete(`/teams/${id}`); fetchData(); } catch (err) { alert('Failed'); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Team Management</h1>
        <p className="text-on-surface-variant mt-1">{total} teams registered</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search teams..." className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm outline-none focus:border-primary/40" />
        </div>
        <select value={eventFilter} onChange={e => { setEventFilter(e.target.value); setPage(1); }} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm outline-none">
          <option value="">All Events</option>
          {events.map(ev => <option key={ev._id} value={ev._id}>{ev.title}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left">
            <thead><tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Team Name</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Event</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Leader</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Members</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Verified</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-surface-container">
              {teams.map(team => (
                <tr key={team._id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm">{team.teamName}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{team.event?.title || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">{team.leader?.name || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      {team.members?.map((m, i) => (
                        <span key={i} className="text-xs text-on-surface-variant">
                          {m.name} ({m.email})
                          {m.isVerified ? <span className="text-green-500 ml-1">✓</span> : <span className="text-amber-500 ml-1">⏳</span>}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {team.members?.every(m => m.isVerified) ? (
                      <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full">All Verified</span>
                    ) : (
                      <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-full">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-outline">{new Date(team.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(team._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-red-500 text-lg">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pages > 1 && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100">
              <span className="text-xs text-outline">Page {page} of {pages}</span>
              <div className="flex gap-2">
                <button disabled={page<=1} onClick={() => setPage(p=>p-1)} className="px-3 py-1.5 rounded-lg border text-sm font-bold disabled:opacity-40">Prev</button>
                <button disabled={page>=pages} onClick={() => setPage(p=>p+1)} className="px-3 py-1.5 rounded-lg border text-sm font-bold disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
