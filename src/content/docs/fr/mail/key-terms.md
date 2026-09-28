---
title: Définitions
description: Définitions des termes techniques et juridiques employés dans les documents juridiques d'EpoCanvas Mail — interprétés selon la PDPA et l'architecture du Service.
---

# Définitions

**Date d'entrée en vigueur : 29 septembre 2026 | Version : 4.1**

La présente page définit les termes employés dans les documents juridiques du présent site. Les termes juridiques sont définis selon les dispositions en vigueur de la Loi sur la protection des données personnelles (個人資料保護法, « PDPA ») et des lois qui s'y rapportent ; les termes techniques s'interprètent d'après la mise en œuvre réelle du code open source du Service.

## 1. Termes juridiques

| Terme | Définition |
| --- | --- |
| Données personnelles | Aux termes de l'article 2 de la PDPA, le nom, la date de naissance, les coordonnées, les activités sociales d'une personne physique et toute autre donnée permettant d'identifier cette personne directement ou indirectement. Pour le Service, il s'agit principalement de l'adresse électronique, des identifiants de compte et des journaux d'activité en ligne |
| Données personnelles sensibles | Les données personnelles concernant les dossiers médicaux, les soins médicaux, la génétique, la vie sexuelle, les bilans de santé et les antécédents judiciaires énumérées à l'article 6 de la même loi, qui ne peuvent être collectées, traitées ni utilisées hors les cas de dérogation prévus par la loi |
| Collecte / traitement / utilisation | Article 2 de la même loi : la collecte désigne l'obtention de données personnelles par quelque moyen que ce soit ; le traitement, les opérations d'enregistrement, d'entrée, de stockage, d'édition, de correction, de copie, de recherche, de suppression, de sortie, de liaison ou de transmission interne effectuées pour constituer ou exploiter un fichier de données personnelles ; l'utilisation, l'emploi des données personnelles collectées à d'autres fins que le traitement |
| Responsable du traitement | Le sujet qui détermine les finalités et les modalités de la collecte, du traitement et de l'utilisation des données personnelles ; en font partie l'Opérateur d'une instance hébergée et le déployeur d'une instance auto-hébergée |
| Sous-traitant | Le sujet qui traite des données personnelles sur instruction du responsable du traitement et pour son compte (Cloudflare, Resend, par exemple) |
| Personne concernée | La personne physique identifiée par les données personnelles, désignée comme « vous » dans les documents du présent site |
| Transfert international | Au sens de l'article 2 de la même loi, le traitement ou l'utilisation de données personnelles par-delà les frontières (pays) ; régi par l'article 21 de la PDPA et par les ordonnances de restriction de l'autorité de contrôle |
| Devoir d'information | Aux termes de l'article 8 de la même loi, lors de la collecte de données personnelles auprès de la personne concernée, notification expresse de six points : l'identité du collecteur, les finalités de la collecte, les catégories de données, la durée, la zone, les destinataires et les modalités d'utilisation, les droits dont la personne concernée peut se prévaloir et les conséquences d'un défaut de fourniture ; lorsque les données ne sont pas fournies par la personne concernée, l'article 9 impose, avant tout traitement ou utilisation, la notification de leur source et des points connexes |
| Finalité spécifique | Aux termes de l'article 19 de la même loi, la finalité spécifique que doit avoir un organisme non gouvernemental pour collecter ou traiter des données personnelles ; l'utilisation doit en outre demeurer dans la mesure nécessaire à cette finalité spécifique (article 20) |
| Droit d'opposition au marketing | Aux termes de l'article 20, paragraphe 2, de la même loi, dès que la personne concernée manifeste son refus de recevoir du marketing, l'utilisation de ses données personnelles à des fins de marketing cesse immédiatement ; lors du premier marketing, le moyen d'exprimer le refus est fourni et les frais exigés sont supportés (paragraphe 3) |
| Autorité de contrôle | Aux termes de l'article 1-1 de la PDPA, l'autorité de contrôle de cette loi est la Commission de protection des données personnelles (PDPC) |
| Image sexuelle non consensuelle | L'image sexuelle d'autrui enregistrée, reproduite ou diffusée sans consentement, ainsi que l'image sexuelle fabriquée par synthèse informatique ou moyens similaires ; leur enregistrement et leur diffusion constituent respectivement les infractions prévues aux articles 319-1 à 319-4 du Code pénal, et l'obligation de retrait des plateformes est régie par l'article 13 de la Loi de prévention des atteintes sexuelles (性侵害犯罪防治法) |
| Exploitation sexuelle d'enfants et d'adolescents | Les comportements définis à l'article 2 de la Loi relative à la prévention de l'exploitation sexuelle des enfants et des adolescents (兒童及少年性剝削防制條例), y compris photographier, fabriquer, reproduire, détenir, diffuser, transmettre, remettre, exposer publiquement, vendre ou faire payer la consultation d'images sexuelles d'enfants ou d'adolescents |
| Droit applicable | Le droit que le contrat convient d'appliquer ; les [Conditions d'utilisation](/fr/mail/terms-of-service/) désignent le droit de la République de Chine |
| Clauses contractuelles types | Les stipulations générales conclues pour une pluralité de personnes non déterminées ; encadrées par l'article 247-1 du Code civil (nullité de la partie manifestement déloyale) et par l'article 11-1 (délai d'examen) et l'article 17 (mentions devant figurer ou ne devant pas figurer) de la Loi sur la protection du consommateur |
| Poursuite sur plainte préalable | Condition de poursuite prévue à l'article 363 du Code pénal pour le chapitre des infractions relatives à l'usage abusif de l'informatique (articles 358 à 360) : les poursuites n'engagent qu'après plainte de la partie lésée ; sans effet sur les mesures prises par l'Opérateur par les voies civile et administrative ou au titre des politiques du présent site |

## 2. Termes techniques

| Terme | Définition |
| --- | --- |
| Instance (site) | Un déploiement d'EpoCanvas Mail fonctionnant dans le compte Cloudflare d'une personne ou d'une organisation déterminée, tel que `mail.epocanvas.com` |
| Opérateur | La personne ou l'équipe qui déploie et gère l'instance ; désignée comme « nous » dans les documents |
| PBKDF2 | Un algorithme de hachage de mots de passe. Le Service l'exécute avec HMAC-SHA256 sur 100 000 itérations et ajoute un sel aléatoire indépendant propre à chaque utilisateur, de sorte que le mot de passe d'origine ne peut être retrouvé depuis le hachage |
| TOTP | Mot de passe à usage unique fondé sur le temps selon la RFC 6238 ; sa clé est stockée chiffrée en AES-256-GCM dans la base de données |
| Clé d'accès (Passkey) | Identifiant à clé publique selon les normes FIDO2/WebAuthn ; le Service ne stocke que la clé publique, la clé privée demeurant sur l'appareil de la personne concernée |
| JWT (jeton de session) | Identifiant signé numériquement émis après connexion, valable 30 jours ; au plus 10 sessions parallèles par compte ; révoqué côté serveur dès la déconnexion |
| localStorage | Mécanisme de stockage web fourni par le navigateur ; les données demeurent sur l'appareil de la personne concernée et persistent d'une session à l'autre ; les jetons de session du Service y sont stockés, sans usage de cookies |
| Chiffrement statique (encryption at rest) | Chiffrement appliqué à l'écriture des données sur le support de stockage. Les clés du Service sont dérivées des variables d'environnement du serveur d'instance ; il s'agit d'un chiffrement côté serveur, non d'un chiffrement de bout en bout |
| Chiffrement de bout en bout (E2EE) | Forme de chiffrement où seuls l'expéditeur et le destinataire peuvent déchiffrer. Le Service ne l'offre pas ; qui en a besoin chiffre lui-même au préalable avec un outil tel que GPG |
| Routage masqué par HMAC | Mécanisme liant l'identifiant du courriel à l'identité de l'utilisateur par un code d'authentification de message fondé sur un hachage, afin de prévenir l'accès non autorisé (IDOR) et l'énumération de ressources |
| RBAC | Contrôle d'accès par rôles. Le Service adopte un modèle d'autorisations à plusieurs niveaux en refus par défaut (fail-closed) ; les paramètres hors liste blanche sont éliminés à la passerelle |
| D1 / KV / R2 | Base SQLite en périphérie, stockage clé-valeur répliqué mondialement et stockage d'objets compatible S3 de Cloudflare, portant respectivement les données structurées, le cache de sessions et les blobs de pièces jointes |
| Télémétrie | Le fait pour un logiciel de renvoyer automatiquement des données d'usage à son développeur. Le code source du Service est à télémétrie zéro et ne renvoie aucune donnée d'instance vers l'amont |
| Suppression logique / suppression physique | La suppression logique désigne le marquage comme supprimé, réversible par l'administrateur ; la suppression physique désigne le retrait du support de stockage avec les pièces jointes et les index, sans possibilité de restauration |

## 3. Autres

Les termes non définis sur la présente page s'interprètent selon le contexte de la [Politique de confidentialité](/fr/mail/privacy-policy/) et des [Conditions d'utilisation](/fr/mail/terms-of-service/), ainsi que selon les usages juridiques et techniques courants. En cas de doute sur une définition, adressez vos questions par les canaux énumérés à la section 14 de la [Politique de confidentialité](/fr/mail/privacy-policy/).
