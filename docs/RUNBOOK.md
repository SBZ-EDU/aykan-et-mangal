# 📕 Runbook — راهنمای بهره‌برداری

## 🔑 توکن ربات (شایع‌ترین مشکل)
- علائم مرگ: ربات بی‌پاسخ + `getMe` → 401 Unauthorized
- ریشه: فشردن **Revoke** در BotFather (توکن همان لحظه می‌میرد)
- درمان: BotFather → /mybots → API Token → کپی → پنل 🌐 → ذخیره (خودکار: اعتبارسنجی + setWebhook)
- ⚠️ توکن هرگز در کد نیست؛ فقط در D1 (settings.social_config.tg.token)

## 🩺 عیب‌یابی سریع
| نشانه | بررسی | راه‌حل |
|---|---|---|
| ربات جواب نمی‌دهد | `/ping` ادمین یا `curl /health` | توکن مرده؟ بالا را ببین |
| پست کانال نمی‌آید | Actions → heartbeat سبز؟ | workflow_dispatch دستی + `/plan` + `/devam` |
| خطای دکمه‌ها | `/api/sim` بزنید | اگر خطا صفر بود → تلگرام/شبکه |
| سایت بالا نیست | Actions → uptime | Pages build سبز؟ |

## 🧪 تست بدون ریسک
```
curl -s -A "AykanBot/1.0" https://aykan-tgbot.elasa2next.workers.dev/health
curl -s -A "AykanBot/1.0" -H "x-sim-key: <HOOK_SECRET>" -H "content-type: application/json" \
  -d '{"updates":[{"message":{"chat":{"id":999000111},"from":{"id":999000111,"first_name":"T","language_code":"tr"},"text":"/start"}}]}' \
  https://aykan-tgbot.elasa2next.workers.dev/api/sim
```
شبیه‌سازی روی D1 واقعی است؛ داده تست را بعدش پاک کنید (chat 999000111).

## 🛠 دستورهای ادمین ربات
/yardim را در چت ادمین بفرستید — فهرست کامل + استفاده.

## 🚀 دیپلوی
Actions → **Deploy Workers** → worker انتخاب → Run. (یا wrangler با CF_API_TOKEN)
- tgbot: کد ربات · panel: پنل · hizli: صفحه سریع
- سکرت‌ها GitHub Secrets: CF_API_TOKEN · CF_ACCOUNT_ID · HOOK_SECRET · PANEL_SECRET · ADMIN_PIN · WA_VERIFY

## 💾 پشتیبان‌گیری
- D1 (Cloudflare dash → Storage & Databases → aykan-db → Export) ماهی یک‌بار
- کدها: همین ریپو (git = پشتیبان)
