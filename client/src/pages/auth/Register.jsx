import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [role, setRole] = useState('participant');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', techStack: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
        techStack: role === 'judge' ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
      };
      const res = await API.post('/auth/register', payload);
      setSuccess(res.data.message);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/verify-otp', { email: formData.email, otp });
      setSuccess('Email verified! Redirecting to login...');
      const redirect = searchParams.get('redirect');
      const token = searchParams.get('token');
      setTimeout(() => {
        if (redirect === 'verify-invite' && token) {
          navigate(`/login?redirect=verify-invite&token=${token}`);
        } else {
          navigate('/login');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-body antialiased flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8 py-16">
        <div className="bg-surface-container-lowest max-w-lg w-full rounded-[2.5rem] p-10 shadow-lg border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-[#0052CC] font-headline mb-2 tracking-tight">
              {step === 'form' ? 'Create an Account' : 'Verify Email'}
            </h1>
            <p className="text-on-surface-variant text-sm">
              {step === 'form' ? 'Join Event Forge to discover, participate, and build amazing things.' : `Enter the 6-digit OTP sent to ${formData.email}`}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">{error}</div>
          )}
          {success && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-medium text-center">{success}</div>
          )}

          {step === 'form' ? (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('participant')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      role === 'participant'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">code</span> Participant
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('judge')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      role === 'judge'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">gavel</span> Judge
                  </button>
                </div>
              </div>

              {role === 'judge' && (
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Technical Specialization</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">psychology</span>
                    <input
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none"
                      placeholder="e.g. AI, Frontend, Backend (comma separated)"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">person</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    type="text"
                    className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                    className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    type="password"
                    className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none"
                    placeholder="Create a strong password"
                  />
                </div>
              </div>

              {role === 'judge' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                  Judge accounts require admin approval before you can evaluate events.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2 font-label">Verification Code</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">pin</span>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    type="text"
                    className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-4 pl-12 pr-4 text-2xl tracking-[0.5em] text-center font-bold transition-all outline-none"
                    placeholder="000000"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>
          )}

          <div className="mt-8 text-center text-sm">
            <p className="text-outline">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
