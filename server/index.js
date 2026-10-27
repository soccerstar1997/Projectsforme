/*
 * API سبک مستر کباب
 * ------------------
 * تنها قابلیتی که واقعاً به ذخیره‌سازی نیاز دارد: «درخواست رزرو میز».
 * درخواست‌ها در SQLite ذخیره می‌شوند و وضعیت اولیهٔ آن‌ها «در انتظار تأیید» است
 * (هیچ رزروی به‌صورت خودکار تأیید نمی‌شود؛ تأیید با تماس رستوران انجام می‌گیرد).
 *
 * مسیرها:
 *   GET  /api/health                 بررسی سلامت سرویس و پایگاه‌داده
 *   POST /api/reservations           ثبت درخواست رزرو (اعتبارسنجی سمت سرور)
 *   POST /api/reservations/cancel    لغو درخواست با کد پیگیری + توکن لغو
 *
 * هیچ مسیر عمومی برای فهرست‌کردن درخواست‌ها وجود ندارد؛ دادهٔ تماس مشتریان
 * فقط با کد پیگیری و توکنی که هنگام ثبت به خود مشتری داده شده قابل لغو است.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import Database from 'better-sqlite3';

const PORT = Number(process.env.PORT ?? 8000);
const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'data', 'mister-kebab.sqlite');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id            TEXT PRIMARY KEY,
    tracking_code TEXT NOT NULL UNIQUE,
    cancel_token  TEXT NOT NULL,
    name          TEXT NOT NULL,
    phone         TEXT NOT NULL,
    reserve_date  TEXT NOT NULL,
    reserve_time  TEXT NOT NULL,
    guests        INTEGER NOT NULL,
    notes         TEXT NOT NULL DEFAULT '',
    status        TEXT NOT NULL DEFAULT 'pending',
    created_at    TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_reservations_slot
    ON reservations (reserve_date, reserve_time, status);
`);

const insertReservation = db.prepare(`
  INSERT INTO reservations
    (id, tracking_code, cancel_token, name, phone, reserve_date, reserve_time, guests, notes, status, created_at)
  VALUES
    (@id, @trackingCode, @cancelToken, @name, @phone, @reserveDate, @reserveTime, @guests, @notes, 'pending', @createdAt)
`);
const findDuplicate = db.prepare(`
  SELECT id FROM reservations
  WHERE phone = ? AND reserve_date = ? AND reserve_time = ? AND status = 'pending'
  LIMIT 1
`);
/*
 * لغو درخواست = حذف رکورد.
 * چون درخواست هنوز «در انتظار تأیید» است، لغو آن را از فهرست رستوران برمی‌دارد و
 * دادهٔ تماس مشتری هم در سیستم باقی نمی‌ماند.
 */
const cancelStmt = db.prepare(`
  DELETE FROM reservations
  WHERE tracking_code = ? AND cancel_token = ? AND status = 'pending'
`);

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

