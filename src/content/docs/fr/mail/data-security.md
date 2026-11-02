---
title: Traitement des données et maintien de la sécurité
description: Cycle de vie des données vérifié, mesures et limites de sécurité, ainsi que les exigences applicables aux demandes de droits, aux suppressions et aux incidents dans une petite instance à but non lucratif.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.21**


<!-- legal-review-draft -->
:::caution[Projet soumis à revue juridique : non applicable comme notice actuelle]
Ce projet présente des clauses proposées et des éléments restant à vérifier. Il ne remplace pas la notice actuellement en vigueur et ne certifie pas la conformité. Il ne doit pas servir à activer un traitement avant vérification de l’identité de l’exploitant, des coordonnées légalement requises, des bases juridiques réelles, des destinataires, des garanties de transfert, de la conservation et de l’effacement, et avant fourniture de l’information requise. La version faisant autorité désigne la base rédactionnelle en chinois traditionnel, non une entrée en vigueur. Les obligations légales et les droits existants restent inchangés.
:::

Cette page complète la [Politique de confidentialité](/fr/mail/privacy-policy/) et distingue les mécanismes mis en œuvre dans le code open source des mesures que l'exploitant doit appliquer dans son déploiement réel. La base technique est la version récupérée et examinée de `shijianus/epomail` ; le code source ne prouve ni la configuration en ligne, ni les contrats des fournisseurs, ni l'achèvement d'une suppression donnée.

La version en chinois traditionnel (Taïwan) est la version officielle ; les traductions ne limitent ni les règles impératives du droit applicable ni les droits des personnes concernées. Le service est un projet d'apprentissage et de test à but non lucratif, maintenu par une personne, et adopte des mesures proportionnées aux risques. La présente page ne promet ni certification ISO, ni assurance, ni personnel disponible en permanence, ni niveau de service pour entreprise.

![Couches de sécurité du transport, du traitement, du stockage et des identifiants](/images/mail/fr/security-trust-shield.svg)

*Figure : chaque couche de contrôle réduit des risques différents ; l'existence d'un mécanisme, sa configuration correcte et sa vérification effective sont des choses distinctes.*

## 1. Fonctionnalités de sécurité et limites connues

### 1.1 Transport et confidentialité des communications

Le site et l'API doivent utiliser HTTPS/TLS configuré correctement. Pour la livraison sortante, les systèmes des destinataires, le stockage externe d'objets et l'ensemble du parcours de transfert effectué par l'utilisateur, le simple fait que la connexion du navigateur utilise TLS ne garantit pas un chiffrement de bout en bout. Les images distantes, les liens publics et la lecture partagée peuvent également exposer des données ; voir la [Liste des destinataires tiers et sous-traitants](/fr/mail/sub-processors/).

### 1.2 Traitement en périphérie et débogage

La logique métier s'exécute sur Cloudflare Workers et l'état persistant est conservé par des bases de données et des services de stockage. L'analyse des courriels, la traduction, la livraison et les mécanismes de repli peuvent accéder à des données en clair en mémoire. Les environnements isolés peuvent être réutilisés ; il n'est pas garanti que la mémoire physique soit détruite à la fin de chaque requête. L'absence de serveurs propres ne permet pas non plus de conclure que la plateforme ne tient pas de journaux ou d'instantanés.

Les journaux doivent masquer les identifiants, le corps des courriels et les données d'identification non nécessaires. Pour les tests, privilégiez les contenus synthétiques et les ressources isolées ; ne téléversez pas de courriels réels, de clés ou de copies de bases de données dans un dépôt public ou un service d'IA ou de diagnostic non approuvé dans le but de reproduire une erreur.

### 1.3 Chiffrement au repos

Selon le mode et l'état de l'enregistrement, le mode de courrier peut appliquer un chiffrement au repos côté serveur AES-256-GCM à l'objet et au corps. Les pièces jointes, les courriels d'origine et les métadonnées ne bénéficient pas automatiquement de la même protection au niveau de l'application. Un exploitant qui détient les clés et les autorisations sur le serveur peut techniquement déchiffrer les données ; les restrictions d'accès de l'interface d'administration ne sont pas un chiffrement de bout en bout.

L'instance doit utiliser des clés distinctes correctement protégées, terminer l'initialisation et vérifier l'état réel du chiffrement, puis prévoir leur rotation et contrôler les autorisations d'accès. La présence de fonctions de chiffrement dans le code source ne prouve pas que chaque donnée historique, sauvegarde ou copie détenue par un tiers est chiffrée.

