import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function JudgeManagement() {
  const [judges, setJudges] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventJudges, setEventJudges] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [judgeRes, eventRes] = await Promise.all([
        API.get('/users?role=judge&limit=100'),
        API.get('/events?limit=100'),
      ]);
      setJudges(judgeRes.data.users || []);
      setEvents(eventRes.data.events || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const openAssign = (event) => {
    setAssignModal(event);
    setEventJudges(event.judges?.map(j => j._id || j) || []);
    setSelectedEvent(event._id);
  };

  const toggleJudge = (judgeId) => {
    setEventJudges(prev =>
      prev.includes(judgeId)
        ? prev.filter(id => id !== judgeId)
        : [...prev, judgeId]
    );
  };

  const saveAssignment = async () => {
    try {
      await API.put(`/events/${selectedEvent}/judges`, { judges: eventJudges });
      setAssignModal(null);
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };

  const handleApprove = async (userId) => {
    try {
      await API.put(`/users/${userId}/role`, { role: 'judge' });
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };

  const handleRemoveRole = async (userId) => {
    if (!confirm('Remove judge role?')) return;
    try {
      await API.put(`/users/${userId}/role`, { role: 'participant' });
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };

  const filtered = judges.filter(j =>
    j.name.toLowerCase().includes(search.toLowerCase()) ||
    j.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Judge Management</h1>
          <p className="text-on-surface-variant mt-1">{judges.length} judges total</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search judges..." className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm outline-none focus:border-primary/40" />
        </div>
      </div>

      {/* Judges Table */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm mb-10">
          <table className="w-full text-left">
            <thead><tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Judge</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Tech Stack</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Verified</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-surface-container">
              {filtered.map(judge => (
                <tr key={judge._id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm">{judge.name}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{judge.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {judge.techStack?.map((t, i) => (
                        <span key={i} className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[10px] font-bold">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${judge.isEmailVerified ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {judge.isEmailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleRemoveRole(judge._id)} className="text-xs text-red-500 font-bold hover:underline">Remove Role</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assign Judges to Events */}
      <div>
        <h2 className="text-2xl font-headline font-extrabold text-on-surface mb-4">Assign Judges to Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event._id} className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-headline font-bold text-on-surface mb-2">{event.title}</h3>
              <p className="text-xs text-outline mb-3">{event.judges?.length || 0} judges assigned</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {event.judges?.map((j, i) => (
                  <span key={i} className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {typeof j === 'object' ? j.name : 'Judge'}
                  </span>
                ))}
              </div>
              <button onClick={() => openAssign(event)} className="w-full py-2 rounded-xl border border-primary text-primary font-bold text-xs hover:bg-primary/5 transition-colors">
                Manage Judges
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAssignModal(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-headline font-bold mb-1">Assign Judges</h3>
            <p className="text-sm text-outline mb-6">{assignModal.title}</p>
            <div className="space-y-2">
              {judges.map(judge => (
                <label key={judge._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={eventJudges.includes(judge._id)}
                    onChange={() => toggleJudge(judge._id)}
                    className="rounded accent-primary"
                  />
                  <div>
                    <p className="font-bold text-sm">{judge.name}</p>
                    <p className="text-xs text-outline">{judge.email}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setAssignModal(null)} className="flex-1 py-3 rounded-xl border font-bold text-sm">Cancel</button>
              <button onClick={saveAssignment} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm">Save Assignment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
