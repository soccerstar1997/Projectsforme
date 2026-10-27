import { ArrowLeft } from 'lucide-react';
import { formatPrice } from '../../lib/format';
import type { Dish } from '../../data/menu';
import { useDishDialog } from './DishDialogProvider';

/** کارت تصویری غذا — برای بخش «انتخاب‌های ویژهٔ مستر کباب» */
export function DishCard({ dish }: { dish: Dish }) {
  const { openDish } = useDishDialog();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl3 border border-ivory/10 bg-hearth/80 transition duration-500 hover:border-amber/45 hover:shadow-ember">
      <div className="relative h-44 overflow-hidden sm:h-48">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.imageAlt ?? ''}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-hearth to-charcoal" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-hearth via-hearth/25 to-transparent" aria-hidden="true" />
        {!dish.available && (
          <span className="chip-off absolute end-3 top-3 bg-burgundy/80">ناموجود</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[18px] font-bold text-ivory transition-colors group-hover:text-amber">
          {dish.name}
        </h3>
        <p className="mt-3 flex-1 text-[14.5px] leading-[1.85] text-muted">{dish.description}</p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <span className="flex flex-col">
            <span className="text-[17px] font-extrabold text-amber">{formatPrice(dish.price)}</span>
            {!dish.priceVerified && <span className="mt-1 text-[11.5px] text-muted">قیمت نمونه</span>}
          </span>
        </div>

        <button
          type="button"
          className="btn-outline btn-sm mt-5 w-full"
          onClick={() => openDish(dish)}
          aria-label={`مشاهده جزئیات ${dish.name}`}
        >
          مشاهده جزئیات
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
