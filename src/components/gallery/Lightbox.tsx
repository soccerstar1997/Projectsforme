import { useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useOverlay } from '../../lib/hooks/useOverlay';
import { fa } from '../../lib/format';
import type { GalleryItem } from '../../data/gallery';

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/** نمایش بزرگ تصویر گالری با پیمایش کیبورد و ناوبری راست‌به‌چپ */
export function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const open = index !== null;

  const go = (step: number) => {
    if (index === null) return;
    const next = (index + step + items.length) % items.length;
    onChange(next);
  };

  useOverlay(open, panelRef, onClose, (event) => {
    if (event.key === 'ArrowLeft') {
      go(1);
      return true;
    }
    if (event.key === 'ArrowRight') {
      go(-1);
      return true;
    }
    return false;
  });

  if (index === null) return null;
  const item = items[index];

  return (
    <div className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-sm">
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="نمایش بزرگ تصویر گالری"
        className="flex h-full flex-col outline-none"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-[13.5px] text-muted" aria-live="polite">
            تصویر {fa(index + 1)} از {fa(items.length)}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن گالری"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:border-amber hover:text-amber"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="تصویر قبلی"
            className="absolute start-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 bg-charcoal/60 text-ivory transition hover:border-amber hover:text-amber"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[72svh] w-auto max-w-full rounded-xl2 border border-ivory/10 object-contain"
          />

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="تصویر بعدی"
            className="absolute end-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 bg-charcoal/60 text-ivory transition hover:border-amber hover:text-amber"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="px-6 pb-8 pt-4 text-center text-[14px] leading-[1.8] text-muted">{item.alt}</p>
      </div>
    </div>
  );
}
