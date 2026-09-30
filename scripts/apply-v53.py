#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply-v53.py — EpomailDocs v5.3 内容修订（对应主仓 v5.2 独立复审 P1/P2 治理）
逐处断言：任何替换未精确命中即抛错退出，不产生半套修改。
运行：python scripts/apply-v53.py  （在 EpomailDocs 仓库根执行）
"""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / 'src' / 'content' / 'docs'
LOCALES = ['mail', 'zh-tw', 'en', 'fr', 'es', 'nl']  # mail = 简中 root
M = dict(zip(LOCALES, ['zh', 'zh-tw', 'en', 'fr', 'es', 'nl']))

changed = []

def doc_path(doc, loc):
    # root 语种的目录即 mail/（Starlight root 约定），其余语种为 {loc}/mail/
    return DOCS / loc / 'mail' / f'{doc}.md' if loc != 'mail' else DOCS / 'mail' / f'{doc}.md'

def load(doc, loc):
    return doc_path(doc, loc).read_text(encoding='utf-8')

def save(doc, loc, text):
    p = doc_path(doc, loc)
    p.write_text(text, encoding='utf-8', newline='\n')
    changed.append(str(p.relative_to(ROOT)))

def rep(text, old, new, tag):
    if old not in text and new in text:
        return text  # 幂等：已应用
    n = text.count(old)
    assert n == 1, f'[{tag}] 期望命中 1 次，实际 {n} 次：{old[:80]}...'
    return text.replace(old, new)

def rep_line(text, anchor, new_line, tag):
    """整行替换：按唯一锚点定位行。"""
    lines = text.split('\n')
    hits = [i for i, l in enumerate(lines) if anchor in l]
    assert len(hits) == 1, f'[{tag}] 锚点命中 {len(hits)} 行：{anchor}'
    lines[hits[0]] = new_line
    return '\n'.join(lines)

def rep_cell(text, keyword, new_cell, tag):
    """表格行内单元格替换：从含 keyword 的片段到行尾 '|'。"""
    pat = re.compile(r'[^|\n]*' + re.escape(keyword) + r'[^|\n]*\|')
    matches = pat.findall(text)
    assert len(matches) == 1, f'[{tag}] 单元格模式命中 {len(matches)} 次：{keyword}'
    return text.replace(matches[0], new_cell)

def insert_before_line(text, anchor, new_line, tag):
    lines = text.split('\n')
    hits = [i for i, l in enumerate(lines) if anchor in l]
    assert len(hits) == 1, f'[{tag}] 插入锚点命中 {len(hits)} 行：{anchor}'
    lines.insert(hits[0], new_line)
    return '\n'.join(lines)

def insert_after_line(text, anchor, new_line, tag):
    lines = text.split('\n')
    hits = [i for i, l in enumerate(lines) if anchor in l]
    assert len(hits) == 1, f'[{tag}] 插入锚点命中 {len(hits)} 行：{anchor}'
    lines.insert(hits[0] + 1, new_line)
    return '\n'.join(lines)

# ============================================================
# 1. 版本行 5.2 → 5.3（48 文件；project.md 六语种缺行则补齐）
# ============================================================
VERSION_LINE = {
    'zh':    '**生效日期：2026 年 9 月 30 日｜版本：5.3**',
    'zh-tw': '**生效日期：2026 年 9 月 30 日｜版本：5.3**',
    'en':    '**Effective date: September 30, 2026 | Version: 5.3**',
    'fr':    "**Date d'entrée en vigueur : 30 septembre 2026 | Version : 5.3**",
    'es':    '**Fecha de entrada en vigor: 30 de septiembre de 2026 | Versión: 5.3**',
    'nl':    '**Datum van inwerkingtreding: 30 september 2026 | Versie: 5.3**',
}
for loc in LOCALES:
    for doc in ['project', 'overview', 'privacy-policy', 'terms-of-service',
                'acceptable-use', 'data-security', 'sub-processors', 'key-terms']:
        text = load(doc, loc)
        lines = text.split('\n')
        hits = [i for i, l in enumerate(lines) if l.startswith('**') and '5.2' in l and l.endswith('**')]
        if [i for i, l in enumerate(lines) if l.startswith('**') and '5.3' in l and l.endswith('**')]:
            continue  # 幂等：早前中断运行已升级该文件
        if len(hits) == 0:
            # project.md 全语种此前缺「生效日期｜版本」行（历史缺口），本次在表头加粗行后补齐
            assert doc == 'project', f'[版本行] {loc}/{doc} 无 5.2 版本行'
            assert lines[5].strip().startswith('**') and lines[5].strip().endswith('**'), f'[版本行] {loc}/project 表头行异常: {lines[5][:50]}'
            lines.insert(6, VERSION_LINE[M[loc]])
        else:
            assert len(hits) == 1, f'[版本行] {loc}/{doc} 命中 {len(hits)} 行'
            lines[hits[0]] = lines[hits[0]].replace('5.2', '5.3')
        save(doc, loc, '\n'.join(lines))
print(f'版本行: {len(changed)} 处')

# ============================================================
# 2. sub-processors：博客行去重 + 头像图床行实名/条件化
# ============================================================
AVATAR_ROW = {
    'zh':    '| 头像图床（缺省：实例自有对象存储；运营者可经环境变量配置外部图床） | 头像与图片存储 | 上传之图片文件本身 | 仅于上传头像等图片时；配置外部图床者，图片文件传输至该图床 |',
    'zh-tw': '| 頭像圖床（預設：實例自有物件儲存；營運者得經環境變數配置外部圖床） | 頭像與圖片儲存 | 上傳之圖片檔案本身 | 僅於上傳頭像等圖片時；配置外部圖床者，圖片檔案傳輸至該圖床 |',
    'en':    "| Avatar image host (default: the instance's own object storage; the Operator may configure an external host via an environment variable) | Avatar and image storage | The image files themselves | Only when uploading avatars and similar images; if an external host is configured, the image files are transmitted to that host |",
    'fr':    "| Hébergeur d'images d'avatar (par défaut : le stockage d'objets propre à l'instance ; l'Opérateur peut configurer un hébergeur externe via une variable d'environnement) | stockage des avatars et des images | le fichier image lui-même | uniquement lors du téléversement d'un avatar ou d'une image ; si un hébergeur externe est configuré, les fichiers image sont transmis à cet hébergeur |",
    'es':    '| Servicio de alojamiento de imágenes de avatar (por defecto: el almacenamiento de objetos propio de la instancia; el Operador puede configurar un servicio externo mediante una variable de entorno) | Almacenamiento de avatares e imágenes | Los propios archivos de imagen | Únicamente al cargar avatares e imágenes similares; si se configura un servicio externo, los archivos de imagen se transmiten a dicho servicio |',
    'nl':    '| Avatar-afbeeldingshost (standaard: de eigen objectopslag van de instance; de Exploitant kan via een omgevingsvariabele een externe host configureren) | opslag van avatars en afbeeldingen | het afbeeldingsbestand zelf | alleen bij het uploaden van avatars en dergelijke afbeeldingen; als een externe host is geconfigureerd, worden de afbeeldingsbestanden naar die host verzonden |',
}
AVATAR_ANCHOR = {
    'zh': '图片上传服务', 'zh-tw': '圖片上傳服務', 'en': 'Image upload service',
    'fr': "Service de téléversement d'images", 'es': 'Servicio de carga de imágenes',
    'nl': 'Afbeeldingsuploaddienst',
}
for loc in LOCALES:
    text = load('sub-processors', loc)
    if AVATAR_ROW[M[loc]][:40] in text:
        continue  # 幂等：该语种已完成
    lines = text.split('\n')
    blog = [i for i, l in enumerate(lines) if 'blog.epocanvas.com' in l]
    assert len(blog) == 2, f'[博客行] {loc} 命中 {len(blog)} 行（应恰为重复的 2 行）'
    assert lines[blog[0]] == lines[blog[1]], f'[博客行] {loc} 两行内容不同？'
    del lines[blog[1]]
    text = '\n'.join(lines)
    text = rep_line(text, AVATAR_ANCHOR[M[loc]], AVATAR_ROW[M[loc]], f'头像行 {loc}')
    save('sub-processors', loc, text)
print('sub-processors: 博客行去重 + 头像行修订 完成')

# ============================================================
# 3. privacy-policy：§2 遥测但书、§4.1 头像、§4.2 存储链、§8 欢迎邮件保留行
# ============================================================
TELEMETRY_CELL = {
    'zh':    '开源代码不含遥测机制；除运营者自行配置之外部服务外，不向上游作者或任何第三方回传实例资料 |',
    'zh-tw': '開放原始碼不含遙測機制；除營運者自行配置之外部服務外，不向上游作者或任何第三方回傳實例資料 |',
    'en':    'the open source code contains no telemetry mechanism; apart from external services configured by the Operator itself, it does not send instance data back to the upstream authors or any third party |',
    'fr':    "le code open source ne contient aucun mécanisme de télémétrie ; hors les services externes configurés par l'Opérateur lui-même, il ne renvoie aucune donnée de l'instance vers les auteurs amont ou un tiers |",
    'es':    'el código abierto no contiene ningún mecanismo de telemetría; salvo los servicios externos configurados por el propio Operador, no devuelve datos de la instancia a los autores ascendentes ni a terceros |',
    'nl':    'de open source-broncode bevat geen telemetriemechanisme; afgezien van externe diensten die door de Exploitant zelf worden geconfigureerd, worden geen instance-gegevens naar de upstream-auteurs of derden teruggestuurd |',
}
TELEMETRY_KEY = {'zh': '遥测', 'zh-tw': '遙測', 'en': 'telemetry', 'fr': 'télémétrie', 'es': 'telemetría', 'nl': 'telemetrie'}

AVATAR_BULLET = {
    'zh':    '- **个人资料（选填）**：昵称、头像、个人简介；头像图片缺省存储于实例自有对象存储（KV），运营者亦可经环境变量配置外部图床（见[第三方处理者清单](/mail/sub-processors/)）。',
    'zh-tw': '- **個人資料（選填）**：暱稱、頭像、個人簡介；頭像圖片預設儲存於實例自有物件儲存（KV），營運者亦得經環境變數配置外部圖床（見[第三方處理者清單](/zh-tw/mail/sub-processors/)）。',
    'en':    "- **Profile data (optional)**: nickname, avatar, and bio; avatar images are stored in the instance's own object storage (KV) by default, and the Operator may alternatively configure an external image host via an environment variable (see [Sub-processors](/en/mail/sub-processors/)).",
    'fr':    "- **Données de profil (facultatif)** : pseudonyme, avatar, présentation personnelle ; les images d'avatar sont stockées par défaut dans le stockage d'objets propre à l'instance (KV), et l'Opérateur peut configurer un hébergeur d'images externe via une variable d'environnement (voir [Sous-traitants](/fr/mail/sub-processors/)).",
    'es':    '- **Datos de perfil (opcionales)**: apodo, avatar y biografía; las imágenes de avatar se almacenan por defecto en el almacenamiento de objetos propio de la instancia (KV), y el Operador puede configurar un servicio externo de alojamiento de imágenes mediante una variable de entorno (véase [Encargados del tratamiento](/es/mail/sub-processors/)).',
    'nl':    '- **Profielgegevens (optioneel)**: nickname, avatar en persoonlijke omschrijving; afbeeldingen van avatars worden standaard opgeslagen in de eigen objectopslag van de instance (KV), en de Exploitant kan via een omgevingsvariabele een externe afbeeldingshostingdienst configureren (zie [Verwerkers](/nl/mail/sub-processors/)).',
}
AVATAR_BULLET_ANCHOR = {
    'zh': '头像上传至', 'zh-tw': '頭像上傳', 'en': 'avatars are uploaded',
    'fr': 'les avatars sont téléversés', 'es': 'los avatares se cargan', 'nl': 'avatars worden geüpload',
}

STORAGE_PAREN = {
    'zh':    '（按实例配置依序解析：您自备之 S3 兼容存储、运营者配置之 S3 兼容存储、Cloudflare R2 绑定；均未配置时落于 Cloudflare KV）',
    'zh-tw': '（依實例配置依序解析：您自備之 S3 相容儲存、營運者配置之 S3 相容儲存、Cloudflare R2 綁定；均未配置時落於 Cloudflare KV）',
    'en':    "(resolved in order according to instance configuration: your own S3-compatible storage, an Operator-configured S3-compatible store, a Cloudflare R2 binding; falling back to Cloudflare KV when none is configured)",
    'fr':    "(résolu dans l'ordre selon la configuration de l'instance : votre propre stockage compatible S3, un stockage compatible S3 configuré par l'Opérateur, une liaison Cloudflare R2 ; à défaut, Cloudflare KV)",
    'es':    '(resuelto en orden según la configuración de la instancia: su propio almacenamiento compatible con S3, un almacén compatible con S3 configurado por el Operador, un enlace de Cloudflare R2; en su defecto, Cloudflare KV)',
    'nl':    '(in volgorde van instantieconfiguratie: uw eigen S3-compatibele opslag, door de Exploitant geconfigureerde S3-compatibele opslag, een Cloudflare R2-binding; bij ontbreken daarvan Cloudflare KV)',
}

QUOTA_ANCHOR = {'zh': '90%', 'zh-tw': '90%', 'en': '90%', 'fr': '90 %', 'es': '90 %', 'nl': '90 %'}
WELCOME_ROW = {
    'zh':    '| 官方系统邮件（欢迎邮件、全域公告） | 缺省自投递之日起 7 日自动过期删除，运营者得另行配置过期天数 |',
    'zh-tw': '| 官方系統郵件（歡迎郵件、全域公告） | 預設自投遞之日起 7 日自動過期刪除，營運者得另行配置過期天數 |',
    'en':    '| Official system emails (welcome emails, global announcements) | Auto-expire and are deleted 7 days after delivery by default; the Operator may configure the expiry period |',
    'fr':    "| Courriels officiels du système (courriels de bienvenue, annonces globales) | expiration et suppression automatiques 7 jours après l'envoi par défaut ; l'Opérateur peut configurer le délai |",
    'es':    '| Correos oficiales del sistema (correos de bienvenida, anuncios globales) | Caducan y se suprimen automáticamente 7 días después de la entrega por defecto; el Operador puede configurar el plazo |',
    'nl':    '| Officiële systeem-e-mails (welkomst-e-mails, globale aankondigingen) | vervallen en worden standaard 7 dagen na bezorging automatisch gewist; de Exploitant kan de termijn configureren |',
}

for loc in LOCALES:
    text = load('privacy-policy', loc)
    if WELCOME_ROW[M[loc]][:30] in text:
        continue  # 幂等
    text = rep_cell(text, TELEMETRY_KEY[M[loc]], TELEMETRY_CELL[M[loc]], f'遥测但书 {loc}')
    text = rep_line(text, AVATAR_BULLET_ANCHOR[M[loc]], AVATAR_BULLET[M[loc]], f'头像 {loc}')
    if M[loc] in ('zh', 'zh-tw'):
        text = re.sub(r'（Cloudflare R2[^（）]*）', STORAGE_PAREN[M[loc]], text, count=1)
    else:
        text = re.sub(r'\(Cloudflare R2[^()]*\)', STORAGE_PAREN[M[loc]], text, count=1)
    text = insert_before_line(text, QUOTA_ANCHOR[M[loc]], WELCOME_ROW[M[loc]], f'欢迎邮件行 {loc}')
    save('privacy-policy', loc, text)
print('privacy-policy: 4 项修订 完成')

# ============================================================
# 4. data-security：附件行存储媒体补四级链
# ============================================================
DS_CELL = {
    'zh':    '实例自有对象存储（依序解析：自备或运营者配置之 S3 兼容存储、Cloudflare R2 绑定，缺省 Cloudflare KV）；下载采防御性标头',
    'zh-tw': '實例自有物件儲存（依序解析：自備或營運者配置之 S3 相容儲存、Cloudflare R2 綁定，預設 Cloudflare KV）；下載採防禦性標頭',
    'en':    "the instance's own object storage (resolved in order: BYO or Operator-configured S3-compatible storage, a Cloudflare R2 binding, defaulting to Cloudflare KV); downloads use defensive headers",
    'fr':    "le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré par l'Opérateur, liaison Cloudflare R2, par défaut Cloudflare KV) ; téléchargements avec en-têtes défensifs",
    'es':    'el almacenamiento de objetos propio de la instancia (resuelto en orden: almacenamiento compatible con S3 propio o configurado por el Operador, enlace de Cloudflare R2, por defecto Cloudflare KV); descargas con cabeceras defensivas',
    'nl':    'de eigen objectopslag van de instance (in volgorde: eigen of door de Exploitant geconfigureerde S3-compatibele opslag, een Cloudflare R2-binding, standaard Cloudflare KV); downloads met defensieve headers',
}
DS_ROW_ANCHOR = {'zh': '| 附件 |', 'zh-tw': '| 附件 |', 'en': '| Attachments |', 'fr': '| Pièces jointes |', 'es': '| Adjuntos |', 'nl': '| Bijlagen |'}
for loc in LOCALES:
    text = load('data-security', loc)
    lines = text.split('\n')
    hits = [i for i, l in enumerate(lines) if l.startswith(DS_ROW_ANCHOR[M[loc]]) and 'Cloudflare R2' in l]
    assert len(hits) == 1, f'[附件行] {loc} 命中 {len(hits)} 行'
    new_line = re.sub(r'Cloudflare R2[^|]*', DS_CELL[M[loc]].replace('\\', '\\\\'), lines[hits[0]], count=1)
    lines[hits[0]] = new_line
    save('data-security', loc, '\n'.join(lines))
print('data-security: 附件行 完成')

# ============================================================
# 5. overview：§2 上游不接触实例资料 → 加运营者自配但书
# ============================================================
OVERVIEW_CARVE = {
    'zh':    ('；上游作者不接触任何实例之运营资料。', '；除实例运营者自行配置之外部服务外，上游作者不接触任何实例之运营资料。'),
    'zh-tw': ('；上游作者不接觸任何實例之營運資料。', '；除實例營運者自行配置之外部服務外，上游作者不接觸任何實例之營運資料。'),
    'en':    ('; the upstream authors have no access to the operational data of any instance.',
              '; apart from external services configured by the instance Operator itself, the upstream authors have no access to the operational data of any instance.'),
    'fr':    (" ; les auteurs du projet amont n'ont accès aux données d'exploitation d'aucune instance.",
              " ; hors les services externes configurés par l'Opérateur de l'instance elle-même, les auteurs du projet amont n'ont accès aux données d'exploitation d'aucune instance."),
    'es':    ('; los autores ascendentes no tienen acceso a los datos operativos de ninguna instancia.',
              '; salvo los servicios externos configurados por el propio Operador de la instancia, los autores ascendentes no tienen acceso a los datos operativos de ninguna instancia.'),
    'nl':    ('; de upstream-auteurs komen niet in aanraking met de operationele gegevens van enige instance.',
              '; afgezien van externe diensten die door de Exploitant van de instance zelf worden geconfigureerd, komen de upstream-auteurs niet in aanraking met de operationele gegevens van enige instance.'),
}
for loc in LOCALES:
    text = load('overview', loc)
    old, new = OVERVIEW_CARVE[M[loc]]
    text = rep(text, old, new, f'overview 但书 {loc}')
    save('overview', loc, text)
print('overview: 但书 完成')

# ============================================================
# 6. project：附件存储行、i18n 键数行、tests 行×2、提交数句、提交链补 v5.2
# ============================================================
PROJ_STORAGE_ROW = {
    'zh':    '| 附件存储 | 实例自有对象存储（依序解析：自备或配置之 S3 兼容存储、Cloudflare R2 绑定，缺省 Cloudflare KV），配额计量 |',
    'zh-tw': '| 附件儲存 | 實例自有物件儲存（依序解析：自備或配置之 S3 相容儲存、Cloudflare R2 綁定，預設 Cloudflare KV），配額計量 |',
    'en':    "| Attachment storage | The instance's own object storage (resolved in order: BYO or configured S3-compatible storage, a Cloudflare R2 binding, defaulting to Cloudflare KV), with quota metering |",
    'fr':    "| Stockage des pièces jointes | le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré, liaison Cloudflare R2, par défaut Cloudflare KV), avec comptage de quota |",
    'es':    '| Almacenamiento de adjuntos | El almacenamiento de objetos propio de la instancia (resuelto en orden: almacenamiento compatible con S3 propio o configurado, enlace de Cloudflare R2, por defecto Cloudflare KV), con medición de cuota |',
    'nl':    '| Bijlageopslag | De eigen objectopslag van de instance (in volgorde: eigen of geconfigureerde S3-compatibele opslag, een Cloudflare R2-binding, standaard Cloudflare KV), met quotummeting |',
}
PROJ_STORAGE_ANCHOR = {
    'zh': '| 附件存储 |', 'zh-tw': '| 附件儲存 |', 'en': '| Attachment storage |',
    'fr': '| Stockage des pièces jointes |', 'es': '| Almacenamiento de adjuntos |', 'nl': '| Bijlageopslag |',
}
PROJ_I18N_ROW = {
    'zh':    '- 六种界面语言：简体中文、繁体中文、English、Français、Español、Nederlands；前后端字典六语言 100% 对称（键数以 `scripts/i18n-*.mjs` 静态审计输出为准），保障用户可见文本零硬编码泄漏；',
    'zh-tw': '- 六種介面語言：簡體中文、繁體中文、English、Français、Español、Nederlands；前後端字典六語言 100% 對稱（鍵數以 `scripts/i18n-*.mjs` 靜態稽核輸出為準），保障使用者可見文字零硬編碼洩漏；',
    'en':    '- Six interface languages: Simplified Chinese, Traditional Chinese, English, Français, Español, Nederlands; the frontend and backend dictionaries are 100% symmetric across all six languages (key counts per the `scripts/i18n-*.mjs` static audit output), guaranteeing zero hardcoded user-visible strings;',
    'fr':    "- Six langues d'interface : chinois simplifié, chinois traditionnel, English, Français, Español, Nederlands ; les dictionnaires frontal et dorsal sont 100 % symétriques entre les six langues (nombre de clés selon la sortie de l'audit statique `scripts/i18n-*.mjs`), garantissant zéro chaîne visible codée en dur ;",
    'es':    '- Seis idiomas de interfaz: chino simplificado, chino tradicional, English, Français, Español, Nederlands; los diccionarios de frontend y backend son 100 % simétricos en los seis idiomas (número de claves según la salida de la auditoría estática `scripts/i18n-*.mjs`), garantizando cero cadenas visibles codificadas de forma rígida;',
    'nl':    '- Zes interfacestalen: Vereenvoudigd Chinees, Traditioneel Chinees, English, Français, Español, Nederlands; de frontend- en backend-woordenboeken zijn 100% symmetrisch over de zes talen (sleutelaantallen volgens de statische audituitvoer van `scripts/i18n-*.mjs`), wat nul hardgecodeerde zichtbare teksten garandeert;',
}
PROJ_I18N_ANCHOR = {'zh': '2,039', 'zh-tw': '2,039', 'en': '2,039', 'fr': '2 039', 'es': '2.039', 'nl': '2.039'}
PROJ_TESTS_ROW = {
    'zh':    '| `tests` | 自动化测试、审计与巡检脚本逾百个（Playwright 全真栈、公网端到端、静态扫描） |',
    'zh-tw': '| `tests` | 自動化測試、稽核與巡檢腳本逾百個（Playwright 全真環境、公網端對端、靜態掃描） |',
    'en':    '| `tests` | Over one hundred automated test, audit, and inspection scripts (Playwright full-stack, public end-to-end, static scans) |',
    'fr':    "| `tests` | Plus d'une centaine de scripts de test, d'audit et d'inspection automatisés (Playwright pleine pile, bout-en-bout public, analyses statiques) |",
    'es':    '| `tests` | Más de un centenar de scripts de pruebas, auditoría e inspección automatizadas (Playwright de pila completa, extremo a extremo público, análisis estáticos) |',
    'nl':    '| `tests` | Ruim honderd geautomatiseerde test-, audit- en inspectiescripts (Playwright full-stack, publiek end-to-end, statische scans) |',
}
PROJ_TESTS_BULLET_OLD = {
    'zh': '105 个自动化测试', 'zh-tw': '105 個自動化測試', 'en': 'holds 105 automated',
    'fr': 'contient 105 scripts', 'es': 'contiene 105 scripts', 'nl': 'bevat 105 geautomatiseerde',
}
PROJ_TESTS_BULLET_NEW = {
    'zh': '逾百个自动化测试', 'zh-tw': '逾百個自動化測試', 'en': 'holds over one hundred automated',
    'fr': "contient plus d'une centaine de scripts", 'es': 'contiene más de un centenar de scripts', 'nl': 'bevat ruim honderd geautomatiseerde',
}
COMMIT_539 = {
    'zh': ('累计 539 个提交', '累计逾 540 个提交'), 'zh-tw': ('累計 539 個提交', '累計逾 540 個提交'),
    'en': ('holds 539 commits', 'holds more than 540 commits'), 'fr': ('compte 539 commits', 'compte plus de 540 commits'),
    'es': ('acumula 539 commits', 'acumula más de 540 commits'), 'nl': ('539 commits', 'meer dan 540 commits'),
}
COMMIT_11 = {
    'zh': ('另有 11 个提交', '另有 12 个提交'), 'zh-tw': ('另有 11 個提交', '另有 12 個提交'),
    'en': ('holds 11 more', 'holds 12 more'), 'fr': ('en compte 11 de plus', 'en compte 12 de plus'),
    'es': ('suma 11 más', 'suma 12 más'), 'nl': ('telt daar 11 bovenop', 'telt daar 12 bovenop'),
}
CHAIN_LINE = '79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 内容完善——正式版本条款全站覆盖、专案介绍增补适用边界与常见疑问'

for loc in LOCALES:
    text = load('project', loc)
    if PROJ_STORAGE_ROW[M[loc]][:30] in text:
        continue  # 幂等
    text = rep_line(text, PROJ_STORAGE_ANCHOR[M[loc]], PROJ_STORAGE_ROW[M[loc]], f'存储行 {loc}')
    text = rep_line(text, PROJ_I18N_ANCHOR[M[loc]], PROJ_I18N_ROW[M[loc]], f'i18n行 {loc}')
    text = rep_line(text, '`tests` | 105', PROJ_TESTS_ROW[M[loc]], f'tests行 {loc}')
    old, new = COMMIT_539[M[loc]]
    text = rep(text, old, new, f'539 {loc}')
    old, new = COMMIT_11[M[loc]]
    text = rep(text, old, new, f'11提交 {loc}')
    text = insert_after_line(text, '5197f5092861b7db24f1d428991c7db057612ae3', CHAIN_LINE, f'链路 {loc}')
    text = rep(text, PROJ_TESTS_BULLET_OLD[M[loc]], PROJ_TESTS_BULLET_NEW[M[loc]], f'tests条目 {loc}')
    save('project', loc, text)
print('project: 7 项修订 完成')

# ============================================================
# 7. README：版本、提交数、部署清单定案
# ============================================================
readme = (ROOT / 'README.md').read_text(encoding='utf-8')
readme = readme.replace('主仓 539 提交 + 本站 11 提交', '主仓逾 540 提交 + 本站 12 提交')
readme = readme.replace('当前文档版本 **5.2**', '当前文档版本 **5.3**')
readme = readme.replace(
    '1. **确定域名并修改 `SITE_ORIGIN`**：`astro.config.mjs` 顶部一行（现值 `mail.epocanvas.com` 为占位——与邮件应用同域冲突，须另定如 `docs.epocanvas.com/epomail` 或独立子域）；',
    '1. ~~确定域名并修改 `SITE_ORIGIN`~~ **已定案（v5.3）**：发布地址 `https://docs.epocanvas.com/epomail/`，`SITE_ORIGIN = https://docs.epocanvas.com`、`base = \'/epomail\'` 已写入 `astro.config.mjs`，内链与图路径经 `rehypePrefixBase` 自动携带 base 前缀；'
)
(ROOT / 'README.md').write_text(readme, encoding='utf-8', newline='\n')
changed.append('README.md')
print('README: 完成')
print(f'\n共修改 {len(changed)} 个文件，全部断言通过。')
