#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AYKAN ET & MANGAL — Fiyat Listesi Broşürü v2
Model: dükkânın gerçek fiyat kartları (uploads/IMG_20260929_17*.jpg)
Yapı: ET BALIK TAVUK KUZU MANGAL şeridi + AYKAN ET MANGAL başlık
      → ÇİĞ KİLO FİYATLARIMIZ (7 kart) → PİŞMİŞ KİLO FİYATLARIMIZ (7 kart)  [köfte ürünleri kaldırıldı]
      → "1 KİLO ÇİĞ TARTIP PİŞİRİYORUZ" şeridi → adres/telefon footer
Kurallar: görsel içi metin SADECE Türkçe/Latin — Persian/emoji YOK (tofu önlemi)
Çıktı: brosur/aykan_fiyat_brosuru_{master.png, preview.png, baski.pdf}
"""
import os, re
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

FD = "/usr/share/fonts/truetype/dejavu/"
def F(sz, bold=True):
    return ImageFont.truetype(FD + ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"), sz)

W, H = 2048, 3072
MARGIN = 64
CRIMSON = (142, 26, 32)      # #8e1a20 — marka kırmızısı (modelden)
CRIMSON_DK = (100, 16, 20)
RED_BRIGHT = (193, 39, 45)
BG = (232, 236, 242)         # modelin mavi-gri tonu (açık)
NAVY = (28, 37, 48)
GRAY = (110, 118, 130)
WHITE = (255, 255, 255)

# ₺ glifi var mı?
_has_tl = ImageFont.truetype(FD + "DejaVuSans-Bold.ttf", 40).getmask("\u20ba").getbbox() is not None
CUR = "\u20ba" if _has_tl else " TL"

# ---------- veri (model kartlarından — OCR) ----------
CIG = [
    ("butun_tavuk",   "BÜTÜN TAVUK (KANATSIZ)", "94,99"),
    ("tavuk_but",     "TAVUK BUT",             "94,99"),
    ("tavuk_baget_c", "TAVUK BAGET",           "114,99"),
    ("tavuk_pirzola_c","TAVUK PİRZOLA",        "134,99"),
    ("tavuk_bonfile", "TAVUK BONFİLE",         "159,99"),
    ("dana_dos_sarma","DANA DÖŞ SARMA",        "599,00"),
    ("dana_kusbasi",  "DANA KUŞBAŞI",           "899,99"),
]
PISMIS = [
    ("tavuk_kanat",    "TAVUK KANAT",  "300"),
    ("tavuk_pirzola_p","TAVUK PİRZOLA","250"),
    ("tavuk_sis",      "TAVUK ŞİŞ",    "200"),
    ("tavuk_citir",    "TAVUK ÇİTİR",  "200"),
    ("tavuk_baget_p",  "TAVUK BAGET",  "200"),
    ("kuzu_pirzola",   "KUZU PİRZOLA", "1500"),
    ("antrikot",       "ANTRİKOT",     "1400"),
]

FOTO = "brosur/foto_yeni/"
LOGO = "aykan_logo_square_512.jpg"

def photo(name):
    im = Image.open(FOTO + name + ".png").convert("RGB")
    im = ImageEnhance.Color(im).enhance(1.18)
    im = ImageEnhance.Contrast(im).enhance(1.08)
    return im

def cover(im, w, h):
    """object-fit: cover"""
    r = max(w / im.width, h / im.height)
    im2 = im.resize((max(1, int(im.width * r + 0.5)), max(1, int(im.height * r + 0.5))), Image.LANCZOS)
    x = (im2.width - w) // 2; y = (im2.height - h) // 2
    return im2.crop((x, y, x + w, y + h))

def rrect(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)
problems = []

# ---------- ۱) üst şerit + başlık ----------
STRIP_H = 66
d.rectangle([0, 0, W, STRIP_H], fill=CRIMSON)
t = "ET  •  BALIK  •  TAVUK  •  KUZU  •  MANGAL"
f = F(30)
tw = d.textlength(t, font=f)
d.text(((W - tw) / 2, (STRIP_H - 34) / 2), t, font=f, fill=(255, 226, 210))

y = STRIP_H + 30
logo = Image.open(LOGO).convert("RGB").resize((170, 170), Image.LANCZOS)
mask = Image.new("L", (170, 170), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, 170, 170], radius=85, fill=255)
img.paste(logo, (MARGIN + 10, y), mask)
d.ellipse([MARGIN + 6, y - 4, MARGIN + 184, y + 174], outline=CRIMSON, width=5)

lx = MARGIN + 214
f_big = F(86); f_sub = F(34, bold=False)
d.text((lx, y - 6), "AYKAN ET MANGAL", font=f_big, fill=NAVY)
d.text((lx, y + 106), "Tanzim Satış Mağazası  —  Göztepe / Bağcılar", font=f_sub, fill=GRAY)

# WhatsApp rozeti sağda
wa_box = [W - MARGIN - 470, y + 22, W - MARGIN, y + 122]
rrect(d, wa_box, 50, fill=(37, 211, 102))
f_wa = F(34)
t = "WhatsApp: 0537 732 52 69"
tw = d.textlength(t, font=f_wa)
d.text((wa_box[0] + (470 - tw) / 2, wa_box[1] + 26), t, font=f_wa, fill=(5, 46, 19))

y += 200

# ---------- ۲) yerleşim hesabı ----------
FOOTER_H = 268
footer_y = H - 52 - FOOTER_H
BANNER_H = 0   # köfte banner kaldırıldı — alan kartlara aktarıldı
SLOGAN_H = 122
BAR_H = 68
GAP = 18
ROW_GAP = 20
# dikey bütçe
top_content_end = y + GAP
avail = footer_y - GAP - SLOGAN_H - GAP - top_content_end
non_card = 2 * BAR_H + GAP + 2 * ROW_GAP  # bar + grid içi boşluklar
CARD_H = (avail - non_card - GAP) // 4
PH_H = CARD_H - 118   # foto yüksekliği
COLS = 4
CARD_W = (W - 2 * MARGIN - 3 * 22) // 4
if CARD_H < 300 or PH_H < 170:
    problems.append("kart boyutu çok küçük: CARD_H=%d PH=%d" % (CARD_H, PH_H))

def section_bar(yy, title):
    rrect(d, [MARGIN, yy, W - MARGIN, yy + BAR_H], 18, fill=CRIMSON)
    f = F(42)
    tw = d.textlength(title, font=f)
    d.text(((W - tw) / 2, yy + 12), title, font=f, fill=WHITE)
    return yy + BAR_H

def card(x, yy, name_key, title, price):
    c = [x, yy, x + CARD_W, yy + CARD_H]
    rrect(d, c, 20, fill=WHITE, outline=(210, 216, 226), width=2)
    ph = cover(photo(name_key), CARD_W - 20, PH_H)
    m = Image.new("L", ph.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, ph.size[0], ph.size[1]], radius=14, fill=255)
    img.paste(ph, (x + 10, yy + 10), m)
    ty = yy + 10 + PH_H + 6
    f_n = F(30)
    while d.textlength(title, font=f_n) > CARD_W - 20 and f_n.size > 21:
        f_n = F(f_n.size - 2)
    if d.textlength(title, font=f_n) > CARD_W - 20:
        problems.append("isim sığmadı: " + title)
    tw = d.textlength(title, font=f_n)
    d.text((x + (CARD_W - tw) / 2, ty), title, font=f_n, fill=NAVY)
    pr = price + CUR
    f_p = F(52)
    pw = d.textlength(pr, font=f_p)
    f_kg = F(26)
    kw = d.textlength("/KG", font=f_kg)
    total = pw + 8 + kw
    px = x + (CARD_W - total) / 2
    d.text((px, ty + 44), pr, font=f_p, fill=CRIMSON)
    d.text((px + pw + 8, ty + 74), "/KG", font=f_kg, fill=GRAY)

# ---------- ۳) ÇİĞ bölümü ----------
y = section_bar(y, "ÇİĞ KİLO FİYATLARIMIZ") + GAP
for i, (k, title, price) in enumerate(CIG):
    r, cidx = divmod(i, COLS)
    x = MARGIN + cidx * (CARD_W + 22)
    card(x, y + r * (CARD_H + ROW_GAP), k, title, price)
y += 2 * CARD_H + ROW_GAP + GAP

# ---------- ۴) PİŞMİŞ bölümü ----------
y = section_bar(y, "PİŞMİŞ KİLO FİYATLARIMIZ") + GAP
for i, (k, title, price) in enumerate(PISMIS):
    r, cidx = divmod(i, COLS)
    x = MARGIN + cidx * (CARD_W + 22)
    card(x, y + r * (CARD_H + ROW_GAP), k, title, price)
y += 2 * CARD_H + ROW_GAP + GAP

# ---------- ۶) slogan ----------
rrect(d, [MARGIN, y, W - MARGIN, y + SLOGAN_H], 20, fill=CRIMSON)
f_s = F(52)
t = "1 KİLO ÇİĞ TARTIP PİŞİRİYORUZ"
tw = d.textlength(t, font=f_s)
d.text(((W - tw) / 2, y + 20), t, font=f_s, fill=WHITE)
f_s2 = F(26, bold=False)
t2 = "Pişmiş ürünlerde gramaj garantisi — tartıdan sofranıza."
tw2 = d.textlength(t2, font=f_s2)
d.text(((W - tw2) / 2, y + 84), t2, font=f_s2, fill=(255, 214, 205))

# ---------- ۷) footer ----------
fy = footer_y
d.rectangle([0, fy, W, H], fill=NAVY)
d.rectangle([0, fy, W, fy + 8], fill=CRIMSON)
f_h = F(30); f_b = F(26, bold=False); f_ph = F(40)
col2 = int(W * 0.56)
d.text((MARGIN, fy + 24), "ADRES", font=f_h, fill=(240, 158, 90))
d.text((MARGIN, fy + 66), "Göztepe Mah. Maslak Cad. No: 95/A Bağcılar / İST", font=f_b, fill=(215, 220, 228))
d.text((MARGIN, fy + 104), "2. Şube: Kemer Mah. 926. Sok. No: 2/C Esenler", font=f_b, fill=(215, 220, 228))
d.text((MARGIN, fy + 142), "Her gün açık: 08:00 - 22:30", font=f_b, fill=(215, 220, 228))
d.text((MARGIN, fy + 180), "Instagram: @aykanetmangal   |   Telegram: @AykanEtmangal_shopping", font=f_b, fill=(215, 220, 228))

d.text((col2, fy + 24), "SİPARİŞ & TELSİZ", font=f_h, fill=(240, 158, 90))
d.text((col2, fy + 66), "0212 445 34 72", font=f_ph, fill=WHITE)
d.text((col2, fy + 118), "0537 732 52 69  (WhatsApp)", font=f_ph, fill=(94, 234, 141))

# QR (hızlı sipariş sayfası)
try:
    import qrcode
    qr = qrcode.QRCode(border=1, box_size=6)
    qr.add_data("https://aykan-hizli.elasa2next.workers.dev")
    qr.make(fit=True)
    qim = qr.make_image(fill_color=NAVY, back_color=WHITE).convert("RGB")
    qs = 150
    qim = qim.resize((qs, qs), Image.NEAREST)
    img.paste(qim, (W - MARGIN - qs, fy + 66))
    f_q = F(22, bold=False)
    t = "Fiyat & Sipariş"
    tw = d.textlength(t, font=f_q)
    d.text((W - MARGIN - qs + (qs - tw) / 2, fy + 220), t, font=f_q, fill=(215, 220, 228))
except ImportError:
    problems.append("qrcode yok — QR atlandı")

d.text((col2, fy + 170), "Tanzim Satış Mağazası  —  (Göztepe / Bağcılar)", font=f_b, fill=(215, 220, 228))

# ---------- kontroller ----------
assert 0 < CARD_H < 800 and 0 < PH_H < 800, "geometri bozuk"
if y + SLOGAN_H > footer_y:
    problems.append("slogan footera taştı: %d > %d" % (y + SLOGAN_H, footer_y))
all_texts = [t for _, t, _ in CIG] + [t for _, t, _ in PISMIS] + [t, t2]
for s in all_texts:
    for ch in s:
        if ("\u0600" <= ch <= "\u06ff") or ("\U0001f000" <= ch <= "\U0001faff"):
            problems.append("yasak glif %r در %s" % (ch, s))
            break
for fnt in (F(30), F(52), F(86)):
    for ch in set("".join(all_texts) + "\u20baİĞÜŞÖÇıöüşğç0123456789,/.•()-&"):
        if ch.isspace():
            continue
        if fnt.getmask(ch).getbbox() is None:
            problems.append("glif yok: %r" % ch)

if problems:
    raise SystemExit("❌ " + "; ".join(problems))

out_master = "brosur/aykan_fiyat_brosuru_master.png"
img.save(out_master, "PNG")
img.resize((1024, 1536), Image.LANCZOS).save("brosur/aykan_fiyat_brosuru_preview.png", "PNG")
img.save("brosur/aykan_fiyat_brosuru_baski.pdf", "PDF", resolution=150)
print("✅ brosur v2.1 (köftesiz): 2048x3072 | kart=%dx%d foto_h=%d | ₺=%s" % (CARD_W, CARD_H, PH_H, CUR))
print("   çıktılar: master.png / preview.png / baski.pdf")
