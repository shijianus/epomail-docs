---
title: Guide de développement
description: Guide de développement d'EpoCanvas Mail — organisation du dépôt, environnement local, suites de tests et d'inspection, discipline des six langues, discipline des migrations, flux de travail en cinq étapes et mode de contribution.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.16**

La présente page s'adresse aux administrateurs et aux développeurs qui travaillent sur EpoCanvas Mail, l'auditent ou bâtissent dessus : organisation du dépôt, environnement local, système d'assurance qualité et flux de travail d'ingénierie. Les étapes pour mener un déploiement figurent dans le [Guide de déploiement](/fr/mail/deployment/) ; elles ne sont pas répétées ici.

## 1. Organisation du dépôt

```text
epomail/
├── mail-vue/        Front end: Vue 3 + Vite + Element Plus (interface, i18n dictionaries, PWA)
├── mail-worker/     Back end: Cloudflare Worker (API, inbound parsing, AI, D1/KV/R2)
├── temp_login_ui/   Login surface: React app (folded into mail-worker/dist/login at build time)
├── tests/           Automated tests, public end-to-end assertions and inspection scripts
├── scripts/         Tooling (the i18n audit trio, seeding, build helpers)
├── doc/             Archive of long-form analyses
├── EpomailDocs/     This documentation site (a separate git repository)
└── CHECKLIST.log / REPORTS.md   Task log and audit archive
```

## 2. Environnement local

```bash
pnpm install                      # install dependencies at the repository root
cd mail-vue && npm run dev        # front-end dev server
cd mail-vue && npm run build      # front-end build (delivery gate: zero warnings, zero errors)
cd mail-worker && npx wrangler dev  # local full stack (127.0.0.1:8787)
```

Les secrets locaux résident dans `mail-worker/.dev.vars` (jamais committé ; modèle dans `.dev.vars.example`) ; après effacement de `.wrangler/state`, la visite de `/api/init/<jwt_secret>` sème depuis zéro un jeu de données de démonstration complet — voir la section 3 du [Guide de déploiement](/fr/mail/deployment/).

## 3. Tests et inspections

- Le répertoire `tests/` contient plus d'une centaine de scripts automatisés : régressions de navigateur sur toute la pile avec Playwright, assertions de bout en bout sur le réseau public contre la production, balayages statiques à l'échelle du dépôt et comparaisons d'intégrité octet par octet ;
- Chiffres représentatifs : durcissement de la sécurité 43/43 assertions, routage public de bout en bout 32/32, surface de connexion en six langues 62/62, intégrité en production 369 comparaisons octet pour octet ;
- Les changements d'interface ou d'API doivent d'abord construire (`vite build` plus une vérification de compilation du Worker) puis passer une exécution locale de la pile complète ; les données de test sont toujours nettoyées physiquement dans des blocs `finally`, ne laissant aucune donnée fictive dans les bases de données ni dans le KV.

## 4. La discipline des six langues

Les dictionnaires de l'interface et du back-end prennent en charge zh, zh-Hant, en, es, fr et nl avec des jeux de clés absolument symétriques. Après ajout ou modification d'entrées, le trio d'audit statique doit passer :

```bash
node scripts/i18n-symmetry.mjs      # six-language key sets absolutely symmetric
node scripts/i18n-audit.mjs         # zero missing literal references in code
node scripts/i18n-hardcoded.mjs     # zero unwrapped user-visible strings
```

Les courriels système et de bienvenue sont livrés dans la langue du destinataire ; tout nouveau texte visible par l'utilisateur doit toujours passer par une clé de dictionnaire, jamais codé en dur.

## 5. La discipline des migrations

- Les définitions de tables se maintiennent en un seul endroit : les instructions `CREATE TABLE` du module d'initialisation du back-end ;
- Chaque changement de colonne s'accompagne d'une fonction de mise à niveau (`vN_NDB`) qui vérifie avec `PRAGMA table_info` avant d'exécuter `ALTER TABLE ADD COLUMN`, la gardant idempotente ;
- Un démarrage à froid neuf accomplit toute la création de tables et le semis des six rôles standard par le seul `/api/init/<jwt_secret>` — les migrations ne doivent jamais dépendre d'un SQL exécuté à la main.

## 6. Flux de travail d'ingénierie

Le développement suit un SOP en cinq étapes :

1. Périmètre : fixer le rayon d'impact à travers API, tables, composants, dictionnaires et styles ;
2. Implémentation : suivre l'architecture existante, en respectant le mode sombre et la mise en page mobile, avec dégradation gracieuse et défenses par défaut ;
3. Vérification sur toute la pile : contrôles de construction, suite de régression, tests navigateur et nettoyage des données fictives ;
4. Commits disciplinés : messages de commit structurés ; les enregistrements d'exécution sont aiguillés vers `CHECKLIST.log` (journal de routine) ou `REPORTS.md` (audits dédiés) — les documents de gouvernance eux-mêmes ne portent jamais de journaux ;
5. Hashs rapportés : chaque rapport externe s'ouvre sur le hash de commit complet pour la traçabilité.

## 7. Développement du site de documentation

Ce site (EpomailDocs) est un dépôt git séparé bâti sur Astro 5 et Starlight, structurellement symétrique dans les six langues pour chaque document (le chinois traditionnel servant de base formelle) :

```bash
pnpm build                          # build (regenerates the anti-tampering manifest)
node scripts/validate-anchors.cjs   # zero broken anchors site-wide
python scripts/check-structure.py   # six-language structural symmetry
python scripts/verify-laws.py       # legal citations match the verified register
```

Chaque construction régénère le manifeste `tamper-proof.json` ; un changement de documentation se commit en deux temps — le commit de contenu, puis un commit fixant le manifeste sur ce hash.

## 8. Contributions

- Les rapports de bugs et les propositions de fonctions passent par les Issues du dépôt GitHub ; les contributions de code par des Pull Requests (`github.com/shijianus/epomail`) ;
- Les contributions suivent les conventions de messages de commit existantes et les portes de contrôle de la présente page ;
- Les vulnérabilités de sécurité ne doivent pas être divulguées dans des issues publiques — signalez-les en privé via les points de contact de la section 5 de l'[Aperçu confidentialité et conditions](/fr/mail/overview/) ;
- La licence des contributions et du projet figure dans [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/).

## 9. Documents connexes

| Ressource | Lien |
| --- | --- |
| Étapes pour mener un déploiement | [Guide de déploiement](/fr/mail/deployment/) |
| Topologie technique et conception de la sécurité | [Architecture technique](/fr/mail/architecture/) |
| Périmètre du service et canaux d'assistance | [Périmètre du service et assistance](/fr/mail/service-scope/) |
| Positionnement du projet et chaîne des commits | [Présentation du projet](/fr/mail/project/) |
