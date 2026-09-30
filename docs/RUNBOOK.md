# 📕 Runbook — راهنمای بهره‌برداری

## 🔁 سوئیچ اکانت اصلی↔پشتیبان (دو-اکانتی)
وقتی وبهوک روی اکانت اصلی است (پیش‌فرض: aykanet34)، برای سوئیچ به پشتیبان:
```
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" -H "Content-Type: application/json" \
  -d '{"url":"https://aykan-tgbot.elasa2next.workers.dev/hook-<HOOK_SECRET>","secret_token":"<HOOK_SECRET>","allowed_updates":["message","callback_query"]}'
```
(برای بازگشت: elasa2next → aykanet34) — هر دو ورکر همان کد را دارند؛ فقط D1 جدا است.

## 🔑 توکن ربات (شایع‌ترین مشکل)
- علائم: بی‌پاسخی + getMe → 401 · ریشه: Revoke در BotFather
- درمان: BotFather → /mybots → API Token → Copy (⛔ Revoke ممنوع) → پنل 🌐 یا چت
- توکن فقط در D1 است — هرگز در کد

## 🩺 عیب‌یابی
| نشانه | بررسی | راه‌حل |
|---|---|---|
| ربات بی‌پاسخ | /ping ادمین یا /health | توکن مرده؟ بالا را ببین |
| پست کانال نمی‌آید | Actions→heartbeat سبز؟ | دیسپچ دستی + /plan + /devam |
| اکانت اصلی در دسترس نیست | /health پشتیبان | سوئیچ وبهوک (بالا) |
| دیپلوی خطای 10429 | Rate limit | ۲۰ ثانیه فاصله (deploy_dual.sh رعایت می‌کند) |

## 🧪 تست بدون ریسک
```
curl -s -A "AykanBot/1.0" https://aykan-tgbot.aykanet34.workers.dev/health
```

## 🛠 دستورهای ادمین: /yardim · 🚀 دیپلوی: Actions→Deploy Workers (هر دو اکانت) یا deploy_dual.sh
## 💾 پشتیبان: D1 Export ماهانه (هر دو اکانت) + git
