// AYKAN ET & MANGAL — Telegram Bot 24/7 on Cloudflare Worker
// پورت کامل ربات پایتون: منو، سبد، سفارش، B2B، ادمین، لیدبوک، پست خودکار کانال
// توکن از D1 (social_config.tg.token) خوانده می‌شود — تعویض توکن از پنل، بدون دیپلوی
const DATA = {"MENU": [{"id": "kemikli", "name": {"tr": "Dana Kemikli Et", "en": "Beef on the Bone", "ar": "لحم عجول بالعظمة"}, "price": 650, "unit": {"tr": "Kg", "en": "kg", "ar": "كغ"}}, {"id": "kusbasi", "name": {"tr": "Dana Kuşbaşı / Özel Çekim Kıyma", "en": "Beef Cubes / Fresh-Ground Minced", "ar": "لحم عجول مكعبات / لحم مفروم طازج"}, "price": 750, "unit": {"tr": "Kg", "en": "kg", "ar": "كغ"}}, {"id": "antrikot", "name": {"tr": "Dana Antrikot", "en": "Beef Ribeye (Antrikot)", "ar": "أنتريكوت عجول (ريب آي)"}, "price": 1100, "unit": {"tr": "Kg", "en": "kg", "ar": "كغ"}}, {"id": "kuzu", "name": {"tr": "Kuzu Et / Kuşbaşı", "en": "Lamb Meat / Cubes", "ar": "لحم غنم / مكعبات"}, "price": 1069, "unit": {"tr": "Kg", "en": "kg", "ar": "كغ"}}, {"id": "pirzola", "name": {"tr": "Kuzu Pirzola", "en": "Lamb Chops", "ar": "ريش غنم"}, "price": 1399, "unit": {"tr": "Kg", "en": "kg", "ar": "كغ"}}, {"id": "mangal", "name": {"tr": "Aykan Özel Mangal Paketi", "en": "Aykan Special BBQ Pack", "ar": "باقة المشاوي الخاصة بأيكان"}, "price": 998, "unit": {"tr": "Paket", "en": "pack", "ar": "باقة"}}, {"id": "tortilla", "name": {"tr": "Viral Tortilla Kebabı (10 dk)", "en": "Viral Tortilla Kebab (10 min)", "ar": "كباب التورتيلا الرائج (10 دقائق)"}, "price": 399, "unit": {"tr": "Porsiyon", "en": "portion", "ar": "حصة"}}, {"id": "aile", "name": {"tr": "Haftalık Aile Et Kutusu", "en": "Weekly Family Meat Box", "ar": "صندوق اللحم العائلي الأسبوعي"}, "price": 1472, "unit": {"tr": "Kutu", "en": "box", "ar": "صندوق"}}], "T": {"tr": {"welcome": "Merhaba {}! 👋\n\n🥩 AYKAN ET & MANGAL — Et • Balık • Tavuk • Kuzu\nTanzim Satış Mağazası resmî sipariş hattına hoş geldiniz!\n\n🔥 Günlük taze kesim — her gün 22:30'a kadar açık!\n\nDil seçmek için /lang — Choose language: 🇬🇧 / 🇸🇦", "lang_set": "✅ Dil ayarlandı: Türkçe 🇹🇷", "pick_lang": "🌐 Dil seçin / Choose your language / اختر لغتك:", "menu_title": "🥩 GÜNLÜK TAZE — GÜNCEL FİYATLAR 🥩\n\nSepete eklemek istediğiniz ürünü seçin 👇", "qty_prompt": "🥩 {} — {} TL/{}\n\nMiktar seçin 👇", "added": "✅ Sepete eklendi: {} × {} {}", "cart_title": "🛒 SEPETİNİZ:\n", "cart_empty": "🛒 Sepetiniz şu anda boş.\n\nMenüden ürün eklemek için 👇", "cart_total": "\n💰 TOPLAM: {} TL", "checkout_hint": "\n✅ Onaylamak için aşağıdaki butona basın:", "ask_name": "🧾 Siparişinizi tamamlamak için:\n\n1️⃣ Ad Soyadınızı yazın:", "ask_phone": "📞 Telefon numaranızı yazın (örn: 0537 732 52 69):", "ask_note": "🏠 Teslim adresi / notunuzu yazın (mağazadan gel-al için 'gel' yazın):", "order_ok": "🧾 SİPARİŞ ONAYI — {}\n\n{}\n\n💰 TOPLAM: {} TL\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ Siparişiniz alındı! Kısa süre içinde WhatsApp/telefon ile onaylayacağız.\n💬 Hızlı değişiklik/iptal: 0537 732 52 69\n\nTeşekkürler! 🥩🔥", "paket_title": "📦 ÖZEL PAKETLERİMİZ 🔥\n\n1️⃣ Aykan Özel Mangal Paketi — 998 TL\n1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + kömür + sos\n\n2️⃣ Viral Tortilla Kebabı — 399 TL\n10 dakikada hazır!\n\n3️⃣ Haftalık Aile Et Kutusu — 1.472 TL\n\nSepete eklemek için menüye dönün 👇", "b2b_title": "🏢 TOPTAN (B2B) PAKETLERİMİZ — 15 PAKET 📦\n", "b2b_min": "   • {} — %{} indirim (min. {})", "b2b_cta": "\nNumune ve özel teklif için geri arama isteyin 👇", "b2b_btn": "📞 Geri Arama İsteği", "ask_company": "🏢 Firma adınızı yazın:", "ask_b2b_phone": "📞 Telefon numaranızı yazın, toptan satış yetkilimiz sizi arasın:", "b2b_done": "✅ Talebiniz alındı! En kısa sürede sizi arayacağız.\n💬 Acil ise WhatsApp: 0537 732 52 69", "sube": "📍 ŞUBELERİMİZ\n\n🏪 Şube 1 — Bağcılar Göztepe:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(Göztepe Metro İstasyonu yanı)\n\n🏪 Şube 2 — Esenler Kemer:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 Her gün 22:30'a kadar açığız.\n📞 Tel / WhatsApp: 0537 732 52 69", "iletisim": "💬 İLETİŞİM\n\n📱 WhatsApp & Tel: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 Instagram: @aykanetmangal\n✈️ Telegram: Bu bot!", "unknown": "Anlamadım 🤔 Aşağıdaki menüden devam edebilirsiniz:", "kb": {"menu": "🥩 Menü & Fiyatlar", "paket": "📦 Paketler", "sepet": "🛒 Sepetim", "b2b": "🏢 B2B Toptan", "sube": "📍 Şubeler", "iletisim": "💬 WhatsApp", "site": "🌐 Web Sitemiz", "kanal": "📢 Kanalımız", "harita": "📍 Yol Tarifi"}, "checkout": "✅ Siparişi Onayla", "clear": "🗑 Sepeti Boşalt", "continue": "➕ Devam", "cart_empty_toast": "Sepetiniz boş!", "cleared": "🗑 Sepet boşaltıldı.", "back_menu": "⬅️ Menü", "home": "🏠 Ana Menü"}, "en": {"welcome": "Hello {}! 👋\n\n🥩 AYKAN ET & MANGAL — Beef • Fish • Chicken • Lamb\nWelcome to the official order line of our Cash-and-Carry Butchery!\n\n🔥 Fresh daily cuts — open every day until 22:30!\n\n/language to change dil 🇹🇷 / 🇸🇦", "lang_set": "✅ Language set: English 🇬🇧", "pick_lang": "🌐 Select language / Dil seçin / اختر لغتك:", "menu_title": "🥩 FRESH DAILY — CURRENT PRICES 🥩\n\nChoose a product to add to your cart 👇", "qty_prompt": "🥩 {} — {} TL/{}\n\nSelect quantity 👇", "added": "✅ Added to cart: {} × {} {}", "cart_title": "🛒 YOUR CART:\n", "cart_empty": "🛒 Your cart is empty.\n\nAdd products from the menu 👇", "cart_total": "\n💰 TOTAL: {} TL", "checkout_hint": "\n✅ Press the button below to confirm:", "ask_name": "🧾 To complete your order:\n\n1️⃣ Please type your full name:", "ask_phone": "📞 Type your phone number (e.g. 0537 732 52 69):", "ask_note": "🏠 Type delivery address / note (type 'pickup' for store pickup):", "order_ok": "🧾 ORDER CONFIRMATION — {}\n\n{}\n\n💰 TOTAL: {} TL\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ Order received! We will confirm shortly via WhatsApp/phone.\n💬 Quick changes/cancellation: 0537 732 52 69\n\nThank you! 🥩🔥", "paket_title": "📦 OUR SPECIAL PACKS 🔥\n\n1️⃣ Aykan Special BBQ Pack — 998 TL\n1 kg meatballs/cubes + 1 kg marinated chicken + charcoal + sauce\n\n2️⃣ Viral Tortilla Kebab — 399 TL\nReady in 10 minutes!\n\n3️⃣ Weekly Family Meat Box — 1,472 TL\n\nReturn to the menu to add 👇", "b2b_title": "🏢 WHOLESALE (B2B) PACKAGES — 15 PACKAGES 📦\n", "b2b_min": "   • {} — {}% off (min. {})", "b2b_cta": "\nRequest a callback for samples and custom offers 👇", "b2b_btn": "📞 Request Callback", "ask_company": "🏢 Type your company name:", "ask_b2b_phone": "📞 Type your phone number — our wholesale manager will call you:", "b2b_done": "✅ Request received! We will call you as soon as possible.\n💬 Urgent? WhatsApp: 0537 732 52 69", "sube": "📍 OUR BRANCHES\n\n🏪 Branch 1 — Bağcılar Göztepe:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(next to Göztepe Metro Station)\n\n🏪 Branch 2 — Esenler Kemer:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 Open every day until 22:30.\n📞 Tel / WhatsApp: 0537 732 52 69", "iletisim": "💬 CONTACT\n\n📱 WhatsApp & Tel: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 Instagram: @aykanetmangal\n✈️ Telegram: this bot!", "unknown": "I didn't understand 🤔 Please use the menu below:", "kb": {"menu": "🥩 Menu & Prices", "paket": "📦 Packs", "sepet": "🛒 My Cart", "b2b": "🏢 B2B Wholesale", "sube": "📍 Branches", "iletisim": "💬 WhatsApp", "site": "🌐 Our Website", "kanal": "📢 Our Channel", "harita": "📍 Get Directions"}, "checkout": "✅ Confirm Order", "clear": "🗑 Empty Cart", "continue": "➕ Continue", "cart_empty_toast": "Your cart is empty!", "cleared": "🗑 Cart emptied.", "back_menu": "⬅️ Menu", "home": "🏠 Main Menu"}, "ar": {"welcome": "مرحبا {}! 👋\n\n🥩 أيكان للحوم والمشاوي — لحم العجول • السمك • الدجاج • لحم الغنم\nمرحباً بك في خط الطلبات الرسمي لمتجر الجزارة (تانزيم ساتيش)!\n\n🔥 تقطيع طازج يومياً — مفتوح كل يوم حتى 22:30!\n\n/language لتغيير اللغة 🇹🇷 / 🇬🇧", "lang_set": "✅ تم ضبط اللغة: العربية 🇸🇦", "pick_lang": "🌐 اختر لغتك / Select language / Dil seçin:", "menu_title": "🥩 طازج يومياً — الأسعار الحالية 🥩\n\nاختر المنتج لإضافته إلى السلة 👇", "qty_prompt": "🥩 {} — {} ليرة/{}\n\nاختر الكمية 👇", "added": "✅ تمت الإضافة إلى السلة: {} × {} {}", "cart_title": "🛒 سلتك:\n", "cart_empty": "🛒 سلتك فارغة حالياً.\n\nأضف منتجات من القائمة 👇", "cart_total": "\n💰 الإجمالي: {} ليرة", "checkout_hint": "\n✅ اضغط على الزر أدناه للتأكيد:", "ask_name": "🧾 لإتمام طلبك:\n\n1️⃣ اكتب اسمك الكامل:", "ask_phone": "📞 اكتب رقم هاتفك (مثال: 0537 732 52 69):", "ask_note": "🏠 اكتب عنوان التوصيل / ملاحظتك (اكتب «استلام» للاستلام من المتجر):", "order_ok": "🧾 تأكيد الطلب — {}\n\n{}\n\n💰 الإجمالي: {} ليرة\n\n👤 {}\n📞 {}\n🏠 {}\n\n✅ تم استلام طلبك! سنؤكد قريباً عبر واتساب/الهاتف.\n💬 لتغييرات أو إلغاء سريعة: 0537 732 52 69\n\nشكراً لكم! 🥩🔥", "paket_title": "📦 باقاتنا الخاصة 🔥\n\n1️⃣ باقة المشاوي الخاصة بأيكان — 998 ليرة\n1 كغ كفتة/لحم مكعبات + 1 كغ دجاج متبل + فحم + صوص\n\n2️⃣ كباب التورتيلا الرائج — 399 ليرة\nجاهز خلال 10 دقائق!\n\n3️⃣ صندوق اللحم العائلي الأسبوعي — 1.472 ليرة\n\nعد إلى القائمة للإضافة 👇", "b2b_title": "🏢 باقات الجملة (B2B) لدينا — 15 باقة 📦\n", "b2b_min": "   • {} — خصم {}% (الحد الأدنى {})", "b2b_cta": "\nاطلب اتصالاً للمزيد من العينات والعروض الخاصة 👇", "b2b_btn": "📞 طلب اتصال", "ask_company": "🏢 اكتب اسم شركتك:", "ask_b2b_phone": "📞 اكتب رقم هاتفك ليتصل بك مسؤول مبيعات الجملة:", "b2b_done": "✅ تم استلام طلبك! سنتصل بك في أقرب وقت ممكن.\n💬 أمر عاجل؟ واتساب: 0537 732 52 69", "sube": "📍 فروعنا\n\n🏪 الفرع 1 — باغجيلار غوزتبه:\nGöztepe Mah. Maslak Cad. No: 95A-95C\n(بجانب محطة مترو غوزتبه)\n\n🏪 الفرع 2 — إسنلر كمر:\nKemer Mah. 926. Sokak No: 2/C, 34218 Esenler\n\n🕗 مفتوحون كل يوم حتى 22:30.\n📞 هاتف / واتساب: 0537 732 52 69", "iletisim": "💬 تواصل معنا\n\n📱 واتساب وهاتف: 0537 732 52 69\n🔗 https://wa.me/{}\n📸 إنستغرام: @aykanetmangal\n✈️ تيليغرام: هذا البوت!", "unknown": "لم أفهم 🤔 تابع من القائمة أدناه:", "kb": {"menu": "🥩 القائمة والأسعار", "paket": "📦 الباقات", "sepet": "🛒 سلتي", "b2b": "🏢 جملة B2B", "sube": "📍 فروعنا", "iletisim": "💬 واتساب", "site": "🌐 موقعنا", "kanal": "📢 قناتنا", "harita": "📍 الاتجاهات"}, "checkout": "✅ تأكيد الطلب", "clear": "🗑 إفراغ السلة", "continue": "➕ متابعة", "cart_empty_toast": "سلتك فارغة!", "cleared": "🗑 تم إفراغ السلة.", "back_menu": "⬅️ القائمة", "home": "🏠 القائمة الرئيسية"}}, "POSTS": ["🌯 VİRAL TORTİLLA KEBABI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nSosyal medyanın konuştuğu lezzet mağazamızda! 10 dakikada hazır, 399 TL. Bağcılar (Göztepe) civarındaysanız mutlaka deneyin!\n🌍 VIRAL TORTILLA KEBAB\nThe taste everyone is talking about! Ready in 10 minutes — 399 TL. Try it if you're around Bağcılar (Göztepe)!\n\n🇮🇷 کباب تورتیلای وایرال\nطعمی که همه درباره‌اش حرف می‌زنند! در ۱۰ دقیقه آماده — ۳۹۹ لیر. اگر اطراف باجیلار (گوزتپه) هستید حتماً امتحان کنید!\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #tortillakebap #viral", "❤️ ET VE SAĞLIK: DOĞRU BİLİNEN 5 YANLIŞ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nKırmızı et düşman değil, miktar önemli! Uzmanlara göre haftada 2-3 kez, ortalama 100-150 gr porsiyon dana eti; demir, B12 ve çinko için mükemmel bir kaynaktır. Kaliteli et + dengeli tabak = sağlıklı sofra.\n🌍 MEAT & HEALTH: 5 MYTHS\nRed meat is not the enemy — portion is! 2-3 times a week, 100-150 g of beef is an excellent source of iron, B12 and zinc. Quality meat + a balanced plate = a healthy table.\n\n🇮🇷 گوشت و سلامتی: ۵ باور غلط\nگوشت قرمز دشمن نیست — حجم مصرف مهم است! ۲ تا ۳ بار در هفته، ۱۰۰ تا ۱۵۰ گرم گوشت گوساله منبع عالی آهن، B12 و روی است. گوشت مرغوب + بشقاب متعادل = سفره سالم.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #sağlık #beslenme", "🔬 BİLİM İNSANI ANLATTI: MANGALDA KANSEROJEN RİSKİ NASIL AZALTILIR?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\nAraştırmalara göre 4 altın kural: 1) Kömürü tam kor haline getirin 2) Eti ateşe çok yaklaştırmayın 3) Yanmış kısımları kesin atın 4) Marine edilmiş et, heterosiklik amin oluşumunu %90'a kadar azaltıyor!\n🌍 SCIENCE: HOW TO REDUCE BBQ CARCINOGEN RISK\nStudies show 4 golden rules: 1) Let charcoal fully ash over 2) Don't hold meat too close to flame 3) Cut away charred parts 4) Marinated meat reduces heterocyclic amine formation by up to 90%!\n\n🇮🇷 علم می‌گوید: چطور ریسک سرطان‌زایی منقل را کم کنیم؟\nطبق تحقیقات ۴ قانون طلایی: ۱) ذغال را کاملاً خاکستر کنید ۲) گوشت را خیلی نزدیک شعله نگیرید ۳) قسمت‌های سوخته را جدا کنید ۴) گوشت مارین‌شده تشکیل آمین‌های هتروسیکلیک را تا ٪۹۰ کم می‌کند!\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #bilim #mangal", "📊 BU HAFTANIN ET FİYAT PANOSU\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nVitrin fiyatlarımızda sürpriz yok: Kemikli 650 • Kuşbaşı/Kıyma 750 • Antrikot 1.100 • Kuzu 1.069 • Pirzola 1.399 TL/Kg. Piyasa yükselirken biz tanzim fiyatını koruyoruz — çünkü kasabımız kendi kesimini yapıyor.\n🌍 THIS WEEK'S MEAT PRICE BOARD\nNo surprises at our counter: Bone-in 650 • Cubes/Minced 750 • Ribeye 1,100 • Lamb 1,069 • Chops 1,399 TL/kg. While the market rises, we hold prices — because we do our own butchering.\n\n🇮🇷 تابلوی قیمت گوشت این هفته\nدر قیمت‌های ما سورپرایز نیست: استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو. بازار بالا می‌رود ولی ما قیمت تنظیمی را حفظ می‌کنیم — چون ذبح خودمان انجام می‌شود.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #esenler #fiyat #pazar", "🍳 10 DAKİKADA TORTILLA KEBABI (VİDAL TARİF)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nZırhta çekilmiş kıymamız + lavaş + özel sos = sosyal medyanın gündemi! Tarif: Kıymayı baharatla soteleyin (5 dk), lavaşa sarın, tavada 2 dk kızartın. Üzerine ayran sos. Malzemeler bizde — lezzet sizde!\n🌍 10-MINUTE TORTILLA KEBAB (VIRAL RECIPE)\nOur stone-ground minced + lavash + special sauce = the social media trend! Recipe: sauté the mince with spices (5 min), wrap in lavash, sear 2 min. Top with yogurt sauce. Ingredients from us — flavour from you!\n\n🇮🇷 کباب تورتیلا در ۱۰ دقیقه (دستور وایرال)\nگوشت چرخ‌کرده ما + نان لواش + سس مخصوص = ترند شبکه‌های اجتماعی! دستور: گوشت را با ادویه تفت دهید (۵ دقیقه)، در لواش بپیچید، ۲ دقیقه در تابه سرخ کنید. روی آن سس ماست. مواد از ما — طعم از شما!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #tortilla", "🥩 HANGİ ET NE İÇİN? KASAP REHBERİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nAntrikot → ızgara/tava • Kuşbaşı → sulu yemek & güveç • Kıyma → köfte/burger • Kemikli et → çorba & yahnî • Kuzu pirzola → misafir sofrası. Emin değilseniz sorun — biz 20 yıllık ustalıkla yol gösteririz.\n🌍 WHICH CUT FOR WHAT? BUTCHER'S GUIDE\nRibeye → grill/pan • Cubes → stews & güveç • Minced → meatballs/burgers • Bone-in → soups & stews • Lamb chops → guest tables. Not sure? Just ask — 20 years of mastery at your service.\n\n🇮🇷 کدام گوشت برای چه کاری؟ راهنمای قصابی\nآنترکوت → گریل/تابه • کوپه → خورشت و دیزی • چرخ‌کرده → کوفته و برگر • استخوان‌دار → سوپ و آبگوشت • سیخ بره → سفره مهمانی. مطمئن نیستید؟ بپرسید — ۲۰ سال استادی در خدمت شما.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kesim #rehber", "🧊 ETİ EVDE NASIL SAKLAMALISINIZ? (GIDA MÜHENDİSİ CEVABI)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nBuzdolabında (0-4°C): kıyma 1 gün, kuşbaşı 2-3 gün, bütün et 3-5 gün. Donduracaksanız: vakumlu/ hava almayacak şekilde -18°C'de 3 aya kadar. Çözüm: buzdolabında yavaş çözdürün, asla tezgah üstünde bırakmayın!\n🌍 HOW TO STORE MEAT AT HOME (FOOD ENGINEER'S ANSWER)\nFridge (0-4°C): mince 1 day, cubes 2-3 days, whole cuts 3-5 days. Freezing: airtight/vacuum at -18°C up to 3 months. Thaw slowly in the fridge — never on the counter!\n\n🇮🇷 گوشت را در خانه چطور نگه داریم؟ (پاسخ مهندس مواد غذایی)\nیخچال (۰ تا ۴ درجه): چرخ‌کرده ۱ روز، کوپه ۲-۳ روز، گوشت یکپارچه ۳-۵ روز. فریزر: کاملاً بسته در ۱۸- درجه تا ۳ ماه. یخ‌زدایی فقط در یخچال — هرگز روی میز!\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güngören #gıdagüvenliği #saklama", "💪 SPORCULAR İÇİN: GÜNLÜK PROTEİN PLANI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\n70 kg bir sporcunun günlük ihtiyacı ~110-140 gr protein. Menü önerisi: Kahvaltıda 3 yumurta (18 gr), öğlende 150 gr dana kuşbaşı (39 gr), akşam 200 gr tavuk (46 gr) + yoğurt. Güçlü kaslar kasaptan geçer!\n🌍 ATHLETES: DAILY PROTEIN PLAN\nA 70 kg athlete needs ~110-140 g protein/day. Menu idea: 3 eggs at breakfast (18 g), 150 g beef cubes at lunch (39 g), 200 g chicken at dinner (46 g) + yogurt. Strong muscles start at the butcher's!\n\n🇮🇷 ورزشکاران: برنامه پروتئین روزانه\nیک ورزشکار ۷۰ کیلویی روزانه به ۱۱۰ تا ۱۴۰ گرم پروتئین نیاز دارد. منوی پیشنهادی: ۳ تخم‌مرغ صبحانه (۱۸ گرم)، ۱۵۰ گرم کوپه گوساله ناهار (۳۹ گرم)، ۲۰۰ گرم مرغ شام (۴۶ گرم) + ماست. عضله قوی از قصاب شروع می‌شود!\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #beslenme #spor", "🔥 MANGAL USTASININ 7 ALTIN KURALI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\n1) Kömür meşe olsun 2) Kor tam beyazlaşsın 3) Izgara telini temizleyin 4) Et oda sıcaklığına yaklaşsın 5) Etı sık çevirmeyin — bir kez çevirin 6) Tuzu ateşe atmadan hemen önce 7) Dinlendirin: 5 dk bekleyin, sonra kesin!\n🌍 7 GOLDEN RULES OF THE GRILL MASTER\n1) Use oak charcoal 2) Let coals turn fully white 3) Clean the grate 4) Let meat near room temp 5) Don't flip constantly — flip once 6) Salt just before the fire 7) Rest 5 minutes, then cut!\n\n🇮🇷 ۷ قانون طلایی استاد منقل\n۱) ذغال بلوط باشد ۲) ذغال کاملاً سفید شود ۳) سیخ را تمیز کنید ۴) گوشت نزدیک دمای اتاق باشد ۵) مدام برنگردانید — یک بار بچرخانید ۶) نمک را درست قبل از آتش ۷) ۵ دقیقه استراحت، بعد برش!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #mangal #ipucu", "⭐ MÜŞTERİMİZ ANLATIYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\n«20 yıldır bu semtteyiz, Aykan'dan almadığım gün etin tadı değişiyor!» — Zeytinburnu, Topkapı & Bakırköy mahallesinden müştah bir komşumuz. Siz de deneyin, farkı sofranızda hissedin. 🥩\n🌍 OUR CUSTOMER SPEAKS\n\"We've been in this neighbourhood for 20 years — on days I don't buy from Aykan, the meal just isn't the same!\" — a happy neighbour from Zeytinburnu, Topkapı & Bakırköy. Try it and taste the difference. 🥩\n\n🇮🇷 مشتری ما می‌گوید\n«بیست سال است در این محله هستیم، روزهایی که از آیکان نمی‌گیرم طعم غذا فرق می‌کند!» — همسایه خوشحالی از زیتون‌بورنو، توپکاپی و باکیرکوی. شما هم امتحان کنید و تفاوت را بچشید. 🥩\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #müşteri #güven", "🔥 HAFTA SONU MANGAL PAKETİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\n1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + meşe kömürü + özel sos = sadece 998 TL! Bağcılar (Göztepe) komşularına özel.\n🌍 WEEKEND BBQ PACK\n1 kg meatballs/cubes + 1 kg marinated chicken + oak charcoal + special sauce = only 998 TL! Special for Bağcılar (Göztepe) neighbours.\n\n🇮🇷 پکیج منقل آخر هفته\n۱ کیلو کوفته/کوپه + ۱ کیلو مرغ مارین + ذغال بلوط + سس مخصوص = فقط ۹۹۸ لیر! ویژه همسایگان باجیلار (گوزتپه).\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #mangal #haftasonu", "🩸 DEMİR EKSİKLER MİSİNİZ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nYorgunluk, halsizlik, çabuk yorulma... Sebep demir eksikliği olabilir! Dana eti, vücudun en kolay emdiği 'hem demiri' içerir. Ispanaklı demirin emilimi %5 iken etteki demirin emilimi %25'tir.\n🌍 LOW ON IRON?\nFatigue, weakness, tiredness... It might be iron deficiency! Beef contains 'heme iron', the easiest form for your body to absorb — while spinach iron absorbs at ~5%, beef iron absorbs at ~25%.\n\n🇮🇷 کم‌خون هستید؟\nخستگی، بی‌حالی، زود فرسودگی... ممکن است کمبود آهن باشد! گوشت گوساله «آهن هِم» دارد که راحت‌ترین شکل جذب برای بدن است — جذب آهن اسفناج حدود ٪۵ ولی جذب آهن گوشت حدود ٪۲۵ است.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #demir #sağlık", "🧪 PROTEİN BİLİMİ: KAS İÇİN ETİN YERİ TUTULMAZ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\n100 gr dana kuşbaşı = ~26 gr tam protein (vücudun ihtiyaç duyduğu tüm esansiyel amino asitlerle). Spor bilimciler kas onarımı için antrenmandan sonra 25-40 gr protein öneriyor.\n🌍 PROTEIN SCIENCE: NOTHING REPLACES MEAT\n100 g of beef cubes = ~26 g of complete protein with ALL essential amino acids. Sports scientists recommend 25-40 g protein after training for muscle repair.\n\n🇮🇷 علم پروتئین: جایگزین گوشت برای عضله وجود ندارد\n۱۰۰ گرم کوپه گوساله = حدود ۲۶ گرم پروتئین کامل با تمام آمینواسیدهای ضروری. دانشمندان ورزشی برای ترمیم عضله بعد از تمرین ۲۵ تا ۴۰ گرم پروتئین توصیه می‌کنند.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #protein #bilim", "🧾 TOPTANCIYA MI ALIYORSUNUZ? BU HESAP SİZİ İLGİLENDİRİYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nRestoran/otel/catering iseniz: 15 kurumsal paketimizde %10'a varan indirim + günlük taze sevkiyat + kurumsal fatura var. Bu bottan 🏢 B2B Toptan'a dokunun, size özel paket çıkaralım.\n🌍 BUYING WHOLESALE? THIS ONE'S FOR YOU\nRestaurant/hotel/catering: our 15 corporate packages offer up to 10% off + fresh daily delivery + corporate invoicing. Tap 🏢 B2B in this bot for your custom package.\n\n🇮🇷 خرید عمده می‌کنید؟ این پست برای شماست\nرستوران/هتل/کیترینگ هستید؟ ۱۵ پکیج سازمانی ما تا ٪۱۰ تخفیف + ارسال تازه روزانه + فاکتور رسمی دارد. در همین ربات دکمه 🏢 عمده را بزنید تا پکیج اختصاصی شما را بدهیم.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #esenler #toptan #b2b", "🍲 KASAPTAN SOFRAYA: DANA KUŞBAŞI GÜVEÇ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nMalzemeler: 750 gr kuşbaşı, 2 soğan, 3 domates, biber, kekik. Kuşbaşı zırhta değil kuşbaşı kesimde! Etinizi bizden alın, evde güvece atın — 2 saat sonra misafirleriniz ayakta alkışlıyor.\n🌍 FROM BUTCHER TO TABLE: BEEF GÜVEÇ STEW\nIngredients: 750 g cubes, 2 onions, 3 tomatoes, peppers, thyme. Get your cubes from us, throw them in a clay pot — 2 hours later your guests applaud.\n\n🇮🇷 از قصاب تا سفره: خورشت کوپه گوساله\nمواد لازم: ۷۵۰ گرم کوپه، ۲ پیاز، ۳ گوجه، فلفل، آویشن. کوپه‌تان را از ما بگیرید و در دیگ سنگی بریزید — دو ساعت بعد مهمان‌های شما کف می‌زنند!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #güveç", "⚖️ ZIRHTA ÇEKME NEDEN ÖNEMLİ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nKasap kıyması ile hazır kıyma aynı şey değildir! Zırhta çekilen kıyma tek parça ettir, katkı ve 'ne olduğu belirsiz' karışım yok. İstediğiniz yağ oranında, gözünüzün önünde çekiyoruz.\n🌍 WHY STONE-GROUND MINCE MATTERS\nButcher mince and packaged mince are NOT the same! Stone-ground mince comes from a single cut — no additives, no mystery blends. We grind to your preferred fat ratio, right in front of you.\n\n🇮🇷 چرا چرخ‌کردن سنگی مهم است؟\nگوشت چرخ‌کرده قصابی با گوشت چرخ‌کرده بسته‌بندی یکی نیست! چرخ‌شده سنگی از یک تکه گوشت است — بدون افزودنی و بدون ترکیب مرموز. با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kıyma #kalite", "🔬 SOĞUK ZİNCİR NEDEN KRİTİK?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nEt, kesimden tezgaha kadar 0-4°C'de kalmalı. Zincir kırılırsa bakteriler 20 dakikada ikiye bölünür! Bizim tezgahta soğuk zincir hiç kırılmaz — kasaplık ciddi iştir.\n🌍 WHY THE COLD CHAIN IS CRITICAL\nMeat must stay at 0-4°C from butchering to counter. If the chain breaks, bacteria double every 20 minutes! At our counter the cold chain never breaks — butchery is serious business.\n\n🇮🇷 چرا زنجیره سرد حیاتی است؟\nگوشت باید از ذبح تا ویترین در ۰ تا ۴ درجه بماند. اگر زنجیره بشکند، باکتری‌ها هر ۲۰ دقیقه دوبرابر می‌شوند! در ویترین ما زنجیره سرد هرگز نمی‌شکند — قصابی کار جدی است.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güngören #soğukzincir #hijyen", "👶 ÇOCUKLARDA ETİN ROLÜ: BÜYÜME VE ZEKÂ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\nPediatristlere göre büyüme çağındaki çocuklarda B12, demir ve çinko eksikliği öğrenme kapasitesini düşürüyor. Haftada 2-3 kez kaliteli kıyma/kuşbaşı içeren beslenme, okul başarısını destekliyor.\n🌍 MEAT IN CHILDHOOD: GROWTH & BRAIN\nPediatricians note that B12, iron and zinc deficiency in growing children reduces learning capacity. Quality mince/cubes 2-3 times a week supports school success.\n\n🇮🇷 نقش گوشت در کودکان: رشد و هوش\nطبق نظر متخصصان کودکان، کمبود B12 و آهن و روی در سن رشد، توان یادگیری را کم می‌کند. ۲ تا ۳ بار در هفته گوشت مرغوب، موفقیت درس را تقویت می‌کند.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #çocuk #beslenme", "🧺 PİKNİK SEPETİNİZ HAZIR MI?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\nHafta sonu planı yapan Gaziosmanpaşa & Sultangazi komşuları: marine tavuk, hazır köfte harmanı, meşe kömürü ve ekmek — hepsi tek pakette, yol üstü şubemizden hazır alın!\n🌍 IS YOUR PICNIC BASKET READY?\nFor Gaziosmanpaşa & Sultangazi neighbours planning the weekend: marinated chicken, ready meatball mix, oak charcoal and bread — all in one pack, grab it ready from our branch on your way!\n\n🇮🇷 سبد پیک‌نیک‌تان آماده است؟\nبرای همسایگان قاضی‌عثمان‌پاشا و سلطان‌قاضی که برنامه آخر هفته دارند: مرغ مارین، مخلوط آماده کوفته، ذغال بلوط و نان — همه در یک پکیج، از شعبه در مسیر، آماده تحویل!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #piknik #mangal", "🐟 TEZGAHIMIZDA YENİ SEZON!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\nEt • Balık • Tavuk • Kuzu — tek adreste! Bu sezon tezgahımıza günlük taze balık da geldikçe ekliyoruz. Zeytinburnu, Topkapı & Bakırköy bölgesinde akşam yemeğini bizden çıkar, eve hazırlanmış götür!\n🌍 NEW SEASON AT OUR COUNTER!\nBeef • Fish • Chicken • Lamb — one address! This season we keep adding fresh daily fish to our counter. In Zeytinburnu, Topkapı & Bakırköy, pick up dinner from us — ready to cook!\n\n🇮🇷 فصل جدید در ویترین ما!\nگوساله • ماهی • مرغ • بره — در یک آدرس! این فصل ماهی تازه روزانه هم به ویترین ما اضافه می‌شود. در زیتون‌بورنو، توپکاپی و باکیرکوی، شام را از ما ببرید — آماده پخت!\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #sezon #tazelik", "🥩 GÜNLÜK TAZE KESİM\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nSabah kesilen et, akşam sofranızda! Araçısız, kasaptan direkt tanzim fiyatına. Kemikli 650 TL • Kuşbaşı/Kıyma 750 TL.\n🌍 FRESH DAILY CUTS\nMeat cut in the morning, on your table by evening! Direct from the butcher at cash-and-carry prices. Bone-in 650 TL • Cubes/minced 750 TL.\n\n🇮🇷 برش تازه روزانه\nگوشتی صبح ذبح می‌شود و شب روی سفره شماست! مستقیم از قصاب بدون واسطه. استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ لیر.\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #günlükTaze #tanzim", "❤️ ET VE SAĞLIK: DOĞRU BİLİNEN 5 YANLIŞ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nKırmızı et düşman değil, miktar önemli! Uzmanlara göre haftada 2-3 kez, ortalama 100-150 gr porsiyon dana eti; demir, B12 ve çinko için mükemmel bir kaynaktır. Kaliteli et + dengeli tabak = sağlıklı sofra.\n🌍 MEAT & HEALTH: 5 MYTHS\nRed meat is not the enemy — portion is! 2-3 times a week, 100-150 g of beef is an excellent source of iron, B12 and zinc. Quality meat + a balanced plate = a healthy table.\n\n🇮🇷 گوشت و سلامتی: ۵ باور غلط\nگوشت قرمز دشمن نیست — حجم مصرف مهم است! ۲ تا ۳ بار در هفته، ۱۰۰ تا ۱۵۰ گرم گوشت گوساله منبع عالی آهن، B12 و روی است. گوشت مرغوب + بشقاب متعادل = سفره سالم.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #sağlık #beslenme", "🔬 BİLİM İNSANI ANLATTI: MANGALDA KANSEROJEN RİSKİ NASIL AZALTILIR?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\nAraştırmalara göre 4 altın kural: 1) Kömürü tam kor haline getirin 2) Eti ateşe çok yaklaştırmayın 3) Yanmış kısımları kesin atın 4) Marine edilmiş et, heterosiklik amin oluşumunu %90'a kadar azaltıyor!\n🌍 SCIENCE: HOW TO REDUCE BBQ CARCINOGEN RISK\nStudies show 4 golden rules: 1) Let charcoal fully ash over 2) Don't hold meat too close to flame 3) Cut away charred parts 4) Marinated meat reduces heterocyclic amine formation by up to 90%!\n\n🇮🇷 علم می‌گوید: چطور ریسک سرطان‌زایی منقل را کم کنیم؟\nطبق تحقیقات ۴ قانون طلایی: ۱) ذغال را کاملاً خاکستر کنید ۲) گوشت را خیلی نزدیک شعله نگیرید ۳) قسمت‌های سوخته را جدا کنید ۴) گوشت مارین‌شده تشکیل آمین‌های هتروسیکلیک را تا ٪۹۰ کم می‌کند!\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #bilim #mangal", "📊 BU HAFTANIN ET FİYAT PANOSU\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nVitrin fiyatlarımızda sürpriz yok: Kemikli 650 • Kuşbaşı/Kıyma 750 • Antrikot 1.100 • Kuzu 1.069 • Pirzola 1.399 TL/Kg. Piyasa yükselirken biz tanzim fiyatını koruyoruz — çünkü kasabımız kendi kesimini yapıyor.\n🌍 THIS WEEK'S MEAT PRICE BOARD\nNo surprises at our counter: Bone-in 650 • Cubes/Minced 750 • Ribeye 1,100 • Lamb 1,069 • Chops 1,399 TL/kg. While the market rises, we hold prices — because we do our own butchering.\n\n🇮🇷 تابلوی قیمت گوشت این هفته\nدر قیمت‌های ما سورپرایز نیست: استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو. بازار بالا می‌رود ولی ما قیمت تنظیمی را حفظ می‌کنیم — چون ذبح خودمان انجام می‌شود.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #esenler #fiyat #pazar", "🍳 10 DAKİKADA TORTILLA KEBABI (VİDAL TARİF)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nZırhta çekilmiş kıymamız + lavaş + özel sos = sosyal medyanın gündemi! Tarif: Kıymayı baharatla soteleyin (5 dk), lavaşa sarın, tavada 2 dk kızartın. Üzerine ayran sos. Malzemeler bizde — lezzet sizde!\n🌍 10-MINUTE TORTILLA KEBAB (VIRAL RECIPE)\nOur stone-ground minced + lavash + special sauce = the social media trend! Recipe: sauté the mince with spices (5 min), wrap in lavash, sear 2 min. Top with yogurt sauce. Ingredients from us — flavour from you!\n\n🇮🇷 کباب تورتیلا در ۱۰ دقیقه (دستور وایرال)\nگوشت چرخ‌کرده ما + نان لواش + سس مخصوص = ترند شبکه‌های اجتماعی! دستور: گوشت را با ادویه تفت دهید (۵ دقیقه)، در لواش بپیچید، ۲ دقیقه در تابه سرخ کنید. روی آن سس ماست. مواد از ما — طعم از شما!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #tortilla", "🥩 HANGİ ET NE İÇİN? KASAP REHBERİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nAntrikot → ızgara/tava • Kuşbaşı → sulu yemek & güveç • Kıyma → köfte/burger • Kemikli et → çorba & yahnî • Kuzu pirzola → misafir sofrası. Emin değilseniz sorun — biz 20 yıllık ustalıkla yol gösteririz.\n🌍 WHICH CUT FOR WHAT? BUTCHER'S GUIDE\nRibeye → grill/pan • Cubes → stews & güveç • Minced → meatballs/burgers • Bone-in → soups & stews • Lamb chops → guest tables. Not sure? Just ask — 20 years of mastery at your service.\n\n🇮🇷 کدام گوشت برای چه کاری؟ راهنمای قصابی\nآنترکوت → گریل/تابه • کوپه → خورشت و دیزی • چرخ‌کرده → کوفته و برگر • استخوان‌دار → سوپ و آبگوشت • سیخ بره → سفره مهمانی. مطمئن نیستید؟ بپرسید — ۲۰ سال استادی در خدمت شما.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kesim #rehber", "🧊 ETİ EVDE NASIL SAKLAMALISINIZ? (GIDA MÜHENDİSİ CEVABI)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nBuzdolabında (0-4°C): kıyma 1 gün, kuşbaşı 2-3 gün, bütün et 3-5 gün. Donduracaksanız: vakumlu/ hava almayacak şekilde -18°C'de 3 aya kadar. Çözüm: buzdolabında yavaş çözdürün, asla tezgah üstünde bırakmayın!\n🌍 HOW TO STORE MEAT AT HOME (FOOD ENGINEER'S ANSWER)\nFridge (0-4°C): mince 1 day, cubes 2-3 days, whole cuts 3-5 days. Freezing: airtight/vacuum at -18°C up to 3 months. Thaw slowly in the fridge — never on the counter!\n\n🇮🇷 گوشت را در خانه چطور نگه داریم؟ (پاسخ مهندس مواد غذایی)\nیخچال (۰ تا ۴ درجه): چرخ‌کرده ۱ روز، کوپه ۲-۳ روز، گوشت یکپارچه ۳-۵ روز. فریزر: کاملاً بسته در ۱۸- درجه تا ۳ ماه. یخ‌زدایی فقط در یخچال — هرگز روی میز!\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güngören #gıdagüvenliği #saklama", "💪 SPORCULAR İÇİN: GÜNLÜK PROTEİN PLANI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\n70 kg bir sporcunun günlük ihtiyacı ~110-140 gr protein. Menü önerisi: Kahvaltıda 3 yumurta (18 gr), öğlende 150 gr dana kuşbaşı (39 gr), akşam 200 gr tavuk (46 gr) + yoğurt. Güçlü kaslar kasaptan geçer!\n🌍 ATHLETES: DAILY PROTEIN PLAN\nA 70 kg athlete needs ~110-140 g protein/day. Menu idea: 3 eggs at breakfast (18 g), 150 g beef cubes at lunch (39 g), 200 g chicken at dinner (46 g) + yogurt. Strong muscles start at the butcher's!\n\n🇮🇷 ورزشکاران: برنامه پروتئین روزانه\nیک ورزشکار ۷۰ کیلویی روزانه به ۱۱۰ تا ۱۴۰ گرم پروتئین نیاز دارد. منوی پیشنهادی: ۳ تخم‌مرغ صبحانه (۱۸ گرم)، ۱۵۰ گرم کوپه گوساله ناهار (۳۹ گرم)، ۲۰۰ گرم مرغ شام (۴۶ گرم) + ماست. عضله قوی از قصاب شروع می‌شود!\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #beslenme #spor", "🔥 MANGAL USTASININ 7 ALTIN KURALI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\n1) Kömür meşe olsun 2) Kor tam beyazlaşsın 3) Izgara telini temizleyin 4) Et oda sıcaklığına yaklaşsın 5) Etı sık çevirmeyin — bir kez çevirin 6) Tuzu ateşe atmadan hemen önce 7) Dinlendirin: 5 dk bekleyin, sonra kesin!\n🌍 7 GOLDEN RULES OF THE GRILL MASTER\n1) Use oak charcoal 2) Let coals turn fully white 3) Clean the grate 4) Let meat near room temp 5) Don't flip constantly — flip once 6) Salt just before the fire 7) Rest 5 minutes, then cut!\n\n🇮🇷 ۷ قانون طلایی استاد منقل\n۱) ذغال بلوط باشد ۲) ذغال کاملاً سفید شود ۳) سیخ را تمیز کنید ۴) گوشت نزدیک دمای اتاق باشد ۵) مدام برنگردانید — یک بار بچرخانید ۶) نمک را درست قبل از آتش ۷) ۵ دقیقه استراحت، بعد برش!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #mangal #ipucu", "⭐ MÜŞTERİMİZ ANLATIYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\n«20 yıldır bu semtteyiz, Aykan'dan almadığım gün etin tadı değişiyor!» — Zeytinburnu, Topkapı & Bakırköy mahallesinden müştah bir komşumuz. Siz de deneyin, farkı sofranızda hissedin. 🥩\n🌍 OUR CUSTOMER SPEAKS\n\"We've been in this neighbourhood for 20 years — on days I don't buy from Aykan, the meal just isn't the same!\" — a happy neighbour from Zeytinburnu, Topkapı & Bakırköy. Try it and taste the difference. 🥩\n\n🇮🇷 مشتری ما می‌گوید\n«بیست سال است در این محله هستیم، روزهایی که از آیکان نمی‌گیرم طعم غذا فرق می‌کند!» — همسایه خوشحالی از زیتون‌بورنو، توپکاپی و باکیرکوی. شما هم امتحان کنید و تفاوت را بچشید. 🥩\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #müşteri #güven", "💰 ŞEFFAF VİTRİN FİYATLARI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nFiyyatlarda sürpriz yok! Vitrinde ne yazıyorsa o: Kemikli 650 • Kuşbaşı 750 • Antrikot 1100 • Kuzu 1069 • Pirzola 1399 TL/Kg.\n🌍 TRANSPARENT COUNTER PRICES\nNo surprises! What you see on the counter is what you pay: Bone-in 650 • Cubes 750 • Ribeye 1100 • Lamb 1069 • Chops 1399 TL/kg.\n\n🇮🇷 قیمت‌های شفاف ویترین\nبدون سورپرایز! همان که روی ویترین است می‌پردازید: استخوان‌دار ۶۵۰ • کوپه ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو.\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #fiyatşeffaflığı", "🩸 DEMİR EKSİKLER MİSİNİZ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nYorgunluk, halsizlik, çabuk yorulma... Sebep demir eksikliği olabilir! Dana eti, vücudun en kolay emdiği 'hem demiri' içerir. Ispanaklı demirin emilimi %5 iken etteki demirin emilimi %25'tir.\n🌍 LOW ON IRON?\nFatigue, weakness, tiredness... It might be iron deficiency! Beef contains 'heme iron', the easiest form for your body to absorb — while spinach iron absorbs at ~5%, beef iron absorbs at ~25%.\n\n🇮🇷 کم‌خون هستید؟\nخستگی، بی‌حالی، زود فرسودگی... ممکن است کمبود آهن باشد! گوشت گوساله «آهن هِم» دارد که راحت‌ترین شکل جذب برای بدن است — جذب آهن اسفناج حدود ٪۵ ولی جذب آهن گوشت حدود ٪۲۵ است.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #demir #sağlık", "🧪 PROTEİN BİLİMİ: KAS İÇİN ETİN YERİ TUTULMAZ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\n100 gr dana kuşbaşı = ~26 gr tam protein (vücudun ihtiyaç duyduğu tüm esansiyel amino asitlerle). Spor bilimciler kas onarımı için antrenmandan sonra 25-40 gr protein öneriyor.\n🌍 PROTEIN SCIENCE: NOTHING REPLACES MEAT\n100 g of beef cubes = ~26 g of complete protein with ALL essential amino acids. Sports scientists recommend 25-40 g protein after training for muscle repair.\n\n🇮🇷 علم پروتئین: جایگزین گوشت برای عضله وجود ندارد\n۱۰۰ گرم کوپه گوساله = حدود ۲۶ گرم پروتئین کامل با تمام آمینواسیدهای ضروری. دانشمندان ورزشی برای ترمیم عضله بعد از تمرین ۲۵ تا ۴۰ گرم پروتئین توصیه می‌کنند.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #protein #bilim", "🧾 TOPTANCIYA MI ALIYORSUNUZ? BU HESAP SİZİ İLGİLENDİRİYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nRestoran/otel/catering iseniz: 15 kurumsal paketimizde %10'a varan indirim + günlük taze sevkiyat + kurumsal fatura var. Bu bottan 🏢 B2B Toptan'a dokunun, size özel paket çıkaralım.\n🌍 BUYING WHOLESALE? THIS ONE'S FOR YOU\nRestaurant/hotel/catering: our 15 corporate packages offer up to 10% off + fresh daily delivery + corporate invoicing. Tap 🏢 B2B in this bot for your custom package.\n\n🇮🇷 خرید عمده می‌کنید؟ این پست برای شماست\nرستوران/هتل/کیترینگ هستید؟ ۱۵ پکیج سازمانی ما تا ٪۱۰ تخفیف + ارسال تازه روزانه + فاکتور رسمی دارد. در همین ربات دکمه 🏢 عمده را بزنید تا پکیج اختصاصی شما را بدهیم.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #esenler #toptan #b2b", "🍲 KASAPTAN SOFRAYA: DANA KUŞBAŞI GÜVEÇ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nMalzemeler: 750 gr kuşbaşı, 2 soğan, 3 domates, biber, kekik. Kuşbaşı zırhta değil kuşbaşı kesimde! Etinizi bizden alın, evde güvece atın — 2 saat sonra misafirleriniz ayakta alkışlıyor.\n🌍 FROM BUTCHER TO TABLE: BEEF GÜVEÇ STEW\nIngredients: 750 g cubes, 2 onions, 3 tomatoes, peppers, thyme. Get your cubes from us, throw them in a clay pot — 2 hours later your guests applaud.\n\n🇮🇷 از قصاب تا سفره: خورشت کوپه گوساله\nمواد لازم: ۷۵۰ گرم کوپه، ۲ پیاز، ۳ گوجه، فلفل، آویشن. کوپه‌تان را از ما بگیرید و در دیگ سنگی بریزید — دو ساعت بعد مهمان‌های شما کف می‌زنند!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #güveç", "⚖️ ZIRHTA ÇEKME NEDEN ÖNEMLİ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nKasap kıyması ile hazır kıyma aynı şey değildir! Zırhta çekilen kıyma tek parça ettir, katkı ve 'ne olduğu belirsiz' karışım yok. İstediğiniz yağ oranında, gözünüzün önünde çekiyoruz.\n🌍 WHY STONE-GROUND MINCE MATTERS\nButcher mince and packaged mince are NOT the same! Stone-ground mince comes from a single cut — no additives, no mystery blends. We grind to your preferred fat ratio, right in front of you.\n\n🇮🇷 چرا چرخ‌کردن سنگی مهم است؟\nگوشت چرخ‌کرده قصابی با گوشت چرخ‌کرده بسته‌بندی یکی نیست! چرخ‌شده سنگی از یک تکه گوشت است — بدون افزودنی و بدون ترکیب مرموز. با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kıyma #kalite", "🔬 SOĞUK ZİNCİR NEDEN KRİTİK?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nEt, kesimden tezgaha kadar 0-4°C'de kalmalı. Zincir kırılırsa bakteriler 20 dakikada ikiye bölünür! Bizim tezgahta soğuk zincir hiç kırılmaz — kasaplık ciddi iştir.\n🌍 WHY THE COLD CHAIN IS CRITICAL\nMeat must stay at 0-4°C from butchering to counter. If the chain breaks, bacteria double every 20 minutes! At our counter the cold chain never breaks — butchery is serious business.\n\n🇮🇷 چرا زنجیره سرد حیاتی است؟\nگوشت باید از ذبح تا ویترین در ۰ تا ۴ درجه بماند. اگر زنجیره بشکند، باکتری‌ها هر ۲۰ دقیقه دوبرابر می‌شوند! در ویترین ما زنجیره سرد هرگز نمی‌شکند — قصابی کار جدی است.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güngören #soğukzincir #hijyen", "👶 ÇOCUKLARDA ETİN ROLÜ: BÜYÜME VE ZEKÂ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\nPediatristlere göre büyüme çağındaki çocuklarda B12, demir ve çinko eksikliği öğrenme kapasitesini düşürüyor. Haftada 2-3 kez kaliteli kıyma/kuşbaşı içeren beslenme, okul başarısını destekliyor.\n🌍 MEAT IN CHILDHOOD: GROWTH & BRAIN\nPediatricians note that B12, iron and zinc deficiency in growing children reduces learning capacity. Quality mince/cubes 2-3 times a week supports school success.\n\n🇮🇷 نقش گوشت در کودکان: رشد و هوش\nطبق نظر متخصصان کودکان، کمبود B12 و آهن و روی در سن رشد، توان یادگیری را کم می‌کند. ۲ تا ۳ بار در هفته گوشت مرغوب، موفقیت درس را تقویت می‌کند.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #çocuk #beslenme", "🧺 PİKNİK SEPETİNİZ HAZIR MI?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\nHafta sonu planı yapan Gaziosmanpaşa & Sultangazi komşuları: marine tavuk, hazır köfte harmanı, meşe kömürü ve ekmek — hepsi tek pakette, yol üstü şubemizden hazır alın!\n🌍 IS YOUR PICNIC BASKET READY?\nFor Gaziosmanpaşa & Sultangazi neighbours planning the weekend: marinated chicken, ready meatball mix, oak charcoal and bread — all in one pack, grab it ready from our branch on your way!\n\n🇮🇷 سبد پیک‌نیک‌تان آماده است؟\nبرای همسایگان قاضی‌عثمان‌پاشا و سلطان‌قاضی که برنامه آخر هفته دارند: مرغ مارین، مخلوط آماده کوفته، ذغال بلوط و نان — همه در یک پکیج، از شعبه در مسیر، آماده تحویل!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #piknik #mangal", "🐟 TEZGAHIMIZDA YENİ SEZON!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\nEt • Balık • Tavuk • Kuzu — tek adreste! Bu sezon tezgahımıza günlük taze balık da geldikçe ekliyoruz. Zeytinburnu, Topkapı & Bakırköy bölgesinde akşam yemeğini bizden çıkar, eve hazırlanmış götür!\n🌍 NEW SEASON AT OUR COUNTER!\nBeef • Fish • Chicken • Lamb — one address! This season we keep adding fresh daily fish to our counter. In Zeytinburnu, Topkapı & Bakırköy, pick up dinner from us — ready to cook!\n\n🇮🇷 فصل جدید در ویترین ما!\nگوساله • ماهی • مرغ • بره — در یک آدرس! این فصل ماهی تازه روزانه هم به ویترین ما اضافه می‌شود. در زیتون‌بورنو، توپکاپی و باکیرکوی، شام را از ما ببرید — آماده پخت!\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #sezon #tazelik", "🍖 KUZU PİRZOLA ÖZEL\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nMisafir sofralarının yıldızı: Kuzu Pirzola 1.399 TL/Kg. Bağcılar (Göztepe) bölgesinde en taze kuzu bizde!\n🌍 LAMB CHOPS SPECIAL\nThe star of guest tables: Lamb Chops 1,399 TL/kg. The freshest lamb in Bağcılar (Göztepe) is here!\n\n🇮🇷 سیخ بره ویژه\nستاره سفره مهمانی: سیخ بره ۱۳۹۹ لیر/کیلو. تازه‌ترین بره در باجیلار (گوزتپه) اینجاست!\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #kuzupirzola", "❤️ ET VE SAĞLIK: DOĞRU BİLİNEN 5 YANLIŞ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nKırmızı et düşman değil, miktar önemli! Uzmanlara göre haftada 2-3 kez, ortalama 100-150 gr porsiyon dana eti; demir, B12 ve çinko için mükemmel bir kaynaktır. Kaliteli et + dengeli tabak = sağlıklı sofra.\n🌍 MEAT & HEALTH: 5 MYTHS\nRed meat is not the enemy — portion is! 2-3 times a week, 100-150 g of beef is an excellent source of iron, B12 and zinc. Quality meat + a balanced plate = a healthy table.\n\n🇮🇷 گوشت و سلامتی: ۵ باور غلط\nگوشت قرمز دشمن نیست — حجم مصرف مهم است! ۲ تا ۳ بار در هفته، ۱۰۰ تا ۱۵۰ گرم گوشت گوساله منبع عالی آهن، B12 و روی است. گوشت مرغوب + بشقاب متعادل = سفره سالم.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #sağlık #beslenme", "🔬 BİLİM İNSANI ANLATTI: MANGALDA KANSEROJEN RİSKİ NASIL AZALTILIR?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\nAraştırmalara göre 4 altın kural: 1) Kömürü tam kor haline getirin 2) Eti ateşe çok yaklaştırmayın 3) Yanmış kısımları kesin atın 4) Marine edilmiş et, heterosiklik amin oluşumunu %90'a kadar azaltıyor!\n🌍 SCIENCE: HOW TO REDUCE BBQ CARCINOGEN RISK\nStudies show 4 golden rules: 1) Let charcoal fully ash over 2) Don't hold meat too close to flame 3) Cut away charred parts 4) Marinated meat reduces heterocyclic amine formation by up to 90%!\n\n🇮🇷 علم می‌گوید: چطور ریسک سرطان‌زایی منقل را کم کنیم؟\nطبق تحقیقات ۴ قانون طلایی: ۱) ذغال را کاملاً خاکستر کنید ۲) گوشت را خیلی نزدیک شعله نگیرید ۳) قسمت‌های سوخته را جدا کنید ۴) گوشت مارین‌شده تشکیل آمین‌های هتروسیکلیک را تا ٪۹۰ کم می‌کند!\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #bilim #mangal", "📊 BU HAFTANIN ET FİYAT PANOSU\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nVitrin fiyatlarımızda sürpriz yok: Kemikli 650 • Kuşbaşı/Kıyma 750 • Antrikot 1.100 • Kuzu 1.069 • Pirzola 1.399 TL/Kg. Piyasa yükselirken biz tanzim fiyatını koruyoruz — çünkü kasabımız kendi kesimini yapıyor.\n🌍 THIS WEEK'S MEAT PRICE BOARD\nNo surprises at our counter: Bone-in 650 • Cubes/Minced 750 • Ribeye 1,100 • Lamb 1,069 • Chops 1,399 TL/kg. While the market rises, we hold prices — because we do our own butchering.\n\n🇮🇷 تابلوی قیمت گوشت این هفته\nدر قیمت‌های ما سورپرایز نیست: استخوان‌دار ۶۵۰ • کوپه/چرخ‌کرده ۷۵۰ • آنترکوت ۱۱۰۰ • بره ۱۰۶۹ • پیرولا ۱۳۹۹ لیر/کیلو. بازار بالا می‌رود ولی ما قیمت تنظیمی را حفظ می‌کنیم — چون ذبح خودمان انجام می‌شود.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #esenler #fiyat #pazar", "🍳 10 DAKİKADA TORTILLA KEBABI (VİDAL TARİF)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nZırhta çekilmiş kıymamız + lavaş + özel sos = sosyal medyanın gündemi! Tarif: Kıymayı baharatla soteleyin (5 dk), lavaşa sarın, tavada 2 dk kızartın. Üzerine ayran sos. Malzemeler bizde — lezzet sizde!\n🌍 10-MINUTE TORTILLA KEBAB (VIRAL RECIPE)\nOur stone-ground minced + lavash + special sauce = the social media trend! Recipe: sauté the mince with spices (5 min), wrap in lavash, sear 2 min. Top with yogurt sauce. Ingredients from us — flavour from you!\n\n🇮🇷 کباب تورتیلا در ۱۰ دقیقه (دستور وایرال)\nگوشت چرخ‌کرده ما + نان لواش + سس مخصوص = ترند شبکه‌های اجتماعی! دستور: گوشت را با ادویه تفت دهید (۵ دقیقه)، در لواش بپیچید، ۲ دقیقه در تابه سرخ کنید. روی آن سس ماست. مواد از ما — طعم از شما!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #tortilla", "🥩 HANGİ ET NE İÇİN? KASAP REHBERİ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nAntrikot → ızgara/tava • Kuşbaşı → sulu yemek & güveç • Kıyma → köfte/burger • Kemikli et → çorba & yahnî • Kuzu pirzola → misafir sofrası. Emin değilseniz sorun — biz 20 yıllık ustalıkla yol gösteririz.\n🌍 WHICH CUT FOR WHAT? BUTCHER'S GUIDE\nRibeye → grill/pan • Cubes → stews & güveç • Minced → meatballs/burgers • Bone-in → soups & stews • Lamb chops → guest tables. Not sure? Just ask — 20 years of mastery at your service.\n\n🇮🇷 کدام گوشت برای چه کاری؟ راهنمای قصابی\nآنترکوت → گریل/تابه • کوپه → خورشت و دیزی • چرخ‌کرده → کوفته و برگر • استخوان‌دار → سوپ و آبگوشت • سیخ بره → سفره مهمانی. مطمئن نیستید؟ بپرسید — ۲۰ سال استادی در خدمت شما.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kesim #rehber", "🧊 ETİ EVDE NASIL SAKLAMALISINIZ? (GIDA MÜHENDİSİ CEVABI)\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nBuzdolabında (0-4°C): kıyma 1 gün, kuşbaşı 2-3 gün, bütün et 3-5 gün. Donduracaksanız: vakumlu/ hava almayacak şekilde -18°C'de 3 aya kadar. Çözüm: buzdolabında yavaş çözdürün, asla tezgah üstünde bırakmayın!\n🌍 HOW TO STORE MEAT AT HOME (FOOD ENGINEER'S ANSWER)\nFridge (0-4°C): mince 1 day, cubes 2-3 days, whole cuts 3-5 days. Freezing: airtight/vacuum at -18°C up to 3 months. Thaw slowly in the fridge — never on the counter!\n\n🇮🇷 گوشت را در خانه چطور نگه داریم؟ (پاسخ مهندس مواد غذایی)\nیخچال (۰ تا ۴ درجه): چرخ‌کرده ۱ روز، کوپه ۲-۳ روز، گوشت یکپارچه ۳-۵ روز. فریزر: کاملاً بسته در ۱۸- درجه تا ۳ ماه. یخ‌زدایی فقط در یخچال — هرگز روی میز!\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güngören #gıdagüvenliği #saklama", "💪 SPORCULAR İÇİN: GÜNLÜK PROTEİN PLANI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\n70 kg bir sporcunun günlük ihtiyacı ~110-140 gr protein. Menü önerisi: Kahvaltıda 3 yumurta (18 gr), öğlende 150 gr dana kuşbaşı (39 gr), akşam 200 gr tavuk (46 gr) + yoğurt. Güçlü kaslar kasaptan geçer!\n🌍 ATHLETES: DAILY PROTEIN PLAN\nA 70 kg athlete needs ~110-140 g protein/day. Menu idea: 3 eggs at breakfast (18 g), 150 g beef cubes at lunch (39 g), 200 g chicken at dinner (46 g) + yogurt. Strong muscles start at the butcher's!\n\n🇮🇷 ورزشکاران: برنامه پروتئین روزانه\nیک ورزشکار ۷۰ کیلویی روزانه به ۱۱۰ تا ۱۴۰ گرم پروتئین نیاز دارد. منوی پیشنهادی: ۳ تخم‌مرغ صبحانه (۱۸ گرم)، ۱۵۰ گرم کوپه گوساله ناهار (۳۹ گرم)، ۲۰۰ گرم مرغ شام (۴۶ گرم) + ماست. عضله قوی از قصاب شروع می‌شود!\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #beslenme #spor", "🔥 MANGAL USTASININ 7 ALTIN KURALI\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\n1) Kömür meşe olsun 2) Kor tam beyazlaşsın 3) Izgara telini temizleyin 4) Et oda sıcaklığına yaklaşsın 5) Etı sık çevirmeyin — bir kez çevirin 6) Tuzu ateşe atmadan hemen önce 7) Dinlendirin: 5 dk bekleyin, sonra kesin!\n🌍 7 GOLDEN RULES OF THE GRILL MASTER\n1) Use oak charcoal 2) Let coals turn fully white 3) Clean the grate 4) Let meat near room temp 5) Don't flip constantly — flip once 6) Salt just before the fire 7) Rest 5 minutes, then cut!\n\n🇮🇷 ۷ قانون طلایی استاد منقل\n۱) ذغال بلوط باشد ۲) ذغال کاملاً سفید شود ۳) سیخ را تمیز کنید ۴) گوشت نزدیک دمای اتاق باشد ۵) مدام برنگردانید — یک بار بچرخانید ۶) نمک را درست قبل از آتش ۷) ۵ دقیقه استراحت، بعد برش!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #mangal #ipucu", "⭐ MÜŞTERİMİZ ANLATIYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\n«20 yıldır bu semtteyiz, Aykan'dan almadığım gün etin tadı değişiyor!» — Zeytinburnu, Topkapı & Bakırköy mahallesinden müştah bir komşumuz. Siz de deneyin, farkı sofranızda hissedin. 🥩\n🌍 OUR CUSTOMER SPEAKS\n\"We've been in this neighbourhood for 20 years — on days I don't buy from Aykan, the meal just isn't the same!\" — a happy neighbour from Zeytinburnu, Topkapı & Bakırköy. Try it and taste the difference. 🥩\n\n🇮🇷 مشتری ما می‌گوید\n«بیست سال است در این محله هستیم، روزهایی که از آیکان نمی‌گیرم طعم غذا فرق می‌کند!» — همسایه خوشحالی از زیتون‌بورنو، توپکاپی و باکیرکوی. شما هم امتحان کنید و تفاوت را بچشید. 🥩\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #müşteri #güven", "🥩 DANA ANTRİKOT\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔥 TREND / GÜNDEM\n\nRestoran kalitesinde antrikot — 1.100 TL/Kg. Mangal için en iyisi, Bağcılar (Göztepe) ustalarının tercihi!\n🌍 BEEF RIBEYE\nRestaurant-quality ribeye — 1,100 TL/kg. The best for BBQ — the choice of grill masters in Bağcılar (Göztepe)!\n\n🇮🇷 آنترکوت گوساله\nآنترکوت با کیفیت رستوران — ۱۱۰۰ لیر/کیلو. بهترین برای منقل — انتخاب استادهای باجیلار (گوزتپه)!\n\n📍 Bağcılar (Göztepe) | باجیلار (گوزتپه)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bağcılar #antrikot", "🩸 DEMİR EKSİKLER MİSİNİZ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ❤️ SAĞLIK\n\nYorgunluk, halsizlik, çabuk yorulma... Sebep demir eksikliği olabilir! Dana eti, vücudun en kolay emdiği 'hem demiri' içerir. Ispanaklı demirin emilimi %5 iken etteki demirin emilimi %25'tir.\n🌍 LOW ON IRON?\nFatigue, weakness, tiredness... It might be iron deficiency! Beef contains 'heme iron', the easiest form for your body to absorb — while spinach iron absorbs at ~5%, beef iron absorbs at ~25%.\n\n🇮🇷 کم‌خون هستید؟\nخستگی، بی‌حالی، زود فرسودگی... ممکن است کمبود آهن باشد! گوشت گوساله «آهن هِم» دارد که راحت‌ترین شکل جذب برای بدن است — جذب آهن اسفناج حدود ٪۵ ولی جذب آهن گوشت حدود ٪۲۵ است.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güneşli #demir #sağlık", "🧪 PROTEİN BİLİMİ: KAS İÇİN ETİN YERİ TUTULMAZ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🔬 BİLİM\n\n100 gr dana kuşbaşı = ~26 gr tam protein (vücudun ihtiyaç duyduğu tüm esansiyel amino asitlerle). Spor bilimciler kas onarımı için antrenmandan sonra 25-40 gr protein öneriyor.\n🌍 PROTEIN SCIENCE: NOTHING REPLACES MEAT\n100 g of beef cubes = ~26 g of complete protein with ALL essential amino acids. Sports scientists recommend 25-40 g protein after training for muscle repair.\n\n🇮🇷 علم پروتئین: جایگزین گوشت برای عضله وجود ندارد\n۱۰۰ گرم کوپه گوساله = حدود ۲۶ گرم پروتئین کامل با تمام آمینواسیدهای ضروری. دانشمندان ورزشی برای ترمیم عضله بعد از تمرین ۲۵ تا ۴۰ گرم پروتئین توصیه می‌کنند.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #mahmutbey #protein #bilim", "🧾 TOPTANCIYA MI ALIYORSUNUZ? BU HESAP SİZİ İLGİLENDİRİYOR\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 📊 PAZAR & FİYAT ANALİZİ\n\nRestoran/otel/catering iseniz: 15 kurumsal paketimizde %10'a varan indirim + günlük taze sevkiyat + kurumsal fatura var. Bu bottan 🏢 B2B Toptan'a dokunun, size özel paket çıkaralım.\n🌍 BUYING WHOLESALE? THIS ONE'S FOR YOU\nRestaurant/hotel/catering: our 15 corporate packages offer up to 10% off + fresh daily delivery + corporate invoicing. Tap 🏢 B2B in this bot for your custom package.\n\n🇮🇷 خرید عمده می‌کنید؟ این پست برای شماست\nرستوران/هتل/کیترینگ هستید؟ ۱۵ پکیج سازمانی ما تا ٪۱۰ تخفیف + ارسال تازه روزانه + فاکتور رسمی دارد. در همین ربات دکمه 🏢 عمده را بزنید تا پکیج اختصاصی شما را بدهیم.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #esenler #toptan #b2b", "🍲 KASAPTAN SOFRAYA: DANA KUŞBAŞI GÜVEÇ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🍳 TARİF\n\nMalzemeler: 750 gr kuşbaşı, 2 soğan, 3 domates, biber, kekik. Kuşbaşı zırhta değil kuşbaşı kesimde! Etinizi bizden alın, evde güvece atın — 2 saat sonra misafirleriniz ayakta alkışlıyor.\n🌍 FROM BUTCHER TO TABLE: BEEF GÜVEÇ STEW\nIngredients: 750 g cubes, 2 onions, 3 tomatoes, peppers, thyme. Get your cubes from us, throw them in a clay pot — 2 hours later your guests applaud.\n\n🇮🇷 از قصاب تا سفره: خورشت کوپه گوساله\nمواد لازم: ۷۵۰ گرم کوپه، ۲ پیاز، ۳ گوجه، فلفل، آویشن. کوپه‌تان را از ما بگیرید و در دیگ سنگی بریزید — دو ساعت بعد مهمان‌های شما کف می‌زنند!\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #başakşehir #tarif #güveç", "⚖️ ZIRHTA ÇEKME NEDEN ÖNEMLİ?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🥩 KASAP REHBERİ\n\nKasap kıyması ile hazır kıyma aynı şey değildir! Zırhta çekilen kıyma tek parça ettir, katkı ve 'ne olduğu belirsiz' karışım yok. İstediğiniz yağ oranında, gözünüzün önünde çekiyoruz.\n🌍 WHY STONE-GROUND MINCE MATTERS\nButcher mince and packaged mince are NOT the same! Stone-ground mince comes from a single cut — no additives, no mystery blends. We grind to your preferred fat ratio, right in front of you.\n\n🇮🇷 چرا چرخ‌کردن سنگی مهم است؟\nگوشت چرخ‌کرده قصابی با گوشت چرخ‌کرده بسته‌بندی یکی نیست! چرخ‌شده سنگی از یک تکه گوشت است — بدون افزودنی و بدون ترکیب مرموز. با نسبت چربی دلخواه شما، جلوی چشمتان چرخ می‌کنیم.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #bahçelievler #kıyma #kalite", "🔬 SOĞUK ZİNCİR NEDEN KRİTİK?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🧊 GIDA GÜVENLİĞİ\n\nEt, kesimden tezgaha kadar 0-4°C'de kalmalı. Zincir kırılırsa bakteriler 20 dakikada ikiye bölünür! Bizim tezgahta soğuk zincir hiç kırılmaz — kasaplık ciddi iştir.\n🌍 WHY THE COLD CHAIN IS CRITICAL\nMeat must stay at 0-4°C from butchering to counter. If the chain breaks, bacteria double every 20 minutes! At our counter the cold chain never breaks — butchery is serious business.\n\n🇮🇷 چرا زنجیره سرد حیاتی است؟\nگوشت باید از ذبح تا ویترین در ۰ تا ۴ درجه بماند. اگر زنجیره بشکند، باکتری‌ها هر ۲۰ دقیقه دوبرابر می‌شوند! در ویترین ما زنجیره سرد هرگز نمی‌شکند — قصابی کار جدی است.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #güngören #soğukzincir #hijyen", "👶 ÇOCUKLARDA ETİN ROLÜ: BÜYÜME VE ZEKÂ\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 💪 BESLENME\n\nPediatristlere göre büyüme çağındaki çocuklarda B12, demir ve çinko eksikliği öğrenme kapasitesini düşürüyor. Haftada 2-3 kez kaliteli kıyma/kuşbaşı içeren beslenme, okul başarısını destekliyor.\n🌍 MEAT IN CHILDHOOD: GROWTH & BRAIN\nPediatricians note that B12, iron and zinc deficiency in growing children reduces learning capacity. Quality mince/cubes 2-3 times a week supports school success.\n\n🇮🇷 نقش گوشت در کودکان: رشد و هوش\nطبق نظر متخصصان کودکان، کمبود B12 و آهن و روی در سن رشد، توان یادگیری را کم می‌کند. ۲ تا ۳ بار در هفته گوشت مرغوب، موفقیت درس را تقویت می‌کند.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #halkalı #çocuk #beslenme", "🧺 PİKNİK SEPETİNİZ HAZIR MI?\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 🏕️ MANGAL İPUÇLARI\n\nHafta sonu planı yapan Gaziosmanpaşa & Sultangazi komşuları: marine tavuk, hazır köfte harmanı, meşe kömürü ve ekmek — hepsi tek pakette, yol üstü şubemizden hazır alın!\n🌍 IS YOUR PICNIC BASKET READY?\nFor Gaziosmanpaşa & Sultangazi neighbours planning the weekend: marinated chicken, ready meatball mix, oak charcoal and bread — all in one pack, grab it ready from our branch on your way!\n\n🇮🇷 سبد پیک‌نیک‌تان آماده است؟\nبرای همسایگان قاضی‌عثمان‌پاشا و سلطان‌قاضی که برنامه آخر هفته دارند: مرغ مارین، مخلوط آماده کوفته، ذغال بلوط و نان — همه در یک پکیج، از شعبه در مسیر، آماده تحویل!\n\n📍 Gaziosmanpaşa & Sultangazi | قاضی‌عثمان‌پاشا و سلطان‌قاضی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #gaziosmanpaşa #piknik #mangal", "🐟 TEZGAHIMIZDA YENİ SEZON!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🗓 ⭐ MÜŞTERİ & MARKA\n\nEt • Balık • Tavuk • Kuzu — tek adreste! Bu sezon tezgahımıza günlük taze balık da geldikçe ekliyoruz. Zeytinburnu, Topkapı & Bakırköy bölgesinde akşam yemeğini bizden çıkar, eve hazırlanmış götür!\n🌍 NEW SEASON AT OUR COUNTER!\nBeef • Fish • Chicken • Lamb — one address! This season we keep adding fresh daily fish to our counter. In Zeytinburnu, Topkapı & Bakırköy, pick up dinner from us — ready to cook!\n\n🇮🇷 فصل جدید در ویترین ما!\nگوساله • ماهی • مرغ • بره — در یک آدرس! این فصل ماهی تازه روزانه هم به ویترین ما اضافه می‌شود. در زیتون‌بورنو، توپکاپی و باکیرکوی، شام را از ما ببرید — آماده پخت!\n\n📍 Zeytinburnu, Topkapı & Bakırköy | زیتون‌بورنو، توپکاپی و باکیرکوی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#et #mangal #kasap #aykanetmangal #zeytinburnu #sezon #tazelik"], "OFFERS": ["🎁 GÜNÜN ÖZEL FIRSATI — Perşembe!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Dana Kuşbaşı / Kıyma\n💰 Bugün: 699 TL (normal 750 TL — %7 indirim!)\n🥩 Gün boyu geçerli — istediğiniz gramajda, zırhta gözünüzün önünde çekim\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Dana Kuşbaşı / Kıyma — TODAY ONLY: 699 TL instead of 750 TL (%7 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Dana Kuşbaşı / Kıyma — فقط امروز: 699 لیر به‌جای 750 لیر (٪٪7 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Bağcılar (Güneşli & Basın Ekspres) | باجیلار (گونشلی و باسین اکسپرس)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#gününFırsatı #kampanya #indirim #güneşli", "🎁 GÜNÜN ÖZEL FIRSATI — Cuma!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Kuzu Pirzola\n💰 Bugün: 1.249 TL (normal 1.399 TL — %11 indirim!)\n🥩 Misafir sofralarının yıldızı — bugün serbest porsiyon kesim\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Kuzu Pirzola — TODAY ONLY: 1.249 TL instead of 1.399 TL (%11 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Kuzu Pirzola — فقط امروز: 1.249 لیر به‌جای 1.399 لیر (٪٪11 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Bağcılar (Mahmutbey & İSTOÇ) | باجیلار (محمودبی و ایستوچ)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#gününFırsatı #kampanya #indirim #mahmutbey", "🎁 GÜNÜN ÖZEL FIRSATI — Cumartesi!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Viral Tortilla Kebabı (10 dk)\n💰 Bugün: 329 TL (normal 399 TL — %18 indirim!)\n🥩 Sosyal medyanın gündemi — 10 dakikada hazır, günlük sınırlı adet!\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Viral Tortilla Kebabı (10 dk) — TODAY ONLY: 329 TL instead of 399 TL (%18 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Viral Tortilla Kebabı (10 dk) — فقط امروز: 329 لیر به‌جای 399 لیر (٪٪18 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Esenler (Kemer) | اسنلر (کمر)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#gününFırsatı #kampanya #indirim #esenler", "🎁 GÜNÜN ÖZEL FIRSATI — Pazar!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Dana Antrikot\n💰 Bugün: 999 TL (normal 1.100 TL — %9 indirim!)\n🥩 Mangal geceleri için restoran kalitesinde antrikot\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Dana Antrikot — TODAY ONLY: 999 TL instead of 1.100 TL (%9 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Dana Antrikot — فقط امروز: 999 لیر به‌جای 1.100 لیر (٪٪9 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Başakşehir & İkitelli | باشاک‌شهیر و ایکی‌تلی\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#gününFırsatı #kampanya #indirim #başakşehir", "🎁 GÜNÜN ÖZEL FIRSATI — Pazartesi!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Haftalık Aile Et Kutusu\n💰 Bugün: 1.299 TL (normal 1.472 TL — %12 indirim!)\n🥩 Ailenin haftalık et ihtiyacı tek kutuda: kıyma + kuşbaşı + tavuk\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Haftalık Aile Et Kutusu — TODAY ONLY: 1.299 TL instead of 1.472 TL (%12 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Haftalık Aile Et Kutusu — فقط امروز: 1.299 لیر به‌جای 1.472 لیر (٪٪12 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Bahçelievler & Şirinevler | باهچه‌لی‌اولر و شیرین‌اولر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#gününFırsatı #kampanya #indirim #bahçelievler", "🎁 GÜNÜN ÖZEL FIRSATI — Salı!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Dana Kemikli Et\n💰 Bugün: 595 TL (normal 650 TL — %8 indirim!)\n🥩 Çorba ve yahninin lezzet sırrı — gün boyu geçerli\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Dana Kemikli Et — TODAY ONLY: 595 TL instead of 650 TL (%8 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Dana Kemikli Et — فقط امروز: 595 لیر به‌جای 650 لیر (٪٪8 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Güngören & Merter | گونگورن و مرتر\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#gününFırsatı #kampanya #indirim #güngören", "🎁 GÜNÜN ÖZEL FIRSATI — Çarşamba!\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔥 Hafta Sonu Mangal Paketi\n💰 Bugün: 898 TL (normal 998 TL — %10 indirim!)\n🥩 1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + meşe kömürü + özel sos\n\n⏰ Sadece BUGÜN geçerli — sipariş için bu bottan yazın veya 0537 732 52 69!\n\n🌍 EN: 🔥 Hafta Sonu Mangal Paketi — TODAY ONLY: 898 TL instead of 998 TL (%10 off)!\n⏰ Order via this bot or 0537 732 52 69.\n\n🇮🇷 FA: 🔥 Hafta Sonu Mangal Paketi — فقط امروز: 898 لیر به‌جای 998 لیر (٪٪10 تخفیف)!\n⏰ سفارش از همین ربات یا ۰۵۳۷ ۷۳۲ ۵۲ ۶۹.\n\n📍 Küçükçekmece (Halkalı & Sefaköy) | کوچوک‌چکمجه (حلالی و صفاکوی)\n📞 0537 732 52 69 | ✈️ @Aykan_Et_mangal_shopping_bot\n#gününFırsatı #kampanya #indirim #halkalı"], "PACKAGE_CATALOG": {"Big Restaurant": [{"code": "RESTO-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Usta Ekonomi Paketi", "nameFa": "پکیج اقتصادی استاد", "discount": 4, "minKg": 60, "minLabel": "60 Kg/hafta", "blend": 700, "items": [["Dana Kuşbaşı / Özel Çekim Kıyma", "Kg", 720], ["Dana Kemikli Et", "Kg", 625], ["Toptan Tavuk (But / Kanat)", "Kg", 115]], "delivery": "Haftada 3 gün sevkiyat (Pzt – Çar – Cum)", "payment": "Haftalık nakit / kart", "extras": "Ücretsiz zırh çekimi + memnun kalmazsanız iade garantisi", "targetFa": "کباب‌خانه‌ها و ocakbaşıهای کوچک با خرید ۶۰ تا ۱۰۰ کیلو در هفته", "whyFa": "حجم هفتگی شما برای شروع همکاری بدون ریسک مناسب است — تخفیف ۴٪ + ارسال ۳ روز در هفته"}, {"code": "RESTO-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Ocakbaşı & Kebap Standart Paketi", "nameFa": "پکیج استاندارد اوچاق‌باشی و کباب", "discount": 7, "minKg": 100, "minLabel": "100 Kg/hafta", "blend": 790, "items": [["Dana Kuşbaşı", "Kg", 700], ["Kuzu Kuşbaşı", "Kg", 995], ["Dana Antrikot", "Kg", 1025], ["Dana Kemikli Et", "Kg", 605]], "delivery": "Her sabah günlük taze sevkiyat (07:00'a kadar)", "payment": "Haftalık ödeme + kurumsal fatura", "extras": "Her teslimde 5 Kg birinci sınıf meşe mangal kömürü HEDİYE", "targetFa": "رستوران‌های متوسط کبابی و پیده با خرید ۱۰۰ تا ۱۵۰ کیلو در هفته", "whyFa": "حجم هفتگی شما در رده استاندارد است — تخفیف ۷٪، ارسال روزانه تازه و ذغال هدیه"}, {"code": "RESTO-PRO", "tier": "Premium", "tierFa": "پریمیوم", "name": "Şef Premium / Saray Paketi", "nameFa": "پکیج پریمیوم سرآشپز و سلطنتی", "discount": 10, "minKg": 150, "minLabel": "150 Kg/hafta", "blend": 940, "items": [["Dana Antrikot", "Kg", 990], ["Kuzu Pirzola", "Kg", 1259], ["Kuzu Et", "Kg", 962], ["Dana Kuşbaşı", "Kg", 675]], "delivery": "Günlük ÇİFT sevkiyat + soğuk zincir araç", "payment": "30 gün vadeli kurumsal ödeme", "extras": "Şef'e ücretsiz numune seti + VIP müşteri hattı + sınırsız meşe kömürü hediye", "targetFa": "رستوران‌های بزرگ، استیک‌هاوس و ocakbaşıهای سلطنتی با خرید +۱۵۰ کیلو در هفته", "whyFa": "حجم بالای خرید و منوی انترکوت/پیرولا شما — حداکثر سود با ۱۰٪ تخفیف و پرداخت ۳۰ روزه"}], "Ordinary Fast Food": [{"code": "FAST-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Dönerci & Köftecı Başlangıç Paketi", "nameFa": "پکیج شروع دونر و کوفته", "discount": 4, "minKg": 40, "minLabel": "40 Kg/hafta", "blend": 640, "items": [["Özel Çekim Kıyma (düşük yağ)", "Kg", 720], ["Dana Kemikli Et", "Kg", 625], ["Toptan Tavuk", "Kg", 112]], "delivery": "Haftada 3 gün sevkiyat", "payment": "Nakit / haftalık", "extras": "İstediğiniz gramajda ücretsiz öğütme (köfte / burger)", "targetFa": "بوفه‌ها، دونر و کوفته‌فروشی‌های کوچک با خرید ۴۰ تا ۷۰ کیلو در هفته", "whyFa": "برای شروع همکاری کم‌ریسک — تخفیف ۴٪ و آسیاب رایگان گوشت به گرم دلخواه شما"}, {"code": "FAST-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Kasap Burger & Döner Standart Paketi", "nameFa": "پکیج استاندارد برگر و دونر قصابی", "discount": 7, "minKg": 70, "minLabel": "70 Kg/hafta", "blend": 680, "items": [["Özel Çekim Kıyma", "Kg", 700], ["Dana Kuşbaşı", "Kg", 700], ["Dana Kemikli Et", "Kg", 605], ["Toptan Tavuk", "Kg", 108]], "delivery": "Her sabah günlük sevkiyat", "payment": "Haftalık ödeme + fiş/fatura", "extras": "Döner yaprak özel kesim + burger sosu hediyesi", "targetFa": "فست‌فودهای متوسط برگر، دونر و تانتونی با خرید ۷۰ تا ۱۰۵ کیلو در هفته", "whyFa": "حجم هفتگی شما استاندارد است — تخفیف ۷٪ با ارسال روزانه و برش اختصاصی دونر"}, {"code": "FAST-PRO", "tier": "Premium", "tierFa": "پریمیوم", "name": "Zincir & Şube Ağı Pro Paketi", "nameFa": "پکیج حرفه‌ای زنجیره و چند شعبه", "discount": 10, "minKg": 110, "minLabel": "110 Kg/hafta", "blend": 730, "items": [["Özel Çekim Kıyma", "Kg", 675], ["Dana Kuşbaşı", "Kg", 675], ["Dana Kemikli Et", "Kg", 585], ["Toptan Tavuk", "Kg", 102]], "delivery": "Günlük ÇİFT sevkiyat (sabah + akşam servise özel)", "payment": "15 gün vadeli ödeme", "extras": "Şube bazlı özel gramaj + ücretsiz teslim + açılış kampanya desteği", "targetFa": "فست‌فودهای شلوغ و زنجیره‌ای با خرید بالای ۱۱۰ کیلو در هفته", "whyFa": "شلوغی و حجم بالای فروش شما — ۱۰٪ تخفیف، دو ارسال در روز و پرداخت ۱۵ روزه"}], "Hotel": [{"code": "HOTEL-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Otel Kahvaltı & Tabldot Paketi", "nameFa": "پکیج صبحانه و تابل‌دو هتل", "discount": 5, "minKg": 100, "minLabel": "100 Kg/hafta", "blend": 630, "items": [["Dana Kemikli Et (çorba/sulu yemek)", "Kg", 617], ["Özel Çekim Kıyma", "Kg", 712], ["Toptan Tavuk", "Kg", 110]], "delivery": "Her sabah 06:00'ya kadar soğuk zincir sevkiyat", "payment": "Haftalık ödeme + kurumsal fatura", "extras": "HACCP uyumlu sevkiyat etiketi + numune test raporu", "targetFa": "هتل‌های کوچک و اقامتگاه‌ها با خرید ۱۰۰ تا ۱۴۰ کیلو در هفته", "whyFa": "منوی صبحانه و تابل‌دوت شما — تخفیف ۵٪ با اسناد بهداشتی و فاکتور رسمی"}, {"code": "HOTEL-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Otel Mutfak Standart Paketi", "nameFa": "پکیج استاندارد آشپزخانه هتل", "discount": 8, "minKg": 140, "minLabel": "140 Kg/hafta", "blend": 780, "items": [["Dana Kuşbaşı", "Kg", 690], ["Kuzu Et", "Kg", 985], ["Dana Kemikli Et", "Kg", 598], ["Toptan Tavuk", "Kg", 105]], "delivery": "Günlük sabah soğuk zincir sevkiyatı", "payment": "15 gün vadeli kurumsal ödeme", "extras": "Bufe için özel porsiyon kesim + şef ile menü planlama desteği", "targetFa": "هتل‌های ۳ و ۴ ستاره با خرید ۱۴۰ تا ۱۸۰ کیلو در هفته", "whyFa": "حجم آشپزخانه هتل شما — تخفیف ۸٪، برش پورسینی اختصاصی و پرداخت ۱۵ روزه"}, {"code": "HOTEL-PRO", "tier": "Premium", "tierFa": "پریمیوم", "name": "Grand Otel & Konvansiyon Pro Paketi", "nameFa": "پکیج حرفه‌ای هتل بزرگ و کنوانسیون", "discount": 10, "minKg": 180, "minLabel": "180 Kg/hafta", "blend": 930, "items": [["Dana Antrikot", "Kg", 990], ["Kuzu Pirzola", "Kg", 1259], ["Kuzu Et", "Kg", 962], ["Dana Kuşbaşı", "Kg", 675]], "delivery": "Günlük çift sevkiyat + hafta sonu acil (emergency) desteği", "payment": "30 gün vadeli kurumsal ödeme", "extras": "Şef'e ücretsiz numune seti + banquet/kongre öncelikli kapasite rezervasyonu", "targetFa": "هتل‌های ۵ ستاره و کنوانسیون با خرید بالای ۱۸۰ کیلو در هفته", "whyFa": "عظمت هتل و بنکِت‌های شما — ۱۰٪ تخفیف، رزرو ظرفیت اولویت‌دار و پرداخت ۳۰ روزه"}], "Catering": [{"code": "CATER-ECO", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Esnaf Tabldot Paketi", "nameFa": "پکیج تابل‌دوی اصناف", "discount": 6, "minKg": 150, "minLabel": "150 Kg/hafta", "blend": 620, "items": [["Dana Kemikli Et", "Kg", 611], ["Özel Çekim Kıyma", "Kg", 705], ["Toptan Tavuk", "Kg", 108]], "delivery": "Günlük sabah sevkiyatı", "payment": "Haftalık ödeme", "extras": "Acil (son dakika) siparişlerde aynı gün sevkiyat desteği", "targetFa": "تالارهای کوچک و آشپزخانه‌های اصناف با خرید ۱۵۰ تا ۲۲۰ کیلو در هفته", "whyFa": "برای تابل‌دوی روزانه — تخفیف ۶٪ و پشتیبانی سفارش‌های فوری"}, {"code": "CATER-STD", "tier": "Standart", "tierFa": "استاندارد", "name": "Fabrika & Toplu Yemek Standart Paketi", "nameFa": "پکیج استاندارد کارخانه و غذای جمعی", "discount": 8, "minKg": 220, "minLabel": "220 Kg/hafta", "blend": 655, "items": [["Dana Kemikli Et", "Kg", 598], ["Özel Çekim Kıyma", "Kg", 690], ["Dana Kuşbaşı", "Kg", 690]], "delivery": "Günlük sabah 06:00'ya kadar teslim (vardiya başına)", "payment": "15 gün vadeli kurumsal ödeme", "extras": "Personel yemeği için maliyet düşürücü karışım planlaması (kasap mühendisliği)", "targetFa": "کیترینگ‌های صنعتی و کارخانه‌ای با خرید ۲۲۰ تا ۲۹۰ کیلو در هفته", "whyFa": "حجم تولید انبوه شما — تخفیف ۸٪، تحویل قبل از شیفت و برنامه کاهش هزینه"}, {"code": "CATER-MEGA", "tier": "Mega", "tierFa": "مگا", "name": "Düğün & Organizasyon Mega Paketi", "nameFa": "پکیج مگای عروسی و مراسم", "discount": 10, "minKg": 280, "minLabel": "280 Kg/hafta", "blend": 690, "items": [["Dana Kemikli Et", "Kg", 585], ["Özel Çekim Kıyma", "Kg", 675], ["Kuzu Et", "Kg", 962], ["Dana Kuşbaşı", "Kg", 675]], "delivery": "Günlük + hafta sonu organizasyon sevkiyatı (gece dahil)", "payment": "30 gün vade + SEZON FİYATI KİLİTLEME", "extras": "Ramazan / düğün sezonu öncelikli kapasite rezervasyonu + organizasyon günü yedek araç", "targetFa": "تالارهای عروسی، مراسم و کیترینگ‌های بزرگ با خرید بالای ۲۸۰ کیلو در هفته", "whyFa": "حجم عظیم مراسم‌های شما — ۱۰٪ تخفیف، قفل قیمت فصلی و رزرو اولویت‌دار رمضان"}], "Ordinary People": [{"code": "FAMILY-START", "tier": "Ekonomi", "tierFa": "اقتصادی", "name": "Komşu Aile Haftalık Sepeti", "nameFa": "سبد هفتگی خانواده همسایه", "discount": 3, "minKg": 8, "minLabel": "8 Kg / aile", "blend": 760, "items": [["Dana Kuşbaşı / Kıyma (tanzim + %3)", "Kg", 727], ["Dana Kemikli Et (tanzim + %3)", "Kg", 630], ["Tavuk Çeşitleri", "Kg", 118]], "delivery": "Mağazadan gel-al + WhatsApp sipariş ile hazırlık", "payment": "Nakit / kart", "extras": "Her alışverişte mangal kömürü indirim kuponu", "targetFa": "خانواده‌ها و گروه‌های همسایگی با خرید جمعی هفتگی", "whyFa": "شروع همکاری محله‌ای — ۳٪ تخفیف تنظیمی و سبد هفتگی آماده"}, {"code": "FAMILY-MANGAL", "tier": "Popüler", "tierFa": "محبوب", "name": "Hafta Sonu Mangal Keyfi Paketi", "nameFa": "پکیج لذت منقل آخر هفته", "discount": 5, "minKg": 10, "minLabel": "1 mangal paketi / aile", "blend": 840, "items": [["Aykan Özel Mangal Paketi (1 Kg köfte/kuşbaşı + 1 Kg marine tavuk + kömür + sos)", "Paket", 998], ["10 Dakikada Hazır Viral Tortilla Kebabı", "Porsiyon", 399], ["Haftalık Tanzim Aile Et Kutusu", "Kutu", 1472]], "delivery": "Cumartesi sabahı toplu teslimat", "payment": "Nakit / kart", "extras": "Marinasyon hediye + 10 dakikada hazır viral Tortilla Kebabı", "targetFa": "گروه‌های پیک‌نیک و منقل‌دوستان آخر هفته", "whyFa": "برای منقل آخر هفته — پکیج ویژه ۹۹۸ لیر بجای ۱۰۵۰ لیر (۵٪ تخفیف گروهی)"}, {"code": "FAMILY-SITE", "tier": "Grup Lideri", "tierFa": "لیدر گروه", "name": "Site & WhatsApp Grup İndirim Paketi", "nameFa": "پکیج تخفیف مجتمع و گروه واتساپ", "discount": 8, "minKg": 60, "minLabel": "60 Kg / grup toplamı", "blend": 710, "items": [["Dana Kuşbaşı (site indirimi)", "Kg", 690], ["Özel Çekim Kıyma (site indirimi)", "Kg", 690], ["Dana Kemikli Et (site indirimi)", "Kg", 598], ["Hafta Sonu Mangal Paketi", "Adet", 998]], "delivery": "Haftada 1 gün siteye ÜCRETSİZ toplu teslimat", "payment": "Grup lideri toplu ödeme", "extras": "Site yönetimine her 500 Kg'da 1 adet mangal seti HEDİYE", "targetFa": "مدیریت مجتمع‌های مسکونی بزرگ و گروه‌های واتساپ", "whyFa": "قدرت خرید جمعی مجموعه شما — ۸٪ تخفیف و تحویل رایگان درب مجتمع"}]}, "CAT_TR": {"Big Restaurant": "Restoran / Kebapçı", "Ordinary Fast Food": "Fast Food / Döner", "Hotel": "Otel", "Catering": "Catering / Fabrika", "Ordinary People": "Site & Aile Grubu"}, "LANG_NAMES": {"tr": "🇹🇷 Türkçe", "en": "🇬🇧 English", "ar": "🇸🇦 العربية"}, "AREAS": [{"tr": "Bağcılar (Göztepe)", "fa": "باجیلار (گوزتپه)", "tags": "#bağcılar #göztepe #bağcılaret", "ar": "باغجيلار (غوزتبه)"}, {"tr": "Bağcılar (Güneşli & Basın Ekspres)", "fa": "باجیلار (گونشلی و باسین اکسپرس)", "tags": "#güneşli #basınEkspres", "ar": "باغجيلار (غونيشلي وباسين إكسبريس)"}, {"tr": "Bağcılar (Mahmutbey & İSTOÇ)", "fa": "باجیلار (محمودبی و ایستوچ)", "tags": "#mahmutbey #istoç", "ar": "باغجيلار (محمودبي وإيستوچ)"}, {"tr": "Esenler (Kemer)", "fa": "اسنلر (کمر)", "tags": "#esenler #kemer #esenleret", "ar": "إسنلر (كمر)"}, {"tr": "Başakşehir & İkitelli", "fa": "باشاک‌شهیر و ایکی‌تلی", "tags": "#başakşehir #ikitelli", "ar": "باشاك شهير وإيكيتيلي"}, {"tr": "Bahçelievler & Şirinevler", "fa": "باهچه‌لی‌اولر و شیرین‌اولر", "tags": "#bahçelievler #şirinevler", "ar": "باهتشلي أفلر وشيرين أفلر"}, {"tr": "Güngören & Merter", "fa": "گونگورن و مرتر", "tags": "#güngören #merter", "ar": "غونغورن ومرتر"}, {"tr": "Küçükçekmece (Halkalı & Sefaköy)", "fa": "کوچوک‌چکمجه (حلالی و صفاکوی)", "tags": "#halkalı #sefaköy", "ar": "كوتشوك تشكمجه (هالكالي وصفاكوي)"}, {"tr": "Gaziosmanpaşa & Sultangazi", "fa": "قاضی‌عثمان‌پاشا و سلطان‌قاضی", "tags": "#gaziosmanpaşa #sultangazi", "ar": "غازي عثمان باشا وسلطان غازي"}, {"tr": "Zeytinburnu, Topkapı & Bakırköy", "fa": "زیتون‌بورنو، توپکاپی و باکیرکوی", "tags": "#zeytinburnu #topkapı #bakırköy", "ar": "زيتون بورنو وتوبكابي وباكيركوي"}], "AREA_NAMES_TR": ["Bağcılar (Göztepe)", "Bağcılar (Güneşli & Basın Ekspres)", "Bağcılar (Mahmutbey & İSTOÇ)", "Esenler (Kemer)", "Başakşehir & İkitelli", "Bahçelievler & Şirinevler", "Güngören & Merter", "Küçükçekmece (Halkalı & Sefaköy)", "Gaziosmanpaşa & Sultangazi", "Zeytinburnu, Topkapı & Bakırköy"], "CAT_FA2": {"Big Restaurant": "🥩 رستوران بزرگ", "Ordinary Fast Food": "🍔 فست‌فود و دونر", "Hotel": "🏨 هتل", "Catering": "🍲 کیترینگ و کارخانه", "Ordinary People": "👨‍👩‍👧‍👦 مجتمع و گروه محلی", "Investment Leader": "💼 سرمایه‌گذاری و تکنوپارک"}, "POSTS_META": [{"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}, {"badge": "🔥 TREND / GÜNDEM", "area": "Bağcılar (Göztepe)"}, {"badge": "❤️ SAĞLIK", "area": "Bağcılar (Güneşli & Basın Ekspres)"}, {"badge": "🔬 BİLİM", "area": "Bağcılar (Mahmutbey & İSTOÇ)"}, {"badge": "📊 PAZAR & FİYAT ANALİZİ", "area": "Esenler (Kemer)"}, {"badge": "🍳 TARİF", "area": "Başakşehir & İkitelli"}, {"badge": "🥩 KASAP REHBERİ", "area": "Bahçelievler & Şirinevler"}, {"badge": "🧊 GIDA GÜVENLİĞİ", "area": "Güngören & Merter"}, {"badge": "💪 BESLENME", "area": "Küçükçekmece (Halkalı & Sefaköy)"}, {"badge": "🏕️ MANGAL İPUÇLARI", "area": "Gaziosmanpaşa & Sultangazi"}, {"badge": "⭐ MÜŞTERİ & MARKA", "area": "Zeytinburnu, Topkapı & Bakırköy"}]};
const PANEL_URL = "https://lively-mouse-0c7c.aykanet34.workers.dev";  // پنل در همین ورکر ادغام شده (v7.6.0)
const PANEL_SECRET = "__PANEL_SECRET__";
var _RFQL = {};  // b2b rfq rate-limit: 10/hour/IP
const HOOK_SECRET = "__HOOK_SECRET__";
const HOOK_PATH = "/hook-__HOOK_SECRET__";
const HOOK_URL = "https://lively-mouse-0c7c.aykanet34.workers.dev/hook-__HOOK_SECRET__";
const ADMIN_PIN = "__ADMIN_PIN__";
const OWNER_WA = "905377325269";
const SITE_URL = "https://lively-mouse-0c7c.aykanet34.workers.dev";
const CHANNEL_URL = "https://t.me/AykanEtmangal_shopping";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Aykan+Et+Mangal+G%C3%B6ztepe+Ba%C4%9Fc%C4%B1lar";
const OFFER_SLOT = "09:00";
const DEFAULT_INTERVAL = 3;
var PHOTOS = {
  kemikli: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/kemikli.jpg",
  kusbasi: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/kusbasi.jpg",
  antrikot: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/antrikot.jpg",
  kuzu: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/kuzu.jpg",
  pirzola: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/pirzola.jpg",
  mangal: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/mangal.jpg",
  tortilla: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/tortilla.jpg",
  aile: "https://lively-mouse-0c7c.aykanet34.workers.dev/assets/foods/aile.jpg"
};
const PDF_URL = "https://lively-mouse-0c7c.aykanet34.workers.dev/brosur/aykan_fiyat_brosuru_baski.pdf";

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
  var d = (DATA.T[lang] || DATA.T.tr)[key];
  if (d === undefined) d = DATA.T.tr[key];
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
    if (lc === "tr" || lc === "en" || lc === "ar") return lc;
  }
  return "tr";
}

// ---------- کیبوردها ----------
function kbLang() {
  return [["tr", "ar", "en"].map(function (c) { return { text: DATA.LANG_NAMES[c], callback_data: "lang:" + c }; })];
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
  var cur = lang === "ar" ? "ليرة" : "TL";
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
const AR_STR = {"\n🚚 ارسال همان روز • 💵 پرداخت درب منزل": "\n🚚 توصيل في نفس اليوم • 💵 الدفع عند الباب", "آخرین سفارش شما در سبد بارگذاری شد:": "تم تحميل آخر طلبك في السلة:", "اشتراک": "مشاركة", "تکرار سفارش": "إعادة الطلب", "شعبه اسنلر — مسیریابی": "فرع إسنلر — الاتجاهات", "شعبه باغجیلار — مسیریابی": "فرع باغجيلار — الاتجاهات", "عملیات فعالی در جریان نیست.": "لا توجد عملية جارية حالياً.", "فعلا موجود نیست:": "غير متوفر حالياً:", "قیمت امروز": "سعر اليوم", "همه قیمت‌ها": "كل الأسعار", "پیشنهاد ویژه امروز:": "عرض اليوم:", "پیشنهاد ویژه شما:": "عرضك الخاص:", "کد را نگه دارید — با /siparislerim پیگیری کنید.": "احتفظ بالرمز — تابع طلبك عبر /siparislerim", "☀️ روز بخیر!": "☀️ نهارك سعيد!", "⚠️ سفارش یافت نشد.": "⚠️ لم يتم العثور على الطلب.", "⚠️ شماره معتبر بنویسید (مثلاً 0537 732 52 69):": "⚠️ اكتب رقماً صحيحاً (مثال: 0537 732 52 69):", "⚠️ شماره معتبر بنویسید:": "⚠️ اكتب رقماً صحيحاً:", "✅ عملیات لغو شد — سبد شما حفظ شد.": "✅ تم إلغاء العملية — سلتك محفوظة.", "❓ سوالات": "❓ الأسئلة", "❓ سوالات پرتکرار\n\n🚚 ارسال: باغجیلار، اسنلر و محله‌های اطراف — در همان روز.\n💵 پرداخت: نقدی / کارت درب منزل.\n🥩 وزن: ۱ کیلو چیغ وزن کرده و می‌پزیم.\n⏰ ساعات: هر روز ۰۸:۰۰–۲۲:۳۰.\n📦 عمده: با /b2b قیمت ویژه.\n💬 سایر سوالات: 0537 732 52 69": "❓ الأسئلة الشائعة\n\n🚚 التوصيل: باغجيلار، إسنلر والمناطق المجاورة — في نفس اليوم.\n💵 الدفع: نقداً / بالبطاقة عند الباب.\n🥩 الوزن: نزن لك الكيلو كاملاً ونطبخه.\n⏰ الساعات: كل يوم 08:00–22:30.\n📦 الجملة: أسعار خاصة عبر /b2b.\n💬 أسئلة أخرى: 0537 732 52 69", "⭐ سفارش خود را امتیاز دهید:": "⭐ قيّم طلبك:", "🌅 صبح بخیر!": "🌅 صباح الخير!", "🌆 عصر بخیر!": "🌆 مساء الخير!", "🌙 شب بخیر!": "🌙 تصبح على خير!", "🌙 فروشگاه الان بسته است (۰۸:۰۰–۲۲:۳۰). سفارش شما هنگام باز شدن آماده می‌شود.": "🌙 المتجر مغلق حالياً (08:00–22:30). سيتم تجهيز طلبك عند الفتح.", "🏠 منوی اصلی": "🏠 القائمة الرئيسية", "💡 پیشنهاد/انتقاد خود را بنویسید — مستقیم به مدیریت می‌رسد:": "💡 اكتب اقتراحك/ملاحظتك — تصل مباشرة إلى الإدارة:", "💡 پیشنهاد: کوزو پیرزولای پخته ۱۵۰۰ لیر — امتحان کردید؟": "💡 اقتراح: ريش الغنم المطبوخة 1500 ليرة/كغ — هل جربتها؟", "💰 قیمت‌های به‌روز ما:": "💰 أسعارنا الحالية:", "💵 پرداخت و تحویل\n\n• نقدی یا کارت درب منزل\n• تحویل در همان روز (باغجیلار، اسنلر و اطراف)\n• حواله برای عمده\n• تضمین وزن — ۱ کیلو چیغ وزن کرده و می‌پزیم": "💵 الدفع والتسليم\n\n• نقداً أو بالبطاقة عند الباب\n• التسليم في نفس اليوم (باغجيلار، إسنلر والمجاورات)\n• حوالة بنكية للجملة\n• ضمان الوزن — نزن الكيلو كاملاً", "📋 سفارش‌های اخیر شما:": "📋 طلباتك الأخيرة:", "📋 سفارش‌های من": "📋 طلباتي", "📋 هنوز سفارشی ندارید — از منو شروع کنید! 🥩": "📋 لا توجد طلبات بعد — ابدأ من القائمة! 🥩", "📌 استفاده: /takip کد_سفارش": "📌 الاستخدام: /takip رمز_الطلب", "📝 فرم خرید هوشمند (وب)": "📝 نموذج الشراء الذكي (ويب)", "🔁 برای بارگذاری آخرین سفارش در سبد، دکمه زیر را بزنید.": "🔁 اضغط الزر أدناه لإعادة تحميل آخر طلب إلى السلة.", "😞 متأسفیم! چه چیزی را بهتر کنیم؟ کوتاه بنویسید:": "😞 نأسف لذلك! ما الذي يمكننا تحسينه؟ اكتب بإيجاز:", "🙏 از امتیاز شما سپاسگزاریم!": "🙏 شكراً على تقييمك!", "🙏 از بازخورد شما سپاسگزاریم — به‌زودی بررسی می‌کنیم!": "🙏 شكراً على ملاحظتك — سنراجعها قريباً!"};
function L(lang, tr, en, fa, ar) { if (lang === "en") return en; if (lang === "ar") return (ar != null ? ar : (AR_STR[fa] != null ? AR_STR[fa] : tr)); return tr; }
var BOT_URL = "https://t.me/Aykan_Et_mangal_shopping_bot";
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
  var cur = lang === "ar" ? "ليرة" : "TL";
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
  await send(env, cid, "📷 https://lively-mouse-0c7c.aykanet34.workers.dev/");
}
function priceListText(lang) {
  var cur = lang === "ar" ? "ليرة" : "TL";
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
      "🚚 مناطق ارسال\n\n" + ((DATA.AREAS || []).map(function (a, i) { return (i + 1) + ". " + (a.fa || ""); }).join("\n")) + "\n\nارسال در همان روز — باغجیلار، اسنلر و محله‌های اطراف.", "🚚 مناطق التوصيل\n\n" + ((DATA.AREAS || []).map(function (a, i) { return (i + 1) + ". " + (a.ar || a.fa || ""); }).join("\n")) + "\n\nتوصيل في نفس اليوم — باغجيلار، إسنلر والمناطق المجاورة."), kbMain(lang));
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
  var cur = lang === "ar" ? "ليرة" : "TL";
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
  var _ih = istanbulNow();
  if (_ih.hh >= 23 || _ih.hh < 8) summary += "\n\n🌙 " + L(lang, "Şu an mesai dışındayız (08:00–22:30) — siparişiniz sabah 08:00'de ilk sıradan hazırlanır.", "We are currently closed (08:00–22:30) — your order is first in line at 08:00.", "اکنون خارج از ساعت کاری هستیم (۰۸:۰۰–۲۲:۳۰) — سفارش شما ساعت ۰۸:۰۰ صبح در اولین نوبت آماده می‌شود.");
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
    await send(env, cid, "🛠 ADMİN KOMUTLARI\n\n🔗 KANAL\n/kanal @x — bağla • /kanalkapat — kes\n/postnow — hemen post • /plan — yayın planı\n/aralik N — saat aralığı • /durdur • /devam\n\n📊 YÖNETİM\n/istatistik — satış/chat/etkinlik\n/siparisler — son 10 sipariş\n/bul KOD — sipariş ara • /rapor — son 24 saat\n/durum KOD MESAJ — müşteriye bildirim\n/duyuru MESAJ — toplu duyuru\n/fiyatguncelle id fiyat — fiyat değiştir (sifirla = geri al)\n/stok id yok|var — stok kapat/aç\n/ping — sistem durumu\n\n🎯 LİDLER\n/lidedefteri — tarayıcı • /bolge N • /yatirim\n\n📡 RADAR\n/trendler — yemek trendleri • /lidyeni — AI restoran lidleri");
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
  if (cmd === "/trendler") {
    var lastR = await getSetting(env, "ai_radar_ts");
    var rsy2 = (lastR && Date.now() - lastR < 10800000) ? { newTrends: 0, newLeads: 0, fetchedTrends: 0, fetchedLeads: 0, fresh: true } : await aiRadarSync(env);
    var trows = [];
    try { trows = (await env.DB.prepare("SELECT category, title, source FROM trend_news ORDER BY id DESC LIMIT 5").all()).results || []; } catch (e) {}
    var tm = "📡 رادار آیکان — آخرین ترندها:\n\n";
    trows.forEach(function (r) { tm += r.category + " | " + String(r.title).slice(0, 70) + " (" + r.source + ")\n"; });
    tm += "\n📊 این دور: " + rsy2.fetchedTrends + " ترند اسکن → " + rsy2.newTrends + " جدید\n🌐 بلاگ سایت هم به‌روز شد.";
    await send(env, cid, tm);
    return;
  }
  if (cmd === "/lidyeni") {
    var lastR3 = await getSetting(env, "ai_radar_ts");
    var rsy3 = (lastR3 && Date.now() - lastR3 < 10800000) ? { newTrends: 0, newLeads: 0, fetchedTrends: 0, fetchedLeads: 0, fresh: true } : await aiRadarSync(env);
    var lrows = [];
    try { lrows = (await env.DB.prepare("SELECT name, area, score, source FROM ai_leads WHERE status='new' ORDER BY score DESC, id DESC LIMIT 8").all()).results || []; } catch (e) {}
    var lm = "🎯 رادار آیکان — لیدهای جدید رستوران‌ها:\n\n";
    lrows.forEach(function (r) { lm += "• " + r.score + " | " + String(r.name).slice(0, 40) + " | " + r.area + " (" + r.source + ")\n"; });
    lm += "\n📊 این دور: " + rsy3.fetchedLeads + " کاندیدا → " + rsy3.newLeads + " جدید\n➕ ثبت در پنل → تب 🤖 AI";
    await send(env, cid, lm);
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
  try { var _tcid = u.message ? u.message.chat.id : (u.callback_query ? u.callback_query.message.chat.id : 0); if (_tcid) { var _t = await getToken(env); if (_t) fetch("https://api.telegram.org/bot" + _t + "/sendChatAction", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chat_id: _tcid, action: "typing" }) }).catch(function () {}); } } catch (e) {}
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
  var adminCmds = ["/kanal", "/channel", "/kanalkapat", "/postnow", "/plan", "/aralik", "/interval", "/durdur", "/pause", "/devam", "/resume", "/lidedefteri", "/lidegonder", "/lidekanal", "/leadschannel", "/lidekanalkapat", "/bolge", "/yatirim", "/istatistik", "/stats", "/duyuru", "/durum", "/ping", "/siparisler", "/fiyatguncelle", "/stok", "/yardim", "/bul", "/rapor", "/trendler", "/lidyeni"];
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
    if (fresh) { try { await tg(env, "sendPhoto", { chat_id: +cid, photo: SITE_URL + "/assets/img0.jpg", caption: "🥩 AYKAN ET & MANGAL — " + L(lang, "Taze her sabah, tartı garantili 🔥", "Fresh every morning, weight-guaranteed 🔥", "هر صبح تازه، با تضمین وزن 🔥") }); } catch (e) {} }
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
    await send(env, +cid, b2bText(lang), [[{ text: tx(lang, "b2b_btn"), callback_data: "b2breq" }], [{ text: L(lang, "📝 Akıllı Satınalma Formu (Web)", "📝 Smart RFQ Form (Web)", "📝 فرم خرید هوشمند (وب)"), url: SITE_URL + "/#b2bform" }], [{ text: "📄 PDF Katalog", url: PDF_URL }, { text: "💬 WhatsApp", url: "https://wa.me/" + OWNER_WA }], [{ text: tx(lang, "home"), callback_data: "home" }]]);
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
    await send(env, +cid, L(lang, "🚚 TESLİMAT BÖLGELERİ\n\n" + an2 + "\n\nGün içinde teslim — Bağcılar, Esenler ve çevre mahalleler.", "🚚 DELIVERY AREAS\n\n" + an2 + "\n\nSame-day delivery.", "🚚 مناطق ارسال\n\n" + ((DATA.AREAS || []).map(function (a, i) { return (i + 1) + ". " + (a.fa || ""); }).join("\n")) + "\n\nارسال در همان روز.", "🚚 مناطق التوصيل\n\n" + ((DATA.AREAS || []).map(function (a, i) { return (i + 1) + ". " + (a.ar || a.fa || ""); }).join("\n")) + "\n\nتوصيل في نفس اليوم."), kbMain(lang));
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
  } else if (low.indexOf("/paylas") === 0 || low.indexOf("/share") === 0) {
    await send(env, +cid, L(lang,
      "📤 AYKAN ET & MANGAL'ı paylaşın:\n\n🥩 Günlük taze kesim • %100 helal\n⚖️ 1 kg çiğ tartılır, pişmiş teslim\n🚚 Aynı gün teslimat\n\nArkadaşlarınızı davet edin — /referansim ile davet linkinizi alın!",
      "📤 Share AYKAN ET & MANGAL:\n\n🥩 Fresh daily cuts • 100% halal\n⚖️ 1 kg raw weighed, cooked delivered\n🚚 Same-day delivery\n\nInvite friends — get your link with /referansim!",
      "📤 آیکان ات و منگال را به اشتراک بگذارید:\n\n🥩 برش تازه روزانه • ۱۰۰٪ حلال\n⚖️ ۱ کیلو چیغ وزن، پخته تحویل\n🚚 تحویل همان روز\n\nدوستان را دعوت کنید — لینک دعوت شما: /referansim"),
      [[{ text: "📤 " + L(lang, "Telegram'da Paylaş", "Share on Telegram", "در تلگرام به اشتراک بگذارید"), url: "https://t.me/share/url?url=" + encodeURIComponent(BOT_URL) + "&text=" + encodeURIComponent("🥩 Aykan Et & Mangal — taze et, hazır mangal paketleri!") }, { text: "💬 WhatsApp", url: "https://wa.me/?text=" + encodeURIComponent("🥩 Aykan Et & Mangal — taze et, hazır mangal paketleri! " + BOT_URL) }], [{ text: tx(lang, "home"), callback_data: "home" }]]);
  } else if (low.indexOf("/sube") === 0) {
    await send(env, +cid, tx(lang, "sube"), kbMain(lang));
  } else {
    await send(env, +cid, tx(lang, "unknown", first), kbMain(lang));
  }
}


