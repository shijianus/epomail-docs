---
title: Projectoverzicht EpoCanvas Mail
description: Een complete introductie van het EpoCanvas Mail-project—positionering, kernfuncties, technische architectuur, beveiligingsontwerp, ontwikkelgeschiedenis en de volledige commit-keten.
---

**Eerste commit: 21 juli 2026 | Huidige versie: v1.1.0 | Licentie: MIT**

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.14**

EpoCanvas Mail is een open source e-mailservice die draait op het Cloudflare-edge-netwerk. Met één domein en één Cloudflare-account richt u een eigen mailboxdienst op met verzending en ontvangst van e-mail, bijlagen en toegang vanaf meerdere apparaten. Het project wordt geëxploiteerd als gehoste instantie op [mail.epocanvas.com](https://mail.epocanvas.com), publiceert zijn volledige broncode voor zelf-hosting en levert een bijbehorende Android-app (epomail). Deze pagina beschrijft de positionering, de functies, de technische architectuur, het beveiligingsontwerp en de ontwikkelgeschiedenis van het project; de juridische voorwaarden van de dienst en de privacypraktijken staan in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/).

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. De juridische en technische documenten op deze site volgen de open-sourceimplementatie van de dienst en beogen transparante, strenge, niet-commerciële normen voor gemeenschapscommunicatie.

![Systeemarchitectuur van EpoCanvas Mail: de clientlaag (webapp, Android-app, OAuth-apps van derden) verbindt via de Cloudflare-edge; Workers dragen de API, de verwerking van inkomende e-mail en de AI-mogelijkheden, met uitgaande verzending via Resend en Telegram; gegevens worden opgeslagen in dubbele D1-databases, KV en objectopslag](/images/mail/nl/project-architecture.svg)

*Figuur: Systeemarchitectuur. Clients verbinden via de edge, zonder enkele oorspronkelijke server; inkomende e-mail wordt ontvangen en geparseerd door Email Routing, en uitgaande verzending gaat via het Resend-kanaal; alle toestand blijft in de eigen Cloudflare-bronnen van de uitroller.*

## 1. Positionering

Een eigen mailsysteem draaien vraagt om een server die langdurig onderhouden wordt, een vast IP-adres en anti-spambeheer; commerciële mailboxdiensten concentreren uw gegevens juist in handen van de aanbieder, en als gebruiker kunt u nauwelijks verifiëren hoe ze worden behandeld. EpoCanvas Mail kiest een derde pad: de complete dienst past binnen de gemeterde gratis tier van Cloudflare (Workers-rekenkracht, D1-databases, KV-cache, R2-objectopslag), wordt serverloos geleverd, met nul vaste serverkosten en volledig open source code.

- Geen beheerlast: na uitrol is er geen onderhoud van besturingssysteem of certificaten; schalen en wereldwijde versnelling worden door Cloudflare verzorgd;
- Eigendom van gegevens: alle gegevens van een zelf-gehoste instantie staan in de eigen D1- en objectopslag van de uitroller; de code bevat geen enkele telemetry;
- Twee manieren van gebruik: registreren op de gehoste instantie, of de broncode nemen en uitrollen op uw eigen domein. De toewijzing van de verwerkingsverantwoordelijke rol in elk scenario staat in sectie 2 van het [Overzicht](/nl/mail/overview/).

## 2. Functieoverzicht

Het project omvat verzenden en ontvangen, indeling, zoeken, automatisering en een open platform; de per-functie toelichting met echte interface-screenshots staat in de [Functiegids](/nl/mail/features/). Kernpunten: ontvangst via Cloudflare Email Routing en multikanaal verzenden; een inbox met acht weergaven, conversatiedraden en drie-paneelweergave; geavanceerde zoeksyntaxis en de classificatieregelengine; verificatiecode-extractie via Workers AI en indeling-bewarende volledige vertaling; een OAuth 2.0 / OIDC-centrum en persoonlijke API-tokens; en gegevensexport (JSON en .eml).

Elke interface en route wordt doorlopen in de [Interface en routekaart](/nl/mail/interface/); de volledige referentie van zoekoperators en de classificatieregelengine staat in de [Zoek- en regelreferentie](/nl/mail/search/).
## 3. Architectuuroverzicht

De server draait op Cloudflare Workers (stateless V8 Isolate-sandboxen); gegevens staan in twee fysiek gescheiden D1-databases (een gebruikers- en een maildatabase, met 100% achterwaartse compatibiliteit in single-database-uitrol), KV en objectopslag (een keten van vier niveaus: eigen S3, geconfigureerde S3, R2, KV); inkomende post komt via Email Routing, uitgaande post via kanalen als Resend / Mailjet, en AI draait op Workers AI. De volledige topologie, het versleutelingssysteem, rolquota en de levenscyclus van e-mail: zie [Technische architectuur](/nl/mail/architecture/).

## 4. Voor wie dit project geschikt is en voor wie niet

Het project is geschikt voor de volgende situaties:

- particulieren of kleine teams die al een domein en een Cloudflare-account hebben en een mailbox willen zonder vaste serverkosten;
- zelfhostende gebruikers die controleerbare broncode willen en alle gegevens binnen hun eigen account willen houden;
- individuele gebruikers die geïsoleerde mailboxen, automatische classificatie en directe extractie van verificatiecodes voor registratiemail nodig hebben.

Overweeg een alternatief in de volgende situaties:

- bedrijfsscenario's die beschikbaarheidsgaranties, formele ondersteuning of langetermijnarchivering vereisen: de dienst biedt geen SLA en e-mail in de prullenbak wordt 7 dagen na ontvangst fysiek verwijderd (zie [Servicevoorwaarden](/nl/mail/terms-of-service/), Sectie 8);
- toepassingen gericht op massale uitgaande marketing: het beleid voor acceptabel gebruik verbiedt ongevraagde commerciële massamail (zie [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/), Sectie 3);
- communicatie die end-to-end-versleuteling vereist: de versleuteling van de dienst is statisch aan serverzijde en omvat geen bijlagen (zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/), Sectie 3);
- gebruikers die Cloudflare-resources, het domein en de sleutelconfiguratie niet willen beheren: selfhosting vereist nog steeds het injecteren van de sleutels en initialisatie (zie Sectie 8).

