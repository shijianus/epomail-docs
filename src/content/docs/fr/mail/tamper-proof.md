---
title: Spécifications des courriels officiels et contrôle de cohérence du manifeste de publication
description: Identification des messages système d'EpoCanvas Mail, types de notifications, instantanés de livraison, traduction par modèles, limites du rendu et portée de la comparaison de deux enregistrements du manifeste de publication.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.21**


<!-- legal-review-draft -->
:::caution[Projet soumis à revue juridique : non applicable comme notice actuelle]
Ce projet présente des clauses proposées et des éléments restant à vérifier. Il ne remplace pas la notice actuellement en vigueur et ne certifie pas la conformité. Il ne doit pas servir à activer un traitement avant vérification de l’identité de l’exploitant, des coordonnées légalement requises, des bases juridiques réelles, des destinataires, des garanties de transfert, de la conservation et de l’effacement, et avant fourniture de l’information requise. La version faisant autorité désigne la base rédactionnelle en chinois traditionnel, non une entrée en vigueur. Les obligations légales et les droits existants restent inchangés.
:::

Ce document explique l'identification des messages système et leurs limites de traitement, ainsi que le contrôle de cohérence du manifeste de publication de ce site. Ce contrôle ne constitue ni une authentification des courriels ou documents, ni une vérification de signature numérique, ni une certification de conformité juridique. Les règles connexes figurent dans la [Vue d'ensemble Confidentialité et conditions](/fr/mail/overview/) et le document [Traitement des Données et Maintien de la Sécurité](/fr/mail/data-security/).

La version en chinois traditionnel (Taïwan) est la version faisant autorité ; les autres langues sont des traductions de référence. En cas d'ambiguïté, la version faisant autorité prévaut, sous réserve des exigences applicables d'information claire, d'interprétation favorable aux consommateurs et des droits impératifs en matière de protection des données et des consommateurs. L'implémentation open source décrit le comportement technique ; elle ne remplace pas les obligations légales de l'exploitant effectif.

