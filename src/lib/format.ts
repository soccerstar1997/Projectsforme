/* نمایش اعداد و قیمت‌ها به فارسی */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** تبدیل ارقام لاتین به ارقام فارسی */
export function fa(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/** تبدیل ارقام فارسی/عربی به لاتین (برای اعتبارسنجی و ارسال به سرور) */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/** قیمت با جداکنندهٔ هزارگان فارسی و واحد «تومان» */
export function formatPrice(toman: number): string {
  const grouped = Math.round(toman)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return `${fa(grouped)} تومان`;
}

/** شمارهٔ تلفن برای نمایش (فقط اعداد فارسی، بدون تغییر ساختار) */
export function formatPhone(phone: string): string {
  return fa(phone.trim());
}

/** «۰۹۱۲۳۴۵۶۷۸۹» → لینک تماس گرفتنی و معتبر */
export function telHref(phone: string): string {
  const digits = toLatinDigits(phone).replace(/[^\d+]/g, '');
  return `tel:${digits}`;
}

/** سال جاری میلادی برای متن کپی‌رایت */
export function currentGregorianYear(): number {
  return new Date().getFullYear();
}
