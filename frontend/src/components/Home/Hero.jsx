import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ heroLoaded }) {
  return (
    <section className="hero">
      <div className={`hero-bg ${heroLoaded ? 'loaded' : ''}`}>
        <img
          src="https://lh3.googleusercontent.com/aida/ADBb0uipJS-QekDk_XkfmZwEhz-iAS_vpX94LTNx9ovTEtMfFAYElrmTTh_Wl3vUe9nI-IohsHoA-6kwmw5juwlMD7cZgdEF7QKQIhH2vfx6HdVV2rxjtFqC0MoQS06vHO8kNwnSKyXSVcnbgwxzQYgJGt1FFnIRS_083-uDC9hqwevHZ-KdOMcFZlpXKX-Y9A6hxDx4aK3grB4XUDQpjLTBMTTwUExkKFHoAEDKZF6Er0yv-8-KcU4Bjge_q4Qr99mVVV-h0BRIFmBzGQ"
          alt="MAIT Campus"
        />
      </div>
      <div className="hero-overlay" />

      <div className="hero-inner">
        <div className="hero-text">
          <div className={`hero-eyebrow ${heroLoaded ? 'show' : ''}`}>
            Maharaja Agrasen Institute of Technology
          </div>
          <h1 className={`hero-h1 ${heroLoaded ? 'show' : ''}`}>
            The Mini <br />Auditorium
          </h1>
          <h2 className={`hero-platform ${heroLoaded ? 'show' : ''}`}>
            Booking Platform
          </h2>
          <p className={`hero-sub ${heroLoaded ? 'show' : ''}`}>
            A curated space designed for academic discourse, cultural exhibitions,
            and prestigious institutional gatherings. Experience architectural
            sophistication at the heart of MAIT.
          </p>
          <div className={`hero-btns ${heroLoaded ? 'show' : ''}`}>
            <Link to="/schedule" className="btn-white">Book Now</Link>
            <Link to="/schedule" className="btn-glass">View Schedule</Link>
          </div>
        </div>

        <div className={`hero-badge ${heroLoaded ? 'show' : ''}`}>
          <div className="hero-badge-label">Featured Event</div>
          <h3>Army Host</h3>
          <p>Hosting the future of engineering in a space built for innovation.</p>
        </div>
      </div>
    </section>
  );
}
