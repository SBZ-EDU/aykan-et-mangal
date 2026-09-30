// AYKAN ET & MANGAL — Telegram Bot 24/7 on Cloudflare Worker
// پورت کامل ربات پایتون: منو، سبد، سفارش، B2B، ادمین، لیدبوک، پست خودکار کانال
// توکن از D1 (social_config.tg.token) خوانده می‌شود — تعویض توکن از پنل، بدون دیپلوی
const DATA = __DATA__;

const PANEL_URL = "https://aykan-panel.elasa2next.workers.dev";
const PANEL_SECRET = "__PANEL_SECRET__";
const HOOK_SECRET = "__HOOK_SECRET__";
const HOOK_PATH = "/hook-__HOOK_SECRET__";
const HOOK_URL = "https://aykan-tgbot.elasa2next.workers.dev/hook-__HOOK_SECRET__";
const ADMIN_PIN = "__ADMIN_PIN__";
const OWNER_WA = "905377325269";
const SITE_URL = "https://aykan-hizli.elasa2next.workers.dev";
const CHANNEL_URL = "https://t.me/AykanEtmangal_shopping";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Aykan+Et+Mangal+G%C3%B6ztepe+Ba%C4%9Fc%C4%B1lar";
const OFFER_SLOT = "09:00";
const DEFAULT_INTERVAL = 3;
var PHOTOS = {
  kemikli: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/kemikli.jpg",
  kusbasi: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/kusbasi.jpg",
  antrikot: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/antrikot.jpg",
  kuzu: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/kuzu.jpg",
  pirzola: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/pirzola.jpg",
  mangal: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/mangal.jpg",
  tortilla: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/tortilla.jpg",
  aile: "https://sbz-edu.github.io/aykan-et-mangal/assets/foods/aile.jpg"
};
const PDF_URL = "https://sbz-edu.github.io/aykan-et-mangal/brosur/aykan_fiyat_brosuru_baski.pdf";

let SIM = null; // حالت شبیه‌سازی تست

// ---------- ابزار ----------
function fmtTL(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function fmt(s) {
  var a = arguments, i = 0;
  return String(s).replace(/\{(\d*)\}/g, function (m, g) {
    var idx = g === "" ? i++ : +g;
    var v = a[idx + 1];
    return (v === undefined || v === null) ? "" : String(v);
  });
}
function esc(s) { return String(s == null ? "" : s); }
function digits(p) { return String(p || "").replace(/\D/g, ""); }
function faDig(p) {
  var fa = "۰۱۲۳۴۵۶۷۸۹", ar = "٠١٢٣٤٥٦٧٨٩", out = "";
  p = String(p || "");
  for (var i = 0; i < p.length; i++) {
    var f = fa.indexOf(p[i]), a = ar.indexOf(p[i]);
    out += (f >= 0 ? String(f) : (a >= 0 ? String(a) : p[i]));
  }
  return out;
}
function normPhone(p) {
  var d = digits(faDig(p));
  if (!d) return "";
  if (d.indexOf("90") === 0) return d;
  if (d.indexOf("0") === 0) return "90" + d.slice(1);
  if (d.indexOf("5") === 0) return "90" + d;
  return d;
}
function tx(lang, key) {
  var d = (DATA.T[lang] || {})[key];
  if (d === undefined) return "";
  var args = [d];
  for (var i = 2; i < arguments.length; i++) args.push(arguments[i]);
  return fmt.apply(null, args);
}

var _CFG = {};  // کش درون‌آیزول — D1 فقط هر ۳۰ ثانیه
async function getSetting(env, key) {
  var hit = _CFG[key];
  if (hit && Date.now() - hit.t < 30000) return hit.v;
  var r = await env.DB.prepare("SELECT value FROM settings WHERE key=?").bind(key).first();
  var v = null;
  if (r && r.value) { try { v = JSON.parse(r.value); } catch (e) {} }
  _CFG[key] = { t: Date.now(), v: v };
  return v;
}
async function setSetting(env, key, val) {
  await env.DB.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value")
    .bind(key, JSON.stringify(val)).run();
  _CFG[key] = { t: Date.now(), v: val };
}
async function getBotState(env) {
  var st = await getSetting(env, "bot_state");
  if (!st) st = {};
  if (!st.posted) st.posted = {};
  if (typeof st.counter !== "number") st.counter = 0;
  if (st.paused !== true) st.paused = false;
  if (typeof st.interval !== "number" || !st.interval) st.interval = DEFAULT_INTERVAL;
  if (!st.channel) st.channel = "@AykanEtmangal_shopping";
  if (!st.admin_chat) st.admin_chat = null;
  return st;
}
async function getToken(env) {
  var c = await getSetting(env, "social_config");
  return (c && c.tg && c.tg.token) || "";
}
async function tg(env, method, payload) {
  if (SIM) { SIM.push({ method: method, payload: payload }); return { ok: true, result: { message_id: SIM.length } }; }
  var tok = await getToken(env);
  if (!tok) return { ok: false, description: "no-token" };
  try {
    var r = await fetch("https://api.telegram.org/bot" + tok + "/" + method, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload)
    });
    return await r.json();
  } catch (e) { return { ok: false, description: String(e).slice(0, 200) }; }
}
async function send(env, chatId, text, kb) {
  var p = { chat_id: chatId, text: String(text).slice(0, 4000) };
  if (kb) p.reply_markup = { inline_keyboard: kb };
  return tg(env, "sendMessage", p);
}
async function cbAns(env, cbId, text) {
  try { await tg(env, "answerCallbackQuery", { callback_query_id: cbId, text: text || "" }); } catch (e) {}
}
async function notifyAdmin(env, text, kb) {
  var st = await getBotState(env);
  if (st.admin_chat) await send(env, st.admin_chat, text, kb);
}
async function socialFanout(env, text) {
  try {
    await fetch(PANEL_URL + "/api/social/autopost", {
      method: "POST", headers: { "content-type": "application/json", "x-panel-secret": PANEL_SECRET },
      body: JSON.stringify({ text: String(text).slice(0, 3500) })
    });
  } catch (e) {}
}

// ---------- وضعیت چت در D1 ----------
async function getChat(env, cid) {
  var r = await env.DB.prepare("SELECT data FROM bot_chats WHERE chat_id=?").bind(cid).first();
  if (r && r.data) { try { return JSON.parse(r.data); } catch (e) {} }
  return { cart: {}, mode: null, order: {}, lang: null };
}
async function saveChat(env, cid, c) {
  c.ts = Date.now();
  await env.DB.prepare("INSERT INTO bot_chats (chat_id, data) VALUES (?, ?) ON CONFLICT(chat_id) DO UPDATE SET data=excluded.data")
    .bind(cid, JSON.stringify(c)).run();
}
function getLangOf(c, frm) {
  if (c && c.lang) return c.lang;
  if (frm && frm.language_code) {
    var lc = String(frm.language_code).slice(0, 2);
    if (lc === "tr" || lc === "en" || lc === "fa") return lc;
  }
  return "tr";
}

// ---------- کیبوردها ----------
function kbLang() {
  return [["tr", "en", "fa"].map(function (c) { return { text: DATA.LANG_NAMES[c], callback_data: "lang:" + c }; })];
}
function kbMain(lang) {
  var k = (DATA.T[lang] || {}).kb || {};
  return [
    [{ text: k.menu || "🥩 Menü", callback_data: "menu" }, { text: k.paket || "📦 Paket", callback_data: "paket" }],
    [{ text: k.sepet || "🛒 Sepet", callback_data: "sepet" }, { text: k.b2b || "🏢 Toptan", callback_data: "b2b" }],
    [{ text: k.sube || "📍 Şubeler", callback_data: "sube" }, { text: k.iletisim || "📞 İletişim", callback_data: "iletisim" }],
    [{ text: "🛒 Web Sipariş", web_app: { url: SITE_URL } }, { text: "📷 Galeri", callback_data: "galeri" }],
    [{ text: k.site || "🌐 Site", url: SITE_URL }, { text: "💬 WhatsApp", url: "https://wa.me/" + OWNER_WA }],
    [{ text: k.kanal || "📢 Kanal", url: CHANNEL_URL }, { text: k.harita || "🗺 Harita", url: MAPS_URL }],
    [{ text: L(lang, "📋 Siparişlerim", "📋 My Orders", "📋 سفارش‌های من"), callback_data: "siparislerim" }, { text: L(lang, "❓ SSS", "❓ FAQ", "❓ سوالات"), callback_data: "sss" }],
    [{ text: "📤 " + L(lang, "Paylaş", "Share", "اشتراک"), callback_data: "paylas" }, { text: "🌐 " + DATA.LANG_NAMES[lang], callback_data: "langpick" }]
  ];
}
function kbMenu(lang) {
  var k = DATA.T[lang] || {};
  var btns = DATA.MENU.filter(function (m) { return _STK[m.id] !== false; }).map(function (m) {
    var nm = String(m.name[lang]); if (nm.length > 16) nm = nm.slice(0, 15) + "…";
    return { text: nm + " " + m.price + "₺" + (_OV[m.id] ? "🔥" : ""), callback_data: "pick:" + m.id };
  });
  var rows = [];
  for (var i = 0; i < btns.length; i += 2) rows.push(btns.slice(i, i + 2));
  rows.push([{ text: "🔥 " + L(lang, "Günün Fiyatı", "Today's Special", "قیمت امروز"), callback_data: "gununfiyati" }, { text: "📄 PDF Fiyat Listesi", url: PDF_URL }]);
  rows.push([{ text: "🛒 " + ((k.kb || {}).sepet || "Sepet"), callback_data: "sepet" }]);
  rows.push([{ text: k.home || "🏠 Ana Menü", callback_data: "home" }]);
  return rows;
}
function kbQty(item, lang) {
  var u = item.unit[lang];
  var opts = ["kemikli", "kusbasi", "antrikot", "kuzu", "pirzola"].indexOf(item.id) >= 0 ? [0.5, 1, 2, 5, 10] : [1, 2, 3, 5, 10];
  var rows = [opts.map(function (o) { return { text: o + " " + u, callback_data: "qty:" + item.id + ":" + o }; })];
  rows.push([{ text: "📸 Fotoğraf & Fiyatlar", url: SITE_URL }]);
  rows.push([{ text: "⬅️ " + ((DATA.T[lang] || {}).kb || {}).menu, callback_data: "menu" }]);
  return rows;
}
function kbCart(c, lang) {
  var k = DATA.T[lang] || {};
  var rows = kbCartItems(c, lang);
  rows.push([{ text: k.checkout || "✅ Siparişi Tamamla", callback_data: "checkout" }]);
  rows.push([{ text: k.clear || "🗑 Temizle", callback_data: "clear" }, { text: k.continue || "➕ Devam", callback_data: "menu" }]);
  return rows;
}
function kbCartItems(c, lang) {
  var rows = [], cart = c.cart || {}, ids = Object.keys(cart);
  for (var i = 0; i < Math.min(ids.length, 6); i++) {
    var m = menuById(ids[i]); if (!m) continue;
    var nm = String(m.name[lang]); if (nm.length > 18) nm = nm.slice(0, 17) + "…";
    rows.push([
      { text: "➖", callback_data: "dec:" + ids[i] },
      { text: nm + " ×" + cart[ids[i]], callback_data: "noop" },
      { text: "➕", callback_data: "inc:" + ids[i] },
      { text: "🗑", callback_data: "del:" + ids[i] }
    ]);
  }
  return rows;
}

