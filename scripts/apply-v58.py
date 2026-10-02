#!/usr/bin/env python3
"""v5.8 polish round (independent-audit remediation).

P1  country/region code over-claim in data-security matrix -> corrected row + new
    edge-environment row (not persisted, runtime-only per user-service.js:272)
P2  sub-processors R2 wording hedged (R2 binding disabled in prod, default KV)
P2  H1 headings added to data-security.md and project.md (6 languages)
    content completion: mailbox domains (privacy s1), cookies & Turnstile
    (privacy s4.3), law-enforcement request principles (privacy s7), 90-day
    hard-deletion window after self-deactivation (privacy s8 / data-security 3.2 /
    ToS 8.1), 72h incident notification (data-security 3.4), outbound rate limits
    (AUP s6), IP notice & counter-notice (AUP s8), age self-declaration (ToS 3.2)
ALL 6 languages kept 1:1 symmetric. Fails loudly on any anchor mismatch.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # EpomailDocs/
DOCS = ROOT / "src" / "content" / "docs"
LANGS = ["mail", "zh-tw", "en", "fr", "es", "nl"]
ALL_DOCS = ["overview", "project", "privacy-policy", "terms-of-service",
            "acceptable-use", "data-security", "sub-processors", "key-terms",
            "tamper-proof"]

errors = []

def path_for(lang, name):
    base = DOCS if lang == "mail" else DOCS / lang
    return base / "mail" / f"{name}.md"

def replace(path, old, new, count=1):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    n = text.count(old)
    if n == 0 and text.count(new) >= count:
        return  # already applied (idempotent re-run)
    if n != count:
        errors.append(f"{p.relative_to(ROOT)}: expected {count}x {old[:70]!r}, found {n}")
        return
    p.write_text(text.replace(old, new), encoding="utf-8", newline="")

def insert_before_line(path, prefix, block):
    """Insert `block` (+blank line) before the first line starting with `prefix`."""
    p = Path(path)
    lines = p.read_text(encoding="utf-8").split("\n")
    for i, line in enumerate(lines):
        if line.startswith(prefix):
            lines[i:i] = block.rstrip("\n").split("\n") + [""]
            p.write_text("\n".join(lines), encoding="utf-8", newline="")
            return
    errors.append(f"{p.relative_to(ROOT)}: anchor line {prefix[:60]!r} not found")

def append_section(path, text):
    p = Path(path)
    body = p.read_text(encoding="utf-8").rstrip("\n")
    p.write_text(body + "\n\n" + text.strip("\n") + "\n", encoding="utf-8", newline="")

# ---------------------------------------------------------------- version bump
VER_OLD = {
    "mail":    "**生效日期：2026 年 10 月 2 日｜版本：5.7**",
    "zh-tw":   "**生效日期：2026 年 10 月 2 日｜版本：5.7**",
    "en":      "**Effective Date: October 2, 2026 | Version: 5.7**",
    "fr":      "**Date d'entrée en vigueur : 2 octobre 2026 | Version : 5.7**",
    "es":      "**Fecha de entrada en vigor: 2 de octubre de 2026 | Versión: 5.7**",
    "nl":      "**Datum van inwerkingtreding: 2 oktober 2026 | Versie: 5.7**",
}
VER_NEW = {
    "mail":    "**生效日期：2026 年 10 月 3 日｜版本：5.8**",
    "zh-tw":   "**生效日期：2026 年 10 月 3 日｜版本：5.8**",
    "en":      "**Effective Date: October 3, 2026 | Version: 5.8**",
    "fr":      "**Date d'entrée en vigueur : 3 octobre 2026 | Version : 5.8**",
    "es":      "**Fecha de entrada en vigor: 3 de octubre de 2026 | Versión: 5.8**",
    "nl":      "**Datum van inwerkingtreding: 3 oktober 2026 | Versie: 5.8**",
}

for lang in LANGS:
    for name in ALL_DOCS:
        p = path_for(lang, name)
        text = p.read_text(encoding="utf-8")
        if VER_NEW[lang] in text and VER_OLD[lang] not in text:
            continue  # already bumped (idempotent re-run)
        replace(p, VER_OLD[lang], VER_NEW[lang])

# ---------------------------------------------------------------- H1 headings
H1_TITLE = {
    "mail":  {"project": "EpoCanvas Mail 专案介绍", "data-security": "数据处理与安全维护"},
    "zh-tw": {"project": "EpoCanvas Mail 專案介紹", "data-security": "資料處理與安全維護"},
    "en":    {"project": "EpoCanvas Mail Project Overview", "data-security": "Data Processing & Security Maintenance"},
    "fr":    {"project": "Présentation du projet EpoCanvas Mail", "data-security": "Traitement des Données et Maintien de la Sécurité"},
    "es":    {"project": "Presentación del proyecto EpoCanvas Mail", "data-security": "Tratamiento de Datos y Mantenimiento de la Seguridad"},
    "nl":    {"project": "Projectoverzicht EpoCanvas Mail", "data-security": "Gegevensverwerking en Beveiligingsonderhoud"},
}

for lang in LANGS:
    for name in ("project", "data-security"):
        p = path_for(lang, name)
        if any(line.startswith("# ") for line in p.read_text(encoding="utf-8").split("\n")):
            errors.append(f"{p.relative_to(ROOT)}: H1 already present")
            continue
        ver = VER_NEW[lang]
        replace(p, ver, f"# {H1_TITLE[lang][name]}\n\n{ver}")
        text = p.read_text(encoding="utf-8")
        p.write_text(text.replace("\n\n\n# ", "\n\n# "), encoding="utf-8", newline="")

# ------------------------------------------------- data-security: P1 matrix row
MATRIX_OLD = {
    "mail":  "| 网络与设备资料 | 注册 IP、最近登录 IP、操作系统、浏览器与设备类型、来自边缘请求之国家/地区码 | 安全审计、异常登录识别 | Cloudflare D1；仅管理员审计可查询，不用于商业画像 | 至帐号实体删除为止 |",
    "zh-tw": "| 網路與裝置資料 | 註冊 IP、最近登入 IP、作業系統、瀏覽器與裝置類型、來自邊緣請求之國家/地區碼 | 安全稽核、異常登入識別 | Cloudflare D1；僅管理員稽核可查詢，不用於商業畫像 | 至帳號實體刪除為止 |",
    "en":    "| Network and device data | registration IP, latest login IP, operating system, browser and device type, country/region code from the edge request | security auditing, unusual-login detection | Cloudflare D1; visible only to administrator audits, never used for commercial profiling | until the account is hard-deleted |",
    "fr":    "| Données réseau et d'appareil | IP d'inscription, IP de dernière connexion, système d'exploitation, type de navigateur et d'appareil, code pays/région issu de la requête en périphérie | audit de sécurité, détection de connexions inhabituelles | Cloudflare D1 ; consultables uniquement dans le cadre d'audits d'administration, jamais utilisées pour le profilage commercial | jusqu'à la suppression définitive du compte |",
    "es":    "| Datos de red y dispositivo | IP de registro, IP del último inicio de sesión, sistema operativo, tipo de navegador y dispositivo, código de país o región procedente de la solicitud en el borde | auditoría de seguridad, detección de inicios de sesión inusuales | Cloudflare D1; consultables solo en auditorías de administración, nunca para perfiles comerciales | hasta la eliminación física de la cuenta |",
    "nl":    "| Netwerk- en apparaatgegevens | registratie-IP, IP van de laatste aanmelding, besturingssysteem, browser- en apparaattype, land/regiocode uit het randverzoek | beveiligingsaudit, opsporing van ongebruikelijke aanmeldingen | Cloudflare D1; alleen in te zien door beheerdersaudits, nooit voor commercieel profileren | tot de fysieke verwijdering van het account |",
}
MATRIX_NEW = {
    "mail":  "| 网络与设备资料 | 注册 IP、最近登录 IP、操作系统、浏览器与设备类型 | 安全审计、异常登录识别 | Cloudflare D1；仅管理员审计可查询，不用于商业画像 | 至帐号实体删除为止 |\n| 边缘环境信息 | 请求时之边缘国家/地区码（`cf-ipcountry`） | 界面预选（如电话区号默认值） | 不入库；仅随响应回传至浏览器 | 不保存，随响应结束销毁 |",
    "zh-tw": "| 網路與裝置資料 | 註冊 IP、最近登入 IP、作業系統、瀏覽器與裝置類型 | 安全稽核、異常登入識別 | Cloudflare D1；僅管理員稽核可查詢，不用於商業畫像 | 至帳號實體刪除為止 |\n| 邊緣環境資訊 | 請求時之邊緣國家/地區碼（`cf-ipcountry`） | 介面預選（如電話區號預設值） | 不入庫；僅隨回應回傳至瀏覽器 | 不保存，隨回應結束銷毀 |",
    "en":    "| Network and device data | registration IP, latest login IP, operating system, browser and device type | security auditing, unusual-login detection | Cloudflare D1; visible only to administrator audits, never used for commercial profiling | until the account is hard-deleted |\n| Edge environment data | the edge country/region code of the request (`cf-ipcountry`) | interface pre-selection (such as the default phone country code) | not persisted; returned only with the response to the browser | not stored; destroyed when the response ends |",
    "fr":    "| Données réseau et d'appareil | IP d'inscription, IP de dernière connexion, système d'exploitation, type de navigateur et d'appareil | audit de sécurité, détection de connexions inhabituelles | Cloudflare D1 ; consultables uniquement dans le cadre d'audits d'administration, jamais utilisées pour le profilage commercial | jusqu'à la suppression définitive du compte |\n| Données d'environnement périphérique | code pays/région de la requête (`cf-ipcountry`) | présélection d'interface (indicatif téléphonique par défaut, par exemple) | non persistées ; renvoyées uniquement avec la réponse au navigateur | non stockées ; détruites à la fin de la réponse |",
    "es":    "| Datos de red y dispositivo | IP de registro, IP del último inicio de sesión, sistema operativo, tipo de navegador y dispositivo | auditoría de seguridad, detección de inicios de sesión inusuales | Cloudflare D1; consultables solo en auditorías de administración, nunca para perfiles comerciales | hasta la eliminación física de la cuenta |\n| Datos del entorno perimetral | código de país o región de la solicitud (`cf-ipcountry`) | preselección de interfaz (p. ej., el prefijo telefónico predeterminado) | no se persisten; se devuelven únicamente con la respuesta al navegador | no se almacenan; se destruyen al terminar la respuesta |",
    "nl":    "| Netwerk- en apparaatgegevens | registratie-IP, IP van de laatste aanmelding, besturingssysteem, browser- en apparaattype | beveiligingsaudit, opsporing van ongebruikelijke aanmeldingen | Cloudflare D1; alleen in te zien door beheerdersaudits, nooit voor commercieel profileren | tot de fysieke verwijdering van het account |\n| Randomgeving-gegevens | land/regiocode van het verzoek (`cf-ipcountry`) | interface-preselectie (zoals de standaard telefoonlandcode) | niet persistent; wordt alleen met het antwoord naar de browser teruggegeven | niet opgeslagen; vernietigd zodra het antwoord eindigt |",
}
for lang in LANGS:
    replace(path_for(lang, "data-security"), MATRIX_OLD[lang], MATRIX_NEW[lang])

# ------------------------------------- data-security 3.2: 90-day deletion window
DEL_OLD = {
    "mail":  "- **帐号注销**：您得于设置中自助注销。注销后会话即时失效，邮件与资料进入软删除状态，至管理员执行实体删除为止；实体删除后，帐号资料、邮件、附件与授权记录自数据库与对象存储移除，不可复原；",
    "zh-tw": "- **帳號註銷**：您得於設定中自助註銷。註銷後會話即時失效，郵件與資料進入軟刪除狀態，至管理員執行實體刪除為止；實體刪除後，帳號資料、郵件、附件與授權紀錄自資料庫與物件儲存移除，不可復原；",
    "en":    "- **Account deactivation**: you can deactivate your account yourself in Settings. Sessions are revoked immediately and mail and data enter a soft-deleted state until an administrator performs the hard deletion; after hard deletion, account data, mail, attachments, and authorizations are removed from the database and object storage and cannot be recovered;",
    "fr":    "- **Désactivation du compte** : vous pouvez désactiver votre compte vous-même dans les paramètres. Les sessions prennent fin immédiatement et les courriels et données passent en état de suppression logicielle jusqu'à ce qu'un administrateur effectue la suppression définitive ; après celle-ci, les données du compte, les courriels, les pièces jointes et les autorisations sont retirés de la base de données et du stockage d'objets, sans possibilité de récupération ;",
    "es":    "- **Desactivación de la cuenta**: puede desactivarla usted mismo en los ajustes. Las sesiones se revocan de inmediato y los correos y datos pasan a estado de eliminación lógica hasta que un administrador ejecute la eliminación física; tras esta, los datos de la cuenta, los correos, los adjuntos y las autorizaciones se retiran de la base de datos y del almacenamiento de objetos, sin posibilidad de recuperación;",
    "nl":    "- **Account deactiveren**: dat kunt u zelf in de instellingen doen. Sessies vervallen onmiddellijk en e-mail en gegevens komen in een zacht-verwijderde staat tot een beheerder de fysieke verwijdering uitvoert; daarna zijn accountgegevens, e-mail, bijlagen en machtigingen uit de database en objectopslag verwijderd en niet herstelbaar;",
}
DEL_NEW = {
    "mail":  "- **帐号注销**：您得于设置中自助注销。注销后会话即时失效，邮件与资料进入软删除状态；除法令要求留存外，管理员于注销后 90 日内执行实体删除。实体删除后，帐号资料、邮件、附件与授权记录自数据库与对象存储移除，不可复原；",
    "zh-tw": "- **帳號註銷**：您得於設定中自助註銷。註銷後會話即時失效，郵件與資料進入軟刪除狀態；除法令要求留存外，管理員於註銷後 90 日內執行實體刪除。實體刪除後，帳號資料、郵件、附件與授權紀錄自資料庫與物件儲存移除，不可復原；",
    "en":    "- **Account deactivation**: you can deactivate your account yourself in Settings. Sessions are revoked immediately and mail and data enter a soft-deleted state; unless retention is required by law, an administrator performs the hard deletion within 90 days of deactivation. After hard deletion, account data, mail, attachments, and authorizations are removed from the database and object storage and cannot be recovered;",
    "fr":    "- **Désactivation du compte** : vous pouvez désactiver votre compte vous-même dans les paramètres. Les sessions prennent fin immédiatement et les courriels et données passent en état de suppression logicielle ; sauf conservation exigée par la loi, un administrateur effectue la suppression définitive dans les 90 jours suivant la désactivation. Après celle-ci, les données du compte, les courriels, les pièces jointes et les autorisations sont retirés de la base de données et du stockage d'objets, sans possibilité de récupération ;",
    "es":    "- **Desactivación de la cuenta**: puede desactivarla usted mismo en los ajustes. Las sesiones se revocan de inmediato y los correos y datos pasan a estado de eliminación lógica; salvo que la ley exija su conservación, un administrador ejecuta la eliminación física en un plazo de 90 días desde la desactivación. Tras esta, los datos de la cuenta, los correos, los adjuntos y las autorizaciones se retiran de la base de datos y del almacenamiento de objetos, sin posibilidad de recuperación;",
    "nl":    "- **Account deactiveren**: dat kunt u zelf in de instellingen doen. Sessies vervallen onmiddellijk en e-mail en gegevens komen in een zacht-verwijderde staat; tenzij de wet bewaring vereist, voert een beheerder de fysieke verwijdering binnen 90 dagen na deactivering uit. Daarna zijn accountgegevens, e-mail, bijlagen en machtigingen uit de database en objectopslag verwijderd en niet herstelbaar;",
}
for lang in LANGS:
    replace(path_for(lang, "data-security"), DEL_OLD[lang], DEL_NEW[lang])

# ------------------------------------------ data-security 3.4: 72h notification
NOTIF_OLD = {
    "mail":  "2. **法定通报**：依适用法律于法定时限内向主管机关通报，并以站内公告或系统邮件通知受影响之当事人；",
    "zh-tw": "2. **法定通報**：依適用法律於法定時限內向主管機關通報，並以站內公告或系統郵件通知受影響之當事人；",
    "en":    "2. **Statutory notification**: notify the competent authority within the period required by applicable law, and inform affected users through an on-site announcement or system mail;",
    "fr":    "2. **Notification légale** : notification à l'autorité compétente dans le délai exigé par le droit applicable, et information des personnes touchées par une annonce sur le site ou un courriel système ;",
    "es":    "2. **Notificación legal**: notificación a la autoridad competente dentro del plazo que exija el derecho aplicable, e información a las personas afectadas mediante un aviso en el sitio o un correo del sistema;",
    "nl":    "2. **Wettelijke melding**: melding bij de toezichthouder binnen de termijn die het toepasselijke recht vereist, en informering van getroffenen via een aankondiging op de site of systeemmail;",
}
NOTIF_NEW = {
    "mail":  "2. **法定通报**：于知悉事故后 72 小时内向主管机关通报（适用法律定有不同时限者，从其规定并尽速为之），并以站内公告或系统邮件通知受影响之当事人；",
    "zh-tw": "2. **法定通報**：於知悉事故後 72 小時內向主管機關通報（適用法律定有不同時限者，從其規定並儘速為之），並以站內公告或系統郵件通知受影響之當事人；",
    "en":    "2. **Statutory notification**: notify the competent authority within 72 hours of becoming aware of the incident (where applicable law sets a different period, that period applies and notice is given without delay), and inform affected users through an on-site announcement or system mail;",
    "fr":    "2. **Notification légale** : notification à l'autorité compétente dans les 72 heures suivant la constatation de l'incident (lorsque le droit applicable prévoit un délai différent, ce dernier s'applique et la notification intervient sans délai), et information des personnes touchées par une annonce sur le site ou un courriel système ;",
    "es":    "2. **Notificación legal**: notificación a la autoridad competente dentro de las 72 horas siguientes al conocimiento del incidente (cuando el derecho aplicable fije un plazo distinto, se aplicará este y se notificará sin demora), e información a las personas afectadas mediante un aviso en el sitio o un correo del sistema;",
    "nl":    "2. **Wettelijke melding**: melding bij de toezichthouder binnen 72 uur nadat het incident bekend is geworden (voor zover het toepasselijke recht een andere termijn stelt, geldt die termijn en wordt zo snel mogelijk gemeld), en informering van getroffenen via een aankondiging op de site of systeemmail;",
}
for lang in LANGS:
    replace(path_for(lang, "data-security"), NOTIF_OLD[lang], NOTIF_NEW[lang])

# ------------------------------------------------------- privacy s1: mailbox domains
DOMAINS_BLOCK = {
    "mail":  "托管实例配发之电子邮件地址属 `epomail.bond` 与 `epomail.cyou` 网域；官方系统邮件（欢迎邮件、全域公告）以 `announcement@epocanvas.com` 统一发送。",
    "zh-tw": "託管實例配發之電子郵件地址屬 `epomail.bond` 與 `epomail.cyou` 網域；官方系統郵件（歡迎郵件、全域公告）以 `announcement@epocanvas.com` 統一發送。",
    "en":    "Mailbox addresses issued by the hosted instance belong to the `epomail.bond` and `epomail.cyou` domains; official system mail (welcome mail, global announcements) is sent from `announcement@epocanvas.com`.",
    "fr":    "Les adresses électroniques attribuées par l'instance hébergée appartiennent aux domaines `epomail.bond` et `epomail.cyou` ; les courriels officiels du système (courriels de bienvenue, annonces globales) sont envoyés depuis `announcement@epocanvas.com`.",
    "es":    "Las direcciones de correo que emite la instancia alojada pertenecen a los dominios `epomail.bond` y `epomail.cyou`; los correos oficiales del sistema (correos de bienvenida, anuncios globales) se envían desde `announcement@epocanvas.com`.",
    "nl":    "Mailboxadressen die door de gehoste instantie worden uitgegeven, behoren tot de domeinen `epomail.bond` en `epomail.cyou`; officiële systeem-e-mails (welkomst-e-mails, globale aankondigingen) worden verzonden vanaf `announcement@epocanvas.com`.",
}
S1_ANCHOR = {
    "mail":  "本政策不适用于本服务链接或嵌入",
    "zh-tw": "本政策不適用於本服務連結或嵌入",
    "en":    "This policy does not apply to third-party",
    "fr":    "La présente politique ne s'applique pas aux",
    "es":    "Esta Política no se aplica a los sitios",
    "nl":    "Dit beleid is niet van toepassing op",
}
for lang in LANGS:
    insert_before_line(path_for(lang, "privacy-policy"), S1_ANCHOR[lang], DOMAINS_BLOCK[lang])

# --------------------------------------- privacy s4.3: cookies & Turnstile bullet
COOKIE_OLD = {
    "mail":  "- **会话令牌**：登录后签发之 JWT（有效期 30 日）存储于您浏览器之 localStorage。本服务不使用 Cookie，无跨站追踪。",
    "zh-tw": "- **工作階段權杖**：登入後簽發之 JWT（有效期 30 日）儲存於您瀏覽器之 localStorage。本服務不使用 Cookie，無跨站追蹤。",
    "en":    "- **Session tokens**: after login a JWT (valid 30 days) is stored in your browser's localStorage. The Service uses no cookies and performs no cross-site tracking.",
    "fr":    "- **Jetons de session** : le JWT émis après connexion (valable 30 jours) est stocké dans le localStorage de votre navigateur. Le Service n'utilise pas de cookie et ne pratique aucun suivi intersites.",
    "es":    "- **Tokens de sesión**: el JWT emitido tras el inicio de sesión (válido durante 30 días) se almacena en el localStorage de su navegador. El Servicio no utiliza cookies y no existe rastreo entre sitios.",
    "nl":    "- **Sessietokens**: de na aanmelding uitgegeven JWT (30 dagen geldig) wordt bewaard in de localStorage van uw browser. De Dienst gebruikt geen cookies en doet geen cross-site-tracking.",
}
COOKIE_NEW = {
    "mail":  "- **会话令牌**：登录后签发之 JWT（有效期 30 日）存储于您浏览器之 localStorage，用于维持登录状态与界面偏好；本服务不以 Cookie 识别身份或追踪行为，无跨站追踪。\n- **Cookie 与人机验证**：Turnstile 人机验证由 Cloudflare 提供，完成验证所必需之技术性存储可能于验证期间出现于您之浏览器，本服务不读取亦不将其用于识别或广告目的；本服务不嵌入任何广告、统计或社交平台脚本。",
    "zh-tw": "- **工作階段權杖**：登入後簽發之 JWT（有效期 30 日）儲存於您瀏覽器之 localStorage，用於維持登入狀態與介面偏好；本服務不以 Cookie 識別身分或追蹤行為，無跨站追蹤。\n- **Cookie 與人機驗證**：Turnstile 人機驗證由 Cloudflare 提供，完成驗證所必需之技術性儲存可能於驗證期間出現於您之瀏覽器，本服務不讀取亦不將其用於識別或廣告目的；本服務不嵌入任何廣告、統計或社群平臺腳本。",
    "en":    "- **Session tokens**: after login a JWT (valid 30 days) is stored in your browser's localStorage to maintain your signed-in state and interface preferences. The Service does not use cookies to identify you or track behaviour, and performs no cross-site tracking.\n- **Cookies and human verification**: Turnstile verification is provided by Cloudflare; technical storage strictly necessary to complete the challenge may appear in your browser during verification. The Service does not read it and does not use it for identification or advertising. The Service embeds no advertising, analytics, or social-platform scripts.",
    "fr":    "- **Jetons de session** : le JWT émis après connexion (valable 30 jours) est stocké dans le localStorage de votre navigateur afin de maintenir votre état de connexion et vos préférences d'interface. Le Service n'utilise pas de cookie pour vous identifier ni pour suivre votre comportement, et ne pratique aucun suivi intersites.\n- **Cookies et vérification humaine** : la vérification Turnstile est fournie par Cloudflare ; un stockage technique strictement nécessaire à la réalisation du défi peut apparaître dans votre navigateur pendant la vérification. Le Service ne le lit pas et ne l'utilise ni à des fins d'identification ni à des fins publicitaires. Le Service n'intègre aucun script publicitaire, statistique ou de plateforme sociale.",
    "es":    "- **Tokens de sesión**: el JWT emitido tras el inicio de sesión (válido durante 30 días) se almacena en el localStorage de su navegador para mantener su sesión iniciada y sus preferencias de interfaz. El Servicio no utiliza cookies para identificarle ni para rastrear su comportamiento, y no existe rastreo entre sitios.\n- **Cookies y verificación humana**: la verificación de Turnstile la proporciona Cloudflare; durante la verificación puede aparecer en su navegador un almacenamiento estrictamente necesario para completar el desafío. El Servicio no lo lee ni lo utiliza con fines de identificación o publicidad. El Servicio no incrusta scripts de publicidad, análisis ni plataformas sociales.",
    "nl":    "- **Sessietokens**: de na aanmelding uitgegeven JWT (30 dagen geldig) wordt bewaard in de localStorage van uw browser om uw aangemelde status en interfacevoorkeuren te behouden. De Dienst gebruikt geen cookies om u te identificeren of uw gedrag te volgen en doet geen cross-site-tracking.\n- **Cookies en mensverificatie**: Turnstile-verificatie wordt geleverd door Cloudflare; tijdens de verificatie kan in uw browser een technische opslag verschijnen die strikt noodzakelijk is om de challenge af te ronden. De Dienst leest die niet en gebruikt die niet voor identificatie of reclame. De Dienst embedt geen advertentie-, analytische of sociale-platformscripts.",
}
for lang in LANGS:
    replace(path_for(lang, "privacy-policy"), COOKIE_OLD[lang], COOKIE_NEW[lang])

# ------------------------------- privacy s7: law-enforcement request principles
LE_ANCHOR = {
    "mail":  "本服务建置于 Cloudflare 全球边缘网络，您的个人资料",
    "zh-tw": "本服務建置於 Cloudflare 全球邊緣網路，您的個人資料",
    "en":    "The Service is built on Cloudflare's global edge network",
    "fr":    "Le Service est construit sur le réseau mondial de périphérie de Cloudflare",
    "es":    "El Servicio está construido sobre la red perimetral global de Cloudflare",
    "nl":    "De Dienst draait op het wereldwijde edge-netwerk van Cloudflare",
}
LE_BLOCK = {
    "mail":  "执法与司法请求之处理原则：运营者仅于请求具备具体法律依据时提供资料，核实请求之合法性与范围，不自愿提供超出请求范围之内容，并于法律允许范围内先行通知受影响之当事人（法令禁止通知者除外）；本服务不接受无法律依据之任意调取。",
    "zh-tw": "執法與司法請求之處理原則：營運者僅於請求具備具體法律依據時提供資料，核實請求之合法性與範圍，不自願提供超出請求範圍之內容，並於法律允許範圍內先行通知受影響之當事人（法令禁止通知者除外）；本服務不接受無法律依據之任意調取。",
    "en":    "Principles for handling law-enforcement and judicial requests: the operator discloses data only where a request rests on a specific legal basis, verifies the legality and scope of the request, does not voluntarily provide content beyond what the request covers, and notifies affected users in advance where the law allows (unless notice is prohibited by law); the Service does not submit to arbitrary access without a legal basis.",
    "fr":    "Principes de traitement des demandes des autorités répressives et judiciaires : l'Opérateur ne communique des données que si la demande repose sur une base légale précise, vérifie la licéité et le périmètre de la demande, ne fournit pas de son propre chef de contenu allant au-delà de ce que la demande couvre et informe au préalable les personnes concernées dans la mesure permise par la loi (sauf interdiction légale) ; le Service ne se soumet à aucun accès arbitraire dépourvu de base légale.",
    "es":    "Principios de tratamiento de las solicitudes de las autoridades encargadas de la aplicación de la ley y judiciales: el Operador solo facilita datos cuando la solicitud se basa en un fundamento legal concreto, verifica la legalidad y el alcance de la solicitud, no facilita voluntariamente contenido que exceda lo solicitado y notifica con antelación a las personas afectadas cuando la ley lo permite (salvo prohibición legal); el Servicio no se somete a accesos arbitrarios sin fundamento legal.",
    "nl":    "Beginselen voor het afhandelen van verzoeken van handhavings- en justitiële autoriteiten: de Exploitant verstrekt gegevens alleen wanneer een verzoek op een concrete wettelijke basis rust, verifieert de rechtmatigheid en het bereik van het verzoek, verstrekt niet uit eigen beweging meer dan het verzoek dekt en stelt getroffenen waar de wet dat toelaat vooraf in kennis (tenzij de wet dat verbiedt); de Dienst onderwerpt zich niet aan willekeurige toegang zonder wettelijke basis.",
}
for lang in LANGS:
    insert_before_line(path_for(lang, "privacy-policy"), LE_ANCHOR[lang], LE_BLOCK[lang])

# ------------------------------------------- privacy s8: retention row, 90 days
RET_OLD = {
    "mail":  "| 帐号注销 | 会话即时失效；邮件进入软删除状态，至管理员执行实体删除为止 |",
    "zh-tw": "| 帳號註銷 | 工作階段即時失效；郵件進入軟刪除狀態，至管理員執行實體刪除為止 |",
    "en":    "| Account deactivation | sessions end immediately; mail enters a soft-deleted state until an administrator performs the hard deletion |",
    "fr":    "| Clôture du compte | Les sessions deviennent immédiatement invalides ; les courriels passent en état de suppression logique jusqu'à la suppression physique par un administrateur |",
    "es":    "| Cancelación de la cuenta | Las sesiones quedan invalidadas de inmediato; el correo pasa a un estado de eliminación lógica hasta que un administrador realice la supresión física |",
    "nl":    "| Opzegging van het account | sessies vervallen onmiddellijk; de e-mail komt in een zacht-verwijderde staat totdat een beheerder de fysieke verwijdering uitvoert |",
}
RET_NEW = {
    "mail":  "| 帐号注销 | 会话即时失效；邮件与资料进入软删除状态，除法令要求留存外，管理员于注销后 90 日内执行实体删除 |",
    "zh-tw": "| 帳號註銷 | 工作階段即時失效；郵件與資料進入軟刪除狀態，除法令要求留存外，管理員於註銷後 90 日內執行實體刪除 |",
    "en":    "| Account deactivation | sessions end immediately; mail enters a soft-deleted state and, unless retention is required by law, an administrator performs the hard deletion within 90 days |",
    "fr":    "| Clôture du compte | Les sessions deviennent immédiatement invalides ; les courriels passent en état de suppression logique et, sauf conservation exigée par la loi, un administrateur effectue la suppression physique dans les 90 jours |",
    "es":    "| Cancelación de la cuenta | Las sesiones quedan invalidadas de inmediato; el correo pasa a un estado de eliminación lógica y, salvo que la ley exija su conservación, un administrador realiza la supresión física en un plazo de 90 días |",
    "nl":    "| Opzegging van het account | sessies vervallen onmiddellijk; de e-mail komt in een zacht-verwijderde staat en, tenzij de wet bewaring vereist, voert een beheerder de fysieke verwijdering binnen 90 dagen uit |",
}
for lang in LANGS:
    replace(path_for(lang, "privacy-policy"), RET_OLD[lang], RET_NEW[lang])

# ------------------------------------------- sub-processors: R2 optional wording
R2_OLD = {
    "mail":  "对象存储（R2）",
    "zh-tw": "物件儲存（R2）",
    "en":    "object storage (R2)",
    "fr":    "stockage d'objets (R2)",
    "es":    "almacenamiento de objetos (R2)",
    "nl":    "objectopslag (R2)",
}
R2_NEW = {
    "mail":  "对象存储（R2，可选启用；未启用时附件经 KV 存储）",
    "zh-tw": "物件儲存（R2，可選啟用；未啟用時附件經 KV 儲存）",
    "en":    "object storage (R2, optional; when not enabled, attachments are stored in KV)",
    "fr":    "stockage d'objets (R2, optionnel ; lorsqu'il n'est pas activé, les pièces jointes sont stockées en KV)",
    "es":    "almacenamiento de objetos (R2, opcional; cuando no está activado, los adjuntos se almacenan en KV)",
    "nl":    "objectopslag (R2, optioneel; wanneer niet ingeschakeld, worden bijlagen in KV opgeslagen)",
}
for lang in LANGS:
    replace(path_for(lang, "sub-processors"), R2_OLD[lang], R2_NEW[lang])

# ----------------------------------------------------- AUP s6: technical limits
TECH_ANCHOR = {
    "mail":  "涉有违法行为者，运营者得保存必要证据",
    "zh-tw": "涉有違法行為者，營運者得保存必要證據",
    "en":    "Where conduct may be unlawful, the operator may preserve",
    "fr":    "En cas de comportement illicite, l'Opérateur peut conserver",
    "es":    "Cuando esté involucrada una conducta ilícita, el Operador puede conservar",
    "nl":    "Is sprake van onrechtmatig gedrag, dan kan de Exploitant",
}
TECH_BLOCK = {
    "mail":  "执行阶梯之技术基础：出站量受帐号角色之发信配额约束（普通用户每日 5 封、LV.0 每日 8 封、LV.1 每日 10 封、管理员每日 100 封；站长帐号不设上限），日发信计数每日重置；垃圾邮件隔离 7 日后转入回收站；信箱用量逾配额 90% 时，已标记删除之邮件径行实体删除。上述参数随角色与实例设置而异，以实例实际配置为准。",
    "zh-tw": "執行階梯之技術基礎：出站量受帳號角色之發信配額約束（普通使用者每日 5 封、LV.0 每日 8 封、LV.1 每日 10 封、管理員每日 100 封；站長帳號不設上限），日發信計數每日重置；垃圾郵件隔離 7 日後轉入回收站；信箱用量逾配額 90% 時，已標記刪除之郵件逕行實體刪除。上述參數隨角色與實例設定而異，以實例實際設定為準。",
    "en":    "Technical basis of the enforcement ladder: outbound volume is constrained by the sending quota of the account role (base users 5 messages/day, LV.0 8/day, LV.1 10/day, administrators 100/day; the master account is unlimited), with daily counters reset each day; spam is quarantined for 7 days and then moved to trash; when mailbox usage exceeds 90% of quota, mail already marked as deleted is hard-deleted immediately. These parameters vary with role and instance settings; the instance's actual configuration prevails.",
    "fr":    "Base technique de l'échelle d'exécution : le volume sortant est plafonné par le quota d'envoi du rôle du compte (utilisateurs de base 5 courriels/jour, LV.0 8/jour, LV.1 10/jour, administrateurs 100/jour ; le compte Webmestre est sans limite), les compteurs quotidiens étant réinitialisés chaque jour ; les pourriels sont mis en quarantaine 7 jours puis déplacés vers la corbeille ; lorsque la boîte dépasse 90 % du quota, les courriels déjà marqués comme supprimés sont immédiatement supprimés définitivement. Ces paramètres varient selon le rôle et la configuration de l'instance, laquelle prévaut.",
    "es":    "Base técnica de la escala de ejecución: el volumen saliente está limitado por la cuota de envío del rol de la cuenta (usuarios base 5 correos/día, LV.0 8/día, LV.1 10/día, administradores 100/día; la cuenta Webmaster no tiene límite), con contadores diarios que se restablecen cada día; el correo no deseado permanece en cuarentena 7 días y luego pasa a la papelera; cuando el buzón supera el 90 % de la cuota, el correo ya marcado como eliminado se suprime físicamente de inmediato. Estos parámetros varían según el rol y la configuración de la instancia, que prevalece.",
    "nl":    "Technische basis van de handhavingsladder: het uitgaande volume is begrensd door de verzendquota van de accountrol (gewone gebruikers 5 berichten/dag, LV.0 8/dag, LV.1 10/dag, beheerders 100/dag; het masteraccount is onbeperkt), met dagelijkse tellers die elke dag worden gereset; spam blijft 7 dagen in quarantaine en gaat daarna naar de prullenbak; bij mailboxgebruik boven 90 % van de quota wordt e-mail die al als verwijderd is gemarkeerd onmiddellijk fysiek verwijderd. Deze parameters verschillen per rol en instantieconfiguratie; de werkelijke configuratie van de instantie is leidend.",
}
for lang in LANGS:
    insert_before_line(path_for(lang, "acceptable-use"), TECH_ANCHOR[lang], TECH_BLOCK[lang])

# ------------------------------------------ AUP s8: IP notice & counter-notice
IP_SECTION = {
    "mail":  "## 8. 著作权与知识产权之通知与反通知\n\n权利人认为本服务所存载之内容侵害其著作权、商标权或其他合法权利者，得向运营者发出通知。通知应载明：被侵权权利之说明与权利证明、足以定位涉事内容之信息（如收件地址与邮件主题）、联络方式，以及有效签署之善意声明（声明该使用未经权利人授权）。运营者经核实后移除或限制接取涉事内容，并将处理结果通知通知人。\n\n被通知之用户认为其内容系误删或有正当理由者，得提交反通知，说明内容合法之理由并作善意声明；运营者将反通知转送原通知人。反复侵害他人权利者，运营者得依第 6 节执行阶梯升级处置，直至实体删除。明知不实之通知或反通知致他人受损害者，依法承担相应责任。",
    "zh-tw": "## 8. 著作權與智慧財產權之通知與反通知\n\n權利人認為本服務所存載之內容侵害其著作權、商標權或其他合法權利者，得向營運者發出通知。通知應載明：被侵權權利之說明與權利證明、足以定位涉事內容之資訊（如收件地址與郵件主題）、聯絡方式，以及有效簽署之善意聲明（聲明該使用未經權利人授權）。營運者經核實後移除或限制接取涉事內容，並將處理結果通知通知人。\n\n被通知之使用者認為其內容係誤刪或有正當理由者，得提交反通知，說明內容合法之理由並作善意聲明；營運者將反通知轉送原通知人。反覆侵害他人權利者，營運者得依第 6 節執行階梯升級處置，直至實體刪除。明知不實之通知或反通知致他人受損害者，依法承擔相應責任。",
    "en":    "## 8. Copyright and Intellectual Property Notice and Counter-Notice\n\nA rights holder who believes content stored on the Service infringes their copyright, trademark, or other lawful rights may send the operator a notice. The notice must state: a description of the infringed right and proof of ownership, information sufficient to locate the content (such as the recipient address and mail subject), contact details, and a duly signed good-faith statement that the use is unauthorised. After verification, the operator removes the content or restricts access to it and informs the notifier of the outcome.\n\nA user whose content has been removed and who believes the removal was mistaken may submit a counter-notice stating the reasons and a good-faith declaration; the operator forwards the counter-notice to the original notifier. Users who repeatedly infringe the rights of others face escalation under the Section 6 enforcement ladder, up to hard deletion. Notices and counter-notices made in bad faith that harm others may give rise to legal liability.",
    "fr":    "## 8. Avis et contre-avis relatifs au droit d'auteur et à la propriété intellectuelle\n\nLe titulaire de droits qui estime qu'un contenu hébergé sur le Service porte atteinte à son droit d'auteur, à sa marque ou à d'autres droits légitimes peut adresser un avis à l'Opérateur. L'avis précise : la description du droit violé et la preuve de titularité, les informations permettant de localiser le contenu en cause (adresse du destinataire et objet du courriel, par exemple), les coordonnées de contact, ainsi qu'une déclaration de bonne foi dûment signée indiquant que l'utilisation n'est pas autorisée. Après vérification, l'Opérateur retire le contenu ou en restreint l'accès et informe l'auteur de l'avis du résultat.\n\nL'utilisateur dont le contenu a été retiré et qui estime que ce retrait est erroné peut soumettre un contre-avis exposant ses raisons et assorti d'une déclaration de bonne foi ; l'Opérateur transmet le contre-avis à l'auteur de l'avis initial. Les atteintes répétées aux droits d'autrui exposent l'utilisateur à une escalade selon l'échelle d'exécution de la section 6, jusqu'à la suppression définitive. Les avis et contre-avis de mauvaise foi causant un préjudice à autrui peuvent engager la responsabilité de leur auteur.",
    "es":    "## 8. Notificación y contra-notificación por derechos de autor y propiedad intelectual\n\nEl titular de derechos que considere que un contenido alojado en el Servicio vulnera sus derechos de autor, su marca u otros derechos legítimos puede enviar una notificación al Operador. La notificación debe indicar: la descripción del derecho vulnerado y la prueba de titularidad, la información suficiente para localizar el contenido (como la dirección del destinatario y el asunto del correo), los datos de contacto y una declaración de buena fe debidamente firmada de que el uso no está autorizado. Tras la verificación, el Operador suprime el contenido o restringe su acceso e informa del resultado al notificante.\n\nEl usuario cuyo contenido haya sido suprimido y que considere que la supresión es errónea puede presentar una contra-notificación que exponga sus razones junto con una declaración de buena fe; el Operador la trasladará al notificante original. La vulneración reiterada de derechos ajenos expone al usuario a la escalada de la Sección 6, hasta la supresión física. Las notificaciones y contra-notificaciones de mala fe que perjudiquen a terceros pueden generar responsabilidad legal.",
    "nl":    "## 8. Melding en tegenmelding inzake auteursrecht en intellectuele eigendom\n\nEen rechtenhouder die van mening is dat inhoud op de Dienst inbreuk maakt op zijn auteursrecht, merk of andere rechten kan een melding sturen aan de Exploitant. De melding vermeldt: een omschrijving van het geschonden recht en bewijs van rechtheidschap, voldoende informatie om de inhoud te lokaliseren (zoals het adres van de ontvanger en het onderwerp van de e-mail), contactgegevens en een naar behoren ondertekende verklaring in goed vertrouwen dat het gebruik niet is toegestaan. Na verificatie verwijdert de Exploitant de inhoud of beperkt hij de toegang ertoe en stelt hij de melder van de uitkomst in kennis.\n\nEen gebruiker wiens inhoud is verwijderd en die van mening is dat dit ten onrechte gebeurde, kan een tegenmelding indienen met zijn redenen en een verklaring in goed vertrouwen; de Exploitant stuurt de tegenmelding door aan de oorspronkelijke melder. Herhaalde inbreuken op de rechten van anderen leiden tot escalatie volgens de handhavingsladder van paragraaf 6, tot fysieke verwijdering aan toe. Meldingen en tegenmeldingen die te kwader trouw worden gedaan en anderen schaden, kunnen tot aansprakelijkheid leiden.",
}
FOOTER_PREFIX = {
    "mail":  "*本文件不构成法律意见",
    "zh-tw": "*本文件不構成法律意見",
    "fr":    "*Le présent document ne constitue pas",
    "es":    "*Este documento no constituye asesoramiento",
    "nl":    "*Dit document vormt geen juridisch advies",
}
for lang in LANGS:
    p = path_for(lang, "acceptable-use")
    if lang == "en":
        append_section(p, IP_SECTION["en"])
    else:
        anchor = "\n---\n\n" + FOOTER_PREFIX[lang]
        text = p.read_text(encoding="utf-8")
        if text.count(anchor) != 1:
            errors.append(f"{p.relative_to(ROOT)}: AUP footer anchor found {text.count(anchor)}x")
            continue
        p.write_text(
            text.replace(anchor, "\n\n" + IP_SECTION[lang] + "\n\n---\n\n" + FOOTER_PREFIX[lang]),
            encoding="utf-8", newline="",
        )

# ------------------------------------------------------------ ToS: age + 90 days
AGE_OLD = {
    "mail":  "2. **资格**：您应确认年满 14 岁；未满 14 岁者不得使用本服务。您并应确保注册与使用行为于您所在地法律允许之范围内为之。",
    "zh-tw": "2. **資格**：您應確認年滿 14 歲；未滿 14 歲者不得使用本服務。您並應確保註冊與使用行為於您所在地法律允許之範圍內為之。",
    "en":    "2. **Eligibility**: you confirm you are at least 14 years old; children under 14 may not use the Service. You must also ensure your registration and use comply with the law of your location.",
    "fr":    "2. **Conditions d'admission** : vous confirmez être âgé d'au moins 14 ans ; les personnes de moins de 14 ans ne peuvent pas utiliser le Service. Vous devez en outre veiller à ce que votre inscription et votre usage demeurent dans les limites permises par le droit du lieu où vous vous trouvez.",
    "es":    "2. **Requisitos de edad**: usted confirma que tiene al menos 14 años de edad; las personas menores de 14 años no pueden utilizar el Servicio. Debe asimismo asegurarse de que su registro y uso cumplen las leyes de su lugar de residencia.",
    "nl":    "2. **Geschiktheid**: u bevestigt dat u 14 jaar of ouder bent; personen jonger dan 14 mogen de Dienst niet gebruiken. U zorgt er tevens voor dat uw registratie en gebruik binnen het recht van uw woonplaats blijven.",
}
AGE_NEW = {
    "mail":  "2. **资格**：您应确认年满 14 岁；未满 14 岁者不得使用本服务。年龄以您注册时之诚实申报为准，本服务未设独立之年龄验证机制；发现不实申报者，运营者得终止帐号并删除其资料。您并应确保注册与使用行为于您所在地法律允许之范围内为之。",
    "zh-tw": "2. **資格**：您應確認年滿 14 歲；未滿 14 歲者不得使用本服務。年齡以您註冊時之誠實申報為準，本服務未設獨立之年齡驗證機制；發現不實申報者，營運者得終止帳號並刪除其資料。您並應確保註冊與使用行為於您所在地法律允許之範圍內為之。",
    "en":    "2. **Eligibility**: you confirm you are at least 14 years old; children under 14 may not use the Service. Age is taken on your honest declaration at registration; the Service has no separate age-verification mechanism, and where a declaration proves false the operator may terminate the account and delete its data. You must also ensure your registration and use comply with the law of your location.",
    "fr":    "2. **Conditions d'admission** : vous confirmez être âgé d'au moins 14 ans ; les personnes de moins de 14 ans ne peuvent pas utiliser le Service. L'âge repose sur la déclaration sincère faite lors de l'inscription ; le Service ne dispose d'aucun mécanisme distinct de vérification de l'âge, et en cas de fausse déclaration l'Opérateur peut clôturer le compte et supprimer ses données. Vous devez en outre veiller à ce que votre inscription et votre usage demeurent dans les limites permises par le droit du lieu où vous vous trouvez.",
    "es":    "2. **Requisitos de edad**: usted confirma que tiene al menos 14 años de edad; las personas menores de 14 años no pueden utilizar el Servicio. La edad se basa en su declaración honesta al registrarse; el Servicio no dispone de un mecanismo independiente de verificación de la edad, y si la declaración resulta falsa, el Operador puede cancelar la cuenta y suprimir sus datos. Debe asimismo asegurarse de que su registro y uso cumplen las leyes de su lugar de residencia.",
    "nl":    "2. **Geschiktheid**: u bevestigt dat u 14 jaar of ouder bent; personen jonger dan 14 mogen de Dienst niet gebruiken. De leeftijd is gebaseerd op uw eerlijke verklaring bij registratie; de Dienst heeft geen afzonderlijk leeftijdsverificatiemechanisme, en bij een onjuiste verklaring kan de Exploitant het account beëindigen en de gegevens verwijderen. U zorgt er tevens voor dat uw registratie en gebruik binnen het recht van uw woonplaats blijven.",
}
TERM_OLD = {
    "mail":  "1. **您终止**：您得随时于设置中自助注销帐号，或请求运营者删除。注销后会话即时失效；邮件进入软删除状态，至管理员执行实体删除为止。",
    "zh-tw": "1. **您終止**：您得隨時於設定中自助註銷帳號，或請求營運者刪除。註銷後工作階段即時失效；郵件進入軟刪除狀態，至管理員執行實體刪除為止。",
    "en":    "1. **You terminate**: you can deactivate your account yourself in Settings at any time, or ask the operator to delete it. After deactivation, sessions end immediately and mail enters a soft-deleted state until an administrator performs the hard deletion.",
    "fr":    "1. **Clôture par vous** : vous pouvez à tout moment clôturer votre compte en libre-service depuis les paramètres, ou demander sa suppression à l'Opérateur. Après la clôture, les sessions deviennent immédiatement invalides ; les courriels passent en état de suppression logique jusqu'à la suppression physique par un administrateur.",
    "es":    "1. **Baja por su parte**: puede cancelar su cuenta en cualquier momento mediante el autoservicio en la configuración, o solicitar al Operador que la elimine. Tras la cancelación, las sesiones quedan invalidadas de inmediato; el correo pasa a un estado de eliminación lógica hasta que un administrador realice la supresión física.",
    "nl":    "1. **Beëindiging door u**: u kunt uw account op elk moment zelf opzeggen via de instellingen, of de Exploitant verzoeken het te verwijderen. Na opzegging vervallen sessies onmiddellijk; de e-mail komt in een zacht-verwijderde staat totdat een beheerder de fysieke verwijdering uitvoert.",
}
TERM_NEW = {
    "mail":  "1. **您终止**：您得随时于设置中自助注销帐号，或请求运营者删除。注销后会话即时失效；邮件进入软删除状态，除法令要求留存外，管理员于注销后 90 日内执行实体删除。",
    "zh-tw": "1. **您終止**：您得隨時於設定中自助註銷帳號，或請求營運者刪除。註銷後工作階段即時失效；郵件進入軟刪除狀態，除法令要求留存外，管理員於註銷後 90 日內執行實體刪除。",
    "en":    "1. **You terminate**: you can deactivate your account yourself in Settings at any time, or ask the operator to delete it. After deactivation, sessions end immediately and mail enters a soft-deleted state; unless retention is required by law, an administrator performs the hard deletion within 90 days.",
    "fr":    "1. **Clôture par vous** : vous pouvez à tout moment clôturer votre compte en libre-service depuis les paramètres, ou demander sa suppression à l'Opérateur. Après la clôture, les sessions deviennent immédiatement invalides ; les courriels passent en état de suppression logique et, sauf conservation exigée par la loi, un administrateur effectue la suppression physique dans les 90 jours.",
    "es":    "1. **Baja por su parte**: puede cancelar su cuenta en cualquier momento mediante el autoservicio en la configuración, o solicitar al Operador que la elimine. Tras la cancelación, las sesiones quedan invalidadas de inmediato; el correo pasa a un estado de eliminación lógica y, salvo que la ley exija su conservación, un administrador realiza la supresión física en un plazo de 90 días.",
    "nl":    "1. **Beëindiging door u**: u kunt uw account op elk moment zelf opzeggen via de instellingen, of de Exploitant verzoeken het te verwijderen. Na opzegging vervallen sessies onmiddellijk; de e-mail komt in een zacht-verwijderde staat en, tenzij de wet bewaring vereist, voert een beheerder de fysieke verwijdering binnen 90 dagen uit.",
}
for lang in LANGS:
    replace(path_for(lang, "terms-of-service"), AGE_OLD[lang], AGE_NEW[lang])
    replace(path_for(lang, "terms-of-service"), TERM_OLD[lang], TERM_NEW[lang])

# ------------------------------------------------------------------- report
if errors:
    print("FAILED anchors:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
print("apply-v58: all replacements applied cleanly.")
