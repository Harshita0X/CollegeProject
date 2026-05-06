import React, { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';

// Components
import Hero from '../components/Home/Hero';

import StatsStrip from '../components/Home/StatsStrip';
import AboutSection from '../components/Home/AboutSection';
import FeatureBento from '../components/Home/FeatureBento';
import ReviewSection from '../components/Home/ReviewSection';
import BookingSteps from '../components/Home/BookingSteps';
import FAQSection from '../components/Home/FAQSection';
import CTA from '../components/Home/CTA';

// Styles
import '../components/Home/Home.css';

export default function Home() {
  const [featRef, featVisible] = useReveal(0.08);
  const [statsRef, statsVisible] = useReveal(0.1);
  const [aboutRef, aboutVisible] = useReveal(0.08);
  const [stepsRef, stepsVisible] = useReveal(0.08);
  const [ctaRef, ctaVisible] = useReveal(0.1);

  useEffect(() => {
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.documentElement.style.setProperty('--scroll-y', `${scrolled * 0.15}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <Hero />
      <StatsStrip statsRef={statsRef} statsVisible={statsVisible} />
      <FeatureBento featRef={featRef} featVisible={featVisible} />
      <ReviewSection />
      <AboutSection aboutRef={aboutRef} aboutVisible={aboutVisible} />
      <BookingSteps stepsRef={stepsRef} stepsVisible={stepsVisible} />
      <FAQSection />
      <CTA ctaRef={ctaRef} ctaVisible={ctaVisible} />
    </main>
  );
}