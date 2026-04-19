import React, { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';

// Components
import Hero from '../components/Home/Hero';
import StatsStrip from '../components/Home/StatsStrip';
import FeatureBento from '../components/Home/FeatureBento';
import AboutSection from '../components/Home/AboutSection';
import BookingSteps from '../components/Home/BookingSteps';
import CTA from '../components/Home/CTA';

// Styles
import '../components/Home/Home.css';

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [featRef, featVisible] = useReveal(0.08);
  const [aboutRef, aboutVisible] = useReveal(0.08);
  const [stepsRef, stepsVisible] = useReveal(0.08);
  const [ctaRef, ctaVisible] = useReveal(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      <Hero heroLoaded={heroLoaded} />
      <StatsStrip />
      <FeatureBento featRef={featRef} featVisible={featVisible} />
      <AboutSection aboutRef={aboutRef} aboutVisible={aboutVisible} />
      <BookingSteps stepsRef={stepsRef} stepsVisible={stepsVisible} />
      <CTA ctaRef={ctaRef} ctaVisible={ctaVisible} />
    </main>
  );
}