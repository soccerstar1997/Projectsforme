import { DishDialogProvider } from './components/menu/DishDialogProvider';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { SignatureDishes } from './components/sections/SignatureDishes';
import { MenuSection } from './components/sections/MenuSection';
import { CharcoalArt } from './components/sections/CharcoalArt';
import { Experience } from './components/sections/Experience';
import { ServingMoment } from './components/sections/ServingMoment';
import { Hospitality } from './components/sections/Hospitality';
import { Testimonials } from './components/sections/Testimonials';
import { Gallery } from './components/sections/Gallery';
import { ReservationCta } from './components/sections/ReservationCta';
import { ContactFooter } from './components/sections/ContactFooter';

/**
 * صفحهٔ اصلی مستر کباب — به ترتیب روایت:
 * ۱) هدر سینمایی ۲) وعده‌های برند ۳) انتخاب‌های ویژه ۴) منوی کامل
 * ۵) هنر کباب ۶) تجربهٔ رستوران ۷) لحظهٔ سرو ۸) مهمان‌نوازی
 * ۹) تجربهٔ مشتریان ۱۰) گالری ۱۱) سفارش/رزرو ۱۲) تماس و پاورقی
 */
export default function App() {
  return (
    <DishDialogProvider>
      <a href="#menu" className="skip-link">
        پرش به منوی غذا
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Highlights />
        <SignatureDishes />
        <MenuSection />
        <CharcoalArt />
        <Experience />
        <ServingMoment />
        <Hospitality />
        <Testimonials />
        <Gallery />
        <ReservationCta />
      </main>
      <ContactFooter />
    </DishDialogProvider>
  );
}
