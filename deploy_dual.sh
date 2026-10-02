#!/usr/bin/env bash
# دیپلوی هر ۴ ورکر به هر دو اکانت کلودفلر (اصلی + پشتیبان)
# استفاده: CF_API_TOKEN_NEW=... CF_ACCOUNT_ID_NEW=... CF_API_TOKEN_OLD=... CF_ACCOUNT_ID_OLD=... ./deploy_dual.sh [tgbot|worker|site|all]
set -e
W="${1:-all}"
[ "$W" = "all" ] && LIST="tgbot worker site" || LIST="$W"
NEW_T="${CF_API_TOKEN_NEW:?}" NEW_A="${CF_ACCOUNT_ID_NEW:?}"
OLD_T="${CF_API_TOKEN_OLD:?}" OLD_A="${CF_ACCOUNT_ID_OLD:?}"
NEW_SUB="aykanet34.workers.dev"; OLD_SUB="elasa2next.workers.dev"
NEW_DB="058e06bb-6148-4c5b-ba34-e1321bb9ac7c"; OLD_DB="2917135d-d1e4-4486-a826-286572bbef9a"

for w in $LIST; do
  echo "── $w → اکانت جدید ($NEW_SUB) ──"
  (cd "deploy/$w" && CLOUDFLARE_API_TOKEN="$NEW_T" CLOUDFLARE_ACCOUNT_ID="$NEW_A" npx -y wrangler@3.100.0 deploy)
  sleep 20
  echo "── $w → اکانت قدیمی ($OLD_SUB) ──"
  rm -rf "/tmp/dep_old/$w" && mkdir -p "/tmp/dep_old/$w"
  cp -r "deploy/$w/." "/tmp/dep_old/$w/"
  find "/tmp/dep_old/$w" -type f \( -name '*.js' -o -name '*.toml' -o -name '*.html' -o -name '*.vcf' -o -name '*.txt' -o -name '*.xml' -o -name '*.json' \) -print0 |
    xargs -0 sed -i -e "s/$NEW_SUB/$OLD_SUB/g" -e "s/$NEW_DB/$OLD_DB/g"
  (cd "/tmp/dep_old/$w" && CLOUDFLARE_API_TOKEN="$OLD_T" CLOUDFLARE_ACCOUNT_ID="$OLD_A" npx -y wrangler@3.100.0 deploy)
  sleep 20
done
echo "✅ دیپلوی دو-اکانتی کامل شد"
