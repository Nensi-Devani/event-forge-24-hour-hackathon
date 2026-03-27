import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

export default function Profile() {
  const { user, updateUserData } = useAuth();
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name, avatar: user?.avatar || '', techStack: user?.techStack?.join(', ') || '' });
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user?.role === 'participant') {
      API.get('/teams/my-teams').then(res => setMyTeams(res.data)).catch(console.error).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...editForm, techStack: editForm.techStack ? editForm.techStack.split(',').map(s=>s.trim()).filter(Boolean) : [] };
      const res = await API.put('/users/profile', payload);
      updateUserData(res.data);
      setMsg({ type: 'success', text: 'Profile updated!' });
      setIsEditing(false);
    } catch(err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/password', passForm);
      setMsg({ type: 'success', text: 'Password changed successfully!' });
      setIsChangingPassword(false);
      setPassForm({ currentPassword: '', newPassword: '' });
    } catch(err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Password update failed' });
    }
  };

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-8 py-12 w-full">
        {msg.text && (
          <div className={`mb-6 p-3 rounded-xl text-sm font-medium border ${msg.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
            {msg.text}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm mb-8 relative">
          <div className="flex md:absolute flex-row w-full md:w-auto md:top-8 md:right-8 gap-2 mb-6 md:mb-0 z-10">
            <button onClick={() => { setIsEditing(!isEditing); setIsChangingPassword(false); setMsg({type:'',text:''}) }} className="flex-1 md:flex-none justify-center text-xs font-bold text-primary bg-primary/10 px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors">Edit Profile</button>
            <button onClick={() => { setIsChangingPassword(!isChangingPassword); setIsEditing(false); setMsg({type:'',text:''}) }} className="flex-1 md:flex-none justify-center text-xs font-bold text-outline bg-surface-container-low px-3 py-2 rounded-lg hover:bg-surface-container-high transition-colors">Change Password</button>
          </div>
          
          {isEditing ? (
             <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg mt-8">
               <h3 className="font-bold text-lg">Edit Profile</h3>
               <div><label className="text-xs font-bold uppercase">Name</label><input required value={editForm.name} onChange={e=>setEditForm({...editForm, name: e.target.value})} className="w-full bg-surface-container-low rounded-xl py-2 px-3 text-sm mt-1" /></div>
               <div><label className="text-xs font-bold uppercase">Avatar Image URL</label><input placeholder="https://..." value={editForm.avatar} onChange={e=>setEditForm({...editForm, avatar: e.target.value})} className="w-full bg-surface-container-low rounded-xl py-2 px-3 text-sm mt-1" /></div>
               {(user?.role === 'judge' || user?.role === 'admin' || user?.role === 'participant') && (
                 <div><label className="text-xs font-bold uppercase">Tech Stack (comma separated)</label><input value={editForm.techStack} onChange={e=>setEditForm({...editForm, techStack: e.target.value})} className="w-full bg-surface-container-low rounded-xl py-2 px-3 text-sm mt-1" /></div>
               )}
               <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-xl text-sm">Save Changes</button>
             </form>
          ) : isChangingPassword ? (
             <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg mt-8">
               <h3 className="font-bold text-lg">Change Password</h3>
               <div><label className="text-xs font-bold uppercase">Current Password</label><input type="password" required value={passForm.currentPassword} onChange={e=>setPassForm({...passForm, currentPassword: e.target.value})} className="w-full bg-surface-container-low rounded-xl py-2 px-3 text-sm mt-1" /></div>
               <div><label className="text-xs font-bold uppercase">New Password</label><input type="password" required value={passForm.newPassword} onChange={e=>setPassForm({...passForm, newPassword: e.target.value})} className="w-full bg-surface-container-low rounded-xl py-2 px-3 text-sm mt-1" /></div>
               <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-xl text-sm">Update Password</button>
             </form>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 text-center md:text-left">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-primary/10 shrink-0" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold text-4xl font-headline shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="mt-2 md:mt-4">
                  <h1 className="text-2xl md:text-3xl font-headline font-extrabold">{user?.name}</h1>
                  <p className="text-on-surface-variant text-sm mt-1">{user?.email}</p>
                  <span className="inline-block mt-3 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{user?.role}</span>
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
            </>
          )}
        </div>

        {/* My Teams */}
        {user?.role === 'participant' && (
          <>
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
                  <div key={team._id} className="bg-surface-container-lowest rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    {team.totalScore !== undefined && (
                       <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">Score: {team.totalScore}</div>
                    )}
                    <h3 className="font-headline font-bold text-lg mb-1">{team.teamName}</h3>
                    <p className="text-xs text-outline mb-3">{team.event?.title || 'N/A'}</p>
                    
                    {team.status && (
                       <div className={`text-xs font-bold inline-block px-2 py-1 rounded mb-3 ${team.status === 'Selected' ? 'bg-green-100 text-green-700' : team.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                         {team.status}
                       </div>
                    )}

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-on-surface">Leader: {team.leader?.name}</p>
                      {team.members?.map((m, i) => (
                        <p key={i} className="text-xs text-on-surface-variant flex items-center justify-between">
                          <span>{m.name || m.email}</span>
                          {m.isVerified ? <span className="text-green-500 font-bold text-[10px] uppercase bg-green-50 px-1 rounded border border-green-200">Verified</span> : <span className="text-amber-500 font-bold text-[10px] uppercase bg-amber-50 px-1 rounded border border-amber-200">Pending</span>}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