/* فقط مسیر، وضعیت و زمان پردازش ثبت می‌شود؛ دادهٔ شخصی مشتری هرگز لاگ نمی‌شود. */
app.use((req, res, next) => {
  const started = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} -> ${res.statusCode} (${Date.now() - started}ms)`);
  });
  next();
});

app.get('/api/health', (_req, res) => {
  try {
    db.prepare('SELECT 1').get();
    res.json({ ok: true, database: 'ok' });
  } catch (error) {
    res.status(503).json({ ok: false, message: 'پایگاه‌داده پاسخ نداد.', detail: String(error) });
  }
});

app.post('/api/reservations', (req, res) => {
  if (!allowRequest(req)) {
    return res.status(429).json({
      ok: false,
      message: 'تعداد درخواست‌ها زیاد بود؛ لطفاً چند دقیقه بعد دوباره تلاش کنید.',
    });
  }

  const parsed = validateReservation(req.body);
  if (!parsed.ok) {
    return res.status(422).json({ ok: false, message: parsed.message, fields: parsed.fields });
  }

  const data = parsed.value;
  if (findDuplicate.get(data.phone, data.reserveDate, data.reserveTime)) {
    return res.status(409).json({
      ok: false,
      message: 'برای همین شماره، تاریخ و ساعت قبلاً درخواستی ثبت شده است.',
    });
  }

  const id = crypto.randomUUID();
  const trackingCode = `MK-${crypto.randomInt(100000, 999999)}`;
  const cancelToken = crypto.randomBytes(16).toString('hex');

  insertReservation.run({
    id,
    trackingCode,
    cancelToken,
    name: data.name,
    phone: data.phone,
    reserveDate: data.reserveDate,
    reserveTime: data.reserveTime,
    guests: data.guests,
    notes: data.notes,
    createdAt: new Date().toISOString(),
  });

  /* وضعیت «در انتظار تأیید» است؛ پس پیام موفقیت هم تأیید قطعی را ادعا نمی‌کند. */
  res.status(201).json({
    ok: true,
    trackingCode,
    cancelToken,
    status: 'pending',
    message: 'درخواست شما ثبت شد و در انتظار تأیید رستوران است.',
  });
});

app.post('/api/reservations/cancel', (req, res) => {
  const trackingCode = String(req.body?.trackingCode ?? '').trim();
  const cancelToken = String(req.body?.cancelToken ?? '').trim();
  if (!trackingCode || !cancelToken) {
    return res.status(422).json({ ok: false, message: 'کد پیگیری نامعتبر است.' });
  }
  const result = cancelStmt.run(trackingCode, cancelToken);
  if (result.changes !== 1) {
    return res
      .status(404)
      .json({ ok: false, message: 'درخواستی با این کد پیدا نشد یا قبلاً لغو شده است.' });
  }
  res.json({ ok: true, status: 'cancelled', message: 'درخواست رزرو لغو و از فهرست حذف شد.' });
});

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, message: 'مسیر موردنظر پیدا نشد.' });
});

app.use((error, _req, res, _next) => {
  console.error('unhandled error:', error?.message);
  res.status(500).json({ ok: false, message: 'خطای غیرمنتظره در سرور رخ داد.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`mister-kebab api listening on http://0.0.0.0:${PORT} (db: ${DB_PATH})`);
});

/* ------------------------------- helpers ------------------------------- */

const hits = new Map();
function allowRequest(req) {
  const ip = req.ip ?? 'unknown';
  const now = Date.now();
  const windowMs = 30 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length <= 8;
}

function toLatinDigits(value) {
  return String(value)
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

function normalizePhone(value) {
  const digits = toLatinDigits(value).replace(/[^\d+]/g, '');
  if (digits.startsWith('+98')) return `0${digits.slice(3)}`;
  if (digits.startsWith('0098')) return `0${digits.slice(4)}`;
  if (digits.startsWith('98') && digits.length === 12) return `0${digits.slice(2)}`;
  return digits;
}

function todayInTehran() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tehran' }).format(new Date());
}

function validateReservation(body) {
  const fields = {};
  const raw = body ?? {};

  const name = String(raw.name ?? '').trim();
  if (name.length < 2 || name.length > 60) {
    fields.name = 'نام و نام خانوادگی را کامل وارد کنید.';
  }

  const phone = normalizePhone(raw.phone ?? '');
  if (!/^09\d{9}$/.test(phone)) {
    fields.phone = 'شمارهٔ موبایل را مانند ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید.';
  }

  const reserveDate = String(raw.date ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reserveDate)) {
    fields.date = 'تاریخ رزرو را انتخاب کنید.';
  } else if (reserveDate < todayInTehran()) {
    fields.date = 'تاریخ انتخابی گذشته است؛ یک روز آینده را انتخاب کنید.';
  }

  const reserveTime = toLatinDigits(String(raw.time ?? '').trim());
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(reserveTime)) {
    fields.time = 'ساعت رزرو را انتخاب کنید.';
  } else if (reserveTime < '11:00' || reserveTime > '23:30') {
    fields.time = 'ساعت انتخابی خارج از بازهٔ پذیرش درخواست است.';
  }

  const guests = Number(toLatinDigits(raw.guests ?? ''));
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    fields.guests = 'تعداد نفرات را انتخاب کنید.';
  }

  const notes = String(raw.notes ?? '').trim();
  if (notes.length > 400) {
    fields.notes = 'توضیحات حداکثر ۴۰۰ نویسه باشد.';
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, message: 'لطفاً موارد مشخص‌شده را اصلاح کنید.', fields };
  }
  return { ok: true, value: { name, phone, reserveDate, reserveTime, guests, notes } };
}
