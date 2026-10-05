---
title: Périmètre du service et assistance
description: Périmètre du service et assistance d'EpoCanvas Mail — ce que fournit l'instance hébergée, les limites de ce service, les liens officiels, les canaux d'assistance et les voies de recours et de récupération.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.14**

La présente page décrit ce que fournit l'instance hébergée ([mail.epocanvas.com](https://mail.epocanvas.com)), où ce service s'arrête, et les canaux d'assistance. Les instances auto-hébergées restent en dehors du « service » décrit ici : le logiciel est fourni sous licence MIT et le projet amont n'assume aucune responsabilité quant au fonctionnement d'une instance — la position juridique figure dans [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/) ; la répartition du responsable du traitement entre les deux formes se trouve à la section 2 de l'[Aperçu confidentialité et conditions](/fr/mail/overview/).

![Architecture juridique d'EpoCanvas Mail : les conditions d'utilisation et la politique de confidentialité reposent sur le droit applicable et les obligations de sécurité](/images/mail/fr/legal-architecture.svg)

*Figure : l'architecture d'engagement de ce service. La présente page décrit le service lui-même ; le contrat et les normes d'information sont portés par les documents juridiques situés au-dessus de lui.*

## 1. Ce que le service fournit

| Élément | Description |
| --- | --- |
| Comptes et inscription | Comptes obtenus par codes d'inscription ou inscription ouverte selon la configuration ; six groupes d'identité décident des quotas et des permissions |
| Envoi et réception | Entrant via Cloudflare Email Routing, analysé à l'arrivée ; livraison directe au sein du site ; hors site via le canal de livraison de l'Opérateur |
| Stockage | Quota de stockage par groupe d'identité ; un stockage d'objets personnel peut être branché pour que les pièces jointes y atterrissent directement |
| Organisation et automatisation | Boîte à huit vues, étiquettes et moteur de règles de classement, recherche avancée, extraction des codes de vérification |
| Capacités d'IA | Traduction intégrale et OCR des images (selon la configuration du moteur d'IA de l'instance et l'autorisation des modèles) |
| Notifications et transfert | Push Telegram et transfert par règles (selon les contrôles des données utilisateurs fixés par l'administrateur) |
| Clients | Web (installable en PWA) et application Android (epomail) |
| Langues | Six langues d'interface ; courriels système et de bienvenue livrés dans la langue du destinataire |

Les détails au niveau des fonctions figurent dans le [Guide des fonctions](/fr/mail/features/) ; une visite de chaque interface et route se trouve dans [Interface et plan des routes](/fr/mail/interface/).

## 2. Limites du service

| Sujet | Limite |
| --- | --- |
| Disponibilité | Aucun accord de niveau de service n'est offert ; la disponibilité repose sur la plateforme Cloudflare |
| Conservation | La corbeille est effacée physiquement sept jours après réception ; les pourriels sont mis en quarantaine sept jours puis déplacés vers la corbeille |
| Quotas | L'envoi, les boîtes et le stockage suivent les valeurs d'usine du groupe d'identité, ajustables par le Maître sur la page des permissions |
| Coût | L'instance hébergée n'offre actuellement aucune fonction payante |
| Évolution des fonctions | Les fonctions évoluent avec les versions ; les changements importants sont annoncés par l'avis sur le site et par courriel d'annonce |
| Limite des pièces jointes | Le plafond par pièce jointe suit le réglage de l'instance et ne lie que les utilisateurs du stockage partagé de l'Opérateur |

La sémantique complète de la conservation figure dans [Traitement des données et sécurité](/fr/mail/data-security/) ; les limites comportementales, dans la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/).

## 3. Liens officiels dans l'application

Les cibles par défaut des liens officiels présents dans l'application sont listées ci-dessous ; l'opérateur d'une instance peut les remplacer dans les paramètres système :

| Lien | Cible par défaut | Emplacement |
| --- | --- | --- |
| Présentation du projet | Page Présentation du projet de ce site | Pied du menu de compte |
| Politique de confidentialité / Conditions d'utilisation | Les documents juridiques correspondants de ce site | Pied du menu de compte |
| Documentation | Ce site (rejoint par négociation de la langue du navigateur) | Paramètres système, carte « À propos » |
| Assistance | Page Périmètre du service et assistance de ce site | Paramètres système, carte « À propos » |
| Versions | GitHub Releases | Paramètres système, carte « À propos » |
| Telegram | `t.me/epomail` | Paramètres système, carte « À propos » |

## 4. Canaux d'assistance

| Canal | Pour |
| --- | --- |
| Contact dans le produit | Message sur le site ou `admin@epocanvas.com` |
| Confidentialité et protection des données | `privacy@epocanvas.com` (exercice des droits des personnes concernées, recours de protection des données) |
| GitHub Issues | Rapports de bugs et propositions de fonctions (`github.com/shijianus/epomail`) |
| Telegram | Salon communautaire sur `t.me/epomail` |

## 5. Recours et récupération

- Mot de passe oublié : la boîte de dialogue « mot de passe oublié » de la page de connexion mène au portail de recours (en transmettant le type de recours, la langue de l'interface et l'adresse électronique) ; l'accès est restauré après vérification ;
- Recours contre bannissement et alerte : un recours contre une décision de traitement entre dans le rapport d'audit comme ticket d'alerte, qu'un administrateur arbitre en levant ou en rejetant ; l'échelle d'exécution figure à la section 6 de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) ;
- Données en libre-service : l'export JSON intégral, les archives de l'historique des courriels et les téléchargements .eml de messages isolés sont disponibles à tout moment dans « Paramètres → Données » — voir la section 5 du [Guide des paramètres](/fr/mail/settings/).

## 6. Limite d'assistance pour les instances auto-hébergées

Le projet open source amont ne fournit aucun service, aucune assistance ni aucun engagement de disponibilité pour quelque déploiement de son code que ce soit ; le déployeur porte envers ses propres utilisateurs les devoirs d'assistance, d'information et de conformité. Les documents du présent site (ensemble juridique compris) peuvent servir de base aux matériaux destinés aux utilisateurs d'un déployeur, et quiconque les adopte en devient responsable.

## 7. Documents connexes

| Ressource | Lien |
| --- | --- |
| Le contrat et la limitation de responsabilité pour le service | [Conditions d'utilisation](/fr/mail/terms-of-service/) |
| Avis de confidentialité et droits des personnes concernées | [Politique de confidentialité](/fr/mail/privacy-policy/) |
| La licence open source et le droit de l'auto-hébergement | [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/) |
| Étapes complètes pour déployer votre propre instance | [Guide de déploiement](/fr/mail/deployment/) |
