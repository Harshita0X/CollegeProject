import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand & Description */}
          <div className="footer-brand">
            <h3>Maharaja   Agrasen   Institute   of   Technology</h3>
            <p>Maharaja Agrasen Institute of Technology was established in 1999 by Maharaja Agrasen Technical Education Society promoted by a group of well known Industrialists, Businessman, Professionals and Philanthropists with an aim to promote quality education in the field of Technology and Management</p>

            {/* Social Icons */}
            <div className="social-icons">
              <a href="#">
                <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" />
              </a>
              <a href="#">
                <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" />
              </a>
              <a href="#">
                <img src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube" />
              </a>
              <a href="#">
                <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" />
              </a>
            </div>
          </div>

          {/* Reach Out Column */}
          <div className="footer-reachout">
            <h3>Reach Out</h3>
            <div className="reachout-links">
              <a href="mailto:mait@mait.ac.in" className="reachout-link">
                <span className="material-symbols-outlined reachout-icon">mail</span>
                mait@mait.ac.in
              </a>
              <a href="tel:91-8448186942" className="reachout-link">
                <span className="material-symbols-outlined reachout-icon">call</span>
                91-8448186942
              </a>
              <div className="reachout-link">
                <span className="material-symbols-outlined reachout-icon">home</span>
                <span>PSP Area, Plot No-1, Sector-22, Rohini, Delhi-110086</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 Powered by ITE Students
          </div>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
