---
title: Guide des fonctionnalités d'EpoCanvas Mail
description: Guide des fonctionnalités d'EpoCanvas Mail — organisation de la boîte de réception, rédaction et envoi, syntaxe de recherche, moteur de règles d'étiquettes, extraction des codes de vérification, gestion des pourriels, réexpédition et notifications, capacités d'IA et plateforme ouverte.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.17**

La présente page décrit une à une les fonctionnalités réelles d'EpoCanvas Mail ; chaque point a été vérifié à partir du code open source, et les captures d'écran de l'interface proviennent de l'exécution réelle de l'instance hébergée officielle. Le positionnement du projet, son historique de développement et son déploiement sont présentés dans [Présentation du projet](/fr/mail/project/) ; le traitement des données et les durées de conservation propres à chaque fonctionnalité figurent dans [Traitement des données et sécurité](/fr/mail/data-security/).

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut.

![Panorama de la boîte de réception EpoCanvas Mail : à gauche, l'entrée de rédaction, l'arborescence des dossiers (Principale, Étoilés, Reportés, Envoyés, Brouillons, Tous les courriels, Pourriels, Corbeille) et les étiquettes colorées (Communauté, Abonnements, Promotions, Travail) ; à droite, la liste affiche l'expéditeur, l'objet, l'extrait, le badge de code de vérification et la marque de certification officielle (interface en chinois simplifié)](/images/mail/fr/ui/views-guide.png)

*Figure : boîte de réception (capture en chinois simplifié). La liste présente directement le badge de code de vérification (cadre vert) et la marque de certification des courriels officiels (coche sur fond bleu) ; les compteurs des dossiers et des étiquettes sont synchronisés en temps réel.*

<details>
<summary>Guide visuel : La boîte de réception en un coup d'œil  —  les quatre entrées les plus utilisées</summary>

Quatre régions annotées de la boîte de réception, correspondant aux quatre entrées les plus utilisées au quotidien : rédiger un nouveau message, revenir aux courriels marqués d'une étoile, consulter les éléments reportés et vérifier ce qui est réellement parti.

1. **Rédiger (bouton principal de la barre latérale)** : L'unique point d'entrée pour créer un courriel : il ouvre la fenêtre de rédaction en surimpression (et non une route indépendante). Sur mobile, il devient un bouton flottant en bas à droite, et le lien profond `?composeTo=<address>` préremplit le destinataire. Rédiger un message ne demande qu'un clic, depuis n'importe quelle vue.
2. **Étoilés (dossier de la barre latérale)** : Tous les courriels marqués d'une étoile s'y rassemblent, quel que soit leur dossier : un clic sur l'étoile d'une ligne de liste les y ajoute. À réserver aux messages à garder à portée de main ou à consulter souvent ; le compteur de la barre latérale se met à jour en temps réel.
3. **Reportés (dossier de la barre latérale)** : La zone d'attente des suivis différés, à deux paliers (urgent et en attente). Dans la vue de détail, choisissez « Reporter » en précisant l'heure ; à l'échéance, le courriel revient automatiquement en haut de la boîte de réception et les sujets importants ne sombrent plus au fond de la pile.
4. **Envoyés (dossier de la barre latérale)** : Conserve la trace de tous les courriels émis par ce compte, où vérifier ce qui est effectivement parti. Le volume sortant est borné par le quota d'envoi quotidien du rôle ; les courriels adressés aux boîtes du site sont livrés en direct, ceux destinés à l'extérieur passent par le canal de livraison.

</details>

## 1. Boîte de réception et organisation

| Capacité | Description |
| --- | --- |
| Vues du courrier | Huit vues : Principale, Étoilés, Reportés, Envoyés, Brouillons, Tous les courriels, Pourriels, Corbeille ; compteurs actualisés en temps réel |
| Mise en page de lecture | Vue fractionnée à trois colonnes, fil de conversation, réponse en ligne et réactions par émoji ; le détail du courriel permet de consulter les en-têtes bruts |
| Actions de tri | Ajouter une étoile, reporter (à l'heure de votre choix), signaler comme pourriel／non-pourriel, déplacer vers la corbeille, suppression définitive |
| Badge de code de vérification | Les codes de vérification extraits par Workers AI s'affichent directement dans la liste et le détail (voir la section 5) |
| Identification des courriels officiels | Les courriels d'expéditeurs officiels tels que announcement@epocanvas.com portent la marque de certification et un bandeau explicatif (voir [Anti-falsification et normes officielles](/fr/mail/tamper-proof/)) |

## 2. Rédaction et envoi

![Fenêtre de rédaction d'EpoCanvas Mail : l'expéditeur est verrouillé sur la boîte actuelle, le choix des destinataires peut passer par les contacts ; sous le champ d'objet se trouve la barre d'outils de texte enrichi (paragraphe, taille de police, gras, listes, citation, séparateur, lien, image, tableau, émoji, traduction et mode source), avec pièces jointes et bouton d'envoi au bas](/images/mail/fr/ui/compose-guide.png)

*Figure : rédaction (capture en chinois simplifié). L'éditeur de texte enrichi offre 17 outils de mise en forme ; les destinataires du site reçoivent en livraison directe, les autres passent par le canal de livraison.*

<details>
<summary>Guide visuel : La fenêtre de rédaction  —  quatre étapes, de la mise en forme à l'envoi</summary>

Quatre régions de la fenêtre de rédaction, qui couvrent le trajet complet d'un message, de la mise en forme à l'envoi : la barre d'outils décide de l'aspect, les destinataires et l'objet décident de la destination, et le bouton d'envoi déclenche la remise.

1. **Barre d'outils de texte enrichi (au-dessus du corps)** : 17 outils de mise en forme : paragraphes et taille de police, gras/italique/souligné/barré, couleur, alignement, listes ordonnées et non ordonnées, citation, séparateur, lien, image, tableau, émoji, traduction et mode code source — rendus au fil de la frappe.
2. **Ligne des destinataires** : Choisissez des contacts ou saisissez directement des adresses. Les boîtes du site reçoivent en livraison directe (aucune transmission externe) ; les adresses hors site passent par le canal configuré par l'Opérateur (Resend/Mailjet, etc.).
3. **Ligne d'objet** : La première chose que voit le destinataire : elle s'affiche dans les listes et les notifications push avec l'aperçu des premières lignes du corps. Un objet explicite paie plus tard, à l'usage de l'opérateur `subject:`.
4. **Bouton d'envoi (en bas à droite)** : Un clic et le message part : livraison directe et instantanée sur le site, acheminement par le canal de livraison hors site ; vérifiez ensuite dans la vue « Envoyés ». Les droits de pièces jointes dépendent du rôle, et le plafond par fichier suit le réglage de l'instance (25 Mo par défaut).

</details>

- **Édition en texte enrichi** : paragraphes, taille de police, gras, italique, souligné, barré, couleurs, alignement, listes ordonnées et non ordonnées, citation, séparateur, lien, image, tableau, émoji, traduction et mode code source ;
- **Pièces jointes** : la capacité d'envoi et de réception des pièces jointes est activée selon le rôle du compte ; la taille maximale d'une pièce jointe dépend du réglage de l'instance (25 Mo par défaut, contraignant uniquement les utilisateurs du stockage public de l'Opérateur ; ceux qui apportent leur propre stockage ne sont pas limités) ; le quota de stockage est fixé selon le rôle ;
- **Portée d'envoi** : livraison directe aux boîtes du site (aucune transmission externe) ; les courriels destinés à l'extérieur sont acheminés par les canaux configurés par l'Opérateur (Resend／Mailjet, etc.) ; les tiers concernés figurent dans la [Liste des sous-traitants](/fr/mail/sub-processors/) ;
- **Gestion de l'envoi** : consultation dans la vue « Envoyés » ; le volume sortant est soumis au quota d'envoi quotidien du rôle du compte (voir la section 6).

## 3. Syntaxe de recherche

![Vue des résultats d'EpoCanvas Mail après saisie de from:github dans la barre de recherche : la liste n'affiche que les notifications GitHub correspondantes ; les compteurs de la barre latérale restent synchronisés (interface en chinois simplifié)](/images/mail/fr/ui/search-guide.png)

*Figure : recherche (capture en chinois simplifié). Les opérateurs de champs se combinent avec des mots-clés libres ; la liste des correspondances s'actualise en temps réel.*

<details>
<summary>Guide visuel : La recherche  —  les deux positions qui comptent dans une requête</summary>

Deux régions qui illustrent une recherche complète : saisissez un opérateur ou un mot-clé dans la barre de recherche, et la liste des résultats se filtre instantanément, correspondances surlignées.

1. **Barre de recherche supérieure** : Sur les pages courriel, elle cherche des courriels ; sur les pages de paramètres, des entrées de configuration. Elle gère dix opérateurs de champs (`from:`, `to:`, `subject:`, `body:`, …) et des indicateurs comme `is:` ou `global:` ; plusieurs conditions séparées par des espaces se combinent en ET, et Tab complète les opérateurs.
2. **Liste des correspondances** : Seuls les courriels satisfaisant toutes les conditions sont affichés, les termes trouvés étant surlignés nativement par le navigateur (`hl:off` le désactive). Un clic sur une ligne ouvre le détail et la fenêtre d'extrait glisse d'elle-même vers la correspondance, pour en conserver le contexte.

</details>

| Opérateur | Exemple | Description |
| --- | --- | --- |
| `from:` | `from:github` | filtrer par expéditeur |
| `to:` | `to:patron` | filtrer par destinataire |
| `subject:` | `subject:code` | filtrer par objet |
| `body:` / `subject_or_body:` | `body:facture` | filtrer par corps／par objet ou corps |
| `larger:` / `smaller:` | `larger:10M` | filtrer par taille du courriel |
| `before:` / `after:` | `after:2026-10-01` | filtrer par date |
| `label:` | `label:Travail` | filtrer par étiquette |
| `global:` | `global:projet` | recherche sur tout le site, toutes boîtes confondues |
| `is:` | `is:sent`, `is:spam`, `is:trash` | filtrer par état |

Le surlignage des correspondances repose sur la CSS Highlights API ; la recherche sur tout le site et la recherche dans la page coexistent sur deux niveaux.La référence complète de tous les opérateurs de champ, drapeaux et conditions de règles figure dans la [Référence de la recherche et des règles](/fr/mail/search/).

## 4. Étiquettes et moteur de règles de classement

- Quatre étiquettes sont préconfigurées par défaut : **Communauté** (classement automatique selon les domaines de messagerie publics courants), **Abonnements**, **Promotions**, **Travail** ; les couleurs et les icônes des étiquettes sont personnalisables ;
- Les conditions de règle sont composables (contient dans l'adresse de l'expéditeur, mots-clés de l'objet, paramètres du système, etc.), avec exceptions et priorités ; l'étiquetage est appliqué automatiquement à la réception, ou manuellement ;
- Outils de gouvernance globale : liste noire d'expéditeurs, liste noire de mots-clés d'objet et de contenu, mode liste blanche, interception des expéditeurs sans nom, interception des non-destinataires, interception des pièces jointes exécutables et comptage des rejets par interception stricte ;
- Les statistiques d'étiquettes (total, non lus) s'affichent en temps réel dans la barre latérale ; les résultats de classement peuvent être revérifiés sur la page d'analyse.

## 5. Extraction automatique des codes de vérification

![Détail d'un courriel EpoCanvas Mail : le code de vérification à 6 chiffres d'un courriel Cloudflare est présenté en grands caractères ; la liste et le détail portent tous deux le badge vert du code de vérification](/images/mail/ui/ui-detail-verification.png)

*Figure : extraction des codes de vérification (capture en chinois simplifié). Il s'agit du seul traitement par IA non déclenché manuellement ; seuls l'objet et les 6,000 premiers caractères du corps sont transmis à Workers AI. Le périmètre de traitement et le moyen de le désactiver figurent à la section 6 de la [Politique de confidentialité](/fr/mail/privacy-policy/).*

<details>
<summary>Guide visuel : L'extraction du code de vérification dans le volet de lecture</summary>

L'extraction des codes de vérification dans le détail d'un courriel : le code à 6 chiffres est présenté en grands caractères, avec un badge vert dans la liste comme dans le détail.

- **Zone du code en grands caractères** : Le code extrait par Workers AI depuis l'objet et les 6,000 premiers caractères du corps, affiché en grands caractères pour le recopier facilement.
- **Badge vert** : Le marqueur vert qui apparaît à la fois sur la ligne de liste et sur la page de détail signifie « ce courriel contient un code de vérification extrait » : vous le repérez dès la liste, sans ouvrir chaque message. Le badge ne paraît qu'en cas d'extraction réussie ; sans correspondance ou extraction désactivée, il reste absent — son absence ne prouve pas que le courriel est sûr, seulement qu'il n'y a pas de code à recopier.
- **Limites** : C'est le seul traitement par IA qui n'est pas déclenché manuellement ; il se désactive dans les paramètres généraux. Étendue du traitement et modalités de retrait : section 6 de la politique de confidentialité.

</details>

## 6. Gestion des pourriels

- Mise en quarantaine et conservation : les pourriels sont conservés en quarantaine 7 jours puis déplacés automatiquement vers la corbeille ; le signalement de pourriels／de non-pourriels, une fois confirmé par l'utilisateur, met automatiquement à jour sa liste de confiance personnelle ;
- Contraintes à l'envoi : le quota d'envoi quotidien est fixé selon le rôle (utilisateurs de base : 5 courriels ; LV.0 : 8 ; LV.1 : 10 ; administrateurs : 100 ; le compte Webmestre est sans limite), avec remise à zéro quotidienne des compteurs ; le traitement des abus de quota figure à la section 6 de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/) ;
- La responsabilité de la transmission des contenus payants et marketing incombe à l'expéditeur ; l'envoi de courriels commerciaux massifs non sollicités est un comportement interdit (voir la section 3 de la [Politique d'utilisation acceptable](/fr/mail/acceptable-use/)).

## 7. Réexpédition et notifications

- **Réexpédition personnelle** : réacheminement automatique du courrier de la boîte vers d'autres adresses, avec prise en charge de la copie (cc) ;
- **Réexpédition globale** : l'administrateur peut configurer des règles de réexpédition au niveau du système, dans la limite du mode de messagerie (désactivée en mode « Chiffré ») ;
- **Notifications Telegram** : après liaison du bot, envoi selon la configuration de l'objet, de l'expéditeur, du corps et du code de vérification, avec un lien de lecture interne valable 7 jours ; chaque champ de notification peut être masqué individuellement.

## 8. Capacités d'IA

| Capacité | Déclenchement | Description |
| --- | --- | --- |
| Extraction des codes de vérification | automatique à l'arrivée d'un nouveau courriel (désactivable) | inférence en périphérie par Workers AI, voir la section 5 |
| Traduction intégrale | clic manuel | traduction multilingue qui conserve la mise en page du courriel d'origine, segments traités en parallèle ; les points de terminaison des modèles et le canal de secours figurent à la section 6 de la [Politique de confidentialité](/fr/mail/privacy-policy/) |
| Reconnaissance du texte des images | téléversement manuel | sous-titres générés par OCR ; les images purement décoratives sont automatiquement ignorées |
| AI Hub | configuration par l'administrateur | connexion à des points de terminaison multi-modèles compatibles OpenAI, test de vitesse à zéro jeton, autorisation des modèles par rôle |

L'Opérateur n'entraîne aucun modèle sur le contenu des courriels ; le traitement par IA consenti peut être retiré à tout moment (voir la section 6 de la [Politique de confidentialité](/fr/mail/privacy-policy/)).

## 9. Plateforme ouverte et autonomie des données

- **Centre d'authentification OAuth 2.0 / OIDC** : l'administrateur peut enregistrer des applications tierces, avec des portées d'autorisation limitées à openid / profile / email et des jetons d'accès valables 2 heures ; la personne concernée peut suivre en temps réel les autorisations sur la page « Applications tierces » et les révoquer à tout moment ;
- **Guide d'intégration** : l'enregistrement des applications côté administration, les points de terminaison et le code d'intégration figurent dans [Plateforme ouverte et accès API](/fr/mail/api/);
- **Export des données** : export en un clic, depuis la page des paramètres, d'une copie complète au format JSON (profil et texte intégral des courriels non supprimés) ; chaque courriel peut être téléchargé au format .eml ;

## 10. Interface et mobile

- Six langues d'interface (chinois simplifié, chinois traditionnel, English, Français, Español, Nederlands), avec des dictionnaires parfaitement symétriques dans les six langues, côté client comme côté serveur ;
- Thèmes clair et sombre, 300+ icônes vectorielles hors ligne (zéro requête externe), mise en page réactive et installation PWA ; une application mobile Android (epomail) est également proposée.

![Boîte de réception de l'interface anglaise d'EpoCanvas Mail : prise en charge multilingue complète ; la barre latérale affiche Compose, Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash ainsi que les étiquettes Social, Subscriptions, Promotions, Work](/images/mail/ui/ui-inbox-en.png)

*Figure : interface English. La langue de l'interface se change dans les paramètres ; la symétrie des dictionnaires dans les six langues est garantie par des scripts d'audit statiques.*

<details>
<summary>Guide visuel : La boîte de réception en anglais et son parallélisme avec la version chinoise</summary>

La boîte de réception en interface English : strictement isomorphe à la version chinoise, la symétrie des dictionnaires dans les six langues étant garantie par des scripts d'audit statiques.

- **Barre latérale** : Les vues Compose, Starred, Snoozed et Sent, entre autres, et les étiquettes Social/Subscriptions/Promotions/Work reproduisent la taxonomie chinoise à l'identique.
- **Liste** : Expéditeur, objet, aperçu et badge de code de vérification occupent exactement les mêmes positions, tailles et couleurs que dans la version chinoise : la localisation ne remplace que les chaînes, jamais la mise en page — c'est pourquoi captures et instructions se réutilisent d'une langue à l'autre. Dates, nombres et compteurs sont formatés selon la langue de l'interface.
- **Changement de langue** : L'endroit où se règle la langue de l'interface : un choix parmi six (chinois simplifié, chinois traditionnel, anglais, espagnol, français, néerlandais) dans le groupe « Langue » des réglages généraux, appliqué à l'instant et sans reconnexion. Affichage et distribution restent séparés — les avis système et les courriels de bienvenue sont générés dans la langue propre de chaque destinataire, indépendamment de la langue d'interface de l'expéditeur.

</details>

![Boîte de réception mobile d'EpoCanvas Mail : mise en page réactive à 375 pixels de large, la barre latérale se replie en tiroir et la liste reste entièrement lisible (interface en chinois simplifié)](/images/mail/ui/ui-inbox-mobile.png)

*Figure : mobile (capture en chinois simplifié). Une même instance s'adapte aux navigateurs de bureau et mobiles ; l'installation est également possible par PWA ou par l'application Android.*

<details>
<summary>Guide visuel : La boîte de réception mobile et ses compromis adaptatifs</summary>

La boîte de réception mobile sur 375 pixels de large : la barre latérale se replie en tiroir et la liste reste entièrement lisible.

- **Barre latérale en tiroir** : En dessous de 1025 pixels de large, la colonne de gauche se replie en tiroir : le bouton hamburger l'ouvre par-dessus un voile, et le choix d'une vue la referme aussitôt pour ne pas gêner la lecture. Bureau et mobile partagent la même structure de barre latérale ; compteurs et étiquettes sont donc identiques dans les deux formes.
- **Bouton de rédaction flottant** : Le pendant mobile du bouton « Rédiger » du bureau : fixé en bas à droite, il reste visible au défilement et ouvre la rédaction en plein écran. Il n'apparaît que pour les comptes disposant du droit d'envoi ; un Visiteur ou un groupe dont l'envoi est désactivé ne le voit jamais et ne peut donc pas accéder à la rédaction.
- **Liste** : La même liste virtualisée que sur le bureau : une boîte bien remplie ne rend que les lignes visibles, si bien que le premier écran ne ralentit pas à mesure que le courrier s'accumule. Les cibles tactiles sont agrandies pour l'accessibilité mobile, mais la densité d'information et la structure des colonnes restent identiques — les captures mobiles servent donc aussi à vérifier les champs.

</details>

## 11. Documents associés

| Ressource | Lien |
| --- | --- |
| Tutoriel d'enregistrement d'apps OAuth et d'intégration des points de terminaison | [Tutoriel d'enregistrement d'apps OAuth et d'intégration des points de terminaison](/fr/mail/api/) |
| Opérateurs de recherche, recherche d'administration et conditions de règles | [Référence de la recherche et des règles](/fr/mail/search/) |
| Routes d'interface et emplacement des sections de paramétrage | [Interface et plan des routes](/fr/mail/interface/) |
| Modes de fonctionnement : formes de déploiement, modes courriel et connexion | [Modes de fonctionnement](/fr/mail/modes/) |
| Guide des paramètres : paramètres personnels et console d'administration | [Guide des paramètres](/fr/mail/settings/) |
| Positionnement et déploiement du projet | [Présentation du projet](/fr/mail/project/) |
| Architecture technique et conception de la sécurité | [Architecture technique](/fr/mail/architecture/) |
| Courriels officiels et vérification anti-falsification | [Anti-falsification et normes officielles](/fr/mail/tamper-proof/) |
| Traitement des données et durées de conservation | [Traitement des données et sécurité](/fr/mail/data-security/) |
| Politique de confidentialité (information et droits relatifs à l'IA) | [Politique de confidentialité](/fr/mail/privacy-policy/) |
