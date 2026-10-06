---
title: Guide des paramètres
description: Guide des paramètres d'EpoCanvas Mail — les cinq sections des paramètres personnels (profil, général, sécurité, données, étiquettes) et la visite complète des neuf sections de la console d'administration et des cartes de paramètres système.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.16**

EpoCanvas Mail partage ses paramètres en deux zones : la zone « paramètres » de la barre latérale regroupe les paramètres personnels que chaque compte peut ajuster lui-même, en cinq sections — profil, général, sécurité, données et étiquettes ; la zone « administration » n'apparaît que pour les groupes d'identité dotés de permissions administratives et porte la configuration au niveau de l'instance. La présente page parcourt chaque zone et les relations entre les paramètres. Pour le comportement au niveau du fonctionnement — multi-comptes, modes courriel, connexion — voir [Modes de fonctionnement](/fr/mail/modes/).

## 1. Sections des paramètres personnels

| Section | Contenu |
| --- | --- |
| Profil | Avatar, pseudonyme, genre, anniversaire et coordonnées |
| Général | Biographie, palette d'apparence, fond d'écran thématique, préférences de lecture, langue d'interface et langue cible de traduction |
| Sécurité | Nom d'utilisateur et mot de passe, centre de vérification en deux étapes, suppression du compte |
| Données | Export des données, notifications et transfert, espace de stockage et stockage cloud personnel |
| Étiquettes | Étiquettes personnalisées et règles de classement |

## 2. Profil : informations personnelles

