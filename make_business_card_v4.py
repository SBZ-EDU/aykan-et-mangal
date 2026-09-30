#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AYKAN ET & MANGAL — Kartvizit v4: 3D (yeni modeller, yeni renkler)
Format: koyu premium kart + 3D mockup (ekran görüntüsündeki format, kendi içeriğimiz)
4 model: OCEAN (mavi) • VIOLET (mor) • EMBER (turuncu/kömür) • PLATINUM (açık gümüş)
Çıktı: baskı (düz) + 3D mockup (sunum/WhatsApp) + PDF + preview
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode, os, math

W, H = 1005, 650
FD = "/usr/share/fonts/truetype/dejavu/"
def F(n, s): return ImageFont.truetype(FD + n, s)
BOLD, REG = "DejaVuSans-Bold.ttf", "DejaVuSans.ttf"
LOGO = Image.open("/home/user/aykan_logo_square_512.jpg").convert("RGB")

PHONE = "0537 732 52 69"
WEB = "aykan-hizli.elasa2next.workers.dev"
WEB_URL = "https://aykan-hizli.elasa2next.workers.dev/"
INSTA = "@aykanetmangal"
TAGLINE = "Kasap & Izgara  •  Butcher & Grill"
BRANCHES = "Bağcılar & Esenler  •  Her gün 22:30'a kadar  •  Open daily"
QR_T = "Menü & Sipariş  •  Menu & Order"
SLOGAN = "Günlük taze kesim  •  Fresh daily cuts"

MODELS = [
 ("1", "OCEAN", "Derin mavi + elektrik mavisi — güven ve profesyonellik",
  dict(bg1=(12, 22, 44), bg2=(4, 8, 20), acc=(56, 189, 248), acc2=(125, 211, 252),
       txt=(240, 248, 255), gray=(140, 160, 185), edge=(3, 6, 16), qrbox=(240, 250, 255), qrdark=(6, 12, 26))),
 ("2", "VIOLET", "Derin mor + neon pembe — prestij ve yaratıcılık",
  dict(bg1=(34, 14, 56), bg2=(13, 5, 24), acc=(192, 84, 252), acc2=(240, 171, 252),
       txt=(248, 240, 255), gray=(165, 145, 185), edge=(8, 3, 16), qrbox=(250, 244, 255), qrdark=(20, 8, 34))),
 ("3", "EMBER", "Kömür + ateş turuncusu — mangal, enerji ve iştah",
  dict(bg1=(30, 16, 9), bg2=(12, 6, 3), acc=(249, 115, 22), acc2=(254, 200, 150),
       txt=(255, 246, 238), gray=(180, 155, 135), edge=(6, 3, 2), qrbox=(255, 248, 240), qrdark=(28, 14, 7))),
 ("4", "PLATINUM", "Gümüş beyaz + çelik mavisi — sadelik ve modernlik",
  dict(bg1=(246, 248, 252), bg2=(216, 222, 234), acc=(30, 76, 168), acc2=(80, 130, 226),
       txt=(22, 28, 40), gray=(105, 112, 128), edge=(150, 158, 174), qrbox=(255, 255, 255), qrdark=(22, 30, 50))),
]

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
        _QR = q.make_image(fill_color=(10, 10, 14), back_color="white").convert("RGB")
    return _QR

def grad_img(w, h, c1, c2):
    im = Image.new("RGB", (w, h), c1); d = ImageDraw.Draw(im)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)], fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    return im

def center(d, t, f, y, col, what):
    fit(d, t, f, W - 90, what)
    d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=col)

def text3d(base, d, y, t, fsize, main_top, main_bot, shadow, depth=5):
    """Extruded 3D text: gölge katmanları + gradyan kaplama."""
    f = F(BOLD, fsize)
    x = (W - d.textlength(t, font=f)) / 2
    for i in range(depth, 0, -1):
        d.text((x + i, y + i), t, font=f, fill=shadow)
    mask = Image.new("L", base.size, 0)
    md = ImageDraw.Draw(mask)
    md.text((x, y), t, font=f, fill=255)
    bbox = f.getbbox(t)
    gy0, gy1 = y, y + (bbox[3] - bbox[1]) + 8
    g = grad_img(base.size[0], base.size[1], main_top, main_bot)
    # gradyanı metin bölgesine sıkıştır
    gg = Image.new("RGB", base.size, main_bot)
    gg.paste(g.crop((0, int(g.size[1] * 0.25), g.size[0], int(g.size[1] * 0.75))), (0, int(g.size[1] * 0.25)))
    base.paste(gg, (0, 0), mask)

