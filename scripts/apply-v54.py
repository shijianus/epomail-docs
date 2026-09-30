#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply-v54.py — EpomailDocs v5.4 内容完整性补齐（仅 EpomailDocs 仓）
① ToS §6.3 交叉引用精度修正（第 9 节→第 7 节，授权范围与撤销实际所在）
② ToS / key-terms 补开头配图（skill 要求每篇一图；tos-contract.svg / key-terms-glossary.svg）×6 语言
③ key-terms 补 4 条跨文档使用但未定义之术语（BYOS / Workers AI / Turnstile / SSRF 防护）×6 语言
④ privacy §8 补「违规处置」保留与销毁行（对码 purgeUserEmails：封禁后强制清空）×6 语言
⑤ 全站版本 5.3→5.4，生效日期 2026-09-30→2026-10-01 ×48
运行：python scripts/apply-v54.py（在 EpomailDocs 仓库根执行）
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / 'src' / 'content' / 'docs'
LOCALES = ['mail', 'zh-tw', 'en', 'fr', 'es', 'nl']
M = dict(zip(LOCALES, ['zh', 'zh-tw', 'en', 'fr', 'es', 'nl']))
changed = []

def doc_path(doc, loc):
    return DOCS / 'mail' / f'{doc}.md' if loc == 'mail' else DOCS / loc / 'mail' / f'{doc}.md'

def load(doc, loc):
    return doc_path(doc, loc).read_text(encoding='utf-8')

def save(doc, loc, text):
    doc_path(doc, loc).write_text(text, encoding='utf-8', newline='\n')
    changed.append(f'{loc}/{doc}')

def rep(text, old, new, tag):
    if old not in text and new in text:
        return text
    n = text.count(old)
    assert n == 1, f'[{tag}] 期望命中 1 次，实际 {n} 次：{old[:70]}...'
    return text.replace(old, new)

def insert_before_line(text, anchor, block, tag):
    if block.strip() in text:
        return text
    lines = text.split('\n')
    hits = [i for i, l in enumerate(lines) if anchor in l]
    assert len(hits) == 1, f'[{tag}] 锚点命中 {len(hits)} 行：{anchor[:50]}'
    lines[hits[0]:hits[0]] = block.strip('\n').split('\n')
    return '\n'.join(lines)

def insert_after_line(text, anchor, new_line, tag):
    if new_line in text:
        return text
    lines = text.split('\n')
    hits = [i for i, l in enumerate(lines) if l.startswith(anchor)]
    assert len(hits) == 1, f'[{tag}] 行首锚点命中 {len(hits)} 行：{anchor[:50]}'
    lines.insert(hits[0] + 1, new_line)
    return '\n'.join(lines)

# ============================================================
# 1. ToS §6.3 交叉引用精度修正（9 → 7）×6
# ============================================================
OAUTH_REF = {
    'zh':    ('[隐私政策](/mail/privacy-policy/)第 9 节；第三方应用', '[隐私政策](/mail/privacy-policy/)第 7 节；第三方应用'),
    'zh-tw': ('[隱私權政策](/zh-tw/mail/privacy-policy/)第 9 節；第三方應用', '[隱私權政策](/zh-tw/mail/privacy-policy/)第 7 節；第三方應用'),
    'en':    ('Section 9 of the [Privacy Policy](/en/mail/privacy-policy/)', 'Section 7 of the [Privacy Policy](/en/mail/privacy-policy/)'),
    'fr':    ('à la section 9 de la [Politique de confidentialité](/fr/mail/privacy-policy/)', 'à la section 7 de la [Politique de confidentialité](/fr/mail/privacy-policy/)'),
    'es':    ('en la Sección 9 de la [Política de Privacidad](/es/mail/privacy-policy/)', 'en la Sección 7 de la [Política de Privacidad](/es/mail/privacy-policy/)'),
    'nl':    ('paragraaf 9 van het [Privacybeleid](/nl/mail/privacy-policy/)', 'paragraaf 7 van het [Privacybeleid](/nl/mail/privacy-policy/)'),
}
for loc in LOCALES:
    text = load('terms-of-service', loc)
    old, new = OAUTH_REF[M[loc]]
    text = rep(text, old, new, f'ToS引用 {loc}')
    save('terms-of-service', loc, text)
