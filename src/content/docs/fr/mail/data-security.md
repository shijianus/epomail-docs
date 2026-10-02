---
title: Traitement des données et opérations de sécurité
description: Cycle de vie des données, matrice de stockage, architecture défensive en profondeur, gouvernance à double nature et conformité réglementaire mondiale chez EpoCanvas Mail.
---

**Date d'entrée en vigueur : 1er octobre 2026 | Version : 5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail repose sur deux principes fondamentaux : « La vie privée est un droit fondamental » et « Le code fait foi ». Notre plateforme s'articule autour d'une architecture à Double Nature associant un service cloud hébergé gratuit, sans télémétrie et sans publicité, à un projet logiciel open source autonome. Ce document détaille l'ensemble du cycle de vie des données, notre matrice de stockage chiffré, notre modèle de défense en profondeur à quatre niveaux et la délimitation des responsabilités juridiques à l'échelle internationale.
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ Zéro télémétrie (Zero Telemetry)</span>
    <span class="google-pill">🔐 Chiffrement au repos AES-256-GCM</span>
    <span class="google-pill">⚡ Exécution éphémère en périphérie (V8)</span>
    <span class="google-pill">🌐 Conformité mondiale (RGPD / CCPA)</span>
  </div>
</div>

Le présent document s'applique conformément à notre [Politique de confidentialité](/fr/mail/privacy-policy/) et à nos [Conditions d'utilisation](/fr/mail/terms-of-service/). Il sert de référence aux utilisateurs vérifiant nos engagements de confidentialité, de manuel opérationnel pour les administrateurs de serveurs autonomes et de base d'audit pour les autorités de contrôle.

## 1. Cycle de vie des données et modèle de traitement en périphérie

Le cycle de vie des communications électroniques au sein d'EpoCanvas Mail s'organise rigoureusement en six étapes : Collecte, Traitement, Exploitation, Transfert, Conservation et Destruction irréversible. Chacune de ces phases s'exécute sans état sur le réseau Anycast mondial de Cloudflare, éliminant tout risque de rémanence de données ou d'accès illégitime.

![EpoCanvas Mail Cycle de vie des données : Collecter -> Traiter -> Exploiter -> Transférer -> Conserver -> Détruire](/images/mail/data-flow.svg)

*Figure 1 : Schéma complet du cycle de vie des données personnelles. Chaque étape respecte strictement les principes de minimisation et d'isolation cryptographique ; voir l'article 5 de la [Politique de confidentialité](/fr/mail/privacy-policy/) pour les bases légales.*

### 1.1 Collecte minimale et engagement de zéro télémétrie

La phase de collecte applique une politique stricte de minimisation des données. Le service ne recueille que les identifiants strictement indispensables à l'authentification (nom d'utilisateur et alias de messagerie). Aucun carnet d'adresses, relevé gyroscopique, contenu de presse-papiers ou marqueur de navigation n'est enregistré. Nous affirmons un engagement formel : **EpoCanvas Mail applique une politique de Zéro Télémétrie, tant sur l'instance officielle que dans le code source ouvert**. Le système n'intègre aucun outil d'analyse commerciale, traceur publicitaire ou balise externe ; vos interactions restent strictement confinées à votre interface locale.

### 1.2 Exécution éphémère et isolation mémoire V8

Lors de la réception d'un message ou d'une action utilisateur, la logique applicative s'exécute instantanément dans des environnements isolés V8 (Cloudflare Workers) situés sur le nœud périphérique le plus proche. Ces conteneurs V8 démarrent en quelques nanosecondes et sont immédiatement détruits une fois la requête traitée. Les données déchiffrées résident uniquement en mémoire volatile et ne sont jamais stockées sur des disques physiques d'infrastructure. Ce modèle sans état supprime les risques liés à la mémoire partagée et aux attaques par canal auxiliaire.

### 1.3 Destruction cryptographique et droit à l'oubli

Afin de garantir le droit à l'effacement (« droit à l'oubli »), le système met en œuvre un calendrier de purge automatisé et irréversible. Les courriels placés dans la Corbeille sont conservés pendant une période de sécurité de 7 jours, après quoi un déclencheur planifié (Cron Trigger) procède à leur effacement physique définitif. Si la boîte aux lettres dépasse 90 % de son quota, les messages supprimés sont purgés de manière proactive afin de garantir le bon fonctionnement du service. Lors de la suppression d'un compte, tous les enregistrements dans les bases D1 et les caches KV sont effacés et les clés de chiffrement correspondantes sont détruites.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Matrice de traitement des données et spécifications de stockage

