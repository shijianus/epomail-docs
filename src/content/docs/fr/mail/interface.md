---
title: Interface et plan des routes
description: Interface et plan des routes d'EpoCanvas Mail — les huit vues de la boîte, la fenêtre de rédaction en surimpression, toutes les routes des paramètres et de l'administration, les flux de la surface de connexion, la page de consentement OAuth et les profils publics.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.17**

La présente page parcourt une à une les interfaces d'EpoCanvas Mail et leur route. Un emplacement se compose de deux parties : le préfixe de chemin `/mail/u/N/` (N est l'indice de session multi-comptes ; toujours 0 pour un compte unique) et la route de vue après `#` (par exemple `#inbox`). Les anciens chemins directs tels que `/inbox` sont normalisés automatiquement. La surface de connexion est déployée séparément sous `/login/`. Ce que chaque route autorise est décidé par les permissions du groupe d'identité — voir [Modes de fonctionnement](/fr/mail/modes/) ; l'effet de chaque paramètre est décrit dans le [Guide des paramètres](/fr/mail/settings/).

![Panorama de la boîte de réception d'EpoCanvas Mail : à gauche l'entrée de rédaction et l'arborescence des dossiers, à droite la liste des messages avec badges de code de vérification et marques officielles (interface en chinois simplifié)](/images/mail/fr/ui/views-guide.png)

*Figure : la boîte de réception (`#inbox`). Les huit vues partagent un même squelette de liste ; les compteurs et les étiquettes restent synchronisés.*

<details>
<summary>Guide visuel : La boîte de réception en un coup d'œil  —  les quatre entrées les plus utilisées</summary>

Quatre régions annotées de la boîte de réception, correspondant aux quatre entrées les plus utilisées au quotidien : rédiger un nouveau message, revenir aux courriels marqués d'une étoile, consulter les éléments reportés et vérifier ce qui est réellement parti.

1. **Rédiger (bouton principal de la barre latérale)** : L'unique point d'entrée pour créer un courriel : il ouvre la fenêtre de rédaction en surimpression (et non une route indépendante). Sur mobile, il devient un bouton flottant en bas à droite, et le lien profond `?composeTo=<address>` préremplit le destinataire. Rédiger un message ne demande qu'un clic, depuis n'importe quelle vue.
2. **Étoilés (dossier de la barre latérale)** : Tous les courriels marqués d'une étoile s'y rassemblent, quel que soit leur dossier : un clic sur l'étoile d'une ligne de liste les y ajoute. À réserver aux messages à garder à portée de main ou à consulter souvent ; le compteur de la barre latérale se met à jour en temps réel.
3. **Reportés (dossier de la barre latérale)** : La zone d'attente des suivis différés, à deux paliers (urgent et en attente). Dans la vue de détail, choisissez « Reporter » en précisant l'heure ; à l'échéance, le courriel revient automatiquement en haut de la boîte de réception et les sujets importants ne sombrent plus au fond de la pile.
4. **Envoyés (dossier de la barre latérale)** : Conserve la trace de tous les courriels émis par ce compte, où vérifier ce qui est effectivement parti. Le volume sortant est borné par le quota d'envoi quotidien du rôle ; les courriels adressés aux boîtes du site sont livrés en direct, ceux destinés à l'extérieur passent par le canal de livraison.

</details>

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

<details>
<summary>Guide visuel : La fenêtre de rédaction région par région, de haut en bas</summary>

La fenêtre de rédaction, de haut en bas : expéditeur verrouillé, destinataires et objet, barre d'outils de texte enrichi, zone de saisie du corps et barre d'actions en bas.

- **Ligne de l'expéditeur** : L'expéditeur est verrouillé sur la boîte avec laquelle vous êtes connecté et n'est pas modifiable pendant la rédaction : un courriel envoyé depuis cette plateforme ne peut donc pas porter un From forgé. Les comptes à plusieurs boîtes changent d'identité d'envoi dans cette ligne ; le destinataire voit la boîte choisie. L'adresse d'expédition détermine aussi le canal de distribution du courriel sortant.
- **Lignes des destinataires et de l'objet** : Les destinataires se choisissent parmi les contacts et acceptent le lien profond `?composeTo=` ; l'objet s'affiche dans les listes et reste interrogeable via `subject:`.
- **Barre d'outils et zone du corps** : 17 outils de mise en forme : paragraphe, taille de police, styles de caractère, couleur, alignement, listes, citation, lien, image, tableau, émoji, traduction et mode code source.
- **Barre d'actions en bas** : Le bouton de pièces jointes (capacité activée selon le rôle, plafond par fichier selon le réglage de l'instance) et le bouton d'envoi ; livraison directe sur le site, acheminement hors site par le canal configuré par l'Opérateur.

