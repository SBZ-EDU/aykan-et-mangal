#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AYKAN ET & MANGAL — ET BROŞÜRÜ (referans formatında: sıcak gurme paleti, dikey 2:3)
Yapı: Koyu header + hero foto → ürün ızgarası (foto+fiyat) → KREM kampanya bandı → koyu footer (QR)
Master: 2048×3072 (baskı) + preview 1024×1536 (WhatsApp/Instagram) + PDF
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode, os

W, H = 2048, 3072
M = 72  # margin
FD = "/usr/share/fonts/truetype/dejavu/"
def F(n, s): return ImageFont.truetype(FD + n, s)
BOLD, REG = "DejaVuSans-Bold.ttf", "DejaVuSans.ttf"
LOGO = Image.open("/home/user/aykan_logo_square_512.jpg").convert("RGB")

# ---- palette (referans: sıcak gurme — ete uyarlanmış) ----
BG1 = (26, 18, 14)      # koyu kahve-siyah
BG2 = (12, 8, 6)
CARAMEL = (217, 150, 74)
CREAM = (244, 230, 204)
CREAM_D = (232, 212, 176)
RED = (185, 28, 28)
TXT = (250, 244, 236)
GRAY = (185, 168, 150)

PHONE = "0537 732 52 69"
INSTA = "@aykanetmangal"
WEB = "aykan-hizli.elasa2next.workers.dev"
WEB_URL = "https://aykan-hizli.elasa2next.workers.dev/"

PRODUCTS = [
    ("brosur/kemikli.png", "Dana Kemikli Et", "Bone-in Beef", "650"),
    ("brosur/kusbasi.png", "Kuşbaşı / Özel Kıyma", "Cubes & Minced", "750"),
    ("brosur/antrikot.png", "Dana Antrikot", "Beef Ribeye", "1.100"),
    ("brosur/pirzola.png", "Kuzu Pirzola", "Lamb Chops", "1.399"),
    ("brosur/mangal.png", "Özel Mangal Paketi", "BBQ Pack", "998"),
    ("brosur/aile.png", "Haftalık Aile Kutusu", "Family Box", "1.472"),
]
OFFERS = [
    ("🌯", "Viral Tortilla Kebabı", "10 dakikada hazır — 10 min", "399 TL"),
    ("🔥", "Hafta Sonu Mangalı", "Kömür + sos dahil — incl. charcoal & sauce", "%5 indirim"),
    ("🏢", "Kurumsal Toptan", "Restoran & otel — wholesale", "%10'a varan"),
]

problems = []
def fit(d, t, f, maxw, what):
    if d.textlength(t, font=f) > maxw:
        problems.append("%s: %.0f>%d" % (what, d.textlength(t, font=f), maxw))
    return t

def crop_cover(im, w, h):
    """resmi w×h karesine ortadan kırpar (cover)"""
    r = max(w / im.size[0], h / im.size[1])
    im2 = im.resize((int(im.size[0] * r) + 1, int(im.size[1] * r) + 1), Image.LANCZOS)
    x = (im2.size[0] - w) // 2
    y = (im2.size[1] - h) // 2
    return im2.crop((x, y, x + w, y + h))

def grad(w, h, c1, c2):
    im = Image.new("RGB", (w, h), c1)
    d = ImageDraw.Draw(im)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    return im

# ================= MASTER =================
im = grad(W, H, BG1, BG2)
# sıcak hales
halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
hd = ImageDraw.Draw(halo)
hd.ellipse([W * 0.55, -H * 0.12, W * 1.25, H * 0.30], fill=(217, 150, 74, 26))
hd.ellipse([-W * 0.2, H * 0.75, W * 0.35, H * 1.1], fill=(185, 28, 28, 22))
im = Image.alpha_composite(im.convert("RGBA"), halo.filter(ImageFilter.GaussianBlur(120))).convert("RGB")
d = ImageDraw.Draw(im)

# ---------- 1) HEADER ----------
LOG = 250
d.rounded_rectangle([M + 8, 84, M + LOG + 66, 84 + LOG + 58], radius=40, outline=CARAMEL, width=4)
im.paste(LOGO.resize((LOG, LOG), Image.LANCZOS), (M + 30, 108))
f = F(BOLD, 122)
fit(d, "AYKAN", f, W - M * 2 - LOG - 120, "brand")
d.text((M + LOG + 120, 96), "AYKAN", font=f, fill=CREAM)
f2 = F(BOLD, 66)
d.text((M + LOG + 120, 240), fit(d, "ET & MANGAL", f2, W - M * 2 - LOG - 120, "brand2"), font=f2, fill=CARAMEL)
f3 = F(REG, 40)
d.text((M + LOG + 120, 330), fit(d, "Kasap & Izgara • Tanzim Satış • Bağcılar & Esenler", f3, W - M * 2 - LOG - 120, "tag"), font=f3, fill=GRAY)
d.text((M, 430), fit(d, "Et • Balık • Tavuk • Kuzu — her gün taze kesim  |  Beef • Fish • Chicken • Lamb", F(REG, 34), W - 2 * M, "sub"), font=F(REG, 34), fill=GRAY)

