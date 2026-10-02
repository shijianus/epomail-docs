---
title: Conditions d'utilisation
description: Conditions d'utilisation d'EpoCanvas Mail — acceptation et examen des conditions, règles de compte, contenu des utilisateurs, limitations de responsabilité, droit applicable et juridiction.
---

# Conditions d'utilisation

**Date d'entrée en vigueur : 2 octobre 2026 | Version : 5.7**

Les présentes conditions constituent l'accord conclu entre vous et l'Opérateur de l'instance que vous utilisez, au sujet de l'utilisation du service EpoCanvas Mail (le « Service »). En achevant votre inscription, en vous connectant ou en utilisant le Service par tout autre moyen, vous déclarez avoir lu et accepter l'intégralité des présentes conditions ; si vous n'y consentez pas, n'effectuez pas d'inscription et n'utilisez pas le Service.

Les présentes conditions constituent des clauses types : le texte intégral est publié en libre accès sur la page d'inscription pour votre examen, et les versions historiques sont archivées avec le dépôt open source. Le consentement que vous donnez par voie électronique a la même valeur qu'un document et qu'une signature matériels. Les droits que le droit applicable ne permet pas d'exclure ou de limiter par des clauses types ne sont pas affectés par les présentes conditions.

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Les documents juridiques et techniques du présent site visent à établir des normes de communication communautaires non commerciales, transparentes et rigoureuses.

![Cycle de vie contractuel des Conditions d’utilisation d’EpoCanvas Mail : consentement électronique (l’inscription vaut acceptation, même force que l’écrit) → exécution (sécurité du compte, votre contenu, limites de responsabilité) → révision (annonce des changements majeurs avant entrée en vigueur) → fin (résiliation, export et suppression des données), sur fond de droit applicable et de juridiction (lieu de l’Opérateur ; instance hébergée : Taïwan)](/images/mail/tos-contract.svg)

*Figure : le cycle de vie du contrat, de sa formation à sa fin. Le consentement électronique a la même force que l’écrit ; compte, contenu et responsabilité aux sections 3, 5 et 10 ; révision à la section 12 ; résiliation et suppression des données à la section 8 ; droit applicable et juridiction à la section 11.*
## 1. Définitions

1. **Le Service** : l'ensemble des fonctionnalités fonctionnant sur une instance EpoCanvas Mail, y compris l'interface web, l'application mobile (epomail), l'API ouverte et les composants associés.
2. **Opérateur** : la personne ou l'équipe qui déploie et fait fonctionner l'instance que vous utilisez. S'agissant de l'instance hébergée `mail.epocanvas.com`, il s'agit de l'équipe d'exploitation EpoCanvas ; s'agissant d'une instance auto-hébergée, de son déployeur.
3. **Vous (la partie)** : la personne physique ou l'organisation qui s'inscrit, se connecte ou utilise le Service par tout autre moyen.
4. **Formation du contrat** : le contrat se forme avec l'Opérateur de l'instance sur laquelle vous vous inscrivez. Les présentes conditions constituent un modèle général : l'instance hébergée les applique directement ; un Opérateur auto-hébergé peut les adapter comme conditions de son site et doit alors remplir envers ses utilisateurs le devoir d'information selon le droit applicable en son lieu.

## 2. Description du Service

