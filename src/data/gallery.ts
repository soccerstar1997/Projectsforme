/*
 * 🖼 گالری تصاویر — تصاویر از قاب‌های ویدیویی تولیدشده برداشته شده‌اند.
 * متن جانشین (alt) هر تصویر توصیفی و فارسی است.
 */
import { galleryImages } from './media';

export type GalleryItem = {
  src: string;
  alt: string;
  /** چیدمان متنوع شبکه در دسکتاپ */
  className: string;
};

export const galleryItems: GalleryItem[] = [
  {
    src: galleryImages.platter,
    alt: 'پرس کباب همراه برنج زعفرانی و گوجهٔ کبابی روی میز',
    className: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: galleryImages.charcoalHands,
    alt: 'سیخ‌های کباب روی حرارت زغال و دود آرام',
    className: '',
  },
  {
    src: galleryImages.saffronRice,
    alt: 'نمای نزدیک برنج زعفرانی و بخار غذای تازه',
    className: '',
  },
  {
    src: galleryImages.koobidehCoals,
    alt: 'کباب کوبیده روی زغال گداخته',
    className: 'sm:row-span-2',
  },
  {
    src: galleryImages.servedTable,
    alt: 'لحظهٔ رسیدن غذا به میز توسط پرسنل رستوران',
    className: 'sm:col-span-2',
  },
  {
    src: galleryImages.guests,
    alt: 'میز چیده‌شده با غذا و مهمانان در پس‌زمینهٔ محو رستوران',
    className: '',
  },
  {
    src: galleryImages.interiorWide,
    alt: 'نمای باز فضای داخلی رستوران با نور گرم',
    className: 'sm:col-span-2',
  },
  {
    src: galleryImages.interiorTables,
    alt: 'میزهای چیده‌شده و آمادهٔ پذیرش مهمان',
    className: '',
  },
];
