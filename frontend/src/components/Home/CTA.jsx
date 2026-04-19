import React from 'react';
import { Link } from 'react-router-dom';

export default function CTA({ ctaRef, ctaVisible }) {
  return (
    <section className="cta-section" ref={ctaRef}>
      <div className="cta-inner">
        <div className="cta-bg">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5M7XXXoW1VmS3Sfp3Z43ej65vfz5hgXrNu8RVtwsMOkY76_-ifzOQYzOlZzBdESyKnATQErmoWfdIdMqjVd8XDUaPB_tEU9AStbsgVD3XcEQtZKWZswi932H-Y_3j429xQQjLrbLFtbUwGbwFW8P3DafB4Y2Xi0_qmfz2WHF860dwZKRSHqDjJlJfKzo33cQqYYVFufzbXHX6o-vEoVL9oNIwwpccT7EVO8-HVdMSCtLd5W7iF8FUIFelwPF8A2rHl8Ey2ND0k3c"
            alt=""
          />
        </div>
        <div className={`cta-body reveal ${ctaVisible ? 'in' : ''}`}>
          <h2 className="cta-h2">Ready to curate your event?</h2>
          <p className="cta-sub">
            Join the roster of prestigious lectures and events hosted at
            Maharaja Agrasen Institute of Technology.
          </p>
          <Link to="/schedule" className="btn-cta">Begin Reservation</Link>
        </div>
      </div>
    </section>
  );
}
