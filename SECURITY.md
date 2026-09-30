# 🔒 Güvenlik Politikası / سیاست امنیت

## Gizli anahtarlar nerede durur?
- **Kod içinde HİÇBİR secret yok** — repo public olduğu için tüm anahtarlar `__PLACEHOLDER__` ile maskelenmiştir.
- Gerçek değerler: **GitHub Secrets** (deploy sırasında injeksiyon) + **Cloudflare** (wrangler vars) + **D1 settings** (bot token).
- CI her push'ta `cfat_ / ghp_ / hf_ / bot-token` pattern taraması yapar (bkz. `.github/workflows/ci.yml`).

## Bot token döngüsü
1. BotFather → API Token → kopyala (⛔ ASLA "Revoke" basma)
2. Panel → 🌐 sekmesi → yapıştır → kaydet (otomatik `getMe` doğrulaması + webhook)

## Sorun bildirimi
Güvenlik açığı görürseniz: WhatsApp 0537 732 52 69 üzerinden özel bildirin, public issue açmayın.
