---
title: Confidentialité et conditions — Vue d'ensemble
description: Vue d'ensemble des documents juridiques d'EpoCanvas Mail — identité de la plateforme, rôles de traitement des données, architecture documentaire, ordre de priorité et points de contact.
---

# Confidentialité et conditions

**Date d'entrée en vigueur : 2 octobre 2026 | Version : 5.7**

La présente page constitue le guide de l'ensemble des documents juridiques du service EpoCanvas Mail (le « Service ») ; elle explique le rôle des parties, l'architecture documentaire et l'ordre d'application. Avant de vous inscrire ou d'utiliser le Service, vous devez lire la présente page, ainsi que la [Politique de confidentialité](/fr/mail/privacy-policy/) et les [Conditions d'utilisation](/fr/mail/terms-of-service/).

![Architecture des documents juridiques d'EpoCanvas Mail : les Conditions d'utilisation constituent la couche contractuelle ; la Politique de confidentialité et la Politique d'utilisation acceptable forment la couche des politiques ; le Traitement des données et maintien de la sécurité, la Liste des sous-traitants et les Définitions sont des documents d'appui — l'ensemble reposant sur le socle du droit applicable et des obligations de maintien de la sécurité](/images/mail/fr/legal-architecture.svg)

*Figure : l'architecture des documents juridiques du présent site. Les Conditions d'utilisation fixent les conditions contractuelles ; la Politique de confidentialité porte les informations à fournir et les standards de traitement des données personnelles ; la Politique d'utilisation acceptable fixe les limites de conduite ; le Traitement des données et maintien de la sécurité, la Liste des sous-traitants et les Définitions sont des documents d'appui. Le droit applicable de chaque instance est déterminé par le lieu où réside son Opérateur.*

## 1. Identité de la plateforme

EpoCanvas Mail est un service de messagerie open source construit sur l'architecture de calcul en périphérie de Cloudflare (Workers, D1, KV, R2), dont le code source est publié sous la licence MIT. Le Service peut être fourni sous les deux formes suivantes :

1. **Instance hébergée** : un site public (`mail.epocanvas.com`) exploité par l'équipe d'exploitation, accompagné de son application mobile dédiée (epomail) ;
2. **Instance auto-hébergée** : un site privé que toute personne, équipe ou organisation déploie elle-même, à l'aide du code open source, sur son propre domaine et dans son propre compte Cloudflare.

## 2. Définition des rôles de traitement des données

Les documents juridiques du Service adoptent la distinction de rôles entre le « responsable du traitement » et le « sous-traitant », équivalente à la classification générale utilisée dans le règlement général sur la protection des données (RGPD) de l'Union européenne et dans des systèmes juridiques similaires ; le droit applicable de chaque instance est déterminé par le lieu où réside son Opérateur.

![Limites de responsabilité d'EpoCanvas Mail : le projet open source amont (licence MIT) fournit le code source ; l'instance que vous utilisez est exploitée de manière indépendante par son Opérateur, qui assume la responsabilité de responsable du traitement ; votre compte et vos données de messagerie sont conservés dans les ressources Cloudflare de cette instance](/images/mail/fr/self-host-responsibilities.svg)

*Figure : les limites de responsabilité entre le logiciel, l'Opérateur et les utilisateurs. Les auteurs du projet open source amont n'exploitent aucun service de messagerie et ne répondent pas du comportement d'une quelconque instance.*

| Scénario | Responsable du traitement | Sous-traitant |
| --- | --- | --- |
| Instance hébergée | L'équipe d'exploitation (s'agissant des données de compte et des enregistrements d'audit de sécurité) ; s'agissant du contenu des courriels échangés par les utilisateurs, l'Opérateur les traite dans la mesure nécessaire à la fourniture du service de communication | Les sous-traitants tels que Cloudflare et Resend |
| Instance auto-hébergée | La personne ou l'organisation qui a déployé l'instance (seule et exclusive responsable du traitement) | Les fournisseurs d'infrastructure configurés par ce déployeur |

Le code open source lui-même ne collecte, ne téléverse et ne renvoie aucune donnée de télémétrie ; hors les services externes configurés par l'Opérateur de l'instance elle-même, les auteurs du projet amont n'ont accès aux données d'exploitation d'aucune instance. Le projet open source ne fournit aucun service et n'assume aucune obligation de conformité d'instance : à compter du moment du déploiement, le déployeur devient le responsable du traitement de ses utilisateurs et doit remplir envers eux, selon le droit applicable en son lieu, les obligations d'information, de maintien de la sécurité et de soumission à la supervision ; il peut prendre les documents du présent site comme modèle de base de son information et de ses conditions.

## 3. Architecture documentaire

Les documents juridiques du présent site sont organisés par thème ; ils se renvoient les uns aux autres et constituent ensemble la convention complète :

| Document | Contenu |
| --- | --- |
| [Politique de confidentialité](/fr/mail/privacy-policy/) | La collecte, le traitement et l'utilisation des données personnelles ; les standards de traitement ; les droits de la personne concernée ; les transferts internationaux |
| [Conditions d'utilisation](/fr/mail/terms-of-service/) | Les conditions contractuelles d'utilisation du Service ; les droits et obligations ; les limitations de responsabilité ; le droit applicable et la juridiction compétente |
| [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) | Les limites de la conduite des utilisateurs ; la liste des comportements interdits et les mesures de l'Opérateur ; les procédures d'exécution |
| [Traitement des données et maintien de la sécurité](/fr/mail/data-security/) | Le cycle de vie des données ; la matrice de traitement ; les mesures de maintien de la sécurité ; la réponse aux incidents ; la coopération aux inspections |
| [Liste des sous-traitants](/fr/mail/sub-processors/) | Les sous-traitants, les destinataires du partage, les données concernées et les mécanismes de garantie des transferts internationaux |
| [Définitions](/fr/mail/key-terms/) | Les définitions des termes techniques et juridiques employés dans les documents juridiques du présent site |
| [Anti-falsification et normes officielles](/fr/mail/tamper-proof/) | Spécifications des e-mails officiels, 16 avis de sécurité, anti-usurpation et vérification d'intégrité |

## 4. Ordre de priorité

1. En matière de confidentialité, la [Politique de confidentialité](/fr/mail/privacy-policy/) constitue la disposition spécifique ; pour les conditions d'utilisation du Service, les [Conditions d'utilisation](/fr/mail/terms-of-service/) constituent la disposition spécifique ; toutes les autres questions s'interprètent selon l'architecture exposée sur la présente page.
2. En cas d'incompatibilité entre documents, le document directement lié à l'objet en cause prévaut.
3. Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Le droit applicable de chaque instance est déterminé par le lieu où réside son Opérateur (voir la section 2).

## 5. Points de contact

- **Confidentialité et réclamations en matière de protection des données** : `privacy@epocanvas.com`
- **Contact au sein du produit** : messages internes ou `admin@epocanvas.com`
- **Projet open source** : tickets (Issues) du dépôt GitHub (`github.com/shijianus/epomail`)
- **Sites auto-hébergés** : contactez l'Opérateur par les coordonnées publiées par le site concerné
