---
title: Présentation du projet EpoCanvas Mail
description: Présentation complète du projet EpoCanvas Mail—positionnement, fonctions principales, architecture technique, conception de la sécurité, historique de développement et chaîne complète des commits.
---

**Premier commit : 21 juillet 2026 | Version actuelle : v1.1.0 | Licence : MIT**

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

EpoCanvas Mail est un service de messagerie open source qui fonctionne sur le réseau edge de Cloudflare. Avec un seul domaine et un compte Cloudflare, vous pouvez mettre en place un service de messagerie personnel prenant en charge l'envoi et la réception d'e-mails, les pièces jointes et l'accès multi-appareils. Le projet est exploité en tant qu'instance hébergée à l'adresse [mail.epocanvas.com](https://mail.epocanvas.com), publie l'intégralité de son code source pour l'auto-hébergement et propose une application Android compagnon (epomail). Cette page présente le positionnement du projet, ses fonctions, son architecture technique, sa conception de la sécurité et son historique de développement ; les conditions juridiques du service et les pratiques de confidentialité sont énoncées dans l'[Aperçu des mentions légales](/fr/mail/overview/).

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Les documents juridiques et techniques du présent site visent à établir des normes de communication communautaires non commerciales, transparentes et rigoureuses.

![Architecture système d'EpoCanvas Mail : la couche client (application web, application Android, applications tierces OAuth) se connecte via le edge Cloudflare ; les Workers portent l'API, l'analyse des e-mails entrants et les fonctions d'IA, l'envoi sortant passant par Resend et Telegram ; les données sont stockées dans deux bases D1, KV et un stockage d'objets](/images/mail/fr/project-architecture.svg)

*Figure : Email Routing analyse les messages entrants et les canaux configurés assurent l'envoi. Des données peuvent aussi atteindre le stockage, les identités, les notifications ou l'IA externes ; voir la [Liste des sous-traitants](/fr/mail/sub-processors/).*

## 1. Positionnement

