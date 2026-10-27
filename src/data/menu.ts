/*
 * 🍽 منوی مستر کباب — دادهٔ نمونه و «قابل ویرایش»
 * ---------------------------------------------------------------------------
 * ⚠️ مهم: قیمت‌ها و آیتم‌های این فایل دادهٔ نمونه برای راه‌اندازی سایت هستند و
 * قیمت رسمی رستوران محسوب نمی‌شوند. هر آیتم `priceVerified: false` دارد و
 * سایت هم با برچسب «قیمت نمونه» این را به کاربر می‌گوید. پس از تأیید منو و
 * قیمت‌ها توسط رستوران:
 *   ۱) مقادیر این فایل را به‌روز کنید،
 *   ۲) برای آیتم‌های تأییدشده `priceVerified: true` بگذارید،
 *   ۳) متن `sampleMenuNotice` را حذف کنید.
 * دسته‌هایی که رستوران ارائه نمی‌دهد را از آرایهٔ menuCategories بردارید.
 */
import { signatureImages } from './media';

export type CategoryId = 'kabab' | 'jujeh' | 'special' | 'rice' | 'appetizer' | 'drinks';

export type MenuCategory = {
  id: CategoryId;
  title: string;
  description: string;
};

export type Dish = {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  /** قیمت به تومان — دادهٔ نمونه */
  price: number;
  /** false یعنی «قیمت نمونه، در انتظار تأیید رستوران» */
  priceVerified: boolean;
  available: boolean;
  image?: string;
  imageAlt?: string;
  /** همراه‌های همیشگی غذا (دادهٔ نمونه) */
  servedWith?: string[];
  /** برچسب‌هایی مثل «بدون گلوتن» — فقط پس از تأیید رستوران پر شود */
  tags?: string[];
};

export const menuCategories: MenuCategory[] = [
  { id: 'kabab', title: 'کباب‌ها', description: 'کباب‌های زغالی با گوشت تازه و ادویه‌های ایرانی' },
  { id: 'jujeh', title: 'جوجه‌کباب', description: 'مرغ زعفرانی و آبدار، کباب‌شده روی حرارت ملایم' },
  { id: 'special', title: 'غذاهای مخصوص', description: 'انتخاب‌های ویژهٔ مستر کباب' },
  { id: 'rice', title: 'چلو و مخلفات', description: 'برنج ایرانی و همراه‌های کنار غذا' },
  { id: 'appetizer', title: 'پیش‌غذا', description: 'شروع دلچسب وعده' },
  { id: 'drinks', title: 'نوشیدنی‌ها', description: 'نوشیدنی‌های خنک و گرم' },
];

