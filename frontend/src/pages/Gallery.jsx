import React, { useEffect, useState } from 'react';
import './Gallery.css';

const GALLERY_IMAGES = [
  {
    id: 1, src: '/mait_pic.png',
    title: 'Campus Entrance',
    category: 'Campus',
    date: 'January 2026',
    organizer: 'MAIT Administration',
    venue: 'Main Gate, MAIT',
    desc: 'The iconic entrance gate of MAIT — the starting point of every student\'s journey. This welcoming facade represents decades of academic tradition and institutional pride.',
    gridArea: 'img1',
  },
  {
    id: 2, src: '/maitaudi.png',
    title: 'Grand Auditorium',
    category: 'Venue',
    date: 'March 2026',
    organizer: 'MAIT Events Cell',
    venue: 'Grand Auditorium, Block A',
    desc: 'State-of-the-art auditorium hosting 1000+ attendees for convocations, symposiums, and major institutional events. Equipped with 4K projection and professional acoustics.',
    gridArea: 'img2',
  },
  {
    id: 3, src: '/mait_pic_2.png',
    title: 'Academic Block',
    category: 'Campus',
    date: 'February 2026',
    organizer: 'MAIT Administration',
    venue: 'Block 11, MAIT',
    desc: 'The main academic block housing state-of-the-art classrooms, research labs, and faculty offices spread across multiple departments and disciplines.',
    gridArea: 'img3',
  },
  {
    id: 4, src: '/mait_pic_3.png',
    title: 'Student Plaza',
    category: 'Campus',
    date: 'April 2026',
    organizer: 'Student Council',
    venue: 'Central Plaza, MAIT',
    desc: 'A vibrant central open space where students collaborate, organise cultural activities, and celebrate the spirit of campus life throughout the year.',
    gridArea: 'img4',
  },
  {
    id: 5, src: '/audio_bg.png',
    title: 'Auditorium Interior',
    category: 'Venue',
    date: 'March 2026',
    organizer: 'MAIT Events Cell',
    venue: 'Mini Auditorium, Block 11',
    desc: 'The plush interior of the Mini Auditorium — an intimate venue perfect for society events, technical talks, workshops, and cultural performances.',
    gridArea: 'img5',
  },
  {
    id: 6, src: '/Screenshot 2026-04-22 232729.png',
    title: 'Society Event Highlight',
    category: 'Event',
    date: 'April 2026',
    organizer: 'IEEE MAIT Student Chapter',
    venue: 'Mini Auditorium, Block 11',
    desc: 'A memorable snapshot from one of MAIT\'s most celebrated society events. The hall was packed with enthusiastic students and distinguished guests.',
    gridArea: 'img6',
  },
];

const CATEGORY_COLORS = {
  Campus: '#3b82f6',
  Venue:  '#8b5cf6',
  Event:  '#ec4899',
};

export default function Gallery() {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const activeImg = GALLERY_IMAGES.find(i => i.id === hovered);

  return (
    <div className="gallery-page">
      {/* Header */}
      <div className="gallery-header">
        <h1 className="gallery-h1">Institutional Gallery</h1>
        <p className="gallery-lead">
          Hover over any photo to discover the story behind it.
        </p>
      </div>

      {/* Collage Grid */}
      <div className={`collage-grid ${loaded ? 'loaded' : ''}`}>
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={img.id}
            className="collage-cell"
            style={{ gridArea: img.gridArea, transitionDelay: `${i * 0.08}s` }}
            onMouseEnter={() => setHovered(img.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={img.src} alt={img.title} className="collage-img" loading="lazy" />

            {/* Hover popup */}
            <div className={`collage-popup ${hovered === img.id ? 'visible' : ''}`}>
              <div className="popup-inner">
                <span
                  className="popup-category"
                  style={{ background: CATEGORY_COLORS[img.category] }}
                >
                  {img.category}
                </span>
                <h3 className="popup-title">{img.title}</h3>
                <p className="popup-desc">{img.desc}</p>
                <div className="popup-meta">
                  <div className="popup-meta-item">
                    <span className="material-symbols-outlined popup-meta-icon">calendar_today</span>
                    {img.date}
                  </div>
                  <div className="popup-meta-item">
                    <span className="material-symbols-outlined popup-meta-icon">location_on</span>
                    {img.venue}
                  </div>
                  <div className="popup-meta-item">
                    <span className="material-symbols-outlined popup-meta-icon">group</span>
                    {img.organizer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
