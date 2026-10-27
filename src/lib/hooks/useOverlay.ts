import { useEffect, useRef, type RefObject } from 'react';
import { lockBodyScroll } from '../cx';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * رفتار مشترک لایه‌های روی‌صفحه (مودال غذا، گالری):
 * قفل اسکرول، فوکوس اولیه، مهار فوکوس با Tab، بستن با Escape و
 * بازگرداندن فوکوس به عنصر قبلی.
 * اگر `onKeyDown` مقدار true برگرداند، یعنی کلید را خودش مدیریت کرده است.
 */
export function useOverlay(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  onKeyDown?: (event: KeyboardEvent) => boolean,
) {
  const keyHandlerRef = useRef(onKeyDown);
  keyHandlerRef.current = onKeyDown;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockBodyScroll(true);
    containerRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyHandlerRef.current?.(event)) return;

      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null || element === document.activeElement);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      lockBodyScroll(false);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, containerRef]);
}
