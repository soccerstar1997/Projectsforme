import { cx } from '../../lib/cx';

/** نقش هندسی ایرانی (گره‌چینی) — بسیار محو و فقط برای بافت پس‌زمینه */
export function PersianPattern({ className, id = 'girih' }: { className?: string; id?: string }) {
  return (
    <svg className={cx('pointer-events-none absolute inset-0 h-full w-full', className)} aria-hidden="true">
      <defs>
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          <path d="M48 6 90 48 48 90 6 48Z" fill="none" stroke="#D99A43" strokeWidth="1" opacity="0.55" />
          <path d="M48 24 72 48 48 72 24 48Z" fill="none" stroke="#D99A43" strokeWidth="0.8" opacity="0.4" />
          <circle cx="48" cy="48" r="4" fill="none" stroke="#D99A43" strokeWidth="0.8" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
