import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#001e40] text-white pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight uppercase">Maharaja Agrasen Institute of Technology</h3>
            <p className="text-white/80 text-sm leading-[1.6] max-w-xl">
              Maharaja Agrasen Institute of Technology was established in 1999 by Maharaja Agrasen Technical Education Society promoted by a group of well known Industrialists, Businessman, Professionals and Philanthropists with an aim to promote quality education in the field of Technology and Management
            </p>
            {/* Social Icons */}
            <div className="flex gap-6 items-center pt-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
              </a>
            </div>
          </div>

          {/* Reach Out Column */}
          <div className="space-y-6 lg:pl-20">
            <h3 className="text-xl font-bold tracking-tight uppercase">Reach Out</h3>
            <div className="space-y-4 text-sm font-medium">
              <a href="mailto:mait@mait.ac.in" className="flex items-center gap-3 hover:text-[#d5e3ff] transition-colors">
                <span className="material-symbols-outlined text-base">mail</span>
                mait@mait.ac.in
              </a>
              <a href="tel:91-8448186942" className="flex items-center gap-3 hover:text-[#d5e3ff] transition-colors">
                <span className="material-symbols-outlined text-base">call</span>
                91-8448186942
              </a>
              <div className="flex items-start gap-3 text-white/90">
                <span className="material-symbols-outlined text-base mt-0.5">home</span>
                <span>PSP Area, Plot No-1, Sector-22, Rohini, Delhi-110086</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/60 font-medium">
            © Maharaja Agrasen Institute of Technology, New Delhi 1999-2025, Powered by MATES. Designed by Ansh Jain
          </div>
          <div className="flex items-center gap-8 text-[10px] md:text-xs uppercase tracking-wider font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Policy</a>
            <button className="bg-white/10 p-2 rounded-sm hover:bg-white/20 transition-all ml-4">
              <span className="material-symbols-outlined text-sm">north</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
