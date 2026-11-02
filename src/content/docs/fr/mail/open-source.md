---
title: Open source et cadre juridique de l'auto-hébergement
description: Portée de la licence MIT, distinction entre auteurs et opérateurs réels, et obligations de protection des données en auto-hébergement.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

Cette page explique la licence open source et les responsabilités d'auto-hébergement d'EpoCanvas Mail. Le projet est maintenu par une personne sans but lucratif pour l'apprentissage et les tests ; le service hébergé relève séparément des [Conditions d'utilisation](/fr/mail/terms-of-service/) et de la [Politique de confidentialité](/fr/mail/privacy-policy/). Les déployeurs doivent fournir les conditions et informations de leurs services réels.

La version en chinois traditionnel (Taïwan) est la version officielle ; les autres langues sont des traductions de comparaison. Cette organisation ne limite ni l'information claire exigée par le droit applicable, ni l'interprétation favorable aux consommateurs, ni les droits auxquels il ne peut être renoncé. La date de mise à jour indique une révision sans réécrire la licence MIT fournie avec le code.

![Rôles dans la publication du code et l'exploitation d'une instance](/images/mail/fr/self-host-responsibilities.svg)

*Figure : publier du code ne rend pas l'auteur opérateur du déploiement d'autrui ; l'auteur qui exploite un service ou détermine un traitement reste soumis aux obligations correspondantes.*

## 1. La licence

Le code est régi par la licence MIT qui l'accompagne. Cette section est un résumé à lire avec le texte intégral original.

1. Il est permis d'utiliser, copier, modifier, fusionner, publier, distribuer, sous-licencier et vendre des copies ; le caractère non lucratif du projet ne retire pas l'usage commercial autorisé par MIT.
2. Les copies ou parties substantielles doivent conserver les mentions originales de droit d'auteur et d'autorisation.
3. La licence comprend une fourniture en l'état et une exclusion de garanties, dans les limites du droit applicable.
4. Les exclusions de responsabilité ne priment pas sur le droit impératif et n'exonèrent pas automatiquement l'auteur des responsabilités liées à l'exploitation séparée d'un service, au traitement réel de données ou à ses propres engagements.

## 2. Hors du champ de la licence

- MIT n'accorde pas en soi un parrainage de marque ou un statut de partenaire. Les noms et marques restent soumis aux droits et lois pertinents ; les éléments visuels suivent leurs licences réelles.
- Un site auto-hébergé doit identifier clairement son opérateur réel et ne pas prétendre à tort être exploité, certifié ou soutenu officiellement par l'amont.
- Les versions dérivées devraient décrire leurs différences pour faciliter maintenance et évaluation de sécurité ; cette page n'ajoute pas de restrictions d'usage du code contraires à MIT.

## 3. La position juridique de l'auto-déployeur

- Les rôles dépendent des finalités et moyens de chaque traitement. Les déployeurs sont généralement responsables des traitements qu'ils déterminent, mais peuvent être responsables conjoints ou sous-traitants d'autrui ; l'auto-hébergement ne crée pas d'exclusivité et tout particulier n'est pas automatiquement responsable du traitement.
- Le droit applicable dépasse le lieu du déployeur. Il faut évaluer les critères d'établissement ou d'extraterritorialité du RGPD, la confidentialité des communications et la protection impérative des consommateurs ; l'absence de but lucratif n'exonère pas. Voir les rôles à la section 2 de la [Vue d'ensemble](/fr/mail/overview/).
- Ces documents peuvent guider la rédaction, mais identité, coordonnées, sources, fonctions, conservation et transferts doivent être vérifiés. Le traitement pour une organisation exige acceptation préalable et DPA distinct si nécessaire ; copier des textes ou nommer des rôles ne remplace pas une base légale et des mesures réelles.
- Les relations tierces suivent les services et contrats réels ; certains prestataires sont responsables indépendants pour certaines activités. Ne pas imposer toutes leurs conditions à tous les utilisateurs. Vérifier les prestataires et transferts ; la [Liste des sous-traitants](/fr/mail/sub-processors/) de l'instance hébergée n'est pas une garantie universelle.

## 4. Seuil technique et responsabilité de sécurité

Suivez le [Guide de déploiement](/fr/mail/deployment/) pour les clés, permissions et mises à jour, et évaluez sauvegardes, suppression, réponse aux incidents et sécurité nécessaire. Les correctifs amont ne mettent pas automatiquement à jour tous les déploiements ; un environnement de test n'autorise pas l'emploi arbitraire de données réelles.

La simple publication du code n'apporte ni SLA, ni assistance permanente, ni hébergement perpétuel, ni certification. Les opérateurs réels restent tenus à la sécurité et au traitement des droits selon les risques et le droit applicable. Chiffrement et contrôles d'accès ne garantissent pas l'absence de fuite ; limites dans [Traitement des données et sécurité](/fr/mail/data-security/).

## 5. Contributions

- Les bugs et propositions peuvent passer par [GitHub Issues](https://github.com/shijianus/epomail/issues), le code par Pull Request ; ni acceptation de chaque contribution ni délai de réponse ne sont promis.
- Les contributeurs doivent pouvoir soumettre selon la licence applicable au dépôt et préserver les mentions tierces requises. Contribuer seul ne rend pas opérateur ou responsable du traitement.
- Signalez en privé les vulnérabilités non divulguées et les données personnelles par la section 5 de la [Vue d'ensemble](/fr/mail/overview/) ; les signalements de bonne foi et recherches licites ne perdent pas leur protection en critiquant le projet.

## 6. Documents connexes

| Ressource | Lien |
| --- | --- |
| Documents juridiques, rôles et ordre de priorité | [Vue d'ensemble](/fr/mail/overview/) |
| Étapes de configuration pour l'auto-hébergement | [Guide de déploiement](/fr/mail/deployment/) |
| Fonctions hébergées et limites d'assistance | [Périmètre du service et assistance](/fr/mail/service-scope/) |
| Terminologie juridique et technique | [Définitions](/fr/mail/key-terms/) |
