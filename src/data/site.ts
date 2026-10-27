/*
 * ⚙️ تنظیمات اصلی سایت مستر کباب
 * ---------------------------------------------------------------------------
 * همهٔ مقادیری که مدیر سایت باید بتواند تغییر دهد (تماس، ساعت کاری، لینک سفارش
 * و تنظیمات رزرو) در همین فایل و در فایل‌های کنارش (menu.ts / media.ts) قرار
 * دارند؛ هیچ‌کدام در کامپوننت‌ها سخت‌کد نشده‌اند.
 *
 * قاعدهٔ مهم: هیچ شمارهٔ تلفن، آدرس، ساعت کاری، شبکهٔ اجتماعی یا امتیازی به‌صورت
 * حدسی نوشته نشده است. تا زمانی که مقدارها خالی باشند، سایت آن‌ها را نمایش
 * نمی‌دهد و به‌جایش یک یادداشت راهنمای مدیر نشان می‌دهد.
 */

export const brand = {
  name: 'مستر کباب',
  latin: 'MISTER KEBAB',
  tagline: 'کباب ایرانی، با عطر زغال',
} as const;

export type NavItem = { id: string; label: string };

/** لینک‌های ناوبری؛ همه به بخش‌های واقعی همین صفحه اشاره می‌کنند */
export const navigation: NavItem[] = [
  { id: 'home', label: 'خانه' },
  { id: 'menu', label: 'منوی غذا' },
  { id: 'story', label: 'داستان ما' },
  { id: 'reviews', label: 'تجربه مشتریان' },
  { id: 'contact', label: 'تماس با ما' },
];

export type BusinessHour = { days: string; time: string };
export type SocialLink = { label: string; href: string };

/**
 * اطلاعات تماس — 🔧 این بخش باید توسط مدیر سایت تکمیل شود.
 * مثال: phone: '02112345678' | address: 'تهران، ...' | hours: [{ days: 'هر روز', time: '۱۲:۰۰ تا ۲۳:۳۰' }]
 */
export const contact = {
  phone: '',
  address: '',
  email: '',
  hours: [] as BusinessHour[],
  mapUrl: '',
  socials: [] as SocialLink[],
};

/**
 * سفارش آنلاین — 🔧 فقط لینک تأییدشدهٔ سفارش (پلتفرم سفارش یا صفحهٔ سفارش رستوران).
 * تا وقتی خالی است، هیچ دکمهٔ سفارشی در سایت نمایش داده نمی‌شود؛ چون ادعای
 * قابلیتی که وجود ندارد، اعتماد مشتری را از بین می‌برد.
 */
export const ordering = {
  url: '',
  label: 'سفارش آنلاین',
};

/**
 * رزرو میز — فرم رزرو «درخواست» ثبت می‌کند و در بک‌اند پروژه ذخیره می‌شود؛
 * تأیید نهایی همیشه با تماس رستوران انجام می‌گیرد.
 */
export const reservations = {
  enabled: true,
  maxAdvanceDays: 30,
  maxGuests: 12,
  /** ساعت‌های پیشنهادی برای درخواست رزرو */
  timeSlots: [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ],
};

/** آیا اطلاعات تماس از سوی مدیر سایت تکمیل شده است؟ */
export const contactConfigured = {
  phone: contact.phone.trim().length > 0,
  address: contact.address.trim().length > 0,
  email: contact.email.trim().length > 0,
  hours: contact.hours.length > 0,
  map: contact.mapUrl.trim().length > 0,
  socials: contact.socials.length > 0,
};

export const orderingConfigured = ordering.url.trim().length > 0;

/** مسیر فایل تنظیمات، برای یادداشت راهنمای مدیر */
export const CONFIG_FILE = 'src/data/site.ts';
