# -*- coding: utf-8 -*-
# 一次性核验脚本：从全国法规数据库抓取关键条文，输出 doc/legal-reference.md 的核验底稿。
# 用法: python scripts/fetch-tw-laws.py scripts/_law-raw.md
import re
import html
import sys
import urllib.request

LAWS = {
    "I0050021": ("个人资料保护法", [2, 3, 6, 8, 15, 19, 20, 21, 22, 25, 27, 29, 41]),
    "C0000001": ("刑法", [235, 339, 339.4, 310, 358, 359, 360, 361, 362, 363]),
    "B0000001": ("民法", [184, 195, 247.1]),
    "J0170001": ("消费者保护法", [11.1, 17]),
    "D0050001": ("儿童及少年福利与权益保障法", [43, 46]),
    "I0020003": ("儿童及少年性剥削防制条例", [2, 28]),
    "J0080002": ("电子签章法", [4, 9]),
}
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}


def fetch_law(pcode):
    url = "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=" + pcode
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")


def clean(raw):
    raw = re.sub(r"<script.*?</script>", "", raw, flags=re.S)
    raw = re.sub(r"<style.*?</style>", "", raw, flags=re.S)
    txt = re.sub(r"<[^>]+>", " ", raw)
    txt = html.unescape(txt)
    return re.sub(r"\s+", " ", txt)


def article(txt, n):
    key = str(n).replace(".", "-")
    m = re.search(r"第\s*" + re.escape(key) + r"\s*条(.{0,700}?)(?=第\s*\d+[-‐–-]?\d*\s*条|法規名稱|瀏覽人次|$)", txt)
    return m.group(1) if m else None


def main():
    out = []
    for pcode, (name, arts) in LAWS.items():
        try:
            txt = clean(fetch_law(pcode))
        except Exception as e:
            out.append("【%s】抓取失败: %s" % (name, e))
            continue
        out.append("\n===== %s (pcode=%s) =====" % (name, pcode))
        for n in arts:
            seg = article(txt, n)
            out.append((("第%s条：%s" % (n, seg)) if seg else "第%s条：未找到" % n).strip()[:900])
    open(sys.argv[1], "w", encoding="utf-8").write("\n\n".join(out))
    print("done", len(out))


if __name__ == "__main__":
    main()
