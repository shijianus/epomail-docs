---
title: Open source et cadre juridique de l'auto-hébergement
description: "Open source et auto-hébergement d'EpoCanvas Mail — aspects juridiques : portée de la licence MIT, ce qui en est exclu, la position de l'auto-déployeur comme responsable du traitement, les dispositifs tiers et les contributions."
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.16**

La présente page expose la portée de la licence open source d'EpoCanvas Mail et la position juridique de l'auto-hébergement. Elle ne constitue pas un contrat d'utilisateur pour une instance quelconque : les utilisateurs de l'instance hébergée sont régis par les [Conditions d'utilisation](/fr/mail/terms-of-service/) et la [Politique de confidentialité](/fr/mail/privacy-policy/) ; les utilisateurs d'une instance auto-hébergée sont régis par les conditions que publie son déployeur.

![Limites de responsabilité d'EpoCanvas Mail : le projet open source amont fournit le code source, l'instance est exploitée de manière indépendante par son Opérateur qui assume la responsabilité de responsable du traitement](/images/mail/fr/self-host-responsibilities.svg)

*Figure : les limites de responsabilité entre le logiciel, son Opérateur et les utilisateurs. Les auteurs amont n'exploitent aucun service de messagerie et ne répondent de la conduite d'aucune instance.*

## 1. La licence

Le code source du présent projet est publié sous licence MIT. Toute personne peut l'obtenir gratuitement et :

1. utiliser, copier, modifier, fusionner, publier, distribuer, sous-licencier et vendre des copies du logiciel ;
2. sous réserve d'inclure l'avis de droit d'auteur original et la présente licence dans toutes les copies ou parties substantielles du logiciel ;
3. le logiciel est fourni « en l'état », sans garantie d'aucune sorte, expresse ou implicite, y compris les garanties de qualité marchande, d'aptitude à un usage particulier et de non-contrefaçon ;
4. les auteurs ou les détenteurs des droits d'auteur ne sont responsables d'aucune réclamation, d'aucun dommage ni d'aucune autre responsabilité naissant du logiciel ou de son utilisation.

## 2. Hors du champ de la licence

- La licence MIT n'accorde aucun droit de marque ou d'enseigne : les noms EpoCanvas et Epomail, leurs logos et leurs éléments visuels ne sont pas concédés par la publication du code source ;
- Aucune déclaration ne peut suggérer le parrainage ou le partenariat avec le projet amont ;
- Les distributions dérivées portent leur propre conformité en matière de dénomination et d'image de marque et maintiennent leur propre relevé des différences avec le code amont.

## 3. La position juridique de l'auto-déployeur

- Dès le moment du déploiement, le déployeur est le responsable du traitement des utilisateurs de son instance, et les auteurs amont n'ont aucun accès aux données de l'instance (la répartition figure à la section 2 de l'[Aperçu confidentialité et conditions](/fr/mail/overview/)) ;
- Le déployeur doit à ses utilisateurs l'information, le traitement des droits des personnes concernées, le maintien de la sécurité et la conformité des transferts internationaux selon le droit applicable en son lieu ;
- Les documents juridiques du présent site (politique de confidentialité, conditions d'utilisation, politique d'utilisation acceptable, traitement des données, liste des sous-traitants) peuvent servir de modèles pour les utilisateurs d'un déployeur ; ils doivent être révisés selon la configuration réelle du déployeur, et la responsabilité passe au déployeur dès l'adoption ;
- Les services tiers que configure le déployeur (Cloudflare, Resend, Backblaze, Turso et autres) sont contractés par le déployeur, dont les conditions lient alors le déployeur et ses utilisateurs — indépendamment de la [liste des sous-traitants](/fr/mail/sub-processors/) de l'instance hébergée.

## 4. Seuil technique et responsabilité de sécurité

Le déployeur est responsable de l'achèvement de l'injection des secrets et de l'amorçage de l'initialisation (étapes dans le [Guide de déploiement](/fr/mail/deployment/)), ainsi que du contrôle d'accès de l'instance, de la garde des clés et des mises à jour de suivi ; les correctifs de sécurité publiés en amont n'atteignent pas automatiquement un déploiement qui n'est pas mis à jour.

## 5. Contributions

- Les rapports de bugs et les propositions passent par les Issues du dépôt GitHub ; le code par des Pull Requests ;
- Les contributeurs doivent être titulaires des droits sur ce qu'ils soumettent ; une fois fusionnée, une contribution est distribuée sous licence MIT avec le code source ;
- Les vulnérabilités de sécurité ne doivent pas être divulguées dans une issue publique — signalez-les en privé via les points de contact de la section 5 de l'[Aperçu confidentialité et conditions](/fr/mail/overview/).

## 6. Documents connexes

| Ressource | Lien |
| --- | --- |
| Visite des documents juridiques et de leur ordre de priorité | [Aperçu confidentialité et conditions](/fr/mail/overview/) |
| Étapes complètes pour déployer votre propre instance | [Guide de déploiement](/fr/mail/deployment/) |
| Périmètre du service et assistance de l'instance hébergée | [Périmètre du service et assistance](/fr/mail/service-scope/) |
| Termes clés | [Définitions](/fr/mail/key-terms/) |