Exploiter son propre système de messagerie exige un serveur entretenu dans la durée, une IP fixe et une gestion anti-spam ; les services de messagerie commerciaux concentrent quant à eux les données entre les mains du fournisseur, sans que l'utilisateur puisse vérifier comment elles sont traitées. EpoCanvas Mail emprunte une troisième voie : l'ensemble du service tient dans le quota modéré de Cloudflare (calcul Workers, bases de données D1, cache KV, stockage d'objets R2), livré de manière serverless, sans coût de serveur fixe et avec un code entièrement open source.

- Aucune charge d'exploitation : après le déploiement, ni maintenance du système ni des certificats ; la montée en charge et l'accélération mondiale sont gérées par Cloudflare ;
- Maîtrise des données : le déployeur choisit ressources et services externes. Le code traite des signaux de sécurité et conserve des traces. Aucun canal dédié de télémétrie d'usage vers l'auteur amont n'a été trouvé ; journaux et requêtes tierces existent. Voir la [Politique de confidentialité](/fr/mail/privacy-policy/) ;
- Double usage : s'inscrire sur l'instance hébergée, ou prendre le code source et le déployer sur son propre domaine. La répartition du rôle de responsable du traitement dans chaque scénario figure à la section 2 de l'[Aperçu](/fr/mail/overview/).

## 2. Aperçu des fonctionnalités

Le projet couvre l'envoi et la réception, l'organisation, la recherche, l'automatisation et la plateforme ouverte ; le détail de chaque fonctionnalité avec captures d'écran réelles figure dans le [Guide des fonctionnalités](/fr/mail/features/). Points clés : réception via Cloudflare Email Routing et envoi multi-canaux ; boîte de réception à huit vues avec fils de discussion et vue en trois colonnes ; syntaxe de recherche avancée et moteur de règles de classement ; extraction des codes de vérification par Workers AI et traduction intégrale préservant la mise en page ; centre OAuth 2.0 / OIDC et jetons API personnels ; export des données (JSON et .eml).

Chaque interface et route est parcourue dans l'[Interface et plan des routes](/fr/mail/interface/) ; la référence complète des opérateurs de recherche et du moteur de règles de classement figure dans la [Référence de la recherche et des règles](/fr/mail/search/).

Le site documentaire propose sept langues ; l'interface du produit en propose actuellement six, sans l'allemand. Les documents allemands utilisent donc les captures de l'interface anglaise dans `/images/mail/en/ui/` pour les visites guidées localisées. Les captures communes existantes dans `/images/mail/ui/` conservent leur langue d'interface d'origine, indiquée dans la légende ou le texte alternatif. Le texte, les légendes et les schémas restent en allemand. Ces exceptions documentées pour les captures ne signifient pas qu'une interface allemande existe.

La chaîne chinoise `重要` est une étiquette littérale du produit signifiant « important », et non du texte non traduit. Les alias de recherche `$发件人`, `$用户`, `$收件人` et `$主题` doivent aussi rester littéraux ; ils correspondent respectivement à `$sender`, `$user`, `$to` et `$subject`. Les noms de langues de l'interface `简体中文` (chinois simplifié) et `繁體中文` (chinois traditionnel) conservent leur graphie d'origine. Les clés de configuration, routes, noms de fichiers et autres constantes techniques ne changent pas avec la langue de la documentation.

## 3. Aperçu de l'architecture

Le serveur fonctionne sur Cloudflare Workers (sandbox V8 Isolate sans état) ; les données résident dans deux bases D1 physiquement isolées (base utilisateurs et base courriels, rétrocompatibilité à 100 % en déploiement mono-base), dans KV et dans le stockage d'objets (chaîne à quatre niveaux : S3 personnel, S3 configuré, R2, KV) ; la réception passe par Email Routing, l'envoi par Resend / Mailjet et autres canaux, et l'IA par Workers AI. Topologie complète, chiffrement, quotas par rôle et cycle de vie des courriels : voir [Architecture technique](/fr/mail/architecture/).

## 4. À qui ce projet convient et à qui il ne convient pas

Le projet convient aux situations suivantes :

- particuliers ou petites équipes disposant déjà d'un domaine et d'un compte Cloudflare et souhaitant une boîte aux lettres sans coût de serveur fixe ;
- utilisateurs auto-hébergés souhaitant un code auditable et le choix de leurs stockages et services tiers ;
- utilisateurs individuels ayant besoin de boîtes isolées, d'un classement automatique et de l'extraction instantanée des codes de vérification pour les courriels d'inscription.

Évaluez une alternative dans les situations suivantes :

- usages exigeant disponibilité garantie, support formel ou archivage durable : aucun SLA n'est promis ; la corbeille utilise la création du message depuis plus de 7 jours, sans garantir 7 jours après déplacement. Voir la [Politique de confidentialité](/fr/mail/privacy-policy/) ;
- usages centrés sur l'envoi massif de marketing : la politique d'utilisation acceptable interdit les courriels commerciaux massifs non sollicités (voir [Politique d'utilisation acceptable](/fr/mail/acceptable-use/), Section 3) ;
- communications nécessitant un chiffrement de bout en bout : le chiffrement du service est un chiffrement statique côté serveur et ne couvre pas les pièces jointes (voir [Traitement des données et sécurité](/fr/mail/data-security/), Section 3) ;
- utilisateurs ne souhaitant pas maintenir les ressources Cloudflare, le domaine et la configuration des clés : l'auto-hébergement requiert l'injection des secrets et l'initialisation (voir Section 8).

## 5. Aperçu de la conception de sécurité

Les nouveaux mots de passe utilisent par défaut PBKDF2-HMAC-SHA256 avec sel (210 000 itérations, configurables), avec migration des anciens hachés à la connexion ; les secrets TOTP activés utilisent AES-256-GCM. Autres mécanismes : liens signés, filtrage XSS, validation d'adresses sortantes et instantanés officiels. Les 43 assertions du 22 septembre 2026 sont un résultat historique, pas une certification de la version actuelle ou de la production. Voir [Architecture technique](/fr/mail/architecture/) et [Traitement des données et sécurité](/fr/mail/data-security/).

## 6. Historique de développement et chaîne des commits

Le projet est développé en continu depuis le premier commit du 21 juillet 2026 (`2bbb582`). Au 5 octobre 2026, le dépôt principal compte plus de 660 commits ; le présent site (EpomailDocs, dépôt git séparé) compte plus de 50 commits supplémentaires (les listes ci-dessous sont à la granularité des jalons ; les commits intermédiaires et ultérieurs sont sur GitHub). Le tableau ci-dessous présente les jalons par phase avec leurs commits d'ancrage (hachages courts) :

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
| 14. Gouvernance d'audit et extension de la présentation | 2026-10-04 → 10-05 | gouvernance d'audit indépendante v5.10 (corrections intégrales par rapport au code, « en » intégré au contrôle de symétrie structurale) ; pages v5.11 des modes de fonctionnement et du guide des paramètres (×6 langues, captures réelles du produit) ; refonte de la console d'audit (RBAC et persistance D1) et indicateur de fonctionnalité OAuth | `08448fb` `ff4e93f` `596e7c1` |

La chaîne complète des commits d'ancrage du dépôt principal suit, avec des hachages de 40 caractères vérifiables dans GitHub. Dans les deux chaînes, les sujets chinois sont résumés en français ; les sujets rédigés à l'origine en anglais sont conservés. Ces résumés sont historiques et ne décrivent pas la version actuelle. Les hachages permettent de retrouver les commits et leurs sujets exacts.

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
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): ajouter une plateforme OAuth réservée aux administrateurs et une gestion des applications séparée ; retirer ces fonctions des profils personnels
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): ajouter le centre Stockage et bases de données centrales aux paramètres système et refondre la configuration des bases tierces
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): affiner les permissions des six groupes administratifs ; ajouter les interactions du bac à sable visiteur, la liaison aux niveaux du blog et une vue de l'architecture UI
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): adopter une réception façon Gmail ; améliorer la fiche to-me, la barre d'actions, la traduction intégrale par IA et l'intégration des clés API au panneau d'administration
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): refondre les 300+ icônes en vecteurs hors ligne ; chargement sans requête réseau et couverture de tous les états des icônes
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: ajouter le chinois traditionnel, le français, l'espagnol et le néerlandais à tout le projet, les courriels de bienvenue multilingues et les annonces par courriel à tous les utilisateurs
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): mettre en production sur Cloudflare ; vérifier le parcours visuel sur appareils réels avec Playwright ; corriger l'échappement Vue-i18n et les défauts du panneau latéral
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): refondre la connexion avec vérification en deux étapes (TOTP/Passkey), animations fluides et interactions améliorées
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): corriger trois défauts de vérification, refondre l'amorçage des nouveaux déploiements et isoler la gestion des secrets
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): durcir la sécurité et corriger les vulnérabilités avec protections P0/P1/P2, blocage SSRF, triple défense XSS, masquage des données de session et alignement des permissions
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): aligner la présentation hiérarchisée du détail des messages et la réponse rapide flottante sur Gmail
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): aligner l'isolation multicomptes sur Gmail et utiliser un routage par hachage cryptographique contre les accès non autorisés
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): faire d'EpomailDocs un dépôt git dédié et cesser son suivi dans le dépôt parent
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): archiver les améliorations visuelles et d'entrée d'EpomailDocs v5.8 (EpomailDocs a1c1e89 : icônes de pagination, tableaux centrés et négociation Accept-Language)
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): archiver l'extension documentaire EpomailDocs v5.9 (EpomailDocs beb956a : guides des fonctionnalités et de l'architecture en six langues, captures réelles, correction du centrage du contenu et démonstration locale)
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): ajouter l'amorçage de la démonstration locale avec le générateur de courriels seed-demo.py et ignorer la configuration locale wrangler-demo.toml
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): auditer indépendamment EpomailDocs v5.9 ; vérifier toute la présentation et les textes juridiques contre le code et contrôler leur exhaustivité
21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  feat(sys-setting): ajouter l'indicateur ENABLE_OAUTH_INTEGRATION, désactivé par défaut pour masquer les paramètres d'authentification tierce
73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence
596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  docs(checklist): archiver l'extension EpomailDocs v5.11 (EpomailDocs ff4e93f+c597fca : guides des modes et des paramètres en six langues, neuf captures réelles, version 5.11 sur tout le site et contrôles visuels locaux réussis)
```

Chaîne des commits du présent site (dépôt EpomailDocs séparé) :

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): finaliser le site juridique v4.1 pour Taïwan (six langues, sept documents, 42 pages)
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: refondre aup-ladder.svg pour supprimer les chevauchements ; consigner la validation visuelle et archiver les travaux
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): ajouter la page de redirection racine et remplacer l'erreur 404 de / par des accès à l'aperçu en six langues
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): ajouter la présentation en six langues avec positionnement, fonctions, architecture, sécurité et chaîne complète des commits
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): conserver l'ancienne branche documentaire distante comme ancêtre et utiliser le site juridique local en six langues comme arborescence de référence
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): v5.0 retire les citations de numéros d'articles et synchronise sept documents et leurs illustrations SVG en six langues
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): révisions d'audit v5.1 ; divulguer la liaison aux niveaux du blog dans la liste des sous-traitants, corriger les données temporelles et compléter les outils
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): révisions avant lancement ; corriger les faits sur la livraison immuable des courriels système et documenter les modèles de traduction IA prédéfinis et robots.txt
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 étend la clause de version faisant autorité à tout le site et ajoute limites d'usage et questions fréquentes à la présentation
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3 corrige les constats de la revue indépendante et fixe le chemin de publication docs.epocanvas.com/epomail
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 complète les illustrations, les définitions, les durées de conservation manquantes et la précision des références
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 retire les affirmations non étayées et harmonise les six langues ; vérifier les faits contre le code, retraduire neuf documents anglais (en) à structure identique et redessiner les schémas à plat
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): localiser douze schémas en six langues pour que chaque document ait ses figures dans sa langue
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 corrige tous les constats P1/P2, ajoute huit sections, impose un seul h1 par page et réalise la première publication publique
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 améliore la présentation et les accès avec des icônes de document dans les cartes de pagination, des tableaux centrés et la négociation Accept-Language
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 sépare et enrichit les guides des fonctionnalités et de l'architecture en six langues, avec captures réelles et colonne de contenu centrée
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  chore: sync manifest commit hash for 08448fb
08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  feat(docs): v5.10 corrige trois constats P1 contre le code et tous les P2 de l'audit indépendant ; inclure la version anglaise (en) dans le contrôle de symétrie structurelle
ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  feat(docs): v5.11 enrichit la présentation avec les guides des modes et des paramètres en six langues et ajoute toutes les captures réelles au dépôt
c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  chore: sync manifest commit hash for ff4e93f
```

