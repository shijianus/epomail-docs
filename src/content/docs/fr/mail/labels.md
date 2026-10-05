---
title: Gestion des étiquettes et du classement
description: Gestion des étiquettes et du classement d'EpoCanvas Mail — création des étiquettes, icônes et couleurs, entretien heuristique des quatre étiquettes d'usine, constructeur de règles de classement et présentation des statistiques.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.15**

Les étiquettes et les règles de classement se gèrent dans « Paramètres → Étiquettes » (`#settings/labels`). La table complète des champs de conditions figure à la section 7 de la [Référence de la recherche et des règles](/fr/mail/search/) ; la présente page décrit la manipulation des étiquettes elles-mêmes et leurs statistiques.

## 1. Création et apparence des étiquettes

| Opération | Description |
| --- | --- |
| Nouvelle étiquette | Création et nommage dans la zone d'étiquettes de la barre latérale (jusqu'à 7) ou dans la page des étiquettes |
| Icône | Au choix dans la bibliothèque d'icônes intégrée ; SVG personnalisés également pris en charge |
| Couleur | Palette d'étiquettes personnalisable ; présentation synchronisée entre la liste et la barre latérale |
| Suppression | Supprimer une étiquette lève aussi ses références dans les règles |

## 2. Les quatre étiquettes d'usine

| Étiquette | Mode d'entretien |
| --- | --- |
| Communauté | Règle par défaut classant automatiquement selon les domaines de messagerie publics courants |
| Abonnements | Heuristique intégrée : expéditeurs sans préfixe de réponse, domaines de plateformes de marketing par courriel, signaux de désabonnement |
| Promotions | Heuristique intégrée : mots d'objet de remise et de durée limitée, densité de termes marketing dans le corps |
| Travail | Entretenu manuellement ou par des règles personnalisées |

Les quatre étiquettes d'usine peuvent être modifiées et supprimées ; le classement heuristique ne s'applique qu'aux nouveaux courriels pas encore traités manuellement.

## 3. Le constructeur de règles de classement

- Chaque règle se compose en deux temps — « conditions + exceptions » : l'action s'exécute quand toutes les conditions correspondent et qu'aucune exception ne correspond ;
- Les champs de conditions (expéditeur, destinataire, objet, corps, adresse contient, etc.) et la syntaxe multi-valeurs figurent à la section 7 de la [Référence de la recherche et des règles](/fr/mail/search/) ; la saisie des valeurs bénéficie d'une complétion suggérée par le backend ;
- La valeur numérique de `priority` décide de l'ordre d'exécution (les plus petites d'abord) ; avec `stopProcessing`, une correspondance tronque les règles suivantes ;
- Les règles s'exécutent automatiquement à la réception et peuvent aussi être lancées manuellement depuis la page des étiquettes sur le courriel existant.

## 4. Statistiques et revérification

- La zone d'étiquettes de la barre latérale affiche en temps réel le total et les non lus de chaque étiquette ;
- Les résultats de classement peuvent être revérifiés, distribution des sources comprise, sur la [Page d'analyse](/fr/mail/analysis/) de la zone d'administration ; les listes blanche et noire à l'échelle du site et l'interception stricte se configurent par l'administrateur dans [Classement](/fr/mail/category/).

<details>
<summary>Guide visuel : les étiquettes et le constructeur de règles</summary>

![Les étiquettes et le constructeur de règles](/images/mail/fr/ui/labels.png)

1. Ouvrez « Paramètres → Étiquettes » ; créez une nouvelle étiquette dans la zone d'étiquettes de la barre latérale ou dans la page des étiquettes (la barre latérale en affiche au plus 7).
2. Choisissez pour l'étiquette une icône de la bibliothèque intégrée ou importez un SVG personnalisé, puis prenez sa couleur dans la palette d'étiquettes.
3. Dans la zone des règles, ajoutez une règle en deux temps — « conditions + exceptions » ; la saisie des valeurs bénéficie d'une complétion suggérée.
4. Réglez `priority` (les plus petites d'abord) et `stopProcessing` (une correspondance tronque les règles suivantes) ; les règles s'exécutent automatiquement à la réception et peuvent aussi être lancées manuellement.

</details>

## 5. Documents connexes

| Ressource | Lien |
| --- | --- |
| Conditions de règles et opérateurs de recherche | [Référence de la recherche et des règles](/fr/mail/search/) |
| Listes à l'échelle du site et interception stricte | [Classement](/fr/mail/category/) |
| Tableaux de bord du classement | [Page d'analyse](/fr/mail/analysis/) |
| Emplacement de la section des étiquettes dans les paramètres | [Guide des paramètres](/fr/mail/settings/) |
