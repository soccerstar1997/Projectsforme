import { SectionHeading } from '../ui/SectionHeading';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { Reveal } from '../ui/Reveal';
import { posters, videos } from '../../data/media';
import { useScrollToSection } from '../../lib/hooks/useScrollToSection';

/** بخش ۵ — هنر کباب: قاب تمام‌عرض با کمترین متن و یک دعوت روشن */
export function CharcoalArt() {
  const scrollTo = useScrollToSection();

  return (
    <section
      id="story"
      aria-labelledby="charcoal-title"
      className="relative isolate flex min-h-[74svh] items-center overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-10">
        <VideoBackdrop
          className="h-full w-full"
          src={videos.charcoalGrilling}
          poster={posters.charcoalGrilling}
          alt="سیخ‌های کباب روی حرارت زغال و دود ملایم"
          overlay="strong"
          mediaClassName="object-[58%_center] sm:object-[62%_center]"
        />
      </div>

      <div className="shell relative">
        <div className="max-w-[40rem]">
          <Reveal>
            <SectionHeading
              eyebrow="هنر کباب، از نزدیک"
              level={2}
              title="راز یک کباب دل‌چسب، در جزئیات است"
              description="صدای زغال، حرارت آتش و لحظه‌ای که کباب به رنگ دلخواه می‌رسد؛ گاهی لذت غذا از همان لحظه‌های قبل از اولین لقمه شروع می‌شود."
              titleClassName="text-shadow-soft"
            />
          </Reveal>

          <Reveal delay={140} className="mt-8">
            <button type="button" className="btn-primary" onClick={() => scrollTo('menu')}>
              مشاهده منو
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