// ─── مهارت ۱: منوی دستورات تلگرام (سه‌زبانه) ───
async function setMyCommands(env) {
  var tok = await getToken(env);
  if (!tok) return;
  var base = [
    { command: "start", description: "🥩 Ana menü — 主菜单" },
    { command: "menu", description: "🥩 Menü & fiyatlar" },
    { command: "sepet", description: "🛒 Sepetim" },
    { command: "siparislerim", description: "📦 Siparişlerim" },
    { command: "b2b", description: "🏢 Toptan (B2B)" },
    { command: "gununfiyati", description: "🔥 Günün fırsatı" },
    { command: "teslimat", description: "🚚 Teslimat bölgeleri" },
    { command: "odeme", description: "💵 Ödeme & teslim" },
    { command: "sube", description: "📍 Şubeler" },
    { command: "oneri", description: "💡 Öneri / şikayet" },
    { command: "lang", description: "🌐 Dil / Language" }
  ];
  var loc = {
    tr: base,
    en: [
      { command: "start", description: "🥩 Main menu" },
      { command: "menu", description: "🥩 Menu & prices" },
      { command: "sepet", description: "🛒 My cart" },
      { command: "siparislerim", description: "📦 My orders" },
      { command: "b2b", description: "🏢 Wholesale (B2B)" },
      { command: "gununfiyati", description: "🔥 Today's special" },
      { command: "teslimat", description: "🚚 Delivery areas" },
      { command: "odeme", description: "💵 Payment & delivery" },
      { command: "sube", description: "📍 Branches" },
      { command: "oneri", description: "💡 Suggest / complain" },
      { command: "lang", description: "🌐 Language" }
    ],
    ar: [
      { command: "start", description: "🥩 القائمة الرئيسية" },
      { command: "menu", description: "🥩 القائمة والأسعار" },
      { command: "sepet", description: "🛒 سلتي" },
      { command: "siparislerim", description: "📦 طلباتي" },
      { command: "b2b", description: "🏢 الجملة (B2B)" },
      { command: "gununfiyati", description: "🔥 عرض اليوم" },
      { command: "teslimat", description: "🚚 مناطق التوصيل" },
      { command: "odeme", description: "💵 الدفع والتوصيل" },
      { command: "sube", description: "📍 الفروع" },
      { command: "oneri", description: "💡 اقتراح / شكوى" },
      { command: "lang", description: "🌐 اللغة" }
    ]
  };
  try { await tg(env, "setMyCommands", { commands: base }); } catch (e) {}
  for (var lc in loc) { try { await tg(env, "setMyCommands", { commands: loc[lc], language_code: lc }); } catch (e) {} }
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
    await aiRadarMaybe(env);
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
    if (info.ok && info.result.url === HOOK_URL) { try { await setMyCommands(env); } catch (e) {} return { ok: true, detail: "already" }; }
    var r = await (await fetch("https://api.telegram.org/bot" + tok + "/setWebhook", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: HOOK_URL, secret_token: HOOK_SECRET, allowed_updates: ["message", "callback_query"], drop_pending_updates: false })
    })).json();
    return r;
  } catch (e) { return { ok: false, description: String(e).slice(0, 200) }; }
}

