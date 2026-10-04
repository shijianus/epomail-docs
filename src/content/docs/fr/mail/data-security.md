---
title: Traitement des Données et Maintien de la Sécurité
description: Sécurité des données et protection des données personnelles d'EpoCanvas Mail — mesures de sécurité, frontières de responsabilité de l'exploitation à double voie, exercice de vos droits et réponse aux incidents de sécurité.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.12**

Le présent document décrit les mesures par lesquelles l'instance hébergée officielle (mail.epocanvas.com) protège les données, les frontières de responsabilité entre le service hébergé et le projet open source, ainsi que les modalités de consultation, d'exportation et de suppression de vos propres données. Il est établi en vertu de la [Politique de confidentialité](/fr/mail/privacy-policy/) et des [Conditions d'utilisation](/fr/mail/terms-of-service/) ; les faits techniques qui y sont énoncés suivent l'implémentation réelle du code open source.

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Les documents juridiques et techniques de ce site suivent l'implémentation open source du service et visent à établir des normes de communication communautaires transparentes, rigoureuses et non commerciales.

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
    <div class="privacy-checkup-desc">Vous cherchez comment les données sont collectées et protégées, comment exercer vos droits, ou comment vérifier ces documents ?</div>
    <a href="/fr/mail/overview/" class="privacy-checkup-link">Accéder à la vue d'ensemble ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. Sécurité intégrée au service

La protection des données sur l'instance hébergée officielle s'organise en quatre couches : transport, traitement en périphérie, stockage au repos et identifiants. Chaque mesure est implémentée dans le code open source et peut être auditée indépendamment.

<div class="google-illustration-container">
  <img src="/images/mail/fr/security-trust-shield.svg" alt="Défense en profondeur d'EpoCanvas Mail : transport chiffré, traitement sans état en périphérie, chiffrement au repos et protection des identifiants, reposant sur le contrôle par l'utilisateur" width="416" height="276" />
</div>

*Figure : quatre couches de protection — transport, périphérie, stockage au repos et identifiants ; la base est votre propre contrôle (exportation en libre-service, suppression et vérification en deux étapes).*

### 1.1 Chiffrement du transport

Lorsque vous accédez au service par navigateur ou application mobile, toutes les connexions sont chiffrées en HTTPS/TLS : le contenu des communications reste illisible pour les intermédiaires des réseaux publics. Les ressources statiques du site sont diffusées par un réseau de diffusion de contenu avec en-têtes de cache et de sécurité.

### 1.2 Traitement sans état en périphérie

La logique métier s'exécute sur Cloudflare Workers (sandbox V8 Isolate) : le texte en clair des courriels déchiffré pendant le traitement n'existe que dans la mémoire de la requête concernée ; à la fin de la requête, le bac à sable est libéré et aucun texte en clair ne subsiste sur les disques physiques de la machine hôte. Le service n'exploite aucun serveur persistant ni aucun processus d'arrière-plan permanent.

### 1.3 Chiffrement au repos

Le chiffrement des objets et du corps des courriels dépend du mode de messagerie adopté par l'instance : en mode « Chiffré », les objets et corps de tous les courriels sont stockés en AES-256-GCM (avec balises d'authentification) ; en mode « Privé », tout est chiffré sauf les indésirables et la corbeille ; en mode « Tout », aucun chiffrement n'est appliqué. Chaque enregistrement utilise un vecteur d'initialisation aléatoire. Les clés de chiffrement sont dérivées par HKDF-SHA256 d'une variable d'environnement de secret maître au niveau de l'instance (`jwt_secret` / `totp_enc_key`) avec un sel par utilisateur ; le secret maître n'est jamais écrit dans la base de données ni validé dans le dépôt. Si une instance ne configure pas les variables d'environnement du secret maître, le chiffrement se dégrade vers une clé par défaut intégrée au code ; le déployeur doit terminer la configuration via la porte d'initialisation pour l'éviter. Les pièces jointes sont hors du périmètre du chiffrement.

