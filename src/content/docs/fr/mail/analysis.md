---
title: Page d'analyse
description: Page d'analyse d'EpoCanvas Mail — tableaux de bord du volume de courriels, du taux d'interception, de la distribution des sources, des courbes de croissance et de l'usage de l'IA côté administration.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.17**

La page d'analyse est le tableau de bord de données de la zone d'administration (`#manage/admin/analysis`, clé de permission `analysis:query`) ; elle agrège les indicateurs de courriels, d'utilisateurs et d'usage de l'IA de l'instance. Le périmètre de chaque indicateur varie avec le mode courriel : en mode chiffré (Level 3), l'administration ne lit pas le contenu des courriels des utilisateurs et les compteurs concernés restent au niveau des métadonnées.

![Figure : la page d'analyse](/images/mail/fr/ui/analysis-guide.png)

*Figure : la page d'analyse*

<details>
<summary>Guide visuel : L'en-tête des statistiques  —  trois jauges, trois questions</summary>

Les trois indicateurs en tête de la page d'analyse : la distribution des sources répond à « d'où viennent les courriels », les deux courbes de croissance à « quelle est la tendance d'activité de l'instance ».

1. **Distribution des sources des courriels** : La part des différentes provenances entrantes — livraison directe sur le site, canaux externes — sert à évaluer la santé du canal de livraison ; pour l'effet de la gouvernance (taux d'interception et volume de pourriels), retournez au Classement.
2. **Courbe de croissance des utilisateurs** : L'évolution dans le temps des comptes inscrits et des comptes actifs. À lire en regard des quotas de chaque groupe d'identité sur la page des permissions, pour juger quand agrandir ou changer le groupe par défaut.
3. **Courbe de croissance des courriels** : L'évolution dans le temps du volume total envoyé et reçu. Avec la tendance des appels IA de la même page, elle sert à vérifier si le quota quotidien et la limite de débit de l'AI Hub dans les paramètres système restent pertinents.

</details>

## 1. Tour d'horizon des indicateurs

| Tableau de bord | Contenu |
| --- | --- |
| Volume de courriels | Total reçu, total envoyé, nombre de courriels supprimés |
| Utilisateurs | Comptes inscrits, comptes actifs, comptes supprimés |
| Gouvernance | Taux d'interception du système, volume de pourriels |
| Distribution | Distribution des sources des courriels (livraison directe sur le site／canaux externes, etc.) |
| Tendances | Courbe de croissance des utilisateurs, courbe de croissance des courriels |
| IA | Nombre d'appels IA et tendance de consommation de jetons, distribution d'usage des modèles IA |

## 2. Usages typiques

- Évaluer si les quotas de chaque groupe d'identité doivent être ajustés (à comparer aux valeurs d'usine de la page des [Permissions](/fr/mail/roles/)) ;
- Observer le taux d'interception et le volume de pourriels, puis ajuster en conséquence les listes et les mots-clés de [Classement](/fr/mail/category/) ;
- Suivre la tendance des appels IA et vérifier dans les [cartes des paramètres système](/fr/mail/system/) si le quota quotidien et la limite de débit de l'AI Hub restent raisonnables.

<details>
<summary>Guide visuel : la page d'analyse</summary>

1. Ouvrez la « Page d'analyse » de la zone d'administration (clé de permission `analysis:query`).
2. Consultez les trois groupes de cartes d'indicateurs : volume de courriels, utilisateurs et gouvernance.
3. Les courbes de croissance suivent les tendances des utilisateurs et des courriels ; la distribution des sources sert à vérifier la composition du trafic entrant.
4. Les tendances des appels IA et de la consommation de jetons, ainsi que la distribution d'usage des modèles, servent à vérifier le quota et la limite de débit réglés dans les paramètres système.

</details>

## 3. Documents connexes

| Ressource | Lien |
| --- | --- |
| Gestion détaillée côté utilisateurs | [Liste des utilisateurs](/fr/mail/users/) |
| Configuration du moteur IA | [Les cartes des paramètres système en détail](/fr/mail/system/) |
| Attribution des clés de permission groupe par groupe | [Permissions](/fr/mail/roles/) |