// ---------- روتر ----------
// ---------- رادار AI: ترند غذایی + کاشف لید رستوران ----------
var AI_ZONES = ["Bağcılar", "Esenler", "Başakşehir", "İkitelli", "Bahçelievler", "Şirinevler", "Güngören", "Merter", "Zeytinburnu", "Topkapı", "Bakırköy", "Gaziosmanpaşa", "Sultangazi", "Küçükçekmece", "Halkalı", "Sefaköy", "Esenyurt", "Mahmutbey", "Güneşli"];
var AI_TREND_QUERIES = [
  ["💰 قیمت گوشت", "et fiyatları zam"],
  ["🥩 گوشت قرمز", "kırmızı et üretimi fiyat"],
  ["🔥 منقل", "mangal sezonu trend"],
  ["🍢 کباب", "kebap viral trend"],
  ["🍽 ترند رستوران", "restoran trendleri 2026"],
  ["🍗 مرغ", "tavuk fiyatları"],
  ["🏪 صنعت قصابی", "kasap sektörü yenilik"],
  ["🧊 امنیت غذایی", "gıda güvenliği et helal"]
];
var AI_LEAD_QUERIES = ["restoran açılışı İstanbul", "yeni restoran açıldı Bağcılar", "restoran açılışı Esenler Başakşehir", "kebapçı açılışı İstanbul", "kafe restoran yeni açtı İstanbul Avrupa", "otel restoran açılışı İstanbul", "catering firma açılışı İstanbul"];
function aiUnesc(x) { return String(x || "").replace(/<!\[CDATA\[|\]\]>/g, "").replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(+n); }).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim(); }
function rssParse(xml) {
  var out = [], re = /<item>([\s\S]*?)<\/item>/g, m;
  while ((m = re.exec(xml)) && out.length < 40) {
    var b = m[1];
    var t = aiUnesc((b.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
    var l = aiUnesc((b.match(/<link>([\s\S]*?)<\/link>/) || [])[1]);
    var pd = aiUnesc((b.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1]);
    var sc = aiUnesc((b.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1]) || "Google News";
    if (t && l) out.push({ title: t, url: l, published: pd, source: sc });
  }
  return out;
}
function aiRealUrl(link) {
  var m = String(link).match(/[?&]url=([^&]+)/);
  if (m) { try { return decodeURIComponent(m[1]); } catch (e) {} }
  return link;
}
function aiHost(u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return "Bing News"; } }
async function rssFetchOne(u) {
  try {
    var r = await fetch(u, { headers: { "User-Agent": "AykanBot/1.0" }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) return [];
    var its = rssParse(await r.text());
    its.forEach(function (it) { it.url = aiRealUrl(it.url); if (it.source === "Google News") it.source = aiHost(it.url); });
    return its;
  } catch (e) { return []; }
}
async function rssFetch(q) {
  var b = await rssFetchOne("https://www.bing.com/news/search?q=" + encodeURIComponent(q) + "&mkt=tr-TR&format=RSS");
  if (b.length) return b;
  return await rssFetchOne("https://news.google.com/rss/search?q=" + encodeURIComponent(q) + "&hl=tr&gl=TR&ceid=TR:tr");
}
function aiDaysAgo(pub) { var t = Date.parse(pub || ""); return isFinite(t) ? Math.max(0, Math.floor((Date.now() - t) / 86400000)) : 99; }
function aiHasAny(low, words) { for (var i = 0; i < words.length; i++) if (low.indexOf(words[i]) > -1) return true; return false; }
function aiExtractLead(it) {
  var t = it.title.replace(/\s*-\s*[^-]*$/, "");
  var m = t.match(/[""\u201c\u201d]([^""\u201c\u201d]+)[""\u201c\u201d]/);
  var name = m ? m[1] : t.split(" açı")[0].replace(/^(Yeni|YENİ)\s+/, "");
  name = String(name).trim().slice(0, 70);
  var area = "İstanbul";
  for (var i = 0; i < AI_ZONES.length; i++) { if (it.title.toLowerCase().indexOf(AI_ZONES[i].toLowerCase()) > -1) { area = AI_ZONES[i]; break; } }
  var low = it.title.toLowerCase();
  var score = 40;
  if (aiHasAny(low, ["restoran", "kebap", "lokanta", "kafe", "otel", "catering", "mutfak", "yemek", "döner", "doner"])) score += 20;
  if (AI_ZONES.slice(0, 14).indexOf(area) > -1) score += 25;
  if (aiHasAny(low, ["açılış", "açıldı", "açtı", "hizmete girdi"])) score += 15;
  var a = aiDaysAgo(it.published); if (a <= 7) score += 10; else if (a <= 30) score += 5;
  return { name: name || it.title.slice(0, 60), area: area, source: it.source, url: it.url, title: it.title, published: it.published, score: Math.min(score, 100) };
}
async function aiRadarSync(env) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS trend_news (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), title TEXT, url TEXT UNIQUE, source TEXT, published TEXT, category TEXT)").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS ai_leads (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), name TEXT, area TEXT, url TEXT UNIQUE, source TEXT, score INTEGER, title TEXT, published TEXT, status TEXT DEFAULT 'new')").run();
  var trends = [], leads = [], seenT = {}, seenL = {};
  for (var i = 0; i < AI_TREND_QUERIES.length; i++) {
    if (i) await new Promise(function (rs) { setTimeout(rs, 400); });
    var items = await rssFetch(AI_TREND_QUERIES[i][1]);
    for (var j = 0; j < items.length && j < 4; j++) {
      var k = items[j].title.slice(0, 60);
      if (!seenT[k]) { seenT[k] = 1; items[j].category = AI_TREND_QUERIES[i][0]; trends.push(items[j]); }
    }
  }
  for (var i2 = 0; i2 < AI_LEAD_QUERIES.length; i2++) {
    await new Promise(function (rs2) { setTimeout(rs2, 400); });
    var items2 = await rssFetch(AI_LEAD_QUERIES[i2]);
    for (var j2 = 0; j2 < items2.length; j2++) {
      var it2 = items2[j2], low2 = it2.title.toLowerCase();
      if (aiHasAny(low2, ["açılış", "açıldı", "açtı", "hizmete girdi", "kapılarını"]) && !seenL[it2.url]) { seenL[it2.url] = 1; leads.push(aiExtractLead(it2)); }
    }
  }
  trends.sort(function (a, b) { return aiDaysAgo(a.published) - aiDaysAgo(b.published); });
  leads.sort(function (a, b) { return b.score - a.score; });
  var newT = 0, newL = 0;
  var st = trends.slice(0, 24).map(function (t) { return env.DB.prepare("INSERT OR IGNORE INTO trend_news (title,url,source,published,category) VALUES (?,?,?,?,?)").bind(t.title.slice(0, 220), t.url.slice(0, 300), t.source.slice(0, 80), t.published.slice(0, 40), t.category); });
  if (st.length) { var rs = await env.DB.batch(st); rs.forEach(function (r) { newT += (r.meta && r.meta.changes) || 0; }); }
  var sl = leads.slice(0, 20).map(function (l) { return env.DB.prepare("INSERT OR IGNORE INTO ai_leads (name,area,url,source,score,title,published) VALUES (?,?,?,?,?,?,?)").bind(l.name.slice(0, 120), l.area.slice(0, 60), l.url.slice(0, 300), l.source.slice(0, 80), l.score, l.title.slice(0, 220), l.published.slice(0, 40)); });
  if (sl.length) { var rs2 = await env.DB.batch(sl); rs2.forEach(function (r) { newL += (r.meta && r.meta.changes) || 0; }); }
  await setSetting(env, "ai_radar_ts", Date.now());
  return { newTrends: newT, newLeads: newL, fetchedTrends: trends.length, fetchedLeads: leads.length };
}
async function aiRadarMaybe(env) {
  try {
    var last = await getSetting(env, "ai_radar_ts");
    if (last && Date.now() - last < 43200000) return;
    var r = await aiRadarSync(env);
    if (r.newTrends + r.newLeads > 0) await notifyAdmin(env, "📡 رادار AI گزارش داد:\n📈 " + r.newTrends + " ترند جدید\n🎯 " + r.newLeads + " لید جدید (رستوران)\n\n/trendler — ترندها\n/lidyeni — لیدهای AI");
  } catch (e) {}
}