:::caution[Périmètre et limites du chiffrement]
Le chiffrement décrit ci-dessus est un chiffrement au repos côté serveur : il protège contre les risques d'infrastructure tels que le vol de fichiers de base de données ou la fuite d'instantanés ; il ne s'agit pas d'un chiffrement de bout en bout. Un exploitant qui contrôle le serveur de l'instance et le secret maître est techniquement en mesure de déchiffrer le contenu. Ce que les administrateurs peuvent voir dépend du mode de messagerie : en mode « Tout », l'administrateur peut lire tous les courriels ; en mode « Privé », seuls les indésirables, les supprimés et les sans destinataire ; en mode « Chiffré », l'interface d'administration ne renvoie pas le contenu des courriels. Si vous avez besoin d'une confidentialité à l'égard de tout tiers, y compris l'exploitant, chiffrez vous-même le corps du message avec GPG/OpenPGP ou un outil client similaire avant l'envoi.
:::

### 1.4 Protection des identifiants

- **Mots de passe** : hachés par PBKDF2-HMAC-SHA256 à 100 000 itérations avec un sel aléatoire unique par utilisateur ; jamais stockés en clair ni sous forme réversible ;
- **Vérification en deux étapes** : le secret TOTP est stocké chiffré en AES-256-GCM ; les codes de récupération ne sont conservés que sous forme de hachés SHA-256 ;
- **Clés d'accès (Passkey/WebAuthn)** : le serveur ne stocke que la clé publique et l'identifiant d'identifiants ; la clé privée demeure dans l'authentificateur de votre appareil et ne transite jamais par le réseau.

### 1.5 Matrice de traitement des données

Les catégories de données, les champs collectés, les finalités, les supports de stockage et les durées de conservation du service sont les suivants :

| Catégorie de données | Champs collectés | Finalité | Stockage et protection | Conservation |
| --- | --- | --- | --- | --- |
| Identifiants de compte | adresse électronique, nom d'utilisateur, haché de mot de passe et sel, secret TOTP (chiffré), hachés des codes de secours, clés publiques des clés d'accès | inscription, connexion, vérification en deux étapes | Cloudflare D1 ; PBKDF2 (100 000 itérations), TOTP chiffré au repos | pendant la vie du compte ; sessions révoquées à la désactivation, irrécupérables après suppression définitive |
| Données de communication | expéditeur et destinataires, CC/CCI, objet, horodatages, statut de lecture, étiquettes, corps du courriel | envoi, réception, organisation en conversations, recherche par mots-clés | Cloudflare D1 (métadonnées) ; objet et corps chiffrés selon le mode de messagerie | sous votre contrôle ; corbeille conservée 7 jours puis supprimée définitivement |
| Données réseau et d'appareil | IP d'inscription, IP de dernière connexion, système d'exploitation, type de navigateur et d'appareil | audit de sécurité, détection de connexions inhabituelles | Cloudflare D1 ; consultables uniquement dans le cadre d'audits d'administration, jamais utilisées pour le profilage commercial | jusqu'à la suppression définitive du compte |
| Données d'environnement périphérique | code pays/région de la requête (`cf-ipcountry`) | présélection d'interface (indicatif téléphonique par défaut, par exemple) | non persistées ; renvoyées uniquement avec la réponse au navigateur | non stockées ; détruites à la fin de la réponse |
| Sessions et autorisations | jetons de session JWT, permissions de rôle | authentification de l'API en périphérie | liste d'autorisation Cloudflare KV ; au plus 10 sessions actives par compte | validité de 30 jours ; suppression immédiate à la déconnexion |
| Pièces jointes | nom de fichier d'origine, type MIME, taille, contenu binaire | transfert, aperçu et téléchargement des pièces jointes | stockage d'objets de l'instance (résolution dans l'ordre : stockage S3 compatible fourni, liaison R2, KV par défaut) ; en-têtes défensifs au téléchargement | supprimées en cascade avec le courriel auquel elles appartiennent |

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Frontières de responsabilité de l'exploitation à double voie

