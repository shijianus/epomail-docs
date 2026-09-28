---
title: Politique de confidentialité
description: Politique de confidentialité d'EpoCanvas Mail — informations à fournir, bases légales de la collecte, du traitement et de l'utilisation, droits de la personne concernée, transferts internationaux et mesures de maintien de la sécurité selon la loi taïwanaise sur la protection des données personnelles (PDPA).
---

# Politique de confidentialité

**Date d'entrée en vigueur : 29 septembre 2026 | Version : 4.1**

La présente politique est établie en vertu du devoir d'information prévu à l'article 8 de la Loi sur la protection des données personnelles (個人資料保護法, « PDPA ») ; elle explique comment le service EpoCanvas Mail (le « Service ») collecte, traite, utilise et transmet vos données personnelles. Vous devez lire la présente politique avant de vous inscrire ou d'utiliser le Service ; si vous n'en acceptez pas l'une quelconque des dispositions, n'utilisez pas le Service.

Les dispositions légales citées dans la présente politique s'entendent des versions en vigueur publiées dans la base de données nationale des lois et règlements (law.moj.gov.tw). Les documents juridiques du présent site font foi dans leur version en chinois traditionnel (Taïwan) ; les versions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut.

![Les cinq piliers de la Politique de confidentialité d'EpoCanvas Mail : la collecte, l'utilisation, le transfert, la sécurité et les droits de la personne concernée, ancrés respectivement dans les articles 19, 20, 21, 20-1 et 3 de la Loi sur la protection des données personnelles, l'ensemble reposant sur le socle de l'obligation de coopérer aux inspections](/images/mail/privacy-pillars.svg)

*Figure : les cinq axes de la présente politique et les articles correspondants de la PDPA. La collecte et l'utilisation demeurent dans la mesure nécessaire à la finalité spécifique (articles 19 et 20) ; les transferts internationaux suivent les ordonnances de restriction de la Commission de protection des données personnelles (PDPC) (article 21) ; le maintien de la sécurité est assuré au titre de l'article 20-1 ; les droits de la personne concernée s'exercent au titre de l'article 3 ; les cinq reposent sur l'obligation de coopérer aux inspections prévue à l'article 22.*

## 1. Champ d'application

La présente politique s'applique aux données personnelles produites par toute utilisation du Service de votre part, notamment :