// ═══════════════════════════════════════════════════════════════
// ═══ پنل CRM — ادغام‌شده از ورکر مستقل (v7.6.0): /panel + /bot ═══
// ═══════════════════════════════════════════════════════════════
var _TRG = {};  // rate-limit تریگر عمومی سینک رادار (برای داشبورد HF)

// AYKAN ET & MANGAL — پنل مدیریتی (Admin Panel on Cloudflare Worker + D1)
// طراحی گرم «کبابی»: مشکی گرم + نارنجی آتش + سبز واتساپ — RTL فارسی
const SITE = "https://lively-mouse-0c7c.aykanet34.workers.dev/";
const B2B_CATALOG = [
  { id: "kusbasi", tr: "Dana Kuşbaşı", fa: "کوپه گوساله", price: 750 },
  { id: "kiyma", tr: "Özel Çekim Kıyma", fa: "چرخ‌کرده‌ی مخصوص", price: 750 },
  { id: "kemikli", tr: "Dana Kemikli Et", fa: "استخوان‌دار گوساله", price: 650 },
  { id: "antrikot", tr: "Dana Antrikot", fa: "آنترکوت گوساله", price: 1100 },
  { id: "kuzu", tr: "Kuzu Et / Kuşbaşı", fa: "گوشت بره", price: 1069 },
  { id: "pirzola", tr: "Kuzu Pirzola", fa: "پیرزولای بره", price: 1399 },
  { id: "butun-tavuk", tr: "Bütün Tavuk", fa: "مرغ کامل", price: 95 },
  { id: "tavuk-but", tr: "Tavuk But", fa: "ران مرغ", price: 95 },
  { id: "bonfile", tr: "Tavuk Bonfile", fa: "سینه‌ی مرغ", price: 160 }
];
const LOGO = "data:image/jpeg;base64,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";
const KART_B64 = "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qGfhHRANG9wOA4lmfJnC1JEGdS3ipo7XcbbGI+guPRdMXNy78G4ubunPDieK2o66e3TU7m95oLxPinE1JQblR0Ba5sge/dDRkbuC0knJzhaOiC7dqyrl08yx1FHbamCFjo4J5qYOnp2l28Qx+eAyT1dZU1esLlW1t6rJW03S3mEQVO7GQA3LD4AzwPgN7etUaIM+lvVVR2uttkQi6CtkhklLm5dmMktwc8PGOVF6u9TfrtVXSsEYqKqTpJBG3dbnAHAZOOSwUQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQcsDGyOId1Bcvc8fYfjXHS+O7zKwpqdsu/JK4shjAL3NGTx5AeUn7VEzbbK1FE1Tlhidzx9h+NR3PH5fjWea4M4Q0tNG3sdGJCfOXJ3xl/JUv8ADs+xVvVwaZMOP93295j0YHc8fl+NO54/L8az++Mv5Kl/h2fYnfGX8lS/w7PsU3q4GXC8U9PywO54/L8adzx+X41n98ZfyVL/AA7PsTvjL+Spf4dn2JergZcLxT0/LA7nj8vxp3PH5fjWf3xl/JUv8Oz7E74y/kqX+HZ9iXq4GXC8U9PywO54/L8adzx+X41n98ZfyVL/AA7PsTvjL+Spf4dn2JergZcLxT0/LA7nj8vxp3PH5fjWf3xl/JUv8Oz7E74y/kqX+HZ9iXq4GXC8U9PywO54/L8adzx+X41n98ZfyVL/AA7PsTvjL+Spf4dn2JergZcLxT0/LA7nj8vxp3PH5fjWf3xl/JUv8Oz7E74y/kqX+HZ9iXq4GXC8U9Py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";

async function sha256hex(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, "0")).join("");
}
const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8", ...CORS, ...SEC, ...extra } });
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, content-type, x-panel-secret",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

const SEC = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "SAMEORIGIN",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};


const GRAPH = "https://graph.facebook.com/v19.0";

async function getSocialCfg(env) {
  const r = await env.DB.prepare("SELECT value FROM settings WHERE key='social_config'").first();
  if (r && r.value) { try { return JSON.parse(r.value); } catch (e) {} }
  return {};
}
async function saveSocialCfg(env, cfg) {
  await env.DB.prepare("INSERT INTO settings (key, value) VALUES ('social_config', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value")
    .bind(JSON.stringify(cfg)).run();
}
async function logPost(env, plat, ok, detail, body) {
  try { await env.DB.prepare("INSERT INTO social_posts (platform, ok, detail, body) VALUES (?,?,?,?)")
    .bind(String(plat).slice(0, 40), ok ? 1 : 0, String(detail || "").slice(0, 400), String(body || "").slice(0, 500)).run(); } catch (e) {}
}
const maskTok = t => (!t) ? "" : ("\u2022\u2022\u2022\u2022" + String(t).slice(-4));
function maskCfg(c) {
  const m = JSON.parse(JSON.stringify(c || {}));
  ["wa", "ig", "fb", "tt", "tg"].forEach(p => { if (m[p] && m[p].token) m[p].token = maskTok(m[p].token); if (m[p] && m[p].verify_token) m[p].verify_token = maskTok(m[p].verify_token); });
  return m;
}
async function testPlatform(c, plat) {
  try {
    if (plat === "tg") {
      if (!c.tg || !c.tg.token) return { ok: false, detail: "توکن ربات تنظیم نشده" };
      const me = await (await fetch("https://api.telegram.org/bot" + c.tg.token + "/getMe")).json();
      if (!me.ok) {
        if (me.error_code === 401) return { ok: false, detail: "توکن باطل شده (Unauthorized) — توکن تازه را فقط از BotFather (پیام API Token) بردارید و در صفحه /bot بچسبانید. دکمه Revoke را نزنید." };
        return { ok: false, detail: "⛔ ربات: " + (me.description || "خطا") };
      }
      const ch = await (await fetch("https://api.telegram.org/bot" + c.tg.token + "/getChat?chat_id=" + encodeURIComponent(c.tg.channel || "")).catch(() => ({ ok: false, json: async () => ({}) }))).json().catch(() => ({}));
      if (!ch.ok) return { ok: false, detail: "✅ ربات @" + me.result.username + " زنده است اما کانال در دسترس نیست (" + (ch.description || "chat not found") + ") — ربات را ادمین کانال کنید و شناسه کانال را درست وارد کنید." };
      return { ok: true, detail: "@" + me.result.username + " → اتصال با کانال «" + (ch.result && ch.result.title ? ch.result.title : c.tg.channel) + "» برقرار شد" };
    }
    if (plat === "wa") {
      if (!c.wa || !c.wa.token || !c.wa.phone_id) return { ok: false, detail: "token \u06cc phone_id \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      const r = await (await fetch(GRAPH + "/" + c.wa.phone_id + "?access_token=" + encodeURIComponent(c.wa.token))).json();
      return r.error ? { ok: false, detail: r.error.message } : { ok: true, detail: "\u0648\u0627\u062a\u0633\u0627\u067e: " + (r.verified_name || "OK") };
    }
    if (plat === "ig") {
      if (!c.ig || !c.ig.token) return { ok: false, detail: "\u062a\u0648\u06a9\u0646 \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      const r = await (await fetch("https://graph.instagram.com/me?fields=username,account_type&access_token=" + encodeURIComponent(c.ig.token))).json();
      return r.error ? { ok: false, detail: (r.error.message || "invalid token") } : { ok: true, detail: "@" + r.username + (r.account_type ? " (" + r.account_type + ")" : "") };
    }
    if (plat === "fb") {
      if (!c.fb || !c.fb.token || !c.fb.page_id) return { ok: false, detail: "token \u06cc page_id \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      const r = await (await fetch(GRAPH + "/" + c.fb.page_id + "?fields=id,name,link&access_token=" + encodeURIComponent(c.fb.token))).json();
      return r.error ? { ok: false, detail: r.error.message } : { ok: true, detail: "\u0635\u0641\u062d\u0647: " + r.name };
    }
    if (plat === "tt") {
      if (!c.tt || !c.tt.token) return { ok: false, detail: "\u062a\u0648\u06a9\u0646 \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      const r = await (await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name", { headers: { authorization: "Bearer " + c.tt.token } })).json();
      return (r.error && r.error.code) ? { ok: false, detail: r.error.message + " (code " + r.error.code + ")" } : { ok: true, detail: (r.data && r.data.user && r.data.user.display_name) || "OK" };
    }
    return { ok: false, detail: "\u067e\u0644\u062a\u0641\u0631\u0645 \u0646\u0627\u0634\u0646\u0627\u062e\u062a\u0647" };
  } catch (e) { return { ok: false, detail: String(e).slice(0, 200) }; }
}
async function sendPlatform(c, plat, text, img) {
  try {
    if (plat === "tg") {
      if (!c.tg || !c.tg.token) return { ok: false, detail: "\u062a\u0648\u06a9\u0646 \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      const r = await (await fetch("https://api.telegram.org/bot" + c.tg.token + "/sendMessage", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chat_id: c.tg.channel, text: String(text).slice(0, 4000) }) })).json();
      return r.ok ? { ok: true, detail: "\u0627\u0631\u0633\u0627\u0644 \u0634\u062f \u0628\u0647 \u06a9\u0627\u0646\u0627\u0644" } : { ok: false, detail: r.description || "error" };
    }
    if (plat === "wa") {
      if (!c.wa || !c.wa.token || !c.wa.phone_id) return { ok: false, detail: "\u062a\u0648\u06a9\u0646 \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      if (!c.wa.to) return { ok: false, detail: "\u0634\u0645\u0627\u0631\u0647 \u06af\u06cc\u0631\u0646\u062f\u0647 (to) \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      const r = await (await fetch(GRAPH + "/" + c.wa.phone_id + "/messages", { method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + c.wa.token }, body: JSON.stringify({ messaging_product: "whatsapp", to: String(c.wa.to).replace(/[^0-9]/g, ""), type: "text", text: { body: String(text).slice(0, 3500) } }) })).json();
      return r.error ? { ok: false, detail: r.error.message } : { ok: true, detail: "\u067e\u06cc\u0627\u0645 \u0648\u0627\u062a\u0633\u0627\u067e \u0627\u0631\u0633\u0627\u0644 \u0634\u062f" };
    }
    if (plat === "ig") {
      if (!c.ig || !c.ig.token || !c.ig.user_id) return { ok: false, detail: "\u062a\u0648\u06a9\u0646 \u06cc user_id \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      if (!img) return { ok: false, detail: "\u0627\u06cc\u0646\u0633\u062a\u0627\u06af\u0631\u0627\u0645 \u0639\u06a9\u0633 \u0644\u0627\u0632\u0645 \u062f\u0627\u0631\u062f \u2014 \u0644\u06cc\u0646\u06a9 \u0639\u06a9\u0633 \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f" };
      let r = await (await fetch(GRAPH + "/" + c.ig.user_id + "/media", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ image_url: img, caption: String(text).slice(0, 2200) }) })).json();
      if (r.error) return { ok: false, detail: r.error.message };
      r = await (await fetch(GRAPH + "/" + c.ig.user_id + "/media_publish", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ creation_id: r.id }) })).json();
      return r.error ? { ok: false, detail: r.error.message } : { ok: true, detail: "\u067e\u0633\u062a \u0627\u06cc\u0646\u0633\u062a\u0627\u06af\u0631\u0627\u0645 \u0645\u0646\u062a\u0634\u0631 \u0634\u062f" };
    }
    if (plat === "fb") {
      if (!c.fb || !c.fb.token || !c.fb.page_id) return { ok: false, detail: "\u062a\u0648\u06a9\u0646 \u06cc page_id \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" };
      const body = { message: String(text).slice(0, 4000), access_token: c.fb.token };
      if (img) body.link = img;
      const r = await (await fetch(GRAPH + "/" + c.fb.page_id + "/feed", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })).json();
      return r.error ? { ok: false, detail: r.error.message } : { ok: true, detail: "\u067e\u0633\u062a \u0641\u06cc\u0633\u0628\u0648\u06a9 \u0645\u0646\u062a\u0634\u0631 \u0634\u062f" };
    }
    if (plat === "tt") return { ok: false, detail: "\u062a\u06cc\u06a9\u200c\u062a\u0627\u06a9: \u0627\u0631\u0633\u0627\u0644 \u0645\u062a\u0646\u06cc \u0645\u0633\u062a\u0642\u06cc\u0645 \u0645\u0645\u06a9\u0646 \u0646\u06cc\u0633\u062a (\u0641\u0642\u0637 \u0648\u06cc\u062f\u06cc\u0648 \u0628\u0627 \u0627\u067e \u062a\u0627\u06cc\u06cc\u062f\u0634\u062f\u0647). \u062a\u0648\u06a9\u0646 \u0630\u062e\u06cc\u0631\u0647 \u0634\u062f\u0647 \u0627\u0633\u062a." };
    return { ok: false, detail: "\u067e\u0644\u062a\u0641\u0631\u0645 \u0646\u0627\u0634\u0646\u0627\u062e\u062a\u0647" };
  } catch (e) { return { ok: false, detail: String(e).slice(0, 200) }; }
}

