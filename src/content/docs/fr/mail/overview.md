---
title: Confidentialité et conditions — Vue d'ensemble
description: Finalité du projet, rôles réels de traitement, documents juridiques, ordre de priorité et coordonnées d'EpoCanvas Mail.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

Cette page présente les documents juridiques d'EpoCanvas Mail. Lisez les [Conditions d'utilisation](/fr/mail/terms-of-service/) et la [Politique de confidentialité](/fr/mail/privacy-policy/) avant de créer un compte ; ne vous inscrivez pas si vous refusez les conditions du service. Lire un document ne vaut pas consentement à tous les traitements de données personnelles.

Après mise à jour et configuration coordonnées, le nouveau parcours d'inscription affiche les coordonnées de l'exploitant, la version des conditions et les liens vers les conditions et l'information de confidentialité, puis exige de cocher une case d'acceptation initialement vide. L'absence d'informations obligatoires ferme les nouvelles inscriptions sans bloquer les connexions existantes ou l'initialisation administrative. La création de compte par OAuth suit le même contrôle ; la liaison d'un compte existant n'impose pas, à elle seule, un nouveau contrat. Les traitements facultatifs restent soumis à des choix distincts ; voir le [Guide des paramètres](/fr/mail/settings/#operator-notice) et les [Conditions d'utilisation](/fr/mail/terms-of-service/). Ces mécanismes ne prouvent ni la mise à jour d'une instance en ligne, ni l'identité vérifiée de l'exploitant, ni la réalité des destinataires, contrats et modalités de conservation.

La version en chinois traditionnel (Taïwan) est la version officielle ; les autres langues sont des traductions de comparaison. Cette organisation ne limite ni l'information claire exigée par le droit applicable, ni l'interprétation favorable aux consommateurs, ni les droits auxquels il ne peut être renoncé. La date de mise à jour indique une révision du texte, sans application automatique des changements à tous les utilisateurs.

![Relations entre les conditions, la politique de confidentialité et les documents complémentaires](/images/mail/fr/legal-architecture.svg)

*Figure : chaque document traite de son sujet ; le droit impératif et les droits des personnes concernées et des consommateurs priment sur la hiérarchie documentaire convenue.*

## 1. Identité de la plateforme

EpoCanvas Mail est un projet personnel annexe, sans but lucratif, destiné à l'apprentissage et aux tests. Son code est publié sous licence MIT et utilise notamment Cloudflare Workers, D1, KV et R2. Nous prenons les principes de protection des données de l'Union européenne comme référence pour la conception et la maintenance et déployons des efforts raisonnables pour améliorer la protection des données, en tenant compte des risques réels, de l'état de la technique et des coûts raisonnables de mise en œuvre. Nous expliquons clairement les limites connues pour vous aider à décider d'utiliser ou non le service et à choisir ses fonctions.

La « référence aux normes de l'Union européenne » décrit ici l'orientation des améliorations du projet et le degré de diligence raisonnable ; elle ne signifie pas que le projet est certifié, convient à tous les usages ou garantit l'absence d'incident touchant les données. L'application du RGPD et des autres lois dépend toujours des activités réelles ; les obligations impératives applicables ne sont réduites ni par la nature expérimentale du service, ni par l'information sur les risques, ni par l'acceptation de l'utilisateur. Les risques concrets pour les données et les mesures que vous pouvez prendre sont présentés à la section 1 de la [Politique de confidentialité](/fr/mail/privacy-policy/).

1. L'instance hébergée est `mail.epocanvas.com`, utilise le nom EpoCanvas pour les contacts et dispose d'une application mobile. L'identité permettant d'identifier l'opérateur réel, son lieu d'établissement et ses coordonnées doivent être indiqués conformément à la section 2 de la Politique de confidentialité ; un nom d'équipe ne crée pas une personne morale distincte.
2. Les instances auto-hébergées sont gérées par leurs opérateurs réels, qui doivent publier des informations et conditions adaptées à leur configuration et au droit applicable, sans simplement recopier le nom ou les engagements de l'instance hébergée.

Le service hébergé permet l'apprentissage, le développement et les tests de communication courante aux personnes âgées d'au moins 16 ans ayant la capacité contractuelle requise. Aucun SLA, permanence continue, hébergement perpétuel ou certification de conformité n'est promis. Il ne convient pas aux communications d'urgence, à la conservation légale ni comme unique sauvegarde importante ; voir [Périmètre du service et assistance](/fr/mail/service-scope/).

## 2. Définition des rôles de traitement des données

Les rôles dépendent de qui détermine réellement les finalités et les moyens de chaque traitement, et non d'une simple étiquette open source, auto-hébergement ou contractuelle. Le droit applicable ne dépend pas seulement du lieu de l'opérateur. L'application du RGPD s'apprécie notamment au regard des activités d'établissement, de l'offre de biens ou services aux personnes dans l'Union ou du suivi de leur comportement dans l'Union ; la seule accessibilité du site depuis l'Union ne suffit pas.

![Rôles liés à la publication du code, à l'exploitation d'une instance et à son utilisation](/images/mail/fr/self-host-responsibilities.svg)

