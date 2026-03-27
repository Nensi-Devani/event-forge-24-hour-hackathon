import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEvents(); }, [page, search]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/events?page=${page}&limit=6&search=${search}`);
      setEvents(res.data.events || []);
      setTotal(res.data.total || 0);
      setPages(res.data.pages || 1);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="max-w-[1440px] mx-auto px-8 py-12 flex-1 w-full">
        {/* Hero */}
        <section className="relative mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-[#0052CC] to-[#1a73e8] p-12 lg:p-16 text-white">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold tracking-widest uppercase mb-4">Event Forge</span>
            <h1 className="text-4xl lg:text-6xl font-headline font-extrabold tracking-tighter mb-4">Discover & Compete</h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">Join hackathons, build teams, and showcase your skills. Your next breakthrough starts here.</p>
            <div className="relative max-w-lg">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60">search</span>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search events..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 text-sm outline-none focus:bg-white/20 backdrop-blur-sm transition-all"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="w-full h-full" style={{background: 'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)'}}></div>
          </div>
        </section>

        {/* Events */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-headline font-extrabold tracking-tight">Upcoming Events</h2>
              <p className="text-on-surface-variant mt-1">{total} events available</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border"><span className="material-symbols-outlined text-6xl text-outline mb-4 block">event_busy</span><p className="text-lg font-bold text-on-surface-variant">No events found</p></div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                  <Link key={event._id} to={`/events/${event._id}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                      {event.banner ? (
                        <img src={event.banner} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-white/30 text-6xl">event</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-xs font-bold uppercase px-3 py-1 rounded-full text-indigo-600">{event.type || 'technical'}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-headline font-extrabold text-on-surface mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                      <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{event.description || 'No description available.'}</p>
                      <div className="flex items-center justify-between text-xs text-outline font-medium">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">format_list_numbered</span> {event.rounds?.length || 0} Rounds</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> {event.minTeamSize}-{event.maxTeamSize} per team</span>
                      </div>
                      {event.registrationDeadline && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-xs text-outline">
                            <span className="material-symbols-outlined text-sm align-middle mr-1">schedule</span>
                            {new Date(event.registrationDeadline) > new Date()
                              ? `Deadline: ${new Date(event.registrationDeadline).toLocaleDateString()}`
                              : 'Registration Closed'}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center gap-3 mt-12">
                  <button disabled={page<=1} onClick={() => setPage(p=>p-1)} className="px-6 py-2.5 rounded-xl border font-bold text-sm disabled:opacity-40 hover:bg-surface-container transition-colors">Previous</button>
                  <span className="px-4 py-2.5 text-sm font-medium text-outline">Page {page} of {pages}</span>
                  <button disabled={page>=pages} onClick={() => setPage(p=>p+1)} className="px-6 py-2.5 rounded-xl border font-bold text-sm disabled:opacity-40 hover:bg-surface-container transition-colors">Next</button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
