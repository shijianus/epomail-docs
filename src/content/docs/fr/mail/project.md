---
title: Présentation du projet EpoCanvas Mail
description: Présentation complète du projet EpoCanvas Mail—positionnement, fonctions principales, architecture technique, conception de la sécurité, historique de développement et chaîne complète des commits.
---

**Premier commit : 21 juillet 2026 | Version actuelle : v1.1.0 | Licence : MIT**

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.11**

EpoCanvas Mail est un service de messagerie open source qui fonctionne sur le réseau edge de Cloudflare. Avec un seul domaine et un compte Cloudflare, vous pouvez mettre en place un service de messagerie personnel prenant en charge l'envoi et la réception d'e-mails, les pièces jointes et l'accès multi-appareils. Le projet est exploité en tant qu'instance hébergée à l'adresse [mail.epocanvas.com](https://mail.epocanvas.com), publie l'intégralité de son code source pour l'auto-hébergement et propose une application Android compagnon (epomail). Cette page présente le positionnement du projet, ses fonctions, son architecture technique, sa conception de la sécurité et son historique de développement ; les conditions juridiques du service et les pratiques de confidentialité sont énoncées dans l'[Aperçu des mentions légales](/fr/mail/overview/).

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Les documents juridiques et techniques du présent site visent à établir des normes de communication communautaires non commerciales, transparentes et rigoureuses.

![Architecture système d'EpoCanvas Mail : la couche client (application web, application Android, applications tierces OAuth) se connecte via le edge Cloudflare ; les Workers portent l'API, l'analyse des e-mails entrants et les fonctions d'IA, l'envoi sortant passant par Resend et Telegram ; les données sont stockées dans deux bases D1, KV et un stockage d'objets](/images/mail/fr/project-architecture.svg)

*Figure : Architecture du système. Les clients se connectent par le edge, sans serveur d'origine unique ; les e-mails entrants sont reçus et analysés par Email Routing, l'envoi sortant passe par le canal Resend ; l'ensemble de l'état est conservé dans les ressources Cloudflare du déployeur.*

## 1. Positionnement

