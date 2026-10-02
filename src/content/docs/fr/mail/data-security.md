---
title: Traitement des Données et Maintien de la Sécurité
description: Sécurité globale des données, gouvernance duale hébergée et open source, et conformité réglementaire d'EpoCanvas Mail.
---

**Date d'entrée en vigueur : 1er octobre 2026 | Versions archivées | Version : 5.6**

Lorsque vous utilisez EpoCanvas Mail, vous nous confiez la protection de vos communications et de vos informations personnelles. Nous mesurons l'importance de cette responsabilité et mettons tout en œuvre pour sécuriser vos données, préserver une transparence totale et vous garantir une souveraineté et un contrôle absolus sur vos informations à chaque instant.

Le présent document est régi par notre [Politique de Confidentialité](/fr/mail/privacy-policy/) et nos [Conditions d'Utilisation](/fr/mail/terms-of-service/). Il constitue le guide de référence pour les utilisateurs de notre service officiel hébergé (mail.epocanvas.com), tout en définissant avec précision les frontières juridiques du projet open source (epocanvas-mail) et la responsabilité exclusive des exploitants auto-hébergés en tant que responsables de traitement indépendants.

<div class="privacy-checkup-row">
  <div class="privacy-checkup-icon">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#E8F0FE"/>
      <path d="M20 9L29 13V19C29 24.5 25.2 29.6 20 31C14.8 29.6 11 24.5 11 19V13L20 9Z" fill="#1967D2"/>
      <path d="M17 20L19.2 22.2L23.8 17.6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="privacy-checkup-content">
    <div class="privacy-checkup-title">Guide rapide de sécurité et de confidentialité</div>
    <div class="privacy-checkup-desc">Vous souhaitez vérifier l'état de sécurité de votre messagerie, configurer des clés de sécurité FIDO2, activer le 2FA (TOTP) ou exporter vos données ?</div>
    <a href="/fr/mail/overview/" class="privacy-checkup-link">Consulter l'aperçu de sécurité ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. Nous intégrons la sécurité au cœur de nos services pour protéger vos données

Toutes les données traitées au sein de notre infrastructure officielle hébergée dans le cloud (mail.epocanvas.com) bénéficient d'une protection continue assurée par plusieurs couches de défense en profondeur. Nous détaillons l'intégralité du cycle de traitement pour vous permettre de vérifier nos garanties techniques.

<div class="google-illustration-container">
  <img src="/images/mail/security-trust-shield.svg" alt="Garanties de sécurité et de confiance d'EpoCanvas Mail" width="416" height="276" />
</div>

### 1.1 Chiffrement en transit et protection des canaux réseau

Nous appliquons de manière stricte le protocole de sécurité moderne TLS 1.3 avec préchargement HSTS sur toutes les connexions entrantes et sortantes. Qu'il s'agisse de l'interface web, d'appels à l'API REST authentifiée ou de relais de messages entre serveurs, vos communications demeurent chiffrées en transit, prévenant toute écoute clandestine ou interception.

### 1.2 Exécution éphémère en périphérie et isolation en mémoire vive

Lorsque vous recevez ou envoyez des messages, la logique métier s'exécute de façon instantanée dans les nœuds périphériques de Cloudflare Workers (isolats V8) les plus proches de votre position géographique. Les données déchiffrées ne résident que dans la mémoire vive volatile pendant le traitement et l'environnement est physiquement détruit en quelques nanosecondes dès son achèvement, sans aucune écriture sur disque physique.

### 1.3 Chiffrement au repos de niveau industriel (AES-256-GCM)

Avant toute écriture persistante dans la base de données relationnelle Cloudflare D1, les corps d'e-mails et les métadonnées sensibles sont chiffrés à l'aide de vecteurs d'initialisation (IV) uniques et dynamiques via l'algorithme AES-256-GCM avec étiquette d'authentification (Auth Tag). Les clés de chiffrement sont injectées de manière sécurisée au moment de l'exécution, sans être stockées dans les dépôts de code.

### 1.4 Hachage robuste des identifiants et clés d'accès matérielles

Les mots de passe ne sont jamais stockés en clair ni sous forme de hachages simples : ils font l'objet de 100 000 itérations PBKDF2 avec des sels cryptographiques aléatoires à haute entropie. Les secrets de double authentification (TOTP) sont chiffrés au repos à l'aide de la clé principale. Le système prend en charge nativement les clés d'accès WebAuthn / FIDO2 (Passkeys), dont la clé privée demeure scellée dans l'enclave sécurisée de l'appareil de l'utilisateur.

### 1.5 Matrice complète de traitement des données

Le tableau suivant récapitule l'ensemble des catégories de données collectées, les finalités de traitement, les supports de stockage et les durées de conservation :

| Catégorie de données | Éléments collectés | Finalité principale | Support de stockage et sécurité | Durée de conservation et purge |
| --- | --- | --- | --- | --- |
| **Identifiants de compte** | Adresse e-mail, nom d'utilisateur, hachage et sel de mot de passe, clé TOTP, clé publique Passkey | Inscription, connexion, double authentification, récupération de compte | Cloudflare D1 ; PBKDF2 (100k itérations), TOTP chiffré en repos AES | Conservé jusqu'à résiliation ; effacement physique irréversible lors de la suppression |
| **Communications** | Expéditeur, destinataires, CC/CCI, objet, horodatages, libellés, corps des e-mails | Acheminement, organisation de la messagerie, indexation de recherche | Cloudflare D1 (métadonnées) ; corps scellé en AES-256-GCM | Contrôlé par l'utilisateur ; corbeille conservée 7 jours avant écrasement définitif |
| **Données réseau et appareil** | IP d'inscription, IP récente, système d'exploitation, User-Agent, modèle | Audit de sécurité, détection des anomalies, prévention des attaques par force brute | Cloudflare D1 ; accès strictement réservé aux audits administratifs | Conservé jusqu'à suppression du compte |
| **Session et autorisations** | Jetons de session JWT, rôles RBAC, contexte de boîte active | Authentification passerelle API en périphérie, routage | Cloudflare KV ; durée de validité maximale de 30 jours | Révoqué immédiatement à la déconnexion ; expire après 30 jours d'inactivité |
| **Pièces jointes** | Nom d'origine, type MIME, taille en octets, flux binaire | Transfert de fichiers, prévisualisation intégrée, téléchargement sécurisé | Compatible S3 au choix, Cloudflare R2 ou KV ; servi avec en-têtes défensifs | Suit le cycle de l'e-mail parent ; purgé lors de la suppression définitive |
| **Empreintes de sécurité** | Appareils reconnus, zone géographique (Geo), ASN réseau, horodatages anti-fatigue | Détection des connexions inhabituelles, prévention du vol d'identifiants | Cloudflare KV (préfixe `USER_KNOWN_ENV_`) ; 15 dernières empreintes | Purgé après 90 jours d'inactivité ou lors de la suppression du compte |

:::caution[Portée du chiffrement, limites techniques et appréciation des risques par l'utilisateur]
Le chiffrement fourni sur notre plateforme officielle hébergée dans le cloud correspond à un **chiffrement au repos côté serveur (Server-side Encryption at Rest)**. Les clés de déchiffrement résident dans l'environnement d'exécution sécurisé pendant le traitement actif des messages. Ce mécanisme protège contre le vol physique de disques ou l'extraction de sauvegardes de bases de données, mais ne constitue pas un chiffrement de bout en bout (E2EE).

Sur le plan technique, les opérateurs disposant des accès d'administration racine de l'infrastructure ont la capacité théorique de déchiffrer les données en mémoire. Nous ne restreignons l'usage du service à personne, mais les utilisateurs doivent être pleinement conscients de leurs risques : si vos échanges relèvent du secret d'État ou d'exigences absolues de confidentialité zéro confiance, **vous devez recourir à des outils cryptographiques côté client (tels que GPG / OpenPGP) pour chiffrer vos messages localement avant leur transmission**.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Gouvernance à double nature : Service hébergé et projet open source

EpoCanvas Mail possède une identité duale : il s'agit à la fois d'un service de messagerie hébergé gratuit accessible au public et d'un projet logiciel open source sous licence MIT. Établir des démarcations claires entre ces deux aspects est indispensable au bon fonctionnement de l'écosystème.

<div class="google-illustration-container">
  <img src="/images/mail/dual-nature-scale.svg" alt="Équilibre de gouvernance à double nature d'EpoCanvas Mail" width="416" height="276" />
</div>

### 2.1 Engagements de la plateforme officielle hébergée (mail.epocanvas.com)

L'instance officielle `mail.epocanvas.com` est gérée par l'équipe principale à titre d'initiative d'intérêt public. Nous nous engageons à maintenir une haute disponibilité, une absence totale de publicités commerciales, une politique stricte de zéro traçage et le respect des normes d'intégrité cryptographique.

En raison de sa gratuité, le service n'est assorti d'aucun engagement commercial de niveau de service (SLA). Nous déclinons toute responsabilité indirecte en cas de défaillance majeure de l'infrastructure dorsale (coupure de réseau Cloudflare) ou de compromission locale d'un appareil utilisateur. Les utilisateurs demeurent responsables de la sauvegarde régulière de leurs communications essentielles.

### 2.2 Ce que nous attendons de vous et règles anti-abus

Nous souhaitons offrir à tous un cadre de communication fiable et sécurisé. En accédant à notre service hébergé, vous acceptez de vous conformer aux exigences suivantes :

*   **Respecter les lois applicables** : Ne pas exploiter le service pour contourner les contrôles à l'exportation, les sanctions financières ou enfreindre des droits légitimes ;
*   **Tolérance zéro envers le spam** : Il est strictement interdit d'envoyer des courriers publicitaires non sollicités, des campagnes de prospection massive ou des messages de harcèlement ;
*   **Interdiction d'hameçonnage et d'attaques** : Ne propager aucun logiciel malveillant, ne pas usurper l'identité d'institutions et ne pas mener d'attaques par injection contre nos systèmes ;
*   **Absence d'exploitation automatisée** : Ne pas créer de comptes en masse via des scripts automatisés ni tenter de contourner les quotas de requêtes. Tout compte en infraction sera résilié sans délai.

### 2.3 Licence open source, adaptations et redistribution

L'intégralité du code source d'EpoCanvas Mail est distribuée sous licence permissive MIT. Tout individu ou organisme dispose de la liberté d'auditer, de forker, de modifier ou de déployer des instances privées.

En cas de redistribution ou d'adaptation du code, trois règles légales doivent être respectées :

*   **Protection de la marque officielle** : Sauf autorisation préalable écrite, aucun déploiement tiers ne peut utiliser la mention « EpoCanvas Mail Officiel » ou nos logos officiels pour désigner son instance ;
*   **Conservation des mentions de copyright** : Toute copie ou version modifiée doit intégrer la mention originale de copyright et le texte complet de la licence MIT ;
*   **Transparence de l'exploitant indépendant** : Tout tiers proposant des services de messagerie basés sur ce code doit afficher clairement sa propre identité juridique et ses propres conditions de service.

### 2.4 Responsabilité exclusive d'exploitant pour les nœuds auto-hébergés

Il s'agit d'une frontière juridique fondamentale :

Lorsqu'un tiers installe le code sur son propre compte Cloudflare ou sur ses propres serveurs, **cet exploitant devient le seul et unique responsable de traitement (Data Controller) pour son instance**.

Les développeurs d'origine ne disposent d'aucune porte dérobée, ne collectent aucune télémétrie et n'ont ni la capacité technique ni le mandat légal d'intervenir sur les données d'instances tierces. Tout incident de sécurité, fuite de données ou contentieux survenant sur un nœud auto-hébergé **relève de la responsabilité exclusive de son exploitant indépendant, sans responsabilité solidaire des auteurs d'origine**.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Contrôle de vos données : Exportation, suppression et conformité internationale

EpoCanvas Mail s'adresse aux utilisateurs du monde entier. Quel que soit votre lieu de résidence, vous conservez la pleine propriété et la maîtrise de vos échanges.

<div class="google-illustration-container">
  <img src="/images/mail/data-sovereignty-export.svg" alt="Souveraineté des données et droits d'exportation dans EpoCanvas Mail" width="416" height="276" />
</div>

### 3.1 Plein exercice des droits au titre du RGPD de l'Union européenne

Pour les personnes résidant dans l'Espace économique européen (EEE), nous garantissons l'exercice effectif des droits prévus aux articles 15 à 22 du RGPD :

*   **Droit d'accès (Article 15)** : Vous pouvez à tout moment consulter vos données de compte, vos journaux d'accès et vos courriers enregistrés ;
*   **Portabilité des données et export (Article 20)** : Vous pouvez télécharger une copie intégrale de vos e-mails au format standard `.eml` accompagnée d'archives de métadonnées JSON structurées ;
*   **Droit à l'effacement / Droit à l'oubli (Article 17)** : Lorsque vous supprimez votre compte, le système clôt vos sessions et détruit de façon cryptographique la clé de chiffrement au niveau physique, empêchant toute récupération ultérieure ;
*   **Clauses contractuelles types (CCT)** : Les relais transfrontaliers en périphérie s'appuient sur les Clauses Contractuelles Types de la Commission européenne et les accords de traitement des données de notre infrastructure.

### 3.2 Engagements au titre du California Consumer Privacy Act (CCPA / CPRA)

Pour les résidents de Californie et des États-Unis, nous affirmons solennellement :

*   **Absence de vente ou de partage de données personnelles (Do Not Sell or Share)** : Au cours des 12 derniers mois, nous n'avons jamais vendu, loué ni partagé la moindre donnée personnelle avec des courtiers en données ou des régies publicitaires ;
*   **Usage limité des données sensibles** : Les informations collectées servent exclusivement au fonctionnement du service de messagerie et jamais à de la publicité comportementale ni à l'entraînement de modèles d'IA tiers ;
*   **Garantie de non-discrimination** : Vous ne ferez l'objet d'aucune dégradation de service ou restriction de quota si vous choisissez d'exercer vos droits légaux en matière de confidentialité.

### 3.3 Région Asie-Pacifique et conscience des relais internationaux

L'équipe d'exploitation officielle est établie à Taïwan et se conforme à la loi locale de protection des données personnelles (PDPA). Les utilisateurs doivent appréhender la réalité technique du protocole SMTP :

Le courrier électronique repose sur un réseau décentralisé à l'échelle mondiale. Lors d'échanges avec des destinataires situés à l'étranger, les flux transitent par des dorsales internationales soumises aux législations des pays traversés. Il est conseillé de sécuriser vos terminaux locaux et d'activer les clés d'accès FIDO2.

### 3.4 Procédure d'urgence en 72 heures et canaux de contact officiels

Nous appliquons une procédure opérationnelle standardisée (SOP) de gestion des incidents de sécurité :

*   **Endiguement rapide** : En cas de détection d'une menace, la passerelle bloque les IP hostiles et révoque les jetons de session en quelques minutes ;
*   **Notification légale sous 72 heures** : Si un incident avéré affecte des données personnelles, nous informerons les personnes concernées par e-mail et publication web sous 72 heures, tout en le signalant aux autorités compétentes ;
*   **Correctifs open source** : L'équipe publiera les correctifs nécessaires sur le dépôt public accompagnés d'avis de sécurité officiels (Security Advisories).

Pour toute question de sécurité, signalement de vulnérabilité ou demande relative aux données personnelles, utilisez nos coordonnées officielles :

*   **Centre d'intervention de sécurité** : `announcement@epocanvas.com`
*   **Bureau de protection des données** : `privacy@epocanvas.com`
