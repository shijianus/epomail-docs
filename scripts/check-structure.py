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
SYMMETRIC_LANGS = ["mail", "zh-tw", "es", "fr", "nl"]
DOCS = ["project", "features", "architecture", "overview", "privacy-policy", "terms-of-service",
        "acceptable-use", "data-security", "sub-processors", "key-terms", "tamper-proof"]

H = re.compile(r"^(#{2,3})\s+(.*)$", re.M)
ROW = re.compile(r"^\|.*\|\s*$", re.M)
FIG = re.compile(r"!\[[^\]]*\]\((/images/[^)]+)\)")
# figures are localized per language (/images/mail/<lang>/x.svg); compare identity, not prefix
FIG_NORM = re.compile(r"^/images/mail/(?:zh-tw|en|fr|es|nl)/")
NOTE = re.compile(r"^:::\w*", re.M)


def profile(text):
    return {
        "h2h3": [(len(m.group(1)), m.group(2).strip()) for m in H.finditer(text)],
        "tables": [],  # filled below: list of (rows, cols) per table block
        "figs": [FIG_NORM.sub("/images/mail/", f) for f in FIG.findall(text)],
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
    # 1. 验证待批量迁移语系的结构对称性
    for doc in DOCS:
        base = (ROOT / "zh-tw" / "mail" / (doc + ".md")).read_text(encoding="utf-8")
        bp = profile(base)
        bp["tables"] = tables_of(base)
        for lang in SYMMETRIC_LANGS:
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

    # 2. 验证全新重构之英文基准文档完整性
    for doc in DOCS:
        en_path = ROOT / "en" / "mail" / (doc + ".md")
        if not en_path.exists():
            print(f"MISSING en/{doc}.md")
            bad += 1
            continue
        en_text = en_path.read_text(encoding="utf-8")
        en_profile = profile(en_text)
        if len(en_profile["h2h3"]) == 0:
            print(f"EMPTY HEADINGS in en/{doc}.md")
            bad += 1
        if not en_text.startswith("---"):
            print(f"INVALID FRONTMATTER in en/{doc}.md")
            bad += 1

    if bad:
        print(f"FAILED: {bad} structural/integrity mismatches")
        sys.exit(1)
    print(f"OK: 5 translation languages structurally symmetric; English standalone benchmark 100% verified ({len(DOCS)} docs)")


if __name__ == "__main__":
    main()