1. la consultation du site du Service (`mail.epocanvas.com` ou le domaine d'une instance auto-hébergée) ;
2. l'utilisation de l'application mobile (epomail) ;
3. l'accès au Service par son API ouverte.

La présente politique ne s'applique pas aux sites et services tiers que le Service relie ou intègre ; ces tiers ont chacun leur propre politique de confidentialité, dont ils assument seuls la responsabilité.

L'Opérateur qui auto-héberge EpoCanvas Mail devient, à compter du moment du déploiement, le responsable du traitement de ses utilisateurs et doit lui-même remplir envers eux le devoir d'information prévu par la PDPA ; la présente politique peut lui servir de texte de base.

## 2. Responsable du traitement et sous-traitants

| Instance que vous utilisez | Responsable du traitement | Précisions |
| --- | --- | --- |
| Instance hébergée `mail.epocanvas.com` | L'équipe d'exploitation EpoCanvas | S'agissant des données de compte, des enregistrements d'authentification et des journaux d'audit de sécurité, l'équipe d'exploitation est le responsable du traitement ; s'agissant du contenu des courriels que vous envoyez et recevez, elle les traite dans la mesure nécessaire à la fourniture du service de communication |
| Instance auto-hébergée | Le déployeur de l'instance | Le déployeur devient responsable du traitement à compter du moment du déploiement et assume seul l'intégralité des obligations de la PDPA ; le code open source ne comporte aucun mécanisme de télémétrie et ne renvoie aucune donnée d'instance aux auteurs du projet amont ni à un tiers |

Les sous-traitants traitent les données sur instruction du responsable du traitement ; la liste complète figure dans la [Liste des sous-traitants](/fr/mail/sub-processors/).

## 3. Informations à fournir lors de la collecte

Aux termes de l'article 8, paragraphe 1, de la PDPA, le Service vous notifie expressément, lorsqu'il collecte des données personnelles vous concernant, les informations suivantes :

| Information d'origine légale | Contenu notifié par le Service |
| --- | --- |
| 1. Identité du collecteur | L'Opérateur (voir la section 2 ; pour une instance auto-hébergée, son déployeur) |
| 2. Finalités de la collecte | Fourniture du service de communication par courrier électronique ; gestion des comptes et de la sécurité de l'information ; prévention des abus et de la fraude ; envoi des annonces système ; exécution des obligations légales (voir le tableau de correspondance des activités de traitement en section 5) |
| 3. Catégories de données personnelles | Données d'identification (adresse électronique, nom d'utilisateur) ; données de sécurité du compte (hachage du mot de passe, identifiants de la vérification en deux étapes) ; préférences d'interface (langue, mode clair/sombre) ; données d'activité en ligne (journaux de messagerie, étiquettes, étoiles, état de lecture) ; toute autre donnée permettant d'identifier une personne directement ou indirectement (IP de connexion, système d'exploitation, navigateur et type d'appareil déduits du User-Agent) — voir la section 4 |
| 4. Durée, zone, destinataires et modalités d'utilisation | Durée : pendant la vie du compte, certains éléments étant soumis à des durées de conservation fixes (voir la matrice de traitement du document [Traitement des données et maintien de la sécurité](/fr/mail/data-security/)) ; zone : le Service est construit sur le réseau mondial de périphérie de Cloudflare et les données peuvent être traitées sur n'importe quel nœud de périphérie dans le monde (voir la section 7) ; destinataires : l'Opérateur et ses sous-traitants, les applications tierces que vous autorisez et les autorités habilitées par la loi (voir la section 7) ; modalités : stockage, transmission, recherche, notification et inférence en périphérie de manière automatisée, sans examen manuel hors les cas exigés par la loi ou une procédure judiciaire |
| 5. Droits dont la personne concernée peut se prévaloir et modalités d'exercice | Les droits de consultation et d'accès, d'obtention d'une copie, de complétion et de rectification, d'arrêt de la collecte, du traitement et de l'utilisation, et de suppression prévus à l'article 3 de la PDPA ; modalités d'exercice à la section 9 |
| 6. Conséquences d'un défaut de fourniture des données | L'adresse électronique et le mot de passe sont indispensables à l'inscription et à la connexion ; sans eux, aucun compte ne peut être créé. Les autres champs (pseudonyme, avatar, présentation personnelle, etc.) sont facultatifs et leur absence ne fait pas obstacle à l'utilisation du Service |

Lorsque vous vous connectez avec un compte Linux DO, le Service obtient de cette source d'identité vos données d'identification — identifiant d'utilisateur, pseudonyme, avatar, etc. ; il s'agit d'une collecte de données personnelles non fournies directement par vous. Aux termes de l'article 9 de la PDPA, l'Opérateur notifie avant tout traitement ou utilisation : la source de ces données, à savoir le compte Linux DO que vous utilisez pour vous connecter ; la durée, la zone, les destinataires et les modalités d'utilisation, ainsi que les droits dont vous pouvez vous prévaloir et leurs modalités d'exercice, identiques aux notifications des points 2 à 5 du tableau précédent. Le Service ne collecte par ailleurs aucune donnée personnelle provenant d'une autre source que vous.

## 4. Données personnelles collectées

### 4.1 Données que vous fournissez

