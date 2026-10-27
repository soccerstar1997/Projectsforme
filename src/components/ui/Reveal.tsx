import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { useInView } from '../../lib/hooks/useInView';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** تأخیر کوتاه برای ورود پله‌ای عناصر */
  delay?: number;
  style?: CSSProperties;
};

/** ورود نرم و آرام بخش‌ها؛ در حالت «کاهش حرکت» بلافاصله نمایش داده می‌شود */
export function Reveal({ children, className, delay = 0, style }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx('reveal', inView && 'is-visible', className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  );
}
