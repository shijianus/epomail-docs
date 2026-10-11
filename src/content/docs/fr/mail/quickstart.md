---
title: Prise en main
description: Prise en main d'EpoCanvas Mail — le chemin le plus court de l'inscription au premier courriel envoyé sur l'instance hébergée, et la séquence complète du clonage du dépôt à la vérification d'envoi et de réception sur une instance auto-hébergée.
---

**Date d'entrée en vigueur : 11 octobre 2026 | Version : 5.19**

Cette page donne la séquence d'actions la plus courte pour deux voies : la voie A s'inscrit sur l'instance hébergée et va de l'inscription au premier courriel envoyé en une dizaine de minutes ; la voie B déploie tout le service sur votre propre domaine et votre compte Cloudflare, du clonage du dépôt à la vérification d'envoi et de réception en une demi-heure environ. Les deux voies exécutent le même code et la même interface ; la page ne liste que les actions et leurs résultats, chaque lien menant à la page dédiée pour la sémantique fonctionnelle et la configuration, et l'ensemble suit l'implémentation open source.

La version en chinois traditionnel (Taïwan) des documents juridiques du site fait foi ; les autres langues sont des traductions de référence et, en cas de doute, la version faisant foi prévaut.

![Schéma de la double gouvernance d'EpoCanvas Mail : une même base de code open source ; l'instance hébergée est exploitée par l'équipe d'exploitation, tandis que sur une instance auto-déployée toutes les données restent dans les ressources Cloudflare du déployeur](/images/mail/fr/dual-nature-scale.svg)

*Figure : les deux voies exécutent le même code. Choisir l'instance hébergée vaut acceptation de sa [Politique de confidentialité](/fr/mail/privacy-policy/) et de ses [Conditions d'utilisation](/fr/mail/terms-of-service/) ; à compter de l'auto-déploiement, le déployeur devient le responsable du traitement de ses utilisateurs (voir la [Confidentialité et conditions — Vue d'ensemble](/fr/mail/overview/), section 2).*

## 1. Choisir une voie

