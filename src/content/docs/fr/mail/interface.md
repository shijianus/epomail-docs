---
title: Interface et plan des routes
description: Interface et plan des routes d'EpoCanvas Mail — les huit vues de la boîte, la fenêtre de rédaction en surimpression, toutes les routes des paramètres et de l'administration, les flux de la surface de connexion, la page de consentement OAuth et les profils publics.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.15**

La présente page parcourt une à une les interfaces d'EpoCanvas Mail et leur route. Un emplacement se compose de deux parties : le préfixe de chemin `/mail/u/N/` (N est l'indice de session multi-comptes ; toujours 0 pour un compte unique) et la route de vue après `#` (par exemple `#inbox`). Les anciens chemins directs tels que `/inbox` sont normalisés automatiquement. La surface de connexion est déployée séparément sous `/login/`. Ce que chaque route autorise est décidé par les permissions du groupe d'identité — voir [Modes de fonctionnement](/fr/mail/modes/) ; l'effet de chaque paramètre est décrit dans le [Guide des paramètres](/fr/mail/settings/).

![Panorama de la boîte de réception d'EpoCanvas Mail : à gauche l'entrée de rédaction et l'arborescence des dossiers, à droite la liste des messages avec badges de code de vérification et marques officielles (interface en chinois simplifié)](/images/mail/ui/ui-inbox-zh.png)

*Figure : la boîte de réception (`#inbox`). Les huit vues partagent un même squelette de liste ; les compteurs et les étiquettes restent synchronisés.*

## 1. Interface principale de la boîte

Après connexion, l'interface principale s'organise selon les routes de vue. Les neuf routes :

| Route de vue | Interface | Contenu principal |
| --- | --- | --- |
| `#inbox` | Inbox | Vue par défaut ; ordre chronologique ascendant/descendant, insertion incrémentale des nouveaux courriels par scrutation, liste virtualisée, points non lus, groupement par conversations |
| `#all` | All Mail | Vue agrégée tous dossiers confondus ; cliquer une étiquette de la barre latérale amène ici, filtré par cette étiquette |
| `#message` | Message detail | Répondre / répondre à tous / transférer, étoile, lu/non lu, déplacer vers, signaler comme pourriel, reporter, étiquetage, réactions par émoji, traduction intégrale par IA, impression d'un message ou d'une conversation, téléchargement .eml, en-têtes bruts, blocage de l'expéditeur, création de filtre depuis la vue |
| `#sent` | Sent | Courriels envoyés par le compte |
| `#drafts` | Drafts | Brouillons locaux ; les destinataires laissés vides affichent un marqueur d'espace réservé |
| `#starred` | Starred | Collection des courriels marqués d'une étoile |
| `#snoozed` | Snoozed | Paliers urgent et en attente ; retour automatique dans la boîte de réception à l'échéance |
| `#spam` | Spam | Courriels jugés pourriels par le système ou par les utilisateurs |
| `#trash` | Trash | Courriels supprimés ; effacés physiquement sept jours après réception |

La rédaction est une surimpression plutôt qu'une route, déclenchée depuis trois endroits : le bouton « Compose » de la barre latérale, le bouton flottant mobile (permission d'envoi requise) et le lien profond `?composeTo=<address>` (ouvre la fenêtre de rédaction avec le destinataire prérempli).

![Fenêtre de rédaction d'EpoCanvas Mail : l'expéditeur est verrouillé sur la boîte actuelle, barre d'outils de texte enrichi avec pièces jointes et bouton d'envoi (interface en chinois simplifié)](/images/mail/ui/ui-compose.png)

*Figure : la fenêtre de rédaction en surimpression. Les boîtes du site sont livrées en direct ; le courrier hors site passe par le canal de livraison de l'Opérateur.*

## 2. Squelette de l'interface

L'interface principale se compose de quatre régions :