def make_front(p):
    im = grad_img(W, H, p["bg1"], p["bg2"])
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([17, 17, W - 18, H - 18], radius=26, outline=p["acc"], width=2)
    L = 142; lx = (W - L) // 2; ly = 56
    for r in range(3):  # 3D halka
        d.rounded_rectangle([lx - 8 - r * 4, ly - 8 - r * 4, lx + L + 8 + r * 4, ly + L + 8 + r * 4],
                            radius=26 + r * 4, outline=tuple(max(0, min(255, int(p["acc"][i] * (0.55 - r * 0.16)))) for i in range(3)), width=2)
    im.paste(LOGO.resize((L, L), Image.LANCZOS), (lx, ly))
    text3d(im, d, 212, "AYKAN", 60, p["acc2"], p["acc"], p["edge"], depth=6)
    center(d, "ET & MANGAL", F(BOLD, 30), 292, p["txt"], "b2")
    center(d, TAGLINE, F(REG, 20), 338, p["gray"], "tag")
    d.line([W // 2 - 90, 376, W // 2 + 90, 376], fill=p["acc"], width=2)
    center(d, PHONE, F(BOLD, 40), 398, p["txt"], "ph")
    center(d, "WhatsApp & Tel", F(REG, 17), 452, p["gray"], "phl")
    center(d, WEB, F(BOLD, 22), 494, p["acc"] if p["bg1"][0] < 128 else p["acc"], "web")
    center(d, "İnstagram: " + INSTA, F(REG, 19), 532, p["gray"], "ig")
    center(d, BRANCHES, F(REG, 16), 582, p["gray"], "br")
    return im

def make_back(p):
    im = grad_img(W, H, p["bg2"], p["bg1"])
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([17, 17, W - 18, H - 18], radius=26, outline=p["acc"], width=2)
    text3d(im, d, 54, "AYKAN ET & MANGAL", 26, p["acc2"], p["acc"], p["edge"], depth=3)
    center(d, SLOGAN, F(REG, 18), 112, p["gray"], "slg")
    Q = 290; qx = (W - Q) // 2; qy = 148
    d.rounded_rectangle([qx - 14, qy - 14, qx + Q + 14, qy + Q + 14], radius=24, fill=p["qrbox"], outline=p["acc"], width=2)
    im.paste(qr().resize((Q, Q), Image.NEAREST), (qx, qy))
    center(d, QR_T, F(BOLD, 26), qy + Q + 32, p["txt"], "qrt")
    center(d, WEB, F(REG, 20), qy + Q + 74, p["acc"], "qrw")
    center(d, "☎ " + PHONE, F(BOLD, 22), qy + Q + 112, p["gray"], "qrp")
    return im

def add_gloss(card):
    """3D parlama süpürmesi (yalnızca mockup'ta)."""
    ov = Image.new("RGBA", card.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    od.polygon([(0, 0), (int(W * 0.55), 0), (int(W * 0.2), H), (0, H)], fill=(255, 255, 255, 26))
    od.polygon([(int(W * 0.62), 0), (int(W * 0.72), 0), (int(W * 0.38), H), (int(W * 0.28), H)], fill=(255, 255, 255, 20))
    return Image.alpha_composite(card.convert("RGBA"), ov).convert("RGB")

def make_3d(front, p, title, psycho):
    """3D mockup: stüdyo + eğik kart + kalınlık + gölge + yansıma."""
    SW, SH = 1400, 1060
    scene = grad_img(SW, SH, tuple(min(255, int(c * 0.5 + 8)) for c in p["bg1"]), (5, 5, 8))
    # spot ışığı
    sp = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sp)
    sd.ellipse([SW * 0.15, -SH * 0.25, SW * 0.85, SH * 0.55], fill=(255, 255, 255, 22))
    scene = Image.alpha_composite(scene.convert("RGBA"), sp.filter(ImageFilter.GaussianBlur(90))).convert("RGB")
    dd = ImageDraw.Draw(scene)

    # kart grubu: 3 katman kenar (kalınlık) + ana kart
    thick = Image.new("RGBA", (W + 40, H + 60), (0, 0, 0, 0))
    td = ImageDraw.Draw(thick)
    for k in range(3, 0, -1):
        off = k * 7
        col = tuple(max(0, int(p["edge"][i] * (1 - k * 0.18))) for i in range(3))
        td.rounded_rectangle([20, 20 + off, 20 + W, 20 + H + off], radius=26, fill=col + (255,))
    card = add_gloss(front).convert("RGBA")
    thick.paste(card, (20, 20))
    rot = thick.rotate(-8, expand=True, resample=Image.BICUBIC)

    cx, cy = (SW - rot.size[0]) // 2, int(SH * 0.40) - rot.size[1] // 2 + 40
    # zemin gölgesi
    sh = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    shd = ImageDraw.Draw(sh)
    shd.rounded_rectangle([cx + 60, cy + rot.size[1] - 60, cx + rot.size[0] - 20, cy + rot.size[1] + 10], radius=40, fill=(0, 0, 0, 130))
    scene = Image.alpha_composite(scene.convert("RGBA"), sh.filter(ImageFilter.GaussianBlur(26))).convert("RGB")
    # yansıma
    refl = rot.transpose(Image.FLIP_TOP_BOTTOM)
    rmask = Image.new("L", refl.size, 0)
    rmd = ImageDraw.Draw(rmask)
    for yy in range(refl.size[1]):
        rmd.line([(0, yy), (refl.size[0], yy)], fill=int(70 * max(0, 1 - yy / (refl.size[1] * 0.55))))
    scene.paste(refl, (cx, cy + rot.size[1] - 6), rmask)
    # kart
    scene.paste(rot, (cx, cy), rot)

    dd = ImageDraw.Draw(scene)
    f1 = F(BOLD, 34)
    t1 = "MODEL %s  •  %s" % ("", title)
    dd.text(((SW - dd.textlength(t1, font=f1)) / 2, SH - 96), t1, font=f1, fill=p["acc2"])
    f2 = F(REG, 22)
    dd.text(((SW - dd.textlength(psycho, font=f2)) / 2, SH - 52), psycho, font=f2, fill=(190, 190, 200))
    return scene

# ---- build ----
outs = []
for num, title, psycho, p in MODELS:
    fr, bk = make_front(p), make_back(p)
    fr.save("/home/user/kartvizit/kart_v4_%s_on.png" % num)
    bk.save("/home/user/kartvizit/kart_v4_%s_arka.png" % num)
    m3d = make_3d(fr, p, title, psycho)
    m3d.save("/home/user/kartvizit/kart_v4_%s_3d.png" % num)
    outs.append((num, title, psycho, fr, bk, m3d))

outs[0][3].save("/home/user/kartvizit/aykan_kart_v4_baski.pdf", save_all=True,
                append_images=[outs[0][4], outs[1][3], outs[1][4], outs[2][3], outs[2][4], outs[3][3], outs[3][4]],
                resolution=300.0)

# ---- preview: 2x2 3D mockups ----
sc = 0.5
mw, mh = 700, 530
pv = Image.new("RGB", (mw * 2 + 60, mh * 2 + 60 + 70), (10, 10, 14))
pd = ImageDraw.Draw(pv)
pd.text(((pv.size[0] - pd.textlength("AYKAN ET & MANGAL — 3D KARTVİZİT MODELLERİ (v4)", font=F(BOLD, 30))) / 2, 18),
        "AYKAN ET & MANGAL — 3D KARTVİZİT MODELLERİ (v4)", font=F(BOLD, 30), fill=(220, 190, 120))
for i, (num, title, psycho, fr, bk, m3d) in enumerate(outs):
    x = 20 + (i % 2) * (mw + 20)
    y = 70 + (i // 2) * (mh + 20)
    pv.paste(m3d.resize((mw, mh), Image.LANCZOS), (x, y))
pv.save("/home/user/kartvizit/kart_v4_preview.png")

# ---- checks ----
print("fit problems:", problems if problems else "NONE")
from fontTools.ttLib import TTFont
covered = set()
for fn in (BOLD, REG):
    for tbl in TTFont(FD + fn)["cmap"].tables:
        covered |= set(tbl.cmap.keys())
drawn = [PHONE, WEB, INSTA, TAGLINE, BRANCHES, QR_T, SLOGAN, "AYKAN", "ET & MANGAL"] + [m[1] for m in MODELS] + [m[2] for m in MODELS]
missing = sorted({c for t in drawn for c in t if ord(c) not in covered and c not in " \n\t"})
print("BROKEN GLYPHS:", missing if missing else "NONE ✅")
for num, title, psycho, fr, bk, m3d in outs:
    a = fr.load(); b = bk.load()
    print("✅ Model %s %-9s | ön bg:%s | QR-beyaz:%s | 3d boyut:%s" % (num, title, a[500, 60], sum(b[500, 300]) > 600, m3d.size))
for f in sorted(os.listdir("/home/user")):
    if f.startswith("kart_v4") or f == "aykan_kart_v4_baski.pdf":
        print("%-28s %7d bytes" % (f, os.path.getsize("/home/user/" + f)))