La matrice suivante répertorie l'ensemble des catégories de données traitées, leurs finalités précises, leurs supports de stockage et leurs règles de conservation :

| Catégorie de données | Éléments de données précis | Finalité du traitement | Support et norme de sécurité | Durée de conservation et suppression |
| --- | --- | --- | --- | --- |
| Identifiants de compte | Adresse e-mail, identifiant, hachage salé du mot de passe, clé TOTP (chiffrée AES-GCM), codes de secours, clé publique Passkey | Inscription, authentification, double facteur, récupération de compte | Cloudflare D1 ; PBKDF2 (100 000 itérations avec sel), chiffrement statique TOTP | Conservé jusqu'à résiliation du compte ; suppression physique immédiate |
| Données réseau et appareil | Adresse IP d'inscription et de connexion, système d'exploitation, User-Agent, type d'appareil | Audit de sécurité, détection d'anomalies de connexion, régulation du trafic | Cloudflare D1 ; accès strictement réservé aux audits administratifs | Conservé jusqu'à la suppression physique du compte |
| État de session | Jetons JWT, rôles RBAC attribués, boîte aux lettres active | Autorisation à la passerelle, routage des requêtes API | Cloudflare KV ; durée de validité maximale glissante de 30 jours | Révoqué à la déconnexion ; expiration automatique après 30 jours |
| Données de communication | Expéditeur, destinataires, CC/BCC, objet, horodatage, statut de lecture, libellés, étoiles, corps | Distribution du courrier, organisation des fils, recherche | Cloudflare D1 (métadonnées) ; corps chiffrés au repos en AES-256-GCM | Maîtrisé par l'utilisateur ; purge Corbeille sous 7 jours ; purge d'urgence à 90 % |
| Pièces jointes | Nom d'origine du fichier, type MIME, taille en octets, contenu binaire | Transmission, prévisualisation intégrée, téléchargement sécurisé | Stockage objet de l'instance (S3 BYO > Cloudflare R2 > Cloudflare KV) | Lié au cycle de vie du courriel ; supprimé avec le message parent |
| Journaux de sécurité et quotas | Compteur d'échecs de connexion, fréquence d'inscription, statistiques IA | Protection contre la force brute, prévention des abus | Cloudflare KV ; compteurs à fenêtre fixe | Échecs expirés en 12 h ; inscriptions purgées quotidiennement ; IA 60 jours |
| Empreintes d'environnement | Appareils connus, géolocalisation (Geo), ASN réseau, horodatage d'une heure | Détection des anomalies d'environnement, réduction de la fatigue d'alerte | Cloudflare KV (préfixe `USER_KNOWN_ENV_`) ; conserve 15 empreintes | Supprimé après 90 jours d'inactivité ou lors de la résiliation du compte |
| Préférences d'interface | Langue (6 langues), thème clair/sombre, indicateurs d'affichage | Maintien de la cohérence de l'interface utilisateur | Navigateur localStorage, synchronisation facultative avec D1 | Conservé jusqu'au vidage du cache ou réinitialisation manuelle |

### 2.1 Protection des identifiants et normes PBKDF2 et WebAuthn

La sécurité des identifiants fait l'objet d'une protection cryptographique unilatérale de pointe. L'authentification par mot de passe exclut tout texte clair ou algorithme obsolète, en utilisant l'algorithme PBKDF2 associé à un sel aléatoire de forte entropie sur 100 000 itérations pour résister aux attaques par tables arc-en-ciel. Pour l'authentification à deux facteurs (TOTP RFC 6238), les clés secrètes sont chiffrées en AES-256-GCM avant inscription dans D1. Les clés d'accès (Passkeys FIDO2 / WebAuthn) s'appuient sur la cryptographie asymétrique : le serveur ne conserve que la clé publique, la clé privée demeurant dans l'enclave matérielle sécurisée du terminal utilisateur.

### 2.2 Hiérarchisation du stockage et stockage d'objets dédié (BYO Storage)

Pour les pièces jointes et charges binaires volumineuses, le système intègre une couche de stockage modulaire. Les canaux de stockage sont résolus par ordre de priorité : stockage compatible S3 fourni par l'administrateur (Bring-Your-Own Storage), stockage cloud natif Cloudflare R2, ou solution de repli Cloudflare KV. Le stockage personnel bénéficie d'identifiants indépendants garantissant une maîtrise souveraine des fichiers. L'ensemble des pièces jointes est servi avec les en-têtes obligatoires `Content-Disposition: attachment` et `X-Content-Type-Options: nosniff`.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Architecture défensive en profondeur à quatre niveaux

