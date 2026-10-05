---
title: Les cartes des paramètres système en détail
description: Les cartes des paramètres système d'EpoCanvas Mail — onze cartes passées en revue une à une, des paramètres du site à l'entrée À propos, en passant par la personnalisation, le stockage, le push des courriels et le moteur IA.
---

**Date d'entrée en vigueur : 6 octobre 2026 | Version : 5.15**

La page des paramètres système (`#manage/admin/system`, clés de permission `setting:query`／`setting:set`) organise toute la configuration au niveau de l'instance en cartes de configuration. La présente page les décrit carte par carte ; les noms de cartes correspondent à l'interface de l'application.

## 1. Paramètres du site

Inscription ouverte, profils publics, mode courriel (trois niveaux, voir la section 2 de [Modes de fonctionnement](/fr/mail/modes/)), vérification en deux étapes, domaine de connexion masqué, code d'inscription, boîtes supplémentaires, changement rapide multi-comptes, règles de préfixe de boîte — autant d'interrupteurs au niveau de l'instance.

## 2. Personnalisation

Titre du site, notifications contextuelles et interface dynamique／statique ; commande la présentation de marque de la surface de connexion et de l'interface.

## 3. Authentification tierce et SSO

Interrupteur général de connexion rapide tierce et configuration des identifiants de chaque fournisseur (GitHub, Google, Microsoft, Apple, SSO personnalisé) ; la règle d'affichage à trois états des boutons de la page de connexion figure à la section 4 de [Modes de fonctionnement](/fr/mail/modes/). L'affichage de cette carte est commandé par un indicateur de fonctionnalité sous-jacent ; un déploiement par défaut ne la rend pas.

## 4. Stockage et base de données centrale

Stockage d'objets (B2／S3, repli R2／KV par défaut), architecture de base de données centrale et externe (Turso, etc.), limite de pièce jointe unique et suppression en cascade, contrôle de santé du cache KV. Les détails techniques figurent dans [Architecture technique](/fr/mail/architecture/).

## 5. Push des courriels

Robot Telegram officiel (push à l'échelle du site), préférences d'affichage des champs poussés (expéditeur／destinataire／corps affichés ou masqués champ par champ), transfert global et transfert par règles ; verrouillé sur désactivé en mode chiffré. Le robot privé côté utilisateur figure dans le [Guide des notifications et du transfert](/fr/mail/notify/).

## 6. Moteur IA et intégration de modèles

Fournisseur d'IA au choix entre deux (point de terminaison compatible OpenAI personnalisé ou Cloudflare Workers AI), interrupteur d'activation, quota quotidien et limite de débit, autorisation des modèles par groupe d'identité (en coordination avec la page des [Permissions](/fr/mail/roles/)).

## 7. Contrôle des données utilisateurs

Commande les interrupteurs de capacités des utilisateurs ordinaires sur la page « Données » : push Telegram, transfert de courriels, appui des API tierces, stockage apporté et quota de stockage par défaut ; l'export des données reste toujours ouvert, hors de portée de cette carte.

## 8. Vérification humaine Turnstile

Clé de site et interrupteur de la vérification humaine, appliqués aux entrées publiques comme l'inscription.

## 9. Annonce

Avis en fenêtre sur la surface de connexion, envois groupés d'annonces par courriel et modèles de courriels de bienvenue (multilingues, envoyés dans la langue de chaque destinataire) ; la sémantique de remise des courriels officiels figure dans [Anti-falsification et normes officielles](/fr/mail/tamper-proof/).

## 10. Rapports des opérations

Seuils opérationnels de déclenchement des alertes (qui produisent les tickets du [Rapport d'audit](/fr/mail/audit/)).

## 11. À propos

Informations de version de l'instance et vérification des mises à jour (à comparer aux GitHub Releases).

<details>
<summary>Guide visuel : les onze cartes de configuration en un coup d'œil (numérotation conforme à l'interface)</summary>

![Les onze cartes de configuration en un coup d'œil (numérotation conforme à l'interface)](/images/mail/fr/ui/system.png)

1. ① Paramètres du site : inscription ouverte, profils publics, mode courriel, vérification en deux étapes, code d'inscription, boîtes supplémentaires, changement rapide multi-comptes, règles de préfixe de boîte.
2. ② Personnalisation : titre du site, notifications contextuelles, interface dynamique／statique. ③ Stockage et base de données centrale : B2／S3, base de données centrale et externe, limite de pièce jointe unique.
3. ④ Push des courriels : robot Telegram officiel, affichage des champs poussés, transfert global et par règles. ⑤ Moteur IA : fournisseur, quota et limite de débit, autorisation des modèles.
4. ⑥ Contrôle des données utilisateurs : interrupteurs push／transfert／API／stockage apporté côté utilisateur et quota par défaut. ⑦ Vérification humaine Turnstile. ⑧ Annonce : fenêtre contextuelle, envois groupés et modèles de courriels de bienvenue.
5. ⑨ Rapports des opérations : seuils de déclenchement des alertes. ⑩ À propos : version et vérification des mises à jour. L'affichage de la carte Authentification tierce et SSO est commandé par un indicateur de fonctionnalité.

</details>

## 12. Documents connexes

| Ressource | Lien |
| --- | --- |
| Effet côté utilisateur des interrupteurs de capacités | [Export des données et stockage](/fr/mail/data/) |
| Quotas des groupes et autorisation des modèles | [Permissions](/fr/mail/roles/) |
| Déploiement et injection des secrets | [Guide de déploiement](/fr/mail/deployment/) |
| Effet des interrupteurs sur l'interface | [Modes de fonctionnement](/fr/mail/modes/) |