async function panelApi(request, env, path) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const url = new URL(request.url);

  // ---- login ----
  if (path === "/api/hit" && request.method === "GET") {
    try {
      const d = new Date().toISOString().slice(0, 10);
      let h = {};
      const cur = await env.DB.prepare("SELECT value FROM settings WHERE key='site_hits'").first();
      if (cur && cur.value) { try { h = JSON.parse(cur.value); } catch (e) {} }
      h[d] = (h[d] || 0) + 1;
      const ks = Object.keys(h); ks.sort();
      for (let i = 0; i < ks.length - 60; i++) delete h[ks[i]];
      await env.DB.prepare("INSERT INTO settings (key, value) VALUES ('site_hits', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(JSON.stringify(h)).run();
    } catch (e) {}
    return new Response(null, { status: 204, headers: { "access-control-allow-origin": "*" } });
  }
  if (path === "/api/ping") return json({ ok: true, ts: Date.now(), svc: "aykan-all-in-one" });
  // ---- one-page bot setup (/bot): validate + save + webhook in one shot ----
  if (path === "/api/bot-setup" && request.method === "POST") {
    let b = {}; try { b = await request.json(); } catch (e) {}
    const ipBS = request.headers.get("cf-connecting-ip") || "x";
    const lr = _LR[ipBS] = _LR[ipBS] || { n: 0, t: Date.now() };
    if (Date.now() - lr.t > 600000) { lr.n = 0; lr.t = Date.now(); }
    lr.n++;
    if (lr.n > 12) return json({ ok: false, error: "çok fazla deneme — 10 dakika bekleyin" }, 429);
    const pin = String(b.pin || "");
    const token = String(b.token || "").trim();
    if (pin !== String(ADMIN_PIN)) return json({ ok: false, error: "رمز نادرست است" }, 401);
    if (!/^\d{6,12}:[A-Za-z0-9_-]{30,40}$/.test(token)) return json({ ok: false, error: "فرمت توکن کامل نیست — کل خط توکن را کپی کنید (حدود ۴۶ کاراکتر)" }, 400);
    const me = await (await fetch("https://api.telegram.org/bot" + token + "/getMe")).json();
    if (!me.ok) return json({ ok: false, error: "⛔ توکن توسط تلگرام رد شد (" + (me.description || "Unauthorized") + ") — این توکن قبلاً باطل شده. توکنِ زنده فقط در صفحه‌ی API Token ربات است (BotFather → /mybots → ربات → API Token)؛ از پیام‌های چت کپی نکنید." }, 400);
    const cur = await getSocialCfg(env);
    cur.tg = cur.tg || {};
    cur.tg.token = token;
    try { } catch (e) {}
    cur.tg.enabled = true;
    if (!cur.tg.channel) cur.tg.channel = "@AykanEtmangal_shopping";
    await saveSocialCfg(env, cur);
    let hook = null;
    try {
      hook = await (await fetch("https://api.telegram.org/bot" + token + "/setWebhook", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url: SITE_URL + "/hook-" + HOOK_SECRET, secret_token: HOOK_SECRET, allowed_updates: ["message", "callback_query"], drop_pending_updates: false }) })).json();
    } catch (e) {}
    try { await setMyCommands(env); } catch (e) {}
    return json({ ok: true, bot: me.result.username, name: me.result.first_name, webhook: !!(hook && hook.ok) });
  }
  if (path === "/robots.txt") return new Response("User-agent: *\nDisallow: /\n", { headers: { "content-type": "text/plain" } });
  if (path === "/api/login" && request.method === "POST") {
    let pin = "";
    try { pin = String((await request.json()).pin || ""); } catch (e) {}
    const ipLR = request.headers.get("cf-connecting-ip") || "x";
    const lr = _LR[ipLR] = _LR[ipLR] || { n: 0, t: Date.now() };
    if (Date.now() - lr.t > 600000) { lr.n = 0; lr.t = Date.now(); }
    lr.n++;
    if (lr.n > 5) return json({ ok: false, error: "Çok fazla deneme — 10 dakika bekleyin" }, 429);
    if (pin !== String(ADMIN_PIN)) return json({ ok: false, error: "رمز نادرست است" }, 401);
    const token = await sha256hex(PANEL_SECRET + ":" + pin);
    return json({ ok: true, token });
  }

  // ---- public stats (فقط اعداد — برای صفحه سریع مشتری) ----
  if (path === "/api/public-stats") {
    const s = await env.DB.prepare(
      "SELECT COUNT(*) AS total, SUM(CASE WHEN date(created_at)=date('now') THEN 1 ELSE 0 END) AS today, COALESCE(ROUND(AVG(total)),0) AS avg FROM orders"
    ).first();
    return json({ ok: true, ordersToday: s.today || 0, ordersTotal: s.total, avgBasket: s.avg || 0 });
  }

  // ---- bot social fan-out (X-Panel-Secret) ----
  if (path === "/api/social/autopost" && request.method === "POST") {
    if ((request.headers.get("x-panel-secret") || "") !== PANEL_SECRET) return json({ ok: false, error: "forbidden" }, 403);
    let b = {}; try { b = await request.json(); } catch (e) {}
    const c = await getSocialCfg(env);
    const targets = ["wa", "ig", "fb", "tt"].filter(p => c[p] && c[p].enabled && c[p].token);
    const results = {};
    for (const p of targets) {
      const r = await sendPlatform(c, p, String(b.text || ""), String(b.image_url || ""));
      results[p] = r;
      await logPost(env, p, r.ok, r.detail, b.text || "");
    }
    return json({ ok: true, results });
  }

  // ---- bot: read tg config (unmasked, X-Panel-Secret) — برای خودترمیمی ربات ----
  if (path === "/api/social/cfg" && request.method === "GET") {
    if ((request.headers.get("x-panel-secret") || "") !== PANEL_SECRET) return json({ ok: false, error: "forbidden" }, 403);
    const c = await getSocialCfg(env);
    return json({ ok: true, tg: { token: (c.tg && c.tg.token) || "", channel: (c.tg && c.tg.channel) || "" } });
  }

  // ---- WhatsApp Cloud API webhook ----
  if (path === "/api/wa-webhook" && request.method === "GET") {
    const v = url.searchParams;
    const c = await getSocialCfg(env);
    if (v.get("hub.mode") === "subscribe" && v.get("hub.verify_token") && v.get("hub.verify_token") === (c.wa && c.wa.verify_token))
      return new Response(v.get("hub.challenge") || "", { status: 200, headers: { "content-type": "text/plain" } });
    return new Response("forbidden", { status: 403 });
  }
  if (path === "/api/wa-webhook" && request.method === "POST") {
    try {
      const body = await request.json();
      const c = await getSocialCfg(env);
      for (const e of body.entry || []) for (const ch of e.changes || []) for (const m of (ch.value && ch.value.messages) || []) {
        const from = String(m.from || "");
        const txt = String((m.text && m.text.body) || "");
        const name = String((ch.value.contacts && ch.value.contacts[0] && ch.value.contacts[0].profile && ch.value.contacts[0].profile.name) || "WhatsApp");
        await env.DB.prepare("INSERT INTO leads (category, name, area, phone, email, data) VALUES (?,?,?,?,?,?)")
          .bind("WhatsApp", name.slice(0, 100), "WhatsApp", from, "", JSON.stringify({ name: name, phone: from, source: "whatsapp", text: txt.slice(0, 300), ts: new Date().toISOString() })).run();
        if (c.wa && c.wa.token && c.wa.phone_id && c.wa.autoreply && c.wa.enabled) {
          await fetch(GRAPH + "/" + c.wa.phone_id + "/messages", { method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + c.wa.token },
            body: JSON.stringify({ messaging_product: "whatsapp", to: from, type: "text", text: { body: c.wa.autoreply } }) }).catch(() => {});
        }
        await logPost(env, "wa-in", true, name + ": " + txt.slice(0, 80), txt.slice(0, 200));
      }
    } catch (e) {}
    return json({ ok: true });
  }

  const expected = await sha256hex(PANEL_SECRET + ":" + (ADMIN_PIN));
  const auth = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const authed = auth && auth === expected;

  // ---- B2B: RFQ inbox (list) ----
  if (path === "/api/b2b" && request.method === "GET") {
    if (!authed) return json({ ok: false, error: "unauthorized" }, 401);
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS b2b_requests (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), firm TEXT, phone TEXT, addr TEXT, items TEXT, total_kg REAL, est_total REAL, status TEXT DEFAULT 'new', quote TEXT, note TEXT)").run();
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS b2b_price_history (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), product TEXT, price REAL, firm TEXT)").run();
    const rq = await env.DB.prepare("SELECT * FROM b2b_requests ORDER BY id DESC LIMIT 300").all();
    const ph = await env.DB.prepare("SELECT product, price, ts, firm FROM b2b_price_history ORDER BY id DESC LIMIT 300").all();
    const firms = {};
    (rq.results || []).forEach(r => {
      const k = String(r.phone || r.firm || "").slice(0, 40);
      const f = firms[k] = firms[k] || { firm: r.firm, phone: r.phone, n: 0, won: 0, kg: 0, last: r.ts, first: r.ts, lastStatus: r.status };
      f.n++; if (r.status === "won") f.won++;
      f.kg += Number(r.total_kg || 0);
      if (String(r.ts) > String(f.last)) { f.last = r.ts; f.lastStatus = r.status; }
      if (String(r.ts) < String(f.first)) f.first = r.ts;
    });
    return json({ ok: true, requests: rq.results || [], prices: ph.results || [], catalog: B2B_CATALOG, firms: Object.values(firms) });
  }
  // ---- B2B: actions (quote / won / lost) ----
  if (path === "/api/b2b" && request.method === "POST") {
    if (!authed) return json({ ok: false, error: "unauthorized" }, 401);
    let b = {}; try { b = await request.json(); } catch (e) {}
    const id = parseInt(b.id, 10) || 0;
    const act = String(b.action || "");
    if (!id || !act) return json({ ok: false, error: "bad-request" }, 400);
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS b2b_price_history (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), product TEXT, price REAL, firm TEXT)").run();
    if (act === "quote") {
      const q = b.quote || {};
      const items = (q.items || []).slice(0, 25).map(x => ({ name: String(x.name || "").slice(0, 60), qty: Math.round(parseFloat(x.qty) * 10) / 10 || 0, price: Math.round(parseFloat(x.price) * 100) / 100 || 0 })).filter(x => x.qty > 0);
      if (!items.length) return json({ ok: false, error: "empty-quote" }, 400);
      const disc = Math.min(Math.max(parseFloat(q.discount) || 0, 0), 30);
      const gross = items.reduce((a, x) => a + x.qty * x.price, 0);
      const total = Math.round(gross * (1 - disc / 100));
      await env.DB.prepare("UPDATE b2b_requests SET quote=?, est_total=?, status='quoted' WHERE id=?")
        .bind(JSON.stringify({ items: items, discount: disc, gross: Math.round(gross), total: total, note: String(q.note || "").slice(0, 300), ts: new Date().toISOString() }), total, id).run();
      for (const it of items) { try { await env.DB.prepare("INSERT INTO b2b_price_history (product, price, firm) VALUES (?,?,?)").bind(it.name, it.price, String(q.firm || "").slice(0, 80)).run(); } catch (e) {} }
      return json({ ok: true, total: total });
    }
    if (act === "won") {
      const r = await env.DB.prepare("SELECT * FROM b2b_requests WHERE id=?").bind(id).first();
      if (!r) return json({ ok: false, error: "not-found" }, 404);
      await env.DB.prepare("UPDATE b2b_requests SET status='won' WHERE id=?").bind(id).run();
      let q = {}; try { q = JSON.parse(r.quote || "{}"); } catch (e) {}
      if (q && q.items && q.items.length) {
        const code = "B2B-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-" + String(id).padStart(3, "0");
        try {
          await env.DB.prepare("INSERT INTO orders (code, kind, total, currency, name, phone, address, items, lang, chat, source) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
            .bind(code, "b2b", q.total || r.est_total || 0, "TL", r.firm, r.phone, r.addr || "", JSON.stringify(q.items), "fa", "panel", "b2b-panel").run();
        } catch (e) {}
        return json({ ok: true, code: code });
      }
      return json({ ok: true });
    }
    if (act === "lost") { await env.DB.prepare("UPDATE b2b_requests SET status='lost' WHERE id=?").bind(id).run(); return json({ ok: true }); }
    return json({ ok: false, error: "unknown-action" }, 400);
  }

  // ---- AI radar: leads + trends ----
  if (path === "/api/ai" && request.method === "GET") {
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS trend_news (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), title TEXT, url TEXT UNIQUE, source TEXT, published TEXT, category TEXT)").run();
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS ai_leads (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), name TEXT, area TEXT, url TEXT UNIQUE, source TEXT, score INTEGER, title TEXT, published TEXT, status TEXT DEFAULT 'new')").run();
    const al = await env.DB.prepare("SELECT * FROM ai_leads ORDER BY score DESC, id DESC LIMIT 100").all();
    const tn = await env.DB.prepare("SELECT category, title, url, source, published FROM trend_news ORDER BY id DESC LIMIT 20").all();
    const ls = await env.DB.prepare("SELECT value FROM settings WHERE key='ai_radar_ts'").first();
    return json({ ok: true, aiLeads: al.results || [], trends: tn.results || [], lastSync: (ls && JSON.parse(ls.value)) || 0 });
  }
  if (path === "/api/ai" && request.method === "POST") {
    let b = {}; try { b = await request.json(); } catch (e) {}
    if (b.action === "convert") {
      const id = parseInt(b.id, 10) || 0;
      const r = await env.DB.prepare("SELECT * FROM ai_leads WHERE id=?").bind(id).first();
      if (!r) return json({ ok: false, error: "not-found" }, 404);
      try {
        const leadObj = { name: String(r.name).slice(0, 100), category: "AI-Restaurant", area: String(r.area).slice(0, 60), phone: "", email: "", website: r.url, opportunity: r.score || 0, source: r.source, origin: "ai-radar", url: r.url, title: r.title };
        await env.DB.prepare("INSERT INTO leads (category, name, area, phone, email, data) VALUES (?,?,?,?,?,?)")
          .bind("AI-Restaurant", String(r.name).slice(0, 100), String(r.area).slice(0, 60), "", "", JSON.stringify(leadObj)).run();
        await env.DB.prepare("UPDATE ai_leads SET status='added' WHERE id=?").bind(id).run();
        return json({ ok: true });
      } catch (e) { return json({ ok: false, error: String(e).slice(0, 120) }, 500); }
    }
    if (b.action === "refresh") {
      try {
        // سردown ۱۰ دقیقه‌ای — محافظت از rate-limit منابع خبری
        var lastR = Number((await getSetting(env, "ai_radar_ts")) || 0);
        if (lastR && Date.now() - lastR < 600000) return json({ ok: true, result: { skipped: "cooldown", lastSync: lastR } });
        const d = await aiRadarSync(env);
        return json({ ok: true, result: d });
      } catch (e) { return json({ ok: false, error: "radar-unreachable" }, 502); }
    }
    return json({ ok: false, error: "unknown-action" }, 400);
  }

  // ---- bot pushes orders here ----
  if (path === "/api/orders" && request.method === "POST") {
    if ((request.headers.get("x-panel-secret") || "") !== PANEL_SECRET)
      return json({ ok: false, error: "forbidden" }, 403);
    let o = {};
    try { o = await request.json(); } catch (e) { return json({ ok: false, error: "bad-json" }, 400); }
    await env.DB.prepare(
      "INSERT INTO orders (code, kind, total, currency, name, phone, address, items, lang, chat, source) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    ).bind(String(o.code || "").slice(0, 40), String(o.kind || "order").slice(0, 20), Number(o.total) || 0,
           "TL", String(o.name || "").slice(0, 120), String(o.phone || "").slice(0, 40),
           String(o.address || "").slice(0, 300), JSON.stringify(o.items || o.cart || null),
           String(o.lang || "").slice(0, 5), String(o.chat || "").slice(0, 30), String(o.source || "bot").slice(0, 20)).run();
    return json({ ok: true });
  }

  if (!authed) return json({ ok: false, error: "unauthorized" }, 401);

  // ---- SOCIAL: config / test / send ----
  if (path === "/api/social" && request.method === "GET") {
    const c = await getSocialCfg(env);
    const posts = await env.DB.prepare("SELECT id, platform, ok, detail, created_at FROM social_posts ORDER BY id DESC LIMIT 40").all();
    return json({ ok: true, config: maskCfg(c), posts: posts.results || [] });
  }
  if (path === "/api/social" && request.method === "POST") {
    let b = {}; try { b = await request.json(); } catch (e) {}
    const cur = await getSocialCfg(env);
    const c = cur;
    ["wa", "ig", "fb", "tt", "tg"].forEach(p => {
      if (b[p]) {
        c[p] = Object.assign({}, c[p] || {}, b[p]);
        const keep = (f) => { if (c[p][f] !== undefined && (String(c[p][f]).indexOf("\u2022\u2022\u2022\u2022") !== -1 || c[p][f] === null)) { if (cur[p] && cur[p][f]) c[p][f] = cur[p][f]; else delete c[p][f]; } };
        keep("token"); keep("verify_token");
      }
    });
    await saveSocialCfg(env, c);
    // auto setWebhook for 24/7 tgbot worker when a NEW valid telegram token is saved
    try {
      var nt = c.tg && c.tg.token;
      if (nt && String(nt).indexOf("\u2022\u2022\u2022\u2022") === -1 && nt !== (cur.tg && cur.tg.token)) {
        var me = await (await fetch("https://api.telegram.org/bot" + nt + "/getMe")).json();
        if (me.ok) {
          await fetch("https://api.telegram.org/bot" + nt + "/setWebhook", {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ url: SITE_URL + "/hook-" + HOOK_SECRET,
              secret_token: HOOK_SECRET, allowed_updates: ["message", "callback_query"], drop_pending_updates: false })
          });
        }
      }
    } catch (e) {}
    return json({ ok: true, config: maskCfg(c) });
  }
  if (path === "/api/social/test" && request.method === "POST") {
    let b = {}; try { b = await request.json(); } catch (e) {}
    const c = await getSocialCfg(env);
    const plat = String(b.platform || "");
    const r = await testPlatform(c, plat);
    await logPost(env, plat + "-test", r.ok, r.detail, "");
    return json(r);
  }
  if (path === "/api/social/send" && request.method === "POST") {
    let b = {}; try { b = await request.json(); } catch (e) {}
    const c = await getSocialCfg(env);
    const plats = (b.platforms || []).map(String).slice(0, 6);
    const results = {};
    for (const p of plats) {
      if (!c[p] || !(c[p].token || (p === "wa" && c[p].token))) { results[p] = { ok: false, detail: "\u062a\u0648\u06a9\u0646 \u062a\u0646\u0638\u06cc\u0645 \u0646\u0634\u062f\u0647" }; await logPost(env, p, false, "no token", b.text || ""); continue; }
      const r = await sendPlatform(c, p, String(b.text || ""), String(b.image_url || ""));
      results[p] = r;
      await logPost(env, p, r.ok, r.detail, b.text || "");
    }
    return json({ ok: true, results });
  }



  // ---- sync: export/import (main <-> backup) ----
  if (path === "/api/sync/export") {
    const out = { ok: true, ts: Date.now(), orders: [], leads: [], b2b: [], ai: [], trends: [] };
    try { out.orders = (await env.DB.prepare("SELECT * FROM orders ORDER BY id").all()).results || []; } catch (e) {}
    try { out.leads = (await env.DB.prepare("SELECT num, data FROM leads ORDER BY num").all()).results || []; } catch (e) {}
    try { out.b2b = (await env.DB.prepare("SELECT * FROM b2b_requests ORDER BY id").all()).results || []; } catch (e) {}
    try { out.ai = (await env.DB.prepare("SELECT * FROM ai_leads ORDER BY id").all()).results || []; } catch (e) {}
    try { out.trends = (await env.DB.prepare("SELECT * FROM trend_news ORDER BY id").all()).results || []; } catch (e) {}
    try { const s = await env.DB.prepare("SELECT key, value FROM settings").all(); out.settings = (s.results || []).filter(r => r.key !== "social_config"); } catch (e) {}
    return json(out);
  }
  if (path === "/api/sync/import" && request.method === "POST") {
    let b = {}; try { b = await request.json(); } catch (e) { return json({ ok: false, error: "bad-json" }, 400); }
    const stats = { orders: 0, leads: 0, b2b: 0, ai: 0, trends: 0, settings: 0, skipped: 0 };
    const seenOrders = new Set((await env.DB.prepare("SELECT code FROM orders").all()).results.map(r => String(r.code)));
    for (const o of (b.orders || [])) {
      if (seenOrders.has(String(o.code))) { stats.skipped++; continue; }
      try { await env.DB.prepare("INSERT INTO orders (code, kind, total, currency, name, phone, address, items, lang, chat, source, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")
        .bind(String(o.code).slice(0,40), String(o.kind||"order").slice(0,10), Number(o.total)||0, String(o.currency||"TL").slice(0,8), String(o.name||"").slice(0,120), String(o.phone||"").slice(0,40), String(o.address||"").slice(0,300), o.items ? String(o.items).slice(0,3000) : null, String(o.lang||"tr").slice(0,4), String(o.chat||"").slice(0,30), String(o.source||"").slice(0,20), o.created_at||null).run(); stats.orders++; } catch (e) {}
    }
    const seenLeads = new Set((await env.DB.prepare("SELECT num FROM leads").all()).results.map(r => String(r.num)));
    for (const l of (b.leads || [])) {
      if (seenLeads.has(String(l.num))) { stats.skipped++; continue; }
      try { await env.DB.prepare("INSERT INTO leads (num, data) VALUES (?,?)").bind(l.num, String(l.data).slice(0, 4000)).run(); stats.leads++; } catch (e) {}
    }
    const seenB2B = new Set((await env.DB.prepare("SELECT id FROM b2b_requests").all()).results.map(r => String(r.id)));
    for (const r of (b.b2b || [])) {
      if (seenB2B.has(String(r.id))) { stats.skipped++; continue; }
      try { await env.DB.prepare("INSERT INTO b2b_requests (id, ts, firm, phone, addr, items, total_kg, est_total, status, quote, note) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
        .bind(Number(r.id)||0, r.ts||null, String(r.firm||"").slice(0,200), String(r.phone||"").slice(0,60), String(r.addr||"").slice(0,200), r.items?String(r.items).slice(0,3000):null, Number(r.total_kg)||0, Number(r.est_total)||0, String(r.status||"new").slice(0,20), r.quote?String(r.quote).slice(0,3000):null, String(r.note||"").slice(0,300)).run(); stats.b2b++; } catch (e) {}
    }
    const seenAI = new Set((await env.DB.prepare("SELECT url FROM ai_leads").all()).results.map(r => String(r.url)));
    for (const r of (b.ai || [])) {
      if (seenAI.has(String(r.url))) { stats.skipped++; continue; }
      try { await env.DB.prepare("INSERT INTO ai_leads (ts, name, area, url, source, score, title, published, status) VALUES (?,?,?,?,?,?,?,?,?)")
        .bind(r.ts||null, String(r.name||"").slice(0,200), String(r.area||"").slice(0,100), String(r.url||"").slice(0,500), String(r.source||"").slice(0,60), Number(r.score)||0, String(r.title||"").slice(0,300), r.published||null, String(r.status||"new").slice(0,20)).run(); stats.ai++; } catch (e) {}
    }
    const seenTr = new Set((await env.DB.prepare("SELECT url FROM trend_news").all()).results.map(r => String(r.url)));
    for (const r of (b.trends || [])) {
      if (seenTr.has(String(r.url))) { stats.skipped++; continue; }
      try { await env.DB.prepare("INSERT INTO trend_news (ts, title, url, source, published, category) VALUES (?,?,?,?,?,?)")
        .bind(r.ts||null, String(r.title||"").slice(0,300), String(r.url||"").slice(0,500), String(r.source||"").slice(0,60), r.published||null, String(r.category||"").slice(0,60)).run(); stats.trends++; } catch (e) {}
    }
    for (const s of (b.settings || [])) {
      try { await env.DB.prepare("INSERT INTO settings (key, value) VALUES (?,?) ON CONFLICT(key) DO NOTHING").bind(String(s.key).slice(0,60), String(s.value).slice(0, 20000)).run(); stats.settings++; } catch (e) {}
    }
    return json({ ok: true, stats });
  }
  // ---- data (leads + invest + catalog) ----
  if (path === "/api/data") {
    const leads = await env.DB.prepare("SELECT data FROM leads ORDER BY num").all();
    const st = await env.DB.prepare("SELECT key, value FROM settings").all();
    const settings = Object.fromEntries((st.results || []).map(r => [r.key, JSON.parse(r.value)]));
    return json({
      ok: true,
      leads: (leads.results || []).map(r => JSON.parse(r.data)),
      invest: settings.invest_leaders || [],
      catalog: settings.package_catalog || {},
    });
  }
  // ---- orders list ----
  if (path === "/api/orders") {
    const lim = Math.min(parseInt(url.searchParams.get("limit") || "100", 10) || 100, 500);
    const r = await env.DB.prepare("SELECT * FROM orders ORDER BY id DESC LIMIT ?").bind(lim).all();
    return json({ ok: true, orders: r.results || [] });
  }
  // ---- stats ----
  if (path === "/api/stats") {
    const s = await env.DB.prepare(
      "SELECT COUNT(*) AS total, COALESCE(SUM(total),0) AS revenue, SUM(CASE WHEN date(created_at)=date('now') THEN 1 ELSE 0 END) AS today FROM orders"
    ).first();
    const l = await env.DB.prepare("SELECT COUNT(*) AS n FROM leads").first();
    return json({ ok: true, ordersTotal: s.total, ordersToday: s.today || 0, revenue: s.revenue, leads: l.n });
  }
  return json({ ok: false, error: "not-found" }, 404);
}