EpoCanvas Mail est à la fois un service hébergé officiel et un projet open source. La définition du responsable du traitement et la répartition des responsabilités entre les trois parties figurent à la section 2 de la [Vue d'ensemble Confidentialité et conditions](/fr/mail/overview/) ; la présente section précise le positionnement de l'instance hébergée et les règles de diffusion du code open source.

<div class="google-illustration-container">
  <img src="/images/mail/fr/dual-nature-scale.svg" alt="Gouvernance à double voie d'EpoCanvas Mail : une base de code open source, avec le responsable du traitement et les frontières de responsabilité des instances hébergées et auto-hébergées" width="416" height="276" />
</div>

*Figure : deux voies d'exploitation sur une même base de code open source. L'équipe d'exploitation est responsable du traitement de l'instance hébergée ; le déployeur est l'unique responsable du traitement d'une instance auto-hébergée ; les auteurs amont n'exploitent aucun service et ne détiennent aucune donnée.*

### 2.1 Positionnement de l'instance hébergée officielle

L'instance hébergée mail.epocanvas.com est exploitée par l'équipe d'exploitation sur une base non commerciale : aucune publicité n'y est insérée, aucune donnée utilisateur n'y est vendue ou louée, et aucun accord de niveau de service (SLA) de qualité entreprise n'est offert. La disponibilité dépend de services amont tels que Cloudflare et les canaux de distribution ; exportez vous-même, à intervalles réguliers, des sauvegardes de votre correspondance importante (voir la section 3).

### 2.2 Limites de conduite

L'utilisation de l'instance hébergée est soumise à l'intégralité de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/), y compris l'interdiction du pourriels de masse, de l'hameçonnage et de la diffusion de logiciels malveillants, des inscriptions en masse et de l'abus de ressources. Les violations sont traitées selon l'échelle d'exécution prévue par cette politique, jusqu'à la suppression définitive.

### 2.3 Diffusion et modification du code open source

Le code source est publié sous licence MIT ; chacun peut le consulter, l'auditer, le modifier et l'auto-héberger. Lors de la diffusion ou de la modification du code :

1. conservez intégralement la mention de droit d'auteur d'origine et le texte complet de la licence MIT ;
2. ne laissez pas entendre, dans des domaines, des interfaces ou des supports promotionnels, qu'une instance est exploitée ou approuvée par l'équipe officielle ;
3. si vous offrez l'inscription publique à un service de messagerie, publiez votre propre entité exploitante, vos conditions d'utilisation et votre politique de confidentialité. Les documents de ce site peuvent servir de modèle, ce qui ne constitue pas une approbation.

### 2.4 Responsabilité indépendante des instances auto-hébergées

Un tiers qui déploie le code open source devient, dès le déploiement, l'unique et exclusif responsable du traitement pour les utilisateurs de son instance, et doit remplir lui-même les obligations d'information, de maintien de la sécurité et de surveillance exigées par le droit applicable sur son lieu. Les auteurs et contributeurs amont n'exploitent aucune instance, n'accèdent à aucune donnée des instances auto-hébergées et n'assument aucune responsabilité solidaire pour l'exploitation, les incidents de sécurité ou les litiges d'une instance.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Le contrôle de vos données

Vous disposez de droits de consultation, de copie, de rectification, d'opposition au traitement et de suppression sur vos propres données. Ce chapitre explique par quelle fonctionnalité chaque droit se réalise ; les définitions complètes figurent à la section 9 de la [Politique de confidentialité](/fr/mail/privacy-policy/).

<div class="google-illustration-container">
  <img src="/images/mail/fr/data-sovereignty-export.svg" alt="Contrôle des données EpoCanvas Mail : exportation en libre-service, suppression avec tampon de corbeille et droits opposables" width="416" height="276" />
</div>

*Figure : trois voies de contrôle — exportation en libre-service (JSON), suppression (tampon de corbeille, puis suppression définitive) et exercice des droits (réponse sous 30 jours).*

### 3.1 Consultation, exportation et rectification

- **En libre-service dans l'interface** : vous pouvez à tout moment consulter votre profil, vos journaux de connexion et tous vos courriels dans l'interface de la boîte ;
- **Exportation des données** : « Paramètres → Exportation des données » produit une copie complète au format JSON (profil et texte intégral des courriels non supprimés) ; un courriel isolé peut aussi être téléchargé en fichier .eml ;
- **Demandes manuelles** : les demandes nécessitant un traitement humain, telles que la rectification ou l'opposition au traitement, reçoivent une réponse et un traitement dans les 30 jours suivant leur réception, via `privacy@epocanvas.com`.

### 3.2 Suppression

- **Suppression des courriels** : les courriels supprimés passent d'abord à la corbeille et sont supprimés définitivement (pièces jointes et index compris) par une tâche planifiée 7 jours plus tard ; la suppression est irréversible. Lorsque l'utilisation de la boîte dépasse 90 % du quota, les suppressions que vous effectuez sont immédiatement définitives afin de libérer l'espace ;
- **Désactivation du compte** : vous pouvez désactiver votre compte vous-même dans les paramètres. Les sessions prennent fin immédiatement et les courriels et données passent en état de suppression logicielle ; sauf conservation exigée par la loi, un administrateur effectue la suppression définitive dans les 90 jours suivant la désactivation. Après celle-ci, les données du compte, les courriels, les pièces jointes et les autorisations sont retirés de la base de données et du stockage d'objets, sans possibilité de récupération ;
- **Droits légaux correspondants** : les droits de consultation, de copie et de suppression dont disposent, en vertu du RGPD, les utilisateurs de l'Espace économique européen, et les droits d'information, de suppression et de non-discrimination dont disposent, en vertu du CCPA/CPRA, les résidents de Californie, sont mis en œuvre par les fonctions en libre-service et le canal de demande manuelle ci-dessus ; les utilisateurs d'autres juridictions exercent des droits équivalents selon le droit applicable sur leur lieu.

### 3.3 Exclusion de la vente et du suivi

- L'exploitant ne vend, ne loue et ne troque ni vos données personnelles ni le contenu de vos communications ;
- Les données ne sont pas utilisées à des fins de publicité comportementale intersites, de profilage utilisateur ou d'entraînement de modèles commerciaux ;
- L'exercice de vos droits à la confidentialité n'entraîne aucune dégradation des fonctionnalités, de la qualité ou de la disponibilité du service.

### 3.4 Réponse aux incidents de sécurité

Si des données personnelles sont volées, divulguées, altérées ou perdues, l'exploitant procédera comme suit :

1. **Confinement immédiat** : déconnexion forcée des sessions concernées et mise en quarantaine du contenu touché, avec suspension partielle du service si nécessaire pour empêcher l'aggravation du dommage ;
2. **Notification légale** : notification à l'autorité compétente dans les 72 heures suivant la constatation de l'incident (lorsque le droit applicable prévoit un délai différent, ce dernier s'applique et la notification intervient sans délai), et information des personnes touchées par une annonce sur le site ou un courriel système ;
3. **Correctifs publiés** : une fois la cause identifiée, publication des correctifs et d'un avis de sécurité dans le dépôt open source afin que les exploitants auto-hébergés puissent s'aligner.

Pour signaler un problème ou une vulnérabilité de sécurité, utilisez :

- **Sécurité et communications officielles** : `announcement@epocanvas.com`
- **Confidentialité et protection des données** : `privacy@epocanvas.com`
