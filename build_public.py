#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build the PUBLIC customer storefront from the full portal file.
- customer-facing title
- store view default (single tab)
- LEADS / PACKAGE_CATALOG / INVEST_LEADERS data emptied (privacy!)
- admin links removed from hamburger drawer
Writes deploy/public/index.html and updates deploy/full/index.html.
"""
import io, re, json

FULL = "bagcilar_kasap_website.html"
s = io.open(FULL, encoding="utf-8").read()

def fail(m):
    raise SystemExit("❌ " + m)

def empty_js_assignment(src, var):
    """Replace `const VAR = <balanced>;` with `const VAR = <empty>;` keeping type."""
    m = re.search(r"const %s\s*=\s*" % var, src)
    if not m:
        fail("assignment for %s not found" % var)
    i = m.end()
    # skip whitespace
    while src[i] in " \n\r\t":
        i += 1
    open_ch = src[i]
    close_ch = {"[": "]", "{": "}"}[open_ch]
    empty_val = "[]" if open_ch == "[" else "{}"
    depth, j, in_str, esc = 0, i, None, False
    while j < len(src):
        c = src[j]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == in_str:
                in_str = None
        else:
            if c in "\"'":
                in_str = c
            elif c == open_ch:
                depth += 1
            elif c == close_ch:
                depth -= 1
                if depth == 0:
                    break
        j += 1
    if depth != 0:
        fail("unbalanced brackets for %s" % var)
    old = src[m.start():j + 1]
    return src[:m.start()] + ("const %s = %s" % (var, empty_val)) + src[j + 1:]

# 1) title
t_old = '<title>Aykan Et & Mangal | 5x100 (500 Leads) B2B/B2C Marketing Portal & Storefront</title>'
t_new = '<title>Aykan Et &amp; Mangal | Kasap Izgara — Et • Balık • Tavuk • Kuzu | Bağcılar &amp; Esenler</title>'
if s.count(t_old) != 1:
    fail("title anchor (count=%d)" % s.count(t_old))
s = s.replace(t_old, t_new)

# 2) mode-tabs: single store tab
mt_old = re.search(r'<div class="mode-tabs">.*?</div>', s, re.S)
if not mt_old:
    fail("mode-tabs not found")
mt_new = ('<div class="mode-tabs">\n'
          '      <button class="mode-tab-btn active" id="tab-btn-store" onclick="switchMainView(\'store\')">\n'
          '        🛒 Aykan Et & Mangal — Online Vitrin\n'
          '      </button>\n'
          '    </div>')
s = s[:mt_old.start()] + mt_new + s[mt_old.end():]

# 3) default active panel: store instead of crm
a_old = '<div class="view-panel active" id="view-crm">'
if s.count(a_old) != 1:
    fail("view-crm active anchor")
s = s.replace(a_old, '<div class="view-panel" id="view-crm">')
b_old = '<div class="view-panel" id="view-store"><span id="view-store-top"></span>'
if s.count(b_old) != 1:
    fail("view-store anchor")
s = s.replace(b_old, '<div class="view-panel active" id="view-store"><span id="view-store-top"></span>')

# 4) empty private data
for var in ("LEADS", "PACKAGE_CATALOG", "INVEST_LEADERS"):
    s = empty_js_assignment(s, var)

# 5) remove admin group from hamburger drawer (public must not show admin nav)
adm = re.search(r'\s*<h5>🎯 پنل مدیریت \(مدیر\)</h5>.*?📊 داشبورد ۱۰ منطقه</a>', s, re.S)
if not adm:
    fail("drawer admin block not found")
s = s[:adm.start()] + adm.group(0).split("</a>")[-1] + s[adm.end():] if False else s[:adm.start()] + "\n" + s[adm.end():]

# 6) sanity: no lead phones/emails leaked
for pat in (r'"phone":\s*"\+90', r'"email":\s*"[^"]+@"'):
    if re.search(pat, s):
        fail("privacy leak pattern still present: " + pat)

io.open("deploy/public/index.html", "w", encoding="utf-8").write(s)
io.open("deploy/full/index.html", "w", encoding="utf-8").write(io.open(FULL, encoding="utf-8").read())
print("✅ public built: %d chars | full snapshot updated" % len(s))
print("   LEADS/INVEST_LEADERS emptied:", '"LEADS = []"' in s.replace("const ", '"').replace(";", '"') or "const LEADS = []" in s)
