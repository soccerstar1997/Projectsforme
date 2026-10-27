/**
 * آیا کاربر «صرفه‌جویی در داده» را روشن کرده یا اتصالش کند است؟
 * در این حالت به‌جای بارگیری ویدیو، تصویر پوستر نمایش داده می‌شود.
 */
export function shouldUsePosterInsteadOfVideo(): boolean {
  if (typeof navigator === 'undefined') return false;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
}
