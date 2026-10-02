#!/usr/bin/env python3
"""v5.9: compact project.md sections 2/3/5 in all 6 languages (detail moved to
features.md / architecture.md), keep numbering intact. Idempotent."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "src" / "content" / "docs"
LANGS = ["mail", "zh-tw", "en", "fr", "es", "nl"]

errors = []

def compact_sections(text, s23, s5):
    # span from "## 2." up to (not incl.) "## 4." -> compact 2+3
    m = re.search(r"(?ms)^## 2\..*?(?=^## 4\.)", text)
    if not m:
        return None
    text = text[:m.start()] + s23 + text[m.end():]
    m = re.search(r"(?ms)^## 5\..*?(?=^## 6\.)", text)
    if not m:
        return None
    text = text[:m.start()] + s5 + text[m.end():]
    return text

S23 = {
"mail": """## 2. 核心功能概览

本专案功能横跨收发、整理、检索、自动化与开放平台，逐项说明与真实运行界面截图见[功能指南](/mail/features/)。要点：Cloudflare Email Routing 入站与多通道出站；八视图收件箱、会话线程与三栏分屏；高级搜索语法与分类规则引擎；Workers AI 验证码提取与保留排版的全文翻译；OAuth 2.0／OIDC 认证中心与个人 API 令牌；数据导出（JSON 与 .eml）。

## 3. 技术架构概览

服务端运行于 Cloudflare Workers（V8 Isolate 无状态沙箱），数据落于双 D1 物理隔离（用户库与邮件库，单库部署 100% 向后兼容）、KV 与对象存储（自备 S3、配置 S3、R2、KV 四级解析）；入站经 Email Routing，出站经 Resend／Mailjet 等通道，AI 能力由 Workers AI 承载。完整拓扑、加密体系、角色配额与邮件生命周期见[技术架构](/mail/architecture/)。

""",
"zh-tw": """## 2. 核心功能概覽

本專案功能橫跨收發、整理、檢索、自動化與開放平台，逐項說明與真實執行介面截圖見[功能指南](/zh-tw/mail/features/)。要點：Cloudflare Email Routing 入站與多通道出站；八視圖收件匣、會話執行緒與三欄分割；進階搜尋語法與分類規則引擎；Workers AI 驗證碼提取與保留排版的全文翻譯；OAuth 2.0／OIDC 認證中心與個人 API 權杖；資料匯出（JSON 與 .eml）。

## 3. 技術架構概覽

伺服端運行於 Cloudflare Workers（V8 Isolate 無狀態沙箱），資料落於雙 D1 物理隔離（使用者庫與郵件庫，單庫部署 100% 向後相容）、KV 與物件儲存（自備 S3、設定 S3、R2、KV 四級解析）；入站經 Email Routing，出站經 Resend／Mailjet 等通道，AI 能力由 Workers AI 承載。完整拓撲、加密體系、角色配額與郵件生命週期見[技術架構](/zh-tw/mail/architecture/)。

""",
"en": """## 2. Feature Overview

The project spans sending and receiving, organisation, search, automation, and an open platform; a per-feature walkthrough with real interface screenshots is in the [Feature Guide](/en/mail/features/). Highlights: inbound via Cloudflare Email Routing with multi-channel outbound; an eight-view inbox with threads and a three-pane split; advanced search syntax and the classification rule engine; Workers AI code extraction and layout-preserving full-text translation; an OAuth 2.0 / OIDC centre and personal API tokens; and data export (JSON and .eml).

## 3. Architecture Overview

The server runs on Cloudflare Workers (stateless V8 Isolate sandboxes); data lands in dual physically isolated D1 databases (a user database and a mail database, with 100% single-database backward compatibility), KV, and object storage (a four-level chain: BYO S3, configured S3, R2, KV); inbound mail arrives via Email Routing, outbound goes through Resend / Mailjet and similar channels, and AI runs on Workers AI. The full topology, encryption scheme, role quotas, and mail lifecycle are in [Technical Architecture](/en/mail/architecture/).

""",
"fr": """## 2. Aperçu des fonctionnalités

Le projet couvre l'envoi et la réception, l'organisation, la recherche, l'automatisation et la plateforme ouverte ; le détail de chaque fonctionnalité avec captures d'écran réelles figure dans le [Guide des fonctionnalités](/fr/mail/features/). Points clés : réception via Cloudflare Email Routing et envoi multi-canaux ; boîte de réception à huit vues avec fils de discussion et vue en trois colonnes ; syntaxe de recherche avancée et moteur de règles de classement ; extraction des codes de vérification par Workers AI et traduction intégrale préservant la mise en page ; centre OAuth 2.0 / OIDC et jetons API personnels ; export des données (JSON et .eml).

