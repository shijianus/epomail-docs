---
title: Export des données et stockage
description: Export des données et stockage d'EpoCanvas Mail — sauvegarde intégrale, archive de l'historique des courriels, export des contacts et de la configuration, et branchement d'un stockage d'objets personnel.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.15**

La présente page décrit les deux volets, export et stockage, de la page « Paramètres → Données ». Les notifications et le transfert de la même page figurent dans le [Guide des notifications et du transfert](/fr/mail/notify/) ; la qualification juridique des données exportées figure dans [Traitement des données et sécurité](/fr/mail/data-security/).

![Page des données d'EpoCanvas Mail : les trois cartes d'export, la jauge d'utilisation du stockage et le branchement du stockage d'objets personnel](/images/mail/ui/ui-settings-data.png)

*Figure : la page des données. Export et gestion du stockage figurent sur une même page ; l'utilisation des pièces jointes compte contre le quota du groupe d'identité.*

## 1. Les trois exports

| Export | Format | Portée |
| --- | --- | --- |
| Export intégral des données | JSON | Sauvegarde complète : informations du compte, historique des courriels, contacts, règles de classement et d'étiquettes, et paramètres de sécurité |
| Archive de l'historique des courriels | MBOX (universel), JSON ou CSV | Courriels envoyés et reçus uniquement, avec plage de dates facultative |
| Contacts et configuration | JSON | Répertoire, règles d'alias personnalisées et préférences de personnalisation |

Un courriel isolé se télécharge en .eml directement depuis le volet de lecture. Les courriels de la corbeille sont effacés physiquement après 7 jours, sans possibilité de restauration ; exportez-les d'abord si vous souhaitez les conserver (voir la section 8 des [Conditions d'utilisation](/fr/mail/terms-of-service/)).

## 2. Espace de stockage

- La jauge d'utilisation des pièces jointes affiche en temps réel l'usage et le quota ; le quota suit le groupe d'identité (valeurs d'usine à la section 3 de [Modes de fonctionnement](/fr/mail/modes/)) ;
- Un stockage d'objets personnel peut être branché (compartiment Backblaze B2 ou S3 à soi) : une fois branché, les nouvelles pièces jointes vont directement sur votre cloud et ne comptent plus contre le quota de l'instance ; la recommandation de la plateforme pour B2 tient à son offre gratuite et à zéro frais de trafic sortant ;
- Le branchement se délie à tout moment ; après déliaison, les nouvelles pièces jointes regagnent le stockage de l'instance.

## 3. Documents connexes

| Ressource | Lien |
| --- | --- |
| Notifications et transfert (l'autre moitié de la même page) | [Guide des notifications et du transfert](/fr/mail/notify/) |
| Hiérarchie de stockage et principe de comptage des quotas | [Architecture technique](/fr/mail/architecture/) |
| Droits de la personne concernée et fréquence d'export | [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Configuration administrative du stockage | [Les cartes des paramètres système en détail](/fr/mail/system/) |
