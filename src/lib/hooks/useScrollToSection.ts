import { useCallback } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** پیمایش نرم به یک بخش صفحه (با احترام به تنظیم کاهش حرکت) */
export function useScrollToSection() {
  const reducedMotion = usePrefersReducedMotion();

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      /* فوکوس کیبورد را به همان بخش منتقل می‌کنیم تا ترتیب خواندن حفظ شود */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    },
    [reducedMotion],
  );
}