# ---------- 2) HERO ----------
HY, HH = 480, 560
hero = crop_cover(Image.open("/home/user/brosur/hero.png").convert("RGB"), W - 2 * M, HH)
mask = Image.new("L", hero.size, 0)
md = ImageDraw.Draw(mask)
md.rounded_rectangle([0, 0, hero.size[0], hero.size[1]], radius=44, fill=255)
im.paste(hero, (M, HY), mask)
# alt gradyan + başlık
ov = Image.new("RGBA", (hero.size[0], HH), (0, 0, 0, 0))
od = ImageDraw.Draw(ov)
for yy in range(HH):
    a = int(200 * max(0, (yy - HH * 0.45) / (HH * 0.55)))
    od.line([(0, yy), (hero.size[0], yy)], fill=(10, 6, 4, a))
im.paste(Image.alpha_composite(hero.convert("RGBA"), ov).convert("RGB"), (M, HY), mask)
fh = F(BOLD, 84)
t1 = "GÜNLÜK TAZE KESİM"
fit(d, t1, fh, W - 2 * M - 80, "hero1")
d.text((M + 44, HY + HH - 218), t1, font=fh, fill=CREAM)
fh2 = F(REG, 44)
d.text((M + 46, HY + HH - 120), fit(d, "Ara bulucu yok — kasaptan direkt tanzim fiyatıyla  •  Direct from the butcher", fh2, W - 2 * M - 80, "hero2"), font=fh2, fill=(240, 228, 205))

# ---------- 3) ÜRÜN IZGARASI ----------
GY = HY + HH + 36
ft = F(BOLD, 54)
d.text((M, GY), "GÜNLÜK FİYATLARIMIZ  •  DAILY PRICES", font=ft, fill=CARAMEL)
d.line([M, GY + 74, W - M, GY + 74], fill=(90, 70, 52), width=3)

grid_y = GY + 96
TW = (W - 2 * M - 64) // 3
TH = 470
gap = 32
for i, (path, tr, en, price) in enumerate(PRODUCTS):
    col, row = i % 3, i // 3
    x = M + col * (TW + gap)
    y = grid_y + row * (TH + gap)
    ph = 330
    pic = crop_cover(Image.open("/home/user/" + path).convert("RGB"), TW, ph)
    pm = Image.new("L", pic.size, 0)
    pmd = ImageDraw.Draw(pm)
    pmd.rounded_rectangle([0, 0, TW, ph], radius=30, fill=255)
    im.paste(pic, (x, y), pm)
    d.rounded_rectangle([x, y + ph, x + TW, y + TH], radius=0, outline=(90, 70, 52), width=2)
    # satır 1: isim / satır 2: en + fiyat
    d.text((x + 20, y + ph + 12), fit(d, tr, F(BOLD, 37), TW - 40, "p-" + tr), font=F(BOLD, 37), fill=TXT)
    d.text((x + 20, y + ph + 62), fit(d, en, F(REG, 25), TW - 190, "pe-" + en), font=F(REG, 25), fill=GRAY)
    fp = F(BOLD, 46)
    pw = d.textlength(price, font=fp) + d.textlength(" TL", font=F(REG, 27))
    d.text((x + TW - pw - 20, y + ph + 56), price, font=fp, fill=CARAMEL)
    d.text((x + TW - d.textlength(" TL", font=F(REG, 27)) - 20, y + ph + 78), " TL", font=F(REG, 27), fill=GRAY)
    # TL/Kg etiketi
    if price in ("650", "750", "1.100", "1.399"):
        d.rounded_rectangle([x + TW - 118, y + 14, x + TW - 16, y + 52], radius=12, fill=(16, 10, 8))
        d.text((x + TW - 104, y + 22), "TL/Kg", font=F(REG, 25), fill=CREAM)

# ---------- 4) KREM KAMPANYA BANDI ----------
OY = grid_y + 2 * (TH + gap) + 12
OH = 310
d.rounded_rectangle([M, OY, W - M, OY + OH], radius=40, fill=CREAM)
ow = (W - 2 * M - 80) // 3
for i, (emo, tr, en, price) in enumerate(OFFERS):
    x = M + 40 + i * (ow + 20)
    d.rounded_rectangle([x, OY + 24, x + 58, OY + 82], radius=16, fill=RED)
    d.text((x + 17, OY + 36), str(i + 1), font=F(BOLD, 34), fill=CREAM)
    d.text((x, OY + 94), fit(d, tr, F(BOLD, 42), ow - 16, "o-" + tr), font=F(BOLD, 42), fill=(60, 34, 16))
    d.text((x, OY + 152), fit(d, en, F(REG, 26), ow - 16, "oe-" + en), font=F(REG, 26), fill=(140, 108, 74))
    d.text((x, OY + 202), fit(d, price, F(BOLD, 48), ow - 16, "op"), font=F(BOLD, 48), fill=RED)

