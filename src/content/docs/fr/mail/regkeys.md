---
title: Clés d'inscription
description: Clés d'inscription d'EpoCanvas Mail — émission des codes d'invitation, gestion des usages disponibles et de la validité, consultation du journal d'usage côté administration.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.17**

La page des clés d'inscription est l'interface des codes d'invitation de la zone d'administration (`#manage/admin/reg-keys`, clé de permission `reg-key:query`) ; elle décide qui peut s'inscrire sur l'instance. Les trois modes à l'échelle du site du code d'inscription (obligatoire／désactivé／facultatif) se décident dans la carte des paramètres du site des [paramètres système](/fr/mail/system/).

![Figure : les clés d'inscription](/images/mail/fr/ui/regkeys-guide.png)

*Figure : les clés d'inscription*

<details>
<summary>Guide visuel : La page vide des clés d'inscription  —  l'entrée d'émission et le champ de recherche</summary>

L'état vide de la page des clés d'inscription tant qu'aucun code d'invitation n'a été émis : un bouton d'émission et une barre de recherche composent toute la page.

1. **Bouton d'ajout de code d'inscription** : L'entrée d'émission : la boîte de dialogue génère un code aléatoire à 8 caractères (régénérable d'un clic) et le lie au groupe d'identité rejoint après l'inscription, à une date de validité et à un nombre d'usages (1–99999, un usage décompté par inscription réussie).
2. **Barre de recherche de codes d'inscription** : Après émission, filtrer et localiser les codes par leur valeur, pour consulter les usages restants, le groupe lié et la validité ; les champs sensibles sont automatiquement masqués du point de vue des Visiteurs.
3. **Carte d'état vide** : Le repère explicatif affiché tant que l'instance n'a émis aucun code. Après émission, cette zone devient la liste des codes, avec copie en un clic, consultation du journal d'usage, suppression d'une ligne et « Nettoyage des codes inutilisés » en lot.

</details>

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
