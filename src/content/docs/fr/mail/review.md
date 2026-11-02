---
title: Revue du courriel à l'échelle du site
description: Revue du courriel à l'échelle du site d'EpoCanvas Mail — recherche côté administration, tiroir de détail et suppression physique, avec l'effet du mode courriel sur l'entrée et l'étendue visible.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

La revue du courriel à l'échelle du site est l'interface courrier de la zone d'administration (`#manage/admin/mail`, clé de permission `all-email:query`). Le nom de la section et l'étendue visible varient avec le mode courriel : le mode tous courriels (Level 1) affiche « Tous les courriels » ; le mode privé (Level 2) affiche « Pourriels », mais son périmètre administratif comprend aussi la corbeille des utilisateurs et les courriels sans propriétaire ; le mode chiffré (Level 3) masque l'entrée et limite les résultats de la liste administrative. Ces restrictions concernent l'interface applicative et ne prouvent pas que l'exploitant soit incapable de déchiffrer les données sur le serveur ; voir la section 2 de [Modes de fonctionnement](/fr/mail/modes/).

![Figure : la revue du courriel à l'échelle du site](/images/mail/fr/ui/review-guide.png)

*Figure : la revue du courriel à l'échelle du site*

<details>
<summary>Guide visuel : La revue du courrier en mode privé  —  trois points visibles</summary>

L'aspect de la revue du courriel à l'échelle du site en mode privé (Level 2) : la section s'affiche « Pourriels », et la barre de recherche ainsi que l'état vide sont les deux régions annotées.

1. **Barre de recherche** : Elle accepte la syntaxe avancée `$` sur toute la base : `$sender`/`$user`/`$to`/`$subject` complétés de jetons d'état. Un clic droit sur n'importe quel courriel des résultats lance directement une nouvelle recherche par son expéditeur, son compte destinataire ou son utilisateur propriétaire.
2. **Nom de la section dans la barre latérale** : Le nom et l'étendue visible suivent le mode courriel : Level 1 affiche « Tous les courriels », Level 2 affiche « Pourriels », Level 3 masque entièrement l'entrée.
3. **État vide** : Un message d'attente s'affiche en l'absence de résultats ; en mode privé, les résultats peuvent comprendre des indésirables, des courriels de la corbeille des utilisateurs ou des courriels sans propriétaire. L'ouverture du détail exige un motif licite et nécessaire ; la portée de la suppression physique est précisée ci-dessous.

</details>

## 1. Recherche

- La syntaxe avancée `$` de la barre supérieure porte sur toute la base : `$sender`／`$user`／`$to`／`$subject` complétés des jetons d'état ; la signification de chacun figure à la section 5 de la [Référence de la recherche et des règles](/fr/mail/search/) ;
- Un clic droit sur n'importe quel courriel de la liste de résultats lance directement une nouvelle recherche par son expéditeur, son compte destinataire ou son utilisateur propriétaire.

## 2. Détail et traitement

| Capacité | Description |
| --- | --- |
| Tiroir de détail | Consulter le contenu et les enregistrements du courriel dans les limites du mode et des autorisations en vigueur ; cela ne vérifie pas l'intégralité du courriel d'origine, de l'environnement ni des faits relatifs à la sécurité de la transmission |
| Suppression physique | Supprimer les données des stockages métier concernés ; les nouvelles tentatives après échec sur les objets, les sauvegardes, les copies externes et la portée des enregistrements doivent être vérifiées séparément ; toutes les copies ne sont pas nécessairement effacées immédiatement |
| Tri | Tri chronologique pour localiser les événements récents |

Les restrictions de la liste administrative selon le mode ne constituent ni un chiffrement de bout en bout ni une isolation technique absolue à l'égard de l'exploitant. En mode privé, déplacer un courriel jusque-là protégé vers la corbeille peut entraîner le déchiffrement et l'enregistrement de son objet, de son corps et du code de vérification, qui deviennent visibles dans l'administration. L'examen exige néanmoins un motif concret, nécessaire et licite ; la possibilité d'ouvrir un courriel n'autorise pas son utilisation à des fins d'apprentissage. Voir la section 4 de la [Politique de confidentialité](/fr/mail/privacy-policy/).

Les comptes suspects découverts à la revue se traitent directement depuis la [Liste des utilisateurs](/fr/mail/users/) ; les événements à risque entrent au [Rapport d'audit](/fr/mail/audit/) selon leur catégorie.

<details>
<summary>Guide visuel : la revue du courriel à l'échelle du site</summary>

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
