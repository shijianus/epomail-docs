---
title: Définitions
description: Définitions et limites des rôles juridiques, sources de données, chiffrement, contrôle d'accès, conservation et suppression.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

Cette page explique les termes des documents juridiques d'EpoCanvas Mail, sans créer de base de traitement ni de garantie de service distincte. Les rôles suivent les activités réelles et le droit applicable ; la portée technique suit les implémentations déployées et [Traitement des données et sécurité](/fr/mail/data-security/).

La version en chinois traditionnel (Taïwan) est la version officielle ; les autres langues sont des traductions de comparaison. Cette organisation ne limite ni l'information claire exigée par le droit applicable, ni l'interprétation favorable aux consommateurs, ni les droits auxquels il ne peut être renoncé. La date de mise à jour indique une révision, et non un nouveau consentement.

![Carte des termes juridiques et techniques](/images/mail/fr/key-terms-glossary.svg)

*Figure : les définitions juridiques décrivent les droits et rôles, les définitions techniques les mécanismes et limites ; aucune ne remplace l'évaluation des faits.*

## 1. Termes juridiques

| Terme | Définition |
| --- | --- |
| Données personnelles | Informations concernant une personne physique identifiée ou identifiable, dont les comptes, journaux réseau et informations dans les messages, pièces jointes ou métadonnées ; elles ne se limitent pas aux champs d'inscription |
| Anonymisation / pseudonymisation | L'anonymisation exige qu'aucun moyen raisonnablement susceptible d'être utilisé ne permette d'identifier une personne ; les données pseudonymisées, hachées ou masquées dont le lien peut être rétabli à l'aide d'informations supplémentaires peuvent rester des données personnelles. Des courriels synthétiques ne rendent pas automatiquement anonymes les comptes réels ni les journaux d'accès |
| Données personnelles hautement sensibles | Données de santé, génétiques, biométriques utilisées pour identifier une personne de manière unique ou relatives à la vie sexuelle notamment, soumises à une protection particulière ; les données relatives aux condamnations pénales et aux infractions relèvent de règles distinctes, et les catégories et conditions varient selon les juridictions |
| Collecte / traitement / utilisation | Obtention, enregistrement, stockage, consultation, transmission, utilisation ou suppression ; le droit taïwanais distingue ces catégories alors que le traitement au sens du RGPD est plus large, sans correspondance mécanique |
| Responsable du traitement | Entité déterminant seule ou conjointement les finalités et moyens d'un traitement ; selon les faits, sans exclusivité automatique due à l'auto-hébergement ni assimilation de chaque particulier à un responsable |
| Sous-traitant | Entité traitant pour le compte d'un responsable selon ses instructions licites ; le même prestataire peut être responsable indépendant d'autres activités dont il détermine les finalités |
| Personne concernée | Personne physique concernée par les données, dont utilisateurs, expéditeurs, destinataires et personnes mentionnées dans les messages, même sans compte |
| Transfert international | Activité constituant juridiquement une communication transfrontière ou un accès par un destinataire à l'étranger ; les mécanismes valables s'évaluent selon les flux réels, sans satisfaction automatique des exigences par la certification d'un fournisseur |
| Devoir d'information | Informations légales sur l'identité de l'entité traitante, finalités, bases, sources, destinataires, conservation et droits ; les sources indirectes incluent expéditeurs, fournisseurs d'identité, auteurs de signalements ou intégrations, selon les délais et exceptions du droit applicable |
| Finalité spécifique | Finalité définie avant le traitement, qui reste licite, nécessaire et compatible ; l'apprentissage ou le test n'autorise pas l'usage arbitraire de courriels réels |
| Droit d'opposition au marketing | Droit de refuser la prospection directe selon la loi ; cesser l'utilisation correspondante après opposition et fournir un moyen accessible de refus |
| Autorité de contrôle | Autorité compétente au regard du traitement et du droit en vigueur, pas seulement du lieu de l'opérateur ; les autorités de l'Union figurent dans la [liste des membres du CEPD](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) |
| Image sexuelle non consensuelle | Image intime créée ou diffusée sans consentement, y compris une image synthétique préjudiciable ; restrictions d'accès, conservation nécessaire et recours selon la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) |
| Exploitation sexuelle de mineurs | Abus, exploitation ou sollicitation sexuelle de mineurs, ou production, détention et diffusion de contenus illicites correspondants ; protection, signalement et preuves selon le droit applicable |
| Droit applicable au contrat | Droit valablement choisi ou déterminé par les règles légales ; les droits impératifs de consommation, de données et de recours subsistent, selon la section 11 des [Conditions d'utilisation](/fr/mail/terms-of-service/) |
| Contrat d'adhésion | Clauses rédigées à l'avance pour plusieurs utilisateurs ; les clauses abusives ou exclusions de droits non renonçables ne deviennent pas valables par un simple clic d'acceptation |
| Accord de sous-traitance (DPA) | Accord nécessaire encadrant le traitement réel pour autrui, les instructions, la sécurité, l'assistance et la fin de la relation ; l'usage pour une organisation exige une confirmation et un accord distincts, sans modification des rôles réels par leur intitulé |
| Délégué à la protection des données (DPO) | Fonction indépendante de protection des données dont la désignation est exigée lorsque les conditions légales sont réunies ; une adresse de confidentialité générale ne prouve pas sa nomination |
| Représentant dans l'Union | Représentant dans l'Union désigné lorsque la loi l'exige pour certains traitements hors Union soumis au RGPD ; distinct du DPO, sans nomination présumée du fait d'interfaces en langues européennes |

## 2. Termes techniques

| Terme | Définition |
| --- | --- |
| Instance (site) | Déploiement d'EpoCanvas Mail géré par un opérateur déterminé, tel que `mail.epocanvas.com` ; les flux dépendent de son infrastructure et de ses fonctions configurées |
| Opérateur | Personne physique ou organisation qui décide et gère réellement le service d'une instance ; l'auteur qui l'exploite aussi assume les obligations correspondantes |
| PBKDF2 | Dérivation d'une valeur de vérification à partir d'un mot de passe et d'un sel pour augmenter le coût des essais ; ne garantit pas la résistance des mots de passe faibles, paramètres réels dans la documentation de sécurité |
| TOTP | Codes temporaires à usage unique fondés sur un secret partagé et le temps ; le serveur doit protéger son secret, et ne conserve pas seulement une clé publique |
| Clé d'accès (Passkey) | Identifiant WebAuthn ; le serveur conserve la clé publique, l'identifiant de la clé d'accès et les métadonnées nécessaires à la vérification. La clé privée est gérée par l'authentificateur ou le service de synchronisation choisi, sans envoi au serveur de vérification du service |
| JWT (jeton de session) | Jeton signé pour les sessions de connexion ; signature ne signifie pas chiffrement, et durée, révocation et limites suivent l'implémentation déployée |
| localStorage | Stockage du navigateur persistant entre sessions, pouvant contenir état de connexion et préférences ; il ne prouve pas l'absence de cookies sur toute page ou tout composant tiers |
| Chiffrement au repos | Chiffrement des données stockées ; objets et corps des messages selon le mode, sans protection automatique des pièces jointes et métadonnées par le même chiffrement applicatif. Les détenteurs du serveur et des clés peuvent encore déchiffrer |
| Chiffrement de bout en bout (E2EE) | Conception où seuls les terminaux de communication peuvent déchiffrer ; le service ne fournit pas cette garantie, et l'usage autonome d'OpenPGP ne masque pas nécessairement l'enveloppe ou d'autres métadonnées |
| Routage masqué par HMAC | Liaison des identifiants de ressources aux informations utilisateur pour réduire les risques d'énumération et d'accès illicite ; les contrôles d'autorisation restent nécessaires et l'absence de défaut d'accès n'est pas garantie |
| RBAC | Restriction des opérations et accès selon le rôle ; l'efficacité dépend de la configuration, des contrôles et de la maintenance, sans garantie absolue de sécurité |
| D1 / KV / R2 | Services Cloudflare de base de données, de stockage clé-valeur et d'objets ; emplacements, copies et conservation dépendent de la configuration et du prestataire |
| Télémétrie | Retour automatique de données d'usage ou de diagnostic ; l'absence d'analyse d'usage vers l'amont n'exclut pas le trafic tiers des polices, vérifications, acheminements ou fonctions facultatives |
| Suppression logique / physique | Marquer ou limiter l'usage des données, ou les retirer d'un stockage déterminé ; cela n'efface pas simultanément sauvegardes, copies externes et preuves légalement conservées, ni ne garantit leur récupération ou leur irrécupérabilité |
| BYOS | Utilisation d'un stockage compatible S3 configuré ; points d'accès, identifiants et fichiers peuvent être traités par l'instance pour permettre l'accès, sans rester uniquement sur l'appareil de l'utilisateur |
| Workers AI | Service d'inférence Cloudflare ; les traitements automatiques activés et fonctions déclenchées par l'utilisateur peuvent transmettre le contenu des messages, selon la portée et les bases de la [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Turnstile | Vérification humaine de Cloudflare ; les requêtes et données techniques nécessaires impliquent un traitement tiers, détaillé dans la [Liste des sous-traitants](/fr/mail/sub-processors/) |
| Protection SSRF | Contrôles limitant l'incitation du serveur à contacter des destinations inadéquates ; portée et efficacité dépendent des chemins de requête et du déploiement, sans élimination de tout risque externe |

## 3. Autres

Les termes non définis suivent la [Politique de confidentialité](/fr/mail/privacy-policy/), les [Conditions d'utilisation](/fr/mail/terms-of-service/) et le droit applicable. Consultez le [texte officiel](https://eur-lex.europa.eu/eli/reg/2016/679/oj) pour les notions du RGPD ; cette page ne revendique aucune certification. Questions à `privacy@epocanvas.com`.
