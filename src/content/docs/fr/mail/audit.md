---
title: Rapport d'audit
description: "Rapport d'audit d'EpoCanvas Mail — la console de tickets de risque à quatre tableaux : jeux de colonnes différenciés pour menaces d'abus, audit des recours, gestion des risques et journal des opérations, avec tiroir de preuves, traitement par lots et arbitrage des recours pour les administrateurs."
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

Le rapport d'audit est la console de tickets de risque de l'espace d'administration (`#manage/admin/audit` ; la consultation exige `setting:query`, le traitement, l'arbitrage et le nettoyage exigent `setting:set`). Les tickets sont conservés dans une table de journal d'audit dédiée, avec historique paginé. Quatre cartes de tableau en haut de page résument chacune une classe de tickets ; un clic bascule l'établi sur la table différenciée de ce tableau.

![Page du rapport d'audit EpoCanvas Mail : quatre cartes de tableau en haut et une table de tickets différenciée, la carte menaces d'abus affichant les compteurs en attente et bloqués, avec une barre d'outils offrant prolongation par lots, actualisation, réinitialisation, export de données, nettoyage de l'historique et lien vers la documentation](/images/mail/fr/ui/audit-guide.png)

*Figure : rapport d'audit. Les quatre cartes donnent la direction, les tickets sont instruits ligne à ligne, et le tiroir de preuves puis l'export CSV bouclent le cycle.*

<details>
<summary>Lire la figure : rapport d'audit — six points d'appui de la console</summary>

Les six zones annotées de la page : les quatre cartes fixent l'orientation de l'instruction, le tiroir de preuves et l'export de données concluent le travail.

1. **Carte Menaces d'abus** : le registre consolidé des comptes à menace LV3 et au-delà (multi-comptes, signalements graves, revente de comptes, etc.), avec le compteur en direct « en attente N / bloqués N » ; un clic entre dans le tableau des menaces, et la barre « lots repliés automatiquement aujourd'hui » déplie les lots d'inspection de routine archivés automatiquement.
2. **Carte Audit des recours** : le nombre de tickets de recours déposés par les utilisateurs contre une décision ; entrez dans le tableau des recours pour réexaminer chaque formulaire.
3. **Carte Gestion des risques** : le nombre de tickets de routine tels que spam et sauts d'IP en itinérance ; entrez dans le tableau des risques et instruisez par niveau d'infraction.
4. **Carte Journal des opérations** : le registre des tickets conclus (blocages, déblocages, mises à jour d'archivage) ; entrez dans le tableau des journaux pour retracer tout le parcours.
5. **Tiroir de preuves (Détails)** : le bouton « Détails » de chaque ticket ouvre un tiroir de preuves en lecture seule : comparaison côte à côte des preuves réelles et de référence, chronologie complète du traitement et profil de risque multidimensionnel.
6. **Exporter les données** : exporte les tickets du tableau courant en CSV toutes colonnes, pour l'instruction hors ligne et l'archivage.

</details>

## 1. Quatre tableaux et leurs tables de tickets différenciées

| Tableau | Tickets couverts | Colonnes distinctives |
| --- | --- | --- |
| Menaces d'abus | Comptes à menace LV3+ : multi-comptes, signalements graves, revente de comptes, etc. | Vue de traitement compacte : numéro, cible, statut, catégorie, traitement et actions |
| Audit des recours | Recours des utilisateurs contre une décision | N° de ticket, groupe d'identité, catégorie d'infraction, alarmes, suggestion, échéance et autorité finale |
| Gestion des risques | Routine de risque : spam, sauts d'IP, etc. | Ajoute niveau d'infraction, motif d'alerte et échéance |
| Journal des opérations | Traitements conclus et mises à jour d'archivage | Ajoute mises à jour, dernière mise à jour et recours |

Les quatre tableaux partagent les mêmes filtres et outils par lots : après sélection, déblocage, blocage, prolongation ou suppression par lots ; sur le tableau des menaces, les actions par lots se limitent à attribuer un responsable, lancer une révision et lever, afin d'éviter des sanctions permanentes massives.

## 2. Instruction et traitement des tickets

- Chaque ticket porte un numéro, une cible (adresse et identifiant utilisateur), un badge de statut (en attente, bloqué, levé, etc.), une catégorie d'infraction et une suggestion de traitement ; les catégories d'infraction (envoi abusif, sécurité de compte, conformité du contenu, contournement de quota, etc.) suivent l'échelle disciplinaire de la section 6 de la [Politique d'utilisation acceptable](/mail/acceptable-use/) ;
- Les suggestions proviennent du moteur de règles (suggérer un blocage, maintenir le blocage, blocage temporaire de N jours, observation continue, archivage de routine, etc.), et la colonne d'autorité finale enregistre le décideur : politique de risque du système (verdict automatique du moteur), auditeur de sécurité ou administrateur maître ;
- Les actions en ligne couvrent déblocage, re-blocage, prolongation (7 / 30 / 90 jours ou permanente) et notes de révision ; la colonne de responsable distingue les programmes automatiques du système des administrateurs humains.