print('① ToS §6.3 引用修正 完成')

# ============================================================
# 2. ToS / key-terms 配图 + 图注 ×6（插于「## 1.」之前）
# ============================================================
FIG_TOS = {
    'zh':    '![EpoCanvas Mail 服务条款契约生命周期：电子同意（注册即同意，与书面同等效力）→ 履约（帐号安全、您的内容、责任限制）→ 修订（重大变更生效前公告）→ 终止（注销、数据导出与删除），底座为准据法与管辖（运营者所在地，托管实例为台湾）](/images/mail/tos-contract.svg)\n\n*图：契约自成立至终止之生命周期。电子同意与书面同其效力；帐号、内容与责任条款见第 3、5、10 节；修订见第 12 节；终止与资料删除见第 8 节；准据法与管辖见第 11 节。*\n',
    'zh-tw': '![EpoCanvas Mail 服務條款契約生命週期：電子同意（註冊即同意，與書面同等效力）→ 履約（帳號安全、您的內容、責任限制）→ 修訂（重大變更生效前公告）→ 終止（註銷、資料匯出與刪除），底座為準據法與管轄（營運者所在地，託管實例為臺灣）](/images/mail/tos-contract.svg)\n\n*圖：契約自成立至終止之生命週期。電子同意與書面同其效力；帳號、內容與責任條款見第 3、5、10 節；修訂見第 12 節；終止與資料刪除見第 8 節；準據法與管轄見第 11 節。*\n',
    'en':    '![Contract lifecycle of the EpoCanvas Mail Terms of Service: electronic consent (signing up = agreement, equal force as writing) → performance (account security, your content, liability limits) → revision (material changes announced before effect) → termination (cancellation, data export and deletion), resting on governing law and jurisdiction (the Operator\u2019s location; hosted instance: Taiwan)](/images/mail/tos-contract.svg)\n\n*Figure: the lifecycle of the contract from formation to termination. Electronic consent carries the same force as writing; account, content and liability terms in Sections 3, 5 and 10; revision in Section 12; termination and data deletion in Section 8; governing law and jurisdiction in Section 11.*\n',
    'fr':    '![Cycle de vie contractuel des Conditions d\u2019utilisation d\u2019EpoCanvas Mail : consentement électronique (l\u2019inscription vaut acceptation, même force que l\u2019écrit) → exécution (sécurité du compte, votre contenu, limites de responsabilité) → révision (annonce des changements majeurs avant entrée en vigueur) → fin (résiliation, export et suppression des données), sur fond de droit applicable et de juridiction (lieu de l\u2019Opérateur ; instance hébergée : Taïwan)](/images/mail/tos-contract.svg)\n\n*Figure : le cycle de vie du contrat, de sa formation à sa fin. Le consentement électronique a la même force que l\u2019écrit ; compte, contenu et responsabilité aux sections 3, 5 et 10 ; révision à la section 12 ; résiliation et suppression des données à la section 8 ; droit applicable et juridiction à la section 11.*\n',
    'es':    '![Ciclo de vida contractual de los Términos del Servicio de EpoCanvas Mail: consentimiento electrónico (registrarse implica aceptar, con la misma fuerza que por escrito) → cumplimiento (seguridad de la cuenta, su contenido, límites de responsabilidad) → revisión (los cambios importantes se anuncian antes de su entrada en vigor) → fin (cancelación, exportación y supresión de datos), sobre la base de la ley aplicable y la jurisdicción (ubicación del Operador; instancia alojada: Taiwán)](/images/mail/tos-contract.svg)\n\n*Figura: el ciclo de vida del contrato, desde su formación hasta su fin. El consentimiento electrónico tiene la misma fuerza que el escrito; cuenta, contenido y responsabilidad en las secciones 3, 5 y 10; revisión en la sección 12; cancelación y supresión de datos en la sección 8; ley aplicable y jurisdicción en la sección 11.*\n',
    'nl':    '![Contractlevenscyclus van de Servicevoorwaarden van EpoCanvas Mail: elektronische toestemming (registreren = akkoord, dezelfde kracht als schriftelijk) → nakoming (accountbeveiliging, uw inhoud, aansprakelijkheidsbeperkingen) → herziening (belangrijke wijzigingen worden aangekondigd vóór inwerkingtreding) → einde (opzegging, gegevensexport en verwijdering), rustend op het toepasselijke recht en de jurisdictie (vestigingsplaats van de Exploitant; gehoste instance: Taiwan)](/images/mail/tos-contract.svg)\n\n*Figuur: de levenscyclus van het contract, van totstandkoming tot einde. Elektronische toestemming heeft dezelfde kracht als schriftelijk; account, inhoud en aansprakelijkheid in paragrafen 3, 5 en 10; herziening in paragraaf 12; beëindiging en gegevensverwijdering in paragraaf 8; toepasselijk recht en jurisdictie in paragraaf 11.*\n',
}
FIG_KT = {
    'zh':    '![用语地图：法律名词（资料控制者、受托处理者、当事人、特定目的等）与技术名词（实例、D1／KV／R2、静态加密、零遥测等）两类定义于全站文档间一致使用，解释基准为资料保护法制通用定义与开源代码之实际实现](/images/mail/key-terms-glossary.svg)\n\n*图：本页两类定义之关系。法律名词采资料保护法制之通用定义；技术名词依开源代码之实际实现解释；未列名词依隐私政策与服务条款之文脉解释。*\n',
    'zh-tw': '![用語地圖：法律名詞（資料控制者、受託處理者、當事人、特定目的等）與技術名詞（實例、D1／KV／R2、靜態加密、零遙測等）兩類定義於全站文件間一致使用，解釋基準為資料保護法制通用定義與開源程式碼之實際實作](/images/mail/key-terms-glossary.svg)\n\n*圖：本頁兩類定義之關係。法律名詞採資料保護法制之通用定義；技術名詞依開源程式碼之實際實作解釋；未列名詞依隱私權政策與服務條款之文脈解釋。*\n',
    'en':    '![Glossary map: legal terms (data controller, processor, data subject, specific purpose, etc.) and technical terms (instance, D1/KV/R2, encryption at rest, zero telemetry, etc.) — two families of definitions used consistently across all documents, interpreted against general data-protection usage and the actual open-source implementation](/images/mail/key-terms-glossary.svg)\n\n*Figure: how the two families of definitions on this page relate. Legal terms follow general data-protection usage; technical terms are interpreted by the actual open-source implementation; unlisted terms are read in the context of the Privacy Policy and the Terms of Service.*\n',
    'fr':    '![Carte du glossaire : termes juridiques (responsable du traitement, sous-traitant, personne concernée, finalité déterminée, etc.) et termes techniques (instance, D1/KV/R2, chiffrement au repos, zéro télémétrie, etc.) — deux familles de définitions utilisées de manière cohérente dans tous les documents, interprétées selon l\u2019usage général de la protection des données et l\u2019implémentation open source réelle](/images/mail/key-terms-glossary.svg)\n\n*Figure : la relation entre les deux familles de définitions de cette page. Les termes juridiques suivent l\u2019usage général de la protection des données ; les termes techniques sont interprétés selon l\u2019implémentation open source réelle ; les termes non listés se lisent dans le contexte de la Politique de confidentialité et des Conditions d\u2019utilisation.*\n',
    'es':    '![Mapa del glosario: términos jurídicos (responsable del tratamiento, encargado, persona interesada, finalidad determinada, etc.) y términos técnicos (instancia, D1/KV/R2, cifrado en reposo, cero telemetría, etc.): dos familias de definiciones usadas de forma coherente en todos los documentos, interpretadas según el uso general de protección de datos y la implementación real del código abierto](/images/mail/key-terms-glossary.svg)\n\n*Figura: la relación entre las dos familias de definiciones de esta página. Los términos jurídicos siguen el uso general de protección de datos; los técnicos se interpretan según la implementación real del código abierto; los no enumerados se leen en el contexto de la Política de Privacidad y los Términos del Servicio.*\n',
    'nl':    '![Woordenlijstkaart: juridische termen (verwerkingsverantwoordelijke, verwerker, betrokkene, bepaald doel, enz.) en technische termen (instance, D1/KV/R2, versleuteling in rust, nul telemetrie, enz.): twee familien definities die consistent in alle documenten worden gebruikt, uitgelegd naar algemeen gegevensbeschermingsgebruik en de werkelijke open-source-implementatie](/images/mail/key-terms-glossary.svg)\n\n*Figuur: hoe de twee familien definities op deze pagina zich verhouden. Juridische termen volgen het algemene gegevensbeschermingsgebruik; technische termen worden uitgelegd naar de werkelijke open-source-implementatie; niet-genoemde termen worden gelezen in de context van het Privacybeleid en de Servicevoorwaarden.*\n',
}
for loc in LOCALES:
    text = load('terms-of-service', loc)
    text = insert_before_line(text, '## 1. ', FIG_TOS[M[loc]], f'ToS配图 {loc}')
    save('terms-of-service', loc, text)
    text = load('key-terms', loc)
    text = insert_before_line(text, '## 1. ', FIG_KT[M[loc]], f'KT配图 {loc}')
    save('key-terms', loc, text)
