export type Item = {
  id: string;
  tr: string;
  fa: string;
  price: number;
  display: string;
  group: "tavuk" | "et";
  emoji: string;
  note?: string;
};

/* ---- 1. sayfa: PİŞMİŞ KİLO FİYATLARIMIZ (پخته، هر کیلو) ---- */
export const pismis: Item[] = [
  { id: "p-kanat", tr: "TAVUK KANAT", fa: "بال مرغ کبابی", price: 300, display: "300 ₺", group: "tavuk", emoji: "🍗", note: "۱ کیلو خام وزن می‌شود" },
  { id: "p-pirzola", tr: "TAVUK PİRZOLA", fa: "کتف‌بازوی مرغ", price: 250, display: "250 ₺", group: "tavuk", emoji: "🍖" },
  { id: "p-sis", tr: "TAVUK ŞİŞ", fa: "سیخ مرغ", price: 200, display: "200 ₺", group: "tavuk", emoji: "🍢", note: "پرفروش‌ترین" },
  { id: "p-kofte", tr: "TAVUK KÖFTE", fa: "کوفته مرغ", price: 200, display: "200 ₺", group: "tavuk", emoji: "🧆" },
  { id: "p-citir", tr: "TAVUK ÇITIR", fa: "مرغ سوخاری", price: 200, display: "200 ₺", group: "tavuk", emoji: "🍗" },
  { id: "p-baget", tr: "TAVUK BAGET", fa: "بشقاب مرغ", price: 200, display: "200 ₺", group: "tavuk", emoji: "🍗" },
  { id: "p-kuzu", tr: "KUZU PİRZOLA", fa: "استیک دنده بره", price: 1500, display: "1500 ₺", group: "et", emoji: "🥩", note: "گران‌ترین آیتم" },
  { id: "p-antrikot", tr: "ANTRİKOT", fa: "آنتریکوت گاو", price: 1400, display: "1400 ₺", group: "et", emoji: "🥩" },
  { id: "p-kasap", tr: "KASAP KÖFTE", fa: "کوفته قصابی", price: 700, display: "700 ₺", group: "et", emoji: "🧆", note: "دستور خانوادگی" },
];

/* ---- 2. sayfa: ÇİĞ KİLO FİYATLARIMIZ (خام، هر کیلو) ---- */
export const cig: Item[] = [
  { id: "c-butun", tr: "BÜTÜN TAVUK KANATSIZ", fa: "مرغ کامل بدون بال", price: 94.99, display: "94,99 ₺", group: "tavuk", emoji: "🐔" },
  { id: "c-but", tr: "TAVUK BUT", fa: "ران مرغ", price: 94.99, display: "94,99 ₺", group: "tavuk", emoji: "🍗" },
  { id: "c-baget", tr: "TAVUK BAGET", fa: "بشقاب مرغ", price: 114.99, display: "114,99 ₺", group: "tavuk", emoji: "🍗" },
  { id: "c-pirzola", tr: "TAVUK PİRZOLA", fa: "کتف‌بازوی مرغ", price: 134.99, display: "134,99 ₺", group: "tavuk", emoji: "🍖" },
  { id: "c-bonfile", tr: "TAVUK BONFİLE", fa: "فیله سینه مرغ", price: 159.99, display: "159,99 ₺", group: "tavuk", emoji: "🥩", note: "گران‌ترین مرغ" },
  { id: "c-dos", tr: "DANA DÖŞ SARMA", fa: "گوشت سینه گوساله رولی", price: 599, display: "599,00 ₺", group: "et", emoji: "🥩" },
  { id: "c-kasap", tr: "KASAP KÖFTE", fa: "کوفته قصابی آماده", price: 650, display: "650,00 ₺", group: "et", emoji: "🧆", note: "آماده کباب" },
  { id: "c-kusbas", tr: "DANA KUŞBAŞI", fa: "گوشت خورشتی گوساله", price: 899.99, display: "899,99 ₺", group: "et", emoji: "🥩" },
];

export const shop = {
  name: "AYKAN ET MANGAL",
  faName: "آیکان ات و منگال",
  tagline: "ET · BALIK · TAVUK · KUZU · MANGAL",
  tel: "0212 445 34 72",
  gsm: "0537 732 52 69",
  wa: "905377325269",
  address: "Göztepe Mahallesi Maslak Caddesi No:95/A Bağcılar / İST.",
  addressFa: "گوزتپه، خیابان ماسلاک، پلاک ۹۵/A — باجیلار، استانبول",
  store: "Tanzim Satış Mağazası (Göztepe / Bağcılar)",
  promise: "1 KİLO ÇİĞ TARTIP PİŞİRİYORUZ",
};

export const insights = [
  { t: "۲ برگه، ۱۷ قلم کالا", d: "کاتالوگ به دو دسته‌ی کامل تقسیم شده: «پخته» (۹ قلم) و «خام» (۸ قلم) — ساختاری که هم فروش فوری را می‌گیرد، هم خرید خانگی." },
  { t: "قیمت‌گذاری کیلویی شفاف", d: "همه‌ی قیمت‌ها «هر کیلو» هستند و اعشار ترکی (94,99 ₺) رعایت شده؛ این اعتمادسازترین نوع قیمت‌گذاری در محله است." },
  { t: "شکاف قیمت پخته/خام = سود خدمات", d: "مثلاً کوفته قصابی خام 650 ₺ اما پخته 700 ₺؛ یعنی پخت و سرو یک سرویس درآمدزا کنار محصول است." },
  { t: "دامنه‌ی قیمت ۹۵ تا ۱۵۰۰ ₺", d: "مرغ اقتصادی ورودی ارزان می‌سازد، گوشت قرمز حاشیه‌ی سود را بالا می‌برد. قیمت‌ها را این‌طوری بچینید." },
];

export const services = [
  { icon: "🔥", t: "پخت رایگان", d: "۱ کیلو خام وزن می‌شود، روی منقل پخته تحویل می‌گیرید." },
  { icon: "🛵", t: "ارسال در باجیلار", d: "گوزتپه و محله‌های اطراف، سفارش بالای ۵۰۰ ₺ رایگان." },
  { icon: "📱", t: "سفارش واتس‌اپ", d: "QR کاتالوگ یا شماره 0537 732 52 69 — کاتالوگ در چت." },
  { icon: "🧊", t: "تازه، نه فریزشده", d: "هر روز صبح از کشتارگاه مجاز، همان روز برش و چرخ می‌شود." },
];