## 3. Tiroir de preuves et chronologie du traitement

« Détails » ouvre le tiroir de preuves du registre de blocage (lecture seule) — le registre de blocage est un registre public et transparent, destiné à vérifier les preuves et à conserver l'historique des déblocages, sans modification arbitraire :

- **Fiche d'affaire** : numéro d'affaire, statut actuel, adresse de l'utilisateur, moment du blocage, dernier traitement, catégorie d'infraction, code de motif et fenêtre de conservation des preuves (180 jours restants) ;
- **Appréciation du risque et motifs** : texte intégral du recours, motif de déclenchement et explication du traitement ;
- **Chronologie de cycle complet** : entrées du déclenchement de règle (moteur de règles), à l'exécution du blocage (système), jusqu'à la levée après révision manuelle (administrateur) ;
- **Profil de risque multidimensionnel** : comparaison côte à côte des « valeurs de preuve réelles du compte » et des « valeurs de référence / normales / seuil de risque » — empreinte d'appareil, client, IP de déclenchement, comptes par IP, topologie de sous-réseau, signalements et cadence d'envoi, point par point.

## 4. Arbitrage des recours et passage de relais

Les tickets de recours sont arbitrés par un administrateur après vérification du tiroir de preuves : lever ou rejeter — lever rétablit immédiatement la capacité d'envoi ; les blocages peuvent aussi être exécutés depuis la [liste des utilisateurs](/mail/users/). L'échelle disciplinaire et les droits de recours figurent à la section 6 de la [Politique d'utilisation acceptable](/mail/acceptable-use/).

<details>
<summary>Lire la figure : l'instruction d'un ticket d'alerte</summary>

![L'instruction d'un ticket d'alerte](/images/mail/fr/ui/audit.png)

1. Ouvrez « Rapport d'audit » dans l'espace d'administration (consultation avec `setting:query`, traitement avec `setting:set`).
2. Cliquez sur une carte de tableau pour changer de lot de tickets, ou filtrez par statut, catégorie d'infraction ou niveau de risque.
3. Ouvrez le tiroir de preuves « Détails » et vérifiez la comparaison des preuves et la chronologie.
4. Traitez selon le tableau : déblocage, re-blocage, prolongation ou notes ; pour les recours, lever ou rejeter.
5. Utilisez « Exporter les données » pour archiver en CSV les tickets du tableau courant.

</details>

## 5. Export, nettoyage et lien avec le mode

- **Exporter les données** : exporte les tickets du tableau courant en CSV toutes colonnes (avec BOM, ouvrable directement dans un tableur) ;
- **Nettoyer les journaux historiques** : un clic efface les enregistrements d'inspection de routine non critiques (seuls les enregistrements d'audit de risque normal) ; les registres de blocage et de recours ne sont pas touchés ;
- **Barre de disjoncteur** : quand le disjoncteur global se déclenche, une barre d'alerte apparaît en haut du tableau des menaces ; pendant le déclenchement, les nouvelles infractions sont seulement retenues et aucun compte n'est bloqué automatiquement ;
- **Lien avec le mode de messagerie** : en mode chiffré (Level 3), les horodatages sont anonymisés ; les tickets restent instruibles par catégorie et preuves, mais l'ordre des faits ne peut plus être reconstitué.

## 6. Documents liés

| Ressource | Lien |
| --- | --- |
| Régler les seuils d'alerte | [Les cartes des paramètres système](/mail/system/) |
| Blocage et restauration de comptes | [Liste des utilisateurs](/mail/users/) |
| Comportement du contrôle de risque à la connexion | [Guide de sécurité du compte](/mail/security/) |
| Échelle disciplinaire et droits de recours | [Politique d'utilisation acceptable](/mail/acceptable-use/) |