export const dishes: Dish[] = [
  {
    id: 'koobideh',
    image: signatureImages.koobideh,
    imageAlt: 'کباب کوبیده روی سیخ در حال کباب‌شدن روی زغال',
    categoryId: 'kabab',
    name: 'کباب کوبیده',
    description:
      'گوشت چرخ‌کردهٔ تازه با پیاز و ادویه‌های ایرانی، کباب‌شده روی زغال؛ ساده، آبدار و خوش‌عطر.',
    price: 285000,
    priceVerified: false,
    available: true,
    servedWith: ['نان تازه', 'گوجهٔ کبابی'],
  },
  {
    id: 'barg',
    image: signatureImages.barg,
    imageAlt: 'سیخ‌های کباب روی حرارت زغال با دود ملایم',
    categoryId: 'kabab',
    name: 'کباب برگ',
    description:
      'راسته‌های نازک گوشت با حرارت زغال، طعمی که در هر لقمه عمیق‌تر می‌شود.',
    price: 420000,
    priceVerified: false,
    available: true,
    servedWith: ['نان تازه', 'گوجهٔ کبابی'],
  },
  {
    id: 'sultani',
    image: signatureImages.sultani,
    imageAlt: 'پرس کباب سلطانی همراه برنج زعفرانی و گوجهٔ کبابی',
    categoryId: 'kabab',
    name: 'کباب سلطانی',
    description: 'ترکیب کوبیده و برگ در یک پرس؛ برای وقتی که هوس هر دو را دارید.',
    price: 560000,
    priceVerified: false,
    available: true,
    servedWith: ['برنج زعفرانی', 'گوجهٔ کبابی'],
  },
  {
    id: 'bakhtiari',
    categoryId: 'kabab',
    name: 'کباب بختیاری',
    description: 'تکه‌های گوشت و مرغ در کنار هم روی یک سیخ؛ رنگ، عطر و طعم متنوع.',
    price: 480000,
    priceVerified: false,
    available: false,
    servedWith: ['برنج زعفرانی', 'گوجهٔ کبابی'],
  },
  {
    id: 'jujeh-saffron',
    categoryId: 'jujeh',
    name: 'جوجه‌کباب زعفرانی',
    description:
      'مرغ مزه‌دارشده با زعفران و آبلیمو، کباب‌شده تا لحظه‌ای که آبدار و طلایی بماند.',
    price: 320000,
    priceVerified: false,
    available: true,
    image: signatureImages.jujeh,
    imageAlt: 'جوجه‌کباب زعفرانی همراه برنج و مخلفات روی میز',
    servedWith: ['برنج زعفرانی', 'گوجهٔ کبابی'],
  },
  {
    id: 'jujeh-bone',
    categoryId: 'jujeh',
    name: 'جوجه‌کباب با استخوان',
    description: 'جوجهٔ زعفرانی با استخوان؛ طعمی نزدیک به کباب‌های خانگی و خاطره‌ساز.',
    price: 340000,
    priceVerified: false,
    available: true,
    servedWith: ['برنج زعفرانی', 'گوجهٔ کبابی'],
  },
  {
    id: 'jujeh-garlic',
    categoryId: 'jujeh',
    name: 'جوجه‌کباب سیر و لیمو',
    description: 'مرغ با سیر تازه و لیمو، برای کسانی که طعم‌های روشن‌تر را دوست دارند.',
    price: 330000,
    priceVerified: false,
    available: false,
    servedWith: ['برنج زعفرانی'],
  },
  {
    id: 'kabab-rice-double',
    categoryId: 'special',
    name: 'دو سیخ کوبیده با برنج زعفرانی',
    description: 'وعدهٔ پرپرس برای دورهمی؛ دو سیخ کوبیده و برنج ایرانی زعفرانی.',
    price: 520000,
    priceVerified: false,
    available: true,
    servedWith: ['کره', 'گوجهٔ کبابی', 'سبزی خوردن'],
  },
  {
    id: 'baghali-polo',
    categoryId: 'special',
    name: 'باقالی‌پلو با ماهیچه',
    description: 'برنج باقالی‌پلو با ماهیچهٔ نرم؛ انتخابی گرم و کامل برای وعدهٔ اصلی.',
    price: 640000,
    priceVerified: false,
    available: true,
    servedWith: ['ماست و خیار'],
  },
  {
    id: 'zereshk-polo',
    categoryId: 'special',
    name: 'زرشک‌پلو با مرغ',
    description: 'مرغ زعفرانی در کنار برنج زرشک‌پلو؛ ترکیبی آشنا که همیشه جواب می‌دهد.',
    price: 430000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'saffron-rice',
    categoryId: 'rice',
    name: 'چلوی زعفرانی',
    description: 'برنج ایرانی دم‌کشیده با زعفران و کره؛ ساده، خوش‌عطر و همراه همیشگی کباب.',
    price: 130000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'plain-rice',
    categoryId: 'rice',
    name: 'چلوی ساده',
    description: 'برنج ایرانی دم‌کشیده، برای وقتی که می‌خواهید کباب را با برنج ساده بخورید.',
    price: 95000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'grilled-veg',
    categoryId: 'rice',
    name: 'گوجه و فلفل کبابی',
    description: 'مخلفات کبابی روی زغال؛ مکمل دودی و خوش‌رنگ کنار کباب.',
    price: 85000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'mirza-ghasemi',
    categoryId: 'appetizer',
    name: 'میرزاقاسمی',
    description: 'بادمجان کبابی با سیر و گوجه؛ پیش‌غذایی دودی که اشتها را بیدار می‌کند.',
    price: 165000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'kashk-bademjan',
    categoryId: 'appetizer',
    name: 'کشک بادمجان',
    description: 'بادمجان کبابی با کشک و نعنا داغ؛ کلاسیک و دلچسب.',
    price: 175000,
    priceVerified: false,
    available: false,
  },
  {
    id: 'salad-shirazi',
    categoryId: 'appetizer',
    name: 'سالاد شیرازی',
    description: 'خیار، گوجه و پیاز خردشده با آبلیمو و نعنا خشک؛ خنک و تازه.',
    price: 120000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'yogurt-cucumber',
    categoryId: 'appetizer',
    name: 'ماست و خیار',
    description: 'ماست خنک با خیار و نعنا؛ آرام‌کنندهٔ طعم گرم کباب.',
    price: 95000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'doogh',
    categoryId: 'drinks',
    name: 'دوغ سنتی',
    description: 'دوغ خانگی با نعنا؛ همراه همیشگی کباب در سفرهٔ ایرانی.',
    price: 55000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'lemonade',
    categoryId: 'drinks',
    name: 'لیموناد تازه',
    description: 'لیموی تازه با یخ و نعنا؛ ترش و خنک برای روزهای گرم.',
    price: 68000,
    priceVerified: false,
    available: true,
  },
  {
    id: 'tea',
    categoryId: 'drinks',
    name: 'چای سیاه با نبات',
    description: 'چای پررنگ ایرانی با نبات؛ پایان دلچسب یک وعدهٔ کباب.',
    price: 45000,
    priceVerified: false,
    available: true,
  },
];

/** انتخاب‌های ویژهٔ بخش «پیشنهاد مستر کباب» */
export const signatureDishIds = ['koobideh', 'jujeh-saffron', 'barg', 'sultani'] as const;

export const sampleMenuNotice =
  'منوی زیر دادهٔ نمونه و آمادهٔ ویرایش است؛ قیمت‌ها در انتظار تأیید رستوران هستند.';

export function getDish(id: string): Dish | undefined {
  return dishes.find((dish) => dish.id === id);
}

export function getCategoryTitle(id: CategoryId): string {
  return menuCategories.find((category) => category.id === id)?.title ?? '';
}
