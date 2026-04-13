import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isSchedule = location.pathname === '/schedule';
  const isLogin = location.pathname === '/login';

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8f9fb]/90 dark:bg-[#191c1e]/90 backdrop-blur-md border-b border-[#c4c6cf]/20">
      <div className="flex justify-between items-center w-full px-8 h-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-3" to="/">
            <div className="w-10 h-10 bg-[#001e40] rounded flex items-center justify-center text-white font-black text-xl">M</div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tighter text-[#001e40] dark:text-[#ffffff] leading-tight">MAIT</span>
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[#74777f]">Institutional Portal</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-10 font-headline text-sm font-bold tracking-tight">
          <Link 
            className={`${isHome ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`} 
            to="/"
          >
            Home
          </Link>
          <Link 
            className={`${isSchedule ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`} 
            to="/schedule"
          >
            Schedule
          </Link>
          <Link 
            className={`${isLogin ? 'text-[#001e40] dark:text-[#ffffff] border-b-2 border-[#001e40] pb-1' : 'text-slate-500 hover:text-[#001e40] transition-colors'}`} 
            to="/login"
          >
            Portal Login
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#001e40] dark:text-white hover:bg-[#f2f4f6]/50 rounded-md transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-[#001e40] dark:text-white hover:bg-[#f2f4f6]/50 rounded-md transition-all">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
