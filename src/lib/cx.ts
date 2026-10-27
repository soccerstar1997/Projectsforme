/* ابزارهای کوچک مشترک */

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/** جلوگیری از پرش صفحهٔ پشتِ مودال‌ها */
export function lockBodyScroll(locked: boolean) {
  const body = document.body;
  if (locked) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingInlineEnd = `${scrollbarWidth}px`;
  } else {
    body.style.overflow = '';
    body.style.paddingInlineEnd = '';
  }
}
