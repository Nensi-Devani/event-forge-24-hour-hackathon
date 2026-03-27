import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function getEmptyForm() {
    return {
      title: '', description: '', rules: '', type: 'technical', banner: '',
      minTeamSize: 2, maxTeamSize: 5, maxTeams: 50,
      registrationDeadline: '', isPaid: false, registrationFee: 0,
      rounds: [{ name: 'Round 1', roundNumber: 1, rules: '', evaluationCriteria: [{ name: 'Innovation', maxScore: 20 }], isSubmissionRequired: false, qualification: { type: 'top_n', value: 10 } }],
    };
  }

  useEffect(() => { fetchEvents(); }, [page, search]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/events?page=${page}&limit=10&search=${search}`);
      setEvents(res.data.events || []);
      setTotal(res.data.total || 0);
      setPages(res.data.pages || 1);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      if (editing) {
        await API.put(`/events/${editing}`, formData);
      } else {
        await API.post('/events', formData);
      }
      setShowForm(false); setEditing(null); setFormData(getEmptyForm());
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event');
    } finally { setSubmitting(false); }
  };

  const handleEdit = (event) => {
    setEditing(event._id);
    setFormData({
      title: event.title || '', description: event.description || '', rules: event.rules || '',
      type: event.type || 'technical', banner: event.banner || '',
      minTeamSize: event.minTeamSize || 2, maxTeamSize: event.maxTeamSize || 5, maxTeams: event.maxTeams || 50,
      registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().slice(0,16) : '',
      isPaid: event.isPaid || false, registrationFee: event.registrationFee || 0,
      rounds: event.rounds || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try { await API.delete(`/events/${id}`); fetchEvents(); } catch (err) { alert(err.response?.data?.message || 'Delete failed'); }
  };

  const addRound = () => {
    setFormData(prev => ({
      ...prev,
      rounds: [...prev.rounds, { name: `Round ${prev.rounds.length + 1}`, roundNumber: prev.rounds.length + 1, rules: '', evaluationCriteria: [{ name: '', maxScore: 10 }], isSubmissionRequired: false, qualification: { type: 'top_n', value: 10 } }],
    }));
  };

  const removeRound = (idx) => {
    setFormData(prev => ({ ...prev, rounds: prev.rounds.filter((_, i) => i !== idx) }));
  };

  const updateRound = (idx, field, value) => {
    setFormData(prev => {
      const rounds = [...prev.rounds];
      rounds[idx] = { ...rounds[idx], [field]: value };
      return { ...prev, rounds };
    });
  };

  const addCriteria = (roundIdx) => {
    setFormData(prev => {
      const rounds = [...prev.rounds];
      rounds[roundIdx] = { ...rounds[roundIdx], evaluationCriteria: [...rounds[roundIdx].evaluationCriteria, { name: '', maxScore: 10 }] };
      return { ...prev, rounds };
    });
  };

  const removeCriteria = (roundIdx, critIdx) => {
    setFormData(prev => {
      const rounds = [...prev.rounds];
      rounds[roundIdx] = { ...rounds[roundIdx], evaluationCriteria: rounds[roundIdx].evaluationCriteria.filter((_, i) => i !== critIdx) };
      return { ...prev, rounds };
    });
  };

  const updateCriteria = (roundIdx, critIdx, field, value) => {
    setFormData(prev => {
      const rounds = [...prev.rounds];
      const criteria = [...rounds[roundIdx].evaluationCriteria];
      criteria[critIdx] = { ...criteria[critIdx], [field]: field === 'maxScore' ? Number(value) : value };
      rounds[roundIdx] = { ...rounds[roundIdx], evaluationCriteria: criteria };
      return { ...prev, rounds };
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Event Management</h1>
          <p className="text-on-surface-variant mt-1">{total} events total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setFormData(getEmptyForm()); }} className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
          <span className="material-symbols-outlined text-lg">add</span> Create Event
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search events..." className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm outline-none focus:border-primary/40" />
        </div>
      </div>

      {/* Events Table */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Rounds</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Teams</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-on-surface">{event.title}</p>
                      <p className="text-xs text-outline mt-0.5 line-clamp-1">{event.description}</p>
                    </td>
                    <td className="px-6 py-4"><span className="text-xs font-bold uppercase bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{event.type}</span></td>
                    <td className="px-6 py-4 text-sm font-medium">{event.rounds?.length || 0}</td>
                    <td className="px-6 py-4 text-sm font-medium">{event.maxTeams || '∞'}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{event.registrationDeadline ? new Date(event.registrationDeadline).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${event.registrationDeadline && new Date(event.registrationDeadline) > new Date() ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                        {event.registrationDeadline && new Date(event.registrationDeadline) > new Date() ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(event)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-primary text-lg">edit</span></button>
                        <button onClick={() => handleDelete(event._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-red-500 text-lg">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100">
              <span className="text-xs text-outline">Page {page} of {pages} ({total} events)</span>
              <div className="flex gap-2">
                <button disabled={page <= 1} onClick={() => setPage(p => p-1)} className="px-3 py-1.5 rounded-lg border text-sm font-bold disabled:opacity-40 hover:bg-surface-container transition-colors">Prev</button>
                <button disabled={page >= pages} onClick={() => setPage(p => p+1)} className="px-3 py-1.5 rounded-lg border text-sm font-bold disabled:opacity-40 hover:bg-surface-container transition-colors">Next</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-3xl shadow-2xl my-8" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-headline font-extrabold mb-6">{editing ? 'Edit Event' : 'Create New Event'}</h2>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Title *</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none">
                    <option value="technical">Technical</option>
                    <option value="non-technical">Non-Technical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">Rules</label>
                <textarea value={formData.rules} onChange={e => setFormData({...formData, rules: e.target.value})} rows={2} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">Banner URL</label>
                <input value={formData.banner} onChange={e => setFormData({...formData, banner: e.target.value})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none" placeholder="https://..." />
              </div>

              {/* Team & Registration */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Min Team Size</label>
                  <input type="number" min={1} value={formData.minTeamSize} onChange={e => setFormData({...formData, minTeamSize: Number(e.target.value)})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Max Team Size</label>
                  <input type="number" min={1} value={formData.maxTeamSize} onChange={e => setFormData({...formData, maxTeamSize: Number(e.target.value)})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Max Teams</label>
                  <input type="number" min={1} value={formData.maxTeams} onChange={e => setFormData({...formData, maxTeams: Number(e.target.value)})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">Deadline</label>
                  <input type="datetime-local" value={formData.registrationDeadline} onChange={e => setFormData({...formData, registrationDeadline: e.target.value})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2.5 px-4 text-sm outline-none" />
                </div>
              </div>

              {/* Payment */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isPaid} onChange={e => setFormData({...formData, isPaid: e.target.checked})} className="rounded" />
                  <span className="text-sm font-bold">Paid Event</span>
                </label>
                {formData.isPaid && (
                  <input type="number" min={0} value={formData.registrationFee} onChange={e => setFormData({...formData, registrationFee: Number(e.target.value)})} placeholder="Fee amount" className="bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2 px-4 text-sm outline-none w-32" />
                )}
              </div>

              {/* Rounds */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline font-bold text-lg">Rounds & Criteria</h3>
                  <button type="button" onClick={addRound} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span> Add Round
                  </button>
                </div>
                <div className="space-y-6">
                  {formData.rounds.map((round, rIdx) => (
                    <div key={rIdx} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-sm text-primary">Round {rIdx + 1}</h4>
                        {formData.rounds.length > 1 && (
                          <button type="button" onClick={() => removeRound(rIdx)} className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <input value={round.name} onChange={e => updateRound(rIdx, 'name', e.target.value)} placeholder="Round name" className="bg-white dark:bg-slate-800 border border-outline-variant/20 rounded-lg py-2 px-3 text-sm outline-none" />
                        <input value={round.rules || ''} onChange={e => updateRound(rIdx, 'rules', e.target.value)} placeholder="Round rules" className="bg-white dark:bg-slate-800 border border-outline-variant/20 rounded-lg py-2 px-3 text-sm outline-none" />
                      </div>

                      {/* Qualification */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-outline">Qualification Type</label>
                          <select value={round.qualification?.type || 'top_n'} onChange={e => updateRound(rIdx, 'qualification', { ...round.qualification, type: e.target.value })} className="w-full bg-white dark:bg-slate-800 border border-outline-variant/20 rounded-lg py-2 px-3 text-sm outline-none mt-1">
                            <option value="top_n">Top N</option>
                            <option value="min_score">Min Score</option>
                            <option value="percentage">Percentage</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-outline">Qualification Value</label>
                          <input type="number" value={round.qualification?.value || 0} onChange={e => updateRound(rIdx, 'qualification', { ...round.qualification, value: Number(e.target.value) })} className="w-full bg-white dark:bg-slate-800 border border-outline-variant/20 rounded-lg py-2 px-3 text-sm outline-none mt-1" />
                        </div>
                      </div>

                      {/* Criteria */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-bold text-on-surface">Evaluation Criteria</label>
                          <button type="button" onClick={() => addCriteria(rIdx)} className="text-primary text-xs font-bold hover:underline">+ Add Criteria</button>
                        </div>
                        <div className="space-y-2">
                          {round.evaluationCriteria?.map((c, cIdx) => (
                            <div key={cIdx} className="flex gap-2 items-center">
                              <input value={c.name} onChange={e => updateCriteria(rIdx, cIdx, 'name', e.target.value)} placeholder="Criteria name" className="flex-1 bg-white dark:bg-slate-800 border border-outline-variant/20 rounded-lg py-2 px-3 text-sm outline-none" />
                              <input type="number" min={1} value={c.maxScore} onChange={e => updateCriteria(rIdx, cIdx, 'maxScore', e.target.value)} placeholder="Max" className="w-20 bg-white dark:bg-slate-800 border border-outline-variant/20 rounded-lg py-2 px-3 text-sm outline-none" />
                              {round.evaluationCriteria.length > 1 && (
                                <button type="button" onClick={() => removeCriteria(rIdx, cIdx)} className="text-red-400 hover:text-red-600"><span className="material-symbols-outlined text-lg">close</span></button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 py-3 rounded-xl border border-outline-variant/30 font-bold text-sm hover:bg-surface-container transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50">
                  {submitting ? 'Saving...' : editing ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
