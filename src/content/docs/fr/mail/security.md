---
title: Guide de sécurité du compte
description: Guide de sécurité du compte d'EpoCanvas Mail — activer la vérification en deux étapes en trois étapes, gérer les codes de récupération, enregistrer des clés d'accès, comportement de la vérification à la connexion et suppression du compte.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.14**

La présente page parcourt une à une les actions de la page « Paramètres → Sécurité ». Le comportement général de la vérification en deux étapes (appareils de confiance, politiques forcées) est décrit à la section 4 de [Modes de fonctionnement](/fr/mail/modes/) ; la présente page ne couvre que la configuration. Entrée : barre latérale « Paramètres → Sécurité » (`#settings/security`).

![Page de sécurité d'EpoCanvas Mail : changement de mot de passe et centre de vérification en deux étapes avec trois seconds facteurs](/images/mail/ui/ui-security-2fa.png)

*Figure : la page de sécurité. Nom d'utilisateur et mot de passe en haut, centre de vérification en deux étapes en dessous.*

## 1. Visite de la page de sécurité

| Bloc | Contenu |
| --- | --- |
| Nom d'utilisateur et mot de passe | Changer le nom d'utilisateur, changer le mot de passe (affiche la date du dernier changement) |
| Centre de vérification en deux étapes | État de l'interrupteur général, plus trois cartes : application d'authentification, codes de récupération de secours, clés d'accès |
| Suppression du compte | Entrée de suppression au bas de la page |

La visibilité du centre suit le mode courriel de l'instance : les modes privé et chiffré le verrouillent sur activé pour tout le monde ; seul en mode tous courriels (Level 1) l'opérateur peut le désactiver.

## 2. Activer la vérification en deux étapes (trois étapes)

1. Sur la carte « Application d'authentification », appuyez sur « Configurer », scannez le code QR avec votre application d'authentification ; si le scan échoue, saisissez manuellement la clé affichée ;
2. Saisissez le code à 6 chiffres de l'application d'authentification pour confirmer la liaison ;
3. La page affiche alors 10 codes de récupération : appuyez sur « Tout copier » ou « Télécharger .txt » pour les conserver, ou imprimez-les pour un stockage hors ligne. Chaque code fonctionne une seule fois, pour se connecter lorsque l'application d'authentification est indisponible.

## 3. Gestion des codes de récupération

- La carte affiche en permanence le nombre de codes encore utilisables ;
- La consultation de la liste complète ou la régénération exigent le mot de passe du compte ;
- Régénérez avant épuisement des codes ; une réinitialisation annule tous les anciens codes.

## 4. Clés d'accès (Passkey)

1. Sur la carte « Clés d'accès », appuyez sur « Ajouter » et nommez la clé (par exemple MacBook Touch ID, YubiKey 5C) ; le navigateur ou le système exécute ensuite son flux d'enregistrement ;
2. Une clé d'accès fraîchement enregistrée est en attente : activez-la immédiatement en approuvant avec l'application d'authentification liée, ou attendez l'expiration du verrou temporel de 30 jours ;
3. Une fois active, son état est actif ; utilisez « Tester » pour vérifier le flux de déverrouillage, et supprimez-la lorsqu'elle n'est plus nécessaire.

## 5. Vérification à la connexion

- Après le mot de passe, le second facteur s'exécute selon la configuration : un code dynamique, un code de récupération ou une clé d'accès, au choix ;
- Cocher « Ne plus demander sur cet appareil » à la connexion dispense l'appareil de toute nouvelle vérification pendant 30 jours (règles à la section 4 de [Modes de fonctionnement](/fr/mail/modes/)) ;
- Lorsque le système détecte un environnement de connexion anormal (multi-régions, concurrence multi-IP), il durcit le contrôle : même après la validation du premier facteur, un second facteur différent est exigé ;
- Désactiver la vérification en deux étapes exige le mot de passe du compte plus le code dynamique actuel ou un code de récupération.

## 6. Suppression du compte

Une entrée de suppression figure au bas de la page. Après suppression, les données du compte suivent les clauses d'effacement de la [Politique de confidentialité](/fr/mail/privacy-policy/) ; exportez d'abord vos données via « Paramètres → Données » (voir le [Guide des notifications et du transfert](/fr/mail/notify/)).

## 7. Documents connexes

| Ressource | Lien |
| --- | --- |
| Durées des appareils de confiance et règles de connexion tierce | [Modes de fonctionnement](/fr/mail/modes/) |
| Sections des paramètres et emplacement de la sécurité | [Guide des paramètres](/fr/mail/settings/) |
| Export des données, notifications et transfert | [Guide des notifications et du transfert](/fr/mail/notify/) |
| Conservation des mots de passe et des jetons | [Traitement des données et sécurité](/fr/mail/data-security/) |