## 5. Beveiligingsontwerp in het kort

Wachtwoorden worden opgeslagen alsgezouten PBKDF2-HMAC-SHA256-hashes (100.000 iteraties); TOTP-sleutels worden met AES-256-GCM in rust versleuteld; mail-URL's gebruiken willekeurige 20-tekens hashes ondertekend met HMAC-SHA256 tegen privilege-escalatie en enumeratie; drievoudige XSS-verdediging en SSRF-blokkering; officiële mail wordt geleverd als onveranderlijke snapshots. Deze maatregelen zijn afgerond in de volledige security-hardening van 22 september 2026 (43 geautomatiseerde asserts groen); de volledige lijst staat in [Technische architectuur](/nl/mail/architecture/), paragraaf 7, en de informaties en bewaartermijnen jegens personen in [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

## 6. Ontwikkelgeschiedenis en de commit-keten

Het project wordt doorlopend ontwikkeld sinds de eerste commit van 21 juli 2026 (`2bbb582`). Per 5 oktober 2026 telt de hoofdrepository meer dan 660 commits; deze site (EpomailDocs, een aparte git-repository) komt daar nog eens meer dan 50 commits bij (de onderstaande lijsten hebben mijlpaalgranulariteit; tussenliggende en latere commits staan op GitHub). De tabel hieronder somt de mijlpalen per fase op met hun ankercommits (korte hashes):