Pour protéger les correspondances contre les menaces réseau internationales, EpoCanvas Mail applique une stratégie de défense en profondeur structurée en quatre strates complémentaires :

![EpoCanvas Mail Architecture défensive en profondeur à quatre niveaux](/images/mail/partition-security.svg)

*Figure 2 : Modèle défensif en profondeur. Chaque niveau opère de façon étanche et redondante afin de préserver l'intégrité globale du système face aux incidents exceptionnels.*

Le tableau suivant récapitule 11 engagements essentiels en matière technique, administrative et opérationnelle :

| Domaine de sécurité | Application technique et gouvernance opérationnelle |
| --- | --- |
| Gestion des accès et du personnel | Administrateurs désignés avec séparation stricte des privilèges RBAC |
| Définition du périmètre des données | Inventaire complet détaillé à l'article 2 du présent document |
| Évaluation et gestion des risques | Chiffrement configurable, verrouillage sur échec, transparence du code source |
| Prévention et gestion des incidents | Procédure normalisée en quatre étapes exposée à l'article 6 |
| Procédures administratives internes | Registre des activités de traitement formalisé à l'article 5 de la Politique de confidentialité |
| Contrôle des accès et habilitations | Routage HMAC, politique de refus par défaut et filtrage à la passerelle |
| Formation et sensibilisation | Bonnes pratiques pour administrateurs autonomes et documentations officielles |
| Sécurité physique des infrastructures | Certifications des centres de données Cloudflare (SOC 2 Type II, ISO/IEC 27001) |
| Audit technique et vérification | Journaux de sécurité horodatés (IP, terminal, erreurs) ; révocation immédiate |
| Préservation des traces et preuves | Traces d'authentification conservées ; application de la Politique d'utilisation acceptable |
| Amélioration continue et correctifs | Mises à jour logicielles régulières et diffusion transparente des avis de sécurité |

### 3.1 Niveau 1 : Passerelle de périphérie et protection réseau

En première ligne, le réseau Anycast de Cloudflare filtre les attaques par déni de service distribué (DDoS), tout en imposant le protocole TLS 1.3 et le préchargement HSTS pour écarter toute interception ou altération du trafic en transit. Les passerelles de périphérie intègrent des filtres anti-SSRF : toute tentative d'accès à des sous-réseaux privés locaux (RFC 1918) ou aux interfaces de métadonnées de fournisseurs cloud (comme 169.254.169.254) est immédiatement bloquée.

### 3.2 Niveau 2 : Authentification forte et clés d'accès sans mot de passe

L'authentification élimine les vulnérabilités inhérentes aux mots de passe grâce à l'intégration de FIDO2 / WebAuthn. Les clés d'accès sont liées cryptographiquement au nom de domaine de l'instance, neutralisant ainsi les tentatives d'hameçonnage par serveurs mandataires inversés. Lors d'une connexion par mot de passe, un verrouillage temporaire de 12 heures est déclenché après plusieurs tentatives infructueuses, avec comparaison auprès d'une base de 15 empreintes d'environnement (terminaux et ASN réseau) pour avertir l'utilisateur en cas d'accès inhabituel.

### 3.3 Niveau 3 : Chiffrement des données au repos AES-256-GCM

L'ensemble des données persistantes est protégé par un chiffrement au repos AES-256-GCM. Avant tout enregistrement dans la base D1, le corps du message est chiffré au moyen de clés contextuelles accompagnées d'une étiquette d'authentification, protégeant le contenu contre l'exploitation de sauvegardes dérobées ou de copies de disques non autorisées. Les clés secrètes sont injectées via des variables d'environnement étanches, empêchant la lecture des messages même en cas d'accès indu aux fichiers de la base.

### 3.4 Niveau 4 : Bac à sable Shadow DOM et intégrité documentaire

L'interface utilisateur met en œuvre un cloisonnement rigoureux au niveau du navigateur. Les messages HTML font l'objet d'un assainissement via DOMPurify afin d'éliminer les balises `<script>`, `<style>`, `<iframe>`, `<form>` et les gestionnaires d'événements, avant d'être restitués au sein d'un Shadow DOM fermé qui prévient le détournement d'interface ou le vol de sessions. Par ailleurs, la documentation officielle est ancrée par des empreintes SHA-256 et des commits Git garantissant son authenticité.

