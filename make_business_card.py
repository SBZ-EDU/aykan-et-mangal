#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AYKAN ET & MANGAL — Kartvizit (85×55mm @300dpi = 1005×650px)
Front: logo + brand + contacts + branches | Back: prices + QR code
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode, os

W, H = 1005, 650
FD = "/usr/share/fonts/truetype/dejavu/"
def F(name, size): return ImageFont.truetype(FD + name, size)
BOLD, REG = "DejaVuSans-Bold.ttf", "DejaVuSans.ttf"

C_BG1, C_BG2 = (23, 23, 27), (10, 10, 13)
C_RED, C_RED2 = (185, 28, 28), (127, 29, 29)
C_AMBER, C_AMBER_L = (245, 158, 11), (251, 191, 36)
C_WHITE, C_GRAY = (250, 250, 250), (161, 161, 170)
C_DARK = (12, 12, 14)

problems = []
def fit(d, text, font, maxw, what):
    w = d.textlength(text, font=font)
    if w > maxw:
        problems.append("%s overflows: %.0f > %d px" % (what, w, maxw))
    return text

def base_card():
    im = Image.new("RGB", (W, H), C_BG1)
    d = ImageDraw.Draw(im)
    for y in range(H):  # vertical gradient
        t = y / H
        c = tuple(int(C_BG1[i] + (C_BG2[i] - C_BG1[i]) * t) for i in range(3))
        d.line([(0, y), (W, y)], fill=c)
    # soft red glow top-right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W - 420, -260, W + 160, 220], fill=(185, 28, 28, 42))
    gd.ellipse([-260, H - 200, 200, H + 240], fill=(245, 158, 11, 22))
    im = Image.alpha_composite(im.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(60))).convert("RGB")
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([16, 16, W - 17, H - 17], radius=24, outline=C_AMBER, width=3)
    return im, d

def bottom_bar(d, text):
    d.rounded_rectangle([34, 566, W - 35, 620], radius=14, fill=C_RED)
    f = F(BOLD, 23)
    fit(d, text, f, W - 110, "bottom bar")
    d.text(((W - d.textlength(text, font=f)) / 2, 585), text, font=f, fill=C_WHITE)

# ================= FRONT =================
im, d = base_card()
# logo + amber ring
logo = Image.open("/home/user/aykan_logo_square_512.jpg").convert("RGB").resize((196, 196), Image.LANCZOS)
d.rounded_rectangle([58, 72, 254, 268], radius=22, outline=C_AMBER, width=3)
im.paste(logo, (58, 72))
# brand block
d.text((292, 78), fit(d, "AYKAN", F(BOLD, 64), 660, "AYKAN"), font=F(BOLD, 64), fill=C_AMBER_L)
d.text((292, 152), fit(d, "ET & MANGAL", F(BOLD, 38), 660, "ET&MANGAL"), font=F(BOLD, 38), fill=C_WHITE)
d.text((292, 200), fit(d, "Kasap & Izgara • Tanzim Satış • 2 Şube", F(REG, 22), 660, "sub1"), font=F(REG, 22), fill=C_GRAY)
d.text((292, 228), fit(d, "Et • Balık • Tavuk • Kuzu", F(REG, 22), 660, "sub2"), font=F(REG, 22), fill=C_GRAY)
# divider
d.line([58, 292, W - 59, 292], fill=C_AMBER, width=2)
# contact rows
rows = [("WHATSAPP", "0537 732 52 69"), ("TELEGRAM", "@aykanetmangal"), ("WEB", "sbz-edu.github.io/aykan-et-mangal")]
y = 318
for lab, val in rows:
    d.text((58, y + 6), fit(d, lab, F(BOLD, 20), 140, "label " + lab), font=F(BOLD, 20), fill=C_AMBER)
    d.text((210, y), fit(d, val, F(BOLD, 28), 730, "value " + lab), font=F(BOLD, 28), fill=C_WHITE)
    y += 46
# branches
d.text((58, 462), "1.", font=F(BOLD, 23), fill=C_RED2); d.text((58, 462), "", font=F(BOLD, 23))
d.text((92, 463), fit(d, "Göztepe Mah. Maslak Cad. No: 95A-95C, Bağcılar (Metro yanı)", F(REG, 22), 850, "branch1"), font=F(REG, 22), fill=C_WHITE)
d.text((58, 502), "2.", font=F(BOLD, 23), fill=C_RED2)
d.text((92, 503), fit(d, "Kemer Mah. 926. Sok. No: 2/C, Esenler", F(REG, 22), 850, "branch2"), font=F(REG, 22), fill=C_WHITE)
bottom_bar(d, "Tel & WhatsApp: 0537 732 52 69  •  Her gün 22:30'a kadar açık")
im.save("/home/user/kart_vizit_on.png")

