import { useEffect, useState } from 'react';

/** احترام به تنظیم سیستمی «کاهش حرکت» — ویدیوها در این حالت پخش نمی‌شوند */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => matchPrefersReducedMotion());

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function matchPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