Le Service offre la gestion de plusieurs boîtes, l'envoi et la réception de courriels à l'intérieur et à l'extérieur du site, les pièces jointes, les étiquettes et les étoiles, la mise en quarantaine des pourriels, les rappels différés, la recherche, la traduction par IA (facultative), l'extraction automatique des codes de vérification (facultative), les notifications Telegram (facultatives), la vérification en deux étapes (TOTP ou clés d'accès), une plateforme ouverte OAuth et l'export des données ; les fonctionnalités réellement disponibles dépendent de celles que l'instance a activées.

Le Service repose sur un projet open source sous licence MIT et s'inscrit dans la continuité de l'open source : le code source est public et auditable, et vous pouvez le déployer vous-même pour obtenir des capacités équivalentes. Le logiciel lui-même est fourni « en l'état » ; les termes de sa licence sont cohérents avec les stipulations de responsabilité des présentes conditions (voir la section 10).

## 3. Demande de compte et sécurité

1. **Informations d'inscription** : l'inscription requiert une adresse électronique de réception valide et un mot de passe. Vous ne devez pas usurper l'identité d'autrui ni utiliser un domaine dont vous n'avez pas le droit de vous prévaloir.
2. **Conditions d'admission** : vous confirmez être âgé d'au moins 14 ans ; les personnes de moins de 14 ans ne peuvent pas utiliser le Service. Vous devez en outre veiller à ce que votre inscription et votre usage demeurent dans les limites permises par le droit du lieu où vous vous trouvez.
3. **Garde des identifiants** : vous êtes responsable de la garde de votre mot de passe, de vos identifiants de vérification en deux étapes et de vos jetons API. Les opérations effectuées au moyen de vos identifiants sont présumées être les vôtres.
4. **Vérification en deux étapes** : l'activation de TOTP ou des clés d'accès est recommandée. Les instances adoptant le mode de messagerie « chiffré » peuvent en imposer l'activation au titre de leur politique de sécurité.
5. **Protection des connexions** : 5 échecs de mot de passe consécutifs entraînent un verrouillage de la connexion pendant 12 heures ; un compte conserve au plus 10 sessions actives, et vous pouvez vous déconnecter depuis n'importe quel appareil pour révoquer les jetons immédiatement.
6. **Restrictions d'inscription** : les identifiants tels que `admin` sont réservés par le système ; l'Opérateur peut configurer l'instance pour subordonner l'inscription à une clé d'inscription ou fermer l'inscription, ce qui relève de son pouvoir d'administration de l'instance.

## 4. Fourniture et évolution du Service

1. **Disponibilité** : le Service fonctionne sur l'infrastructure en périphérie de Cloudflare ; l'Opérateur déploie des efforts raisonnables pour en maintenir la disponibilité, mais ne s'engage sur aucun taux de disponibilité, délai d'acheminement ni délai de rétablissement, et ne fournit aucun accord de niveau de service (SLA).
2. **Évolution des fonctionnalités** : le projet open source évolue en continu ; des fonctionnalités peuvent être ajoutées, ajustées ou retirées ; les changements importants affectant la capacité de suppression des données feront l'objet d'une annonce préalable.
3. **Fonctionnalités expérimentales** : les fonctionnalités marquées « expérimental » ou en phase de test (comme la reconnaissance de texte dans les images pour la traduction) sont fournies en l'état, peuvent être instables et peuvent être ajustées ou retirées à tout moment.
4. **Maintenance et interruptions** : l'Opérateur peut suspendre une partie ou la totalité du Service pour mise à niveau, réparation ou traitement d'abus ; les indisponibilités résultant de défaillances de Cloudflare ou des fournisseurs amont d'IA ou d'acheminement ne constituent pas une faute contractuelle de l'Opérateur.

## 5. Votre contenu

1. **Propriété** : la propriété et la responsabilité des courriels que vous envoyez et recevez, pièces jointes comprises, vous appartiennent. L'Opérateur n'utilise pas votre contenu à des fins publicitaires, d'entraînement de modèles ni de cession.
2. **Autorisation de traitement** : pour fournir le stockage, l'acheminement, la recherche, la notification et la fonction (facultative) de traduction, vous autorisez l'Opérateur à effectuer le traitement technique dans la seule mesure nécessaire à l'exploitation du Service ; l'autorisation prend fin lorsque vous cessez d'utiliser le Service et que vos données ont été supprimées.
3. **Responsabilité d'envoi** : vous êtes responsable de chaque courriel que vous envoyez ; les litiges et responsabilités nés du contenu envoyé sont à votre charge.
4. **Information sur l'accessibilité du contenu** : l'Opérateur ne passe normalement pas au crible vos courriels ordinaires. Toutefois, en mode « tout », l'administrateur peut techniquement lire l'intégralité des courriels (en mode « privé », seuls les pourriels, les courriels supprimés et les courriels sans propriétaire), et agit sur signalement ou sur exigence légale. Avant de choisir une instance, vous devez connaître son mode de fonctionnement ; pour des exigences de confidentialité, voir l'exposé de la portée du chiffrement à la section 10 de la [Politique de confidentialité](/fr/mail/privacy-policy/).

## 6. Acheminement sortant et services tiers

1. **Acheminement sortant** : les courriels envoyés hors du site sont acheminés par le canal configuré par l'Opérateur (Cloudflare Email Workers, Resend ou Mailjet). L'acheminement par des tiers peut subir des retards, des rebonds ou un blocage par le fournisseur du destinataire ; l'Opérateur ne garantit pas le résultat de l'acheminement.
2. **Conditions des tiers** : lorsque vous utilisez les notifications Telegram, la traduction par IA, la connexion Linux DO, un stockage S3 externe ou des fonctions similaires, vous êtes également lié par les conditions de ces services tiers.
3. **Plateforme ouverte OAuth** : lorsque vous autorisez des applications tierces via OAuth, le périmètre d'autorisation (openid / profile / email) et le mode de révocation figurent à la section 7 de la [Politique de confidentialité](/fr/mail/privacy-policy/) ; l'usage que ces applications font des données relève de leurs propres conditions.

## 7. Utilisation acceptable

L'utilisation du Service est soumise à l'intégralité des stipulations de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/), y compris l'interdiction de transmettre des contenus illicites, d'envoyer des pourriels en masse, d'attaquer le système ou de gêner l'usage d'autrui. En cas de violation, l'Opérateur peut prendre les mesures selon les procédures fixées par cette politique, jusqu'à la suppression du compte et de l'ensemble des données, et conserve les preuves conformément à la loi afin de coopérer aux enquêtes des autorités habilitées.

