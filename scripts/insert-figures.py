# -*- coding: utf-8 -*-
"""向各语言文档插入示意图引用（若缺失）。

仅处理 4 篇在代理翻译时源文件尚无图片的文档：
privacy-policy / terms-of-service / acceptable-use / sub-processors。
插入位置：H1 后第一个粗体日期行之下一行。

用法: python scripts/insert-figures.py [locale]   # locale 缺省处理 zh-tw + 根目录幂等跳过
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "src", "content", "docs")

FIGS = {
    "privacy-policy.md": ("privacy-pillars.svg", "圖：本政策之五項制度支柱及其法條錨點。",
        "EpoCanvas Mail 隱私權政策五支柱：以《個人資料保護法》第 8 條告知義務為頂樑，蒐集（第 19 條）、利用（第 20 條）、傳輸（第 21 條）、安全（第 20-1 條及施行細則第 12 條）、當事人權利（第 3 條）五根支柱立於行政監督（第 1-1、22、25、29 條）基座之上"),
    "terms-of-service.md": ("legal-architecture.svg", "圖：本條款與各政策文件及準據法之架構關係。",
        "EpoCanvas Mail 法律文件架構：服務條款為契約層（電子同意依電子簽章法第 4 條、審閱期依消費者保護法第 11-1 條），其下為隱私權政策、可接受使用政策與資料安全及第三方清單三個政策層，基座為中華民國法律管轄（臺灣臺北地方法院）與定型化契約規制（民法第 247-1 條、消保法第 17 條）"),
    "acceptable-use.md": ("aup-ladder.svg", "圖：違規處置之比例原則階梯與兒少保護零容忍通道。",
        "EpoCanvas Mail 執行階梯：警告、限流、隔離、暫停、實體刪除五級遞進，配申訴與檢舉回路；兒少性剝削內容適用零容忍通道，逕行刪除並依法處理"),
    "sub-processors.md": ("subprocessor-map.svg", "圖：個人資料離開實例之四類通道及其觸發條件。",
        "EpoCanvas Mail 第三方共享地圖：以實例為中心，分受託處理者（Cloudflare、Resend/Mailjet）、經當事人授權（Telegram、OAuth 應用、Linux DO）、當事人觸發之 AI（模型端點、Workers AI、MyMemory）與依法提供（有權機關）四類，共享原則為最小必要"),
}

DATE_LINE = re.compile(r"^\*\*[^*]*(?:版本|Version|Versie|Versión|Version :)[^*]*\*\*[ \t]*$", re.M)
CAPTION_FIX = re.compile(r"(\*圖：[^*\n]*\*)\n(?!\n)")


def process(path, fname):
    svg, caption, alt = FIGS[fname]
    text = open(path, encoding="utf-8").read()
    # 修复此前插入时图注与正文粘连的问题
    text = CAPTION_FIX.sub(r"\1\n\n", text)
    if svg in text:
        open(path, "w", encoding="utf-8", newline="\n").write(text)
        return "ok (figure present, caption spacing normalized)"
    m = DATE_LINE.search(text)
    if not m:
        open(path, "w", encoding="utf-8", newline="\n").write(text)
        return "WARN: date line not found"
    block = "\n\n![%s](/images/mail/%s)\n\n*%s*\n" % (alt, svg, caption)
    end = m.end()
    out = text[:end] + block + text[end:]
    open(path, "w", encoding="utf-8", newline="\n").write(out)
    return "inserted %s" % svg


def main(locales):
    for loc in locales:
        d = os.path.join(DOCS, loc, "mail")
        if not os.path.isdir(d):
            print("%s: dir missing" % loc)
            continue
        for fname in FIGS:
            p = os.path.join(d, fname)
            if not os.path.exists(p):
                print("%s/%s: missing file" % (loc, fname))
                continue
            print("%s/%s: %s" % (loc, fname, process(p, fname)))


if __name__ == "__main__":
    main(sys.argv[1:] or ["zh-tw"])