// ---------- متن‌ها ----------
function cartText(c, lang) {
  var cart = c.cart || {};
  if (!Object.keys(cart).length) return { text: tx(lang, "cart_empty"), kb: kbMenu(lang) };
  var cur = lang === "fa" ? "لیر" : "TL";
  var lines = [tx(lang, "cart_title")];
  var total = 0;
  for (var id in cart) {
    var m = menuById(id); if (!m) continue;
    var t = Math.round(m.price * cart[id]);
    total += t;
    lines.push("• " + m.name[lang] + " × " + cart[id] + " " + m.unit[lang] + " = " + fmtTL(t) + " " + cur);
  }
  lines.push(tx(lang, "cart_total", fmtTL(total)));
  lines.push(tx(lang, "checkout_hint"));
  if (!cart.kuzu) lines.push(L(lang, "💡 Öneri: Kuzu Pirzola (pişmiş) 1500 TL/kg denediniz mi?", "💡 Suggestion: cooked Lamb Chops 1500 TL/kg — tried them yet?", "💡 پیشنهاد: کوزو پیرزولای پخته ۱۵۰۰ لیر — امتحان کردید؟"));
  return { text: lines.join("\n"), kb: kbCart(c, lang) };
}
var _OV = {}, _STK = {};
async function loadShopState(env) {
  _OV = (await getSetting(env, "price_overrides")) || {};
  _STK = (await getSetting(env, "stock")) || {};
}
function menuById(id) {
  for (var i = 0; i < DATA.MENU.length; i++) if (DATA.MENU[i].id === id) {
    var m = DATA.MENU[i];
    if (_OV[id]) m = Object.assign({}, m, { price: _OV[id] });
    return m;
  }
  return null;
}
function b2bText(lang) {
  var lines = [tx(lang, "b2b_title")];
  for (var cat in DATA.PACKAGE_CATALOG) {
    lines.push("▸ " + (DATA.CAT_TR[cat] || cat) + ":");
    (DATA.PACKAGE_CATALOG[cat] || []).forEach(function (p) {
      lines.push(tx(lang, "b2b_min", p.name, p.discount, p.minLabel));
    });
  }
  return lines.join("\n");
}

// ---------- هلپرهای جدید (سه‌زبانه) ----------
function L(lang, tr, en, fa) { return lang === "en" ? en : (lang === "fa" ? fa : tr); }
var BOT_URL = "https://t.me/AykanEtmangal_shapping_bot";
function faqText(lang) {
  return L(lang,
    "❓ SIK SORULAN SORULAR\n\n🚚 Teslimat: Bağcılar, Esenler ve çevre mahalleler — gün içinde.\n💵 Ödeme: Kapıda nakit / kart.\n🥩 Gramaj: 1 kilo çiğ tartıp pişiriyoruz.\n⏰ Saatler: Her gün 08:00–22:30.\n📦 Toptan: /b2b ile özel fiyat.\n💬 Diğer sorular: 0537 732 52 69",
    "❓ FAQ\n\n🚚 Delivery: Bağcılar, Esenler and nearby districts — same day.\n💵 Payment: cash / card at the door.\n🥩 Weight: we weigh 1 kg raw and cook it.\n⏰ Hours: daily 08:00–22:30.\n📦 Wholesale: /b2b for special prices.\n💬 Other questions: 0537 732 52 69",
    "❓ سوالات پرتکرار\n\n🚚 ارسال: باغجیلار، اسنلر و محله‌های اطراف — در همان روز.\n💵 پرداخت: نقدی / کارت درب منزل.\n🥩 وزن: ۱ کیلو چیغ وزن کرده و می‌پزیم.\n⏰ ساعات: هر روز ۰۸:۰۰–۲۲:۳۰.\n📦 عمده: با /b2b قیمت ویژه.\n💬 سایر سوالات: 0537 732 52 69");
}
function hoursNote(lang) {
  var hh = istanbulNow().hh;
  if (hh >= 8 && hh < 22) return "";
  return "\n\n" + L(lang,
    "🌙 Şu an mağaza kapalı (08:00–22:30). Siparişiniz açılışta hazırlanır.",
    "🌙 We're currently closed (08:00–22:30). Your order will be prepared at opening.",
    "🌙 فروشگاه الان بسته است (۰۸:۰۰–۲۲:۳۰). سفارش شما هنگام باز شدن آماده می‌شود.");
}
async function myOrders(env, cid, lang) {
  var rows = [];
  try { rows = (await env.DB.prepare("SELECT code, total, items FROM orders WHERE chat=? AND kind='order' ORDER BY rowid DESC LIMIT 5").bind(cid).all()).results || []; } catch (e) {}
  if (!rows.length) return { text: L(lang, "📋 Henüz siparişiniz yok — menüden başlayın! 🥩", "📋 No orders yet — start from the menu! 🥩", "📋 هنوز سفارشی ندارید — از منو شروع کنید! 🥩"), kb: kbMenu(lang) };
  var cur = lang === "fa" ? "لیر" : "TL";
  var lines = [L(lang, "📋 Son siparişleriniz:", "📋 Your recent orders:", "📋 سفارش‌های اخیر شما:")];
  rows.forEach(function (r) { lines.push("• " + r.code + " — " + fmtTL(r.total) + " " + cur); });
  lines.push(L(lang, "🔁 Son siparişi sepete geri yüklemek için butona basın.", "🔁 Tap below to reload your last order into the cart.", "🔁 برای بارگذاری آخرین سفارش در سبد، دکمه زیر را بزنید."));
  return { text: lines.join("\n"), kb: [[{ text: "🔁 " + L(lang, "Tekrarla", "Repeat", "تکرار سفارش"), callback_data: "reorder" }], [{ text: "⬅️ " + (((DATA.T[lang] || {}).kb || {}).menu || "Menü"), callback_data: "menu" }]] };
}
async function sendGallery(env, cid) {
  var media = Object.keys(PHOTOS).map(function (id) {
    var m = menuById(id);
    return { type: "photo", media: PHOTOS[id], caption: m ? (m.name.tr + " — " + fmtTL(m.price) + " TL/" + m.unit.tr) : "Aykan Et & Mangal" };
  });
  try { var r = await tg(env, "sendMediaGroup", { chat_id: cid, media: media }); if (r.ok) return; } catch (e) {}
  await send(env, cid, "📷 https://sbz-edu.github.io/aykan-et-mangal/");
}
function k_home(lang) { return L(lang, "🏠 Ana Menü", "🏠 Main Menu", "🏠 منوی اصلی"); }
function greet(lang) {
  var h = istanbulNow().hh;
  if (h < 6) return L(lang, "🌙 İyi geceler!", "🌙 Good night!", "🌙 شب بخیر!");
  if (h < 12) return L(lang, "🌅 Günaydın!", "🌅 Good morning!", "🌅 صبح بخیر!");
  if (h < 18) return L(lang, "☀️ İyi günler!", "☀️ Good afternoon!", "☀️ روز بخیر!");
  return L(lang, "🌆 İyi akşamlar!", "🌆 Good evening!", "🌆 عصر بخیر!");
}
function shareText(lang, first) {
  var reflink = BOT_URL + "?start=ref_" + (first || "");
  return L(lang,
    "🥩 AYKAN ET & MANGAL — Bağcılar\n\n🔥 1 kilo çiğ tartıp pişiriyoruz!\n🚚 Gün içinde teslim • 💵 Kapıda ödeme\n\n👉 Hemen sipariş ver: " + reflink + "\n\n📤 Bu mesajı arkadaşlarına ilet 👇",
    "🥩 AYKAN ET & MANGAL — Bağcılar\n\n🔥 We weigh 1 kg raw and cook it for you!\n🚚 Same-day delivery • 💵 Pay at the door\n\n👉 Order now: " + reflink + "\n\n📤 Forward this to your friends 👇",
    "🥩 آیکان ات و منگال — باغجیلار\n\n🔥 ۱ کیلو چیغ وزن کرده و می‌پزیم!\n🚚 ارسال در همان روز • 💵 پرداخت درب منزل\n\n👉 همین حالا سفارش بده: " + reflink + "\n\n📤 این پیام را برای دوستانت بفرست 👇");
}
async function statBump(env, kind) {
  try {
    var nn = istanbulNow();
    await env.DB.prepare("INSERT INTO bot_stats (k, d, n) VALUES (?,?,1) ON CONFLICT(k,d) DO UPDATE SET n=n+1").bind(kind, nn.dateStr, 1).run();
  } catch (e) {}
}