Exploiter son propre système de messagerie exige un serveur entretenu dans la durée, une IP fixe et une gestion anti-spam ; les services de messagerie commerciaux concentrent quant à eux les données entre les mains du fournisseur, sans que l'utilisateur puisse vérifier comment elles sont traitées. EpoCanvas Mail emprunte une troisième voie : l'ensemble du service tient dans le quota modéré de Cloudflare (calcul Workers, bases de données D1, cache KV, stockage d'objets R2), livré de manière serverless, sans coût de serveur fixe et avec un code entièrement open source.

- Aucune charge d'exploitation : après le déploiement, ni maintenance du système ni des certificats ; la montée en charge et l'accélération mondiale sont gérées par Cloudflare ;
- Maîtrise des données : toutes les données d'une instance auto-hébergée résident dans la base D1 et le stockage d'objets du déployeur lui-même ; le code n'intègre aucune télémétrie ;
- Double usage : s'inscrire sur l'instance hébergée, ou prendre le code source et le déployer sur son propre domaine. La répartition du rôle de responsable du traitement dans chaque scénario figure à la section 2 de l'[Aperçu](/fr/mail/overview/).

## 2. Aperçu des fonctionnalités

Le projet couvre l'envoi et la réception, l'organisation, la recherche, l'automatisation et la plateforme ouverte ; le détail de chaque fonctionnalité avec captures d'écran réelles figure dans le [Guide des fonctionnalités](/fr/mail/features/). Points clés : réception via Cloudflare Email Routing et envoi multi-canaux ; boîte de réception à huit vues avec fils de discussion et vue en trois colonnes ; syntaxe de recherche avancée et moteur de règles de classement ; extraction des codes de vérification par Workers AI et traduction intégrale préservant la mise en page ; centre OAuth 2.0 / OIDC et jetons API personnels ; export des données (JSON et .eml).

## 3. Aperçu de l'architecture

Le serveur fonctionne sur Cloudflare Workers (sandbox V8 Isolate sans état) ; les données résident dans deux bases D1 physiquement isolées (base utilisateurs et base courriels, rétrocompatibilité à 100 % en déploiement mono-base), dans KV et dans le stockage d'objets (chaîne à quatre niveaux : S3 personnel, S3 configuré, R2, KV) ; la réception passe par Email Routing, l'envoi par Resend / Mailjet et autres canaux, et l'IA par Workers AI. Topologie complète, chiffrement, quotas par rôle et cycle de vie des courriels : voir [Architecture technique](/fr/mail/architecture/).

## 4. À qui ce projet convient et à qui il ne convient pas

Le projet convient aux situations suivantes :

- particuliers ou petites équipes disposant déjà d'un domaine et d'un compte Cloudflare et souhaitant une boîte aux lettres sans coût de serveur fixe ;
- utilisateurs auto-hébergés souhaitant un code source auditable et des données restant intégralement dans leur propre compte ;
- utilisateurs individuels ayant besoin de boîtes isolées, d'un classement automatique et de l'extraction instantanée des codes de vérification pour les courriels d'inscription.

Évaluez une alternative dans les situations suivantes :

- scénarios d'entreprise exigeant un engagement de disponibilité, un support formel ou une conservation d'archives à long terme : le service ne garantit aucun SLA et les courriels de la corbeille sont supprimés physiquement 7 jours après réception (voir [Conditions d'utilisation](/fr/mail/terms-of-service/), Section 8) ;
- usages centrés sur l'envoi massif de marketing : la politique d'utilisation acceptable interdit les courriels commerciaux massifs non sollicités (voir [Politique d'utilisation acceptable](/fr/mail/acceptable-use/), Section 3) ;
- communications nécessitant un chiffrement de bout en bout : le chiffrement du service est un chiffrement statique côté serveur et ne couvre pas les pièces jointes (voir [Traitement des données et sécurité](/fr/mail/data-security/), Section 3) ;
- utilisateurs ne souhaitant pas maintenir les ressources Cloudflare, le domaine et la configuration des clés : l'auto-hébergement requiert l'injection des secrets et l'initialisation (voir Section 8).

## 5. Aperçu de la conception de sécurité

Les mots de passe sont hachés par PBKDF2-HMAC-SHA256 (100 000 itérations) avec sel ; les clés TOTP sont chiffrées au repos par AES-256-GCM ; les URL des courriels utilisent un hachage aléatoire de 20 caractères signé HMAC-SHA256 contre l'escalade de privilèges et l'énumération ; triple défense XSS et blocage SSRF ; remise des courriels officiels sous forme d'instantanés immuables. Ces mesures ont été bouclées lors du durcissement de sécurité complet du 22 septembre 2026 (43 assertions automatisées au vert) ; la liste complète figure dans [Architecture technique](/fr/mail/architecture/), section 7, et les informations et durées de conservation dues aux personnes dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/).

## 6. Historique de développement et chaîne des commits

Le projet est développé en continu depuis le premier commit du 21 juillet 2026 (`2bbb582`). Au 4 octobre 2026, le dépôt principal compte plus de 560 commits ; le présent site (EpomailDocs, dépôt git séparé) compte plus de 45 commits supplémentaires (les listes ci-dessous sont à la granularité des jalons ; les commits intermédiaires et ultérieurs sont sur GitHub). Le tableau ci-dessous présente les jalons par phase avec leurs commits d'ancrage (hachages courts) :

| Phase | Période | Livraisons | Commits d'ancrage |
| --- | --- | --- | --- |
| 1. Fondations | 2026-07-21 → 07-23 | Initialisation du dépôt ; interface Vue 3 phase une (palette globale, typographie, barre latérale claire et sombre) ; lecture fractionnée à trois colonnes façon Outlook | `2bbb582` `29f9896` `a531341` |
| 2. Marque et coque de connexion | 2026-08-05 → 08-09 | Logo transparent et favicon unifiés ; thème sombre par défaut et animation de chargement de marque ; coque de connexion React avec l'animation de traversée spatiale | `6572695` `e3e57c6` |
| 3. Prototype et moteur de règles | 2026-08-12 → 08-17 | Interface prototype appliquée intégralement ; système d'étiquettes synchronisé avec le backend ; report／indésirables／corbeille ; moteur de règles de classement (modèles par défaut, heuristique, interception stricte par listes) ; syntaxe de recherche avancée ; tableau de bord analytique du classement ; verrouillage anti-force brute | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. Éditeur et courrier de bienvenue | 2026-08-28 → 08-30 | Boîte de dialogue plein écran du courrier de bienvenue ; barre d'outils TinyMCE Alloy reconstruite autour de 17 outils Markdown | `9f6ece8` `59bfe60` |
| 5. Plateforme ouverte et stockage | 2026-09-03 → 09-06 | Centre d'authentification OAuth 2.0／OIDC ; isolation physique double D1 ; stockage B2／S3 apporté par l'utilisateur avec comptage des quotas ; centre de gestion du stockage et des bases de données ; 6 groupes de rôles et bac à sable visiteur | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. Fonctions d'IA | 2026-09-06 → 09-13 | Architecture de réception façon Gmail et traduction intégrale par IA ; plus de 300 icônes vectorielles hors ligne ; pool de modèles AI Hub et tests à zéro jeton ; traduction concurrente par segments et sous-titres OCR | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. Restriction des permissions et correctifs de sécurité | 2026-09-09 → 09-11 | GitHub Release v1.1.0 ; correction de la faille zero-day d'élévation de privilèges inter-domaines ; connexion administrateur multi-domaines ; panneau applications tierces et partage de données | `7558fc8` `5855db1` `3234d69` |
| 8. Internationalisation en six langues | 2026-09-14 → 09-17 | Six langues sur tout le projet avec dictionnaires à zéro fuite ; modèles d'e-mails délivrés dans la langue du destinataire ; publication intégrale sur GitHub ; mise en production sur Cloudflare | `aa1955e` `42c33f1` `25985b1` |
| 9. Vérification en deux étapes et audits | 2026-09-18 → 09-22 | Connexion TOTP／Passkey ; chaîne d'amorçage de déploiement reconstruite et isolation des secrets ; lots de correctifs d'audit UI ; durcissement de sécurité complet | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Expérience façon Gmail | 2026-09-25 → 09-27 | Mise en page en couches du détail des messages ; réponse en ligne et réactions par émoji ; amélioration des fils de conversation ; routage et liens profonds façon Gmail ; routage anti-falsification par hachage cryptographique | `a8d841a` `4af2985` `4b371a8` |
| 11. Site de documents juridiques | 2026-09-27 → 09-29 | Ensemble juridique du présent site en six langues et sept documents ; extension selon le paradigme des pages de Google ; construction du site Astro 5 + Starlight ; dépôt git séparé | `2bed02b` `617cccf` |
| 12. Finalisation et audit avant mise en ligne | 2026-09-29 → 09-30 | Intégration de la page de présentation et de la politique de confidentialité officielle ; réécriture complète v5.0 sans citation de numéros d'articles ; calibrage des faits techniques et complément de la liste des sous-traitants avant mise en ligne | `7ad5ebc` `05c222c` `5197f50` |
| 13. Exploitation continue du site de documentation | 2026-10-01 → 10-04 | instance de démonstration locale et outil d'amorçage ; polissage visuel et d'entrée v5.8 ; extension v5.9 du guide des fonctionnalités et de l'architecture (×6 langues) avec captures réelles du produit ; audit indépendant v5.9 avec vérification intégrale des affirmations par rapport au code | `26f6c3b` `8a60539` |

Chaîne complète des commits d'ancrage du dépôt principal (hachages complets de 40 caractères, vérifiables un à un dans l'historique GitHub) :

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
```

Chaîne des commits du présent site (dépôt EpomailDocs séparé) :

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
```

Le tableau et la chaîne d'ancrage ci-dessus sont à l'échelle des jalons ; chaque correctif, test et commit de documentation entre les phases est conservé dans l'historique git et peut être suivi un à un via l'[historique des commits GitHub](https://github.com/shijianus/epomail/commits). Le dépôt principal conserve en outre deux fichiers d'archive, `CHECKLIST.log` (journal d'exécution des tâches) et `REPORTS.md` (rapports d'audit approfondis), en correspondance un à un avec les commits.

## 7. Assurance qualité

- Le répertoire `tests/` contient plus d'une centaine de scripts de test, d'audit et d'inspection automatisés, couvrant la régression navigateur sur pile complète Playwright, les assertions bout-en-bout publiques contre la production et les analyses statiques de tout le dépôt ;
- Vérifications quantifiées représentatives : durcissement de sécurité 43／43 assertions, routage public bout-en-bout 32／32, surface de connexion en six langues 62／62, inspection sensorielle 33／33, et 369 comparaisons d'intégrité de production octet par octet ;
- Triple audit statique i18n : `i18n-symmetry` (jeux de clés strictement symétriques entre les six langues), `i18n-audit` (zéro référence littérale manquante) et `i18n-hardcoded` (zéro texte visible codé en dur non enveloppé) ;
- Zéro résidu de données de test : chaque cas de test nettoie physiquement dans un bloc `finally` ; la base de données et le KV ne contiennent aucune donnée fictive ;
- Le développement suit un SOP en cinq étapes (confirmation du périmètre, codage discipliné, tests sur pile complète, commits disciplinés, compte rendu en tête de réponse), avec une production ventilée dans `CHECKLIST.log` et `REPORTS.md`.

## 8. Obtenir le projet et le déployer

| Voie | Description |
| --- | --- |
| Instance hébergée | S'inscrire et utiliser directement [mail.epocanvas.com](https://mail.epocanvas.com) |
| Auto-hébergement | Déployer sur son propre domaine et compte Cloudflare en trois étapes |
| Code source | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) (licence MIT) |
| Application mobile | L'application Android, epomail |

Étapes minimales d'auto-hébergement :

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

Après le premier déploiement, visitez `/api/init/<jwt_secret>` pour terminer l'initialisation de la base de données et l'ensemencement des six rôles standard ; les secrets de production sont toujours injectés avec `npx wrangler secret put`, et le développement local utilise `.dev.vars` (jamais versionné).

## 9. Questions fréquentes

**L'utilisation de ce service est-elle payante ?**
Le logiciel est gratuit sous licence MIT ; le coût de l'auto-hébergement correspond à votre propre consommation Cloudflare. L'instance hébergée n'a actuellement aucune fonction payante ; le nombre de boîtes, le volume d'envoi et les quotas de stockage dépendent du rôle du compte.

**L'administrateur peut-il lire mes courriels ?**
Cela dépend du mode de messagerie de l'instance : en mode « Tout », l'administrateur peut lire tous les courriels ; en mode « Privé », uniquement les indésirables, les courriels supprimés et sans propriétaire ; en mode « Chiffré », l'interface d'administration ne renvoie aucun courriel utilisateur. Voir la portée du chiffrement dans la [Politique de confidentialité](/fr/mail/privacy-policy/), Section 10.

**Un courriel supprimé peut-il être récupéré ?**
Les courriels de la corbeille sont supprimés physiquement par le système 7 jours après réception, sans possibilité de récupération ; conservez d'abord une copie via « Paramètres → Export des données » (voir la [Politique de confidentialité](/fr/mail/privacy-policy/), Section 8).

**Que faut-il pour l'auto-hébergement ?**
Un domaine et un compte Cloudflare ; les étapes de déploiement et l'injection des secrets figurent en Section 8. Toutes les données restent dans les ressources Cloudflare du déployeur, et le code ne contient aucune télémétrie.

## 10. Documents associés

| Ressource | Lien |
| --- | --- |
| Modes de fonctionnement : formes de déploiement, modes courriel et connexion | [Modes de fonctionnement](/fr/mail/modes/) |
| Guide des paramètres : paramètres personnels et console d'administration | [Guide des paramètres](/fr/mail/settings/) |
| Aperçu des mentions légales | [Aperçu](/fr/mail/overview/) |
| Politique de confidentialité | [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Conditions d'utilisation | [Conditions d'utilisation](/fr/mail/terms-of-service/) |
| Politique d'utilisation acceptable | [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) |
| Traitement des données et sécurité | [Traitement des données et sécurité](/fr/mail/data-security/) |
| Liste des sous-traitants | [Liste des sous-traitants](/fr/mail/sub-processors/) |
| Définitions | [Définitions](/fr/mail/key-terms/) |
