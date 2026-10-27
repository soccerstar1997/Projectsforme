import { Reveal } from '../ui/Reveal';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { PersianPattern } from '../ui/PersianPattern';
import { posters, videos } from '../../data/media';

/** بخش ۸ — مهمان‌نوازی ایرانی: قاب تمام‌عرض با بافت محو گره‌چینی */
export function Hospitality() {
  return (
    <section
      aria-labelledby="hospitality-title"
      className="relative isolate flex min-h-[68svh] items-center overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-10">
        <VideoBackdrop
          className="h-full w-full"
          src={videos.persianHospitality}
          poster={posters.persianHospitality}
          alt="میز نشسته و مهمانان در فضای گرم رستوران"
          overlay="strong"
          mediaClassName="object-[38%_center] sm:object-[45%_center]"
        />
      </div>
      <PersianPattern className="-z-10 opacity-[0.06]" id="girih-hospitality" />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span aria-hidden="true" className="mx-auto block h-6 w-px bg-gradient-to-b from-transparent to-amber/70" />
          <h2 id="hospitality-title" className="display-2 mt-6 text-shadow-soft">
            میز ایرانی، بهانه‌ای برای کنار هم بودن
          </h2>
          <p className="lede mx-auto mt-6 max-w-xl text-ivory/85 text-shadow-soft">
            بعضی طعم‌ها فقط برای سیر شدن نیستند؛ برای ساختن لحظه‌هایی‌اند که دوست داریم دوباره تکرار
            شوند.
          </p>
          <span aria-hidden="true" className="mx-auto mt-8 block h-px w-24 bg-amber/60" />
        </Reveal>
      </div>
    </section>
  );
}
