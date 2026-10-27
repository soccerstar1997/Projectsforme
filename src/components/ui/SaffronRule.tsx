import { cx } from '../../lib/cx';
import { useInView } from '../../lib/hooks/useInView';

/**
 * «خط زعفرانی» — یک خط یک‌پیکسلی که هنگام دیده‌شدن بخش، از سمت راست
 * (جهت خواندن فارسی) کشیده می‌شود.
 */
export function SaffronRule({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ rootMargin: '0px 0px -6% 0px' });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cx(
        'block h-px origin-right bg-gradient-to-l from-amber via-amber/70 to-transparent transition-transform duration-[1100ms] ease-out',
        inView ? 'scale-x-100' : 'scale-x-0',
        className,
      )}
    />
  );
}
