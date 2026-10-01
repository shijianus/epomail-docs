---
title: Spécifications des e-mails officiels et architecture anti-falsification
description: Spécifications des e-mails système officiels d'EpoCanvas Mail, 16 notifications de sécurité hiérarchisées, protection de l'expéditeur, livraison immuable et intégrité.
---

# Spécifications des e-mails officiels et architecture anti-falsification

**Date d'entrée en vigueur : 1er octobre 2026 | Version : 5.5**

Conformément à l'[Aperçu de la confidentialité et des conditions](/mail/overview/) et au [Traitement des données et sécurité](/mail/data-security/), ce document détaille le cadre d'émission des e-mails officiels, les spécifications des avis de sécurité, la protection de l'expéditeur en périphérie, la livraison immuable par instantané, l'isolation en bac à sable côté client, ainsi que les mécanismes de vérification cryptographique anti-falsification pour EpoCanvas Mail.

La version de référence officielle de tous les documents légaux et techniques de ce site est la version en chinois traditionnel (Taïwan) ; les autres versions linguistiques ne sont fournies qu'à titre informatif. En cas de divergence, la version en chinois traditionnel prévaudra.

![Architecture anti-falsification et d'authentification officielle d'EpoCanvas Mail : protection de l'expéditeur en périphérie, pipeline de livraison immuable, isolation Shadow DOM côté client et manifeste SHA-256](/images/mail/anti-tamper-architecture.svg)

*Figure : Architecture de sécurité et de certification officielle du système. Le premier niveau verrouille l'expéditeur officiel en périphérie ; le deuxième niveau fige les instantanés immuables sous chiffrement AES-256-GCM ; le troisième niveau assure l'isolation Shadow DOM côté client et la vérification SHA-256 en direct via Web Crypto.*

## 1. Protection et authentification de l'expéditeur officiel

Afin d'éliminer définitivement les risques d'hameçonnage et d'usurpation d'identité, le service met en œuvre un canal d'isolation privilégié en périphérie séparant strictement les communications système des flux utilisateurs :

1. **Verrouillage exclusif de l'adresse officielle** : Tous les messages de bienvenue, annonces globales et alertes de sécurité sont émis de manière stricte et exclusive depuis l'adresse certifiée `announcement@epocanvas.com` ;
2. **Interception des usurpations en périphérie** : La passerelle Cloudflare Workers applique un filtrage strict. Tout expéditeur externe ou appel interne non privilégié tentant d'émettre en tant que `announcement@epocanvas.com` est immédiatement bloqué avec une erreur HTTP 403 ;
3. **Badge certifié et coche bleue officielle (`isOfficial: 1`)** : Seuls les messages générés par les pipelines système privilégiés reçoivent l'attribut infalsifiable `isOfficial = 1`, déclenchant l'affichage du bouclier bleu officiel et de la bannière certifiée dans l'interface ;
4. **Cycle de vie et règles de rétention** : Les e-mails de bienvenue sont marqués pour suivi et purgés automatiquement après 7 jours ; les notifications d'incidents de sécurité majeurs sont archivées de manière permanente dans la base de données.

## 2. Système d'avis de sécurité (16 catégories d'événements)

Le service intègre les mutations d'état critiques dans une échelle défensive à 4 niveaux (L1 à L4), établissant une matrice de notification en temps réel couvrant 16 événements distincts. La mise en page adopte un design d'ingénierie épuré sans formulation artificielle, intégrant un bouclier vectoriel SVG, des cartes d'action bilatérales (confirmation d'action légitime vs remédiation d'urgence) et un bouton d'action sombre vers le centre de sécurité :

| Niveau | Code d'événement | Scénario de déclenchement et contexte | Métadonnées et paramètres injectés | Étoile auto |
| --- | --- | --- | --- | --- |
| L1 | NEW_DEVICE_LOGIN | Première connexion depuis un nouvel appareil ou navigateur | Horodatage, IP, Localisation, Appareil, Navigateur | Non |
| L1 | NEW_LOCATION_LOGIN | Connexion depuis une nouvelle ville ou un nouveau pays | Horodatage, IP, Pays et Ville, Opérateur réseau | Non |
| L1 | NEW_NETWORK_LOGIN | Connexion depuis un nouveau système autonome (ASN) ou FAI | Horodatage, IP, Numéro ASN, Nom de l'opérateur | Non |
| L2 | PASSWORD_CHANGED | Mot de passe de connexion au compte modifié avec succès | Horodatage, IP, Localisation, Appareil et Navigateur | Non |
| L2 | PAT_CREATED | Nouveau jeton d'accès personnel (PAT) généré pour l'API | Nom du jeton, Étendue des accès, Durée de validité | Non |
| L2 | PAT_REVOKED | Jeton d'accès personnel révoqué manuellement ou expiré | Nom du jeton, Date de révocation, Appareil client | Non |
| L2 | OAUTH_AUTHORIZED | Application OAuth 2.0 autorisée à accéder à la boîte mail | Nom de l'application, Permissions, Identifiant client | Non |
| L2 | OAUTH_REVOKED | Autorisation accordée à une application OAuth 2.0 révoquée | Nom de l'application, Date de révocation, Infos client | Non |
| L3 | TOTP_ENABLED | Authentification à deux facteurs (RFC 6238) activée | Horodatage, IP, Date d'activation, Codes de secours | Oui |
| L3 | TOTP_DISABLED | Authentification à deux facteurs désactivée (mot de passe seul) | Horodatage, IP, Appareil, Consignes de sécurité | Oui |
| L3 | PASSKEY_ADDED | Nouvelle clé d'accès (Passkey FIDO2 / WebAuthn) ajoutée | Nom de la clé d'accès, Type d'authentificateur | Oui |
| L3 | PASSKEY_REMOVED | Clé d'accès précédemment enregistrée supprimée | Nom de la clé d'accès, Date de suppression | Oui |
| L3 | AUTO_FORWARD_CHANGED | Règle de transfert automatique d'e-mails configurée | Adresse de destination, Filtres, État activé | Oui |
| L3 | STORAGE_PURGED | Configuration du stockage personnalisé (BYO) réinitialisée | Horodatage, IP opératrice, État de repli | Oui |
| L4 | ACCOUNT_LOCKED | Seuil d'échecs de connexion atteint (blocage 12h) | Tentatives échouées, Durée de blocage, IP | Oui |
| L4 | ACCOUNT_DELETED | Suppression du compte demandée ou purge programmée | Horodatage de la demande, Nombre d'alias, Délai | Oui |

Pour prémunir les utilisateurs contre la fatigue des alertes, une empreinte environnementale (retenant les 15 derniers appareils, emplacements et réseaux) est maintenue dans KV, imposant une fenêtre de silence d'une heure pour les événements identiques.

## 3. Livraison immuable et bac à sable client anti-falsification

Les communications officielles s'exécutent au moyen de protocoles de transfert immuables et d'une isolation en bac à sable côté client, garantissant qu'aucun intermédiaire ne puisse altérer les messages :

1. **Livraison immuable par instantané (Immutable Delivery)** : Les e-mails système sont figés dans la base de données lors de leur envoi et ne sont pas traduits dynamiquement lorsque le destinataire modifie sa langue d'interface ;
2. **Repli symétrique vers les modèles pré-traduits** : Le moteur multilingue pré-compile les traductions officielles. Lorsqu'un message correspond au modèle certifié, la traduction validée est servie directement ; en cas d'altération, le système bascule élégamment vers l'IA ;
3. **Isolation physique par Shadow DOM** : Le client web encapsule le corps des e-mails dans un Shadow DOM hermétique, empêchant les styles parents et les scripts globaux d'interférer ;
4. **Filtrage strict DOMPurify** : Les balises `<script>`, `<style>`, `<iframe>`, `<object>`, `<embed>`, `<form>` et les gestionnaires d'événements inline sont neutralisés, prévenant toute tentative de XSS ou de falsification visuelle.

## 4. Dispositif anti-falsification et de vérification des documents

Le site de documentation officielle (`epomail-docs`) intègre un mécanisme ouvert de contrôle d'intégrité par hachage cryptographique permettant à chaque utilisateur de vérifier l'authenticité des pages :

| Dimension défensive | Mécanisme technique | Critère de vérification | Menace neutralisée |
| --- | --- | --- | --- |
| Manifeste déterministe | `public/tamper-proof.json` | Hachage SHA-256 et taille en octets | Altération de miroir, substitution de document |
| Traçabilité des versions | Objet arborescent Git Commit | SHA du commit Git et signature PGP | Révisions non autorisées, falsification historique |
| Vérification dans le navigateur | API Web Crypto en mémoire | `crypto.subtle.digest('SHA-256')` | Injection intermédiaire (MITM), pollution de cache |
| Audit hors ligne en terminal | Outils OpenSSL / sha256sum | Comparaison locale des fichiers Markdown | Audits hors ligne, conformité réglementaire |
| Origine officielle vérifiée | `https://docs.epocanvas.com/epomail` | Validation DNSSEC et certificats TLS | Sites miroirs malveillants, portails trompeurs |

:::tip[Guide de vérification en direct]
Un panneau interactif « 🛡️ Vérification officielle anti-falsification et intégrité » est intégré en bas de chaque page de documentation. Cliquer sur « 🔍 Vérifier l'intégrité de la page en direct » calcule instantanément l'empreinte SHA-256 en mémoire locale et la compare au manifeste officiel. La commande `curl -sSL https://docs.epocanvas.com/epomail/tamper-proof.json | jq .` permet la même opération en ligne de commande.
:::

## 5. Délimitation des responsabilités et signalement de sécurité

1. **Responsabilité de l'instance hébergée** : L'émission sécurisée des e-mails, l'authentification de l'expéditeur et l'intégrité de la documentation sur `mail.epocanvas.com` relèvent de l'équipe d'exploitation officielle ;
2. **Responsabilité de l'auto-hébergement** : Les exploitants déployant une instance autonome configurent leurs propres ressources Cloudflare et doivent protéger leurs clés conformément au document [Traitement des données et sécurité](/mail/data-security/) ;
3. **Canaux de signalement et d'assistance** : En cas de détection d'e-mail falsifié, d'anomalie de vérification ou de faille potentielle, contactez immédiatement :
   - Centre de sécurité et canal officiel : `announcement@epocanvas.com`
   - Délégué à la protection des données : `privacy@epocanvas.com`
