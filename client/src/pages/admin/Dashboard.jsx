import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalEvents: 0, totalTeams: 0, activeEvents: 0 });
  const [userStats, setUserStats] = useState({ totalUsers: 0, totalParticipants: 0, totalJudges: 0 });
  const [recentTeams, setRecentTeams] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventStats, uStats, teams, events] = await Promise.all([
        API.get('/events/stats'),
        API.get('/users/stats'),
        API.get('/teams?limit=5'),
        API.get('/events?limit=5'),
      ]);
      setStats(eventStats.data);
      setUserStats(uStats.data);
      setRecentTeams(teams.data.teams || []);
      setRecentEvents(events.data.events || []);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const kpis = [
    { title: 'Total Events', value: stats.totalEvents, icon: 'event', color: 'blue', link: '/admin/events' },
    { title: 'Active Events', value: stats.activeEvents, icon: 'event_available', color: 'green', link: '/admin/events' },
    { title: 'Total Teams', value: stats.totalTeams, icon: 'groups', color: 'purple', link: '/admin/teams' },
    { title: 'Total Users', value: userStats.totalUsers, icon: 'people', color: 'orange', link: '/admin/participants' },
    { title: 'Participants', value: userStats.totalParticipants, icon: 'person', color: 'teal', link: '/admin/participants' },
    { title: 'Judges', value: userStats.totalJudges, icon: 'gavel', color: 'indigo', link: '/admin/judges' },
  ];

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Dashboard</h1>
        <p className="text-on-surface-variant mt-1">Welcome back, {user?.name || 'Admin'}. Here's your portal overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {kpis.map((kpi) => (
          <Link key={kpi.title} to={kpi.link} className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{kpi.icon}</span>
            </div>
            <p className="text-2xl font-headline font-extrabold text-on-surface">{kpi.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mt-1">{kpi.title}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
            <h2 className="font-headline font-bold text-on-surface">Recent Events</h2>
            <Link to="/admin/events" className="text-xs text-primary font-bold hover:underline">View All</Link>
          </div>
          {recentEvents.length === 0 ? (
            <p className="text-center py-8 text-sm text-outline">No events yet. Create one!</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentEvents.map((event) => (
                <div key={event._id} className="px-6 py-4 flex justify-between items-center hover:bg-blue-50/30 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-on-surface">{event.title}</p>
                    <p className="text-xs text-outline capitalize">{event.type} · {event.rounds?.length || 0} rounds</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    event.registrationDeadline && new Date(event.registrationDeadline) > new Date()
                      ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {event.registrationDeadline && new Date(event.registrationDeadline) > new Date() ? 'Active' : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Teams */}
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
            <h2 className="font-headline font-bold text-on-surface">Recent Registrations</h2>
            <Link to="/admin/teams" className="text-xs text-primary font-bold hover:underline">View All</Link>
          </div>
          {recentTeams.length === 0 ? (
            <p className="text-center py-8 text-sm text-outline">No teams registered yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentTeams.map((team) => (
                <div key={team._id} className="px-6 py-4 flex justify-between items-center hover:bg-blue-50/30 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-on-surface">{team.teamName}</p>
                    <p className="text-xs text-outline">{team.event?.title || 'N/A'} · {(team.members?.length || 0) + 1} members</p>
                  </div>
                  <span className="text-xs text-outline">
                    {new Date(team.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
