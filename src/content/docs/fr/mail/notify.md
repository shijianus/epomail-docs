---
title: Guide des notifications et du transfert
description: Guide des notifications et du transfert d'EpoCanvas Mail — liaison du push Telegram, préférences de push et visibilité des champs, destination et types de déclencheur du transfert automatique.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

La présente page parcourt les deux capacités de la zone « Notifications et transfert » de la page « Paramètres → Données » : le push des messages Telegram et le transfert automatique. Un compte y accède ou non selon la carte « Contrôle des données utilisateurs » de l'administrateur ; lorsque l'interrupteur est désactivé, les blocs sont masqués. L'export des données et le stockage figurent sur la même page, voir la section 5 du [Guide des paramètres](/fr/mail/settings/).

![Zone notifications et transfert d'EpoCanvas Mail : état du push Telegram et réglages du transfert automatique](/images/mail/fr/ui/notify-guide.png)

*Figure : la zone notifications et transfert. Le push Telegram porte son état et son entrée de configuration ; le transfert automatique affiche les destinations et les options avancées.*

<details>
<summary>Guide visuel : Export et transfert  —  comment emporter ses données et rester averti des nouveaux messages</summary>

Trois cartes d'export et la zone d'en-tête « Transfert de courriels et de messages » de la page Données : le haut régit les formats sous lesquels les données s'en vont, le bas la façon dont le courrier entrant vous atteint en temps réel.

1. **Carte d'export des données en JSON** : Télécharge une partie des champs du compte, les champs des courriels non marqués comme supprimés et les étiquettes personnalisées ; les fichiers joints, l'ensemble des paramètres de sécurité et toutes les données personnelles n'y figurent pas.
2. **Carte d'archive de l'historique des courriels** : Le navigateur convertit la même réponse du serveur en MBOX, JSON ou CSV ; le serveur n'applique pas la période sélectionnée et n'inclut ni le MIME d'origine complet ni les fichiers joints.
3. **Carte contacts et configuration** : Exporte le sous-ensemble de champs personnels renvoyés et les étiquettes personnalisées ; ce n'est pas une sauvegarde complète du carnet d'adresses, des règles d'alias ou de toutes les préférences.
4. **Zone d'en-tête « Transfert de courriels et de messages »** : Accès aux notifications Telegram et au transfert automatique. Les notifications personnelles peuvent porter sur tous les messages ou les messages importants ; aperçu et copie de codes sont des choix distincts. Chaque accès à un lien de lecture ou de pièce jointe vérifie l’état courant et la version de révocation ; voir les limites ci-dessous.

</details>

## 1. Push des messages Telegram

Le push utilise votre propre robot Telegram privé ; le nouveau courriel atteint votre conversation en temps réel :

1. Créez un robot privé avec @BotFather et récupérez le Bot Token (de la forme `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`) ;
2. Obtenez le Chat ID entre vous et ce robot (envoyez-lui n'importe quel message et lisez-le via getUpdates ; les groupes sont négatifs, les canaux ressemblent à `-100123456789`) ;
3. Sur l'élément « Push des messages Telegram », appuyez sur la roue dentée, saisissez le Bot Token et le Chat ID ; pour la réception dans un sujet de groupe, renseignez aussi le Topic ID ;
4. Choisissez `all` ou `important` pour les notifications personnelles. Un message important est identifié uniquement par les étiquettes exactes `重要` / `important`, une étoile réellement enregistrée ou un code de vérification déjà présent, pas par des mots dans l’objet. `notifyCodeOnly`, à `false` par défaut, commande seulement l’ajout d’un bouton de copie ; ce bouton n’apparaît que pour un code extrait existant d’au plus 256 caractères et ne constitue pas un filtre limité aux messages contenant un code ;
5. Appuyez sur « Envoyer un message de test » pour vérifier la conversation destinataire, puis confirmez les champs transmis et le lien de lecture avant d'activer les notifications.

Pour les notifications personnelles, `includePreview` vaut `false` par défaut. En modes `all` et `important`, la notification conserve l’objet (ou un titre générique s’il est absent), jusqu’à 200 caractères, même sans aperçu ; la valeur explicite `true` ajoute un aperçu de 400 caractères au plus et un lien de lecture lorsque la configuration le permet. Le mode `privacy` envoie uniquement un titre générique, quelles que soient les autres options, sans objet, expéditeur, destinataire, code ni lien. Les notifications système suivent indépendamment les champs définis par l’administrateur ; le réglage personnel d’aperçu ne les désactive pas. Le Bot Token et le Chat ID sont transmis au serveur de l’instance, pas conservés uniquement sur l’appareil. La reconnaissance automatique des codes par IA, désactivée par défaut, exige séparément un choix individuel et un service configuré ; elle est distincte du filtrage et de l’option de copie des codes.

L’implémentation locale de cette révision vérifie à chaque lecture ou accès à une pièce jointe Telegram l’expiration du lien, l’état du propriétaire, de la boîte et du message, ainsi que la version de révocation. Désactiver l’aperçu personnel bloque aussi les anciens liens personnels. La lecture partagée ne charge pas de contenu distant. Désactiver les notifications personnelles ou modifier les paramètres concernés révoque les anciens liens. Le bouton de révocation des liens existants dans Paramètres → Données révoque les liens déjà émis pour ce compte par les notifications personnelles et système ; les futures notifications peuvent produire de nouveaux liens indépendamment. Une déconnexion ordinaire ne révoque pas ces liens, tandis que la désactivation du compte bloque leur accès par les contrôles d’état. La révocation ne supprime pas les contenus déjà présents dans les discussions Telegram ni les copies téléchargées. Ces mécanismes n’attestent pas la mise à jour de tous les déploiements en ligne ; voir la [Liste des sous-traitants](/fr/mail/sub-processors/).

## 2. Transfert automatique

| Réglage | Description |
| --- | --- |
| Activer le transfert automatique | Interrupteur général ; les options ci-dessous apparaissent lorsqu'il est activé |
| Destinations du transfert | Une ou plusieurs adresses cibles, séparées par des virgules |
| Type de déclencheur | Tous les courriels, ou préfixe littéral de la boîte destinataire, par exemple `billing` ; `*` n’est pas un caractère générique et une liste vide de préfixes d’alias ne transfère rien |
| En-tête d'objet | Ajouter facultativement un préfixe `[Fwd]` à l'objet transféré afin qu'il soit reconnaissable dans la boîte cible |

:::note
Le transfert personnel par règles intelligentes (`rules`) est actuellement indisponible : il ne transfère rien à l’exécution, sans repli vers tous les messages, et l’enregistrement d’une configuration `rules` activée est refusé. Le `keepCopy` enregistré est normalisé à `true` : `keepCopy=false` est refusé uniquement lorsque le transfert est activé et une configuration désactivée est également enregistrée à `true`. Le transfert ne supprime pas automatiquement l’original. Il s’agit du comportement actuel du code local ; les tests sont encore en cours de reprise et cela ne confirme pas un déploiement en ligne.
:::

## 3. Chemin de remise et protection contre les boucles

Le transfert utilise en priorité le canal natif de la plateforme ; en cas d'échec, il peut emprunter le canal de livraison système et ajouter `[Fwd]` selon les paramètres. Cet appel de secours ne transmet que des champs tels que l'objet et le corps, sans les pièces jointes ordinaires ; la réception du courriel d'origine complet n'est donc pas garantie. Les destinations identiques au destinataire ou à l'expéditeur d'origine sont ignorées, sans garantie d'éliminer toutes les boucles à plusieurs relais. Des règles système exécutées en amont peuvent aussi mettre fin au parcours de réception et empêcher les notifications et transferts personnels. La sémantique des règles figure à la section 7 de la [Référence de la recherche et des règles](/fr/mail/search/).

## 4. Documents connexes

| Ressource | Lien |
| --- | --- |
| L'emplacement de la page Données dans les paramètres | [Guide des paramètres](/fr/mail/settings/) |
| Traitement des données du transfert et du push | [Traitement des données et sécurité](/fr/mail/data-security/) |
| Vérification en deux étapes et sécurité du compte | [Guide de sécurité du compte](/fr/mail/security/) |
| Les interrupteurs de contrôle des données utilisateurs de l'administrateur | [Modes de fonctionnement](/fr/mail/modes/) |