# ================= BACK =================
im2, d2 = base_card()
d2.text((58, 56), fit(d2, "GÜNLÜK TANZİM FİYATLARI", F(BOLD, 37), 600, "back headline"), font=F(BOLD, 40), fill=C_AMBER_L)
d2.text((58, 106), fit(d2, "Vitrinde ne yazıyorsa o — sürpriz yok!", F(REG, 21), 600, "back sub"), font=F(REG, 21), fill=C_GRAY)
prices = [("Dana Kemikli Et", "650"), ("Kuşbaşı / Özel Çekim Kıyma", "750"), ("Kuzu Et / Kuşbaşı", "1.069"),
          ("Dana Antrikot", "1.100"), ("Kuzu Pirzola", "1.399")]
y = 156
for lab, pr in prices:
    d2.text((58, y), fit(d2, lab, F(REG, 25), 360, "price label " + lab), font=F(REG, 25), fill=C_WHITE)
    pf, sf = F(BOLD, 30), F(REG, 19)
    pw = d2.textlength(pr, font=pf) + d2.textlength(" TL/Kg", font=sf)
    lx = 58 + d2.textlength(lab, font=F(REG, 25)) + 12
    while lx < 640 - pw - 10:
        d2.ellipse([lx, y + 17, lx + 2, y + 19], fill=(82, 82, 91))
        lx += 12
    d2.text((640 - pw, y), pr, font=pf, fill=C_AMBER_L)
    d2.text((640 - d2.textlength(" TL/Kg", font=sf) + 2, y + 10), " TL/Kg", font=sf, fill=C_GRAY)
    y += 54
d2.text((58, y + 6), fit(d2, "Restoran, otel ve sitelere kurumsal toptan paketler — sorun!", F(REG, 19), 620, "back b2b"), font=F(REG, 20), fill=C_GRAY)
# QR card
d2.rounded_rectangle([690, 140, 936, 386], radius=18, fill=C_WHITE)
qr = qrcode.QRCode(border=1, box_size=8, error_correction=qrcode.constants.ERROR_CORRECT_M)
qr.add_data("https://sbz-edu.github.io/aykan-et-mangal/")
qr.make()
qim = qr.make_image(fill_color=C_DARK, back_color="white").convert("RGB").resize((206, 206), Image.NEAREST)
im2.paste(qim, (710, 160))
cap = "Menü & Sipariş →"
d2.text((690 + (246 - d2.textlength(cap, font=F(BOLD, 21))) / 2, 398), cap, font=F(BOLD, 21), fill=C_AMBER_L)
cap2 = "QR'ı okutun"
d2.text((690 + (246 - d2.textlength(cap2, font=F(REG, 17))) / 2, 428), cap2, font=F(REG, 17), fill=C_GRAY)
bottom_bar(d2, "Kasaptan direkt — ara bulucu yok!  •  Bağcılar & Esenler")
im2.save("/home/user/kart_vizit_arka.png")

# ================= PDF (print) =================
im.save("/home/user/aykan_kart_vizit_baski.pdf", save_all=True, append_images=[im2], resolution=300.0)

# ================= PREVIEW (both sides stacked) =================
pv = Image.new("RGB", (W, H * 2 + 110), (19, 19, 22))
pd = ImageDraw.Draw(pv)
pd.text(((W - pd.textlength("ÖN YÜZ  •  جلوی کارت", font=F(BOLD, 24))) / 2, 22), "ÖN YÜZ  •  جلوی کارت", font=F(BOLD, 24), fill=C_GRAY)
pv.paste(im, (0, 62))
pd.text(((W - pd.textlength("ARKA YÜZ  •  پشت کارت", font=F(BOLD, 24))) / 2, H + 88), "ARKA YÜZ  •  پشت کارت", font=F(BOLD, 24), fill=C_GRAY)
pv.paste(im2, (0, H + 128))
pv.save("/home/user/kart_vizit_preview.png")

# ================= sanity =================
print("problems:", problems if problems else "NONE — all text fits")
px = im.load(); px2 = im2.load()
checks = [
    ("front bg dark", sum(px[500, 350]) < 150),
    ("front bar red", px[500, 590][0] > 130),
    ("back QR white", sum(px2[813, 280]) > 700),
    ("back bar red", px2[500, 590][0] > 130),
]
for n, ok in checks: print(("✅" if ok else "❌"), n)
for f in ("kart_vizit_on.png", "kart_vizit_arka.png", "aykan_kart_vizit_baski.pdf", "kart_vizit_preview.png"):
    print(f, os.path.getsize("/home/user/" + f), "bytes")
