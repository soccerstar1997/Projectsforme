import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Lightbox } from '../gallery/Lightbox';
import { galleryItems } from '../../data/gallery';
import { mediaNotice } from '../../data/media';
import { cx } from '../../lib/cx';

/** بخش ۱۰ — گالری تصاویر، با شبکهٔ متنوع و نمایش بزرگ قابل‌پیمایش */
export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="گالری"
          title="چشیدنی نیست؟ از همین‌جا تماشا کن"
          description="نگاهی به جزئیات خوشمزه‌ای که برای یک انتخاب دلچسب کنار هم قرار گرفته‌اند."
        />

        <div className="mt-12 grid auto-rows-[160px] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4">
          {galleryItems.map((item, index) => (
            <Reveal key={item.src} delay={index * 50} className={cx('h-full', item.className)}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`نمایش بزرگ تصویر: ${item.alt}`}
                className="group relative h-full w-full overflow-hidden rounded-xl2 border border-ivory/10 transition duration-500 hover:border-amber/45"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 end-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/70 text-ivory opacity-0 transition duration-500 group-hover:opacity-100"
                >
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[13px] leading-[1.9] text-muted">{mediaNotice}</p>
      </div>

      <Lightbox
        items={galleryItems}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </section>
  );
}
