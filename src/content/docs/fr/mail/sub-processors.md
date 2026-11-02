---
title: Liste des destinataires tiers et sous-traitants
description: Parcours connus de transmission de données configurables, contenus transmis et rôles des destinataires, ainsi que les lieux, contrats, durées de conservation et garanties de transfert transfrontière que l'instance doit vérifier.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.21**


<!-- legal-review-draft -->
:::caution[Projet soumis à revue juridique : non applicable comme notice actuelle]
Ce projet présente des clauses proposées et des éléments restant à vérifier. Il ne remplace pas la notice actuellement en vigueur et ne certifie pas la conformité. Il ne doit pas servir à activer un traitement avant vérification de l’identité de l’exploitant, des coordonnées légalement requises, des bases juridiques réelles, des destinataires, des garanties de transfert, de la conservation et de l’effacement, et avant fourniture de l’information requise. La version faisant autorité désigne la base rédactionnelle en chinois traditionnel, non une entrée en vigueur. Les obligations légales et les droits existants restent inchangés.
:::

Cette page décrit, conformément à la [Politique de confidentialité](/fr/mail/privacy-policy/), les flux de données vers des tiers susceptibles de se produire dans la mise en œuvre open source. La liste couvre les sous-traitants d'infrastructure, les services indépendants, les correspondants et les intégrations que vous choisissez ; elle ne signifie pas que tous les services ci-dessous sont activés dans l'instance hébergée et ne remplace pas les contrats fournisseurs ni les journaux de configuration réels.

La version en chinois traditionnel (Taïwan) est la version officielle ; les traductions ne limitent ni le droit applicable ni les droits des personnes concernées. L'exploitant ne doit activer que des flux ayant une base juridique valable, une information nécessaire et des garanties appropriées ; le caractère gratuit ou éducatif du test ne constitue pas une autorisation générale de transmettre des données réelles.

![Flux de données entre l'instance et l'infrastructure, les intégrations choisies, les traitements de contenu et les destinataires légaux](/images/mail/fr/subprocessor-map.svg)

*Figure : les rôles et garanties de chaque destinataire doivent être vérifiés pour chaque flux ; la certification d'un fournisseur ou la mise à disposition d'un modèle de contrat ne signifie pas que chaque transfert satisfait aux exigences applicables.*

## 1. Infrastructure et livraison des courriels

| Destinataire ou configuration | Situation déclenchante | Données auxquelles l'accès est possible | Rôle et éléments à vérifier |
| --- | --- | --- | --- |
| Cloudflare | Workers, D1, KV, R2, Email Routing, Turnstile, Workers AI et journaux de plateforme, selon les liaisons activées | Données de requête et d'authentification, comptes et courriels stockés, routage, pièces jointes et contenus transmis pour les fonctionnalités concernées | Vérifier l'entité contractante, les conditions de traitement des données de chaque service, les finalités des journaux, les lieux de stockage et de traitement et les sous-traitants ultérieurs ; aucun traitement exclusivement en Europe n'est garanti |
| Resend, Mailjet ou canal sortant configuré | Envoi d'un courriel hors du site ou d'une notification système déterminée | Adresse, objet, corps, pièces jointes et données nécessaires au rapport de livraison | Vérifier le contrat de sous-traitance, la conservation des journaux et les garanties transfrontières selon le canal réellement utilisé ; ne pas déduire le lieu du seul nom du produit |
| Destinataires et leurs fournisseurs de messagerie | Envoi ou transfert par vous ou selon une règle configurée légalement | Contenu envoyé, champs de routage et pièces jointes | Le destinataire détermine généralement de façon indépendante le traitement ultérieur ; il n'est pas systématiquement un sous-traitant de l'instance et l'envoi peut être irrévocable |

## 2. Identité, notifications et fonctionnalités publiques

