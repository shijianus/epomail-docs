---
title: Page d'analyse
description: Page d'analyse d'EpoCanvas Mail — tableaux de bord du volume de courriels, du taux d'interception, de la distribution des sources, des courbes de croissance et de l'usage de l'IA côté administration.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.15**

La page d'analyse est le tableau de bord de données de la zone d'administration (`#manage/admin/analysis`, clé de permission `analysis:query`) ; elle agrège les indicateurs de courriels, d'utilisateurs et d'usage de l'IA de l'instance. Le périmètre de chaque indicateur varie avec le mode courriel : en mode chiffré (Level 3), l'administration ne lit pas le contenu des courriels des utilisateurs et les compteurs concernés restent au niveau des métadonnées.

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

## 3. Documents connexes

| Ressource | Lien |
| --- | --- |
| Gestion détaillée côté utilisateurs | [Liste des utilisateurs](/fr/mail/users/) |
| Configuration du moteur IA | [Les cartes des paramètres système en détail](/fr/mail/system/) |
| Attribution des clés de permission groupe par groupe | [Permissions](/fr/mail/roles/) |
