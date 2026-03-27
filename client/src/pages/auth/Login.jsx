import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import API from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.user, res.data.token);

      // Handle redirect for team invite verification
      const redirect = searchParams.get('redirect');
      const token = searchParams.get('token');
      if (redirect === 'verify-invite' && token) {
        try {
          await API.post('/teams/verify-invite', { token });
        } catch (err) {
          console.log('Invite verification failed:', err.message);
        }
      }

      // Role-based redirect
      const role = res.data.user.role;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'judge') {
        navigate('/judge/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-body antialiased flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-surface-container-lowest max-w-md w-full rounded-[2rem] p-10 shadow-lg border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0052CC] font-headline mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm">Sign in to manage your events and teams.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider font-label">Password</label>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type="password"
                  className="w-full bg-surface-container-low border border-transparent focus:border-primary/40 focus:bg-surface-container-lowest rounded-xl py-3 pl-12 pr-4 text-sm transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-outline">
              Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