### 1.4 Identifiants et sessions

Dans la version examinée, les nouveaux mots de passe utilisent PBKDF2-HMAC-SHA256 avec un sel aléatoire propre à chaque utilisateur et 210 000 itérations par défaut. Le paramètre est configurable ; les enregistrements historiques utilisant SHA-256 ou un nombre inférieur d'itérations restent acceptés et sont mis à niveau lors de la vérification. Les clés TOTP utilisent AES-256-GCM ; les codes de récupération ont un hachage et une copie chiffrée du code d'origine, affichable après une nouvelle vérification ; les clés d'accès sont conservées sous forme de données de justificatif public. Un hachage ne garantit pas qu'un mot de passe ne puisse pas être deviné ; les paramètres doivent continuer à être évalués en fonction des risques et de l'état de la technique.

La clé de configuration TOTP peut être conservée temporairement dans KV pendant 600 secondes ; lorsqu'une mise à niveau d'un ancien mot de passe rencontre une authentification multifacteur, le flux en attente peut conserver le mot de passe saisi dans KV pendant 300 secondes et cette durée peut être renouvelée. Il n'est donc pas possible d'affirmer que tous les parcours évitent le stockage temporaire d'identifiants en clair. L'exploitant doit restreindre les accès et réduire les mises en attente inutiles. La liste des environnements de connexion comporte au plus 15 entrées et un TTL glissant de 180 jours ; le TTL de l'association de plusieurs comptes par IP est de 7 200 secondes ; les justificatifs d'appareil de confiance peuvent être conservés 60 jours et dispenser de certaines vérifications multifactorielles pendant les 30 premiers jours.

La limitation des échecs de connexion et la révocation des sessions sont mises en œuvre ; la durée de validité par défaut du JWT est de 30 jours. La vérification de capacité de la liste des sessions présente une différence à la limite ; il n'est pas possible d'affirmer que le programme garantit strictement au plus 10 sessions simultanées. Lorsque les identifiants sont conservés dans localStorage du navigateur, les risques liés aux appareils partagés et à l'accès par des scripts doivent également être pris en compte.

### 1.5 Matrice de traitement des données

| Catégorie | Emplacement et contenu conservé | Mécanisme de nettoyage existant | Limites que l'exploitant doit appliquer |
| --- | --- | --- | --- |
| Compte et authentification | Compte, champs personnels, données d'authentification et de configuration dans D1 ; sessions dans KV | La fermeture en libre-service marque le compte comme supprimé et efface l'état principal de connexion | Vérifier séparément la suppression des autres jetons, autorisations OAuth, images et données résiduelles ; ne pas assimiler la désactivation à un effacement complet |
| Courriels ordinaires | Objet, corps, métadonnées et étiquettes dans D1 | Actions de l'utilisateur, nettoyage de quota et nettoyage administratif | Ne pas conserver sans finalité les données ordinaires indéfiniment ; traiter séparément les sauvegardes et copies historiques |
| Indésirables / corbeille | Données de courriel et objets associés | Une branche quotidienne compare le seuil de 7 jours à `create_time` ; un message déplacé vers la corbeille peut satisfaire au même passage les conditions de suppression | Il ne s'agit pas d'un délai fixe de 7 jours à compter du déplacement vers la corbeille ; vérifier l'exécution de la tâche planifiée et les nouvelles tentatives en cas d'échec |
| Courriels système | Contenus de bienvenue ou d'annonce et champs d'expiration | Certains courriels officiels sont marqués comme supprimés à la lecture de la liste selon leur délai d'expiration (7 jours par défaut), puis nettoyés par une branche quotidienne | Ils ne sont pas effacés immédiatement par une tâche d'expiration distincte ; l'instance doit communiquer et vérifier le délai réellement appliqué |
| Pièces jointes et courriels d'origine | Les pièces jointes sont stockées selon la configuration, notamment S3, R2 ou KV ; le parcours d'arrivée vérifié ne conserve pas séparément l'intégralité du MIME d'origine | Certains parcours de suppression physique d'un courriel tentent de supprimer les objets associés | Vérifier les nouvelles tentatives après échec, le stockage d'origine, les copies et les objets orphelins ; ne pas promettre une suppression atomique dans tous les parcours |
| Événements de connexion et de sécurité | Adresse IP, User-Agent, appareil, opérateur, événements et données nécessaires au traitement | Les champs de compte et les différents mécanismes de journalisation ont des règles distinctes ; aucune expiration automatique générale n'a été observée | Définir la minimisation des champs, les autorisations d'accès et des durées de conservation applicables en pratique |
| Audit, réclamations et décisions | Événements d'audit, état des risques ou tickets, réclamations, notifications et données d'audit des autorisations | Suppression manuelle conditionnelle de certains anciens événements ordinaires ; aucun TTL par défaut pour l'ensemble des catégories | Appliquer les conditions de conservation ci-dessous ; définir par catégorie un délai et une procédure de suppression |
| Exportations et copies locales | Fichier JSON téléchargé par l'utilisateur, fichier .eml individuel et stockage du navigateur | L'utilisateur gère les copies qu'il a téléchargées | Indiquer la portée de l'exportation et les risques locaux ; compléter par demande manuelle les données qui ne sont pas incluses et doivent être fournies légalement |

