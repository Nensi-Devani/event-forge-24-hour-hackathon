import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/teams/my-teams').then(res => setMyTeams(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-8 py-12 w-full">
        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold text-3xl font-headline">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-headline font-extrabold">{user?.name}</h1>
              <p className="text-on-surface-variant text-sm">{user?.email}</p>
              <span className="inline-block mt-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">{user?.role}</span>
            </div>
          </div>
          {user?.techStack?.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-outline mb-2">Technical Skills</p>
              <div className="flex flex-wrap gap-2">
                {user.techStack.map((t, i) => (
                  <span key={i} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* My Teams */}
        <h2 className="text-2xl font-headline font-extrabold mb-4">My Teams</h2>
        {loading ? (
          <div className="flex justify-center py-8"><div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div></div>
        ) : myTeams.length === 0 ? (
          <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border">
            <span className="material-symbols-outlined text-4xl text-outline mb-2 block">groups</span>
            <p className="text-on-surface-variant">You haven't joined any teams yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTeams.map(team => (
              <div key={team._id} className="bg-surface-container-lowest rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="font-headline font-bold text-lg mb-1">{team.teamName}</h3>
                <p className="text-xs text-outline mb-3">{team.event?.title || 'N/A'}</p>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-on-surface">Leader: {team.leader?.name}</p>
                  {team.members?.map((m, i) => (
                    <p key={i} className="text-xs text-on-surface-variant flex items-center gap-1">
                      {m.name || m.email}
                      {m.isVerified ? <span className="text-green-500">✓</span> : <span className="text-amber-500">⏳</span>}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
