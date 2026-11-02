---
title: Guide des notifications et du transfert
description: Guide des notifications et du transfert d'EpoCanvas Mail — liaison du push Telegram, préférences de push et visibilité des champs, destination et types de déclencheur du transfert automatique.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.21**

La présente page parcourt les deux capacités de la zone « Notifications et transfert » de la page « Paramètres → Données » : le push des messages Telegram et le transfert automatique. Un compte y accède ou non selon la carte « Contrôle des données utilisateurs » de l'administrateur ; lorsque l'interrupteur est désactivé, les blocs sont masqués. L'export des données et le stockage figurent sur la même page, voir la section 5 du [Guide des paramètres](/fr/mail/settings/).

![Zone notifications et transfert d'EpoCanvas Mail : état du push Telegram et réglages du transfert automatique](/images/mail/fr/ui/notify-guide.png)

*Figure : la zone notifications et transfert. Le push Telegram porte son état et son entrée de configuration ; le transfert automatique affiche les destinations et les options avancées.*

<details>
<summary>Guide visuel : Export et transfert  —  comment emporter ses données et rester averti des nouveaux messages</summary>

Trois cartes d'export et la zone d'en-tête « Transfert de courriels et de messages » de la page Données : le haut régit les formats sous lesquels les données s'en vont, le bas la façon dont le courrier entrant vous atteint en temps réel.

1. **Carte d'export intégral des données** : Le JSON contient des champs de profil sélectionnés, des données des courriels non marqués supprimés et des étiquettes personnalisées. Il exclut pièces jointes, routage complet, alias, contacts, règles et paramètres de sécurité. Ce n'est pas une sauvegarde complète ; les données omises peuvent être demandées selon la loi.
2. **Carte d'archive de l'historique des courriels** : L'interface propose des formats et des dates, mais le serveur vérifié n'applique pas les paramètres de type, de format ou de période. Le format ou la période demandés ne sont pas garantis.
3. **Carte contacts et configuration** : Le nom de la carte ne prouve pas l'export des contacts, règles d'alias ou préférences complètes. La réponse a la même portée JSON ; voir le document de sécurité des données.
4. **Zone d'en-tête « Transfert de courriels et de messages »** : Deux capacités d'atteinte en temps réel : le push de messages Telegram (lier votre propre robot privé ; push de tout le courrier, ou seulement des messages importants et des codes de vérification, avec un lien de lecture interne valable 7 jours) et le transfert automatique (destinations, type de déclencheur et en-tête `[Fwd]`).

</details>

## 1. Push des messages Telegram

Le push utilise votre propre robot Telegram privé ; le nouveau courriel atteint votre conversation en temps réel :

1. Créez un robot privé avec @BotFather et récupérez le Bot Token (de la forme `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`) ;
2. Obtenez le Chat ID entre vous et ce robot (envoyez-lui n'importe quel message et lisez-le via getUpdates ; les groupes sont négatifs, les canaux ressemblent à `-100123456789`) ;
3. Sur l'élément « Push des messages Telegram », appuyez sur la roue dentée, saisissez le Bot Token et le Chat ID ; pour la réception dans un sujet de groupe, renseignez aussi le Topic ID ;
4. Choisissez la préférence de push : tout le courriel, ou uniquement les courriels importants et les codes de vérification ;
5. Appuyez sur « Envoyer un message de test » pour vérifier la connectivité, puis activez le push.

Les préférences de visibilité des champs du contenu poussé (expéditeur, destinataire, corps) se configurent globalement par l'administrateur dans la carte « Push des courriels » des paramètres système ; le robot officiel du site et votre robot privé n'entrent pas en conflit.

## 2. Transfert automatique

| Réglage | Description |
| --- | --- |
| Activer le transfert automatique | Interrupteur général ; les options ci-dessous apparaissent lorsqu'il est activé |
| Destinations du transfert | Une ou plusieurs adresses cibles, séparées par des virgules |
| Type de déclencheur | Transférer chaque message en copie (CC) ; ou transférer uniquement lorsque la boîte destinataire correspond à un préfixe ou à un alias alphabétique donné (comme `billing`, `dev-*`) |
| En-tête d'objet | Ajouter facultativement un préfixe `[Fwd]` à l'objet transféré afin qu'il soit reconnaissable dans la boîte cible |

:::note
L'interface propose également le « transfert filtré par règles intelligentes » et la « conservation de l'original dans la boîte de réception » ; le moteur de transfert actuel traite le mode règles intelligentes comme tout le courriel et ne prend pas encore en charge l'option de conservation de l'original — testez ces comportements avant de vous y fier.
:::

## 3. Chemin de remise et protection contre les boucles

Le transfert passe d'abord par le canal de transfert natif de la plateforme, avec repli sur le canal de remise du système, en-tête `[Fwd]` facultatif, en cas d'échec ; les destinations égales au destinataire ou à l'expéditeur d'origine sont ignorées pour prévenir les boucles. La sémantique des règles des types de déclencheur figure également à la section 7 de la [Référence de la recherche et des règles](/fr/mail/search/).

## 4. Documents connexes

| Ressource | Lien |
| --- | --- |
| L'emplacement de la page Données dans les paramètres | [Guide des paramètres](/fr/mail/settings/) |
| Traitement des données du transfert et du push | [Traitement des données et sécurité](/fr/mail/data-security/) |
| Vérification en deux étapes et sécurité du compte | [Guide de sécurité du compte](/fr/mail/security/) |
| Les interrupteurs de contrôle des données utilisateurs de l'administrateur | [Modes de fonctionnement](/fr/mail/modes/) |
