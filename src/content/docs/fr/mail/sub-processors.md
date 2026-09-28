---
title: Liste des sous-traitants
description: Liste complète des sous-traitants d'EpoCanvas Mail, des destinataires du partage, des données concernées, des conditions de déclenchement et des mécanismes de transfert international.
---

# Liste des sous-traitants

**Date d'entrée en vigueur : 29 septembre 2026 | Version : 4.1**

À la suite de la section 7 de la [Politique de confidentialité](/fr/mail/privacy-policy/), la présente liste expose intégralement les tiers impliqués dans les données personnelles du Service, les conditions de partage et les mécanismes de garantie. Le principe de partage du Service est la nécessité minimale : les données qui peuvent rester dans l'instance n'en sortent pas ; celles qui doivent en sortir voient clairement indiqués leur destinataire et les données qu'elles emportent. Le Service n'entretient avec aucune des parties ci-après de relation de vente de données ni de partage de revenus publicitaires.

Aux termes de l'article 21 de la Loi sur la protection des données personnelles (個人資料保護法, « PDPA »), lorsqu'un transfert international de données personnelles par un organisme non gouvernemental touche à des intérêts nationaux majeurs, lorsqu'un traité ou un accord international en dispose autrement, lorsque la réglementation du pays destinataire ne protège pas les données personnelles de manière suffisante au point de menacer les droits de la personne concernée, ou lorsqu'il contourne la loi par une transmission détournée vers un pays tiers, l'autorité de contrôle peut le restreindre ; le Service se conforme aux ordonnances de restriction prises par la Commission de protection des données personnelles (PDPC) sur ce fondement. Les sous-traitants traitent toutes les données sur instruction du responsable du traitement et dans les limites de la finalité confiée.

![Carte du partage avec des tiers d'EpoCanvas Mail : centrée sur l'instance, répartie en quatre catégories — sous-traitants, autorisés par la personne concernée, traitements par IA déclenchés par la personne concernée et exigences légales — avec la mention du principe de nécessité minimale et des engagements de non-vente, de non-publicité et de non-suivi](/images/mail/subprocessor-map.svg)

*Figure : les quatre voies de partage avec des tiers du Service. Les conditions de déclenchement, les données concernées et les mécanismes de garantie de chaque catégorie figurent dans les tableaux ci-dessous.*

## 1. Sous-traitants (infrastructure permanente)

| Sous-traitant | Fonction | Données concernées | Régions de transfert et garanties |
| --- | --- | --- | --- |
| Cloudflare, Inc. (États-Unis) | calcul en périphérie (Workers), stockage structuré (D1), sessions et cache (KV), stockage d'objets (R2), routage du courrier (Email Routing), vérification humaine (Turnstile), IA en périphérie (Workers AI), journaux en périphérie | métadonnées des requêtes, contenu stocké intégral, requêtes de vérification | réseau de périphérie mondial ; certifications SOC 2 Type II et ISO/IEC 27001 ; mécanisme des clauses contractuelles types de l'Union européenne (SCC) disponible ; transferts chiffrés en TLS sur toute leur durée |
| Resend, Inc. / Mailjet (Sinch) (États-Unis / France) | acheminement des envois sortants hors du site (MTA) | courriel sortant complet (destinataire, objet, corps, pièces jointes) | déclenché uniquement lorsqu'un courriel est envoyé à un destinataire hors du site et que l'Opérateur a configuré un canal d'acheminement ; les identifiants d'acheminement sont conservés sous forme de jetons API isolés et ne tombent pas dans les journaux de diagnostic |

## 2. Destinataires autorisés par la personne concernée

