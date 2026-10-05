# -*- coding: utf-8 -*-
"""v5.13 专案介绍双线扩充轮：既有页与新页互链 ×6 语言 + 全站版本号 5.12→5.13。

新增 6 页（interface/search/deployment/development/service-scope/open-source）已在
本轮先行创建；本脚本负责既有 5 页（overview/features/project/modes/settings）的
段落插入与相关文档表扩行，全部替换为锚定插入，任一断言失败立即中止。
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src" / "content" / "docs"

# 每语言：子目录、新页显示名、overview 第 4 节标题、features 第 55 行句尾、
# 各页相关文档标题、project 第 3/9 节标题
L = {
    "zh": {
        "sub": "mail",
        "names": {
            "interface": "界面与路由总览", "search": "搜索与规则参考",
            "deployment": "部署指南", "development": "开发指南",
            "service": "服务范围与支持", "opensource": "开源与自行部署法律",
        },
        "ov_h4": "## 4. 效力顺序",
        "feat_hl": "搜索命中基于 CSS Highlights API 高亮；全站检索与页内查找两级并存。",
        "rel": {"features": "## 11. 相关文档", "project": "## 10. 相关文档",
                "modes": "## 7. 相关文档", "settings": "## 8. 相关文档"},
        "pj_h3": "## 3. 技术架构概览",
        "pj_h9": "## 9. 常见疑问",
    },
    "zh-tw": {
        "sub": "zh-tw/mail",
        "names": {
            "interface": "介面與路由總覽", "search": "搜尋與規則參考",
            "deployment": "部署指南", "development": "開發指南",
            "service": "服務範圍與支援", "opensource": "開源與自行部署法律",
        },
        "ov_h4": "## 4. 效力順序",
        "feat_hl": "搜尋命中基於 CSS Highlights API 高亮；全站檢索與頁內尋找兩級並存。",
        "rel": {"features": "## 11. 相關文件", "project": "## 10. 相關文件",
                "modes": "## 7. 相關文件", "settings": "## 8. 相關文件"},
        "pj_h3": "## 3. 技術架構概覽",
        "pj_h9": "## 9. 常見疑問",
    },
    "en": {
        "sub": "en/mail",
        "names": {
            "interface": "Interface & Route Map", "search": "Search & Rules Reference",
            "deployment": "Deployment Guide", "development": "Development Guide",
            "service": "Service Scope & Support", "opensource": "Open-Source & Self-Hosting Legal",
        },
        "ov_h4": "## 4. Order of Precedence",
        "feat_hl": "Hits are highlighted through the CSS Highlights API; site-wide search and in-page find coexist at two levels.",
        "rel": {"features": "## 11. Related Documents", "project": "## 10. Related Documents",
                "modes": "## 7. Related documents", "settings": "## 8. Related documents"},
        "pj_h3": "## 3. Architecture Overview",
        "pj_h9": "## 9. FAQ",
    },
    "es": {
        "sub": "es/mail",
        "names": {
            "interface": "Mapa de interfaz y rutas", "search": "Referencia de búsqueda y reglas",
            "deployment": "Guía de despliegue", "development": "Guía de desarrollo",
            "service": "Alcance del servicio y soporte", "opensource": "Marco legal del código abierto y el autoalojamiento",
        },
        "ov_h4": "## 4. Orden de prelación",
        "feat_hl": "El resaltado de las coincidencias se basa en la CSS Highlights API; la búsqueda en todo el sitio y la búsqueda en la página coexisten en dos niveles.",
        "rel": {"features": "## 11. Documentos relacionados", "project": "## 10. Documentos relacionados",
                "modes": "## 7. Documentos relacionados", "settings": "## 8. Documentos relacionados"},
        "pj_h3": "## 3. Resumen de la arquitectura",
        "pj_h9": "## 9. Preguntas frecuentes",
    },
    "fr": {
        "sub": "fr/mail",
        "names": {
            "interface": "Interface et plan des routes", "search": "Référence de la recherche et des règles",
            "deployment": "Guide de déploiement", "development": "Guide de développement",
            "service": "Périmètre du service et assistance", "opensource": "Open source et cadre juridique de l'auto-hébergement",
        },
        "ov_h4": "## 4. Ordre de priorité",
        "feat_hl": "Le surlignage des correspondances repose sur la CSS Highlights API ; la recherche sur tout le site et la recherche dans la page coexistent sur deux niveaux.",
        "rel": {"features": "## 11. Documents associés", "project": "## 10. Documents associés",
                "modes": "## 7. Documents associés", "settings": "## 8. Documents associés"},
        "pj_h3": "## 3. Aperçu de l'architecture",
        "pj_h9": "## 9. Questions fréquentes",
    },
    "nl": {
        "sub": "nl/mail",
        "names": {
            "interface": "Interface en routekaart", "search": "Zoek- en regelreferentie",
            "deployment": "Uitrolgids", "development": "Ontwikkelgids",
            "service": "Dienstomvang en ondersteuning", "opensource": "Open source en zelfhosting: juridisch kader",
        },
        "ov_h4": "## 4. Rangorde",
        "feat_hl": "De markering van treffers is gebaseerd op de CSS Highlights API; zoeken op de hele site en zoeken op de pagina bestaan naast elkaar op twee niveaus.",
        "rel": {"features": "## 11. Gerelateerde documenten", "project": "## 10. Gerelateerde documenten",
                "modes": "## 7. Gerelateerde documenten", "settings": "## 8. Gerelateerde documenten"},
        "pj_h3": "## 3. Architectuuroverzicht",
        "pj_h9": "## 9. Veelgestelde vragen",
    },
}

# 各语言段落文本（插入用）
PARAS = {
    "zh": {
        "overview": "本站文档按两条互补的阅读路线组织：希望了解专案、准备自行部署或学习使用的读者，可自[专案介绍](/mail/project/)进入，经[界面与路由总览](/mail/interface/)、[搜索与规则参考](/mail/search/)、[部署指南](/mail/deployment/)与[开发指南](/mail/development/)逐层深入；希望了解服务范围与隐私法律约定的读者，可自本页进入下列法律文档。两条路线于[功能指南](/mail/features/)与[运行模式](/mail/modes/)处交汇。",
        "feat_add": "全部字段算子、旗标与规则条件的完整参考见[搜索与规则参考](/mail/search/)。",
        "project2": "专案的界面骨架与全部路由逐项导览于[界面与路由总览](/mail/interface/)；搜索算子与分类规则引擎的完整参考见[搜索与规则参考](/mail/search/)。",
        "project8": "自行部署的完整前置条件、初始化引导链与密钥注入见[部署指南](/mail/deployment/)；参与开发、审计与贡献的流程见[开发指南](/mail/development/)。",
    },
    "zh-tw": {
        "overview": "本站文件按兩條互補的閱讀路線組織：希望了解專案、準備自行部署或學習使用的讀者，可自[專案介紹](/zh-tw/mail/project/)進入，經[介面與路由總覽](/zh-tw/mail/interface/)、[搜尋與規則參考](/zh-tw/mail/search/)、[部署指南](/zh-tw/mail/deployment/)與[開發指南](/zh-tw/mail/development/)逐層深入；希望了解服務範圍與隱私法律約定的讀者，可自本頁進入下列法律文件。兩條路線於[功能指南](/zh-tw/mail/features/)與[運行模式](/zh-tw/mail/modes/)處交匯。",
        "feat_add": "全部欄位算子、旗標與規則條件的完整參考見[搜尋與規則參考](/zh-tw/mail/search/)。",
        "project2": "專案的介面骨架與全部路由逐項導覽於[介面與路由總覽](/zh-tw/mail/interface/)；搜尋算子與分類規則引擎的完整參考見[搜尋與規則參考](/zh-tw/mail/search/)。",
        "project8": "自行部署的完整前置條件、初始化引導鏈與密鑰注入見[部署指南](/zh-tw/mail/deployment/)；參與開發、稽核與貢獻的流程見[開發指南](/zh-tw/mail/development/)。",
    },
    "en": {
        "overview": "This site is organised along two complementary reading routes: readers who want to learn about the project, prepare a self-deployment or study its use can start from the [Project Overview](/en/mail/project/) and go deeper through the [Interface & Route Map](/en/mail/interface/), the [Search & Rules Reference](/en/mail/search/), the [Deployment Guide](/en/mail/deployment/) and the [Development Guide](/en/mail/development/); readers who want the scope of the service and its privacy and legal covenants can reach the legal documents below from this page. The two routes meet at the [Features Guide](/en/mail/features/) and [Operating Modes](/en/mail/modes/).",
        "feat_add": "The complete reference of every field operator, flag and rule condition appears in the [Search & Rules Reference](/en/mail/search/).",
        "project2": "Every interface and route is toured in the [Interface & Route Map](/en/mail/interface/); the complete reference of search operators and the classification rule engine appears in the [Search & Rules Reference](/en/mail/search/).",
        "project8": "The full prerequisites, the initialisation bootstrap chain and secret injection for self-deployment appear in the [Deployment Guide](/en/mail/deployment/); contributing, auditing and development follow the [Development Guide](/en/mail/development/).",
    },
    "es": {
        "overview": "Este sitio se organiza en dos rutas de lectura complementarias: quien quiera conocer el proyecto, prepararse para autoalojarlo o aprender a usarlo puede empezar por la [Presentación del proyecto](/es/mail/project/) y profundizar con el [Mapa de interfaz y rutas](/es/mail/interface/), la [Referencia de búsqueda y reglas](/es/mail/search/), la [Guía de despliegue](/es/mail/deployment/) y la [Guía de desarrollo](/es/mail/development/); quien quiera conocer el alcance del servicio y sus pactos de privacidad y legales puede llegar a los documentos jurídicos siguientes desde esta página. Ambas rutas se cruzan en la [Guía de funciones](/es/mail/features/) y los [Modos de funcionamiento](/es/mail/modes/).",
        "feat_add": "La referencia completa de todos los operadores de campo, indicadores y condiciones de reglas está en la [Referencia de búsqueda y reglas](/es/mail/search/).",
        "project2": "Cada interfaz y ruta se recorre en el [Mapa de interfaz y rutas](/es/mail/interface/); la referencia completa de los operadores de búsqueda y del motor de reglas de clasificación está en la [Referencia de búsqueda y reglas](/es/mail/search/).",
        "project8": "Los requisitos previos completos, la cadena de arranque de la inicialización y la inyección de secretos para el autoalojamiento están en la [Guía de despliegue](/es/mail/deployment/); contribuir, auditar y desarrollar siguen la [Guía de desarrollo](/es/mail/development/).",
    },
    "fr": {
        "overview": "Ce site s'organise en deux parcours de lecture complémentaires : le lecteur qui veut découvrir le projet, préparer un auto-hébergement ou apprendre à l'utiliser part de la [Présentation du projet](/fr/mail/project/) et approfondit avec l'[Interface et plan des routes](/fr/mail/interface/), la [Référence de la recherche et des règles](/fr/mail/search/), le [Guide de déploiement](/fr/mail/deployment/) et le [Guide de développement](/fr/mail/development/) ; le lecteur qui veut connaître le périmètre du service et ses pactes de confidentialité et juridiques rejoint les documents légaux ci-dessous depuis cette page. Les deux parcours se croisent au [Guide des fonctions](/fr/mail/features/) et aux [Modes de fonctionnement](/fr/mail/modes/).",
        "feat_add": "La référence complète de tous les opérateurs de champ, drapeaux et conditions de règles figure dans la [Référence de la recherche et des règles](/fr/mail/search/).",
        "project2": "Chaque interface et route est parcourue dans l'[Interface et plan des routes](/fr/mail/interface/) ; la référence complète des opérateurs de recherche et du moteur de règles de classement figure dans la [Référence de la recherche et des règles](/fr/mail/search/).",
        "project8": "Les prérequis complets, la chaîne d'amorçage d'initialisation et l'injection des secrets pour l'auto-hébergement figurent dans le [Guide de déploiement](/fr/mail/deployment/) ; la contribution, l'audit et le développement suivent le [Guide de développement](/fr/mail/development/).",
    },
    "nl": {
        "overview": "Deze site is opgezet rond twee complementaire leesroutes: wie het project wil leren kennen, zichzelf wil gaan hosten of het gebruik wil studeren, begint bij het [Projectoverzicht](/nl/mail/project/) en gaat dieper via de [Interface en routekaart](/nl/mail/interface/), de [Zoek- en regelreferentie](/nl/mail/search/), de [Uitrolgids](/nl/mail/deployment/) en de [Ontwikkelgids](/nl/mail/development/); wie de dienstomvang en de privacy- en juridische afspraken wil kennen, bereikt vanuit deze pagina de juridische documenten hieronder. Beide routes kruisen elkaar in de [Functiegids](/nl/mail/features/) en de [Werkingsmodi](/nl/mail/modes/).",
        "feat_add": "De volledige referentie van elke veldoperator, vlag en regelvoorwaarde staat in de [Zoek- en regelreferentie](/nl/mail/search/).",
        "project2": "Elke interface en route wordt doorlopen in de [Interface en routekaart](/nl/mail/interface/); de volledige referentie van zoekoperators en de classificatieregelengine staat in de [Zoek- en regelreferentie](/nl/mail/search/).",
        "project8": "De volledige randvoorwaarden, de initialisatieketen en de sleutelinjectie voor zelfhosting staan in de [Uitrolgids](/nl/mail/deployment/); bijdragen, auditen en ontwikkelen volgen de [Ontwikkelgids](/nl/mail/development/).",
    },
}

# 相关文档表新增行（第一列描述 + 第二列链接）
REL_ROWS = {
    "features": [("搜索算子、管理端检索与规则条件", "search"),
                 ("界面路由与设置分区位置", "interface")],
    "project": [("每一界面的路由与元素", "interface"),
                ("搜索算子与分类规则条件", "search"),
                ("自行部署的完整步骤", "deployment"),
                ("开发环境与工程流程", "development"),
                ("托管实例的服务内容与支持渠道", "service"),
                ("开源授权与自部署法律地位", "opensource")],
    "modes": [("自行部署的完整步骤", "deployment"),
              ("托管实例的服务边界与支持渠道", "service")],
    "settings": [("每一界面的路由与元素", "interface"),
                 ("搜索算子与分类规则条件", "search")],
}

REL_DESC = {
    "zh": {"搜索算子、管理端检索与规则条件": 1, "界面路由与设置分区位置": 1,
           "每一界面的路由与元素": 1, "搜索算子与分类规则条件": 1,
           "自行部署的完整步骤": 1, "开发环境与工程流程": 1,
           "托管实例的服务内容与支持渠道": 1, "开源授权与自部署法律地位": 1,
           "托管实例的服务边界与支持渠道": 1},
}

# 各语言相关文档表行文本（第一列）
REL_ROW_TEXT = {
    "zh": {"search": "搜索算子、管理端检索与规则条件", "interface": "界面路由与设置分区位置",
           "deployment": "自行部署的完整步骤", "development": "开发环境与工程流程",
           "service_c": "托管实例的服务内容与支持渠道", "service_b": "托管实例的服务边界与支持渠道",
           "opensource": "开源授权与自部署法律地位"},
}

failures = []


def sub_path(lang, doc):
    return ROOT / L[lang]["sub"] / (doc + ".md")


def insert_before(text, anchor, addition, label):
    n = text.count(anchor)
    if n != 1:
        failures.append(f"{label}: 锚点命中 {n} 次（预期 1）：{anchor[:50]!r}")
        return text
    return text.replace(anchor, addition + anchor)


def insert_rel_rows(text, heading, rows, label):
    # 定位相关文档标题之后的表头分隔行，在其后插入新行
    idx = text.find(heading)
    if idx < 0:
        failures.append(f"{label}: 未找到相关文档标题 {heading!r}")
        return text
    sep = "\n| --- | --- |\n"
    sep_idx = text.find(sep, idx)
    if sep_idx < 0 or sep_idx - idx > 600:
        failures.append(f"{label}: 未在相关文档标题附近找到表格分隔行")
        return text
    pos = sep_idx + len(sep)
    return text[:pos] + rows + text[pos:]


def main():
    for lang, cfg in L.items():
        sub = cfg["sub"]
        names = cfg["names"]
        pre = f"/{sub.split('/')[0]}/mail" if "/" in sub else "/mail"

        def link(slug_key):
            slug = {"interface": "interface", "search": "search", "deployment": "deployment",
                    "development": "development", "service": "service-scope",
                    "opensource": "open-source"}[slug_key]
            return f"[{names[slug_key]}]({pre}/{slug}/)"

        # 1. overview：两条阅读路线段落
        p = sub_path(lang, "overview")
        t = p.read_text(encoding="utf-8")
        t = insert_before(t, "\n" + cfg["ov_h4"], "\n" + PARAS[lang]["overview"], f"{lang}/overview")
        p.write_text(t, encoding="utf-8")

        # 2. features：第 3 节句尾追加 + 相关文档 +2 行
        p = sub_path(lang, "features")
        t = p.read_text(encoding="utf-8")
        old = cfg["feat_hl"]
        if t.count(old) != 1:
            failures.append(f"{lang}/features: Highlights 句命中 {t.count(old)} 次")
        else:
            t = t.replace(old, old + PARAS[lang]["feat_add"])
        add = ""
        for key, slug in (("search", "search"), ("interface", "interface")):
            desc = {"search": {"zh": "搜索算子、管理端检索与规则条件", "zh-tw": "搜尋算子、管理端檢索與規則條件",
                               "en": "Search operators, admin search and rule conditions",
                               "es": "Operadores de búsqueda, búsqueda de administración y condiciones de reglas",
                               "fr": "Opérateurs de recherche, recherche d'administration et conditions de règles",
                               "nl": "Zoekoperators, beheerderszoek en regelvoorwaarden"},
                    "interface": {"zh": "界面路由与设置分区位置", "zh-tw": "介面路由與設定分區位置",
                                  "en": "Interface routes and where the settings sections live",
                                  "es": "Rutas de interfaz y ubicación de las secciones de configuración",
                                  "fr": "Routes d'interface et emplacement des sections de paramétrage",
                                  "nl": "Interfaceroutes en locatie van de instellingensecties"}}[key][lang]
            add += f"| {desc} | {link(slug)} |\n"
        t = insert_rel_rows(t, cfg["rel"]["features"], add, f"{lang}/features-rel")
        p.write_text(t, encoding="utf-8")

        # 3. project：第 2、8 节前插段 + 相关文档 +6 行
        p = sub_path(lang, "project")
        t = p.read_text(encoding="utf-8")
        t = insert_before(t, "\n" + cfg["pj_h3"], "\n" + PARAS[lang]["project2"], f"{lang}/project-2")
        t = insert_before(t, "\n" + cfg["pj_h9"], "\n" + PARAS[lang]["project8"], f"{lang}/project-8")
        desc_map = {
            "interface": {"zh": "每一界面的路由与元素", "zh-tw": "每一介面的路由與元素",
                          "en": "The route and elements of every interface",
                          "es": "La ruta y los elementos de cada interfaz",
                          "fr": "La route et les éléments de chaque interface",
                          "nl": "De route en elementen van elke interface"},
            "search": {"zh": "搜索算子与分类规则条件", "zh-tw": "搜尋算子與分類規則條件",
                       "en": "Search operators and classification rule conditions",
                       "es": "Operadores de búsqueda y condiciones de reglas de clasificación",
                       "fr": "Opérateurs de recherche et conditions de règles de classement",
                       "nl": "Zoekoperators en classificatieregelvoorwaarden"},
            "deployment": {"zh": "自行部署的完整步骤", "zh-tw": "自行部署的完整步驟",
                           "en": "Full steps for self-deployment",
                           "es": "Pasos completos para el autoalojamiento",
                           "fr": "Étapes complètes de l'auto-hébergement",
                           "nl": "Volledige stappen voor zelfhosting"},
            "development": {"zh": "开发环境与工程流程", "zh-tw": "開發環境與工程流程",
                            "en": "Development environment and engineering workflow",
                            "es": "Entorno de desarrollo y flujo de ingeniería",
                            "fr": "Environnement de développement et flux d'ingénierie",
                            "nl": "Ontwikkelomgeving en engineeringproces"},
            "service": {"zh": "托管实例的服务内容与支持渠道", "zh-tw": "託管實例的服務內容與支援管道",
                        "en": "What the hosted instance provides and its support channels",
                        "es": "Lo que ofrece la instancia alojada y sus canales de soporte",
                        "fr": "Ce que fournit l'instance hébergée et ses canaux d'assistance",
                        "nl": "Wat de gehoste instantie biedt en haar ondersteuningskanalen"},
            "opensource": {"zh": "开源授权与自部署法律地位", "zh-tw": "開源授權與自部署法律地位",
                           "en": "The open-source licence and the self-hosting legal position",
                           "es": "La licencia de código abierto y la posición jurídica del autoalojamiento",
                           "fr": "La licence open source et la position juridique de l'auto-hébergement",
                           "nl": "De open-sourcelicentie en de juridische positie van zelfhosting"},
        }
        add = ""
        for key, slug in (("interface", "interface"), ("search", "search"),
                          ("deployment", "deployment"), ("development", "development"),
                          ("service", "service-scope"), ("opensource", "open-source")):
            add += f"| {desc_map[key][lang]} | {link(key)} |\n"
        t = insert_rel_rows(t, cfg["rel"]["project"], add, f"{lang}/project-rel")
        p.write_text(t, encoding="utf-8")

        # 4. modes：相关文档 +2 行
        p = sub_path(lang, "modes")
        t = p.read_text(encoding="utf-8")
        dep_desc = {"zh": "自行部署的完整步骤", "zh-tw": "自行部署的完整步驟",
                    "en": "Full steps for self-deployment",
                    "es": "Pasos completos para el autoalojamiento",
                    "fr": "Étapes complètes de l'auto-hébergement",
                    "nl": "Volledige stappen voor zelfhosting"}[lang]
        svc_desc = {"zh": "托管实例的服务边界与支持渠道", "zh-tw": "託管實例的服務邊界與支援管道",
                    "en": "The hosted instance's service boundaries and support channels",
                    "es": "Los límites del servicio de la instancia alojada y sus canales de soporte",
                    "fr": "Les limites du service de l'instance hébergée et ses canaux d'assistance",
                    "nl": "De dienstgrenzen van de gehoste instantie en haar ondersteuningskanalen"}[lang]
        add = f"| {dep_desc} | {link('deployment')} |\n| {svc_desc} | {link('service')} |\n"
        t = insert_rel_rows(t, cfg["rel"]["modes"], add, f"{lang}/modes-rel")
        p.write_text(t, encoding="utf-8")

        # 5. settings：相关文档 +2 行
        p = sub_path(lang, "settings")
        t = p.read_text(encoding="utf-8")
        itf_desc = {"zh": "每一界面的路由与元素", "zh-tw": "每一介面的路由與元素",
                    "en": "The route and elements of every interface",
                    "es": "La ruta y los elementos de cada interfaz",
                    "fr": "La route et les éléments de chaque interface",
                    "nl": "De route en elementen van elke interface"}[lang]
        sch_desc = {"zh": "搜索算子与分类规则条件", "zh-tw": "搜尋算子與分類規則條件",
                    "en": "Search operators and classification rule conditions",
                    "es": "Operadores de búsqueda y condiciones de reglas de clasificación",
                    "fr": "Opérateurs de recherche et conditions de règles de classement",
                    "nl": "Zoekoperators en classificatieregelvoorwaarden"}[lang]
        add = f"| {itf_desc} | {link('interface')} |\n| {sch_desc} | {link('search')} |\n"
        t = insert_rel_rows(t, cfg["rel"]["settings"], add, f"{lang}/settings-rel")
        p.write_text(t, encoding="utf-8")

    # 6. 版本号 5.12 → 5.13（全部 md 文件，逐文件恰一处）
    pats = ["版本：5.12", "Version: 5.12", "Versión: 5.12", "Version : 5.12", "Versie: 5.12"]
    for path in sorted(ROOT.glob("**/*.md")):
        text = path.read_text(encoding="utf-8")
        for pat in pats:
            c = text.count(pat)
            if c == 1:
                path.write_text(text.replace(pat, pat.replace("5.12", "5.13")), encoding="utf-8")
                break
            if c > 1:
                failures.append(f"[version] {path}: {pat!r} 命中 {c} 次")
                break

    if failures:
        print("FAILED:")
        for f in failures:
            print("  " + f)
        return 1
    print("OK: v5.13 interlink expansion applied")
    return 0


if __name__ == "__main__":
    sys.exit(main())
