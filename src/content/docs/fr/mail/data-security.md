---
title: Traitement des données et maintien de la sécurité
description: Cycle de vie des données d'EpoCanvas Mail, matrice de traitement, mesures de maintien de la sécurité, réponse aux incidents et coopération aux inspections.
---

# Traitement des données et maintien de la sécurité

**Date d'entrée en vigueur : 30 septembre 2026 | Version : 5.3**

À la suite de la section 10 de la [Politique de confidentialité](/fr/mail/privacy-policy/), le présent document décrit le cycle de vie des données personnelles du Service, la matrice de traitement de chaque catégorie de données, ainsi que les mesures de maintien de la sécurité établies par l'Opérateur pour prévenir le vol, l'altération, l'endommagement, la perte ou la fuite de données personnelles. Il sert en outre de document de base pour la consultation par les personnes concernées et pour les inspections que l'autorité compétente effectue conformément à la loi.

Les documents juridiques du présent site font foi dans leur version en chinois traditionnel (Taïwan) ; les versions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut.

## 1. Cycle de vie des données

![Cycle de vie des données d'EpoCanvas Mail : collecte (inscription et envoi/réception de courriels) → traitement (analyse et chiffrement sur les nœuds de périphérie) → utilisation (fourniture du service et protection de sécurité) → transfert (sous-traitants et fonctions déclenchées par la personne concernée) → conservation (D1/KV/R2) → destruction (nettoyage de routine à 7 jours et suppression physique), chaque phase correspondant aux éléments d'information notifiés et aux standards de traitement](/images/mail/data-flow.svg)

*Figure : le cycle de vie des données personnelles dans le Service. La nature du traitement de chaque phase figure à la section 5 de la [Politique de confidentialité](/fr/mail/privacy-policy/).*

## 2. Matrice de traitement des données

| Catégorie de données | Éléments | Finalité du traitement | Support de stockage et niveau de sécurité | Conservation et destruction |
| --- | --- | --- | --- | --- |
| Identifiants de compte | adresse électronique, nom d'utilisateur, hachage du mot de passe et sel, clé TOTP (chiffrée en AES-GCM), hachage des codes de secours, clé publique Passkey | inscription, vérification, vérification en deux étapes, récupération des identifiants | Cloudflare D1 ; mot de passe PBKDF2 (100 000 itérations avec sel), TOTP chiffré au repos | conservés jusqu'à la clôture du compte ; effacés immédiatement à la suppression physique |
| Données réseau et d'appareil | IP d'inscription, dernière IP de connexion, système d'exploitation, User-Agent du navigateur, type d'appareil | audit de sécurité, identification des connexions anormales, limitation de débit | Cloudflare D1 ; accès limité à l'audit par les administrateurs | conservées jusqu'à la suppression physique du compte |
| État des sessions | jetons JWT, identifiants de rôle RBAC, boîte sélectionnée | autorisation par la passerelle en périphérie, routage des requêtes | Cloudflare KV ; validité maximale de 30 jours | révocation à la déconnexion ; expiration naturelle après 30 jours d'inactivité |
| Données de communication | expéditeur et destinataire, CC/BCC, objet, horodatages, état de lecture, étiquettes, étoiles, corps | acheminement des courriels, organisation des conversations, recherche | Cloudflare D1 (métadonnées) ; chiffrement statique en AES-256-GCM selon le mode | sous le contrôle de la personne concernée ; corbeille supprimée physiquement après 7 jours ; au-delà de 90 % d'utilisation, suppression physique immédiate des courriels déjà supprimés |
| Pièces jointes | nom de fichier d'origine, type MIME, taille du fichier, contenu binaire | transmission des pièces jointes, affichage intégré, téléchargement sécurisé | le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré par l'Opérateur, liaison le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré par l'Opérateur, liaison le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré par l'Opérateur, liaison le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré par l'Opérateur, liaison le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré par l'Opérateur, liaison le stockage d'objets propre à l'instance (résolu dans l'ordre : stockage compatible S3 personnel ou configuré par l'Opérateur, liaison Cloudflare R2, par défaut Cloudflare KV) ; téléchargements avec en-têtes défensifs| suivent le cycle de vie du courriel associé ; effacées en même temps à la suppression physique |
| Journaux de sécurité et de limitation de débit | compteur d'échecs de connexion, état de la vérification humaine, compteurs de requêtes à fenêtre glissante | protection contre la force brute, prévention des abus | Cloudflare KV ; compteurs à fenêtre glissante | expiration et réinitialisation automatiques dans les 12 heures après déclenchement du seuil |
| Préférences d'interface | langue (6 langues), mode clair/sombre, indicateurs de notification | cohérence de l'interface | localStorage du navigateur, synchronisation facultative vers D1 | conservées jusqu'au vidage du cache ou à la réinitialisation manuelle |

## 3. Mesures de maintien de la sécurité

L'Opérateur établit les mesures de maintien de la sécurité suivantes et les améliore continuellement, couvrant les plans du personnel, des processus, de la technologie et de l'audit :