| Destinataire ou configuration | Situation déclenchante | Données transmises ou rendues publiques | Limites d'utilisation et de révocation |
| --- | --- | --- | --- |
| Sources d'identité Linux DO, GitHub, Google, Microsoft, Apple ou SSO personnalisé | Connexion par le SSO correspondant ; la connexion externe globale est désactivée par défaut dans la version examinée | Échange OAuth/OIDC, identifiant, nom, avatar, adresse électronique, niveau de confiance et attributs effectivement renvoyés | La source et l'instance traitent les données selon leurs rôles effectifs ; l'autorisation de connexion ne vaut pas consentement à tout usage ultérieur |
| Applications OAuth/OIDC autorisées | L'instance fournit l'autorisation et la connexion à l'application | L'implémentation peut renvoyer notamment sub, email, état de vérification, nom, nom d'utilisateur, avatar et champs de rôle tels que is_admin/role ; la réponse n'est pas nécessairement limitée individuellement aux scopes demandés | Ne pas affirmer que seuls openid/profile/email sont partagés ; informer des champs réellement transmis et corriger toute divulgation dépassant le nécessaire. La révocation ne retire pas un ID token déjà émis ni les données déjà obtenues par le destinataire |
| Telegram et services de robots | Liaison et activation par le système ou l'utilisateur des notifications ou des transferts ; les notifications globales sont désactivées par défaut dans la version examinée | Identifiant de conversation, objet ; selon la configuration, expéditeur, destinataire et corps ; lorsqu'un résultat d'extraction est disponible, code de vérification, ainsi qu'un lien JWT de lecture accessible à son détenteur et valable 7 jours | Certains champs et le lien sont ajoutés systématiquement ; ne pas les décrire comme tous sélectionnables champ par champ ; les copies et transferts depuis la conversation ne sont pas contrôlés par l'instance, et l'arrêt des notifications ne supprime pas les messages existants |
| Blog ou point de terminaison configuré pour la liaison de niveau | Connexion, synchronisation de quota ou exécution d'un flux de requête associé selon la configuration | Identifiant d'adresse électronique et informations de niveau ou de relation | Ne pas décrire cette transmission comme ayant lieu uniquement lorsqu'on ouvre manuellement la page de niveau ; vérifier le point de terminaison, la nécessité, la base juridique et la fréquence de mise à jour |
| Hébergeur d'images, source d'avatar et visiteurs d'une page de profil publique | Téléversement, affichage d'une image externe ou activation d'une page publique | Image et données de requête ; la page publique peut inclure la boîte principale, le rôle, les champs personnels et des statistiques d'activité ou de source | Vérifier selon la configuration le stockage par défaut et l'hébergement externe ; masquer les statistiques dans l'interface ne limite pas nécessairement l'accès à l'API ; voir la section 4 de la Politique de confidentialité |

Un lien de lecture peut permettre l'accès à toute personne qui le détient ; il ne doit pas être considéré comme une authentification de connexion ou un chiffrement de bout en bout. Sa durée et sa révocation dépendent du mécanisme réel d'émission et de validation ; tant qu'elles ne sont pas vérifiées, ne promettez pas que tous les liens expirent au bout de 7 jours ou deviennent invalides dès la désactivation du compte.

## 3. IA, traduction et reconnaissance d'images

| Destinataire ou configuration | Situation déclenchante | Données susceptibles d'être transmises | Portée et limites vérifiées |
| --- | --- | --- | --- |
| Modèle de codes de vérification Cloudflare Workers AI | Réception d'un nouveau courriel après activation du commutateur global de codes de vérification ; désactivé par défaut dans la version examinée | Objet complet et jusqu'à 6 000 caractères JavaScript de texte du corps | L'objet n'est pas compris dans la limite du corps ; aucun mécanisme individuel de désactivation n'a été observé, et le commutateur global ne vaut pas consentement individuel |
| Modèle de texte compatible avec OpenAI configuré et Workers AI | Utilisation de la traduction et de son routage ou de ses mécanismes de repli | Texte traduit, instructions et éventuelles données personnelles ou sensibles incluses | La compatibilité de protocole ne signifie pas que le destinataire est OpenAI ; indiquer l'entité effective, le point de terminaison et les conditions de conservation |
| Interfaces publiques MyMemory et Google Traduction | Repli de traduction ou complément de segments de texte manquants | Extraits de texte et instructions | Ne se produit pas uniquement en cas de panne de l'ensemble du point de terminaison du modèle ; le contenu des URL peut apparaître dans les journaux du service et des intermédiaires ; ne pas transmettre de données confidentielles réelles avant vérification des garanties |
| Workers AI ou modèle visuel externe configuré | OCR activé dans le flux de traduction ; les appels API sans paramètre peuvent utiliser une autre valeur par défaut | Octets d'image intégrée ou URL d'image distante avec chemin complet et paramètres de requête ; le texte reconnu entre ensuite dans la chaîne de traduction | Ne concerne pas uniquement les images téléversées séparément par l'utilisateur ; le filtrage des icônes et pixels de suivi est heuristique et ne garantit pas qu'ils soient tous ignorés |

