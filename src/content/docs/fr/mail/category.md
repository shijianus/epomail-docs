---
title: Classement
description: Classement d'EpoCanvas Mail — interrupteurs de réception et d'envoi, configuration de la reconnaissance par IA, listes blanche et noire et règles d'interception stricte à l'échelle du site.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.16**

Le classement est l'interface de gouvernance à l'échelle du site de la zone d'administration (`#manage/admin/rules`, clé de permission `setting:query`) ; il superpose aux règles personnelles des utilisateurs une gouvernance de la réception à l'échelle de toute l'instance. Les règles d'étiquettes personnelles figurent dans [Gestion des étiquettes et du classement](/fr/mail/labels/) ; la sémantique des champs de conditions, à la section 7 de la [Référence de la recherche et des règles](/fr/mail/search/).

![Figure : l'interface de gestion du classement](/images/mail/fr/ui/category.png)

*Figure : l'interface de gestion du classement*


## 1. Interrupteurs de réception, d'envoi et d'actualisation

Interrupteurs généraux de la réception, de l'envoi et de l'actualisation automatique, ainsi que l'interrupteur de traitement des courriels sans destinataire ; la réception désactivée, les courriels entrants sont rejetés d'emblée.

## 2. Reconnaissance par IA

Extraction des codes de vérification par Workers AI et configuration de ses règles, clé d'API IA／URL／modèle — de même source que l'AI Hub des [paramètres système](/fr/mail/system/) ; ce qui se règle ici porte sur le comportement de reconnaissance à l'arrivée (badge de code de vérification, etc.).

## 3. Listes et interception

| Mécanisme | Description |
| --- | --- |
| Liste noire d'expéditeurs | Toute correspondance est interceptée aussitôt ; configurable en mode étiquette ou en interception directe |
| Mode liste blanche | Seuls les expéditeurs de la liste blanche sont remis ; les autres suivent la politique configurée |
| Interception stricte d'expéditeurs | Rejet net, avec compteur d'interceptions cumulées |
| Mots-clés d'objet et de contenu | Les courriels portant un mot-clé de la liste noire sont interceptés |
| Interception des expéditeurs sans nom | Rejet des courriels sans nom d'expéditeur |
| Interception des non-destinataires | Rejet des courriels dont les destinataires ne comportent aucune adresse de l'instance |
| Interception des pièces jointes exécutables | Rejet des courriels portant une pièce jointe exécutable |

## 4. Stratification avec le côté utilisateur

Les listes à l'échelle du site s'entretiennent par l'administrateur et s'appliquent à toute l'instance ; les règles côté utilisateur ne portent que sur la boîte de leur titulaire ; dans les deux cas, une correspondance applique automatiquement l'étiquette dédiée. Le détail du comportement des listes et des mots-clés figure à la section 9 de la [Référence de la recherche et des règles](/fr/mail/search/) ; le traitement des abus, dans la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/).

<details>
<summary>Guide visuel : la gouvernance à l'échelle du site</summary>

1. Ouvrez la page « Classement » de la zone d'administration (clé de permission `setting:query`).
2. Configurez les interrupteurs de réception／d'envoi, l'actualisation automatique et le traitement des courriels sans destinataire.
3. Configurez l'extraction des codes de vérification par Workers AI et ses paramètres d'API.
4. Activez au besoin : liste noire d'expéditeurs, mode liste blanche, interception stricte d'expéditeurs, mots-clés d'objet et de contenu, interception des expéditeurs sans nom, interception des non-destinataires et interception des pièces jointes exécutables.
5. Une correspondance dans les listes applique automatiquement l'étiquette dédiée, tandis que l'interception stricte rejette net et comptabilise ; l'effet des interceptions se revérifie sur la Page d'analyse.

</details>

## 5. Documents connexes

| Ressource | Lien |
| --- | --- |
| Étiquettes et règles côté utilisateur | [Gestion des étiquettes et du classement](/fr/mail/labels/) |
| Revérification du taux d'interception et de la distribution des sources | [Page d'analyse](/fr/mail/analysis/) |
| Revue du courrier | [Revue du courriel à l'échelle du site](/fr/mail/review/) |
| Bornes de l'envoi massif | [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) |