La branche de nettoyage quotidienne est prévue à 16 h UTC (minuit le lendemain à Taïwan) ; une autre tâche est planifiée toutes les cinq minutes. La configuration d'une tâche planifiée ne signifie pas que chaque opération de nettoyage s'exécute toutes les cinq minutes. Lorsqu'un utilisateur supprime des messages, ceux qu'il sélectionne peuvent être supprimés physiquement directement si l'utilisation dépasse alors 90 % du quota ; ils ne sont pas seulement effacés par une tâche d'arrière-plan qui traite une corbeille déjà constituée.

Le point de terminaison de nettoyage des audits n'accepte qu'un périmètre précis : événements datant de plus de 180 jours, d'audit ordinaire, de risque normal et dont l'état est clos, expiré ou rejeté, à l'exclusion de toute référence à une interdiction encore active. Il s'agit d'une condition technique de nettoyage et non d'une durée minimale de conservation légale ; les autres événements, réclamations, décisions, notifications et enregistrements d'autorisations n'expirent pas automatiquement de ce fait. L'exploitant doit définir les règles légales de conservation et mettre en œuvre un nettoyage effectif. La présence d'un « bouton de nettoyage » ne signifie pas que tous les journaux sont supprimés dans les délais.

## 2. Exploitation et responsabilités liées au code open source

### 2.1 Instance de test hébergée

Le caractère non lucratif et la maintenance individuelle peuvent influer sur l'échelle et les modalités raisonnables des mesures, mais ne suppriment pas les responsabilités légales concernant les données réelles. Aucun service de sauvegarde de niveau entreprise, aucune absence définitive de perte de données ni exploitation gratuite permanente n'est promis ; les utilisateurs doivent conserver les copies nécessaires et l'exploitant doit mettre en œuvre les mesures de sécurité et le traitement des demandes de droits nécessaires.

### 2.2 Auteurs du code source et déployeurs

Une personne qui fournit uniquement le code source et ne décide pas des finalités ou des moyens du traitement d'une instance donnée n'assume pas, de ce seul fait, les obligations d'exploitation de cette instance. Si le même auteur exploite séparément une instance, il est responsable de cette exploitation ; les rôles de décision conjointe ou de sous-traitance effective doivent également être déterminés selon les faits et ne peuvent pas être écartés à l'avance par un document.

### 2.3 Gouvernance proportionnée à l'échelle

Une petite instance peut tenir un inventaire simple des données, appliquer le moindre privilège, isoler les clés, utiliser une liste de contrôle des contrats fournisseurs et des transferts, conserver les traces de nettoyage périodique et définir un processus de contact en cas d'incident. Elle doit évaluer conformément au droit applicable la nécessité d'un registre des traitements, d'un représentant dans l'Union européenne, d'un délégué à la protection des données et d'une analyse d'impact. Le caractère open source ou le test à but non lucratif ne justifie pas à lui seul de promettre une certification, une équipe dédiée ou des exigences d'approvisionnement d'entreprise.

### 2.4 Vérifications avant l'ouverture au public

L'identité et l'adresse de l'exploitant, les tiers réels et leurs emplacements, les bases juridiques du traitement, les choix et retraits pour les fonctionnalités nécessitant un consentement, la conservation des journaux et sauvegardes, la suppression complète des comptes et le suivi des demandes doivent être mis en œuvre dans l'instance. Les flux de données dépourvus de base ou de garanties nécessaires doivent être désactivés ; modifier uniquement l'information publiée ne permet pas de poursuivre le traitement. Les éléments de l'instance qui restent à vérifier sont indiqués aux sections 2 et 8 de la [Politique de confidentialité](/fr/mail/privacy-policy/) et à la section 7 de la [Liste des destinataires tiers et sous-traitants](/fr/mail/sub-processors/).

