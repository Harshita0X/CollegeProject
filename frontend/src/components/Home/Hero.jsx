import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IMAGES = [
  'mait_pic.png',
  'mait_pic_2.png',
  'mait_pic_3.png'
];

const TYPING_TEXT = "Tailored for Your Events";

export default function Hero() {
  const [imgIndex, setImgIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter part
  useEffect(() => {

    let currentIdx = 0;
    const typingInterval = setInterval(() => {
      if (currentIdx <= TYPING_TEXT.length) {
        setDisplayText(TYPING_TEXT.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="hero-modern">
      <div className="hero-container">
        {/* Stadium Image Vessel */}
          <div className="hero-full-slider">
            {IMAGES.map((src, index) => (
              <div 
                key={src} 
                className={`hero-slide ${index === imgIndex ? 'active' : ''}`}
                style={{ backgroundImage: `url('/${src}')` }}
              ></div>
            ))}
            <div className="hero-slider-overlay" />

            {/* Overlay Content */}
            <div className="hero-overlay-content">
              <header className="hero-header">
                <h1 className="hero-h1-bold show">
                  <span className="h1-stroke">MINI</span> <br />
                  <span className="h1-fill">AUDITORIUM</span>
                </h1>
                <p className="hero-typewriter-sub show">
                  {displayText}
                  {!isTypingDone && <span className="cursor">|</span>}
                </p>
              </header>

              <div className="hero-btns show">
                <Link to="/schedule" className="btn-white">Book Now</Link>
                <Link to="/schedule" className="btn-glass">View Schedule</Link>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="hero-dots">
              {IMAGES.map((_, index) => (
                <button
                  key={index}
                  className={`hero-dot ${index === imgIndex ? 'active' : ''}`}
                  onClick={() => setImgIndex(index)}
                ></button>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
