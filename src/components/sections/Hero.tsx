import { ArrowDown } from 'lucide-react';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { Reveal } from '../ui/Reveal';
import { SaffronRule } from '../ui/SaffronRule';
import { posters, videos } from '../../data/media';
import { ordering, orderingConfigured, reservations } from '../../data/site';
import { useScrollToSection } from '../../lib/hooks/useScrollToSection';

/** بخش ۱ — هدر سینمایی: ویدیوی تمام‌صفحه، متن روی فضای تیرهٔ سمت راست */
export function Hero() {
  const scrollTo = useScrollToSection();

  const secondaryAction = reservations.enabled
    ? { label: 'شروع یک تجربه خوشمزه', onClick: () => scrollTo('reserve') }
    : { label: 'شروع یک تجربه خوشمزه', onClick: () => scrollTo('menu') };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal pt-28"
    >
      {/* لایهٔ ویدیو: والد با position:absolute تمام‌صفحه را می‌پوشاند */}
      <div className="absolute inset-0 -z-10">
        <VideoBackdrop
          className="h-full w-full"
          src={videos.hero}
          poster={posters.hero}
          alt="کباب در حال کباب‌شدن روی زغال گداخته با دود آرام"
          overlay="hero"
          eager
          mediaClassName="object-[66%_center] sm:object-[72%_center] lg:object-center"
        />
      </div>

      <div className="shell relative z-10 pb-12 sm:pb-20">
        <div className="max-w-[44rem]">
          <Reveal>
            <span className="eyebrow text-shadow-soft">عطر زغال، طعم اصالت</span>
          </Reveal>

          <Reveal delay={110}>
            <SaffronRule className="mt-5 w-28" />
            <h1 className="display-1 mt-6 text-shadow-soft">
              کبابی که عطرش، اشتها را بیدار می‌کند
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="lede mt-6 max-w-[36rem] text-ivory/85 text-shadow-soft">
              از حرارت زغال تا عطر برنج زعفرانی؛ تجربه‌ای از طعم ایرانی که برای دوباره چشیدن ساخته
              شده است.
            </p>
          </Reveal>

          <Reveal delay={320} className="mt-9 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => scrollTo('menu')}>
              منوی مستر کباب
            </button>
            <button type="button" className="btn-outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button>
            {orderingConfigured && (
              <a
                href={ordering.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                {ordering.label}
              </a>
            )}
          </Reveal>
        </div>
      </div>

      <div className="shell relative z-10 hidden pb-8 sm:block">
        <button
          type="button"
          onClick={() => scrollTo('menu')}
          className="group inline-flex items-center gap-3 text-sm text-ivory/70 transition-colors hover:text-amber"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors group-hover:border-amber/70">
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </span>
          کمی پایین‌تر، منوی غذا منتظر است
        </button>
      </div>
    </section>
  );
}