## 3. Aperçu de l'architecture

Le serveur fonctionne sur Cloudflare Workers (sandbox V8 Isolate sans état) ; les données résident dans deux bases D1 physiquement isolées (base utilisateurs et base courriels, rétrocompatibilité à 100 % en déploiement mono-base), dans KV et dans le stockage d'objets (chaîne à quatre niveaux : S3 personnel, S3 configuré, R2, KV) ; la réception passe par Email Routing, l'envoi par Resend / Mailjet et autres canaux, et l'IA par Workers AI. Topologie complète, chiffrement, quotas par rôle et cycle de vie des courriels : voir [Architecture technique](/fr/mail/architecture/).

""",
"es": """## 2. Resumen de funcionalidades

El proyecto abarca envío y recepción, organización, búsqueda, automatización y plataforma abierta; el detalle de cada función con capturas de pantalla reales está en la [Guía de funciones](/es/mail/features/). Puntos clave: entrada vía Cloudflare Email Routing y salida multicanal; bandeja de entrada con ocho vistas, hilos de conversación y vista de tres paneles; sintaxis de búsqueda avanzada y motor de reglas de clasificación; extracción de códigos de verificación con Workers AI y traducción íntegra que conserva el formato; centro OAuth 2.0 / OIDC y tokens de API personales; y exportación de datos (JSON y .eml).

## 3. Resumen de la arquitectura

El servidor funciona sobre Cloudflare Workers (sandbox V8 Isolate sin estado); los datos residen en dos bases D1 físicamente aisladas (base de usuarios y base de correo, con retrocompatibilidad del 100 % en despliegues de una sola base), KV y almacenamiento de objetos (cadena de cuatro niveles: S3 propio, S3 configurado, R2, KV); la entrada llega vía Email Routing, la salida usa canales como Resend / Mailjet, y la IA corre en Workers AI. Topología completa, cifrado, cuotas por rol y ciclo de vida del correo: véase [Arquitectura técnica](/es/mail/architecture/).

""",
"nl": """## 2. Functieoverzicht

Het project omvat verzenden en ontvangen, indeling, zoeken, automatisering en een open platform; de per-functie toelichting met echte interface-screenshots staat in de [Functiegids](/nl/mail/features/). Kernpunten: ontvangst via Cloudflare Email Routing en multikanaal verzenden; een inbox met acht weergaven, conversatiedraden en drie-paneelweergave; geavanceerde zoeksyntaxis en de classificatieregelengine; verificatiecode-extractie via Workers AI en indeling-bewarende volledige vertaling; een OAuth 2.0 / OIDC-centrum en persoonlijke API-tokens; en gegevensexport (JSON en .eml).

## 3. Architectuuroverzicht

De server draait op Cloudflare Workers (stateless V8 Isolate-sandboxen); gegevens staan in twee fysiek gescheiden D1-databases (een gebruikers- en een maildatabase, met 100% achterwaartse compatibiliteit in single-database-uitrol), KV en objectopslag (een keten van vier niveaus: eigen S3, geconfigureerde S3, R2, KV); inkomende post komt via Email Routing, uitgaande post via kanalen als Resend / Mailjet, en AI draait op Workers AI. De volledige topologie, het versleutelingssysteem, rolquota en de levenscyclus van e-mail: zie [Technische architectuur](/nl/mail/architecture/).

""",
}

S5 = {
"mail": """## 5. 安全设计概览

密码经 PBKDF2-HMAC-SHA256（100,000 次迭代）加盐哈希，TOTP 密钥以 AES-256-GCM 静态加密；邮件 URL 采用 HMAC-SHA256 签名之 20 位随机 Hash 防越权与防枚举；XSS 三重防御与 SSRF 阻断；官方邮件不可变快照投递。上述措施于 2026 年 9 月 22 日全量安全加固中闭环（43 项自动化断言全绿）；完整清单见[技术架构](/mail/architecture/)第 7 节，面向个人之告知与保存期限见[数据处理与安全维护](/mail/data-security/)。

""",
"zh-tw": """## 5. 安全設計概覽