![Relations entre les marques d'expédition des messages système, les instantanés de livraison et la traduction par modèles, le rendu client et les enregistrements du manifeste de publication](/images/mail/fr/anti-tamper-architecture.svg)

*Figure : marques d'expédition, instantanés du corps, encapsulation des styles et enregistrements du manifeste ont chacun une utilité et des limites. Leur combinaison ne constitue ni une authentification de l'identité, ni un bac à sable de sécurité pour les scripts, ni une garantie contre la falsification des documents.*

## 1. Identité d'expédition du système et marques d'affichage

Pour identifier les communications système, distinguez les règles d'affichage de l'application de l'authentification de l'identité :

1. Les courriels de bienvenue et les annonces globales sont normalement générés par le système avec l'adresse intégrée `announcement@epocanvas.com`. Cela n'exclut pas d'autres notifications de sécurité ou de gestion et ne rend pas authentique tout message affichant cette adresse.
2. `isOfficial` est une marque d'affichage de l'application : les messages provenant de `announcement@epocanvas.com` ou `admin@epocanvas.com`, ou portant l'étiquette « officiel », peuvent afficher un badge et une bannière. Cette marque n'est ni une signature numérique ni une authentification indépendante de l'expéditeur.
3. Certains messages système sont marqués pour suppression lors de la lecture de la liste des courriels, selon un délai d'expiration configurable (7 jours par défaut), puis nettoyés par la tâche quotidienne planifiée. Ils ne sont pas effacés immédiatement et intégralement à l'expiration. Les limites réelles de conservation et de nettoyage figurent à la section 1.5 de [Traitement des Données et Maintien de la Sécurité](/fr/mail/data-security/).

## 2. Catalogue des messages système et notifications

Les communications système comprennent les types suivants. Leur envoi et ses modalités dépendent de l'implémentation, de la configuration et des événements ; elles ne se limitent pas aux messages de bienvenue et aux annonces :

| Type | Déclencheur | Description |
| --- | --- | --- |
| Courriel de bienvenue | Création d'une boîte aux lettres | Peut utiliser les modèles intégrés en six langues ; conservation et nettoyage selon la section 1 |
| Annonce globale | Publication d'une annonce système par un administrateur | Peut utiliser les modèles intégrés en six langues ou un contenu modifié ; conservation et nettoyage selon la section 1 |
| Notification de sécurité | Événement de connexion ou de sécurité, ou incident soumis à une obligation légale de notification | Peut être envoyée selon les événements et les règles applicables ; un message sur la sécurité du compte n'est pas nécessairement falsifié |
| Notification de décision de gestion et de recours | Mesure de gestion, décision ou réexamen d'un recours | Peut communiquer les mesures et résultats du réexamen ; la conservation des enregistrements associés est décrite dans le document sur la sécurité des données |

Une adresse d'expédition, une marque d'affichage ou un lien dans un message ne suffit pas à établir son authenticité. Vérifiez les notifications depuis un point d'accès connu et fiable au service. En cas de doute, utilisez les canaux de la section 6 sans saisir d'identifiants via des liens suspects.

## 3. Instantanés de livraison et traduction par modèles

1. Les messages issus de modèles remplacent les variables et enregistrent un instantané du corps lors de l'envoi. Un changement de langue de l'interface ne réécrit pas à lui seul le corps enregistré. Il ne s'agit pas d'un stockage inaltérable et cela ne fournit ni signature numérique ni authentification de l'identité.
2. Lorsque vous utilisez « Traduire », un modèle correspondant et disponible dans la langue cible peut être rendu localement. Un modèle non reconnu ou absent, un corps modifié ou une autre absence de correspondance déclenche le traitement général de traduction, qui peut utiliser les modèles configurés, Workers AI ou des services publics de traduction en repli. Il n'existe aucune garantie générale que les courriels officiels ne sortent jamais du service. Les destinataires, chaînes de traitement et garanties requises sont décrits aux sections 6 et 7 de la [Politique de confidentialité](/fr/mail/privacy-policy/).

## 4. Limites du rendu côté client

Le rendu des courriels utilise l'encapsulation des styles et l'assainissement du contenu. Aucun de ces mécanismes ne constitue une certification indépendante d'identité ou de sécurité :

1. Shadow DOM encapsule le DOM et la portée des styles pour réduire les interférences entre les styles du courriel et de la page. Ce n'est pas une frontière de sécurité pour les scripts : il n'empêche pas les scripts de la page d'accéder au contenu ou de le manipuler et n'est pas un bac à sable d'origine distincte.
2. DOMPurify supprime les balises dangereuses et les gestionnaires d'événements en ligne selon sa configuration pour réduire les risques d'injection de contenu. Son efficacité dépend de la version, de la configuration et des traitements ultérieurs ; il ne garantit pas la prévention de toute injection de scripts, usurpation d'interface ou requête de ressource distante.

## 5. Contrôle de cohérence du manifeste de publication

`tamper-proof.json` est le nom de fichier existant du manifeste de publication, sans affirmer qu'il est signé ou inaltérable. Le panneau en ligne compare uniquement l'entrée de cette page dans deux réponses du manifeste provenant du site actuel. Il ne calcule pas le hachage du contenu de la page.

| Voie de contrôle | Mécanisme | Portée et limites |
| --- | --- | --- |
| Manifeste de publication | `tamper-proof.json` | À la compilation, enregistre les SHA-256 et tailles en octets des sources de l'arbre de travail après conversion de CRLF en LF, ainsi que le Git HEAD courant ; un identifiant de commit ne prouve pas l'absence de modifications non commitées |
| Panneau de cette page | « Contrôle de cohérence du manifeste de publication » | Présent uniquement sur cette page, après l'introduction et la figure, avant la section 1 ; compare le SHA-256 de l'entrée et le `gitCommit` complet entre la lecture initiale et la suivante |
| Comparaison manuelle des sources | Node / `sha256sum` / OpenSSL | Vérifiez séparément la provenance et la version du manifeste et des fichiers, puis hachez le Markdown local selon les mêmes règles de fins de ligne ; le panneau n'exécute pas cette opération |
| Source des requêtes | Adresse du manifeste de même origine sur le site actuel | Lit uniquement le manifeste de ce site, sans requête GitHub de vérification indépendante ; HTTPS seul ne prouve ni l'identité de l'éditeur ni l'effet juridique d'un document |

Un succès signifie seulement que le hachage de l'entrée de cette page et `gitCommit` sont identiques lors des deux lectures du manifeste. Il ne vérifie ni le contenu de la page, ni l'identité de l'éditeur, ni les signatures numériques, ni la conformité juridique. Le manifeste et le script proviennent du même site ; remplacer les deux peut encore produire un résultat cohérent, qui n'est donc pas une base de confiance indépendante.

:::tip[Comment contrôler la cohérence du manifeste]
Cliquez sur « Contrôler la cohérence du manifeste » dans le panneau de cette page. La première lecture valide établit seulement une référence, sans afficher de succès. Un hachage ou commit différent à la lecture suivante affiche « Échec de la vérification » ; une mise à jour de publication peut aussi expliquer cette différence. Une erreur réseau ou HTTP, un JSON ou une structure invalide, une entrée absente, un SHA-256 non conforme aux 64 caractères hexadécimaux ou un commit Git complet invalide affichent « Vérification impossible », jamais un succès. Après un échec initial, un rechargement réussi établit seulement la référence et un nouveau contrôle reste nécessaire. Dépliez les instructions distinctes du panneau pour comparer les fichiers sources manuellement.
:::

## 6. Limites de responsabilité et canaux de signalement

1. L'exploitant effectif de l'instance hébergée maintient ses notifications système et son manifeste de publication. EpoCanvas est un nom de projet, non la preuve d'une personne morale distincte ou d'une équipe de sécurité certifiée. L'identité de l'exploitant et les informations légalement requises sont abordées à la section 2 de la [Politique de confidentialité](/fr/mail/privacy-policy/).
2. L'exploitant effectif d'une instance auto-hébergée configure la distribution, les modèles, les clés et la maintenance des données, et applique les mesures pertinentes décrites dans [Traitement des Données et Maintien de la Sécurité](/fr/mail/data-security/). La seule publication de code source ne fait pas de son auteur l'exploitant d'une autre instance ; ceux qui l'exploitent effectivement ou déterminent les traitements restent responsables selon les faits.
3. Pour signaler une usurpation présumée, une différence dans le manifeste ou un problème de sécurité, contactez :
   - Canal d'envoi système et de sécurité : `announcement@epocanvas.com`
   - Canal de confidentialité et de protection des données : `privacy@epocanvas.com`

Cette répartition des rôles, la nature du projet et la priorité linguistique n'excluent ni les responsabilités qui ne peuvent légalement être limitées, ni les droits en matière de protection des données et des consommateurs, ni le recours direct aux autorités et tribunaux compétents.