Le tableau et la chaîne d'ancrage ci-dessus sont à l'échelle des jalons ; chaque correctif, test et commit de documentation entre les phases est conservé dans l'historique git et peut être suivi un à un via l'[historique des commits GitHub](https://github.com/shijianus/epomail/commits). Le dépôt principal conserve en outre deux fichiers d'archive, `CHECKLIST.log` (journal d'exécution des tâches) et `REPORTS.md` (rapports d'audit approfondis), en correspondance un à un avec les commits.

## 7. Assurance qualité

- Le répertoire `tests/` contient plus d'une centaine de scripts de test, d'audit et d'inspection automatisés, couvrant la régression navigateur sur pile complète Playwright, les assertions bout-en-bout publiques contre la production et les analyses statiques de tout le dépôt ;
- Résultats historiques : durcissement 43/43 assertions, routage public 32/32, connexion en six langues 62/62, inspection visuelle 33/33 et 369 comparaisons d'intégrité ; ils concernent les versions et environnements alors testés, sans valider la version actuelle ni la production ;
- Triple audit statique i18n : `i18n-symmetry` (jeux de clés strictement symétriques entre les six langues), `i18n-audit` (zéro référence littérale manquante) et `i18n-hardcoded` (zéro texte visible codé en dur non enveloppé) ;
- Les règles de test imposent un nettoyage dans `finally` ; les résidus réels doivent être vérifiés dans les comptes rendus. Cette règle ne garantit pas une base et un KV toujours exempts de données de test ;
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

Les prérequis complets, la chaîne d'amorçage d'initialisation et l'injection des secrets pour l'auto-hébergement figurent dans le [Guide de déploiement](/fr/mail/deployment/) ; la contribution, l'audit et le développement suivent le [Guide de développement](/fr/mail/development/).
## 9. Questions fréquentes

**L'utilisation de ce service est-elle payante ?**
Le logiciel est gratuit sous licence MIT ; le coût de l'auto-hébergement correspond à votre propre consommation Cloudflare. L'instance hébergée n'a actuellement aucune fonction payante ; le nombre de boîtes, le volume d'envoi et les quotas de stockage dépendent du rôle du compte.

**L'administrateur peut-il lire mes courriels ?**
La visibilité administrateur dépend du mode : Tout permet tous les messages, Privé seulement les indésirables, supprimés et sans propriétaire, Chiffré bloque cette lecture dans l'interface. Le serveur garde la capacité de déchiffrement ; ce n'est pas du bout en bout. Voir la [Politique de confidentialité](/fr/mail/privacy-policy/) et [Traitement des données et sécurité](/fr/mail/data-security/).

**Un courriel supprimé peut-il être récupéré ?**
La corbeille utilise la création du message depuis plus de 7 jours ; un déplacement ne remet pas le compteur à zéro. L'export contient des champs sélectionnés du profil et des messages non supprimés, sans pièces jointes ni MIME original complet. Gardez les pièces jointes séparément avant suppression et vérifiez l'export ; voir la [Politique de confidentialité](/fr/mail/privacy-policy/).

**Que faut-il pour l'auto-hébergement ?**
Il faut un domaine, un compte Cloudflare et les configurations utiles ; voir la section 8. Les services externes de délivrance, stockage, identité, notification et IA peuvent traiter des données : leur maintien intégral dans Cloudflare n'est pas garanti. Voir la [Liste des sous-traitants](/fr/mail/sub-processors/).

## 10. Documents associés

| Ressource | Lien |
| --- | --- |
| Les séquences de prise en main les plus courtes et la vérification d'envoi/réception des deux voies | [Prise en main](/fr/mail/quickstart/) |
| La route et les éléments de chaque interface | [Interface et plan des routes](/fr/mail/interface/) |
| Opérateurs de recherche et conditions de règles de classement | [Référence de la recherche et des règles](/fr/mail/search/) |
| Étapes complètes de l'auto-hébergement | [Guide de déploiement](/fr/mail/deployment/) |
| Environnement de développement et flux d'ingénierie | [Guide de développement](/fr/mail/development/) |
| Ce que fournit l'instance hébergée et ses canaux d'assistance | [Périmètre du service et assistance](/fr/mail/service-scope/) |
| La licence open source et la position juridique de l'auto-hébergement | [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/) |
| Modes de fonctionnement : formes de déploiement, modes courriel et connexion | [Modes de fonctionnement](/fr/mail/modes/) |
| Guide des paramètres : paramètres personnels et console d'administration | [Guide des paramètres](/fr/mail/settings/) |
| Aperçu des mentions légales | [Aperçu](/fr/mail/overview/) |
| Politique de confidentialité | [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Conditions d'utilisation | [Conditions d'utilisation](/fr/mail/terms-of-service/) |
| Politique d'utilisation acceptable | [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) |
| Traitement des données et sécurité | [Traitement des données et sécurité](/fr/mail/data-security/) |
| Liste des sous-traitants | [Liste des sous-traitants](/fr/mail/sub-processors/) |
| Définitions | [Définitions](/fr/mail/key-terms/) |