# ---------- 5) FOOTER ----------
FY = OY + OH + 28
d.rounded_rectangle([M, FY, W - M, H - M], radius=40, fill=(16, 10, 8), outline=CARAMEL, width=3)
# QR
Q = 280
qx, qy = W - M - Q - 48, FY + 46
d.rounded_rectangle([qx - 14, qy - 14, qx + Q + 14, qy + Q + 14], radius=28, fill="white")
q = qrcode.QRCode(border=1, box_size=10, error_correction=qrcode.constants.ERROR_CORRECT_M)
q.add_data(WEB_URL); q.make()
im.paste(q.make_image(fill_color=(20, 12, 8), back_color="white").convert("RGB").resize((Q, Q), Image.NEAREST), (qx, qy))
fq = F(REG, 26)
d.text((qx - 14 + (Q + 28 - d.textlength("Menü & Sipariş — QR", font=fq)) / 2, qy + Q + 22), fit(d, "Menü & Sipariş — QR", fq, Q + 20, "qr1"), font=fq, fill=CREAM)
# iletişim
cx = M + 52
d.text((cx, FY + 40), "WhatsApp & Tel:", font=F(REG, 34), fill=GRAY)
d.text((cx, FY + 84), fit(d, PHONE, F(BOLD, 72), qx - cx - 40, "ph"), font=F(BOLD, 72), fill=CREAM)
d.text((cx, FY + 180), fit(d, "Instagram: " + INSTA + "     •     Telegram: @aykanetmangal", F(REG, 34), W - 2 * M - 100, "ig"), font=F(REG, 34), fill=GRAY)
d.text((cx, FY + 228), fit(d, "Web: " + WEB, F(BOLD, 36), qx - cx - 40, "web"), font=F(BOLD, 36), fill=CARAMEL)
d.text((cx, FY + 284), fit(d, "1) Göztepe Mah. Maslak Cad. 95A-95C Bağcılar (Metro yanı)", F(REG, 29), W - 2 * M - 100, "br1"), font=F(REG, 29), fill=GRAY)
d.text((cx, FY + 324), fit(d, "2) Kemer Mah. 926. Sok. 2/C Esenler  •  Her gün 22:30'a kadar", F(REG, 29), W - 2 * M - 100, "br2"), font=F(REG, 29), fill=GRAY)
fb = F(BOLD, 34)
d.text(((W - d.textlength("Kasaptan direkt — ara bulucu yok!  •  Direct from the butcher", font=fb)) / 2, H - M - 48),
       fit(d, "Kasaptan direkt — ara bulucu yok!  •  Direct from the butcher", fb, W - 2 * M - 80, "foot"), font=fb, fill=CARAMEL)

# ================= ÇIKTILAR =================
im.save("/home/user/brosur/aykan_brosur_et_master.png")
im.resize((1024, 1536), Image.LANCZOS).save("/home/user/brosur/aykan_brosur_et_preview.png")
im.save("/home/user/brosur/aykan_brosur_et_baski.pdf", resolution=300.0)

# ---- checks ----
print("fit problems:", problems if problems else "NONE ✅")
from fontTools.ttLib import TTFont
covered = set()
for fn in (BOLD, REG):
    for t in TTFont(FD + fn)["cmap"].tables:
        covered |= set(t.cmap.keys())
drawn = [PHONE, INSTA, WEB, "Instagram: " + INSTA + "     •     Telegram: @aykanetmangal", "Web: " + WEB] + [x for p in PRODUCTS for x in p[1:3]] + [o[1] for o in OFFERS] + [
    "AYKAN", "ET & MANGAL", "Kasap & Izgara • Tanzim Satış • Bağcılar & Esenler",
    "GÜNLÜK TAZE KESİM", "GÜNLÜK FİYATLARIMIZ  •  DAILY PRICES",
    "1) Göztepe Mah. Maslak Cad. 95A-95C Bağcılar (Metro yanı)",
    "2) Kemer Mah. 926. Sok. 2/C Esenler  •  Her gün 22:30'a kadar",
    "Kasaptan direkt — ara bulucu yok!  •  Direct from the butcher"]
missing = sorted({c for t in drawn for c in t if ord(c) not in covered and c not in " \n\t"})
print("BROKEN GLYPHS:", missing if missing else "NONE ✅")
px = im.load()
print("header dark:", sum(px[100, 100]) < 150)
print("cream band:", sum(px[W // 2, OY + 40]) > 640)
print("footer dark:", sum(px[W // 2, H - 120]) < 200)
print("QR white:", sum(px[qx + 150, qy + 20]) > 600)
for f2 in ("aykan_brosur_et_master.png", "aykan_brosur_et_preview.png", "aykan_brosur_et_baski.pdf"):
    print("%-30s %8d bytes" % (f2, os.path.getsize("/home/user/" + f2)))