| Région | Éléments |
| --- | --- |
| Barre supérieure | Zone de recherche (recherche du courrier sur les pages courriel, recherche des paramètres sur les pages de paramètres — voir la [Référence de la recherche et des règles](/fr/mail/search/)), bascule clair/sombre, aide, cloche d'avis (affichée en présence d'avis non lus), menu de compte (avatar, barre de stockage, coordonnées du compte, paramètres, déconnexion ; le pied du menu porte des liens externes vers la présentation du projet, la politique de confidentialité et les conditions d'utilisation ; le mode multi-comptes y ajoute la bascule, l'ajout et la déconnexion de partout) |
| Barre latérale | Bouton de rédaction, huit entrées de navigation de dossiers avec compteurs de non lus, zone d'étiquettes (jusqu'à 7) et entrée de nouvelle étiquette |
| Barre d'état | État de connexion, dernière synchronisation, nombre de non lus, badge du mode courriel (indiqué en mode chiffré) et numéro de version |
| Zone principale | La liste ou le détail de la vue en cours |

En dessous de 1025 pixels de largeur, la barre latérale se replie en tiroir invoqué par un voile d'arrière-plan, et se referme automatiquement à chaque changement de route.

## 3. Zone des paramètres

Entrer dans les paramètres remplace la zone principale par les panneaux de paramètres et masque la barre latérale du courrier. Cinq routes de section :

| Route de section | Section | Contenu |
| --- | --- | --- |
| `#settings/profile` | Profil | Avatar, pseudonyme, genre, anniversaire, adresse électronique, téléphone et adresses |
| `#settings/general` | Général | Biographie, palette d'apparence, fond d'écran thématique, préférences de lecture, langue et confidentialité des données |
| `#settings/security` | Sécurité | Nom d'utilisateur et mot de passe, centre de vérification en deux étapes, clés d'accès, suppression du compte |
| `#settings/data` | Données | Export des données, notifications et transfert, autorisations d'applications tierces, stockage |
| `#settings/labels` | Étiquettes | Gestion des étiquettes et constructeur de règles de classement |