L'exploitant n'utilise pas lui-même les courriels comme jeu de données d'entraînement. La conservation, l'entraînement, l'examen humain ou la sous-traitance ultérieure par les destinataires doivent être vérifiés pour le service et le contrat réellement utilisés ; on ne peut pas les déduire des termes « IA », « périphérie » ou des déclarations de la présente page. Les transmissions concernées doivent être désactivées tant que la base juridique valable, la possibilité de choix, le retrait et les conditions de transfert transfrontière ne sont pas assurés.

## 4. Stockage propre et bases de données externes

| Destinataire ou configuration | Données susceptibles d'être traitées | Responsabilités et limites de suppression |
| --- | --- | --- |
| Stockage compatible S3, R2 ou autre stockage d'objets choisi par l'utilisateur ou l'exploitant | Pièces jointes, identifiants d'objets et identifiants d'accès configurés | La configuration détermine le lieu effectif, le contrôle du compte et le contrat ; le stockage de l'instance peut recevoir des identifiants d'accès, qui ne restent donc pas nécessairement sur l'appareil de l'utilisateur |
| Turso/LibSQL, point de terminaison de test de connexion HTTP SQL | Identifiants et requêtes de test transmis lors du test de connexion, avec d'éventuelles données dans les journaux du point de terminaison | La vérification examinée ne montre que la configuration et une sonde de connexion ; les données métier restent affectées à D1. Aucune réplication ni aucun routage de données métier externes n'est mis en œuvre ; ne pas décrire cela comme une copie redondante déjà établie |

Le fait que l'utilisateur choisisse lui-même un fournisseur ne dispense pas automatiquement l'exploitant de ses responsabilités légales concernant les transmissions qu'il effectue, la conservation des identifiants et la suppression. La suppression physique des sauvegardes et objets externes doit être vérifiée pour chaque stockage ; voir [Traitement des données et maintien de la sécurité](/fr/mail/data-security/).

## 5. Requêtes externes du navigateur et de contenus distants

| Destinataire ou ressource | Situation | Données susceptibles d'être reçues et limites |
| --- | --- | --- |
| Google Fonts ou CDN configuré de polices et ressources statiques | Chargement de l'interface et de ressources externes | Adresse IP, User-Agent, heure et éventuellement informations de provenance ; évaluer l'auto-hébergement et les transmissions non nécessaires |
| Cloudflare Turnstile | Chargement et défi sur les pages concernées d'inscription, de vérification ou de sécurité | Données d'appareil, de réseau et de requête nécessaires à la vérification ; confirmer le stockage terminal et la base juridique selon la configuration effective |
| Images distantes des courriels, icônes de domaine de l'expéditeur, avatars externes ou hébergement d'images | Affichage de courriels ou d'éléments d'interface, chargement d'image ou ouverture de lien | IP, heure de requête et URL d'image complète, pouvant inclure un identifiant de destinataire et des paramètres de suivi ; masquer les images dans l'interface ne signifie pas que tous les accès externes sont bloqués |
| Hébergeur du site documentaire, du site du projet et des liens externes | Lorsque vous ouvrez le site ou le lien | Requêtes et journaux du site concerné ; les finalités indépendantes des sites externes relèvent de leur propre information, tandis que l'instance demeure responsable des contenus qu'elle intègre ou des requêtes qu'elle effectue activement, conformément à la loi |

