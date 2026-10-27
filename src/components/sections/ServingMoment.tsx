import { Reveal } from '../ui/Reveal';
import { SaffronRule } from '../ui/SaffronRule';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { posters, videos } from '../../data/media';
import { useScrollToSection } from '../../lib/hooks/useScrollToSection';

/**
 * بخش ۷ — لحظهٔ سرو: چیدمان آینه‌ای نسبت به بخش‌های قبلی برای حفظ ریتم بصری،
 * با عنوان کوتاه‌تر تا صفحه یک‌دست بماند.
 */
export function ServingMoment() {
  const scrollTo = useScrollToSection();

  return (
    <section className="relative bg-hearth/40 py-20 sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal className="lg:col-span-7">
          <VideoBackdrop
            className="aspect-[4/3] w-full rounded-xl3 border border-ivory/10 shadow-panel lg:aspect-[16/11]"
            src={videos.servingFood}
            poster={posters.servingFood}
            alt="لحظهٔ رسیدن پرس غذا به میز"
            overlay="soft"
            mediaClassName="object-[42%_center] lg:object-center"
          />
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <h2 className="display-3 text-balance">
            لذت غذا، از لحظه‌ای شروع می‌شود که به میز می‌رسد
          </h2>
          <SaffronRule className="mt-5 w-20" />
          <p className="lede mt-5">
            یک انتخاب خوشمزه، یک میز دلنشین و فرصتی برای لذت بردن از طعم‌های آشنا.
          </p>
          <button type="button" className="btn-outline mt-7" onClick={() => scrollTo('menu')}>
            دیدن منوی غذاها
          </button>
        </Reveal>
      </div>
    </section>
  );
}
