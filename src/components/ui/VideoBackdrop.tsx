import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { useInView } from '../../lib/hooks/useInView';
import { usePrefersReducedMotion } from '../../lib/hooks/usePrefersReducedMotion';
import { shouldUsePosterInsteadOfVideo } from '../../lib/hooks/useConnection';

type Overlay = 'hero' | 'soft' | 'strong' | 'none';

type VideoBackdropProps = {
  src: string;
  poster: string;
  /** متن جانشین تصویر پوستر */
  alt: string;
  className?: string;
  /** جابه‌جایی نقطهٔ کانونی ویدیو در هر اندازهٔ صفحه */
  mediaClassName?: string;
  overlay?: Overlay;
  /** ویدیوی بالای صفحه: بدون تأخیر بارگیری می‌شود */
  eager?: boolean;
  children?: ReactNode;
};

const OVERLAY_CLASS: Record<Overlay, string> = {
  hero: 'veil-hero',
  soft: 'veil-soft',
  strong: 'veil-strong',
  none: '',
};

/**
 * جایگاه ویدیوی پس‌زمینه
 * نکته: خودِ این کامپوننت `relative` است؛ برای پرکردن تمام‌صفحه، آن را داخل یک
 * والد با `absolute inset-0` بگذارید و `className="h-full w-full"` بدهید
 * (نه اینکه هم‌زمان `absolute` و `relative` روی یک عنصر بیاید).
 * - در حالت «کاهش حرکت»، «صرفه‌جویی داده»، اتصال کند یا خطای بارگیری، تصویر پوستر
 *   نمایش داده می‌شود (هیچ‌وقت جای خالی یا آدرس شکسته نمی‌بینید).
 * - ویدیوی پایین صفحه تا نزدیک‌شدن به ناحیهٔ دید بارگیری نمی‌شود و بیرون از دید
 *   متوقف می‌ماند تا صفحهٔ اول سبک بماند.
 * - ویدیو همیشه بی‌صدا، بدون کنترل و تزئینی است؛ هیچ اطلاعاتی فقط با ویدیو
 *   منتقل نمی‌شود و هیچ متنی داخل ویدیو نیست.
 */
export function VideoBackdrop({
  src,
  poster,
  alt,
  className,
  mediaClassName,
  overlay = 'soft',
  eager = false,
  children,
}: VideoBackdropProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [saveData] = useState(() => shouldUsePosterInsteadOfVideo());
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({
    once: false,
    rootMargin: '250px 0px',
    threshold: 0.01,
  });

  const active = eager || inView;
  const staticMode = reducedMotion || saveData || failed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || staticMode) return;

    if (active) {
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') promise.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, staticMode]);

  /* وقتی کاربر به تب دیگری می‌رود، ویدیوها متوقف می‌شوند */
  useEffect(() => {
    if (staticMode) return;
    const onVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
      else if (active) video.play().catch(() => undefined);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [active, staticMode]);

  return (
    <div ref={containerRef} className={cx('relative overflow-hidden', className)}>
      {staticMode ? (
        <img
          src={poster}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={cx('absolute inset-0 h-full w-full object-cover', mediaClassName)}
        />
      ) : (
        <video
          ref={videoRef}
          className={cx('absolute inset-0 h-full w-full object-cover', mediaClassName)}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload={eager ? 'auto' : 'none'}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
        />
      )}
      {overlay !== 'none' && (
        <div className={cx('pointer-events-none absolute inset-0', OVERLAY_CLASS[overlay])} aria-hidden="true" />
      )}
      {children}
    </div>
  );
}