| | Voie A : instance hébergée | Voie B : auto-déploiement |
| --- | --- | --- |
| Convient à | Essayer le produit sans exploiter d'infrastructure | Disposer déjà d'un domaine et d'un compte Cloudflare et vouloir l'autonomie totale des données |
| Prérequis | Un navigateur | Un domaine, un compte Cloudflare, Node.js et pnpm ; l'envoi hors site exige en outre un compte de canal de distribution |
| Durée | Environ 10 minutes | Environ 30 minutes |
| Coût | Aucune fonctionnalité payante à ce jour | La consommation Cloudflare du déployeur |
| Accès | [mail.epocanvas.com](https://mail.epocanvas.com) | [Guide de déploiement](/fr/mail/deployment/) |

## 2. Voie A : instance hébergée

1. **Créer un compte** : ouvrez [mail.epocanvas.com](https://mail.epocanvas.com), basculez vers le formulaire d'inscription depuis la page de connexion et soumettez une adresse « préfixe @ domaine de l'instance » avec un mot de passe (6 à 30 caractères). L'inscription exige-t-elle un code d'invitation, comporte-t-elle une vérification humaine ? Cela relève de la configuration de l'instance ; demandez le code à l'exploitant le cas échéant, ou accédez directement au formulaire avec le paramètre `?code=`. L'inscription prend effet immédiatement, sans boucle de vérification par courriel.
2. **Vérifier votre groupe d'identité** : après l'inscription, vous entrez dans le groupe par défaut de l'instance ; une inscription avec code d'invitation place dans le groupe lié à ce code. Le groupe détermine le quota d'envoi quotidien, le nombre de boîtes, le quota de stockage et l'autorisation des pièces jointes ; les valeurs d'usine figurent dans les [Modes de fonctionnement](/fr/mail/modes/), section 3.
3. **Recevoir votre premier courriel** : un courriel de bienvenue est distribué automatiquement dès que l'inscription réussit ; il vous attend à la connexion. Envoyez ensuite depuis n'importe quelle boîte externe un courriel de test contenant un code de vérification vers votre nouvelle adresse : le code est extrait automatiquement par Workers AI et présenté en grands caractères avec un badge vert dans la liste et la vue détaillée (voir le [Guide des fonctionnalités](/fr/mail/features/), section 5).
4. **Envoyer votre premier courriel** : ouvrez la couche de rédaction depuis l'entrée de rédaction de la barre latérale. Les destinataires internes reçoivent en distribution directe ; les adresses externes passent par le canal de distribution configuré par l'exploitant. Le volume sortant est soumis au quota d'envoi quotidien, dont le compteur se réinitialise chaque jour.
5. **Activer le classement automatique** : quatre étiquettes sont livrées d'usine — Communauté, Abonnements, Promotions et Travail — et le courrier entrant est classé par heuristique intégrée ; règles personnalisées, exceptions et priorités dans la [Gestion des étiquettes et du classement](/fr/mail/labels/).
6. **Activer la vérification en deux étapes** : sous « Paramètres → Sécurité », liez une application d'authentification (TOTP) en trois étapes ; dix codes de récupération à usage unique s'affichent à la fin, à conserver hors ligne. Étapes dans le [Guide de sécurité du compte](/fr/mail/security/).
7. **Lier la push Telegram (facultatif)** : recevez les nouveaux courriels en temps réel via votre propre robot, avec un lien de lecture sur le site valable 7 jours. Étapes dans le [Guide des notifications et du transfert](/fr/mail/notify/).
8. **Exporter une sauvegarde (facultatif)** : un clic sur « Paramètres → Données » exporte une copie JSON complète ; les courriels de la corbeille sont physiquement supprimés 7 jours après réception, exportez donc d'abord ce que vous voulez conserver (voir [Export des données et stockage](/fr/mail/data/)).

## 3. Voie B : auto-déploiement

1. **Vérifier les prérequis** : un domaine, un compte Cloudflare, Node.js et pnpm ; l'envoi hors site exige un compte de canal de distribution tel que Resend ou Mailjet. Liste complète dans le [Guide de déploiement](/fr/mail/deployment/), section 1.
2. **Déployer en trois commandes** : exécutez ceci dans un terminal (la cible de déploiement et les domaines personnalisés se configurent dans `wrangler.toml`) :

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

3. **Initialiser** : après le premier déploiement, visitez `/api/init/<jwt_secret>` pour créer toutes les tables, semer les six groupes d'identité standard et initialiser le compte du propriétaire principal ; la chaîne d'amorçage est idempotente et peut être répétée sans risque.
4. **Injecter les secrets** : en production, injectez `jwt_secret` et `totp_enc_key` via `npx wrangler secret put` ; en développement local, utilisez `.dev.vars` (jamais versionné). La valeur du secret dans le chemin d'initialisation doit correspondre au secret de signature de session.
5. **Brancher la réception** : activez l'Email Routing du domaine dans le tableau de bord Cloudflare et routez les adresses destinations vers le Worker ; le courrier entrant est analysé à l'arrivée.
6. **Brancher l'envoi** : configurez le canal de distribution dans les paramètres système ; jusque-là, les boîtes de l'instance restent livrables en direct entre elles.
7. **Vérifier envoi et réception** : inscrivez un compte de test et confirmez la réception du courriel de bienvenue ; échangez un courriel interne entre le compte de test et le compte du propriétaire principal ; après configuration du canal, envoyez un courriel externe et confirmez sa livraison. Les quatre vérifications passées, le déploiement est terminé.
8. **Confirmer votre position juridique** : à compter de l'auto-déploiement, le déployeur est le responsable du traitement de ses utilisateurs et leur doit l'information et la sécurité ; les documents juridiques du site peuvent servir de modèle de base (voir [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/)).

## 4. Pour continuer

- Panorama fonctionnel et opération interface par interface : le [Guide des fonctionnalités](/fr/mail/features/), l'[Interface et plan des routes](/fr/mail/interface/) ;
- Recherche et automatisation : la [Référence de la recherche et des règles](/fr/mail/search/), la [Gestion des étiquettes et du classement](/fr/mail/labels/) ;
- Configuration administrateur et modes de fonctionnement : le [Guide des paramètres](/fr/mail/settings/), les [Modes de fonctionnement](/fr/mail/modes/) ;
- En cas de problème : canaux d'assistance dans [Périmètre du service et assistance](/fr/mail/service-scope/), section 4 ; périmètre de service et durées de conservation, section 2 de la même page.
