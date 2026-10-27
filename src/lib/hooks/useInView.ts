import { useEffect, useRef, useState } from 'react';

type Options = {
  /** وقتی true (پیش‌فرض) پس از یک بار دیده‌شدن، دیگر رصد نمی‌شود */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

/** آیا عنصر وارد ناحیهٔ دید کاربر شده است؟ (برای انیمیشن ورود و مدیریت پخش ویدیو) */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
