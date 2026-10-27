import { useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, CheckCircle2, Clock, MessageSquare, Phone, TriangleAlert, User, Users } from 'lucide-react';
import { fa, toLatinDigits } from '../../lib/format';
import { upcomingDays } from '../../lib/jalali';
import { reservations } from '../../data/site';

type FormValues = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const FIELD_IDS: Record<keyof FormValues, string> = {
  name: 'reservation-name',
  phone: 'reservation-phone',
  date: 'reservation-date',
  time: 'reservation-time',
  guests: 'reservation-guests',
  notes: 'reservation-notes',
};

function normalizePhoneInput(value: string): string {
  const digits = toLatinDigits(value).replace(/[^\d+]/g, '');
  if (digits.startsWith('+98')) return `0${digits.slice(3)}`;
  if (digits.startsWith('0098')) return `0${digits.slice(4)}`;
  if (digits.startsWith('98') && digits.length === 12) return `0${digits.slice(2)}`;
  return digits;
}

/**
 * فرم «درخواست رزرو».
 * - اعتبارسنجی فارسی با پیام روشن برای هر فیلد
 * - ارسال واقعی به API پروژه (POST /api/reservations) و ذخیره در پایگاه‌داده
 * - پیام موفقیت صادقانه است: درخواست ثبت شده ولی «تأیید قطعی» نیست و
 *   نهایی‌شدن آن با تماس رستوران انجام می‌گیرد.
 */
