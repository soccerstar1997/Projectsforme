import { useMemo, useState } from 'react';
import { Info, Search } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { DishRow } from '../menu/DishRow';
import {
  dishes,
  menuCategories,
  sampleMenuNotice,
  type CategoryId,
} from '../../data/menu';
import { cx } from '../../lib/cx';
import { fa } from '../../lib/format';

/** یکسان‌سازی متن جست‌وجو: ي/ك عربی، اعداد فارسی و نیم‌فاصله */
function normalize(value: string): string {
  return value
    .replace(/[\u064A\u0649]/g, 'ی')
    .replace(/\u0643/g, 'ک')
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/\u200C/g, ' ')
    .trim()
    .toLowerCase();
}

/** بخش ۴ — منوی کامل: دسته‌بندی، جست‌وجو و فهرست قابل ویرایش */
export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(menuCategories[0].id);
  const [query, setQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const normalizedQuery = normalize(query);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      if (dish.categoryId !== activeCategory) return false;
      if (onlyAvailable && !dish.available) return false;
      if (!normalizedQuery) return true;
      return (
        normalize(dish.name).includes(normalizedQuery) ||
        normalize(dish.description).includes(normalizedQuery)
      );
    });
  }, [activeCategory, onlyAvailable, normalizedQuery]);

  const categoryItems = dishes.filter((dish) => dish.categoryId === activeCategory);
  const availableInCategory = categoryItems.filter((dish) => dish.available).length;

  const emptyMessage = normalizedQuery
    ? 'موردی با این جست‌وجو پیدا نشد؛ عبارت دیگری را امتحان کنید.'
    : onlyAvailable && categoryItems.length > 0 && availableInCategory === 0
      ? 'هیچ آیتمی از این دسته در حال حاضر موجود نیست؛ دستهٔ دیگری را ببینید.'
      : 'هنوز آیتمی برای این دسته ثبت نشده است.';

  const moveTab = (direction: 1 | -1) => {
    const index = menuCategories.findIndex((category) => category.id === activeCategory);
    const next = (index + direction + menuCategories.length) % menuCategories.length;
    setActiveCategory(menuCategories[next].id);
  };

  return (
    <section id="menu" className="relative bg-hearth/45 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="منوی خوشمزه‌ها"
          title="از اولین انتخاب تا آخرین لقمه، با سلیقه تو"
          description="غذای موردعلاقه‌ات را انتخاب کن، جزئیات را ببین و اگر امکان سفارش آنلاین فعال است، سفارش خودت را ثبت کن."
        />

        <Reveal className="mt-8 flex items-start gap-3 rounded-xl2 border border-amber/25 bg-amber/[0.06] p-4 text-[13.5px] leading-[1.8] text-amber-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{sampleMenuNotice}</p>
        </Reveal>

        <div className="mt-12 lg:grid lg:grid-cols-[250px_1fr] lg:gap-14">
          {/* دسته‌بندی‌ها: در موبایل نوار افقی، در دسکتاپ ستون کنارِ راست */}
          <div
            role="tablist"
            aria-label="دسته‌بندی‌های منو"
            aria-orientation="vertical"
            className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:sticky lg:top-28 lg:h-fit lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                moveTab(1);
              } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                moveTab(-1);
              } else if (event.key === 'Home') {
                event.preventDefault();
                setActiveCategory(menuCategories[0].id);
              } else if (event.key === 'End') {
                event.preventDefault();
                setActiveCategory(menuCategories[menuCategories.length - 1].id);
              }
            }}
          >
            {menuCategories.map((category) => {
              const isActive = category.id === activeCategory;
              const count = dishes.filter((dish) => dish.categoryId === category.id).length;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={`menu-tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls="menu-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveCategory(category.id)}
                  className={cx(
                    'flex min-h-[48px] shrink-0 items-center justify-between gap-3 rounded-full border px-5 text-[15px] font-semibold transition duration-300 lg:w-full lg:rounded-xl2 lg:text-start',
                    isActive
                      ? 'border-amber/60 bg-amber/[0.12] text-amber'
                      : 'border-ivory/10 bg-white/[0.02] text-ivory/80 hover:border-amber/35 hover:text-ivory',
                  )}
                >
                  <span>{category.title}</span>
                  <span className={cx('text-[12px]', isActive ? 'text-amber/80' : 'text-muted/80')}>
                    {fa(count)}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`menu-tab-${activeCategory}`}
            className="mt-8 lg:mt-0"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full sm:max-w-sm">
                <span className="sr-only">جست‌وجو در منو</span>
                <Search
                  className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="جست‌وجو در غذاها…"
                  className="field pe-11"
                />
              </label>

              <label className="flex min-h-[48px] cursor-pointer select-none items-center gap-3 text-[14.5px] text-ivory/85">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(event) => setOnlyAvailable(event.target.checked)}
                  className="h-5 w-5 accent-[#D99A43]"
                />
                فقط موارد موجود
              </label>
            </div>

            <p className="mt-5 text-[13.5px] text-muted" aria-live="polite">
              {fa(filteredDishes.length)} مورد از دستهٔ «
              {menuCategories.find((category) => category.id === activeCategory)?.title}» نمایش داده
              می‌شود.
            </p>

            {filteredDishes.length > 0 ? (
              <div className="mt-2 grid gap-x-12 sm:grid-cols-2">
                {filteredDishes.map((dish) => (
                  <DishRow key={dish.id} dish={dish} />
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-xl2 border border-dashed border-ivory/15 bg-white/[0.02] p-6 text-center text-[14.5px] leading-[1.9] text-muted">
                {emptyMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
