import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

export default function Directory() {
  const { isAuthenticated } = useAuth();
  const [teams, setTeams] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventFilter, setEventFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/events?limit=100').then(res => setEvents(res.data.events || [])).catch(console.error);
    if (isAuthenticated) API.get('/teams/my-teams').then(res => setMyTeams(res.data)).catch(console.error);
  }, [isAuthenticated]);

  useEffect(() => { fetchTeams(); }, [page, search, eventFilter]);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/teams?page=${page}&limit=10&search=${search}&event=${eventFilter}`);
      setTeams(res.data.teams || []);
      setPages(res.data.pages || 1);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1440px] mx-auto px-8 py-12 w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-headline font-extrabold tracking-tight">Teams Directory</h1>
            <p className="text-on-surface-variant mt-1">Browse all registered teams across events.</p>
          </div>
          {isAuthenticated && (
            <Link to="/teams/register" className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg">add</span> Register Team
            </Link>
          )}
        </div>

        {/* My Teams */}
        {myTeams.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-headline font-bold mb-4">My Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myTeams.map(team => (
                <div key={team._id} className="bg-primary/5 border border-primary/20 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-headline font-bold text-primary">{team.teamName}</h3>
                  <p className="text-xs text-outline mt-1">{team.event?.title}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {team.members?.map((m, i) => (
                      <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-full border">
                        {m.name || m.email} {m.isVerified ? '✓' : '⏳'}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* All Teams */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
        ) : teams.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border">
            <span className="material-symbols-outlined text-5xl text-outline mb-3 block">groups</span>
            <p className="text-on-surface-variant font-medium">No teams found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map(team => (
              <div key={team._id} className="bg-surface-container-lowest rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-headline font-bold text-lg">{team.teamName}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">{team.event?.title || 'N/A'}</span>
                </div>
                <p className="text-sm text-on-surface-variant mb-3">Leader: <span className="font-medium text-on-surface">{team.leader?.name}</span></p>
                <div className="flex flex-wrap gap-1">
                  {team.members?.map((m, i) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.isVerified ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {m.name || m.email}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            <button disabled={page<=1} onClick={() => setPage(p=>p-1)} className="px-6 py-2.5 rounded-xl border font-bold text-sm disabled:opacity-40">Previous</button>
            <span className="px-4 py-2.5 text-sm text-outline">Page {page} of {pages}</span>
            <button disabled={page>=pages} onClick={() => setPage(p=>p+1)} className="px-6 py-2.5 rounded-xl border font-bold text-sm disabled:opacity-40">Next</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