密碼經 PBKDF2-HMAC-SHA256（100,000 次迭代）加鹽雜湊，TOTP 金鑰以 AES-256-GCM 靜態加密；郵件 URL 採用 HMAC-SHA256 簽章之 20 位隨機 Hash 防越權與防枚舉；XSS 三重防禦與 SSRF 阻斷；官方郵件不可變快照投遞。上述措施於 2026 年 9 月 22 日全量安全加固中閉環（43 項自動化斷言全綠）；完整清單見[技術架構](/zh-tw/mail/architecture/)第 7 節，面向個人之告知與保存期限見[資料處理與安全維護](/zh-tw/mail/data-security/)。

""",
"en": """## 5. Security Design Overview

Passwords are salted PBKDF2-HMAC-SHA256 hashes (100,000 iterations); TOTP secrets are encrypted at rest with AES-256-GCM; mail URLs use 20-character HMAC-SHA256-signed random hashes against privilege escalation and enumeration; XSS is handled by triple defence and SSRF is blocked; official mail is delivered as immutable snapshots. These measures were closed out in the 2026-09-22 full security hardening (43 automated assertions green); the complete list is in [Technical Architecture](/en/mail/architecture/), Section 7, and the notices and retention owed to individuals are in [Data Processing & Security Maintenance](/en/mail/data-security/).

""",
"fr": """## 5. Aperçu de la conception de sécurité

Les mots de passe sont hachés par PBKDF2-HMAC-SHA256 (100 000 itérations) avec sel ; les clés TOTP sont chiffrées au repos par AES-256-GCM ; les URL des courriels utilisent un hachage aléatoire de 20 caractères signé HMAC-SHA256 contre l'escalade de privilèges et l'énumération ; triple défense XSS et blocage SSRF ; remise des courriels officiels sous forme d'instantanés immuables. Ces mesures ont été bouclées lors du durcissement de sécurité complet du 22 septembre 2026 (43 assertions automatisées au vert) ; la liste complète figure dans [Architecture technique](/fr/mail/architecture/), section 7, et les informations et durées de conservation dues aux personnes dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/).

""",
"es": """## 5. Resumen del diseño de seguridad

Las contraseñas se almacenan como hashes PBKDF2-HMAC-SHA256 (100.000 iteraciones) con sal; las claves TOTP se cifran en reposo con AES-256-GCM; las URL del correo usan hashes aleatorios de 20 caracteres firmados con HMAC-SHA256 contra la escalada de privilegios y la enumeración; triple defensa XSS y bloqueo SSRF; entrega del correo oficial como instantáneas inmutables. Estas medidas se cerraron en el endurecimiento integral de seguridad del 22 de septiembre de 2026 (43 aserciones automatizadas en verde); la lista completa está en [Arquitectura técnica](/es/mail/architecture/), Sección 7, y las informaciones y plazos de conservación debidos a las personas en [Procesamiento de Datos y Seguridad](/es/mail/data-security/).

""",
"nl": """## 5. Beveiligingsontwerp in het kort

Wachtwoorden worden opgeslagen alsgezouten PBKDF2-HMAC-SHA256-hashes (100.000 iteraties); TOTP-sleutels worden met AES-256-GCM in rust versleuteld; mail-URL's gebruiken willekeurige 20-tekens hashes ondertekend met HMAC-SHA256 tegen privilege-escalatie en enumeratie; drievoudige XSS-verdediging en SSRF-blokkering; officiële mail wordt geleverd als onveranderlijke snapshots. Deze maatregelen zijn afgerond in de volledige security-hardening van 22 september 2026 (43 geautomatiseerde asserts groen); de volledige lijst staat in [Technische architectuur](/nl/mail/architecture/), paragraaf 7, en de informaties en bewaartermijnen jegens personen in [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

""",
}

for lang in LANGS:
    base = DOCS if lang == "mail" else DOCS / lang
    p = base / "mail" / "project.md"
    text = p.read_text(encoding="utf-8")
    if "## 2. 核心功能概览" in text or "## 2. 核心功能概覽" in text or "## 2. Feature Overview" in text or "## 2. Aperçu des fonctionnalités" in text or "## 2. Resumen de funcionalidades" in text or "## 2. Functieoverzicht" in text:
        continue  # already compacted
    out = compact_sections(text, S23[lang], S5[lang])
    if out is None:
        errors.append(f"{p}: section anchors not found")
        continue
    p.write_text(out, encoding="utf-8", newline="")

if errors:
    print("FAILED:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("project.md compacted x6")
