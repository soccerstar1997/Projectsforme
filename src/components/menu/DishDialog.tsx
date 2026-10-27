import { useRef } from 'react';
import { X } from 'lucide-react';
import { cx } from '../../lib/cx';
import { formatPrice } from '../../lib/format';
import { getCategoryTitle, type Dish } from '../../data/menu';
import { ordering, orderingConfigured, reservations } from '../../data/site';
import { useScrollToSection } from '../../lib/hooks/useScrollToSection';
import { useOverlay } from '../../lib/hooks/useOverlay';

type DishDialogProps = {
  dish: Dish | null;
  onClose: () => void;
};

/** جزئیات یک غذا — مودال دسترس‌پذیر با مهار فوکوس و بستن با Escape */
export function DishDialog({ dish, onClose }: DishDialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollTo = useScrollToSection();
  const open = dish !== null;

  useOverlay(open, panelRef, onClose);

  if (!dish) return null;

  const goToSection = (id: string) => {
    onClose();
    window.setTimeout(() => scrollTo(id), 60);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="بستن جزئیات غذا"
        className="absolute inset-0 h-full w-full cursor-default bg-ink/85 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-dialog-title"
        tabIndex={-1}
        className="relative z-10 max-h-[92svh] w-full overflow-y-auto rounded-t-xl3 border border-ivory/10 bg-hearth shadow-panel outline-none sm:max-w-2xl sm:rounded-xl3"
      >
        {dish.image && (
          <div className="relative h-44 w-full overflow-hidden sm:h-56">
            <img
              src={dish.image}
              alt={dish.imageAlt ?? ''}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hearth via-hearth/40 to-transparent" />
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute end-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-charcoal/70 text-ivory transition hover:border-amber hover:text-amber"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip-muted">{getCategoryTitle(dish.categoryId)}</span>
            {dish.available ? (
              <span className="chip-amber">در دسترس</span>
            ) : (
              <span className="chip-off">فعلاً موجود نیست</span>
            )}
          </div>

          <h3 id="dish-dialog-title" className="display-3 mt-5">
            {dish.name}
          </h3>
          <p className="mt-4 text-[15.5px] leading-[1.9] text-muted">{dish.description}</p>

          {dish.servedWith && dish.servedWith.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-bold text-ivory/90">همراه‌های این وعده</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {dish.servedWith.map((item) => (
                  <li key={item} className="chip-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {dish.tags && dish.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {dish.tags.map((tag) => (
                <li key={tag} className="chip-amber">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-ivory/10 pt-6">
            <p className="flex flex-col">
              <span className="text-[22px] font-extrabold text-amber">{formatPrice(dish.price)}</span>
              {!dish.priceVerified && (
                <span className="mt-1 text-[12px] text-muted">
                  قیمت نمونه؛ قیمت نهایی در انتظار تأیید رستوران است.
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-3">
              {orderingConfigured ? (
                <a href={ordering.url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                  {ordering.label}
                </a>
              ) : reservations.enabled ? (
                <button type="button" className="btn-primary btn-sm" onClick={() => goToSection('reserve')}>
                  رزرو میز برای این وعده
                </button>
              ) : null}
              <button type="button" className="btn-outline btn-sm" onClick={onClose}>
                بستن
              </button>
            </div>
          </div>

          {dish.available === false && (
            <p className={cx('mt-4 text-[13px] text-muted')}>
              این آیتم در دادهٔ نمونه فعلاً ناموجود علامت خورده است؛ برای دیدن جایگزین‌ها منوی کامل را
              ببینید.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
