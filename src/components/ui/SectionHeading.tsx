import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Reveal } from './Reveal';
import { SaffronRule } from './SaffronRule';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** ترازبندی محتوا؛ پیش‌فرض «راست‌چین» در جهت فارسی */
  align?: 'start' | 'center';
  level?: 2 | 3;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
};

/** سرصفحهٔ مشترک بخش‌ها: برچسب کوچک، عنوان و توضیح */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  level = 2,
  className,
  titleClassName,
  children,
}: SectionHeadingProps) {
  const Heading = level === 2 ? 'h2' : 'h3';

  return (
    <Reveal
      className={cx(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-start',
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow">
          {eyebrow}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber/70" />
        </span>
      )}
      <SaffronRule className={cx('mt-4 w-24', align === 'center' && 'mx-auto')} />
      <Heading className={cx('display-2 mt-5', titleClassName)}>{title}</Heading>
      {description && (
        <div className={cx('lede mt-5', align === 'center' ? 'max-w-2xl' : 'max-w-2xl')}>
          {description}
        </div>
      )}
      {children}
    </Reveal>
  );
}
