---
title: Modes de fonctionnement
description: Modes de fonctionnement d'EpoCanvas Mail — formes de déploiement, les trois niveaux de confidentialité du mode courriel, groupes d'identité et quotas, connexion et vérification en deux étapes, multi-comptes et modes d'affichage de l'interface.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

Le même code d'EpoCanvas Mail prend des formes de fonctionnement différentes selon la configuration : une instance peut être hébergée ou auto-déployée ; l'administrateur choisit l'équilibre entre confidentialité et vérifiabilité parmi trois modes courriel ; les comptes reçoivent leurs quotas et permissions selon leur groupe d'identité ; la connexion, le multi-comptes et l'affichage offrent chacun plusieurs options. La présente page décrit le comportement et les différences de chaque mode. Le traitement des données associé est présenté dans [Traitement des données et sécurité](/fr/mail/data-security/) ; le fonctionnement des fonctions, dans [Guide des fonctions](/fr/mail/features/) ; les entrées de réglage, dans [Guide des paramètres](/fr/mail/settings/).

## 1. Formes de déploiement : instance hébergée et auto-déploiement

Le service est proposé sous les deux formes suivantes ; la qualification du responsable du traitement dans chaque cas figure à la section 2 de [l'Aperçu confidentialité et conditions](/fr/mail/overview/) :

| Forme | Opérateur | Cas d'usage |
| --- | --- | --- |
| Instance hébergée | L'équipe d'exploitation EpoCanvas ([mail.epocanvas.com](https://mail.epocanvas.com)) | Inscription et utilisation immédiates, sans domaine ni compte Cloudflare à apporter |
| Instance auto-déployée | La personne ou l'organisation qui la déploie | Les ressources principales sont configurées par le déployeur ; les envois, sources d'identité, stockages d'objets, services d'IA et notifications peuvent néanmoins faire intervenir d'autres prestataires ; voir la liste des destinataires tiers et sous-traitants |

## 2. Mode courriel : trois niveaux de confidentialité

L'administrateur sélectionne le mode courriel de l'instance sur la carte des paramètres du site, dans les paramètres système. Le mode détermine la politique de chiffrement au stockage et l'étendue de visibilité du courriel des utilisateurs côté administration :

![Paramètres système d'EpoCanvas Mail, carte des paramètres du site : le menu déroulant du mode courriel est ouvert et affiche Mode tous courriels (Level 1), Mode courriel privé (Level 2 [Recommandé]) et Mode courriel chiffré (Level 3 [E2EE]) ; la valeur actuelle est le mode courriel privé avec un badge de confidentialité renforcée Level 2 (interface en chinois simplifié)](/images/mail/fr/ui/mode-guide.png)

*Figure : exemple d'interface de sélection du mode courriel ; la valeur et le badge de la capture ne prouvent pas la configuration actuelle de l'instance en ligne et ne signifient pas qu'un chiffrement de bout en bout est fourni.*

<details>
<summary>Guide visuel : Le mode de messagerie  —  comment un menu déroulant décide de la confidentialité de toute l'instance</summary>

La zone du mode courriel dans la carte « Paramètres du site » des paramètres système : le menu déroulant influe sur le chiffrement ultérieur des champs et la visibilité côté administration ; il ne signifie pas que la migration de toutes les données historiques est achevée.

1. **Menu déroulant du mode courriel** : Le Level 1 conserve les courriels en clair ; le Level 2, mode privé et valeur d'usine, chiffre au repos côté serveur une partie des corps et objets des utilisateurs ; le Level 3, mode chiffré, étend cette protection au repos et empêche la liste administrative de renvoyer les courriels des utilisateurs. Aucun de ces modes n'est un chiffrement de bout en bout : le serveur conserve la capacité de déchiffrer.
2. **Badge Confidentialité renforcée Level 2** : En mode privé, la liste administrative affiche les indésirables, la corbeille et les courriels sans propriétaire, et l'interrupteur général de vérification en deux étapes est verrouillé sur activé. Ce badge ne prouve pas que l'administrateur soit techniquement incapable d'accéder aux autres données.
3. **Les trois options déroulées** : La mention E2EE présente dans l'interface ou la capture ne change pas la conception réelle du chiffrement côté serveur. Le mode chiffré masque l'entrée de revue de l'ensemble des courriels, retire les horodatages des rapports d'opérations et désactive les transferts et notifications de robot au niveau système ; les transmissions externes configurées personnellement ne sont pas automatiquement désactivées.

</details>

| Mode | Stockage du courriel | Visibilité côté administration | Interrupteur général de double étape | Transfert global et push du robot |
| --- | --- | --- | --- | --- |
| Mode tous courriels (Level 1) | Tout en clair | Tous les courriels | Peut être désactivé | Peut être activé |
| Mode courriel privé (Level 2, valeur d'usine) | Correspondance des utilisateurs chiffrée au repos en AES-256-GCM ; corbeille conservée en clair pour permettre la récupération | Courriels indésirables, corbeille et courriels sans propriétaire uniquement | Verrouillé sur activé | Peut être activé |
| Mode courriel chiffré (Level 3, indiqué E2EE dans l'interface) | Chiffrement au repos côté serveur étendu aux objets et corps ; les pièces jointes et métadonnées de routage ne sont pas automatiquement incluses | Ne renvoie aucune liste de courriels utilisateurs | Verrouillé sur activé | Désactivé et verrouillé au niveau système ; les configurations personnelles doivent être vérifiées séparément |

Le changement de mode influe sur les traitements ultérieurs et les listes administratives, sans prouver la migration de l'ensemble des enregistrements historiques, copies ou pièces jointes. En mode chiffré, la liste administrative des courriels est vide, certains horodatages sont retirés des rapports d'opérations et l'entrée de revue disparaît de la barre latérale d'administration. Les transferts personnels et notifications Telegram ne sont pas automatiquement désactivés par le mode global ; ils restent régis par leurs contrôles respectifs et les paramètres personnels. En mode privé, déplacer un courriel vers la corbeille entraîne d'abord le déchiffrement et l'enregistrement de l'objet, du corps et du code de vérification, qui deviennent visibles dans l'administration ; lors de la restauration, ils sont de nouveau chiffrés selon ce mode.

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
2. **Champ mot de passe** : Le mot de passe est transmis au serveur via TLS pour vérification ; le serveur a accès à la valeur saisie. Les enregistrements persistants de vérification sont des hachages salés, mais certains parcours MFA en attente prévoient un stockage temporaire en clair ; voir la documentation de sécurité des données. Le lien « Mot de passe oublié » peut transmettre le type de recours, la langue et l'adresse électronique au portail de recours configuré.
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

L’administrateur peut activer le changement rapide multi-comptes, désactivé par défaut. Le menu d’avatar liste alors les comptes connectés et permet d’en changer ou d’en ajouter ; `/mail/u/indice/` sélectionne le compte. Les comptes peuvent avoir des sessions distinctes et les bases de brouillons locaux sont choisies selon l’adresse de la boîte, mais le stockage de même origine ne constitue pas un profil de navigateur distinct. Dans l’implémentation locale de cette révision, une déconnexion ordinaire termine uniquement la session courante et efface le cache du message ouvert et l’historique des destinataires, en conservant les sessions des autres comptes et les brouillons. Elle ne révoque pas tous les jetons ou liens de partage. Changer d’alias au sein du même compte ne crée pas de nouvelle session. Ces comportements n’attestent pas un déploiement sur toutes les instances en ligne ; voir la section 4.3 de la Politique de confidentialité pour les appareils partagés.

![Menu d'avatar d'EpoCanvas Mail ouvert en haut à droite de la boîte de réception : le compte actuel admin (Maître) avec sa flèche déroulante, le bouton « gérer vos comptes Epomail » et la barre d'utilisation du stockage (interface en chinois simplifié)](/images/mail/ui/ui-account-menu.png)

*Figure : changement rapide multi-comptes. Le menu regroupe les comptes connectés ; l'ajout d'un compte passe par le flux dédié de la page de connexion, et les sessions ne s'écrasent pas mutuellement.*

<details>
<summary>Guide visuel : Le menu de l'avatar  —  le carrefour des comptes et des détails de compte</summary>

Le menu d'avatar déplié dans le coin supérieur droit de la boîte de réception : le point d'entrée qui rassemble le changement de compte et les détails du compte.

- **Ligne du compte** : Le compte actuel (admin · Maître) et la flèche de changement de compte ; en mode multi-comptes, les sessions connectées sont listées et `/mail/u/N/` sélectionne le compte. Ce chemin ne constitue pas, à lui seul, une isolation du stockage ou de l'accès à l'appareil.
- **Bouton « Gérer vos comptes Epomail »** : Ajoute un compte depuis la page de connexion, puis revient à la liste ; le routage ne constitue pas une séparation du stockage. Pour retirer de ce navigateur les données de tous les comptes du site, confirmez séparément le nettoyage de l’appareil dans Paramètres → Données. Une déconnexion ordinaire ne supprime pas silencieusement les brouillons des autres comptes.
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
| Visibilité de l'administration sur le contenu des courriels | [Politique de confidentialité](/fr/mail/privacy-policy/), section 4 |
