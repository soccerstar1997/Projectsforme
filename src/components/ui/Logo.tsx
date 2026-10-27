import { cx } from '../../lib/cx';
import { brand } from '../../data/site';

/** نماد گرافیکی برند — بدون تصویر لوگوی آماده، فقط یک نشانهٔ گرافیکی تازه */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="23" fill="none" stroke="rgba(217,154,67,0.45)" strokeWidth="1" />
      <path
        d="M24 9c4.6 5.6 7.6 9.4 7.6 14a7.6 7.6 0 0 1-15.2 0c0-4.6 3-8.4 7.6-14Z"
        fill="#D99A43"
        opacity="0.92"
      />
      <path d="M24 17.5c2.2 3 3.6 5.2 3.6 7.5a3.6 3.6 0 0 1-7.2 0c0-2.3 1.4-4.5 3.6-7.5Z" fill="#F6F0E7" opacity="0.9" />
      <path d="M12 36.5h24" stroke="#B7AEA3" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** نمایش فشرده (بدون خط دوم) برای هدر موبایل */
  compact?: boolean;
};

/** ورد‌مارک تایپوگرافی «مستر کباب» — نام برند همیشه فارسی می‌ماند */
export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cx('inline-flex items-center gap-3', className)}>
      <BrandMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col">
        <span className="text-[19px] font-extrabold leading-tight text-ivory sm:text-xl">
          {brand.name}
        </span>
        {!compact && (
          <span className="mt-1 text-[10.5px] font-medium tracking-[0.18em] text-amber/85">
            {brand.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
