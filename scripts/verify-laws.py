# -*- coding: utf-8 -*-
"""最终核验：个资法修正后条文定位（§18/§20-1/§27）、打诈专法（I0050031）、电子签章法（J0080037）。"""
import html
import re


def load(f):
    raw = open("tmp_laws/%s.html" % f, encoding="utf-8", errors="ignore").read()
    title = re.search(r"<title>\s*(.+?)-全國法規資料庫", raw, re.S)
    return (title.group(1).strip() if title else "?"), raw


def art_map(raw):
    """按 col-no 锚点切分条文，返回 {条号: 文本}。"""
    out = {}
    for m in re.finditer(
        r'<div class="col-no">\s*<a[^>]*>\s*第\s*([0-9]+(?:-[0-9]+)?)\s*條\s*</a>\s*</div>\s*<div class="col-data">(.*?)(?=<div class="col-no">|$)',
        raw,
        re.S,
    ):
        num, body = m.group(1), re.sub(r"<[^>]+>", " ", m.group(2))
        body = re.sub(r"\s+", " ", html.unescape(body)).strip()
        out.setdefault(num, body)
    return out


def show(label, title, arts, nums, cap=420):
    print("=== %s（《%s》） ===" % (label, title))
    for n in nums:
        print("  第%s条: %s" % (n, arts.get(n, "NF")[:cap]))


t, raw = load("I0050021")
show("个资法关键条复核", t, art_map(raw), ["18", "18-1", "20", "20-1", "21", "22", "27", "27-1", "28", "29", "41"])

t, raw = load("I0050031")
print("\nI0050031 标题:", t)
if "詐欺" in t:
    show("打诈专法", t, art_map(raw), ["2", "13", "14", "15", "44"])

t, raw = load("J0080037")
show("电子签章法", t, art_map(raw), ["4", "9"], cap=260)