![Page de profil d'EpoCanvas Mail : la carte d'informations de base regroupe l'import d'avatar, le pseudonyme, le genre et l'anniversaire ; la carte de contact affiche l'adresse électronique avec son étiquette de boîte principale, le bouton d'ajout d'adresse et les numéros de téléphone ; les cartes d'adresse domicile, entreprise et autre suivent en dessous (interface en chinois simplifié)](/images/mail/fr/ui/preferences-guide.png)

*Figure : la page de profil. La boîte principale porte une étiquette « boîte principale » ; les adresses électroniques supplémentaires peuvent être nombreuses et retirées à tout moment.*
*Annotations: 1. Basic Informatio　2. Contact Informat　3. Addresses　4. Associated param*

La carte d'informations de base gère l'avatar, le pseudonyme, le genre et l'anniversaire. La carte de contact liste la boîte principale de connexion et les adresses électroniques supplémentaires ajoutées par le titulaire, ainsi que les numéros de téléphone avec indicatif pays. Les cartes d'adresse conservent séparément les adresses de domicile, d'entreprise et autres. L'étendue de publication de ces informations dépend de l'interrupteur « profil public » de l'opérateur.

## 3. Général : apparence et langue

![Page générale d'EpoCanvas Mail : une zone de biographie ; la zone d'apparence propose les palettes sombre, claire et suivre le système ; le fond d'écran thématique global propose huit préréglages plus un fond personnalisé, avec l'arrière-plan personnel et d'autres réglages en dessous (interface en chinois simplifié)](/images/mail/fr/ui/general-guide.png)

*Figure : sélection de la palette d'apparence et du fond d'écran sur la page générale, présentée avec « suivre le système » et le fond uni par défaut.*

- Apparence : palettes sombre, claire et suivre le système ; huit préréglages de fond d'écran plus les fonds personnalisés ; l'arrière-plan personnel et la densité d'interface se règlent séparément ;
- Préférences de lecture : type de boîte de réception, position du volet de lecture et interrupteur de vue par conversations ;
- Langue : une langue d'interface parmi six ; la langue cible de traduction se règle indépendamment, avec 16 options, et décide la cible de la traduction intégrale par IA ; la traduction par reconnaissance de texte d'image peut être désactivée séparément ;
- La zone de confidentialité des données regroupe les entrées de préférences relatives aux informations personnelles et au traitement par IA.

## 4. Sécurité : mot de passe et vérification en deux étapes

La page de sécurité modifie le nom d'utilisateur et le mot de passe (en affichant la date du dernier changement). Le centre de vérification en deux étapes réunit l'interrupteur général et la configuration indépendante des trois seconds facteurs : application d'authentification (TOTP), codes de récupération de secours (10 codes à usage unique) et clés d'accès (Passkey). Pour le comportement à la connexion et les règles d'appareils de confiance, voir la section 4 de [Modes de fonctionnement](/fr/mail/modes/). Le bas de la page porte l'entrée de suppression du compte ; après suppression, les données du compte suivent les clauses de suppression de la [Politique de confidentialité](/fr/mail/privacy-policy/).

## 5. Données : export, notifications et stockage

![Page des données d'EpoCanvas Mail : la carte d'export propose l'export JSON intégral, l'archive des courriels (MBOX, JSON ou CSV avec plage de dates) et l'export des contacts et de la configuration ; la carte de stockage en dessous affiche la jauge d'utilisation des pièces jointes et l'entrée du stockage d'objets personnel (interface en chinois simplifié)](/images/mail/fr/ui/data-guide.png)

*Figure : la page des données. Export et gestion du stockage figurent sur une même page ; l'utilisation des pièces jointes compte contre le quota du groupe d'identité.*
*Annotations: 1. utilisateur Data　2. email & Message 　3. stockage Space &　4. Third-party apps*

| Export | Format | Portée |
| --- | --- | --- |
| Export intégral des données | JSON | Sauvegarde complète : informations du compte, historique des courriels, contacts, règles de classement et d'étiquettes, et paramètres de sécurité |
| Archive de l'historique des courriels | MBOX (universel), JSON ou CSV | Courriels envoyés et reçus uniquement, avec plage de dates facultative |
| Contacts et configuration | JSON | Répertoire, règles d'alias personnalisées et préférences de personnalisation |

Un courriel isolé se télécharge en .eml directement depuis le volet de lecture. La zone « Transfert de courriels et de messages » propose le push Telegram et le transfert automatique : la liaison d'un robot privé, les préférences de push et les types de déclencheur s'expliquent pas à pas dans le [Guide des notifications et du transfert](/fr/mail/notify/) ; l'ouverture de ces deux fonctions aux utilisateurs relève de l'interrupteur « Contrôle des données utilisateurs » de l'opérateur. La zone de stockage affiche la jauge d'utilisation des pièces jointes et permet de brancher un stockage d'objets personnel (compartiment Backblaze B2 ou S3 à soi) ; une fois branché, les pièces jointes vont directement au cloud personnel, hors quota de l'instance.

## 6. Gestion des étiquettes

La section des étiquettes gère les couleurs et les icônes des étiquettes personnalisées et configure les conditions, exceptions et priorités des règles ; les quatre étiquettes d'usine sont Communauté, Abonnements, Promotions et Travail. Le comportement du moteur de règles et la syntaxe de recherche figurent aux sections 3 et 4 du [Guide des fonctions](/fr/mail/features/).

## 7. Console d'administration

La zone d'administration s'affiche rubrique par rubrique selon les permissions du groupe d'identité, et les chemins d'interface sont liés au groupe pour prévenir l'escalade de privilèges. Les neuf sections administratives :

| Section | Responsabilité |
| --- | --- |
| Analytique | Tableaux de bord du volume de courriels, du classement et des étiquettes |
| Liste des utilisateurs | Recherche de comptes, réinitialisation du mot de passe, changement de groupe d'identité, réinitialisation de la double étape, bannissement et restauration, purge des boîtes |
| Pourriels / Tous les courriels | Section de revue du courriel à l'échelle du site ; son nom et son étendue suivent le mode courriel (Level 1 affiche Tous les courriels, Level 2 la section des pourriels, Level 3 masque l'entrée) |
| Permissions | Modèles de quotas et de permissions des six groupes d'identité, groupe par défaut et autorisation des modèles d'IA ; les groupes Visiteur et Maître sont protégés contre la suppression |
| Clés d'inscription | Émission et vérification des codes d'invitation |
| Paramètres système | Configuration au niveau de l'instance — voir la liste de cartes ci-dessous |
| Gestion des applications | Émission et gestion des identifiants d'accès des applications tierces OAuth 2.0 / OIDC |
| Classement | Interrupteurs de réception et d'envoi, configuration de la reconnaissance par IA, listes noire/blanche et règles de blocage dur |
| Rapport d'audit | Examen, traitement et arbitrage des quatre classes d'alertes |

La page des paramètres système organise la configuration de l'instance en cartes :

| Carte | Contenu |
| --- | --- |
| Paramètres du site | Inscription ouverte, profils publics, mode courriel, vérification en deux étapes, domaine de connexion masqué, codes d'inscription, boîtes supplémentaires, changement rapide multi-comptes, règles de préfixe de boîte |
| Personnalisation | Titre du site, notifications contextuelles, interface dynamique/statique |
| Authentification tierce et SSO | Interrupteur général de connexion rapide tierce et identifiants par fournisseur (affiché sous un indicateur de fonctionnalité) |
| Stockage et base de données centrale | Stockage d'objets (B2 / S3, repli R2 / KV par défaut), architecture de base de données centrale et externe, limite de pièce jointe unique et suppression en cascade, contrôle de santé du cache KV |
| Push des courriels | Robot Telegram, transfert global et transfert par règles (verrouillé sur désactivé en mode chiffré) |
| Moteur IA et intégration de modèles | Fournisseur d'IA (point de terminaison compatible OpenAI personnalisé ou Cloudflare Workers AI), interrupteur d'activation, quota quotidien et limite de débit, autorisation de modèles |
| Contrôle des données utilisateurs | Push Telegram des utilisateurs, transfert de courriels, API et stockage apporté, et quota de stockage par défaut |
| Turnstile | Clé de site de vérification humaine et interrupteur |
| Annonce | Fenêtres d'avis, envois groupés d'annonces et modèles de courriels de bienvenue (multilingues) |
| Rapports des opérations | Seuils opérationnels de déclenchement des alertes |
| À propos | Informations de version et vérification des mises à jour |

La page des rapports d'audit présente les événements de risque du site sous forme de tickets d'alerte, chacun portant sa classe, sa priorité, son état et le détail complet de son environnement (IP, géolocalisation, appareil et empreinte) :

| Classe d'alerte | Déclencheur | Traitement habituel |
| --- | --- | --- |
| Alerte d'audit | Signalement ou violation signalée par d'autres utilisateurs établie | Vérifier, puis lever ou traiter |
| Alerte de risque | Franchissement d'une ligne rouge de sécurité ou environnement de connexion anormal (p. ex. connexions multi-IP et multi-sites simultanées) | Surveillance rapprochée, entretien ou bannissement |
| Alerte de bannissement | Le compte a été banni automatiquement par le système ou manuellement par un administrateur | Lever l'alerte ou maintenir le bannissement |
| Alerte d'appel | L'utilisateur a fait appel d'une décision de traitement | Lever (lever le bannissement) ou rejeter |

![Page des rapports d'audit d'EpoCanvas Mail : le tableau liste les tickets d'alerte des quatre classes — appel, bannissement, audit et risque — avec priorité, étiquette d'état, détails de l'environnement actif et boutons de traitement comme lever et lever l'alerte (interface en chinois simplifié)](/images/mail/fr/ui/audit-guide.png)

*Figure : le rapport d'audit. Les quatre classes d'alertes s'examinent dans une liste unique, les boutons de traitement étant répartis par classe ; en mode chiffré, les horodatages sont dépouillés.*
*Annotations: 1. Email　2. Niveau d’audit d　3. Contexte de l'al　4. Pool d’environne*

## 8. Documents connexes

| Ressource | Lien |
| --- | --- |
| 2FA, codes de récupération et clés d'accès pas à pas | [2FA, codes de récupération et clés d'accès pas à pas](/fr/mail/security/) |
| Push Telegram et transfert automatique pas à pas | [Push Telegram et transfert automatique pas à pas](/fr/mail/notify/) |
| Tutoriel d'enregistrement d'apps OAuth et d'intégration des points de terminaison | [Tutoriel d'enregistrement d'apps OAuth et d'intégration des points de terminaison](/fr/mail/api/) |
| La route et les éléments de chaque interface | [Interface et plan des routes](/fr/mail/interface/) |
| Opérateurs de recherche et conditions de règles de classement | [Référence de la recherche et des règles](/fr/mail/search/) |
| Formes de déploiement, modes courriel et connexion | [Modes de fonctionnement](/fr/mail/modes/) |
| Fonctions détaillées avec captures d'écran | [Guide des fonctions](/fr/mail/features/) |
| Topologie technique et chiffrement | [Architecture technique](/fr/mail/architecture/) |
| Traitement et conservation des données derrière les paramètres | [Traitement des données et sécurité](/fr/mail/data-security/) |
