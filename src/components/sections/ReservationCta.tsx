import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { ReservationForm } from '../reservation/ReservationForm';
import { posters, videos } from '../../data/media';
import {
  contact,
  contactConfigured,
  ordering,
  orderingConfigured,
  reservations,
} from '../../data/site';
import { telHref } from '../../lib/format';
import { useScrollToSection } from '../../lib/hooks/useScrollToSection';

const CONFIG_FILE = 'src/data/site.ts';

/** بخش ۱۱ — دعوت به سفارش/رزرو + فرم واقعی درخواست رزرو */
export function ReservationCta() {
  const scrollTo = useScrollToSection();

  return (
    <section id="reserve" className="relative bg-hearth/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="رزرو و سفارش"
          title="امروز، نوبت یک غذای خوشمزه است"
          description="منوی مستر کباب را ببین، انتخابت را انجام بده و برای یک تجربه دلچسب آماده شو."
        />

        <Reveal className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn-primary" onClick={() => scrollTo('menu')}>
            مشاهده منو
          </button>
          {orderingConfigured ? (
            <a href={ordering.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
              {ordering.label}
            </a>
          ) : contactConfigured.phone ? (
            <a href={telHref(contact.phone)} className="btn-outline">
              تماس با مستر کباب
            </a>
          ) : (
            <button type="button" className="btn-outline" onClick={() => scrollTo('contact')}>
              تماس با مستر کباب
            </button>
          )}
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <VideoBackdrop
              className="aspect-[4/5] w-full rounded-xl3 border border-ivory/10 shadow-panel"
              src={videos.reservationCta}
              poster={posters.reservationCta}
              alt="میزهای چیده‌شده و آمادهٔ پذیرش مهمان در رستوران"
              overlay="soft"
            />
            <p className="mt-4 text-[13px] leading-[1.9] text-muted">
              می‌خواهی میزت را از قبل هماهنگ کنی؟ درخواست رزرو را ثبت کن؛ برای تأیید نهایی با تو تماس
              می‌گیریم.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            {reservations.enabled ? (
              <ReservationForm />
            ) : (
              <div className="panel p-6 sm:p-8">
                <h3 className="display-3 text-[22px]">رزرو میز هنوز فعال نشده است</h3>
                <p className="mt-4 text-[14.5px] leading-[1.95] text-muted">
                  فرم رزرو وقتی نمایش داده می‌شود که رستوران این امکان را تأیید کرده باشد. برای فعال‌کردن
                  آن، مقدار <code className="text-ivory">reservations.enabled</code> در فایل{' '}
                  <code className="text-ivory">{CONFIG_FILE}</code> را true کنید.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