![Page générale des paramètres d'EpoCanvas Mail : zone de personnalisation, fond d'écran thématique et palette d'apparence (interface en chinois simplifié)](/images/mail/ui/ui-settings-general.png)

*Figure : la section Général. Les cinq sections de paramètres partagent un même squelette ; la colonne de gauche est la navigation entre sections.*

## 4. Zone d'administration

Les routes d'administration prennent la forme `#manage/admin/<section>` ; le segment de groupe de rôle du chemin doit correspondre à l'identité du compte (`admin` pour le Maître, `moderator` pour les modérateurs) et est sinon normalisé vers une section disponible. Chaque section est liée à une clé de permission indépendante, accordée groupe par groupe sur la page des permissions :

| Route de section | Section | Clé de permission | Responsabilité |
| --- | --- | --- | --- |
| `#manage/admin/analysis` | Analytique | `analysis:query` | Tableaux de bord du volume, du taux d'interception, de la distribution des sources, des courbes de croissance et de l'usage de l'IA |
| `#manage/admin/users` | Liste des utilisateurs | `user:query` | Recherche de comptes, réinitialisation du mot de passe, changement de groupe, bannissement et restauration |
| `#manage/admin/mail` | Tous les courriels | `all-email:query` | Revue du courriel à l'échelle du site, recherche avancée `$`, tiroir de détail et suppression physique |
| `#manage/admin/roles` | Permissions | `role:query` | Groupes d'identité, modèles de quotas et autorisation des modèles d'IA |
| `#manage/admin/reg-keys` | Clés d'inscription | `reg-key:query` | Émission et vérification des codes d'invitation |
| `#manage/admin/system` | Paramètres système | `setting:query` | Configuration au niveau de l'instance ; la liste des cartes figure dans le [Guide des paramètres](/fr/mail/settings/) |
| `#manage/admin/apps` | Gestion des applications | `setting:query` | Identifiants des applications tierces OAuth 2.0 / OIDC |
| `#manage/admin/rules` | Classement | `setting:query` | Interrupteurs d'envoi et de réception, reconnaissance par IA, listes blanche et noire, interception stricte |
| `#manage/admin/audit` | Rapport d'audit | `setting:query` | Triage, traitement et arbitrage des recours pour les quatre classes d'alertes |

![Page des rapports d'audit d'EpoCanvas Mail : tickets d'alerte des quatre classes avec boutons de traitement (interface en chinois simplifié)](/images/mail/ui/ui-audit-report.png)

*Figure : le rapport d'audit (`#manage/admin/audit`). Le triage s'effectue dans une liste unique ; les boutons de traitement se répartissent par classe d'alerte.*

## 5. Surface de connexion

`/login/` est une application de connexion séparée, déployée à part de l'interface principale. Une seule carte de connexion porte tous les flux :

| Flux | Comportement |
| --- | --- |
| Connexion par mot de passe | Le compte (adresse électronique) et le mot de passe sont soumis ; les échecs répétés déclenchent un verrouillage anti-force brute |
| Vérification en deux étapes | Application d'authentification (TOTP à six chiffres), codes de récupération de secours et clés d'accès — un seul facteur ou plusieurs, en renforcement progressif ; cocher « Ne plus demander sur cet appareil » accorde une confiance de 30 jours |
| Connexion tierce | Les fournisseurs activés et configurés par l'administrateur apparaissent en boutons ; ceux activés sans identifiants s'affichent grisés « bientôt disponible » |
| Inscription | Adresse électronique (suffixe de domaine présélectionné facultatif), mot de passe et code d'inscription ; les modes du code sont obligatoire, désactivé et facultatif, et l'URL peut porter des paramètres d'invitation |
| Mot de passe oublié | Une boîte de dialogue mène au portail de recours externe en transmettant le type de recours, la langue de l'interface et l'adresse électronique |
| Ajout de compte | En mode multi-comptes, atteint via `?action=addAccount&u=N` ; après connexion, la session reprend à l'emplacement correspondant |

![Page de connexion d'EpoCanvas Mail : champs adresse électronique et mot de passe, case à cocher « maintenir le lien orbite » et boutons de connexion rapide tierce (interface en chinois simplifié)](/images/mail/ui/ui-login-oauth.png)

*Figure : la page de connexion. La règle d'affichage à trois états des boutons tiers figure à la section 4 de [Modes de fonctionnement](/fr/mail/modes/).*

## 6. Pages autonomes et capacités globales

| Interface | Route | Description |
| --- | --- | --- |
| Page de consentement OAuth | `#/oauth/authorize` | Affichée lorsqu'une application tierce demande une autorisation : informations de l'application, badge officiel, liste des portées, et autoriser / annuler |
| Profil public | `/<username>` | Accessible sans connexion ; affiche l'avatar, le fuseau horaire, le groupe d'identité, la date d'inscription, un tableau de bord de données personnelles et « m'écrire » ; conditionné par l'interrupteur « profils publics » de l'administrateur |
| Page 404 | autres chemins | Page d'état vide pour les chemins inconnus, avec un moyen de revenir en arrière |
| PWA | — | L'application Web s'installe ; une application Android (epomail) est également fournie |

Le mode courriel remodèle aussi l'interface d'administration : en mode chiffré (Level 3), l'entrée de revue du courriel à l'échelle du site est masquée et les rapports d'audit sont dépouillés de leurs horodatages — voir la section 2 de [Modes de fonctionnement](/fr/mail/modes/).

## 7. Documents connexes

| Ressource | Lien |
| --- | --- |
| Tutoriel d'enregistrement d'apps OAuth et d'intégration des points de terminaison | [Tutoriel d'enregistrement d'apps OAuth et d'intégration des points de terminaison](/fr/mail/api/) |
| Opérateurs de recherche, recherche d'administration et conditions de règles | [Référence de la recherche et des règles](/fr/mail/search/) |
| Chaque section de paramètres en détail | [Guide des paramètres](/fr/mail/settings/) |
| Fonctions détaillées avec captures d'écran | [Guide des fonctions](/fr/mail/features/) |
| Formes de fonctionnement et groupes de permissions | [Modes de fonctionnement](/fr/mail/modes/) |
| Positionnement du projet et déploiement | [Présentation du projet](/fr/mail/project/) |
