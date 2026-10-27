/*
 * 🎬 جایگاه رسانه‌ها
 * ---------------------------------------------------------------------------
 * هر ویدیو یک «جایگاه مشخص و قابل‌جایگزینی» است: برای تغییر ویدیو فقط مسیر
 * همین فایل را عوض کنید (یا فایل هم‌نام را در public/media/videos جایگزین کنید).
 * هر ویدیو پوستر تصویری هم دارد تا در حالت کاهش حرکت، صرفه‌جویی داده یا خطای
 * بارگیری، جای آن را بگیرد.
 *
 * هیچ ویدیویی متن، لوگو یا واترمارک ندارد؛ همهٔ عنوان‌ها و دکمه‌ها عناصر HTML
 * همین سایت هستند.
 */

export const videos = {
  /** قاب ۱ — کباب روی زغال (پس‌زمینهٔ تمام‌صفحهٔ هدر) */
  hero: '/media/videos/hero_kebab.mp4',
  /** قاب ۲ — پرس‌های چیده‌شدهٔ کباب و برنج زعفرانی */
  signatureDishes: '/media/videos/signature_dishes.mp4',
  /** قاب ۵ — رسیدن غذا به میز */
  servingFood: '/media/videos/serving_food.mp4',
  /** قاب ۳ — فضای داخلی رستوران */
  restaurantInterior: '/media/videos/restaurant_interior.mp4',
  /** قاب ۴ — دست‌ها و کباب روی حرارت زغال */
  charcoalGrilling: '/media/videos/charcoal_grilling.mp4',
  /** قاب ۶ — میز و مهمان‌نوازی */
  persianHospitality: '/media/videos/persian_hospitality.mp4',
  /** قاب ۸ — نمای نزدیک غذا (پس‌زمینهٔ بخش نظرات) */
  testimonialsBackground: '/media/videos/testimonials_background.mp4',
  /** قاب ۷ — میزهای آمادهٔ رستوران (بخش رزرو) */
  reservationCta: '/media/videos/reservation_cta.mp4',
  /** قاب ۹ — نمای باز فضای رستوران (پس‌زمینهٔ پایین صفحه) */
  footerClosing: '/media/videos/footer_closing.mp4',
} as const;

export const posters = {
  hero: '/media/posters/hero_kebab.jpg',
  signatureDishes: '/media/posters/signature_dishes.jpg',
  servingFood: '/media/posters/serving_food.jpg',
  restaurantInterior: '/media/posters/restaurant_interior.jpg',
  charcoalGrilling: '/media/posters/charcoal_grilling.jpg',
  persianHospitality: '/media/posters/persian_hospitality.jpg',
  testimonialsBackground: '/media/posters/testimonials_background.jpg',
  reservationCta: '/media/posters/reservation_cta.jpg',
  footerClosing: '/media/posters/footer_closing.jpg',
} as const;

/** تصاویر انتخاب‌های ویژه (برگرفته از همان قاب‌های تولیدشده) */
export const signatureImages: Record<string, string> = {
  koobideh: '/media/dishes/sig-koobideh.jpg',
  jujeh: '/media/dishes/sig-jujeh.jpg',
  barg: '/media/dishes/sig-barg.jpg',
  sultani: '/media/dishes/sig-sultani.jpg',
};

/** تصاویر گالری */
export const galleryImages = {
  platter: '/media/gallery/platter.jpg',
  charcoalHands: '/media/gallery/charcoal-hands.jpg',
  saffronRice: '/media/gallery/saffron-rice.jpg',
  servedTable: '/media/gallery/served-table.jpg',
  koobidehCoals: '/media/gallery/koobideh-coals.jpg',
  guests: '/media/gallery/guests.jpg',
  interiorWide: '/media/gallery/interior-wide.jpg',
  interiorTables: '/media/gallery/interior-tables.jpg',
} as const;

/**
 * یادداشت شفاف دربارهٔ تصاویر: از ادعای اینکه تصاویر تولیدشده عکس واقعی
 * رستوران هستند پرهیز می‌کنیم.
 */
export const mediaNotice =
  'تصاویر و ویدیوهای این سایت محتوای نمایشی برند هستند و پس از تأیید رستوران با تصاویر واقعی به‌روزرسانی می‌شوند.';