| Destinataire | Fonction | Données concernées | Condition de déclenchement |
| --- | --- | --- | --- |
| Telegram | notification en temps réel | selon la configuration : objet du courriel, expéditeur (masquable), corps (masquable), codes de vérification, lien de lecture valable 7 jours | uniquement après liaison d'un robot Telegram et activation de la notification |
| Applications tierces OAuth | connexion tierce ou accès autorisé | périmètre limité à openid / profile / email (identifiant, adresse électronique, nom, avatar) ; jetons d'accès valables 2 heures | uniquement sur autorisation expresse de la personne concernée ; révocable à tout moment depuis la page « Applications tierces », la révocation prenant effet immédiatement |
| Linux DO | source d'identité pour la connexion tierce | identifiant d'utilisateur, pseudonyme, avatar et niveau de confiance obtenus via OAuth | uniquement lors d'une connexion avec un compte Linux DO |
| Service de téléversement d'images | stockage des avatars et des images | le fichier image lui-même | uniquement lors du téléversement d'un avatar ou d'une image |

## 3. Chaîne de traitement par IA (en principe déclenchée par la personne concernée)

| Service | Fonction | Données concernées | Condition de déclenchement |
| --- | --- | --- | --- |
| Point de terminaison de modèle configuré sur l'instance (protocole compatible OpenAI par défaut) | traduction des courriels | fragments du texte à traduire (paragraphes entiers en priorité ; textes longs fragmentés) | uniquement lorsque la personne concernée clique sur « Traduire » |
| Cloudflare Workers AI | extraction des codes de vérification (inférence en périphérie), repli de traduction, reconnaissance de texte dans les images | objet et 6 000 premiers caractères du corps (extraction des codes) ; texte et images pour la traduction et la reconnaissance | l'extraction des codes est le seul traitement par IA non déclenché manuellement (activation facultative par l'Opérateur) ; les autres sont déclenchés par la personne concernée |
| Interfaces publiques MyMemory / Google Traduction | repli de traduction | fragments de texte prélevés | uniquement en repli lorsque le point de terminaison de modèle est indisponible |

L'Opérateur n'entraîne aucun modèle sur le contenu des courriels et ne transmet aux services d'IA aucune information d'identité de l'utilisateur au-delà du texte nécessaire à la traduction ou à la reconnaissance.

## 4. Services externes propres à la personne concernée ou à l'Opérateur

| Service | Fonction | Données concernées |
| --- | --- | --- |
| Stockage compatible S3 (AWS S3, Backblaze B2, MinIO, etc.) | stockage externe des pièces jointes et des blobs de courriels d'origine (BYOS) | contenu binaire des pièces jointes et identifiants d'accès associés |
| Bases de données externes telles que Turso / LibSQL | redondance externe des données | copies des données selon la configuration |

Les services externes précités sont choisis par la partie qui les configure ; celle-ci doit elle-même s'assurer que son choix satisfait aux exigences de l'article 21 de la PDPA relatives aux transferts internationaux.

## 5. Requêtes de tiers au niveau de l'interface

| Service | Fonction | Précisions |
| --- | --- | --- |
| Google Fonts | chargement des polices de l'interface | au chargement de la page, le navigateur envoie une requête de police à Google ; l'adresse IP de la personne concernée figure dans ses journaux de requêtes |
| Cloudflare Turnstile | vérification humaine | exécutée lors de l'inscription et de l'ajout de boîtes ; n'évalue pas la fiabilité du navigateur au moyen de cookies publicitaires ni de suivi intersites |

## 6. Partage sur exigence légale

L'Opérateur ne communique des données personnelles à l'extérieur que sur obligation légale impérative ou sur demande d'une autorité judiciaire présentée selon les procédures légales. Il vérifie la licéité de la demande, ne communique que l'étendue minimale exigée par la loi et informe, dans la mesure permise par la loi, les personnes concernées touchées (hors les cas où la loi l'interdit). Les Opérateurs auto-hébergés complètent pour leur ressort les engagements correspondants.

## 7. Notification des changements de sous-traitants

L'ajout ou le remplacement d'un sous-traitant constitue une modification importante au sens de la section 13 de la [Politique de confidentialité](/fr/mail/privacy-policy/) ; l'Opérateur l'annonce préalablement selon la procédure de cette section et met à jour la présente liste.
