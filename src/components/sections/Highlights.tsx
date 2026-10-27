import { Flame, HeartHandshake, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

/* پیام‌های جایگاه برند — هیچ عدد، آمار یا گواهی‌نامه‌ای ادعا نمی‌شود */
const highlights = [
  {
    icon: UtensilsCrossed,
    title: 'طعم اصیل ایرانی',
    text: 'دستورهای آشنا، با همان ترکیب ادویه‌ای که طعم خانه را یاد می‌آورد.',
  },
  {
    icon: Flame,
    title: 'عطر دل‌انگیز زغال',
    text: 'حرارت زغال، لحظه‌به‌لحظه روی کباب کار می‌کند تا عطرش بماند.',
  },
  {
    icon: Sparkles,
    title: 'توجه به جزئیات',
    text: 'از چیدن سفره تا دم‌کشیدن برنج؛ جزئیات کوچک، تجربهٔ کامل می‌سازند.',
  },
  {
    icon: HeartHandshake,
    title: 'مهمان‌نوازی ایرانی',
    text: 'پذیرش گرم و صبورانه؛ همان‌طور که در میز ایرانی رسم است.',
  },
] as const;

/** بخش ۲ — نوار کوتاه وعده‌های برند؛ پلی میان هدر سینمایی و محتوای عملی */
export function Highlights() {
  return (
    <section
      aria-label="وعده‌های مستر کباب"
      className="relative border-y border-ivory/10 bg-hearth/70 py-12 sm:py-16"
    >
      <div className="shell grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 90} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber/35 bg-amber/10 text-amber">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[17px] font-bold text-ivory">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.85] text-muted">{item.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
