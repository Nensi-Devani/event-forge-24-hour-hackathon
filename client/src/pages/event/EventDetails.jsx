import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

export default function EventDetails() {
  const { id } = useParams();
  const { user, isAuthenticated, isJudge } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyMsg, setApplyMsg] = useState('');

  useEffect(() => { fetchEvent(); }, [id]);

  const fetchEvent = async () => {
    try { const res = await API.get(`/events/${id}`); setEvent(res.data); } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const isJudgeAssigned = event?.judges?.some(j => (j._id || j) === user?._id);

  const isActive = event?.registrationDeadline && new Date(event.registrationDeadline) > new Date();

  if (loading) return (
    <div className="font-body bg-surface text-on-surface min-h-screen flex flex-col"><Header /><div className="flex-1 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div></div>
  );

  if (!event) return (
    <div className="font-body bg-surface text-on-surface min-h-screen flex flex-col"><Header /><div className="flex-1 flex items-center justify-center"><p className="text-lg text-outline">Event not found.</p></div></div>
  );

  return (
    <div className="font-body bg-surface text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="max-w-[1440px] mx-auto px-8 py-12 w-full flex-1">
        {/* Hero */}
        <section className="relative mb-16 rounded-xl overflow-hidden shadow-2xl">
          <div className="h-[350px] w-full bg-gradient-to-br from-indigo-600 to-purple-700">
            {event.banner && <img alt={event.title} className="w-full h-full object-cover" src={event.banner} />}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold tracking-widest uppercase mb-4 w-fit">
              <span className="material-symbols-outlined text-sm">{isActive ? 'bolt' : 'event_busy'}</span>
              {isActive ? 'Live Registration' : 'Registration Closed'}
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-3 font-headline">{event.title}</h1>
            <p className="text-lg text-white/80 max-w-2xl font-body">{event.description}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-16">
            {/* Rounds */}
            {event.rounds?.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-8 bg-primary-container rounded-full"></div>
                  <h2 className="text-3xl font-extrabold tracking-tight font-headline">Event Rounds</h2>
                </div>
                <div className="space-y-6">
                  {event.rounds.map((round, idx) => (
                    <div key={round._id || idx} className="bg-surface-container-lowest p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{round.roundNumber || idx+1}</div>
                          <div>
                            <h3 className="font-headline font-bold text-lg">{round.name}</h3>
                            {round.rules && <p className="text-xs text-outline mt-0.5">{round.rules}</p>}
                          </div>
                        </div>
                        {round.qualification && (
                          <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-bold capitalize">
                            {round.qualification.type?.replace('_', ' ')}: {round.qualification.value}
                          </span>
                        )}
                      </div>
                      {round.evaluationCriteria?.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-outline mb-2">Evaluation Criteria</p>
                          <div className="flex flex-wrap gap-2">
                            {round.evaluationCriteria.map((c, ci) => (
                              <span key={ci} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                {c.name} (max: {c.maxScore})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Rules */}
            {event.rules && (
              <section className="bg-surface-container-high/30 p-10 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1.5 h-8 bg-primary-container rounded-full"></div>
                  <h2 className="text-3xl font-extrabold tracking-tight font-headline">Rules & Guidelines</h2>
                </div>
                <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">{event.rules}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-8 border border-outline-variant/10">
              <div className="mb-6">
                <div className="text-3xl font-extrabold text-primary mb-1 font-headline">{event.isPaid ? `₹${event.registrationFee}` : 'Free'}</div>
                <p className="text-sm text-on-surface-variant">{isActive ? `Deadline: ${new Date(event.registrationDeadline).toLocaleDateString()}` : 'Registration closed'}</p>
              </div>
              <div className="space-y-4 mb-6">
                <InfoRow icon="group" label="Team Size" value={`${event.minTeamSize} - ${event.maxTeamSize}`} />
                <InfoRow icon="groups" label="Max Teams" value={event.maxTeams || '∞'} />
                <InfoRow icon="format_list_numbered" label="Rounds" value={event.rounds?.length || 0} />
                <InfoRow icon="category" label="Type" value={event.type || 'N/A'} />
              </div>

              {isActive && isAuthenticated && (
                <Link to={`/teams/register/${id}`} className="block text-center w-full bg-gradient-primary text-white py-4 rounded-xl font-headline font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all mb-3">
                  Register Team
                </Link>
              )}

              <Link to={`/events/${id}/leaderboard`} className="block text-center w-full bg-surface-container-highest text-primary py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow active:scale-95 transition-all outline outline-1 outline-primary/20 mb-3">
                <span className="material-symbols-outlined text-sm align-middle mr-1">leaderboard</span> View Leaderboard
              </Link>

              {isAuthenticated && isJudge && !isJudgeAssigned && (
                <div className="mt-3">
                  <p className="text-xs text-outline text-center">You can apply via the Judge Panel once admin assigns you.</p>
                </div>
              )}

              {isJudgeAssigned && (
                <div className="mt-3 p-3 bg-green-50 rounded-xl text-center">
                  <span className="text-xs font-bold text-green-600">✓ You are assigned as a judge for this event</span>
                </div>
              )}

              {applyMsg && <p className="text-center text-xs mt-2 text-primary font-medium">{applyMsg}</p>}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20 last:border-0 last:pb-0">
      <span className="text-on-surface-variant text-sm flex items-center gap-2">
        <span className="material-symbols-outlined text-lg">{icon}</span> {label}
      </span>
      <span className="font-bold text-sm capitalize">{value}</span>
    </div>
  );
}
