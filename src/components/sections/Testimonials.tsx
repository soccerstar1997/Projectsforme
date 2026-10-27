import { BadgeCheck, Quote, Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { VideoBackdrop } from '../ui/VideoBackdrop';
import { posters, videos } from '../../data/media';
import { reviews, reviewsEmptyMessage, type Review } from '../../data/reviews';
import { fa } from '../../lib/format';

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-xl3 border border-ivory/10 bg-hearth/80 p-6 backdrop-blur-sm">
      <Quote className="h-5 w-5 text-amber/80" aria-hidden="true" />
      <p className="mt-4 flex-1 text-[15px] leading-[1.95] text-ivory/90">{review.text}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ivory/10 pt-4">
        <span className="text-[14.5px] font-bold text-ivory">{review.name}</span>
        {review.date && <span className="text-[12.5px] text-muted">{review.date}</span>}
        {review.rating !== undefined && review.ratingVerified && (
          <span
            className="inline-flex items-center gap-1 text-amber"
            aria-label={`امتیاز ${fa(review.rating)} از ۵`}
          >
            <Star className="h-4 w-4 fill-amber" aria-hidden="true" />
            {fa(review.rating)}
          </span>
        )}
        {review.verifiedVisit && (
          <span className="chip-amber">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            بازدید تأییدشده
          </span>
        )}
      </div>
    </article>
  );
}

/** بخش ۹ — تجربهٔ مشتریان؛ تا ثبت نظر واقعی، حالت خالی صادقانه نمایش داده می‌شود */
export function Testimonials() {
  return (
    <section id="reviews" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <VideoBackdrop
          className="h-full w-full"
          src={videos.testimonialsBackground}
          poster={posters.testimonialsBackground}
          alt="نمای نزدیک از غذای تازه روی میز"
          overlay="strong"
        />
      </div>

      <div className="shell relative">
        <SectionHeading
          align="center"
          eyebrow="تجربه مشتریان"
          title="تجربه‌ای که ارزش تعریف کردن دارد"
          description="نظر مشتریان به ما کمک می‌کند تجربه‌ای بهتر و دلنشین‌تر بسازیم."
        />

        <div className="mt-12">
          {reviews.length === 0 ? (
            <Reveal className="mx-auto max-w-2xl">
              <div className="rounded-xl3 border border-dashed border-ivory/20 bg-charcoal/70 p-8 text-center backdrop-blur-sm sm:p-10">
                <Quote className="mx-auto h-6 w-6 text-amber/70" aria-hidden="true" />
                <p className="mt-5 text-[16px] leading-[1.95] text-ivory/90">{reviewsEmptyMessage}</p>
                <p className="mt-4 text-[13.5px] leading-[1.9] text-muted">
                  این بخش برای نمایش نظرات واقعی مشتریان آماده است؛ هیچ نظر یا امتیازی به‌صورت ساختگی
                  ثبت نشده و هر نظر با اجازهٔ صاحبش در همین‌جا منتشر می‌شود.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
