# -*- coding: utf-8 -*-
"""核验台湾法条原文 → doc/_law-raw.md

解析 law.moj.gov.tw LawAll 页的 col-no / law-article 结构，
抽取指定条号的现行条文要点，生成 doc/_law-raw.md 核验底稿。

用法: python scripts/parse-tw-laws.py tmp_laws doc/_law-raw.md
"""
import html
import os
import re
import sys

LAWS = {
    "I0050021": ("个人资料保护法", ["1-1", "2", "3", "6", "8", "9", "19", "20", "20-1", "21", "22", "25", "28", "29", "41"]),
    "I0050022": ("个人资料保护法施行细则", ["12"]),
    "C0000001": ("刑法", ["235", "339", "358", "359", "360", "361", "362", "363"]),
    "B0000001": ("民法", ["184", "195", "247-1"]),
    "J0170001": ("消费者保护法", ["11-1", "17"]),
    "D0050001": ("儿童及少年福利与权益保障法", ["43", "46"]),
    "D0050023": ("儿童及少年性剥削防制条例", ["2", "36", "38", "39"]),
    "I0050031": ("诈欺犯罪危害防制条例", ["2", "13"]),
}

ROW = re.compile(
    r'<div class="col-no">\s*<a href="LawSingle\.aspx\?pcode=[^"]*&flno=([^"]+)"[^>]*>\s*第\s*([0-9\-]+)\s*條\s*</a>'
    r'</div>\s*<div class="col-data">(.*?)(?=<div class="col-no">|$)',
    re.S,
)


def extract(path):
    raw = open(path, encoding="utf-8", errors="ignore").read()
    m = re.search(r"<title>\s*(.+?)-全國法規資料庫", raw, re.S)
    title = m.group(1).strip() if m else "?"
    arts = {}
    for flno, num, body in ROW.findall(raw):
        body = re.sub(r"<[^>]+>", " ", body)
        body = html.unescape(body)
        body = re.sub(r"\s+", " ", body).strip()
        arts.setdefault(num, body)
    return title, arts


def main(src, dst):
    out = ["# 台湾法规原文核验底稿", "",
           "> 抓取自全国法规数据库（law.moj.gov.tw）现行版本；抓取日期见脚本运行时间。",
           "> 解析脚本：scripts/parse-tw-laws.py；原始页面缓存 tmp_laws/（不入库）。", ""]
    pages = 0
    for pcode, (name, nums) in LAWS.items():
        path = os.path.join(src, pcode + ".html")
        if not os.path.exists(path) or os.path.getsize(path) < 5000:
            out.append("## %s（%s）\n\n未抓取（pcode 非目标法规或请求失败）。\n" % (name, pcode))
            continue
        pages += 1
        title, arts = extract(path)
        out.append("## %s（%s）\n" % (title, pcode))
        for n in nums:
            body = arts.get(n)
            out.append("- **第 %s 条**：%s" % (n, (body[:900] if body else "⚠ 该页未含此条（pcode 可能非目标法规）")))
        out.append("")
    with open(dst, "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))
    print("written:", dst, "| pages:", pages)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
