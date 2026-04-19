import React, { useEffect, useState } from 'react';
import useReveal from '../../hooks/useReveal';

/**
 * Animated counter that triggers when visible
 * @param {object} props
 * @param {number} props.target - Target number to count to
 * @param {string} props.suffix - Optional suffix (e.g., '+', '%')
 */
export default function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    
    let start = 0;
    const end = parseInt(target);
    const duration = 1400;
    const frameRate = 16;
    const step = Math.ceil(end / (duration / frameRate));
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [visible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}
