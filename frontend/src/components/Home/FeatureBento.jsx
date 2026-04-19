import React from 'react';
import Counter from './Counter';

export default function FeatureBento({ featRef, featVisible }) {
  return (
    <section className="features-section" ref={featRef}>
      <div className="features-inner">
        <div className="feat-head">
          <div>
            <div className="sect-eyebrow">Facility Specifications</div>
            <h2 className="feat-head-h2">
              Precision Engineering<br />for Every Performance
            </h2>
          </div>
          <p className={`feat-head-p reveal ${featVisible ? 'in delay-2' : ''}`}>
            Equipped with industry-leading technology to ensure your seminars,
            workshops, and presentations resonate with clarity.
          </p>
        </div>

        <div className="bento">
          <div className={`bento-card span2 dark-card reveal ${featVisible ? 'in' : ''}`}>
            <span className="material-symbols-outlined bento-icon">groups</span>
            <div>
              <div className="bento-num"><Counter target={250} suffix="+" /></div>
              <div className="bento-meta">Premium Seating Capacity</div>
              <p className="bento-desc">Ergonomically designed deep-blue cushioned seating with integrated desk surfaces for comfort and utility.</p>
            </div>
          </div>

          <div className={`bento-card red-card reveal ${featVisible ? 'in delay-1' : ''}`}>
            <span className="material-symbols-outlined bento-icon">surround_sound</span>
            <div>
              <div className="bento-title">Dolby Pro Audio</div>
              <div className="bento-meta">High Fidelity Sound</div>
            </div>
          </div>

          <div className={`bento-card reveal ${featVisible ? 'in delay-2' : ''}`}>
            <span className="material-symbols-outlined bento-icon">ac_unit</span>
            <div>
              <div className="bento-title">Climate Control</div>
              <div className="bento-meta">Centralized AC System</div>
            </div>
          </div>

          <div className={`bento-card reveal ${featVisible ? 'in delay-1' : ''}`}>
            <span className="material-symbols-outlined bento-icon">videocam</span>
            <div>
              <div className="bento-title">4K Projection</div>
              <div className="bento-meta">Laser Visuals</div>
            </div>
          </div>

          <div className={`bento-card span2 img-card reveal ${featVisible ? 'in delay-2' : ''}`}>
            <div className="bento-img-wrap">
              <img
                src="https://lh3.googleusercontent.com/aida/ADBb0uh0kQzOJ7K5PTWFDo3oSzvqoGoiP9Lf6GpwLUA8WB4AFJtGbYIJ7ZCHNRBjQpJnXHSByyjIJdDpv45KTd8q4MJwh_Ved7c62ka7dW-6shCFTGkJohkwqYxO_4ZbGYM3fwgL8OdErbgde0UOTCxJ00w0qEqdvJicV09NaH5seR27AV65V2JpZWxI6wXjMxwV4YJhiz5CT9aAM-cUGiHSnkZSWHYi6xhWMrHRg20XA4dHrJzHqVvBPaC_-mQMCu9cTMq8ZHwjUt8xxw"
                alt="MAIT Auditorium Interior"
              />
              <div className="bento-img-overlay">
                <div className="bento-title">Intelligent Lighting</div>
                <p className="bento-desc">Programmable DMX lighting systems for versatile event atmospheres.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
