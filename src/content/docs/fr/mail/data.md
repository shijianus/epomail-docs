---
title: Export des données et stockage
description: Export des données et stockage d'EpoCanvas Mail — champs réels et limites des trois exports, et connexion d'un stockage personnel.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

La présente page décrit les deux volets, export et stockage, de la page « Paramètres → Données ». Les notifications et le transfert de la même page figurent dans le [Guide des notifications et du transfert](/fr/mail/notify/) ; la qualification juridique des données exportées figure dans [Traitement des données et sécurité](/fr/mail/data-security/).

![Page des données d'EpoCanvas Mail : les trois cartes d'export, la jauge d'utilisation du stockage et le branchement du stockage d'objets personnel](/images/mail/fr/ui/data-guide.png)

*Figure : la page des données. Export et gestion du stockage figurent sur une même page ; l'utilisation des pièces jointes compte contre le quota du groupe d'identité.*

<details>
<summary>Guide visuel : Données  —  les quatre régions de l'autonomie sur vos données</summary>

Les quatre cartes de la page Données : trois formats pour emporter ses données, une zone de transfert, une zone de stockage et une zone d'autorisations tierces — l'autonomie complète sur ses données personnelles en un écran.

1. **Carte export** : données JSON, archives (MBOX/JSON/CSV) et export du profil et des étiquettes utilisent la même réponse serveur. La plage de dates n'est pas appliquée ; les fichiers .eml sont reconstruits à partir des champs existants.
2. **Carte transfert de courriels et de messages** : Le réglage détaillé du push de messages Telegram et du transfert automatique ; l'ouverture de ces deux fonctions au compte dépend des interrupteurs « Contrôle des données utilisateurs » de l'administrateur.
3. **Carte stockage** : usage mesuré des messages et pièces jointes, et quota effectif. Backblaze B2/S3 personnel reçoit les nouvelles pièces jointes et contourne le quota de leur stockage ; les autres limites restent applicables. Le débranchement ne migre pas les anciens objets.
4. **Carte applications tierces** : présente les autorisations OAuth et leur révocation. Le serveur supprime l'autorisation et enregistre sa révocation, vérifiée par userinfo. Cela ne garantit pas l'invalidation simultanée des sessions tierces, de tous les jetons ni la récupération des données déjà obtenues.

</details>

## 1. Les trois exports

| Export | Format | Portée |
| --- | --- | --- |
| Export intégral des données | JSON | Champs sélectionnés du compte et du profil, champs des messages `is_del=0` et `customLabels` ; sans fichiers joints, MIME original, contacts/alias complets, paramètres de sécurité ni audit |
| Archive de l'historique des courriels | MBOX, JSON ou CSV | Le navigateur convertit les champs de la même réponse ; le serveur ignore `type/format/range`, ne filtre pas la plage choisie et exclut la corbeille |
| Contacts et configuration | JSON | Seulement le sous-ensemble profile renvoyé, customLabels et la date d'export ; pas une sauvegarde complète du répertoire, des alias ou des préférences |

Les .eml et archives MBOX sont reconstruits à partir des champs existants, sans MIME original complet ni fichiers joints. La corbeille utilise la création du message depuis plus de 7 jours, sans garantir 7 jours supplémentaires. Conservez les pièces jointes séparément avant suppression et vérifiez l'export ; voir la [Politique de confidentialité](/fr/mail/privacy-policy/).

L’implémentation locale de cette révision conserve aussi temporairement le MIME brut complet dans un stockage d’objets, chiffré côté serveur avec AES-256-GCM, pour reprendre les livraisons. L’application fixe une échéance de nettoyage de 7 jours ; les nouvelles tentatives après un échec de livraison peuvent la prolonger et l’enregistrement réussi en base ne supprime pas immédiatement l’objet. Le nettoyage planifié procède par lots et conserve les objets dont la suppression échoue pour réessayer. Il ne s’agit pas d’une garantie d’effacement à l’expiration d’un TTL du stockage. Ce MIME temporaire est exclu des exports en libre-service ; les téléchargements .eml et MBOX restent reconstruits à partir des champs. Cela n’atteste pas un déploiement sur toutes les instances en ligne.

