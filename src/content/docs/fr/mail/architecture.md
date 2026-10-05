---
title: Architecture technique d'EpoCanvas Mail
description: Architecture technique d'EpoCanvas Mail — topologie de déploiement en périphérie Cloudflare, isolation à double base de données, chiffrement à trois modes, chaîne de stockage des pièces jointes, modèle de permissions par rôle, cycle de vie des courriels et conception de sécurité applicative.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.15**

Cette page décrit l'implémentation technique d'EpoCanvas Mail : topologie de déploiement, chiffrement des données, chaîne de stockage, modèle de permissions et cycle de vie des courriels. Tous les faits techniques suivent l'implémentation réelle du code open source et peuvent être audités librement ; les incidences sur votre vie privée et les informations légales figurent dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/) et la [Politique de confidentialité](/fr/mail/privacy-policy/).

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut.

![Architecture système d'EpoCanvas Mail : la couche cliente (application Web, application Android, applications tierces OAuth) accède par la périphérie Cloudflare ; les Workers hébergent l'API, l'analyse du courrier entrant et les capacités d'IA, le courrier sortant passe par Resend et Telegram ; les données résident dans les doubles bases D1, KV et le stockage d'objets](/images/mail/fr/project-architecture.svg)

*Figure : architecture système. Les clients accèdent par la périphérie, sans serveur à point unique ; le courrier entrant est reçu et analysé par Email Routing, le courrier sortant passe par les canaux de délivrance ; tout l'état réside dans les ressources Cloudflare du déployeur lui-même.*

## 1. Topologie de déploiement

| Composant | Implémentation |
| --- | --- |
| Calcul | Cloudflare Workers (sandbox V8 Isolate) : la logique métier est sans état, le texte en clair n'existe que dans la mémoire de la requête et est libéré à la fin de celle-ci |
| Entrant | Cloudflare Email Routing reçoit les courriels ; postal-mime analyse le corps, les en-têtes et les pièces jointes |
| Sortant | résolution séquentielle par trois canaux : liaison Cloudflare Email Workers, API Resend, Mailjet ; les envois internes entre comptes écrivent directement en base |
| Stockage structuré | Cloudflare D1 (double base physiquement isolée : la base utilisateurs porte les comptes, les rôles et les paramètres ; la base courriel porte les courriels, les étoiles et les métadonnées des pièces jointes ; le déploiement à base unique reste rétrocompatible à 100 % ; l'instance hébergée fonctionne actuellement avec une base de données unique) |
| Stockage clé-valeur | Workers KV : jetons de session, compteurs de gestion des risques de connexion, états intermédiaires TOTP, profils utilisateur et solution de repli du stockage d'objets |
| Inférence en périphérie | Workers AI (extraction de captcha, etc., llama-3.1-8b-instruct par défaut) |
| Tâches planifiées | les déclencheurs Cron exécutent : l'actualisation du cache d'analyse des données toutes les 30 minutes ; chaque jour, remise à zéro des compteurs de risque, réinitialisation des compteurs d'envoi, purge de la corbeille et des pourriels, suppression des comptes OAuth non liés |
| Vérification humaine | Cloudflare Turnstile (vérification par API HTTP, à l'inscription et à la création de boîtes supplémentaires) |

## 2. Pile technique

| Couche | Technologies |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (brouillons locaux, rien sur le serveur), Vite 7, vite-plugin-pwa |
| Interface de connexion | React 18, Tailwind CSS 4, Vite 6 (build indépendant, publié avec les produits du front-end) |
| Serveur | Hono 4.12, Drizzle ORM, postal-mime, i18next, SDK Resend |
| Actifs d'interface | plus de 300 icônes vectorielles hors ligne (zéro requête externe), thèmes clair et sombre, dictionnaires en six langues |

## 3. Système de chiffrement des données

- **Chiffrement au repos à trois modes** : mode Tout (aucun chiffrement), mode Privé (tout est chiffré sauf indésirables et corbeille), mode Chiffré (tout est chiffré) ; la sémantique des modes et la visibilité administrateur figurent à la section 1.3 de [Traitement des données et maintien de la sécurité](/fr/mail/data-security/) ;
- **Chiffrement des courriels** : l'objet et le corps sont chiffrés en AES-256-GCM (avec balises d'authentification), chaque enregistrement utilisant un vecteur d'initialisation aléatoire ; les clés sont dérivées par HKDF-SHA256 de la variable d'environnement de secret maître au niveau de l'instance, avec un sel par utilisateur ; le secret maître n'est jamais écrit en base ni validé dans le dépôt ;
- **Protection des identifiants** : les mots de passe sont hachés par PBKDF2-HMAC-SHA256 à 100 000 itérations avec sel ; le secret TOTP est chiffré au repos en AES-256-GCM ; les codes de récupération ne sont conservés que sous forme de hachés SHA-256 ; les clés d'accès ne stockent que la clé publique ;
- **Périmètre** : il s'agit d'un chiffrement au repos côté serveur, non d'un chiffrement de bout en bout ; les pièces jointes sont hors du périmètre du chiffrement.

## 4. Chaîne de stockage des pièces jointes

Le binaire des pièces jointes est résolu et stocké dans l'ordre : stockage compatible S3 apporté par vos soins (BYOS, prenant en charge AWS S3, Backblaze B2, MinIO, etc.) → stockage compatible S3 configuré par l'Opérateur → liaison Cloudflare R2 → Cloudflare KV à défaut. Les métadonnées (nom de fichier, MIME, taille) sont stockées dans D1 ; les téléchargements comportent des en-têtes défensifs et une liste d'autorisation MIME ; lors de la suppression d'un courriel, les pièces jointes sont purgées en cascade par comptage de références.

## 5. Sessions et permissions par rôle

Les sessions sont des JWT (HS256) d'une validité de 30 jours, conservés dans KV sous forme fortement masquée ; au plus 10 sessions actives par compte, révoquées immédiatement à la déconnexion et à la clôture du compte. Les permissions suivent le modèle RBAC, avec six rôles standard :

| Rôle | Envoi quotidien | Quota de stockage | Pièces jointes | Capacités supplémentaires |
| --- | --- | --- | --- | --- |
| Visiteur | Interdit | 0 | Non | bac à sable en lecture seule |
| Utilisateur de base | 5 courriels | 5 Mo | Non | envoi et réception de base |
| Utilisateur de base LV.0 | 8 courriels | 10 Mo | Non | progression liée au niveau du blog |
| Utilisateur de base LV.1 | 10 courriels | 25 Mo | Oui | envoi, réception et pièces jointes |
| Administrateur | 100 courriels | 500 Mo | Oui | gestion des utilisateurs, gestion de tous les courriels (selon le mode de messagerie) |
| Webmestre | Sans limite | 1024 Mo | Oui | toutes les permissions |

Toutes les routes d'administration et métier sont contrôlées par une passerelle d'authentification unique ; seuls font exception les points de terminaison publics (connexion, inscription, OAuth, initialisation) ; la suppression d'un compte révoque immédiatement ses sessions.

## 6. Cycle de vie des courriels

| Étape | Comportement |
| --- | --- |
| Suppression | le courriel passe d'abord dans la corbeille (suppression logique) ; 7 jours après réception, une tâche planifiée le supprime physiquement (pièces jointes et index compris) |
| Quarantaine des pourriels | les pourriels sont conservés 7 jours puis déplacés vers la corbeille ; la durée de quarantaine est configurable |
| Purge de quota | lorsque la boîte dépasse 90 % du quota, les courriels déjà marqués comme supprimés sont immédiatement supprimés physiquement |
| Courriels officiels | les courriels de bienvenue et les annonces à l'échelle du système expirent par défaut après 7 jours (configurable) |
| Suppression en cascade | la suppression physique s'effectue par lots (pour respecter la limite de paramètres liés d'une instruction D1) ; pièces jointes et étoiles sont retirées en cascade avec le courriel |
| Clôture du compte | les sessions deviennent immédiatement invalides ; les données passent en état de suppression logique jusqu'à la suppression physique par un administrateur (le délai garanti figure à la section 8 de la [Politique de confidentialité](/fr/mail/privacy-policy/)) |

## 7. Conception de sécurité applicative

- **Routes à l'épreuve des accès non autorisés** : les URL des courriels utilisent systématiquement un haché aléatoire de 20 caractères signé par HMAC-SHA256, lié à l'utilisateur et au locataire, sans exposition des identifiants auto-incrémentés, ce qui exclut l'énumération et le BOLA／IDOR ;
- **Triple défense XSS** : assainissement par liste d'autorisation DOMPurify, filtrage des injections body style, liste d'autorisation MIME en sortie des pièces jointes avec CSP strict et `nosniff` ;
- **Blocage SSRF** : les requêtes sortantes passent une validation d'adresses publiques ; les adresses de bouclage, RFC 1918 et de métadonnées cloud sont systématiquement refusées ;
- **Protection de la connexion** : 5 échecs consécutifs entraînent un verrouillage de 12 heures ; vérification humaine Turnstile ; vérification en deux étapes TOTP／clé d'accès ;
- **Intégrité des courriels officiels** : verrouillage de l'identité d'expédition officielle, délivrance par instantané immuable et vérification anti-falsification des documents, voir [Anti-falsification et normes officielles](/fr/mail/tamper-proof/).

## 8. Observabilité et assurance qualité

- Les journaux d'exécution sont collectés via Cloudflare Workers Logs (l'application ne conserve aucun journal propre au-delà des journaux d'IP) ; la page d'analyse des données ne présente que des agrégats statistiques, sans données au niveau du contenu ;
- Plus d'une centaine de scripts de tests automatisés, d'audits et de contrôles : régressions navigateur Playwright sur pile complète, assertions de bout en bout sur le réseau public, balayage statique de l'ensemble du dépôt et triptyque i18n en six langues (voir la section 7 de [Présentation du projet](/fr/mail/project/)).

## 9. Documents associés

| Ressource | Lien |
| --- | --- |
| Modes de fonctionnement : formes de déploiement, modes courriel et connexion | [Modes de fonctionnement](/fr/mail/modes/) |
| Guide des paramètres : paramètres personnels et console d'administration | [Guide des paramètres](/fr/mail/settings/) |
| Fonctionnalités détaillées et captures d'écran | [Guide des fonctionnalités](/fr/mail/features/) |
| Positionnement du projet et historique de développement | [Présentation du projet](/fr/mail/project/) |
| Sémantique du chiffrement, durées de conservation et droits des personnes concernées | [Traitement des données et maintien de la sécurité](/fr/mail/data-security/) |
| Spécifications des courriels officiels et vérification anti-falsification | [Anti-falsification et normes officielles](/fr/mail/tamper-proof/) |
