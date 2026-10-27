/*
 * تبدیل تاریخ میلادی به هجری شمسی (الگوریتم استاندارد جلالی)
 * تاریخ‌ها به کاربر با نام روز هفته و ماه فارسی نشان داده می‌شوند،
 * اما مقدار ارسالی به سرور همیشه ISO میلادی (YYYY-MM-DD) است.
 */
import { fa } from './format';

const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

/* نام روزهای هفته به ترتیب Date.getDay() (۰ = یکشنبه) */
const WEEKDAYS = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];

function div(a: number, b: number): number {
  return Math.trunc(a / b);
}

export function toJalali(date: Date): { year: number; month: number; day: number } {
  const gDay = date.getDate();
  const gMonth = date.getMonth() + 1;
  let gYear = date.getFullYear();

  const daysInMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jalaliYear = gYear <= 1600 ? 0 : 979;
  gYear -= gYear <= 1600 ? 621 : 1600;

  const leapBase = gMonth > 2 ? gYear + 1 : gYear;
  let days =
    365 * gYear +
    div(leapBase + 3, 4) -
    div(leapBase + 99, 100) +
    div(leapBase + 399, 400) +
    gDay +
    daysInMonth[gMonth - 1] -
    80;

  jalaliYear += 33 * div(days, 12053);
  days %= 12053;
  jalaliYear += 4 * div(days, 1461);
  days %= 1461;
  if (days > 365) {
    jalaliYear += div(days - 1, 365);
    days = (days - 1) % 365;
  }

  const month = days < 186 ? 1 + div(days, 31) : 7 + div(days - 186, 30);
  const day = days < 186 ? 1 + (days % 31) : 1 + ((days - 186) % 30);

  return { year: jalaliYear, month, day };
}

/** «چهارشنبه ۷ آبان» */
export function formatJalaliDay(date: Date): string {
  const { month, day } = toJalali(date);
  return `${WEEKDAYS[date.getDay()]} ${fa(day)} ${JALALI_MONTHS[month - 1]}`;
}

/** «۷ آبان ۱۴۰۵» */
export function formatJalaliDate(date: Date): string {
  const { year, month, day } = toJalali(date);
  return `${fa(day)} ${JALALI_MONTHS[month - 1]} ${fa(year)}`;
}

/** سال جاری شمسی برای متن کپی‌رایت */
export function currentJalaliYear(): string {
  return fa(toJalali(new Date()).year);
}

/** تاریخ ISO محلی (YYYY-MM-DD) بدون جابه‌جایی منطقهٔ زمانی */
export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** فهرست روزهای قابل انتخاب برای رزرو (از امروز تا n روز آینده) */
export function upcomingDays(count: number, from = new Date()) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      iso: toIsoDate(date),
      label: index === 0 ? `امروز، ${formatJalaliDay(date)}` : formatJalaliDay(date),
      isToday: index === 0,
    };
  });
}
