---
title: Guide de déploiement
description: Guide de déploiement d'EpoCanvas Mail — prérequis, déploiement en trois étapes, initialisation et chaîne d'amorçage, injection des secrets, configuration du courrier, choix de stockage, instance de démonstration et mises à niveau.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.13**

La présente page s'adresse aux utilisateurs et aux administrateurs qui se préparent à déployer eux-mêmes EpoCanvas Mail ; elle couvre tout le chemin, de zéro à une instance fonctionnelle. Une fois déployée, l'intégralité des données de l'instance réside dans les propres ressources Cloudflare du déployeur, et le déployeur devient le responsable du traitement de ses utilisateurs — la position juridique est exposée dans [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/). L'utilisation de l'instance hébergée ([mail.epocanvas.com](https://mail.epocanvas.com)) ne requiert aucune de ces étapes.

![Architecture système d'EpoCanvas Mail : les clients accèdent à la périphérie Cloudflare, les Workers portent l'API et le traitement du courrier, les données résident dans les doubles bases D1, KV et le stockage d'objets](/images/mail/fr/project-architecture.svg)

*Figure : la topologie en fonctionnement après déploiement. Aucun serveur à point de défaillance unique ; chaque composant s'exécute dans les quotas comptés de Cloudflare.*

## 1. Prérequis

| Catégorie | Exigence |
| --- | --- |
| Obligatoire | Un domaine ; un compte Cloudflare ; Node.js et pnpm |
| Courrier sortant | Un compte de canal de livraison tel que Resend ou Mailjet (requis pour l'envoi hors site) |
| Courrier entrant | Cloudflare Email Routing (activer le routage des courriels du domaine suffit) |
| Facultatif | Stockage apporté Backblaze B2 ou S3, une base de données externe Turso, un robot Telegram, Turnstile, clés de fournisseurs d'IA |

## 2. Déploiement en trois étapes

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

La construction du front-end replie la surface de connexion dans les ressources statiques du Worker, de sorte qu'un seul déploiement produit le site complet ; la cible de déploiement et les domaines personnalisés se configurent dans `wrangler.toml`.

## 3. Initialisation et chaîne d'amorçage

Après le premier déploiement, visitez `/api/init/<jwt_secret>` (en remplaçant le paramètre de chemin par la valeur du secret choisie par le déployeur). Ce point d'entrée crée toutes les tables de la base de données, sème les six groupes d'identité standard (Visiteur, Utilisateur standard, Utilisateur standard LV.0, Utilisateur standard LV.1, Modérateur, Maître) et initialise le compte Maître principal.

- La chaîne d'amorçage est idempotente de par sa conception : les fonctions de mise à niveau vérifient les colonnes avec `PRAGMA table_info` avant d'exécuter `ALTER TABLE`, de sorte que les visites répétées n'ont aucun effet de bord ;
- Après effacement de `.wrangler/state` pour un démarrage à froid, ce point d'entrée unique accomplit tout le semis de bout en bout — aucune exécution manuelle de SQL n'est jamais nécessaire.

## 4. Système des secrets

| Secret | Injection en production | Développement local |
| --- | --- | --- |
| `jwt_secret` (signature de session) | `npx wrangler secret put jwt_secret` | Fichier `.dev.vars` |
| `totp_enc_key` (chiffrement du secret 2FA) | `npx wrangler secret put totp_enc_key` | Fichier `.dev.vars` |

- `.dev.vars` est exclu par `.gitignore` et jamais committé ; le modèle committé est `.dev.vars.example` ;
- N'écrire jamais aucun secret de production en clair dans `wrangler.toml` ni dans aucun autre fichier suivi par le contrôle de version ;
- Le `jwt_secret` du chemin d'initialisation est le secret de signature de session ; les deux doivent correspondre.

## 5. Flux de courrier et courriels système

- Entrant : activer Email Routing pour le domaine dans le tableau de bord Cloudflare et acheminer les adresses de destination vers le Worker ; le courriel est analysé à l'arrivée ;
- Sortant : dès qu'un canal de livraison (tel que Resend) est configuré dans les paramètres système, le courrier hors site passe par lui ; sans canal, seule la livraison directe au sein du site fonctionne ;
- Les courriels système (courriels de bienvenue, avis de sécurité, courriels d'annonce) sont rendus à partir de modèles intégrés dans la langue du destinataire : les boutons du courriel de bienvenue tels que « ouvrir la boîte de réception » sont des chemins relatifs au site dont le comportement d'atterrissage dépend de la gestion des liens relatifs par le client de messagerie, tandis que les avis de sécurité utilisent des liens absolus sur le domaine de l'instance. Les auto-hébergeurs peuvent adapter la formulation et la signature de l'expéditeur via les constantes de modèle ; la sémantique de livraison des courriels officiels figure dans [Anti-falsification et normes officielles](/fr/mail/tamper-proof/).

## 6. Choix de stockage et de base de données

| Composant | Par défaut | Alternatives |
| --- | --- | --- |
| Bases de données des utilisateurs et du courriel | Cloudflare D1 avec isolation physique à double base (100 % rétrocompatible avec une base unique) | Turso ou une autre base de données externe (configurée dans les paramètres système) |
| Pièces jointes et objets | Cloudflare R2 | Backblaze B2 ou un compartiment S3 à vous |
| Cache | Workers KV | — |

La hiérarchie de stockage et le comptage des quotas sont décrits dans [Architecture technique](/fr/mail/architecture/) ; chacun peut en outre brancher son propre stockage pour que les pièces jointes atterrissent directement dans son cloud — voir la section 5 du [Guide des paramètres](/fr/mail/settings/).

## 7. Instance de démonstration

Pour une répétition locale, une pile de démonstration peut tourner sans exposition publique : démarrez `mail-worker` avec `wrangler dev` et semez le courriel de démonstration et l'état multi-comptes avec le script de semis de démonstration du dépôt. Les données de démonstration ne vivent que dans le `.wrangler/state` local (exclu par `.gitignore`) et n'atteignent jamais le dépôt ni la production ; les captures d'écran du produit sur ce site proviennent de cette instance de démonstration.

## 8. Mises à niveau et retour arrière

- Mise à niveau : `git pull` pour le dernier code → reconstruction du front-end → `wrangler deploy` ; les migrations de données s'exécutent de façon idempotente avec la chaîne d'amorçage et peuvent se répéter sans risque ;
- Vérification de version : la carte « À propos » des paramètres système affiche la version de l'instance et recherche les mises à jour ;
- Retour arrière : réversion instantanée via l'historique de déploiement de Cloudflare Workers, ou redéploiement d'un commit plus ancien.

## 9. Documents connexes

| Ressource | Lien |
| --- | --- |
| Formes de fonctionnement et quotas de rôles après initialisation | [Modes de fonctionnement](/fr/mail/modes/) |
| Environnement de développement, suites de tests et discipline d'ingénierie | [Guide de développement](/fr/mail/development/) |
| Configuration au niveau de l'instance en détail | [Guide des paramètres](/fr/mail/settings/) |
| Position juridique du déployeur et licence | [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/) |
| Topologie technique et chiffrement | [Architecture technique](/fr/mail/architecture/) |
