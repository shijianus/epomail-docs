---
title: Projectoverzicht EpoCanvas Mail
description: Een complete introductie van het EpoCanvas Mail-project—positionering, kernfuncties, technische architectuur, beveiligingsontwerp, ontwikkelgeschiedenis en de volledige commit-keten.
---

**Eerste commit: 21 juli 2026 | Huidige versie: v1.1.0 | Licentie: MIT**

EpoCanvas Mail is een open source e-mailservice die draait op het Cloudflare-edge-netwerk. Met één domein en één Cloudflare-account richt u een eigen mailboxdienst op met verzending en ontvangst van e-mail, bijlagen en toegang vanaf meerdere apparaten. Het project wordt geëxploiteerd als gehoste instantie op [mail.epocanvas.com](https://mail.epocanvas.com), publiceert zijn volledige broncode voor zelf-hosting en levert een bijbehorende Android-app (epomail). Deze pagina beschrijft de positionering, de functies, de technische architectuur, het beveiligingsontwerp en de ontwikkelgeschiedenis van het project; de juridische voorwaarden van de dienst en de privacypraktijken staan in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/).

![Systeemarchitectuur van EpoCanvas Mail: de clientlaag (webapp, Android-app, OAuth-apps van derden) verbindt via de Cloudflare-edge; Workers dragen de API, de verwerking van inkomende e-mail en de AI-mogelijkheden, met uitgaande verzending via Resend en Telegram; gegevens worden opgeslagen in dubbele D1-databases, KV en objectopslag](/images/mail/project-architecture.svg)

*Figuur: Systeemarchitectuur. Clients verbinden via de edge, zonder enkele oorspronkelijke server; inkomende e-mail wordt ontvangen en geparseerd door Email Routing, en uitgaande verzending gaat via het Resend-kanaal; alle toestand blijft in de eigen Cloudflare-bronnen van de uitroller.*

## 1. Positionering

Een eigen mailsysteem draaien vraagt om een server die langdurig onderhouden wordt, een vast IP-adres en anti-spambeheer; commerciële mailboxdiensten concentreren uw gegevens juist in handen van de aanbieder, en als gebruiker kunt u nauwelijks verifiëren hoe ze worden behandeld. EpoCanvas Mail kiest een derde pad: de complete dienst past binnen de gemeterde gratis tier van Cloudflare (Workers-rekenkracht, D1-databases, KV-cache, R2-objectopslag), wordt serverloos geleverd, met nul vaste serverkosten en volledig open source code.

- Geen beheerlast: na uitrol is er geen onderhoud van besturingssysteem of certificaten; schalen en wereldwijde versnelling worden door Cloudflare verzorgd;
- Eigendom van gegevens: alle gegevens van een zelf-gehoste instantie staan in de eigen D1- en objectopslag van de uitroller; de code bevat geen enkele telemetry;
- Twee manieren van gebruik: registreren op de gehoste instantie, of de broncode nemen en uitrollen op uw eigen domein. De toewijzing van de verwerkingsverantwoordelijke rol in elk scenario staat in sectie 2 van het [Overzicht](/nl/mail/overview/).

## 2. Kernfuncties

Elke functie hieronder is punt voor punt geverifieerd tegen de broncode van de repository, gegroepeerd per thema.

### 2.1 Verzenden, ontvangen en mailbeheer

| Mogelijkheid | Beschrijving |
| --- | --- |
| Inkomende e-mail | Ontvangen via Cloudflare Email Routing, geparseerd door postal-mime (body en bijlagen) |
| Uitgaande e-mail | Verzonden via de Resend-API, met bulkverzending, ingesloten afbeeldingen en bijlagen, en inzicht in de verzendstatus |
| Drie e-mailmodi | De modi Alles, Privé en Versleuteld; de versleutelingssemantiek en zichtbaarheid voor de beheerder staan beschreven in [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Bijlageopslag | R2-objectopslag, vervangbaar door Backblaze B2 of elke S3-compatibele dienst (eigen opslag meebrengen), met quotummeting |
| Leeservaring | Gespreksthreads, driedelig gesplitst aanzicht, inline beantwoorden, emoji-reacties, uitstellen／spam／prullenbak en een viewer voor originele headers |

### 2.2 Zoeken en classificatie

- Geavanceerde zoeksyntaxis: veldfilters zoals `from`, `to` en `subject` gecombineerd met vrije trefwoorden, op twee niveaus (zoeken op de hele site en zoeken op de pagina), met markering van treffers op basis van de CSS Highlights API;
- Regelengine voor classificatie: ingebouwde standaardsjablonen (Sociaal, Abonnementen, Promoties), combineerbare voorwaarden en uitzonderingen, zwarte en witte lijsten met harde onderschepping, en een bypass-schakelaar voor interne mail;
- Extractie van verificatiecodes: Workers AI haalt automatisch verificatiecodes uit e-mail.

### 2.3 AI-mogelijkheden

- AI Hub-modellenpool: verbinding met de protocollen van OpenAI, Anthropic, DeepSeek en anderen; endpoints en modellen worden automatisch gedetecteerd, met snelheidstests zonder tokens en modelautorisatie per rol;
- Volledige vertaling: meertalige vertaling die de originele HTML-opmaak van de e-mail behoudt, met gelijktijdige lastverdeling per segment, OCR-ondertitels voor afbeeldingen en een instelbare doeltaal;
- Gebruiksanalyse: grafieken van AI-aanroeptrends en modelverdeling, in hetzelfde analysepaneel als de systeemstatistieken.

### 2.4 Identiteit, rollen en het open platform

- Accountbeveiliging: wachtwoorden gezouten en gehasht met PBKDF2-HMAC-SHA256 bij 100.000 iteraties; tweestapsverificatie met TOTP en Passkey; een blokkade tegen brute-force van 12 uur; menselijke verificatie met Turnstile;
- Rollen en rechten: een RBAC-systeem met 6 kernbeheerrolgroepen; functies, modellen en quota worden per rol beperkt, en bezoekers komen in een alleen-lezen sandbox;
- OAuth 2.0 / OIDC-authenticatiecentrum: registratie van apps van derden met de autorisatiecode- en client credentials-flows; gebruikers kunnen verleende machtigingen aan apps van derden realtime inzien en intrekken;
- Meerdere domeinen: één instantie kan meerdere e-maildomeinen binden, met multidomein-beheerdersaanmelding en aanmelding via alias.

### 2.5 Interface en talen

- Zes interfacetalen: Vereenvoudigd Chinees, Traditioneel Chinees, English, Français, Español en Nederlands; de woordenboeken bevatten 2.039 sleutels in de frontend en 1.888 in de backend, 100% symmetrisch over de zes talen, met een driedelige statische audit die nul lekkage van hardgecodeerde, voor de gebruiker zichtbare tekst garandeert;
- Meertalige e-mail: welkomstmails en systeembrede aankondigingsmails beschikken over officiële sjablonen in zes talen; systeemberichten worden afgeleverd in de versie zoals door de beheerder verzonden (een onveranderlijke momentopname); bij het lezen worden ongewijzigde officiële berichten lokaal in uw taal weergegeven vanuit de vooraf ingestelde sjablonen, gewijzigde vallen terug op AI-vertaling;
- Interfacedetails: meer dan 300 offline vectorpictogrammen (nul externe verzoeken), lichte en donkere thema's, responsieve lay-out, PWA-installatie en aanpasbare sitetitel en aanmeldachtergrond.

## 3. Technische architectuur

| Laag | Technologie |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie, Vite 7, vite-plugin-pwa |
| Aanmeldschil | React 18, Tailwind CSS 4, Vite 6 (apart gebouwd, meegeleverd met het frontend-bundel) |
| Server | Hono 4.12, Drizzle ORM, postal-mime, i18next, Resend SDK |
| Platform | Cloudflare Workers, D1 (dubbele database), KV, R2, Workers AI, Email Routing, Turnstile |
| Externe diensten | Resend (verzending), Telegram Bot (pushmeldingen), optionele B2／S3-compatibele opslag |

De twee databases zijn fysiek gescheiden: `USER_DB` bevat accounts, rollen en instellingen, terwijl `MAIL_DB` e-mail en logboeken bevat; uitrol met één database blijft 100% achterwaarts compatibel. De repository is als volgt ingedeeld:

| Map | Verantwoordelijkheid |
| --- | --- |
| `mail-worker` | Backend: api (20 endpoint-modules), service, dao, email (inkomende verwerking), security, i18n, init (uitrol-bootstrap) |
| `mail-vue` | Frontend single-page applicatie (PWA) |
| `temp_login_ui` | React-aanmeldschil, ingebouwd in `dist/login` van de frontend |
| `EpomailDocs` | Deze site met juridische documenten (Astro 5 + Starlight, een aparte git-repository) |
| `tests` | 105 geautomatiseerde test-, audit- en inspectiescripts (Playwright volledige stack, publiek end-to-end, statische scans) |
| `scripts` | Toolchain met daaronder het i18n-audittrio symmetrie／verwijzingen／hardcoding |

## 4. Beveiligingsontwerp

- Referenties en sessies: wachtwoorden gezouten en gehasht met PBKDF2-HMAC-SHA256 bij 100.000 iteraties; sessies als JWT's die 30 dagen geldig zijn, bewaard in KV en sterk geanonimiseerd;
- Manipulatiebestendige routering: mail-URL's gebruiken altijd een willekeurige hash van 20 tekens, ondertekend met HMAC-SHA256 en gebonden aan gebruiker en tenant; sequentiële ID's worden nooit blootgesteld, wat enumeratie en BOLA／IDOR-manipulatie uitsluit;
- Drieledige XSS-verdediging: opschoning met DOMPurify, filtering van body style-injecties, en uitvoer van bijlagen beperkt tot een MIME-whitelist met strikte CSP en `nosniff`;
- SSRF-blokkade: uitgaande verzoeken passeren een controle op publieke adressen; loopback-, RFC 1918- en cloud-metadata-adressen worden altijd geweigerd;
- Permissiegateway: 137 routes met 100% authenticatiedekking; bij het verwijderen van een account wordt de KV-sessie onmiddellijk ingetrokken.

Deze maatregelen zijn afgerond in de volledige beveiligingsverharding van 22 september 2026 (afhandeling van bevindingen P0／P1／P2, 43 geautomatiseerde asserties allemaal groen). De informatieverplichtingen richting personen, bewaartermijnen, de lijst van derden en de rechten van betrokkenen staan beschreven in [Gegevensverwerking en beveiliging](/nl/mail/data-security/) en de [Verwerkerslijst](/nl/mail/sub-processors/).

## 5. Ontwikkelgeschiedenis en de commit-keten

Het project wordt doorlopend ontwikkeld sinds de eerste commit van 21 juli 2026 (`2bbb582`). Per 30 september 2026 telt de hoofdrepository 535 commits; deze site (EpomailDocs, een aparte git-repository) telt daar 10 bovenop. De tabel hieronder somt de mijlpalen per fase op met hun ankercommits (korte hashes):

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
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): 上线前审计修订——系统邮件不可变投递事实校准、AI 翻译预置模板披露、robots.txt
```

De tabel en ankerketen hierboven zijn op mijlpaalniveau; elke reguliere fix, test en documentatiecommit tussen de fasen is bewaard in de git-geschiedenis en is één voor één te volgen via de [GitHub-commitgeschiedenis](https://github.com/shijianus/epomail/commits). De hoofdrepository bewaart daarnaast twee archiefbestanden, `CHECKLIST.log` (taakuitvoeringslog) en `REPORTS.md` (diepgaande auditrapporten), één-op-één gekoppeld aan de commits.

## 6. Kwaliteitsborging

- De map `tests/` bevat 105 geautomatiseerde test-, audit- en inspectiescripts, met dekking van Playwright full-stack browserregressie, publieke end-to-end asserties tegen productie en statische scans van de hele repository;
- Representatieve gekwantificeerde controles: beveiligingsverharding 43／43 asserties, publieke routering end-to-end 32／32, aanmeldscherm in zes talen 62／62, sensorische inspectie 33／33 en 369 productie-integriteitsvergelijkingen byte voor byte;
- De driedelige statische i18n-audit: `i18n-symmetry` (absoluut symmetrische sleutelsets over zes talen), `i18n-audit` (nul ontbrekende letterlijke verwijzingen) en `i18n-hardcoded` (nul ongeünpackte hardgecodeerde gebruikerszichtbare tekst);
- Nul testgegevensresten: elke testcase ruimt fysiek op in een `finally`-blok; de database en KV bevatten geen fictieve gegevens;
- De ontwikkeling volgt een vijfstaps-SOP (bereikbevestiging, gedisciplineerd coderen, full-stack testen, gedisciplineerde commits, rapportage bovenaan het antwoord), met uitvoer gesplitst naar `CHECKLIST.log` en `REPORTS.md`.

## 7. Het project ophalen en uitrollen

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

## 8. Gerelateerde documenten

| Bron | Link |
| --- | --- |
| Privacy- en voorwaardenoverzicht | [Overzicht](/nl/mail/overview/) |
| Privacybeleid | [Privacybeleid](/nl/mail/privacy-policy/) |
| Servicevoorwaarden | [Servicevoorwaarden](/nl/mail/terms-of-service/) |
| Beleid voor acceptabel gebruik | [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
| Gegevensverwerking en beveiliging | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Verwerkerslijst | [Verwerkerslijst](/nl/mail/sub-processors/) |
| Begrippenlijst | [Begrippenlijst](/nl/mail/key-terms/) |
