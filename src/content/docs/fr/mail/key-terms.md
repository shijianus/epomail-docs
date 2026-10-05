---
title: Définitions
description: Définitions des termes techniques et juridiques employés dans les documents juridiques d'EpoCanvas Mail — définitions générales du droit de la protection des données, interprétées selon l'architecture du Service.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.14**

La présente page définit les termes employés dans les documents juridiques du présent site. Les termes juridiques suivent les définitions générales du droit de la protection des données ; les termes techniques s'interprètent d'après la mise en œuvre réelle du code open source du Service.

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Les documents juridiques et techniques du présent site visent à établir des normes de communication communautaires non commerciales, transparentes et rigoureuses.

![Carte du glossaire : termes juridiques (responsable du traitement, sous-traitant, personne concernée, finalité déterminée, etc.) et termes techniques (instance, D1/KV/R2, chiffrement au repos, zéro télémétrie, etc.) — deux familles de définitions utilisées de manière cohérente dans tous les documents, interprétées selon l’usage général de la protection des données et l’implémentation open source réelle](/images/mail/fr/key-terms-glossary.svg)

*Figure : la relation entre les deux familles de définitions de cette page. Les termes juridiques suivent l’usage général de la protection des données ; les termes techniques sont interprétés selon l’implémentation open source réelle ; les termes non listés se lisent dans le contexte de la Politique de confidentialité et des Conditions d’utilisation.*
## 1. Termes juridiques

| Terme | Définition |
| --- | --- |
| Données personnelles | Le nom, la date de naissance, les coordonnées, les activités sociales d'une personne physique et toute autre donnée permettant d'identifier cette personne directement ou indirectement. Pour le Service, il s'agit principalement de l'adresse électronique, des identifiants de compte et des journaux d'activité en ligne |
| Données personnelles hautement sensibles | Les données personnelles concernant les dossiers médicaux, les soins médicaux, la génétique, la vie sexuelle, les bilans de santé et les antécédents judiciaires, qui constituent des catégories hautement sensibles dont le traitement est soumis à des restrictions strictes dans la plupart des juridictions |
| Collecte / traitement / utilisation | La collecte désigne l'obtention de données personnelles par quelque moyen que ce soit ; le traitement, les opérations d'enregistrement, d'entrée, de stockage, d'édition, de correction, de copie, de recherche, de suppression, de sortie, de liaison ou de transmission interne effectuées pour constituer ou exploiter un fichier de données personnelles ; l'utilisation, l'emploi des données personnelles collectées à d'autres fins que le traitement |
| Responsable du traitement | Le sujet qui détermine les finalités et les modalités de la collecte, du traitement et de l'utilisation des données personnelles ; en font partie l'Opérateur d'une instance hébergée et le déployeur d'une instance auto-hébergée |
| Sous-traitant | Le sujet qui traite des données personnelles sur instruction du responsable du traitement et pour son compte (Cloudflare, Resend, par exemple) |
| Personne concernée | La personne physique identifiée par les données personnelles, désignée comme « vous » dans les documents du présent site |
| Transfert international | Le traitement ou l'utilisation de données personnelles par-delà les frontières (pays) ; suit les exigences du droit applicable et les mécanismes de garantie tels que les clauses contractuelles types |
| Devoir d'information | Lors de la collecte de données personnelles auprès de la personne concernée, l'obligation de notifier expressément des éléments tels que l'identité du collecteur, les finalités de la collecte, les catégories de données, la durée, la zone, les destinataires et les modalités d'utilisation, les droits dont la personne concernée peut se prévaloir et les conséquences d'un défaut de fourniture ; lorsque les données ne proviennent pas de la personne concernée, leur source est notifiée avant tout traitement ou utilisation |
| Finalité spécifique | La finalité spécifique devant exister pour collecter ou traiter des données personnelles ; l'utilisation doit en outre demeurer dans le périmètre nécessaire de cette finalité spécifique |
| Droit d'opposition au marketing | Dès que la personne concernée manifeste son refus de recevoir du marketing, l'utilisation de ses données personnelles à des fins de marketing cesse immédiatement ; lors du premier marketing, le moyen d'exprimer le refus est fourni |
| Autorité de contrôle | L'autorité qui supervise la protection des données personnelles selon le droit applicable ; pour l'instance hébergée, située à Taïwan, il s'agit de la Commission de protection des données personnelles |
| Image sexuelle non consensuelle | L'image sexuelle d'autrui enregistrée, reproduite ou diffusée sans consentement, ainsi que l'image sexuelle fabriquée par synthèse informatique ou moyens similaires ; leur enregistrement, leur reproduction ou leur diffusion sans consentement constitue une infraction dans la plupart des juridictions, et la plateforme, dès notification, restreint préalablement la consultation ou les retire |
| Exploitation sexuelle d'enfants et d'adolescents | Les comportements d'exploitation sexuelle d'enfants ou d'adolescents, y compris photographier, fabriquer, reproduire, détenir, diffuser, transmettre, remettre, exposer publiquement, vendre ou faire payer la consultation d'images sexuelles d'enfants ou d'adolescents |
| Droit applicable | Le droit applicable au contrat, déterminé par le lieu où réside l'Opérateur ; la section 11 des [Conditions d'utilisation](/fr/mail/terms-of-service/) établit le droit applicable de chaque instance |
| Clauses contractuelles types | Une convention conclue au moyen de clauses générales à l'égard d'une pluralité de personnes non déterminées ; les parties manifestement déloyales ne lient pas selon le droit applicable |

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
| BYOS (stockage à apporter) | mécanisme consistant à placer les pièces jointes dans un stockage objet compatible S3 appartenant à l'Opérateur ou à la personne concernée (Backblaze B2, Wasabi, etc.) ; les identifiants de stockage sont conservés par le configurateur |
| Workers AI | service d'inférence en périphérie de Cloudflare ; utilisé pour l'extraction des codes de vérification et les autres traitements d'IA — déclencheurs et périmètre de données à la section 6 de la [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Turnstile | mécanisme de vérification humaine de Cloudflare ; évalue la fiabilité du navigateur à l’inscription et à la création de boîtes, sans cookie publicitaire ni suivi intersites |
| Protection SSRF | blocage du Server-Side Request Forgery ; les requêtes vers des points de terminaison externes sont systématiquement validées contre des adresses publiques, et les adresses de bouclage, de réseaux privés et de métadonnées cloud sont rejetées |

## 3. Autres

Les termes non définis sur la présente page s'interprètent selon le contexte de la [Politique de confidentialité](/fr/mail/privacy-policy/) et des [Conditions d'utilisation](/fr/mail/terms-of-service/), ainsi que selon les usages juridiques et techniques courants. En cas de doute sur une définition, adressez vos questions par les canaux énumérés à la section 14 de la [Politique de confidentialité](/fr/mail/privacy-policy/).
