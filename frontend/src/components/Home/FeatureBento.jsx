import React from 'react';
import './FeatureBento.css';

export default function FeatureBento({ featRef, featVisible }) {
  // We use 3 arrays of photos for the 3 columns
  const col1Photos = [
    "/mait_pic.png",
    "/mait_pic_2.png",
    "/ac_bg.png",
  ];

  const col2Photos = [
    "/maitaudi.png",
    "/mait_pic_3.png",
    "/audio_bg.png"
  ];

  const col3Photos = [
    "/mait_pic.png",
    "/mait_pic_2.png",
    "/mait_pic_3.png"
  ];

  return (
    <section className="features-section" ref={featRef}>
      <div className="features-inner">
        <div className="feat-head" style={{ justifyContent: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <div className={`reveal ${featVisible ? 'in' : ''}`} style={{ textAlign: 'center', width: '100%' }}>
            <h2 className="section-h2-bold" style={{ marginBottom: 0 }}>
              <span className="text-fill" style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '-0.04em',
                textTransform: 'none',
                color: '#fff'
              }}>Past Events in Photos</span>
            </h2>
          </div>
        </div>

        <div className={`parallax-gallery-wrapper reveal ${featVisible ? 'in delay-1' : ''}`}>
          <div className="parallax-gallery">
            {/* Left Column - Scrolls Down continuously */}
            <div className="parallax-col scroll-down">
              {/* First Set */}
              {col1Photos.map((src, idx) => (
                <div className="gallery-img-wrap" key={`col1-1-${idx}`}>
                  <div className="gallery-img-inner"><img src={src} alt="Event" /></div>
                </div>
              ))}
              {/* Duplicated Set for Seamless Loop */}
              {col1Photos.map((src, idx) => (
                <div className="gallery-img-wrap mobile-hide" key={`col1-2-${idx}`}>
                  <div className="gallery-img-inner"><img src={src} alt="Event" /></div>
                </div>
              ))}
            </div>

            {/* Center Column - Scrolls Up continuously */}
            <div className="parallax-col center-col scroll-up">
              {/* First Set */}
              {col2Photos.map((src, idx) => (
                <div className="gallery-img-wrap" key={`col2-1-${idx}`}>
                  <div className="gallery-img-inner"><img src={src} alt="Event" /></div>
                </div>
              ))}
              {/* Duplicated Set for Seamless Loop */}
              {col2Photos.map((src, idx) => (
                <div className="gallery-img-wrap mobile-hide" key={`col2-2-${idx}`}>
                  <div className="gallery-img-inner"><img src={src} alt="Event" /></div>
                </div>
              ))}
            </div>

            {/* Right Column - Scrolls Down continuously */}
            <div className="parallax-col scroll-down">
              {/* First Set */}
              {col3Photos.map((src, idx) => (
                <div className="gallery-img-wrap" key={`col3-1-${idx}`}>
                  <div className="gallery-img-inner"><img src={src} alt="Event" /></div>
                </div>
              ))}
              {/* Duplicated Set for Seamless Loop */}
              {col3Photos.map((src, idx) => (
                <div className="gallery-img-wrap mobile-hide" key={`col3-2-${idx}`}>
                  <div className="gallery-img-inner"><img src={src} alt="Event" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