function botSetupHTML() {
  return `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex"><title>🤖 اتصال ربات — آیکان</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{font-family:Vazirmatn,Tahoma,system-ui,sans-serif;background:#120f0e;color:#f5efe9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px;background-image:radial-gradient(700px 400px at 80% -10%,rgba(226,98,28,.18),transparent 60%)}
.c{width:100%;max-width:460px}
.logo{width:74px;height:74px;border-radius:50%;border:3px solid #e2621c;display:block;margin:0 auto 12px}
h1{font-size:19px;text-align:center;margin-bottom:4px}
.sub{font-size:12.5px;color:#b8a89c;text-align:center;margin-bottom:16px;line-height:1.9}
.card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:20px;backdrop-filter:blur(10px)}
.steps{background:rgba(226,98,28,.1);border:1px dashed rgba(226,98,28,.45);border-radius:14px;padding:12px 14px;font-size:12.5px;line-height:2.1;margin-bottom:16px;color:#f8c9a8}
.steps b{color:#fff}
label{font-size:12.5px;font-weight:700;display:block;margin:10px 0 5px}
input{width:100%;background:rgba(0,0,0,.4);border:1.5px solid rgba(255,255,255,.14);border-radius:12px;color:#f5efe9;padding:13px;font-family:inherit;font-size:16px;outline:none;direction:ltr;text-align:left}
input:focus{border-color:#f2833a}
button{width:100%;margin-top:16px;background:linear-gradient(90deg,#f2833a,#e2621c);color:#fff;border:0;border-radius:14px;padding:15px;font-family:inherit;font-size:16px;font-weight:800;cursor:pointer}
button:disabled{opacity:.6}
.res{margin-top:14px;border-radius:14px;padding:13px 15px;font-size:14px;line-height:2;display:none}
.ok{background:rgba(37,211,102,.12);border:1.5px solid #2c7a4f;color:#9ff0c0}
.bad{background:rgba(239,68,68,.1);border:1.5px solid #7a2c2c;color:#ffb3b3}
.wa{display:block;text-align:center;margin-top:14px;color:#25d366;font-size:13px;text-decoration:none}
</style></head><body><div class="c">
<img class="logo" src="https://lively-mouse-0c7c.aykanet34.workers.dev/assets/img0.jpg" alt="">
<h1>🤖 اتصال ربات تلگرام آیکان</h1>
<p class="sub">توکن را همین‌جا بچسبانید — بررسی، ذخیره و فعال‌سازی وبهوک خودکار انجام می‌شود.<br>توکن از چت تلگرام رد نمی‌شود، پس زنده می‌ماند ✅</p>
<div class="card">
<div class="steps">
🔑 <b>توکن زنده فقط اینجا است:</b><br>
۱. تلگرام → BotFather → پیام <b>/mybots</b><br>
۲. انتخاب <b>@Aykan_Et_mangal_shopping_bot</b><br>
۳. انتخاب <b>API Token</b> → روی متن توکن نگه دارید → <b>Copy</b><br>
⛔ هیچ دکمه‌ای نزنید (مخصوصاً Revoke) · پیام را فوروارد نکنید
</div>
<label>رمز پنل</label>
<input id="pin" type="password" inputmode="numeric" placeholder="••••" value="">
<label>توکن ربات (از صفحه‌ی API Token)</label>
<input id="tok" placeholder="1234567890:AA..." autocomplete="off">
<button id="go" onclick="doSetup()">✅ بررسی و فعال‌سازی ربات</button>
<div class="res" id="res"></div>
<a class="wa" href="https://wa.me/905377325269">سوالی دارید؟ واتس‌اپ پشتیبانی</a>
</div></div>
<script>
async function doSetup(){
  const res=document.getElementById('res'), btn=document.getElementById('go');
  const pin=document.getElementById('pin').value.trim(), tok=document.getElementById('tok').value.trim();
  res.style.display='block'; res.className='res';
  if(!pin||!tok){res.classList.add('bad');res.textContent='⛔ رمز و توکن را وارد کنید';return}
  btn.disabled=true;btn.textContent='⏳ در حال بررسی...';
  try{
    const r=await fetch('/api/bot-setup',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({pin:pin,token:tok})});
    const d=await r.json();
    if(d.ok){res.classList.add('ok');res.innerHTML='🎉 ربات <b>@'+d.bot+'</b> وصل شد!'+(d.webhook?'<br>✅ وبهوک فعال شد — الان در تلگرام به ربات /start بفرستید.':'<br>⚠️ توکن ذخیره شد اما وبهوک تنظیم نشد — چند لحظه بعد دوباره دکمه را بزنید.');}
    else{res.classList.add('bad');res.textContent='⛔ '+(d.error||'خطا');}
  }catch(e){res.classList.add('bad');res.textContent='⛔ خطای شبکه — دوباره تلاش کنید'}
  btn.disabled=false;btn.textContent='✅ بررسی و فعال‌سازی ربات';
}
</script></body></html>`;
}
function panelHTML() {
  return `<!DOCTYPE html>

<html lang="tr" dir="ltr"><head><meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="noindex" name="robots"/>
<title data-i18n="p0">پنل مدیریت — Aykan Et &amp; Mangal</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;600;800&amp;display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#120f0e;--card:rgba(255,255,255,.045);--bd:rgba(255,255,255,.09);--tx:#f5efe9;--mut:#b8a89c;--or1:#e2621c;--or2:#f2833a;--gr:#25d366;--red:#ef4444}
body{font-family:Vazirmatn,Tahoma,system-ui,sans-serif;background:var(--bg);color:var(--tx);min-height:100vh;
background-image:radial-gradient(900px 500px at 85% -10%,rgba(226,98,28,.16),transparent 60%),radial-gradient(700px 420px at 0% 110%,rgba(37,211,102,.07),transparent 60%)}
.hide{display:none!important}
/* ---- login ---- */
#login{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.lg{background:var(--card);border:1px solid var(--bd);backdrop-filter:blur(14px);border-radius:26px;padding:40px 36px;width:100%;max-width:400px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.5)}
.lg img{width:92px;height:92px;border-radius:50%;border:3px solid var(--or1);object-fit:cover}
.lg h1{font-size:21px;font-weight:800;margin:14px 0 4px;background:linear-gradient(90deg,var(--or2),var(--or1));-webkit-background-clip:text;background-clip:text;color:transparent}
.lg p{font-size:12.5px;color:var(--mut);margin-bottom:22px}
.lg input{width:100%;padding:14px;border-radius:14px;border:1px solid var(--bd);background:rgba(0,0,0,.35);color:var(--tx);font-size:18px;text-align:center;letter-spacing:6px;font-family:inherit;outline:none}
.lg input:focus{border-color:var(--or1)}
.lg button{width:100%;margin-top:12px;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff;font-size:15px;font-weight:800;font-family:inherit;cursor:pointer;transition:.2s}
.lg button:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(226,98,28,.35)}
.err{color:var(--red);font-size:12.5px;margin-top:10px;min-height:16px}
/* ---- app ---- */
header{position:sticky;top:0;z-index:50;background:rgba(18,15,14,.85);backdrop-filter:blur(14px);border-bottom:1px solid var(--bd)}
.hw{max-width:1180px;margin:0 auto;padding:12px 18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.hw img{width:44px;height:44px;border-radius:50%;border:2px solid var(--or1);object-fit:cover}
.hw .t{flex:1;min-width:140px}
.hw .t b{font-size:15px;display:block}
.hw .t span{font-size:11px;color:var(--mut)}
nav{display:flex;gap:8px;flex-wrap:wrap}
nav button{padding:9px 14px;border-radius:12px;border:1px solid var(--bd);background:var(--card);color:var(--mut);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:.15s}
nav button.on{background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff;border-color:transparent}
nav button:hover:not(.on){color:var(--tx);border-color:var(--or1)}
main{max-width:1180px;margin:0 auto;padding:24px 18px 70px}
.view{animation:fu .35s ease}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(215px,1fr));gap:14px;margin-bottom:22px}
.stat{background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:20px;backdrop-filter:blur(10px);transition:.2s}
.stat:hover{border-color:var(--or1);transform:translateY(-3px)}
.stat .n{font-size:30px;font-weight:800;background:linear-gradient(90deg,var(--or2),var(--or1));-webkit-background-clip:text;background-clip:text;color:transparent}
.stat .l{font-size:12.5px;color:var(--mut);margin-top:6px}
.card{background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:20px;backdrop-filter:blur(10px);margin-bottom:18px}
.card h3{font-size:15.5px;font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.tools{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
.tools input,.tools select{padding:11px 14px;border-radius:12px;border:1px solid var(--bd);background:rgba(0,0,0,.35);color:var(--tx);font-family:inherit;font-size:13px;outline:none;min-width:180px;flex:1}
.tools input:focus,.tools select:focus{border-color:var(--or1)}
table{width:100%;border-collapse:collapse;font-size:12.8px}
th{color:var(--or2);font-weight:700;text-align:right;padding:9px 8px;border-bottom:1px solid var(--bd);white-space:nowrap}
td{padding:9px 8px;border-bottom:1px solid rgba(255,255,255,.05);vertical-align:top}
tr:hover td{background:rgba(226,98,28,.05)}
.tag{display:inline-block;padding:3px 10px;border-radius:99px;font-size:10.5px;font-weight:700;border:1px solid var(--bd);color:var(--mut);white-space:nowrap}
.tag.or{border-color:var(--or1);color:var(--or2)}
.tag.gr{border-color:var(--gr);color:var(--gr)}
.wa{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:9px;background:var(--gr);color:#062d16;font-weight:800;font-size:11px;text-decoration:none;white-space:nowrap}
.tel{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:9px;background:rgba(255,255,255,.1);color:var(--tx);font-size:11px;text-decoration:none;white-space:nowrap}
.mut{color:var(--mut);font-size:11.5px}
.big{width:100%;border-radius:16px;border:1px solid var(--bd);display:block}
.dl{display:inline-block;margin-top:12px;padding:11px 20px;border-radius:12px;background:linear-gradient(135deg,var(--or1),var(--or2));color:#fff;font-weight:800;font-size:13px;text-decoration:none}
.lnk a{display:flex;justify-content:space-between;align-items:center;background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:13px 16px;margin:8px 0;color:var(--tx);text-decoration:none;font-size:13.5px;transition:.15s}
.lnk a:hover{border-color:var(--or1);transform:translateX(-4px)}
.lnk a span{color:var(--mut);font-size:11px;direction:ltr}
.empty{text-align:center;color:var(--mut);padding:30px;font-size:13px}
.refresh{padding:9px 14px;border-radius:11px;border:1px solid var(--or1);background:transparent;color:var(--or2);font-family:inherit;font-size:12px;font-weight:700;cursor:pointer}
@media(max-width:640px){.hw .t span{display:none}td,th{padding:7px 5px;font-size:11.8px}}.sgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}
.pcard{background:rgba(0,0,0,.28);border:1px solid var(--bd);border-radius:18px;padding:16px}
.pcard .ph{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:800;margin-bottom:10px}
.pcard label{display:block;font-size:11px;color:var(--mut);margin:8px 0 4px}
.pcard input{width:100%;padding:9px 12px;border-radius:10px;border:1px solid var(--bd);background:rgba(0,0,0,.35);color:var(--tx);font-family:inherit;font-size:12px;outline:none}
.pcard input:focus{border-color:var(--or1)}
.pcard .chk,.tools .chk{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--tx);margin-top:10px;cursor:pointer}
.pcard .chk input,.tools .chk input{width:auto}
.prow{display:flex;align-items:center;gap:9px;margin-top:12px;flex-wrap:wrap}
.tst{padding:8px 14px;border-radius:10px;border:1px solid var(--gr);background:transparent;color:var(--gr);font-family:inherit;font-size:11.5px;font-weight:700;cursor:pointer}
.tst:hover{background:rgba(37,211,102,.12)}
.sttx{font-size:11.5px;color:var(--mut);line-height:1.9;direction:rtl}
.hint{font-size:10.8px;color:var(--mut);margin-top:10px;line-height:1.9;border-top:1px dashed var(--bd);padding-top:8px}
textarea#so-text{width:100%;padding:12px;border-radius:12px;border:1px solid var(--bd);background:rgba(0,0,0,.35);color:var(--tx);font-family:inherit;font-size:13px;min-height:90px;outline:none;resize:vertical}
textarea#so-text:focus,#so-img:focus{border-color:var(--or1)}
#so-img{width:100%;padding:11px 14px;border-radius:12px;border:1px solid var(--bd);background:rgba(0,0,0,.35);color:var(--tx);font-family:inherit;font-size:12.5px;outline:none;margin-top:10px}
@media(max-width:640px){.hw .t span{display:none}td,th{padding:7px 5px;font-size:11.8px}}

/* ─── همبرگری + دراور ─── */
.hbtn{position:fixed;top:14px;inset-inline-end:14px;z-index:10001;width:42px;height:42px;border-radius:12px;border:1px solid rgba(0,0,0,.18);background:#1c1917;color:#fff;font-size:20px;cursor:pointer;display:none;line-height:1}
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998;display:none}
.drawer{position:fixed;top:0;bottom:0;inset-inline-start:-300px;width:284px;background:#fff;z-index:10000;transition:inset-inline-start .25s ease;display:flex;flex-direction:column;gap:2px;padding:18px 14px;overflow-y:auto;box-shadow:0 0 44px rgba(0,0,0,.28)}
.drawer.open{inset-inline-start:0}
.drawer .dtitle{font-weight:900;font-size:15px;margin-bottom:10px}
.drawer button.dnav{display:block;width:100%;text-align:start;padding:12px 14px;border-radius:12px;border:0;background:transparent;font:inherit;font-weight:800;cursor:pointer;color:inherit}
.drawer button.dnav.on{background:#fdeaea;color:#b91c1c}
.dlang{display:flex;gap:6px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(0,0,0,.08)}
.dlang button{width:36px;height:36px;border-radius:50%;border:0;background:transparent;font-size:17px;cursor:pointer;filter:grayscale(.7);opacity:.75}
.dlang button.on{filter:none;opacity:1;background:#fdeaea}
.view{overflow-x:auto}
@media(max-width:940px){.hbtn{display:block}nav{display:none}table{min-width:560px}.view .card{padding:14px}}
</style></head><body>
<div id="login">
<div class="lg">
<img alt="Aykan" src="${LOGO}"/>
<h1 data-i18n="p1">AYKAN ET &amp; MANGAL</h1>
<p data-i18n="p2">پنل مدیریت — رمز ادمین را وارد کنید</p>
<input autofocus="" data-i18n="p109" data-i18n-attr="placeholder" id="pin" inputmode="numeric" maxlength="8" placeholder="••••" type="password"/>
<button data-i18n="p3" onclick="doLogin()">🔐 ورود به پنل</button>
<div class="err" id="lgerr"></div>
</div>
</div>
<div class="hide" id="app">
<header><div class="hw">
<img alt="Aykan" src="${LOGO}"/>
<div class="t"><b data-i18n="p4">پنل مدیریت آیکان ات و منگال</b><span data-i18n="p5">سفارش‌ها • لیدها • شبکه‌های اجتماعی — روی Cloudflare D1</span></div>
<nav>
<button class="on" data-i18n="p6" id="tb-dash" onclick="go('dash')">📊 داشبورد</button>
<button data-i18n="p7" id="tb-orders" onclick="go('orders')">🧾 سفارش‌ها</button>
<button data-i18n="p8" id="tb-leads" onclick="go('leads')">🎯 لیدها</button>
<button data-i18n="p9" id="tb-kart" onclick="go('kart')">💳 کارت ویزیت</button>
<button data-i18n="p10" id="tb-b2b" onclick="go('b2b')">🏢 B2B</button>
<button data-i18n="p11" id="tb-ai" onclick="go('ai')">🤖 AI</button>
<button data-i18n="p12" id="tb-links" onclick="go('links')">🔗 لینک‌ها</button>
<button data-i18n="p13" id="tb-social" onclick="go('social')">🌐 شبکه‌ها</button>
<button data-i18n="p14" onclick="logout()" style="border-color:rgba(239,68,68,.4);color:#f87171;">خروج</button>
</nav>
</div></header>
<main>
<div class="view" id="v-dash">
<div class="grid">
<div class="stat"><div class="n" data-i18n="p15" id="s-today">۰</div><div class="l" data-i18n="p16">🧾 سفارش امروز</div></div>
<div class="stat"><div class="n" data-i18n="p17" id="s-total">۰</div><div class="l" data-i18n="p18">📦 کل سفارش‌ها</div></div>
<div class="stat"><div class="n" data-i18n="p19" id="s-rev">۰</div><div class="l" data-i18n="p20">💰 درآمد جمع (TL)</div></div>
<div class="stat"><div class="n" data-i18n="p21" id="s-leads">۵۱۰</div><div class="l" data-i18n="p22">🎯 لیدهای ثبت‌شده</div></div>
</div>
<div class="card"><h3 data-i18n="p23">🕒 آخرین سفارش‌ها</h3><div id="dash-orders"></div></div>
</div>
<div class="view hide" id="v-orders">
<div class="card"><h3>🧾 همه سفارش‌ها <button class="refresh" data-i18n="p24" onclick="loadOrders()">↻ تازه‌سازی</button></h3><div id="orders-body"></div></div>
</div>
<div class="view hide" id="v-leads">
<div class="card">
<h3 data-i18n="p25">🎯 بانک ۵۱۰ لید (Cloudflare D1)</h3>
<div class="tools">
<input data-i18n="p110" data-i18n-attr="placeholder" id="lq" oninput="renderLeads()" placeholder="🔍 جستجو: نام، منطقه، تلفن، ایمیل..."/>
<select id="lc" onchange="renderLeads()"><option data-i18n="p26" value="">همه دسته‌ها</option></select>
</div>
<div class="mut" id="lcount" style="margin-bottom:10px"></div>
<div style="overflow-x:auto"><table id="ltable"></table></div>
</div>
</div>
<div class="view hide" id="v-b2b">
<div class="stats">
<div class="stat"><div class="n" data-i18n="p27" id="b2-new">۰</div><div class="l" data-i18n="p28">🆕 درخواست جدید</div></div>
<div class="stat"><div class="n" data-i18n="p29" id="b2-quoted">۰</div><div class="l" data-i18n="p30">🧾 پیش‌فاکتور داده شد</div></div>
<div class="stat"><div class="n" data-i18n="p31" id="b2-won">۰</div><div class="l" data-i18n="p32">✅ تبدیل به سفارش</div></div>
<div class="stat"><div class="n" data-i18n="p33" id="b2-kg">۰</div><div class="l" data-i18n="p34">⚖️ کیلو قراردادها</div></div>
</div>
<div class="card"><h3>📥 صندوق درخواست‌های خرید (RFQ) <button class="refresh" data-i18n="p35" onclick="loadB2B()">↻ تازه‌سازی</button></h3>
<p class="mut" data-i18n="p36" style="margin-bottom:10px">منبع: فرم «خرید هوشمند» سایت + دکمه‌ی ربات. مسیر: 🆕 جدید ← 🧾 پیش‌فاکتور ← ✅ سفارش / ⛔ از دست رفت.</p>
<div style="overflow-x:auto"><table id="b2table"></table></div>
</div>
<div class="card hide" id="b2qcard">
<h3>🧾 پیش‌فاکتور — <span id="b2q-firm"></span></h3>
<div style="overflow-x:auto"><table id="b2q-items"></table></div>
<div class="prow">تخفیف همکار: <input id="b2q-disc" max="30" min="0" step="1" style="width:64px;padding:8px 10px;border-radius:10px;border:1px solid var(--bd);background:rgba(0,0,0,.35);color:var(--tx);font-family:inherit" type="number" value="0"/>٪
          <span id="b2q-total" style="font-weight:800;color:var(--or2)"></span></div>
<div class="prow">
<button class="refresh" data-i18n="p37" onclick="smartQuote(true)">🤖 پیشنهاد هوشمند</button>
<button class="refresh" data-i18n="p38" onclick="smartQuote(true)">🔄 بازتولید</button>
<button class="refresh" data-i18n="p39" onclick="saveQuote()">💾 ذخیره پیش‌فاکتور</button>
<button class="refresh" data-i18n="p40" onclick="markWon()" style="border-color:var(--gr);color:var(--gr)">✅ تأیید سفارش</button>
<button class="refresh" data-i18n="p41" onclick="markLost()" style="border-color:var(--red);color:var(--red)">⛔ از دست رفت</button>
</div>
<div class="prow"><a class="dl" data-i18n="p42" href="#" id="b2q-wa" style="background:var(--gr)" target="_blank">💬 ارسال پیش‌فاکتور با واتس‌اپ</a><span class="sttx" id="b2q-st"></span></div>
<p class="mut" data-i18n="p43">🤖 پیشنهاد هوشمند: قیمت هر قلم از کاتالوگ روز + تخفیف حجمی خودکار (۶۰kg←۴٪ · ۱۰۰kg←۷٪ · ۱۵۰kg←۱۰٪). 🔄 بازتولید بعد از هر تغییر قیمت، دوباره از روی آخرین قیمت‌ها می‌سازد.</p>
</div>
<div class="card"><h3 data-i18n="p44">📈 تحلیل مشتریان B2B و هشدارها</h3><div id="b2firms"></div></div>
</div>
<div class="view hide" id="v-ai">
<div class="stats">
<div class="stat"><div class="n" data-i18n="p45" id="ai-new">۰</div><div class="l" data-i18n="p46">🎯 لید جدید AI</div></div>
<div class="stat"><div class="n" data-i18n="p47" id="ai-added">۰</div><div class="l" data-i18n="p48">➕ افزوده به لیدها</div></div>
<div class="stat"><div class="n" data-i18n="p49" id="ai-trends">۰</div><div class="l" data-i18n="p50">📈 ترندهای ثبت‌شده</div></div>
<div class="stat"><div class="n" data-i18n="p51" id="ai-sync">—</div><div class="l" data-i18n="p52">🔄 آخرین همگام‌سازی</div></div>
</div>
<div class="card"><h3>🎯 رستوران‌های کاندیدا (کاشف لید AI) <button class="refresh" data-i18n="p53" onclick="radarRefresh()">↻ اسکن جدید</button></h3>
<p class="mut" data-i18n="p54" style="margin-bottom:10px">رادار AI رستوران‌های تازه‌افتتاح‌شده‌ی استانبول را از اخبار پیدا می‌کند و امتیاز می‌دهد. با «➕» به دفتر لیدها (تب 🎯) اضافه‌شان کنید.</p>
<div style="overflow-x:auto"><table id="aitable"></table></div>
</div>
<div class="card"><h3 data-i18n="p55">📈 آخرین ترندهای غذایی (منتشرشده در بلاگ سایت)</h3><div id="aitrends"></div></div>
</div>
<div class="view hide" id="v-kart">
<div class="card"><h3 data-i18n="p56">💳 کارت ویزیت — سه مدل نهایی (فقط ادمین)</h3>
<img alt="کارت ویزیت" class="big" src="/kart.png"/>
<a class="dl" data-i18n="p57" download="aykan-kart-vizit.png" href="/kart.png">⬇️ دانلود تصویر کارت‌ها</a>
<p class="mut" style="margin-top:10px">فایل چاپ PDF (۶ صفحه) در پوشه کاری: <b data-i18n="p58">aykan_kart_final_baski.pdf</b> — سه مدل: İŞTAH (قرمز) • PREMIUM (طلایی) • TAZELİK (سبز)</p>
</div>
</div>
<div class="view hide" id="v-links">
<div class="card lnk"><h3 data-i18n="p59">🔗 لینک‌ها و دستورهای ربات</h3>
<a href="${SITE}" target="_blank">🌐 سایت + فرم خرید B2B <span data-i18n="p60">lively-mouse-0c7c.aykanet34.workers.dev</span></a>
<a href="${SITE}/#b2bform" target="_blank">🤖 فرم خرید هوشمند رستوران <span data-i18n="p61">lively-mouse-0c7c…/#b2bform</span></a>
<a href="https://t.me/Aykan_Et_mangal_shopping_bot" target="_blank">🤖 ربات تلگرام <span data-i18n="p62">@Aykan_Et_mangal_shopping_bot</span></a>
<a href="https://t.me/AykanEtmangal_shopping" target="_blank">📢 کانال فروش <span data-i18n="p63">@AykanEtmangal_shopping</span></a>
<a href="https://wa.me/905377325269" target="_blank">💬 واتساپ فروشگاه <span data-i18n="p64">0537 732 52 69</span></a>
<p class="mut" style="margin-top:14px;line-height:2">دستورهای ربات: <b data-i18n="p65">/admin 5269</b> سپس <b data-i18n="p66">/plan</b> برنامه پست‌ها • <b data-i18n="p67">/aralik N</b> فاصله پست (ساعت) • <b data-i18n="p68">/postnow</b> ارسال فوری • <b data-i18n="p69">/lidedefteri</b> دفتر لیدها • <b data-i18n="p70">/yatirim</b> لیدرهای سرمایه‌گذاری • <b data-i18n="p71">/bolge 1..10</b> خلاصه منطقه</p>
</div>
</div>
<div class="view hide" id="v-social">
<div class="card">
<h3 data-i18n="p72">🌐 شبکه‌های اجتماعی — پست خودکار هم‌زمان</h3>
<p class="mut" style="line-height:2.1;margin-bottom:16px">
          هر پستی که ربات به کانال تلگرام می‌فرستد، <b data-i18n="p73">خودکار</b> به همه پلتفرم‌های فعال زیر هم ارسال می‌شود (سینک با تلگرام).<br/>
          برای هر پلتفرم: توکن را وارد کنید ← «ذخیره» ← «تست اتصال». توکن‌ها فقط در دیتابیس امن Cloudflare D1 ذخیره می‌شوند.
        </p>
<div class="sgrid">
<div class="pcard">
<div class="ph">✈️ تلگرام <span class="tag gr" data-i18n="p74">متصل — ربات فعال</span></div>
<label data-i18n="p75">توکن ربات (BotFather)</label><input data-i18n="p111" data-i18n-attr="placeholder" id="so-tg-token" placeholder="123456:ABC-DEF..."/>
<label data-i18n="p76">شناسه کانال</label><input data-i18n="p112" data-i18n-attr="placeholder" id="so-tg-channel" placeholder="@AykanEtmangal_shopping"/>
<label class="chk"><input id="so-tg-enabled" type="checkbox"/> فعال</label>
<div class="prow"><button class="tst" data-i18n="p77" onclick="testSocial('tg')">🔌 تست اتصال</button><span class="sttx" id="so-tg-st"></span></div>
<p class="hint" data-i18n="p78">ربات فعلی فروشگاه — نیازی به تغییر نیست. با تست، اتصال ربات و کانال بررسی می‌شود.</p>
</div>
<div class="pcard">
<div class="ph">💬 واتساپ <span class="tag" data-i18n="p79">نیاز به توکن</span></div>
<label data-i18n="p80">توکن دائمی (Permanent Access Token)</label><input data-i18n="p113" data-i18n-attr="placeholder" id="so-wa-token" placeholder="EAAG..."/>
<label data-i18n="p81">شناسه شماره (Phone Number ID)</label><input data-i18n="p114" data-i18n-attr="placeholder" id="so-wa-phone_id" placeholder="123456789012345"/>
<label data-i18n="p82">شماره دریافت پیام تست/سفارش (905...)</label><input data-i18n="p115" data-i18n-attr="placeholder" id="so-wa-to" placeholder="905377325269"/>
<label data-i18n="p83">توکن تایید وبهوک (Verify Token)</label><input data-i18n="p116" data-i18n-attr="placeholder" id="so-wa-verify_token" placeholder="aykan-wa-verify"/>
<label data-i18n="p84">پاسخ خودکار به مشتری</label><input data-i18n="p117" data-i18n-attr="placeholder" id="so-wa-autoreply" placeholder="سلام! منو و قیمت‌ها: ..."/>
<label class="chk"><input id="so-wa-enabled" type="checkbox"/> فعال (ارسال خودکار + پاسخ‌دهی ربات)</label>
<div class="prow"><button class="tst" data-i18n="p85" onclick="testSocial('wa')">🔌 تست اتصال</button><span class="sttx" id="so-wa-st"></span></div>
<p class="hint">💰 رایگان و رسمی: در <b data-i18n="p86">business.facebook.com</b> یک Business Manager بسازید ← اپ WhatsApp Business API ← شماره جدید بگیرید ← توکن و Phone ID را از API Setup کپی کنید. سپس در WhatsApp ← Configuration آدرس وبهوک را بگذارید:<br/><b data-i18n="p87" dir="ltr">https://lively-mouse-0c7c.aykanet34.workers.dev/api/wa-webhook</b><br/>با فعال‌کردن، پیام‌های مشتریان خودکار پاسخ می‌گیرند و در «لیدها» ثبت می‌شوند!</p>
</div>
<div class="pcard">
<div class="ph">📸 اینستاگرام <span class="tag" data-i18n="p88">نیاز به توکن</span></div>
<label data-i18n="p89">توکن (Instagram API)</label><input data-i18n="p118" data-i18n-attr="placeholder" id="so-ig-token" placeholder="IGQVJ..."/>
<label data-i18n="p90">شناسه اکانت (IG User ID)</label><input data-i18n="p119" data-i18n-attr="placeholder" id="so-ig-user_id" placeholder="1784..."/>
<label class="chk"><input id="so-ig-enabled" type="checkbox"/> فعال — هر پست کانال، پست اینستاگرام هم بشود</label>
<div class="prow"><button class="tst" data-i18n="p91" onclick="testSocial('ig')">🔌 تست اتصال</button><span class="sttx" id="so-ig-st"></span></div>
<p class="hint">پیش‌نیاز: اکانت اینستاگرام <b data-i18n="p92">Business</b> متصل به یک صفحه فیسبوک. در <b data-i18n="p93">developers.facebook.com</b> اپ بسازید با مجوز instagram_basic + instagram_content_publish ← توکن از Graph API Explorer. ارسال پست اینستاگرام نیاز به <b data-i18n="p94">لینک عکس عمومی</b> دارد (در فرم پایین).</p>
</div>
<div class="pcard">
<div class="ph">🎬 تیک‌تاک <span class="tag" data-i18n="p95">نیاز به توکن</span></div>
<label data-i18n="p96">توکن کاربر (user access token)</label><input data-i18n="p120" data-i18n-attr="placeholder" id="so-tt-token" placeholder="act...."/>
<label class="chk"><input id="so-tt-enabled" type="checkbox"/> فعال</label>
<div class="prow"><button class="tst" data-i18n="p97" onclick="testSocial('tt')">🔌 تست اتصال</button><span class="sttx" id="so-tt-st"></span></div>
<p class="hint">در <b data-i18n="p98">developers.tiktok.com</b> اپ بسازید و محصول Login Kit + Content Posting API را اضافه کنید. نکته: انتشار ویدیو نیاز به تایید اپ توسط تیک‌تاک دارد؛ تا آن موقع تست توکن و ذخیره انجام می‌شود.</p>
</div>
<div class="pcard">
<div class="ph">👍 فیسبوک <span class="tag" data-i18n="p99">نیاز به توکن</span></div>
<label data-i18n="p100">توکن صفحه (Page Access Token)</label><input data-i18n="p121" data-i18n-attr="placeholder" id="so-fb-token" placeholder="EAAG..."/>
<label data-i18n="p101">شناسه صفحه (Page ID)</label><input data-i18n="p122" data-i18n-attr="placeholder" id="so-fb-page_id" placeholder="1029384756"/>
<label class="chk"><input id="so-fb-enabled" type="checkbox"/> فعال</label>
<div class="prow"><button class="tst" data-i18n="p102" onclick="testSocial('fb')">🔌 تست اتصال</button><span class="sttx" id="so-fb-st"></span></div>
<p class="hint" data-i18n="p103">در developers.facebook.com ← Graph API Explorer ← صفحه خود را انتخاب و مجوز pages_manage_posts بدهید ← توکن صفحه را کپی کنید. Page ID از بخش About صفحه.</p>
</div>
</div>
<div class="prow" style="margin-top:16px">
<button class="dl" data-i18n="p104" onclick="saveSocial()">💾 ذخیره تنظیمات همه پلتفرم‌ها</button>
<span class="sttx" id="so-save-st"></span>
</div>
</div>
<div class="card">
<h3 data-i18n="p105">✍️ ارسال / زمان‌بندی پست از پنل</h3>
<p class="mut" data-i18n="p106" style="margin-bottom:10px">متن دلخواه بنویسید و هم‌زمان به کانال تلگرام و شبکه‌های فعال بفرستید (مثلاً تخفیف لحظه‌ای).</p>
<textarea data-i18n="p123" data-i18n-attr="placeholder" id="so-text" placeholder="🔥 تخفیف ویژه امروز آیکان! ..."></textarea>
<input data-i18n="p124" data-i18n-attr="placeholder" id="so-img" placeholder="لینک عکس عمومی (اختیاری — برای اینستاگرام الزامی)"/>
<div class="tools" style="margin-top:12px">
<label class="chk"><input checked="" id="sp-tg" type="checkbox"/> ✈️ تلگرام</label>
<label class="chk"><input id="sp-wa" type="checkbox"/> 💬 واتساپ</label>
<label class="chk"><input id="sp-ig" type="checkbox"/> 📸 اینستاگرام</label>
<label class="chk"><input id="sp-fb" type="checkbox"/> 👍 فیسبوک</label>
<label class="chk"><input id="sp-tt" type="checkbox"/> 🎬 تیک‌تاک</label>
</div>
<div class="prow"><button class="dl" data-i18n="p107" onclick="sendSocial()">🚀 ارسال پست</button><span class="sttx" id="so-send-st"></span></div>
</div>
<div class="card"><h3 data-i18n="p108">📜 گزارش ارسال‌ها و تست‌ها</h3><div style="overflow-x:auto"><table id="so-log"></table></div></div>
</div>
</main>
</div>
<button class="hbtn" id="hbtn" aria-label="Menu">☰</button>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer">
  <div class="dtitle" data-i18n="p_menu">🥩 منوی پنل</div>
  <button class="dnav" data-i18n="p6" onclick="go('dash');closeDrawer()">📊</button>
  <button class="dnav" data-i18n="p7" onclick="go('orders');closeDrawer()">🧾</button>
  <button class="dnav" data-i18n="p8" onclick="go('leads');closeDrawer()">🎯</button>
  <button class="dnav" data-i18n="p10" onclick="go('b2b');closeDrawer()">🏢</button>
  <button class="dnav" data-i18n="p11" onclick="go('ai');closeDrawer()">🤖</button>
  <button class="dnav" data-i18n="p9" onclick="go('kart');closeDrawer()">💳</button>
  <button class="dnav" data-i18n="p12" onclick="go('links');closeDrawer()">🔗</button>
  <button class="dnav" data-i18n="p13" onclick="go('social');closeDrawer()">🌐</button>
  <button class="dnav" data-i18n="p14" onclick="logout();closeDrawer()">🚪</button>
  <div class="dlang">
    <button data-l="tr" title="Türkçe">🇹🇷</button><button data-l="fa" title="فارسی">🇮🇷</button><button data-l="ar" title="العربية">🇸🇦</button><button data-l="en" title="English">🇬🇧</button>
  </div>
</aside>
<script>
// ─── i18n پنل: TR پیش‌فرض ───
var I18N = {"fa": {"p0": "پنل مدیریت — Aykan Et & Mangal", "p1": "AYKAN ET & MANGAL", "p2": "پنل مدیریت — رمز ادمین را وارد کنید", "p3": "🔐 ورود به پنل", "p4": "پنل مدیریت آیکان ات و منگال", "p5": "سفارش‌ها • لیدها • شبکه‌های اجتماعی — روی Cloudflare D1", "p6": "📊 داشبورد", "p7": "🧾 سفارش‌ها", "p8": "🎯 لیدها", "p9": "💳 کارت ویزیت", "p10": "🏢 B2B", "p11": "🤖 AI", "p12": "🔗 لینک‌ها", "p13": "🌐 شبکه‌ها", "p14": "خروج", "p15": "۰", "p16": "🧾 سفارش امروز", "p17": "۰", "p18": "📦 کل سفارش‌ها", "p19": "۰", "p20": "💰 درآمد جمع (TL)", "p21": "۵۱۰", "p22": "🎯 لیدهای ثبت‌شده", "p23": "🕒 آخرین سفارش‌ها", "p24": "↻ تازه‌سازی", "p25": "🎯 بانک ۵۱۰ لید (Cloudflare D1)", "p26": "همه دسته‌ها", "p27": "۰", "p28": "🆕 درخواست جدید", "p29": "۰", "p30": "🧾 پیش‌فاکتور داده شد", "p31": "۰", "p32": "✅ تبدیل به سفارش", "p33": "۰", "p34": "⚖️ کیلو قراردادها", "p35": "↻ تازه‌سازی", "p36": "منبع: فرم «خرید هوشمند» سایت + دکمه‌ی ربات. مسیر: 🆕 جدید ← 🧾 پیش‌فاکتور ← ✅ سفارش / ⛔ از دست رفت.", "p37": "🤖 پیشنهاد هوشمند", "p38": "🔄 بازتولید", "p39": "💾 ذخیره پیش‌فاکتور", "p40": "✅ تأیید سفارش", "p41": "⛔ از دست رفت", "p42": "💬 ارسال پیش‌فاکتور با واتس‌اپ", "p43": "🤖 پیشنهاد هوشمند: قیمت هر قلم از کاتالوگ روز + تخفیف حجمی خودکار (۶۰kg←۴٪ · ۱۰۰kg←۷٪ · ۱۵۰kg←۱۰٪). 🔄 بازتولید بعد از هر تغییر قیمت، دوباره از روی آخرین قیمت‌ها می‌سازد.", "p44": "📈 تحلیل مشتریان B2B و هشدارها", "p45": "۰", "p46": "🎯 لید جدید AI", "p47": "۰", "p48": "➕ افزوده به لیدها", "p49": "۰", "p50": "📈 ترندهای ثبت‌شده", "p51": "—", "p52": "🔄 آخرین همگام‌سازی", "p53": "↻ اسکن جدید", "p54": "رادار AI رستوران‌های تازه‌افتتاح‌شده‌ی استانبول را از اخبار پیدا می‌کند و امتیاز می‌دهد. با «➕» به دفتر لیدها (تب 🎯) اضافه‌شان کنید.", "p55": "📈 آخرین ترندهای غذایی (منتشرشده در بلاگ سایت)", "p56": "💳 کارت ویزیت — سه مدل نهایی (فقط ادمین)", "p57": "⬇️ دانلود تصویر کارت‌ها", "p58": "aykan_kart_final_baski.pdf", "p59": "🔗 لینک‌ها و دستورهای ربات", "p60": "lively-mouse-0c7c.aykanet34.workers.dev", "p61": "lively-mouse-0c7c…/#b2bform", "p62": "@Aykan_Et_mangal_shopping_bot", "p63": "@AykanEtmangal_shopping", "p64": "0537 732 52 69", "p65": "/admin 5269", "p66": "/plan", "p67": "/aralik N", "p68": "/postnow", "p69": "/lidedefteri", "p70": "/yatirim", "p71": "/bolge 1..10", "p72": "🌐 شبکه‌های اجتماعی — پست خودکار هم‌زمان", "p73": "خودکار", "p74": "متصل — ربات فعال", "p75": "توکن ربات (BotFather)", "p76": "شناسه کانال", "p77": "🔌 تست اتصال", "p78": "ربات فعلی فروشگاه — نیازی به تغییر نیست. با تست، اتصال ربات و کانال بررسی می‌شود.", "p79": "نیاز به توکن", "p80": "توکن دائمی (Permanent Access Token)", "p81": "شناسه شماره (Phone Number ID)", "p82": "شماره دریافت پیام تست/سفارش (905...)", "p83": "توکن تایید وبهوک (Verify Token)", "p84": "پاسخ خودکار به مشتری", "p85": "🔌 تست اتصال", "p86": "business.facebook.com", "p87": "https://lively-mouse-0c7c.aykanet34.workers.dev/api/wa-webhook", "p88": "نیاز به توکن", "p89": "توکن (Instagram API)", "p90": "شناسه اکانت (IG User ID)", "p91": "🔌 تست اتصال", "p92": "Business", "p93": "developers.facebook.com", "p94": "لینک عکس عمومی", "p95": "نیاز به توکن", "p96": "توکن کاربر (user access token)", "p97": "🔌 تست اتصال", "p98": "developers.tiktok.com", "p99": "نیاز به توکن", "p100": "توکن صفحه (Page Access Token)", "p101": "شناسه صفحه (Page ID)", "p102": "🔌 تست اتصال", "p103": "در developers.facebook.com ← Graph API Explorer ← صفحه خود را انتخاب و مجوز pages_manage_posts بدهید ← توکن صفحه را کپی کنید. Page ID از بخش About صفحه.", "p104": "💾 ذخیره تنظیمات همه پلتفرم‌ها", "p105": "✍️ ارسال / زمان‌بندی پست از پنل", "p106": "متن دلخواه بنویسید و هم‌زمان به کانال تلگرام و شبکه‌های فعال بفرستید (مثلاً تخفیف لحظه‌ای).", "p107": "🚀 ارسال پست", "p108": "📜 گزارش ارسال‌ها و تست‌ها", "p109": "••••", "p110": "🔍 جستجو: نام، منطقه، تلفن، ایمیل...", "p111": "123456:ABC-DEF...", "p112": "@AykanEtmangal_shopping", "p113": "EAAG...", "p114": "123456789012345", "p115": "905377325269", "p116": "aykan-wa-verify", "p117": "سلام! منو و قیمت‌ها: ...", "p118": "IGQVJ...", "p119": "1784...", "p120": "act....", "p121": "EAAG...", "p122": "1029384756", "p123": "🔥 تخفیف ویژه امروز آیکان! ...", "p124": "لینک عکس عمومی (اختیاری — برای اینستاگرام الزامی)", "p_menu": "🥩 منوی پنل", "cats2": {"Big Restaurant": "🥩 رستوران بزرگ", "Ordinary Fast Food": "🍔 فست‌فود و دونر", "Hotel": "🏨 هتل", "Catering": "🍲 کیترینگ و کارخانه", "Ordinary People": "👨‍👩‍👧‍👦 مجتمع و گروه محلی", "Investment Leader": "💼 سرمایه‌گذاری"}, "d_lead": "لید", "d_now": "الان", "d_h_ago": " ساعت پیش", "d_added": "➕ افزوده", "d_new": "🆕 جدید", "d_quoted": "🧾 پیش‌فاکتور", "d_won": "✅ سفارش", "d_lost": "⛔ رد", "d_sale": "🛒 فروش", "d_ok": "✅ موفق", "d_err": "❌ خطا", "d_wa": "💬 واتس‌اپ", "th_code": "کد", "th_cust": "مشتری", "th_amt": "مبلغ", "th_items": "اقلام", "th_time": "زمان", "th_action": "اقدام", "th_cat": "دسته", "th_news": "خبر", "th_src": "منبع", "th_name": "نام", "th_area": "منطقه", "th_status": "وضعیت", "th_score": "امتیاز", "th_platform": "پلتفرم", "th_details": "جزئیات", "th_prod": "محصول", "th_last": "آخرین قیمت", "th_total": "جمع", "th_firm": "مجموعه", "th_kg": "کیلو", "th_contact": "تماس", "th_web": "وب‌سایت", "e_orders": "هنوز سفارشی ثبت نشده — اولین سفارش از ربات تلگرام اینجا ظاهر می‌شود 🛒", "e_orders2": "هنوز سفارشی ثبت نشده است", "e_none": "موردی یافت نشد", "e_ai": "با اولین درخواست، تحلیل مشتریان اینجا ساخته می‌شود 📈", "e_radar": "هنوز کاندیدایی پیدا نشده — دکمه «↻ اسکن جدید» را بزنید 🤖", "e_rfq": "هنوز درخواستی ثبت نشده — از فرم «خرید هوشمند» سایت یا دکمه‌ی ربات می‌آید 🏢", "th_req": "درخواست", "th_wr": "نرخ برد", "th_av": "میانگین حجم", "th_la": "آخرین فعالیت", "a_lost": "⛔ از دست رفت", "e_social": "هنوز ارسال یا تستی ثبت نشده", "e_trends": "ترندی ثبت نشده — «↻ اسکن جدید» را بزنید", "a_confirm": "تأیید می‌کنید؟", "a_convert": "تبدیل به سفارش؟ در تب سفارش‌ها با کد B2B ثبت می‌شود.", "a_disc": "تخفیف همکار: ", "a_sum": "جمع: ", "a_err": "خطا", "a_save_err": "خطا در ذخیره", "a_prev": "قبلی: ", "a_q_no": "پیش‌فاکتور آیکان #", "a_sending": "⏳ در حال ارسال...", "a_testing": "⏳ در حال تست اتصال...", "a_saving": "⏳ در حال ذخیره...", "a_net": "⛔ خطای شبکه", "a_radar": "⛔ رادار در دسترس نیست — چند دقیقه بعد دوباره", "a_no_items": "⛔ قلمی نمانده است", "a_need_post": "⛔ متن پست و حداقل یک پلتفرم لازم است", "a_saved": "✅ ذخیره شد — توکن‌ها در دیتابیس امن ذخیره شدند", "a_order_ok": "✅ سفارش ثبت شد", "a_code": " — کد: ", "a_regen": "✅ پیشنهاد هوشمند بازتولید شد — قیمت‌ها از کاتالوگ روز + تخفیف حجمی خودکار", "a_quote_saved": "✅ پیش‌فاکتور ذخیره شد (", "a_saved_hist": ") و در تاریخچه قیمت ثبت شد", "a_after_disc": " (پس از تخفیف از ", "a_days_nobuy": " روز بی‌خرید", "th_kg": "🥩 گوشت (kg/ماه)", "d_total_kg": "جمع تخمینی:", "d_month": "ماه", "d_est_note": "تخمین مصرف ماهانه گوشت بر اساس دسته، امتیاز و نام مجموعه — تقریبی هوشمند است", "a_20plus": "۲۰+"}, "tr": {"p0": "Yönetim Paneli — Aykan Et & Mangal", "p2": "Yönetim Paneli — yönetici şifresini girin", "p3": "🔐 Panele Giriş", "p4": "Aykan Et & Mangal Yönetim Paneli", "p5": "Siparişler • Müşteri adayları • Sosyal medya — Cloudflare D1 üzerinde", "p6": "📊 Dashboard", "p7": "🧾 Siparişler", "p8": "🎯 Müşteri Adayları", "p9": "💳 Kartvizit", "p10": "🏢 B2B", "p11": "🤖 AI", "p12": "🔗 Bağlantılar", "p13": "🌐 Sosyal", "p14": "Çıkış", "p15": "0", "p16": "🧾 Bugünün siparişi", "p17": "0", "p18": "📦 Toplam sipariş", "p19": "0", "p20": "💰 Toplam ciro (TL)", "p21": "510", "p22": "🎯 Kayıtlı müşteri adayı", "p23": "🕒 Son siparişler", "p24": "↻ Yenile", "p25": "🎯 510 müşteri adayı bankası (Cloudflare D1)", "p26": "Tüm kategoriler", "p27": "0", "p28": "🆕 Yeni talep", "p29": "0", "p30": "🧾 Proforma verildi", "p31": "0", "p32": "✅ Siparişe dönüştü", "p33": "0", "p34": "⚖️ Sözleşme kilosu", "p35": "↻ Yenile", "p36": "Kaynak: sitenin «Akıllı Alım» formu + bottaki buton. Akış: 🆕 Yeni ← 🧾 Proforma ← ✅ Sipariş / ⛔ Kayıp.", "p37": "🤖 Akıllı öneri", "p38": "🔄 Yeniden oluştur", "p39": "💾 Proformayı kaydet", "p40": "✅ Siparişi onayla", "p41": "⛔ Kayıp", "p42": "💬 Proformayı WhatsApp ile gönder", "p43": "🤖 Akıllı öneri: kalemlerin fiyatı günlük katalogdan + otomatik hacim indirimi (60kg←%4 · 100kg←%7 · 150kg←%10). 🔄 Yeniden oluştur, son fiyatlarla yeniden hesaplar.", "p44": "📈 B2B müşteri analizi ve uyarılar", "p45": "0", "p46": "🎯 Yeni AI müşteri adayı", "p47": "0", "p48": "➕ Leadlere eklendi", "p49": "0", "p50": "📈 Kayıtlı trendler", "p51": "—", "p52": "🔄 Son eşitleme", "p53": "↻ Yeni tarama", "p54": "AI radarı İstanbul'da yeni açılan restoranları haberlerden bulur ve puanlar. «➕» ile müşteri adayı defterine (🎯 sekmesi) ekleyin.", "p55": "📈 Son yemek trendleri (sitenin blogunda yayında)", "p56": "💳 Kartvizit — üç final modeli (yalnızca yönetici)", "p57": "⬇️ Kart görsellerini indir", "p59": "🔗 Bağlantılar ve bot komutları", "p72": "🌐 Sosyal medya — eşzamanlı otomatik gönderi", "p73": "Otomatik", "p74": "Bağlı — bot aktif", "p75": "Bot tokeni (BotFather)", "p76": "Kanal kimliği", "p77": "🔌 Bağlantıyı test et", "p78": "Mağazanın mevcut botu — değiştirmek gerekmez. Testle bot ve kanal bağlantısı kontrol edilir.", "p79": "Token gerekli", "p80": "Kalıcı erişim tokeni (Permanent Access Token)", "p81": "Telefon numarası kimliği (Phone Number ID)", "p82": "Test/sipariş mesajı alınacak numara (905...)", "p83": "Webhook doğrulama tokeni (Verify Token)", "p84": "Müşteriye otomatik yanıt", "p85": "🔌 Bağlantıyı test et", "p88": "Token gerekli", "p89": "Token (Instagram API)", "p90": "Hesap kimliği (IG User ID)", "p91": "🔌 Bağlantıyı test et", "p94": "Herkese açık görsel bağlantısı", "p95": "Token gerekli", "p96": "Kullanıcı tokeni (user access token)", "p97": "🔌 Bağlantıyı test et", "p99": "Token gerekli", "p100": "Sayfa tokeni (Page Access Token)", "p101": "Sayfa kimliği (Page ID)", "p102": "🔌 Bağlantıyı test et", "p103": "developers.facebook.com ← Graph API Explorer ← sayfanızı seçin ve pages_manage_posts iznini verin ← sayfa tokenini kopyalayın. Page ID, sayfanın About bölümünde.", "p104": "💾 Tüm platform ayarlarını kaydet", "p105": "✍️ Panelden gönderi gönder / zamanla", "p106": "İstediğiniz metni yazın ve aynı anda Telegram kanalına ve aktif sosyal platformlara gönderin (örn. anlık indirim).", "p107": "🚀 Gönderiyi gönder", "p108": "📜 Gönderim ve test geçmişi", "p110": "🔍 Ara: isim, bölge, telefon, e-posta...", "p117": "Selam! Menü ve fiyatlar: ...", "p123": "🔥 Aykan'ın günün özel indirimi! ...", "p124": "Herkese açık görsel bağlantısı (isteğe bağlı — Instagram için zorunlu)", "p_menu": "🥩 Panel Menüsü", "d_lead": "müşteri adayı", "d_now": "şimdi", "d_h_ago": " saat önce", "d_added": "➕ Eklendi", "d_new": "🆕 Yeni", "d_quoted": "🧾 Proforma", "d_won": "✅ Sipariş", "d_lost": "⛔ Kayıp", "d_sale": "🛒 Satış", "d_ok": "✅ Başarılı", "d_err": "❌ Hata", "d_wa": "💬 WhatsApp", "th_code": "Kod", "th_cust": "Müşteri", "th_amt": "Tutar", "th_items": "Kalemler", "th_time": "Zaman", "th_action": "İşlem", "th_cat": "Kategori", "th_news": "Haber", "th_src": "Kaynak", "th_name": "İsim", "th_area": "Bölge", "th_status": "Durum", "th_score": "Puan", "th_platform": "Platform", "th_details": "Detay", "th_prod": "Ürün", "th_last": "Son Fiyat", "th_total": "Toplam", "th_firm": "İşletme", "th_kg": "Kg", "th_contact": "İletişim", "th_web": "Web", "e_orders": "Henüz sipariş yok — ilk sipariş Telegram botundan burada görünür 🛒", "e_orders2": "Henüz sipariş kaydı yok", "e_none": "Kayıt bulunamadı", "e_ai": "İlk taleple müşteri analizi burada oluşur 📈", "e_radar": "Henüz aday yok — «↻ Yeni tarama» düğmesine basın 🤖", "e_rfq": "Henüz talep yok — sitenin «Akıllı Alım» formundan veya bot düğmesinden gelir 🏢", "th_req": "Talep", "th_wr": "Kazanma oranı", "th_av": "Ortalama hacim", "th_la": "Son etkinlik", "a_lost": "⛔ Kaybedildi", "e_social": "Henüz gönderim/test kaydı yok", "e_trends": "Kayıtlı trend yok — «↻ Yeni tarama» ya basın", "a_confirm": "Onaylıyor musunuz?", "a_convert": "Siparişe çevrilsin mi? Siparişler sekmesinde B2B koduyla kaydedilir.", "a_disc": "Ortak indirimi: ", "a_sum": "Toplam: ", "a_err": "Hata", "a_save_err": "Kaydetme hatası", "a_prev": "Önceki: ", "a_q_no": "Aykan Proforma #", "a_sending": "⏳ Gönderiliyor...", "a_testing": "⏳ Bağlantı test ediliyor...", "a_saving": "⏳ Kaydediliyor...", "a_net": "⛔ Ağ hatası", "a_radar": "⛔ Radar erişilemiyor — birkaç dakika sonra tekrar deneyin", "a_no_items": "⛔ Kalem kalmadı", "a_need_post": "⛔ Gönderi metni ve en az bir platform gerekli", "a_saved": "✅ Kaydedildi — tokenlar güvenli veritabanında saklandı", "a_order_ok": "✅ Sipariş kaydedildi", "a_code": " — Kod: ", "a_regen": "✅ Akıllı öneri yenilendi — fiyatlar günlük katalogdan + otomatik hacim indirimi", "a_quote_saved": "✅ Proforma kaydedildi (", "a_saved_hist": ") ve fiyat geçmişine kaydedildi", "a_after_disc": " (indirim sonrası, ", "a_days_nobuy": " gün siparişsiz", "th_kg": "🥩 Et (kg/ay)", "d_total_kg": "Tahmini toplam:", "d_month": "ay", "d_est_note": "Aylık et ihtiyacı; kategoriye, puana ve işletme adına göre akıllı tahmin — yaklaşıktır", "a_20plus": "20+", "cats2": {"Big Restaurant": "🥩 Büyük Restoran", "Ordinary Fast Food": "🍔 Fast Food & Döner", "Hotel": "🏨 Otel", "Catering": "🍲 Catering & Fabrika", "Ordinary People": "👨‍👩‍👧‍👦 Site & Aile Grubu", "Investment Leader": "💼 Yatırımcı"}, "p67": "/aralik N", "p120": "act....", "p118": "IGQVJ...", "p1": "AYKAN ET & MANGAL", "p63": "@AykanEtmangal_shopping", "p98": "developers.tiktok.com", "p122": "1029384756", "p60": "lively-mouse-0c7c.aykanet34.workers.dev", "p87": "https://lively-mouse-0c7c.aykanet34.workers.dev/api/wa-webhook", "p119": "1784...", "p113": "EAAG...", "p111": "123456:ABC-DEF...", "p65": "/admin 5269", "p58": "aykan_kart_final_baski.pdf", "p115": "905377325269", "p86": "business.facebook.com", "p62": "@Aykan_Et_mangal_shopping_bot", "p114": "123456789012345", "p121": "EAAG...", "p68": "/postnow", "p70": "/yatirim", "p69": "/lidedefteri", "p109": "••••", "p71": "/bolge 1..10", "p92": "Business", "p61": "lively-mouse-0c7c…/#b2bform", "p112": "@AykanEtmangal_shopping", "p93": "developers.facebook.com", "p66": "/plan", "p64": "0537 732 52 69", "p116": "aykan-wa-verify"}, "ar": {"p0": "لوحة الإدارة — Aykan Et & Mangal", "p2": "لوحة الإدارة — أدخل كلمة مرور المدير", "p3": "🔐 دخول اللوحة", "p4": "لوحة إدارة أيكان للحوم والمشاوي", "p5": "الطلبات • العملاء المحتملون • وسائل التواصل — على Cloudflare D1", "p6": "📊 لوحة التحكم", "p7": "🧾 الطلبات", "p8": "🎯 العملاء المحتملون", "p9": "💳 بطاقة العمل", "p10": "🏢 B2B", "p11": "🤖 AI", "p12": "🔗 الروابط", "p13": "🌐 الشبكات", "p14": "خروج", "p15": "٠", "p16": "🧾 طلب اليوم", "p17": "٠", "p18": "📦 إجمالي الطلبات", "p19": "٠", "p20": "💰 الإيراد الإجمالي (ليرة)", "p21": "٥١٠", "p22": "🎯 عميل محتمل مسجل", "p23": "🕒 آخر الطلبات", "p24": "↻ تحديث", "p25": "🎯 بنك ٥١٠ عميل محتمل (Cloudflare D1)", "p26": "كل الفئات", "p27": "٠", "p28": "🆕 طلب جديد", "p29": "٠", "p30": "🧾 أُعطيت فاتورة مبدئية", "p31": "٠", "p32": "✅ حُوّل إلى طلب", "p33": "٠", "p34": "⚖️ كيلوغرامات العقود", "p35": "↻ تحديث", "p36": "المصدر: نموذج «الشراء الذكي» في الموقع + زر البوت. المسار: 🆕 جديد ← 🧾 فاتورة ← ✅ طلب / ⛔ خسارة.", "p37": "🤖 اقتراح ذكي", "p38": "🔄 إعادة توليد", "p39": "💾 حفظ الفاتورة", "p40": "✅ تأكيد الطلب", "p41": "⛔ خسارة", "p42": "💬 إرسال الفاتورة عبر واتساب", "p43": "🤖 الاقتراح الذكي: سعر كل بند من كتالوج اليوم + خصم الكمية التلقائي (60كغ←4٪ · 100كغ←7٪ · 150كغ←10٪). 🔄 إعادة التوليد تعيد الحساب بآخر الأسعار.", "p44": "📈 تحليل عملاء B2B والتنبيهات", "p45": "٠", "p46": "🎯 عميل AI جديد", "p47": "٠", "p48": "➕ أُضيف إلى العملاء", "p49": "٠", "p50": "📈 الترندات المسجلة", "p51": "—", "p52": "🔄 آخر مزامنة", "p53": "↻ مسح جديد", "p54": "رادار AI يكتشف المطاعم المنشورة حديثاً في إستانبول من الأخبار ويقيّمها. أضفها بـ «➕» إلى دفتر العملاء (تب 🎯).", "p55": "📈 أحدث ترندات الطعام (منشورة في مدونة الموقع)", "p56": "💳 بطاقة العمل — ثلاثة نماذج نهائية (للمدير فقط)", "p57": "⬇️ تنزيل صور البطاقات", "p59": "🔗 الروابط وأوامر البوت", "p72": "🌐 وسائل التواصل — نشر تلقائي متزامن", "p73": "تلقائي", "p74": "متصل — البوت نشط", "p75": "توكن البوت (BotFather)", "p76": "معرّف القناة", "p77": "🔌 اختبار الاتصال", "p78": "بوت المتجر الحالي — لا حاجة للتغيير. بالاختبار يُفحص اتصال البوت والقناة.", "p79": "يلزم توكن", "p80": "توكن وصول دائم (Permanent Access Token)", "p81": "معرّف رقم الهاتف (Phone Number ID)", "p82": "رقم استلام رسائل الاختبار/الطلبات (905...)", "p83": "توكن تحقق الويبهوك (Verify Token)", "p84": "رد تلقائي على العميل", "p85": "🔌 اختبار الاتصال", "p88": "يلزم توكن", "p89": "التوكن (Instagram API)", "p90": "معرّف الحساب (IG User ID)", "p91": "🔌 اختبار الاتصال", "p94": "رابط صورة عام", "p95": "يلزم توكن", "p96": "توكن المستخدم (user access token)", "p97": "🔌 اختبار الاتصال", "p99": "يلزم توكن", "p100": "توكن الصفحة (Page Access Token)", "p101": "معرّف الصفحة (Page ID)", "p102": "🔌 اختبار الاتصال", "p103": "في developers.facebook.com ← Graph API Explorer ← اختر صفحتك وامنح إذن pages_manage_posts ← انسخ توكن الصفحة. معرّف الصفحة من قسم About.", "p104": "💾 حفظ إعدادات كل المنصات", "p105": "✍️ نشر/جدولة منشور من اللوحة", "p106": "اكتب أي نص وأرسله في آن واحد إلى قناة تيليغرام والمنصات النشطة (مثلاً خصم لحظي).", "p107": "🚀 إرسال المنشور", "p108": "📜 سجل الإرسالات والاختبارات", "p110": "🔍 بحث: الاسم، المنطقة، الهاتف، البريد...", "p117": "مرحباً! القائمة والأسعار: ...", "p123": "🔥 عرض أيكان الخاص لليوم! ...", "p124": "رابط صورة عام (اختياري — إلزامي لإنستغرام)", "p_menu": "🥩 قائمة اللوحة", "d_lead": "عميل محتمل", "d_now": "الآن", "d_h_ago": " ساعة مضت", "d_added": "➕ مضاف", "d_new": "🆕 جديد", "d_quoted": "🧾 فاتورة مبدئية", "d_won": "✅ طلب", "d_lost": "⛔ خسارة", "d_sale": "🛒 بيع", "d_ok": "✅ ناجح", "d_err": "❌ خطأ", "d_wa": "💬 واتساب", "th_code": "الرمز", "th_cust": "العميل", "th_amt": "المبلغ", "th_items": "البنود", "th_time": "الوقت", "th_action": "إجراء", "th_cat": "الفئة", "th_news": "الخبر", "th_src": "المصدر", "th_name": "الاسم", "th_area": "المنطقة", "th_status": "الحالة", "th_score": "النقاط", "th_platform": "المنصة", "th_details": "التفاصيل", "th_prod": "المنتج", "th_last": "آخر سعر", "th_total": "المجموع", "th_firm": "الجهة", "th_kg": "كغ", "th_contact": "التواصل", "th_web": "الموقع", "e_orders": "لا طلبات بعد — أول طلب من بوت تيليغرام يظهر هنا 🛒", "e_orders2": "لا طلبات مسجلة بعد", "e_none": "لا نتائج", "e_ai": "مع أول طلب، يُبنى تحليل العملاء هنا 📈", "e_radar": "لا مرشحين بعد — اضغط زر «↻ مسح جديد» 🤖", "e_rfq": "لا طلبات بعد — تأتي من نموذج «الشراء الذكي» في الموقع أو زر البوت 🏢", "th_req": "طلب", "th_wr": "معدل الفوز", "th_av": "متوسط الحجم", "th_la": "آخر نشاط", "a_lost": "⛔ خسارة", "e_social": "لا إرسالات أو اختبارات بعد", "e_trends": "لا ترندات — اضغط «↻ مسح جديد»", "a_confirm": "هل تأكد؟", "a_convert": "تحويل إلى طلب؟ يُسجل في تب الطلبات برمز B2B.", "a_disc": "خصم الشريك: ", "a_sum": "المجموع: ", "a_err": "خطأ", "a_save_err": "خطأ في الحفظ", "a_prev": "السابق: ", "a_q_no": "فاتورة أيكان #", "a_sending": "⏳ جارٍ الإرسال...", "a_testing": "⏳ جارٍ اختبار الاتصال...", "a_saving": "⏳ جارٍ الحفظ...", "a_net": "⛔ خطأ في الشبكة", "a_radar": "⛔ الرادار غير متاح — حاول بعد دقائق", "a_no_items": "⛔ لا بنود متبقية", "a_need_post": "⛔ يلزم نص المنشور ومنصة واحدة على الأقل", "a_saved": "✅ تم الحفظ — الرموز محفوظة في قاعدة البيانات الآمنة", "a_order_ok": "✅ تم تسجيل الطلب", "a_code": " — الرمز: ", "a_regen": "✅ تم تجديد الاقتراح الذكي — الأسعار من كتالوج اليوم + خصم الكمية التلقائي", "a_quote_saved": "✅ حُفظت الفاتورة (", "a_saved_hist": ") وحُفظ في سجل الأسعار", "a_after_disc": " (بعد الخصم من ", "a_days_nobuy": " يوماً بدون شراء", "th_kg": "🥩 اللحم (كغ/شهر)", "d_total_kg": "الإجمالي التقديري:", "d_month": "شهر", "d_est_note": "تقدير الحاجة الشهرية للحم حسب الفئة والنقاط والاسم — تقدير ذكي تقريبي", "a_20plus": "+٢٠", "cats2": {"Big Restaurant": "🥩 مطعم كبير", "Ordinary Fast Food": "🍔 وجبات سريعة ودونر", "Hotel": "🏨 فندق", "Catering": "🍲 تموين ومصانع", "Ordinary People": "👨‍👩‍👧‍👦 مجمعات وعائلات", "Investment Leader": "💼 مستثمر"}, "p67": "/aralik N", "p120": "act....", "p118": "IGQVJ...", "p1": "AYKAN ET & MANGAL", "p63": "@AykanEtmangal_shopping", "p98": "developers.tiktok.com", "p122": "1029384756", "p60": "lively-mouse-0c7c.aykanet34.workers.dev", "p87": "https://lively-mouse-0c7c.aykanet34.workers.dev/api/wa-webhook", "p119": "1784...", "p113": "EAAG...", "p111": "123456:ABC-DEF...", "p65": "/admin 5269", "p58": "aykan_kart_final_baski.pdf", "p115": "905377325269", "p86": "business.facebook.com", "p62": "@Aykan_Et_mangal_shopping_bot", "p114": "123456789012345", "p121": "EAAG...", "p68": "/postnow", "p70": "/yatirim", "p69": "/lidedefteri", "p109": "••••", "p71": "/bolge 1..10", "p92": "Business", "p61": "lively-mouse-0c7c…/#b2bform", "p112": "@AykanEtmangal_shopping", "p93": "developers.facebook.com", "p66": "/plan", "p64": "0537 732 52 69", "p116": "aykan-wa-verify"}, "en": {"p0": "Admin Panel — Aykan Et & Mangal", "p2": "Admin Panel — enter the admin password", "p3": "🔐 Panel Login", "p4": "Aykan Et & Mangal Admin Panel", "p5": "Orders • Leads • Social — on Cloudflare D1", "p6": "📊 Dashboard", "p7": "🧾 Orders", "p8": "🎯 Leads", "p9": "💳 Card", "p10": "🏢 B2B", "p11": "🤖 AI", "p12": "🔗 Links", "p13": "🌐 Social", "p14": "Logout", "p15": "0", "p16": "🧾 Today's orders", "p17": "0", "p18": "📦 Total orders", "p19": "0", "p20": "💰 Total revenue (TL)", "p21": "510", "p22": "🎯 Registered leads", "p23": "🕒 Latest orders", "p24": "↻ Refresh", "p25": "🎯 Bank of 510 leads (Cloudflare D1)", "p26": "All categories", "p27": "0", "p28": "🆕 New request", "p29": "0", "p30": "🧾 Quoted", "p31": "0", "p32": "✅ Converted to order", "p33": "0", "p34": "⚖️ Contract kilos", "p35": "↻ Refresh", "p36": "Source: the site's «Smart Buying» form + the bot button. Flow: 🆕 New ← 🧾 Quote ← ✅ Order / ⛔ Lost.", "p37": "🤖 Smart suggestion", "p38": "🔄 Regenerate", "p39": "💾 Save quote", "p40": "✅ Confirm order", "p41": "⛔ Lost", "p42": "💬 Send quote via WhatsApp", "p43": "🤖 Smart suggestion: item prices from today's catalog + automatic volume discount (60kg←4% · 100kg←7% · 150kg←10%). 🔄 Regenerate recalculates from the latest prices.", "p44": "📈 B2B customer analytics & alerts", "p45": "0", "p46": "🎯 New AI lead", "p47": "0", "p48": "➕ Added to leads", "p49": "0", "p50": "📈 Recorded trends", "p51": "—", "p52": "🔄 Last sync", "p53": "↻ New scan", "p54": "The AI radar finds newly opened Istanbul restaurants in the news and scores them. Add them to the leads book (🎯 tab) with «➕».", "p55": "📈 Latest food trends (published on the site blog)", "p56": "💳 Business card — three final models (admin only)", "p57": "⬇️ Download card images", "p59": "🔗 Links & bot commands", "p72": "🌐 Social media — simultaneous auto-posting", "p73": "Automatic", "p74": "Connected — bot active", "p75": "Bot token (BotFather)", "p76": "Channel ID", "p77": "🔌 Test connection", "p78": "The store's current bot — no need to change. The test checks bot and channel connectivity.", "p79": "Token needed", "p80": "Permanent Access Token", "p81": "Phone Number ID", "p82": "Number to receive test/order messages (905...)", "p83": "Webhook verify token", "p84": "Auto-reply to customers", "p85": "🔌 Test connection", "p88": "Token needed", "p89": "Token (Instagram API)", "p90": "Account ID (IG User ID)", "p91": "🔌 Test connection", "p94": "Public image URL", "p95": "Token needed", "p96": "User access token", "p97": "🔌 Test connection", "p99": "Token needed", "p100": "Page Access Token", "p101": "Page ID", "p102": "🔌 Test connection", "p103": "On developers.facebook.com ← Graph API Explorer ← select your page and grant pages_manage_posts ← copy the page token. Page ID is in the page's About section.", "p104": "💾 Save all platform settings", "p105": "✍️ Send / schedule a post from the panel", "p106": "Write any text and send it simultaneously to the Telegram channel and active social platforms (e.g. a flash deal).", "p107": "🚀 Send post", "p108": "📜 Send & test log", "p110": "🔍 Search: name, area, phone, email...", "p117": "Hi! Menu & prices: ...", "p123": "🔥 Aykan's special deal of the day! ...", "p124": "Public image URL (optional — required for Instagram)", "p_menu": "🥩 Panel Menu", "d_lead": "leads", "d_now": "now", "d_h_ago": "h ago", "d_added": "➕ Added", "d_new": "🆕 New", "d_quoted": "🧾 Quote", "d_won": "✅ Order", "d_lost": "⛔ Lost", "d_sale": "🛒 Sale", "d_ok": "✅ OK", "d_err": "❌ Error", "d_wa": "💬 WhatsApp", "th_code": "Code", "th_cust": "Customer", "th_amt": "Amount", "th_items": "Items", "th_time": "Time", "th_action": "Action", "th_cat": "Category", "th_news": "News", "th_src": "Source", "th_name": "Name", "th_area": "Area", "th_status": "Status", "th_score": "Score", "th_platform": "Platform", "th_details": "Details", "th_prod": "Product", "th_last": "Last Price", "th_total": "Total", "th_firm": "Business", "th_kg": "Kg", "th_contact": "Contact", "th_web": "Web", "e_orders": "No orders yet — the first order from the Telegram bot appears here 🛒", "e_orders2": "No orders recorded yet", "e_none": "No results", "e_ai": "Customer analysis appears here with the first request 📈", "e_radar": "No candidates yet — hit the «↻ New scan» button 🤖", "e_rfq": "No requests yet — they come from the site's «Smart Buying» form or the bot button 🏢", "th_req": "Requests", "th_wr": "Win rate", "th_av": "Avg volume", "th_la": "Last activity", "a_lost": "⛔ Lost", "e_social": "No sends or tests yet", "e_trends": "No trends recorded — hit «↻ New scan»", "a_confirm": "Confirm?", "a_convert": "Convert to order? Registered in the Orders tab with a B2B code.", "a_disc": "Partner discount: ", "a_sum": "Total: ", "a_err": "Error", "a_save_err": "Save error", "a_prev": "Prev: ", "a_q_no": "Aykan Quote #", "a_sending": "⏳ Sending...", "a_testing": "⏳ Testing connection...", "a_saving": "⏳ Saving...", "a_net": "⛔ Network error", "a_radar": "⛔ Radar unavailable — try again in a few minutes", "a_no_items": "⛔ No items left", "a_need_post": "⛔ Post text and at least one platform required", "a_saved": "✅ Saved — tokens stored in the secure database", "a_order_ok": "✅ Order registered", "a_code": " — Code: ", "a_regen": "✅ Smart suggestion regenerated — prices from today's catalog + auto volume discount", "a_quote_saved": "✅ Quote saved (", "a_saved_hist": ") and saved to price history", "a_after_disc": " (after discount from ", "a_days_nobuy": " days no purchase", "th_kg": "🥩 Meat (kg/mo)", "d_total_kg": "Estimated total:", "d_month": "mo", "d_est_note": "Monthly meat need smart-estimated from category, score and business name — approximate", "a_20plus": "20+", "cats2": {"Big Restaurant": "🥩 Big Restaurant", "Ordinary Fast Food": "🍔 Fast Food & Döner", "Hotel": "🏨 Hotel", "Catering": "🍲 Catering & Factory", "Ordinary People": "👨‍👩‍👧‍👦 Family & Community", "Investment Leader": "💼 Investor"}, "p67": "/aralik N", "p120": "act....", "p118": "IGQVJ...", "p1": "AYKAN ET & MANGAL", "p63": "@AykanEtmangal_shopping", "p98": "developers.tiktok.com", "p122": "1029384756", "p60": "lively-mouse-0c7c.aykanet34.workers.dev", "p87": "https://lively-mouse-0c7c.aykanet34.workers.dev/api/wa-webhook", "p119": "1784...", "p113": "EAAG...", "p111": "123456:ABC-DEF...", "p65": "/admin 5269", "p58": "aykan_kart_final_baski.pdf", "p115": "905377325269", "p86": "business.facebook.com", "p62": "@Aykan_Et_mangal_shopping_bot", "p114": "123456789012345", "p121": "EAAG...", "p68": "/postnow", "p70": "/yatirim", "p69": "/lidedefteri", "p109": "••••", "p71": "/bolge 1..10", "p92": "Business", "p61": "lively-mouse-0c7c…/#b2bform", "p112": "@AykanEtmangal_shopping", "p93": "developers.facebook.com", "p66": "/plan", "p64": "0537 732 52 69", "p116": "aykan-wa-verify"}};
var CUR = "tr";
function t(k){var d=I18N[CUR]||{};if(d[k]!=null)return d[k];var f=I18N.fa[k];return f!=null?f:k}
function applyLang(l){
  CUR=l;
  var rtl=(l==="fa"||l==="ar");
  document.documentElement.lang=l;
  document.documentElement.dir=rtl?"rtl":"ltr";
  document.title=t("p0");
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var k=el.getAttribute("data-i18n");
    if(el.hasAttribute("data-i18n-attr")){el.setAttribute(el.getAttribute("data-i18n-attr"),t(k));}
    else{el.textContent=t(k);}
  });
  document.querySelectorAll(".dlang button").forEach(function(b){b.classList.toggle("on",b.dataset.l===l)});
  if(typeof CATS!=="undefined"&&I18N[CUR]&&I18N[CUR].cats2){try{CATS=I18N[CUR].cats2}catch(e){}}
  if(typeof TOK!=="undefined"&&TOK){try{loadStats();loadOrders();loadLeads();loadB2B();loadAI();}catch(e){}}
  syncDrawer();
}
function setLangP(l){applyLang(l);try{localStorage.setItem("aykan_panel_lang",l)}catch(e){}}
document.querySelectorAll(".dlang button").forEach(function(b){b.onclick=function(){setLangP(b.dataset.l)}});
function openDrawer(){syncDrawer();document.getElementById("drawer").classList.add("open");document.getElementById("scrim").style.display="block"}
function closeDrawer(){document.getElementById("drawer").classList.remove("open");document.getElementById("scrim").style.display="none"}
function syncDrawer(){
  var cur=null;
  document.querySelectorAll("nav button").forEach(function(b){if(b.classList.contains("on"))cur=b.id.replace("tb-","")});
  document.querySelectorAll(".drawer .dnav").forEach(function(b){
    b.classList.toggle("on",b.getAttribute("onclick").indexOf("'"+cur+"'")>-1);
  });
}
document.getElementById("hbtn").onclick=openDrawer;
document.getElementById("scrim").onclick=closeDrawer;
(function(){
  var sv=null;try{sv=localStorage.getItem("aykan_panel_lang")}catch(e){}
  applyLang(sv&&I18N[sv]?sv:"tr");
})();
</script>

<script>
const API = location.origin;
let TOK = localStorage.getItem("aykan_panel_token") || "";
let LEADS = [], ORDERS = [];
const fa = n => Number(n || 0).toLocaleString(({fa:"fa-IR",ar:"ar-EG",tr:"tr-TR",en:"en-US"})[CUR] || "tr-TR");
const en = n => Number(n || 0).toLocaleString(({fa:"fa-IR",ar:"ar-EG",tr:"tr-TR",en:"en-US"})[CUR] || "en-US");
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

async function api(path, opts) {
  const r = await fetch(API + path, Object.assign({ headers: { authorization: "Bearer " + TOK } }, opts || {}));
  if (r.status === 401) { logout(); throw new Error("unauthorized"); }
  return r.json();
}
async function doLogin() {
  const pin = document.getElementById("pin").value.trim();
  document.getElementById("lgerr").textContent = "";
  const r = await fetch(API + "/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pin }) });
  const d = await r.json();
  if (!d.ok) { document.getElementById("lgerr").textContent = "⛔ " + (d.error || "خطا"); return; }
  TOK = d.token; localStorage.setItem("aykan_panel_token", TOK);
  startApp();
}
document.getElementById("pin").addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
function logout() { localStorage.removeItem("aykan_panel_token"); location.reload(); }

async function startApp() {
  document.getElementById("login").classList.add("hide");
  document.getElementById("app").classList.remove("hide");
  await Promise.all([loadStats(), loadOrders(), loadLeads(), loadSocial(), loadB2B(), loadAI()]);
}
function go(v) {
  ["dash", "orders", "leads", "b2b", "ai", "kart", "links", "social"].forEach(x => {
    document.getElementById("v-" + x).classList.toggle("hide", x !== v);
    const b = document.getElementById("tb-" + x); if (b) b.classList.toggle("on", x === v);
  });
}
async function loadStats() {
  try {
    const s = await api("/api/stats");
    document.getElementById("s-today").textContent = fa(s.ordersToday);
    document.getElementById("s-total").textContent = fa(s.ordersTotal);
    document.getElementById("s-rev").textContent = en(s.revenue);
    document.getElementById("s-leads").textContent = fa(s.leads);
  } catch (e) {}
}
function orderRow(o, dash) {
  const wa = o.phone && /^\\+?90?5/.test(o.phone.replace(/\\D/g, "").replace(/^90?/, "90")) ? '<a class="wa" href="https://wa.me/' + o.phone.replace(/\\D/g, "").replace(/^0/, "90") + '" target="_blank">' + t("d_wa") + '</a>' : "";
  const kind = o.kind === "b2b" ? '<span class="tag">🏢 B2B</span>' : '<span class="tag or">' + t("d_sale") + '</span>';
  return "<tr><td><b>" + esc(o.code || "—") + "</b><br>" + kind + "</td><td>" + esc(o.name || "—") +
    "<br><span class='mut' dir='ltr'>" + esc(o.phone || "") + "</span></td><td>" + (o.total ? "<b>" + en(o.total) + " TL</b>" : "—") +
    "</td><td class='mut'>" + esc((o.items && o.items.length ? JSON.stringify(o.items).slice(0, 80) : "") || "") +
    "</td>" + (dash ? "" : "<td class='mut' dir='ltr'>" + esc(o.created_at || "") + "</td>") +
    "<td>" + wa + (o.phone ? ' <a class="tel" href="tel:' + esc(o.phone) + '">📞</a>' : "") + "</td></tr>";
}
async function loadOrders() {
  try {
    const d = await api("/api/orders?limit=200");
    ORDERS = d.orders || [];
    const body = ORDERS.length
      ? "<table><tr><th>"+t("th_code")+"</th><th>"+t("th_cust")+"</th><th>"+t("th_amt")+"</th><th>"+t("th_items")+"</th>" + (location.hash === "#dash" ? "" : "<th>"+t("th_time")+"</th>") + "<th>"+t("th_action")+"</th></tr>" +
        ORDERS.slice(0, 200).map(o => orderRow(o)).join("") + "</table>"
      : '<div class="empty">' + t("e_orders") + '</div>';
    document.getElementById("orders-body").innerHTML = body;
    document.getElementById("dash-orders").innerHTML = ORDERS.length
      ? "<table><tr><th>"+t("th_code")+"</th><th>"+t("th_cust")+"</th><th>"+t("th_amt")+"</th><th>"+t("th_items")+"</th><th>"+t("th_action")+"</th></tr>" + ORDERS.slice(0, 8).map(o => orderRow(o, true)).join("") + "</table>"
      : '<div class="empty">' + t("e_orders2") + '</div>';
  } catch (e) {}
}
let CATS = (I18N[CUR] && I18N[CUR].cats2) || I18N.fa.cats2;
async function loadLeads() {
  try {
    const d = await api("/api/data");
    LEADS = d.leads || [];
    const sel = document.getElementById("lc");
    Object.entries(CATS).forEach(([k, v]) => { const o = document.createElement("option"); o.value = k; o.textContent = v; sel.appendChild(o); });
    renderLeads();
  } catch (e) {}
}
// ─── AI: تخمین هوشمند نیاز ماهانه گوشت (kg) بر اساس دسته + امتیاز + نام ───
const KG_BASE = { "Big Restaurant": [400, 800], "Ordinary Fast Food": [150, 420], "Hotel": [300, 900], "Catering": [500, 1600], "Ordinary People": [20, 80], "Investment Leader": [0, 0] };
function leadCat(l) {
  if (KG_BASE[l.category]) return l.category;
  const s = ((l.category || "") + " " + (l.name || "") + " " + (l.title || "")).toLowerCase();
  if (/hotel|otel/.test(s)) return "Hotel";
  if (/catering|fabrika|factory|sanayi|asevi|ogrenci/.test(s)) return "Catering";
  if (/doner|burger|kofte|fast|gida|restaur|rest |lokanta|ocakbasi|steak|kebap|etli|biftek/.test(s)) return "Big Restaurant";
  return "Ordinary Fast Food";
}
function estKg(l) {
  const cat = leadCat(l);
  if (cat === "Investment Leader") return 0;
  const sc = Math.max(0, Math.min(100, Number(l.opportunity) || 50));
  let kg = KG_BASE[cat][0] + (KG_BASE[cat][1] - KG_BASE[cat][0]) * (sc / 100);
  const nm = ((l.name || "") + " " + (l.title || "")).toLowerCase();
  if (/fabrika|factory|sanayi|endustri/.test(nm)) kg *= 1.6;
  else if (/grand|palace|luxury|5 star|5 yildiz/.test(nm)) kg *= 1.4;
  else if (/buyuk|mega|king|star/.test(nm)) kg *= 1.2;
  else if (/kofte|burger|doner|fast/.test(nm)) kg *= 0.85;
  return Math.round(kg / 10) * 10;
}
let LSORT = { key: "area", dir: 1 };
function sortLeads(k) { if (LSORT.key === k) LSORT.dir = -LSORT.dir; else LSORT = { key: k, dir: 1 }; renderLeads(); }
function renderLeads() {
  const q = (document.getElementById("lq").value || "").toLowerCase();
  const c = document.getElementById("lc").value;
  let rows = LEADS.filter(l => (!c || l.category === c) && (!q || (l.name + " " + l.area + " " + (l.phone || "") + " " + (l.email || "") + " " + (l.website || "")).toLowerCase().includes(q)));
  const kd = { name: function (l) { return (l.name || "").toLocaleLowerCase("tr"); }, area: function (l) { return (l.area || "").toLocaleLowerCase("tr"); }, cat: function (l) { return leadCat(l); }, score: function (l) { return Number(l.opportunity) || 0; }, kg: function (l) { return estKg(l); } };
  rows.sort(function (a, b) {
    var r = (LSORT.key === "score" || LSORT.key === "kg") ? (kd[LSORT.key](a) - kd[LSORT.key](b)) : kd[LSORT.key](a).localeCompare(kd[LSORT.key](b), "tr");
    if (!r) r = kd.name(a).localeCompare(kd.name(b), "tr");
    return r * LSORT.dir;
  });
  const totKg = rows.reduce(function (s, l) { return s + estKg(l); }, 0);
  const maxKg = Math.max.apply(null, [1].concat(rows.slice(0, 120).map(function (l) { return estKg(l); })));
  document.getElementById("lcount").innerHTML = fa(rows.length) + " / " + fa(LEADS.length) + " " + t("d_lead") + ' · <span class="tag or">🥩 ' + t("d_total_kg") + " <b>" + fa(totKg) + "</b> kg/" + t("d_month") + "</span><br><span class='mut' style='font-size:11.5px'>🤖 " + t("d_est_note") + "</span>";
  const sh = function (k2, lbl) { return '<th style="cursor:pointer;white-space:nowrap" onclick="sortLeads(&#39;' + k2 + '&#39;)" title="&#8597;">' + lbl + (LSORT.key === k2 ? (LSORT.dir > 0 ? " ▲" : " ▼") : " ⇅") + "</th>"; };
  const head = "<tr>" + sh("name", t("th_name")) + sh("cat", t("th_cat")) + sh("area", t("th_area")) + "<th>" + t("th_contact") + "</th><th>" + t("th_web") + "</th>" + sh("score", t("th_score")) + sh("kg", t("th_kg")) + "</tr>";
  const body = rows.slice(0, 120).map(l => {
    const dig = (l.phone || "").replace(/\\D/g, "");
    const wa = dig.startsWith("5") || dig.startsWith("905") ? '<a class="wa" href="https://wa.me/' + (dig.startsWith("905") ? dig : "90" + dig.replace(/^0/, "")) + '">💬</a>' : "";
    const kg = estKg(l);
    const kgCell = kg ? "<b>" + fa(kg) + "</b><br><span style='display:block;height:4px;width:56px;border-radius:4px;background:rgba(0,0,0,.12);margin-top:4px'><i style='display:block;height:4px;border-radius:4px;background:linear-gradient(90deg,#f2833a,#e2621c);width:" + Math.min(100, Math.round(kg / maxKg * 100)) + "%'></i></span>" : "—";
    return "<tr><td><b>" + esc(l.name) + "</b></td><td><span class='tag'>" + (CATS[l.category] || l.category) + "</span></td><td class='mut'>" + esc(l.area) +
      "</td><td dir='ltr'>" + esc(l.phone || "") + " " + wa + ' <a class="tel" href="tel:' + esc(l.phone || "") + '">📞</a></td>' +
      "<td class='mut' dir='ltr'>" + (l.website ? '<a href="' + esc(l.website) + '" target="_blank" style="color:#f2833a">' + esc(String(l.website).replace(/^https?:\\/\\//, "")).slice(0, 28) + "</a>" : "—") +
      "</td><td><span class='tag or'>" + fa(l.opportunity) + "</span></td><td>" + kgCell + "</td></tr>";
  }).join("");
  document.getElementById("ltable").innerHTML = head + (body || '<tr><td colspan="7" class="empty">' + t("e_none") + '</td></tr>');
}
let SOC = {};
const SO_FIELDS = ["token", "channel", "phone_id", "to", "verify_token", "autoreply", "user_id", "page_id"];
async function loadSocial() {
  try {
    const r = await fetch(API + "/api/social", { headers: { authorization: "Bearer " + TOK } });
    if (r.status === 401) { logout(); return; }
    const d = await r.json();
    SOC = d.config || {};
    ["tg", "wa", "ig", "fb", "tt"].forEach(function(p) {
      const c = SOC[p] || {};
      SO_FIELDS.forEach(function(f) {
        const el = document.getElementById("so-" + p + "-" + f);
        if (el && c[f] !== undefined && c[f] !== null) el.value = c[f]; else if (el && c[f] === undefined) el.value = "";
      });
      const en = document.getElementById("so-" + p + "-enabled");
      if (en) en.checked = !!c.enabled;
    });
    const log = d.posts || [];
    document.getElementById("so-log").innerHTML = log.length
      ? "<tr><th>" + t("th_time") + "</th><th>" + t("th_platform") + "</th><th>" + t("th_status") + "</th><th>" + t("th_details") + "</th></tr>" + log.map(function(r) {
          return "<tr><td class='mut' dir='ltr'>" + esc(r.created_at) + "</td><td><span class='tag or'>" + esc(r.platform) + "</span></td><td>" +
            (r.ok ? "<span class='tag gr'>" + t("d_ok") + "</span>" : "<span class='tag' style='border-color:#ef4444;color:#f87171'>" + t("d_err") + "</span>") +
            "</td><td class='mut'>" + esc(r.detail) + "</td></tr>";
        }).join("")
      : "<tr><td colspan='4' class='empty'>" + t("e_social") + "</td></tr>";
  } catch (e) {}
}
function collectSocial() {
  const out = {};
  ["tg", "wa", "ig", "fb", "tt"].forEach(function(p) {
    const o = {};
    SO_FIELDS.forEach(function(f) {
      const el = document.getElementById("so-" + p + "-" + f);
      if (el) o[f] = el.value.trim();
    });
    const en = document.getElementById("so-" + p + "-enabled");
    if (en) o.enabled = en.checked;
    out[p] = o;
  });
  return out;
}
async function saveSocial() {
  const st = document.getElementById("so-save-st");
  st.textContent = t("a_saving");
  try {
    const r = await fetch(API + "/api/social", { method: "POST", headers: { authorization: "Bearer " + TOK, "content-type": "application/json" }, body: JSON.stringify(collectSocial()) });
    const d = await r.json();
    st.textContent = d.ok ? t("a_saved") : "⛔ " + (d.error || t("a_save_err"));
    loadSocial();
  } catch (e) { st.textContent = t("a_net"); }
}
async function testSocial(p) {
  const st = document.getElementById("so-" + p + "-st");
  st.textContent = t("a_testing");
  st.style.color = "var(--mut)";
  try {
    const r = await fetch(API + "/api/social/test", { method: "POST", headers: { authorization: "Bearer " + TOK, "content-type": "application/json" }, body: JSON.stringify({ platform: p }) });
    const d = await r.json();
    st.textContent = (d.ok ? "✅ " : "⛔ ") + (d.detail || "");
    st.style.color = d.ok ? "var(--gr)" : "#f87171";
    loadSocial();
  } catch (e) { st.textContent = t("a_net"); st.style.color = "#f87171"; }
}
async function sendSocial() {
  const st = document.getElementById("so-send-st");
  const plats = ["tg", "wa", "ig", "fb", "tt"].filter(function(p) { return document.getElementById("sp-" + p) && document.getElementById("sp-" + p).checked; });
  const text = document.getElementById("so-text").value.trim();
  const img = document.getElementById("so-img").value.trim();
  if (!plats.length || !text) { st.textContent = t("a_need_post"); st.style.color = "#f87171"; return; }
  st.textContent = t("a_sending");
  st.style.color = "var(--mut)";
  try {
    const r = await fetch(API + "/api/social/send", { method: "POST", headers: { authorization: "Bearer " + TOK, "content-type": "application/json" }, body: JSON.stringify({ text: text, image_url: img, platforms: plats }) });
    const d = await r.json();
    const res = d.results || {};
    st.innerHTML = plats.map(function(p) {
      return (res[p] && res[p].ok ? "✅ " : "⛔ ") + p + ": " + (res[p] ? esc(res[p].detail) : "—");
    }).join("<br>");
    loadSocial();
  } catch (e) { st.textContent = t("a_net"); st.style.color = "#f87171"; }
}
// ─── AI رادار: لید + ترند ───
let AID = { aiLeads: [], trends: [], lastSync: 0 };
async function loadAI() {
  try { const d = await api("/api/ai"); AID = d; renderAI(); } catch (e) {}
}
function renderAI() {
  const L = AID.aiLeads || [];
  document.getElementById("ai-new").textContent = fa(L.filter(x => x.status === "new").length);
  document.getElementById("ai-added").textContent = fa(L.filter(x => x.status === "added").length);
  document.getElementById("ai-trends").textContent = ((AID.trends || []).length >= 20 ? t("a_20plus") : fa((AID.trends || []).length));
  const ago = AID.lastSync ? Math.round((Date.now() - AID.lastSync) / 3600000) : 0;
  document.getElementById("ai-sync").textContent = AID.lastSync ? (ago < 1 ? t("d_now") : fa(ago) + t("d_h_ago")) : "—";
  const head = "<tr><th>"+t("th_score")+"</th><th>"+t("th_name")+"</th><th>"+t("th_area")+"</th><th>"+t("th_src")+"</th><th>"+t("th_status")+"</th><th></th></tr>";
  const rows = L.slice(0, 60).map(r => {
    const st = r.status === "added" ? '<span class="tag gr">' + t("d_added") + '</span>' : '<span class="tag">' + t("d_new") + '</span>';
    const act = r.status === "added" ? "" : "<button class='refresh' onclick='convertAI(" + r.id + ")'>➕</button>";
    return "<tr><td><b>" + fa(r.score) + "</b></td><td><b>" + esc(r.name) + "</b><br><span class='mut' style='font-size:11px'>" + esc(String(r.title || "").slice(0, 60)) + "</span></td><td>" + esc(r.area) +
      "</td><td class='mut' dir='ltr'><a href='" + esc(r.url) + "' target='_blank' style='color:#f2833a'>" + esc(r.source) + " ↗</a></td><td>" + st + "</td><td>" + act + "</td></tr>";
  }).join("");
  document.getElementById("aitable").innerHTML = head + (rows || '<tr><td colspan="6" class="empty">' + t("e_radar") + '</td></tr>');
  const T = AID.trends || [];
  document.getElementById("aitrends").innerHTML = T.length
    ? "<table><tr><th>" + t("th_cat") + "</th><th>" + t("th_news") + "</th><th>" + t("th_src") + "</th></tr>" + T.map(t => "<tr><td><span class='tag or'>" + esc(t.category || "📡") + "</span></td><td><a href='" + esc(t.url) + "' target='_blank' style='color:#f5efe9'>" + esc(String(t.title).slice(0, 90)) + " ↗</a></td><td class='mut' dir='ltr'>" + esc(t.source) + "</td></tr>").join("") + "</table>"
    : '<div class="empty">' + t("e_trends") + '</div>';
}
async function convertAI(id) {
  try { const d = await b2post({ action: "convert", id: id }); if (d.ok) { loadAI(); loadLeads(); } } catch (e) {}
}
async function radarRefresh() {
  try {
    const d = await b2post({ action: "refresh" });
    if (d.ok) { await loadAI(); } else { alert(t("a_radar")); }
  } catch (e) { alert(t("a_net")); }
}
// ─── B2B: صندوق RFQ + پیش‌فاکتور هوشمند ───
let B2B = { requests: [], firms: [], prices: [], catalog: [] }, B2SEL = null, QITEMS = [];
async function loadB2B() {
  try { const d = await api("/api/b2b"); B2B = d; renderB2B(); } catch (e) {}
}
async function b2post(body) {
  const r = await fetch(API + "/api/b2b", { method: "POST", headers: { authorization: "Bearer " + TOK, "content-type": "application/json" }, body: JSON.stringify(body) });
  if (r.status === 401) { logout(); throw new Error("unauthorized"); }
  return r.json();
}
function b2badge(st) {
  return { new: '<span class="tag">' + t("d_new") + '</span>', quoted: '<span class="tag or">' + t("d_quoted") + '</span>',
    won: '<span class="tag gr">' + t("d_won") + '</span>', lost: '<span class="tag" style="opacity:.5">' + t("d_lost") + '</span>' }[st] || esc(st);
}
function b2items(r) { try { return JSON.parse(r.items || "[]"); } catch (e) { return []; } }
function daysSince(ts) { try { return Math.max(0, Math.floor((Date.now() - new Date(String(ts).replace(" ", "T") + "Z").getTime()) / 86400000)); } catch (e) { return 0; } }
function waNum(phone) {
  const dig = String(phone || "").replace(/[^0-9]/g, "");
  if (!dig) return "";
  return (dig.startsWith("905") || dig.startsWith("90")) ? dig : "90" + dig.replace(/^0/, "");
}
function renderB2B() {
  const R = B2B.requests || [];
  document.getElementById("b2-new").textContent = fa(R.filter(r => r.status === "new").length);
  document.getElementById("b2-quoted").textContent = fa(R.filter(r => r.status === "quoted").length);
  document.getElementById("b2-won").textContent = fa(R.filter(r => r.status === "won").length);
  document.getElementById("b2-kg").textContent = fa(Math.round(R.filter(r => r.status === "won").reduce((a, r) => a + Number(r.total_kg || 0), 0)));
  const head = "<tr><th>#</th><th>"+t("th_time")+"</th><th>"+t("th_firm")+"</th><th>"+t("th_items")+"</th><th>"+t("th_kg")+"</th><th>₺</th><th>"+t("th_status")+"</th><th></th></tr>";
  const rows = R.map(r => {
    const its = b2items(r);
    const wn = waNum(r.phone);
    const wa = wn ? ' <a class="wa" href="https://wa.me/' + wn + '" target="_blank">💬</a>' : "";
    const names = its.slice(0, 2).map(x => esc(x.name) + " " + x.qty + "kg").join("، ") + (its.length > 2 ? " +" + fa(its.length - 2) : "");
    return "<tr><td><b>#" + r.id + "</b></td><td class='mut' dir='ltr'>" + esc(String(r.ts || "").slice(5, 16)) +
      "</td><td><b>" + esc(r.firm) + "</b><br><span class='mut' dir='ltr'>" + esc(r.phone || "") + wa + "</span></td><td class='mut'>" + names +
      "</td><td>" + fa(r.total_kg) + "</td><td>" + en(r.est_total) + "</td><td>" + b2badge(r.status) +
      "</td><td><button class='refresh' onclick='openQuote(" + r.id + ")'>🧾</button></td></tr>";
  }).join("");
  document.getElementById("b2table").innerHTML = head + (rows || '<tr><td colspan="8" class="empty">' + t("e_rfq") + '</td></tr>');
  const F = B2B.firms || [];
  const frows = F.map(f => {
    const d = daysSince(f.last);
    const alert = (f.won > 0 && d > 14) ? ' <span class="tag" style="border-color:var(--red);color:var(--red)">⚠️ ' + fa(d) + '' + t("a_days_nobuy") + '</span>' : "";
    const rate = f.n ? Math.round(100 * f.won / f.n) : 0;
    return "<tr><td><b>" + esc(f.firm || "—") + "</b>" + alert + "</td><td>" + fa(f.n) + "</td><td>" + fa(f.won) + " (" + fa(rate) + "٪)</td><td>" + fa(f.n ? Math.round(f.kg / f.n) : 0) + " kg</td><td class='mut' dir='ltr'>" + esc(String(f.last || "").slice(5, 16)) + "</td></tr>";
  }).join("");
  document.getElementById("b2firms").innerHTML = F.length
    ? "<table><tr><th>"+t("th_firm")+"</th><th>"+t("th_req")+"</th><th>"+t("th_wr")+"</th><th>"+t("th_av")+"</th><th>"+t("th_la")+"</th></tr>" + frows + "</table>"
    : '<div class="empty">' + t("e_ai") + '</div>';
}
function openQuote(id) {
  B2SEL = (B2B.requests || []).find(r => r.id === id); if (!B2SEL) return;
  document.getElementById("b2qcard").classList.remove("hide");
  document.getElementById("b2q-firm").textContent = "#" + B2SEL.id + " " + (B2SEL.firm || "");
  document.getElementById("b2q-st").textContent = "";
  let q = null; try { q = JSON.parse(B2SEL.quote || "null"); } catch (e) {}
  if (q && q.items) {
    QITEMS = q.items.map(x => ({ name: x.name, qty: x.qty, price: x.price }));
    document.getElementById("b2q-disc").value = q.discount || 0;
  } else {
    QITEMS = b2items(B2SEL).map(x => ({ name: x.name, qty: x.qty, price: x.price || 0 }));
    smartQuote(false);
  }
  renderQ();
  document.getElementById("b2qcard").scrollIntoView({ behavior: "smooth" });
}
function lastPrice(name) { const p = (B2B.prices || []).find(x => x.product === name); return p ? p.price : null; }
function catPrice(name) {
  const n = String(name || "").toLowerCase();
  const c = (B2B.catalog || []).find(x => n.includes(x.tr.toLowerCase()) || n.includes(x.fa) || x.tr.toLowerCase().includes(n));
  return c ? c.price : null;
}
function smartQuote(notify) {
  QITEMS.forEach(it => { const cp = catPrice(it.name); it.price = (cp != null) ? cp : (lastPrice(it.name) || it.price || 0); });
  const kg = QITEMS.reduce((a, x) => a + x.qty, 0);
  document.getElementById("b2q-disc").value = kg >= 150 ? 10 : kg >= 100 ? 7 : kg >= 60 ? 4 : 0;
  renderQ();
  if (notify) document.getElementById("b2q-st").textContent = t("a_regen");
}
const QIN = "padding:7px 9px;border-radius:9px;border:1px solid var(--bd);background:rgba(0,0,0,.35);color:var(--tx);font-family:inherit;font-size:12.5px;outline:none;width:100%;min-width:60px";
function renderQ() {
  const disc = parseFloat(document.getElementById("b2q-disc").value) || 0;
  let gross = 0;
  const rows = QITEMS.map((it, i) => {
    const lp = lastPrice(it.name);
    const line = it.qty * (it.price || 0); gross += line;
    return "<tr><td><input data-i='" + i + "' data-k='name' class='qin' value='" + esc(it.name) + "' style='" + QIN + ";min-width:130px'></td>" +
      "<td><input type='number' min='0' step='0.5' data-i='" + i + "' data-k='qty' class='qin' value='" + it.qty + "' style='" + QIN + "'></td>" +
      "<td><input type='number' min='0' data-i='" + i + "' data-k='price' class='qin' value='" + it.price + "' style='" + QIN + "'></td>" +
      "<td class='mut'>" + (lp != null && Math.abs(lp - (it.price || 0)) > 0.01 ? t("a_prev") + en(lp) : "—") + "</td>" +
      "<td><b>" + en(Math.round(line)) + "</b></td></tr>";
  }).join("");
  document.getElementById("b2q-items").innerHTML = "<tr><th>"+t("th_prod")+"</th><th>kg</th><th>₺/kg</th><th>"+t("th_last")+"</th><th>"+t("th_total")+"</th></tr>" + rows;
  const total = Math.round(gross * (1 - disc / 100));
  document.getElementById("b2q-total").textContent = t("a_sum") + en(total) + " ₺" + (disc ? t("a_after_disc") + en(Math.round(gross)) + ")" : "");
  const NL = String.fromCharCode(10);
  let msg = t("a_q_no") + (B2SEL ? B2SEL.id : "") + ":" + NL;
  QITEMS.forEach(it => { if (it.qty > 0) msg += "• " + it.name + " — " + it.qty + " kg × " + it.price + " TL" + NL; });
  if (disc) msg += t("a_disc") + disc + "٪" + NL;
  msg += t("a_sum") + total + " TL" + NL + t("a_confirm");
  const wn = B2SEL ? waNum(B2SEL.phone) : "";
  document.getElementById("b2q-wa").href = wn ? "https://wa.me/" + wn + "?text=" + encodeURIComponent(msg) : "#";
}
document.getElementById("b2q-items").addEventListener("change", function (ev) {
  const t = ev.target; if (!t.dataset || !t.dataset.k) return;
  const i = +t.dataset.i, k = t.dataset.k;
  if (!QITEMS[i]) return;
  QITEMS[i][k] = (k === "name") ? String(t.value).slice(0, 60) : (parseFloat(t.value) || 0);
  renderQ();
});
document.getElementById("b2q-disc").addEventListener("change", renderQ);
async function saveQuote() {
  if (!B2SEL) return;
  const disc = parseFloat(document.getElementById("b2q-disc").value) || 0;
  const items = QITEMS.filter(x => x.qty > 0);
  if (!items.length) { document.getElementById("b2q-st").textContent = t("a_no_items"); return; }
  try {
    const d = await b2post({ id: B2SEL.id, action: "quote", quote: { items: items, discount: disc, firm: B2SEL.firm } });
    document.getElementById("b2q-st").textContent = d.ok ? t("a_quote_saved") + en(d.total) + " TL" + t("a_saved_hist") : "⛔ " + (d.error || "خطا");
    loadB2B();
  } catch (e) { document.getElementById("b2q-st").textContent = t("a_net"); }
}
async function markWon() {
  if (!B2SEL) return;
  if (!confirm(t("a_convert"))) return;
  try {
    const d = await b2post({ id: B2SEL.id, action: "won" });
    document.getElementById("b2q-st").textContent = d.ok ? t("a_order_ok") + (d.code ? t("a_code") + d.code : "") : "⛔ " + (d.error || "خطا");
    loadB2B(); loadOrders(); loadStats();
  } catch (e) {}
}
async function markLost() {
  if (!B2SEL) return;
  try { await b2post({ id: B2SEL.id, action: "lost" }); document.getElementById("b2q-st").textContent = t("a_lost"); loadB2B(); } catch (e) {}
}
if (TOK) startApp();
</script>
</body></html>`;
}