// ---------- لیدبوک (D1 leads) ----------
async function loadLeads(env) {
  var r = await env.DB.prepare("SELECT data FROM leads ORDER BY num").all();
  return (r.results || []).map(function (x) { try { return JSON.parse(x.data); } catch (e) { return null; } }).filter(Boolean);
}
function filteredLeads(leads, f) {
  var out;
  if (f.indexOf("cat:") === 0) out = leads.filter(function (l) { return l.category === f.slice(4); });
  else if (f.indexOf("area:") === 0) {
    var n = f.split(":")[1];
    out = leads.filter(function (l) { return String(l.area || "").split(".")[0] === n; });
  } else if (f === "P1") out = leads.filter(function (l) { return l.priority === "P1"; });
  else out = leads.slice();
  out.sort(function (a, b) { return (b.opportunity || 0) - (a.opportunity || 0); });
  return out;
}
function leadCardText(l, pos, total) {
  return "🎯 لید " + pos + " از " + total + " — " + (DATA.CAT_FA2[l.category] || l.category) + " ردیف #" + (l.catNum || "—") + "\n\n" +
    "🏢 " + l.name + "\n📍 " + l.area + "\n🏠 " + l.address + "\n📞 " + l.phone + "\n✉️ " + l.email + "\n🌐 " + l.website + "\n\n" +
    "⚡ " + l.priority + " · امتیاز " + l.opportunity + "/۱۰۰ · مقیاس " + l.scale + " · " + l.weeklyKg + " Kg/هفته\n" +
    "📦 " + String(l.package || "").split(" (")[0] + " (تخفیف ٪" + l.pkgDiscount + ")\n" +
    "🏪 " + (l.branch || "—");
}
function leadCardKb(l, pos, total) {
  var qe = encodeURIComponent(l.name + " " + l.address);
  var row1 = [
    { text: "🗺 نقشه", url: "https://www.google.com/maps/search/?api=1&query=" + qe },
    { text: "🌐 سایت", url: l.website || SITE_URL }
  ];
  var wa = normPhone(l.phone);
  if (wa) row1.push({ text: "💬 واتساپ", url: "https://wa.me/" + wa });
  return [
    row1,
    [{ text: "⏮ قبلی", callback_data: "lb:prev" }, { text: "📊 " + pos + " / " + total, callback_data: "lb:noop" }, { text: "بعدی ⏭", callback_data: "lb:next" }],
    [{ text: "📋 اطلاعات تماس", callback_data: "lb:contact" }, { text: "⏭⏭ +۱۰", callback_data: "lb:jump10" }],
    [{ text: "🔍 فیلترها", callback_data: "lb:filters" }, { text: "🗺️ مناطق", callback_data: "lb:areas" }]
  ];
}
function kbLeadFilters() {
  return [
    [{ text: "🥩 رستوران‌ها (۱۰۰)", callback_data: "lb:filter:cat:Big Restaurant" }, { text: "🍔 فست‌فود (۱۰۰)", callback_data: "lb:filter:cat:Ordinary Fast Food" }],
    [{ text: "🏨 هتل‌ها (۱۰۰)", callback_data: "lb:filter:cat:Hotel" }, { text: "🍲 کیترینگ (۱۰۰)", callback_data: "lb:filter:cat:Catering" }],
    [{ text: "👨‍👩‍👧‍👦 مجتمع‌ها (۱۰۰)", callback_data: "lb:filter:cat:Ordinary People" }, { text: "🔥 فقط P1 (طلایی)", callback_data: "lb:filter:P1" }],
    [{ text: "📋 همه لیدها (۵۱۰)", callback_data: "lb:filter:all" }],
    [{ text: "💼 لیدرهای سرمایه‌گذاری", callback_data: "lb:filter:cat:Investment Leader" }],
    [{ text: "🗺️ ده منطقه استانبول", callback_data: "lb:areas" }]
  ];
}
function kbLeadAreas() {
  var rows = [];
  for (var i = 0; i < 10; i += 2) {
    var row = [];
    for (var j = i; j < Math.min(i + 2, 10); j++) {
      row.push({ text: (j + 1) + "️⃣ " + DATA.AREAS[j].fa, callback_data: "lb:filter:area:" + (j + 1) });
    }
    rows.push(row);
  }
  rows.push([{ text: "⬅️ بازگشت به فیلترها", callback_data: "lb:filters" }]);
  return rows;
}
async function editOrSend(env, cid, msgId, text, kb) {
  var p = { chat_id: cid, message_id: msgId, text: String(text).slice(0, 4000) };
  if (kb) p.reply_markup = { inline_keyboard: kb };
  var r = await tg(env, "editMessageText", p);
  if (!r.ok) await send(env, cid, text, kb);
}

