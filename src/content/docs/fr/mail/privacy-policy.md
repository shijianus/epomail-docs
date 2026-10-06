---
title: Politique de confidentialité
description: Politique de confidentialité d'EpoCanvas Mail — les standards et engagements en matière de collecte et d'utilisation des données, nature du traitement, droits de la personne concernée, transferts internationaux et mesures de maintien de la sécurité.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.16**

La présente politique explique comment le service EpoCanvas Mail (le « Service ») collecte, traite, utilise et transmet vos données personnelles, ainsi que les standards et engagements que l'Opérateur suit en matière de protection des données. Vous devez lire la présente politique avant de vous inscrire ou d'utiliser le Service ; si vous n'en acceptez pas l'une quelconque des dispositions, n'utilisez pas le Service.

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Les faits techniques décrits dans la présente politique font foi d'après la mise en œuvre réelle du code open source du Service. Les documents juridiques et techniques du présent site visent à établir des normes de communication communautaires non commerciales, transparentes et rigoureuses. Le droit applicable de l'instance que vous utilisez est déterminé par le lieu où réside son Opérateur (voir la section 12).

![Les cinq piliers de la Politique de confidentialité d'EpoCanvas Mail : la collecte, l'utilisation, le transfert, la sécurité et les droits de la personne concernée, ayant respectivement pour contenu le contrat et le consentement, la limitation de la finalité, les garanties de transfert, le maintien de la sécurité et les recours des droits, l'ensemble reposant sur le socle de la supervision par l'autorité](/images/mail/fr/privacy-pillars.svg)

*Figure : les cinq axes de la présente politique. La collecte et l'utilisation demeurent dans la mesure nécessaire à la finalité spécifique ; les transferts internationaux suivent les exigences du droit applicable et les mécanismes de garantie standards ; le maintien de la sécurité est continuellement amélioré ; les droits de la personne concernée s'exercent selon la section 9 ; les cinq reposent sur la supervision par l'autorité.*

## 1. Champ d'application

La présente politique s'applique aux données personnelles produites par toute utilisation du Service de votre part, notamment :

