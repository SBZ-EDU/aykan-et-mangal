#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AYKAN ET & MANGAL — Kartvizit v3: MİNİMAL (fiyatsız, sade, renk psikolojisi)
Model 1 «İŞTAH»    : antrasit + kırmızı  (iştah & enerji — kasap klasiği)
Model 2 «PREMIUM»  : siyah + altın       (lüks, kalite, güven)
Model 3 «TAZELİK»  : krem + yeşil        (doğallık, hijyen, helal)
85×55mm @300dpi = 1005×650px. Sadece temel bilgi: logo, marka, telefon, web, QR.
"""
from PIL import Image, ImageDraw, ImageFont
import qrcode, os

W, H = 1005, 650
FD = "/usr/share/fonts/truetype/dejavu/"
def F(n, s): return ImageFont.truetype(FD + n, s)
BOLD, REG = "DejaVuSans-Bold.ttf", "DejaVuSans.ttf"
LOGO = Image.open("/home/user/aykan_logo_square_512.jpg").convert("RGB")

PHONE = "0537 732 52 69"
PHONE_LBL = "WhatsApp & Tel"
WEB = "aykan-hizli.elasa2next.workers.dev"
WEB_URL = "https://aykan-hizli.elasa2next.workers.dev/"
INSTA = "@aykanetmangal"
BRANCHES = "Bağcılar & Esenler  •  Her gün 22:30'a kadar  •  Open daily"
QR_T1, QR_T2 = "Menü & Sipariş", "Menu & Order"
SLOGAN = "Günlük taze kesim  •  Fresh daily cuts"

problems = []
def fit(d, t, f, maxw, what):
    if d.textlength(t, font=f) > maxw:
        problems.append("%s: %.0f>%d" % (what, d.textlength(t, font=f), maxw))
    return t

_QR = None
def qr():
    global _QR
    if _QR is None:
        q = qrcode.QRCode(border=1, box_size=10, error_correction=qrcode.constants.ERROR_CORRECT_M)
        q.add_data(WEB_URL); q.make()
        _QR = q.make_image(fill_color=(15, 15, 18), back_color="white").convert("RGB")
    return _QR

def grad(c1, c2):
    im = Image.new("RGB", (W, H), c1); d = ImageDraw.Draw(im)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    return im

def center(d, t, f, y, col, what):
    fit(d, t, f, W - 90, what)
    d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=col)

MODELS = [
 ("1", "İŞTAH — Antrasit + Kırmızı", "Kırmızı iştah açar, et ve enerji çağrıştırır",
  dict(bg1=(24, 24, 28), bg2=(13, 13, 16), accent=(220, 38, 38), accent2=(248, 113, 113),
       txt=(250, 250, 250), gray=(160, 160, 166), qrbox=(250, 250, 250), qrdark=(15, 15, 18))),
 ("2", "PREMIUM — Siyah + Altın", "Siyah+altın lüks, kalite ve güven hissi verir",
  dict(bg1=(18, 18, 22), bg2=(8, 8, 11), accent=(212, 175, 55), accent2=(245, 205, 100),
       txt=(248, 246, 240), gray=(158, 152, 146), qrbox=(250, 248, 242), qrdark=(20, 18, 12))),
 ("3", "TAZELİK — Krem + Yeşil", "Krem+yeşil doğallık, hijyen ve helal hissi verir",
  dict(bg1=(250, 247, 240), bg2=(238, 233, 222), accent=(22, 124, 68), accent2=(21, 110, 59),
       txt=(30, 32, 34), gray=(118, 116, 108), qrbox=(255, 255, 255), qrdark=(18, 50, 32))),
]

def front(p):
    im = grad(p["bg1"], p["bg2"]); d = ImageDraw.Draw(im)
    d.rounded_rectangle([17, 17, W - 18, H - 18], radius=26, outline=p["accent"], width=2)
    # logo
    L = 148; lx = (W - L) // 2; ly = 52
    d.rounded_rectangle([lx - 5, ly - 5, lx + L + 5, ly + L + 5], radius=22, outline=p["accent"], width=2)
    im.paste(LOGO.resize((L, L), Image.LANCZOS), (lx, ly))
    # brand
    center(d, "AYKAN", F(BOLD, 58), 216, p["txt"], "brand")
    center(d, "ET & MANGAL", F(BOLD, 30), 284, p["accent2"], "brand2")
    center(d, "Kasap & Izgara  •  Butcher & Grill", F(REG, 20), 330, p["gray"], "tag")
    # divider
    d.line([W // 2 - 90, 368, W // 2 + 90, 368], fill=p["accent"], width=2)
    # essential contacts only
    center(d, PHONE, F(BOLD, 40), 392, p["txt"], "phone")
    center(d, PHONE_LBL, F(REG, 17), 444, p["gray"], "phone-lbl")
    center(d, WEB, F(BOLD, 22), 488, p["accent2"], "web")
    center(d, "İnstagram: " + INSTA, F(REG, 19), 528, p["gray"], "insta")
    # bottom line
    center(d, BRANCHES, F(REG, 16), 580, p["gray"], "branches")
    return im

def back(p):
    im = grad(p["bg2"], p["bg1"]); d = ImageDraw.Draw(im)
    d.rounded_rectangle([17, 17, W - 18, H - 18], radius=26, outline=p["accent"], width=2)
    center(d, "AYKAN ET & MANGAL", F(BOLD, 26), 56, p["accent2"], "bk-brand")
    center(d, SLOGAN, F(REG, 18), 96, p["gray"], "bk-slogan")
    # big QR
    Q = 300; qx = (W - Q) // 2; qy = 140
    d.rounded_rectangle([qx - 14, qy - 14, qx + Q + 14, qy + Q + 14], radius=24, fill=p["qrbox"], outline=p["accent"], width=2)
    im.paste(qr().resize((Q, Q), Image.NEAREST), (qx, qy))
    center(d, QR_T1 + "  •  " + QR_T2, F(BOLD, 26), qy + Q + 30, p["txt"], "bk-qr")
    center(d, WEB, F(REG, 20), qy + Q + 72, p["accent2"], "bk-web")
    center(d, "☎ " + PHONE, F(BOLD, 22), qy + Q + 110, p["gray"], "bk-phone")
    return im

outs = []
for num, title, psycho, p in MODELS:
    fr, bk = front(p), back(p)
    fr.save("/home/user/kartvizit/kart_final_%s_on.png" % num)
    bk.save("/home/user/kartvizit/kart_final_%s_arka.png" % num)
    outs.append((num, title, psycho, fr, bk))

outs[0][3].save("/home/user/kartvizit/aykan_kart_final_baski.pdf", save_all=True,
                append_images=[outs[0][4], outs[1][3], outs[1][4], outs[2][3], outs[2][4]], resolution=300.0)

# ---- preview ----
sc = 0.5; cw, ch = int(W * sc), int(H * sc); GAP, LBL = 26, 118
pv = Image.new("RGB", (cw * 2 + GAP * 3, (ch + LBL + GAP) * 3 + GAP), (12, 12, 16))
pd = ImageDraw.Draw(pv)
y = GAP
for num, title, psycho, fr, bk in outs:
    pd.text((GAP, y), "MODEL %s  •  %s" % (num, title), font=F(BOLD, 26), fill=(212, 175, 55))
    pd.text((GAP, y + 38), "Renk psikolojisi: " + psycho, font=F(REG, 21), fill=(170, 170, 178))
    pv.paste(fr.resize((cw, ch), Image.LANCZOS), (GAP, y + LBL))
    pv.paste(bk.resize((cw, ch), Image.LANCZOS), (GAP * 2 + cw, y + LBL))
    pd.text((GAP + 8, y + LBL + ch + 6), "ÖN / Front", font=F(REG, 20), fill=(150, 150, 160))
    pd.text((GAP * 2 + cw + 8, y + LBL + ch + 6), "ARKA / Back (QR → hızlı site)", font=F(REG, 20), fill=(150, 150, 160))
    y += ch + LBL + GAP
pv.save("/home/user/kartvizit/kart_final_preview.png")

# ---- TOFU CHECK: هیچ کاراکتری نباید فونت‌شکسته باشد ----
from fontTools.ttLib import TTFont
covered = set()
for fn in (BOLD, REG):
    for tbl in TTFont(FD + fn)["cmap"].tables:
        covered |= set(tbl.cmap.keys())
_drawn = [PHONE, PHONE_LBL, WEB, INSTA, BRANCHES, QR_T1, QR_T2, SLOGAN, WEB_URL,
          "AYKAN", "ET & MANGAL", "Kasap & Izgara  •  Butcher & Grill",
          "Menü & Sipariş  •  Menu & Order", "ÖN / Front", "ARKA / Back (QR → hızlı site)",
          "Renk psikolojisi: "]
for _n, _t, _ps, _p in MODELS:
    _drawn += [_t, _ps, "MODEL %s  •  %s" % (_n, _t)]
_missing = sorted({ch for t in _drawn for ch in t if ord(ch) not in covered and ch not in " \n\t"})
print("BROKEN GLYPHS:", _missing if _missing else "NONE — هیچ حرف شکسته‌ای در کارت نیست ✅")
assert not _missing, "فونت این کاراکترها را ندارد: %r" % _missing

print("fit problems:", problems if problems else "NONE — همه متن‌ها داخل کادر")
for num, title, psycho, fr, bk in outs:
    a, b = fr.load(), bk.load()
    mid = a[W // 2, 340]
    qr_ok = sum(b[W // 2, 290]) > 600 or b[W // 2, 290][0] > 200
    print("✅ Model %s — %s | bg:%s QR-okay:%s" % (num, title, mid, qr_ok))
for f in ("kart_final_1_on.png", "kart_final_1_arka.png", "kart_final_2_on.png", "kart_final_2_arka.png",
          "kart_final_3_on.png", "kart_final_3_arka.png", "aykan_kart_final_baski.pdf", "kart_final_preview.png"):
    print("%-26s %7d bytes" % (f, os.path.getsize("/home/user/" + f)))
