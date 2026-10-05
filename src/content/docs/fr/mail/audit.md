---
title: Rapport d'audit
description: Rapport d'audit d'EpoCanvas Mail — appréciation des tickets d'alerte des quatre classes, boutons de traitement par classe, arbitrage des recours et dépouillement des horodatages en mode chiffré.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.15**

Le rapport d'audit est l'interface des tickets de risque de la zone d'administration (`#manage/admin/audit` ; la consultation exige `setting:query`, le traitement et l'arbitrage exigent `setting:set`). Les tickets persistent dans une table de journal d'audit indépendante, avec recherche de l'historique paginée.

![Page du rapport d'audit d'EpoCanvas Mail : tickets d'alerte des quatre classes, informations d'environnement en texte brut et boutons de traitement](/images/mail/ui/ui-audit-report.png)

*Figure : le rapport d'audit. Chaque ticket porte sa classe, sa priorité, son état et son pool d'environnements actifs présenté en texte brut.*

## 1. Les quatre classes d'alertes

| Classe d'alerte | Déclencheur | Traitement habituel |
| --- | --- | --- |
| Alerte d'audit | Signalement ou violation signalée par d'autres utilisateurs établie | Vérifier, puis lever ou traiter |
| Alerte de risque | Franchissement d'une ligne rouge de sécurité ou environnement de connexion anormal (p. ex. connexions multi-IP et multi-sites simultanées) | Surveillance rapprochée, entretien ou bannissement |
| Alerte de bannissement | Le compte a été banni automatiquement par le système ou manuellement par un administrateur | Lever l'alerte ou maintenir le bannissement |
| Alerte d'appel | L'utilisateur a fait appel d'une décision de traitement | Lever (lever le bannissement) ou rejeter |

## 2. Informations des tickets et traitement

- Chaque ticket porte sa classe, sa priorité (P0／P1…), son état et ses informations d'environnement complètes (IP, géolocalisation, appareil, empreinte), le tout présenté en texte brut, sans cadre imbriqué ;
- Les boutons de traitement se répartissent par classe : les alertes d'appel mettent en avant « Lever » (lever le bannissement), les alertes de bannissement « Lever l'alerte », et les alertes ordinaires offrent un menu d'opérations standard ;
- En mode chiffré (Level 3), les horodatages des enregistrements sont dépouillés et la colonne temporelle masquée ; les tickets restent susceptibles d'être appréciés.

## 3. Arbitrage des recours

Les tickets d'appel sont tranchés par l'administrateur — « Lever » ou rejet — après vérification de l'environnement et du motif ; l'échelle des mesures et le droit d'appel des utilisateurs figurent à la section 6 de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/). L'exécution des bannissements se fait depuis la [Liste des utilisateurs](/fr/mail/users/).

<details>
<summary>Guide visuel : l'appréciation des tickets d'alerte</summary>

![L'appréciation des tickets d'alerte](/images/mail/fr/ui/audit.png)

1. Ouvrez le « Rapport d'audit » de la zone d'administration (la consultation exige `setting:query`, le traitement `setting:set`).
2. Filtrez les tickets par classe (audit／risque／bannissement／appel) et par priorité.
3. Vérifiez les informations d'environnement présentées en texte brut : IP, géolocalisation, appareil et empreinte.
4. Traitez selon la classe : « Lever » pour les alertes d'appel, « Lever l'alerte » pour les alertes de bannissement, menu d'opérations standard pour les alertes ordinaires.
5. En mode chiffré, les horodatages sont dépouillés mais les tickets restent susceptibles d'être appréciés ; le résultat du traitement commande le bannissement et la restauration côté utilisateur.

</details>

## 4. Documents connexes

| Ressource | Lien |
| --- | --- |
| Configuration des seuils d'alerte | [Les cartes des paramètres système en détail](/fr/mail/system/) |
| Opérations de bannissement et de restauration | [Liste des utilisateurs](/fr/mail/users/) |
| Comportement à la connexion déclenché par le contrôle des risques | [Guide de sécurité du compte](/fr/mail/security/) |
| Échelle d'exécution et droit d'appel | [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) |
