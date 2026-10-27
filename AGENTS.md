# AGENTS.md — یادداشت‌های محیط توسعهٔ مستر کباب

این فایل فقط چیزهایی را می‌گوید که از روی manifest‌ها پیدا نمی‌شوند.

## اجرا و بررسی

- سرویس‌ها: `docker compose -f docker-compose.base44.yml up -d` (پورت عمومی ۳۰۰۰ = سرویس `web`؛
  API داخلی روی `api:8000` و از طریق پراکسی ویت روی `/api` در دسترس است). کد از مخزن bind می‌شود و
  حالت توسعه اجرا می‌شود، پس ویرایش‌ها بدون بازسازی ایمیج اعمال می‌شوند.
- `npm ci` و `npm install` هنگام بالا آمدن کانتینر اجرا می‌شوند و پوشهٔ `node_modules` روی والیوم است؛
  بنابراین اجرای دستور `npm install` روی خود سندباکس لازم نیست. پس از تغییر `package.json`:
  `docker compose -f docker-compose.base44.yml up -d --force-recreate web api`.
- تایپ‌چک: `docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit`
- بیلد تولیدی (اختیاری): `docker compose -f docker-compose.base44.yml exec -T web npm run build`
- سلامت API: `curl -s localhost:3000/api/health`
- دادهٔ رزرو: SQLite در والیوم `api-data` (`/data/mister-kebab.sqlite`). برای بازرسی سریع:
  `docker compose -f docker-compose.base44.yml exec -T api node -e "…"` — دادهٔ مشتریان را
  در لاگ یا خروجی چاپ نکنید.

## دو تلهٔ CSS که یک‌بار سرِ همین پروژه دردسر شد

1. **شفافیت رنگ‌ها در Tailwind 3 فقط با مضرب ۵ ساخته می‌شود.** یعنی `bg-charcoal/98` یا
   `bg-ink/96` هیچ استایلی تولید نمی‌کنند (پس‌زمینه بی‌اثر می‌ماند، بدون هیچ خطایی) و باید
   `bg-charcoal/95` یا `bg-ink/[0.96]` نوشته شود. برای بررسی: کلاس را در CSS ساخته‌شده
   جست‌وجو کنید (مثلاً `npx tailwindcss -c tailwind.config.js -i src/index.css -o /tmp/out.css`
   و بعد `grep` روی `/tmp/out.css`).
2. **`absolute` و `relative` را هم‌زمان روی یک عنصر نگذارید.** ترتیب قواعد در CSS تولیدشده
   تعیین می‌کند کدام برنده شود (در خروجی Tailwind، `relative` بعد از `absolute` است)، پس
   `className="absolute inset-0 -z-10"` روی کامپوننتِ `relative` عملاً به عنصری با ارتفاع صفر
   تبدیل می‌شود. برای ویدیوی تمام‌صفحه، `VideoBackdrop` را داخل یک والد با
   `absolute inset-0` بگذارید و به خودش `h-full w-full` بدهید.

## نکات غیرآشکار

- **مبدأ/میزبان (Base44 preview):** ویت فقط وقتی `BASE44_PREVIEW_MODE === '1'` است،
  wildcard دامنهٔ ``.${BASE44_SANDBOX_HOST_DOMAIN}`` را به `server.allowedHosts` اضافه می‌کند.
  مقدار دامنه هرگز hard-code نمی‌شود. متغیرهای `BASE44_PREVIEW_MODE`، `BASE44_SANDBOX_HOST_DOMAIN`
  و `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` بدون مقدار به سرویس `web` پاس داده می‌شوند.
- **هم‌مبدأ بودن API** عمدی است (`server.proxy` در `vite.config.ts`): هیچ CORS یا کوکی بین‌دامنه‌ای لازم نیست.
- **رسانه‌ها** از نُه کلیپ Veo استخراج شده‌اند (فریم‌های پوستر/گالری با ffmpeg و حذف صدای ویدیوها).
  فایل‌های نهایی در `public/media/**` هستند و متن یا لوگویی داخل آن‌ها نیست.
- **قیمت‌ها نمونه‌اند** (`priceVerified: false`) و بخش تماس عمداً بدون شماره/نشانی است تا اطلاعات
  تأییدنشده نمایش داده نشود؛ این‌ها باگ نیستند و پیش از انتشار باید در `src/data/site.ts` و
  `src/data/menu.ts` تکمیل شوند.
- **نظرات مشتریان** عمداً خالی است (`reviews: []`) و حالت خالی نمایش داده می‌شود. نظر ساختگی اضافه نکنید.
- **رزرو** فقط «درخواست» ثبت می‌کند (`status = pending`)؛ هیچ مسیری رزرو را تأیید نمی‌کند و
  پیام‌های موفقیت هم همین را می‌گویند.
- انیمیشن‌ها و پخش ویدیو با `prefers-reduced-motion` و «صرفه‌جویی داده» خاموش/جایگزین می‌شوند؛
  ویدیوهای پایین صفحه با IntersectionObserver فقط نزدیک ناحیهٔ دید بارگیری و پخش می‌شوند.