</details>

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

<details>
<summary>Guide visuel : La coque des réglages  —  la colonne de gauche et le panneau de droite</summary>

L'aspect de la section des paramètres généraux : la colonne de gauche navigue entre les cinq sections de paramètres, la zone de droite porte les entrées générales (palette d'apparence, fond d'écran thématique, etc.).

- **Navigation entre sections (colonne de gauche)** : Bascule entre les cinq sections Profil/Général/Sécurité/Données/Étiquettes ; entrer dans les paramètres masque la barre latérale du courrier, et « Retour au courrier » ramène à l'interface principale.
- **Zone de personnalisation** : Trois modes de thème (sombre, clair, système) et le fond d'écran global (huit préréglages plus une image ou une URL personnalisée). La portée couvre toutes les vues de l'application — à la différence de l'« arrière-plan personnel », limité à la zone de la boîte de réception. La barre supérieure offre en outre un commutateur de thème rapide : inutile de revenir ici.
- **Les autres groupes** : Les trois autres groupes de réglages de la page : préférences de lecture (type de boîte, position du volet de lecture, vue par conversation), langue (une interface parmi six, une cible de traduction IA parmi seize) et confidentialité des données (le guichet central des préférences de traitement des données personnelles et de l'IA). Cette figure ne montre que la colonne et l'allure ; la section 3 du guide des réglages détaille chaque élément.

</details>

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

<details>
<summary>Guide visuel : Le rapport d'opérations sous forme de tableau côté administration</summary>

La page du rapport d'audit telle que la voit l'administration : les tickets d'alerte s'apprécient sous forme de tableau, et les boutons de traitement se répartissent selon la classe d'alerte.

- **Tableau des tickets** : Une alerte par ligne, avec colonnes pour la catégorie (audit, contrôle des risques, bannissement, appel), la priorité (P0/P1), l'état actuel et le pool d'environnements actifs en texte brut — IP, géographie, appareil et empreinte. Le pool s'agrège par comportement de requête : l'anomalie ne devient visible que lorsqu'un même compte se connecte simultanément depuis plusieurs IP.
- **Boutons de traitement** : Les boutons se répartissent selon la catégorie du ticket : les alertes d'appel mettent « lever après examen » en évidence (lever, c'est restaurer le compte), les alertes de bannissement mettent en avant « retirer l'alerte », et les autres passent par le menu d'actions standard. Le bouton n'enregistre que le verdict ; le bannissement et la restauration effectifs restent exécutés depuis la liste des utilisateurs, les deux pages restant synchronisées.
- **Couplage avec le mode** : La même table change de forme selon le mode de messagerie : en mode tout-courriel (L1) l'information est la plus complète ; en mode privé (L2) la page ressemble à cette figure ; en mode chiffré (L3) les horodatages sont dépouillés et la colonne temporelle disparaît — l'administrateur juge alors sur la seule catégorie et le pool d'environnements, sans pouvoir reconstituer l'ordre des événements.

</details>

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

<details>
<summary>Guide visuel : Tous les flux que porte la page de connexion</summary>

La surface de connexion dans son ensemble : une même carte de connexion porte tous les flux — connexion par mot de passe, vérification en deux étapes, connexion rapide tierce, inscription et mot de passe oublié.

- **Zone de saisie** : Le chemin le plus fréquenté de la page : l'adresse électronique tient lieu de compte, et le mot de passe est stocké en empreinte salée — le serveur ne voit jamais le clair. Des échecs répétés déclenchent un verrouillage anti-force brute, dont la granularité et la durée relèvent de la politique du serveur ; cocher « garder cet appareil de confiance » dispense de toute re-vérification pendant 30 jours.
- **Zone des boutons tiers** : Les fournisseurs que l'administrateur a activés et dotés d'identifiants apparaissent en boutons ; ceux activés mais sans identifiants s'affichent grisés « bientôt disponible » ; les fournisseurs désactivés ne s'affichent pas du tout.
- **Les autres flux** : La même carte porte trois chemins de plus : un compte avec vérification en deux étapes poursuit vers un second facteur (TOTP, code de récupération ou clé d'accès) ; en mode code d'inscription, un paramètre code préremplit le formulaire d'inscription ; « mot de passe oublié » rejoint le portail de recours externe en emportant le type de recours, la langue d'interface et l'adresse électronique. La section 4 de la page des modes énonce les règles.

</details>

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