## 3. Droits, suppression et incidents

### 3.1 Exportation et demandes complémentaires

L'exportation JSON en libre-service comprend une partie des données personnelles, la correspondance des courriels non marqués comme supprimés et les étiquettes personnalisées. Elle n'inclut pas tous les champs de destinataires, le contenu binaire des pièces jointes, les courriels d'origine, tous les alias de boîte ni les données d'audit administratif. Un fichier .eml individuel ne garantit pas non plus de contenir l'ensemble des données personnelles de la base. Une exportation lisible par machine ne satisfait pas à elle seule toutes les obligations d'accès et de portabilité.

Les données non incluses mais pouvant être demandées légalement doivent être vérifiées et fournies par un canal humain ; l'absence d'une fonctionnalité ne justifie pas un refus. Les délais de réponse, la vérification, les frais et les réclamations sont régis par la section 9 de la [Politique de confidentialité](/fr/mail/privacy-policy/).

### 3.2 Procédure de suppression

La fermeture en libre-service marque actuellement le compte et l'état principal de connexion comme supprimés de manière logique ; aucun mécanisme d'effacement physique automatique et complet après 90 jours n'a été confirmé. La boîte et la logique d'arrivée ne vérifient pas toutes systématiquement ce marqueur de suppression logique ; la fermeture ne garantit donc pas l'arrêt de la réception des messages. Toute page de profil public déjà activée doit également être fermée et vérifiée séparément. La suppression par l'administrateur ne permet pas de conclure que les données d'audit, les autorisations OAuth, les images et tous les objets ont été effacés.

Les nouvelles tentatives de suppression d'un stockage externe fourni par l'utilisateur dépendent de la configuration du stockage d'origine ; si les paramètres du compte sont retirés en premier, une nouvelle tentative ultérieure peut ne plus permettre d'identifier le stockage d'origine. Avant une suppression complète, il faut conserver les informations nécessaires à l'identification de la suppression, vérifier le traitement de chaque objet, puis effacer de manière sécurisée les paramètres concernés.

Toute demande de suppression doit faire l'objet d'un enregistrement traçable et d'une vérification séparée du compte, des alias, des courriels, des objets, des données d'authentification et d'autorisation, des systèmes d'audit et de sauvegarde. Les données dont la conservation est légalement requise doivent être assorties d'un motif, isolées des autres usages, et les motifs et délais pouvant être communiqués doivent être indiqués. Ne confirmez pas à l'utilisateur que « tout a été définitivement supprimé » avant vérification de l'achèvement. Le traitement des demandes ne peut pas dépasser le délai légal au motif que les procédures internes ne sont pas encore automatisées.

### 3.3 Minimisation et choix de l'utilisateur

Les champs personnels non nécessaires, les pages publiques et les notifications externes doivent dépendre d'un choix de l'utilisateur ; une fonctionnalité choisie ne doit transmettre que les champs nécessaires. Avant d'activer l'IA, les services publics de traduction de secours ou les ressources distantes pour des données personnelles réelles, il faut disposer d'une base juridique valable, fournir une information claire et appliquer des garanties appropriées. Pour les champs publics et tout contenu accessible à quiconque possède un lien de lecture, indiquez les personnes susceptibles d'y accéder et les limites de révocation.

### 3.4 Réponse aux incidents

Lorsqu'un incident est découvert, il faut en maîtriser les effets, préserver les éléments de preuve nécessaires, déterminer les données et les risques concernés et consigner les décisions. La notification à l'autorité au titre du RGPD dépend du niveau de risque et doit être effectuée, si possible, dans les 72 heures suivant la prise de connaissance. En cas de risque élevé, les personnes concernées doivent être informées sans retard injustifié conformément à la loi. Les règles complètes figurent à la section 10 de la [Politique de confidentialité](/fr/mail/privacy-policy/) ; une annonce publique de vulnérabilité ne remplace pas systématiquement une notification individuelle.

Les problèmes de sécurité peuvent être signalés en privé à `announcement@epocanvas.com` ; les questions de confidentialité et les demandes relatives aux droits doivent être adressées à `privacy@epocanvas.com`. Les avis publics sur les correctifs doivent éviter les détails d'incidents permettant d'identifier des utilisateurs ou les identifiants encore exploitables.
