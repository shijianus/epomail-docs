---
title: Traitement des Données et Maintenance de la Sécurité
description: Cycle de vie des données, matrice de traitement, architecture de défense en profondeur, gouvernance duale et conformité mondiale d'EpoCanvas Mail.
---

**Date d'entrée en vigueur : 1er octobre 2026 | Version : 5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail défend la philosophie selon laquelle « la vie privée est un droit fondamental » et « le code fait office de contrat ». Nous avons conçu une architecture de gouvernance à « double nature fusionnée », associant un service cloud géré et un projet logiciel open source autonome. Ce document détaille l'intégralité du cycle de vie des données, notre matrice de stockage cryptographique, notre ingénierie de défense en profondeur en quatre couches ainsi que nos frontières de conformité multijuridictionnelle.
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ Zéro télémétrie (Zero Telemetry)</span>
    <span class="google-pill">🔐 Chiffrement au repos AES-256-GCM</span>
    <span class="google-pill">⚡ Exécution périphérique éphémère (V8)</span>
    <span class="google-pill">🌐 Conformité mondiale (RGPD / CCPA)</span>
  </div>
</div>

Le présent document est régi par notre [Politique de Confidentialité](/fr/mail/privacy-policy/) et nos [Conditions d'Utilisation](/fr/mail/terms-of-service/). Il sert de référence aux utilisateurs vérifiant les garanties de confidentialité, de socle opérationnel pour les administrateurs de nœuds indépendants et de cadre de référence pour les autorités de contrôle.

## 1. Cycle de vie des données et modèle de traitement en périphérie

Les données à caractère personnel et les flux de messagerie sont strictement articulés autour de six phases opérationnelles : Collecte, Traitement, Exploitation, Transfert, Conservation et Destruction cryptographique. Chaque phase s'exécute sans état sur le réseau Anycast périphérique de Cloudflare, excluant tout résidu sur disque ou accès latéral abusif.

![Traitement des données et cycle de vie de bout en bout d'EpoCanvas Mail : Collecte sans état, exécution périphérique en isolats V8, chiffrement d'enveloppe AES-256-GCM, stockage échelonné et broyage cryptographique](/images/mail/data-security-pipeline.svg)

*Figure 1 : Pipeline complet du cycle de vie des données. Les principes de minimisation et d'isolation cryptographique stricte s'appliquent à chaque étape ; définitions légales à la section 5 de la [Politique de Confidentialité](/fr/mail/privacy-policy/).*

### 1.1 Collecte minimale et engagement de zéro télémétrie

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Collecte minimale et zéro télémétrie commerciale</div>
    <span class="google-pill">Minimisation des données · Zéro profilage</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Minimisation rigoureuse</strong> : Au-delà des identifiants strictement nécessaires à l'enregistrement et à l'acheminement (nom d'utilisateur, alias de messagerie) et des identifiants d'authentification, le système ne recueille jamais de carnet d'adresses, de presse-papiers, de capteurs gyroscopiques ni de données de navigation intersites.</p>
    <p><strong>Zéro télémétrie sans concession</strong> : EpoCanvas Mail applique une politique absolue de « zéro télémétrie comportementale », tant sur son instance hébergée que dans son code source ouvert. Aucun kit d'analyse commerciale (SDK), pixel publicitaire ou script de surveillance tiers n'est intégré ; les opérations se déroulent exclusivement dans votre boîte locale isolée.</p>
  </div>
</div>

### 1.2 Exécution périphérique éphémère et isolation mémoire

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚡ Calcul périphérique éphémère et bacs à sable en nanosecondes</div>
    <span class="google-pill">Cloudflare V8 · Zéro écriture sur disque</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Isolats V8 sans état</strong> : Dès réception d'un message ou requête d'un utilisateur, la logique métier s'exécute instantanément sur le nœud périphérique Cloudflare Workers le plus proche (isolat V8), l'environnement étant physiquement détruit en quelques nanosecondes dès son achèvement.</p>
    <p><strong>Zéro persistance sur disque hôte</strong> : Les charges déchiffrées et contextes de routage ne résident que dans la mémoire vive volatile et ne sont jamais écrits sur des disques physiques, neutralisant ainsi les fuites de processus résidents ou les attaques par canaux auxiliaires entre locataires.</p>
  </div>
</div>

### 1.3 Destruction cryptographique et droit à l'oubli irrévocable

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🗑️ Broyage cryptographique et garantie d'effacement définitif</div>
    <span class="google-pill">Délai de sécurité 7j · Écrasement des clés</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Délai de rétention de 7 jours et purge planifiée</strong> : Les messages placés dans la corbeille bénéficient d'un délai de sécurité de 7 jours contre les suppressions accidentelles avant d'être écrasés physiquement par des tâches Cron périphériques ; tout dépassement de 90 % du quota déclenche une purge physique immédiate des éléments supprimés.</p>
    <p><strong>Broyage cryptographique des clés maîtresses</strong> : Lors de la résiliation d'un compte, les index sont supprimés des bases relationnelles D1 et des mémoires KV, et les clés de chiffrement sont écrasées dans le stockage physique, garantissant l'extinction mathématique et définitive des informations.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Matrice de traitement des données et spécifications de stockage

Le tableau ci-dessous recense l'ensemble des catégories de données, rubriques collectées, finalités de traitement, supports de stockage sous-jacents et règles de conservation selon des contrôles cryptographiques échelonnés :

| Catégorie de données | Éléments spécifiques | Finalité du traitement | Support de stockage et norme | Conservation et destruction |
| --- | --- | --- | --- | --- |
| Identifiants de compte | Adresse courriel, nom d'utilisateur, hachage/sel de passe, clé TOTP (chiffrée AES), hachages de secours, clé publique Passkey | Inscription, vérification, 2FA, récupération de compte | Cloudflare D1 ; mot de passe PBKDF2 (100 000 itérations avec sel), chiffrement statique TOTP | Jusqu'à clôture du compte ; suppression physique immédiate |
| Données réseau et appareil | IP d'inscription, IP de dernière connexion, système d'exploitation, User-Agent, type de terminal | Audit de sécurité, détection d'anomalies, limitation de débit | Cloudflare D1 ; restreint aux audits d'administration | Jusqu'à suppression physique du compte |
| État de session | Jeton JWT, revendications de rôles RBAC, boîte de messagerie sélectionnée | Autorisation en passerelle périphérique, routage | Cloudflare KV ; durée de validité maximale de 30 jours | Révoqué à la déconnexion ; expire après 30 jours d'inactivité |
| Données de communication | Expéditeur, destinataires, CC/BCC, objet, horodatages, statut de lecture, libellés, étoiles, corps | Distribution de courriels, organisation des fils, recherche | Cloudflare D1 (métadonnées) ; corps chiffré au repos en AES-256-GCM | Contrôlé par l'utilisateur ; corbeille purgée à 7j ; purge auto dès 90 % de quota |
| Pièces jointes | Nom d'origine, type MIME, taille en octets, contenu binaire | Acheminement, prévisualisation, téléchargement sécurisé | Stockage d'objets dédié (ordre : S3 autonome, Cloudflare R2, secours KV) ; en-têtes défensifs | Lié au cycle de vie du courriel ; supprimé physiquement à l'unisson |
| Sécurité et limitations | Échecs de connexion, contrôle de fréquence d'inscription, métriques IA | Défense contre attaques en force brute, lutte anti-abus | Cloudflare KV ; compteurs à fenêtre glissante | Échecs de connexion expirent en 12h ; purges quotidiennes ; métriques IA 60 jours |
| Empreintes d'anomalies | Appareils reconnus, géolocalisation, ASN réseau, repères d'une heure | Détection d'environnements inhabituels, déduplication | Cloudflare KV (préfixe `USER_KNOWN_ENV_`) ; 15 dernières empreintes | Supprimé après 90 jours d'inactivité ou fermeture de compte |
| Préférences d'interface | Langue (6 langues), thème sombre/clair, fanions de notification | Cohérence visuelle | localStorage du navigateur, synchronisation facultative avec D1 | Conservé jusqu'au nettoyage du cache ou réinitialisation |

### 2.1 Dé-identification des identifiants et normes PBKDF2 / WebAuthn

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔐 Protection cryptographique unidirectionnelle et clés matérielles</div>
    <span class="google-pill">PBKDF2 100k · WebAuthn FIDO2</span>
  </div>
  <div class="google-card-desc">
    <p><strong>100 000 itérations d'étirement PBKDF2</strong> : Les mots de passe ne sont jamais conservés en clair ni sous forme de simples empreintes. Le système applique un salage cryptographique aléatoire associé à 100 000 itérations de l'algorithme PBKDF2, assurant une protection mathématique avancée contre les tables arc-en-ciel et attaques massives par GPU.</p>
    <p><strong>Protection matérielle TOTP et clés Passkey</strong> : Les clés secrètes TOTP sont scellées en AES-256-GCM avant stockage ; les clés Passkey reposent sur la cryptographie asymétrique où la clé privée ne quitte jamais l'enclave sécurisée (Secure Enclave) du terminal, éliminant totalement l'hameçonnage et le vol de session.</p>
  </div>
</div>

### 2.2 Découplage du stockage et architecture BYO-Storage

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📦 Stockage modulaire et en-têtes de réponse défensifs</div>
    <span class="google-pill">BYO-S3 · R2 natif · Rebond KV</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Acheminement échelonné du stockage</strong> : Les pièces jointes sont orientées de façon flexible : d'abord vers les compartiments compatibles S3 fournis par l'utilisateur ou l'entreprise (BYO-Storage), puis vers Cloudflare R2, et enfin vers KV comme solution de secours légère. Le modèle BYO confère au propriétaire une souveraineté totale sur ses fichiers.</p>
    <p><strong>En-têtes défensifs de sécurité web</strong> : Tout téléchargement de pièce jointe inclut obligatoirement <code>Content-Disposition: attachment</code> et <code>X-Content-Type-Options: nosniff</code>, interdisant aux navigateurs l'analyse intégrée malveillante et bloquant les attaques par injection de scripts (XSS).</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Modèle de défense en profondeur à quatre niveaux et cryptographie

Afin de prémunir les systèmes contre les menaces complexes d'Internet, EpoCanvas Mail applique un modèle de défense en profondeur échelonné sur quatre niveaux :

![Modèle d'architecture de défense en profondeur à 4 niveaux d'EpoCanvas Mail : Niveau 1 Passerelle périphérique et anti-SSRF, Niveau 2 Authentification FIDO2 Passkeys, Niveau 3 Chiffrement au repos AES-256-GCM, Niveau 4 Bac à sable Shadow DOM et audit d'intégrité](/images/mail/defense-layers-architecture.svg)

*Figure 2 : Modèle technique de défense en profondeur en quatre couches. Chaque couche opère indépendamment pour préserver les actifs face à des conditions hostiles.*

Le tableau ci-dessous énonce nos normes opérationnelles, techniques et de contrôle à travers 11 exigences clés de sécurité :

| Exigence de sécurité | Mise en œuvre sur le service |
| --- | --- |
| Affectation des ressources et rôles | Administrateurs désignés avec contrôle d'accès basé sur les rôles (RBAC) strict |
| Délimitation des données personnelles | Périmètre précisément établi dans la matrice de la section 2 |
| Évaluation et gestion des risques | Trois modes de chiffrement, verrouillage automatique, limitation de débit et code auditable |
| Prévention et gestion des incidents | Procédure formalisée à la section 4 |
| Procédures internes d'exploitation | Cadre cartographié à la section 5 de la [Politique de Confidentialité](/fr/mail/privacy-policy/) |
| Contrôle d'accès et habilitations | Routage par hachage cryptographique, politique restrictive par défaut et filtrage d'en-tête |
| Sensibilisation et formation | Responsabilité de chaque exploitant indépendant ; les documentations servent de supports |
| Sécurité physique des infrastructures | Équipements Cloudflare certifiés SOC 2 Type II et ISO/IEC 27001 |
| Audit de sécurité et traçabilité | Journaux d'accès restreints aux auditeurs et possibilité de révocation instantanée des sessions |
| Conservation des traces probantes | Journaux conservés jusqu'à suppression du compte ou selon la [Politique d'Utilisation Acceptable](/fr/mail/acceptable-use/) |
| Amélioration continue du niveau | Évolution continue du code source et publication de bulletins de sécurité |

### 3.1 Infrastructure périphérique et passerelle anti-SSRF

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌐 Nettoyage Anycast périphérique et protection anti-SSRF</div>
    <span class="google-pill">Couche 1 · TLS 1.3 / HSTS</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Absorption DDoS Anycast globale</strong> : Le réseau périphérique Cloudflare absorbe et neutralise les attaques distribuées par déni de service (DDoS), imposant un chiffrement TLS 1.3 et le préchargement HSTS pour exclure les attaques de l'homme du milieu ou dégradations de protocole.</p>
    <p><strong>Filtre anti-SSRF à la périphérie</strong> : Les requêtes sortantes de webhooks, de proxys d'images et d'exploration font l'objet d'un contrôle strict des adresses IP. Toute tentative visant les sous-réseaux privés (RFC 1918) ou métadonnées internes cloud (ex. 169.254.169.254) est bloquée à l'entrée.</p>
  </div>
</div>

### 3.2 Authentification renforcée et clés Passkey sans mot de passe

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔑 Clés Passkey liées au domaine et régulation de débit</div>
    <span class="google-pill">Couche 2 · Empreintes contextuelles</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Intégration FIDO2 WebAuthn</strong> : Les clés Passkey modernes sont associées cryptographiquement au domaine racine, neutralisant tout risque d'hameçonnage ; les clés de sécurité physiques (YubiKey) et capteurs biométriques intégrés sont pris en charge nativement.</p>
    <p><strong>Temporisation exponentielle et alertes contextuelles</strong> : Des tentatives répétées d'accès infructueuses déclenchent un blocage de 12 heures ; les connexions sont comparées aux 15 empreintes d'appareils et réseaux connus, émettant une alerte immédiate lors d'anomalies.</p>
  </div>
</div>

### 3.3 Chiffrement des données au repos et ségrégation des clés

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔒 Chiffrement d'enveloppe industriel AES-256-GCM</div>
    <span class="google-pill">Couche 3 · Ségrégation physique</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Étiquettes d'authentification par message (Tag)</strong> : Avant son enregistrement dans la base D1, le corps du courriel est chiffré avec une clé dérivée créant un texte chiffré authentifié (AES-256-GCM), prémunissant l'ensemble contre le rançonnage de fichiers ou l'exfiltration d'instantanés hors ligne.</p>
    <p><strong>Variables d'environnement sécurisées à l'exécution</strong> : Les clés de chiffrement maîtresses sont injectées via les variables d'exécution protégées de Cloudflare Workers, sans enregistrement sur disque ni dans le code, séparant rigoureusement le support physique du contexte cryptographique.</p>
  </div>
</div>

### 3.4 Bac à sable côté client et audit immuable

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Isolation Shadow DOM et vérification d'intégrité par empreinte</div>
    <span class="google-pill">Couche 4 · Filtrage DOMPurify</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Double bac à sable de contenu HTML</strong> : Tout courriel externe enrichi subit un nettoyage strict via DOMPurify, retirant <code>&lt;script&gt;</code>, <code>&lt;iframe&gt;</code> ou attributs d'événement en ligne, et s'affiche dans un Shadow DOM hermétique empêchant toute altération de style ou vol de session.</p>
    <p><strong>Manifeste de vérification public</strong> : Les spécifications techniques sont corroborées par les commits Git et hachages SHA-256, garantissant une intégrité constante et un contrôle public transparent.</p>
  </div>
</div>

:::caution[Portée et limites techniques du chiffrement]
Les modes « Tous / Confidentialité / Chiffré » font référence au chiffrement statique côté serveur (Server-side Encryption at Rest). Les clés sont dérivées des variables d'environnement de l'instance et du contexte de session de l'utilisateur. Cette architecture protège contre le vol physique de disques ou l'extraction de sauvegardes, mais ne constitue pas un chiffrement de bout en bout (E2EE) ; l'exploitant du serveur conserve la faculté technique de consulter les flux en mémoire. Pour les besoins nécessitant un secret absolu ou en cas d'infrastructure non sécurisée, les utilisateurs doivent chiffrer leurs messages localement via des outils asymétriques tels que GPG / PGP avant transmission.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Fusion de double nature et gouvernance du projet open source

EpoCanvas Mail repose sur une « double nature » fondamentale : il constitue à la fois un service de messagerie cloud gratuit ouvert au public et un projet logiciel open source régi par la licence MIT. Établir une démarcation nette entre ces deux volets est indispensable pour la communauté :

![Matrice de gouvernance de double nature et conformité mondiale d'EpoCanvas Mail : Démarcation entre service hébergé et projet open source, avec alignement RGPD, CCPA et cadres APAC](/images/mail/dual-nature-compliance-matrix.svg)

*Figure 3 : Frontières de gouvernance et matrice de conformité réglementaire. Le projet amont met à disposition les sources logicielles ; les exploitants de nœuds agissent en tant que responsables de traitement autonomes assumant l'entière responsabilité légale.*

### 4.1 Engagements de service hébergé et limites de responsabilité

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">☁️ Périmètre d'exploitation du service officiel en ligne</div>
    <span class="google-pill">mail.epocanvas.com · SLA non commercial</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Garantie de service public</strong> : Le service officiel <code>mail.epocanvas.com</code> est assuré par l'équipe d'ingénierie centrale en qualité d'exploitant indépendant. Nous nous engageons à préserver la disponibilité des nœuds, le strict respect de la zéro télémétrie et le contrôle d'intégrité.</p>
    <p><strong>Clause de non-responsabilité et sauvegardes</strong> : En tant que service bénévole et public, il ne fournit aucun contrat de niveau de service (SLA) d'entreprise et décline toute responsabilité pour les interruptions dues aux infrastructures de Cloudflare ou à la négligence de l'utilisateur. Chaque utilisateur demeure l'ultime responsable de ses données et doit procéder à des sauvegardes régulières.</p>
  </div>
</div>

### 4.2 Licence open source, développements dérivés et règles de diffusion

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📜 Licence MIT et lignes rouges de développement dérivé</div>
    <span class="google-pill">Licence MIT · Protection de marque · Avis distincts</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Code source libre et droit d'audit</strong> : Le code source est diffusé sous licence permissive MIT. Toute personne est habilitée à inspecter le code, en réaliser des audits, le bifurquer (fork) pour des projets secondaires ou déployer des instances privées.</p>
    <p><strong>Trois lignes rouges de diffusion</strong> :</p>
    <ul>
      <li><strong>Séparation absolue de marque</strong> : Sans accord écrit, aucun déploiement tiers ou version modifiée ne peut employer « EpoCanvas Mail Officiel », « Nœud Officiel » ou toute mention trompeuse dans son domaine ou sa communication ;</li>
      <li><strong>Maintien des droits et mentions</strong> : Toute redistribution de code ou version modifiée doit reproduire intégralement les mentions de droits d'auteur originaux et le texte de la licence MIT ;</li>
      <li><strong>Déclaration d'exploitation autonome</strong> : Les développeurs tiers proposant des services au public doivent afficher leur identité propre et leurs politiques de confidentialité, sans renvoyer vers les textes officiels comme caution juridique.</li>
    </ul>
  </div>
</div>

### 4.3 Responsabilités légales de l'exploitant d'un nœud autonome

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚖️ Rôle exclusif de responsable de traitement pour les nœuds autonomes</div>
    <span class="google-pill">Responsable du traitement exclusif · Aucune responsabilité solidaire</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Statut exclusif de responsable de traitement</strong> : Lorsqu'un tiers héberge un nœud sur son propre compte Cloudflare ou sur son serveur, <strong>cet exploitant devient le seul et unique « Responsable du traitement » (Data Controller)</strong>. Les développeurs du projet amont n'ont aucun accès aux données, aucun contrôle physique et n'assument aucune responsabilité solidaire.</p>
    <p><strong>Respect des obligations territoriales</strong> : L'exploitant autonome doit obligatoirement configurer des secrets fiables, rédiger une politique adaptée à son droit national, répondre aux requêtes d'effacement ou de portabilité des utilisateurs et répondre aux réquisitions légales des autorités locales.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Conformité juridique internationale et flux de données transfrontaliers

EpoCanvas Mail est accessible mondialement. Pour garantir que les usagers comprennent clairement leurs prérogatives juridiques et les implications en matière de souveraineté sans entrave à l'accès, nous établissons un cadre d'alignement normatif :

### 5.1 Droits au sein de l'Espace Économique Européen (RGPD) et garanties transfrontalières

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇪🇺 Droits statutaires du RGPD et clauses contractuelles types</div>
    <span class="google-pill">RGPD Art. 15-22 · Art. 6 · CCT (SCCs)</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Droits des personnes concernées (Articles 15 à 22)</strong> : Les utilisateurs de l'Union européenne et de l'EEE disposent du droit d'accéder, de rectifier, d'exporter, de limiter le traitement et d'exiger l'effacement définitif de leur compte.</p>
    <p><strong>Bases légales et transferts internationaux</strong> : Le traitement repose sur l'exécution du contrat de service (Art. 6(1)(b)) ou sur le consentement explicite (Art. 6(1)(a)) ; le transit international via les nœuds Anycast de Cloudflare est encadré par les Clauses Contractuelles Types (CCT/SCCs) et l'annexe de traitement conforme au RGPD.</p>
  </div>
</div>

### 5.2 Dispositions des États-Unis (CCPA / CPRA) et engagement de non-vente

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇺🇸 Droits à la vie privée pour la Californie (CCPA / CPRA)</div>
    <span class="google-pill">Zéro vente ni partage · Non-discrimination</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Engagement ferme de non-vente de données</strong> : Nous attestons expressément n'avoir jamais vendu, loué ni partagé, et nous interdisons formellement de vendre ou partager toute donnée personnelle ou contenu de correspondance à des courtiers de données, régies ou tiers commerciaux (Do Not Sell or Share My Personal Information).</p>
    <p><strong>Droit à l'information et équité de traitement</strong> : Les résidents californiens peuvent solliciter la divulgation des données recueillies et en ordonner la suppression ; nous n'imposerons aucune réduction de bande passante, d'espace ou de service en raison de l'exercice de ces droits.</p>
  </div>
</div>

### 5.3 Réglementations d'Asie-Pacifique et responsabilités de sécurité du client

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌏 Réglementations Asie-Pacifique et vigilance sur le terminal</div>
    <span class="google-pill">PDPA de Taïwan · Routage SMTP · Sécurité du poste</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Compétence territoriale et réalité du transit</strong> : La plateforme officielle est administrée depuis Taïwan, appliquant rigoureusement la loi sur la protection des données personnelles (PDPA). Les usagers sont avisés que l'acheminement SMTP de courriels internationaux peut traverser des nœuds d'échange régis par les législations locales des télécommunications.</p>
    <p><strong>Sécurité du poste client et respect des règles</strong> : L'utilisateur doit impérativement protéger ses terminaux (mises à jour système, élimination des malwares, activation de Passkey/TOTP) ; toute utilisation abusive à des fins de piratage, d'hameçonnage ou de pourriel massif provoquera une suspension immédiate au titre de notre [Politique d'Utilisation Acceptable](/fr/mail/acceptable-use/).</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Réponse aux incidents de sécurité et coopération avec les autorités

Pour contenir sans délai tout événement de sécurité et garantir une transparence totale, EpoCanvas Mail applique un protocole d'intervention d'urgence normalisé :

### 6.1 Procédure de confinement et notification des violations en 72 heures

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🚨 Protocole opérationnel standardisé de réponse aux incidents</div>
    <span class="google-pill">Avis en 72h · Confinement rapide · Correctif amont</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Procédure de réaction d'urgence en quatre phases</strong> :</p>
    <ul>
      <li><strong>Isolement immédiat et blocage de menace</strong> : Blocage des adresses IP malveillantes en périphérie, révocation immédiate des jetons JWT compromis et rotation d'urgence des clés de chiffrement maîtresses ;</li>
      <li><strong>Expertise numérique et évaluation d'impact</strong> : Analyse des journaux d'audit périphériques pour délimiter les comptes concernés et le niveau de criticité ;</li>
      <li><strong>Notification légale sous 72 heures</strong> : En présence d'un incident majeur qualifié, notification aux parties prenantes et signalement aux autorités réglementaires compétentes dans les 72 heures ;</li>
      <li><strong>Correction dans le projet open source et avis public</strong> : Intégration immédiate d'un correctif dans le dépôt amont avec publication d'un avis de sécurité à l'attention des exploitants indépendants.</li>
    </ul>
  </div>
</div>

### 6.2 Points de contact officiels et traitement des réquisitions

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📮 Canaux dédiés aux signalements de vulnérabilité et audits</div>
    <span class="google-pill">Canal officiel · Signalement de faille</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Coopération aux contrôles et démarcation d'instances</strong> : L'instance officielle <code>mail.epocanvas.com</code> collabore aux vérifications légales ordonnées par les autorités. Les exploitants de nœuds autonomes doivent répondre directement devant leurs régulateurs régionaux. Les chercheurs ayant décelé une vulnérabilité sont invités à nous contacter via nos coordonnées dédiées :</p>
    <ul>
      <li><strong>Centre d'intervention sur les incidents de sécurité</strong> : <code>announcement@epocanvas.com</code></li>
      <li><strong>Bureau de la conformité et de la protection des données</strong> : <code>privacy@epocanvas.com</code></li>
    </ul>
  </div>
</div>
