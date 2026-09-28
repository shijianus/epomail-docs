# -*- coding: utf-8 -*-
"""抽取 law.moj.gov.tw LawAll 页的指定条文 → doc/_law-raw.md。

实测页面结构（law.moj.gov.tw/LawClass/LawAll.aspx）：
  <div class="col-no"> <a href="LawSingle.aspx?pcode=I0050021&flno=1" name="1">第 1 條</a></div>
  <div class="col-data"><div class="law-article"> ... </div></div>

用法: python scripts/extract-tw-articles.py tmp_laws doc/_law-raw.md
"""
import html
import os
import re
import sys

LAWS = {
    "I0050021": ("个人资料保护法", ["1-1", "2", "3", "6", "8", "9", "19", "20", "20-1", "21", "22", "25", "27", "29", "41"]),
    "I0050022": ("个人资料保护法施行细则", ["12"]),
    "C0000001": ("刑法", ["235", "339", "358", "359", "360", "361", "362", "363"]),
    "B0000001": ("民法", ["184", "195", "247-1"]),
    "J0170001": ("消费者保护法", ["11-1", "17"]),
    "D0050001": ("儿童及少年福利与权益保障法", ["43", "46"]),
    "D0050023": ("儿童及少年性剥削防制条例", ["2", "36", "38", "39"]),
    "J0080037": ("电子签章法", ["4", "9"]),
}

ROW = re.compile(
    r'<div class="col-no">\s*<a href="LawSingle\.aspx\?pcode=[^"]*&flno=([0-9\-]+)"[^>]*>\s*第\s*([0-9\-]+)\s*條\s*</a>\s*</div>\s*<div class="col-data">(.*?)(?=<div class="col-no">|$)',
    re.S,
)


def page_articles(path):
    """返回 (法规标题, {条号: 条文纯文本})"""
    raw = open(path, encoding="utf-8", errors="ignore").read()
    tm = re.search(r"<title>\s*(.+?)\s*[-－]\s*全國法規資料庫", raw, re.S)
    title = tm.group(1).strip() if tm else "?"
    arts = {}
    for flno, num, body in ROW.findall(raw):
        text = re.sub(r"<[^>]+>", " ", body)
        text = html.unescape(text)
        text = re.sub(r"\s+", " ", text).strip()
        if num not in arts or len(text) > len(arts[num]):
            arts[num] = text
    return title, arts


def main(src_dir, out_path):
    lines = [
        "# 台湾法规条文核验底稿",
        "",
        "> 摘录自全国法规数据库（law.moj.gov.tw）现行公布版本，抓取于 2026-09-28；",
        "> 缓存于 tmp_laws/（已 gitignore，不入库）。复现：`python scripts/extract-tw-articles.py tmp_laws doc/_law-raw.md`。",
        "> 完整条文以数据库现行版本为准；写作只可引用本底稿已核验之条号。",
        "",
    ]
    ok = 0
    for pcode, (name, nums) in LAWS.items():
        path = os.path.join(src_dir, pcode + ".html")
        if not os.path.exists(path) or os.path.getsize(path) < 5000:
            lines.append("## %s（%s）\n\n未抓取（pcode 非目标法规）。\n" % (name, pcode))
            continue
        title, arts = page_articles(path)
        ok += 1
        lines.append("## %s（%s）\n" % (title, pcode))
        for n in nums:
            body = arts.get(n)
            lines.append("- **第 %s 条**：%s" % (n, body[:900] if body else "⚠ 该页未含此条"))
        lines.append("")
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print("written %s | parsed %d/%d pages" % (out_path, ok, len(LAWS)))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("usage: python scripts/extract-tw-articles.py <src_dir> <out_md>")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
