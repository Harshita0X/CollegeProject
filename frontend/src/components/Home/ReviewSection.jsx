import React from 'react';
import './Marquee.css';
const REVIEWS = [
  {
    text: "One of the most engaging events at MAIT. The sessions were actually interactive and gave us real exposure beyond classrooms.",
    name: "Aditi Sharma",
    title: "2nd Year, CSE - MAIT",
  },
  {
    text: "The networking and collaboration opportunities were amazing. I got to connect with seniors and work on ideas together.",
    name: "Rohit Verma",
    title: "3rd Year, IT - MAIT",
  },
  {
    text: "Well-organized and genuinely insightful. Events like this make MAIT stand out in terms of practical exposure.",
    name: "Sneha Gupta",
    title: "Member, CDC MAIT",
  },
  {
    text: "The event pushed us to think beyond theory and actually apply concepts. Loved the energy and execution.",
    name: "Karan Mehta",
    title: "Core Team, E-Cell MAIT",
  },
  {
    text: "A great initiative by the college. The participation and enthusiasm from students made it a huge success.",
    name: "Faculty Pawan Sharma",
    title: "Faculty Coordinator, MAIT",
  },
  {
    text: "From sessions to management, everything was smooth. Definitely one of the best experiences at MAIT.",
    name: "Priya Singh",
    title: "1st Year, CSE - MAIT",
  }
];

export default function ReviewSection() {
  return (
    <section className="review-section">
      <div className="review-inner">
        <div className="review-head">
          <h2 className="review-h2">
            The Experience,<br />
            Through Their Words
          </h2>
        </div>

        <div className="review-marquee-container">
          {/* Row 1 - Moves Left */}
          <div className="review-track">
            <div className="review-content scroll-left">
              {[...REVIEWS.slice(0, 3), ...REVIEWS.slice(0, 3)].map((review, i) => (
                <div className="review-card float-up" key={`rev1-${i}`}>
                  <span className="quote-mark">“</span>
                  <p className="review-text">{review.text}</p>
                  <div className="review-author">

                    <div className="author-info">
                      <h4>{review.name}</h4>
                      <p>{review.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Moves Right */}
          <div className="review-track mt-6">
            <div className="review-content scroll-right">
              {[...REVIEWS.slice(3, 6), ...REVIEWS.slice(3, 6)].map((review, i) => (
                <div className="review-card float-down" key={`rev2-${i}`}>
                  <span className="quote-mark">“</span>
                  <p className="review-text">{review.text}</p>
                  <div className="review-author">
                    <img src={review.img} alt={review.name} />
                    <div className="author-info">
                      <h4>{review.name}</h4>
                      <p>{review.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