export function ReservationForm() {
  const dayOptions = useMemo(() => upcomingDays(reservations.maxAdvanceDays), []);
  const [values, setValues] = useState<FormValues>({
    name: '',
    phone: '',
    date: dayOptions[0]?.iso ?? '',
    time: '',
    guests: '2',
    notes: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>('idle');
  const [serverError, setServerError] = useState('');
  const [result, setResult] = useState<{ trackingCode: string; cancelToken: string } | null>(null);
  const [cancelState, setCancelState] = useState<'idle' | 'cancelling' | 'cancelled' | 'failed'>('idle');

  const setField = (field: keyof FormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validate = (input: FormValues): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (input.name.trim().length < 2) {
      nextErrors.name = 'نام و نام خانوادگی را کامل وارد کنید.';
    }

    const phone = normalizePhoneInput(input.phone);
    if (!/^09\d{9}$/.test(phone)) {
      nextErrors.phone = 'شمارهٔ موبایل را مانند ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید.';
    }

    if (!input.date) {
      nextErrors.date = 'تاریخ رزرو را انتخاب کنید.';
    }

    if (!input.time) {
      nextErrors.time = 'ساعت رزرو را انتخاب کنید.';
    }

    const guests = Number(toLatinDigits(input.guests));
    if (!Number.isInteger(guests) || guests < 1 || guests > reservations.maxGuests) {
      nextErrors.guests = `تعداد نفرات را بین ۱ تا ${fa(reservations.maxGuests)} انتخاب کنید.`;
    }

    if (input.notes.length > 400) {
      nextErrors.notes = 'توضیحات حداکثر ۴۰۰ نویسه باشد.';
    }

    return nextErrors;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0] as keyof FormValues | undefined;
    if (firstError) {
      document.getElementById(FIELD_IDS[firstError])?.focus();
      return;
    }

    setState('submitting');
    setServerError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: normalizePhoneInput(values.phone),
          date: values.date,
          time: toLatinDigits(values.time),
          guests: Number(toLatinDigits(values.guests)),
          notes: values.notes.trim(),
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; trackingCode?: string; cancelToken?: string; fields?: FieldErrors }
        | null;

      if (!response.ok || !payload?.ok || !payload.trackingCode || !payload.cancelToken) {
        setState('error');
        setServerError(
          payload?.message ?? 'ارتباط با سرور برقرار نشد؛ لطفاً چند لحظه بعد دوباره تلاش کنید.',
        );
        if (payload?.fields) setErrors(payload.fields);
        return;
      }

      setResult({ trackingCode: payload.trackingCode, cancelToken: payload.cancelToken });
      setState('success');
      setCancelState('idle');
    } catch {
      setState('error');
      setServerError('ارتباط با سرور برقرار نشد؛ اتصال اینترنت خود را بررسی و دوباره تلاش کنید.');
    }
  };

  const cancelRequest = async () => {
    if (!result) return;
    setCancelState('cancelling');
    try {
      const response = await fetch('/api/reservations/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingCode: result.trackingCode, cancelToken: result.cancelToken }),
      });
      setCancelState(response.ok ? 'cancelled' : 'failed');
    } catch {
      setCancelState('failed');
    }
  };

  const resetForm = () => {
    setValues({
      name: '',
      phone: '',
      date: dayOptions[0]?.iso ?? '',
      time: '',
      guests: '2',
      notes: '',
    });
    setErrors({});
    setResult(null);
    setServerError('');
    setCancelState('idle');
    setState('idle');
  };

  if (state === 'success' && result) {
    return (
      <div className="panel p-6 sm:p-8" role="status" aria-live="polite">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 bg-amber/10 text-amber">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="display-3 mt-5 text-[22px]">درخواست رزرو شما ثبت شد</h3>
        <p className="mt-4 text-[14.5px] leading-[1.95] text-muted">
          کد پیگیری شما: <span className="font-bold text-ivory">{fa(result.trackingCode)}</span>
          <br />
          این درخواست <span className="text-ivory">قطعی نشده است</span>؛ برای تأیید نهایی میز و ساعت،
          همکاران رستوران با شما تماس می‌گیرند.
        </p>

        {cancelState === 'cancelled' ? (
          <p className="mt-5 rounded-xl2 border border-ivory/15 bg-white/[0.03] p-4 text-[14px] text-ivory/85">
            درخواست رزرو لغو شد.
          </p>
        ) : (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-outline btn-sm"
              onClick={cancelRequest}
              disabled={cancelState === 'cancelling'}
            >
              {cancelState === 'cancelling' ? 'در حال لغو…' : 'لغو این درخواست'}
            </button>
            <button type="button" className="btn-quiet btn-sm" onClick={resetForm}>
              ثبت درخواست جدید
            </button>
          </div>
        )}

        {cancelState === 'failed' && (
          <p className="mt-4 text-[13.5px] text-[#F0A9A9]">
            لغو درخواست انجام نشد؛ لطفاً هنگام تماس، کد پیگیری را اعلام کنید.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="panel p-6 sm:p-8">
      <h3 className="display-3 text-[22px]">درخواست رزرو میز</h3>
      <p className="mt-3 text-[14px] leading-[1.9] text-muted">
        فرم زیر را پر کنید؛ درخواست شما ثبت می‌شود و برای تأیید نهایی با شما تماس می‌گیریم.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={FIELD_IDS.name}>
            <User className="me-2 inline h-4 w-4 text-amber" aria-hidden="true" />
            نام و نام خانوادگی
          </label>
          <input
            id={FIELD_IDS.name}
            name="name"
            type="text"
            autoComplete="name"
            className="field"
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'reservation-name-error' : undefined}
            placeholder="مثلاً سارا محمدی"
            required
          />
          {errors.name && (
            <span className="field-error" id="reservation-name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor={FIELD_IDS.phone}>
            <Phone className="me-2 inline h-4 w-4 text-amber" aria-hidden="true" />
            شمارهٔ موبایل
          </label>
          <input
            id={FIELD_IDS.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            className="field text-start"
            value={values.phone}
            onChange={(event) => setField('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'reservation-phone-error' : 'reservation-phone-hint'}
            placeholder="09123456789"
            required
          />
          {errors.phone ? (
            <span className="field-error" id="reservation-phone-error">
              {errors.phone}
            </span>
          ) : (
            <span className="field-hint" id="reservation-phone-hint">
              برای هماهنگی تأیید رزرو لازم است.
            </span>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor={FIELD_IDS.date}>
            <CalendarDays className="me-2 inline h-4 w-4 text-amber" aria-hidden="true" />
            تاریخ رزرو
          </label>
          <select
            id={FIELD_IDS.date}
            name="date"
            className="field"
            value={values.date}
            onChange={(event) => setField('date', event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'reservation-date-error' : undefined}
            required
          >
            {dayOptions.map((day) => (
              <option key={day.iso} value={day.iso}>
                {day.label}
              </option>
            ))}
          </select>
          {errors.date && (
            <span className="field-error" id="reservation-date-error">
              {errors.date}
            </span>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor={FIELD_IDS.time}>
            <Clock className="me-2 inline h-4 w-4 text-amber" aria-hidden="true" />
            ساعت
          </label>
          <select
            id={FIELD_IDS.time}
            name="time"
            className="field"
            value={values.time}
            onChange={(event) => setField('time', event.target.value)}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? 'reservation-time-error' : 'reservation-time-hint'}
            required
          >
            <option value="">انتخاب ساعت</option>
            {reservations.timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                ساعت {fa(slot)}
              </option>
            ))}
          </select>
          {errors.time ? (
            <span className="field-error" id="reservation-time-error">
              {errors.time}
            </span>
          ) : (
            <span className="field-hint" id="reservation-time-hint">
              تأیید نهایی ساعت در تماس انجام می‌شود.
            </span>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor={FIELD_IDS.guests}>
            <Users className="me-2 inline h-4 w-4 text-amber" aria-hidden="true" />
            تعداد نفرات
          </label>
          <select
            id={FIELD_IDS.guests}
            name="guests"
            className="field"
            value={values.guests}
            onChange={(event) => setField('guests', event.target.value)}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'reservation-guests-error' : undefined}
            required
          >
            {Array.from({ length: reservations.maxGuests }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {fa(count)} نفر
              </option>
            ))}
          </select>
          {errors.guests && (
            <span className="field-error" id="reservation-guests-error">
              {errors.guests}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={FIELD_IDS.notes}>
            <MessageSquare className="me-2 inline h-4 w-4 text-amber" aria-hidden="true" />
            توضیحات (اختیاری)
          </label>
          <textarea
            id={FIELD_IDS.notes}
            name="notes"
            rows={3}
            className="field resize-none"
            value={values.notes}
            onChange={(event) => setField('notes', event.target.value)}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? 'reservation-notes-error' : 'reservation-notes-hint'}
            placeholder="مثلاً میز کنار پنجره، یا مناسب با کالسکه کودک"
          />
          {errors.notes ? (
            <span className="field-error" id="reservation-notes-error">
              {errors.notes}
            </span>
          ) : (
            <span className="field-hint" id="reservation-notes-hint">
              حداکثر ۴۰۰ نویسه.
            </span>
          )}
        </div>
      </div>

      {state === 'error' && serverError && (
        <p
          className="mt-6 flex items-start gap-3 rounded-xl2 border border-burgundy/60 bg-burgundy/20 p-4 text-[14px] leading-[1.9] text-[#F3BDBD]"
          role="alert"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {serverError}
        </p>
      )}

      <button type="submit" className="btn-primary mt-7 w-full sm:w-auto" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'در حال ثبت درخواست…' : 'ثبت درخواست رزرو'}
      </button>

      <p className="mt-4 text-[12.5px] leading-[1.9] text-muted">
        با ثبت این فرم، شمارهٔ شما فقط برای هماهنگی همین رزرو استفاده می‌شود.
      </p>
    </form>
  );
}
