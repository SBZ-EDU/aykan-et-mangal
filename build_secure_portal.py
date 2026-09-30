#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""SECURE FULL PORTAL build:
- CRM view (500 leads + invest leaders + catalog) gated behind admin PIN
- Private data REMOVED from public HTML — hydrated live from Cloudflare D1 via panel API
- Default view = storefront for visitors
Output: deploy/full/index.html
"""
import io, re

FULL = "bagcilar_kasap_website.html"
s = io.open(FULL, encoding="utf-8").read()

def fail(m): raise SystemExit("❌ " + m)

def empty_js_assignment(src, var):
    m = re.search(r"const %s\s*=\s*" % var, src)
    if not m: fail("assignment %s not found" % var)
    i = m.end()
    while src[i] in " \n\r\t": i += 1
    open_ch = src[i]
    close_ch = {"[": "]", "{": "}"}[open_ch]
    empty_val = "[]" if open_ch == "[" else "{}"
    depth, j, in_str, esc = 0, i, None, False
    while j < len(src):
        c = src[j]
        if in_str:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == in_str: in_str = None
        else:
            if c in "\"'": in_str = c
            elif c == open_ch: depth += 1
            elif c == close_ch:
                depth -= 1
                if depth == 0: break
        j += 1
    if depth != 0: fail("unbalanced %s" % var)
    return src[:m.start()] + ("const %s = %s" % (var, empty_val)) + src[j + 1:]

# 1) strip private data from public HTML
for var in ("LEADS", "PACKAGE_CATALOG", "INVEST_LEADERS"):
    s = empty_js_assignment(s, var)

# 2) default view = store (visitor lands on storefront; CRM needs PIN)
a = '<div class="view-panel active" id="view-crm">'
if s.count(a) != 1: fail("view-crm active anchor")
s = s.replace(a, '<div class="view-panel" id="view-crm">')
b = '<div class="view-panel" id="view-store"><span id="view-store-top"></span>'
if s.count(b) != 1: fail("view-store anchor")
s = s.replace(b, '<div class="view-panel active" id="view-store"><span id="view-store-top"></span>')
c = '<button class="mode-tab-btn active" id="tab-btn-crm"'
if s.count(c) != 1: fail("tab-crm anchor")
s = s.replace(c, '<button class="mode-tab-btn" id="tab-btn-crm"')
d = '<button class="mode-tab-btn" id="tab-btn-store"'
if s.count(d) != 1: fail("tab-store anchor")
s = s.replace(d, '<button class="mode-tab-btn active" id="tab-btn-store"')

# 3) admin gate + D1 hydration
INIT = """    renderLeadsTable();
    renderPackageCatalog();
    renderAreaDashboard();
    renderInvestLeaders();
    populateOutreachSelect();
  </script>"""
GATE = """    renderLeadsTable();
    renderPackageCatalog();
    renderAreaDashboard();
    renderInvestLeaders();
    populateOutreachSelect();

    // ===== 🔐 ADMIN GATE + D1 HYDRATION (v5 — data lives in Cloudflare D1, not in this HTML) =====
    (function () {
      const PANEL_URL = "https://aykan-panel.elasa2next.workers.dev";
      const _origSwitch = switchMainView;
      let authed = false;
      window.AYKAN_HYDRATED = false;
      function api(path) {
        return fetch(PANEL_URL + path, { headers: { authorization: "Bearer " + (localStorage.getItem("aykan_panel_token") || "") } })
          .then(r => { if (r.status === 401) { localStorage.removeItem("aykan_panel_token"); throw new Error("401"); } return r.json(); });
      }
      function hydrateAdminData(silent) {
        return api("/api/data").then(d => {
          (d.leads || []).forEach(l => LEADS.push(l));
          (d.invest || []).forEach(l => INVEST_LEADERS.push(l));
          Object.assign(PACKAGE_CATALOG, d.catalog || {});
          window.AYKAN_HYDRATED = true;
          renderLeadsTable(); renderPackageCatalog(); renderAreaDashboard(); renderInvestLeaders(); populateOutreachSelect();
          if (!silent) showToast("✅ داده‌های مدیریتی از دیتابیس کلودفلر بارگذاری شد — ۵۱۰ لید + ۱۰ لیدر + ۱۵ پکیج");
        }).catch(() => { if (!silent) showToast("⚠️ بارگذاری ناموفق — رمز را دوباره وارد کنید"); openAdminGate(); });
      }
      window.switchMainView = function (view) {
        if (view === "crm" && !authed) { openAdminGate(); return; }
        _origSwitch(view);
        if (view === "crm" && authed && !window.AYKAN_HYDRATED) hydrateAdminData(false);
      };
      function openAdminGate() {
        let m = document.getElementById("admin-gate");
        if (!m) {
          m = document.createElement("div");
          m.id = "admin-gate";
          m.style.cssText = "position:fixed;inset:0;background:rgba(9,9,11,.9);z-index:100001;display:flex;align-items:center;justify-content:center;padding:16px;";
          m.innerHTML = '<div dir="rtl" style="background:#1c1917;border:1px solid #e2621c;border-radius:22px;padding:30px;width:100%;max-width:380px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.6);">'
            + '<div style="font-size:40px">🔐</div>'
            + '<h3 style="color:#f5efe9;margin:10px 0 4px;font-size:17px;">ورود مدیر</h3>'
            + '<p style="color:#b8a89c;font-size:12px;margin-bottom:16px;">بانک ۵۱۰ لید و ابزارهای مدیریتی — فقط ادمین</p>'
            + '<input id="gate-pin" type="password" inputmode="numeric" placeholder="رمز ادمین" maxlength="8" style="width:100%;padding:13px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(0,0,0,.4);color:#f5efe9;text-align:center;font-size:18px;letter-spacing:5px;outline:none;font-family:inherit;">'
            + '<button id="gate-go" style="width:100%;margin-top:12px;padding:13px;border:none;border-radius:12px;background:linear-gradient(135deg,#e2621c,#f2833a);color:#fff;font-weight:800;font-size:14px;cursor:pointer;font-family:inherit;">ورود و نمایش داده‌ها</button>'
            + '<div id="gate-err" style="color:#ef4444;font-size:12px;margin-top:10px;min-height:15px;"></div>'
            + '<button id="gate-x" style="margin-top:6px;background:none;border:none;color:#b8a89c;font-size:12px;cursor:pointer;font-family:inherit;">بازگشت به فروشگاه</button></div>';
          document.body.appendChild(m);
          document.getElementById("gate-go").onclick = tryGate;
          document.getElementById("gate-x").onclick = function () { m.remove(); };
          document.getElementById("gate-pin").addEventListener("keydown", function (e) { if (e.key === "Enter") tryGate(); });
        }
        m.style.display = "flex";
        setTimeout(function () { document.getElementById("gate-pin").focus(); }, 60);
      }
      function tryGate() {
        var pin = document.getElementById("gate-pin").value.trim();
        document.getElementById("gate-err").textContent = "";
        fetch(PANEL_URL + "/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pin: pin }) })
          .then(function (r) { return r.json(); }).then(function (d) {
            if (!d.ok) { document.getElementById("gate-err").textContent = "⛔ " + (d.error || "رمز نادرست"); return; }
            localStorage.setItem("aykan_panel_token", d.token);
            authed = true;
            var g = document.getElementById("admin-gate"); if (g) g.remove();
            hydrateAdminData(false).then(function () { _origSwitch("crm"); });
          }).catch(function () { document.getElementById("gate-err").textContent = "⚠️ خطای شبکه"; });
      }
      if (localStorage.getItem("aykan_panel_token")) { authed = true; hydrateAdminData(true); }
    })();
  </script>"""
if s.count(INIT) != 1: fail("init block anchor (count=%d)" % s.count(INIT))
s = s.replace(INIT, GATE)

# 4) privacy checks — no lead data in public HTML
for pat, name in ((r'"phone":\s*"\+?9?0?\d{10}', "lead phone"), (r'"email":\s*"[^"]+@', "lead email"),
                  (r'"id":\s*"lead-\d+"', "lead id"), (r'"lead-500"', "lead-500"),
                  (r'"catNum":\s*501', "invest leader catNum")):
    if re.search(pat, s): fail("PRIVACY LEAK: %s still present" % name)

io.open("deploy/full/index.html", "w", encoding="utf-8").write(s)
print("✅ secure portal built: %d chars | data stripped, PIN gate + D1 hydration added" % len(s))
