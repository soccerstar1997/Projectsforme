import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { posters, videos } from '../../data/media';

/** بخش ۶ — تجربهٔ رستوران: قاب بزرگ داخلی در کنار متن کوتاه */
export function Experience() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="بیشتر از یک وعده غذا"
            title="جایی برای خوش‌طعم‌تر شدن لحظه‌ها"
            description="برای یک دورهمی صمیمی، یک وعده دلچسب یا زمانی که دلت طعم آشنای غذای ایرانی را می‌خواهد."
          />
          <p className="mt-6 text-[13px] leading-[1.9] text-muted">
            فضای گرم، نور کم و نگاه‌داشتن به جزئیات؛ این قاب تصویری نمایشی از تجربهٔ میز مستر کباب
            است و با عکس‌های واقعی رستوران به‌روزرسانی می‌شود.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          <VideoBackdrop
            className="aspect-[4/3] w-full rounded-xl3 border border-ivory/10 shadow-panel lg:aspect-[16/11]"
            src={videos.restaurantInterior}
            poster={posters.restaurantInterior}
            alt="نمای داخلی روشن‌نشین رستوران با میزهای چیده‌شده"
            overlay="soft"
            mediaClassName="object-[70%_center] lg:object-center"
          />
        </Reveal>
      </div>
    </section>
  );
}