*Figure : publier du code ne signifie pas exploiter l'instance d'autrui ; les auteurs qui exploitent aussi un service ou déterminent un traitement restent responsables de leur rôle réel.*

| Scénario | Responsable du traitement | Sous-traitant |
| --- | --- | --- |
| Instance hébergée | L'opérateur répond des traitements de compte, de sécurité et de communication dont il détermine les finalités et les moyens ; le rôle concernant les messages dépend de leur usage réel | Prestataires d'infrastructure ou d'acheminement selon des accords et instructions valables ; un même prestataire peut avoir un autre rôle pour les traitements qu'il détermine lui-même |
| Instance auto-hébergée | Le déployeur est généralement responsable des traitements qu'il détermine ; responsabilité conjointe, indépendante ou sous-traitance restent possibles, sans exclusivité automatique | Selon les services, contrats et instructions réels du déploiement, sans reprise automatique de la liste de l'instance hébergée |

Les auteurs et contributeurs qui publient seulement du code ou des correctifs n'assument pas, de ce seul fait, l'exploitation ou la responsabilité des traitements d'autres déploiements. Cette distinction ne les exonère pas lorsqu'ils exploitent eux-mêmes un service. Les utilisateurs particuliers ne deviennent pas tous responsables du traitement donnant des instructions à l'opérateur du seul fait qu'ils échangent des courriels. Un traitement pour une organisation exige de confirmer au préalable que l'usage est accepté et de conclure séparément l'accord de sous-traitance (DPA) nécessaire ; cet accord ne modifie pas les rôles réels.

L'absence d'analyse d'usage transmise au projet amont ne signifie pas l'absence de requêtes réseau vers des tiers. L'acheminement, l'infrastructure, la vérification humaine, les polices et les fonctions facultatives sont décrits dans la [Liste des sous-traitants](/fr/mail/sub-processors/).

## 3. Architecture documentaire

Chaque document traite de sujets distincts. Une information de confidentialité n'est ni un consentement général aux traitements ni une certification de conformité du logiciel ou du service.

| Document | Contenu |
| --- | --- |
| [Politique de confidentialité](/fr/mail/privacy-policy/) | Sources, finalités et bases des traitements, conservation, droits et transferts internationaux |
| [Conditions d'utilisation](/fr/mail/terms-of-service/) | Formation du contrat, utilisation, changements, résiliation, responsabilité et recours |
| [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) | Abus interdits, tests autorisés, mesures proportionnées et recours |
| [Traitement des données et sécurité](/fr/mail/data-security/) | Cycle de vie, contrôles de sécurité, limites du chiffrement et de l'export |
| [Liste des sous-traitants](/fr/mail/sub-processors/) | Prestataires, données reçues, déclencheurs et modalités de transfert |
| [Définitions](/fr/mail/key-terms/) | Portée de la terminologie juridique et technique |
| [Courriels officiels et vérification d'intégrité](/fr/mail/tamper-proof/) | Identification des messages système et contrôle d'intégrité documentaire, sans certification publique ou tierce |

Les fonctions et le déploiement sont expliqués dans le [Guide des fonctions](/fr/mail/features/), les [Modes de fonctionnement](/fr/mail/modes/), le [Guide de déploiement](/fr/mail/deployment/) et le [Cadre juridique de l'auto-hébergement](/fr/mail/open-source/).

## 4. Ordre de priorité

1. Les règles impératives applicables et les droits non renonçables des personnes concernées et des consommateurs priment. Le choix de loi ou de juridiction ne supprime pas l'accès légal aux tribunaux locaux ou autorités de contrôle.
2. Dans ces limites, la Politique de confidentialité régit la confidentialité, les Conditions d'utilisation les conditions de service et la Politique d'utilisation acceptable la conduite. Les ambiguïtés s'interprètent selon le sujet et le droit applicable ; les documents complémentaires n'élargissent pas les exclusions de responsabilité.
3. Le caractère officiel de la version chinoise traditionnelle reste soumis aux garanties linguistiques et de consommation énoncées en tête de page. L'information, le consentement nécessaire et l'application des changements importants suivent la section 12 des Conditions et la Politique de confidentialité ; continuer à utiliser le service ne vaut pas automatiquement consentement à de nouvelles finalités.

Consultez le [texte officiel du RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj) pour son champ d'application et la [liste des membres du CEPD](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) pour les autorités de contrôle.

## 5. Points de contact

- Confidentialité, exercice des droits et réclamations : `privacy@epocanvas.com`.
- Comptes, service et recours généraux : messagerie interne ou `admin@epocanvas.com`, y compris lorsque la connexion est impossible.
- Code source : [GitHub Issues](https://github.com/shijianus/epomail/issues). N'y publiez pas de données personnelles, d'identifiants ou de vulnérabilités non divulguées.
- Instances auto-hébergées : contactez l'opérateur réel indiqué par le site.

Une adresse de confidentialité ne signifie pas qu'un délégué à la protection des données (DPO) ou un représentant dans l'Union a été nommé. L'opérateur doit évaluer les conditions applicables, procéder aux désignations légalement requises et publier des coordonnées vérifiables.