// ---------- اکشن دکمه‌ها ----------
async function handleAction(env, cid, data, lang, frm, msgId) {
  var c = await getChat(env, cid);
  var st = await getBotState(env);

  if (data.indexOf("lb:") === 0) {
    if (st.admin_chat !== cid) return "🔐 فقط برای مدیر!";
    var sub = data.slice(3);
    if (!c.lb) c.lb = { f: "P1", i: 0 };
    var leads = await loadLeads(env);
    var fl = filteredLeads(leads, c.lb.f);
    if (!fl.length) return "لیستی یافت نشد!";
    if (sub.indexOf("filter:area:") === 0) {
      c.lb.f = "area:" + sub.split(":")[2]; c.lb.i = 0; await saveChat(env, cid, c);
      var n = +sub.split(":")[2];
      var areaName = (DATA.AREAS[n - 1] || {}).fa || "";
      await editOrSend(env, cid, msgId, "🗺️ منطقه " + n + ": " + areaName + "\n\n▶️ شروع مرور ۵۰ لید این منطقه را بزنید.",
        [[{ text: "▶️ شروع مرور ۵۰ لید این منطقه", callback_data: "lb:areastart" }],
         [{ text: "🗺️ مناطق دیگر", callback_data: "lb:areas" }, { text: "🔍 فیلترهای دسته", callback_data: "lb:filters" }]]);
      return "✅ منطقه انتخاب شد";
    }
    if (sub === "areastart") { c.lb.i = 0; await saveChat(env, cid, c); await editOrSend(env, cid, msgId, leadCardText(fl[0], 1, fl.length), leadCardKb(fl[0], 1, fl.length)); return ""; }
    if (sub.indexOf("filter:") === 0) {
      c.lb.f = sub.slice(7); c.lb.i = 0; await saveChat(env, cid, c);
      fl = filteredLeads(leads, c.lb.f);
      if (!fl.length) return "لیستی یافت نشد!";
      await editOrSend(env, cid, msgId, leadCardText(fl[0], 1, fl.length), leadCardKb(fl[0], 1, fl.length));
      return "✅ فیلتر اعمال شد";
    }
    if (sub === "areas") { await editOrSend(env, cid, msgId, "🗺️ ده منطقه استانبول — لیدهای کدام منطقه را بررسی کنیم؟", kbLeadAreas()); return ""; }
    if (sub === "filters") { await editOrSend(env, cid, msgId, "🔍 فیلتر دفتر لیدها — چه دسته‌ای را بررسی کنیم؟", kbLeadFilters()); return ""; }
    if (sub === "next") c.lb.i = Math.min(c.lb.i + 1, fl.length - 1);
    else if (sub === "prev") c.lb.i = Math.max(c.lb.i - 1, 0);
    else if (sub === "jump10") c.lb.i = Math.min(c.lb.i + 10, fl.length - 1);
    else if (sub === "contact") {
      var lc = fl[c.lb.i];
      await send(env, cid, "📋 اطلاعات تماس:\n\n🏢 " + lc.name + "\n📞 " + lc.phone + "\n✉️ " + lc.email + "\n🌐 " + lc.website + "\n📍 " + lc.area + " — " + lc.address);
      return "";
    }
    else if (sub === "noop") return "";
    await saveChat(env, cid, c);
    var l2 = fl[c.lb.i];
    await editOrSend(env, cid, msgId, leadCardText(l2, c.lb.i + 1, fl.length), leadCardKb(l2, c.lb.i + 1, fl.length));
    return "";
  }

  if (data === "langpick") { await send(env, cid, tx(lang, "pick_lang"), kbLang()); return ""; }
  if (data.indexOf("lang:") === 0) {
    var nl = data.split(":")[1];
    c.lang = nl; await saveChat(env, cid, c);
    await send(env, cid, tx(nl, "lang_set"), kbMain(nl));
    return "";
  }
  if (data === "home") { await send(env, cid, "🏠 AYKAN ET & MANGAL 🥩", kbMain(lang)); return ""; }
  if (data === "menu") { await send(env, cid, tx(lang, "menu_title"), kbMenu(lang)); return ""; }
  if (data === "paket") { await send(env, cid, tx(lang, "paket_title"), kbMenu(lang)); return ""; }
  if (data === "sepet") { var ct = cartText(c, lang); await send(env, cid, ct.text, ct.kb); return ""; }
  if (data === "sube") {
    await send(env, cid, tx(lang, "sube"), [
      [{ text: "🗺 " + L(lang, "Bağcılar Şubesi — Yol Tarifi", "Bağcılar Branch — Directions", "شعبه باغجیلار — مسیریابی"), url: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Göztepe Mah. Maslak Cad. 95A Bağcılar İstanbul") }],
      [{ text: "🗺 " + L(lang, "Esenler Şubesi — Yol Tarifi", "Esenler Branch — Directions", "شعبه اسنلر — مسیریابی"), url: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Kemer Mah. 926. Sok. 2/C Esenler İstanbul") }],
      [{ text: k_home(lang), callback_data: "home" }]
    ]);
    return "";
  }
  if (data === "iletisim") { await send(env, cid, tx(lang, "iletisim", OWNER_WA), kbMain(lang)); return ""; }
  if (data === "b2b") {
    await send(env, cid, b2bText(lang),
      [[{ text: tx(lang, "b2b_btn"), callback_data: "b2breq" }], [{ text: tx(lang, "home"), callback_data: "home" }]]);
    return "";
  }
  if (data === "b2breq") { c.mode = "b2b_company"; await saveChat(env, cid, c); await send(env, cid, tx(lang, "ask_company")); return ""; }
  if (data.indexOf("pick:") === 0) {
    var m = menuById(data.split(":")[1]);
    if (m && _STK[m.id] === false) {
      await send(env, cid, "😕 " + L(lang, "Şu anda stokta yok:", "Out of stock right now:", "فعلا موجود نیست:") + " " + m.name[lang]);
      return "";
    }
    if (m) {
      statBump(env, "view");
      var cap = tx(lang, "qty_prompt", m.name[lang], m.price, m.unit[lang]);
      if (PHOTOS[m.id]) {
        try {
          var pr = await tg(env, "sendPhoto", { chat_id: cid, photo: PHOTOS[m.id], caption: String(cap).slice(0, 1000), reply_markup: { inline_keyboard: kbQty(m, lang) } });
          if (pr.ok) return "";
        } catch (e) {}
      }
      await send(env, cid, cap, kbQty(m, lang));
    }
    return "";
  }
  if (data.indexOf("qty:") === 0) {
    var parts = data.split(":");
    var mm = menuById(parts[1]);
    var q = parseFloat(parts[2]);
    if (mm && q > 0) {
      if (!c.cart) c.cart = {};
      c.cart[parts[1]] = Math.round(((c.cart[parts[1]] || 0) + q) * 100) / 100;
      c.nudged = false;
      await saveChat(env, cid, c);
      var ct2 = cartText(c, lang);
      await send(env, cid, tx(lang, "added", mm.name[lang], q, mm.unit[lang]) + "\n\n" + ct2.text, ct2.kb);
      return "✔";
    }
    return "";
  }
  if (data === "checkout") {
    if (!c.cart || !Object.keys(c.cart).length) return tx(lang, "cart_empty_toast");
    c.mode = "name"; await saveChat(env, cid, c);
    await send(env, cid, tx(lang, "ask_name") + hoursNote(lang));
    return "";
  }
  if (data === "clear") {
    c.cart = {}; await saveChat(env, cid, c);
    await send(env, cid, tx(lang, "cleared"), kbMenu(lang));
    return "";
  }
  if (data.indexOf("inc:") === 0 || data.indexOf("dec:") === 0 || data.indexOf("del:") === 0) {
    var pid = data.split(":")[1];
    var half = ["kemikli", "kusbasi", "antrikot", "kuzu", "pirzola"].indexOf(pid) >= 0;
    if (c.cart && c.cart[pid] !== undefined) {
      if (data.indexOf("inc:") === 0) c.cart[pid] = Math.round((c.cart[pid] + (half ? 0.5 : 1)) * 100) / 100;
      else if (data.indexOf("dec:") === 0) c.cart[pid] = Math.round((c.cart[pid] - (half ? 0.5 : 1)) * 100) / 100;
      else delete c.cart[pid];
      if (c.cart[pid] !== undefined && c.cart[pid] <= 0) delete c.cart[pid];
      await saveChat(env, cid, c);
    }
    var ctk = cartText(c, lang);
    await editOrSend(env, cid, msgId, ctk.text, ctk.kb);
    return "";
  }
  if (data === "siparislerim") { var mo = await myOrders(env, cid, lang); await send(env, cid, mo.text, mo.kb); return ""; }
  if (data === "reorder") {
    var lastO = null;
    try { lastO = await env.DB.prepare("SELECT items FROM orders WHERE chat=? AND kind='order' AND items IS NOT NULL ORDER BY rowid DESC LIMIT 1").bind(cid).first(); } catch (e) {}
    if (lastO && lastO.items) {
      try {
        c.cart = JSON.parse(lastO.items); c.mode = null;
        await saveChat(env, cid, c);
        var ctr2 = cartText(c, lang);
        await send(env, cid, "🔁 " + L(lang, "Son siparişiniz sepete yüklendi:", "Your last order was loaded into the cart:", "آخرین سفارش شما در سبد بارگذاری شد:") + "\n\n" + ctr2.text, ctr2.kb);
        return "🔁";
      } catch (e) {}
    }
    return "⚠️";
  }
  if (data === "sss") { await send(env, cid, faqText(lang), kbMain(lang)); return ""; }
  if (data === "paylas") { await send(env, cid, shareText(lang, cid), kbMain(lang)); return ""; }
  if (data === "gununfiyati") {
    var nnn = istanbulNow();
    await send(env, cid, "🔥 " + L(lang, "GÜNÜN FIRSATI:", "TODAY'S SPECIAL:", "پیشنهاد ویژه امروز:") + "\n\n" + DATA.OFFERS[nnn.yday % DATA.OFFERS.length], kbMenu(lang));
    return "";
  }
  if (data === "bolgeler" || data === "teslimat") {
    var an = (DATA.AREA_NAMES_TR || []).map(function (n, i) { return (i + 1) + ". " + n; }).join("\n");
    await send(env, cid, L(lang,
      "🚚 TESLİMAT BÖLGELERİ\n\n" + an + "\n\nGün içinde teslim — Bağcılar, Esenler ve çevre mahalleler.",
      "🚚 DELIVERY AREAS\n\n" + an + "\n\nSame-day delivery — Bağcılar, Esenler and nearby districts.",
      "🚚 مناطق ارسال\n\n" + ((DATA.AREAS || []).map(function (a, i) { return (i + 1) + ". " + (a.fa || ""); }).join("\n")) + "\n\nارسال در همان روز — باغجیلار، اسنلر و محله‌های اطراف."), kbMain(lang));
    return "";
  }
  if (data === "galeri") { await sendGallery(env, cid); return ""; }
  if (data.indexOf("rate:") === 0) {
    var rv = parseInt(data.split(":")[1], 10) || 5;
    statBump(env, "rate" + rv);
    c.rate_open = null; c.last_rate = rv;
    if (rv <= 3) { c.mode = "feedback"; await saveChat(env, cid, c); await send(env, cid, L(lang, "😞 Üzgünüz! Neyi iyileştirebiliriz? Kısaca yazın:", "😞 Sorry! What can we improve? Write briefly:", "😞 متأسفیم! چه چیزی را بهتر کنیم؟ کوتاه بنویسید:"), kbMain(lang)); }
    else { await saveChat(env, cid, c); await send(env, cid, L(lang, "🙏 Değerlendirmeniz için teşekkürler!", "🙏 Thank you for your feedback!", "🙏 از امتیاز شما سپاسگزاریم!"), kbMain(lang)); }
    return "🙏";
  }
  return "";
}

// ---------- نهایی‌سازی سفارش ----------
async function finalizeOrder(env, cid, c, lang) {
  var cart = c.cart || {};
  if (!Object.keys(cart).length) { await send(env, cid, tx(lang, "cart_empty"), kbMenu(lang)); return; }
  var cur = lang === "fa" ? "لیر" : "TL";
  var lines = [], total = 0;
  for (var id in cart) {
    var m = menuById(id); if (!m) continue;
    var t = Math.round(m.price * cart[id]); total += t;
    lines.push("• " + m.name[lang] + " × " + cart[id] + " " + m.unit[lang] + " = " + fmtTL(t) + " " + cur);
  }
  var o = c.order || {};
  var now = istanbulNow();
  var code = "AYK-" + now.yy + now.mm2 + now.dd + "-" + now.hh + ("0" + now.min).slice(-2);
  var summary = tx(lang, "order_ok", code, lines.join("\n"), fmtTL(total), o.name || "", o.phone || "", o.note || "");
  try {
    await env.DB.prepare("INSERT INTO orders (code, kind, total, currency, name, phone, address, items, lang, chat, source) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
      .bind(code, "order", total, "TL", String(o.name || "").slice(0, 120), String(o.phone || "").slice(0, 40),
            String(o.note || "").slice(0, 300), JSON.stringify(cart), lang, String(cid).slice(0, 30), "tgbot").run();
  } catch (e) {}
  statBump(env, "order");
  summary += "\n\n📋 " + L(lang, "Kodu saklayın — /siparislerim ile takip edebilirsiniz.", "Keep this code — track it with /siparislerim.", "کد را نگه دارید — با /siparislerim پیگیری کنید.");
  c.cart = {}; c.order = {}; c.mode = null; c.rate_open = code;
  await saveChat(env, cid, c);
  await send(env, cid, summary, kbMain(lang));
  try {
    await send(env, cid, L(lang, "⭐ Siparişinizi değerlendirin:", "⭐ Rate your order:", "⭐ سفارش خود را امتیاز دهید:"), [[
      { text: "⭐", callback_data: "rate:1" }, { text: "⭐⭐", callback_data: "rate:2" }, { text: "⭐⭐⭐", callback_data: "rate:3" },
      { text: "⭐⭐⭐⭐", callback_data: "rate:4" }, { text: "⭐⭐⭐⭐⭐", callback_data: "rate:5" }
    ]]);
  } catch (e) {}
  var cph = normPhone(o.phone || "");
  var akb = [];
  if (cph) {
    akb.push([{ text: "💬 WhatsApp Müşteri", url: "https://wa.me/" + cph }, { text: "📞 Ara", url: "tel:+" + cph }]);
    akb.push([{ text: "✅ Onayla (WhatsApp)", url: "https://wa.me/" + cph + "?text=" + encodeURIComponent("Merhaba " + (o.name || "Müşterimiz") + " 👋 Aykan Et & Mangal — " + code + " numaralı siparişiniz hazırlanıyor! Toplam: " + fmtTL(total) + " TL. Teşekkürler 🥩🔥") }]);
  }
  await notifyAdmin(env, "🔔 YENİ SİPARİŞ / NEW ORDER / سفارش جدید 🧾\n\nKod: " + code + " | Toplam: " + fmtTL(total) + " TL\n👤 " + (o.name || "") + " | 📞 " + (o.phone || "") + " | ✈️ " + (o.tg || "") + "\n🏠 " + (o.note || "") + "\n🛒 " + lines.join(", ").slice(0, 200) + "\nLang: " + lang + " | Chat: " + cid, akb);
}

// ---------- دستورات ادمین ----------
async function handleAdminCommand(env, cid, text) {
  var st = await getBotState(env);
  var parts = text.split(/\s+/);
  var cmd = parts[0].toLowerCase();
  if (cmd === "/istatistik" || cmd === "/stats") {
    var g = [];
    try { g = (await env.DB.prepare("SELECT kind, COUNT(*) n, COALESCE(SUM(total),0) t FROM orders GROUP BY kind").all()).results || []; } catch (e) {}
    var nchats = 0; try { nchats = ((await env.DB.prepare("SELECT COUNT(*) n FROM bot_chats").first()) || {}).n || 0; } catch (e) {}
    var st2 = [];
    try { st2 = (await env.DB.prepare("SELECT k, SUM(n) n FROM bot_stats GROUP BY k ORDER BY n DESC LIMIT 10").all()).results || []; } catch (e) {}
    var msgS = "📊 İSTATİSTİK / آمار\n\n👥 Bot sohbetleri: " + nchats;
    g.forEach(function (r) { msgS += "\n🧾 " + r.kind + ": " + r.n + " | " + fmtTL(r.t) + " TL"; });
    if (st2.length) { msgS += "\n\n🎯 Etkinlikler:"; st2.forEach(function (r) { msgS += "\n• " + r.k + ": " + r.n; }); }
    await send(env, cid, msgS);
    return;
  }
  if (cmd === "/duyuru") {
    var body = text.split(" ").slice(1).join(" ").trim();
    if (!body) { await send(env, cid, "📢 kullanım: /duyuru MESAJ — tüm bot kullanıcılarına gönderilir."); return; }
    var targets = [];
    try { targets = (await env.DB.prepare("SELECT chat_id FROM bot_chats LIMIT 400").all()).results || []; } catch (e) {}
    var sentN = 0;
    for (var ti = 0; ti < targets.length; ti++) {
      try { var rr = await tg(env, "sendMessage", { chat_id: targets[ti].chat_id, text: "📢 " + body }); if (rr.ok) sentN++; } catch (e) {}
    }
    await send(env, cid, "📢 Duyuru " + sentN + "/" + targets.length + " sohbete iletildi.");
    return;
  }
  if (cmd === "/durum") {
    var oc = parts[1] || "";
    if (!oc) { await send(env, cid, "📌 kullanım: /durum SİPARİŞKODU Mesaj — müşteriye bildirim gider."); return; }
    var omsg = text.split(" ").slice(2).join(" ").trim() || "Siparişiniz güncellendi ✔";
    var orow = null;
    try { orow = await env.DB.prepare("SELECT chat, code FROM orders WHERE code=? ORDER BY rowid DESC LIMIT 1").bind(oc).first(); } catch (e) {}
    if (!orow || !orow.chat) { await send(env, cid, "⚠️ Sipariş bulunamadı: " + oc); return; }
    var r3 = await tg(env, "sendMessage", { chat_id: orow.chat, text: "📋 " + oc + "\n\n" + omsg + "\n\n— Aykan Et & Mangal 🥩" });
    await send(env, cid, r3.ok ? "✅ Müşteriye iletildi." : "⚠️ Gönderilemedi: " + (r3.description || ""));
    return;
  }
  if (cmd === "/yardim") {
    await send(env, cid, "🛠 ADMİN KOMUTLARI\n\n🔗 KANAL\n/kanal @x — bağla • /kanalkapat — kes\n/postnow — hemen post • /plan — yayın planı\n/aralik N — saat aralığı • /durdur • /devam\n\n📊 YÖNETİM\n/istatistik — satış/chat/etkinlik\n/siparisler — son 10 sipariş\n/durum KOD MESAJ — müşteriye bildirim\n/duyuru MESAJ — toplu duyuru\n/fiyatguncelle id fiyat — fiyat değiştir (sifirla = geri al)\n/stok id yok|var — stok kapat/aç\n/ping — sistem durumu\n\n🎯 LİDLER\n/lidedefteri — tarayıcı • /bolge N • /yatirim");
    return;
  }
  if (cmd === "/fiyatguncelle") {
    var fid = parts[1] || "";
    if (!menuById(fid)) { await send(env, cid, "⚠️ Bilinmeyen ürün: " + fid + "\nÜrünler: " + DATA.MENU.map(function (m) { return m.id; }).join(", ")); return; }
    if ((parts[2] || "") === "sifirla") { delete _OV[fid]; await setSetting(env, "price_overrides", _OV); await send(env, cid, "✅ " + fid + " → orijinal fiyat."); return; }
    var fp = parseFloat(String(parts[2] || "").replace(",", "."));
    if (!(fp > 0)) { await send(env, cid, "📌 Kullanım: /fiyatguncelle kusbasi 780 — geri almak için: /fiyatguncelle kusbasi sifirla"); return; }
    _OV[fid] = fp; await setSetting(env, "price_overrides", _OV);
    await send(env, cid, "✅ " + fid + " → " + fmtTL(fp) + " TL — menü ve sepet anında güncel 🔥");
    return;
  }
  if (cmd === "/stok") {
    var sid = parts[1] || "", sv = (parts[2] || "").toLowerCase();
    if (!menuById(sid)) { await send(env, cid, "⚠️ Bilinmeyen ürün: " + sid + "\nÜrünler: " + DATA.MENU.map(function (m) { return m.id; }).join(", ")); return; }
    if (sv === "yok") _STK[sid] = false;
    else if (sv === "var") delete _STK[sid];
    else { await send(env, cid, "📌 Kullanım: /stok kusbasi yok  (geri açmak için: /stok kusbasi var)"); return; }
    await setSetting(env, "stock", _STK);
    await send(env, cid, "✅ " + sid + " → " + (sv === "yok" ? "STOKTA YOK (menüden gizlendi)" : "STOKTA (menüde görünüyor)"));
    return;
  }
  if (cmd === "/siparisler") {
    var orows = [];
    try { orows = (await env.DB.prepare("SELECT code, kind, total, name, phone FROM orders ORDER BY rowid DESC LIMIT 10").all()).results || []; } catch (e) {}
    if (!orows.length) { await send(env, cid, "Henüz sipariş yok."); return; }
    var m3 = "🧾 SON 10 SİPARİŞ:\n\n";
    orows.forEach(function (r) { m3 += "• " + r.code + " | " + fmtTL(r.total) + " TL | " + (r.name || "?") + " | " + (r.phone || "?") + "\n"; });
    await send(env, cid, m3);
    return;
  }
  if (cmd === "/ping") {
    var whs = "❌ token yok";
    var tkn = await getToken(env);
    if (tkn) {
      try {
        var wi = await (await fetch("https://api.telegram.org/bot" + tkn + "/getWebhookInfo")).json();
        whs = wi.ok ? (wi.result.url ? "✅ aykan-tgbot" : "⚠️ set değil") : "❌ 401";
      } catch (e) { whs = "❌"; }
    }
    var tsx = await getSetting(env, "tick_ts");
    var tkage = tsx ? Math.round((Date.now() - tsx) / 60000) + " dk önce" : "hiç";
    var nchx = 0; try { nchx = ((await env.DB.prepare("SELECT COUNT(*) n FROM bot_chats").first()) || {}).n || 0; } catch (e) {}
    var hits = 0; try { var sh = await getSetting(env, "site_hits"); var td = istanbulNow().dateStr; if (sh && sh[td]) hits = sh[td]; } catch (e) {}
    var nov = Object.keys(_OV || {}).length, nst = Object.keys(_STK || {}).length;
    await send(env, cid, "🏓 PING\n\n🌐 Webhook: " + whs + "\n⏱ Son tick: " + tkage + "\n👥 Sohbet: " + nchx + "\n🌍 Site ziyareti (bugün): " + hits + "\n🏷 Fiyat override: " + nov + " • ❌ Stokta yok: " + nst + "\n⏰ İstanbul: " + istanbulNow().hh + ":" + ("0" + istanbulNow().min).slice(-2));
    return;
  }
  if ((cmd === "/kanal" || cmd === "/channel") && parts.length >= 2) {
    var ch = parts[1];
    if (ch.indexOf("@") !== 0 && ch.indexOf("-") !== 0) ch = "@" + ch;
    st.channel = ch;
    var now = istanbulNow();
    var today = st.posted[now.dateStr] = st.posted[now.dateStr] || [];
    var slots = slotsFor(st.interval);
    for (var i = 0; i < slots.length; i++) {
      var hh = +slots[i].split(":")[0];
      if (now.hh >= hh && today.indexOf(i) === -1) today.push(i);
    }
    await setSetting(env, "bot_state", st);
    var r = await tg(env, "sendMessage", { chat_id: ch, text: "✅ Aykan Et & Mangal botu bu kanala bağlandı!\n🤖 ربات آیکان ات به این کانال متصل شد — پست‌های خودکار ترند فعال است.\n🔥 Günlük trend paylaşımları başlıyor!" });
    await send(env, cid, r.ok ? "✅ کانال تنظیم شد: " + ch + " و پیام تست ارسال شد.\n\n⏰ برنامه: " + slots.join("، ") + " — ۱۰ دسته + پیشنهاد ویژه ۰۹:۰۰. فاصله: /aralik N" : "⚠️ کانال ذخیره شد ولی ارسال ناموفق: " + (r.description || "") + "\nربات را ادمین کانال کنید.");
    return;
  }
  if (cmd === "/kanalkapat") { st.channel = ""; await setSetting(env, "bot_state", st); await send(env, cid, "✅ کانال قطع شد."); return; }
  if (cmd === "/postnow") {
    if (!st.channel) { await send(env, cid, "⚠️ اول /kanal @نام_کانال"); return; }
    var t = DATA.POSTS[st.counter % DATA.POSTS.length];
    var r2 = await tg(env, "sendMessage", { chat_id: st.channel, text: t.slice(0, 4000) });
    if (r2.ok) {
      st.counter++; await setSetting(env, "bot_state", st);
      await send(env, cid, "📤 پست ارسال شد:\n\n" + t.slice(0, 1200));
      socialFanout(env, t);
    } else await send(env, cid, "⚠️ ارسال ناموفق: " + (r2.description || ""));
    return;
  }
  if (cmd === "/plan") {
    var now2 = istanbulNow();
    var postedToday = (st.posted[now2.dateStr] || []);
    var slots2 = slotsFor(st.interval);
    var lines = ["📅 برنامه پست‌های خودکار امروز (کانال: " + (st.channel || "—") + " — هر " + st.interval + " ساعت، " + slots2.length + " پست):"];
    for (var j = 0; j < slots2.length; j++) {
      var kind = slots2[j] === OFFER_SLOT ? "🎁 پیشنهاد ویژه روز" : "🗞 پست موضوعی";
      var stt = postedToday.indexOf(j) >= 0 ? "✅ ارسال شد" : (st.paused ? "⏸ توقف" : "⏳ در انتظار");
      lines.push("  " + slots2[j] + " — " + kind + " " + stt);
    }
    var meta = DATA.POSTS_META[st.counter % DATA.POSTS_META.length];
    lines.push("\n🔁 دسته بعدی: " + meta.badge);
    lines.push("📍 منطقه بعدی: " + meta.area);
    lines.push("🎁 پیشنهاد ویژه امروز: " + DATA.OFFERS[now2.yday % DATA.OFFERS.length].split("\n")[2]);
    lines.push("\nدستورها: /postnow • /aralik N • /durdur • /devam • /kanalkapat • /lidedefteri");
    await send(env, cid, lines.join("\n"));
    return;
  }
  if (cmd === "/aralik" || cmd === "/interval") {
    var n2 = parseInt(parts[1] || "3", 10);
    if (n2 >= 1 && n2 <= 24) {
      st.interval = n2; delete st.posted[istanbulNow().dateStr];
      await setSetting(env, "bot_state", st);
      await send(env, cid, "✅ فاصله پست‌ها " + n2 + " ساعت شد.\n⏰ برنامه جدید: " + slotsFor(n2).join("، "));
    } else await send(env, cid, "استفاده: /aralik N (۱ تا ۲۴ ساعت)");
    return;
  }
  if (cmd === "/durdur" || cmd === "/pause") { st.paused = true; await setSetting(env, "bot_state", st); await send(env, cid, "⏸ پست‌های خودکار متوقف شد. (/devam برای ادامه)"); return; }
  if (cmd === "/devam" || cmd === "/resume") { st.paused = false; await setSetting(env, "bot_state", st); await send(env, cid, "▶️ پست‌های خودکار ادامه یافت."); return; }
  if (cmd === "/lidedefteri") {
    var leads = await loadLeads(env);
    await send(env, cid, "📒 دفتر لیدها: " + leads.length + " لید در دیتابیس.\n\n🔍 فیلتر را انتخاب کنید:", kbLeadFilters());
    return;
  }
  if (cmd === "/bolge" || cmd === "/yatirim") { await send(env, cid, "🔍 برای مرور لیدها /lidedefتری یا /lidedefteri را بزنید — دفتر کامل لیدها در پنل مدیریت هم موجود است."); return; }
  await send(env, cid, "دستورهای ادمین: /plan • /aralik N • /postnow • /durdur • /devam • /kanal @x • /kanalkapat • /lidedefteri");
}

// ---------- هندلر آپدیت ----------
var _RL = {};  // ضد-اسپم: حداکثر ۲۵ آپدیت در ۱۰ ثانیه به ازای هر چت
async function handleUpdate(env, u) {
  try {
    var rlcid = u.message ? String(u.message.chat.id) : (u.callback_query ? String(u.callback_query.message.chat.id) : "");
    if (rlcid) {
      var rl = _RL[rlcid] = _RL[rlcid] || { n: 0, t: Date.now() };
      if (Date.now() - rl.t > 10000) { rl.n = 0; rl.t = Date.now(); }
      rl.n++;
      if (rl.n > 25) return;
    }
  } catch (e) {}
  await loadShopState(env);
  if (u.callback_query) {
    var cb = u.callback_query;
    var cid2 = String(cb.message.chat.id);
    var c2 = await getChat(env, cid2);
    var lang2 = getLangOf(c2, cb.from);
    try {
      var ans = await handleAction(env, cid2, cb.data, lang2, cb.from, cb.message.message_id);
      await cbAns(env, cb.id, ans || "");
    } catch (e) {
      try { statBump(env, "error"); } catch (e3) {}
      await cbAns(env, cb.id, "⚠️ دوباره امتحان کنید");
      try { await send(env, +cid2, "⚠️ خطا در پردازش دکمه — دوباره بزنید یا با 0537 732 52 69 تماس بگیرید."); } catch (e2) {}
    }
    return;
  }
  var msg = u.message || u.edited_message;
  if (!msg) return;
  var cid = String(msg.chat.id);
  var c0 = await getChat(env, cid);
  var lang0 = getLangOf(c0, msg.from || {});
  if (msg.location) {
    if (c0.mode === "note") {
      c0.order = c0.order || {};
      c0.order.note = "📍 Konum: " + msg.location.latitude + "," + msg.location.longitude;
      c0.mode = null;
      await saveChat(env, cid, c0);
      await finalizeOrder(env, cid, c0, lang0);
    } else {
      await send(env, +cid, L(lang0, "📍 Konumunuzu sipariş notu adımında gönderin.", "📍 Please send your location at the order note step.", "📍 موقعیت خود را در مرحله یادداشت سفارش بفرستید."), kbMain(lang0));
    }
    return;
  }
  if (msg.contact) {
    if (c0.mode === "phone") {
      c0.order = c0.order || {};
      c0.order.phone = msg.contact.phone_number || "";
      c0.mode = "note";
      await saveChat(env, cid, c0);
      await send(env, +cid, tx(lang0, "ask_note"));
    } else {
      await send(env, +cid, L(lang0, "👤 Numarayı sipariş telefonu adımında paylaşın.", "👤 Share the contact at the phone step of ordering.", "👤 شماره را در مرحله تلفنِ سفارش به اشتراک بگذارید."), kbMain(lang0));
    }
    return;
  }
  if (!msg.text) return;
  var text = String(msg.text).trim();
  var first = (msg.from || {}).first_name || "";
  var c = await getChat(env, cid);
  var lang = getLangOf(c, msg.from);
  var low = text.toLowerCase();
  var st = await getBotState(env);

  // ادمین؟
  var adminCmds = ["/kanal", "/channel", "/kanalkapat", "/postnow", "/plan", "/aralik", "/interval", "/durdur", "/pause", "/devam", "/resume", "/lidedefteri", "/lidegonder", "/lidekanal", "/leadschannel", "/lidekanalkapat", "/bolge", "/yatirim", "/istatistik", "/stats", "/duyuru", "/durum", "/ping", "/siparisler", "/fiyatguncelle", "/stok", "/yardim"];
  for (var ai = 0; ai < adminCmds.length; ai++) {
    if (new RegExp("^" + adminCmds[ai].replace(/\//g, "\\/") + "(\\s|$)").test(low)) {
      if (st.admin_chat === cid) { await handleAdminCommand(env, cid, text); }
      else await send(env, +cid, "🔐 این دستور فقط برای مدیر است. اول با /admin PIN وارد شوید.");
      return;
    }
  }

  if (low.indexOf("/admin") === 0) {
    var pin = text.split(/\s+/)[1] || "";
    if (pin === ADMIN_PIN) { st.admin_chat = cid; await setSetting(env, "bot_state", st); await send(env, +cid, "✅ ادمین شناسایی شد! دستورها: /plan • /postnow • /aralik N • /lidedefteri"); }
    else await send(env, +cid, "⛔ رمز نادرست.");
    return;
  }

  if (c.mode && (low.indexOf("/iptal") === 0 || low.indexOf("/vazgec") === 0)) {
    c.mode = null; await saveChat(env, cid, c);
    await send(env, +cid, L(lang, "✅ İşlem iptal edildi — sepetiniz korundu.", "✅ Cancelled — your cart is kept.", "✅ عملیات لغو شد — سبد شما حفظ شد."), kbMain(lang));
    return;
  }
  if (c.mode && low.indexOf("/") === 0 && low.indexOf("/start") !== 0) {
    c.mode = null; await saveChat(env, cid, c);  // هر دستور دیگری جریان ورودی را قطع می‌کند
  }
  if (c.mode === "name") { c.order = c.order || {}; c.order.name = text; c.order.tg = ((msg.from || {}).username ? "@" + msg.from.username : "") || ((msg.from || {}).first_name || ""); c.mode = "phone"; await saveChat(env, cid, c); await send(env, +cid, tx(lang, "ask_phone")); return; }
  if (c.mode === "phone") { c.order.phone = text; c.mode = "note"; await saveChat(env, cid, c); await send(env, +cid, tx(lang, "ask_note")); return; }
  if (c.mode === "note") { c.order.note = text; c.mode = null; await saveChat(env, cid, c); await finalizeOrder(env, cid, c, lang); return; }
  if (c.mode === "feedback") {
    c.mode = null; await saveChat(env, cid, c);
    await notifyAdmin(env, "⚠️ GERİ BİLDİRİM / FEEDBACK (⭐ " + (c.last_rate || "?") + ")\n\n" + text.slice(0, 500) + "\nChat: " + cid);
    await send(env, +cid, L(lang, "🙏 Geri bildiriminiz için teşekkürler — en kısa sürede değerlendireceğiz!", "🙏 Thank you — we will review it shortly!", "🙏 از بازخورد شما سپاسگزاریم — به‌زودی بررسی می‌کنیم!"));
    return;
  }
  if (c.mode === "b2b_company") { c.order = c.order || {}; c.order.b2b_company = text; c.mode = "b2b_phone"; await saveChat(env, cid, c); await send(env, +cid, tx(lang, "ask_b2b_phone")); return; }
  if (c.mode === "b2b_phone") {
    c.mode = null;
    var comp = (c.order || {}).b2b_company || "";
    await saveChat(env, cid, c);
    var bph = normPhone(text);
    var bkb = [];
    if (bph) bkb = [[{ text: "💬 WhatsApp Firma", url: "https://wa.me/" + bph }, { text: "📞 Ara", url: "tel:+" + bph }]];
    await notifyAdmin(env, "🏢 B2B TALEP / REQUEST / درخواست عمده\nFirma: " + comp + "\nTel: " + text + "\nLang: " + lang + " | Chat: " + cid, bkb);
    try {
      var nowb = istanbulNow();
      var bcode = "B2B-" + nowb.yy + nowb.mm2 + nowb.dd + "-" + nowb.hh + ("0" + nowb.min).slice(-2);
      await env.DB.prepare("INSERT INTO orders (code, kind, total, currency, name, phone, address, items, lang, chat, source) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
        .bind(bcode, "b2b", 0, "TL", String(comp).slice(0, 120), String(text).slice(0, 40), "", null, lang, String(cid).slice(0, 30), "tgbot").run();
    } catch (e) {}
    await send(env, +cid, tx(lang, "b2b_done"));
    return;
  }

  if (low.indexOf("/start") === 0) {
    var fresh = !c.lang;
    if (fresh) { c.lang = lang; await saveChat(env, cid, c); }
    statBump(env, "start");
    await send(env, +cid, greet(lang) + "\n\n" + tx(lang, "welcome", first) + (fresh ? "\n\n🌐 " + (DATA.LANG_NAMES[lang] || "") + " ▾" : ""), fresh ? kbLang() : kbMain(lang));
    var dl = text.split(" ")[1] || "";
    if (dl.indexOf("ref_") === 0) {
      var rid = dl.slice(4);
      if (rid && rid !== cid) {
        try {
          var rc = await getChat(env, rid);
          rc.refs = (rc.refs || 0) + 1;
          await saveChat(env, rid, rc);
          statBump(env, "referral");
        } catch (e) {}
      }
    } else if (dl.indexOf("p_") === 0) {
      var pm = menuById(dl.slice(2));
      if (pm) await send(env, +cid, tx(lang, "qty_prompt", pm.name[lang], pm.price, pm.unit[lang]), kbQty(pm, lang));
    }
  } else if (low.indexOf("/lang") === 0 || low.indexOf("/dil") === 0 || low.indexOf("/zaban") === 0) {
    await send(env, +cid, tx(lang, "pick_lang"), kbLang());
  } else if (low.indexOf("/menu") === 0 || low.indexOf("/fiyat") === 0) {
    await send(env, +cid, tx(lang, "menu_title"), kbMenu(lang));
  } else if (low.indexOf("/paket") === 0 || low.indexOf("/pack") === 0) {
    await send(env, +cid, tx(lang, "paket_title"), kbMenu(lang));
  } else if (low.indexOf("/b2b") === 0 || low.indexOf("/toptan") === 0) {
    await send(env, +cid, b2bText(lang), [[{ text: tx(lang, "b2b_btn"), callback_data: "b2breq" }], [{ text: tx(lang, "home"), callback_data: "home" }]]);
  } else if (low.indexOf("/sepet") === 0 || low.indexOf("/cart") === 0) {
    var ct3 = cartText(c, lang); await send(env, +cid, ct3.text, ct3.kb);
  } else if (low.indexOf("/siparislerim") === 0 || low.indexOf("/siparis") === 0 || low.indexOf("/orders") === 0) {
    var mo2 = await myOrders(env, cid, lang); await send(env, +cid, mo2.text, mo2.kb);
  } else if (low.indexOf("/sss") === 0 || low.indexOf("/faq") === 0 || low.indexOf("/help") === 0) {
    await send(env, +cid, faqText(lang), kbMain(lang));
  } else if (low.indexOf("/gununfiyati") === 0 || low.indexOf("/firsat") === 0) {
    var n4 = istanbulNow();
    await send(env, +cid, "🔥 " + L(lang, "GÜNÜN FIRSATI:", "TODAY'S SPECIAL:", "پیشنهاد ویژه امروز:") + "\n\n" + DATA.OFFERS[n4.yday % DATA.OFFERS.length], kbMenu(lang));
  } else if (low.indexOf("/teslimat") === 0 || low.indexOf("/bolgeler") === 0) {
    var an2 = (DATA.AREA_NAMES_TR || []).map(function (n, i) { return (i + 1) + ". " + n; }).join("\n");
    await send(env, +cid, L(lang, "🚚 TESLİMAT BÖLGELERİ\n\n" + an2 + "\n\nGün içinde teslim — Bağcılar, Esenler ve çevre mahalleler.", "🚚 DELIVERY AREAS\n\n" + an2 + "\n\nSame-day delivery.", "🚚 مناطق ارسال\n\n" + ((DATA.AREAS || []).map(function (a, i) { return (i + 1) + ". " + (a.fa || ""); }).join("\n")) + "\n\nارسال در همان روز."), kbMain(lang));
  } else if (low.indexOf("/galeri") === 0) {
    await sendGallery(env, +cid);
  } else if (low.indexOf("/takip") === 0) {
    var tc = (text.split(/\s+/)[1] || "").toUpperCase();
    if (!tc) await send(env, +cid, L(lang, "📌 Kullanım: /takip SİPARİŞKODU", "📌 Usage: /takip ORDERCODE", "📌 استفاده: /takip کد_سفارش"), kbMain(lang));
    else {
      var tro = null;
      try { tro = await env.DB.prepare("SELECT code, total, name FROM orders WHERE code=? AND chat=? ORDER BY rowid DESC LIMIT 1").bind(tc, cid).first(); } catch (e) {}
      await send(env, +cid, tro ? "✅ " + tro.code + " — " + fmtTL(tro.total) + " TL — " + (tro.name || "") : L(lang, "⚠️ Sipariş bulunamadı.", "⚠️ Order not found.", "⚠️ سفارش یافت نشد."), kbMain(lang));
    }
  } else if (low.indexOf("/iptal") === 0 || low.indexOf("/vazgec") === 0) {
    if (c.mode) { c.mode = null; await saveChat(env, cid, c); await send(env, +cid, L(lang, "✅ İşlem iptal edildi — sepetiniz korundu.", "✅ Cancelled — your cart is kept.", "✅ عملیات لغو شد — سبد شما حفظ شد."), kbMain(lang)); }
    else await send(env, +cid, L(lang, "Aktif bir işlem yok.", "No active operation.", "عملیات فعالی در جریان نیست."), kbMain(lang));
  } else if (low.indexOf("/odeme") === 0 || low.indexOf("/payment") === 0) {
    await send(env, +cid, L(lang,
      "💵 ÖDEME & TESLİMAT\n\n• Kapıda nakit veya kart\n• Gün içinde teslim (Bağcılar, Esenler ve çevresi)\n• Toptan siparişlarda havale/EFT\n• Gramaj garantisi — 1 kilo çiğ tartıp pişiriyoruz",
      "💵 PAYMENT & DELIVERY\n\n• Cash or card at the door\n• Same-day delivery (Bağcılar, Esenler and nearby)\n• Bank transfer for wholesale\n• Weight guarantee — 1 kg raw weighed, then cooked",
      "💵 پرداخت و تحویل\n\n• نقدی یا کارت درب منزل\n• تحویل در همان روز (باغجیلار، اسنلر و اطراف)\n• حواله برای عمده\n• تضمین وزن — ۱ کیلو چیغ وزن کرده و می‌پزیم"), kbMain(lang));
  } else if (low.indexOf("/referansim") === 0 || low.indexOf("/referans") === 0) {
    var mr = c.refs || 0;
    await send(env, +cid, L(lang,
      "👥 DAVET SİSTEMİ\n\nDavet ettiğiniz: " + mr + " kişi\n\n🔗 Davet linkiniz:\n" + BOT_URL + "?start=ref_" + cid,
      "👥 REFERRALS\n\nInvited friends: " + mr + "\n\n🔗 Your invite link:\n" + BOT_URL + "?start=ref_" + cid,
      "👥 سیستم دعوت\n\nدعوت‌شده‌ها: " + mr + " نفر\n\n🔗 لینک دعوت شما:\n" + BOT_URL + "?start=ref_" + cid), kbMain(lang));
  } else if (low.indexOf("/sube") === 0) {
    await send(env, +cid, tx(lang, "sube"), kbMain(lang));
  } else {
    await send(env, +cid, tx(lang, "fallback", first), kbMain(lang));
  }
}

// ---------- زمان استانبول ----------
function istanbulNow() {
  var parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  var o = {};
  parts.forEach(function (p) { o[p.type] = p.value; });
  var y = +o.year, m = +o.month, d = +o.day;
  var yday = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 86400000) + 1;
  return {
    yday: yday, hh: +o.hour % 24, min: +o.minute,
    dateStr: y + "-" + o.month + "-" + o.day,
    yy: String(y).slice(2), mm2: o.month, dd: o.day
  };
}
function slotsFor(interval) {
  var h = Math.min(Math.max(interval || 3, 1), 24);
  var n = 24 % h === 0 ? 24 / h : Math.floor(24 / h) + 1;
  var slots = [];
  for (var i = 0; i < n; i++) slots.push(("0" + ((9 + i * h) % 24)).slice(-2) + ":00");
  slots.sort(function (a, b) { return +a.slice(0, 2) - +b.slice(0, 2); });
  return slots;
}

// ---------- پست خودکار ----------
async function autopostTick(env) {
  var st = await getBotState(env);
  if (!st.channel || st.paused) return;
  var now = istanbulNow();
  var slots = slotsFor(st.interval);
  var today = st.posted[now.dateStr] = st.posted[now.dateStr] || [];
  for (var i = 0; i < slots.length; i++) {
    var hh = +slots[i].split(":")[0];
    if (now.hh * 60 + now.min >= hh * 60 && today.indexOf(i) === -1) {
      var text = slots[i] === OFFER_SLOT ? DATA.OFFERS[now.yday % DATA.OFFERS.length] : DATA.POSTS[st.counter % DATA.POSTS.length];
      var r = await tg(env, "sendMessage", { chat_id: st.channel, text: String(text).slice(0, 4000), reply_markup: { inline_keyboard: [[{ text: "🤖 Botla Hızlı Sipariş Ver", url: BOT_URL }]] } });
      st.counter++; today.push(i);
      await setSetting(env, "bot_state", st);
      if (r.ok) {
        await notifyAdmin(env, "📤 پست به کانال ارسال شد (" + slots[i] + "): " + DATA.POSTS_META[(st.counter - 1) % DATA.POSTS_META.length].badge);
        socialFanout(env, text);
      } else {
        await notifyAdmin(env, "⚠️ ارسال پست ناموفق: " + (r.description || ""));
      }
      break;
    }
  }
  var keys = Object.keys(st.posted);
  if (keys.length > 14) {
    keys.sort();
    for (var k = 0; k < keys.length - 14; k++) delete st.posted[keys[k]];
    await setSetting(env, "bot_state", st);
  }
}

// ---------- تیک هوشمند (با throttle ده دقیقه‌ای) ----------
async function maybeTick(env) {
  try {
    var last = await getSetting(env, "tick_ts");
    var nowTs = Date.now();
    if (last && nowTs - last < 600000) return; // حداکثر هر ۱۰ دقیقه
    await setSetting(env, "tick_ts", nowTs);
    await ensureWebhook(env);
    await autopostTick(env);
    await cartNudge(env, nowTs);
  } catch (e) {}
}
async function cartNudge(env, nowTs) {
  try {
    var lns = await getSetting(env, "nudge_scan");
    if (lns && nowTs - lns < 21600000) return; // هر ۶ ساعت یک اسکن
    await setSetting(env, "nudge_scan", nowTs);
    var rows2 = (await env.DB.prepare("SELECT chat_id, data FROM bot_chats LIMIT 400").all()).results || [];
    for (var i2 = 0; i2 < rows2.length; i2++) {
      var cc; try { cc = JSON.parse(rows2[i2].data); } catch (e) { continue; }
      if (cc && cc.cart && Object.keys(cc.cart).length && cc.ts && nowTs - cc.ts > 86400000 && !cc.nudged) {
        var lg = cc.lang || "tr";
        try {
          await tg(env, "sendMessage", { chat_id: rows2[i2].chat_id, text: L(lg,
            "🛒 Sepetiniz sizi bekliyor! Siparişinizi tamamlamak için 👉 /menu",
            "🛒 Your cart is waiting! To continue 👉 /menu",
            "🛒 سبد شما منتظر است! برای تکمیل سفارش 👉 /menu") });
        } catch (e) {}
        cc.nudged = true; await saveChat(env, rows2[i2].chat_id, cc);
      }
    }
  } catch (e) {}
}

// ---------- وبهوک خودکار ----------
async function ensureWebhook(env) {
  var tok = await getToken(env);
  if (!tok) return { ok: false, detail: "no-token" };
  try {
    var info = await (await fetch("https://api.telegram.org/bot" + tok + "/getWebhookInfo")).json();
    if (info.ok && info.result.url === HOOK_URL) return { ok: true, detail: "already" };
    var r = await (await fetch("https://api.telegram.org/bot" + tok + "/setWebhook", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: HOOK_URL, secret_token: HOOK_SECRET, allowed_updates: ["message", "callback_query"], drop_pending_updates: false })
    })).json();
    return r;
  } catch (e) { return { ok: false, description: String(e).slice(0, 200) }; }
}

// ---------- روتر ----------
export default {
  async fetch(request, env, ctx) {
    var url = new URL(request.url);
    var p = url.pathname;
    if (request.method === "POST" && p === HOOK_PATH) {
      if ((request.headers.get("x-telegram-bot-api-secret-token") || "") !== HOOK_SECRET) return new Response("forbidden", { status: 403 });
      try { var body = await request.json(); await handleUpdate(env, body); } catch (e) {}
      try { ctx.waitUntil(maybeTick(env)); } catch (e) {}
      return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
    }
    if (p === "/api/tick" && (url.searchParams.get("key") === HOOK_SECRET || (request.headers.get("x-tick-key") || "") === HOOK_SECRET)) {
      var done = {};
      try { done.webhook = await ensureWebhook(env); } catch (e) { done.webhook = String(e).slice(0, 120); }
      try { await autopostTick(env); done.autopost = "ok"; } catch (e) { done.autopost = String(e).slice(0, 120); }
      return new Response(JSON.stringify({ ok: true, detail: done }), { headers: { "content-type": "application/json" } });
    }
    if (p === "/health") return new Response("OK — Aykan TG Bot 24/7");
    if (p === "/api/setup" && url.searchParams.get("key") === HOOK_SECRET) {
      var r2 = await ensureWebhook(env);
      return new Response(JSON.stringify(r2), { headers: { "content-type": "application/json" } });
    }
    if (p === "/api/sim" && request.method === "POST" && (request.headers.get("x-sim-key") || "") === HOOK_SECRET) {
      var ups = await request.json();
      SIM = [];
      for (var i = 0; i < (ups.updates || []).length; i++) {
        try { await handleUpdate(env, ups.updates[i]); } catch (e) { SIM.push({ method: "ERROR", payload: String(e) }); }
      }
      var out = SIM; SIM = null;
      return new Response(JSON.stringify({ ok: true, calls: out }, null, 1), { headers: { "content-type": "application/json" } });
    }
    return new Response("AYKAN ET & MANGAL — Telegram Bot Worker 24/7 ⚡<br><a href=\"/health\">health</a>", { headers: { "content-type": "text/html; charset=utf-8" } });
  },
  async scheduled(event, env) {
    await ensureWebhook(env);
    await autopostTick(env);
  },
};