1. la consultation du site du Service (`mail.epocanvas.com` ou le domaine d'une instance auto-hébergée) ;
2. l'utilisation de l'application mobile (epomail) ;
3. l'accès au Service par son API ouverte.

Les adresses électroniques attribuées par l'instance hébergée appartiennent aux domaines `epomail.bond` et `epomail.cyou` ; les courriels officiels du système (courriels de bienvenue, annonces globales) sont envoyés depuis `announcement@epocanvas.com`.

La présente politique ne s'applique pas aux sites et services tiers que le Service relie ou intègre ; ces tiers ont chacun leur propre politique de confidentialité, dont ils assument seuls la responsabilité.

L'Opérateur qui auto-héberge EpoCanvas Mail devient, à compter du moment du déploiement, le responsable du traitement de ses utilisateurs et doit remplir lui-même envers eux le devoir d'information selon le droit applicable en son lieu ; la présente politique peut lui servir de texte de base.

## 2. Responsable du traitement et sous-traitants

| Instance que vous utilisez | Responsable du traitement | Précisions |
| --- | --- | --- |
| Instance hébergée `mail.epocanvas.com` | L'équipe d'exploitation EpoCanvas | S'agissant des données de compte, des enregistrements d'authentification et des journaux d'audit de sécurité, l'équipe d'exploitation est le responsable du traitement ; s'agissant du contenu des courriels que vous envoyez et recevez, elle les traite dans la mesure nécessaire à la fourniture du service de communication |
| Instance auto-hébergée | Le déployeur de l'instance |le code open source ne contient aucun mécanisme de télémétrie ; hors les services externes configurés par l'Opérateur lui-même, il ne renvoie aucune donnée de l'instance vers les auteurs amont ou un tiers |

Les sous-traitants traitent les données sur instruction du responsable du traitement ; la liste complète figure dans la [Liste des sous-traitants](/fr/mail/sub-processors/).

## 3. Informations à fournir lors de la collecte

Le Service vous notifie expressément, lorsqu'il collecte des données personnelles vous concernant, les informations suivantes :

| Informations notifiées | Contenu notifié par le Service |
| --- | --- |
| 1. Identité du collecteur | L'Opérateur (voir la section 2 ; pour une instance auto-hébergée, son déployeur) |
| 2. Finalités de la collecte | Fourniture du service de communication par courrier électronique ; gestion des comptes et de la sécurité de l'information ; prévention des abus et de la fraude ; envoi des annonces système ; exécution des obligations légales (voir le tableau de correspondance des activités de traitement en section 5) |
| 3. Catégories de données personnelles | Données d'identification (adresse électronique, nom d'utilisateur) ; données de sécurité du compte (hachage du mot de passe, identifiants de la vérification en deux étapes) ; préférences d'interface (langue, mode clair/sombre) ; données d'activité en ligne (journaux de messagerie, étiquettes, étoiles, état de lecture) ; toute autre donnée permettant d'identifier une personne directement ou indirectement (IP de connexion, système d'exploitation, navigateur et type d'appareil déduits du User-Agent) — voir la section 4 |
| 4. Durée, zone, destinataires et modalités d'utilisation | Durée : pendant la vie du compte, certains éléments étant soumis à des durées de conservation fixes (voir la matrice de traitement du document [Traitement des données et maintien de la sécurité](/fr/mail/data-security/)) ; zone : le Service est construit sur le réseau mondial de périphérie de Cloudflare et les données peuvent être traitées sur n'importe quel nœud de périphérie dans le monde (voir la section 7) ; destinataires : l'Opérateur et ses sous-traitants, les applications tierces que vous autorisez et les autorités habilitées par la loi (voir la section 7) ; modalités : stockage, transmission, recherche, notification et inférence en périphérie de manière automatisée, sans examen manuel hors les cas exigés par la loi ou une procédure judiciaire |
| 5. Droits dont la personne concernée peut se prévaloir et modalités d'exercice | Les droits de consultation et d'accès, d'obtention d'une copie, de complétion et de rectification, d'arrêt de la collecte, du traitement et de l'utilisation, et de suppression ; modalités d'exercice à la section 9 |
| 6. Conséquences d'un défaut de fourniture des données | L'adresse électronique et le mot de passe sont indispensables à l'inscription et à la connexion ; sans eux, aucun compte ne peut être créé. Les autres champs (pseudonyme, avatar, présentation personnelle, etc.) sont facultatifs et leur absence ne fait pas obstacle à l'utilisation du Service |

Lorsque vous vous connectez avec un compte Linux DO, le Service obtient de cette source d'identité vos données d'identification — identifiant d'utilisateur, pseudonyme, avatar, etc. ; il s'agit d'une collecte de données personnelles non fournies directement par vous, dont la source est le compte Linux DO que vous utilisez pour vous connecter. La durée, la zone, les destinataires et les modalités d'utilisation, ainsi que les droits dont vous pouvez vous prévaloir et leurs modalités d'exercice, sont identiques aux notifications des points 2 à 5 du tableau précédent. Le Service ne collecte par ailleurs aucune donnée personnelle provenant d'une autre source que vous.

## 4. Données personnelles collectées

### 4.1 Données que vous fournissez

- **Adresse électronique et mot de passe** : données nécessaires à l'inscription. Le mot de passe n'est conservé que sous forme de hachage PBKDF2-HMAC-SHA256 (100 000 itérations, sel aléatoire indépendant propre à chaque utilisateur) ; le mot de passe d'origine ne peut être reconstitué à partir du hachage.
- **Identifiants de la vérification en deux étapes (facultatif)** : la clé TOTP est stockée chiffrée en AES-256-GCM ; les codes de récupération ne sont conservés que sous forme de hachage SHA-256 ; les clés d'accès (Passkey) ne sont conservées que comme clés publiques, la clé privée demeurant sur votre appareil.
- **Données de profil (facultatif)** : pseudonyme, avatar, présentation personnelle ; les images d'avatar sont stockées par défaut dans le stockage d'objets propre à l'instance (KV), et l'Opérateur peut configurer un hébergeur d'images externe via une variable d'environnement (voir [Sous-traitants](/fr/mail/sub-processors/)).

### 4.2 Vos communications

