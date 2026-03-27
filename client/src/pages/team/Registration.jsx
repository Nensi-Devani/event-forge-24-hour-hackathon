import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

export default function TeamRegistration() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(eventId || '');
  const [event, setEvent] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([{ name: '', email: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    API.get('/events?limit=100').then(res => setEvents(res.data.events || [])).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedEvent) API.get(`/events/${selectedEvent}`).then(res => setEvent(res.data)).catch(console.error);
  }, [selectedEvent]);

  const addMember = () => setMembers([...members, { name: '', email: '' }]);
  const removeMember = (idx) => setMembers(members.filter((_, i) => i !== idx));
  const updateMember = (idx, field, value) => {
    const updated = [...members];
    updated[idx] = { ...updated[idx], [field]: value };
    setMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSuccess(''); setLoading(true);
    try {
      const validMembers = members.filter(m => m.email.trim());
      await API.post('/teams', { teamName, eventId: selectedEvent, members: validMembers });
      setSuccess('Team registered! Verification emails sent to members.');
      setTimeout(() => navigate('/teams'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-headline font-extrabold tracking-tight">Register Your Team</h1>
          <p className="text-on-surface-variant mt-2">Build your team and compete. All members will receive verification emails.</p>
        </div>

        {error && <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">{error}</div>}
        {success && <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-medium">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-8 bg-surface-container-lowest rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
          {/* Event Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 font-label">Select Event *</label>
            <select value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)} required className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-3 px-4 text-sm outline-none">
              <option value="">Choose an event...</option>
              {events.filter(ev => ev.registrationDeadline && new Date(ev.registrationDeadline) > new Date()).map(ev => (
                <option key={ev._id} value={ev._id}>{ev.title}</option>
              ))}
            </select>
          </div>

          {event && (
            <div className="p-4 bg-blue-50 rounded-xl text-sm">
              <p className="font-bold text-blue-700">{event.title}</p>
              <p className="text-blue-600 text-xs mt-1">Team size: {event.minTeamSize} - {event.maxTeamSize} members · Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</p>
            </div>
          )}

          {/* Team Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 font-label">Team Name *</label>
            <input required value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Enter a creative team name" className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-3 px-4 text-sm outline-none" />
          </div>

          {/* Team Leader */}
          <div className="p-4 bg-surface-container-low rounded-xl">
            <p className="text-xs font-bold uppercase tracking-wider mb-2">Team Leader (You)</p>
            <p className="font-bold text-sm">{user?.name} ({user?.email})</p>
          </div>

          {/* Members */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold uppercase tracking-wider font-label">Team Members</label>
              <button type="button" onClick={addMember} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-sm">add</span> Add Member
              </button>
            </div>
            <div className="space-y-3">
              {members.map((member, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <input value={member.name} onChange={e => updateMember(idx, 'name', e.target.value)} placeholder="Member name" className="flex-1 bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-3 px-4 text-sm outline-none" />
                  <input type="email" value={member.email} onChange={e => updateMember(idx, 'email', e.target.value)} placeholder="Member email" className="flex-1 bg-surface-container-low border border-transparent focus:border-primary/40 rounded-xl py-3 px-4 text-sm outline-none" />
                  {members.length > 1 && (
                    <button type="button" onClick={() => removeMember(idx)} className="text-red-400 hover:text-red-600"><span className="material-symbols-outlined">close</span></button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-outline mt-2">
              <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
              Members not registered on the portal will be asked to register first.
            </p>
          </div>

          <button type="submit" disabled={loading || !selectedEvent} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 text-lg">
            {loading ? 'Registering...' : 'Register Team'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
