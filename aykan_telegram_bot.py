#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AYKAN ET & MANGAL — Telegram Bot v2 (trilingual: TR / EN / FA)
@AykanEtmangal_shapping_bot
- B2C order flow (menu, cart, checkout) in 3 languages
- B2B wholesale packages (15 packages)
- Admin panel (Persian) + order notifications
- AUTO-POSTER: trend-based trilingual posts for 10 Istanbul areas,
  published to a Telegram channel (bot must be added as channel admin).
"""
import json, os, re, time, datetime, traceback, threading, urllib.request, urllib.parse

BASE = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(BASE, "telegram_bot_config.json"), encoding="utf-8"))
TOKEN = CFG["token"]
API = "https://api.telegram.org/bot" + TOKEN
ADMIN_PIN = str(CFG.get("admin_pin", "5269"))
OWNER_WA = CFG.get("owner_whatsapp", "905377325269")
BOT_USERNAME = CFG.get("bot_username", "AykanEtmangal_shapping_bot")

STATE_PATH = os.path.join(BASE, "telegram_bot_state.json")
ORDERS_PATH = os.path.join(BASE, "telegram_orders.json")
CATALOG_PATH = os.path.join(BASE, "aykan_et_package_catalog.json")
LEADS_PATH = os.path.join(BASE, "aykan_leads_compact.json")

# ---- posting interval (hours). 3 => 8 posts/day; 8 => 3/day; 24 => 1/day. change: /aralik N ----
DEFAULT_POST_INTERVAL = 3
OFFER_SLOT = "09:00"  # first post of the morning = daily special offer

SITE_URL = "https://sbz-edu.github.io/aykan-et-mangal/"
CHANNEL_URL = "https://t.me/AykanEtmangal_shopping"
MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Aykan+Et+Mangal+G%C3%B6ztepe+Ba%C4%9Fc%C4%B1lar"


def autopost_slots():
    try:
        h = int(CFG.get("post_interval", DEFAULT_POST_INTERVAL))
    except Exception:
        h = DEFAULT_POST_INTERVAL
    h = min(max(h, 1), 24)
    n = 24 // h if 24 % h == 0 else 24 // h + 1
    slots = ["%02d:00" % ((9 + i * h) % 24) for i in range(n)]
    return sorted(slots, key=lambda s: int(s[:2]))

# ---------------- MENU (multilingual) ----------------
MENU = [
    {"id": "kemikli", "name": {"tr": "Dana Kemikli Et", "en": "Beef on the Bone", "fa": "گوشت گوساله استخوان‌دار"}, "price": 650, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}},
    {"id": "kusbasi", "name": {"tr": "Dana Kuşbaşı / Özel Çekim Kıyma", "en": "Beef Cubes / Fresh-Ground Minced", "fa": "کوپه گوساله / گوشت چرخ‌کرده اختصاصی"}, "price": 750, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}},
    {"id": "antrikot", "name": {"tr": "Dana Antrikot", "en": "Beef Ribeye (Antrikot)", "fa": "آنترکوت گوساله"}, "price": 1100, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}},
    {"id": "kuzu", "name": {"tr": "Kuzu Et / Kuşbaşı", "en": "Lamb Meat / Cubes", "fa": "گوشت بره / کوپه بره"}, "price": 1069, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}},
    {"id": "pirzola", "name": {"tr": "Kuzu Pirzola", "en": "Lamb Chops", "fa": "سیخ بره (پیرولا)"}, "price": 1399, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}},
    {"id": "mangal", "name": {"tr": "Aykan Özel Mangal Paketi", "en": "Aykan Special BBQ Pack", "fa": "پکیج ویژه منقل آیکان"}, "price": 998, "unit": {"tr": "Paket", "en": "pack", "fa": "بسته"}},
    {"id": "tortilla", "name": {"tr": "Viral Tortilla Kebabı (10 dk)", "en": "Viral Tortilla Kebab (10 min)", "fa": "کباب تورتیلای وایرال (۱۰ دقیقه)"}, "price": 399, "unit": {"tr": "Porsiyon", "en": "portion", "fa": "پرس"}},
    {"id": "aile", "name": {"tr": "Haftalık Aile Et Kutusu", "en": "Weekly Family Meat Box", "fa": "جعبه گوشت هفتگی خانواده"}, "price": 1472, "unit": {"tr": "Kutu", "en": "box", "fa": "جعبه"}},
]
MENU_BY_ID = {m["id"]: m for m in MENU}

CAT_TR = {"Big Restaurant": "Restoran / Kebapçı", "Ordinary Fast Food": "Fast Food / Döner",
          "Hotel": "Otel", "Catering": "Catering / Fabrika", "Ordinary People": "Site & Aile Grubu"}

# ---------------- UI STRINGS (tr / en / fa) ----------------
T = {
  "tr": {
    "welcome": "Merhaba {}! 👋\n\n🥩 AYKAN ET & MANGAL — Et • Balık • Tavuk • Kuzu\nTanzim Satış Mağazası resmî sipariş hattına hoş geldiniz!\n\n🔥 Günlük taze kesim — her gün 22:30'a kadar açık!\n\nDil seçmek için /lang — Choose language: 🇬🇧 / 🇮🇷",
    "lang_set": "✅ Dil ayarlandı: Türkçe 🇹🇷",
    "pick_lang": "🌐 Dil seçin / Choose your language / زبان را انتخاب کنید:",
    "menu_title": "🥩 GÜNLÜK TAZE — GÜNCEL FİYATLAR 🥩\n\nSepete eklemek istediğiniz ürünü seçin 👇",
    "qty_prompt": "🥩 {} — {} TL/{}\n\nMiktar seçin 👇",
    "added": "✅ Sepete eklendi: {} × {} {}",
    "cart_title": "🛒 SEPETİNİZ:\n",
    "cart_empty": "🛒 Sepetiniz şu anda boş.\n\nMenüden ürün eklemek için 👇",
    "cart_total": "\n💰 TOPLAM: {} TL",
    "checkout_hint": "\n✅ Onaylamak için aşağıdaki butona basın:",
    "ask_name": "🧾 Siparişinizi tamamlamak için:\n\n1️⃣ Ad Soyadınızı yazın:",
    "ask_phone": "📞 Telefon numaranızı yazın (örn: 0537 732 52 69):",
    "ask_note": "🏠 Teslim adresi / notunuzu yazın (mağazadan gel-al için 'gel' yazın):",
    "order_ok": "🧾 SİPARİŞ ONAYI — {}\n\n{}\n\n💰 TOPLAM: {} TL\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ Siparişiniz alındı! Kısa süre içinde WhatsApp/telefon ile onaylayacağız.\n💬 Hızlı değişiklik/iptal: 0537 732 52 69\n\nTeşekkürler! 🥩🔥",
    "paket_title": "📦 ÖZEL PAKETLERİMİZ 🔥\n\n1️⃣ Aykan Özel Mangal Paketi — 998 TL\n1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + kömür + sos\n\n2️⃣ Viral Tortilla Kebabı — 399 TL\n10 dakikada hazır!\n\n3️⃣ Haftalık Aile Et Kutusu — 1.472 TL\n\nSepete eklemek için menüye dönün 👇",
    "b2b_title": "🏢 TOPTAN (B2B) PAKETLERİMİZ — 15 PAKET 📦\n",
    "b2b_min": "   • {} — %{} indirim (min. {})",
    "b2b_cta": "\nNumune ve özel teklif için geri arama isteyin 👇",
    "b2b_btn": "📞 Geri Arama İsteği",
    "ask_company": "🏢 Firma adınızı yazın:",
    "ask_b2b_phone": "📞 Telefon numaranızı yazın, toptan satış yetkilimiz sizi arasın:",
    "b2b_done": "✅ Talebiniz alındı! En kısa sürede sizi arayacağız.\n💬 Acil ise WhatsApp: 0537 732 52 69",
    "sube": "📍 ŞUBELERİMİZ\n\n🏪 Şube 1 — Bağcılar Göztepe:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(Göztepe Metro İstasyonu yanı)\n\n🏪 Şube 2 — Esenler Kemer:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 Her gün 22:30'a kadar açığız.\n📞 Tel / WhatsApp: 0537 732 52 69",
    "iletisim": "💬 İLETİŞİM\n\n📱 WhatsApp & Tel: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 Instagram: @aykanetmangal\n✈️ Telegram: Bu bot!",
    "unknown": "Anlamadım 🤔 Aşağıdaki menüden devam edebilirsiniz:",
    "kb": {"menu": "🥩 Menü & Fiyatlar", "paket": "📦 Paketler", "sepet": "🛒 Sepetim",
           "b2b": "🏢 B2B Toptan", "sube": "📍 Şubeler", "iletisim": "💬 WhatsApp",
           "site": "🌐 Web Sitemiz", "kanal": "📢 Kanalımız", "harita": "📍 Yol Tarifi"},
    "checkout": "✅ Siparişi Onayla", "clear": "🗑 Sepeti Boşalt", "continue": "➕ Devam",
    "cart_empty_toast": "Sepetiniz boş!", "cleared": "🗑 Sepet boşaltıldı.",
    "back_menu": "⬅️ Menü", "home": "🏠 Ana Menü",
  },
  "en": {
    "welcome": "Hello {}! 👋\n\n🥩 AYKAN ET & MANGAL — Beef • Fish • Chicken • Lamb\nWelcome to the official order line of our Cash-and-Carry Butchery!\n\n🔥 Fresh daily cuts — open every day until 22:30!\n\n/language to change dil 🇹🇷 / زبان 🇮🇷",
    "lang_set": "✅ Language set: English 🇬🇧",
    "pick_lang": "🌐 Select language / Dil seçin / زبان را انتخاب کنید:",
    "menu_title": "🥩 FRESH DAILY — CURRENT PRICES 🥩\n\nChoose a product to add to your cart 👇",
    "qty_prompt": "🥩 {} — {} TL/{}\n\nSelect quantity 👇",
    "added": "✅ Added to cart: {} × {} {}",
    "cart_title": "🛒 YOUR CART:\n",
    "cart_empty": "🛒 Your cart is empty.\n\nAdd products from the menu 👇",
    "cart_total": "\n💰 TOTAL: {} TL",
    "checkout_hint": "\n✅ Press the button below to confirm:",
    "ask_name": "🧾 To complete your order:\n\n1️⃣ Please type your full name:",
    "ask_phone": "📞 Type your phone number (e.g. 0537 732 52 69):",
    "ask_note": "🏠 Type delivery address / note (type 'pickup' for store pickup):",
    "order_ok": "🧾 ORDER CONFIRMATION — {}\n\n{}\n\n💰 TOTAL: {} TL\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ Order received! We will confirm shortly via WhatsApp/phone.\n💬 Quick changes/cancellation: 0537 732 52 69\n\nThank you! 🥩🔥",
    "paket_title": "📦 OUR SPECIAL PACKS 🔥\n\n1️⃣ Aykan Special BBQ Pack — 998 TL\n1 kg meatballs/cubes + 1 kg marinated chicken + charcoal + sauce\n\n2️⃣ Viral Tortilla Kebab — 399 TL\nReady in 10 minutes!\n\n3️⃣ Weekly Family Meat Box — 1,472 TL\n\nReturn to the menu to add 👇",
    "b2b_title": "🏢 WHOLESALE (B2B) PACKAGES — 15 PACKAGES 📦\n",
    "b2b_min": "   • {} — {}% off (min. {})",
    "b2b_cta": "\nRequest a callback for samples and custom offers 👇",
    "b2b_btn": "📞 Request Callback",
    "ask_company": "🏢 Type your company name:",
    "ask_b2b_phone": "📞 Type your phone number — our wholesale manager will call you:",
    "b2b_done": "✅ Request received! We will call you as soon as possible.\n💬 Urgent? WhatsApp: 0537 732 52 69",
    "sube": "📍 OUR BRANCHES\n\n🏪 Branch 1 — Bağcılar Göztepe:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(next to Göztepe Metro Station)\n\n🏪 Branch 2 — Esenler Kemer:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 Open every day until 22:30.\n📞 Tel / WhatsApp: 0537 732 52 69",
    "iletisim": "💬 CONTACT\n\n📱 WhatsApp & Tel: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 Instagram: @aykanetmangal\n✈️ Telegram: this bot!",
    "unknown": "I didn't understand 🤔 Please use the menu below:",
    "kb": {"menu": "🥩 Menu & Prices", "paket": "📦 Packs", "sepet": "🛒 My Cart",
           "b2b": "🏢 B2B Wholesale", "sube": "📍 Branches", "iletisim": "💬 WhatsApp",
           "site": "🌐 Our Website", "kanal": "📢 Our Channel", "harita": "📍 Get Directions"},
    "checkout": "✅ Confirm Order", "clear": "🗑 Empty Cart", "continue": "➕ Continue",
    "cart_empty_toast": "Your cart is empty!", "cleared": "🗑 Cart emptied.",
    "back_menu": "⬅️ Menu", "home": "🏠 Main Menu",
  },
  "fa": {
    "welcome": "سلام {}! 👋\n\n🥩 آیکان ات و منگال — گوشت گوساله • ماهی • مرغ • بره\nبه خط سفارش رسمی فروشگاه قصابی تانزیم ساتیش ما خوش آمدید!\n\n🔥 گوشت تازهِ برش روزانه — هر روز تا ۲۲:۳۰ باز است!\n\n/language برای تغییر زبان 🇹🇷 / 🇬🇧",
    "lang_set": "✅ زبان تنظیم شد: فارسی 🇮🇷",
    "pick_lang": "🌐 زبان را انتخاب کنید / Select language / Dil seçin:",
    "menu_title": "🥩 تازه روزانه — قیمت‌های به‌روز 🥩\n\nمحصول مورد نظر را برای افزودن به سبد انتخاب کنید 👇",
    "qty_prompt": "🥩 {} — {} لیر/{}\n\nمقدار را انتخاب کنید 👇",
    "added": "✅ به سبد اضافه شد: {} × {} {}",
    "cart_title": "🛒 سبد خرید شما:\n",
    "cart_empty": "🛒 سبد خرید شما خالی است.\n\nاز منو محصول اضافه کنید 👇",
    "cart_total": "\n💰 جمع کل: {} لیر",
    "checkout_hint": "\n✅ برای تایید، دکمه زیر را بزنید:",
    "ask_name": "🧾 برای تکمیل سفارش:\n\n1️⃣ نام و نام خانوادگی خود را بنویسید:",
    "ask_phone": "📞 شماره تلفن خود را بنویسید (مثلاً 0537 732 52 69):",
    "ask_note": "🏠 آدرس تحویل / یادداشت خود را بنویسید (برای تحویل حضوری در فروشگاه بنویسید «حضوری»):",
    "order_ok": "🧾 تاییدیه سفارش — {}\n\n{}\n\n💰 جمع کل: {} لیر\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ سفارش شما ثبت شد! به‌زودی از طریق واتساپ/تلفن تایید می‌کنیم.\n💬 تغییر/لغو سریع: 0537 732 52 69\n\nمتشکریم! 🥩🔥",
    "paket_title": "📦 پکیج‌های ویژه ما 🔥\n\n1️⃣ پکیج ویژه منقل آیکان — ۹۹۸ لیر\n۱ کیلو کوفته/کوپه + ۱ کیلو مرغ مارین‌شده + ذغال + سس\n\n2️⃣ کباب تورتیلای وایرال — ۳۹۹ لیر\nدر ۱۰ دقیقه آماده!\n\n3️⃣ جعبه گوشت هفتگی خانواده — ۱٫۴۷۲ لیر\n\nبرای افزودن به منو برگردید 👇",
    "b2b_title": "🏢 پکیج‌های عمده (B2B) ما — ۱۵ پکیج 📦\n",
    "b2b_min": "   • {} — ٪{} تخفیف (حداقل {})",
    "b2b_cta": "\nبرای نمونه و پیشنهاد اختصاصی، درخواست تماس بدهید 👇",
    "b2b_btn": "📞 درخواست تماس",
    "ask_company": "🏢 نام شرکت/مجموعه خود را بنویسید:",
    "ask_b2b_phone": "📞 شماره تلفن خود را بنویسید تا کارشناس فروش عمده با شما تماس بگیرد:",
    "b2b_done": "✅ درخواست شما ثبت شد! در سریع‌ترین زمان با شما تماس می‌گیریم.\n💬 فوری است؟ واتساپ: 0537 732 52 69",
    "sube": "📍 شعب ما\n\n🏪 شعبه ۱ — باجیلار گوزتپه:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(کنار ایستگاه متروی گوزتپه)\n\n🏪 شعبه ۲ — اسنلر کمر:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 هر روز تا ۲۲:۳۰ باز هستیم.\n📞 تلفن / واتساپ: 0537 732 52 69",
    "iletisim": "💬 ارتباط\n\n📱 واتساپ و تلفن: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 اینستاگرام: @aykanetmangal\n✈️ تلگرام: همین ربات!",
    "unknown": "متوجه نشدم 🤔 از منوی زیر ادامه دهید:",
    "kb": {"menu": "🥩 منو و قیمت‌ها", "paket": "📦 پکیج‌ها", "sepet": "🛒 سبد خرید",
           "b2b": "🏢 عمده B2B", "sube": "📍 شعب", "iletisim": "💬 واتساپ",
           "site": "🌐 سایت ما", "kanal": "📢 کانال ما", "harita": "📍 مسیر ما"},
    "checkout": "✅ تایید سفارش", "clear": "🗑 خالی کردن سبد", "continue": "➕ ادامه",
    "cart_empty_toast": "سبد خرید شما خالی است!", "cleared": "🗑 سبد خرید خالی شد.",
    "back_menu": "⬅️ منو", "home": "🏠 منوی اصلی",
  },
}
LANG_NAMES = {"tr": "🇹🇷 Türkçe", "en": "🇬🇧 English", "fa": "🇮🇷 فارسی"}

# ---------------- 10 AREAS (tr + fa + hashtags) ----------------
AREAS = [
    {"tr": "Bağcılar (Göztepe)", "fa": "باجیلار (گوزتپه)", "tags": "#bağcılar #göztepe #bağcılaret"},
    {"tr": "Bağcılar (Güneşli & Basın Ekspres)", "fa": "باجیلار (گونشلی و باسین اکسپرس)", "tags": "#güneşli #basınEkspres"},
    {"tr": "Bağcılar (Mahmutbey & İSTOÇ)", "fa": "باجیلار (محمودبی و ایستوچ)", "tags": "#mahmutbey #istoç"},
    {"tr": "Esenler (Kemer)", "fa": "اسنلر (کمر)", "tags": "#esenler #kemer #esenleret"},
    {"tr": "Başakşehir & İkitelli", "fa": "باشاک‌شهیر و ایکی‌تلی", "tags": "#başakşehir #ikitelli"},
    {"tr": "Bahçelievler & Şirinevler", "fa": "باهچه‌لی‌اولر و شیرین‌اولر", "tags": "#bahçelievler #şirinevler"},
    {"tr": "Güngören & Merter", "fa": "گونگورن و مرتر", "tags": "#güngören #merter"},
    {"tr": "Küçükçekmece (Halkalı & Sefaköy)", "fa": "کوچوک‌چکمجه (حلالی و صفاکوی)", "tags": "#halkalı #sefaköy"},
    {"tr": "Gaziosmanpaşa & Sultangazi", "fa": "قاضی‌عثمان‌پاشا و سلطان‌قاضی", "tags": "#gaziosmanpaşa #sultangazi"},
    {"tr": "Zeytinburnu, Topkapı & Bakırköy", "fa": "زیتون‌بورنو، توپکاپی و باکیرکوی", "tags": "#zeytinburnu #topkapı #bakırköy"},
]

# ---------------- TREND CONTENT LIBRARY (15 templates x 3 languages) ----------------
TEMPLATES = [
 {"emoji": "🌯", "tr_t": "VİRAL TORTİLLA KEBABI", "tr_b": "Sosyal medyanın konuştuğu lezzet mağazamızda! 10 dakikada hazır, 399 TL. {area} civarındaysanız mutlaka deneyin!",
  "en_t": "VIRAL TORTILLA KEBAB", "en_b": "The taste everyone is talking about! Ready in 10 minutes — 399 TL. Try it if you're around {area}!",
  "fa_t": "کباب تورتیلای وایرال", "fa_b": "طعمی که همه درباره‌اش حرف می‌زنند! در ۱۰ دقیقه آماده — ۳۹۹ لیر. اگر اطراف {area_fa} هستید حتماً امتحان کنید!",
  "tags": "#tortillakebap #viral"},
 {"emoji": "🔥", "tr_t": "HAFTA SONU MANGAL PAKETİ", "tr_b": "1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + meşe kömürü + özel sos = sadece 998 TL! {area} komşularına özel.",
  "en_t": "WEEKEND BBQ PACK", "en_b": "1 kg meatballs/cubes + 1 kg marinated chicken + oak charcoal + special sauce = only 998 TL! Special for {area} neighbours.",
  "fa_t": "پکیج منقل آخر هفته", "fa_b": "۱ کیلو کوفته/کوپه + ۱ کیلو مرغ مارین + ذغال بلوط + سس مخصوص = فقط ۹۹۸ لیر! ویژه همسایگان {area_fa}.",
  "tags": "#mangal #haftasonu"},
 {"emoji": "🥩", "tr_t": "GÜNLÜK TAZE KESİM", "tr_b": "Sabah kesilen et, akşam sofranızda! Araçısız, kasaptan direkt tanzim fiyatına. Kemikli 650 TL • Kuşbaşı/Kıyma 750 TL.",
  "en_t": "FRESH DAILY CUTS", "en_b": "Meat cut in the morning, on your table by evening! Direct from the butcher at cash-and-carry prices. Bone-in 650 TL • Cubes/minced 750 TL.",
  "fa_t": "برش تازه روزانه", "fa_b": "گوشتی صبح ذبح می‌شود و شب روی سفره شماست! مستقیم از قصاب بدون واسطه. استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ لیر.",
  "tags": "#günlükTaze #tanzim"},
 {"emoji": "💰", "tr_t": "ŞEFFAF VİTRİN FİYATLARI", "tr_b": "Fiyyatlarda sürpriz yok! Vitrinde ne yazıyorsa o: Kemikli 650 • Kuşbaşı 750 • Antrikot 1100 • Kuzu 1069 • Pirzola 1399 TL/Kg.",
  "en_t": "TRANSPARENT COUNTER PRICES", "en_b": "No surprises! What you see on the counter is what you pay: Bone-in 650 • Cubes 750 • Ribeye 1100 • Lamb 1069 • Chops 1399 TL/kg.",
  "fa_t": "قیمت‌های شفاف ویترین", "fa_b": "بدون سورپرایز! همان که روی ویترین است می‌پردازید: استخوان‌دار ۶۵۰ • کوپه ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو.",
  "tags": "#fiyatşeffaflığı"},
 {"emoji": "🍖", "tr_t": "KUZU PİRZOLA ÖZEL", "tr_b": "Misafir sofralarının yıldızı: Kuzu Pirzola 1.399 TL/Kg. {area} bölgesinde en taze kuzu bizde!",
  "en_t": "LAMB CHOPS SPECIAL", "en_b": "The star of guest tables: Lamb Chops 1,399 TL/kg. The freshest lamb in {area} is here!",
  "fa_t": "سیخ بره ویژه", "fa_b": "ستاره سفره مهمانی: سیخ بره ۱۳۹۹ لیر/کیلو. تازه‌ترین بره در {area_fa} اینجاست!",
  "tags": "#kuzupirzola"},
 {"emoji": "🥩", "tr_t": "DANA ANTRİKOT", "tr_b": "Restoran kalitesinde antrikot — 1.100 TL/Kg. Mangal için en iyisi, {area} ustalarının tercihi!",
  "en_t": "BEEF RIBEYE", "en_b": "Restaurant-quality ribeye — 1,100 TL/kg. The best for BBQ — the choice of grill masters in {area}!",
  "fa_t": "آنترکوت گوساله", "fa_b": "آنترکوت با کیفیت رستوران — ۱۱۰۰ لیر/کیلو. بهترین برای منقل — انتخاب استادهای {area_fa}!",
  "tags": "#antrikot"},
 {"emoji": "🌭", "tr_t": "ÖZEL ÇEKİM KIYMA", "tr_b": "İstediğiniz gramajda, gözünüzün önünde çekiyoruz! Köfteniz burgeriniz için ideal yağ oranı — 750 TL/Kg.",
  "en_t": "CUSTOM-GROUND MINCED", "en_b": "Ground to your preferred fat ratio, right before your eyes! Ideal for your meatballs & burgers — 750 TL/kg.",
  "fa_t": "گوشت چرخ‌کرده اختصاصی", "fa_b": "با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم! برای کوفته و برگر شما — ۷۵۰ لیر/کیلو.",
  "tags": "#kıyma #köfte"},
 {"emoji": "🍗", "tr_t": "MARİNE TAVUK + SOS", "tr_b": "Mangalın hafif tarafı: marine edilmiş tavuk kanat ve butlar + özel soslarımız. Toptan fiyatına tavuk!",
  "en_t": "MARINATED CHICKEN + SAUCE", "en_b": "The lighter side of BBQ: marinated chicken wings & thighs + our special sauces at wholesale prices!",
  "fa_t": "مرغ مارین + سس", "fa_b": "طرف سبک منقل: بال و ران مرغ مارین‌شده + سس‌های مخصوص ما با قیمت عمده!",
  "tags": "#tavuk #marine"},
 {"emoji": "🧺", "tr_t": "HAFTALIK AİLE KUTUSU", "tr_b": "Ailenin haftalık et ihtiyacı tek kutuda — 1.472 TL! Karışık ve ekonomik: kıyma + kuşbaşı + tavuk.",
  "en_t": "WEEKLY FAMILY BOX", "en_b": "The family's weekly meat needs in one box — 1,472 TL! Mixed & economical: minced + cubes + chicken.",
  "fa_t": "جعبه هفتگی خانواده", "fa_b": "نیاز هفتگی گوشت خانواده در یک جعبه — ۱۴۷۲ لیر! مخلوط و اقتصادی: چرخ‌کرده + کوپه + مرغ.",
  "tags": "#ailekutusu"},
 {"emoji": "🏞️", "tr_t": "PİKNİK & KENT ORMANI SEZONU", "tr_b": "{area} çevresindeki piknik alanları için hazır mangal paketlerimiz! Yol üstünde uğrayın, hazır alın.",
  "en_t": "PICNIC SEASON", "en_b": "Ready BBQ packs for picnic areas around {area}! Stop by on your way and pick up everything ready.",
  "fa_t": "فصل پیک‌نیک", "fa_b": "پکیج‌های آماده منقل برای فضاهای پیک‌نیک اطراف {area_fa}! در مسیر توقف کنید و آماده تحویل بگیرید.",
  "tags": "#piknik #kentormanı"},
 {"emoji": "🏘️", "tr_t": "SİTE TOPLU SİPARİŞ", "tr_b": "Site sakinlerine %8 indirim + haftada 1 gün siteye ÜCRETSİZ teslimat! Site yönetiminizle konuşun, toplu sipariş verin.",
  "en_t": "RESIDENCE GROUP ORDERS", "en_b": "8% discount for residents + FREE weekly delivery to your complex! Talk to your building management and order together.",
  "fa_t": "سفارش جمعی مجتمع‌ها", "fa_b": "٪۸ تخفیف برای ساکنان + تحویل رایگان هفتگی درب مجتمع! با مدیریت مجموعه خود صحبت کنید و جمعی سفارش دهید.",
  "tags": "#sitesiparişi"},
 {"emoji": "🏢", "tr_t": "RESTORAN & OTEL İÇİN TOPTAN", "tr_b": "İşletmenize özel 15 toptan paket: %10'a varan indirim, günlük sevkiyat, kurumsal fatura. Numune gönderiyoruz!",
  "en_t": "WHOLESALE FOR RESTAURANTS & HOTELS", "en_b": "15 wholesale packages for your business: up to 10% off, daily delivery, corporate invoicing. Free samples!",
  "fa_t": "عمده برای رستوران و هتل", "fa_b": "۱۵ پکیج عمده ویژه کسب‌وکار شما: تا ٪۱۰ تخفیف، ارسال روزانه، فاکتور رسمی. نمونه رایگان!",
  "tags": "#toptan #b2b"},
 {"emoji": "🕗", "tr_t": "22:30'A KADAR AÇIK", "tr_b": "İş çıkışı et almak için mağazamız açık! {area} bölgesinde en geç kapanan kasap — Göztepe Metro yanı & Kemer Esenler.",
  "en_t": "OPEN UNTIL 22:30", "en_b": "Our store is open after work! The latest-closing butcher in {area} — next to Göztepe Metro & Kemer Esenler.",
  "fa_t": "باز تا ۲۲:۳۰", "fa_b": "فروشگاه ما بعد از کار هم باز است! دیرترین قصابِ بسته‌شده در {area_fa} — کنار متروی گوزتپه و کمر اسنلر.",
  "tags": "#açık #gece"},
 {"emoji": "⭐", "tr_t": "MÜŞTERİ GÜVENİ", "tr_b": "Her kesim tartıda, göz önünde. Teraziye güvenen {area} komşularının kasabı: AYKAN ET & MANGAL.",
  "en_t": "CUSTOMER TRUST", "en_b": "Every cut weighed in front of you. The trusted butcher of {area} neighbours: AYKAN ET & MANGAL.",
  "fa_t": "اعتماد مشتری", "fa_b": "هر برش جلوی شما و روی ترازو وزن می‌شود. قصاب مورد اعتماد همسایگان {area_fa}: آیکان ات و منگال.",
  "tags": "#güven #terazi"},
 {"emoji": "🤖", "tr_t": "TELEGRAM'DAN SİPARİŞ", "tr_b": "Sıra beklemek yok! Bu bottan veya WhatsApp'tan (0537 732 52 69) sipariş verin, hazırlayalım — siz gelip alın veya adresinize gönderelim.",
  "en_t": "ORDER VIA TELEGRAM", "en_b": "No queues! Order from this bot or via WhatsApp (0537 732 52 69) — we prepare it, you pick it up or we deliver.",
  "fa_t": "سفارش از تلگرام", "fa_b": "بدون صف! از همین ربات یا واتساپ (0537 732 52 69) سفارش دهید — ما آماده می‌کنیم، شما تحویل بگیرید یا به آدرس شما بفرستیم.",
  "tags": "#telegram #sipariş"},
 {"emoji": "🐟", "tr_t": "BALIK TEZGAHIMIZ AÇILDI!", "tr_b": "Et • Balık • Tavuk • Kuzu! Tezgahımızda günlük taze balık çeşitleri de var. {area} bölgesinde et ve balık tek adreste!",
  "en_t": "OUR FISH COUNTER IS OPEN!", "en_b": "Beef • Fish • Chicken • Lamb! Fresh daily fish varieties at our counter. Meat & fish in one address in {area}!",
  "fa_t": "مغازه ماهی ما افتتاح شد!", "fa_b": "گوساله • ماهی • مرغ • بره! انواع ماهی تازه روزانه در ویترین ما. گوشت و ماهی در یک آدرس در {area_fa}!",
  "tags": "#balık #taze"},
 {"emoji": "❄️", "tr_t": "SOĞUK ZİNCİR + HİJYEN", "tr_b": "Etimiz kesimden tezgaha kadar soğuk zincirde. Hijyen belgeli, izlenebilir, güvenli. Kasaplık ciddi iştir!",
  "en_t": "COLD CHAIN + HYGIENE", "en_b": "Our meat stays in the cold chain from butchering to counter. Certified hygiene, traceable, safe. Butchery is serious business!",
  "fa_t": "زنجیره سرد + بهداشت", "fa_b": "گوشت ما از ذبح تا ویترین در زنجیره سرد می‌ماند. بهداشت دارای گواهی، قابل ردیابی، مطمئن. قصابی کار جدی است!",
  "tags": "#hijyen #soğukzincir"},
 {"emoji": "🛵", "tr_t": "HIZLI SİPARİŞ TESLİMATI", "tr_b": "WhatsApp'tan (0537 732 52 69) veya bu bottan sipariş verin — {area} çevresine hızlı hazırlık ve teslimat!",
  "en_t": "FAST ORDER & DELIVERY", "en_b": "Order via WhatsApp (0537 732 52 69) or this bot — fast preparation and delivery around {area}!",
  "fa_t": "سفارش و تحویل سریع", "fa_b": "از واتساپ (0537 732 52 69) یا همین ربات سفارش دهید — آماده‌سازی و تحویل سریع در اطراف {area_fa}!",
  "tags": "#teslimat #hızlı"},
 {"emoji": "🧆", "tr_t": "KÖFTE USTASININ SIRRI", "tr_b": "İyi köfte doğru kıymadan geçer! Zırhta çekilmiş, ideal yağ oranlı kıymamızla köfteleriniz hafızalara kazınır — 750 TL/Kg.",
  "en_t": "THE MEATBALL MASTER'S SECRET", "en_b": "Great meatballs start with the right mince! Our stone-ground, ideal-fat-ratio minced meat will make your meatballs legendary — 750 TL/kg.",
  "fa_t": "راز استاد کوفته", "fa_b": "کوفته خوب از گوشت چرخ‌کرده درست شروع می‌شود! گوشت چرخ‌شده با نسبت چربی ایده‌آل، کوفته‌های شما را افسانه‌ای می‌کند — ۷۵۰ لیر/کیلو.",
  "tags": "#köfte #kıyma"},
 {"emoji": "🕌", "tr_t": "%100 HELAL GÜVENCESİ", "tr_b": "Kesimimizden sofranıza kadar her adımda helal ve şeffaf süreç. {area} komşularının güvendiği kasap: AYKAN.",
  "en_t": "100% HALAL ASSURANCE", "en_b": "Halal and transparent at every step, from butchering to your table. The trusted butcher of {area}: AYKAN.",
  "fa_t": "تضمین ۱۰۰٪ حلال", "fa_b": "از ذبح تا سفره شما، در هر مرحله فرایندی حلال و شفاف. قصاب مورد اعتماد همسایگان {area_fa}: آیکان.",
  "tags": "#helal #güven"},
 {"emoji": "📅", "tr_t": "CUMA'YA HAZIRLIK", "tr_b": "Cuma sofrası için en taze kesimler bugün hazır! Misafir gelecek olan {area} komşularına: kuşbaşı, pirzola ve kuzu çeşitlerimiz bekliyor.",
  "en_t": "FRIDAY TABLE PREP", "en_b": "The freshest cuts for your Friday table are ready today! For {area} neighbours expecting guests: cubes, chops and lamb varieties are waiting.",
  "fa_t": "آماده‌سازی جمعه", "fa_b": "تازه‌ترین برش‌ها برای سفره جمعه امروز آماده است! برای همسایگان {area_fa} که مهمان دارند: کوپه، پیرولا و انواع بره منتظر است.",
  "tags": "#cuma #sofra"},
 {"emoji": "🎁", "tr_t": "KOMŞUNU GETİR, KAZAN", "tr_b": "Komşunuzu mağazamıza getirin, ikisinize de sürpriz indirim! {area} mahallesinin en iyi fiyatları zaten bizde — üstüne hediye de var.",
  "en_t": "BRING A NEIGHBOUR, WIN", "en_b": "Bring your neighbour to our store and get surprise discounts for both! {area} already has the best prices with us — plus gifts.",
  "fa_t": "همسایه‌ات را بیار، برنده شو", "fa_b": "همسایه خود را به فروشگاه ما بیاورید، برای هر دو نفر تخفیف غافلگیری! بهترین قیمت‌های محله {area_fa} که اصلاً ما داریم — حالا هدیه هم دارد.",
  "tags": "#komşu #indirim"},
 {"emoji": "⚡", "tr_t": "İŞ ÇIKIŞI 5 DAKİKA", "tr_b": "Metroya in, etini al, eve git! Göztepe Metro yanı & Kemer Esenler şubelerimiz 22:30'a kadar açık. {area} çalışanlarının pratik çözümü.",
  "en_t": "5 MINUTES AFTER WORK", "en_b": "Hop off the metro, grab your meat, head home! Our Göztepe Metro & Kemer Esenler branches are open until 22:30. The practical choice for workers in {area}.",
  "fa_t": "۵ دقیقه بعد از کار", "fa_b": "از مترو پیاده شو، گوشتت را بگیر، برو خانه! شعب متروی گوزتپه و کمر اسنلر تا ۲۲:۳۰ باز است. راه‌حل عملی کارکنان {area_fa}.",
  "tags": "#metro #pratik"},
 {"emoji": "🌟", "tr_t": "AYKAN FARKI", "tr_b": "Araçısız tedarik + tanzim fiyatı + günlük kesim = her gün aynı kalite. {area} bölgesinde 2 şube, 1 standart: EN İYİSİ.",
  "en_t": "THE AYKAN DIFFERENCE", "en_b": "No middlemen + cash-and-carry prices + daily cuts = the same quality every day. 2 branches in {area} region, 1 standard: THE BEST.",
  "fa_t": "تفاوت آیکان", "fa_b": "بدون واسطه + قیمت تانزیم + ذبح روزانه = هر روز یک کیفیت. ۲ شعبه در منطقه {area_fa}، ۱ استاندارد: بهترین.",
  "tags": "#aykanfarkı #kalite"},
]


def load_json(path, default):
    try:
        return json.load(open(path, encoding="utf-8"))
    except Exception:
        return default


def save_json(path, obj):
    """ذخیره اتمی: اول فایل موقت، بعد جایگزینی — فایل هرگز نیمه‌کاره نمی‌ماند"""
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
        f.flush()
        os.fsync(f.fileno())
    os.replace(tmp, path)


state = load_json(STATE_PATH, {"chats": {}, "admin_chat": None, "autopost": {"counter": 0, "posted": {}, "paused": False}})


def save_state():
    save_json(STATE_PATH, state)


def save_cfg():
    save_json(os.path.join(BASE, "telegram_bot_config.json"), CFG)


def tg(method, payload, timeout=70):
    req = urllib.request.Request(API + "/" + method, data=json.dumps(payload).encode("utf-8"),
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8"))


def send(chat_id, text, kb=None):
    p = {"chat_id": chat_id, "text": text[:4000]}
    if kb:
        p["reply_markup"] = {"inline_keyboard": kb}
    try:
        return tg("sendMessage", p)
    except Exception as e:
        print("send error:", e)
        p.pop("reply_markup", None)
        try:
            return tg("sendMessage", p)
        except Exception as e2:
            print("send retry error:", e2)


def notify_admin(text, kb=None):
    ac = state.get("admin_chat")
    if ac:
        send(int(ac), text, kb)


def normalize_phone(p):
    """Return MSISDN digits (90...) or None."""
    if not p:
        return None
    d = re.sub(r"\D", "", str(p))
    if not d:
        return None
    if d.startswith("90"):  # only Turkish mobiles (90 5xx...) — landlines get no WhatsApp button
        rest = d[2:]
        return d[:12] if len(rest) >= 10 and rest[0] == "5" else None
    if d.startswith("0") and len(d) >= 11:
        rest = d[1:]
        return ("90" + rest[:10]) if rest[0] == "5" else None
    if d.startswith("5") and len(d) == 10:
        return "90" + d
    return None


def send_sms(phone, text):
    """SMS via configured provider in telegram_bot_config.json:
       {"sms_provider": "netgsm", "sms_user": "...", "sms_pass": "...", "sms_from": "UYEOLARAK"}
       or {"sms_provider": "twilio", "sms_sid": "...", "sms_token": "...", "sms_from": "+1..."}
       Returns (ok, info)."""
    prov = (CFG.get("sms_provider") or "").strip().lower()
    if not prov:
        return False, "not-configured"
    if not phone:
        return False, "no-phone"
    try:
        if prov == "netgsm":
            url = ("https://api.netgsm.com.tr/sms/send/get/?usercode=%s&password=%s&gsmno=%s&message=%s&msgheader=%s"
                   % (urllib.parse.quote(str(CFG.get("sms_user", ""))),
                      urllib.parse.quote(str(CFG.get("sms_pass", ""))),
                      urllib.parse.quote(phone),
                      urllib.parse.quote(text[:400]),
                      urllib.parse.quote(str(CFG.get("sms_from", "")))))
            with urllib.request.urlopen(urllib.request.Request(url), timeout=25) as r:
                body = r.read().decode("utf-8", "ignore").strip()
            ok = body.startswith("00")
            return ok, body[:80]
        if prov == "twilio":
            import base64
            sid, tok = str(CFG.get("sms_sid", "")), str(CFG.get("sms_token", ""))
            data = urllib.parse.urlencode({"To": "+" + phone, "From": str(CFG.get("sms_from", "")),
                                           "Body": text[:400]}).encode()
            req = urllib.request.Request("https://api.twilio.com/2010-04-01/Accounts/%s/Messages.json" % sid, data=data)
            req.add_header("Authorization", "Basic " + base64.b64encode(("%s:%s" % (sid, tok)).encode()).decode())
            with urllib.request.urlopen(req, timeout=25) as r:
                body = json.loads(r.read().decode("utf-8"))
            return bool(body.get("sid")), str(body.get("sid"))[:40]
        return False, "unknown-provider"
    except Exception as e:
        return False, str(e)[:120]


def push_order(payload):
    """ارسال سفارش به پنل مدیریتی کلودفلر (D1) — غیربحرانی، خطا چیزی را نمی‌شکند"""
    url = CFG.get("panel_url") or ""
    sec = CFG.get("panel_secret") or ""
    if not url or not sec:
        return
    try:
        req = urllib.request.Request(url.rstrip("/") + "/api/orders",
                                     data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
                                     headers={"Content-Type": "application/json", "X-Panel-Secret": sec,
                                              "User-Agent": "AykanBot/1.0 (+telegram order sync)"})
        with urllib.request.urlopen(req, timeout=10) as r:
            r.read()
    except Exception as e:
        try:
            notify_admin("⚠️ ارسال سفارش به پنل کلودفلر ناموفق: %s" % e)
        except Exception:
            pass


def social_fanout(text):
    """پس از هر پست کانال، همان متن به پلتفرم‌های فعال (واتساپ/اینستا/فیس‌بوک/تیک‌تاک) از طریق پنل می‌رود"""
    url = CFG.get("panel_url") or ""
    sec = CFG.get("panel_secret") or ""
    if not url or not sec:
        return
    try:
        req = urllib.request.Request(url.rstrip("/") + "/api/social/autopost",
                                     data=json.dumps({"text": text[:3500]}, ensure_ascii=False).encode("utf-8"),
                                     headers={"Content-Type": "application/json", "X-Panel-Secret": sec,
                                              "User-Agent": "AykanBot/1.0 (+social fanout)"})
        with urllib.request.urlopen(req, timeout=20) as r:
            r.read()
    except Exception:
        pass  # غیربحرانی — پست کانال خودش موفق بوده


_last_token_refresh = [0.0]


def refresh_token_from_panel(force=False):
    """توکن ربات را از پنل کلودفلر (D1) می‌خواند — اگر ادمین توکن جدید را در پنل وارد کند، ربات خودش را ترمیم می‌کند"""
    now = time.time()
    if not force and now - _last_token_refresh[0] < 60:
        return False
    _last_token_refresh[0] = now
    url = CFG.get("panel_url") or ""
    sec = CFG.get("panel_secret") or ""
    if not url or not sec:
        return False
    try:
        req = urllib.request.Request(url.rstrip("/") + "/api/social/cfg",
                                     headers={"X-Panel-Secret": sec, "User-Agent": "AykanBot/1.0 (+token refresh)"})
        with urllib.request.urlopen(req, timeout=10) as r:
            d = json.loads(r.read().decode("utf-8"))
        tok = (d.get("tg") or {}).get("token") or ""
        ch = (d.get("tg") or {}).get("channel") or ""
        changed = False
        if tok and ":" in tok and len(tok) >= 40 and tok != CFG.get("token"):
            # ✅ اول با getMe تست کن — توکن خراب/تایپوی هرگز ذخیره نمی‌شود
            try:
                rq = urllib.request.Request("https://api.telegram.org/bot%s/getMe" % tok,
                                            headers={"User-Agent": "AykanBot/1.0"})
                with urllib.request.urlopen(rq, timeout=10) as r2:
                    me = json.loads(r2.read().decode("utf-8"))
                if me.get("ok"):
                    CFG["token"] = tok
                    changed = True
                    print("🔑 توکن معتبر از پنل پذیرفته شد (…%s → @%s)" % (tok[-6:], me["result"].get("username", "?")), flush=True)
                else:
                    print("⚠️ توکن پنل نامعتبر است — نادیده گرفته شد (…%s)" % tok[-6:], flush=True)
            except Exception as ve:
                print("⚠️ تست توکن پنل ناموفق (%s) — نادیده گرفته شد" % ve, flush=True)
        if ch and ch.startswith("@") and ch != CFG.get("channel"):
            CFG["channel"] = ch
            changed = True
        if changed:
            try:
                save_cfg()
            except Exception:
                pass
        return changed
    except Exception:
        return False


def cb_ans(cb_id, text=""):
    try:
        tg("answerCallbackQuery", {"callback_query_id": cb_id, "text": text})
    except Exception:
        pass


# ---------------- 10 CONTENT CATEGORIES (channel richness) ----------------
# category key -> list of templates. "trend" reuses the 15 classic TEMPLATES above.
CATEGORY_POSTS = {
 "trend": {"badge": "🔥 TREND / GÜNDEM", "pool": "templates"},
 "saglik": {"badge": "❤️ SAĞLIK", "pool": [
   {"emoji": "❤️", "tr_t": "ET VE SAĞLIK: DOĞRU BİLİNEN 5 YANLIŞ", "tr_b": "Kırmızı et düşman değil, miktar önemli! Uzmanlara göre haftada 2-3 kez, ortalama 100-150 gr porsiyon dana eti; demir, B12 ve çinko için mükemmel bir kaynaktır. Kaliteli et + dengeli tabak = sağlıklı sofra.",
    "en_t": "MEAT & HEALTH: 5 MYTHS", "en_b": "Red meat is not the enemy — portion is! 2-3 times a week, 100-150 g of beef is an excellent source of iron, B12 and zinc. Quality meat + a balanced plate = a healthy table.",
    "fa_t": "گوشت و سلامتی: ۵ باور غلط", "fa_b": "گوشت قرمز دشمن نیست — حجم مصرف مهم است! ۲ تا ۳ بار در هفته، ۱۰۰ تا ۱۵۰ گرم گوشت گوساله منبع عالی آهن، B12 و روی است. گوشت مرغوب + بشقاب متعادل = سفره سالم.",
    "tags": "#sağlık #beslenme"},
   {"emoji": "🩸", "tr_t": "DEMİR EKSİKLER MİSİNİZ?", "tr_b": "Yorgunluk, halsizlik, çabuk yorulma... Sebep demir eksikliği olabilir! Dana eti, vücudun en kolay emdiği 'hem demiri' içerir. Ispanaklı demirin emilimi %5 iken etteki demirin emilimi %25'tir.",
    "en_t": "LOW ON IRON?", "en_b": "Fatigue, weakness, tiredness... It might be iron deficiency! Beef contains 'heme iron', the easiest form for your body to absorb — while spinach iron absorbs at ~5%, beef iron absorbs at ~25%.",
    "fa_t": "کم‌خون هستید؟", "fa_b": "خستگی، بی‌حالی، زود فرسودگی... ممکن است کمبود آهن باشد! گوشت گوساله «آهن هِم» دارد که راحت‌ترین شکل جذب برای بدن است — جذب آهن اسفناج حدود ٪۵ ولی جذب آهن گوشت حدود ٪۲۵ است.",
    "tags": "#demir #sağlık"}]},
 "bilim": {"badge": "🔬 BİLİM", "pool": [
   {"emoji": "🔬", "tr_t": "BİLİM İNSANI ANLATTI: MANGALDA KANSEROJEN RİSKİ NASIL AZALTILIR?", "tr_b": "Araştırmalara göre 4 altın kural: 1) Kömürü tam kor haline getirin 2) Eti ateşe çok yaklaştırmayın 3) Yanmış kısımları kesin atın 4) Marine edilmiş et, heterosiklik amin oluşumunu %90'a kadar azaltıyor!",
    "en_t": "SCIENCE: HOW TO REDUCE BBQ CARCINOGEN RISK", "en_b": "Studies show 4 golden rules: 1) Let charcoal fully ash over 2) Don't hold meat too close to flame 3) Cut away charred parts 4) Marinated meat reduces heterocyclic amine formation by up to 90%!",
    "fa_t": "علم می‌گوید: چطور ریسک سرطان‌زایی منقل را کم کنیم؟", "fa_b": "طبق تحقیقات ۴ قانون طلایی: ۱) ذغال را کاملاً خاکستر کنید ۲) گوشت را خیلی نزدیک شعله نگیرید ۳) قسمت‌های سوخته را جدا کنید ۴) گوشت مارین‌شده تشکیل آمین‌های هتروسیکلیک را تا ٪۹۰ کم می‌کند!",
    "tags": "#bilim #mangal"},
   {"emoji": "🧪", "tr_t": "PROTEİN BİLİMİ: KAS İÇİN ETİN YERİ TUTULMAZ", "tr_b": "100 gr dana kuşbaşı = ~26 gr tam protein (vücudun ihtiyaç duyduğu tüm esansiyel amino asitlerle). Spor bilimciler kas onarımı için antrenmandan sonra 25-40 gr protein öneriyor.",
    "en_t": "PROTEIN SCIENCE: NOTHING REPLACES MEAT", "en_b": "100 g of beef cubes = ~26 g of complete protein with ALL essential amino acids. Sports scientists recommend 25-40 g protein after training for muscle repair.",
    "fa_t": "علم پروتئین: جایگزین گوشت برای عضله وجود ندارد", "fa_b": "۱۰۰ گرم کوپه گوساله = حدود ۲۶ گرم پروتئین کامل با تمام آمینواسیدهای ضروری. دانشمندان ورزشی برای ترمیم عضله بعد از تمرین ۲۵ تا ۴۰ گرم پروتئین توصیه می‌کنند.",
    "tags": "#protein #bilim"}]},
 "pazar": {"badge": "📊 PAZAR & FİYAT ANALİZİ", "pool": [
   {"emoji": "📊", "tr_t": "BU HAFTANIN ET FİYAT PANOSU", "tr_b": "Vitrin fiyatlarımızda sürpriz yok: Kemikli 650 • Kuşbaşı/Kıyma 750 • Antrikot 1.100 • Kuzu 1.069 • Pirzola 1.399 TL/Kg. Piyasa yükselirken biz tanzim fiyatını koruyoruz — çünkü kasabımız kendi kesimini yapıyor.",
    "en_t": "THIS WEEK'S MEAT PRICE BOARD", "en_b": "No surprises at our counter: Bone-in 650 • Cubes/Minced 750 • Ribeye 1,100 • Lamb 1,069 • Chops 1,399 TL/kg. While the market rises, we hold prices — because we do our own butchering.",
    "fa_t": "تابلوی قیمت گوشت این هفته", "fa_b": "در قیمت‌های ما سورپرایز نیست: استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو. بازار بالا می‌رود ولی ما قیمت تنظیمی را حفظ می‌کنیم — چون ذبح خودمان انجام می‌شود.",
    "tags": "#fiyat #pazar"},
   {"emoji": "🧾", "tr_t": "TOPTANCIYA MI ALIYORSUNUZ? BU HESAP SİZİ İLGİLENDİRİYOR", "tr_b": "Restoran/otel/catering iseniz: 15 kurumsal paketimizde %10'a varan indirim + günlük taze sevkiyat + kurumsal fatura var. Bu bottan 🏢 B2B Toptan'a dokunun, size özel paket çıkaralım.",
    "en_t": "BUYING WHOLESALE? THIS ONE'S FOR YOU", "en_b": "Restaurant/hotel/catering: our 15 corporate packages offer up to 10% off + fresh daily delivery + corporate invoicing. Tap 🏢 B2B in this bot for your custom package.",
    "fa_t": "خرید عمده می‌کنید؟ این پست برای شماست", "fa_b": "رستوران/هتل/کیترینگ هستید؟ ۱۵ پکیج سازمانی ما تا ٪۱۰ تخفیف + ارسال تازه روزانه + فاکتور رسمی دارد. در همین ربات دکمه 🏢 عمده را بزنید تا پکیج اختصاصی شما را بدهیم.",
    "tags": "#toptan #b2b"}]},
 "tarif": {"badge": "🍳 TARİF", "pool": [
   {"emoji": "🍳", "tr_t": "10 DAKİKADA TORTILLA KEBABI (VİDAL TARİF)", "tr_b": "Zırhta çekilmiş kıymamız + lavaş + özel sos = sosyal medyanın gündemi! Tarif: Kıymayı baharatla soteleyin (5 dk), lavaşa sarın, tavada 2 dk kızartın. Üzerine ayran sos. Malzemeler bizde — lezzet sizde!",
    "en_t": "10-MINUTE TORTILLA KEBAB (VIRAL RECIPE)", "en_b": "Our stone-ground minced + lavash + special sauce = the social media trend! Recipe: sauté the mince with spices (5 min), wrap in lavash, sear 2 min. Top with yogurt sauce. Ingredients from us — flavour from you!",
    "fa_t": "کباب تورتیلا در ۱۰ دقیقه (دستور وایرال)", "fa_b": "گوشت چرخ‌کرده ما + نان لواش + سس مخصوص = ترند شبکه‌های اجتماعی! دستور: گوشت را با ادویه تفت دهید (۵ دقیقه)، در لواش بپیچید، ۲ دقیقه در تابه سرخ کنید. روی آن سس ماست. مواد از ما — طعم از شما!",
    "tags": "#tarif #tortilla"},
   {"emoji": "🍲", "tr_t": "KASAPTAN SOFRAYA: DANA KUŞBAŞI GÜVEÇ", "tr_b": "Malzemeler: 750 gr kuşbaşı, 2 soğan, 3 domates, biber, kekik. Kuşbaşı zırhta değil kuşbaşı kesimde! Etinizi bizden alın, evde güvece atın — 2 saat sonra misafirleriniz ayakta alkışlıyor.",
    "en_t": "FROM BUTCHER TO TABLE: BEEF GÜVEÇ STEW", "en_b": "Ingredients: 750 g cubes, 2 onions, 3 tomatoes, peppers, thyme. Get your cubes from us, throw them in a clay pot — 2 hours later your guests applaud.",
    "fa_t": "از قصاب تا سفره: خورشت کوپه گوساله", "fa_b": "مواد لازم: ۷۵۰ گرم کوپه، ۲ پیاز، ۳ گوجه، فلفل، آویشن. کوپه‌تان را از ما بگیرید و در دیگ سنگی بریزید — دو ساعت بعد مهمان‌های شما کف می‌زنند!",
    "tags": "#tarif #güveç"}]},
 "kesim": {"badge": "🥩 KASAP REHBERİ", "pool": [
   {"emoji": "🥩", "tr_t": "HANGİ ET NE İÇİN? KASAP REHBERİ", "tr_b": "Antrikot → ızgara/tava • Kuşbaşı → sulu yemek & güveç • Kıyma → köfte/burger • Kemikli et → çorba & yahnî • Kuzu pirzola → misafir sofrası. Emin değilseniz sorun — biz 20 yıllık ustalıkla yol gösteririz.",
    "en_t": "WHICH CUT FOR WHAT? BUTCHER'S GUIDE", "en_b": "Ribeye → grill/pan • Cubes → stews & güveç • Minced → meatballs/burgers • Bone-in → soups & stews • Lamb chops → guest tables. Not sure? Just ask — 20 years of mastery at your service.",
    "fa_t": "کدام گوشت برای چه کاری؟ راهنمای قصابی", "fa_b": "آنترکوت → گریل/تابه • کوپه → خورشت و دیزی • چرخ‌کرده → کوفته و برگر • استخوان‌دار → سوپ و آبگوشت • سیخ بره → سفره مهمانی. مطمئن نیستید؟ بپرسید — ۲۰ سال استادی در خدمت شما.",
    "tags": "#kesim #rehber"},
   {"emoji": "⚖️", "tr_t": "ZIRHTA ÇEKME NEDEN ÖNEMLİ?", "tr_b": "Kasap kıyması ile hazır kıyma aynı şey değildir! Zırhta çekilen kıyma tek parça ettir, katkı ve 'ne olduğu belirsiz' karışım yok. İstediğiniz yağ oranında, gözünüzün önünde çekiyoruz.",
    "en_t": "WHY STONE-GROUND MINCE MATTERS", "en_b": "Butcher mince and packaged mince are NOT the same! Stone-ground mince comes from a single cut — no additives, no mystery blends. We grind to your preferred fat ratio, right in front of you.",
    "fa_t": "چرا چرخ‌کردن سنگی مهم است؟", "fa_b": "گوشت چرخ‌کرده قصابی با گوشت چرخ‌کرده بسته‌بندی یکی نیست! چرخ‌شده سنگی از یک تکه گوشت است — بدون افزودنی و بدون ترکیب مرموز. با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم.",
    "tags": "#kıyma #kalite"}]},
 "gida": {"badge": "🧊 GIDA GÜVENLİĞİ", "pool": [
   {"emoji": "🧊", "tr_t": "ETİ EVDE NASIL SAKLAMALISINIZ? (GIDA MÜHENDİSİ CEVABI)", "tr_b": "Buzdolabında (0-4°C): kıyma 1 gün, kuşbaşı 2-3 gün, bütün et 3-5 gün. Donduracaksanız: vakumlu/ hava almayacak şekilde -18°C'de 3 aya kadar. Çözüm: buzdolabında yavaş çözdürün, asla tezgah üstünde bırakmayın!",
    "en_t": "HOW TO STORE MEAT AT HOME (FOOD ENGINEER'S ANSWER)", "en_b": "Fridge (0-4°C): mince 1 day, cubes 2-3 days, whole cuts 3-5 days. Freezing: airtight/vacuum at -18°C up to 3 months. Thaw slowly in the fridge — never on the counter!",
    "fa_t": "گوشت را در خانه چطور نگه داریم؟ (پاسخ مهندس مواد غذایی)", "fa_b": "یخچال (۰ تا ۴ درجه): چرخ‌کرده ۱ روز، کوپه ۲-۳ روز، گوشت یکپارچه ۳-۵ روز. فریزر: کاملاً بسته در ۱۸- درجه تا ۳ ماه. یخ‌زدایی فقط در یخچال — هرگز روی میز!",
    "tags": "#gıdagüvenliği #saklama"},
   {"emoji": "🔬", "tr_t": "SOĞUK ZİNCİR NEDEN KRİTİK?", "tr_b": "Et, kesimden tezgaha kadar 0-4°C'de kalmalı. Zincir kırılırsa bakteriler 20 dakikada ikiye bölünür! Bizim tezgahta soğuk zincir hiç kırılmaz — kasaplık ciddi iştir.",
    "en_t": "WHY THE COLD CHAIN IS CRITICAL", "en_b": "Meat must stay at 0-4°C from butchering to counter. If the chain breaks, bacteria double every 20 minutes! At our counter the cold chain never breaks — butchery is serious business.",
    "fa_t": "چرا زنجیره سرد حیاتی است؟", "fa_b": "گوشت باید از ذبح تا ویترین در ۰ تا ۴ درجه بماند. اگر زنجیره بشکند، باکتری‌ها هر ۲۰ دقیقه دوبرابر می‌شوند! در ویترین ما زنجیره سرد هرگز نمی‌شکند — قصابی کار جدی است.",
    "tags": "#soğukzincir #hijyen"}]},
 "beslenme": {"badge": "💪 BESLENME", "pool": [
   {"emoji": "💪", "tr_t": "SPORCULAR İÇİN: GÜNLÜK PROTEİN PLANI", "tr_b": "70 kg bir sporcunun günlük ihtiyacı ~110-140 gr protein. Menü önerisi: Kahvaltıda 3 yumurta (18 gr), öğlende 150 gr dana kuşbaşı (39 gr), akşam 200 gr tavuk (46 gr) + yoğurt. Güçlü kaslar kasaptan geçer!",
    "en_t": "ATHLETES: DAILY PROTEIN PLAN", "en_b": "A 70 kg athlete needs ~110-140 g protein/day. Menu idea: 3 eggs at breakfast (18 g), 150 g beef cubes at lunch (39 g), 200 g chicken at dinner (46 g) + yogurt. Strong muscles start at the butcher's!",
    "fa_t": "ورزشکاران: برنامه پروتئین روزانه", "fa_b": "یک ورزشکار ۷۰ کیلویی روزانه به ۱۱۰ تا ۱۴۰ گرم پروتئین نیاز دارد. منوی پیشنهادی: ۳ تخم‌مرغ صبحانه (۱۸ گرم)، ۱۵۰ گرم کوپه گوساله ناهار (۳۹ گرم)، ۲۰۰ گرم مرغ شام (۴۶ گرم) + ماست. عضله قوی از قصاب شروع می‌شود!",
    "tags": "#beslenme #spor"},
   {"emoji": "👶", "tr_t": "ÇOCUKLARDA ETİN ROLÜ: BÜYÜME VE ZEKÂ", "tr_b": "Pediatristlere göre büyüme çağındaki çocuklarda B12, demir ve çinko eksikliği öğrenme kapasitesini düşürüyor. Haftada 2-3 kez kaliteli kıyma/kuşbaşı içeren beslenme, okul başarısını destekliyor.",
    "en_t": "MEAT IN CHILDHOOD: GROWTH & BRAIN", "en_b": "Pediatricians note that B12, iron and zinc deficiency in growing children reduces learning capacity. Quality mince/cubes 2-3 times a week supports school success.",
    "fa_t": "نقش گوشت در کودکان: رشد و هوش", "fa_b": "طبق نظر متخصصان کودکان، کمبود B12 و آهن و روی در سن رشد، توان یادگیری را کم می‌کند. ۲ تا ۳ بار در هفته گوشت مرغوب، موفقیت درس را تقویت می‌کند.",
    "tags": "#çocuk #beslenme"}]},
 "mangal": {"badge": "🏕️ MANGAL İPUÇLARI", "pool": [
   {"emoji": "🔥", "tr_t": "MANGAL USTASININ 7 ALTIN KURALI", "tr_b": "1) Kömür meşe olsun 2) Kor tam beyazlaşsın 3) Izgara telini temizleyin 4) Et oda sıcaklığına yaklaşsın 5) Etı sık çevirmeyin — bir kez çevirin 6) Tuzu ateşe atmadan hemen önce 7) Dinlendirin: 5 dk bekleyin, sonra kesin!",
    "en_t": "7 GOLDEN RULES OF THE GRILL MASTER", "en_en": "", "en_b": "1) Use oak charcoal 2) Let coals turn fully white 3) Clean the grate 4) Let meat near room temp 5) Don't flip constantly — flip once 6) Salt just before the fire 7) Rest 5 minutes, then cut!",
    "fa_t": "۷ قانون طلایی استاد منقل", "fa_b": "۱) ذغال بلوط باشد ۲) ذغال کاملاً سفید شود ۳) سیخ را تمیز کنید ۴) گوشت نزدیک دمای اتاق باشد ۵) مدام برنگردانید — یک بار بچرخانید ۶) نمک را درست قبل از آتش ۷) ۵ دقیقه استراحت، بعد برش!",
    "tags": "#mangal #ipucu"},
   {"emoji": "🧺", "tr_t": "PİKNİK SEPETİNİZ HAZIR MI?", "tr_b": "Hafta sonu planı yapan {area} komşuları: marine tavuk, hazır köfte harmanı, meşe kömürü ve ekmek — hepsi tek pakette, yol üstü şubemizden hazır alın!",
    "en_t": "IS YOUR PICNIC BASKET READY?", "en_b": "For {area} neighbours planning the weekend: marinated chicken, ready meatball mix, oak charcoal and bread — all in one pack, grab it ready from our branch on your way!",
    "fa_t": "سبد پیک‌نیک‌تان آماده است؟", "fa_b": "برای همسایگان {area_fa} که برنامه آخر هفته دارند: مرغ مارین، مخلوط آماده کوفته، ذغال بلوط و نان — همه در یک پکیج، از شعبه در مسیر، آماده تحویل!",
    "tags": "#piknik #mangal"}]},
 "marka": {"badge": "⭐ MÜŞTERİ & MARKA", "pool": [
   {"emoji": "⭐", "tr_t": "MÜŞTERİMİZ ANLATIYOR", "tr_b": "«20 yıldır bu semtteyiz, Aykan'dan almadığım gün etin tadı değişiyor!» — {area} mahallesinden müştah bir komşumuz. Siz de deneyin, farkı sofranızda hissedin. 🥩",
    "en_t": "OUR CUSTOMER SPEAKS", "en_b": "\"We've been in this neighbourhood for 20 years — on days I don't buy from Aykan, the meal just isn't the same!\" — a happy neighbour from {area}. Try it and taste the difference. 🥩",
    "fa_t": "مشتری ما می‌گوید", "fa_b": "«بیست سال است در این محله هستیم، روزهایی که از آیکان نمی‌گیرم طعم غذا فرق می‌کند!» — همسایه خوشحالی از {area_fa}. شما هم امتحان کنید و تفاوت را بچشید. 🥩",
    "tags": "#müşteri #güven"},
   {"emoji": "🐟", "tr_t": "TEZGAHIMIZDA YENİ SEZON!", "tr_b": "Et • Balık • Tavuk • Kuzu — tek adreste! Bu sezon tezgahımıza günlük taze balık da geldikçe ekliyoruz. {area} bölgesinde akşam yemeğini bizden çıkar, eve hazırlanmış götür!",
    "en_t": "NEW SEASON AT OUR COUNTER!", "en_b": "Beef • Fish • Chicken • Lamb — one address! This season we keep adding fresh daily fish to our counter. In {area}, pick up dinner from us — ready to cook!",
    "fa_t": "فصل جدید در ویترین ما!", "fa_b": "گوساله • ماهی • مرغ • بره — در یک آدرس! این فصل ماهی تازه روزانه هم به ویترین ما اضافه می‌شود. در {area_fa}، شام را از ما ببرید — آماده پخت!",
    "tags": "#sezon #tazelik"}]},
}
CATEGORY_ORDER = list(CATEGORY_POSTS.keys())  # 10 categories

# ---- GÜNÜN ÖZEL FIRSATI: one special offer per day (7-day rotation) ----
DAILY_OFFERS = [
 {"product": "Hafta Sonu Mangal Paketi", "old": 998, "new": 898,
  "tr": "1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + meşe kömürü + özel sos",
  "en": "1 kg meatballs/cubes + 1 kg marinated chicken + oak charcoal + special sauce",
  "fa": "۱ کیلو کوفته/کوپه + ۱ کیلو مرغ مارین + ذغال بلوط + سس مخصوص"},
 {"product": "Dana Kuşbaşı / Kıyma", "old": 750, "new": 699,
  "tr": "Gün boyu geçerli — istediğiniz gramajda, zırhta gözünüzün önünde çekim",
  "en": "Valid all day — ground to your preferred size, right before your eyes",
  "fa": "تمام روز معتبر — با گرم دلخواه شما، جلوی چشمتان چرخ می‌کنیم"},
 {"product": "Kuzu Pirzola", "old": 1399, "new": 1249,
  "tr": "Misafir sofralarının yıldızı — bugün serbest porsiyon kesim",
  "en": "The star of guest tables — free portion sizing today",
  "fa": "ستاره سفره مهمانی — امروز برش پرس آزاد"},
 {"product": "Viral Tortilla Kebabı (10 dk)", "old": 399, "new": 329,
  "tr": "Sosyal medyanın gündemi — 10 dakikada hazır, günlük sınırlı adet!",
  "en": "The social media trend — ready in 10 min, limited daily stock!",
  "fa": "ترند شبکه‌های اجتماعی — در ۱۰ دقیقه آماده، تعداد محدود روزانه!"},
 {"product": "Dana Antrikot", "old": 1100, "new": 999,
  "tr": "Mangal geceleri için restoran kalitesinde antrikot",
  "en": "Restaurant-quality ribeye for your BBQ night",
  "fa": "آنترکوت با کیفیت رستوران برای شب منقل"},
 {"product": "Haftalık Aile Et Kutusu", "old": 1472, "new": 1299,
  "tr": "Ailenin haftalık et ihtiyacı tek kutuda: kıyma + kuşbaşı + tavuk",
  "en": "The family's weekly meat in one box: minced + cubes + chicken",
  "fa": "نیاز هفتگی گوشت خانواده در یک جعبه: چرخ‌کرده + کوپه + مرغ"},
 {"product": "Dana Kemikli Et", "old": 650, "new": 595,
  "tr": "Çorba ve yahninin lezzet sırrı — gün boyu geçerli",
  "en": "The secret of soups and stews — valid all day",
  "fa": "راز طعم سوپ و آبگوشت — تمام روز معتبر"},
]


# ---------------- LEAD BROWSER (defter) ----------------
_leads_cache = None

CAT_FA2 = {"Big Restaurant": "🥩 رستوران بزرگ", "Ordinary Fast Food": "🍔 فست‌فود و دونر",
           "Hotel": "🏨 هتل", "Catering": "🍲 کیترینگ و کارخانه", "Ordinary People": "👨‍👩‍👧‍👦 مجتمع و گروه محلی",
           "Investment Leader": "💼 سرمایه‌گذاری و تکنوپارک"}


def get_leads():
    global _leads_cache
    if _leads_cache is None:
        _leads_cache = load_json(LEADS_PATH, [])
    return _leads_cache


def lead_wa(phone):
    d = "".join(ch for ch in (phone or "") if ch.isdigit())
    if d.startswith("05"):
        return "90" + d[1:]
    if d.startswith("90"):
        return d if d[2:3] == "5" else None
    if d.startswith("5"):
        return "90" + d
    return None


def filtered_leads(fkey):
    leads = get_leads()
    if fkey.startswith("cat:"):
        cat = fkey[4:]
        return [l for l in leads if l["category"] == cat]
    if fkey.startswith("area:"):
        n = fkey[5:]
        return sorted([l for l in leads if l["area"].split(".")[0] == n], key=lambda x: -x["opportunity"])
    if fkey == "P1":
        return sorted([l for l in leads if l["priority"] == "P1"], key=lambda x: -x["opportunity"])
    return sorted(leads, key=lambda x: -x["opportunity"])


def lead_card_text(l, pos, total):
    return ("🎯 لید %d از %d — %s ردیف #%d\n\n"
            "🏢 %s\n"
            "📍 %s\n"
            "🏠 %s\n"
            "📞 %s\n"
            "✉️ %s\n"
            "🌐 %s\n\n"
            "⚡ %s · امتیاز %d/۱۰۰ · مقیاس %s · %d Kg/هفته\n"
            "📦 %s (تخفیف ٪%d)\n"
            "🔄 گزینه‌ها: %s\n"
            "🏪 %s"
            % (pos, total, CAT_FA2.get(l["category"], l["category"]), l["catNum"],
               l["name"], l["area"], l["address"], l["phone"], l["email"], l["website"],
               l["priority"], l["opportunity"], l["scale"], l["weeklyKg"],
               l["package"].split(" (")[0], l["pkgDiscount"], l.get("pkgShort", "—"), l["branch"]))


def lead_card_kb(l, pos, total, browser=True):
    import urllib.parse as _up
    qe = _up.quote(l["name"] + " " + l["address"])
    row1 = [{"text": "🗺 نقشه", "url": "https://www.google.com/maps/search/?api=1&query=" + qe},
            {"text": "🌐 سایت", "url": l["website"]}]
    wa = lead_wa(l["phone"])
    if wa:
        row1.append({"text": "💬 واتساپ", "url": "https://wa.me/" + wa})
    rows = [row1]
    if browser:
        rows.append([{"text": "⏮ قبلی", "callback_data": "lb:prev"},
                     {"text": "📊 %d / %d" % (pos, total), "callback_data": "lb:noop"},
                     {"text": "بعدی ⏭", "callback_data": "lb:next"}])
        rows.append([{"text": "📋 اطلاعات تماس", "callback_data": "lb:contact"},
                     {"text": "🔍 فیلترها", "callback_data": "lb:filters"},
                     {"text": "⏭⏭ +۱۰", "callback_data": "lb:jump10"}])
    else:
        rows.append([{"text": "📋 اطلاعات تماس", "callback_data": "lb:contact"}])
    return rows


def kb_lead_filters():
    return [
        [{"text": "🥩 رستوران‌ها (۱۰۰)", "callback_data": "lb:filter:cat:Big Restaurant"},
         {"text": "🍔 فست‌فود (۱۰۰)", "callback_data": "lb:filter:cat:Ordinary Fast Food"}],
        [{"text": "🏨 هتل‌ها (۱۰۰)", "callback_data": "lb:filter:cat:Hotel"},
         {"text": "🍲 کیترینگ (۱۰۰)", "callback_data": "lb:filter:cat:Catering"}],
        [{"text": "👨‍👩‍👧‍👦 مجتمع‌ها (۱۰۰)", "callback_data": "lb:filter:cat:Ordinary People"},
         {"text": "🔥 فقط P1 (طلایی)", "callback_data": "lb:filter:P1"}],
        [{"text": "📋 همه لیدها (۵۰۰ + ۱۰ لیدر سرمایه‌گذاری)", "callback_data": "lb:filter:all"}],
        [{"text": "💼 لیدرهای سرمایه‌گذاری (۱۰ تکنوپارک + هلدینگ)", "callback_data": "lb:filter:cat:Investment Leader"}],
        [{"text": "🗺️ ده منطقه استانبول (هر منطقه ۵۰ لید)", "callback_data": "lb:areas"}],
    ]


def kb_lead_areas():
    rows = []
    row = []
    for i, a in enumerate(AREAS):
        row.append({"text": "%d️⃣ %s" % (i + 1, a["fa"]), "callback_data": "lb:filter:area:%d" % (i + 1)})
        if len(row) == 2:
            rows.append(row)
            row = []
    if row:
        rows.append(row)
    rows.append([{"text": "⬅️ بازگشت به فیلترها", "callback_data": "lb:filters"}])
    return rows


def area_summary_text(n):
    from collections import Counter as _Counter
    ls = [l for l in get_leads() if l["area"].split(".")[0] == str(n)]
    a = AREAS[n - 1]
    p1 = sum(1 for x in ls if x["priority"] == "P1")
    kg = sum(x["weeklyKg"] for x in ls)
    base = sum(x.get("pkgMonthly", 0) for x in ls)
    eco = sum(x.get("pkgEcoMonthly", 0) for x in ls)
    std = sum(x.get("pkgStdMonthly", 0) for x in ls)
    pro = sum(x.get("pkgProMonthly", 0) for x in ls)
    top = _Counter(x["packageCode"] for x in ls).most_common(3)
    fm = lambda v: ("{:.1f}".format(v / 1000000.0)).replace(".", "\u066b")
    return ("\U0001f5fa\ufe0f منطقه %d از ۱۰ — %s\n%s\n\n"
            "\U0001f465 %d لید (۵ دسته × ۱۰ لید)\n"
            "\U0001f525 %d لید P1 طلایی\n"
            "\u2696\ufe0f %s Kg/هفته\n\n"
            "\U0001f4b0 درآمد ماهانه با پکیج‌های اصلی: %s میلیون TL\n"
            "\U0001f4ca سناریوها: اقتصادی %sM \u2022 استاندارد %sM \u2022 پریمیوم %sM TL\n\n"
            "\U0001f4e6 پکیج‌های پرتکرار: %s\n"
            "\U0001f3af پیشنهاد من: با %d لید P1 شروع کنید — هر لید ۳ گزینه پکیج دارد."
            % (n, a["tr"], a["fa"], len(ls), p1, "{:,}".format(kg).replace(",", "."),
               fm(base), fm(eco), fm(std), fm(pro),
               "\u060c ".join("%s \u00d7%d" % t for t in top), p1))


def kb_area_summary(n):
    return [
        [{"text": "\u25b6\ufe0f شروع مرور ۵۰ لید این منطقه", "callback_data": "lb:areastart"}],
        [{"text": "\U0001f5fa\ufe0f مناطق دیگر", "callback_data": "lb:areas"},
         {"text": "\U0001f50d فیلترهای دسته", "callback_data": "lb:filters"}],
    ]


def edit_or_send(cid, msg_id, text, kb=None):
    p = {"chat_id": cid, "message_id": msg_id, "text": text[:4000]}
    if kb:
        p["reply_markup"] = {"inline_keyboard": kb}
    try:
        return tg("editMessageText", p)
    except Exception:
        return send(int(cid), text, kb)


# ---------------- keyboards ----------------
def kb_lang():
    return [[{"text": LANG_NAMES[c], "callback_data": "lang:" + c}] for c in ("tr", "en", "fa")]


def kb_main(lang):
    k = T[lang]["kb"]
    return [
        [{"text": k["menu"], "callback_data": "menu"}, {"text": k["paket"], "callback_data": "paket"}],
        [{"text": k["sepet"], "callback_data": "sepet"}, {"text": k["b2b"], "callback_data": "b2b"}],
        [{"text": k["sube"], "callback_data": "sube"}, {"text": k["iletisim"], "callback_data": "iletisim"}],
        # 🪟 windowed buttons — open site / WhatsApp / channel / maps in a new window
        [{"text": k["site"], "url": SITE_URL}, {"text": "💬 WhatsApp", "url": "https://wa.me/" + OWNER_WA}],
        [{"text": k["kanal"], "url": CHANNEL_URL}, {"text": k["harita"], "url": MAPS_URL}],
        [{"text": "🌐 " + LANG_NAMES[lang], "callback_data": "langpick"}],
    ]


def kb_menu(lang):
    k = T[lang]
    rows = [[{"text": "%s — %s TL/%s" % (m["name"][lang], m["price"], m["unit"][lang]), "callback_data": "pick:" + m["id"]}]
            for m in MENU]
    rows.append([{"text": "🛒 " + k["kb"]["sepet"], "callback_data": "sepet"}])
    rows.append([{"text": "⬅️ " + k["kb"]["menu"], "callback_data": "menu"}])
    rows.append([{"text": k["home"], "callback_data": "home"}])
    return rows


def kb_qty(item, lang):
    u = item["unit"][lang]
    opts = [0.5, 1, 2, 5, 10] if item["id"] in ("kemikli", "kusbasi", "antrikot", "kuzu", "pirzola") else [1, 2, 3, 5, 10]
    rows = [[{"text": "%g %s" % (o, u), "callback_data": "qty:%s:%g" % (item["id"], o)} for o in opts]]
    rows.append([{"text": "⬅️ " + T[lang]["kb"]["menu"], "callback_data": "menu"}])
    return rows


def kb_cart(lang):
    k = T[lang]
    return [
        [{"text": k["checkout"], "callback_data": "checkout"}],
        [{"text": k["clear"], "callback_data": "clear"}, {"text": k["continue"], "callback_data": "menu"}],
    ]


def fmt_tl(n):
    return ("{:,}".format(int(n))).replace(",", ".")


# ---------------- cart ----------------
def cart_text(cid, lang):
    cart = state["chats"].get(cid, {}).get("cart", {})
    if not cart:
        return T[lang]["cart_empty"], kb_menu(lang)
    cur = "لیر" if lang == "fa" else "TL"
    lines = [T[lang]["cart_title"]]
    total = 0
    for mid, qty in cart.items():
        m = MENU_BY_ID[mid]
        t = round(m["price"] * qty)
        total += t
        lines.append("• %s × %g %s = %s %s" % (m["name"][lang], qty, m["unit"][lang], fmt_tl(t), cur))
    lines.append(T[lang]["cart_total"].format(fmt_tl(total)))
    lines.append(T[lang]["checkout_hint"])
    return "\n".join(lines), kb_cart(lang)


# ---------------- flow ----------------
def get_chat(cid):
    return state["chats"].setdefault(cid, {"cart": {}, "mode": None, "order": {}, "lang": None})


def get_lang(cid, frm=None):
    c = state["chats"].get(cid) or {}
    if c.get("lang"):
        return c["lang"]
    if frm and frm.get("language_code"):
        lc = frm["language_code"][:2]
        if lc in ("tr", "en", "fa"):
            return lc
    return "tr"


def now_str():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def finalize_order(cid, c, lang):
    cart = c.get("cart", {})
    if not cart:
        send(int(cid), T[lang]["cart_empty"], kb_menu(lang))
        return
    cur = "لیر" if lang == "fa" else "TL"
    lines = []
    total = 0
    for mid, qty in cart.items():
        m = MENU_BY_ID[mid]
        t = round(m["price"] * qty)
        total += t
        lines.append("• %s × %g %s = %s %s" % (m["name"][lang], qty, m["unit"][lang], fmt_tl(t), cur))
    o = c.get("order", {})
    code = "AYK-" + datetime.datetime.now().strftime("%y%m%d-%H%M")
    summary = T[lang]["order_ok"].format(code, "\n".join(lines), fmt_tl(total),
                                         o.get("name", ""), o.get("phone", ""), o.get("note", ""))
    orders = load_json(ORDERS_PATH, [])
    orders.append({"code": code, "cart": cart, "total": total, "name": o.get("name"),
                   "phone": o.get("phone"), "note": o.get("note"), "chat": cid,
                   "lang": lang, "time": now_str()})
    save_json(ORDERS_PATH, orders)
    threading.Thread(target=push_order, args=({"code": code, "kind": "order", "total": total,
        "name": o.get("name"), "phone": o.get("phone"), "address": o.get("note"),
        "items": cart, "lang": lang, "chat": cid},), daemon=True).start()
    c["cart"] = {}
    c["order"] = {}
    save_state()
    send(int(cid), summary, kb_main(lang))
    # --- ادمین: تلگرام (با دکمه واتساپ/تماس) + SMS ---
    cph = normalize_phone(o.get("phone", ""))
    akb = []
    if cph:
        akb.append([{"text": "💬 WhatsApp Müşteri", "url": "https://wa.me/" + cph},
                    {"text": "📞 Ara", "url": "tel:+" + cph}])
        akb.append([{"text": "✅ Onayla (WhatsApp)", "url": "https://wa.me/%s?text=%s"
                     % (cph, urllib.parse.quote("Merhaba %s 👋 Aykan Et & Mangal — %s numaralı siparişiniz hazırlanıyor! Toplam: %s TL. Teşekkürler 🥩🔥"
                                                 % (o.get("name", "") or "Müşterimiz", code, fmt_tl(total))))}])
    notify_admin("🔔 YENİ SİPARİŞ / NEW ORDER / سفارش جدید 🧾\n\nKod: %s | Toplam: %s TL\n👤 %s | 📞 %s\n🏠 %s\n🛒 %s\nLang: %s | Chat: %s"
                 % (code, fmt_tl(total), o.get("name", ""), o.get("phone", ""), o.get("note", ""),
                    ", ".join(lines)[:200], lang, cid), akb)
    sms_to = normalize_phone(CFG.get("sms_to") or OWNER_WA)
    if sms_to:
        sok, sinfo = send_sms(sms_to, "YENI SIPARIS %s | %s TL | %s | %s | Aykan Et & Mangal"
                              % (code, fmt_tl(total), o.get("name", ""), o.get("phone", "")))
        if CFG.get("sms_provider"):
            notify_admin("📱 SMS (%s → %s): %s" % (CFG.get("sms_provider"), sms_to, "✅ gönderildi" if sok else "⚠️ " + str(sinfo)))


def b2b_text(lang):
    cat = load_json(CATALOG_PATH, {})
    lines = [T[lang]["b2b_title"]]
    for catkey, plist in cat.items():
        lines.append("▸ %s:" % CAT_TR.get(catkey, catkey))
        for p in plist:
            lines.append(T[lang]["b2b_min"].format(p["name"], p["discount"], p["minLabel"]))
        lines.append("")
    lines.append(T[lang]["b2b_cta"])
    return "\n".join(lines)


# ---------------- AUTO-POSTER (10 categories + daily special offer) ----------------
def _post_frame(emoji, tr_t, tr_b, en_t, en_b, fa_t, fa_b, area, extra_tags, badge=None):
    tags = " ".join(["#et", "#mangal", "#kasap", "#aykanetmangal", area["tags"].split()[0].strip(), extra_tags])
    head = ("%s %s\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 %s\n\n" % (emoji, tr_t, badge)) if badge else ("%s %s\n\n" % (emoji, tr_t))
    return ("%s%s\n🌍 %s\n%s\n\n🇮🇷 %s\n%s\n\n📍 %s | %s\n📞 0537 732 52 69 | ✈️ @%s\n%s"
            % (head, tr_b, en_t, en_b, fa_t, fa_b, area["tr"], area["fa"], BOT_USERNAME, tags))


def build_post(n):
    """Category post: rotates through the 10 content categories."""
    key = CATEGORY_ORDER[n % len(CATEGORY_ORDER)]
    cat = CATEGORY_POSTS[key]
    area = AREAS[n % len(AREAS)]
    if cat["pool"] == "templates":
        tpl = TEMPLATES[(n // len(CATEGORY_ORDER)) % len(TEMPLATES)]
        return _post_frame(tpl["emoji"], tpl["tr_t"], tpl["tr_b"].format(area=area["tr"]),
                           tpl["en_t"], tpl["en_b"].format(area=area["tr"]),
                           tpl["fa_t"], tpl["fa_b"].format(area_fa=area["fa"]),
                           area, tpl["tags"], badge=cat["badge"])
    tpl = cat["pool"][(n // len(CATEGORY_ORDER)) % len(cat["pool"])]
    return _post_frame(tpl["emoji"], tpl["tr_t"], tpl["tr_b"].format(area=area["tr"]),
                       tpl["en_t"], tpl["en_b"].format(area=area["tr"]),
                       tpl["fa_t"], tpl["fa_b"].format(area_fa=area["fa"]),
                       area, tpl["tags"], badge=cat["badge"])


def build_daily_offer(now=None):
    """GÜNÜN ÖZEL FIRSATI — one rotating special offer per day (7-day cycle)."""
    now = now or datetime.datetime.now()
    o = DAILY_OFFERS[now.timetuple().tm_yday % len(DAILY_OFFERS)]
    area = AREAS[now.timetuple().tm_yday % len(AREAS)]
    pct = int(round((1 - o["new"] / float(o["old"])) * 100))
    gun = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"][now.weekday()]
    tr_head = "🎁 GÜNÜN ÖZEL FIRSATI — %s!" % gun
    tr_body = ("🔥 %s\n💰 Bugün: %s TL (normal %s TL — %%%d indirim!)\n🥩 %s\n\n"
               "⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!"
               % (o["product"], "{:,}".format(o["new"]).replace(",", "."),
                  "{:,}".format(o["old"]).replace(",", "."), pct, o["tr"]))
    en_body = ("🔥 %s — TODAY ONLY: %s TL instead of %s TL (%%%d off)!\n⏰ Order via this bot or 0537 732 52 69."
               % (o["product"], "{:,}".format(o["new"]).replace(",", "."),
                  "{:,}".format(o["old"]).replace(",", "."), pct))
    fa_body = ("🔥 %s — فقط امروز: %s لیر به‌جای %s لیر (٪٪%d تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹."
               % (o["product"], "{:,}".format(o["new"]).replace(",", "."),
                  "{:,}".format(o["old"]).replace(",", "."), pct))
    tags = "#gününFırsatı #kampanya #indirim " + area["tags"].split()[0].strip()
    return ("%s\n▬▬▬▬▬▬▬▬▬▬▬▬\n%s\n\n🌍 EN: %s\n\n🇮🇷 FA: %s\n\n📍 %s | %s\n📞 0537 732 52 69 | ✈️ @%s\n%s"
            % (tr_head, tr_body, en_body, fa_body, area["tr"], area["fa"], BOT_USERNAME, tags))


def post_to_channel(text):
    ch = CFG.get("channel") or ""
    if not ch:
        return False, "no-channel"
    try:
        tg("sendMessage", {"chat_id": ch, "text": text[:4000]})
        # سینک خودکار با شبکه‌های اجتماعی (واتساپ/اینستا/فیسبوک/تیک‌تاک) از طریق پنل
        try:
            threading.Thread(target=social_fanout, args=(text,), daemon=True).start()
        except Exception:
            pass
        return True, ch
    except Exception as e:
        return False, str(e)


def autopost_tick():
    ch = CFG.get("channel") or ""
    ap = state.setdefault("autopost", {"counter": 0, "posted": {}, "paused": False})
    if not ch or ap.get("paused"):
        return
    now = datetime.datetime.now()
    today = now.strftime("%Y-%m-%d")
    posted_today = ap["posted"].setdefault(today, [])
    slots = autopost_slots()
    for i, slot in enumerate(slots):
        hh, mm = map(int, slot.split(":"))
        slot_dt = now.replace(hour=hh, minute=mm, second=0, microsecond=0)
        if now >= slot_dt and i not in posted_today:
            n = ap["counter"]
            if slot == OFFER_SLOT:
                text = build_daily_offer(now)
                kind = "🎁 پیشنهاد ویژه روز"
            else:
                text = build_post(n)
                cat_key = CATEGORY_ORDER[n % len(CATEGORY_ORDER)]
                kind = "🗞 %s" % CATEGORY_POSTS[cat_key]["badge"]
            ok, info = post_to_channel(text)
            ap["counter"] = n + 1
            posted_today.append(i)
            save_state()
            if ok:
                notify_admin("📤 پست به کانال ارسال شد (%s — %s):\n\n%s" % (slot, kind, text[:300]))
            else:
                notify_admin("⚠️ ارسال پست به کانال ناموفق بود: %s\nربات باید ادمین کانال باشد با دسترسی «ارسال پیام»." % info)


def autopost_loop():
    while True:
        try:
            autopost_tick()
        except Exception:
            traceback.print_exc()
        time.sleep(60)


def start_autoposter():
    th = threading.Thread(target=autopost_loop, daemon=True)
    th.start()
    return th


# ---------------- admin (Persian) ----------------
def handle_admin_command(cid, text):
    parts = text.split()
    cmd = parts[0].lower()
    if cmd in ("/kanal", "/channel") and len(parts) >= 2:
        ch = parts[1]
        if not ch.startswith("@") and not ch.startswith("-"):
            ch = "@" + ch
        CFG["channel"] = ch
        save_cfg()
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        ap = state.setdefault("autopost", {"counter": 0, "posted": {}, "paused": False})
        now = datetime.datetime.now()
        posted_today = ap["posted"].setdefault(today, [])
        for i, slot in enumerate(autopost_slots()):
            hh, mm = map(int, slot.split(":"))
            if now >= now.replace(hour=hh, minute=mm, second=0, microsecond=0):
                if i not in posted_today:
                    posted_today.append(i)
        save_state()
        ok, info = post_to_channel("✅ Aykan Et & Mangal botu bu kanala bağlandı!\n🤖 ربات آیکان ات به این کانال متصل شد — پست‌های خودکار ترند فعال است.\n🔥 Günlük trend paylaşımları başlıyor!")
        if ok:
            send(int(cid), "✅ کانال تنظیم شد: %s و پیام تست موفقانه ارسال شد.\n\n⏰ برنامه پست خودکار: %s — هر پست سه‌زبان (ترکی/انگلیسی/فارسی)؛ ۱۰ دسته محتوایی + پیشنهاد ویژه روزانه ساعت ۰۹:۰۰. فاصله پست‌ها با /aralik N ساعت تغییر می‌کند." % (ch, "، ".join(autopost_slots())))
        else:
            send(int(cid), "⚠️ کانال ذخیره شد (%s) ولی ارسال تست ناموفق بود: %s\n\nلطفاً ربات @%s را از تنظیمات کانال به‌عنوان **ادمین** اضافه کنید و دسترسی «ارسال پیام» را بدهید، بعد دوباره /kanal %s را بفرستید." % (ch, info, BOT_USERNAME, ch))
    elif cmd in ("/kanal", "/channel"):
        send(int(cid), "📌 کانال فعلی: %s\n\nاستفاده: /kanal @نام_کانال" % (CFG.get("channel") or "تنظیم نشده"))
    elif cmd == "/kanalkapat":
        CFG["channel"] = ""
        save_cfg()
        send(int(cid), "✅ کانال قطع شد. پست‌های خودکار متوقف شدند.")
    elif cmd == "/postnow":
        if not CFG.get("channel"):
            send(int(cid), "⚠️ اول کانال را با /kanal @نام_کانال تنظیم کنید.")
            return
        ap = state.setdefault("autopost", {"counter": 0, "posted": {}, "paused": False})
        n = ap["counter"]
        text = build_post(n)
        ok, info = post_to_channel(text)
        if ok:
            ap["counter"] = n + 1
            save_state()
            send(int(cid), "📤 پست تستی ارسال شد:\n\n" + text[:1500])
        else:
            send(int(cid), "⚠️ ارسال ناموفق: %s" % info)
    elif cmd == "/plan":
        ap = state.setdefault("autopost", {"counter": 0, "posted": {}, "paused": False})
        today = datetime.datetime.now().strftime("%Y-%m-%d")
        posted_today = ap.get("posted", {}).get(today, [])
        n = ap["counter"]
        slots = autopost_slots()
        lines = ["📅 برنامه پست‌های خودکار امروز (کانال: %s — هر %s ساعت، %d پست در روز):"
                 % (CFG.get("channel") or "—", CFG.get("post_interval", DEFAULT_POST_INTERVAL), len(slots))]
        for i, slot in enumerate(slots):
            kind = "🎁 پیشنهاد ویژه روز" if slot == OFFER_SLOT else "🗞 پست موضوعی"
            st = "✅ ارسال شد" if i in posted_today else ("⏸ توقف" if ap.get("paused") else "⏳ در انتظار")
            lines.append("  %s — %s %s" % (slot, kind, st))
        key = CATEGORY_ORDER[n % len(CATEGORY_ORDER)]
        lines.append("\n🔁 دسته بعدی: %s (دسته %d از ۱۰)" % (CATEGORY_POSTS[key]["badge"], n % len(CATEGORY_ORDER) + 1))
        lines.append("📍 منطقه بعدی: %d/10 — %s" % (n % 10 + 1, AREAS[n % 10]["tr"]))
        lines.append("🎁 پیشنهاد ویژه امروز: %s" % DAILY_OFFERS[datetime.datetime.now().timetuple().tm_yday % len(DAILY_OFFERS)]["product"])
        lines.append("\nدستورها: /postnow • /aralik N (فاصله ساعت) • /durdur • /devam • /kanalkapat")
        send(int(cid), "\n".join(lines))
    elif cmd in ("/aralik", "/interval"):
        if len(parts) >= 2 and parts[1].isdigit():
            h = min(max(int(parts[1]), 1), 24)
            CFG["post_interval"] = h
            save_cfg()
            ap = state.setdefault("autopost", {"counter": 0, "posted": {}, "paused": False})
            now = datetime.datetime.now()
            today = now.strftime("%Y-%m-%d")
            done = []
            for i, slot in enumerate(autopost_slots()):
                hh, mm = map(int, slot.split(":"))
                if now >= now.replace(hour=hh, minute=mm, second=0, microsecond=0):
                    done.append(i)
            ap["posted"][today] = done
            save_state()
            send(int(cid), "✅ فاصله پست‌ها به هر %d ساعت تغییر کرد — از امروز %d پست در روز: %s\n🎁 اولین پست روز (۰۹:۰۰) همیشه «پیشنهاد ویژه روز» است. بقیه پست‌ها بین ۱۰ دسته محتوایی می‌چرخند." % (h, len(autopost_slots()), "، ".join(autopost_slots())))
        else:
            send(int(cid), "استفاده: /aralik N — N = فاصله پست‌ها به ساعت (۱ تا ۲۴).\nمثال: /aralik 3 → ۸ پست در روز • /aralik 8 → ۳ پست در روز • /aralik 24 → ۱ پست در روز")
    elif cmd in ("/durdur", "/pause"):
        state.setdefault("autopost", {})["paused"] = True
        save_state()
        send(int(cid), "⏸ پست‌های خودکار متوقف شد. برای ادامه /devam بفرستید.")
    elif cmd in ("/devam", "/resume"):
        state.setdefault("autopost", {})["paused"] = False
        save_state()
        send(int(cid), "▶️ پست‌های خودکار ادامه یافت.")
    elif cmd == "/lidedefteri":
        send(int(cid), "📒 دفتر لیدها — ۵۰۰ مشتری هدف برای بررسی\n\n🔍 چه دسته‌ای را بررسی کنیم؟", kb_lead_filters())
    elif cmd == "/lidegonder":
        n = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 10
        n = min(n, 25)
        leads = sorted(get_leads(), key=lambda x: -x["opportunity"])
        lf = state.setdefault("leadfeed", {"sent": 0})
        start = lf["sent"]
        if start >= len(leads):
            lf["sent"] = 0
            start = 0
        batch = leads[start:start + n]
        lf["sent"] = start + len(batch)
        save_state()
        target = CFG.get("leads_channel") or None
        sent_count = 0
        for i, l in enumerate(batch):
            try:
                if target:
                    tg("sendMessage", {"chat_id": target, "text": lead_card_text(l, start + i + 1, len(leads))[:4000],
                                       "reply_markup": {"inline_keyboard": lead_card_kb(l, start + i + 1, len(leads), browser=False)}})
                else:
                    send(int(cid), lead_card_text(l, start + i + 1, len(leads)), lead_card_kb(l, start + i + 1, len(leads), browser=False))
                sent_count += 1
                time.sleep(0.4)
            except Exception as e:
                send(int(cid), "⚠️ ارسال لید %d ناموفق: %s" % (start + i + 1, e))
                break
        where = target or "این چت"
        send(int(cid), "📤 %d لید به %s ارسال شد (تا لید #%d). ادامه: /lidegonder %d" % (sent_count, where, lf["sent"], n))
    elif cmd in ("/lidekanal", "/leadschannel"):
        if len(parts) >= 2:
            ch = parts[1]
            if not ch.startswith("@") and not ch.startswith("-"):
                ch = "@" + ch
            CFG["leads_channel"] = ch
            save_cfg()
            try:
                tg("sendMessage", {"chat_id": ch, "text": "📒 کانال بررسی لیدهای Aykan Et & Mangal متصل شد — با /lidegonder از ربات، لیدها به‌صورت دسته‌ای اینجا ارسال می‌شوند."})
                send(int(cid), "✅ کانال لیدها تنظیم شد: %s — از این پس /lidegonder N لیدها را به این کانال می‌فرستد." % ch)
            except Exception as e:
                send(int(cid), "⚠️ ذخیره شد ولی ارسال تست ناموفق: %s — ربات باید ادمین این کانال هم باشد." % e)
        else:
            send(int(cid), "📌 کانال لیدهای فعلی: %s\n\nاستفاده: /lidekanal @نام_کانال" % (CFG.get("leads_channel") or "تنظیم نشده"))
    elif cmd == "/bolge":
        if len(parts) > 1 and parts[1].isdigit() and 1 <= int(parts[1]) <= 10:
            send(int(cid), area_summary_text(int(parts[1])))
        else:
            send(int(cid), "استفاده: /bolge 1 تا /bolge 10 — خلاصه لیدها، پکیج‌ها و سناریوی درآمد هر منطقه")
    elif cmd == "/yatirim":
        ls = [l for l in get_leads() if l["category"] == "Investment Leader"]
        if not ls:
            send(int(cid), "⚠️ لیست لیدرهای سرمایه‌گذاری یافت نشد.")
            return True
        send(int(cid), "💼 لیدرهای بخش سرمایه‌گذاری — ۵ تکنوپارک + ۵ هلدینگ بزرگ استانبول:\n\n⭐ شروع پیشنهادی: YTÜ Yıldız Teknopark (اسنلر — داخل منطقه شما) و Doğuş Group (بزرگ‌ترین گروه رستورانی).")
        for i, l in enumerate(ls):
            try:
                send(int(cid), lead_card_text(l, i + 1, len(ls)), lead_card_kb(l, i + 1, len(ls), browser=False))
                time.sleep(0.4)
            except Exception as e:
                send(int(cid), "⚠️ %s" % e)
                break
        send(int(cid), "📤 هر ۱۰ لیدر ارسال شد. برای مرور تعاملی: /lidedefteri → 💼 لیدرهای سرمایه‌گذاری")
    elif cmd == "/lidekanalkapat":
        CFG["leads_channel"] = ""
        save_cfg()
        send(int(cid), "✅ ارسال لیدها به کانال قطع شد — از این پس /lidegonder به همین چت مدیر می‌فرستد.")
    else:
        return False
    return True


# ---------------- update handling ----------------
def handle_update(u):
    if "callback_query" in u:
        cb = u["callback_query"]
        cid = str(cb["message"]["chat"]["id"])
        lang = get_lang(cid, cb.get("from"))
        data = cb["data"]
        try:
            ans = handle_action(cid, data, lang, cb.get("from"), cb["message"].get("message_id"))
            cb_ans(cb["id"], ans or "")
        except Exception:
            traceback.print_exc()
            cb_ans(cb["id"], "⚠️ یک لحظه، دوباره امتحان کنید")
            try:
                send(int(cid), "⚠️ در پردازش این دکمه خطایی رخ داد — لطفاً دوباره بزنید. اگر تکرار شد با پشتیبانی تماس بگیرید: 0537 732 52 69")
            except Exception:
                pass
        return
    msg = u.get("message") or u.get("edited_message")
    if not msg or not msg.get("text"):
        return
    cid = str(msg["chat"]["id"])
    text = msg["text"].strip()
    first = msg["from"].get("first_name", "")
    c = get_chat(cid)
    lang = get_lang(cid, msg.get("from"))

    # admin-only commands (work in any language, responses in Persian)
    if text.lower().startswith(("/kanal", "/channel", "/kanalkapat", "/postnow", "/plan", "/aralik", "/interval", "/durdur", "/pause", "/devam", "/resume", "/lidedefteri", "/lidegonder", "/lidekanal", "/leadschannel", "/lidekanalkapat", "/bolge", "/yatirim")):
        ac = state.get("admin_chat")
        if ac == cid:
            handle_admin_command(cid, text)
        else:
            send(int(cid), "🔐 این دستور فقط برای مدیر است. اول با /admin PIN وارد شوید.")
        return

    if c.get("mode") == "name":
        c["order"]["name"] = text
        c["mode"] = "phone"
        save_state()
        send(int(cid), T[lang]["ask_phone"])
        return
    if c.get("mode") == "phone":
        c["order"]["phone"] = text
        c["mode"] = "note"
        save_state()
        send(int(cid), T[lang]["ask_note"])
        return
    if c.get("mode") == "note":
        c["order"]["note"] = text
        c["mode"] = None
        save_state()
        finalize_order(cid, c, lang)
        return
    if c.get("mode") == "b2b_company":
        c["order"]["b2b_company"] = text
        c["mode"] = "b2b_phone"
        save_state()
        send(int(cid), T[lang]["ask_b2b_phone"])
        return
    if c.get("mode") == "b2b_phone":
        c["mode"] = None
        comp = c.get("order", {}).get("b2b_company", "")
        save_state()
        bph = normalize_phone(text)
        bkb = []
        if bph:
            bkb = [[{"text": "💬 WhatsApp Firma", "url": "https://wa.me/" + bph},
                    {"text": "📞 Ara", "url": "tel:+" + bph}]]
        notify_admin("🏢 B2B TALEP / REQUEST / درخواست عمده\nFirma: %s\nTel: %s\nLang: %s | Chat: %s" % (comp, text, lang, cid), bkb)
        sms_to = normalize_phone(CFG.get("sms_to") or OWNER_WA)
        if sms_to and CFG.get("sms_provider"):
            send_sms(sms_to, "B2B TALEP | %s | %s | Aykan Et & Mangal" % (comp, text))
        orders = load_json(ORDERS_PATH, [])
        orders.append({"type": "b2b", "company": comp, "phone": text, "chat": cid, "lang": lang, "time": now_str()})
        save_json(ORDERS_PATH, orders)
        threading.Thread(target=push_order, args=({"code": "B2B-" + datetime.datetime.now().strftime("%y%m%d-%H%M"),
            "kind": "b2b", "name": comp, "phone": text, "chat": cid, "lang": lang},), daemon=True).start()
        send(int(cid), T[lang]["b2b_done"])
        return

    low = text.lower()
    if low.startswith("/start"):
        if not state["chats"].get(cid, {}).get("lang"):
            send(int(cid), T[lang]["pick_lang"], kb_lang())
        send(int(cid), T[lang]["welcome"].format(first), kb_main(lang))
    elif low.startswith(("/lang", "/dil", "/language", "/zaban")):
        send(int(cid), T[lang]["pick_lang"], kb_lang())
    elif low.startswith(("/menu", "/fiyat", "/menü")):
        send(int(cid), T[lang]["menu_title"], kb_menu(lang))
    elif low.startswith(("/paket", "/pack")):
        send(int(cid), T[lang]["paket_title"], kb_menu(lang))
    elif low.startswith(("/b2b", "/toptan", "/wholesale")):
        send(int(cid), b2b_text(lang),
             [[{"text": T[lang]["b2b_btn"], "callback_data": "b2breq"}],
              [{"text": T[lang]["home"], "callback_data": "home"}]])
    elif low.startswith(("/sepet", "/cart", "/sefaresh")):
        t, kb = cart_text(cid, lang)
        send(int(cid), t, kb)
    elif low.startswith(("/sube", "/branches", "/sobe")):
        send(int(cid), T[lang]["sube"], kb_main(lang))
    elif low.startswith(("/iletisim", "/contact", "/ertebat")):
        send(int(cid), T[lang]["iletisim"].format(OWNER_WA), kb_main(lang))
    elif low.startswith("/admin"):
        parts = text.split()
        if len(parts) == 2 and parts[1] == ADMIN_PIN:
            state["admin_chat"] = cid
            save_state()
            send(int(cid), "🔐 مدیر گرامی، خوش آمدید!\n\nدستورهای مدیریت (فارسی):\n/kanal @نام_کانال — اتصال ربات به کانال و شروع پست‌های خودکار\n/postnow — ارسال فوری پست بعدی\n/plan — نمایش برنامه امروز\n/durdur و /devam — توقف/ادامه پست‌ها\n/kanalkapat — قطع کانال\n/lidedefteri — 📒 مرور ۵۰۰ لید (تماس، واتساپ، نقشه، سایت)\n/lidegonder 10 — ارسال ۱۰ لید بعدی برای بررسی\n/lidekanal @کانال_خصوصی — اتصال کانال خصوصی لیدها\n/bolge 4 — خلاصه منطقه ۴ (لیدها + پکیج‌ها + سناریوی درآمد)\n/yatirim — 💼 ۱۰ لیدر سرمایه‌گذاری (تکنوپارک + هلدینگ)\n\n/aralik N — فاصله پست‌های خودکار به ساعت (۳=۸ پست/روز، ۸=۳ پست/روز، ۲۴=۱ پست/روز)\n⏰ پست‌های خودکار: هر ۳ ساعت (پیش‌فرض) — هر پست سه‌زبان (ترکی/انگلیسی/فارسی)\n🎁 هر روز ساعت ۰۹:۰۰: پیشنهاد ویژه روز (چرخش ۷ روزه روی محصولات با تخفیف)\n🗞 ۱۰ دسته محتوایی کانال: ترند، سلامتی، علم، بازار و قیمت، دستور پخت، راهنمای برش، ایمنی غذا، تغذیه، نکات منقل، مشتری و برند")
        else:
            send(int(cid), "🔐 Kullanım: /admin PIN | Usage: /admin PIN | استفاده: /admin PIN")
    else:
        send(int(cid), T[lang]["unknown"], kb_main(lang))


def handle_action(cid, data, lang, frm=None, msg_id=None):
    c = get_chat(cid)
    if data.startswith("lb:") and state.get("admin_chat") != cid:
        return "🔐 فقط برای مدیر!"
    if data.startswith("lb:"):
        sub = data[3:]
        br = c.setdefault("lb", {"f": "P1", "i": 0})
        fl = filtered_leads(br["f"])
        if not fl:
            return "لیستی یافت نشد!"
        if sub.startswith("filter:area:"):
            br["f"] = sub[7:]
            br["i"] = 0
            save_state()
            n = int(br["f"].split(":")[1])
            edit_or_send(cid, msg_id, area_summary_text(n), kb_area_summary(n))
            return "✅ منطقه انتخاب شد"
        if sub == "areastart":
            fl = filtered_leads(br["f"])
            edit_or_send(cid, msg_id, lead_card_text(fl[0], 1, len(fl)), lead_card_kb(fl[0], 1, len(fl)))
            return ""
        if sub.startswith("filter:"):
            br["f"] = sub[7:]
            br["i"] = 0
            save_state()
            fl = filtered_leads(br["f"])
            edit_or_send(cid, msg_id, lead_card_text(fl[0], 1, len(fl)), lead_card_kb(fl[0], 1, len(fl)))
            return "✅ فیلتر اعمال شد"
        if sub == "areas":
            edit_or_send(cid, msg_id, "🗺️ ده منطقه استانبول — لیدهای کدام منطقه را بررسی کنیم؟\n\n(هر منطقه: ۵۰ لید = ۵ دسته × ۱۰ لید)", kb_lead_areas())
            return ""
        if sub == "filters":
            edit_or_send(cid, msg_id, "🔍 فیلتر دفتر لیدها — چه دسته‌ای را بررسی کنیم؟", kb_lead_filters())
            return ""
        if sub == "next":
            br["i"] = min(br["i"] + 1, len(fl) - 1)
        elif sub == "prev":
            br["i"] = max(br["i"] - 1, 0)
        elif sub == "jump10":
            br["i"] = min(br["i"] + 10, len(fl) - 1)
        elif sub == "contact":
            l = fl[br["i"]]
            send(int(cid), ("📋 اطلاعات تماس (برای تماس/کپی):\n\n🏢 %s\n📞 %s\n✉️ %s\n🌐 %s\n📍 %s — %s"
                            % (l["name"], l["phone"], l["email"], l["website"], l["area"], l["address"])))
            return ""
        elif sub == "noop":
            return ""
        save_state()
        l = fl[br["i"]]
        edit_or_send(cid, msg_id, lead_card_text(l, br["i"] + 1, len(fl)), lead_card_kb(l, br["i"] + 1, len(fl)))
        return ""
    if data == "langpick":
        send(int(cid), T[lang]["pick_lang"], kb_lang())
    elif data.startswith("lang:"):
        new = data.split(":")[1]
        c["lang"] = new
        save_state()
        send(int(cid), T[new]["lang_set"], kb_main(new))
    elif data == "home":
        send(int(cid), "🏠 AYKAN ET & MANGAL 🥩", kb_main(lang))
    elif data == "menu":
        send(int(cid), T[lang]["menu_title"], kb_menu(lang))
    elif data == "paket":
        send(int(cid), T[lang]["paket_title"], kb_menu(lang))
    elif data == "sepet":
        t, kb = cart_text(cid, lang)
        send(int(cid), t, kb)
    elif data == "sube":
        send(int(cid), T[lang]["sube"], kb_main(lang))
    elif data == "iletisim":
        send(int(cid), T[lang]["iletisim"].format(OWNER_WA), kb_main(lang))
    elif data == "b2b":
        send(int(cid), b2b_text(lang),
             [[{"text": T[lang]["b2b_btn"], "callback_data": "b2breq"}],
              [{"text": T[lang]["home"], "callback_data": "home"}]])
    elif data == "b2breq":
        c["mode"] = "b2b_company"
        save_state()
        send(int(cid), T[lang]["ask_company"])
    elif data.startswith("pick:"):
        m = MENU_BY_ID.get(data.split(":")[1])
        if m:
            send(int(cid), T[lang]["qty_prompt"].format(m["name"][lang], m["price"], m["unit"][lang]), kb_qty(m, lang))
    elif data.startswith("qty:"):
        _, mid, q = data.split(":")
        m = MENU_BY_ID.get(mid)
        q = float(q)
        if m:
            cart = c.setdefault("cart", {})
            cart[mid] = round(cart.get(mid, 0) + q, 2)
            save_state()
            t, kb = cart_text(cid, lang)
            send(int(cid), T[lang]["added"].format(m["name"][lang], q, m["unit"][lang]) + "\n\n" + t, kb)
            return "✔"
    elif data == "checkout":
        if not c.get("cart"):
            return T[lang]["cart_empty_toast"]
        c["mode"] = "name"
        save_state()
        send(int(cid), T[lang]["ask_name"])
    elif data == "clear":
        c["cart"] = {}
        save_state()
        send(int(cid), T[lang]["cleared"], kb_menu(lang))
    return ""


def main():
    # قفل تک‌نمونه: اگر ربات دیگری در حال اجراست، ادامه نده (دو نمونه = جواب‌های قاطی + خرابی استیت)
    lock_path = os.path.join(BASE, "telegram_bot.lock")
    if os.path.exists(lock_path):
        try:
            old_pid = int(open(lock_path).read().strip() or 0)
            os.kill(old_pid, 0)
            print("⛔ یک نمونه دیگر از ربات در حال اجراست (PID %d) — این نسخه متوقف شد تا تداخل نکند." % old_pid, flush=True)
            return
        except (ProcessLookupError, ValueError, PermissionError):
            pass  # پروسه مرده — قفل کهنه است
    try:
        open(lock_path, "w").write(str(os.getpid()))
    except Exception:
        pass
    print("Aykan Et & Mangal Bot v2 (TR/EN/FA) calisiyor — long polling + autoposter...", flush=True)
    refresh_token_from_panel(force=True)  # اگر ادمین توکن جدید در پنل گذاشته باشد
    start_autoposter()
    offset = 0
    last_hourly = time.time()
    while True:
        try:
            res = tg("getUpdates", {"offset": offset, "timeout": 50,
                                    "allowed_updates": ["message", "callback_query"]}, timeout=70)
            for u in res.get("result", []):
                offset = max(offset, u["update_id"] + 1)
                try:
                    handle_update(u)
                except Exception:
                    traceback.print_exc()
            if time.time() - last_hourly > 3600:
                last_hourly = time.time()
                refresh_token_from_panel(force=True)  # چرخه ساعتی خودترمیمی
        except KeyboardInterrupt:
            print("stopped")
            try: os.remove(os.path.join(BASE, "telegram_bot.lock"))
            except Exception: pass
            break
        except Exception as e:
            print("poll error:", e, flush=True)
            if "Unauthorized" in str(e) or "401" in str(e):
                # توکن باطل شده — شاید ادمین توکن جدید در پنل گذاشته باشد (حداکثر هر ۶۰ ثانیه)
                if refresh_token_from_panel():
                    continue
                time.sleep(10)
            else:
                time.sleep(3)


if __name__ == "__main__":
    main()