Dans l’implémentation locale actuelle, une déconnexion ordinaire efface la session courante, le cache du message ouvert et l’historique des destinataires, tout en conservant les sessions des autres comptes et les brouillons locaux. Supprimer une entrée de la liste des brouillons efface le brouillon et ses pièces jointes `att` dans une même transaction IndexedDB. Ces contenus locaux ne figurent pas dans les exports du serveur.

Avant de partager ou de céder un appareil, conservez ailleurs les brouillons nécessaires, puis utilisez l’action de nettoyage de l’appareil dans Paramètres → Données → Confidentialité et données de cet appareil. La confirmation couvre les connexions enregistrées, la confiance accordée à l’appareil, les caches, paramètres, brouillons et pièces jointes de TOUS les comptes de ce site dans ce navigateur et entraîne la déconnexion. Un blocage ou un échec partiel n’est pas présenté comme un effacement complet : réessayez selon les indications ou effacez les données du site dans le navigateur. Cette action ne révoque pas tous les identifiants côté serveur et ne supprime ni les données d’autres sites, ni les copies dans les discussions, avatars statiques hébergés sur le serveur, journaux d’audit ou sauvegardes. La reconnaissance automatique des codes sur la même carte est désactivée par défaut ; son activation exige un choix individuel, un service configuré et une notice sur la destination des données. Ces indications décrivent l’implémentation locale de cette révision, sans attester son déploiement sur toutes les instances en ligne ; voir la section 4.3 de la Politique de confidentialité pour les limites du stockage de même origine.

## 2. Espace de stockage

- La jauge d'utilisation des pièces jointes affiche en temps réel l'usage et le quota ; le quota suit le groupe d'identité (valeurs d'usine à la section 3 de [Modes de fonctionnement](/fr/mail/modes/)) ;
- Un compartiment personnel Backblaze B2/S3 reçoit les nouvelles pièces jointes selon votre configuration. Leur stockage contourne le quota système, mais comptage et autres limites demeurent. Tarifs et conservation externe doivent être confirmés ; voir la [Liste des sous-traitants](/fr/mail/sub-processors/) ;
- Le débranchement ne migre ni ne supprime les objets de l’ancien compartiment. Leur localisation BYO d’origine est conservée jusqu’à confirmation du traitement par la file de nettoyage des objets ; le débranchement ne vaut pas confirmation d’effacement. Pour la disponibilité des anciennes pièces jointes et les limites de suppression, voir [Traitement des données et sécurité](/fr/mail/data-security/).

<details>
<summary>Guide visuel : l'export et le stockage</summary>

![L'export et le stockage](/images/mail/fr/ui/data.png)

1. Ouvrez « Paramètres → Données ».
2. « Export intégral des données » télécharge les champs sélectionnés du profil, des messages non supprimés et customLabels en JSON ; traitez séparément pièces jointes, répertoire complet et paramètres de sécurité.
3. « Archive de l'historique des courriels » : choisissez MBOX/JSON/CSV et téléchargez ; le navigateur convertit le format, le serveur n'applique pas la plage de dates.
4. « Contacts et configuration » exporte le sous-ensemble profile et customLabels renvoyés ; vérifiez la présence des contacts et préférences nécessaires.
5. La carte de stockage affiche l'utilisation des pièces jointes ; cliquez sur « Brancher un stockage d'objets » pour lier votre propre Backblaze B2 ou S3 — les nouvelles pièces jointes vont ensuite directement sur votre cloud.

</details>

## 3. Documents connexes

| Ressource | Lien |
| --- | --- |
| Notifications et transfert (l'autre moitié de la même page) | [Guide des notifications et du transfert](/fr/mail/notify/) |
| Hiérarchie de stockage et principe de comptage des quotas | [Architecture technique](/fr/mail/architecture/) |
| Droits de la personne concernée et fréquence d'export | [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Configuration administrative du stockage | [Les cartes des paramètres système en détail](/fr/mail/system/) |
