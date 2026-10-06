---
title: Référence de la recherche et des règles
description: Référence complète de la recherche et des règles d'EpoCanvas Mail — opérateurs de champs du courriel, indicateurs de portée, commutateurs de précision, comportement du surlignage, recherche `$` d'administration, recherche des paramètres et toutes les conditions des règles de classement.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.16**

EpoCanvas Mail dispose de deux systèmes de recherche : la recherche de courriels côté utilisateur (la zone de recherche de la barre supérieure) et la recherche du courriel à l'échelle du site côté administrateur (la section administrative « Tous les courriels ») ; les pages de paramètres disposent en outre de leur propre recherche des paramètres. La présente page recense chaque opérateur, indicateur et condition de règle, en correspondance avec l'implémentation actuelle. Les règles de classement partagent la même sémantique de champs que la recherche ; le moteur de règles est décrit à partir de la section 7.

![Recherche d'EpoCanvas Mail : après saisie de from:github, la liste n'affiche que les courriels correspondants, le mot-clé étant surligné (interface en chinois simplifié)](/images/mail/fr/ui/search-guide.png)

*Figure : recherche du courrier. Les opérateurs se combinent librement avec des mots-clés ordinaires ; les correspondances se surlignent aussitôt.*
*Annotations: 1. Rechercher des e*

## 1. Bases de la syntaxe

- Plusieurs conditions se séparent par des espaces et se combinent en ET — toutes doivent correspondre ;
- Les valeurs contenant des espaces se ferment entre guillemets doubles, comme dans `subject:"annual report"` ;
- Un mot-clé nu, sans opérateur, porte sur cinq champs en OU : objet, nom de l'expéditeur, adresse de l'expéditeur, adresse du destinataire et corps ;
- Par défaut, la correspondance est une recherche floue de sous-chaîne insensible à la casse ; le comportement de précision et de casse se modifie au moyen d'indicateurs (section 3).

```text
from:github subject:"verification code" after:2026-10-01 exact:true
```

## 2. Opérateurs de champs

Les dix opérateurs de champs agissent sur leur champ ; les valeurs se comparent en sous-chaînes (dates et tailles exceptées) :

| Opérateur | Valeur | Signification |
| --- | --- | --- |
| `from:<value>` | texte | L'adresse ou le nom de l'expéditeur contient la valeur ; `from:me` équivaut à `is:sent` |
| `to:<value>` | texte | L'adresse ou le nom du destinataire contient la valeur |
| `subject:<value>` | texte | Ne porte que sur l'objet |
| `subject_or_body:<value>` | texte | L'objet ou le corps contient la valeur |
| `body:<value>` | texte | Ne porte que sur le corps en texte brut |
| `larger:<bytes>` | entier | La taille du message (corps et contenu compris) vaut au moins ce nombre d'octets |
| `smaller:<bytes>` | entier | La taille du message vaut au plus ce nombre d'octets |
| `before:<date>` | YYYY-MM-DD | Reçu avant cette date |
| `after:<date>` | YYYY-MM-DD | Reçu après cette date |
| `label:<name>` | nom d'étiquette | Courriels portant cette étiquette ; citer le nom entre guillemets s'il contient des caractères non ASCII |

## 3. Portée et indicateurs

Les indicateurs modifient la portée ou la présentation de la recherche et sont retirés des mots-clés :

