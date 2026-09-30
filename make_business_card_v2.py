#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AYKAN ET & MANGAL — Kartvizit v2: 3 premium model (TR/EN bilingual), 85×55mm @300dpi.
Model A: Black&Gold (yatay klasik)   Model B: Bordo Royal (ortalı)   Model C: Ivory Light (modern)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode, os

W, H = 1005, 650
FD = "/usr/share/fonts/truetype/dejavu/"
def F(n, s): return ImageFont.truetype(FD + n, s)
BOLD, REG = "DejaVuSans-Bold.ttf", "DejaVuSans.ttf"

LOGO = Image.open("/home/user/aykan_logo_square_512.jpg").convert("RGB")

# ---- verified info (TR/EN) ----
PHONE = "0537 732 52 69"
INSTA = "@aykanetmangal"
WEB = "sbz-edu.github.io/aykan-et-mangal"
WEB_URL = "https://sbz-edu.github.io/aykan-et-mangal/"
HOURS = "Her gün 22:30'a kadar açık  •  Open every day until 22:30"
TAGLINE = "Kasap & Izgara  •  Butcher & Grill"
PRODUCTS = "Et • Balık • Tavuk • Kuzu   |   Beef • Fish • Chicken • Lamb"
PRICES = [("Dana Kemikli Et / Bone-in Beef", "650"), ("Kuşbaşı / Kıyma / Cubes & Minced", "750"),
          ("Kuzu Et / Lamb", "1.069"), ("Dana Antrikot / Ribeye", "1.100"), ("Kuzu Pirzola / Lamb Chops", "1.399")]
BR1 = "1) Göztepe Mah. Maslak Cad. No: 95A-95C, Bağcılar  (Metro yanı)"
BR2 = "2) Kemer Mah. 926. Sok. No: 2/C, Esenler"
QR_CAP = "Menü & Sipariş  •  Menu & Order"

problems = []
def fit(d, t, f, maxw, what):
    w = d.textlength(t, font=f)
    if w > maxw: problems.append("%s: %.0f>%d" % (what, w, maxw))
    return t

QR_IMG = None
def qr():
    global QR_IMG
    if QR_IMG is None:
        q = qrcode.QRCode(border=1, box_size=8, error_correction=qrcode.constants.ERROR_CORRECT_M)
        q.add_data(WEB_URL); q.make()
        QR_IMG = q.make_image(fill_color=(12, 12, 14), back_color="white").convert("RGB")
    return QR_IMG

def grad(c1, c2):
    im = Image.new("RGB", (W, H), c1); d = ImageDraw.Draw(im)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    return im

def glow(im, spots):
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(g)
    for box, col in spots: gd.ellipse(box, fill=col)
    return Image.alpha_composite(im.convert("RGBA"), g.filter(ImageFilter.GaussianBlur(60))).convert("RGB")

def bar(d, fill, text, tcol, y0=566, h=52, fsize=21):
    d.rounded_rectangle([34, y0, W - 35, y0 + h], radius=13, fill=fill)
    f = F(BOLD, fsize)
    fit(d, text, f, W - 110, "bar '" + text[:18] + "'")
    d.text(((W - d.textlength(text, font=f)) / 2, y0 + (h - fsize) / 2 - 2), text, font=f, fill=tcol)

# ================= MODEL A — BLACK & GOLD =================
PA = dict(bg1=(20, 20, 26), bg2=(8, 8, 12), gold=(212, 175, 55), goldl=(245, 205, 100),
          txt=(250, 250, 250), gray=(168, 162, 158), red=(185, 28, 28), frame=(212, 175, 55))