:::caution[Portée et limites techniques du chiffrement]
Les options de chiffrement disponibles au sein du service désignent un chiffrement statique côté serveur (Server-side Encryption at Rest). Les clés sont dérivées des variables d'environnement de l'instance et du contexte de l'utilisateur. Ce dispositif protège efficacement contre le vol de supports physiques ou les fuites de sauvegardes ; il ne s'agit pas d'un chiffrement de bout en bout (E2EE). Les administrateurs disposant d'un accès direct à l'infrastructure possèdent techniquement la capacité de déchiffrer les courriels. Pour des échanges nécessitant une confidentialité absolue excluant l'opérateur, les usagers doivent chiffrer leurs messages localement à l'aide d'outils tels que GPG/PGP avant envoi.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Gouvernance à double nature et limites de responsabilité

EpoCanvas Mail s'affirme à travers une « Double Nature » : il s'agit à la fois d'une plateforme publique de messagerie hébergée à titre gratuit et d'un projet de logiciel libre distribué sous licence MIT. Définir avec précision le partage des responsabilités juridiques est un gage de clarté pour l'ensemble des parties :

![EpoCanvas Mail Délimitation des responsabilités : Projet open source -> Exploitant de l'instance -> Utilisateur final](/images/mail/self-host-responsibilities.svg)

*Figure 3 : Schéma de gouvernance à double nature. Le projet open source met à disposition le code ; les exploitants de chaque instance agissent en qualité de responsables du traitement autonomes ; les utilisateurs disposent du libre choix entre service mutualisé et auto-hébergement.*

### 4.1 Engagements opérationnels et limitations de responsabilité du service hébergé

L'instance officielle accessible à l'adresse `mail.epocanvas.com` est exploitée par l'équipe fondatrice en tant qu'opérateur indépendant. Nous nous engageons à maintenir la disponibilité de la plateforme, le respect de la règle de zéro télémétrie et la fiabilité des mécanismes cryptographiques. Cependant, en tant que service communautaire bénévole, aucune garantie de niveau de service (SLA) commercial n'est accordée, et notre responsabilité ne saurait être engagée pour des dommages indirects résultant de pannes d'infrastructure externe, de cas de force majeure ou de négligence de l'utilisateur. Chaque usager demeure responsable de la sauvegarde de ses correspondances essentielles.

### 4.2 Licence open source, déclinaisons et règles de distribution

Le code source d'EpoCanvas Mail est mis à disposition sous licence MIT. Toute personne a le droit légal d'examiner le code, de réaliser des audits, de créer des forks ou d'installer des serveurs privés autonomes. Lors de la distribution de versions modifiées ou du déploiement de services au public, les règles suivantes s'appliquent impérativement :
1. **Protection de la marque officielle** : Aucune instance tierce ne peut se prévaloir des dénominations « EpoCanvas Mail Officiel » ou « Nœud officiel » de nature à induire le public en erreur sur son affiliation avec le projet d'origine ;
2. **Conservation des mentions d'auteur** : Toute redistribution du code source doit obligatoirement préserver la mention de copyright originale et le texte intégral de la licence MIT ;
3. **Documents légaux indépendants** : Les exploitants ouvrant des boîtes aux lettres à des tiers doivent publier leurs propres conditions de service et politiques de confidentialité, sans lier leur responsabilité aux sites du projet d'origine.

### 4.3 Obligations des administrateurs d'instances indépendantes

Lorsqu'un particulier ou une entité déploie le code source d'EpoCanvas Mail sur sa propre infrastructure Cloudflare, **cet exploitant devient l'unique et exclusif « Responsable du traitement » (Data Controller)** de son instance. Les contributeurs du projet d'origine n'exercent aucun contrôle technique et n'assument aucune responsabilité juridique relative à ces déploiements tiers. Les exploitants doivent se conformer aux législations sur les données de leur pays, administrer leurs clés de chiffrement et répondre aux requêtes de leurs utilisateurs ainsi qu'aux réquisitions légales des autorités.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Conformité réglementaire mondiale et flux transfrontaliers

EpoCanvas Mail s'adresse aux internautes du monde entier. Afin que chaque utilisateur puisse exercer ses droits fondamentaux tout en comprenant les spécificités de son cadre légal, nos pratiques s'alignent sur les grands référentiels internationaux :

### 5.1 Espace économique européen (RGPD) et garanties transfrontalières

Pour les utilisateurs situés au sein de l'Union européenne et de l'Espace économique européen, le service est conforme aux exigences du Règlement général sur la protection des données (RGPD) :
- **Droits des personnes concernées (articles 15 à 22)** : Droit d'accès, de rectification, de portabilité, de limitation et d'effacement de l'ensemble de leurs données personnelles ;
- **Bases licites du traitement (article 6)** : Le traitement repose sur l'exécution du contrat de service (art. 6, par. 1, point b) ou sur le consentement exprès de l'intéressé (art. 6, par. 1, point a) ;
- **Transferts internationaux de données (chapitre V)** : En raison du réseau Anycast de Cloudflare, les requêtes peuvent transiter par des infrastructures situées hors de l'UE. Ces flux sont encadrés par les Clauses contractuelles types (CCT) de la Commission européenne conclues avec le prestataire.

### 5.2 Dispositions relatives aux États-Unis (CCPA / CPRA)

En conformité avec les réglementations des États américains relatives à la protection de la vie privée des consommateurs (notamment en Californie) :
- **Absence totale de vente de données** : Nous garantissons n'avoir vendu ni partagé aucune donnée personnelle à des fins commerciales au cours des 12 derniers mois, et nous engageons à ne jamais le faire ;
- **Droit d'information et non-discrimination** : Les résidents californiens peuvent demander la communication des catégories de données recueillies et solliciter leur suppression sans encourir aucune pénalité de service ou de performance.

### 5.3 Cadres juridiques d'Asie-Pacifique et vigilance des usagers

Pour les usagers d'Asie-Pacifique (notamment en vertu de la loi taïwanaise sur la protection des données personnelles, de la PDPA de Singapour ou de l'APPI japonaise), l'instance `mail.epocanvas.com` est exploitée par une équipe basée à Taïwan dans le respect des textes locaux. Dans le cadre d'un réseau international décentralisé, l'utilisateur prend acte des éléments suivants :
1. **Routage multi-juridictionnel** : Les courriels transitant par des serveurs SMTP intermédiaires peuvent traverser des réseaux sous la souveraineté de multiples États ;
2. **Sécurité des postes terminaux** : La protection du poste de travail (mises à jour, antivirus, adoption d'une clé d'accès ou d'un TOTP) incombe au premier chef à l'usager ;
3. **Répression des usages illicites** : Tout comportement visant des cyberattaques, du spamming ou des escroqueries donnera lieu à l'interruption immédiate du service conformément à notre [Politique d'utilisation acceptable](/fr/mail/acceptable-use/).

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Réponse aux incidents de sécurité et coopération institutionnelle

