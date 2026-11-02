---
title: Guide des paramètres
description: Guide des paramètres d'EpoCanvas Mail — les cinq sections des paramètres personnels (profil, général, sécurité, données, étiquettes) et la visite complète des neuf sections de la console d'administration et des cartes de paramètres système.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

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

<details>
<summary>Guide visuel : Le profil  —  les données personnelles réparties en quatre dimensions</summary>

Les quatre cartes de la page Profil : de l'identité et de l'image aux coordonnées puis au carnet d'adresses, les quatre dimensions des données personnelles se gèrent carte par carte.

1. **Carte informations de base** : Import d'avatar, pseudonyme, genre et anniversaire. Le fait que le pseudonyme et l'avatar soient visibles de l'extérieur dépend de l'interrupteur « profils publics » de l'administrateur.
2. **Carte coordonnées** : La boîte principale de connexion porte l'étiquette « boîte principale » et ne peut pas être retirée ; plusieurs adresses électroniques supplémentaires peuvent être ajoutées et retirées à tout moment, et un numéro de téléphone avec indicatif pays peut y être enregistré.
3. **Cartes d'adresse** : Les adresses du domicile, de l'entreprise et « autre » sont conservées séparément, chacune ajoutée, modifiée ou supprimée à part. Ce sont des données personnelles au sens strict : jamais utilisées pour la remise du courrier, sans effet sur la facturation ni sur le rôle. Qu'elles soient nécessaires — et qu'elles paraissent publiquement — dépend de l'interrupteur « profil public » de l'opérateur.
4. **Carte paramètres associés et sécurité** : Le tremplin de la page de profil vers les autres pages de réglages : sécurité du compte (nom d'utilisateur et mot de passe, vérification en deux étapes) et autorisations de tiers (applications autorisées), les deux entrées les plus fréquentées, sont réunies ici pour éviter les allers-retours entre profil et sécurité. Chaque entrée saute à la section correspondante au lieu d'ouvrir une nouvelle page.

</details>

La carte d'informations de base gère l'avatar, le pseudonyme, le genre et l'anniversaire. La carte de contact liste la boîte principale de connexion et les adresses électroniques supplémentaires ajoutées par le titulaire, ainsi que les numéros de téléphone avec indicatif pays. Les cartes d'adresse conservent séparément les adresses de domicile, d'entreprise et autres. L'étendue de publication de ces informations dépend de l'interrupteur « profil public » de l'opérateur.

## 3. Général : apparence et langue

![Page générale d'EpoCanvas Mail : une zone de biographie ; la zone d'apparence propose les palettes sombre, claire et suivre le système ; le fond d'écran thématique global propose huit préréglages plus un fond personnalisé, avec l'arrière-plan personnel et d'autres réglages en dessous (interface en chinois simplifié)](/images/mail/fr/ui/general-guide.png)

*Figure : sélection de la palette d'apparence et du fond d'écran sur la page générale, présentée avec « suivre le système » et le fond uni par défaut.*

<details>
<summary>Guide visuel : Général  —  trois cartes pour l'apparence et les habitudes de lecture</summary>

Les trois cartes de la page Général — biographie, personnalisation et préférences — couvrent toute l'individualisation de l'apparence et des habitudes de lecture.

1. **Carte biographie** : Un texte de présentation affiché sur votre profil public ; l'ouverture de ce profil public est décidée par l'interrupteur « profils publics » de l'administrateur.
2. **Carte personnalisation** : Trois états de palette d'apparence (sombre/clair/suivre le système, aussi basculables depuis la barre supérieure) et le fond d'écran thématique global (huit préréglages plus un fond personnalisé ou une URL) ; s'y trouvent encore l'arrière-plan personnel (qui ne couvre que la zone de la boîte) et la densité d'interface.
3. **Carte préférences** : Préférences de lecture (type de boîte de réception, position du volet de lecture, vue par conversations) et langue (interface au choix parmi six, langue cible de traduction par IA parmi 16) ; la zone de confidentialité des données regroupe les entrées des préférences relatives aux informations personnelles et au traitement par IA.

</details>

- Apparence : palettes sombre, claire et suivre le système ; huit préréglages de fond d'écran plus les fonds personnalisés ; l'arrière-plan personnel et la densité d'interface se règlent séparément ;
- Préférences de lecture : type de boîte de réception, position du volet de lecture et interrupteur de vue par conversations ;
- Langue : une langue d'interface parmi six ; la langue cible de traduction se règle indépendamment, avec 16 options, et décide la cible de la traduction intégrale par IA ; la traduction par reconnaissance de texte d'image peut être désactivée séparément ;
- La zone de confidentialité des données regroupe les entrées de préférences relatives aux informations personnelles et au traitement par IA.

## 4. Sécurité : mot de passe et vérification en deux étapes

La page de sécurité modifie le nom d’utilisateur et le mot de passe (en affichant la date du dernier changement). Le centre de vérification en deux étapes réunit l’interrupteur général et la configuration indépendante des trois seconds facteurs : application d’authentification (TOTP), codes de récupération de secours (10 codes à usage unique) et clés d’accès (Passkey). Désactiver TOTP supprime le secret TOTP ; si une clé d’accès active reste présente, la vérification en deux étapes reste activée et la clé d’accès n’est pas supprimée. Pour le comportement à la connexion et les règles d’appareils de confiance, voir la section 4 de [Modes de fonctionnement](/fr/mail/modes/). Le bas de la page porte l’entrée de suppression du compte ; après suppression, les données du compte suivent les clauses de suppression de la [Politique de confidentialité](/fr/mail/privacy-policy/).

## 5. Données : export, notifications et stockage

![Page des données d'EpoCanvas Mail : accès aux exports du profil, des archives de courriels et de la configuration ; les champs sont limités pour chaque export et l'option de plage de dates ne signifie pas qu'elle est appliquée par le serveur ; en dessous, utilisation des pièces jointes et accès au stockage d'objets](/images/mail/fr/ui/data-guide.png)

*Figure : la page des données. Export et gestion du stockage figurent sur une même page ; l'utilisation des pièces jointes compte contre le quota du groupe d'identité.*

<details>
<summary>Guide visuel : Données  —  les quatre régions de l'autonomie sur vos données</summary>

Les quatre cartes de la page Données : trois formats pour emporter ses données, une zone de transfert, une zone de stockage et une zone d'autorisations tierces — l'autonomie complète sur ses données personnelles en un écran.

1. **Carte données du compte et export** : Les exports JSON, d'archives de courriels et de configuration utilisent tous la même réponse du serveur et ne comprennent que les champs sélectionnés. La plage de dates n'est pas appliquée et il ne s'agit pas d'une sauvegarde complète. Chaque fichier .eml est lui aussi reconstruit à partir des champs existants.
2. **Carte transfert de courriels et de messages** : Paramètres Telegram et de transfert ; leur disponibilité est contrôlée par l’administrateur. Le transfert personnel par règles (`rules`) est actuellement indisponible, ne transfère rien à l’exécution et ne se replie pas sur tous les messages ; les contrôles Telegram de portée, d’aperçu et de copie de code sont appliqués selon leurs paramètres. Voir le Guide des notifications et du transfert.
3. **Carte espace de stockage** : Utilisation des pièces jointes et quota ; un stockage personnel Backblaze B2/S3 peut recevoir les nouvelles pièces jointes, tandis que les autres limites restent applicables. Le débranchement ne migre ni ne supprime les anciens objets et ne garantit pas que les anciennes pièces jointes restent lisibles.
4. **Carte applications et services tiers** : Consultation et révocation des autorisations OAuth ; le serveur peut refuser les requêtes ultérieures concernées, mais ne peut pas récupérer les données déjà transmises ni retirer les ID tokens déjà émis ou les sessions des tiers.

</details>

| Export | Format | Portée |
| --- | --- | --- |
| Export intégral des données (nom dans l'interface) | JSON | Partie des données personnelles, champs sélectionnés des courriels non marqués comme supprimés et `customLabels` ; sans les fichiers joints, l'intégralité des contacts et règles, les paramètres de sécurité ni les données d'audit |
| Archive de l'historique des courriels | MBOX, JSON ou CSV | Le navigateur convertit les champs des courriels issus de la même réponse ; le serveur n'applique pas la plage de dates ; les courriels de la corbeille et le MIME d'origine complet ne sont pas inclus |
| Contacts et configuration | JSON | Sous-ensemble de champs personnels renvoyés, `customLabels` et date d'export ; ce n'est pas une sauvegarde complète du carnet d'adresses, des alias ou de toutes les préférences |

Chaque fichier .eml est reconstruit à partir des champs existants ; les limites complètes de l'exportation sont précisées dans [Export des données et stockage](/fr/mail/data/). La liaison, le filtrage et les limites de révocation des liens de la zone « Transfert de courriels et de messages » sont décrits dans le [Guide des notifications et du transfert](/fr/mail/notify/). Un stockage personnel Backblaze B2/S3 permet d'y enregistrer les nouvelles pièces jointes sans passer par la vérification du quota système propre au parcours de stockage des pièces jointes ; les autres limites relatives aux courriels, aux envois et au fournisseur restent applicables. Le débranchement ne migre ni ne supprime les anciens objets.

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
| Rapport d'audit | Instruction et traitement des tickets de risque sur quatre tableaux, tiroirs de preuves et arbitrage des recours |

<span id="operator-notice"></span>

La carte Exploitant et confidentialité exige un nom permettant d’identifier l’exploitant, son pays ou sa région réelle, une adresse de contact électronique, la version des conditions et des liens valides vers les conditions de service et l’information sur la confidentialité. Complétez l’adresse de contact et les informations sur les destinataires et la conservation selon le cas. Les informations obligatoires manquantes bloquent les nouvelles inscriptions, sans bloquer les connexions existantes ni l’initialisation. Le nouvel utilisateur coche activement une case d’acceptation des conditions non précochée. Le serveur enregistre le compte, la version, la date, la langue et l’URL des conditions ; l’information sur la confidentialité ne vaut pas consentement général.

<span id="optional-processing"></span>

L’extraction facultative de codes, la traduction et l’OCR sont désactivés par défaut et nécessitent une information sur la destination des données avant activation. L’extraction automatique exige aussi le choix explicite de l’utilisateur dans les paramètres de données ; la traduction demande une confirmation de l’information actuelle pour chaque requête, et l’OCR un choix distinct pour cette requête. Le repli vers des services publics de traduction est indisponible. Les paramètres de données permettent aussi de révoquer les liens de lecture Telegram existants et d’effacer les données de cet appareil après confirmation explicite. La fermeture indique l’accès désactivé et une suppression à vérifier, non l’effacement de toutes les copies. Mettez à niveau ensemble l’interface et le serveur ; la configuration ne prouve ni l’identité réelle, ni les contrats, destinataires ou pratiques de conservation.

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

La page des rapports d'audit présente les événements de risque du site en quatre tableaux — menaces d'abus, audit des recours, gestion des risques et journal des opérations —, chacun résumant une classe de tickets dans une table différenciée :

| Tableau | Tickets inclus | Instruction habituelle |
| --- | --- | --- |
| Menaces d'abus | Comptes à menace LV3+ : multi-comptes, signalements graves, etc. | Vérifier les preuves, puis lever, bannir ou prolonger |
| Audit des recours | Recours contre les décisions de traitement | Examiner chaque formulaire, puis lever ou rejeter |
| Gestion des risques | Routine de risque : spam, sauts d'IP, etc. | Instruire et archiver par niveau d'infraction |
| Journal des opérations | Traitements conclus et mises à jour d'archivage | Retracer le registre complet et les recours |

![Page des rapports d'audit EpoCanvas Mail : quatre cartes de tableau en haut avec une table de tickets différenciée, la barre d'outils proposant prolongation par lots, actualisation, réinitialisation, export de données, nettoyage de l'historique et lien vers la documentation](/images/mail/fr/ui/audit-guide.png)

*Figure : le rapport d'audit. Chacun des quatre tableaux résume une classe de tickets ; en mode chiffré, les horodatages sont anonymisés.*

<details>
<summary>Guide visuel : Le rapport d'opérations — la console de tickets à quatre tableaux</summary>

Les quatre zones annotées de la page : les cartes définissent l'orientation de l'instruction, les tickets sont traités ligne à ligne.

1. **Carte Menaces d'abus** : le registre consolidé des comptes à menace LV3+ avec le compteur en direct « en attente N / bloqués N » ; un clic ouvre la vue de traitement compacte du tableau des menaces.
2. **Carte Audit des recours** : le nombre de tickets de recours et l'accès à l'examen formulaire par formulaire ; lever rétablit la capacité d'envoi du compte.
3. **Carte Gestion des risques** : tickets de routine instruits selon le niveau d'infraction, le motif d'alerte et l'échéance.
4. **Carte Journal des opérations** : le registre des traitements conclus, avec le nombre de mises à jour, la dernière mise à jour et les recours ; le détail complet du tiroir de preuves, du traitement par lots et de l'export CSV figure dans le [Rapport d'audit](/fr/mail/audit/).

</details>

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