L'absence de SDK publicitaire ou d'outil d'analyse tiers ne permet pas de conclure qu'aucune de ces requêtes n'existe. Les conditions applicables à localStorage du navigateur, à la vérification nécessaire et aux accès non nécessaires à l'équipement terminal sont indiquées à la section 4 de la Politique de confidentialité.

## 6. Exigences légales, accords de traitement des données et garanties transfrontières

Les données nécessaires ne sont communiquées à une autorité compétente que si une base juridique valable existe ; l'exploitant vérifie la demande et sa portée et informe les personnes concernées lorsque la loi le permet. Une demande étrangère ne dispense pas automatiquement d'examiner le RGPD et la confidentialité des communications.

Lorsqu'un destinataire agit comme sous-traitant, l'exploitant doit, dans la mesure exigée par le droit applicable, conclure avec ce destinataire un accord écrit de traitement des données couvrant les instructions, la confidentialité, la sécurité, les sous-traitants ultérieurs, l'assistance concernant les droits des personnes et les incidents, le retour ou l'effacement à l'échéance ainsi que les dispositions d'audit nécessaires. Les conditions générales d'utilisation ou la présente liste ne constituent pas automatiquement un accord de traitement signé par tous les fournisseurs.

Pour un transfert international soumis aux restrictions du RGPD, vérifier la décision d'adéquation ou une autre garantie valable selon l'entité destinataire réelle, la destination et la portée du service. En cas d'utilisation de clauses contractuelles types (SCC), les clauses appropriées doivent être effectivement intégrées, accompagnées d'une évaluation d'impact du transfert et des mesures supplémentaires nécessaires. Si un mécanisme d'adéquation fondé sur un cadre de certification est utilisé, vérifier également que l'entité destinataire possède une certification actuellement valide couvrant le service. Une certification SOC/ISO, HTTPS, le réseau mondial en périphérie ou la mise à disposition d'un modèle de SCC ne prouvent pas, à eux seuls, la légalité du transfert concerné. Un résumé et les copies des garanties qui peuvent être communiquées légalement peuvent être demandés à `privacy@epocanvas.com`.

## 7. Enregistrements de l'instance et mises à jour de la liste

| Éléments que l'instance doit publier ou fournir légalement | État de la vérification pour le présent document |
| --- | --- |
| Fournisseurs activés, entités contractantes, fonctionnalités et portée des données | Le code source confirme les parcours disponibles ; la liste des services effectivement activés dans l'instance hébergée n'a pas été examinée |
| Régions de stockage des données, d'inférence, de journalisation et de sous-traitance ultérieure | Non vérifiées à partir des données de déploiement et des fournisseurs ; aucun traitement limité à une région particulière n'est garanti |
| Durées précises de conservation par catégorie de données, journaux fournisseurs et sauvegardes | À compléter et à vérifier par l'instance ; ne pas masquer les durées déjà connues derrière la formule « selon la politique du fournisseur » |
| Contrats de traitement, mécanismes transfrontières et évaluations d'impact | Signature ou réalisation non confirmée ; le présent document ne signifie pas qu'ils sont en vigueur |
| Information, consentement valable et retrait pour les fonctions optionnelles | Les commutateurs et boutons du code source n'en constituent pas une preuve complète ; vérifier le processus effectif et les enregistrements |

Avant d'activer un flux de données concerné, l'exploitant doit terminer les vérifications nécessaires et informer de façon appropriée avant l'ajout d'un destinataire, d'une finalité ou d'une modification importante des garanties ; un nouveau consentement doit être recueilli lorsqu'il est exigé par la loi. La date de mise à jour indique uniquement une révision du texte et ne signifie pas que tous les utilisateurs ont été informés ou ont accepté le nouveau traitement. Les sources de la liste et le traitement des éléments non encore mis en œuvre figurent également à la section 13 de la [Politique de confidentialité](/fr/mail/privacy-policy/).
