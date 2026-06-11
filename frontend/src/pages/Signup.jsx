import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Signup() {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();

    const result = await signup({ name, email, password, role });
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-12" style={{
      backgroundImage: `linear-gradient(rgba(248, 249, 251, 0.85), rgba(248, 249, 251, 0.9)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCo9AUZfgXvVVXcMLfxIMFNNzqbaP1Jr--vr-LtjvOI4GA9xu8ivt1JEUd1SgmkHSd1e6XVg8UUm9IQ2PML1tppx_4u248iR9Be_Kt4oS00qLjNHGKpoRJ7dpVmGZ4bIdvk2hAzUWbcYwr9Abom-gae1mf21SegCUK_uJHgghvwezsJFjQrJSUKxGnTijQABnLxh5vnI8rGlY3mvGlMHj1NBtiljUUN_YjlPyZn6lL8vK2UwSyCICtTyWVDV1VIXXTRf24hV_9sePI)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <section className="relative z-10 w-full max-w-[520px] px-6 py-4">
        <div className="bg-white/95 backdrop-blur-2xl p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,30,64,0.08)] border border-white">
          <header className="mb-6 text-center">
            <h1 className="font-headline text-3xl font-extrabold text-[#001e40] tracking-tight mb-2">Create Account</h1>
            <p className="font-body text-slate-500 text-sm font-medium">Register for your institutional access</p>
          </header>

          <div className="mb-6">
            <label className="block text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#74777f] mb-2">Select Your Role</label>
            <div className="grid grid-cols-2 p-1.5 bg-[#f2f4f6] rounded-xl border border-[#c4c6cf]/30">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center justify-center gap-1 py-3 rounded-lg text-xs font-bold transition-all ${role === 'student' ? 'bg-white shadow-sm text-[#001e40]' : 'text-slate-500'}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('faculty')}
                className={`flex items-center justify-center gap-1 py-3 rounded-lg text-xs font-bold transition-all ${role === 'faculty' ? 'bg-white shadow-sm text-[#001e40]' : 'text-slate-500'}`}
              >
                Faculty
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-2">
              <label className="block text-[0.7rem] font-bold uppercase tracking-widest text-[#001e40]/70 mb-1">Full Name</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#74777f]/60 text-lg transition-colors group-focus-within:text-[#001e40]">badge</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) clearError();
                  }}
                  className="w-full bg-white border border-[#c4c6cf]/50 rounded-xl py-3 pl-12 pr-4 text-[#191c1e] placeholder:text-[#74777f]/40 focus:ring-2 focus:ring-[#001e40]/10 focus:border-[#001e40] transition-all outline-none"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[0.7rem] font-bold uppercase tracking-widest text-[#001e40]/70 mb-1">Email</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#74777f]/60 text-lg transition-colors group-focus-within:text-[#001e40]">person</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) clearError();
                  }}
                  className="w-full bg-white border border-[#c4c6cf]/50 rounded-xl py-3 pl-12 pr-4 text-[#191c1e] placeholder:text-[#74777f]/40 focus:ring-2 focus:ring-[#001e40]/10 focus:border-[#001e40] transition-all outline-none"
                  placeholder="e.g. name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[0.7rem] font-bold uppercase tracking-widest text-[#001e40]/70 mb-1">Password (Min 6 chars)</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#74777f]/60 text-lg transition-colors group-focus-within:text-[#001e40]">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) clearError();
                  }}
                  className="w-full bg-white border border-[#c4c6cf]/50 rounded-xl py-3 pl-12 pr-4 text-[#191c1e] placeholder:text-[#74777f]/40 focus:ring-2 focus:ring-[#001e40]/10 focus:border-[#001e40] transition-all outline-none"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#001e40] text-white font-headline font-bold py-3 rounded-xl shadow-lg shadow-[#001e40]/10 hover:shadow-[#001e40]/20 hover:bg-[#000511] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                <span>{isLoading ? 'Creating Account...' : 'Register'}</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
            
            <div className="text-center pt-2">
              <Link to="/login" className="text-sm font-medium text-[#001e40] hover:underline">
                Already have an account? Log in here
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
