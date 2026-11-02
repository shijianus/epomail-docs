---
title: Architecture technique d'EpoCanvas Mail
description: Architecture technique d'EpoCanvas Mail — topologie de déploiement en périphérie Cloudflare, isolation à double base de données, chiffrement à trois modes, chaîne de stockage des pièces jointes, modèle de permissions par rôle, cycle de vie des courriels et conception de sécurité applicative.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.21**

Cette page décrit l'implémentation technique d'EpoCanvas Mail : topologie de déploiement, chiffrement des données, chaîne de stockage, modèle de permissions et cycle de vie des courriels. Tous les faits techniques suivent l'implémentation réelle du code open source et peuvent être audités librement ; les incidences sur votre vie privée et les informations légales figurent dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/) et la [Politique de confidentialité](/fr/mail/privacy-policy/).

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut.

![Architecture système d'EpoCanvas Mail : la couche cliente (application Web, application Android, applications tierces OAuth) accède par la périphérie Cloudflare ; les Workers hébergent l'API, l'analyse du courrier entrant et les capacités d'IA, le courrier sortant passe par Resend et Telegram ; les données résident dans les doubles bases D1, KV et le stockage d'objets](/images/mail/fr/project-architecture.svg)

*Figure : les clients passent par le réseau périphérique ; Email Routing reçoit et analyse les messages entrants, les canaux configurés assurent l'envoi. Des données peuvent aussi atteindre des stockages et services externes ; voir la [Liste des sous-traitants](/fr/mail/sub-processors/).*

## 1. Topologie de déploiement

| Composant | Implémentation |
| --- | --- |
| Calcul | Cloudflare Workers (sandbox V8 Isolate) traite les requêtes ; le serveur peut accéder au texte en clair. Le code ne garantit pas la destruction du sandbox ni l'effacement de tout texte en clair à la fin de la requête |
| Entrant | Cloudflare Email Routing reçoit les courriels ; postal-mime analyse le corps, les en-têtes et les pièces jointes |
| Sortant | résolution séquentielle par trois canaux : liaison Cloudflare Email Workers, API Resend, Mailjet ; les envois internes entre comptes écrivent directement en base |
| Stockage structuré | Cloudflare D1 permet de séparer les bases utilisateurs et courriels ou de revenir à une base unique ; la première contient comptes, rôles et paramètres, la seconde courriels, étoiles et métadonnées des pièces jointes. Les liaisons en production doivent être vérifiées séparément |
| Stockage clé-valeur | Workers KV : jetons de session, compteurs de gestion des risques de connexion, états intermédiaires TOTP, profils utilisateur et solution de repli du stockage d'objets |
| Inférence en périphérie | Workers AI (extraction de captcha, etc., llama-3.1-8b-instruct par défaut) |
| Tâches planifiées | Configuration du dépôt : chaque jour à 16:00 UTC (00:00 le lendemain à Taïwan), remise à zéro des compteurs de vérification et d'envoi, nettoyage des messages supprimés et des identités OAuth non liées, actualisation des statistiques ; toutes les 5 minutes, traitement des notifications et suppressions d'objets. La branche de 30 minutes existe mais n'est pas enregistrée dans cette configuration |
| Vérification humaine | Cloudflare Turnstile (vérification par API HTTP, à l'inscription et à la création de boîtes supplémentaires) |

## 2. Pile technique

| Couche | Technologies |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (brouillons locaux, rien sur le serveur), Vite 7, vite-plugin-pwa |
| Interface de connexion | React 18, Tailwind CSS 4, Vite 6 (build indépendant, publié avec les produits du front-end) |
| Serveur | Hono 4.12, Drizzle ORM, postal-mime, i18next, SDK Resend |
| Actifs d'interface | plus de 300 icônes vectorielles hors ligne (zéro requête externe), thèmes clair et sombre, dictionnaires en six langues |

## 3. Système de chiffrement des données

- **Trois modes de stockage** : Tout laisse les champs sans chiffrement ; Privé choisit selon les états indésirable, corbeille et sans propriétaire ; Chiffré chiffre les champs sélectionnés. Le périmètre est `subject/content/text/code`, pas toutes les données ; voir [Traitement des données et sécurité](/fr/mail/data-security/) ;
- **Chiffrement des courriels** : AES-256-GCM utilise un IV aléatoire de 12 octets et des clés par utilisateur dérivées avec HKDF-SHA256. Les sources sont `email_enc_key`, puis `totp_enc_key`, puis `jwt_secret` ; sans aucune de ces clés, le chiffrement échoue, sans clé intégrée par défaut ;
- **Protection des identifiants** : les nouveaux mots de passe utilisent par défaut PBKDF2-HMAC-SHA256 avec sel et 210 000 itérations, configurables ; les anciens hachés sont migrés à la connexion. Les secrets TOTP activés utilisent AES-256-GCM ; les codes de récupération ont des hachés SHA-256 et une copie chiffrée des codes originaux ; les clés d'accès conservent la clé publique et les métadonnées. Les données temporaires et autres exceptions figurent dans [Traitement des données et sécurité](/fr/mail/data-security/) ;
- **Périmètre** : il s'agit d'un chiffrement au repos côté serveur, non d'un chiffrement de bout en bout ; les pièces jointes sont hors du périmètre du chiffrement.

## 4. Chaîne de stockage des pièces jointes

Le stockage des pièces jointes suit cet ordre : S3 de l'utilisateur → S3 de l'exploitant → Cloudflare R2 → KV. Les métadonnées sont dans D1 ; les téléchargements utilisent des liens signés et des en-têtes défensifs. La suppression physique retire les métadonnées et inscrit les objets dans une file, puis vérifie les références restantes ; les reprises automatiques cessent après 10 échecs. La suppression simultanée de tous les objets n'est pas garantie. Voir la [Liste des sous-traitants](/fr/mail/sub-processors/) pour les copies externes.

## 5. Sessions et permissions par rôle

Les JWT (HS256) ont par défaut une validité de 30 jours. KV conserve une liste de sessions et un instantané utilisateur dont certains champs sensibles sont retirés. Le code vérifie si le nombre dépasse 10 avant d'ajouter une session : il peut normalement en garder 11, sans plafond strict de 10. L'activité et certaines opérations renouvellent ou raccourcissent la durée KV. La déconnexion retire la session courante ; la clôture supprime l'enregistrement des sessions du compte. RBAC prévoit six rôles :

| Rôle | Envoi quotidien | Quota de stockage | Pièces jointes | Capacités supplémentaires |
| --- | --- | --- | --- | --- |
| Visiteur | Interdit | 0 | Non | bac à sable en lecture seule |
| Utilisateur de base | 5 courriels | 5 Mo | Non | envoi et réception de base |
| Utilisateur de base LV.0 | 8 courriels | 10 Mo | Non | progression liée au niveau du blog |
| Utilisateur de base LV.1 | 10 courriels | 25 Mo | Oui | envoi, réception et pièces jointes |
| Administrateur | 100 courriels | 500 Mo | Oui | gestion des utilisateurs, gestion de tous les courriels (selon le mode de messagerie) |
| Webmestre | Sans limite | 1024 Mo | Oui | toutes les permissions |

Les routes protégées vérifient JWT, sessions KV et permissions ; certains points publics ont une vérification distincte. La clôture retire les sessions ordinaires sans supprimer simultanément toutes les autorisations, données ou copies tierces.

## 6. Cycle de vie des courriels

| Étape | Comportement |
| --- | --- |
| Suppression | La suppression ordinaire fixe `is_del=1` ; la tâche quotidienne nettoie la corbeille si `email.create_time` date de plus de 7 jours, sans accorder 7 jours supplémentaires après le déplacement. Une suppression définitive demandée ou une condition de quota peut supprimer directement |
| Quarantaine des pourriels | `spamRetentionDays` vaut 7 jours par défaut, à partir de la création du message ; le passage à la corbeille peut être suivi d'une suppression physique dans la même exécution |
| Purge de quota | Lors d'une demande de suppression, si l'utilisation existante dépasse strictement 90 % du quota, les messages sélectionnés sont supprimés physiquement ; atteindre 90 % ne déclenche pas une purge en arrière-plan |
| Courriels officiels | La lecture de la liste marque comme supprimés les messages expirés des adresses officielles désignées, selon leur création et `welcomeExpireDays` (7 jours par défaut) ; la tâche de corbeille assure ensuite le nettoyage physique |
| Suppression en cascade | La suppression définitive ordinaire et le nettoyage de corbeille retirent métadonnées des pièces jointes et étoiles, puis programment les reprises d'objets ; la couverture varie entre les chemins de suppression groupée administrateur |
| Clôture du compte | Seule la ligne utilisateur est marquée supprimée et les sessions retirées ; boîtes, messages et profils ne sont pas marqués ensemble. Aucune suppression physique automatique à 90 jours n'est planifiée ; voir la [Politique de confidentialité](/fr/mail/privacy-policy/) |

## 7. Conception de sécurité applicative

- **Routes à l'épreuve des accès non autorisés** : les URL des courriels utilisent systématiquement un haché aléatoire de 20 caractères signé par HMAC-SHA256, lié à l'utilisateur et au locataire, sans exposition des identifiants auto-incrémentés, ce qui exclut l'énumération et le BOLA／IDOR ;
- **Triple défense XSS** : assainissement par liste d'autorisation DOMPurify, filtrage des injections body style, liste d'autorisation MIME en sortie des pièces jointes avec CSP strict et `nosniff` ;
- **Blocage SSRF** : les requêtes sortantes passent une validation d'adresses publiques ; les adresses de bouclage, RFC 1918 et de métadonnées cloud sont systématiquement refusées ;
- **Protection de connexion** : les échecs sont comptés par identifiant saisi ; à 5 échecs, la connexion est refusée et chaque échec écrit un TTL de 12 heures. Ce n'est pas un verrou atomique partagé par tous les alias. Turnstile et TOTP / Passkey complètent les vérifications ;
- **Intégrité des courriels officiels** : verrouillage de l'identité d'expédition officielle, délivrance par instantané immuable et vérification anti-falsification des documents, voir [Anti-falsification et normes officielles](/fr/mail/tamper-proof/).

## 8. Observabilité et assurance qualité

- Le dépôt active Cloudflare observability ; D1 / KV conservent aussi opérations d'identité, signalements, décisions et environnements de connexion. La plupart des journaux d'audit n'ont pas de tâche d'expiration ; la conservation des journaux de plateforme doit être vérifiée. Voir la [Politique de confidentialité](/fr/mail/privacy-policy/) ;
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
