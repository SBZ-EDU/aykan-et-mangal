// AYKAN ET & MANGAL — Telegram Bot 24/7 on Cloudflare Worker
// پورت کامل ربات پایتون: منو، سبد، سفارش، B2B، ادمین، لیدبوک، پست خودکار کانال
// توکن از D1 (social_config.tg.token) خوانده می‌شود — تعویض توکن از پنل، بدون دیپلوی
const DATA = {"MENU": [{"id": "kemikli", "name": {"tr": "Dana Kemikli Et", "en": "Beef on the Bone", "fa": "گوشت گوساله استخوان‌دار"}, "price": 650, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}}, {"id": "kusbasi", "name": {"tr": "Dana Kuşbaşı / Özel Çekim Kıyma", "en": "Beef Cubes / Fresh-Ground Minced", "fa": "کوپه گوساله / گوشت چرخ‌کرده اختصاصی"}, "price": 750, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}}, {"id": "antrikot", "name": {"tr": "Dana Antrikot", "en": "Beef Ribeye (Antrikot)", "fa": "آنترکوت گوساله"}, "price": 1100, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}}, {"id": "kuzu", "name": {"tr": "Kuzu Et / Kuşbaşı", "en": "Lamb Meat / Cubes", "fa": "گوشت بره / کوپه بره"}, "price": 1069, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}}, {"id": "pirzola", "name": {"tr": "Kuzu Pirzola", "en": "Lamb Chops", "fa": "سیخ بره (پیرولا)"}, "price": 1399, "unit": {"tr": "Kg", "en": "kg", "fa": "کیلو"}}, {"id": "mangal", "name": {"tr": "Aykan Özel Mangal Paketi", "en": "Aykan Special BBQ Pack", "fa": "پکیج ویژه منقل آیکان"}, "price": 998, "unit": {"tr": "Paket", "en": "pack", "fa": "بسته"}}, {"id": "tortilla", "name": {"tr": "Viral Tortilla Kebabı (10 dk)", "en": "Viral Tortilla Kebab (10 min)", "fa": "کباب تورتیلای وایرال (۱۰ دقیقه)"}, "price": 399, "unit": {"tr": "Porsiyon", "en": "portion", "fa": "پرس"}}, {"id": "aile", "name": {"tr": "Haftalık Aile Et Kutusu", "en": "Weekly Family Meat Box", "fa": "جعبه گوشت هفتگی خانواده"}, "price": 1472, "unit": {"tr": "Kutu", "en": "box", "fa": "جعبه"}}], "T": {"tr": {"welcome": "Merhaba {}! 👋\n\n🥩 AYKAN ET & MANGAL — Et • Balık • Tavuk • Kuzu\nTanzim Satış Mağazası resmî sipariş hattına hoş geldiniz!\n\n🔥 Günlük taze kesim — her gün 22:30'a kadar açık!\n\nDil seçmek için /lang — Choose language: 🇬🇧 / 🇮🇷", "lang_set": "✅ Dil ayarlandı: Türkçe 🇹🇷", "pick_lang": "🌐 Dil seçin / Choose your language / زبان را انتخاب کنید:", "menu_title": "🥩 GÜNLÜK TAZE — GÜNCEL FİYATLAR 🥩\n\nSepete eklemek istediğiniz ürünü seçin 👇", "qty_prompt": "🥩 {} — {} TL/{}\n\nMiktar seçin 👇", "added": "✅ Sepete eklendi: {} × {} {}", "cart_title": "🛒 SEPETİNİZ:\n", "cart_empty": "🛒 Sepetiniz şu anda boş.\n\nMenüden ürün eklemek için 👇", "cart_total": "\n💰 TOPLAM: {} TL", "checkout_hint": "\n✅ Onaylamak için aşağıdaki butona basın:", "ask_name": "🧾 Siparişinizi tamamlamak için:\n\n1️⃣ Ad Soyadınızı yazın:", "ask_phone": "📞 Telefon numaranızı yazın (örn: 0537 732 52 69):", "ask_note": "🏠 Teslim adresi / notunuzu yazın (mağazadan gel-al için 'gel' yazın):", "order_ok": "🧾 SİPARİŞ ONAYI — {}\n\n{}\n\n💰 TOPLAM: {} TL\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ Siparişiniz alındı! Kısa süre içinde WhatsApp/telefon ile onaylayacağız.\n💬 Hızlı değişiklik/iptal: 0537 732 52 69\n\nTeşekkürler! 🥩🔥", "paket_title": "📦 ÖZEL PAKETLERİMİZ 🔥\n\n1️⃣ Aykan Özel Mangal Paketi — 998 TL\n1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + kömür + sos\n\n2️⃣ Viral Tortilla Kebabı — 399 TL\n10 dakikada hazır!\n\n3️⃣ Haftalık Aile Et Kutusu — 1.472 TL\n\nSepete eklemek için menüye dönün 👇", "b2b_title": "🏢 TOPTAN (B2B) PAKETLERİMİZ — 15 PAKET 📦\n", "b2b_min": "   • {} — %{} indirim (min. {})", "b2b_cta": "\nNumune ve özel teklif için geri arama isteyin 👇", "b2b_btn": "📞 Geri Arama İsteği", "ask_company": "🏢 Firma adınızı yazın:", "ask_b2b_phone": "📞 Telefon numaranızı yazın, toptan satış yetkilimiz sizi arasın:", "b2b_done": "✅ Talebiniz alındı! En kısa sürede sizi arayacağız.\n💬 Acil ise WhatsApp: 0537 732 52 69", "sube": "📍 ŞUBELERİMİZ\n\n🏪 Şube 1 — Bağcılar Göztepe:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(Göztepe Metro İstasyonu yanı)\n\n🏪 Şube 2 — Esenler Kemer:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 Her gün 22:30'a kadar açığız.\n📞 Tel / WhatsApp: 0537 732 52 69", "iletisim": "💬 İLETİŞİM\n\n📱 WhatsApp & Tel: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 Instagram: @aykanetmangal\n✈️ Telegram: Bu bot!", "unknown": "Anlamadım 🤔 Aşağıdaki menüden devam edebilirsiniz:", "kb": {"menu": "🥩 Menü & Fiyatlar", "paket": "📦 Paketler", "sepet": "🛒 Sepetim", "b2b": "🏢 B2B Toptan", "sube": "📍 Şubeler", "iletisim": "💬 WhatsApp", "site": "🌐 Web Sitemiz", "kanal": "📢 Kanalımız", "harita": "📍 Yol Tarifi"}, "checkout": "✅ Siparişi Onayla", "clear": "🗑 Sepeti Boşalt", "continue": "➕ Devam", "cart_empty_toast": "Sepetiniz boş!", "cleared": "🗑 Sepet boşaltıldı.", "back_menu": "⬅️ Menü", "home": "🏠 Ana Menü"}, "en": {"welcome": "Hello {}! 👋\n\n🥩 AYKAN ET & MANGAL — Beef • Fish • Chicken • Lamb\nWelcome to the official order line of our Cash-and-Carry Butchery!\n\n🔥 Fresh daily cuts — open every day until 22:30!\n\n/language to change dil 🇹🇷 / زبان 🇮🇷", "lang_set": "✅ Language set: English 🇬🇧", "pick_lang": "🌐 Select language / Dil seçin / زبان را انتخاب کنید:", "menu_title": "🥩 FRESH DAILY — CURRENT PRICES 🥩\n\nChoose a product to add to your cart 👇", "qty_prompt": "🥩 {} — {} TL/{}\n\nSelect quantity 👇", "added": "✅ Added to cart: {} × {} {}", "cart_title": "🛒 YOUR CART:\n", "cart_empty": "🛒 Your cart is empty.\n\nAdd products from the menu 👇", "cart_total": "\n💰 TOTAL: {} TL", "checkout_hint": "\n✅ Press the button below to confirm:", "ask_name": "🧾 To complete your order:\n\n1️⃣ Please type your full name:", "ask_phone": "📞 Type your phone number (e.g. 0537 732 52 69):", "ask_note": "🏠 Type delivery address / note (type 'pickup' for store pickup):", "order_ok": "🧾 ORDER CONFIRMATION — {}\n\n{}\n\n💰 TOTAL: {} TL\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ Order received! We will confirm shortly via WhatsApp/phone.\n💬 Quick changes/cancellation: 0537 732 52 69\n\nThank you! 🥩🔥", "paket_title": "📦 OUR SPECIAL PACKS 🔥\n\n1️⃣ Aykan Special BBQ Pack — 998 TL\n1 kg meatballs/cubes + 1 kg marinated chicken + charcoal + sauce\n\n2️⃣ Viral Tortilla Kebab — 399 TL\nReady in 10 minutes!\n\n3️⃣ Weekly Family Meat Box — 1,472 TL\n\nReturn to the menu to add 👇", "b2b_title": "🏢 WHOLESALE (B2B) PACKAGES — 15 PACKAGES 📦\n", "b2b_min": "   • {} — {}% off (min. {})", "b2b_cta": "\nRequest a callback for samples and custom offers 👇", "b2b_btn": "📞 Request Callback", "ask_company": "🏢 Type your company name:", "ask_b2b_phone": "📞 Type your phone number — our wholesale manager will call you:", "b2b_done": "✅ Request received! We will call you as soon as possible.\n💬 Urgent? WhatsApp: 0537 732 52 69", "sube": "📍 OUR BRANCHES\n\n🏪 Branch 1 — Bağcılar Göztepe:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(next to Göztepe Metro Station)\n\n🏪 Branch 2 — Esenler Kemer:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 Open every day until 22:30.\n📞 Tel / WhatsApp: 0537 732 52 69", "iletisim": "💬 CONTACT\n\n📱 WhatsApp & Tel: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 Instagram: @aykanetmangal\n✈️ Telegram: this bot!", "unknown": "I didn't understand 🤔 Please use the menu below:", "kb": {"menu": "🥩 Menu & Prices", "paket": "📦 Packs", "sepet": "🛒 My Cart", "b2b": "🏢 B2B Wholesale", "sube": "📍 Branches", "iletisim": "💬 WhatsApp", "site": "🌐 Our Website", "kanal": "📢 Our Channel", "harita": "📍 Get Directions"}, "checkout": "✅ Confirm Order", "clear": "🗑 Empty Cart", "continue": "➕ Continue", "cart_empty_toast": "Your cart is empty!", "cleared": "🗑 Cart emptied.", "back_menu": "⬅️ Menu", "home": "🏠 Main Menu"}, "fa": {"welcome": "سلام {}! 👋\n\n🥩 آیکان ات و منگال — گوشت گوساله • ماهی • مرغ • بره\nبه خط سفارش رسمی فروشگاه قصابی تانزیم ساتیش ما خوش آمدید!\n\n🔥 گوشت تازهِ برش روزانه — هر روز تا ۲۲:۳۰ باز است!\n\n/language برای تغییر زبان 🇹🇷 / 🇬🇧", "lang_set": "✅ زبان تنظیم شد: فارسی 🇮🇷", "pick_lang": "🌐 زبان را انتخاب کنید / Select language / Dil seçin:", "menu_title": "🥩 تازه روزانه — قیمت‌های به‌روز 🥩\n\nمحصول مورد نظر را برای افزودن به سبد انتخاب کنید 👇", "qty_prompt": "🥩 {} — {} لیر/{}\n\nمقدار را انتخاب کنید 👇", "added": "✅ به سبد اضافه شد: {} × {} {}", "cart_title": "🛒 سبد خرید شما:\n", "cart_empty": "🛒 سبد خرید شما خالی است.\n\nاز منو محصول اضافه کنید 👇", "cart_total": "\n💰 جمع کل: {} لیر", "checkout_hint": "\n✅ برای تایید، دکمه زیر را بزنید:", "ask_name": "🧾 برای تکمیل سفارش:\n\n1️⃣ نام و نام خانوادگی خود را بنویسید:", "ask_phone": "📞 شماره تلفن خود را بنویسید (مثلاً 0537 732 52 69):", "ask_note": "🏠 آدرس تحویل / یادداشت خود را بنویسید (برای تحویل حضوری در فروشگاه بنویسید «حضوری»):", "order_ok": "🧾 تاییدیه سفارش — {}\n\n{}\n\n💰 جمع کل: {} لیر\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ سفارش شما ثبت شد! به‌زودی از طریق واتساپ/تلفن تایید می‌کنیم.\n💬 تغییر/لغو سریع: 0537 732 52 69\n\nمتشکریم! 🥩🔥", "paket_title": "📦 پکیج‌های ویژه ما 🔥\n\n1️⃣ پکیج ویژه منقل آیکان — ۹۹۸ لیر\n۱ کیلو کوفته/کوپه + ۱ کیلو مرغ مارین‌شده + ذغال + سس\n\n2️⃣ کباب تورتیلای وایرال — ۳۹۹ لیر\nدر ۱۰ دقیقه آماده!\n\n3️⃣ جعبه گوشت هفتگی خانواده — ۱٫۴۷۲ لیر\n\nبرای افزودن به منو برگردید 👇", "b2b_title": "🏢 پکیج‌های عمده (B2B) ما — ۱۵ پکیج 📦\n", "b2b_min": "   • {} — ٪{} تخفیف (حداقل {})", "b2b_cta": "\nبرای نمونه و پیشنهاد اختصاصی، درخواست تماس بدهید 👇", "b2b_btn": "📞 درخواست تماس", "ask_company": "🏢 نام شرکت/مجموعه خود را بنویسید:", "ask_b2b_phone": "📞 شماره تلفن خود را بنویسید تا کارشناس فروش عمده با شما تماس بگیرد:", "b2b_done": "✅ درخواست شما ثبت شد! در سریع‌ترین زمان با شما تماس می‌گیریم.\n💬 فوری است؟ واتساپ: 0537 732 52 69", "sube": "📍 شعب ما\n\n🏪 شعبه ۱ — باجیلار گوزتپه:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(کنار ایستگاه متروی گوزتپه)\n\n🏪 شعبه ۲ — اسنلر کمر:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 هر روز تا ۲۲:۳۰ باز هستیم.\n📞 تلفن / واتساپ: 0537 732 52 69", "iletisim": "💬 ارتباط\n\n📱 واتساپ و تلفن: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 اینستاگرام: @aykanetmangal\n✈️ تلگرام: همین ربات!", "unknown": "متوجه نشدم 🤔 از منوی زیر ادامه دهید:", "kb": {"menu": "🥩 منو و قیمت‌ها", "paket": "📦 پکیج‌ها", "sepet": "🛒 سبد خرید", "b2b": "🏢 عمده B2B", "sube": "📍 شعب", "iletisim": "💬 واتساپ", "site": "🌐 سایت ما", "kanal": "📢 کانال ما", "harita": "📍 مسیر ما"}, "checkout": "✅ تایید سفارش", "clear": "🗑 خالی کردن سبد", "continue": "➕ ادامه", "cart_empty_toast": "سبد خرید شما خالی است!", "cleared": "🗑 سبد خرید خالی شد.", "back_menu": "⬅️ منو", "home": "🏠 منوی اصلی"}}, "POSTS": ["🌯 VİRAL TORTİLLA KEBABI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nSosyal medyanın konuştuğu lezzet mağazamızda! 10 dakikada hazır, 399 TL. Bağcılar (Göztepe) civarındaysanız mutlaka deneyin!\n🌍 VIRAL TORTILLA KEBAB\nThe taste everyone is talking about! Ready in 10 minutes — 399 TL. Try it if you're around Bağcılar (Göztepe)!\n\n🇮🇷 کباب تورتیلای وایرال\nطعمی که همه درباره‌اش حرف می‌زنند! در ۱۰ دقیقه آماده — ۳۹۹ لیر. اگر اطراف باجیلار (گوزتپه) هستید حتماً امتحان کنید!\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #tortillakebap #viral", "❤️ ET VE SAĞLIK: DOĞRU BİLİNEN 5 YANLIŞ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nKırmızı et düşman değil, miktar önemli! Uzmanlara göre haftada 2-3 kez, ortalama 100-150 gr porsiyon dana eti; demir, B12 ve çinko için mükemmel bir kaynaktır. Kaliteli et + dengeli tabak = sağlıklı sofra.\n🌍 MEAT & HEALTH: 5 MYTHS\nRed meat is not the enemy — portion is! 2-3 times a week, 100-150 g of beef is an excellent source of iron, B12 and zinc. Quality meat + a balanced plate = a healthy table.\n\n🇮🇷 گوشت و سلامتی: ۵ باور غلط\nگوشت قرمز دشمن نیست — حجم مصرف مهم است! ۲ تا ۳ بار در هفته، ۱۰۰ تا ۱۵۰ گرم گوشت گوساله منبع عالی آهن، B12 و روی است. گوشت مرغوب + بشقاب متعادل = سفره سالم.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #sağlık #beslenme", "🔬 BİLİM İNSANI ANLATTI: MANGALDA KANSEROJEN RİSKİ NASIL AZALTILIR?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\nAraştırmalara göre 4 altın kural: 1) Kömürü tam kor haline getirin 2) Eti ateşe çok yaklaştırmayın 3) Yanmış kısımları kesin atın 4) Marine edilmiş et, heterosiklik amin oluşumunu %90'a kadar azaltıyor!\n🌍 SCIENCE: HOW TO REDUCE BBQ CARCINOGEN RISK\nStudies show 4 golden rules: 1) Let charcoal fully ash over 2) Don't hold meat too close to flame 3) Cut away charred parts 4) Marinated meat reduces heterocyclic amine formation by up to 90%!\n\n🇮🇷 علم می‌گوید: چطور ریسک سرطان‌زایی منقل را کم کنیم؟\nطبق تحقیقات ۴ قانون طلایی: ۱) ذغال را کاملاً خاکستر کنید ۲) گوشت را خیلی نزدیک شعله نگیرید ۳) قسمت‌های سوخته را جدا کنید ۴) گوشت مارین‌شده تشکیل آمین‌های هتروسیکلیک را تا ٪۹۰ کم می‌کند!\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #bilim #mangal", "📊 BU HAFTANIN ET FİYAT PANOSU\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nVitrin fiyatlarımızda sürpriz yok: Kemikli 650 • Kuşbaşı/Kıyma 750 • Antrikot 1.100 • Kuzu 1.069 • Pirzola 1.399 TL/Kg. Piyasa yükselirken biz tanzim fiyatını koruyoruz — çünkü kasabımız kendi kesimini yapıyor.\n🌍 THIS WEEK'S MEAT PRICE BOARD\nNo surprises at our counter: Bone-in 650 • Cubes/Minced 750 • Ribeye 1,100 • Lamb 1,069 • Chops 1,399 TL/kg. While the market rises, we hold prices — because we do our own butchering.\n\n🇮🇷 تابلوی قیمت گوشت این هفته\nدر قیمت‌های ما سورپرایز نیست: استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو. بازار بالا می‌رود ولی ما قیمت تنظیمی را حفظ می‌کنیم — چون ذبح خودمان انجام می‌شود.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #esenler #fiyat #pazar", "🍳 10 DAKİKADA TORTILLA KEBABI (VİDAL TARİF)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nZırhta çekilmiş kıymamız + lavaş + özel sos = sosyal medyanın gündemi! Tarif: Kıymayı baharatla soteleyin (5 dk), lavaşa sarın, tavada 2 dk kızartın. Üzerine ayran sos. Malzemeler bizde — lezzet sizde!\n🌍 10-MINUTE TORTILLA KEBAB (VIRAL RECIPE)\nOur stone-ground minced + lavash + special sauce = the social media trend! Recipe: sauté the mince with spices (5 min), wrap in lavash, sear 2 min. Top with yogurt sauce. Ingredients from us — flavour from you!\n\n🇮🇷 کباب تورتیلا در ۱۰ دقیقه (دستور وایرال)\nگوشت چرخ‌کرده ما + نان لواش + سس مخصوص = ترند شبکه‌های اجتماعی! دستور: گوشت را با ادویه تفت دهید (۵ دقیقه)، در لواش بپیچید، ۲ دقیقه در تابه سرخ کنید. روی آن سس ماست. مواد از ما — طعم از شما!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #tortilla", "🥩 HANGİ ET NE İÇİN? KASAP REHBERİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nAntrikot → ızgara/tava • Kuşbaşı → sulu yemek & güveç • Kıyma → köfte/burger • Kemikli et → çorba & yahnî • Kuzu pirzola → misafir sofrası. Emin değilseniz sorun — biz 20 yıllık ustalıkla yol gösteririz.\n🌍 WHICH CUT FOR WHAT? BUTCHER'S GUIDE\nRibeye → grill/pan • Cubes → stews & güveç • Minced → meatballs/burgers • Bone-in → soups & stews • Lamb chops → guest tables. Not sure? Just ask — 20 years of mastery at your service.\n\n🇮🇷 کدام گوشت برای چه کاری؟ راهنمای قصابی\nآنترکوت → گریل/تابه • کوپه → خورشت و دیزی • چرخ‌کرده → کوفته و برگر • استخوان‌دار → سوپ و آبگوشت • سیخ بره → سفره مهمانی. مطمئن نیستید؟ بپرسید — ۲۰ سال استادی در خدمت شما.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kesim #rehber", "🧊 ETİ EVDE NASIL SAKLAMALISINIZ? (GIDA MÜHENDİSİ CEVABI)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nBuzdolabında (0-4°C): kıyma 1 gün, kuşbaşı 2-3 gün, bütün et 3-5 gün. Donduracaksanız: vakumlu/ hava almayacak şekilde -18°C'de 3 aya kadar. Çözüm: buzdolabında yavaş çözdürün, asla tezgah üstünde bırakmayın!\n🌍 HOW TO STORE MEAT AT HOME (FOOD ENGINEER'S ANSWER)\nFridge (0-4°C): mince 1 day, cubes 2-3 days, whole cuts 3-5 days. Freezing: airtight/vacuum at -18°C up to 3 months. Thaw slowly in the fridge — never on the counter!\n\n🇮🇷 گوشت را در خانه چطور نگه داریم؟ (پاسخ مهندس مواد غذایی)\nیخچال (۰ تا ۴ درجه): چرخ‌کرده ۱ روز، کوپه ۲-۳ روز، گوشت یکپارچه ۳-۵ روز. فریزر: کاملاً بسته در ۱۸- درجه تا ۳ ماه. یخ‌زدایی فقط در یخچال — هرگز روی میز!\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güngören #gıdagüvenliği #saklama", "💪 SPORCULAR İÇİN: GÜNLÜK PROTEİN PLANI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\n70 kg bir sporcunun günlük ihtiyacı ~110-140 gr protein. Menü önerisi: Kahvaltıda 3 yumurta (18 gr), öğlende 150 gr dana kuşbaşı (39 gr), akşam 200 gr tavuk (46 gr) + yoğurt. Güçlü kaslar kasaptan geçer!\n🌍 ATHLETES: DAILY PROTEIN PLAN\nA 70 kg athlete needs ~110-140 g protein/day. Menu idea: 3 eggs at breakfast (18 g), 150 g beef cubes at lunch (39 g), 200 g chicken at dinner (46 g) + yogurt. Strong muscles start at the butcher's!\n\n🇮🇷 ورزشکاران: برنامه پروتئین روزانه\nیک ورزشکار ۷۰ کیلویی روزانه به ۱۱۰ تا ۱۴۰ گرم پروتئین نیاز دارد. منوی پیشنهادی: ۳ تخم‌مرغ صبحانه (۱۸ گرم)، ۱۵۰ گرم کوپه گوساله ناهار (۳۹ گرم)، ۲۰۰ گرم مرغ شام (۴۶ گرم) + ماست. عضله قوی از قصاب شروع می‌شود!\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #beslenme #spor", "🔥 MANGAL USTASININ 7 ALTIN KURALI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\n1) Kömür meşe olsun 2) Kor tam beyazlaşsın 3) Izgara telini temizleyin 4) Et oda sıcaklığına yaklaşsın 5) Etı sık çevirmeyin — bir kez çevirin 6) Tuzu ateşe atmadan hemen önce 7) Dinlendirin: 5 dk bekleyin, sonra kesin!\n🌍 7 GOLDEN RULES OF THE GRILL MASTER\n1) Use oak charcoal 2) Let coals turn fully white 3) Clean the grate 4) Let meat near room temp 5) Don't flip constantly — flip once 6) Salt just before the fire 7) Rest 5 minutes, then cut!\n\n🇮🇷 ۷ قانون طلایی استاد منقل\n۱) ذغال بلوط باشد ۲) ذغال کاملاً سفید شود ۳) سیخ را تمیز کنید ۴) گوشت نزدیک دمای اتاق باشد ۵) مدام برنگردانید — یک بار بچرخانید ۶) نمک را درست قبل از آتش ۷) ۵ دقیقه استراحت، بعد برش!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #mangal #ipucu", "⭐ MÜŞTERİMİZ ANLATIYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\n«20 yıldır bu semtteyiz, Aykan'dan almadığım gün etin tadı değişiyor!» — Zeytinburnu, Topkapı & Bakırköy mahallesinden müştah bir komşumuz. Siz de deneyin, farkı sofranızda hissedin. 🥩\n🌍 OUR CUSTOMER SPEAKS\n\"We've been in this neighbourhood for 20 years — on days I don't buy from Aykan, the meal just isn't the same!\" — a happy neighbour from Zeytinburnu, Topkapı & Bakırköy. Try it and taste the difference. 🥩\n\n🇮🇷 مشتری ما می‌گوید\n«بیست سال است در این محله هستیم، روزهایی که از آیکان نمی‌گیرم طعم غذا فرق می‌کند!» — همسایه خوشحالی از زیتون‌بورنو، توپکاپی و باکیرکوی. شما هم امتحان کنید و تفاوت را بچشید. 🥩\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #müşteri #güven", "🔥 HAFTA SONU MANGAL PAKETİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\n1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + meşe kömürü + özel sos = sadece 998 TL! Bağcılar (Göztepe) komşularına özel.\n🌍 WEEKEND BBQ PACK\n1 kg meatballs/cubes + 1 kg marinated chicken + oak charcoal + special sauce = only 998 TL! Special for Bağcılar (Göztepe) neighbours.\n\n🇮🇷 پکیج منقل آخر هفته\n۱ کیلو کوفته/کوپه + ۱ کیلو مرغ مارین + ذغال بلوط + سس مخصوص = فقط ۹۹۸ لیر! ویژه همسایگان باجیلار (گوزتپه).\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #mangal #haftasonu", "🩸 DEMİR EKSİKLER MİSİNİZ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nYorgunluk, halsizlik, çabuk yorulma... Sebep demir eksikliği olabilir! Dana eti, vücudun en kolay emdiği 'hem demiri' içerir. Ispanaklı demirin emilimi %5 iken etteki demirin emilimi %25'tir.\n🌍 LOW ON IRON?\nFatigue, weakness, tiredness... It might be iron deficiency! Beef contains 'heme iron', the easiest form for your body to absorb — while spinach iron absorbs at ~5%, beef iron absorbs at ~25%.\n\n🇮🇷 کم‌خون هستید؟\nخستگی، بی‌حالی، زود فرسودگی... ممکن است کمبود آهن باشد! گوشت گوساله «آهن هِم» دارد که راحت‌ترین شکل جذب برای بدن است — جذب آهن اسفناج حدود ٪۵ ولی جذب آهن گوشت حدود ٪۲۵ است.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #demir #sağlık", "🧪 PROTEİN BİLİMİ: KAS İÇİN ETİN YERİ TUTULMAZ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\n100 gr dana kuşbaşı = ~26 gr tam protein (vücudun ihtiyaç duyduğu tüm esansiyel amino asitlerle). Spor bilimciler kas onarımı için antrenmandan sonra 25-40 gr protein öneriyor.\n🌍 PROTEIN SCIENCE: NOTHING REPLACES MEAT\n100 g of beef cubes = ~26 g of complete protein with ALL essential amino acids. Sports scientists recommend 25-40 g protein after training for muscle repair.\n\n🇮🇷 علم پروتئین: جایگزین گوشت برای عضله وجود ندارد\n۱۰۰ گرم کوپه گوساله = حدود ۲۶ گرم پروتئین کامل با تمام آمینواسیدهای ضروری. دانشمندان ورزشی برای ترمیم عضله بعد از تمرین ۲۵ تا ۴۰ گرم پروتئین توصیه می‌کنند.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #protein #bilim", "🧾 TOPTANCIYA MI ALIYORSUNUZ? BU HESAP SİZİ İLGİLENDİRİYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nRestoran/otel/catering iseniz: 15 kurumsal paketimizde %10'a varan indirim + günlük taze sevkiyat + kurumsal fatura var. Bu bottan 🏢 B2B Toptan'a dokunun, size özel paket çıkaralım.\n🌍 BUYING WHOLESALE? THIS ONE'S FOR YOU\nRestaurant/hotel/catering: our 15 corporate packages offer up to 10% off + fresh daily delivery + corporate invoicing. Tap 🏢 B2B in this bot for your custom package.\n\n🇮🇷 خرید عمده می‌کنید؟ این پست برای شماست\nرستوران/هتل/کیترینگ هستید؟ ۱۵ پکیج سازمانی ما تا ٪۱۰ تخفیف + ارسال تازه روزانه + فاکتور رسمی دارد. در همین ربات دکمه 🏢 عمده را بزنید تا پکیج اختصاصی شما را بدهیم.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #esenler #toptan #b2b", "🍲 KASAPTAN SOFRAYA: DANA KUŞBAŞI GÜVEÇ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nMalzemeler: 750 gr kuşbaşı, 2 soğan, 3 domates, biber, kekik. Kuşbaşı zırhta değil kuşbaşı kesimde! Etinizi bizden alın, evde güvece atın — 2 saat sonra misafirleriniz ayakta alkışlıyor.\n🌍 FROM BUTCHER TO TABLE: BEEF GÜVEÇ STEW\nIngredients: 750 g cubes, 2 onions, 3 tomatoes, peppers, thyme. Get your cubes from us, throw them in a clay pot — 2 hours later your guests applaud.\n\n🇮🇷 از قصاب تا سفره: خورشت کوپه گوساله\nمواد لازم: ۷۵۰ گرم کوپه، ۲ پیاز، ۳ گوجه، فلفل، آویشن. کوپه‌تان را از ما بگیرید و در دیگ سنگی بریزید — دو ساعت بعد مهمان‌های شما کف می‌زنند!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #güveç", "⚖️ ZIRHTA ÇEKME NEDEN ÖNEMLİ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nKasap kıyması ile hazır kıyma aynı şey değildir! Zırhta çekilen kıyma tek parça ettir, katkı ve 'ne olduğu belirsiz' karışım yok. İstediğiniz yağ oranında, gözünüzün önünde çekiyoruz.\n🌍 WHY STONE-GROUND MINCE MATTERS\nButcher mince and packaged mince are NOT the same! Stone-ground mince comes from a single cut — no additives, no mystery blends. We grind to your preferred fat ratio, right in front of you.\n\n🇮🇷 چرا چرخ‌کردن سنگی مهم است؟\nگوشت چرخ‌کرده قصابی با گوشت چرخ‌کرده بسته‌بندی یکی نیست! چرخ‌شده سنگی از یک تکه گوشت است — بدون افزودنی و بدون ترکیب مرموز. با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kıyma #kalite", "🔬 SOĞUK ZİNCİR NEDEN KRİTİK?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nEt, kesimden tezgaha kadar 0-4°C'de kalmalı. Zincir kırılırsa bakteriler 20 dakikada ikiye bölünür! Bizim tezgahta soğuk zincir hiç kırılmaz — kasaplık ciddi iştir.\n🌍 WHY THE COLD CHAIN IS CRITICAL\nMeat must stay at 0-4°C from butchering to counter. If the chain breaks, bacteria double every 20 minutes! At our counter the cold chain never breaks — butchery is serious business.\n\n🇮🇷 چرا زنجیره سرد حیاتی است؟\nگوشت باید از ذبح تا ویترین در ۰ تا ۴ درجه بماند. اگر زنجیره بشکند، باکتری‌ها هر ۲۰ دقیقه دوبرابر می‌شوند! در ویترین ما زنجیره سرد هرگز نمی‌شکند — قصابی کار جدی است.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güngören #soğukzincir #hijyen", "👶 ÇOCUKLARDA ETİN ROLÜ: BÜYÜME VE ZEKÂ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\nPediatristlere göre büyüme çağındaki çocuklarda B12, demir ve çinko eksikliği öğrenme kapasitesini düşürüyor. Haftada 2-3 kez kaliteli kıyma/kuşbaşı içeren beslenme, okul başarısını destekliyor.\n🌍 MEAT IN CHILDHOOD: GROWTH & BRAIN\nPediatricians note that B12, iron and zinc deficiency in growing children reduces learning capacity. Quality mince/cubes 2-3 times a week supports school success.\n\n🇮🇷 نقش گوشت در کودکان: رشد و هوش\nطبق نظر متخصصان کودکان، کمبود B12 و آهن و روی در سن رشد، توان یادگیری را کم می‌کند. ۲ تا ۳ بار در هفته گوشت مرغوب، موفقیت درس را تقویت می‌کند.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #çocuk #beslenme", "🧺 PİKNİK SEPETİNİZ HAZIR MI?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\nHafta sonu planı yapan Gaziosmanpaşa & Sultangazi komşuları: marine tavuk, hazır köfte harmanı, meşe kömürü ve ekmek — hepsi tek pakette, yol üstü şubemizden hazır alın!\n🌍 IS YOUR PICNIC BASKET READY?\nFor Gaziosmanpaşa & Sultangazi neighbours planning the weekend: marinated chicken, ready meatball mix, oak charcoal and bread — all in one pack, grab it ready from our branch on your way!\n\n🇮🇷 سبد پیک‌نیک‌تان آماده است؟\nبرای همسایگان قاضی‌عثمان‌پاشا و سلطان‌قاضی که برنامه آخر هفته دارند: مرغ مارین، مخلوط آماده کوفته، ذغال بلوط و نان — همه در یک پکیج، از شعبه در مسیر، آماده تحویل!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #piknik #mangal", "🐟 TEZGAHIMIZDA YENİ SEZON!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\nEt • Balık • Tavuk • Kuzu — tek adreste! Bu sezon tezgahımıza günlük taze balık da geldikçe ekliyoruz. Zeytinburnu, Topkapı & Bakırköy bölgesinde akşam yemeğini bizden çıkar, eve hazırlanmış götür!\n🌍 NEW SEASON AT OUR COUNTER!\nBeef • Fish • Chicken • Lamb — one address! This season we keep adding fresh daily fish to our counter. In Zeytinburnu, Topkapı & Bakırköy, pick up dinner from us — ready to cook!\n\n🇮🇷 فصل جدید در ویترین ما!\nگوساله • ماهی • مرغ • بره — در یک آدرس! این فصل ماهی تازه روزانه هم به ویترین ما اضافه می‌شود. در زیتون‌بورنو، توپکاپی و باکیرکوی، شام را از ما ببرید — آماده پخت!\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #sezon #tazelik", "🥩 GÜNLÜK TAZE KESİM\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nSabah kesilen et, akşam sofranızda! Araçısız, kasaptan direkt tanzim fiyatına. Kemikli 650 TL • Kuşbaşı/Kıyma 750 TL.\n🌍 FRESH DAILY CUTS\nMeat cut in the morning, on your table by evening! Direct from the butcher at cash-and-carry prices. Bone-in 650 TL • Cubes/minced 750 TL.\n\n🇮🇷 برش تازه روزانه\nگوشتی صبح ذبح می‌شود و شب روی سفره شماست! مستقیم از قصاب بدون واسطه. استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ لیر.\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #günlükTaze #tanzim", "❤️ ET VE SAĞLIK: DOĞRU BİLİNEN 5 YANLIŞ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nKırmızı et düşman değil, miktar önemli! Uzmanlara göre haftada 2-3 kez, ortalama 100-150 gr porsiyon dana eti; demir, B12 ve çinko için mükemmel bir kaynaktır. Kaliteli et + dengeli tabak = sağlıklı sofra.\n🌍 MEAT & HEALTH: 5 MYTHS\nRed meat is not the enemy — portion is! 2-3 times a week, 100-150 g of beef is an excellent source of iron, B12 and zinc. Quality meat + a balanced plate = a healthy table.\n\n🇮🇷 گوشت و سلامتی: ۵ باور غلط\nگوشت قرمز دشمن نیست — حجم مصرف مهم است! ۲ تا ۳ بار در هفته، ۱۰۰ تا ۱۵۰ گرم گوشت گوساله منبع عالی آهن، B12 و روی است. گوشت مرغوب + بشقاب متعادل = سفره سالم.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #sağlık #beslenme", "🔬 BİLİM İNSANI ANLATTI: MANGALDA KANSEROJEN RİSKİ NASIL AZALTILIR?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\nAraştırmalara göre 4 altın kural: 1) Kömürü tam kor haline getirin 2) Eti ateşe çok yaklaştırmayın 3) Yanmış kısımları kesin atın 4) Marine edilmiş et, heterosiklik amin oluşumunu %90'a kadar azaltıyor!\n🌍 SCIENCE: HOW TO REDUCE BBQ CARCINOGEN RISK\nStudies show 4 golden rules: 1) Let charcoal fully ash over 2) Don't hold meat too close to flame 3) Cut away charred parts 4) Marinated meat reduces heterocyclic amine formation by up to 90%!\n\n🇮🇷 علم می‌گوید: چطور ریسک سرطان‌زایی منقل را کم کنیم؟\nطبق تحقیقات ۴ قانون طلایی: ۱) ذغال را کاملاً خاکستر کنید ۲) گوشت را خیلی نزدیک شعله نگیرید ۳) قسمت‌های سوخته را جدا کنید ۴) گوشت مارین‌شده تشکیل آمین‌های هتروسیکلیک را تا ٪۹۰ کم می‌کند!\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #bilim #mangal", "📊 BU HAFTANIN ET FİYAT PANOSU\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nVitrin fiyatlarımızda sürpriz yok: Kemikli 650 • Kuşbaşı/Kıyma 750 • Antrikot 1.100 • Kuzu 1.069 • Pirzola 1.399 TL/Kg. Piyasa yükselirken biz tanzim fiyatını koruyoruz — çünkü kasabımız kendi kesimini yapıyor.\n🌍 THIS WEEK'S MEAT PRICE BOARD\nNo surprises at our counter: Bone-in 650 • Cubes/Minced 750 • Ribeye 1,100 • Lamb 1,069 • Chops 1,399 TL/kg. While the market rises, we hold prices — because we do our own butchering.\n\n🇮🇷 تابلوی قیمت گوشت این هفته\nدر قیمت‌های ما سورپرایز نیست: استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو. بازار بالا می‌رود ولی ما قیمت تنظیمی را حفظ می‌کنیم — چون ذبح خودمان انجام می‌شود.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #esenler #fiyat #pazar", "🍳 10 DAKİKADA TORTILLA KEBABI (VİDAL TARİF)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nZırhta çekilmiş kıymamız + lavaş + özel sos = sosyal medyanın gündemi! Tarif: Kıymayı baharatla soteleyin (5 dk), lavaşa sarın, tavada 2 dk kızartın. Üzerine ayran sos. Malzemeler bizde — lezzet sizde!\n🌍 10-MINUTE TORTILLA KEBAB (VIRAL RECIPE)\nOur stone-ground minced + lavash + special sauce = the social media trend! Recipe: sauté the mince with spices (5 min), wrap in lavash, sear 2 min. Top with yogurt sauce. Ingredients from us — flavour from you!\n\n🇮🇷 کباب تورتیلا در ۱۰ دقیقه (دستور وایرال)\nگوشت چرخ‌کرده ما + نان لواش + سس مخصوص = ترند شبکه‌های اجتماعی! دستور: گوشت را با ادویه تفت دهید (۵ دقیقه)، در لواش بپیچید، ۲ دقیقه در تابه سرخ کنید. روی آن سس ماست. مواد از ما — طعم از شما!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #tortilla", "🥩 HANGİ ET NE İÇİN? KASAP REHBERİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nAntrikot → ızgara/tava • Kuşbaşı → sulu yemek & güveç • Kıyma → köfte/burger • Kemikli et → çorba & yahnî • Kuzu pirzola → misafir sofrası. Emin değilseniz sorun — biz 20 yıllık ustalıkla yol gösteririz.\n🌍 WHICH CUT FOR WHAT? BUTCHER'S GUIDE\nRibeye → grill/pan • Cubes → stews & güveç • Minced → meatballs/burgers • Bone-in → soups & stews • Lamb chops → guest tables. Not sure? Just ask — 20 years of mastery at your service.\n\n🇮🇷 کدام گوشت برای چه کاری؟ راهنمای قصابی\nآنترکوت → گریل/تابه • کوپه → خورشت و دیزی • چرخ‌کرده → کوفته و برگر • استخوان‌دار → سوپ و آبگوشت • سیخ بره → سفره مهمانی. مطمئن نیستید؟ بپرسید — ۲۰ سال استادی در خدمت شما.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kesim #rehber", "🧊 ETİ EVDE NASIL SAKLAMALISINIZ? (GIDA MÜHENDİSİ CEVABI)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nBuzdolabında (0-4°C): kıyma 1 gün, kuşbaşı 2-3 gün, bütün et 3-5 gün. Donduracaksanız: vakumlu/ hava almayacak şekilde -18°C'de 3 aya kadar. Çözüm: buzdolabında yavaş çözdürün, asla tezgah üstünde bırakmayın!\n🌍 HOW TO STORE MEAT AT HOME (FOOD ENGINEER'S ANSWER)\nFridge (0-4°C): mince 1 day, cubes 2-3 days, whole cuts 3-5 days. Freezing: airtight/vacuum at -18°C up to 3 months. Thaw slowly in the fridge — never on the counter!\n\n🇮🇷 گوشت را در خانه چطور نگه داریم؟ (پاسخ مهندس مواد غذایی)\nیخچال (۰ تا ۴ درجه): چرخ‌کرده ۱ روز، کوپه ۲-۳ روز، گوشت یکپارچه ۳-۵ روز. فریزر: کاملاً بسته در ۱۸- درجه تا ۳ ماه. یخ‌زدایی فقط در یخچال — هرگز روی میز!\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güngören #gıdagüvenliği #saklama", "💪 SPORCULAR İÇİN: GÜNLÜK PROTEİN PLANI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\n70 kg bir sporcunun günlük ihtiyacı ~110-140 gr protein. Menü önerisi: Kahvaltıda 3 yumurta (18 gr), öğlende 150 gr dana kuşbaşı (39 gr), akşam 200 gr tavuk (46 gr) + yoğurt. Güçlü kaslar kasaptan geçer!\n🌍 ATHLETES: DAILY PROTEIN PLAN\nA 70 kg athlete needs ~110-140 g protein/day. Menu idea: 3 eggs at breakfast (18 g), 150 g beef cubes at lunch (39 g), 200 g chicken at dinner (46 g) + yogurt. Strong muscles start at the butcher's!\n\n🇮🇷 ورزشکاران: برنامه پروتئین روزانه\nیک ورزشکار ۷۰ کیلویی روزانه به ۱۱۰ تا ۱۴۰ گرم پروتئین نیاز دارد. منوی پیشنهادی: ۳ تخم‌مرغ صبحانه (۱۸ گرم)، ۱۵۰ گرم کوپه گوساله ناهار (۳۹ گرم)، ۲۰۰ گرم مرغ شام (۴۶ گرم) + ماست. عضله قوی از قصاب شروع می‌شود!\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #beslenme #spor", "🔥 MANGAL USTASININ 7 ALTIN KURALI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\n1) Kömür meşe olsun 2) Kor tam beyazlaşsın 3) Izgara telini temizleyin 4) Et oda sıcaklığına yaklaşsın 5) Etı sık çevirmeyin — bir kez çevirin 6) Tuzu ateşe atmadan hemen önce 7) Dinlendirin: 5 dk bekleyin, sonra kesin!\n🌍 7 GOLDEN RULES OF THE GRILL MASTER\n1) Use oak charcoal 2) Let coals turn fully white 3) Clean the grate 4) Let meat near room temp 5) Don't flip constantly — flip once 6) Salt just before the fire 7) Rest 5 minutes, then cut!\n\n🇮🇷 ۷ قانون طلایی استاد منقل\n۱) ذغال بلوط باشد ۲) ذغال کاملاً سفید شود ۳) سیخ را تمیز کنید ۴) گوشت نزدیک دمای اتاق باشد ۵) مدام برنگردانید — یک بار بچرخانید ۶) نمک را درست قبل از آتش ۷) ۵ دقیقه استراحت، بعد برش!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #mangal #ipucu", "⭐ MÜŞTERİMİZ ANLATIYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\n«20 yıldır bu semtteyiz, Aykan'dan almadığım gün etin tadı değişiyor!» — Zeytinburnu, Topkapı & Bakırköy mahallesinden müştah bir komşumuz. Siz de deneyin, farkı sofranızda hissedin. 🥩\n🌍 OUR CUSTOMER SPEAKS\n\"We've been in this neighbourhood for 20 years — on days I don't buy from Aykan, the meal just isn't the same!\" — a happy neighbour from Zeytinburnu, Topkapı & Bakırköy. Try it and taste the difference. 🥩\n\n🇮🇷 مشتری ما می‌گوید\n«بیست سال است در این محله هستیم، روزهایی که از آیکان نمی‌گیرم طعم غذا فرق می‌کند!» — همسایه خوشحالی از زیتون‌بورنو، توپکاپی و باکیرکوی. شما هم امتحان کنید و تفاوت را بچشید. 🥩\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #müşteri #güven", "💰 ŞEFFAF VİTRİN FİYATLARI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nFiyyatlarda sürpriz yok! Vitrinde ne yazıyorsa o: Kemikli 650 • Kuşbaşı 750 • Antrikot 1100 • Kuzu 1069 • Pirzola 1399 TL/Kg.\n🌍 TRANSPARENT COUNTER PRICES\nNo surprises! What you see on the counter is what you pay: Bone-in 650 • Cubes 750 • Ribeye 1100 • Lamb 1069 • Chops 1399 TL/kg.\n\n🇮🇷 قیمت‌های شفاف ویترین\nبدون سورپرایز! همان که روی ویترین است می‌پردازید: استخوان‌دار ۶۵۰ • کوپه ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو.\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #fiyatşeffaflığı", "🩸 DEMİR EKSİKLER MİSİNİZ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nYorgunluk, halsizlik, çabuk yorulma... Sebep demir eksikliği olabilir! Dana eti, vücudun en kolay emdiği 'hem demiri' içerir. Ispanaklı demirin emilimi %5 iken etteki demirin emilimi %25'tir.\n🌍 LOW ON IRON?\nFatigue, weakness, tiredness... It might be iron deficiency! Beef contains 'heme iron', the easiest form for your body to absorb — while spinach iron absorbs at ~5%, beef iron absorbs at ~25%.\n\n🇮🇷 کم‌خون هستید؟\nخستگی، بی‌حالی، زود فرسودگی... ممکن است کمبود آهن باشد! گوشت گوساله «آهن هِم» دارد که راحت‌ترین شکل جذب برای بدن است — جذب آهن اسفناج حدود ٪۵ ولی جذب آهن گوشت حدود ٪۲۵ است.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #demir #sağlık", "🧪 PROTEİN BİLİMİ: KAS İÇİN ETİN YERİ TUTULMAZ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\n100 gr dana kuşbaşı = ~26 gr tam protein (vücudun ihtiyaç duyduğu tüm esansiyel amino asitlerle). Spor bilimciler kas onarımı için antrenmandan sonra 25-40 gr protein öneriyor.\n🌍 PROTEIN SCIENCE: NOTHING REPLACES MEAT\n100 g of beef cubes = ~26 g of complete protein with ALL essential amino acids. Sports scientists recommend 25-40 g protein after training for muscle repair.\n\n🇮🇷 علم پروتئین: جایگزین گوشت برای عضله وجود ندارد\n۱۰۰ گرم کوپه گوساله = حدود ۲۶ گرم پروتئین کامل با تمام آمینواسیدهای ضروری. دانشمندان ورزشی برای ترمیم عضله بعد از تمرین ۲۵ تا ۴۰ گرم پروتئین توصیه می‌کنند.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #protein #bilim", "🧾 TOPTANCIYA MI ALIYORSUNUZ? BU HESAP SİZİ İLGİLENDİRİYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nRestoran/otel/catering iseniz: 15 kurumsal paketimizde %10'a varan indirim + günlük taze sevkiyat + kurumsal fatura var. Bu bottan 🏢 B2B Toptan'a dokunun, size özel paket çıkaralım.\n🌍 BUYING WHOLESALE? THIS ONE'S FOR YOU\nRestaurant/hotel/catering: our 15 corporate packages offer up to 10% off + fresh daily delivery + corporate invoicing. Tap 🏢 B2B in this bot for your custom package.\n\n🇮🇷 خرید عمده می‌کنید؟ این پست برای شماست\nرستوران/هتل/کیترینگ هستید؟ ۱۵ پکیج سازمانی ما تا ٪۱۰ تخفیف + ارسال تازه روزانه + فاکتور رسمی دارد. در همین ربات دکمه 🏢 عمده را بزنید تا پکیج اختصاصی شما را بدهیم.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #esenler #toptan #b2b", "🍲 KASAPTAN SOFRAYA: DANA KUŞBAŞI GÜVEÇ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nMalzemeler: 750 gr kuşbaşı, 2 soğan, 3 domates, biber, kekik. Kuşbaşı zırhta değil kuşbaşı kesimde! Etinizi bizden alın, evde güvece atın — 2 saat sonra misafirleriniz ayakta alkışlıyor.\n🌍 FROM BUTCHER TO TABLE: BEEF GÜVEÇ STEW\nIngredients: 750 g cubes, 2 onions, 3 tomatoes, peppers, thyme. Get your cubes from us, throw them in a clay pot — 2 hours later your guests applaud.\n\n🇮🇷 از قصاب تا سفره: خورشت کوپه گوساله\nمواد لازم: ۷۵۰ گرم کوپه، ۲ پیاز، ۳ گوجه، فلفل، آویشن. کوپه‌تان را از ما بگیرید و در دیگ سنگی بریزید — دو ساعت بعد مهمان‌های شما کف می‌زنند!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #güveç", "⚖️ ZIRHTA ÇEKME NEDEN ÖNEMLİ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nKasap kıyması ile hazır kıyma aynı şey değildir! Zırhta çekilen kıyma tek parça ettir, katkı ve 'ne olduğu belirsiz' karışım yok. İstediğiniz yağ oranında, gözünüzün önünde çekiyoruz.\n🌍 WHY STONE-GROUND MINCE MATTERS\nButcher mince and packaged mince are NOT the same! Stone-ground mince comes from a single cut — no additives, no mystery blends. We grind to your preferred fat ratio, right in front of you.\n\n🇮🇷 چرا چرخ‌کردن سنگی مهم است؟\nگوشت چرخ‌کرده قصابی با گوشت چرخ‌کرده بسته‌بندی یکی نیست! چرخ‌شده سنگی از یک تکه گوشت است — بدون افزودنی و بدون ترکیب مرموز. با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kıyma #kalite", "🔬 SOĞUK ZİNCİR NEDEN KRİTİK?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nEt, kesimden tezgaha kadar 0-4°C'de kalmalı. Zincir kırılırsa bakteriler 20 dakikada ikiye bölünür! Bizim tezgahta soğuk zincir hiç kırılmaz — kasaplık ciddi iştir.\n🌍 WHY THE COLD CHAIN IS CRITICAL\nMeat must stay at 0-4°C from butchering to counter. If the chain breaks, bacteria double every 20 minutes! At our counter the cold chain never breaks — butchery is serious business.\n\n🇮🇷 چرا زنجیره سرد حیاتی است؟\nگوشت باید از ذبح تا ویترین در ۰ تا ۴ درجه بماند. اگر زنجیره بشکند، باکتری‌ها هر ۲۰ دقیقه دوبرابر می‌شوند! در ویترین ما زنجیره سرد هرگز نمی‌شکند — قصابی کار جدی است.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güngören #soğukzincir #hijyen", "👶 ÇOCUKLARDA ETİN ROLÜ: BÜYÜME VE ZEKÂ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\nPediatristlere göre büyüme çağındaki çocuklarda B12, demir ve çinko eksikliği öğrenme kapasitesini düşürüyor. Haftada 2-3 kez kaliteli kıyma/kuşbaşı içeren beslenme, okul başarısını destekliyor.\n🌍 MEAT IN CHILDHOOD: GROWTH & BRAIN\nPediatricians note that B12, iron and zinc deficiency in growing children reduces learning capacity. Quality mince/cubes 2-3 times a week supports school success.\n\n🇮🇷 نقش گوشت در کودکان: رشد و هوش\nطبق نظر متخصصان کودکان، کمبود B12 و آهن و روی در سن رشد، توان یادگیری را کم می‌کند. ۲ تا ۳ بار در هفته گوشت مرغوب، موفقیت درس را تقویت می‌کند.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #çocuk #beslenme", "🧺 PİKNİK SEPETİNİZ HAZIR MI?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\nHafta sonu planı yapan Gaziosmanpaşa & Sultangazi komşuları: marine tavuk, hazır köfte harmanı, meşe kömürü ve ekmek — hepsi tek pakette, yol üstü şubemizden hazır alın!\n🌍 IS YOUR PICNIC BASKET READY?\nFor Gaziosmanpaşa & Sultangazi neighbours planning the weekend: marinated chicken, ready meatball mix, oak charcoal and bread — all in one pack, grab it ready from our branch on your way!\n\n🇮🇷 سبد پیک‌نیک‌تان آماده است؟\nبرای همسایگان قاضی‌عثمان‌پاشا و سلطان‌قاضی که برنامه آخر هفته دارند: مرغ مارین، مخلوط آماده کوفته، ذغال بلوط و نان — همه در یک پکیج، از شعبه در مسیر، آماده تحویل!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #piknik #mangal", "🐟 TEZGAHIMIZDA YENİ SEZON!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\nEt • Balık • Tavuk • Kuzu — tek adreste! Bu sezon tezgahımıza günlük taze balık da geldikçe ekliyoruz. Zeytinburnu, Topkapı & Bakırköy bölgesinde akşam yemeğini bizden çıkar, eve hazırlanmış götür!\n🌍 NEW SEASON AT OUR COUNTER!\nBeef • Fish • Chicken • Lamb — one address! This season we keep adding fresh daily fish to our counter. In Zeytinburnu, Topkapı & Bakırköy, pick up dinner from us — ready to cook!\n\n🇮🇷 فصل جدید در ویترین ما!\nگوساله • ماهی • مرغ • بره — در یک آدرس! این فصل ماهی تازه روزانه هم به ویترین ما اضافه می‌شود. در زیتون‌بورنو، توپکاپی و باکیرکوی، شام را از ما ببرید — آماده پخت!\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #sezon #tazelik", "🍖 KUZU PİRZOLA ÖZEL\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nMisafir sofralarının yıldızı: Kuzu Pirzola 1.399 TL/Kg. Bağcılar (Göztepe) bölgesinde en taze kuzu bizde!\n🌍 LAMB CHOPS SPECIAL\nThe star of guest tables: Lamb Chops 1,399 TL/kg. The freshest lamb in Bağcılar (Göztepe) is here!\n\n🇮🇷 سیخ بره ویژه\nستاره سفره مهمانی: سیخ بره ۱۳۹۹ لیر/کیلو. تازه‌ترین بره در باجیلار (گوزتپه) اینجاست!\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #kuzupirzola", "❤️ ET VE SAĞLIK: DOĞRU BİLİNEN 5 YANLIŞ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nKırmızı et düşman değil, miktar önemli! Uzmanlara göre haftada 2-3 kez, ortalama 100-150 gr porsiyon dana eti; demir, B12 ve çinko için mükemmel bir kaynaktır. Kaliteli et + dengeli tabak = sağlıklı sofra.\n🌍 MEAT & HEALTH: 5 MYTHS\nRed meat is not the enemy — portion is! 2-3 times a week, 100-150 g of beef is an excellent source of iron, B12 and zinc. Quality meat + a balanced plate = a healthy table.\n\n🇮🇷 گوشت و سلامتی: ۵ باور غلط\nگوشت قرمز دشمن نیست — حجم مصرف مهم است! ۲ تا ۳ بار در هفته، ۱۰۰ تا ۱۵۰ گرم گوشت گوساله منبع عالی آهن، B12 و روی است. گوشت مرغوب + بشقاب متعادل = سفره سالم.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #sağlık #beslenme", "🔬 BİLİM İNSANI ANLATTI: MANGALDA KANSEROJEN RİSKİ NASIL AZALTILIR?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\nAraştırmalara göre 4 altın kural: 1) Kömürü tam kor haline getirin 2) Eti ateşe çok yaklaştırmayın 3) Yanmış kısımları kesin atın 4) Marine edilmiş et, heterosiklik amin oluşumunu %90'a kadar azaltıyor!\n🌍 SCIENCE: HOW TO REDUCE BBQ CARCINOGEN RISK\nStudies show 4 golden rules: 1) Let charcoal fully ash over 2) Don't hold meat too close to flame 3) Cut away charred parts 4) Marinated meat reduces heterocyclic amine formation by up to 90%!\n\n🇮🇷 علم می‌گوید: چطور ریسک سرطان‌زایی منقل را کم کنیم؟\nطبق تحقیقات ۴ قانون طلایی: ۱) ذغال را کاملاً خاکستر کنید ۲) گوشت را خیلی نزدیک شعله نگیرید ۳) قسمت‌های سوخته را جدا کنید ۴) گوشت مارین‌شده تشکیل آمین‌های هتروسیکلیک را تا ٪۹۰ کم می‌کند!\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #bilim #mangal", "📊 BU HAFTANIN ET FİYAT PANOSU\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nVitrin fiyatlarımızda sürpriz yok: Kemikli 650 • Kuşbaşı/Kıyma 750 • Antrikot 1.100 • Kuzu 1.069 • Pirzola 1.399 TL/Kg. Piyasa yükselirken biz tanzim fiyatını koruyoruz — çünkü kasabımız kendi kesimini yapıyor.\n🌍 THIS WEEK'S MEAT PRICE BOARD\nNo surprises at our counter: Bone-in 650 • Cubes/Minced 750 • Ribeye 1,100 • Lamb 1,069 • Chops 1,399 TL/kg. While the market rises, we hold prices — because we do our own butchering.\n\n🇮🇷 تابلوی قیمت گوشت این هفته\nدر قیمت‌های ما سورپرایز نیست: استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو. بازار بالا می‌رود ولی ما قیمت تنظیمی را حفظ می‌کنیم — چون ذبح خودمان انجام می‌شود.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #esenler #fiyat #pazar", "🍳 10 DAKİKADA TORTILLA KEBABI (VİDAL TARİF)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nZırhta çekilmiş kıymamız + lavaş + özel sos = sosyal medyanın gündemi! Tarif: Kıymayı baharatla soteleyin (5 dk), lavaşa sarın, tavada 2 dk kızartın. Üzerine ayran sos. Malzemeler bizde — lezzet sizde!\n🌍 10-MINUTE TORTILLA KEBAB (VIRAL RECIPE)\nOur stone-ground minced + lavash + special sauce = the social media trend! Recipe: sauté the mince with spices (5 min), wrap in lavash, sear 2 min. Top with yogurt sauce. Ingredients from us — flavour from you!\n\n🇮🇷 کباب تورتیلا در ۱۰ دقیقه (دستور وایرال)\nگوشت چرخ‌کرده ما + نان لواش + سس مخصوص = ترند شبکه‌های اجتماعی! دستور: گوشت را با ادویه تفت دهید (۵ دقیقه)، در لواش بپیچید، ۲ دقیقه در تابه سرخ کنید. روی آن سس ماست. مواد از ما — طعم از شما!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #tortilla", "🥩 HANGİ ET NE İÇİN? KASAP REHBERİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nAntrikot → ızgara/tava • Kuşbaşı → sulu yemek & güveç • Kıyma → köfte/burger • Kemikli et → çorba & yahnî • Kuzu pirzola → misafir sofrası. Emin değilseniz sorun — biz 20 yıllık ustalıkla yol gösteririz.\n🌍 WHICH CUT FOR WHAT? BUTCHER'S GUIDE\nRibeye → grill/pan • Cubes → stews & güveç • Minced → meatballs/burgers • Bone-in → soups & stews • Lamb chops → guest tables. Not sure? Just ask — 20 years of mastery at your service.\n\n🇮🇷 کدام گوشت برای چه کاری؟ راهنمای قصابی\nآنترکوت → گریل/تابه • کوپه → خورشت و دیزی • چرخ‌کرده → کوفته و برگر • استخوان‌دار → سوپ و آبگوشت • سیخ بره → سفره مهمانی. مطمئن نیستید؟ بپرسید — ۲۰ سال استادی در خدمت شما.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kesim #rehber", "🧊 ETİ EVDE NASIL SAKLAMALISINIZ? (GIDA MÜHENDİSİ CEVABI)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nBuzdolabında (0-4°C): kıyma 1 gün, kuşbaşı 2-3 gün, bütün et 3-5 gün. Donduracaksanız: vakumlu/ hava almayacak şekilde -18°C'de 3 aya kadar. Çözüm: buzdolabında yavaş çözdürün, asla tezgah üstünde bırakmayın!\n🌍 HOW TO STORE MEAT AT HOME (FOOD ENGINEER'S ANSWER)\nFridge (0-4°C): mince 1 day, cubes 2-3 days, whole cuts 3-5 days. Freezing: airtight/vacuum at -18°C up to 3 months. Thaw slowly in the fridge — never on the counter!\n\n🇮🇷 گوشت را در خانه چطور نگه داریم؟ (پاسخ مهندس مواد غذایی)\nیخچال (۰ تا ۴ درجه): چرخ‌کرده ۱ روز، کوپه ۲-۳ روز، گوشت یکپارچه ۳-۵ روز. فریزر: کاملاً بسته در ۱۸- درجه تا ۳ ماه. یخ‌زدایی فقط در یخچال — هرگز روی میز!\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güngören #gıdagüvenliği #saklama", "💪 SPORCULAR İÇİN: GÜNLÜK PROTEİN PLANI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\n70 kg bir sporcunun günlük ihtiyacı ~110-140 gr protein. Menü önerisi: Kahvaltıda 3 yumurta (18 gr), öğlende 150 gr dana kuşbaşı (39 gr), akşam 200 gr tavuk (46 gr) + yoğurt. Güçlü kaslar kasaptan geçer!\n🌍 ATHLETES: DAILY PROTEIN PLAN\nA 70 kg athlete needs ~110-140 g protein/day. Menu idea: 3 eggs at breakfast (18 g), 150 g beef cubes at lunch (39 g), 200 g chicken at dinner (46 g) + yogurt. Strong muscles start at the butcher's!\n\n🇮🇷 ورزشکاران: برنامه پروتئین روزانه\nیک ورزشکار ۷۰ کیلویی روزانه به ۱۱۰ تا ۱۴۰ گرم پروتئین نیاز دارد. منوی پیشنهادی: ۳ تخم‌مرغ صبحانه (۱۸ گرم)، ۱۵۰ گرم کوپه گوساله ناهار (۳۹ گرم)، ۲۰۰ گرم مرغ شام (۴۶ گرم) + ماست. عضله قوی از قصاب شروع می‌شود!\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #beslenme #spor", "🔥 MANGAL USTASININ 7 ALTIN KURALI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\n1) Kömür meşe olsun 2) Kor tam beyazlaşsın 3) Izgara telini temizleyin 4) Et oda sıcaklığına yaklaşsın 5) Etı sık çevirmeyin — bir kez çevirin 6) Tuzu ateşe atmadan hemen önce 7) Dinlendirin: 5 dk bekleyin, sonra kesin!\n🌍 7 GOLDEN RULES OF THE GRILL MASTER\n1) Use oak charcoal 2) Let coals turn fully white 3) Clean the grate 4) Let meat near room temp 5) Don't flip constantly — flip once 6) Salt just before the fire 7) Rest 5 minutes, then cut!\n\n🇮🇷 ۷ قانون طلایی استاد منقل\n۱) ذغال بلوط باشد ۲) ذغال کاملاً سفید شود ۳) سیخ را تمیز کنید ۴) گوشت نزدیک دمای اتاق باشد ۵) مدام برنگردانید — یک بار بچرخانید ۶) نمک را درست قبل از آتش ۷) ۵ دقیقه استراحت، بعد برش!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #mangal #ipucu", "⭐ MÜŞTERİMİZ ANLATIYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\n«20 yıldır bu semtteyiz, Aykan'dan almadığım gün etin tadı değişiyor!» — Zeytinburnu, Topkapı & Bakırköy mahallesinden müştah bir komşumuz. Siz de deneyin, farkı sofranızda hissedin. 🥩\n🌍 OUR CUSTOMER SPEAKS\n\"We've been in this neighbourhood for 20 years — on days I don't buy from Aykan, the meal just isn't the same!\" — a happy neighbour from Zeytinburnu, Topkapı & Bakırköy. Try it and taste the difference. 🥩\n\n🇮🇷 مشتری ما می‌گوید\n«بیست سال است در این محله هستیم، روزهایی که از آیکان نمی‌گیرم طعم غذا فرق می‌کند!» — همسایه خوشحالی از زیتون‌بورنو، توپکاپی و باکیرکوی. شما هم امتحان کنید و تفاوت را بچشید. 🥩\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #müşteri #güven", "🥩 DANA ANTRİKOT\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nRestoran kalitesinde antrikot — 1.100 TL/Kg. Mangal için en iyisi, Bağcılar (Göztepe) ustalarının tercihi!\n🌍 BEEF RIBEYE\nRestaurant-quality ribeye — 1,100 TL/kg. The best for BBQ — the choice of grill masters in Bağcılar (Göztepe)!\n\n🇮🇷 آنترکوت گوساله\nآنترکوت با کیفیت رستوران — ۱۱۰۰ لیر/کیلو. بهترین برای منقل — انتخاب استادهای باجیلار (گوزتپه)!\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #antrikot", "🩸 DEMİR EKSİKLER MİSİNİZ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nYorgunluk, halsizlik, çabuk yorulma... Sebep demir eksikliği olabilir! Dana eti, vücudun en kolay emdiği 'hem demiri' içerir. Ispanaklı demirin emilimi %5 iken etteki demirin emilimi %25'tir.\n🌍 LOW ON IRON?\nFatigue, weakness, tiredness... It might be iron deficiency! Beef contains 'heme iron', the easiest form for your body to absorb — while spinach iron absorbs at ~5%, beef iron absorbs at ~25%.\n\n🇮🇷 کم‌خون هستید؟\nخستگی، بی‌حالی، زود فرسودگی... ممکن است کمبود آهن باشد! گوشت گوساله «آهن هِم» دارد که راحت‌ترین شکل جذب برای بدن است — جذب آهن اسفناج حدود ٪۵ ولی جذب آهن گوشت حدود ٪۲۵ است.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #demir #sağlık", "🧪 PROTEİN BİLİMİ: KAS İÇİN ETİN YERİ TUTULMAZ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\n100 gr dana kuşbaşı = ~26 gr tam protein (vücudun ihtiyaç duyduğu tüm esansiyel amino asitlerle). Spor bilimciler kas onarımı için antrenmandan sonra 25-40 gr protein öneriyor.\n🌍 PROTEIN SCIENCE: NOTHING REPLACES MEAT\n100 g of beef cubes = ~26 g of complete protein with ALL essential amino acids. Sports scientists recommend 25-40 g protein after training for muscle repair.\n\n🇮🇷 علم پروتئین: جایگزین گوشت برای عضله وجود ندارد\n۱۰۰ گرم کوپه گوساله = حدود ۲۶ گرم پروتئین کامل با تمام آمینواسیدهای ضروری. دانشمندان ورزشی برای ترمیم عضله بعد از تمرین ۲۵ تا ۴۰ گرم پروتئین توصیه می‌کنند.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #protein #bilim", "🧾 TOPTANCIYA MI ALIYORSUNUZ? BU HESAP SİZİ İLGİLENDİRİYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nRestoran/otel/catering iseniz: 15 kurumsal paketimizde %10'a varan indirim + günlük taze sevkiyat + kurumsal fatura var. Bu bottan 🏢 B2B Toptan'a dokunun, size özel paket çıkaralım.\n🌍 BUYING WHOLESALE? THIS ONE'S FOR YOU\nRestaurant/hotel/catering: our 15 corporate packages offer up to 10% off + fresh daily delivery + corporate invoicing. Tap 🏢 B2B in this bot for your custom package.\n\n🇮🇷 خرید عمده می‌کنید؟ این پست برای شماست\nرستوران/هتل/کیترینگ هستید؟ ۱۵ پکیج سازمانی ما تا ٪۱۰ تخفیف + ارسال تازه روزانه + فاکتور رسمی دارد. در همین ربات دکمه 🏢 عمده را بزنید تا پکیج اختصاصی شما را بدهیم.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #esenler #toptan #b2b", "🍲 KASAPTAN SOFRAYA: DANA KUŞBAŞI GÜVEÇ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nMalzemeler: 750 gr kuşbaşı, 2 soğan, 3 domates, biber, kekik. Kuşbaşı zırhta değil kuşbaşı kesimde! Etinizi bizden alın, evde güvece atın — 2 saat sonra misafirleriniz ayakta alkışlıyor.\n🌍 FROM BUTCHER TO TABLE: BEEF GÜVEÇ STEW\nIngredients: 750 g cubes, 2 onions, 3 tomatoes, peppers, thyme. Get your cubes from us, throw them in a clay pot — 2 hours later your guests applaud.\n\n🇮🇷 از قصاب تا سفره: خورشت کوپه گوساله\nمواد لازم: ۷۵۰ گرم کوپه، ۲ پیاز، ۳ گوجه، فلفل، آویشن. کوپه‌تان را از ما بگیرید و در دیگ سنگی بریزید — دو ساعت بعد مهمان‌های شما کف می‌زنند!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #güveç", "⚖️ ZIRHTA ÇEKME NEDEN ÖNEMLİ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nKasap kıyması ile hazır kıyma aynı şey değildir! Zırhta çekilen kıyma tek parça ettir, katkı ve 'ne olduğu belirsiz' karışım yok. İstediğiniz yağ oranında, gözünüzün önünde çekiyoruz.\n🌍 WHY STONE-GROUND MINCE MATTERS\nButcher mince and packaged mince are NOT the same! Stone-ground mince comes from a single cut — no additives, no mystery blends. We grind to your preferred fat ratio, right in front of you.\n\n🇮🇷 چرا چرخ‌کردن سنگی مهم است؟\nگوشت چرخ‌کرده قصابی با گوشت چرخ‌کرده بسته‌بندی یکی نیست! چرخ‌شده سنگی از یک تکه گوشت است — بدون افزودنی و بدون ترکیب مرموز. با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kıyma #kalite", "🔬 SOĞUK ZİNCİR NEDEN KRİTİK?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nEt, kesimden tezgaha kadar 0-4°C'de kalmalı. Zincir kırılırsa bakteriler 20 dakikada ikiye bölünür! Bizim tezgahta soğuk zincir hiç kırılmaz — kasaplık ciddi iştir.\n🌍 WHY THE COLD CHAIN IS CRITICAL\nMeat must stay at 0-4°C from butchering to counter. If the chain breaks, bacteria double every 20 minutes! At our counter the cold chain never breaks — butchery is serious business.\n\n🇮🇷 چرا زنجیره سرد حیاتی است؟\nگوشت باید از ذبح تا ویترین در ۰ تا ۴ درجه بماند. اگر زنجیره بشکند، باکتری‌ها هر ۲۰ دقیقه دوبرابر می‌شوند! در ویترین ما زنجیره سرد هرگز نمی‌شکند — قصابی کار جدی است.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #güngören #soğukzincir #hijyen", "👶 ÇOCUKLARDA ETİN ROLÜ: BÜYÜME VE ZEKÂ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\nPediatristlere göre büyüme çağındaki çocuklarda B12, demir ve çinko eksikliği öğrenme kapasitesini düşürüyor. Haftada 2-3 kez kaliteli kıyma/kuşbaşı içeren beslenme, okul başarısını destekliyor.\n🌍 MEAT IN CHILDHOOD: GROWTH & BRAIN\nPediatricians note that B12, iron and zinc deficiency in growing children reduces learning capacity. Quality mince/cubes 2-3 times a week supports school success.\n\n🇮🇷 نقش گوشت در کودکان: رشد و هوش\nطبق نظر متخصصان کودکان، کمبود B12 و آهن و روی در سن رشد، توان یادگیری را کم می‌کند. ۲ تا ۳ بار در هفته گوشت مرغوب، موفقیت درس را تقویت می‌کند.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #çocuk #beslenme", "🧺 PİKNİK SEPETİNİZ HAZIR MI?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\nHafta sonu planı yapan Gaziosmanpaşa & Sultangazi komşuları: marine tavuk, hazır köfte harmanı, meşe kömürü ve ekmek — hepsi tek pakette, yol üstü şubemizden hazır alın!\n🌍 IS YOUR PICNIC BASKET READY?\nFor Gaziosmanpaşa & Sultangazi neighbours planning the weekend: marinated chicken, ready meatball mix, oak charcoal and bread — all in one pack, grab it ready from our branch on your way!\n\n🇮🇷 سبد پیک‌نیک‌تان آماده است؟\nبرای همسایگان قاضی‌عثمان‌پاشا و سلطان‌قاضی که برنامه آخر هفته دارند: مرغ مارین، مخلوط آماده کوفته، ذغال بلوط و نان — همه در یک پکیج، از شعبه در مسیر، آماده تحویل!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #piknik #mangal", "🐟 TEZGAHIMIZDA YENİ SEZON!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\nEt • Balık • Tavuk • Kuzu — tek adreste! Bu sezon tezgahımıza günlük taze balık da geldikçe ekliyoruz. Zeytinburnu, Topkapı & Bakırköy bölgesinde akşam yemeğini bizden çıkar, eve hazırlanmış götür!\n🌍 NEW SEASON AT OUR COUNTER!\nBeef • Fish • Chicken • Lamb — one address! This season we keep adding fresh daily fish to our counter. In Zeytinburnu, Topkapı & Bakırköy, pick up dinner from us — ready to cook!\n\n🇮🇷 فصل جدید در ویترین ما!\nگوساله • ماهی • مرغ • بره — در یک آدرس! این فصل ماهی تازه روزانه هم به ویترین ما اضافه می‌شود. در زیتون‌بورنو، توپکاپی و باکیرکوی، شام را از ما ببرید — آماده پخت!\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #sezon #tazelik"], "OFFERS": ["🎁 GÜNÜN ÖZEL FIRSATI — Perşembe!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Dana Kuşbaşı / Kıyma\n💰 Bugün: 699 TL (normal 750 TL — %7 indirim!)\n🥩 Gün boyu geçerli — istediğiniz gramajda, zırhta gözünüzün önünde çekim\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Dana Kuşbaşı / Kıyma — TODAY ONLY: 699 TL instead of 750 TL (%7 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Dana Kuşbaşı / Kıyma — فقط امروز: 699 لیر به‌جای 750 لیر (٪٪7 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#gününFırsatı #kampanya #indirim #güneşli", "🎁 GÜNÜN ÖZEL FIRSATI — Cuma!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Kuzu Pirzola\n💰 Bugün: 1.249 TL (normal 1.399 TL — %11 indirim!)\n🥩 Misafir sofralarının yıldızı — bugün serbest porsiyon kesim\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Kuzu Pirzola — TODAY ONLY: 1.249 TL instead of 1.399 TL (%11 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Kuzu Pirzola — فقط امروز: 1.249 لیر به‌جای 1.399 لیر (٪٪11 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#gününFırsatı #kampanya #indirim #mahmutbey", "🎁 GÜNÜN ÖZEL FIRSATI — Cumartesi!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Viral Tortilla Kebabı (10 dk)\n💰 Bugün: 329 TL (normal 399 TL — %18 indirim!)\n🥩 Sosyal medyanın gündemi — 10 dakikada hazır, günlük sınırlı adet!\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Viral Tortilla Kebabı (10 dk) — TODAY ONLY: 329 TL instead of 399 TL (%18 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Viral Tortilla Kebabı (10 dk) — فقط امروز: 329 لیر به‌جای 399 لیر (٪٪18 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#gününFırsatı #kampanya #indirim #esenler", "🎁 GÜNÜN ÖZEL FIRSATI — Pazar!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Dana Antrikot\n💰 Bugün: 999 TL (normal 1.100 TL — %9 indirim!)\n🥩 Mangal geceleri için restoran kalitesinde antrikot\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Dana Antrikot — TODAY ONLY: 999 TL instead of 1.100 TL (%9 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Dana Antrikot — فقط امروز: 999 لیر به‌جای 1.100 لیر (٪٪9 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#gününFırsatı #kampanya #indirim #başakşehir", "🎁 GÜNÜN ÖZEL FIRSATI — Pazartesi!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Haftalık Aile Et Kutusu\n💰 Bugün: 1.299 TL (normal 1.472 TL — %12 indirim!)\n🥩 Ailenin haftalık et ihtiyacı tek kutuda: kıyma + kuşbaşı + tavuk\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Haftalık Aile Et Kutusu — TODAY ONLY: 1.299 TL instead of 1.472 TL (%12 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Haftalık Aile Et Kutusu — فقط امروز: 1.299 لیر به‌جای 1.472 لیر (٪٪12 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#gününFırsatı #kampanya #indirim #bahçelievler", "🎁 GÜNÜN ÖZEL FIRSATI — Salı!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Dana Kemikli Et\n💰 Bugün: 595 TL (normal 650 TL — %8 indirim!)\n🥩 Çorba ve yahninin lezzet sırrı — gün boyu geçerli\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Dana Kemikli Et — TODAY ONLY: 595 TL instead of 650 TL (%8 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Dana Kemikli Et — فقط امروز: 595 لیر به‌جای 650 لیر (٪٪8 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#gününFırsatı #kampanya #indirim #güngören", "🎁 GÜNÜN ÖZEL FIRSATI — Çarşamba!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Hafta Sonu Mangal Paketi\n💰 Bugün: 898 TL (normal 998 TL — %10 indirim!)\n🥩 1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + meşe kömürü + özel sos\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Hafta Sonu Mangal Paketi — TODAY ONLY: 898 TL instead of 998 TL (%10 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Hafta Sonu Mangal Paketi — فقط امروز: 898 لیر به‌جای 998 لیر (٪٪10 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @AykanEtmangal_shapping_bot\n#gününFırsatı #kampanya #indirim #halkalı"], "PACKAGE_CATALOG": {"Big Restaurant": [{"code": "RESTO-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Usta Ekonomi Paketi", "nameFa": "پکیج اقتصادی استاد", "discount": 4, "minKg": 60, "minLabel": "60 Kg/hafta", "blend": 700, "items": [["Dana Kuşbaşı / Özel Çekim Kıyma", "Kg", 720], ["Dana Kemikli Et", "Kg", 625], ["Toptan Tavuk (But / Kanat)", "Kg", 115]], "delivery": "Haftada 3 gün sevkiyat (Pzt – Çar – Cum)", "payment": "Haftalık nakit / kart", "extras": "Ücretsiz zırh çekimi + memnun kalmazsanız iade garantisi", "targetFa": "کباب‌خانه‌ها و ocakbaşıهای کوچک با خرید ۶۰ تا ۱۰۰ کیلو در هفته", "whyFa": "حجم هفتگی شما برای شروع همکاری بدون ریسک مناسب است — تخفیف ۴٪ + ارسال ۳ روز در هفته"}, {"code": "RESTO-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Ocakbaşı & Kebap Standart Paketi", "nameFa": "پکیج استاندارد اوچاق‌باشی و کباب", "discount": 7, "minKg": 100, "minLabel": "100 Kg/hafta", "blend": 790, "items": [["Dana Kuşbaşı", "Kg", 700], ["Kuzu Kuşbaşı", "Kg", 995], ["Dana Antrikot", "Kg", 1025], ["Dana Kemikli Et", "Kg", 605]], "delivery": "Her sabah günlük taze sevkiyat (07:00'a kadar)", "payment": "Haftalık ödeme + kurumsal fatura", "extras": "Her teslimde 5 Kg birinci sınıf meşe mangal kömürü HEDİYE", "targetFa": "رستوران‌های متوسط کبابی و پیده با خرید ۱۰۰ تا ۱۵۰ کیلو در هفته", "whyFa": "حجم هفتگی شما در رده استاندارد است — تخفیف ۷٪، ارسال روزانه تازه و ذغال هدیه"}, {"code": "RESTO-PRO", "tier": "Premium", "tierFa": "پریمیوم", "name": "Şef Premium / Saray Paketi", "nameFa": "پکیج پریمیوم سرآشپز و سلطنتی", "discount": 10, "minKg": 150, "minLabel": "150 Kg/hafta", "blend": 940, "items": [["Dana Antrikot", "Kg", 990], ["Kuzu Pirzola", "Kg", 1259], ["Kuzu Et", "Kg", 962], ["Dana Kuşbaşı", "Kg", 675]], "delivery": "Günlük ÇİFT sevkiyat + soğuk zincir araç", "payment": "30 gün vadeli kurumsal ödeme", "extras": "Şef'e ücretsiz numune seti + VIP müşteri hattı + sınırsız meşe kömürü hediye", "targetFa": "رستوران‌های بزرگ، استیک‌هاوس و ocakbaşıهای سلطنتی با خرید +۱۵۰ کیلو در هفته", "whyFa": "حجم بالای خرید و منوی انترکوت/پیرولا شما — حداکثر سود با ۱۰٪ تخفیف و پرداخت ۳۰ روزه"}], "Ordinary Fast Food": [{"code": "FAST-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Dönerci & Köftecı Başlangıç Paketi", "nameFa": "پکیج شروع دونر و کوفته", "discount": 4, "minKg": 40, "minLabel": "40 Kg/hafta", "blend": 640, "items": [["Özel Çekim Kıyma (düşük yağ)", "Kg", 720], ["Dana Kemikli Et", "Kg", 625], ["Toptan Tavuk", "Kg", 112]], "delivery": "Haftada 3 gün sevkiyat", "payment": "Nakit / haftalık", "extras": "İstediğiniz gramajda ücretsiz öğütme (köfte / burger)", "targetFa": "بوفه‌ها، دونر و کوفته‌فروشی‌های کوچک با خرید ۴۰ تا ۷۰ کیلو در هفته", "whyFa": "برای شروع همکاری کم‌ریسک — تخفیف ۴٪ و آسیاب رایگان گوشت به گرم دلخواه شما"}, {"code": "FAST-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Kasap Burger & Döner Standart Paketi", "nameFa": "پکیج استاندارد برگر و دونر قصابی", "discount": 7, "minKg": 70, "minLabel": "70 Kg/hafta", "blend": 680, "items": [["Özel Çekim Kıyma", "Kg", 700], ["Dana Kuşbaşı", "Kg", 700], ["Dana Kemikli Et", "Kg", 605], ["Toptan Tavuk", "Kg", 108]], "delivery": "Her sabah günlük sevkiyat", "payment": "Haftalık ödeme + fiş/fatura", "extras": "Döner yaprak özel kesim + burger sosu hediyesi", "targetFa": "فست‌فودهای متوسط برگر، دونر و تانتونی با خرید ۷۰ تا ۱۰۵ کیلو در هفته", "whyFa": "حجم هفتگی شما استاندارد است — تخفیف ۷٪ با ارسال روزانه و برش اختصاصی دونر"}, {"code": "FAST-PRO", "tier": "Premium", "tierFa": "پریمیوم", "name": "Zincir & Şube Ağı Pro Paketi", "nameFa": "پکیج حرفه‌ای زنجیره و چند شعبه", "discount": 10, "minKg": 110, "minLabel": "110 Kg/hafta", "blend": 730, "items": [["Özel Çekim Kıyma", "Kg", 675], ["Dana Kuşbaşı", "Kg", 675], ["Dana Kemikli Et", "Kg", 585], ["Toptan Tavuk", "Kg", 102]], "delivery": "Günlük ÇİFT sevkiyat (sabah + akşam servise özel)", "payment": "15 gün vadeli ödeme", "extras": "Şube bazlı özel gramaj + ücretsiz teslim + açılış kampanya desteği", "targetFa": "فست‌فودهای شلوغ و زنجیره‌ای با خرید بالای ۱۱۰ کیلو در هفته", "whyFa": "شلوغی و حجم بالای فروش شما — ۱۰٪ تخفیف، دو ارسال در روز و پرداخت ۱۵ روزه"}], "Hotel": [{"code": "HOTEL-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Otel Kahvaltı & Tabldot Paketi", "nameFa": "پکیج صبحانه و تابل‌دو هتل", "discount": 5, "minKg": 100, "minLabel": "100 Kg/hafta", "blend": 630, "items": [["Dana Kemikli Et (çorba/sulu yemek)", "Kg", 617], ["Özel Çekim Kıyma", "Kg", 712], ["Toptan Tavuk", "Kg", 110]], "delivery": "Her sabah 06:00'ya kadar soğuk zincir sevkiyat", "payment": "Haftalık ödeme + kurumsal fatura", "extras": "HACCP uyumlu sevkiyat etiketi + numune test raporu", "targetFa": "هتل‌های کوچک و اقامتگاه‌ها با خرید ۱۰۰ تا ۱۴۰ کیلو در هفته", "whyFa": "منوی صبحانه و تابل‌دوت شما — تخفیف ۵٪ با اسناد بهداشتی و فاکتور رسمی"}, {"code": "HOTEL-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Otel Mutfak Standart Paketi", "nameFa": "پکیج استاندارد آشپزخانه هتل", "discount": 8, "minKg": 140, "minLabel": "140 Kg/hafta", "blend": 780, "items": [["Dana Kuşbaşı", "Kg", 690], ["Kuzu Et", "Kg", 985], ["Dana Kemikli Et", "Kg", 598], ["Toptan Tavuk", "Kg", 105]], "delivery": "Günlük sabah soğuk zincir sevkiyatı", "payment": "15 gün vadeli kurumsal ödeme", "extras": "Bufe için özel porsiyon kesim + şef ile menü planlama desteği", "targetFa": "هتل‌های ۳ و ۴ ستاره با خرید ۱۴۰ تا ۱۸۰ کیلو در هفته", "whyFa": "حجم آشپزخانه هتل شما — تخفیف ۸٪، برش پورسینی اختصاصی و پرداخت ۱۵ روزه"}, {"code": "HOTEL-PRO", "tier": "Premium", "tierFa": "پریمیوم", "name": "Grand Otel & Konvansiyon Pro Paketi", "nameFa": "پکیج حرفه‌ای هتل بزرگ و کنوانسیون", "discount": 10, "minKg": 180, "minLabel": "180 Kg/hafta", "blend": 930, "items": [["Dana Antrikot", "Kg", 990], ["Kuzu Pirzola", "Kg", 1259], ["Kuzu Et", "Kg", 962], ["Dana Kuşbaşı", "Kg", 675]], "delivery": "Günlük çift sevkiyat + hafta sonu acil (emergency) desteği", "payment": "30 gün vadeli kurumsal ödeme", "extras": "Şef'e ücretsiz numune seti + banquet/kongre öncelikli kapasite rezervasyonu", "targetFa": "هتل‌های ۵ ستاره و کنوانسیون با خرید بالای ۱۸۰ کیلو در هفته", "whyFa": "عظمت هتل و بنکِت‌های شما — ۱۰٪ تخفیف، رزرو ظرفیت اولویت‌دار و پرداخت ۳۰ روزه"}], "Catering": [{"code": "CATER-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Esnaf Tabldot Paketi", "nameFa": "پکیج تابل‌دوی اصناف", "discount": 6, "minKg": 150, "minLabel": "150 Kg/hafta", "blend": 620, "items": [["Dana Kemikli Et", "Kg", 611], ["Özel Çekim Kıyma", "Kg", 705], ["Toptan Tavuk", "Kg", 108]], "delivery": "Günlük sabah sevkiyatı", "payment": "Haftalık ödeme", "extras": "Acil (son dakika) siparişlerde aynı gün sevkiyat desteği", "targetFa": "تالارهای کوچک و آشپزخانه‌های اصناف با خرید ۱۵۰ تا ۲۲۰ کیلو در هفته", "whyFa": "برای تابل‌دوی روزانه — تخفیف ۶٪ و پشتیبانی سفارش‌های فوری"}, {"code": "CATER-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Fabrika & Toplu Yemek Standart Paketi", "nameFa": "پکیج استاندارد کارخانه و غذای جمعی", "discount": 8, "minKg": 220, "minLabel": "220 Kg/hafta", "blend": 655, "items": [["Dana Kemikli Et", "Kg", 598], ["Özel Çekim Kıyma", "Kg", 690], ["Dana Kuşbaşı", "Kg", 690]], "delivery": "Günlük sabah 06:00'ya kadar teslim (vardiya başına)", "payment": "15 gün vadeli kurumsal ödeme", "extras": "Personel yemeği için maliyet düşürücü karışım planlaması (kasap mühendisliği)", "targetFa": "کیترینگ‌های صنعتی و کارخانه‌ای با خرید ۲۲۰ تا ۲۹۰ کیلو در هفته", "whyFa": "حجم تولید انبوه شما — تخفیف ۸٪، تحویل قبل از شیفت و برنامه کاهش هزینه"}, {"code": "CATER-MEGA", "tier": "Mega", "tierFa": "مگا", "name": "Düğün & Organizasyon Mega Paketi", "nameFa": "پکیج مگای عروسی و مراسم", "discount": 10, "minKg": 280, "minLabel": "280 Kg/hafta", "blend": 690, "items": [["Dana Kemikli Et", "Kg", 585], ["Özel Çekim Kıyma", "Kg", 675], ["Kuzu Et", "Kg", 962], ["Dana Kuşbaşı", "Kg", 675]], "delivery": "Günlük + hafta sonu organizasyon sevkiyatı (gece dahil)", "payment": "30 gün vade + SEZON FİYATI KİLİTLEME", "extras": "Ramazan / düğün sezonu öncelikli kapasite rezervasyonu + organizasyon günü yedek araç", "targetFa": "تالارهای عروسی، مراسم و کیترینگ‌های بزرگ با خرید بالای ۲۸۰ کیلو در هفته", "whyFa": "حجم عظیم مراسم‌های شما — ۱۰٪ تخفیف، قفل قیمت فصلی و رزرو اولویت‌دار رمضان"}], "Ordinary People": [{"code": "FAMILY-START", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Komşu Aile Haftalık Sepeti", "nameFa": "سبد هفتگی خانواده همسایه", "discount": 3, "minKg": 8, "minLabel": "8 Kg / aile", "blend": 760, "items": [["Dana Kuşbaşı / Kıyma (tanzim + %3)", "Kg", 727], ["Dana Kemikli Et (tanzim + %3)", "Kg", 630], ["Tavuk Çeşitleri", "Kg", 118]], "delivery": "Mağazadan gel-al + WhatsApp sipariş ile hazırlık", "payment": "Nakit / kart", "extras": "Her alışverişte mangal kömürü indirim kuponu", "targetFa": "خانواده‌ها و گروه‌های همسایگی با خرید جمعی هفتگی", "whyFa": "شروع همکاری محله‌ای — ۳٪ تخفیف تنظیمی و سبد هفتگی آماده"}, {"code": "FAMILY-MANGAL", "tier": "Popüler", "tierFa": "محبوب", "name": "Hafta Sonu Mangal Keyfi Paketi", "nameFa": "پکیج لذت منقل آخر هفته", "discount": 5, "minKg": 10, "minLabel": "1 mangal paketi / aile", "blend": 840, "items": [["Aykan Özel Mangal Paketi (1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + kömür + sos)", "Paket", 998], ["10 Dakikada Hazır Viral Tortilla Kebabı", "Porsiyon", 399], ["Haftalık Tanzim Aile Et Kutusu", "Kutu", 1472]], "delivery": "Cumartesi sabahı toplu teslimat", "payment": "Nakit / kart", "extras": "Marinasyon hediye + 10 dakikada hazır viral Tortilla Kebabı", "targetFa": "گروه‌های پیک‌نیک و منقل‌دوستان آخر هفته", "whyFa": "برای منقل آخر هفته — پکیج ویژه ۹۹۸ لیر بجای ۱۰۵۰ لیر (۵٪ تخفیف گروهی)"}, {"code": "FAMILY-SITE", "tier": "Grup Lideri", "tierFa": "لیدر گروه", "name": "Site & WhatsApp Grup İndirim Paketi", "nameFa": "پکیج تخفیف مجتمع و گروه واتساپ", "discount": 8, "minKg": 60, "minLabel": "60 Kg / grup toplamı", "blend": 710, "items": [["Dana Kuşbaşı (site indirimi)", "Kg", 690], ["Özel Çekim Kıyma (site indirimi)", "Kg", 690], ["Dana Kemikli Et (site indirimi)", "Kg", 598], ["Hafta Sonu Mangal Paketi", "Adet", 998]], "delivery": "Haftada 1 gün siteye ÜCRETSİZ toplu teslimat", "payment": "Grup lideri toplu ödeme", "extras": "Site yönetimine her 500 Kg'da 1 adet mangal seti HEDİYE", "targetFa": "مدیریت مجتمع‌های مسکونی بزرگ و گروه‌های واتساپ", "whyFa": "قدرت خرید جمعی مجموعه شما — ۸٪ تخفیف و تحویل رایگان درب مجتمع"}]}, "CAT_TR": {"Big Restaurant": "Restoran / Kebapçı", "Ordinary Fast Food": "Fast Food / Döner", "Hotel": "Otel", "Catering": "Catering / Fabrika", "Ordinary People": "Site & Aile Grubu"}, "LANG_NAMES": {"tr": "🇹🇷 Türkçe", "en": "🇬🇧 English", "fa": "🇮🇷 فارسی"}, "AREAS": [{"tr": "Bağcılar (Göztepe)", "fa": "باجیلار (گوزتپه)", "tags": "#bağcılar #göztepe #bağcılaret"}, {"tr": "Bağcılar (Güneşli & Basın Ekspres)", "fa": "باجیلار (گونشلی و باسین اکسپرس)", "tags": "#güneşli #basınEkspres"}, {"tr": "Bağcılar (Mahmutbey & İSTOÇ)", "fa": "باجیلار (محمودبی و ایستوچ)", "tags": "#mahmutbey #istoç"}, {"tr": "Esenler (Kemer)", "fa": "اسنلر (کمر)", "tags": "#esenler #kemer #esenleret"}, {"tr": "Başakşehir & İkitelli", "fa": "باشاک‌شهیر و ایکی‌تلی", "tags": "#başakşehir #ikitelli"}, {"tr": "Bahçelievler & Şirinevler", "fa": "باهچه‌لی‌اولر و شیرین‌اولر", "tags": "#bahçelievler #şirinevler"}, {"tr": "Güngören & Merter", "fa": "گونگورن و مرتر", "tags": "#güngören #merter"}, {"tr": "Küçükçekmece (Halkalı & Sefaköy)", "fa": "کوچوک‌چکمجه (حلالی و صفاکوی)", "tags": "#halkalı #sefaköy"}, {"tr": "Gaziosmanpaşa & Sultangazi", "fa": "قاضی‌عثمان‌پاشا و سلطان‌قاضی", "tags": "#gaziosmanpaşa #sultangazi"}, {"tr": "Zeytinburnu, Topkapı & Bakırköy", "fa": "زیتون‌بورنو، توپکاپی و باکیرکوی", "tags": "#zeytinburnu #topkapı #bakırköy"}], "AREA_NAMES_TR": ["Bağcılar (Göztepe)", "Bağcılar (Güneşli & Basın Ekspres)", "Bağcılar (Mahmutbey & İSTOÇ)", "Esenler (Kemer)", "Başakşehir & İkitelli", "Bahçelievler & Şirinevler", "Güngören & Merter", "Küçükçekmece (Halkalı & Sefaköy)", "Gaziosmanpaşa & Sultangazi", "Zeytinburnu, Topkapı & Bakırköy"], "CAT_FA2": {"Big Restaurant": "🥩 رستوران بزرگ", "Ordinary Fast Food": "🍔 فست‌فود و دونر", "Hotel": "🏨 هتل", "Catering": "🍲 کیترینگ و کارخانه", "Ordinary People": "👨‍👩‍👧‍👦 مجتمع و گروه محلی", "Investment Leader": "💼 سرمایه‌گذاری و تکنوپارک"}, "POSTS_META": [{"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}]};

const PANEL_URL = "https://aykan-panel.aykanet34.workers.dev";
const PANEL_SECRET = "__PANEL_SECRET__";
const HOOK_SECRET = "__HOOK_SECRET__";
const HOOK_PATH = "/hook-__HOOK_SECRET__";
const HOOK_URL = "https://aykan-tgbot.aykanet34.workers.dev/hook-__HOOK_SECRET__";
const ADMIN_PIN = "__ADMIN_PIN__";
const OWNER_WA = "905377325269";
const SITE_URL = "https://aykan-hizli.aykanet34.workers.dev";
const CHANNEL_URL = "https://t.me/AykanEtmangal_shopping";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Aykan+Et+Mangal+G%C3%B6ztepe+Ba%C4%9Fc%C4%B1lar";
const OFFER_SLOT = "09:00";
const DEFAULT_INTERVAL = 3;
var PHOTOS = {
  kemikli: "https://aykan-site.aykanet34.workers.dev/assets/foods/kemikli.jpg",
  kusbasi: "https://aykan-site.aykanet34.workers.dev/assets/foods/kusbasi.jpg",
  antrikot: "https://aykan-site.aykanet34.workers.dev/assets/foods/antrikot.jpg",
  kuzu: "https://aykan-site.aykanet34.workers.dev/assets/foods/kuzu.jpg",
  pirzola: "https://aykan-site.aykanet34.workers.dev/assets/foods/pirzola.jpg",
  mangal: "https://aykan-site.aykanet34.workers.dev/assets/foods/mangal.jpg",
  tortilla: "https://aykan-site.aykanet34.workers.dev/assets/foods/tortilla.jpg",
  aile: "https://aykan-site.aykanet34.workers.dev/assets/foods/aile.jpg"
};
const PDF_URL = "https://aykan-site.aykanet34.workers.dev/brosur/aykan_fiyat_brosuru_baski.pdf";

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
  rows.push([{ text: "🔥 " + L(lang, "Günün Fiyatı", "Today's Special", "قیمت امروز"), callback_data: "gununfiyati" }, { text: "💰 " + L(lang, "Tüm Fiyatlar", "All Prices", "همه قیمت‌ها"), callback_data: "fiyatlar" }, { text: "📄 PDF", url: PDF_URL }]);
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
  await send(env, cid, "📷 https://aykan-site.aykanet34.workers.dev/");
}
function priceListText(lang) {
  var cur = lang === "fa" ? "لیر" : "TL";
  var lines = [L(lang, "💰 GÜNCEL FİYAT LİSTEMİZ:", "💰 OUR CURRENT PRICES:", "💰 قیمت‌های به‌روز ما:")];
  DATA.MENU.forEach(function (m0) {
    var m = menuById(m0.id); if (!m || _STK[m.id] === false) return;
    lines.push("• " + m.name[lang] + " — " + fmtTL(m.price) + " " + cur + "/" + m.unit[lang] + (_OV[m.id] ? " 🔥" : ""));
  });
  lines.push(L(lang, "\n🚚 Gün içinde teslim • 💵 Kapıda ödeme", "\n🚚 Same-day delivery • 💵 Pay at the door", "\n🚚 ارسال همان روز • 💵 پرداخت درب منزل"));
  return lines.join("\n");
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

  if (data.indexOf("adm:") === 0) {
    if (st.admin_chat !== cid) return "🔐 sadece yönetici!";
    var asub = data.slice(4);
    if (asub === "duyuruok") {
      var dbody = st.pending_duyuru; st.pending_duyuru = null; await setSetting(env, "bot_state", st);
      if (!dbody) return "⚠️";
      var tgts2 = [];
      try { tgts2 = (await env.DB.prepare("SELECT chat_id FROM bot_chats LIMIT 400").all()).results || []; } catch (e) {}
      var sn2 = 0;
      for (var tj = 0; tj < tgts2.length; tj++) {
        try { var rj = await tg(env, "sendMessage", { chat_id: tgts2[tj].chat_id, text: "📢 " + dbody }); if (rj.ok) sn2++; } catch (e) {}
      }
      await editOrSend(env, cid, msgId, "📢 Duyuru gönderildi: " + sn2 + "/" + tgts2.length + " sohbet ✔");
    } else if (asub === "duyuruno") {
      st.pending_duyuru = null; await setSetting(env, "bot_state", st);
      await editOrSend(env, cid, msgId, "❌ Duyuru iptal edildi.");
    }
    return "";
  }
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
      [[{ text: tx(lang, "b2b_btn"), callback_data: "b2breq" }], [{ text: "📄 PDF Katalog", url: PDF_URL }, { text: "💬 WhatsApp", url: "https://wa.me/" + OWNER_WA }], [{ text: tx(lang, "home"), callback_data: "home" }]]);
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
  if (data === "fiyatlar") { await send(env, cid, priceListText(lang), kbMenu(lang)); return ""; }
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
    if (!body) { await send(env, cid, "📢 kullanım: /duyuru MESAJ — önizleme gösterilir, onaydan sonra gönderilir."); return; }
    if (st.pending_duyuru) { await send(env, cid, "⚠️ Zaten onay bekleyen bir duyuru var — önce onu onayla/iptal et."); return; }
    st.pending_duyuru = body.slice(0, 800); await setSetting(env, "bot_state", st);
    await send(env, cid, "📢 ÖNİZLEME:\n\n📢 " + st.pending_duyuru + "\n\n―\nGöndermek onaylıyor musunuz?",
      [[{ text: "✅ Onayla ve Gönder", callback_data: "adm:duyuruok" }, { text: "❌ İptal", callback_data: "adm:duyuruno" }]]);
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
    await send(env, cid, "🛠 ADMİN KOMUTLARI\n\n🔗 KANAL\n/kanal @x — bağla • /kanalkapat — kes\n/postnow — hemen post • /plan — yayın planı\n/aralik N — saat aralığı • /durdur • /devam\n\n📊 YÖNETİM\n/istatistik — satış/chat/etkinlik\n/siparisler — son 10 sipariş\n/bul KOD — sipariş ara • /rapor — son 24 saat\n/durum KOD MESAJ — müşteriye bildirim\n/duyuru MESAJ — toplu duyuru\n/fiyatguncelle id fiyat — fiyat değiştir (sifirla = geri al)\n/stok id yok|var — stok kapat/aç\n/ping — sistem durumu\n\n🎯 LİDLER\n/lidedefteri — tarayıcı • /bolge N • /yatirim");
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
  if (cmd === "/bul") {
    var bc = (parts[1] || "").toUpperCase();
    if (!bc) { await send(env, cid, "📌 kullanım: /bul SİPARİŞKODU (kısmi yazım yeter)"); return; }
    var brs = [];
    try { brs = (await env.DB.prepare("SELECT code, kind, total, name, phone, chat, created_at FROM orders WHERE code LIKE ? ORDER BY rowid DESC LIMIT 3").bind("%" + bc + "%").all()).results || []; } catch (e) {}
    if (!brs.length) { await send(env, cid, "⚠️ Bulunamadı: " + bc); return; }
    var bm = "🔍 '" + bc + "':\n\n";
    brs.forEach(function (r) { bm += "• " + r.code + " | " + r.kind + " | " + fmtTL(r.total) + " TL\n  👤 " + (r.name || "?") + " | 📞 " + (r.phone || "?") + "\n  💬 chat: " + r.chat + " | " + (r.created_at || "") + "\n\n"; });
    await send(env, cid, bm);
    return;
  }
  if (cmd === "/rapor") {
    var yr = {};
    try { yr = (await env.DB.prepare("SELECT COUNT(*) n, COALESCE(SUM(total),0) t FROM orders WHERE kind='order' AND created_at >= datetime('now','-1 day')").first()) || {}; } catch (e) {}
    var nch2 = 0; try { nch2 = ((await env.DB.prepare("SELECT COUNT(*) n FROM bot_chats").first()) || {}).n || 0; } catch (e) {}
    await send(env, cid, "📊 SON 24 SAAT\n\n🧾 Sipariş: " + (yr.n || 0) + " | " + fmtTL(yr.t || 0) + " TL\n👥 Sohbet: " + nch2);
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
  var adminCmds = ["/kanal", "/channel", "/kanalkapat", "/postnow", "/plan", "/aralik", "/interval", "/durdur", "/pause", "/devam", "/resume", "/lidedefteri", "/lidegonder", "/lidekanal", "/leadschannel", "/lidekanalkapat", "/bolge", "/yatirim", "/istatistik", "/stats", "/duyuru", "/durum", "/ping", "/siparisler", "/fiyatguncelle", "/stok", "/yardim", "/bul", "/rapor"];
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
  if (c.mode === "name") { c.order = c.order || {}; c.order.name = text.slice(0, 80); c.order.tg = ((msg.from || {}).username ? "@" + msg.from.username : "") || ((msg.from || {}).first_name || ""); c.mode = "phone"; await saveChat(env, cid, c); await send(env, +cid, tx(lang, "ask_phone")); return; }
  if (c.mode === "phone") {
    var phv = digits(faDig(text));
    if (phv.length < 10 || phv.length > 15) { await send(env, +cid, L(lang, "⚠️ Geçerli bir telefon yazın (örn. 0537 732 52 69):", "⚠️ Please enter a valid phone (e.g. 0537 732 52 69):", "⚠️ شماره معتبر بنویسید (مثلاً 0537 732 52 69):")); return; }
    c.order.phone = text.slice(0, 40); c.mode = "note"; await saveChat(env, cid, c); await send(env, +cid, tx(lang, "ask_note")); return;
  }
  if (c.mode === "note") { c.order.note = text.slice(0, 300); c.mode = null; await saveChat(env, cid, c); await finalizeOrder(env, cid, c, lang); return; }
  if (c.mode === "feedback") {
    c.mode = null; await saveChat(env, cid, c);
    await notifyAdmin(env, "⚠️ GERİ BİLDİRİM / FEEDBACK (⭐ " + (c.last_rate || "?") + ")\n\n" + text.slice(0, 500) + "\nChat: " + cid);
    await send(env, +cid, L(lang, "🙏 Geri bildiriminiz için teşekkürler — en kısa sürede değerlendireceğiz!", "🙏 Thank you — we will review it shortly!", "🙏 از بازخورد شما سپاسگزاریم — به‌زودی بررسی می‌کنیم!"));
    return;
  }
  if (c.mode === "b2b_company") { c.order = c.order || {}; c.order.b2b_company = text; c.mode = "b2b_phone"; await saveChat(env, cid, c); await send(env, +cid, tx(lang, "ask_b2b_phone")); return; }
  if (c.mode === "b2b_phone") {
    if (digits(faDig(text)).length < 10) { await send(env, +cid, L(lang, "⚠️ Geçerli bir telefon yazın:", "⚠️ Please enter a valid phone:", "⚠️ شماره معتبر بنویسید:")); return; }
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
    } else if (dl.indexOf("c_") === 0) {
      var oi = parseInt(dl.slice(2), 10) || 0;
      await send(env, +cid, "🎁 " + L(lang, "SIZE ÖZEL TEKLİF:", "A SPECIAL OFFER FOR YOU:", "پیشنهاد ویژه شما:") + "\n\n" + DATA.OFFERS[oi % DATA.OFFERS.length], kbMenu(lang));
    }
  } else if (low.indexOf("/lang") === 0 || low.indexOf("/dil") === 0 || low.indexOf("/zaban") === 0) {
    await send(env, +cid, tx(lang, "pick_lang"), kbLang());
  } else if (low.indexOf("/menu") === 0 || low.indexOf("/fiyat") === 0) {
    await send(env, +cid, tx(lang, "menu_title"), kbMenu(lang));
  } else if (low.indexOf("/paket") === 0 || low.indexOf("/pack") === 0) {
    await send(env, +cid, tx(lang, "paket_title"), kbMenu(lang));
  } else if (low.indexOf("/b2b") === 0 || low.indexOf("/toptan") === 0) {
    await send(env, +cid, b2bText(lang), [[{ text: tx(lang, "b2b_btn"), callback_data: "b2breq" }], [{ text: "📄 PDF Katalog", url: PDF_URL }, { text: "💬 WhatsApp", url: "https://wa.me/" + OWNER_WA }], [{ text: tx(lang, "home"), callback_data: "home" }]]);
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
  } else if (low.indexOf("/onerme") === 0 || low.indexOf("/oneri") === 0) {
    c.mode = "feedback"; await saveChat(env, cid, c);
    await send(env, +cid, L(lang, "💡 Önerinizi/şikayetinizi yazın — doğrudan yönetime gider:", "💡 Write your suggestion — goes straight to management:", "💡 پیشنهاد/انتقاد خود را بنویسید — مستقیم به مدیریت می‌رسد:"), kbMain(lang));
  } else if (low.indexOf("/fiyatlar") === 0) {
    await send(env, +cid, priceListText(lang), kbMenu(lang));
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
    await weeklyReport(env);
  } catch (e) {}
}
async function weeklyReport(env) {
  try {
    var now = istanbulNow();
    var pd = now.dateStr.split("-");
    var dt = new Date(Date.UTC(+pd[0], +pd[1] - 1, +pd[2]));
    if (dt.getUTCDay() !== 1 || now.hh !== 10) return;
    var st = await getBotState(env);
    if (st.weekly_report === now.dateStr) return;
    st.weekly_report = now.dateStr; await setSetting(env, "bot_state", st);
    var wr = {};
    try { wr = (await env.DB.prepare("SELECT COUNT(*) n, COALESCE(SUM(total),0) t FROM orders WHERE kind='order' AND created_at >= datetime('now','-7 days')").first()) || {}; } catch (e) {}
    var nch3 = 0; try { nch3 = ((await env.DB.prepare("SELECT COUNT(*) n FROM bot_chats").first()) || {}).n || 0; } catch (e) {}
    await notifyAdmin(env, "📊 HAFTALIK RAPOR / گزارش هفتگی\n\n🧾 7 gün: " + (wr.n || 0) + " sipariş | " + fmtTL(wr.t || 0) + " TL\n👥 Toplam sohbet: " + nch3);
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
