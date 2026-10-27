import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cx, lockBodyScroll } from '../../lib/cx';
import { useScrollSpy } from '../../lib/hooks/useScrollSpy';
import { useScrollToSection } from '../../lib/hooks/useScrollToSection';
import { Logo } from '../ui/Logo';
import { navigation, ordering, orderingConfigured, reservations } from '../../data/site';

/** ناوبری سراسری: شفاف روی هدر، با اسکرول به نوار زغالی با خط نازک کهربایی تبدیل می‌شود */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useScrollToSection();
  const activeSection = useScrollSpy(navigation.map((item) => item.id));
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    lockBodyScroll(menuOpen);
    return () => lockBodyScroll(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  /* اقدام دوم هدر به سرویس واقعاً فعال سایت اشاره می‌کند */
  const secondaryNav = reservations.enabled
    ? { id: 'reserve', label: 'رزرو میز' }
    : orderingConfigured
      ? null
      : { id: 'contact', label: 'تماس با ما' };

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || menuOpen
          ? 'border-b border-amber/25 bg-charcoal/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-4 sm:h-20">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            goTo('home');
          }}
          className="rounded-xl2"
          aria-label="مستر کباب — بازگشت به ابتدای صفحه"
        >
          <Logo compact />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(item.id);
                }}
                aria-current={isActive ? 'true' : undefined}
                className={cx(
                  'relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300',
                  isActive ? 'text-amber' : 'text-ivory/80 hover:text-ivory',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cx(
                    'absolute inset-x-4 -bottom-0.5 h-px origin-right bg-amber transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {secondaryNav && (
            <button type="button" className="btn-quiet btn-sm" onClick={() => goTo(secondaryNav.id)}>
              {secondaryNav.label}
            </button>
          )}
          {orderingConfigured && (
            <a
              href={ordering.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet btn-sm"
            >
              {ordering.label}
            </a>
          )}
          <button type="button" className="btn-primary btn-sm" onClick={() => goTo('menu')}>
            مشاهده منو
          </button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-amber hover:text-amber lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'بستن منوی ناوبری' : 'باز کردن منوی ناوبری'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* ناوبری موبایل */}
      <div
        id="mobile-navigation"
        ref={panelRef}
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-charcoal/95 px-5 pb-10 pt-6 backdrop-blur-md lg:hidden"
      >
        <nav aria-label="ناوبری موبایل" className="flex flex-col gap-1">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.id);
              }}
              className={cx(
                'flex min-h-[56px] items-center justify-between border-b border-ivory/10 px-1 text-lg font-semibold transition-colors',
                activeSection === item.id ? 'text-amber' : 'text-ivory',
              )}
            >
              {item.label}
              <span aria-hidden="true" className="text-amber/70">
                ↖
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <button type="button" className="btn-primary w-full" onClick={() => goTo('menu')}>
            مشاهده منو
          </button>
          {secondaryNav && (
            <button type="button" className="btn-outline w-full" onClick={() => goTo(secondaryNav.id)}>
              {secondaryNav.label}
            </button>
          )}
          {orderingConfigured && (
            <a href={ordering.url} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
              {ordering.label}
            </a>
          )}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-muted">
          کباب تازه روی زغال، برنج زعفرانی و میزی که برای دورهمی آماده است.
        </p>
      </div>
    </header>
  );
}
