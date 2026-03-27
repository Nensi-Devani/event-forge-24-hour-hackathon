import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    { id: 1, title: 'Global Hackathon 2024', date: 'Nov 12 - Nov 14', status: 'Registered', role: 'Participant', team: 'Neural Vortex' },
    { id: 2, title: 'AI Healthcare Challenge', date: 'Dec 05 - Dec 06', status: 'Pending Approval', role: 'Participant', team: 'Solo' }
  ];

  const pastEvents = [
    { id: 3, title: 'Tech Founders Expo 2023', date: 'Sep 10 - Sep 12, 2023', role: 'Attendee', achievement: 'Top 10 Finalist' },
    { id: 4, title: 'Web3 Innovators Summit', date: 'Jul 22 - Jul 24, 2023', role: 'Participant', achievement: 'Best UI/UX Award' }
  ];

  const notifications = [
    { id: 1, text: 'Team Neural Vortex accepted your join request.', time: '2 hours ago', icon: 'group_add', color: 'text-primary bg-primary/10' },
    { id: 2, text: 'Your submission for Global Hackathon is due in 3 days.', time: '5 hours ago', icon: 'warning', color: 'text-tertiary bg-tertiary/10' },
    { id: 3, text: 'New announcement in AI Healthcare Challenge.', time: '1 day ago', icon: 'campaign', color: 'text-secondary-fixed-variant bg-secondary-fixed' },
  ];

  return (
    <div className="bg-background min-h-screen text-on-surface font-body antialiased flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-8 py-12">
        {/* Profile Header Card */}
        <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 mb-8 relative">
          <div className="h-48 bg-gradient-to-r from-primary-container to-primary w-full object-cover"></div>
          <div className="px-8 pb-8 pt-0 relative flex flex-col md:flex-row items-center md:items-end justify-between gap-6 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-surface-container overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzwtHOiBpXY4DL8m2beRfIUzUZt_0Pkkr_wsDjBwskt5a2wwokxiYdNZFE7Y_BVZ1WSoKeAobuqftjTJKTWX7cGb39O19eXtyHqCjLsw7aVWfSHIXGVvglOQ2aWVzSqwN5n6y2y_UGMH1G9v0CSHetgKaBfC-Mw7ZofHsBxceKsmcWg0uLNlzgC3Zoc-hqsJETg6nCqx231lT2KnjCO0mEaXSDYXInhw5LYj1QyNXBCsz3e4PoDRpcmwTeBOs0Ocxmao8i8I3yJDR" alt="Alex Rivera" />
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-extrabold font-headline text-slate-900 dark:text-white">Alex Rivera</h1>
                <p className="text-outline font-medium flex items-center justify-center md:justify-start gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  San Francisco, CA
                </p>
              </div>
            </div>
            <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-bold px-6 py-2.5 rounded-full transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">edit</span>
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Personal Info & Notifications */}
          <div className="lg:col-span-1 border-r-0 lg:border-r border-slate-200 dark:border-slate-800 lg:pr-8 space-y-8">
            {/* Personal Details */}
            <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold font-headline mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Personal Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1 font-label">Email</p>
                  <p className="text-sm font-medium text-on-surface">alex.rivera@example.com</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1 font-label">Role</p>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-bold inline-block">Full Stack Developer</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1 font-label">Joined</p>
                  <p className="text-sm font-medium text-on-surface">March 2023</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1 font-label">Bio</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Passionate builder and open source contributor. Focused on scalable web applications and community-driven tech events.</p>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">notifications_active</span>
                  Notifications
                </h2>
                <span className="bg-tertiary-container text-on-tertiary-container w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              </div>
              <div className="space-y-4">
                {notifications.map(notif => (
                  <div key={notif.id} className="flex gap-4 items-start pb-4 border-b border-surface-container-low last:border-0 last:pb-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.color}`}>
                      <span className="material-symbols-outlined text-[20px]">{notif.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm text-on-surface leading-tight">{notif.text}</p>
                      <p className="text-xs text-outline mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm font-bold text-primary hover:underline py-2">View All Activity</button>
            </section>
          </div>

          {/* Right Column: Events */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold font-headline mb-6">Event Dashboard</h2>
            
            {/* Custom Tabs */}
            <div className="flex gap-2 p-1 bg-surface-container-high rounded-xl w-fit mb-8">
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'upcoming' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Upcoming & Registered
              </button>
              <button 
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'past' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Past Events
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === 'upcoming' && (
                upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                  <div key={event.id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition-colors group">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary-container text-white rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                        <span className="material-symbols-outlined">event_available</span>
                      </div>
                      <div>
                        <Link to={`/events/${event.id}`} className="font-bold text-lg font-headline text-on-surface group-hover:text-primary transition-colors">{event.title}</Link>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-outline">
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {event.date}</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">group</span> Team: {event.team}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${event.status === 'Registered' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' : 'bg-surface-variant text-on-surface-variant'}`}>
                        {event.status}
                      </span>
                      <button className="text-sm font-bold text-primary hover:underline">Manage Team</button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">event_busy</span>
                    <h3 className="text-lg font-bold text-on-surface">No upcoming events</h3>
                    <p className="text-on-surface-variant text-sm mt-1">Explore hackathons and secure your spot.</p>
                    <Link to="/events" className="mt-4 inline-block bg-primary text-white font-bold py-2 px-6 rounded-full hover:shadow-lg transition-all">Browse Events</Link>
                  </div>
                )
              )}

              {activeTab === 'past' && (
                pastEvents.map(event => (
                  <div key={event.id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-surface-container-high text-on-surface-variant rounded-xl flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">history</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg font-headline text-on-surface">{event.title}</h3>
                        <p className="text-sm text-outline mt-1">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 w-full sm:w-auto">
                      {event.achievement && (
                        <div className="flex items-center gap-1 text-xs font-bold text-[#b8860b] bg-[#fdf5e6] px-2 py-1 rounded-md">
                          <span className="material-symbols-outlined text-[14px]">emoji_events</span>
                          {event.achievement}
                        </div>
                      )}
                      <span className="text-sm font-medium text-outline">Role: {event.role}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
