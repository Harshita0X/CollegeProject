import { useEffect, useRef, useState } from 'react';

/**
 * Hook to reveal elements when they enter the viewport
 * @param {number} threshold - Intersection threshold
 * @returns {[React.RefObject, boolean]} - Ref to attach to element and visibility state
 */
export default function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
