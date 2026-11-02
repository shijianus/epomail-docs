---
title: Prise en main
description: Prise en main d'EpoCanvas Mail — le chemin le plus court de l'inscription au premier courriel envoyé sur l'instance hébergée, et la séquence complète du clonage du dépôt à la vérification d'envoi et de réception sur une instance auto-hébergée.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

Cette page présente l'inscription sur l'instance hébergée (voie A) et l'auto-déploiement (voie B). Les durées ci-dessous sont des estimations de prise en main fonctionnelle, sans inclure la préparation juridique ou de sécurité. Les nouveaux contrôles d'inscription et de données décrits ici nécessitent le déploiement coordonné du Worker, de l'interface de connexion React et de l'interface de paramètres Vue mis à jour, puis leur configuration ; cette page ne prouve pas qu'une instance en ligne a été mise à jour ou vérifiée. Les autres fonctions et réglages figurent dans les guides dédiés.

La version en chinois traditionnel (Taïwan) des documents juridiques du site fait foi ; les autres langues sont des traductions de référence et, en cas de doute, la version faisant foi prévaut.

![Deux voies EpoCanvas Mail : le même code ouvert, chaque instance utilisant les ressources et services externes choisis par son exploitant réel](/images/mail/fr/dual-nature-scale.svg)

*Figure : les deux voies exécutent le même code. Sur l'instance hébergée, l'utilisateur doit cocher explicitement la case d'acceptation des [Conditions d'utilisation](/fr/mail/terms-of-service/) lors de son inscription ; la [Politique de confidentialité](/fr/mail/privacy-policy/) informe sur les traitements et ne vaut pas consentement général. À compter de l'auto-déploiement, le déployeur doit évaluer son rôle au regard des traitements réels (voir la [Confidentialité et conditions — Vue d'ensemble](/fr/mail/overview/), section 2).*

## 1. Choisir une voie

