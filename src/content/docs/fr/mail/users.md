---
title: Liste des utilisateurs
description: Liste des utilisateurs d'EpoCanvas Mail — recherche de comptes, réinitialisation du mot de passe, changement de groupe d'identité, réinitialisation de la double vérification, bannissement et restauration côté administration.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.16**

La liste des utilisateurs est l'interface de gestion des comptes de la zone d'administration (`#manage/admin/users`, clé de permission `user:query`) ; elle permet à l'administrateur de rechercher et de traiter tous les comptes du site.

![Figure : la liste des utilisateurs](/images/mail/fr/ui/users-guide.png)

*Figure : la liste des utilisateurs*
*Annotations: 1.  ｜ 2.  ｜ 3. Email ｜ 4. Stockage*


## 1. Liste et recherche

La liste présente compte par compte l'adresse, les volumes d'envoi et de réception, l'occupation de stockage, les compteurs de pourriels et de signalements, entre autres dimensions ; la barre supérieure prend en charge la recherche par adresse, avec pagination et tri immédiats.

## 2. Opérations sur les comptes

| Opération | Description |
| --- | --- |
| Réinitialisation du mot de passe | Émet un nouveau mot de passe à usage unique pour le compte et l'invite à se reconnecter |
| Changement de groupe d'identité | Déplace le compte vers un autre groupe ; quotas et permissions basculent aussitôt (définition des groupes à la page des [Permissions](/fr/mail/roles/)) |
| Réinitialisation de la double vérification | Passage de secours lorsqu'un compte ne parvient plus à passer la double vérification ; efface sa configuration TOTP／clés d'accès |
| Bannissement et restauration | Un compte banni perd ses sessions immédiatement ; après restauration, la connexion redevient possible |
| Purge des courriels du compte | Efface les courriels portés par ce compte (irréversible, à manier avec précaution) |

## 3. Articulation entre traitement et recours

Le bannissement génère un ticket d'alerte qui entre au [Rapport d'audit](/fr/mail/audit/) ; l'utilisateur visé peut faire appel par le portail de recours ou les canaux internes au site, à l'appréciation de l'administrateur. L'échelle des mesures et le principe de proportionnalité figurent à la section 6 de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/).

<details>
<summary>Guide visuel : la liste des utilisateurs</summary>

1. Ouvrez la « Liste des utilisateurs » de la zone d'administration (clé de permission `user:query`).
2. Localisez un compte par son adresse depuis la barre de recherche supérieure.
3. Dans le menu d'opérations de la ligne, choisissez : réinitialisation du mot de passe, changement de groupe d'identité, réinitialisation de la double vérification, bannissement et restauration, ou purge des courriels du compte.
4. Les bannissements et les traitements entrent sous forme de tickets d'alerte au rapport d'audit, en vue de l'arbitrage ultérieur des recours.

</details>

## 4. Documents connexes

| Ressource | Lien |
| --- | --- |
| Groupes d'identité et modèles de quotas | [Permissions](/fr/mail/roles/) |
| Revue du courrier à l'échelle du site | [Revue du courriel à l'échelle du site](/fr/mail/review/) |
| Tickets d'alerte et arbitrage des recours | [Rapport d'audit](/fr/mail/audit/) |
| Tableaux de bord des données | [Page d'analyse](/fr/mail/analysis/) |