print('② 配图插入 完成')

# ============================================================
# 3. key-terms 补 4 条术语（追加于技术名词表末行之后）×6
# ============================================================
KT_ROWS = {
    'zh':    ['| BYOS（自备存储） | Bring Your Own Storage——将附件存于运营者或当事人自有之 S3 兼容对象存储（如 Backblaze B2、Wasabi）之机制；存储凭证由配置者自行保管 |',
              '| Workers AI | Cloudflare 边缘推论服务；用于验证码提取等 AI 处理，触发条件与资料范围见[隐私政策](/mail/privacy-policy/)第 6 节 |',
              '| Turnstile | Cloudflare 之人机验证机制；于注册与新增信箱时评估浏览器可信度，不以广告 Cookie 或跨站追踪为之 |',
              '| SSRF 防护 | 服务端请求伪造（Server-Side Request Forgery）之阻断机制；对外部端点之请求一律经公共地址校验，回环、私有网段与云端元数据地址一律拒绝 |'],
    'zh-tw': ['| BYOS（自備儲存） | Bring Your Own Storage——將附件存於營運者或當事人自有之 S3 相容物件儲存（如 Backblaze B2、Wasabi）之機制；儲存憑證由配置者自行保管 |',
              '| Workers AI | Cloudflare 邊緣推論服務；用於驗證碼提取等 AI 處理，觸發條件與資料範圍見[隱私權政策](/zh-tw/mail/privacy-policy/)第 6 節 |',
              '| Turnstile | Cloudflare 之人機驗證機制；於註冊與新增信箱時評估瀏覽器可信度，不以廣告 Cookie 或跨站追蹤為之 |',
              '| SSRF 防護 | 伺服器端請求偽造（Server-Side Request Forgery）之阻斷機制；對外部端點之請求一律經公共位址校驗，回環、私有網段與雲端中繼資料位址一律拒絕 |'],
    'en':    ['| BYOS (bring your own storage) | Attaching storage to an S3-compatible object store owned by the Operator or the data subject (e.g., Backblaze B2, Wasabi); storage credentials are kept by whoever configures it |',
              '| Workers AI | Cloudflare\u2019s edge inference service; used for verification-code extraction and other AI processing — triggers and data scope in Section 6 of the [Privacy Policy](/en/mail/privacy-policy/) |',
              '| Turnstile | Cloudflare\u2019s human-verification mechanism; evaluates browser trustworthiness at registration and mailbox creation, without advertising cookies or cross-site tracking |',
              '| SSRF protection | Blocking of server-side request forgery; requests to external endpoints are always validated against public addresses, and loopback, private-subnet and cloud-metadata addresses are rejected |'],
    'fr':    ["| BYOS (stockage à apporter) | mécanisme consistant à placer les pièces jointes dans un stockage objet compatible S3 appartenant à l'Opérateur ou à la personne concernée (Backblaze B2, Wasabi, etc.) ; les identifiants de stockage sont conservés par le configurateur |",
              "| Workers AI | service d'inférence en périphérie de Cloudflare ; utilisé pour l'extraction des codes de vérification et les autres traitements d'IA — déclencheurs et périmètre de données à la section 6 de la [Politique de confidentialité](/fr/mail/privacy-policy/) |",
              '| Turnstile | mécanisme de vérification humaine de Cloudflare ; évalue la fiabilité du navigateur à l\u2019inscription et à la création de boîtes, sans cookie publicitaire ni suivi intersites |',
              '| Protection SSRF | blocage du Server-Side Request Forgery ; les requêtes vers des points de terminaison externes sont systématiquement validées contre des adresses publiques, et les adresses de bouclage, de réseaux privés et de métadonnées cloud sont rejetées |'],
    'es':    ['| BYOS (almacenamiento propio) | mecanismo que coloca los adjuntos en un almacenamiento de objetos compatible con S3 propiedad del Operador o de la persona interesada (Backblaze B2, Wasabi, etc.); las credenciales las guarda quien lo configura |',
              '| Workers AI | servicio de inferencia en el borde de Cloudflare; se usa para la extracción de códigos de verificación y otros procesos de IA: condiciones de activación y alcance de datos en la Sección 6 de la [Política de Privacidad](/es/mail/privacy-policy/) |',
              '| Turnstile | mecanismo de verificación humana de Cloudflare; evalúa la fiabilidad del navegador en el registro y al crear buzones, sin cookies publicitarias ni seguimiento entre sitios |',
              '| Protección SSRF | bloqueo de la falsificación de solicitudes del lado del servidor; las solicitudes a puntos de conexión externos se validan siempre contra direcciones públicas, y las direcciones de bucle, redes privadas y metadatos de la nube se rechazan |'],
    'nl':    ['| BYOS (eigen opslag meebrengen) | mechanisme om bijlagen op te slaan in een S3-compatibele objectopslag van de Exploitant of de betrokken persoon (Backblaze B2, Wasabi, enz.); opslagreferenties worden bewaard door wie de configuratie uitvoert |',
              '| Workers AI | Cloudflare\u2019s inferentiedienst aan de rand; gebruikt voor het extraheren van verificatiecodes en andere AI-verwerking — triggers en gegevensbereik in paragraaf 6 van het [Privacybeleid](/nl/mail/privacy-policy/) |',
              '| Turnstile | Cloudflare\u2019s mensverificatiemechanisme; beoordeelt de betrouwbaarheid van de browser bij registratie en het aanmaken van bussen, zonder advertentiecookies of cross-site tracking |',
              '| SSRF-bescherming | blokkade van server-side request forgery; verzoeken aan externe eindpunten worden altijd gevalideerd tegen openbare adressen, en loopback-, privénetwerk- en cloudmetadata-adressen worden geweigerd |'],
}
KT_LAST_ANCHOR = {
    'zh': '| 软删除／实体删除 |', 'zh-tw': '| 軟刪除／實體刪除 |',
    'en': '| Soft deletion / physical deletion |', 'fr': '| Suppression logique / suppression physique |',
    'es': '| Eliminación lógica / eliminación física |', 'nl': '| Zacht verwijderen / fysiek verwijderen |',
}
for loc in LOCALES:
    text = load('key-terms', loc)
    if KT_ROWS[M[loc]][0] in text:
        continue
    lines = text.split('\n')
    hits = [i for i, l in enumerate(lines) if l.startswith(KT_LAST_ANCHOR[M[loc]])]
    assert len(hits) == 1, f'[KT末行] {loc} 命中 {len(hits)}：{KT_LAST_ANCHOR[M[loc]][:40]}'
    lines[hits[0] + 1:hits[0] + 1] = KT_ROWS[M[loc]]
    save('key-terms', loc, '\n'.join(lines))