| Fase | Periode | Opgeleverd | Ankercommits |
| --- | --- | --- | --- |
| 1. Fundament | 2026-07-21 → 07-23 | Initialisatie van de repository; Vue 3-interface fase één (globaal palet, typografie, lichte en donkere zijbalk); driedelig gesplitst leesaanzicht in Outlook-stijl | `2bbb582` `29f9896` `a531341` |
| 2. Merk en aanmeldschil | 2026-08-05 → 08-09 | Transparant logo en favicon geharmoniseerd; donker thema als standaard en merklaadanimatie; React-aanmeldschil met de ruimte-warp-animatie | `6572695` `e3e57c6` |
| 3. Prototype en regelengine | 2026-08-12 → 08-17 | Prototype-interface volledig toegepast; labelsysteem gesynchroniseerd met de backend; uitstellen／spam／prullenbak; regelengine voor classificatie (standaardsjablonen, heuristiek, harde onderschepping via lijsten); geavanceerde zoeksyntaxis; analytedashboard voor classificatie; brute-forceblokkade | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. Editor en welkomstmail | 2026-08-28 → 08-30 | Volledig schermomvattende welkomstmail-dialoog; TinyMCE Alloy-werkbalk herbouwd rond 17 Markdown-hulpmiddelen | `9f6ece8` `59bfe60` |
| 5. Open platform en opslag | 2026-09-03 → 09-06 | OAuth 2.0／OIDC-authenticatiecentrum; fysieke scheiding van dubbele D1; B2／S3-eigen opslag met quotummeting; beheercentrum voor opslag en databases; 6 kernrolgroepen en de bezoekers-sandbox | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. AI-mogelijkheden | 2026-09-06 → 09-13 | Gmail-achtige inboxarchitectuur en AI-volledige vertaling; meer dan 300 offline vectorpictogrammen; AI Hub-modellenpool met tokenloze snelheidstests; gelijktijdige vertaling per segment en OCR-ondertitels | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. Verscherping van rechten en beveiligingsfixes | 2026-09-09 → 09-11 | GitHub Release v1.1.0; fix van de cross-domain privilege escalation zero-day; multidomein-beheerdersaanmelding; paneel voor apps van derden en gegevensdeling | `7558fc8` `5855db1` `3234d69` |
| 8. Zestalige internationalisering | 2026-09-14 → 09-17 | Zes talen in het hele project met lekvrije woordenboeken; e-mailsjablonen verzonden in de taal van de ontvanger; volledige push naar GitHub; productielancering op Cloudflare | `aa1955e` `42c33f1` `25985b1` |
| 9. Tweestapsverificatie en audits | 2026-09-18 → 09-22 | TOTP／Passkey-aanmelding; herbouwde uitrol-bootstrapketen en scheiding van secrets; UI-audit-fixbatches; volledige beveiligingsverharding | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Gmail-achtige beleving | 2026-09-25 → 09-27 | Gelaagde berichtdetailopmaak; inline beantwoorden en emoji-reacties; verbeterde gespreksthreads; Gmail-stijl routering en diepe links; cryptografische hash-routering tegen manipulatie | `a8d841a` `4af2985` `4b371a8` |
| 11. Site met juridische documenten | 2026-09-27 → 09-29 | Juridisch geheel van deze site in zes talen en zeven documenten; uitbreiding volgens het Google-beleidsparadigma; bouw van de site met Astro 5 + Starlight; aparte git-repository | `2bed02b` `617cccf` |
| 12. Finalesering en audit vóór de lancering | 2026-09-29 → 09-30 | Integratie van de projectpagina en het officiële privacybeleid; volledige v5.0-herziening zonder artikelnummerverwijzingen; kalibratie van technische feiten en aanvulling van de verwerkerslijst vóór de lancering | `7ad5ebc` `05c222c` `5197f50` |
| 13. Duurzame exploitatie van de documentatiesite | 2026-10-01 → 10-04 | lokale demo-instantie en seedtool; v5.8 visuele en ingangspolijsting; v5.9 uitbreiding van functiegids/architectuur (×6 talen) met echte productscreenshots; v5.9 onafhankelijke audit met volledige verificatie van claims tegen de broncode | `26f6c3b` `8a60539` |
| 14. Auditgovernance en uitbreiding van de projectintroductie | 2026-10-04 → 10-05 | v5.10 onafhankelijke auditgovernance (volledige claim-tot-broncorrecties, «en» opgenomen in de structuursymmetrie); v5.11 pagina's voor bedrijfsmodi en instellingsgids (×6 talen, echte productscreenshots); herbouw van de auditconsole (RBAC en D1-persistentie) en OAuth-functievlag | `08448fb` `ff4e93f` `596e7c1` |