const _LR = {};  // login rate-limit: 5 تلاش / ۱۰ دقیقه به ازای IP

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
    if (p === "/health") return new Response("OK — Aykan All-in-One v7.11.0 (site + panel + bot + radar)");
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
    if (p === "/api/trends" && request.method === "GET") {
      try {
        await env.DB.prepare("CREATE TABLE IF NOT EXISTS trend_news (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), title TEXT, url TEXT UNIQUE, source TEXT, published TEXT, category TEXT)").run();
        var limT = Math.min(parseInt(url.searchParams.get("limit") || "6", 10) || 6, 20);
        var tr = await env.DB.prepare("SELECT category, title, url, source, published FROM trend_news ORDER BY id DESC LIMIT ?").bind(limT).all();
        return new Response(JSON.stringify({ ok: true, trends: tr.results || [] }), { headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
      } catch (e) { return new Response(JSON.stringify({ ok: false, trends: [] }), { headers: { "content-type": "application/json", "access-control-allow-origin": "*" } }); }
    }
    if (p === "/api/radar-stats" && request.method === "GET") {
      try {
        var tn = ((await env.DB.prepare("SELECT COUNT(*) n FROM trend_news").first()) || {}).n || 0;
        var ln = ((await env.DB.prepare("SELECT COUNT(*) n FROM ai_leads").first()) || {}).n || 0;
        var ls = await getSetting(env, "ai_radar_ts");
        return new Response(JSON.stringify({ ok: true, trends: tn, aiLeads: ln, lastSync: ls || 0 }), { headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
      } catch (e) { return new Response(JSON.stringify({ ok: false }), { headers: { "content-type": "application/json", "access-control-allow-origin": "*" } }); }
    }
    if (p === "/api/dev-cleanup" && url.searchParams.get("key") === HOOK_SECRET) {
      var outC = {};
      try { await env.DB.prepare("DELETE FROM bot_chats WHERE chat_id < 0 OR (chat_id >= 555000000 AND chat_id <= 566000000)").run(); outC.chats = "ok"; } catch (e) { outC.chats = String(e).slice(0, 60); }
      try { var stC = await getSetting(env, "bot_state"); if (stC) { stC.admin_chat = null; await setSetting(env, "bot_state", stC); } outC.admin = "ok"; } catch (e) { outC.admin = String(e).slice(0, 60); }
      try { await env.DB.prepare("DELETE FROM b2b_requests WHERE firm LIKE 'Test%'").run(); outC.b2b = "ok"; } catch (e) { outC.b2b = String(e).slice(0, 60); }
      try { await env.DB.prepare("DELETE FROM leads WHERE category='AI-Restaurant'").run(); outC.leads = "ok"; } catch (e) { outC.leads = String(e).slice(0, 60); }
      try { await env.DB.prepare("UPDATE ai_leads SET status='new' WHERE status='added'").run(); outC.aireset = "ok"; } catch (e) { outC.aireset = String(e).slice(0, 60); }
      return new Response(JSON.stringify({ ok: true, done: outC }), { headers: { "content-type": "application/json" } });
    }
    if (p === "/api/ai/test" && url.searchParams.get("key") === HOOK_SECRET) {
      var q1 = url.searchParams.get("q") || "et fiyatları";
      var src1 = url.searchParams.get("src") || "google";
      var t0 = Date.now();
      var u1 = src1 === "bing" ? "https://www.bing.com/news/search?q=" + encodeURIComponent(q1) + "&format=RSS" : "https://news.google.com/rss/search?q=" + encodeURIComponent(q1) + "&hl=tr&gl=TR&ceid=TR:tr";
      var stat = "?", err = "";
      try {
        var r1 = await fetch(u1, { headers: { "User-Agent": "AykanBot/1.0" }, signal: AbortSignal.timeout(10000) });
        stat = String(r1.status);
        var tx = await r1.text();
        var its = rssParse(tx);
        return new Response(JSON.stringify({ ok: true, src: src1, status: stat, items: its.length, ms: Date.now() - t0, first: (its[0] || {}).title || "" }), { headers: { "content-type": "application/json" } });
      } catch (e) { err = String(e).slice(0, 150); }
      return new Response(JSON.stringify({ ok: false, src: src1, status: stat, err: err, ms: Date.now() - t0 }), { headers: { "content-type": "application/json" } });
    }
    if (p === "/api/ai/sync" && (url.searchParams.get("key") === HOOK_SECRET || (request.headers.get("x-sim-key") || "") === HOOK_SECRET)) {
      var rsy = await aiRadarSync(env);
      return new Response(JSON.stringify({ ok: true, result: rsy }), { headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
    }
    if (p === "/api/b2b/rfq" && request.method === "POST") {
      try {
        var b = await request.json();
        var jh = { "content-type": "application/json", "access-control-allow-origin": "*" };
        if (String(b.web || "")) return new Response(JSON.stringify({ ok: false, error: "spam" }), { status: 400, headers: jh });
        var ipRL = request.headers.get("cf-connecting-ip") || "x";
        var rl = _RFQL[ipRL] = _RFQL[ipRL] || { n: 0, t: Date.now() };
        if (Date.now() - rl.t > 3600000) { rl.n = 0; rl.t = Date.now(); }
        rl.n++;
        if (rl.n > 10) return new Response(JSON.stringify({ ok: false, error: "rate-limit" }), { status: 429, headers: jh });
        var firm = String(b.firm || "").trim().slice(0, 80);
        var phone = String(b.phone || "").replace(/[^0-9+]/g, "").slice(0, 20);
        var addr = String(b.addr || "").trim().slice(0, 200);
        var note = String(b.note || "").trim().slice(0, 300);
        var its = [];
        var list = (b.items || []).slice(0, 20);
        for (var i2 = 0; i2 < list.length; i2++) {
          var q2 = Math.round(parseFloat(list[i2].qty) * 10) / 10;
          if (!q2 || q2 < 0.5 || q2 > 5000) continue;
          its.push({ name: String(list[i2].name || "").slice(0, 60), qty: q2, price: Math.round(parseFloat(list[i2].price) || 0) });
        }
        if (!firm || firm.length < 2) return new Response(JSON.stringify({ ok: false, error: "firm" }), { status: 400, headers: jh });
        if (!/^\+?\d{7,20}$/.test(phone)) return new Response(JSON.stringify({ ok: false, error: "phone" }), { status: 400, headers: jh });
        if (!its.length) return new Response(JSON.stringify({ ok: false, error: "items" }), { status: 400, headers: jh });
        var totKg = 0, totEst = 0;
        its.forEach(function (x) { totKg += x.qty; totEst += x.qty * (x.price || 0); });
        totKg = Math.round(totKg * 10) / 10;
        await env.DB.prepare("CREATE TABLE IF NOT EXISTS b2b_requests (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), firm TEXT, phone TEXT, addr TEXT, items TEXT, total_kg REAL, est_total REAL, status TEXT DEFAULT 'new', quote TEXT, note TEXT)").run();
        var ins = await env.DB.prepare("INSERT INTO b2b_requests (firm, phone, addr, items, total_kg, est_total, note) VALUES (?,?,?,?,?,?,?)")
          .bind(firm, phone, addr, JSON.stringify(its), totKg, Math.round(totEst), note).run();
        var rid = (ins && ins.meta && ins.meta.last_row_id) || 0;
        if (!rid) { var mx = await env.DB.prepare("SELECT MAX(id) AS id FROM b2b_requests WHERE firm=? AND phone=?").bind(firm, phone).first(); rid = (mx && mx.id) || 0; }
        var lines = its.map(function (x) { return "• " + x.name + " — " + x.qty + " kg"; }).join("\n");
        try {
          await notifyAdmin(env, "🏢 درخواست خرید B2B جدید #" + rid + "\n\n🏪 " + firm + "\n📞 " + phone + (addr ? "\n📍 " + addr : "") + (note ? "\n📝 " + note : "") + "\n\n" + lines + "\n\n⚖️ جمع: " + totKg + " kg\n💰 تخمین: " + Math.round(totEst) + " ₺\n\n🛠 پاسخ: پنل → تب 🏢 B2B → پیش‌فاکتور");
        } catch (e) {}
        return new Response(JSON.stringify({ ok: true, id: rid }), { headers: jh });
      } catch (e) { return new Response(JSON.stringify({ ok: false, error: "bad-request" }), { status: 400, headers: { "content-type": "application/json" } }); }
    }
    // ─── پنل CRM ادغام‌شده (v7.6.0) ───
    if (p === "/robots.txt") return new Response("User-agent: *\nDisallow: /\n", { headers: { "content-type": "text/plain" } });
    if (p === "/panel" || p === "/panel/") return new Response(panelHTML(), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...SEC } });
    if (p === "/bot" || p === "/panel/bot") return new Response(botSetupHTML(), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...SEC } });
    if (p === "/kart.png" || p === "/panel/kart.png") {
      var kb = atob(KART_B64); var ka = new Uint8Array(kb.length);
      for (var ki = 0; ki < kb.length; ki++) ka[ki] = kb.charCodeAt(ki);
      return new Response(ka, { headers: { "content-type": "image/jpeg", "cache-control": "public, max-age=3600", ...SEC } });
    }
    if (p === "/api/hit" || p === "/api/ping" || p === "/api/login" || p === "/api/data" || p === "/api/orders" || p === "/api/stats" || p === "/api/public-stats" || p === "/api/bot-setup" || p === "/api/social" || p === "/api/social/test" || p === "/api/social/send" || p === "/api/social/cfg" || p === "/api/social/autopost" || p === "/api/wa-webhook" || p === "/api/b2b" || p === "/api/ai" || p === "/api/sync/export" || p === "/api/sync/import") return panelApi(request, env, p);
    // ─── تریگر عمومی سینک رادار (داشبورد HF — بدون کلید، با محدودیت) ───
    if (p === "/api/ai/trigger") {
      var jc = { "content-type": "application/json", "access-control-allow-origin": "*" };
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type" } });
      var ipTr = request.headers.get("cf-connecting-ip") || "x";
      var freshTs = 0; try { freshTs = Number((await getSetting(env, "ai_radar_ts")) || 0); } catch (e) {}
      if (Date.now() - freshTs < 5400000) return new Response(JSON.stringify({ ok: true, started: false, reason: "fresh" }), { headers: jc });
      _TRG[ipTr] = _TRG[ipTr] || 0;
      if (Date.now() - _TRG[ipTr] < 600000) return new Response(JSON.stringify({ ok: true, started: false, reason: "cooldown" }), { headers: jc });
      _TRG[ipTr] = Date.now();
      try { ctx.waitUntil(aiRadarSync(env).catch(function (e) {})); } catch (e) {}
      return new Response(JSON.stringify({ ok: true, started: true }), { headers: jc });
    }
    // ─── لیدهای عمومی رادار (برای داشبورد HF) ───
    if (p === "/api/leads" && request.method === "GET") {
      var jl = { "content-type": "application/json", "access-control-allow-origin": "*" };
      try {
        await env.DB.prepare("CREATE TABLE IF NOT EXISTS ai_leads (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT DEFAULT (datetime('now')), name TEXT, area TEXT, url TEXT UNIQUE, source TEXT, score INTEGER DEFAULT 0, title TEXT, published TEXT, status TEXT DEFAULT 'new')").run();
        var limL = Math.min(parseInt(url.searchParams.get("limit") || "12", 10) || 12, 20);
        var ldr = await env.DB.prepare("SELECT name, area, url, source, score, title, published FROM ai_leads ORDER BY score DESC, id DESC LIMIT ?").bind(limL).all();
        return new Response(JSON.stringify({ ok: true, leads: ldr.results || [] }), { headers: jl });
      } catch (e) { return new Response(JSON.stringify({ ok: false, leads: [] }), { headers: jl }); }
    }
    return new Response("<!DOCTYPE html><html lang=\"fa\" dir=\"rtl\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>صفحه پیدا نشد | قصاب آیکان</title><style>body{font-family:Tahoma,system-ui,sans-serif;background:#f5f5f5;color:#151617;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center}.c{max-width:420px;padding:32px}.b{background:#b91c1c;color:#fff;padding:12px 22px;border-radius:14px;text-decoration:none;font-weight:800;display:inline-block;margin:6px}</style></head><body><div class=\"c\"><div style=\"font-size:64px\">🥩</div><h1>این صفحه پیدا نشد</h1><p style=\"color:#878c9f\">ولی گوشت‌های ما سرِ جایشان هستند! 🔥</p><a class=\"b\" href=\"/\">🏠 صفحه اصلی</a><a class=\"b\" style=\"background:#16a34a\" href=\"https://wa.me/905377325269\">💬 واتس‌اپ</a></div></body></html>", { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
  },
  async scheduled(event, env) {
    await ensureWebhook(env);
    await autopostTick(env);
  },
};
