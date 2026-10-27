import { formatPrice } from '../../lib/format';
import type { Dish } from '../../data/menu';
import { useDishDialog } from './DishDialogProvider';

/** سطر غذا در منوی کامل — خوانا و بدون تصویرهای تکراری */
export function DishRow({ dish }: { dish: Dish }) {
  const { openDish } = useDishDialog();

  return (
    <article className="group border-b border-ivory/10">
      <button
        type="button"
        onClick={() => openDish(dish)}
        aria-label={`مشاهده جزئیات ${dish.name}`}
        className="flex w-full items-start justify-between gap-5 py-5 text-start transition-colors duration-300 hover:border-amber/40 focus-visible:outline-none"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[17px] font-bold text-ivory transition-colors group-hover:text-amber">
              {dish.name}
            </span>
            {!dish.available && <span className="chip-off">ناموجود</span>}
            {dish.tags?.map((tag) => (
              <span key={tag} className="chip-muted">
                {tag}
              </span>
            ))}
          </span>
          <span className="mt-2 block text-[14.5px] leading-[1.85] text-muted">{dish.description}</span>
        </span>

        <span className="shrink-0 text-end">
          <span className="block text-[16px] font-extrabold text-amber">{formatPrice(dish.price)}</span>
          {!dish.priceVerified && <span className="mt-1 block text-[11.5px] text-muted">قیمت نمونه</span>}
        </span>
      </button>
    </article>
  );
}