## 8. Conservation, suppression des données et clôture du compte

1. **Clôture par vous** : vous pouvez à tout moment clôturer votre compte en libre-service depuis les paramètres, ou demander sa suppression à l'Opérateur. Après la clôture, les sessions deviennent immédiatement invalides ; les courriels passent en état de suppression logique jusqu'à la suppression physique par un administrateur.
2. **Nettoyage de routine du système** : les pourriels passent en corbeille après 7 jours de quarantaine ; les courriels de la corbeille sont physiquement supprimés par le système 7 jours après réception (pièces jointes comprises). La suppression est irréversible ; obtenez d'abord une copie JSON via « Export des données ».
3. **Clôture par l'Opérateur** : en cas de violation de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/), l'Opérateur peut suspendre ou résilier votre droit d'usage selon cette politique.
4. **Conservation légale** : lorsque la conservation est exigée par la loi ou nécessaire à une procédure judiciaire, l'Opérateur peut différer la suppression dans la mesure nécessaire et procéder selon la procédure légale.

## 9. Notification des mesures et recours

Avant de suspendre ou de résilier votre droit d'usage au titre de « l'utilisation acceptable » ou de la section précédente, l'Opérateur doit vous en informer et vous donner la possibilité de vous expliquer ou de remédier au manquement, sauf urgence (attaque en cours, transmission de contenus illicites, par exemple). Si vous estimez la mesure erronée, vous pouvez former un recours selon la procédure de la section « Recours et signalement » de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) ; l'Opérateur réexamine et répond dans un délai raisonnable.

Les notifications prévues aux présentes conditions effectuées sous forme de document électronique sont réputées notifiées au moment où le document entre dans le système d'information du destinataire ou dans celui que celui-ci a désigné. L'adresse électronique que vous indiquez lors de l'inscription constitue le lieu de signification des notifications électroniques ; vous devez maintenir cette adresse en état de recevoir normalement du courrier.

## 10. Exclusion de garanties et limitation de responsabilité

