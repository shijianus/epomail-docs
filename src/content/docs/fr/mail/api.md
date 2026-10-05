---
title: Plateforme ouverte et accès API
description: Guide de la plateforme ouverte et de l'accès API d'EpoCanvas Mail — enregistrement des applications OAuth, points de terminaison authorize et token, userinfo, sémantique des périmètres et flux de consentement et de révocation côté utilisateur.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.14**

EpoCanvas Mail embarque un centre d'autorisation OAuth 2.0 / OIDC intégré : l'administrateur enregistre les applications tierces dans la section « Gestion des applications » de la console d'administration (`#manage/admin/oauth-apps`), et les sites externes peuvent alors proposer « Se connecter avec Epomail ». La présente page constitue le tutoriel développeur complet ; l'emplacement de l'interface dans l'application figure à la section 4 de l'[Interface et plan des routes](/fr/mail/interface/), et le traitement des données d'autorisation est exposé dans la [Liste des sous-traitants](/fr/mail/sub-processors/).

![Page de gestion des applications d'EpoCanvas Mail : quatre pastilles de points de terminaison, le bouton du tutoriel développeur, la carte de l'application d'exemple et l'entrée du code d'intégration](/images/mail/ui/ui-oauth-apps.png)

*Figure : la gestion des applications. Les quatre points de terminaison occupent le haut de la page ; chaque carte d'application porte ses identifiants, un interrupteur d'activation et le code d'intégration.*

## 1. Points de terminaison

| Point de terminaison | Méthode | Rôle |
| --- | --- | --- |
| `/.well-known/openid-configuration` | GET | Métadonnées de découverte OIDC (émetteur, points de terminaison et capacités) |
| `/oauth/authorize` | GET / POST | Point de terminaison d'autorisation utilisateur : connecter l'utilisateur et recueillir le consentement |
| `/api/oauth/token` | POST | Échange de jetons : échanger un code d'autorisation contre des jetons |
| `/api/oauth/userinfo` | GET | Profil utilisateur : lire le profil autorisé avec un jeton d'accès |

Le flux suit l'octroi par code d'autorisation standard : le code est à usage unique et valable 5 minutes ; le jeton d'accès (Bearer) et le jeton d'identité (ID Token) sont valables 2 heures ; aucun jeton de rafraîchissement n'est délivré à ce jour.

## 2. Côté administration : enregistrement et maintenance des applications

Champs du formulaire « Enregistrer une nouvelle application » :

| Champ | Description |
| --- | --- |
| Nom de l'application | Affiché aux utilisateurs sur la page de consentement |
| URL du site d'accueil | Le site d'accueil de l'application ; vérifiable depuis la page de consentement |
| Description de l'application | Finalité affichée sur la page de consentement |
| URI de redirection | La liste d'autorisation des redirections, une par ligne ; la redirection au moment de l'autorisation doit correspondre exactement |
| URL de l'icône de l'application (facultatif) | Badge de l'application sur la page de consentement |
| Périmètres (scopes) | Valeur par défaut `openid profile email`, à réduire selon les besoins |

- Les identifiants client portent le préfixe `epo_live_` et les secrets client le préfixe `epo_sec_` ; le secret n'est affiché intégralement qu'une seule fois, à la création ou à la réinitialisation, puis demeure masqué dans la liste — remise en une seule fois à la manière de GitHub ;
- « Réinitialiser le secret » invalide immédiatement l'ancien secret et en émet un nouveau, pour répondre aux fuites ;
- Chaque application peut être activée/désactivée, modifiée et supprimée ; une application désactivée ne peut pas lancer de nouvelles autorisations ;
- L'application d'exemple d'usine `shijianus-blog` (l'intégration native du blog officiel) est fournie à titre de référence ; le Maître peut la supprimer ou brancher la sienne à tout moment ;
- Le bouton « Code d'intégration » de chaque carte livre des exemples prêts à copier pour NextAuth, Node, Python, cURL et OIDC générique.

## 3. Flux d'intégration (point de vue du développeur)

1. Enregistrer l'application côté administration ; obtenir le Client ID/Secret et déclarer l'URI de redirection ;
2. Envoyer l'utilisateur vers `https://<instance-domain>/oauth/authorize?client_id=<id>&redirect_uri=<callback>&scope=openid profile email&state=<random>` ;
3. L'utilisateur se connecte et donne son consentement sur la page de consentement : dans une fenêtre surgissante, le résultat revient via `postMessage` ; une annulation redirige en retour avec `error=access_denied` ;
4. Échanger le code au point de terminaison de jeton (JSON, formulaire et HTTP Basic tous acceptés ; avec PKCE, le `code_verifier` est vérifié via S256, sinon le Client Secret) :

```bash
curl -X POST https://<instance-domain>/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"authorization_code","code":"<code>","redirect_uri":"<callback>","client_id":"<id>","client_secret":"<secret>"}'
```

5. Appeler userinfo avec `Authorization: Bearer <access_token>` pour lire le profil ; un jeton expiré ou révoqué renvoie 401.

## 4. Sémantique des périmètres (scopes)

| Périmètre | Description sur la page de consentement |
| --- | --- |
| `openid` | Identité OpenID : délivre un jeton d'identité (ID Token) pour vérifier l'identifiant unique de l'utilisateur |
| `email` | Adresse électronique principale |
| `profile` | Profil public (pseudonyme public et avatar) |
| `comments` | Gestion des commentaires et des interactions du blog (utilisée par l'application d'exemple ; une permission d'interaction) |
| `offline_access` | Connexion de longue durée ; aucun jeton de rafraîchissement n'est délivré à ce jour, aussi l'octroi de ce périmètre ne produit aucun jeton hors ligne |

userinfo renvoie : `sub`, `email`, `email_verified`, `name`, `preferred_username`, `picture`, `is_admin` et `role`.

## 5. Côté utilisateur : consentement et révocation

- La page de consentement affiche les informations de l'application, son badge officiel et la liste complète des périmètres ; autoriser ne révèle jamais le mot de passe ni le contenu du courriel de l'utilisateur ;
- Les utilisateurs peuvent retirer à tout moment l'accès d'une application dans « Paramètres → Données », dans la liste « Applications tierces et services », ou tout révoquer d'un coup depuis la boîte de dialogue de détail ;
- La révocation est immédiate : les jetons existants de l'application meurent sur-le-champ (userinfo renvoie 401) et l'autorisation est retirée du compte de l'utilisateur.

## 6. Jetons API personnels (état actuel)

:::note
La carte « Contrôle des données utilisateurs » des paramètres système porte l'interrupteur « prise en charge de l'API tierce » qui régit l'accès développeur côté utilisateur. Les points de terminaison d'émission et de révocation des jetons d'accès personnels (PAT) existent déjà, mais la version actuelle n'expose pas encore de point de terminaison général authentifié par jeton ; les tiers doivent lire les profils par le flux userinfo OAuth décrit ci-dessus.
:::

## 7. Documents connexes

| Ressource | Lien |
| --- | --- |
| L'emplacement de la gestion des applications dans le plan des routes | [Interface et plan des routes](/fr/mail/interface/) |
| Connexion par autorisation et comportement de la connexion tierce | [Modes de fonctionnement](/fr/mail/modes/) |
| Divulgation du traitement et des transferts par des tiers | [Liste des sous-traitants](/fr/mail/sub-processors/) |
| Déployez d'abord votre propre instance | [Guide de déploiement](/fr/mail/deployment/) |