| | Voie A : instance hébergée | Voie B : auto-déploiement |
| --- | --- | --- |
| Convient à | Essayer le produit sans exploiter d'infrastructure | Disposer déjà d'un domaine et d'un compte Cloudflare et vouloir l'autonomie totale des données |
| Prérequis | Un navigateur | Un domaine, un compte Cloudflare, Node.js et pnpm ; l'envoi hors site exige en outre un compte de canal de distribution |
| Durée | Environ 10 minutes | Environ 30 minutes |
| Coût | Aucune fonctionnalité payante à ce jour | La consommation Cloudflare du déployeur |
| Accès | [mail.epocanvas.com](https://mail.epocanvas.com) | [Guide de déploiement](/fr/mail/deployment/) |

## 2. Voie A : instance hébergée

1. **Créer un compte** : ouvrez [mail.epocanvas.com](https://mail.epocanvas.com), basculez vers le formulaire d'inscription depuis la page de connexion, consultez l'identité de l'exploitant, la version actuelle des conditions et les [Conditions d'utilisation](/fr/mail/terms-of-service/) affichées par l'instance, puis cochez la case non précochée « J'accepte les Conditions d'utilisation » avant de soumettre une adresse « préfixe @ domaine de l'instance » avec un mot de passe (6 à 30 caractères). La [Politique de confidentialité](/fr/mail/privacy-policy/) fournit ici l'information sur les traitements ; cette case ne constitue pas un consentement général aux traitements. Si les informations légales requises ou la version des conditions sont incomplètes, les nouvelles inscriptions sont désactivées. Ce contrôle ne concerne que les nouvelles inscriptions ; les connexions existantes et les chemins d'initialisation administrative restent disponibles. L'exigence d'un code d'invitation ou d'une vérification humaine dépend de la configuration de l'instance ; demandez le code à l'exploitant le cas échéant, ou accédez directement au formulaire avec le paramètre `?code=`. L'inscription prend effet immédiatement, sans boucle de vérification par courriel.
2. **Vérifier votre groupe d'identité** : après l'inscription, vous entrez dans le groupe par défaut de l'instance ; une inscription avec code d'invitation place dans le groupe lié à ce code. Le groupe détermine le quota d'envoi quotidien, le nombre de boîtes, le quota de stockage et l'autorisation des pièces jointes ; les valeurs d'usine figurent dans les [Modes de fonctionnement](/fr/mail/modes/), section 3.
3. **Recevoir votre premier courriel** : après l'inscription, consultez le message de bienvenue et envoyez du contenu de test synthétique depuis une boîte externe que vous contrôlez pour vérifier la réception. L'extraction des codes de vérification est désactivée par défaut : l'instance doit activer `verificationCodeEnabled` et fournir une information à jour sur le traitement, et vous devez activer votre préférence personnelle, désactivée par défaut. Chaque demande de traduction nécessite la confirmation de l'information actuelle ; l'OCR des images exige en plus un choix explicite pour cette demande et l'activation côté serveur. Le repli vers la traduction publique est désactivé par défaut. Voir le [Guide des paramètres](/fr/mail/settings/#optional-processing).
4. **Envoyer votre premier courriel** : ouvrez la couche de rédaction depuis l'entrée de rédaction de la barre latérale. Les destinataires internes reçoivent en distribution directe ; les adresses externes passent par le canal de distribution configuré par l'exploitant. Le volume sortant est soumis au quota d'envoi quotidien, dont le compteur se réinitialise chaque jour.
5. **Activer le classement automatique** : quatre étiquettes sont livrées d'usine — Communauté, Abonnements, Promotions et Travail — et le courrier entrant est classé par heuristique intégrée ; règles personnalisées, exceptions et priorités dans la [Gestion des étiquettes et du classement](/fr/mail/labels/).
6. **Activer la vérification en deux étapes** : sous « Paramètres → Sécurité », liez une application d'authentification (TOTP) en trois étapes ; dix codes de récupération à usage unique s'affichent à la fin, à conserver hors ligne. Étapes dans le [Guide de sécurité du compte](/fr/mail/security/).
7. **Lier la push Telegram (facultatif)** : recevez les nouveaux courriels en temps réel via votre propre robot, avec un lien de lecture sur le site valable 7 jours. Étapes dans le [Guide des notifications et du transfert](/fr/mail/notify/).
8. **Exporter des données (facultatif)** : dans « Paramètres → Données », téléchargez les champs sélectionnés du profil et des messages non supprimés en JSON, sans pièces jointes, MIME original complet ni tous les paramètres de sécurité. La corbeille utilise la création du message depuis plus de 7 jours ; gardez les pièces jointes séparément avant suppression. Voir [Export](/fr/mail/data/), [Confidentialité](/fr/mail/privacy-policy/), [Sécurité](/fr/mail/data-security/) et [Sous-traitants](/fr/mail/sub-processors/).

## 3. Voie B : auto-déploiement

1. **Vérifier les prérequis** : un domaine, un compte Cloudflare, Node.js et pnpm ; l'envoi hors site exige un compte de canal de distribution tel que Resend ou Mailjet. Liste complète dans le [Guide de déploiement](/fr/mail/deployment/), section 1. Avant un déploiement à froid, construisez d'abord `temp_login_ui` (React), puis `mail-vue` (Vue) ; la construction de `mail-vue` copie l'interface de connexion dans les ressources statiques du Worker.
2. **Construire et déployer** : construisez les interfaces puis déployez le Worker dans cet ordre (la cible de déploiement et les domaines personnalisés se configurent dans `wrangler.toml`) :

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail
pnpm --dir mail-worker install --frozen-lockfile
node scripts/build-prod.mjs
```

3. **Configurer les secrets et déployer** : depuis la racine du dépôt, exécutez `pnpm --dir mail-worker exec wrangler secret put jwt_secret` et `pnpm --dir mail-worker exec wrangler secret put totp_enc_key` ; un `init_secret` distinct, défini de la même manière, est recommandé. Exécutez ensuite `pnpm --dir mail-worker exec wrangler deploy`. Saisissez les valeurs dans les invites interactives, jamais dans les URL, les fichiers versionnés ou les exemples publics.
4. **Initialiser et configurer les informations** : envoyez `POST /api/init` en HTTPS avec `init_secret` dans l'en-tête `x-init-secret` (repli sur `jwt_secret` seulement si aucun secret distinct n'est défini) pour créer les tables, initialiser les groupes standard et le compte principal. Si la réponse contient un mot de passe initial, gardez-le privé et changez-le immédiatement. Connectez-vous à l'administration et complétez les [informations de l'exploitant](/fr/mail/settings/#operator-notice) avant d'ouvrir les inscriptions ; leur absence ne bloque ni l'initialisation administrative ni les connexions existantes.
5. **Brancher la réception** : activez l'Email Routing du domaine dans le tableau de bord Cloudflare et routez les adresses destinations vers le Worker ; le courrier entrant est analysé à l'arrivée.
6. **Brancher l'envoi** : configurez le canal de distribution dans les paramètres système ; jusque-là, les boîtes de l'instance restent livrables en direct entre elles.
7. **Vérifier envoi et réception** : dans un environnement de test isolé, utilisez des comptes dédiés et des données synthétiques pour vérifier l'acceptation des conditions à l'inscription, le courriel de bienvenue, les échanges internes et l'envoi et la réception externes ; ne publiez pas d'identifiants de production. Ces vérifications fonctionnelles ne prouvent ni la préparation complète en matière de sécurité, de confidentialité, d'effacement ou de droit, ni la possibilité d'ouvrir directement le service à de vrais utilisateurs.
8. **Confirmer votre position juridique** : évaluez les rôles selon les décisions réelles sur les finalités et moyens ; l'auto-déploiement ne fait pas automatiquement de vous l'unique responsable du traitement. Publiez l'identité, le lieu, les coordonnées et l'adresse légalement requise, puis vérifiez destinataires, contrats effectifs, transferts et durées de conservation. Un modèle ou des champs remplis ne prouvent pas ces faits. Voir [Open source et cadre juridique de l'auto-hébergement](/fr/mail/open-source/).

## 4. Pour continuer

- Panorama fonctionnel et opération interface par interface : le [Guide des fonctionnalités](/fr/mail/features/), l'[Interface et plan des routes](/fr/mail/interface/) ;
- Recherche et automatisation : la [Référence de la recherche et des règles](/fr/mail/search/), la [Gestion des étiquettes et du classement](/fr/mail/labels/) ;
- Configuration administrateur et modes de fonctionnement : le [Guide des paramètres](/fr/mail/settings/), les [Modes de fonctionnement](/fr/mail/modes/) ;
- En cas de problème : canaux d'assistance dans [Périmètre du service et assistance](/fr/mail/service-scope/), section 4 ; périmètre de service et durées de conservation, section 2 de la même page.