print('③ key-terms 术语补齐 完成')

# ============================================================
# 4. privacy §8 补「违规处置」行（实体删除行之后）×6
# ============================================================
VIOLATION_ROW = {
    'zh':    '| 违规处置 | 帐号因违规被封禁后，运营者得强制清空其邮件与附件以释放空间（见[可接受使用政策](/mail/acceptable-use/)执行阶梯） |',
    'zh-tw': '| 違規處置 | 帳號因違規被封禁後，營運者得強制清空其郵件與附件以釋放空間（見[可接受使用政策](/zh-tw/mail/acceptable-use/)執行階梯） |',
    'en':    '| Violation enforcement | After an account is banned for violations, the Operator may force-purge its emails and attachments to free space (see the enforcement ladder in the [Acceptable Use Policy](/en/mail/acceptable-use/)) |',
    'fr':    "| Traitement des violations | après le bannissement d'un compte pour violation, l'Opérateur peut purger de force ses courriels et pièces jointes pour libérer de l'espace (voir l'échelle d'application de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/)) |",
    'es':    '| Aplicación por infracciones | después de que una cuenta sea suspendida por infracciones, el Operador puede purgar de forma forzada sus correos y adjuntos para liberar espacio (véase la escalera de aplicación de la [Política de Uso Aceptable](/es/mail/acceptable-use/)) |',
    'nl':    '| Handhaving bij overtredingen | nadat een account wegens overtredingen is geblokkeerd, kan de Exploitant de e-mails en bijlagen forcerend wissen om ruimte vrij te maken (zie de handhavingsladder in het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/)) |',
}
DS_ROW_ANCHOR = {
    'zh': '| 实体删除 |', 'zh-tw': '| 實體刪除 |', 'en': '| Physical deletion |',
    'fr': '| Suppression physique |', 'es': '| Supresión física |', 'nl': '| Fysieke verwijdering |',
}
for loc in LOCALES:
    text = load('privacy-policy', loc)
    if VIOLATION_ROW[M[loc]] in text:
        continue
    text = insert_after_line(text, DS_ROW_ANCHOR[M[loc]], VIOLATION_ROW[M[loc]], f'违规处置 {loc}')
    save('privacy-policy', loc, text)