De complete keten van mijlpaalankercommits van de hoofdrepository (volledige 40-tekens hashes, één voor één verifieerbaar in de GitHub-commitgeschiedenis):

```text
2bbb582e19b8a1aca410767a5b5c52ae5d7f4423  2026-07-21  init: initial commit before UI/UX updates
29f98962399ec85c894fbc02ff6ef69d7d496222  2026-07-23  feat(ui): implement 3-column split view layout for mail reading
65726950939d72d82dbaccd974ff1a75ffe1b226  2026-08-06  feat: default dark theme & apply brand loading animation
e3e57c69a6154bc13218be27a6537711e0a21527  2026-08-09  Enhance: Upgrade collision warning to a high-tech sci-fi HUD
8664f84cce7d2fdb038322f8bf66c5189f93f33d  2026-08-12  Phase 1: Refactor UI/UX colors and layout to match prototype style
803b0e05d2d55bbcbb3b0f4d4279524c31524c21  2026-08-13  feat: implement advanced search syntax and highlighting
0b7e37d953e2a25ff74dcf313272632fb60ba9c8  2026-08-13  fix(labels): ensureDefaultRules injection + system rule lock UI + real heuristic engine
643edea268fb8dc4f67b4bfe17db49025f6c7662  2026-08-15  feat(ui): phase 3 - classification management analytics dashboard
79f200fcb1a401e08c4d89ff94b8c3a65b51aef0  2026-08-16  feat: enhance login UX with toast and 12h anti-brute force lockout
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): 管理员专属 OAuth 开放平台与应用管理独立分区上线及个人资料解耦清退
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): 系统设置「存储与核心数据库」管理中心上线与第三方DB配置体系全量重构
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): 细化6大核心管理组权限控制规范、开源参观者沙箱交互、博客等级联动与UI架构透视全景上线
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): 学习Gmail收件UI架构，升级to-me详情卡片、顶部操作栏与AI全文翻译及管理面板API密钥集成
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): 系统级全量300+离线矢量图标重构、零网络请求秒开与满Icon状态闭环
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: 全专案主流多语言支持(正体中文/法/西/荷)、多语言欢迎邮件、网站公告全域公告邮件
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): 生产环境Cloudflare正式上线、Playwright真机视觉全链路核验、Vue-i18n转义与抽屉缺陷修复
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): 登录界面两步验证 (TOTP/Passkey) 流体动效与丝滑交互重构
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): 三大核验缺陷全量修复、全新部署引导链重构与密钥安全体系隔离
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): 全量安全加固与漏洞闭环——P0/P1/P2防护/SSRF阻断/XSS三重防御/会话脱敏/权限对齐
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): 对齐 Gmail 邮件详情排版分层与悬浮快捷回复体验
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): 严格对齐 Gmail 多账户隔离与密码学 Hash 防越权路由架构
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): EpomailDocs 独立为专用 git 仓库，自父仓库解除追踪
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): 归档 EpomailDocs v5.8 视觉与入口打磨轮流水（EpomailDocs a1c1e89——翻页卡图标/表格居中/Accept-Language 协商）
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): 归档 EpomailDocs v5.9 专案文档拆分扩充轮流水（EpomailDocs beb956a——功能指南/技术架构两新页×6 语言、真实产品截图、内容栏居中根治、本地演示实例）
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): 本地演示实例播种工具——seed-demo.py 演示邮件生成器与 wrangler-demo.toml 本地配置忽略
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查
21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  feat(sys-setting): 新增底层特性开关 ENABLE_OAUTH_INTEGRATION 并默认关闭隐藏第三方认证设置
73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence
596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  docs(checklist): 归档 EpomailDocs v5.11 专案介绍扩充轮流水（EpomailDocs ff4e93f+c597fca——运行模式/设置指南两新页×6 语言、9 张真实产品截图、全站 5.11 版本同步、本地视觉验证全绿）
```