1. **Fourniture en l'état** : le Service (logiciel compris) est fourni « en l'état » et « selon la disponibilité », sans garantie expresse ou implicite d'aucune sorte, y compris les garanties de qualité marchande, d'adéquation à un usage particulier et d'absence de contrefaçon ; cette stipulation est cohérente avec l'étendue d'exonération de la licence MIT dont relève le logiciel.
2. **Limites d'efficacité** : la stipulation précédente et toute autre clause exonérant ou allégeant la responsabilité de l'Opérateur, aggravant la vôtre ou restreignant vos droits ne lient pas, dans la partie qui, selon les circonstances, est manifestement déloyale ou non permise par le droit applicable.
3. **Limitation de responsabilité** : dans la mesure maximale permise par la loi, la responsabilité cumulée de l'Opérateur à votre égard est limitée au montant le plus élevé entre les frais que vous avez effectivement versés à l'Opérateur au cours des 12 derniers mois (généralement nuls pour une instance gratuite) et 100 dollars des États-Unis. L'Opérateur ne répond pas des dommages indirects, de la perte de données, des pertes d'exploitation ni des atteintes à la réputation commerciale. Vous devez assurer vous-même une sauvegarde distincte de vos courriels importants.
4. **Responsabilité légale non plafonnée** : la responsabilité que le droit applicable ne permet pas d'exclure ou de limiter par convention (y compris la responsabilité née de la violation par l'Opérateur de ses obligations de protection des données personnelles) n'est ni exonérée ni limitée par le plafond du point précédent.
5. **Force majeure** : pour les interruptions de service et pertes de données dues à des catastrophes naturelles, à la guerre, à des actes gouvernementaux, à des défaillances du réseau dorsal, à des cyberattaques massives ou à l'arrêt de service de fournisseurs tiers, l'Opérateur ne répond pas, sous réserve d'efforts raisonnables déjà déployés.

## 11. Droit applicable, juridiction et supervision administrative

1. L'interprétation, la validité et l'exécution des présentes conditions prennent pour droit applicable le droit du lieu où réside l'Opérateur : le droit taïwanais pour l'instance hébergée `mail.epocanvas.com` ; le droit du lieu où réside le déployeur pour une instance auto-hébergée.
2. Les différends nés des présentes conditions font d'abord l'objet d'une négociation entre les parties ; à défaut d'accord, les différends relatifs à l'instance hébergée sont portés devant le tribunal de district de Taipei (Taïwan) comme juridiction de première instance, et ceux relatifs aux instances auto-hébergées suivent la compétence publiée par leur Opérateur. Lorsque le droit prévoit impérativement une autre compétence, cette disposition s'applique.
3. Le traitement des données personnelles de l'instance hébergée est soumis au droit taïwanais ; l'Opérateur accepte les inspections et la supervision que l'autorité compétente met en œuvre conformément à la loi, et établit et améliore continuellement ses mesures de maintien de la sécurité des fichiers de données personnelles (voir [Traitement des données et maintien de la sécurité](/fr/mail/data-security/)).

## 12. Révision des conditions

Les présentes conditions peuvent être révisées au gré de l'évolution du Service. Les modifications importantes font l'objet d'une notification par annonce interne ou courriel système, et la date d'entrée en vigueur et le numéro de version figurant en tête de la présente page sont mis à jour. Si vous continuez à utiliser le Service après l'entrée en vigueur d'une modification, vous êtes réputé avoir accepté les conditions révisées ; si vous n'y consentez pas, vous devez cesser toute utilisation et exporter puis supprimer vos données. Les versions historiques des révisions importantes sont archivées avec l'historique de versions du dépôt open source ; les conditions révisées sont, avant leur entrée en vigueur, rendues publiquement consultables selon les modalités exposées ci-dessus.

## 13. Coordonnées

- **Instance hébergée (`mail.epocanvas.com`)** : messages internes ou `admin@epocanvas.com` ; pour les questions de confidentialité et les réclamations, `privacy@epocanvas.com`
- **Projet open source** : tickets (Issues) du dépôt GitHub (`github.com/shijianus/epomail`)
- **Sites auto-hébergés** : adressez-vous à l'Opérateur du site concerné

---

*Les présentes conditions forment, avec la [Politique de confidentialité](/fr/mail/privacy-policy/) et la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/), l'ensemble de l'accord conclu entre vous et l'Opérateur ; l'ordre d'application entre les documents figure dans la [Vue d'ensemble de la confidentialité et des conditions](/fr/mail/overview/). Le présent document est un modèle général établi par la communauté open source ; il ne constitue pas un avis juridique ; avant toute exploitation, l'Opérateur doit consulter un avocat et adapter le texte à son activité réelle.*
