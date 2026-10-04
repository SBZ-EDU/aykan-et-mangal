import { useMemo, useState } from "react";
import { cig, insights, pismis, services, shop, type Item } from "./data";

type CartLine = { id: string; name: string; price: number; display: string; qty: number };

const fa = (n: number) => n.toLocaleString("fa-IR");
const wa = (text: string) => `https://wa.me/${shop.wa}?text=${encodeURIComponent(text)}`;

export default function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const add = (item: Item, qty = 1) => {
    setCart((c) => {
      const ex = c.find((l) => l.id === item.id);
      if (ex) return c.map((l) => (l.id === item.id ? { ...l, qty: l.qty + qty } : l));
      return [...c, { id: item.id, name: `${item.tr} — ${item.fa}`, price: item.price, display: item.display, qty }];
    });
    setToast(`${item.fa} به سفارش اضافه شد`);
    setTimeout(() => setToast(null), 1800);
  };
  const setQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l))));

  const total = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const orderText = useMemo(() => {
    if (!cart.length) return `سلام ${shop.name} 👋\nلطفاً کاتالوگ امروز رو برام بفرستید.`;
    const lines = cart.map((l) => `• ${l.name}\n  ${fa(l.qty)} کیلو × ${l.display} = ${(l.price * l.qty).toFixed(2)} ₺`).join("\n");
    return `سلام ${shop.name} 👋\nسفارش من:\n${lines}\n\nجمع تقریبی: ${total.toFixed(2)} ₺\nنحوه تحویل: پخته / خام (مشخص کنید)\nآدرس: ...`;
  }, [cart, total]);

  return (
    <div className="min-h-screen bg-coal-900 text-stone-100">
      <Nav count={count} onCart={() => setCartOpen(true)} />
      <Hero />
      <Ticker />
      <Services />
      <Catalog onAdd={add} />
      <PromiseBand />
      <Insights />
      <Footer />

      <a
        href={wa(orderText)}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white shadow-xl shadow-green-900/40 transition hover:scale-105"
      >
        <WaIcon /> سفارش واتس‌اپ
      </a>

      {toast && (
        <div className="rise fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-brand px-5 py-2 text-sm font-bold text-white shadow-lg">{toast}</div>
      )}

      {cartOpen && <Cart cart={cart} total={total} setQty={setQty} onClose={() => setCartOpen(false)} orderText={orderText} />}
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav({ count, onCart }: { count: number; onCart: () => void }) {
  const links: [string, string][] = [
    ["#catalog", "کاتالوگ قیمت"],
    ["#promise", "پخت رایگان"],
    ["#ai", "تحلیل هوشمند"],
    ["#contact", "تماس"],
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-coal-900/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand font-display text-xl text-white">A</span>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide text-white">AYKAN ET MANGAL</div>
            <div className="text-[11px] tracking-[.25em] text-brand">TANZİM SATIŞ MAĞAZASI</div>
          </div>
        </a>
        <nav className="hidden gap-7 text-sm text-stone-300 md:flex">
          {links.map(([h, t]) => (
            <a key={h} href={h} className="transition hover:text-brand">
              {t}
            </a>
          ))}
        </nav>
        <button onClick={onCart} className="relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold transition hover:bg-white/10">
          🧾 سفارش
          {count > 0 && <span className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brand text-xs font-black">{fa(count)}</span>}
        </button>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="grain relative overflow-hidden">
      <img src="images/hero.jpg" alt="منقل آیکان" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal-900 via-coal-900/75 to-coal-900/40" />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 md:pt-28">
        <div className="rise max-w-3xl">
          <div className="font-display text-sm tracking-[.35em] text-brand">ET · BALIK · TAVUK · KUZU · MANGAL</div>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] text-white md:text-8xl">
            AYKAN
            <br />
            ET MANGAL
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-200">
            کاتالوگ رسمی <b className="text-white">آیکان ات و منگال</b> در گوزتپه‌ی باجیلار. قیمت‌های کیلوییِ گوشت و مرغ — هم به‌صورت{" "}
            <b className="text-white">خام</b>، هم <b className="text-white">پخته و آماده‌ی منقل</b>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#catalog" className="rounded-full bg-brand px-7 py-3.5 font-black text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark">
              مشاهده قیمت‌های امروز
            </a>
            <a href={wa("سلام AYKAN ET MANGAL 👋 می‌خوام سفارش بدم.")} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-7 py-3.5 font-bold transition hover:bg-white/10">
              📱 {shop.gsm}
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6 text-sm">
            {[
              ["مرغ خام از", "94,99 ₺ / کیلو"],
              ["کباب و گوشت از", "599 ₺ / کیلو"],
              ["پخت روی منقل", "رایگان"],
              ["تلفن سفارش", shop.tel],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-stone-400">{k}</dt>
                <dd className="mt-1 text-xl font-black text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ["🔥 ۱ کیلو خام وزن می‌شود، پخته تحویل داده می‌شود", "🥩 تازه‌ی امروز، نه فریزشده", "🍢 کباب، منگال، ماهی", "🛵 ارسال در گوزتپه و باجیلار", "📱 کاتالوگ واتس‌اپ"];
  return (
    <div className="overflow-hidden bg-brand py-2.5 text-sm font-bold text-white">
      <div className="flex gap-12 whitespace-nowrap px-4">
        {[...items, ...items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.t} className="rounded-2xl border border-white/10 bg-coal-800/70 p-5 transition hover:border-brand/50">
            <div className="text-3xl">{s.icon}</div>
            <h3 className="mt-3 font-black text-white">{s.t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Catalog (price board) ---------------- */
function Catalog({ onAdd }: { onAdd: (i: Item) => void }) {
  const [tab, setTab] = useState<"pismis" | "cig">("pismis");
  const list = tab === "pismis" ? pismis : cig;
  const groups: [Item["group"], string, string][] = [
    ["tavuk", "TAVUK", "مرغ"],
    ["et", "ET & KUZU", "گوشت قرمز و بره"],
  ];

  return (
    <section id="catalog" className="scroll-mt-20 bg-bone py-20 text-stone-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-display text-sm tracking-[.3em] text-brand">
              {tab === "pismis" ? "PİŞMİŞ KİLO FİYATLARIMIZ" : "ÇİĞ KİLO FİYATLARIMIZ"}
            </div>
            <h2 className="mt-2 text-4xl font-black leading-tight md:text-5xl">
              {tab === "pismis" ? "قیمت‌های کیلوییِ پخته" : "قیمت‌های کیلوییِ خام"}
            </h2>
            <p className="mt-3 max-w-lg text-stone-600">
              {tab === "pismis"
                ? "همه‌ی اقلام روی منقل زغالی پخته و گرم تحویل داده می‌شوند. قیمت‌ها به‌ازای هر کیلو است."
                : "گوشت و مرغ تازه، برش‌خورده و تمیزشده، آماده‌ی پخت در خانه. قیمت‌ها به‌ازای هر کیلو است."}
            </p>
          </div>

          <div className="flex w-fit rounded-full border border-stone-300 p-1">
            {([
              ["pismis", "🍛 پخته"],
              ["cig", "🥩 خام"],
            ] as const).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-full px-6 py-2.5 text-sm font-black transition ${tab === k ? "bg-brand text-white" : "text-stone-600 hover:bg-stone-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_330px]">
          {/* price board */}
          <div>
            {groups.map(([g, tr, faName]) => {
              const rows = list.filter((i) => i.group === g);
              if (!rows.length) return null;
              return (
                <div key={g} className="mb-10">
                  <div className="flex items-center gap-4">
                    <h3 className="font-display text-2xl tracking-wide text-brand-dark">{tr}</h3>
                    <span className="text-sm text-stone-500">{faName}</span>
                    <div className="h-px flex-1 bg-brand/25" />
                  </div>
                  <ul>
                    {rows.map((i) => (
                      <li key={i.id} className="flex items-center gap-4 border-b border-stone-300/70 py-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-2xl shadow-sm ring-1 ring-stone-200">{i.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-display text-lg leading-tight tracking-wide text-stone-900">{i.tr}</div>
                          <div className="text-sm text-stone-500">
                            {i.fa}
                            {i.note && <span className="mr-2 rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-bold text-brand">{i.note}</span>}
                          </div>
                        </div>
                        <div className="mx-2 hidden h-px flex-1 border-b border-dotted border-stone-400 sm:block" />
                        <div className="mr-auto text-left sm:mr-0">
                          <div className="whitespace-nowrap text-2xl font-black text-stone-900">{i.display}</div>
                          <div className="text-[11px] text-stone-500">هر کیلو</div>
                        </div>
                        <button
                          onClick={() => onAdd(i)}
                          className="shrink-0 rounded-full border border-brand/30 px-4 py-2 text-sm font-bold text-brand transition hover:bg-brand hover:text-white"
                        >
                          + سفارش
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <p className="text-sm text-stone-500">
              * قیمت‌ها طبق کاتالوگ چاپی فروشگاه ثبت شده‌اند و ممکن است به‌روز شوند. برای قیمت لحظه‌ای در واتس‌اپ پیام بدهید.
            </p>
          </div>

          {/* side panel */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <figure className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl">
              <img src={tab === "pismis" ? "images/pismis.jpg" : "images/cig.jpg"} alt="محصولات آیکان" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-5">
                <div className="font-display text-lg tracking-wide text-stone-900">
                  {tab === "pismis" ? "PİŞMİŞ — آماده‌ی خوردن" : "ÇİĞ — تازه‌ی امروز"}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {tab === "pismis"
                    ? "یک کیلو خام وزن می‌شود، روی منقل پخته و داغ در ظرف تحویل داده می‌شود — بدون هزینه‌ی پخت."
                    : "مرغ و گوشت تازه، همان روز برش می‌خورد. سفارش بالای ۵۰۰ لیر در باجیلار رایگان ارسال می‌شود."}
                </p>
                <a
                  href={wa(tab === "pismis" ? "سلام! قیمت امروز اقلام پخته چنده؟" : "سلام! قیمت امروز اقلام خام چنده؟")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 font-bold text-white"
                >
                  <WaIcon /> استعلام قیمت امروز
                </a>
              </figcaption>
            </figure>

            <div className="mt-4 rounded-3xl border border-stone-200 bg-white p-5">
              <div className="text-xs font-bold tracking-widest text-brand">TELEFON</div>
              <a href={`tel:${shop.tel.replace(/\s/g, "")}`} className="mt-1 block text-2xl font-black text-stone-900 hover:text-brand">
                {shop.tel}
              </a>
              <a href={`tel:${shop.gsm.replace(/\s/g, "")}`} className="mt-1 block text-2xl font-black text-stone-900 hover:text-brand">
                {shop.gsm}
              </a>
              <p className="mt-3 text-sm text-stone-500">{shop.store}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Promise band ---------------- */
function PromiseBand() {
  const steps = [
    ["۱", "انتخاب کنید", "از کاتالوگ خام یا پخته، هر کیلو که می‌خواهید."],
    ["۲", "وزن می‌کنیم", "یک کیلو خام جلوی چشمتان ترازو می‌شود."],
    ["۳", "می‌پزیم", "روی منقل زغالی پخته و گرم تحویل می‌گیرید."],
  ];
  return (
    <section id="promise" className="grain relative scroll-mt-20 overflow-hidden bg-brand py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="font-display text-sm tracking-[.3em] text-white/70">SERVİSİMİZ</div>
        <h2 className="mt-3 font-display text-4xl leading-[1.15] md:text-6xl">1 KİLO ÇİĞ TARTIP PİŞİRİYORUZ</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
          یک کیلو گوشت خام را وزن می‌کنیم، روی منقل زغالی می‌پزیم و آماده‌ی خوردن تحویل می‌دهیم. هزینه‌ی پخت گرفته نمی‌شود —
          شما فقط بهای گوشت خام را می‌پردازید.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-sm">
              <div className="font-display text-4xl text-white/60">{n}</div>
              <h3 className="mt-2 text-xl font-black">{t}</h3>
              <p className="mt-1.5 text-white/85">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI insights ---------------- */
function Insights() {
  return (
    <section id="ai" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
            <span className="h-2 w-2 rounded-full bg-brand" /> تحلیل هوش مصنوعی کاتالوگ
          </div>
          <h2 className="mt-4 text-3xl font-black leading-snug md:text-4xl">
            چهار عکس کاتالوگ را بررسی کردیم؛ این ساختارش است.
          </h2>
          <p className="mt-4 leading-relaxed text-stone-400">
            هوش مصنوعی دو برگه‌ی چاپی را خواند: ۹ قلم «پخته» و ۸ قلم «خام»، با قیمت کیلویی، شماره‌های تماس و QR واتس‌اپ. خروجی همان
            ساختار به‌صورت کاتالوگ دیجیتال بالا پیاده شد.
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              ["۲", "برگه کاتالوگ"],
              ["۱۷", "قلم کالا"],
              ["94–1500 ₺", "بازه قیمت"],
            ].map(([v, k]) => (
              <div key={k} className="rounded-2xl border border-white/10 bg-coal-800 p-3">
                <dd className="text-lg font-black text-white">{v}</dd>
                <dt className="mt-1 text-xs text-stone-400">{k}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {insights.map((s) => (
            <article key={s.t} className="rounded-3xl border border-white/10 bg-coal-800 p-6 transition hover:border-brand/40">
              <div className="font-display text-2xl text-brand">✦</div>
              <h3 className="mt-2 text-lg font-black text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cart ---------------- */
function Cart({ cart, total, setQty, onClose, orderText }: { cart: CartLine[]; total: number; setQty: (id: string, q: number) => void; onClose: () => void; orderText: string }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <aside onClick={(e) => e.stopPropagation()} className="flex h-full w-full max-w-md flex-col bg-coal-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h3 className="text-xl font-black">سفارش شما 🧾</h3>
          <button onClick={onClose} className="rounded-full bg-white/10 px-3 py-1">✕</button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {cart.length === 0 && (
            <div className="py-12 text-center text-stone-400">
              <div className="text-4xl">🍢</div>
              <p className="mt-3">هنوز چیزی انتخاب نکرده‌اید. از کاتالوگ شروع کنید.</p>
            </div>
          )}
          {cart.map((l) => (
            <div key={l.id} className="rounded-2xl bg-black/30 p-3">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="text-sm font-bold leading-snug">{l.name}</div>
                  <div className="text-xs text-stone-400">{l.display} / کیلو</div>
                </div>
                <div className="text-sm font-black">{(l.price * l.qty).toFixed(2)} ₺</div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Stepper v={l.qty} set={(v) => setQty(l.id, v)} />
                <span className="text-xs text-stone-400">کیلو</span>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t border-white/10 p-5">
          <div className="flex justify-between text-lg font-black">
            <span>جمع تقریبی</span>
            <span>{total.toFixed(2)} ₺</span>
          </div>
          <a href={wa(orderText)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-black text-white">
            <WaIcon /> ارسال سفارش در واتس‌اپ
          </a>
          <details className="text-xs text-stone-400">
            <summary className="cursor-pointer">پیش‌نمایش پیام</summary>
            <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-black/40 p-3 font-sans">{orderText}</pre>
          </details>
        </div>
      </aside>
    </div>
  );
}

function Stepper({ v, set }: { v: number; set: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/5 p-1" dir="ltr">
      <button onClick={() => set(Math.max(0, v - 1))} className="h-8 w-8 rounded-full font-black hover:bg-white/10">−</button>
      <span className="w-8 text-center text-sm font-bold">{fa(v)}</span>
      <button onClick={() => set(v + 1)} className="h-8 w-8 rounded-full bg-brand/80 font-black hover:bg-brand">+</button>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-white/10 bg-coal-800/50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="font-display text-3xl text-white">AYKAN ET MANGAL</div>
            <div className="mt-1 text-sm tracking-[.25em] text-brand">TANZİM SATIŞ MAĞAZASI</div>
            <p className="mt-5 leading-relaxed text-stone-300">{shop.addressFa}</p>
            <p className="mt-1 text-sm text-stone-500" dir="ltr">
              {shop.address}
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl">
              <img src="images/shop.jpg" alt="فروشگاه آیکان" className="h-40 w-full object-cover" />
            </div>
          </div>

          <div>
            <h4 className="font-black text-white">تماس و سفارش</h4>
            <a href={`tel:${shop.tel.replace(/\s/g, "")}`} className="mt-4 block text-2xl font-black text-stone-100 hover:text-brand" dir="ltr">
              {shop.tel}
            </a>
            <a href={`tel:${shop.gsm.replace(/\s/g, "")}`} className="mt-1 block text-2xl font-black text-stone-100 hover:text-brand" dir="ltr">
              {shop.gsm}
            </a>
            <a
              href={wa("سلام AYKAN ET MANGAL 👋")}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-bold text-white"
            >
              <WaIcon /> چت واتس‌اپ
            </a>
            <p className="mt-4 text-sm text-stone-400">QR کاتالوگ چاپی به همین شماره وصل است.</p>
          </div>

          <div>
            <h4 className="font-black text-white">ساعت کاری</h4>
            <ul className="mt-4 space-y-2 text-sm text-stone-300">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>شنبه تا پنج‌شنبه</span>
                <span className="font-bold">۰۹:۰۰ – ۲۳:۰۰</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>جمعه</span>
                <span className="font-bold">۱۳:۰۰ – ۲۳:۰۰</span>
              </li>
            </ul>
            <h4 className="mt-6 font-black text-white">دسته‌بندی</h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-400">گوشت · ماهی · مرغ · بره · منگال · کباب · کوفته قصابی</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-stone-500">
          © ۲۰۲۶ AYKAN ET MANGAL — Göztepe / Bağcılar · قیمت‌ها به‌ازای هر کیلو و به لیر ترکیه است.
        </div>
      </div>
    </footer>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a7.6 7.6 0 0 1-3.8-3.3c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4a3.3 3.3 0 0 0-1 2.5c0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
