---
title: Modes de fonctionnement
description: Modes de fonctionnement d'EpoCanvas Mail — formes de déploiement, les trois niveaux de confidentialité du mode courriel, groupes d'identité et quotas, connexion et vérification en deux étapes, multi-comptes et modes d'affichage de l'interface.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.17**

Le même code d'EpoCanvas Mail prend des formes de fonctionnement différentes selon la configuration : une instance peut être hébergée ou auto-déployée ; l'administrateur choisit l'équilibre entre confidentialité et vérifiabilité parmi trois modes courriel ; les comptes reçoivent leurs quotas et permissions selon leur groupe d'identité ; la connexion, le multi-comptes et l'affichage offrent chacun plusieurs options. La présente page décrit le comportement et les différences de chaque mode. Le traitement des données associé est présenté dans [Traitement des données et sécurité](/fr/mail/data-security/) ; le fonctionnement des fonctions, dans [Guide des fonctions](/fr/mail/features/) ; les entrées de réglage, dans [Guide des paramètres](/fr/mail/settings/).

## 1. Formes de déploiement : instance hébergée et auto-déploiement

Le service est proposé sous les deux formes suivantes ; la qualification du responsable du traitement dans chaque cas figure à la section 2 de [l'Aperçu confidentialité et conditions](/fr/mail/overview/) :

| Forme | Opérateur | Cas d'usage |
| --- | --- | --- |
| Instance hébergée | L'équipe d'exploitation EpoCanvas ([mail.epocanvas.com](https://mail.epocanvas.com)) | Inscription et utilisation immédiates, sans domaine ni compte Cloudflare à apporter |
| Instance auto-déployée | La personne ou l'organisation qui la déploie | Toutes les données restent dans les ressources Cloudflare du déployeur, avec un code source auditable |

## 2. Mode courriel : trois niveaux de confidentialité

L'administrateur sélectionne le mode courriel de l'instance sur la carte des paramètres du site, dans les paramètres système. Le mode détermine la politique de chiffrement au stockage et l'étendue de visibilité du courriel des utilisateurs côté administration :

![Paramètres système d'EpoCanvas Mail, carte des paramètres du site : le menu déroulant du mode courriel est ouvert et affiche Mode tous courriels (Level 1), Mode courriel privé (Level 2 [Recommandé]) et Mode courriel chiffré (Level 3 [E2EE]) ; la valeur actuelle est le mode courriel privé avec un badge de confidentialité renforcée Level 2 (interface en chinois simplifié)](/images/mail/fr/ui/mode-guide.png)

*Figure : sélection du mode courriel. L'instance représentée fonctionne en mode courriel privé ; la carte de personnalisation à droite et les cartes de stockage et de push en dessous figurent sur la même page.*

<details>
<summary>Guide visuel : Le mode de messagerie  —  comment un menu déroulant décide de la confidentialité de toute l'instance</summary>

La zone du mode courriel dans la carte « Paramètres du site » des paramètres système : un menu déroulant décide du chiffrement au stockage de tous les courriels de l'instance et de l'étendue visible côté administration, avec effet immédiat.

1. **Menu déroulant du mode courriel** : L'administrateur choisit l'équilibre entre trois niveaux : Level 1 tout en clair (l'administration voit tous les courriels), Level 2 mode privé (valeur d'usine ; les courriers échangés par les utilisateurs sont chiffrés au repos en AES-256-GCM), Level 3 E2EE intégral (l'API d'administration ne renvoie aucune liste de courriels utilisateurs).
2. **Badge Confidentialité renforcée Level 2** : L'instance tourne en mode courriel privé : l'administration ne voit que les pourriels, la corbeille et les courriels sans propriétaire, et l'interrupteur général de la vérification en deux étapes est verrouillé sur activé.
3. **Les trois options déroulées** : Les différences entre L1 mode tous courriels, L2 mode courriel privé (recommandé) et L3 mode courriel chiffré (E2EE) sautent aux yeux. En mode chiffré, l'entrée de revue du courriel disparaît, les horodatages sont dépouillés des rapports d'audit et le transfert global est verrouillé sur désactivé.

</details>

| Mode | Stockage du courriel | Visibilité côté administration | Interrupteur général de double étape | Transfert global et push du robot |
| --- | --- | --- | --- | --- |
| Mode tous courriels (Level 1) | Tout en clair | Tous les courriels | Peut être désactivé | Peut être activé |
| Mode courriel privé (Level 2, valeur d'usine) | Correspondance des utilisateurs chiffrée au repos en AES-256-GCM ; corbeille conservée en clair pour permettre la récupération | Courriels indésirables, corbeille et courriels sans propriétaire uniquement | Verrouillé sur activé | Peut être activé |
| Mode courriel chiffré (Level 3 [E2EE]) | Tous les courriels (corbeille incluse) intégralement chiffrés | Ne renvoie aucune liste de courriels utilisateurs | Verrouillé sur activé | Verrouillé sur désactivé |

Le changement de mode prend effet immédiatement. En mode chiffré, la liste administrative des courriels reste vide en permanence, les rapports d'audit sont dépouillés de leurs horodatages, et l'entrée de revue du courriel disparaît de la barre latérale d'administration. Le transfert individuel et le push Telegram configurés par chaque utilisateur ne suivent pas le mode global du site ; ils dépendent des interrupteurs de contrôle des données utilisateurs fixés par l'opérateur et des réglages propres à chaque utilisateur. En mode privé, la restauration d'un message depuis la corbeille le déchiffre avant qu'il ne regagne la boîte, puis le rechiffre.

## 3. Groupes d'identité et quotas

Chaque compte appartient à un groupe d'identité, qui détermine le quota d'envoi, le nombre de boîtes, le quota de stockage et la permission des pièces jointes :

![Page des permissions d'EpoCanvas Mail : le tableau liste les six groupes d'identité — Utilisateur standard, Visiteur, Utilisateur standard LV.0, Utilisateur standard LV.1, Modérateur et Maître — avec leurs étiquettes de positionnement, quotas de stockage, limites d'envoi, permissions de pièces jointes et colonnes d'autorisation de modèles d'IA (interface en chinois simplifié)](/images/mail/fr/ui/roles-guide.png)

*Figure : vue d'ensemble de l'architecture et de la graduation sur la page des permissions. Quota de stockage, limite d'envoi et pièces jointes sont réglés groupe par groupe ; le groupe Maître n'a ni plafond d'envoi ni plafond de boîtes.*

<details>
<summary>Guide visuel : Les rôles  —  cinq colonnes décident de ce qu'un groupe peut faire</summary>

Le tableau des six groupes d'identité de la page des permissions : cinq colonnes annotées pour les cinq dimensions ajustables groupe par groupe.

1. **Colonne des groupes d'identité** : Six groupes — Utilisateur standard, Visiteur, Utilisateur standard LV.0, LV.1, Modérateur et Maître — chacun avec son étiquette de positionnement. Le groupe détermine les valeurs par défaut des quatre autres colonnes ; les groupes Visiteur et Maître sont protégés et ne peuvent pas être supprimés.
2. **Colonne du quota de stockage** : Un quota de stockage des pièces jointes par groupe (de 0 Mo pour le Visiteur à 1024 Mo pour le Maître, l'interface affichant « sans plafond »). Une fois un stockage d'objets personnel branché, les nouvelles pièces jointes ne consomment plus ce quota.
3. **Colonne de la limite d'envoi** : Le quota d'envoi quotidien (de 5 courriels pour l'Utilisateur standard à 100 pour le Modérateur ; le Maître n'a pas de plafond), remis à zéro chaque jour. Les groupes dont l'envoi est interdit — le Visiteur — portent ici la mention « envoi interdit ».
4. **Colonne des permissions de pièces jointes** : Indique si l'envoi et la réception de pièces jointes sont autorisés : les groupes « texte brut uniquement » envoient sans pièce jointe, tandis que les groupes ouverts restent bornés à la fois par le quota de stockage et par la limite de taille par fichier.
5. **Colonne des modèles IA autorisés** : L'étendue des modèles IA que le groupe peut appeler ; combinée au quota quotidien et à la limite de débit de l'AI Hub dans les paramètres système, elle met en œuvre une fourniture d'IA graduée selon l'identité.

</details>

| Groupe d'identité | Positionnement | Envoi quotidien | Boîtes | Quota de stockage | Pièces jointes |
| --- | --- | --- | --- | --- | --- |
| Visiteur | Bac à sable en lecture seule pour la découverte et l'inspection de l'open source | Interdit | 0 | 0 Mo | Non autorisées |
| Utilisateur standard | Membre de base | 5 | 1 | 5 Mo | Non autorisées |
| Utilisateur standard LV.0 | Ami certifié | 8 | 2 | 10 Mo | Non autorisées |
| Utilisateur standard LV.1 | Lettré actif | 10 | 3 | 25 Mo | Autorisées |
| Modérateur | Cogestion | 100 | 10 | 500 Mo | Autorisées |
| Maître | Autorité suprême | Sans plafond | Sans plafond | 1024 Mo | Autorisées |

Les nouvelles inscriptions arrivent dans le groupe par défaut d'usine, le Visiteur ; l'opérateur peut changer le groupe par défaut depuis la page des permissions. Les paliers LV.0 et LV.1 se synchronisent automatiquement par le lien de niveau de blog : lier un compte de blog élève le compte en LV.0, et une participation active au blog l'élève en LV.1. Le Visiteur est un bac à sable en lecture seule à l'interface complète : il peut parcourir les sections administratives en lecture seule et n'a pas le droit d'envoyer de courriels. Quotas et permissions restent ajustables par instance sur la page des permissions ; le tableau ci-dessus reprend les valeurs semées en usine. L'envoi et le nombre de boîtes du groupe Maître n'ont aucun plafond (valeurs zéro) ; son stockage est semé en usine à 1024 Mo (la page des permissions le libelle « sans plafond ») et reste ajustable au besoin.

## 4. Connexion et vérification en deux étapes

![Page de connexion d'EpoCanvas Mail : champs adresse électronique et mot de passe, case à cocher « maintenir le lien orbite » et bouton de connexion, avec en dessous les boutons de connexion rapide Google et GitHub, tous deux grisés avec un badge « bientôt disponible » (interface en chinois simplifié)](/images/mail/fr/ui/login-guide.png)

*Figure : la page de connexion. La connexion par mot de passe est la voie de base ; les boutons tiers activés par l'administrateur sans identifiants sont grisés « bientôt disponible », les désactivés ne sont pas affichés.*

<details>
<summary>Guide visuel : La connexion  —  trois étapes d'une ouverture de session par mot de passe</summary>

Les trois régions centrales de la surface de connexion : le parcours complet de saisie et de validation d'une connexion par mot de passe ; les boutons de connexion rapide tierce se trouvent sous la carte.

1. **Champ adresse électronique** : Le compte, c'est l'adresse électronique elle-même. En mode code d'inscription, cette page accepte aussi un paramètre d'invitation `?code=` qui préremplit directement le formulaire d'inscription.
2. **Champ mot de passe** : La phrase secrète est stockée en empreinte salée, le serveur ne voit jamais le texte en clair. « Mot de passe oublié » ouvre par une boîte de dialogue le portail de recours externe, en transmettant le type de recours, la langue de l'interface et l'adresse électronique.
3. **Bouton de connexion** : Après validation, les comptes ayant activé la vérification en deux étapes passent au second facteur ; des échecs répétés déclenchent un verrouillage anti-force brute. Cochez « Ne plus demander sur cet appareil » pour dispenser ce dernier de vérification pendant 30 jours.

</details>

- Connexion par mot de passe : la voie de base disponible sur toutes les instances ; la phrase secrète est stockée en empreinte salée, et les échecs répétés déclenchent un verrouillage anti-force brute ;
- Vérification en deux étapes : activée par le titulaire du compte depuis le centre de double étape des paramètres de sécurité ; trois seconds facteurs sont proposés — une application d'authentification (codes dynamiques TOTP), des codes de récupération de secours (10 codes à usage unique) et des clés d'accès (Passkey, clés de sécurité matérielles ou biométrie de l'appareil) ;
- Appareils de confiance : après avoir coché « Ne plus demander sur cet appareil » à l'étape de vérification en deux étapes, l'appareil est dispensé de nouvelle vérification pendant 30 jours ; entre 30 et 60 jours la vérification est redemandée, et au-delà de 60 jours la confiance expire ; toute automatisation ou manipulation de l'environnement se voit refuser la dispense ;
- Connexion rapide tierce : l'administrateur active et configure un à un les fournisseurs parmi GitHub, Google, Microsoft, Apple et un SSO personnalisé ; un fournisseur activé sans identifiants s'affiche grisé « bientôt disponible », un fournisseur désactivé n'est pas affiché. Les données concernées par la connexion tierce figurent dans la [Liste des sous-traitants](/fr/mail/sub-processors/).

![Page des paramètres de sécurité d'EpoCanvas Mail : la carte supérieure regroupe le nom d'utilisateur, la boîte et le changement de mot de passe ; en dessous, le centre de double étape liste les trois seconds facteurs — application d'authentification, codes de récupération et clés d'accès — avec leur état de configuration et leurs boutons d'action (interface en chinois simplifié)](/images/mail/fr/ui/twofa-guide.png)

*Figure : le centre de vérification en deux étapes de la page de sécurité. Chaque second facteur se configure indépendamment et peut être combiné aux autres.*

<details>
<summary>Guide visuel : Le centre de vérification en deux étapes  —  quatre cartes, trois seconds facteurs</summary>

Quatre régions de la page de sécurité : en haut l'entrée de modification des identifiants du compte, en bas le centre de vérification en deux étapes, qui aligne trois seconds facteurs combinables entre eux.

1. **Carte nom d'utilisateur et mot de passe** : Modifier le nom d'utilisateur et le mot de passe de connexion, en affichant la date du dernier changement. Désactiver la vérification en deux étapes exige aussi de saisir ici le mot de passe accompagné d'un code dynamique.
2. **Application d'authentification (TOTP)** : Après la liaison par lecture du code QR, elle produit un code à 6 chiffres toutes les 30 secondes. La liaison terminée affiche aussitôt 10 codes de récupération, chacun utilisable une seule fois, pour se connecter lorsque l'application est indisponible.
3. **Codes de récupération de secours** : Le recours de connexion quand l'application d'authentification fait défaut : la carte affiche en temps réel le nombre de codes encore utilisables. Consulter la liste complète ou régénérer les codes exige le mot de passe du compte, et une réinitialisation annule tous les anciens codes.
4. **Clés d'accès (Passkey)** : Clé de sécurité matérielle ou biométrie de l'appareil : une clé fraîchement enregistrée s'active aussitôt après approbation par l'application d'authentification liée (ou automatiquement à l'expiration du verrou temporel de 30 jours) ; une fois active, « Tester » vérifie le flux de déverrouillage.

</details>

## 5. Mode multi-comptes

L'administrateur peut activer le « changement rapide multi-comptes » (désactivé par défaut). Une fois activé, le menu d'avatar liste les comptes connectés avec une entrée de bascule, et « gérer vos comptes Epomail » ouvre le flux d'ajout ; chaque compte conserve une session indépendante, et les chemins d'interface sont isolés par le préfixe `/mail/u/indice/` : basculer de compte n'écrase jamais la connexion d'un autre. La bascule entre alias de boîtes d'un même compte ne crée pas de nouvelle session.

![Menu d'avatar d'EpoCanvas Mail ouvert en haut à droite de la boîte de réception : le compte actuel admin (Maître) avec sa flèche déroulante, le bouton « gérer vos comptes Epomail » et la barre d'utilisation du stockage (interface en chinois simplifié)](/images/mail/ui/ui-account-menu.png)

*Figure : changement rapide multi-comptes. Le menu regroupe les comptes connectés ; l'ajout d'un compte passe par le flux dédié de la page de connexion, et les sessions ne s'écrasent pas mutuellement.*

<details>
<summary>Guide visuel : Le menu de l'avatar  —  le carrefour des comptes et des détails de compte</summary>

Le menu d'avatar déplié dans le coin supérieur droit de la boîte de réception : le point d'entrée qui rassemble le changement de compte et les détails du compte.

- **Ligne du compte** : Le compte actuel (admin · Maître) avec sa flèche déroulante de bascule ; en mode multi-comptes, toutes les sessions connectées sont listées et isolées par le préfixe `/mail/u/N/`.
- **Bouton « Gérer vos comptes Epomail »** : L'entrée d'ajout de compte : le clic déclenche la connexion du nouveau compte par le lien profond dédié de la page de connexion, et l'on revient avec une session de plus. L'essentiel est le « non-écrasement » — le nouveau compte ne chasse pas la session en cours ; chaque espace de travail est isolé derrière un préfixe de chemin /mail/u/N/, de sorte que changer de compte revient à changer de préfixe, sans se reconnecter.
- **Barre d'utilisation du stockage** : La barre de progression du stockage des pièces jointes de ce compte : le numérateur est l'espace occupé, le dénominateur le quota attaché à son rôle (valeurs d'usine par rôle sur la page des rôles). Une fois le stockage d'objets personnel raccordé, les nouvelles pièces jointes ne comptent plus ici — une barre qui cesse de progresser ne signifie donc pas que les pièces jointes n'arrivent plus.

</details>

## 6. Langues d'interface et modes d'affichage

L'interface existe en six langues — 简体中文, 繁體中文, English, Français, Español et Nederlands — à commuter dans les paramètres généraux ; les courriels système et de bienvenue sont envoyés dans la langue de chaque destinataire. L'affichage offre trois états — sombre, clair et suivre le système — complétés par des fonds d'écran thématiques globaux et un arrière-plan personnel. L'application Web se prête à l'installation PWA, et une application Android (epomail) est également disponible.

## 7. Documents connexes

| Ressource | Lien |
| --- | --- |
| Étapes complètes de l'auto-hébergement | [Guide de déploiement](/fr/mail/deployment/) |
| Les limites du service de l'instance hébergée et ses canaux d'assistance | [Périmètre du service et assistance](/fr/mail/service-scope/) |
| Positionnement du projet et déploiement | [Présentation du projet](/fr/mail/project/) |
| Visite des paramètres personnels et de la console d'administration | [Guide des paramètres](/fr/mail/settings/) |
| Fonctions détaillées avec captures d'écran | [Guide des fonctions](/fr/mail/features/) |
| Sémantique de confidentialité et conservation des modes courriel | [Traitement des données et sécurité](/fr/mail/data-security/) |
| Visibilité de l'administration sur le contenu des courriels | [Politique de confidentialité](/fr/mail/privacy-policy/), section 10 |