Pour parer rapidement à toute faille potentielle et préserver une confiance réciproque, EpoCanvas Mail applique une procédure normalisée de gestion des incidents :

### 6.1 Protocole de confinement et de notification sous 72 heures

Dès la survenue d'un événement susceptible d'affecter l'intégrité, la confidentialité ou la disponibilité des données, l'équipe d'exploitation engage quatre mesures coordonnées :
1. **Endiguement immédiat de la menace** : En quelques minutes, blocage des adresses IP malveillantes sur la passerelle, révocation des jetons JWT compromis et rotation des clés applicatives ;
2. **Expertise technique et évaluation de portée** : Examen des journaux d'accès réseau afin d'évaluer le nombre de comptes concernés et le niveau de criticité ;
3. **Notification légale sous 72 heures** : Si l'incident présente un risque pour les droits des personnes, les usagers touchés seront prévenus sous 72 heures et une notification officielle sera déposée auprès de l'autorité compétente ;
4. **Remédiation du code et communication communautaire** : Publication immédiate d'un correctif dans le dépôt open source et diffusion d'un bulletin de sécurité pour les exploitants de serveurs indépendants.

### 6.2 Canaux officiels d'alerte et relations avec les autorités

L'instance officielle `mail.epocanvas.com` collabore pleinement avec les autorités judiciaires et administratives habilitées. Le présent document et nos règles de gouvernance constituent notre socle d'audit légal. Les exploitants d'instances indépendantes répondent directement aux autorités de leur lieu d'établissement. Pour signaler une anomalie de sécurité, un message frauduleux ou un défaut d'intégrité, veuillez contacter les canaux de confiance :
- **Centre de Réponse aux Incidents de Sécurité** : `announcement@epocanvas.com`
- **Bureau de la Protection des Données et de la Vie Privée** : `privacy@epocanvas.com`
