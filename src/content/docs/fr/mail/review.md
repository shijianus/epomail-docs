---
title: Revue du courriel à l'échelle du site
description: Revue du courriel à l'échelle du site d'EpoCanvas Mail — recherche côté administration, tiroir de détail et suppression physique, avec l'effet du mode courriel sur l'entrée et l'étendue visible.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.15**

La revue du courriel à l'échelle du site est l'interface courrier de la zone d'administration (`#manage/admin/mail`, clé de permission `all-email:query`). Le nom de la section et l'étendue visible varient avec le mode courriel : le mode tous courriels (Level 1) affiche « Tous les courriels », le mode courriel privé (Level 2) affiche « Pourriels », et le mode courriel chiffré (Level 3) masque la section entière (voir la section 2 de [Modes de fonctionnement](/fr/mail/modes/)).

## 1. Recherche

- La syntaxe avancée `$` de la barre supérieure porte sur toute la base : `$sender`／`$user`／`$to`／`$subject` complétés des jetons d'état ; la signification de chacun figure à la section 5 de la [Référence de la recherche et des règles](/fr/mail/search/) ;
- Un clic droit sur n'importe quel courriel de la liste de résultats lance directement une nouvelle recherche par son expéditeur, son compte destinataire ou son utilisateur propriétaire.

## 2. Détail et traitement

| Capacité | Description |
| --- | --- |
| Tiroir de détail | Ouvrir un courriel isolé pour en consulter le contenu complet et les informations d'environnement, sans quitter la liste |
| Suppression physique | Effacement physique des courriels en infraction (à distinguer de la corbeille côté utilisateur) ; l'opération laisse une trace |
| Tri | Tri chronologique pour localiser les événements récents |

Les comptes suspects découverts à la revue se traitent directement depuis la [Liste des utilisateurs](/fr/mail/users/) ; les événements à risque entrent au [Rapport d'audit](/fr/mail/audit/) selon leur catégorie.

<details>
<summary>Guide visuel : la revue du courriel à l'échelle du site</summary>

![La revue du courriel à l'échelle du site](/images/mail/fr/ui/review.png)

1. Ouvrez la section « Tous les courriels » de la zone d'administration (elle s'affiche « Pourriels » en mode courriel privé et se masque en mode chiffré).
2. Recherchez depuis la barre supérieure avec la syntaxe avancée `$`, par exemple `$user:<boîte>` ou `$subject:<mot-clé>` ; les jetons d'état filtrent les courriels envoyés／supprimés／sans destinataire.
3. Un clic droit sur n'importe quel courriel de la liste lance directement une nouvelle recherche par son expéditeur, son compte destinataire ou son utilisateur propriétaire.
4. Ouvrez le tiroir de détail pour vérifier le contenu et les informations d'environnement, puis procédez à la suppression physique (à distinguer de la corbeille côté utilisateur).

</details>

## 3. Documents connexes

| Ressource | Lien |
| --- | --- |
| Recherche `$` et jetons d'état | [Référence de la recherche et des règles](/fr/mail/search/) |
| Mode courriel et étendue visible côté administration | [Modes de fonctionnement](/fr/mail/modes/) |
| Appréciation des signalements et des alertes | [Rapport d'audit](/fr/mail/audit/) |
| Traitement côté utilisateurs | [Liste des utilisateurs](/fr/mail/users/) |
