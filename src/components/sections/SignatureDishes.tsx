import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { DishCard } from '../menu/DishCard';
import { dishes, signatureDishIds } from '../../data/menu';
import { posters, videos } from '../../data/media';

const signatureDishes = signatureDishIds
  .map((id) => dishes.find((dish) => dish.id === id))
  .filter((dish): dish is NonNullable<typeof dish> => Boolean(dish));

/** بخش ۳ — انتخاب‌های ویژهٔ مستر کباب کنار ویدیوی پرس‌های آماده */
export function SignatureDishes() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="پیشنهاد مستر کباب"
          title="انتخاب‌های خوش‌طعم برای سلیقه‌های خاص"
          description="از کباب‌های اصیل ایرانی تا همراهی برنج زعفرانی؛ انتخابت را پیدا کن و برای یک وعده دلچسب آماده شو."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <VideoBackdrop
                className="aspect-[4/5] w-full rounded-xl3 border border-ivory/10 shadow-panel"
                src={videos.signatureDishes}
                poster={posters.signatureDishes}
                alt="پرس‌های کباب همراه برنج زعفرانی و گوجهٔ کبابی روی میز"
                overlay="soft"
              />
              <p className="mt-4 text-[13px] leading-[1.8] text-muted">
                قاب‌های نزدیک از پرس‌های آماده؛ انتخاب‌های بالا، همان‌هایی هستند که بیشتر از همه
                سفارش می‌شوند.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {signatureDishes.map((dish, index) => (
              <Reveal key={dish.id} delay={index * 80} className="h-full">
                <DishCard dish={dish} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
