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

  // Edit Judge Modal
  const [editJudgeModal, setEditJudgeModal] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', techStack: '' });
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Assignment Modal Pagination & Search
  const [modalSearch, setModalSearch] = useState('');
  const [modalPage, setModalPage] = useState(1);
  const MODAL_LIMIT = 5;

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
    setModalSearch('');
    setModalPage(1);
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

  const openEditJudge = (judge) => {
    setEditFormData({
      name: judge.name,
      email: judge.email,
      techStack: Array.isArray(judge.techStack) ? judge.techStack.join(', ') : ''
    });
    setEditJudgeModal(judge._id);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmittingEdit(true);
    try {
      await API.put(`/users/${editJudgeModal}`, {
        name: editFormData.name,
        email: editFormData.email,
        techStack: editFormData.techStack.split(',').map(s => s.trim()).filter(Boolean)
      });
      setEditJudgeModal(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmittingEdit(false);
    }
  };

  const filtered = judges.filter(j =>
    j.name.toLowerCase().includes(search.toLowerCase()) ||
    j.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
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
                    <div className="flex justify-end gap-2 items-center">
                      <button onClick={() => openEditJudge(judge)} className="text-xs text-primary font-bold hover:underline">Edit</button>
                      <button onClick={() => handleRemoveRole(judge._id)} className="text-xs text-red-500 font-bold hover:underline">Revoke Role</button>
                    </div>
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

      {/* Edit Judge Modal */}
      {editJudgeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditJudgeModal(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-headline font-bold mb-6">Edit Judge</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 outline-none">Name</label>
                <input required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2 px-3 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 outline-none">Email</label>
                <input required type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2 px-3 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 outline-none">Tech Stack</label>
                <input value={editFormData.techStack} onChange={e => setEditFormData({...editFormData, techStack: e.target.value})} placeholder="Comma separated" className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-2 px-3 text-sm outline-none" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setEditJudgeModal(null)} className="flex-1 py-2 rounded-xl border font-bold text-sm">Cancel</button>
                <button type="submit" disabled={submittingEdit} className="flex-1 py-2 rounded-xl bg-primary text-white font-bold text-sm disabled:opacity-50">
                  {submittingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModal && (() => {
        const modalFiltered = judges.filter(j => 
          j.name.toLowerCase().includes(modalSearch.toLowerCase()) || 
          j.email.toLowerCase().includes(modalSearch.toLowerCase())
        );
        const modalPages = Math.ceil(modalFiltered.length / MODAL_LIMIT);
        const paginatedJudges = modalFiltered.slice((modalPage - 1) * MODAL_LIMIT, modalPage * MODAL_LIMIT);
        
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAssignModal(null)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-headline font-bold mb-1">Assign Judges</h3>
              <p className="text-sm text-outline mb-4">{assignModal.title}</p>
              
              <div className="relative mb-4 shrink-0">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input value={modalSearch} onChange={e => { setModalSearch(e.target.value); setModalPage(1); }} placeholder="Search judges..." className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg text-sm outline-none focus:border-primary/40 border border-transparent" />
              </div>

              <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                {paginatedJudges.length === 0 ? (
                   <p className="text-center text-sm text-outline py-4">No judges found.</p>
                ) : (
                  paginatedJudges.map(judge => (
                    <label key={judge._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors border border-slate-100 dark:border-slate-800">
                      <input
                        type="checkbox"
                        checked={eventJudges.includes(judge._id)}
                        onChange={() => toggleJudge(judge._id)}
                        className="rounded accent-primary w-4 h-4"
                      />
                      <div>
                        <p className="font-bold text-sm leading-tight">{judge.name}</p>
                        <p className="text-xs text-outline">{judge.email}</p>
                      </div>
                    </label>
                  ))
                )}
              </div>
              
              {modalPages > 1 && (
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 shrink-0">
                  <span className="text-[10px] text-outline">Page {modalPage} of {modalPages || 1}</span>
                  <div className="flex gap-2">
                    <button disabled={modalPage<=1} onClick={() => setModalPage(p=>p-1)} className="px-2 py-1 rounded bg-surface-container disabled:opacity-40 text-xs font-bold">Prev</button>
                    <button disabled={modalPage>=modalPages} onClick={() => setModalPage(p=>p+1)} className="px-2 py-1 rounded bg-surface-container disabled:opacity-40 text-xs font-bold">Next</button>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6 shrink-0">
                <button onClick={() => setAssignModal(null)} className="flex-1 py-3 rounded-xl border font-bold text-sm">Cancel</button>
                <button onClick={saveAssignment} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm">Save Assignment</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
