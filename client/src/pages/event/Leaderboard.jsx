import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';

export default function EventLeaderboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeaderboard(); }, [id]);

  const fetchLeaderboard = async () => {
    try { const res = await API.get(`/events/${id}/leaderboard`); setData(res.data); } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (loading) return (
    <div className="bg-background font-body text-on-surface min-h-screen flex flex-col"><Header /><div className="flex-1 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div></div>
  );

  const leaderboard = data?.leaderboard || [];
  const event = data?.event;
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="max-w-[1440px] mx-auto px-8 py-12 flex-1 w-full">
        <div className="mb-16 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-4">Leaderboard</span>
              <h1 className="text-5xl lg:text-6xl font-headline font-extrabold text-on-surface tracking-tighter mb-4">{event?.title || 'Event Leaderboard'}</h1>
              <p className="text-lg text-outline max-w-2xl">Final rankings based on cumulative scores across all rounds.</p>
            </div>
            <div className="flex items-center gap-4 justify-center lg:justify-end">
              <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-primary">
                <p className="text-xs text-outline font-bold uppercase tracking-wider">Total Teams</p>
                <p className="text-3xl font-headline font-extrabold text-primary">{leaderboard.length}</p>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-tertiary">
                <p className="text-xs text-outline font-bold uppercase tracking-wider">Rounds</p>
                <p className="text-3xl font-headline font-extrabold text-tertiary">{event?.rounds?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border"><span className="material-symbols-outlined text-6xl text-outline mb-4 block">leaderboard</span><p className="text-lg font-bold text-on-surface-variant">No scores recorded yet</p></div>
        ) : (
          <>
            {/* Podium */}
            {top3.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mb-20 mt-12">
                {/* 2nd */}
                {top3[1] && (
                  <div className="order-2 lg:order-1 group">
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
                      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                        <span className="text-2xl font-extrabold text-slate-600">2</span>
                      </div>
                      <span className="inline-block bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase">Runner Up</span>
                      <h3 className="text-xl font-headline font-extrabold mb-1">{top3[1].team.teamName}</h3>
                      <p className="text-primary font-headline font-bold text-3xl">{top3[1].totalScore}</p>
                    </div>
                  </div>
                )}
                {/* 1st */}
                {top3[0] && (
                  <div className="order-1 lg:order-2 group z-10">
                    <div className="bg-gradient-to-br from-primary-container to-primary p-10 rounded-3xl shadow-xl transition-all duration-300 group-hover:-translate-y-4 flex flex-col items-center text-center scale-105">
                      <span className="material-symbols-outlined text-amber-400 text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      <h3 className="text-2xl font-headline font-extrabold text-on-primary mb-1">{top3[0].team.teamName}</h3>
                      <p className="text-primary-fixed text-4xl font-headline font-extrabold mb-4">{top3[0].totalScore}</p>
                      <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-4">
                        <span className="text-xs uppercase font-bold tracking-widest text-on-primary/80">🏆 Champion</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* 3rd */}
                {top3[2] && (
                  <div className="order-3 group">
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm transition-all duration-300 group-hover:-translate-y-2 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
                      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                        <span className="text-2xl font-extrabold text-orange-600">3</span>
                      </div>
                      <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase">Third Place</span>
                      <h3 className="text-xl font-headline font-extrabold mb-1">{top3[2].team.teamName}</h3>
                      <p className="text-primary font-headline font-bold text-3xl">{top3[2].totalScore}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Full Rankings Table */}
            {rest.length > 0 && (
              <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-headline font-bold">Full Rankings</h2></div>
                <table className="w-full text-left">
                  <thead><tr className="bg-surface-container-low">
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Team</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Leader</th>
                    <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Members</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-wider text-right">Total Score</th>
                  </tr></thead>
                  <tbody className="divide-y divide-surface-container">
                    {rest.map(entry => (
                      <tr key={entry.team._id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4 font-headline font-extrabold text-lg text-outline">{String(entry.rank).padStart(2, '0')}</td>
                        <td className="px-6 py-4 font-bold">{entry.team.teamName}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{entry.team.leader?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{(entry.team.members?.length || 0) + 1}</td>
                        <td className="px-6 py-4 text-right font-headline font-bold text-primary text-lg">{entry.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