| Indicateur | Comportement |
| --- | --- |
| `global:` | Élargit la recherche à toutes les boîtes, sans contrainte de la vue en cours |
| `is:sent` | Force l'inclusion du courrier envoyé dans la requête |
| `is:spam` | Bascule le domaine de la requête vers les pourriels |
| `is:trash` | Bascule le domaine de la requête vers la corbeille |
| `is:draft` | Saut côté client vers les brouillons (les brouillons ne résident que sur l'appareil) |
| `hl:off` | Désactive le surlignage des correspondances |
| `exact:true` | Correspondance sur mots entiers aux frontières, évitant les faux positifs de sous-chaîne |
| `case:true` | Active la sensibilité à la casse |

## 4. Surlignage et extraits

Les correspondances sont surlignées dans la liste et dans la vue de détail ; la fenêtre d'extrait glisse vers la correspondance pour en conserver le contexte. Avec `exact:true`, seules les correspondances de mots entiers s'illuminent ; avec `case:true`, la casse est distinguée ; et `hl:off` désactive entièrement le surlignage. Le surlignage relève du rendu natif du navigateur et ne modifie jamais le contenu du message.

## 5. Recherche `$` d'administration

La section administrative « Tous les courriels » offre une syntaxe avancée préfixée par `$` pour la revue à l'échelle du site :

| Jeton | Signification |
| --- | --- |
| `$sender` | Recherche par nom ou adresse de l'expéditeur |
| `$user` | Recherche par le compte propriétaire du courriel |
| `$to` | Recherche par compte destinataire |
| `$subject` | Recherche par objet |
| `$received` / `$sent` / `$deleted` / `$norecipient` / `$all` | Filtre d'état : reçus, envoyés, supprimés, sans destinataire, tous |

Les jetons acceptent les variantes de casse anglaises et les alias chinois (comme `$发件人`, `$用户`, `$收件人`, `$主题`) ; échapper un `$` littéral dans une valeur avec `\$`. Un clic droit sur n'importe quel courriel de la liste lance directement une recherche par son expéditeur, son compte destinataire ou son utilisateur propriétaire. En mode chiffré (Level 3), la liste administrative des courriels reste vide en permanence et cette syntaxe devient indisponible avec elle — voir la section 2 de [Modes de fonctionnement](/fr/mail/modes/).

## 6. Recherche des paramètres

Sur les pages de paramètres, la zone de recherche bascule en recherche des paramètres :

| Saisie | Comportement |
| --- | --- |
| sans préfixe | Ne cherche que dans le panneau en cours, surligne les correspondances et les amène à l'écran, sans aucune requête |
| `all:` ou `global:` | Cherche dans toutes les pages de paramètres dans un menu déroulant groupé ; un clic saute jusqu'à l'élément et le localise |
| `app:`, `oauth:`, `client:` | Cherche les applications OAuth dans la gestion des applications |

Des suggestions apparaissent à la saisie ; Tab complète un opérateur.

## 7. Conditions des règles de classement

Le constructeur de règles de la section des étiquettes définit chaque règle en deux temps — conditions et exceptions : l'action s'exécute quand toutes les conditions correspondent et qu'aucune exception ne correspond. Les conditions disponibles :

| Condition | Signification |
| --- | --- |
| `from` (l'expéditeur est) | L'adresse ou le nom de l'expéditeur correspond exactement, valeurs multiples séparées par des virgules prises en charge |
| `to` (le destinataire est) | Le destinataire correspond exactement, valeurs multiples prises en charge |
| `sender_address_includes` (l'adresse de l'expéditeur contient) | Correspondance par domaine de l'expéditeur ou fragment d'adresse |
| `recipient_address_includes` (l'adresse du destinataire contient) | Correspondance par domaine du destinataire ou fragment d'adresse |
| `email_received_for_others` (aussi envoyé à d'autres) | L'adresse figure dans un autre emplacement de destinataire |
| `subject_include` (l'objet contient) | Mots-clés de l'objet, valeurs multiples prises en charge |
| `message_body_includes` (le corps contient) | Mots-clés du corps, valeurs multiples prises en charge |
| `subject_or_body_include` (l'objet ou le corps contient) | Que l'un ou l'autre corresponde |
| `system_setting` (verdict du système) | Renvoie à un verdict au niveau du système (par exemple une correspondance de liste blanche) |

:::note
Le constructeur offre aussi des conditions de taille (`at_least` / `at_most`), de date (`before` / `after`) et d'en-tête de message (`message_header_includes`) ; la version actuelle du moteur n'en met pas encore l'évaluation en œuvre — une règle qui les porte ne correspondra pas. Elles sont énumérées ici pour prévenir les configurations erronées.
:::

## 8. Actions et priorité

- Une règle qui correspond étiquette le courriel avec l'étiquette de la règle ;
- Le nombre `priority` décide de l'ordre d'exécution, les valeurs les plus basses d'abord ;
- Avec `stopProcessing` activé, une correspondance sur cette règle met fin à la cascade de règles ;
- Les règles s'exécutent automatiquement à l'arrivée et peuvent aussi être lancées manuellement depuis la page des étiquettes.

## 9. Heuristiques intégrées et gouvernance du site

- Quatre étiquettes sont livrées par défaut — Social, Subscriptions, Promotions et Work ; Subscriptions et Promotions sont entretenues par des heuristiques intégrées : les expéditeurs sans préfixe de réponse, les domaines de plateformes de marketing par courriel et les signaux de désabonnement aboutissent dans Subscriptions ; les mots d'objet de remise et d'urgence, avec la densité de termes marketing, aboutissent dans Promotions ;
- La gouvernance à l'échelle du site se configure dans la section administrative « Classement » : listes blanche et noire d'expéditeurs, mots-clés d'objet et de contenu, mode liste blanche, interception des expéditeurs sans nom, interception des non-destinataires et interception des pièces jointes exécutables ; les correspondances de listes appliquent automatiquement leurs étiquettes dédiées, et l'interception stricte rejette net avec un compteur ;
- Le comportement des règles et des listes est décrit plus avant à la section 4 du [Guide des fonctions](/fr/mail/features/).

## 10. Documents connexes

| Ressource | Lien |
| --- | --- |
| Routes de l'interface et emplacement des zones de recherche | [Interface et plan des routes](/fr/mail/interface/) |
| Lieu de gestion des étiquettes et des règles | [Guide des paramètres](/fr/mail/settings/) |
| Fonctions détaillées avec captures d'écran | [Guide des fonctions](/fr/mail/features/) |
| Comment le mode courriel borne la portée de recherche | [Modes de fonctionnement](/fr/mail/modes/) |
