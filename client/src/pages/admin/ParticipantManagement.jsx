import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function ParticipantManagement() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'participant', techStack: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchUsers(); }, [page, search, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/users?page=${page}&limit=10&search=${search}&role=${roleFilter}`);
      setUsers(res.data.users || []);
      setTotal(res.data.total || 0);
      setPages(res.data.pages || 1);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault(); setSubmitting(true); setError('');
    try {
      const payload = { ...formData, techStack: formData.role === 'judge' ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : [] };
      if (editing) {
        if (!payload.password) delete payload.password; // Don't send empty password
        await API.put(`/users/${editing}`, payload);
      } else {
        await API.post('/users', payload);
      }
      setShowForm(false); setEditing(null); setFormData({ name: '', email: '', password: '', role: 'participant', techStack: '' });
      fetchUsers();
    } catch (err) { setError(err.response?.data?.message || 'Failed'); } finally { setSubmitting(false); }
  };

  const openEdit = (u) => {
    setEditing(u._id);
    setFormData({ name: u.name, email: u.email, password: '', role: u.role, techStack: Array.isArray(u.techStack) ? u.techStack.join(', ') : '' });
    setShowForm(true);
  };

  const handleRoleChange = async (userId, newRole) => {
    try { await API.put(`/users/${userId}/role`, { role: newRole }); fetchUsers(); } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Delete this user?')) return;
    try { await API.delete(`/users/${userId}`); fetchUsers(); } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">User Management</h1>
          <p className="text-on-surface-variant mt-1">{total} users total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setFormData({ name: '', email: '', password: '', role: 'participant', techStack: '' }); }} className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 w-full md:w-auto justify-center">
          <span className="material-symbols-outlined text-lg">person_add</span> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name or email..." className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-xl text-sm outline-none focus:border-primary/40" />
        </div>
        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm outline-none">
          <option value="">All Roles</option>
          <option value="participant">Participants</option>
          <option value="judge">Judges</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left">
            <thead><tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Verified</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-surface-container">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{u.email}</td>
                  <td className="px-6 py-4">
                    <select value={u.role} onChange={e => handleRoleChange(u._id, e.target.value)} className="text-xs font-bold uppercase bg-blue-50 text-blue-600 px-2 py-1 rounded-full border-none outline-none">
                      <option value="participant">Participant</option>
                      <option value="judge">Judge</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.isEmailVerified ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{u.isEmailVerified ? 'Yes' : 'No'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-outline">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(u)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-primary text-lg">edit</span></button>
                      <button onClick={() => handleDelete(u._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-red-500 text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pages > 1 && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100">
              <span className="text-xs text-outline">Page {page} of {pages}</span>
              <div className="flex gap-2">
                <button disabled={page<=1} onClick={() => setPage(p=>p-1)} className="px-3 py-1.5 rounded-lg border text-sm font-bold disabled:opacity-40 hover:bg-surface-container">Prev</button>
                <button disabled={page>=pages} onClick={() => setPage(p=>p+1)} className="px-3 py-1.5 rounded-lg border text-sm font-bold disabled:opacity-40 hover:bg-surface-container">Next</button>
              </div>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditing(null); }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-headline font-bold mb-6">{editing ? 'Edit User' : 'Add New User'}</h2>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
            <form onSubmit={handleCreate} className="space-y-4">
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-surface-container-low rounded-xl py-3 px-4 text-sm outline-none border border-transparent focus:border-primary/40" />
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email" className="w-full bg-surface-container-low rounded-xl py-3 px-4 text-sm outline-none border border-transparent focus:border-primary/40" />
              <input value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={editing ? 'Change Password (optional)' : 'Password'} type="password" required={!editing} className="w-full bg-surface-container-low rounded-xl py-3 px-4 text-sm outline-none border border-transparent focus:border-primary/40" />
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-surface-container-low rounded-xl py-3 px-4 text-sm outline-none border border-transparent focus:border-primary/40">
                <option value="participant">Participant</option>
                <option value="judge">Judge</option>
              </select>
              {formData.role === 'judge' && (
                <input value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="Tech Stack (comma separated)" className="w-full bg-surface-container-low rounded-xl py-3 px-4 text-sm outline-none border border-transparent focus:border-primary/40" />
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 py-3 rounded-xl border font-bold text-sm">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm disabled:opacity-50">{submitting ? 'Saving...' : editing ? 'Update User' : 'Add User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