def front_A():
    p = PA
    im = glow(grad(p["bg1"], p["bg2"]), [([W-430, -270, W+170, 230], (185, 28, 28, 40)), ([-270, H-210, 190, H+250], (212, 175, 55, 26))])
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([16, 16, W-17, H-17], radius=24, outline=p["frame"], width=3)
    d.rounded_rectangle([56, 84, 236, 264], radius=20, outline=p["gold"], width=3)
    im.paste(LOGO.resize((180, 180), Image.LANCZOS), (56, 84))
    d.text((280, 84), fit(d, "AYKAN", F(BOLD, 60), 660, "A-brand"), font=F(BOLD, 60), fill=p["goldl"])
    d.text((280, 156), fit(d, "ET & MANGAL", F(BOLD, 36), 660, "A-brand2"), font=F(BOLD, 36), fill=p["txt"])
    d.text((280, 206), fit(d, TAGLINE, F(REG, 21), 660, "A-tag"), font=F(REG, 21), fill=p["gray"])
    d.text((280, 236), fit(d, PRODUCTS, F(REG, 19), 660, "A-prod"), font=F(REG, 19), fill=p["gray"])
    d.line([56, 288, W-57, 288], fill=p["gold"], width=2)
    y = 314
    for lab, val in (("WHATSAPP", PHONE), ("İNSTAGRAM", INSTA), ("WEB", WEB)):
        d.text((56, y + 7), fit(d, lab, F(BOLD, 18), 150, "A-lab"), font=F(BOLD, 18), fill=p["gold"])
        d.text((220, y), fit(d, val, F(BOLD, 28), 720, "A-val"), font=F(BOLD, 28), fill=p["txt"])
        y += 54
    bar(d, p["red"], HOURS, p["txt"])
    return im

def back_A():
    p = PA
    im = glow(grad(p["bg2"], p["bg1"]), [([-270, -220, 200, 240], (185, 28, 28, 34))])
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([16, 16, W-17, H-17], radius=24, outline=p["frame"], width=3)
    d.text((56, 62), fit(d, "GÜNLÜK FİYATLAR  •  DAILY PRICES", F(BOLD, 31), 630, "A-bk-t"), font=F(BOLD, 31), fill=p["goldl"])
    d.text((56, 110), fit(d, "Vitrinde ne yazıyorsa o — What you see is what you pay!", F(REG, 20), 600, "A-bk-s"), font=F(REG, 20), fill=p["gray"])
    y = 152
    for lab, pr in PRICES:
        d.text((56, y), fit(d, lab, F(REG, 22), 420, "A-pr"), font=F(REG, 22), fill=p["txt"])
        pf, sf = F(BOLD, 27), F(REG, 16)
        d.text((610 - d.textlength(pr, font=pf), y), pr, font=pf, fill=p["goldl"])
        d.text((614, y + 11), "TL/Kg", font=sf, fill=p["gray"])
        y += 54
    d.rounded_rectangle([664, 140, 944, 420], radius=18, fill=(250, 250, 250))
    im.paste(qr().resize((240, 240), Image.NEAREST), (684, 160))
    f1, f2 = F(BOLD, 20), F(REG, 16)
    t1, t2 = "Menü & Sipariş", "Menu & Order"
    d.text((804 - d.textlength(t1, font=f1) / 2, 430), t1, font=f1, fill=p["goldl"])
    d.text((804 - d.textlength(t2, font=f2) / 2, 458), t2, font=f2, fill=p["gray"])
    d.text((56, 462), "ŞUBELERİMİZ  •  OUR BRANCHES", font=F(BOLD, 19), fill=p["gold"])
    d.text((56, 492), fit(d, BR1, F(REG, 20), 890, "A-br1"), font=F(REG, 20), fill=p["txt"])
    d.text((56, 522), fit(d, BR2, F(REG, 20), 890, "A-br2"), font=F(REG, 20), fill=p["txt"])
    bar(d, p["red"], "Kasaptan direkt — Direct from the butcher, no middlemen", p["txt"])
    return im

# ================= MODEL B — BORDO ROYAL =================
PB = dict(bg1=(72, 12, 26), bg2=(28, 4, 12), gold=(218, 178, 82), goldl=(248, 216, 138),
          txt=(248, 240, 230), gray=(205, 175, 175), red=(140, 20, 20), frame=(218, 178, 82))

