import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">A Legacy of Excellence</h1>
          <p className="about-subtitle">
            Maharaja Agrasen Institute of Technology has been at the forefront of engineering and management education, fostering innovation and leadership since its inception.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section px-8 max-w-6xl mx-auto">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">25+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10k+</div>
            <div className="stat-label">Alumni Worldwide</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-label">Socities</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Commitment to Growth</div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about-content-section px-8 max-w-6xl mx-auto">
        <div className="content-grid">
          <div className="content-card vision-card">
            <div className="card-overlay"></div>
            <div className="card-content-inner">
              <h2>Our Vision</h2>
              <p>
                To nurture young minds, to provide educational opportunities to the students from all backgrounds, and to develop individuals who are highly skilled, morally upright, and socially responsible.
              </p>
            </div>
          </div>
          <div className="content-card mission-card">
            <div className="card-overlay"></div>
            <div className="card-content-inner">
              <h2>Our Mission</h2>
              <p>
                To establish an ecosystem of academic excellence that promotes research, innovation, and holistic development. We strive to create future leaders who can tackle global challenges with cutting-edge technology and ethical values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Auditorium Spotlight */}
      <section className="about-spotlight-section px-8 max-w-6xl mx-auto mb-20">
        <div className="spotlight-container">
          <div className="spotlight-image" style={{ backgroundImage: "url('/maitaudi.png')" }}></div>
          <div className="spotlight-text">
            <h2>The Grand Auditorium</h2>
            <p>
              The heart of our cultural and academic gatherings, the MAIT Grand Auditorium is a state-of-the-art facility designed to host up to 1000 attendees. Equipped with professional-grade acoustics, 4K projection, and comprehensive backstage facilities, it stands as the premier venue for symposiums, convocations, and major institutional events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
