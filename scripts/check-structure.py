# -*- coding: utf-8 -*-
"""Structural symmetry check: every language's 8 docs (project intro + 7 legal docs)
must mirror the formal Traditional Chinese (zh-tw) version 1:1 — headings, table
row/column counts, figures, note-block markers, and figure paths. Exit 1 on any mismatch.

Usage: python scripts/check-structure.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src" / "content" / "docs"
LANGS = ["mail", "zh-tw", "en", "es", "fr", "nl"]
DOCS = ["project", "overview", "privacy-policy", "terms-of-service", "acceptable-use",
        "data-security", "sub-processors", "key-terms"]

H = re.compile(r"^(#{2,3})\s+(.*)$", re.M)
ROW = re.compile(r"^\|.*\|\s*$", re.M)
FIG = re.compile(r"!\[[^\]]*\]\((/images/[^)]+)\)")
NOTE = re.compile(r"^:::\w*", re.M)


def profile(text):
    return {
        "h2h3": [(len(m.group(1)), m.group(2).strip()) for m in H.finditer(text)],
        "tables": [],  # filled below: list of (rows, cols) per table block
        "figs": FIG.findall(text),
        "notes": len(NOTE.findall(text)),
    }


def tables_of(text):
    out = []
    for block in re.split(r"\n\s*\n", text):
        lines = [ln for ln in block.splitlines() if ln.strip().startswith("|")]
        if len(lines) >= 2:
            cols = lines[0].count("|") - 1
            rows = len(lines) - 2  # minus header and separator
            out.append((rows, cols))
    return out


def main():
    bad = 0
    for doc in DOCS:
        base = (ROOT / "zh-tw" / "mail" / (doc + ".md")).read_text(encoding="utf-8")
        bp = profile(base)
        bp["tables"] = tables_of(base)
        for lang in LANGS:
            if lang == "zh-tw":
                continue
            sub = "mail" if lang == "mail" else f"{lang}/mail"
            text = (ROOT / sub / (doc + ".md")).read_text(encoding="utf-8")
            p = profile(text)
            p["tables"] = tables_of(text)
            if len(p["h2h3"]) != len(bp["h2h3"]):
                print(f"MISMATCH {lang}/{doc}: headings {len(p['h2h3'])} != zh-tw {len(bp['h2h3'])}")
                bad += 1
            if p["tables"] != bp["tables"]:
                print(f"MISMATCH {lang}/{doc}: tables {p['tables']} != zh-tw {bp['tables']}")
                bad += 1
            if p["figs"] != bp["figs"]:
                print(f"MISMATCH {lang}/{doc}: figures {p['figs']} != zh-tw {bp['figs']}")
                bad += 1
            if p["notes"] != bp["notes"]:
                print(f"MISMATCH {lang}/{doc}: note blocks {p['notes']} != zh-tw {bp['notes']}")
                bad += 1
    if bad:
        print(f"FAILED: {bad} structural mismatches")
        sys.exit(1)
    print("OK: 6 languages x 8 docs structurally symmetric (headings/tables/figures/notes)")


if __name__ == "__main__":
    main()