- **Adresse électronique et mot de passe** : données nécessaires à l'inscription. Le mot de passe n'est conservé que sous forme de hachage PBKDF2-HMAC-SHA256 (100 000 itérations, sel aléatoire indépendant propre à chaque utilisateur) ; le mot de passe d'origine ne peut être reconstitué à partir du hachage.
- **Identifiants de la vérification en deux étapes (facultatif)** : la clé TOTP est stockée chiffrée en AES-256-GCM ; les codes de récupération ne sont conservés que sous forme de hachage SHA-256 ; les clés d'accès (Passkey) ne sont conservées que comme clés publiques, la clé privée demeurant sur votre appareil.
- **Données de profil (facultatif)** : pseudonyme, avatar, présentation personnelle ; les avatars sont téléversés vers le service de stockage d'images configuré par l'Opérateur.

### 4.2 Vos communications

Les courriels que vous envoyez et recevez (avec leurs métadonnées : expéditeur et destinataire, objet, corps, horodatage, etc.) et leurs pièces jointes, ainsi que les étiquettes, étoiles, états de lecture et rappels différés que vous appliquez, sont conservés dans la base de données de l'instance (Cloudflare D1) et son stockage d'objets (Cloudflare R2 ou stockage compatible S3 configuré par l'Opérateur). La propriété et la responsabilité du contenu des courriels vous appartiennent ; l'Opérateur ne vend pas le contenu des courriels, ne l'utilise pas à des fins publicitaires et n'intègre aucun outil de statistiques tiers.

### 4.3 Données techniques enregistrées automatiquement

- **Journaux de connexion et de sécurité** : adresse IP, User-Agent du navigateur, ainsi que le système d'exploitation, le navigateur et le type d'appareil qui en sont déduits, enregistrés lors de l'inscription et de la connexion, aux fins d'audit de sécurité et d'identification des connexions anormales.
- **Jetons de session** : le JWT émis après connexion (valable 30 jours) est stocké dans le localStorage de votre navigateur. Le Service n'utilise pas de cookie et ne pratique aucun suivi intersites.
- **Journaux du réseau de périphérie** : Cloudflare traite les métadonnées des requêtes selon sa propre politique.

### 4.4 Données que le Service ne collecte pas

Le Service ne comporte aucun SDK de suivi publicitaire, aucun profilage comportemental, aucun cookie intersite, ni Google Analytics ni statistiques tierces ; il ne lit pas non plus les contacts, l'album photo, la position ni les données d'autres applications de votre appareil.

### 4.5 Données personnelles sensibles

Aux termes de l'article 6 de la PDPA, les données personnelles concernant les dossiers médicaux, les soins médicaux, la génétique, la vie sexuelle, les bilans de santé et les antécédents judiciaires ne peuvent être collectées, traitées ni utilisées hors les cas de dérogation prévus par la loi. Les champs de compte et les champs système du Service ne collectent aucune donnée de cette nature. Le contenu que vous transmettez vous-même par courrier électronique peut toutefois en contenir ; l'Opérateur le conserve et le transmet passivement dans la seule mesure nécessaire à la fourniture du service de communication, sans l'analyser ni en établir des fichiers. C'est à vous d'apprécier avec prudence la transmission de données de cette nature par courrier électronique.

## 5. Bases légales de la collecte, du traitement et de l'utilisation

Aux termes de l'article 19 de la PDPA, la collecte ou le traitement de données personnelles par un organisme non gouvernemental doit répondre à une finalité spécifique et entrer dans l'une des situations énumérées au paragraphe 1 de cet article. Les bases des activités de traitement du Service sont les suivantes :

| Activité de traitement | Finalité spécifique | Base légale |
| --- | --- | --- |
| Inscription, connexion, gestion des boîtes | Fourniture du service de messagerie | l'article 19, paragraphe 1, 2° (relation contractuelle ou de nature similaire avec la personne concernée, et mesures de sécurité appropriées prises) |
| Journaux de connexion, verrouillage après échecs, vérification en deux étapes | Maintien de la sécurité de l'information | l'article 19, paragraphe 1, 2°, dans le respect du principe de proportionnalité de l'article 5 |
| Extraction automatique des codes de vérification (activation facultative par l'Opérateur) | Amélioration du confort du service | l'article 19, paragraphe 1, 5° (avec le consentement de la personne concernée ; vous pouvez en demander la désactivation ou opter pour une instance où la fonction n'est pas activée) |
| Traduction des courriels, reconnaissance de texte dans les images (à votre initiative) | Assistance au contenu | l'article 19, paragraphe 1, 5° (avec le consentement de la personne concernée ; aucune transmission sans votre déclenchement) |
| Page de profil publique (désactivée par défaut) | Présentation sociale | l'article 19, paragraphe 1, 3° (données personnelles rendues publiques par la personne concernée ou licitement rendues publiques par ailleurs) |
| Annonces système, courriel officiel de bienvenue | Exécution du contrat et communication avec les utilisateurs | l'article 19, paragraphe 1, 2° |

Aux termes de l'article 20 de la PDPA, l'utilisation des données personnelles doit demeurer dans la mesure nécessaire à la finalité spécifique de la collecte ; l'utilisation au-delà de cette finalité n'est permise que dans les situations énumérées au paragraphe 1 de cet article (texte exprès de la loi, avancement de l'intérêt public, consentement de la personne concernée, etc.). Le Service n'utilise pas vos données personnelles pour des décisions automatisées, du profilage d'utilisateurs ni aucune fin commerciale étrangère à la fourniture du Service. Lorsque l'Opérateur fait du marketing au moyen de données personnelles, alors, aux termes du paragraphe 2 du même article, dès que vous manifestez votre refus de recevoir du marketing, il cesse immédiatement cette utilisation ; aux termes du paragraphe 3, lors du premier envoi, il vous fournit le moyen d'exprimer votre refus et en supporte les frais exigés.

## 6. Informations particulières sur les traitements par IA

Le Service met en œuvre trois traitements par IA, dont les conditions de déclenchement et le périmètre de données sont les suivants :

1. **Extraction automatique des codes de vérification** (activation facultative par l'Opérateur) : à l'arrivée d'un nouveau courriel, le système transmet l'objet et les 6 000 premiers caractères du corps à Cloudflare Workers AI pour inférence sur des nœuds de périphérie, afin d'en extraire les codes de vérification présents dans le courriel. C'est le seul traitement par IA non déclenché manuellement par vous ; qui ne le souhaite pas peut demander à l'Opérateur de désactiver la fonction ou opter pour une instance où elle n'est pas activée.
2. **Traduction des courriels** (à votre initiative) : lorsque vous cliquez sur « Traduire », le texte du courriel est transmis par fragments au point de terminaison de grand modèle configuré sur l'instance (protocole compatible OpenAI par défaut), avec les interfaces publiques MyMemory et Google Traduction comme repli. Sans votre déclenchement, le contenu des courriels n'est transmis à aucun service d'IA.
3. **Reconnaissance de texte dans les images** (à votre initiative) : une image contenant du texte n'est transmise aux services d'IA précités que lorsque vous la téléversez ; les images purement décoratives, les logos et les icônes sont automatiquement écartés.

L'Opérateur n'entraîne aucun modèle sur le contenu des courriels et ne transmet aux services d'IA aucune information d'identité au-delà du texte nécessaire à la traduction ou à la reconnaissance. Aux termes de l'article 8, 6°, et de l'article 19, paragraphe 1, 5°, de la PDPA, vous pouvez retirer à tout moment votre consentement aux traitements précités fondés sur le consentement, par les moyens énumérés à la section 9 ; le retrait ne porte pas atteinte aux traitements effectués avant le retrait.

## 7. Partage avec des tiers et transferts internationaux

Le Service partage des données personnelles avec des tiers selon le principe de nécessité minimale, dans les seuls cas suivants (liste complète et mécanismes de garantie : [Liste des sous-traitants](/fr/mail/sub-processors/)) :

1. **Sous-traitance** : Cloudflare (calcul, stockage, routage du courrier, vérification humaine, IA en périphérie), Resend ou Mailjet (acheminement sortant ; seuls les courriels envoyés hors du site impliquent le courriel complet) ;
2. **Sur votre autorisation** : notifications Telegram (seuls les champs que vous configurez sont poussés), applications tierces OAuth (périmètre limité à openid / profile / email, révocable à tout moment), connexion Linux DO ;
3. **À votre initiative** : services d'IA de traduction et de reconnaissance de texte dans les images (voir la section 6) ;
4. **Exigence légale** : communication uniquement sur demande d'une autorité habilitée présentée selon les procédures légales, avec information de votre part dans la mesure permise par la loi.

Aux termes de l'article 21 de la PDPA, lorsqu'un transfert international de données personnelles par un organisme non gouvernemental touche à des intérêts nationaux majeurs, lorsqu'un traité ou un accord international en dispose autrement, lorsque la réglementation du pays destinataire ne protège pas les données personnelles de manière suffisante au point de menacer les droits de la personne concernée, ou lorsqu'il contourne la loi par une transmission détournée vers un pays tiers, l'autorité de contrôle peut le restreindre. Le Service est construit sur le réseau mondial de périphérie de Cloudflare ; vos données personnelles peuvent être traitées sur des nœuds situés hors du pays où l'Opérateur est établi. L'Opérateur se conforme aux ordonnances de restriction prises par la PDPC sur ce fondement et s'appuie sur les mesures de protection des données de Cloudflare (certifications SOC 2 Type II et ISO/IEC 27001, mécanisme des clauses contractuelles types de l'Union européenne) pour garantir la sécurité des transferts. Les Opérateurs auto-hébergés apprécient et garantissent eux-mêmes que leurs transferts internationaux satisfont au même article.

## 8. Durées de conservation et destruction

| Catégorie de données | Règle de conservation |
| --- | --- |
| Courriels de la boîte de réception | Conservés jusqu'à suppression par vous ou jusqu'au déclenchement du nettoyage par quota |
| Pourriels | Quarantaine de 7 jours, puis déplacement vers la corbeille |
| Courriels de la corbeille | Supprimés physiquement par la tâche de routine du système 7 jours après réception (pièces jointes et index compris) |
| Boîte remplie à plus de 90 % | Le système supprime physiquement les courriels déjà marqués comme supprimés afin de libérer l'espace |
| Clôture du compte | Les sessions deviennent immédiatement invalides ; les courriels passent en état de suppression logique jusqu'à la suppression physique par un administrateur |
| Suppression physique | Données de compte, boîtes, courriels, pièces jointes, autorisations OAuth et sessions supprimées ensemble, sans possibilité de restauration |
| Arrêt de l'instance | L'Opérateur doit en aviser à l'avance et offrir une période d'export des données ; après l'arrêt, les données disparaissent avec les ressources Cloudflare |

Les données ne peuvent être récupérées après suppression physique. Avant toute suppression, vous pouvez obtenir une copie complète au format JSON via « Paramètres → Export des données » (données personnelles et texte intégral des courriels non supprimés). La description complète des mesures techniques figure dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/).

## 9. Droits de la personne concernée et modalités d'exercice

Aux termes de l'article 3 de la PDPA, vous disposez à l'égard de vos données personnelles des droits suivants, qui ne peuvent être renoncés par avance ni limités par convention :

1. consulter ou demander l'accès ;
2. demander l'établissement d'une copie (matérialisée par le Service par la fonction « Export des données ») ;
3. demander la complétion ou la rectification ;
4. demander l'arrêt de la collecte, du traitement ou de l'utilisation ;
5. demander la suppression.

Modalités d'exercice : les fonctions en libre-service de l'interface (export, clôture du compte, révocation des autorisations OAuth, déconnexion) produisent un effet immédiat ; les demandes nécessitant un traitement manuel reçoivent une réponse et sont traitées par l'Opérateur dans les 30 jours suivant leur réception. Contact : `privacy@epocanvas.com`.

Si vous estimez qu'une violation de la PDPA par l'Opérateur a porté atteinte à vos droits, vous pouvez demander réparation du préjudice sur le fondement de l'article 29, paragraphe 1, de cette loi ; l'Opérateur n'est déchargé de sa responsabilité que s'il prouve l'absence de faute intentionnelle ou de négligence, la charge de la preuve pesant sur lui. Le paragraphe 2 du même article, appliqué par renvoi aux paragraphes 2 à 6 de l'article 28 : lorsque la victime éprouve de la difficulté à prouver le montant réel de son préjudice, elle peut demander au tribunal de fixer l'indemnité selon la gravité de l'atteinte, entre NT$ 500 et NT$ 20 000 par personne et par événement ; lorsque les droits de plusieurs personnes concernées sont atteints par un même fait générateur, l'indemnité globale est plafonnée à 200 millions de NT$, sauf si les intérêts en cause excèdent ce montant, auquel cas la réparation est limitée à ces intérêts. Vous pouvez également déposer une réclamation auprès de la PDPC. Lorsque l'Opérateur, avec l'intention de se procurer ou de procurer à un tiers un avantage illégal ou de porter atteinte aux intérêts d'autrui, collecte, traite ou utilise des données personnelles en violation de l'article 19 et de l'article 20, paragraphe 1, causant un préjudice à autrui, il engage en outre la responsabilité pénale prévue à l'article 41 de la même loi.

## 10. Mesures de maintien de la sécurité

Aux termes de l'article 20-1 de la PDPA, l'organisme non gouvernemental qui conserve des fichiers de données personnelles doit assurer le maintien de la sécurité afin de prévenir le vol, l'altération, l'endommagement, la perte ou la fuite de données personnelles. L'Opérateur établit et améliore continuellement des mesures de maintien de la sécurité selon les points énumérés à l'article 12 de la Loi d'application (個人資料保護法施行細則), notamment : chiffrement des transmissions en HTTPS/TLS sur tout le site, hachage salé PBKDF2 des mots de passe, chiffrement statique AES-256-GCM des clés TOTP, verrouillage après échecs de connexion (12 heures après 5 échecs consécutifs), plafond de 10 sessions révocables immédiatement, routage des courriels fondé sur des hachages cryptographiques (contre l'accès non autorisé et l'énumération de ressources), en-têtes défensifs et liste blanche MIME pour le téléchargement des pièces jointes. La liste complète, mise en correspondance point par point avec la Loi d'application, figure dans [Traitement des données et maintien de la sécurité](/fr/mail/data-security/).

:::caution[Portée et limites du chiffrement]
Le chiffrement des trois modes de messagerie du Service (« tout », « privé », « chiffré ») est un chiffrement statique côté serveur : les clés sont dérivées des variables d'environnement du serveur d'instance et de l'identifiant de l'utilisateur. Ce mécanisme protège contre le risque de vol du fichier de base de données ou de fuite d'un instantané ; ce n'est pas un chiffrement de bout en bout, et l'Opérateur qui détient le serveur et les clés possède techniquement la capacité de déchiffrer. L'étendue d'accès des administrateurs dépend du mode : en mode « tout », l'administrateur peut lire tous les courriels ; en mode « privé », seuls les pourriels, les courriels supprimés et les courriels sans propriétaire ; en mode « chiffré », l'interface d'administration ne restitue aucun courriel d'utilisateur. Qui exige une confidentialité à l'abri même de l'Opérateur chiffre lui-même le corps du courriel au préalable avec un outil de chiffrement de bout en bout tel que GPG avant de l'envoyer.
:::

## 11. Protection des enfants et des adolescents

Le Service ne s'adresse pas aux enfants de moins de 14 ans et ne collecte sciemment aucune donnée personnelle les concernant. Le titulaire de l'autorité parentale qui estime qu'un enfant a fourni des données personnelles peut contacter l'Opérateur pour en demander la suppression ; après vérification, celle-ci est opérée sans délai. Aux termes de l'article 43 de la Loi relative à la protection du bien-être et des droits des enfants et des adolescents (兒童及少年福利與權益保障法), nul ne doit distribuer ou diffuser vers des enfants et des adolescents des contenus nuisibles à leur santé physique ou mentale ; les restrictions d'utilisation correspondantes figurent dans la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/). Les Opérateurs auto-hébergés fixent eux-mêmes le seuil d'âge selon le droit de leur ressort.

## 12. Supervision administrative et obligation de coopérer aux inspections

Aux termes de l'article 1-1 de la PDPA, l'autorité de contrôle de cette loi est la Commission de protection des données personnelles (PDPC). Aux termes de l'article 22 de la même loi, lorsqu'elle estime qu'un organisme non gouvernemental contrevient à la loi, ou lorsqu'elle juge nécessaire d'examiner la mise en œuvre de la loi, la PDPC peut ordonner à l'organisme de présenter ses observations, exiger la communication des documents, données ou objets nécessaires, ou procéder elle-même, ou conjointement avec l'autorité centrale compétente pour le secteur concerné et les gouvernements des municipalités spéciales et des comtés (villes), à une inspection sur place par des agents porteurs des pièces justificatives de leurs fonctions ; face à ces notifications, à ces entrées, inspections ou décisions, l'organisme contrôlé ne peut, sans motif légitime, s'y soustraire, en entraver l'exécution ou les refuser.

L'Opérateur du Service accepte les inspections et audits de la PDPC effectués selon les dispositions précédentes ; la présente politique et [Traitement des données et maintien de la sécurité](/fr/mail/data-security/) servent de documents de base à ces inspections. Aux termes de l'article 25 de la même loi, en cas d'infraction, la PDPC peut, outre l'infligement d'une amende, interdire la collecte, le traitement ou l'utilisation, ordonner la suppression des fichiers de données personnelles, prononcer la confiscation ou ordonner la destruction des données personnelles collectées illicitement, et publier les manquements ainsi que le nom ou la dénomination du responsable ; l'Opérateur s'exécute selon le contenu de la décision.

## 13. Modifications de la politique

La présente politique peut être révisée en cas d'évolution du Service ou de la réglementation. Les modifications importantes (ajout d'un sous-traitant, changement des règles de conservation ou des modes de chiffrement, etc.) font l'objet d'une notification préalable par annonce interne ou courriel système, et la date d'entrée en vigueur et le numéro de version figurant en tête de la présente page sont mis à jour. Si vous continuez à utiliser le Service après l'entrée en vigueur d'une modification, vous êtes réputé avoir accepté la politique révisée ; si vous n'y consentez pas, vous pouvez cesser toute utilisation et exporter puis supprimer vos données. Les versions successives des révisions importantes sont archivées avec l'historique de versions du dépôt open source.

## 14. Points de contact

- **Confidentialité, exercice des droits et réclamations** : `privacy@epocanvas.com`
- **Contact au sein du produit** : messages internes ou `admin@epocanvas.com`
- **Sites auto-hébergés** : adressez-vous à l'Opérateur indiqué par le site concerné

---

*La présente politique est un document de conformité établi par l'équipe d'exploitation d'EpoCanvas Mail, rédigé selon la Loi sur la protection des données personnelles en vigueur et les lois qui s'y rapportent ; elle ne constitue pas un avis juridique. Les dispositions légales citées s'entendent des versions en vigueur publiées dans la base de données nationale des lois et règlements.*