De commit-keten van deze site (de aparte EpomailDocs-repository):

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): 法律文档站 v4.1——台湾法域全量定稿（6 语言 × 7 篇 × 42 页）
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: aup-ladder.svg 布局重构消除遮挡，视觉验收与归档流水
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): 补全根路径跳转页，/ 404 → 六语言总览入口
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): 新增六语言专案介绍页——定位、功能、架构、安全与完整提交链路
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): 采纳远端旧结构文档线为历史祖先，树以本地六语言法律文档站为准
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): 法律文档站 v5.0——全站去条号引用，六语言 × 7 篇 × SVG 配图全量同步
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): v5.1 独立审计修订——第三方清单增补博客等级联动披露、时效数据校正与工具补盲
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): 上线前审计修订——系统邮件不可变投递事实校准、AI 翻译预置模板披露、robots.txt
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 内容完善——正式版本条款全站覆盖、专案介绍增补适用边界与常见疑问
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3——独立复审缺陷治理与发布链路定案（docs.epocanvas.com/epomail）
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 内容完整性补齐——配图全覆盖、术语补定义、保留期缺项与引用精度
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 全站去幻觉与六语言深度整合——源码事实校准、en 九篇 1:1 重译、配图扁平化重绘
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): 十二张原理图全量六语言本地化——每种语言的文档配该语言的图
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 独立复审打磨——P1/P2 全项治理、八项补章、全站单 h1 与首次公网发布
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 视觉与入口打磨——翻页卡文档图标、表格居中与 Accept-Language 入口协商
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 专案文档拆分扩充——功能指南/技术架构两新页 ×6 语言 + 真实产品截图 + 内容栏居中
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  chore: sync manifest commit hash for 08448fb
08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  feat(docs): v5.10 独立审计治理轮——P1×3 全量对码修订、P2 全项落地、en 纳入结构对称校验
ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  feat(docs): v5.11 专案介绍扩充——运行模式/设置指南两新页 ×6 语言与真实产品截图全量入库
c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  chore: sync manifest commit hash for ff4e93f
```

De tabel en ankerketen hierboven zijn op mijlpaalniveau; elke reguliere fix, test en documentatiecommit tussen de fasen is bewaard in de git-geschiedenis en is één voor één te volgen via de [GitHub-commitgeschiedenis](https://github.com/shijianus/epomail/commits). De hoofdrepository bewaart daarnaast twee archiefbestanden, `CHECKLIST.log` (taakuitvoeringslog) en `REPORTS.md` (diepgaande auditrapporten), één-op-één gekoppeld aan de commits.

## 7. Kwaliteitsborging

- De map `tests/` bevat ruim honderd geautomatiseerde test-, audit- en inspectiescripts, met dekking van Playwright full-stack browserregressie, publieke end-to-end asserties tegen productie en statische scans van de hele repository;
- Representatieve gekwantificeerde controles: beveiligingsverharding 43／43 asserties, publieke routering end-to-end 32／32, aanmeldscherm in zes talen 62／62, sensorische inspectie 33／33 en 369 productie-integriteitsvergelijkingen byte voor byte;
- De driedelige statische i18n-audit: `i18n-symmetry` (absoluut symmetrische sleutelsets over zes talen), `i18n-audit` (nul ontbrekende letterlijke verwijzingen) en `i18n-hardcoded` (nul ongeünpackte hardgecodeerde gebruikerszichtbare tekst);
- Nul testgegevensresten: elke testcase ruimt fysiek op in een `finally`-blok; de database en KV bevatten geen fictieve gegevens;
- De ontwikkeling volgt een vijfstaps-SOP (bereikbevestiging, gedisciplineerd coderen, full-stack testen, gedisciplineerde commits, rapportage bovenaan het antwoord), met uitvoer gesplitst naar `CHECKLIST.log` en `REPORTS.md`.

## 8. Het project ophalen en uitrollen

| Kanaal | Beschrijving |
| --- | --- |
| Gehoste instantie | Direct registreren en gebruiken op [mail.epocanvas.com](https://mail.epocanvas.com) |
| Zelf-hosting | Uitrollen op eigen domein en Cloudflare-account in drie stappen |
| Broncode | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) (MIT-licentie) |
| Mobiele app | De Android-app, epomail |

Minimale stappen voor zelf-hosting:

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

Bezoek na de eerste uitrol `/api/init/<jwt_secret>` om de database-initialisatie en het zaaien van de zes standaardrollen af te ronden; productiegeheimen worden altijd geïnjecteerd met `npx wrangler secret put`, en lokaal gebruik is `.dev.vars` (nooit ingecheckt).

De volledige randvoorwaarden, de initialisatieketen en de sleutelinjectie voor zelfhosting staan in de [Uitrolgids](/nl/mail/deployment/); bijdragen, auditen en ontwikkelen volgen de [Ontwikkelgids](/nl/mail/development/).
## 9. Veelgestelde vragen

**Kost het gebruik van deze dienst geld?**
De software is gratis onder de MIT-licentie; de kosten van selfhosting zijn uw eigen Cloudflare-verbruik. De gehoste instantie heeft momenteel geen betaalfuncties; het aantal mailboxen, het verzendvolume en de opslagquota worden per accountrol vastgesteld.

**Kan de beheerder mijn e-mail lezen?**
Dat hangt af van de e-mailmodus van de instantie: in de modus «Alles» kan de beheerder alle e-mail lezen; in de modus «Privé» uitsluitend spam, verwijderde en onbeheerde e-mail; in de modus «Versleuteld» geeft de beheerinterface geen gebruikers-e-mail terug. Zie de reikwijdte van de versleuteling in het [Privacybeleid](/nl/mail/privacy-policy/), Sectie 10.

**Kan verwijderde e-mail worden hersteld?**
E-mail in de prullenbak wordt 7 dagen na ontvangst fysiek door het systeem verwijderd en kan niet worden hersteld; bewaar eerst een kopie via «Instellingen → Gegevensexport» (zie het [Privacybeleid](/nl/mail/privacy-policy/), Sectie 8).

**Wat is er nodig voor selfhosting?**
Een domein en een Cloudflare-account; de uitrolstappen en het injecteren van de sleutels staan in Sectie 8. Alle gegevens blijven binnen de Cloudflare-resources van de beheerder en de code bevat geen telemetrie.

## 10. Gerelateerde documenten

| Bron | Link |
| --- | --- |
| De route en elementen van elke interface | [Interface en routekaart](/nl/mail/interface/) |
| Zoekoperators en classificatieregelvoorwaarden | [Zoek- en regelreferentie](/nl/mail/search/) |
| Volledige stappen voor zelfhosting | [Uitrolgids](/nl/mail/deployment/) |
| Ontwikkelomgeving en engineeringproces | [Ontwikkelgids](/nl/mail/development/) |
| Wat de gehoste instantie biedt en haar ondersteuningskanalen | [Dienstomvang en ondersteuning](/nl/mail/service-scope/) |
| De open-sourcelicentie en de juridische positie van zelfhosting | [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/) |
| Werkingsmodi: implementatievormen, e-mailmodi en aanmelding | [Werkingsmodi](/nl/mail/modes/) |
| Instellingengids: persoonlijke instellingen en de beheerconsole | [Instellingengids](/nl/mail/settings/) |
| Privacy- en voorwaardenoverzicht | [Overzicht](/nl/mail/overview/) |
| Privacybeleid | [Privacybeleid](/nl/mail/privacy-policy/) |
| Servicevoorwaarden | [Servicevoorwaarden](/nl/mail/terms-of-service/) |
| Beleid voor acceptabel gebruik | [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
| Gegevensverwerking en beveiliging | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Verwerkerslijst | [Verwerkerslijst](/nl/mail/sub-processors/) |
| Begrippenlijst | [Begrippenlijst](/nl/mail/key-terms/) |
