# -*- coding: utf-8 -*-
"""Scan all content pages for cited article numbers and flag any outside the verified whitelist (doc/legal-reference.md)."""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "src" / "content" / "docs"

WHITELIST = {
    "PDPA": {"1-1", "2", "3", "5", "6", "8", "9", "19", "20", "20-1", "21", "22", "25", "28", "29", "41"},
    "RULES": {"12"},
    "CRIM": {"184", "195", "235", "247-1", "319-1", "319-2", "319-3", "319-4", "339", "339-4",
             "358", "359", "360", "361", "362", "363"},
    "CIVIL": {"184", "195", "247-1"},
    "CONS": {"11-1", "17"},
    "CHILD": {"2", "13", "36", "38", "39", "43", "46"},
    "FRAUD": {"1", "30", "32", "33", "37", "43"},
    "ESIGN": {"4", "9"},
}
ALLOWED = set().union(*WHITELIST.values())

# patterns: zh 第 N 條/条 ; en Article N ; es artículo N ; fr article N ; nl artikel N
PAT = re.compile(r"第\s*([0-9]+(?:-[0-9]+)?)\s*[条條]|(?:Article|article|artículo|artikel)\s+([0-9]+(?:-[0-9]+)?)", re.I)

bad = []
total = 0
for p in sorted(ROOT.rglob("*.md")):
    rel = p.relative_to(ROOT).as_posix()
    text = p.read_text(encoding="utf-8")
    for m in PAT.finditer(text):
        num = m.group(1) or m.group(2)
        total += 1
        if num not in ALLOWED:
            ctx = text[max(0, m.start()-40):m.end()+40].replace("\n", " ")
            bad.append((rel, num, ctx))

print("total citations scanned:", total)
if bad:
    print("ILLEGAL CITATIONS (%d):" % len(bad))
    for rel, num, ctx in bad:
        print("  [%s] 第%s條 :: ...%s..." % (rel, num, ctx))
    sys.exit(1)
print("OK: all cited articles are in the verified whitelist")