def front_B():
    p = PB
    im = glow(grad(p["bg1"], p["bg2"]), [([-250, -250, 250, 250], (255, 200, 120, 26)), ([W-300, H-260, W+240, H+220], (120, 10, 24, 90))])
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([16, 16, W-17, H-17], radius=24, outline=p["frame"], width=3)
    d.rounded_rectangle([(W-160)//2 - 6, 50, (W+160)//2 + 6, 216], radius=20, outline=p["gold"], width=3)
    im.paste(LOGO.resize((160, 160), Image.LANCZOS), ((W-160)//2, 56))
    def center(t, f, y, col):
        fit(d, t, f, W - 120, "B-" + t[:14])
        d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=col)
    center("AYKAN", F(BOLD, 56), 236, p["goldl"])
    center("ET & MANGAL", F(BOLD, 34), 300, p["txt"])
    center(TAGLINE, F(REG, 21), 348, p["gray"])
    center(PRODUCTS, F(REG, 18), 378, p["gray"])
    d.line([W//2 - 130, 414, W//2 + 130, 414], fill=p["gold"], width=2)
    center("WhatsApp & Tel:  " + PHONE, F(BOLD, 26), 436, p["txt"])
    center("İnstagram:  " + INSTA + "      Web:  " + WEB, F(BOLD, 19), 486, p["goldl"])
    center("Et • Balık • Tavuk • Kuzu — her gün taze kesim / fresh daily cuts", F(REG, 17), 520, p["gray"])
    bar(d, p["red"], HOURS, p["txt"])
    return im

def back_B():
    p = PB
    im = glow(grad(p["bg2"], p["bg1"]), [([W-380, -240, W+200, 240], (255, 200, 120, 20))])
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([16, 16, W-17, H-17], radius=24, outline=p["frame"], width=3)
    d.text((56, 62), fit(d, "GÜNLÜK FİYATLAR  •  DAILY PRICES", F(BOLD, 31), 630, "B-bk-t"), font=F(BOLD, 31), fill=p["goldl"])
    d.text((56, 110), fit(d, "Vitrinde ne yazıyorsa o — What you see is what you pay!", F(REG, 20), 600, "B-bk-s"), font=F(REG, 20), fill=p["gray"])
    y = 152
    for lab, pr in PRICES:
        d.text((56, y), fit(d, lab, F(REG, 22), 420, "B-pr"), font=F(REG, 22), fill=p["txt"])
        pf, sf = F(BOLD, 27), F(REG, 16)
        d.text((610 - d.textlength(pr, font=pf), y), pr, font=pf, fill=p["goldl"])
        d.text((614, y + 11), "TL/Kg", font=sf, fill=p["gray"])
        y += 54
    d.rounded_rectangle([664, 140, 944, 420], radius=18, fill=(250, 246, 238))
    im.paste(qr().resize((240, 240), Image.NEAREST), (684, 160))
    f1, f2 = F(BOLD, 20), F(REG, 16)
    t1, t2 = "Menü & Sipariş", "Menu & Order"
    d.text((804 - d.textlength(t1, font=f1) / 2, 430), t1, font=f1, fill=p["gold"])
    d.text((804 - d.textlength(t2, font=f2) / 2, 458), t2, font=f2, fill=p["gray"])
    d.text((56, 462), "ŞUBELERİMİZ  •  OUR BRANCHES", font=F(BOLD, 19), fill=p["gold"])
    d.text((56, 492), fit(d, BR1, F(REG, 20), 890, "B-br1"), font=F(REG, 20), fill=p["txt"])
    d.text((56, 522), fit(d, BR2, F(REG, 20), 890, "B-br2"), font=F(REG, 20), fill=p["txt"])
    bar(d, (30, 6, 14), "Kasaptan direkt — Direct from the butcher, no middlemen", p["goldl"])
    return im

# ================= MODEL C — IVORY LIGHT =================
PC = dict(bg1=(250, 246, 238), bg2=(236, 229, 216), gold=(178, 138, 42), goldl=(150, 112, 24),
          txt=(32, 32, 38), gray=(110, 106, 100), red=(158, 27, 27), frame=(178, 138, 42),
          dark=(24, 24, 30))

def front_C():
    p = PC
    im = grad(p["bg1"], p["bg2"]); d = ImageDraw.Draw(im)
    d.rounded_rectangle([16, 16, W-17, H-17], radius=24, outline=p["frame"], width=3)
    d.rounded_rectangle([48, 52, 208, 212], radius=20, fill=p["dark"], outline=p["gold"], width=3)
    im.paste(LOGO.resize((150, 150), Image.LANCZOS), (53, 57))
    d.text((56, 232), fit(d, "AYKAN", F(BOLD, 62), 700, "C-brand"), font=F(BOLD, 62), fill=p["txt"])
    d.text((56, 310), fit(d, "ET & MANGAL", F(BOLD, 38), 700, "C-brand2"), font=F(BOLD, 38), fill=p["red"])
    d.text((56, 362), fit(d, TAGLINE, F(REG, 21), 700, "C-tag"), font=F(REG, 21), fill=p["gray"])
    d.text((56, 392), fit(d, PRODUCTS, F(REG, 19), 700, "C-prod"), font=F(REG, 19), fill=p["gray"])
    d.line([56, 430, W-57, 430], fill=p["gold"], width=2)
    y = 448
    for lab, val in (("WHATSAPP", PHONE), ("İNSTAGRAM", INSTA), ("WEB", WEB)):
        d.text((56, y + 5), fit(d, lab, F(BOLD, 17), 150, "C-lab"), font=F(BOLD, 17), fill=p["red"])
        d.text((220, y), fit(d, val, F(BOLD, 26), 720, "C-val"), font=F(BOLD, 26), fill=p["txt"])
        y += 40
    bar(d, p["dark"], HOURS, (245, 205, 100))
    return im

def back_C():
    p = PC
    im = grad(p["bg2"], p["bg1"]); d = ImageDraw.Draw(im)
    d.rounded_rectangle([16, 16, W-17, H-17], radius=24, outline=p["frame"], width=3)
    # left dark panel + QR
    d.rounded_rectangle([44, 52, 372, 560], radius=22, fill=p["dark"])
    d.rounded_rectangle([88, 120, 328, 360], radius=16, fill=(250, 246, 238))
    im.paste(qr().resize((220, 220), Image.NEAREST), (98, 130))
    f1, f2 = F(BOLD, 21), F(REG, 16)
    t1, t2 = "Menü & Sipariş", "Menu & Order"
    d.text((208 - d.textlength(t1, font=f1) / 2, 380), t1, font=f1, fill=(245, 205, 100))
    d.text((208 - d.textlength(t2, font=f2) / 2, 410), t2, font=f2, fill=(200, 195, 185))
    fw = F(REG, 15)
    d.text((208 - d.textlength(WEB, font=fw) / 2, 452), WEB, font=fw, fill=(200, 195, 185))
    fwr = F(REG, 14)
    d.text((208 - d.textlength("Bizi takip edin — Follow us", font=fwr) / 2, 480), "Bizi takip edin — Follow us", font=fwr, fill=(160, 155, 145))
    # right: prices + branches
    d.text((416, 62), fit(d, "GÜNLÜK FİYATLAR", F(BOLD, 32), 560, "C-bk-t"), font=F(BOLD, 32), fill=p["red"])
    d.text((416, 108), fit(d, "Daily Prices — What you see is what you pay!", F(REG, 19), 560, "C-bk-s"), font=F(REG, 19), fill=p["gray"])
    y = 150
    for lab, pr in PRICES:
        d.text((416, y), fit(d, lab, F(REG, 21), 380, "C-pr"), font=F(REG, 21), fill=p["txt"])
        pf, sf = F(BOLD, 26), F(REG, 15)
        d.text((952 - d.textlength(pr, font=pf) - d.textlength(" TL/Kg", font=sf), y), pr, font=pf, fill=p["red"])
        d.text((952 - d.textlength(" TL/Kg", font=sf), y + 11), " TL/Kg", font=sf, fill=p["gray"])
        y += 52
    d.text((416, 448), "ŞUBELERİMİZ  •  OUR BRANCHES", font=F(BOLD, 18), fill=p["goldl"])
    d.text((416, 478), fit(d, BR1, F(REG, 16), 536, "C-br1"), font=F(REG, 16), fill=p["txt"])
    d.text((416, 506), fit(d, BR2, F(REG, 16), 536, "C-br2"), font=F(REG, 16), fill=p["txt"])
    bar(d, p["red"], "Kasaptan direkt — Direct from the butcher, no middlemen", (250, 246, 238))
    return im

# ================= BUILD ALL =================
models = {
    "A": ("BLACK & GOLD — Siyah Altın", front_A, back_A),
    "B": ("BORDO ROYAL — Bordo Kraliyet", front_B, back_B),
    "C": ("IVORY LIGHT — Krem Modern", front_C, back_C),
}
outs = []
for k, (title, ff, bf) in models.items():
    fr, bk = ff(), bf()
    fr.save("/home/user/kart_v2_%s_on.png" % k.lower())
    bk.save("/home/user/kart_v2_%s_arka.png" % k.lower())
    outs.append((title, fr, bk))

# print PDF (6 pages)
outs[0][1].save("/home/user/aykan_kart_v2_baski.pdf", save_all=True,
                append_images=[outs[0][2], outs[1][1], outs[1][2], outs[2][1], outs[2][2]], resolution=300.0)

# master preview: 3 rows (front | back), 50% scale
sc = 0.5
cw, ch = int(W * sc), int(H * sc)
GAP, LBL = 24, 54
pv = Image.new("RGB", (cw * 2 + GAP * 3, (ch + LBL + GAP) * 3 + GAP), (12, 12, 16))
pd = ImageDraw.Draw(pv)
y = GAP
for title, fr, bk in outs:
    pd.text((GAP, y + 6), "MODEL %s  •  %s" % (title.split(" ")[0], title), font=F(BOLD, 26), fill=(212, 175, 55))
    pv.paste(fr.resize((cw, ch), Image.LANCZOS), (GAP, y + LBL))
    pv.paste(bk.resize((cw, ch), Image.LANCZOS), (GAP * 2 + cw, y + LBL))
    pd.text((GAP + 8, y + LBL + ch + 6), "ÖN / Front", font=F(REG, 20), fill=(150, 150, 160))
    pd.text((GAP * 2 + cw + 8, y + LBL + ch + 6), "ARKA / Back", font=F(REG, 20), fill=(150, 150, 160))
    y += ch + LBL + GAP
pv.save("/home/user/kart_v2_preview.png")

# ================= CHECKS =================
print("fit problems:", problems if problems else "NONE — همه متن‌ها داخل کادرند")
for k, (title, fr, bk) in zip("ABC", outs):
    pfr, pbk = fr.load(), bk.load()
    checks = {
        "A": [(pfr[500, 350], "dark bg"), (pfr[500, 590], "red bar"), (pbk[800, 280], "QR white")],
        "B": [(pfr[500, 320], "bordo bg"), (pbk[800, 280], "QR light")],
        "C": [(pfr[500, 60], "ivory bg"), (pbk[200, 90], "dark panel"), (pbk[800, 280], "QR box"), (pfr[500, 590], "dark bar")],
    }[k]
    ok = all([
        sum(pfr[500, 350]) < 200 if k != "C" else sum(pfr[500, 60]) > 700,
        sum(pbk[800, 280]) > 600,
    ])
    print(("✅" if ok else "❌"), "Model", k, "—", title, "| pixels:", checks[0][0], checks[1][0])
for f in ("kart_v2_a_on.png", "kart_v2_a_arka.png", "kart_v2_b_on.png", "kart_v2_b_arka.png",
          "kart_v2_c_on.png", "kart_v2_c_arka.png", "aykan_kart_v2_baski.pdf", "kart_v2_preview.png"):
    print("%-28s %7d bytes" % (f, os.path.getsize("/home/user/" + f)))
