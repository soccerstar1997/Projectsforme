import { useEffect, useState } from 'react';

/** شناسهٔ بخش فعال صفحه (برای مشخص‌کردن آیتم فعال در ناوبری) */
export function useScrollSpy(ids: string[], offset = 140): string {
  const [active, setActive] = useState(ids[0] ?? '');
  /* کلید پایدار: با هر رندر دوباره به رویدادها وصل نمی‌شویم */
  const idsKey = ids.join('|');

  useEffect(() => {
    const sectionIds = idsKey.split('|').filter(Boolean);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (sections.length === 0) return;

    const update = () => {
      const scrollY = window.scrollY;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop - offset <= scrollY) current = section.id;
      }
      /* در انتهای صفحه، آخرین بخش فعال می‌شود */
      if (window.innerHeight + scrollY >= document.body.scrollHeight - 8) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [idsKey, offset]);

  return active;
}
