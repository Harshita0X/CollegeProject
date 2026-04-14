import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Login() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login({ email, password, role });
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
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #001e40 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.03
      }}></div>

      <section className="relative z-10 w-full max-w-[520px] px-6 py-4">
        <div className="bg-white/95 backdrop-blur-2xl p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,30,64,0.08)] border border-white">
          <header className="mb-6 text-center">
            <h1 className="font-headline text-3xl font-extrabold text-[#001e40] tracking-tight mb-2">Institutional Login</h1>
            <p className="font-body text-slate-500 text-sm font-medium">Access your personalized dashboard at Maharaja Agrasen Institute of Technology</p>
          </header>

          <div className="mb-6">
            <label className="block text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#74777f] mb-2">Select Your Role</label>
            <div className="grid grid-cols-2 p-1.5 bg-[#f2f4f6] rounded-xl border border-[#c4c6cf]/30">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'student' ? 'bg-white shadow-sm text-[#001e40]' : 'text-slate-500'}`}
              >
                <span className="material-symbols-outlined text-lg">school</span>
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('faculty')}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'faculty' ? 'bg-white shadow-sm text-[#001e40]' : 'text-slate-500'}`}
              >
                <span className="material-symbols-outlined text-lg">workspace_premium</span>
                Faculty
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
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
              <div className="flex justify-between items-end ml-1">
                <label className="block text-[0.7rem] font-bold uppercase tracking-widest text-[#001e40]/70 mb-1">Password</label>
                <a className="text-[0.7rem] font-bold text-[#001e40] hover:text-[#000511] transition-all underline decoration-[#001e40]/20 underline-offset-4" href="#">Forgot Password?</a>
              </div>
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
                <span>{isLoading ? 'Signing in...' : 'Secure Sign In'}</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>

            <div className="pt-4 flex flex-col items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f2f4f6] rounded-full border border-[#c4c6cf]/20 mb-3">
                <span className="material-symbols-outlined text-xs text-[#48626e]">verified_user</span>
                <span className="text-[0.65rem] font-bold text-[#48626e] uppercase tracking-wider">Secure SSL Encrypted</span>
              </div>
              <p className="text-[0.65rem] text-center text-[#74777f] leading-relaxed max-w-[320px]">
                By accessing this portal, you agree to comply with MAIT's Digital Ethics and Usage Guidelines. Unauthorized access is strictly prohibited.
              </p>
            </div>
          </form>
        </div>

        {/* Quick Assistance */}
        <div className="mt-4 flex justify-center items-center gap-6 text-slate-500 text-[0.7rem] font-bold uppercase tracking-widest">
          <a className="hover:text-[#001e40] transition-colors" href="#">Help Desk</a>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4c6cf]/30"></span>
          <a className="hover:text-[#001e40] transition-colors" href="#">Network Status</a>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4c6cf]/30"></span>
          <a className="hover:text-[#001e40] transition-colors" href="#">Campus Map</a>
        </div>
      </section>
    </main>
  );
}
