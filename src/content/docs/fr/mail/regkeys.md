---
title: Clés d'inscription
description: Clés d'inscription d'EpoCanvas Mail — émission des codes d'invitation, gestion des usages disponibles et de la validité, consultation du journal d'usage côté administration.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.15**

La page des clés d'inscription est l'interface des codes d'invitation de la zone d'administration (`#manage/admin/reg-keys`, clé de permission `reg-key:query`) ; elle décide qui peut s'inscrire sur l'instance. Les trois modes à l'échelle du site du code d'inscription (obligatoire／désactivé／facultatif) se décident dans la carte des paramètres du site des [paramètres système](/fr/mail/system/).

## 1. Émission

La fenêtre « Ajouter » émet un code d'inscription à la fois, configurable :

| Champ | Description |
| --- | --- |
| Code d'inscription | Code aléatoire à 8 caractères, régénérable d'un clic via le bouton d'actualisation |
| Groupe lié | Les comptes inscrits avec ce code entrent dans le groupe d'identité désigné (groupes à la page des [Permissions](/fr/mail/roles/)) |
| Validité | Inutilisable après la date d'expiration |
| Usages disponibles | 1–99999 ; chaque inscription réussie décompte un usage |

## 2. Gestion et vérification

| Opération | Description |
| --- | --- |
| Liste | Affiche les usages restants, le groupe lié et la validité ; les segments sensibles sont masqués du point de vue des Visiteurs |
| Copier | Copie le texte du code en un clic pour le transmettre aisément aux invités |
| Journal d'usage | Indique quels comptes ont utilisé le code |
| Suppression | Invalide le code immédiatement |
| Nettoyage des codes inutilisés | Efface en un clic tous les codes pas encore utilisés |

Une URL portant un paramètre d'invitation (`?code=`／`?regKey=`／`?invite=`) préremplit directement le formulaire d'inscription — voir la section 5 d'[Interface et plan des routes](/fr/mail/interface/).

<details>
<summary>Guide visuel : les clés d'inscription</summary>

![Les clés d'inscription](/images/mail/fr/ui/regkeys.png)

1. Ouvrez la page des « Clés d'inscription » de la zone d'administration (clé de permission `reg-key:query`).
2. Cliquez sur « Ajouter » pour générer un code aléatoire à 8 caractères (un clic sur le bouton d'actualisation le régénère).
3. Liez le groupe d'identité que rejoindront les inscriptions, et réglez la validité et les usages disponibles (1–99999).
4. Copiez le code et transmettez-le aux invités ; le « Journal d'usage » indique sa consommation ; « Nettoyage des codes inutilisés » invalide en un clic tous les codes pas encore utilisés.

</details>

## 3. Documents connexes

| Ressource | Lien |
| --- | --- |
| Modes du code d'inscription et flux de la surface de connexion | [Modes de fonctionnement](/fr/mail/modes/) |
| Définition des groupes d'inscription | [Permissions](/fr/mail/roles/) |
| Interrupteur d'inscription ouverte | [Les cartes des paramètres système en détail](/fr/mail/system/) |
| Responsabilité des comptes inscrits sur invitation | [Conditions d'utilisation](/fr/mail/terms-of-service/) |
