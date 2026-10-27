import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * تنظیمات فقط-سندباکس (Base44 preview)
 * ------------------------------------
 * BASE44_PREVIEW_MODE === '1'  →  رفتار پیش‌نمایش: wildcard دامنه سندباکس به
 * allowlist هدر Host اضافه می‌شود تا پروکسی پیش‌نمایش پروژه را سرو کند.
 * مقدار هر چیز دیگری (یا تعریف‌نشده)  →  رفتار پیش‌فرض Vite دست‌نخورده می‌ماند.
 * مقدار «دامنه میزبان عمومی» هرگز در فایل hard-code نمی‌شود؛ فقط از طریق
 * متغیرهای محیطی در زمان اجرا خوانده می‌شود.
 */
const isPreview = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;

/* API روی همان مبدأ (پراکسی) سرو می‌شود: مرورگر فقط به پورت ۳۰۰۰ درخواست می‌زند. */
const apiTarget = process.env.VITE_API_TARGET ?? 'http://127.0.0.1:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: isPreview && sandboxHostDomain ? [`.${sandboxHostDomain}`] : undefined,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
