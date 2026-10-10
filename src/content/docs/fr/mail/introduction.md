---
title: Introduction au site de documentation EpoCanvas Mail
description: Introduction au site de documentation EpoCanvas Mail — positionnement du site, architecture documentaire, parcours de lecture, structure multilingue et navigation complète.
---

**Lancement du site : 28 septembre 2026 | Version actuelle : v5.17 | URL du site : docs.epocanvas.com/epomail**

**Date d'effet : 5 octobre 2026 | Version : 5.17**

Le site de documentation EpoCanvas Mail (ci-après « ce site ») est le centre de documentation officiel du service de messagerie électronique open source EpoCanvas Mail, couvrant les conditions juridiques, les spécifications techniques, les guides d'utilisation et la documentation de développement. Construit avec Astro 5 + Starlight, le site maintient une symétrie structurelle complète sur six langues (chinois simplifié, chinois traditionnel, English, Français, Español, Nederlands), chaque document étant vérifié mot à mot par rapport à l'implémentation du code, offrant aux utilisateurs de l'instance hébergée, aux auto-hébergeurs et aux participants à l'audit une source unique de vérité. Cette page explique le positionnement du site, l'architecture documentaire, les parcours de lecture et les points d'entrée de navigation.

Les documents juridiques de ce site font autorité dans leur version chinoise traditionnelle (Taïwan) ; les autres versions linguistiques sont des traductions de référence. En cas de divergence, la version faisant autorité prévaut.