Les courriels que vous envoyez et recevez (avec leurs métadonnées : expéditeur et destinataire, objet, corps, horodatage, etc.) et leurs pièces jointes, ainsi que les étiquettes, étoiles, états de lecture et rappels différés que vous appliquez, sont conservés dans la base de données de l'instance (Cloudflare D1) et son stockage d'objets (résolu dans l'ordre selon la configuration de l'instance : votre propre stockage compatible S3, un stockage compatible S3 configuré par l'Opérateur, une liaison Cloudflare R2 ; à défaut, Cloudflare KV). La propriété et la responsabilité du contenu des courriels vous appartiennent ; l'Opérateur ne vend pas le contenu des courriels, ne l'utilise pas à des fins publicitaires et n'intègre aucun outil de statistiques tiers.

### 4.3 Données techniques enregistrées automatiquement

- **Journaux de connexion et de sécurité** : adresse IP, User-Agent du navigateur, ainsi que le système d'exploitation, le navigateur et le type d'appareil qui en sont déduits, enregistrés lors de l'inscription et de la connexion, aux fins d'audit de sécurité et d'identification des connexions anormales.
- **Jetons de session** : le JWT émis après connexion (valable 30 jours) est stocké dans le localStorage de votre navigateur afin de maintenir votre état de connexion et vos préférences d'interface. Le Service n'utilise pas de cookie pour vous identifier ni pour suivre votre comportement, et ne pratique aucun suivi intersites.
- **Cookies et vérification humaine** : la vérification Turnstile est fournie par Cloudflare ; un stockage technique strictement nécessaire à la réalisation du défi peut apparaître dans votre navigateur pendant la vérification. Le Service ne le lit pas et ne l'utilise ni à des fins d'identification ni à des fins publicitaires. Le Service n'intègre aucun script publicitaire, statistique ou de plateforme sociale.
- **Journaux du réseau de périphérie** : Cloudflare traite les métadonnées des requêtes selon sa propre politique.

### 4.4 Données que le Service ne collecte pas

Le Service ne comporte aucun SDK de suivi publicitaire, aucun profilage comportemental, aucun cookie intersite, ni Google Analytics ni statistiques tierces ; il ne lit pas non plus les contacts, l'album photo, la position ni les données d'autres applications de votre appareil.

### 4.5 Données personnelles hautement sensibles

Les données personnelles concernant les dossiers médicaux, les soins médicaux, la génétique, la vie sexuelle, les bilans de santé et les antécédents judiciaires constituent des catégories hautement sensibles, dont la collecte et le traitement sont soumis à des restrictions strictes dans la plupart des juridictions. Les champs de compte et les champs système du Service ne collectent aucune donnée de cette nature. Le contenu que vous transmettez vous-même par courrier électronique peut toutefois en contenir ; l'Opérateur le conserve et le transmet passivement dans la seule mesure nécessaire à la fourniture du service de communication, sans l'analyser ni en établir des fichiers. C'est à vous d'apprécier avec prudence la transmission de données hautement sensibles par courrier électronique.

## 5. Nature du traitement de la collecte, du traitement et de l'utilisation

La nature des activités de traitement du Service est la suivante :

| Activité de traitement | Finalité spécifique | Nature du traitement |
| --- | --- | --- |
| Inscription, connexion, gestion des boîtes | Fourniture du service de messagerie | Traitement nécessaire à l'exécution du contrat, avec adoption de mesures de sécurité appropriées |
| Journaux de connexion, verrouillage après échecs, vérification en deux étapes | Maintien de la sécurité de l'information | Traitement nécessaire à l'exécution du contrat, dans le respect du principe de proportionnalité |
| Extraction automatique des codes de vérification (activation facultative par l'Opérateur) | Amélioration du confort du service | Avec votre consentement ; vous pouvez en demander la désactivation ou opter pour une instance où la fonction n'est pas activée |
| Traduction des courriels, reconnaissance de texte dans les images (à votre initiative) | Assistance au contenu | Avec votre consentement ; aucune transmission sans votre déclenchement |
| Page de profil publique (désactivée par défaut) | Présentation sociale | Données que vous avez rendues publiques vous-même |
| Annonces système, courriel officiel de bienvenue | Exécution du contrat et communication avec les utilisateurs | Traitement nécessaire à l'exécution du contrat |

Vos données personnelles ne sont utilisées que pour la finalité de la collecte et le périmètre étroitement lié à celle-ci. Le Service n'utilise pas vos données personnelles pour des décisions automatisées, du profilage d'utilisateurs ni aucune fin commerciale étrangère à la fourniture du Service. Lorsque l'Opérateur fait du marketing au moyen de données personnelles, dès que vous manifestez votre refus de recevoir du marketing, il cesse immédiatement cette utilisation ; lors du premier envoi marketing, il vous fournit le moyen d'exprimer votre refus.

## 6. Informations particulières sur les traitements par IA

Le Service met en œuvre trois traitements par IA, dont les conditions de déclenchement et le périmètre de données sont les suivants :

1. **Extraction automatique des codes de vérification** (activation facultative par l'Opérateur) : à l'arrivée d'un nouveau courriel, le système transmet l'objet et les 6 000 premiers caractères du corps à Cloudflare Workers AI pour inférence sur des nœuds de périphérie, afin d'en extraire les codes de vérification présents dans le courriel. C'est le seul traitement par IA non déclenché manuellement par vous ; qui ne le souhaite pas peut demander à l'Opérateur de désactiver la fonction ou opter pour une instance où elle n'est pas activée.
2. **Traduction des courriels** (à votre initiative) : lorsque vous cliquez sur « Traduire », le texte du courriel est transmis par fragments au point de terminaison de grand modèle configuré sur l'instance (protocole compatible OpenAI par défaut), avec les interfaces publiques MyMemory et Google Traduction comme repli. Sans votre déclenchement, le contenu des courriels n'est transmis à aucun service d'IA. Lorsque les courriels officiels du système (bienvenue, annonces à l'échelle du système) n'ont pas été modifiés par l'administrateur, leur traduction provient directement des modèles officiels prédéfinis dans la langue correspondante et est rendue localement dans le client, sans transmission du contenu du courriel à aucun service d'IA ; les versions modifiées suivent le flux d'IA décrit.
3. **Reconnaissance de texte dans les images** (à votre initiative) : une image contenant du texte n'est transmise aux services d'IA précités que lorsque vous la téléversez ; les images purement décoratives, les logos et les icônes sont automatiquement écartés.

L'Opérateur n'entraîne aucun modèle sur le contenu des courriels et ne transmet aux services d'IA aucune information d'identité au-delà du texte nécessaire à la traduction ou à la reconnaissance. Vous pouvez retirer à tout moment, par les moyens énumérés à la section 9, votre consentement aux traitements précités fondés sur le consentement ; le retrait ne porte pas atteinte aux traitements effectués avant le retrait.

## 7. Partage avec des tiers et transferts internationaux

Le Service partage des données personnelles avec des tiers selon le principe de nécessité minimale, dans les seuls cas suivants (liste complète et mécanismes de garantie : [Liste des sous-traitants](/fr/mail/sub-processors/)) :

1. **Sous-traitance** : Cloudflare (calcul, stockage, routage du courrier, vérification humaine, IA en périphérie), Resend ou Mailjet (acheminement sortant ; seuls les courriels envoyés hors du site impliquent le courriel complet) ;
2. **Sur votre autorisation** : notifications Telegram (seuls les champs que vous configurez sont poussés), applications tierces OAuth (périmètre limité à openid / profile / email, révocable à tout moment), connexion Linux DO, liaison de niveau de blog (blog.epocanvas.com ; votre adresse électronique est transmise lors de la requête) ;
3. **À votre initiative** : services d'IA de traduction et de reconnaissance de texte dans les images (voir la section 6) ;
4. **Exigence légale** : communication uniquement sur demande d'une autorité habilitée présentée selon les procédures légales, avec information de votre part dans la mesure permise par la loi.

Principes de traitement des demandes des autorités répressives et judiciaires : l'Opérateur ne communique des données que si la demande repose sur une base légale précise, vérifie la licéité et le périmètre de la demande, ne fournit pas de son propre chef de contenu allant au-delà de ce que la demande couvre et informe au préalable les personnes concernées dans la mesure permise par la loi (sauf interdiction légale) ; le Service ne se soumet à aucun accès arbitraire dépourvu de base légale.

Le Service est construit sur le réseau mondial de périphérie de Cloudflare ; vos données personnelles peuvent être traitées sur des nœuds situés hors du pays où réside l'Opérateur. L'Opérateur se conforme aux exigences du droit applicable en matière de transferts internationaux et aux restrictions prononcées par l'autorité compétente conformément à la loi, et s'appuie sur les mesures de protection des données de Cloudflare (certifications SOC 2 Type II et ISO/IEC 27001, mécanisme des clauses contractuelles types de l'Union européenne) pour garantir la sécurité des transferts. Les Opérateurs auto-hébergés apprécient eux-mêmes et garantissent que leurs transferts internationaux satisfont aux exigences légales de leur lieu.

## 8. Durées de conservation et destruction

| Catégorie de données | Règle de conservation |
| --- | --- |
| Courriels de la boîte de réception | Conservés jusqu'à suppression par vous ou jusqu'au déclenchement du nettoyage par quota |
| Pourriels | Quarantaine de 7 jours, puis déplacement vers la corbeille |
| Courriels de la corbeille | Supprimés physiquement par la tâche de routine du système 7 jours après réception (pièces jointes et index compris) |
| Courriels officiels du système (courriels de bienvenue, annonces globales) | expiration et suppression automatiques 7 jours après l'envoi par défaut ; l'Opérateur peut configurer le délai |
| Boîte remplie à plus de 90 % | Le système supprime physiquement les courriels déjà marqués comme supprimés afin de libérer l'espace |
| Clôture du compte | Les sessions deviennent immédiatement invalides ; les courriels passent en état de suppression logique et, sauf conservation exigée par la loi, un administrateur effectue la suppression physique dans les 90 jours |
| Suppression physique | Données de compte, boîtes, courriels, pièces jointes, autorisations OAuth et sessions supprimées ensemble, sans possibilité de restauration |
| Traitement des violations | après le bannissement d'un compte pour violation, l'Opérateur peut purger de force ses courriels et pièces jointes pour libérer de l'espace (voir l'échelle d'application de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/)) |
| Arrêt de l'instance | L'Opérateur doit en aviser à l'avance et offrir une période d'export des données ; après l'arrêt, les données disparaissent avec les ressources Cloudflare |

Les données ne peuvent être récupérées après suppression physique. Avant toute suppression, vous pouvez obtenir une copie complète au format JSON via « Paramètres → Export des données » (données personnelles et texte intégral des courriels non supprimés). La description complète des mesures techniques figure dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/).

## 9. Droits de la personne concernée et modalités d'exercice

Vous disposez à l'égard de vos données personnelles des droits suivants :

1. consulter ou demander l'accès ;
2. demander l'établissement d'une copie (matérialisée par le Service par la fonction « Export des données ») ;
3. demander la complétion ou la rectification ;
4. demander l'arrêt de la collecte, du traitement ou de l'utilisation ;
5. demander la suppression.

Modalités d'exercice : les fonctions en libre-service de l'interface (export, clôture du compte, révocation des autorisations OAuth, déconnexion) produisent un effet immédiat ; les demandes nécessitant un traitement manuel reçoivent une réponse et sont traitées par l'Opérateur dans les 30 jours suivant leur réception. Contact : `privacy@epocanvas.com`.

Si vous estimez que le traitement du Service a porté atteinte à vos droits, vous pouvez demander réparation auprès de l'Opérateur ; l'Opérateur est tenu d'expliquer et d'établir la licéité de son traitement. Vous pouvez également saisir l'autorité compétente du lieu où réside l'Opérateur ou engager un recours juridique (le droit applicable est exposé à la section 12).

## 10. Mesures de maintien de la sécurité

L'Opérateur établit et améliore continuellement des mesures de maintien de la sécurité afin de prévenir le vol, l'altération, l'endommagement, la perte ou la fuite de données personnelles, notamment : chiffrement des transmissions en HTTPS/TLS sur tout le site, hachage salé PBKDF2 des mots de passe, chiffrement statique AES-256-GCM des clés TOTP, verrouillage après échecs de connexion (12 heures après 5 échecs consécutifs), plafond de 10 sessions révocables immédiatement, routage des courriels fondé sur des hachages cryptographiques (contre l'accès non autorisé et l'énumération de ressources), en-têtes défensifs et liste blanche MIME pour le téléchargement des pièces jointes. La liste complète figure dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/).

:::caution[Portée et limites du chiffrement]
Le chiffrement des trois modes de messagerie du Service (« tout », « privé », « chiffré ») est un chiffrement statique côté serveur : les clés sont dérivées des variables d'environnement du serveur d'instance et de l'identifiant de l'utilisateur. Ce mécanisme protège contre le risque de vol du fichier de base de données ou de fuite d'un instantané ; ce n'est pas un chiffrement de bout en bout, et l'Opérateur qui détient le serveur et les clés possède techniquement la capacité de déchiffrer. L'étendue d'accès des administrateurs dépend du mode : en mode « tout », l'administrateur peut lire tous les courriels ; en mode « privé », seuls les pourriels, les courriels supprimés et les courriels sans propriétaire ; en mode « chiffré », l'interface d'administration ne restitue aucun courriel d'utilisateur. Qui exige une confidentialité à l'abri même de l'Opérateur chiffre lui-même le corps du courriel au préalable avec un outil de chiffrement de bout en bout tel que GPG avant de l'envoyer.
:::

## 11. Protection des enfants et des adolescents

Le Service ne s'adresse pas aux enfants de moins de 14 ans et ne collecte sciemment aucune donnée personnelle les concernant. Le titulaire de l'autorité parentale qui estime qu'un enfant a fourni des données personnelles peut contacter l'Opérateur pour en demander la suppression ; après vérification, celle-ci est opérée sans délai. Nul ne peut utiliser le Service pour distribuer vers des enfants et des adolescents des contenus nuisibles à leur santé physique ou mentale ; les restrictions d'utilisation correspondantes figurent dans la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/). Les Opérateurs auto-hébergés fixent eux-mêmes le seuil d'âge selon le droit de leur ressort.

## 12. Droit applicable et supervision par l'autorité

Le projet open source ne fournit aucun service et ne répond pas de la conformité d'une quelconque instance ; les obligations légales sont supportées par le sujet qui exploite le service. Le droit applicable de chaque instance est déterminé par le lieu où réside son Opérateur : l'instance hébergée `mail.epocanvas.com` est exploitée par l'équipe d'exploitation depuis Taïwan ; le traitement des données personnelles de cette instance est soumis au droit taïwanais en vigueur (y compris la Loi sur la protection des données personnelles (個人資料保護法, « PDPA »)), et l'Opérateur accepte les inspections et la supervision que l'autorité compétente de cette loi met en œuvre conformément à la loi ; la présente politique et [Traitement des données et maintien de la sécurité](/fr/mail/data-security/) servent de documents de base à ces inspections. Le droit applicable des instances auto-hébergées est le droit du lieu où réside leur déployeur ; les obligations d'information, de maintien de la sécurité et de soumission à la supervision sont remplies par le déployeur lui-même.

## 13. Modifications de la politique

La présente politique peut être révisée en cas d'évolution du Service ou de la réglementation. Les modifications importantes (ajout d'un sous-traitant, changement des règles de conservation ou des modes de chiffrement, etc.) font l'objet d'une notification préalable par annonce interne ou courriel système, et la date d'entrée en vigueur et le numéro de version figurant en tête de la présente page sont mis à jour. Si vous continuez à utiliser le Service après l'entrée en vigueur d'une modification, vous êtes réputé avoir accepté la politique révisée ; si vous n'y consentez pas, vous pouvez cesser toute utilisation et exporter puis supprimer vos données. Les versions successives des révisions importantes sont archivées avec l'historique de versions du dépôt open source.

## 14. Points de contact

- **Confidentialité, exercice des droits et réclamations** : `privacy@epocanvas.com`
- **Contact au sein du produit** : messages internes ou `admin@epocanvas.com`
- **Sites auto-hébergés** : adressez-vous à l'Opérateur indiqué par le site concerné

---

*La présente politique est un document de conformité établi par l'équipe d'exploitation d'EpoCanvas Mail ; elle ne constitue pas un avis juridique. Le droit applicable de chaque instance est déterminé par le lieu où réside son Opérateur.*
