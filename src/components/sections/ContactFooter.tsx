import { ArrowUp, Clock, ExternalLink, Mail, MapPin, Phone, Settings2 } from 'lucide-react';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { Reveal } from '../ui/Reveal';
import { mediaNotice, posters, videos } from '../../data/media';
import {
  brand,
  contact,
  contactConfigured,
  navigation,
  ordering,
  orderingConfigured,
} from '../../data/site';
import { currentJalaliYear } from '../../lib/jalali';
import { formatPhone, telHref } from '../../lib/format';
import { useScrollToSection } from '../../lib/hooks/useScrollToSection';

/** بخش ۱۲ — تماس، نشانی و پاورقی */
export function ContactFooter() {
  const scrollTo = useScrollToSection();

  /* هر مورد فقط وقتی نمایش داده می‌شود که مدیر سایت مقدار واقعی را وارد کرده باشد */
  const missingFields: string[] = [];
  if (!contactConfigured.address) missingFields.push('نشانی رستوران');
  if (!contactConfigured.phone) missingFields.push('شمارهٔ تماس');
  if (!contactConfigured.hours) missingFields.push('ساعت کاری');
  if (!contactConfigured.email) missingFields.push('ایمیل (اختیاری)');
  if (!contactConfigured.map) missingFields.push('لینک نقشه');
  if (!contactConfigured.socials) missingFields.push('شبکه‌های اجتماعی');

  return (
    <footer id="contact" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <VideoBackdrop
          className="h-full w-full"
          src={videos.footerClosing}
          poster={posters.footerClosing}
          alt="نمای فضای رستوران با نور گرم و میزهای چیده‌شده"
          overlay="strong"
        />
      </div>

      <div className="shell relative pt-20 sm:pt-28">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">تماس با مستر کباب</span>
          <h2 className="display-2 mt-5">برای یک انتخاب خوشمزه، با ما در ارتباط باش</h2>
          <p className="lede mt-5">
            منوی غذا را ببین، غذای دلخواهت را انتخاب کن و اگر میز می‌خواهی، درخواست رزرو را ثبت کن.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contactConfigured.address && (
            <Reveal className="panel p-6">
              <MapPin className="h-5 w-5 text-amber" aria-hidden="true" />
              <h3 className="mt-4 text-[16px] font-bold">نشانی</h3>
              <p className="mt-2 text-[14.5px] leading-[1.9] text-muted">{contact.address}</p>
              {contactConfigured.map && (
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-amber hover:text-amber-soft"
                >
                  مشاهده روی نقشه
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </Reveal>
          )}

          {contactConfigured.phone && (
            <Reveal className="panel p-6" delay={60}>
              <Phone className="h-5 w-5 text-amber" aria-hidden="true" />
              <h3 className="mt-4 text-[16px] font-bold">تلفن</h3>
              <a
                href={telHref(contact.phone)}
                dir="ltr"
                className="mt-2 inline-block text-[17px] font-bold text-ivory hover:text-amber"
              >
                {formatPhone(contact.phone)}
              </a>
            </Reveal>
          )}

          {contactConfigured.hours && (
            <Reveal className="panel p-6" delay={120}>
              <Clock className="h-5 w-5 text-amber" aria-hidden="true" />
              <h3 className="mt-4 text-[16px] font-bold">ساعت کاری</h3>
              <ul className="mt-2 space-y-1 text-[14.5px] text-muted">
                {contact.hours.map((item) => (
                  <li key={`${item.days}-${item.time}`}>
                    <span className="text-ivory/90">{item.days}</span> — {item.time}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {contactConfigured.email && (
            <Reveal className="panel p-6">
              <Mail className="h-5 w-5 text-amber" aria-hidden="true" />
              <h3 className="mt-4 text-[16px] font-bold">ایمیل</h3>
              <a
                href={`mailto:${contact.email}`}
                dir="ltr"
                className="mt-2 inline-block text-[14.5px] text-ivory hover:text-amber"
              >
                {contact.email}
              </a>
            </Reveal>
          )}

          {contactConfigured.socials && (
            <Reveal className="panel p-6">
              <h3 className="text-[16px] font-bold">شبکه‌های اجتماعی</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {contact.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip-amber"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {missingFields.length > 0 && (
          <Reveal className="mt-6">
            <div className="rounded-xl3 border border-dashed border-ivory/20 bg-charcoal/70 p-6">
              <div className="flex items-start gap-3">
                <Settings2 className="mt-0.5 h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
                <div>
                  <h3 className="text-[16px] font-bold text-ivory">
                    این بخش برای نمایش اطلاعات تأییدشدهٔ رستوران آماده است
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.95] text-muted">
                    هیچ نشانی، شمارهٔ تلفن، ساعت کاری یا حساب شبکهٔ اجتماعی حدسی در سایت نوشته نشده است.
                    مدیر سایت می‌تواند اطلاعات واقعی را در فایل{' '}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-ivory">src/data/site.ts</code>{' '}
                    وارد کند؛ همان لحظه به‌صورت خودکار در همین بخش نمایش داده می‌شود.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {missingFields.map((field) => (
                      <li key={field} className="chip-muted">
                        {field}
                      </li>
                    ))}
                  </ul>
                  {!orderingConfigured && (
                    <p className="mt-4 text-[13.5px] leading-[1.9] text-muted">
                      سفارش آنلاین هم تا زمانی که لینک تأییدشدهٔ سفارش در تنظیمات وارد نشود، به کاربر
                      نشان داده نمی‌شود.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}



        <div className="mt-20 border-t border-ivory/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[20px] font-extrabold text-ivory">{brand.name}</p>
              <p className="mt-3 text-[13.5px] leading-[1.9] text-muted">
                {brand.tagline}؛ میزی گرم برای یک وعدهٔ دلچسب.
              </p>
            </div>

            <nav aria-label="ناوبری پاورقی">
              <h3 className="text-[14.5px] font-bold text-ivory">دسترسی سریع</h3>
              <ul className="mt-4 space-y-2">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollTo(item.id);
                      }}
                      className="text-[14px] text-muted transition-colors hover:text-amber"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-[14.5px] font-bold text-ivory">منو</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#menu"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo('menu');
                    }}
                    className="text-[14px] text-muted transition-colors hover:text-amber"
                  >
                    منوی کامل غذاها
                  </a>
                </li>
                <li>
                  <a
                    href="#reserve"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo('reserve');
                    }}
                    className="text-[14px] text-muted transition-colors hover:text-amber"
                  >
                    درخواست رزرو میز
                  </a>
                </li>
                {orderingConfigured && (
                  <li>
                    <a
                      href={ordering.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-muted transition-colors hover:text-amber"
                    >
                      {ordering.label}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-[14.5px] font-bold text-ivory">ارتباط</h3>
              <ul className="mt-4 space-y-2 text-[14px] text-muted">
                {contactConfigured.phone ? (
                  <li>
                    <a href={telHref(contact.phone)} dir="ltr" className="hover:text-amber">
                      {formatPhone(contact.phone)}
                    </a>
                  </li>
                ) : (
                  <li>شمارهٔ تماس پس از تکمیل تنظیمات نمایش داده می‌شود.</li>
                )}
                {contactConfigured.address ? (
                  <li>{contact.address}</li>
                ) : (
                  <li>نشانی پس از تکمیل تنظیمات نمایش داده می‌شود.</li>
                )}
                {contactConfigured.socials &&
                  contact.socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-muted">
              © {currentJalaliYear()} {brand.name} — همهٔ حقوق محفوظ است.
            </p>
            <p className="max-w-xl text-[12.5px] leading-[1.8] text-muted/85">{mediaNotice}</p>
            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="inline-flex min-h-[48px] items-center gap-2 self-start rounded-full border border-ivory/20 px-5 text-[13.5px] text-ivory/85 transition hover:border-amber hover:text-amber sm:self-auto"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              بازگشت به بالا
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
