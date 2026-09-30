# 🤝 Katkı Rehberi

## Yapı
- `deploy/{tgbot,panel,worker}/` — Cloudflare Workers (JS, tek dosya)
- `bagcilar_kasap_website.html` — site master → `python3 build_public.py` → `deploy/public/index.html` (repo kökü = GitHub Pages)
- `deploy/tgbot/worker_template.js` — `__DATA__` placeholder'lı şablon; `bot_data.json` injekte edilerek worker.js üretilir

## Değişiklik akışı
1. Kodu değiştir → `node --check deploy/*/worker.js`
2. Site değiştiyse → `python3 build_public.py`
3. Commit → CI (sözdizimi + secret taraması) otomatik çalışır
4. Deploy: **Actions → Deploy Workers → Run workflow** (tgbot / panel / hizli / all)
5. Bot testi: `POST /api/sim` (header `x-sim-key`) — gerçek D1 ile simülasyon

## Kurallar
- Commit'e asla gerçek secret koyma (CI reddeder)
- Bot/site metinleri: müşteri tarafı TR/EN/FA, yönetim tarafı FA
- Görsel içinde Arapça/Farsça harf KULLANMA (font tofu sorunu)
