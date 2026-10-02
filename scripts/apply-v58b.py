#!/usr/bin/env python3
"""v5.8b: remove redundant body H1 headings.

Starlight already renders the frontmatter title as the page's single <h1>
(id="_top"); every body H1 produced a duplicated page heading (pre-existing
on 7 docs, briefly replicated on data-security/project by apply-v58).
Remove the body H1 line from all 9 docs x 6 languages for a uniform single-h1
layout. Idempotent.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "src" / "content" / "docs"
LANGS = ["mail", "zh-tw", "en", "fr", "es", "nl"]
ALL_DOCS = ["overview", "project", "privacy-policy", "terms-of-service",
            "acceptable-use", "data-security", "sub-processors", "key-terms",
            "tamper-proof"]
VER_MARK = {"mail": "生效日期", "zh-tw": "生效日期",
            "en": "Effective Date", "fr": "Date d'entrée en vigueur",
            "es": "Fecha de entrada en vigor", "nl": "Datum van inwerkingtreding"}

errors = []
for lang in LANGS:
    for name in ALL_DOCS:
        base = DOCS if lang == "mail" else DOCS / lang
        p = base / "mail" / f"{name}.md"
        lines = p.read_text(encoding="utf-8").split("\n")
        # locate version line and the first body H1 above it
        ver_idx = next((i for i, l in enumerate(lines) if VER_MARK[lang] in l and "5.8" in l), None)
        if ver_idx is None:
            errors.append(f"{p.relative_to(ROOT)}: version line not found")
            continue
        h1_idx = next((i for i, l in enumerate(lines[:ver_idx]) if l.startswith("# ")), None)
        if h1_idx is None:
            continue  # already removed
        del lines[h1_idx]
        # collapse the leftover double blank into a single blank line
        if h1_idx > 0 and lines[h1_idx - 1] == "" and lines[h1_idx] == "":
            del lines[h1_idx]
        p.write_text("\n".join(lines), encoding="utf-8", newline="")

if errors:
    print("FAILED:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("apply-v58b: body H1 headings removed (single frontmatter h1 per page).")