| Matière de maintien de la sécurité | Mise en œuvre dans le Service |
| --- | --- |
| Désignation d'un personnel de gestion et de ressources appropriées | L'Opérateur de l'instance désigne des administrateurs et répartit les autorisations selon des rôles RBAC à plusieurs niveaux |
| Délimitation du périmètre des données personnelles | La matrice de traitement de la section 2 du présent document délimite clairement chaque catégorie de données |
| Mécanisme d'évaluation et de gestion des risques liés aux données personnelles | Choix du chiffrement entre les trois modes de messagerie, verrouillage après échecs, mécanismes de limitation de débit et de quotas ; le code open source est publiquement soumis à l'examen de la communauté |
| Mécanisme de prévention, de notification et de réponse aux incidents | Voir la section 4 du présent document |
| Procédures internes de gestion de la collecte, du traitement et de l'utilisation | Le tableau de correspondance des activités de traitement à la section 5 de la [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Gestion de la sécurité des données et gestion du personnel | Routage par hachage cryptographique (contre l'accès non autorisé), contrôles d'autorisation en refus par défaut (fail-closed), élimination à la passerelle des paramètres hors liste blanche |
| Sensibilisation et formation | À la charge de l'Opérateur auto-hébergé ; les documents du présent site peuvent servir de support de formation |
| Gestion de la sécurité des équipements | L'infrastructure en périphérie de Cloudflare assure la sécurité physique et virtuelle des équipements (SOC 2 Type II, ISO/IEC 27001) ; les clés sont injectées par variables d'environnement et n'entrent pas dans le dépôt de code |
| Mécanisme d'audit de la sécurité des données | Journaux de sécurité (IP de connexion, appareil, échecs) conservés et à accès d'audit restreint ; révocation immédiate des sessions possible |
| Conservation des journaux d'usage, des traces et des preuves | Journaux de connexion et de sécurité conservés jusqu'à la suppression physique du compte ; preuves des événements d'abus conservées selon la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) |
| Amélioration continue du maintien de la sécurité dans son ensemble | Le projet open source évolue en continu ; les correctifs de sécurité importants sont publiés et annoncés avec les versions |

Points clés des mesures techniques : HTTPS/TLS sur tout le site ; les courriels HTML sont purifiés par DOMPurify puis restitués dans une Shadow DOM isolée (blocage des scripts, des gestionnaires d'événements en ligne et des importations externes) ; les téléchargements de pièces jointes imposent `Content-Disposition: attachment` et `X-Content-Type-Options: nosniff` ; protection SSRF des webhooks et des points de terminaison de stockage externe (blocage des plages d'adresses privées et des adresses de métadonnées du cloud) ; les identifiants des courriels sont routés avec un masquage par HMAC afin de prévenir l'énumération non autorisée.

:::caution[Portée et limites du chiffrement]
Le chiffrement des trois modes de messagerie du Service (« tout », « privé », « chiffré ») est un chiffrement statique côté serveur : les clés sont dérivées des variables d'environnement du serveur d'instance et de l'identifiant de l'utilisateur. Ce mécanisme protège contre le risque de vol du fichier de base de données ou de fuite d'un instantané ; ce n'est pas un chiffrement de bout en bout, et l'Opérateur qui détient le serveur et les clés possède techniquement la capacité de déchiffrer. Qui exige une confidentialité à l'abri même de l'Opérateur chiffre lui-même le corps du courriel au préalable avec un outil de chiffrement de bout en bout tel que GPG avant de l'envoyer.
:::

## 4. Réponse aux incidents et notification

Lorsque l'Opérateur a connaissance du vol, de l'altération, de l'endommagement, de la perte ou de la fuite de données personnelles, il prend les mesures suivantes :

1. blocage immédiat de la source de l'atteinte (révocation des sessions, blocage des sources, rotation des clés) ;
2. évaluation de l'étendue de l'impact et conservation des enregistrements (données de trace et preuves) ;
3. notification aux personnes concernées touchées et signalement à l'autorité compétente conformément au droit applicable et aux règles de l'autorité compétente ; la notification comprend les faits de l'incident, les dangers possibles, les mesures de réponse déjà prises et les mesures d'autoprotection que la personne concernée peut prendre ;
4. examen des causes de l'incident et renforcement des mesures de sécurité correspondantes (amélioration continue dans son ensemble).

## 5. Coopération aux inspections

Le projet open source n'exploite lui-même aucune instance ; les inspections et la supervision de chaque instance sont acceptées par son Opérateur selon le droit applicable au lieu où il réside. L'instance hébergée `mail.epocanvas.com` est exploitée depuis Taïwan ; l'Opérateur accepte les inspections et les audits que l'autorité compétente taïwanaise met en œuvre conformément à la loi, le présent document et la [Politique de confidentialité](/fr/mail/privacy-policy/) servent de documents de base à ces inspections, et l'Opérateur se conforme aux décisions prises par l'autorité compétente conformément à la loi.

L'Opérateur auto-hébergé remplit de manière indépendante, pour son instance, les obligations décrites ci-dessus et répond lui-même aux audits de l'autorité compétente de son lieu ; le présent document peut lui servir de modèle pour établir son plan de maintien de la sécurité.