print('④ privacy §8 违规处置行 完成')

# ============================================================
# 5. 版本 5.3→5.4，生效日期 → 2026-10-01 ×48
# ============================================================
VERSION_LINE = {
    'zh':    '**生效日期：2026 年 10 月 1 日｜版本：5.4**',
    'zh-tw': '**生效日期：2026 年 10 月 1 日｜版本：5.4**',
    'en':    '**Effective date: October 1, 2026 | Version: 5.4**',
    'fr':    "**Date d'entrée en vigueur : 1 octobre 2026 | Version : 5.4**",
    'es':    '**Fecha de entrada en vigor: 1 de octubre de 2026 | Versión: 5.4**',
    'nl':    '**Datum van inwerkingtreding: 1 oktober 2026 | Versie: 5.4**',
}
OLD_PAT = {
    'zh':    re.compile(r'^\*\*生效日期：2026 年 9 月 30 日｜版本：5\.3\*\*\r?$'),
    'zh-tw': re.compile(r'^\*\*生效日期：2026 年 9 月 30 日｜版本：5\.3\*\*\r?$'),
    'en':    re.compile(r'^\*\*Effective date: September 30, 2026 \| Version: 5\.3\*\*\r?$'),
    'fr':    re.compile(r"^\*\*Date d'entrée en vigueur : 30 septembre 2026 \| Version : 5\.3\*\*\r?$"),
    'es':    re.compile(r'^\*\*Fecha de entrada en vigor: 30 de septiembre de 2026 \| Versión: 5\.3\*\*\r?$'),
    'nl':    re.compile(r'^\*\*Datum van inwerkingtreding: 30 september 2026 \| Versie: 5\.3\*\*\r?$'),
}
DOCS_ALL = ['project', 'overview', 'privacy-policy', 'terms-of-service',
            'acceptable-use', 'data-security', 'sub-processors', 'key-terms']
for loc in LOCALES:
    for doc in DOCS_ALL:
        text = load(doc, loc)
        lines = text.split('\n')
        if [l for l in lines if l.strip() == VERSION_LINE[M[loc]]]:
            continue
        hits = [i for i, l in enumerate(lines) if OLD_PAT[M[loc]].match(l.strip())]
        assert len(hits) == 1, f'[版本行] {loc}/{doc} 命中 {len(hits)}'
        lines[hits[0]] = VERSION_LINE[M[loc]]
        save(doc, loc, '\n'.join(lines))
print('⑤ 版本行 5.4 完成')

# ============================================================
# 6. README 同步（版本 + 配图数）
# ============================================================
readme = (ROOT / 'README.md').read_text(encoding='utf-8')
readme = readme.replace('当前文档版本 **5.3**', '当前文档版本 **5.4**')
(ROOT / 'README.md').write_text(readme, encoding='utf-8', newline='\n')
changed.append('README.md')
print('⑥ README 完成')
print(f'\n共写盘 {len(changed)} 次，全部断言通过。')