![Architecture documentaire EpoCanvas Mail : la couche de documentation juridique (politique de confidentialité, conditions d'utilisation, politique d'utilisation acceptable et documents de gouvernance des données) et la couche de documentation technique (introduction au projet, guide des fonctionnalités, architecture technique, modes de fonctionnement et guides d'utilisation) forment ensemble un système documentaire complet, tous fondés sur le code open source et des spécifications transparentes](/images/mail/fr/legal-architecture.svg)

*Figure : Architecture documentaire. La couche de documentation juridique définit le traitement des données et les limites du service ; la couche de documentation technique explique les fonctionnalités, l'architecture et l'utilisation ; les deux couches sont fondées sur l'implémentation du code open source.*

## 1. Positionnement du site

Ce site est la seule documentation officielle du projet open source EpoCanvas Mail, servant trois fonctions :

- **Avis juridique** : politique de confidentialité, conditions d'utilisation, politique d'utilisation acceptable et spécifications de traitement des données, remplissant les obligations légales d'information envers les utilisateurs de l'instance hébergée ; les auto-hébergeurs peuvent utiliser la documentation de ce site comme modèle de base pour leurs propres avis et conditions ;
- **Spécification technique** : architecture technique, conception de sécurité, historique de développement et piste complète des commits, permettant aux participants à l'audit de vérifier la cohérence entre l'implémentation du code et les engagements documentés ;
- **Guide d'utilisation** : descriptions des fonctionnalités, navigation dans l'interface, syntaxe de recherche, étapes de déploiement et flux de travail de développement, aidant les utilisateurs, les opérateurs et les développeurs à comprendre et utiliser le service.

La documentation de ce site est fondée sur l'implémentation réelle du code open source et interdit toute fabrication ; les citations juridiques utilisent la liste blanche de vérification `doc/legal-reference.md` ; les faits techniques (sémantique de chiffrement, périodes de conservation, liste des sous-traitants) sont continuellement vérifiés par des tests automatisés et des scripts d'audit.

## 2. Architecture documentaire

Ce site est organisé en trois groupes de documents, qui se référencent mutuellement et forment ensemble un ensemble complet d'accords :

### 2.1 Produit et aperçu

| Document | Contenu |
| --- | --- |
| [Présentation du projet](/fr/mail/project/) | Positionnement, fonctionnalités principales, aperçu de l'architecture technique, historique de développement et piste complète des commits |
| [Portée du service et assistance](/fr/mail/service-scope/) | Limites du service, clause de non-responsabilité et canaux de contact pour l'instance hébergée |
| [Carte d'interface et de routage](/fr/mail/interface/) | Navigation complète de l'interface et cartographie des routes pour boîte de réception, composition, paramètres et console d'administration |

### 2.2 Guide d'utilisation

| Document | Contenu |
| --- | --- |
| [Guide des fonctionnalités](/fr/mail/features/) | Organisation de la boîte de réception, composition et envoi, syntaxe de recherche, règles d'étiquettes, extraction de code de vérification, transfert/push et capacités IA |
| [Modes de fonctionnement](/fr/mail/modes/) | Formes de déploiement, trois niveaux de confidentialité du mode messagerie, groupes d'identité et quotas, connexion et vérification en deux étapes |
| [Guide des paramètres](/fr/mail/settings/) | Cinq sections de paramètres personnels (profil, général, sécurité, données, étiquettes) et neuf sections de console d'administration |
| [Référence recherche et règles](/fr/mail/search/) | Référence complète pour les opérateurs de recherche, récupération côté admin et conditions de règles de classification |
| [Interface boîte de réception et détail des messages](/fr/mail/mailbox/) | Vues de la boîte de réception, division en trois colonnes, fils de conversation et page de détail des messages élément par élément |
| [Gestion des étiquettes et de la classification](/fr/mail/labels/) | Taxonomie des étiquettes, moteur de règles de classification, listes noires/blanches et outils de gouvernance globale |
| [Données personnelles et paramètres généraux](/fr/mail/preferences/) | Fiches de profil, fiches d'adresse, langue de l'interface, fond d'écran thématique et préférences de lecture |
| [Export de données et stockage](/fr/mail/data/) | Export de copie complète JSON, téléchargement de message unique .eml et gestion de l'utilisation du stockage |
| [Guide de sécurité du compte](/fr/mail/security/) | Nom d'utilisateur et mot de passe, centre de vérification en deux étapes (TOTP, codes de récupération de secours, clés d'accès) et appareils de confiance |
| [Guide des notifications et des transferts](/fr/mail/notify/) | Transfert personnel, push Telegram et configuration et comportement des règles de transfert globales |
| [Analyses](/fr/mail/analysis/) | Tableaux de bord de visualisation de données, croissance des utilisateurs et statistiques de classification du courrier |
| [Liste des utilisateurs](/fr/mail/users/) | Gestion des comptes, groupes de rôles, quotas d'envoi et opérations d'interdiction/restauration |
| [Révision complète du courrier](/fr/mail/review/) | Récupération de courrier côté admin, gouvernance du spam et portée visible contrainte par le mode messagerie |
| [Permissions](/fr/mail/roles/) | Six groupes d'identité, quotas de stockage, limites d'envoi et modèles IA autorisés |
| [Clés d'inscription](/fr/mail/regkeys/) | Génération de codes d'invitation, limites de nombre d'utilisations et gestion de l'expiration |
| [Cartes de paramètres système](/fr/mail/system/) | Description élément par élément de neuf cartes de configuration : paramètres du site, personnalisation, stockage, push et plateforme ouverte |
| [Plateforme ouverte et accès API](/fr/mail/api/) | Centre d'authentification OAuth 2.0 / OIDC, enregistrement d'application, accès aux points de terminaison et jetons API personnels |
| [Classification](/fr/mail/category/) | Règles de classification globales, liste noire des expéditeurs et liste noire des mots-clés d'objet |
| [Rapports d'opération](/fr/mail/audit/) | Tickets d'alerte d'audit, jugement de contrôle des risques, appels d'interdiction et suppression de l'horodatage lié au mode messagerie |

### 2.3 Technologie et confiance

| Document | Contenu |
| --- | --- |
| [Architecture technique](/fr/mail/architecture/) | Topologie de déploiement edge Cloudflare, isolation de base de données double, système de chiffrement à trois modes, chaîne de stockage des pièces jointes et conception de sécurité applicative |
| [Spécifications anti-falsification et officielles](/fr/mail/tamper-proof/) | Spécifications et identification du courrier officiel, marque d'authentification officielle, livraison immuable et vérification anti-falsification des documents |

### 2.4 Auto-hébergement et développement

| Document | Contenu |
| --- | --- |
| [Guide de déploiement](/fr/mail/deployment/) | Étapes complètes pour l'auto-hébergement, prérequis, flux d'initialisation et injection de secrets |
| [Guide de développement](/fr/mail/development/) | Environnement de développement, flux de travail d'ingénierie, scripts de test et d'audit, conventions de commit et directives de contribution |

### 2.5 Confidentialité et gouvernance des données

| Document | Contenu |
| --- | --- |
| [Aperçu](/fr/mail/overview/) | Identité de la plateforme, définition du rôle de traitement des données, architecture documentaire, ordre de préséance et points de contact |
| [Politique de confidentialité](/fr/mail/privacy-policy/) | Collecte, traitement et utilisation des données personnelles, nature du traitement, droits des personnes concernées et transferts internationaux |
| [Traitement des données et sécurité](/fr/mail/data-security/) | Cycle de vie des données, matrice de traitement, mesures de maintenance de sécurité, réponse aux incidents et coopération à l'inspection |
| [Sous-traitants](/fr/mail/sub-processors/) | Sous-traitants, destinataires du partage, données impliquées et garanties de transfert international |

### 2.6 Conditions et conformité

| Document | Contenu |
| --- | --- |
| [Conditions d'utilisation](/fr/mail/terms-of-service/) | Conditions contractuelles d'utilisation du service, droits et obligations, limitation de responsabilité, loi applicable et juridiction |
| [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) | Limites comportementales, liste des conduites interdites et procédures d'application de l'opérateur |
| [Juridique open source et auto-hébergement](/fr/mail/open-source/) | Applicabilité de la licence MIT, responsabilité de contrôleur de données pour l'auto-hébergement et clause de non-responsabilité |
| [Termes clés](/fr/mail/key-terms/) | Définitions des termes techniques et juridiques utilisés dans la documentation juridique de ce site |

## 3. Parcours de lecture

Ce site est organisé autour de deux parcours complémentaires :

**Parcours 1 : Comprendre le projet, se préparer au déploiement ou apprendre à utiliser**

[Présentation du projet](/fr/mail/project/) → [Guide des fonctionnalités](/fr/mail/features/) → [Modes de fonctionnement](/fr/mail/modes/) → [Carte d'interface et de routage](/fr/mail/interface/) → [Référence recherche et règles](/fr/mail/search/) → [Guide des paramètres](/fr/mail/settings/) → [Guide de déploiement](/fr/mail/deployment/) → [Guide de développement](/fr/mail/development/)

**Parcours 2 : Comprendre les accords juridiques de confidentialité et les limites du service**

[Aperçu](/fr/mail/overview/) → [Politique de confidentialité](/fr/mail/privacy-policy/) → [Conditions d'utilisation](/fr/mail/terms-of-service/) → [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) → [Traitement des données et sécurité](/fr/mail/data-security/) → [Sous-traitants](/fr/mail/sub-processors/)

Les deux parcours convergent vers [Guide des fonctionnalités](/fr/mail/features/) et [Modes de fonctionnement](/fr/mail/modes/).

## 4. Structure multilingue

Ce site propose six langues avec une symétrie structurelle 1:1 :

| Langue | Identifiant | Description |
| --- | --- | --- |
| Chinois simplifié | `zh` | Langue par défaut du site, occupe le chemin racine URL (`/epomail/mail/...`) |
| Chinois traditionnel (Taïwan) | `zh-tw` | Version faisant autorité pour les documents juridiques ; les autres langues sont des traductions de référence (`/epomail/zh-tw/mail/...`) |
| English | `en` | Traduction de référence (`/epomail/en/mail/...`) |
| Français | `fr` | Traduction de référence (`/epomail/fr/mail/...`) |
| Español | `es` | Traduction de référence (`/epomail/es/mail/...`) |
| Nederlands | `nl` | Traduction de référence (`/epomail/nl/mail/...`) |

La page d'accueil du site (`/` et `/epomail/`) négocie la langue via Cloudflare Pages Functions en fonction de l'en-tête `Accept-Language` du navigateur, redirigeant automatiquement vers la page [Aperçu](/fr/mail/overview/) de la langue correspondante. Le chemin racine hérité `/mail/...` redirige vers le chemin canonique avec négociation de langue.

Le nombre de documents, la hiérarchie des titres, les lignes et colonnes des tableaux, le nombre d'images et de boîtes d'alerte doivent être strictement identiques pour chaque langue, vérifié automatiquement par `scripts/check-structure.py`. Les numéros de version et les dates d'effet sont unifiés à l'échelle du site.

## 5. Assurance qualité de la documentation

La documentation de ce site est assurée par les mécanismes suivants :

- **Vérification de l'implémentation du code** : les faits techniques (sémantique de chiffrement, périodes de conservation, liste des sous-traitants, quotas de rôles) sont fondés sur le code source du dépôt epomail et la fabrication est interdite ;
- **Liste blanche de citations juridiques** : `doc/legal-reference.md` est la seule source de citations juridiques à l'échelle du site ; seuls les numéros d'article vérifiés dans cette liste peuvent être cités ;
- **Vérification de symétrie structurelle** : `scripts/check-structure.py` vérifie que les titres, tableaux, images et nombres de boîtes d'alerte des documents en six langues sont strictement identiques ;
- **Intégrité des ancres** : `scripts/validate-anchors.cjs` analyse les ancres et références d'images à l'échelle du site, garantissant zéro lien brisé ;
- **Construction sans erreur** : `pnpm build` doit réussir sans erreur ; tout avertissement ou erreur bloque la publication ;
- **Vérification anti-falsification** : les documents officiels sont signés HMAC-SHA256 et livrés via des instantanés immuables, voir [Spécifications anti-falsification et officielles](/fr/mail/tamper-proof/).

## 6. Stack technologique du site

| Composant | Implémentation |
| --- | --- |
| Génération statique | Astro 5.0 + Starlight 0.32 |
| Négociation de routage | Cloudflare Pages Functions (logique de négociation de langue partagée `functions/_lib.js`) |
| Déploiement | Cloudflare Pages (`npx wrangler pages deploy dist --project-name epomail-docs`) |
| Artefacts de construction | Publication double voie : chemin racine `dist/*` et miroir de sous-chemin `dist/epomail/*` (exécuté par `scripts/post-build.mjs`) |
| Système de style | CSS personnalisé (`src/styles/custom.css`, 627 lignes), aligné sur le schéma de couleurs indigo-tech d'EpoCanvasDocs |
| Icônes et ressources | 300+ icônes vectorielles hors ligne, thèmes clairs/sombres doubles, illustrations localisées en six langues (`/images/mail/{zh-tw,en,es,fr,nl}/*.svg`) |

## 7. Ressources connexes

| Ressource | Lien |
| --- | --- |
| Instance hébergée | [mail.epocanvas.com](https://mail.epocanvas.com) |
| Code source | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) |
| Code source du site de documentation | Dépôt git indépendant EpomailDocs (artefact de construction de ce site) |
| Contact confidentialité | privacy@epocanvas.com |
| Contact dans le produit | Message dans le site ou admin@epocanvas.com |
| Issues du projet open source | Issues du dépôt GitHub |
