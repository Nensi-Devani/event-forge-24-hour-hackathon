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

  const addMember = () => {
    if (event && members.length >= event.maxTeamSize - 1) {
      setError(`Maximum team size is ${event.maxTeamSize} (including leader).`);
      return;
    }
    setMembers([...members, { name: '', email: '' }]);
  };
  const removeMember = (idx) => setMembers(members.filter((_, i) => i !== idx));
  const updateMember = (idx, field, value) => {
    const updated = [...members];
    updated[idx] = { ...updated[idx], [field]: value };
    setMembers(updated);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentAndRegister = async (validMembers) => {
    if (event.isPaid && event.registrationFee) {
      const res = await loadRazorpayScript();
      if (!res) {
        setLoading(false);
        return setError("Razorpay SDK failed to load. Are you online?");
      }

      try {
        const orderData = await API.post('/payments/create-order', { amount: event.registrationFee });
        const order = orderData.data;

        const options = {
          key: "rzp_test_SWM057Fqu5Avzj",
          amount: order.amount,
          currency: order.currency,
          name: "Event Forge",
          description: `Registration for ${event.title}`,
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyRes = await API.post('/payments/verify', response);
              if (verifyRes.data.success) {
                // Payment successful, now register team
                await registerTeamInDB(validMembers);
              } else {
                setError("Payment verification failed.");
                setLoading(false);
              }
            } catch (err) {
              setError("Payment verification error.");
              setLoading(false);
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          theme: { color: "#0052CC" }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
          setError(response.error.description);
          setLoading(false);
        });
        paymentObject.open();
      } catch (err) {
        setError("Error creating payment order.");
        setLoading(false);
      }
    } else {
      await registerTeamInDB(validMembers);
    }
  };

  const registerTeamInDB = async (validMembers) => {
    try {
      await API.post('/teams', { teamName, eventId: selectedEvent, members: validMembers });
      setSuccess('Team registered! Verification emails sent to members.');
      setTimeout(() => navigate('/teams'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSuccess(''); setLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ac\.in)$/i;
      const validMembers = members.filter(m => m.email.trim());
      for (const m of validMembers) {
        if (!emailRegex.test(m.email)) {
          setLoading(false);
          return setError(`Invalid email format for ${m.name || m.email}. Must be a valid domain like .com or .ac.in`);
        }
        if (m.email.trim().toLowerCase() === user.email.toLowerCase()) {
           setLoading(false);
           return setError(`You are the leader and will automatically be added. Do not add yourself as a member.`);
        }
      }
      await handlePaymentAndRegister(validMembers);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
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
              {event.isPaid && <p className="text-blue-600 font-bold mt-2">Registration Fee: ₹{event.registrationFee}</p>}
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

          <button type="submit" disabled={loading || !selectedEvent} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 text-lg flex items-center justify-center gap-2">
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Registering...' : 'Register Team'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
