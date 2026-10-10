---
title: Permissions
description: Permissions d'EpoCanvas Mail — les six groupes d'identité, les clés de permission attribuées une à une, le groupe par défaut et la protection des groupes, la synchronisation par le niveau de blog.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.17**

La page des permissions est l'interface de gestion des groupes d'identité de la zone d'administration (`#manage/admin/roles`, clé de permission `role:query`) ; elle décide des quotas, des clés de permission et de l'autorisation des modèles IA de chaque groupe. Le comportement côté utilisateur de chaque groupe figure à la section 3 de [Modes de fonctionnement](/fr/mail/modes/).

![Page des permissions d'EpoCanvas Mail : tableau des six groupes avec quotas, limites d'envoi, permissions de pièces jointes et colonne des modèles IA autorisés](/images/mail/fr/ui/roles-guide.png)

*Figure : vue d'ensemble de l'architecture et de la graduation de la page des permissions. L'interface libelle « sans plafond » l'envoi et le stockage du groupe Maître.*

<details>
<summary>Guide visuel : Les rôles  —  cinq colonnes décident de ce qu'un groupe peut faire</summary>

Le tableau des six groupes d'identité de la page des permissions : cinq colonnes annotées pour les cinq dimensions ajustables groupe par groupe.

1. **Colonne des groupes d'identité** : Six groupes — Utilisateur standard, Visiteur, Utilisateur standard LV.0, LV.1, Modérateur et Maître — chacun avec son étiquette de positionnement. Le groupe détermine les valeurs par défaut des quatre autres colonnes ; les groupes Visiteur et Maître sont protégés et ne peuvent pas être supprimés.
2. **Colonne du quota de stockage** : Un quota de stockage des pièces jointes par groupe (de 0 Mo pour le Visiteur à 1024 Mo pour le Maître, l'interface affichant « sans plafond »). Une fois un stockage d'objets personnel branché, les nouvelles pièces jointes ne consomment plus ce quota.
3. **Colonne de la limite d'envoi** : Le quota d'envoi quotidien (de 5 courriels pour l'Utilisateur standard à 100 pour le Modérateur ; le Maître n'a pas de plafond), remis à zéro chaque jour. Les groupes dont l'envoi est interdit — le Visiteur — portent ici la mention « envoi interdit ».
4. **Colonne des permissions de pièces jointes** : Indique si l'envoi et la réception de pièces jointes sont autorisés : les groupes « texte brut uniquement » envoient sans pièce jointe, tandis que les groupes ouverts restent bornés à la fois par le quota de stockage et par la limite de taille par fichier.
5. **Colonne des modèles IA autorisés** : L'étendue des modèles IA que le groupe peut appeler ; combinée au quota quotidien et à la limite de débit de l'AI Hub dans les paramètres système, elle met en œuvre une fourniture d'IA graduée selon l'identité.

</details>

## 1. Groupes et quotas

| Groupe | Positionnement | Quotas d'usine |
| --- | --- | --- |
| Visiteur | Bac à sable en lecture seule | 0 boîte／0 Mo／envoi interdit |
| Utilisateur standard | Membre de base | 5 courriels／1 boîte／5 Mo |
| Utilisateur standard LV.0 | Ami certifié | 8 courriels／2 boîtes／10 Mo |
| Utilisateur standard LV.1 | Lettré actif | 10 courriels／3 boîtes／25 Mo／pièces jointes autorisées |
| Modérateur | Cogestion | 100 courriels／10 boîtes／500 Mo／pièces jointes autorisées |
| Maître | Autorité suprême | Envoi et nombre de boîtes sans plafond ; stockage semé en usine à 1024 Mo (l'interface affiche « sans plafond »), ajustable |

## 2. Clés de permission une à une

Chaque groupe reçoit ses autorisations par clés de permission (par exemple `user:query` pour consulter la liste des utilisateurs, `setting:query`／`setting:set` pour l'accès en consultation／traitement aux paramètres système et au rapport d'audit). Les clés de permission requises par chaque interface d'administration sont listées une à une à la section 4 d'[Interface et plan des routes](/fr/mail/interface/) ; tout ajustement prend effet immédiatement.

## 3. Groupe par défaut et protection

- Le groupe par défaut des nouvelles inscriptions est le Visiteur en sortie d'usine ; il peut être changé pour un autre groupe ;
- Les groupes Visiteur et Maître sont protégés : ils ne peuvent être supprimés ;
- Les paliers LV.0 et LV.1 se synchronisent automatiquement par le lien de niveau de blog (lier un compte de blog élève en LV.0, une participation active élève en LV.1) ;
- L'autorisation des modèles IA se gradue par groupe, en coordination avec le quota et la limite de débit de l'AI Hub dans les [cartes des paramètres système](/fr/mail/system/).

<details>
<summary>Guide visuel : les permissions</summary>

![Les permissions](/images/mail/fr/ui/roles.png)

1. Ouvrez la page des « Permissions » de la zone d'administration (clé de permission `role:query`).
2. Le tableau d'ensemble de l'architecture et de la graduation recense les quotas de stockage, les limites d'envoi et les permissions de pièces jointes des six groupes (le groupe Maître est semé en usine à 1024 Mo, l'interface affiche « sans plafond »).
3. Modifiez un groupe pour ajuster son quota, son interrupteur de pièces jointes et son autorisation de modèles IA, et cochez les clés de permission une à une (par exemple `user:query`, `setting:query`).
4. Le groupe par défaut est, en sortie d'usine, le Visiteur et peut être changé pour un autre groupe ; les groupes Visiteur et Maître sont protégés et ne peuvent être supprimés.

</details>

## 4. Documents connexes

| Ressource | Lien |
| --- | --- |
| Comportement côté utilisateur des groupes | [Modes de fonctionnement](/fr/mail/modes/) |
| Changement de groupe d'un compte | [Liste des utilisateurs](/fr/mail/users/) |
| Moteur IA et quotas | [Les cartes des paramètres système en détail](/fr/mail/system/) |
| Articulation entre inscription et groupes | [Clés d'inscription](/fr/mail/regkeys/) |
