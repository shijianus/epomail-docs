---
title: Interface de la boîte et détail des courriels
description: Interface de la boîte d'EpoCanvas Mail — les huit vues, toutes les actions de la page de détail des courriels, la fenêtre de rédaction en surimpression et les fils de conversation, expliqués pas à pas.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

La présente page décrit une à une chaque vue de l'interface principale de la boîte et chaque action de la page de détail des courriels. Les routes de chaque vue et le squelette de l'interface figurent dans [Interface et plan des routes](/fr/mail/interface/) ; la recherche et les règles derrière ce rangement figurent dans la [Référence de la recherche et des règles](/fr/mail/search/).

![Boîte de réception d'EpoCanvas Mail : vue fractionnée à trois colonnes, badges de code de vérification et marques de certification officielles](/images/mail/fr/ui/views-guide.png)

*Figure : la boîte de réception. La liste, le volet de lecture et la barre latérale sont interconnectés, avec des compteurs actualisés en temps réel.*

<details>
<summary>Guide visuel : La boîte de réception en un coup d'œil  —  les quatre entrées les plus utilisées</summary>

Quatre régions annotées de la boîte de réception, correspondant aux quatre entrées les plus utilisées au quotidien : rédiger un nouveau message, revenir aux courriels marqués d'une étoile, consulter les éléments reportés et vérifier ce qui est réellement parti.

1. **Rédiger (bouton principal de la barre latérale)** : L'unique point d'entrée pour créer un courriel : il ouvre la fenêtre de rédaction en surimpression (et non une route indépendante). Sur mobile, il devient un bouton flottant en bas à droite, et le lien profond `?composeTo=<address>` préremplit le destinataire. Rédiger un message ne demande qu'un clic, depuis n'importe quelle vue.
2. **Étoilés (dossier de la barre latérale)** : Tous les courriels marqués d'une étoile s'y rassemblent, quel que soit leur dossier : un clic sur l'étoile d'une ligne de liste les y ajoute. À réserver aux messages à garder à portée de main ou à consulter souvent ; le compteur de la barre latérale se met à jour en temps réel.
3. **Reportés (dossier de la barre latérale)** : La zone d'attente des suivis différés, à deux paliers (urgent et en attente). Dans la vue de détail, choisissez « Reporter » en précisant l'heure ; à l'échéance, le courriel revient automatiquement en haut de la boîte de réception et les sujets importants ne sombrent plus au fond de la pile.
4. **Envoyés (dossier de la barre latérale)** : Conserve la trace de tous les courriels émis par ce compte, où vérifier ce qui est effectivement parti. Le volume sortant est borné par le quota d'envoi quotidien du rôle ; les courriels adressés aux boîtes du site sont livrés en direct, ceux destinés à l'extérieur passent par le canal de livraison.

</details>

## 1. Les huit vues

| Vue | Comportement essentiel |
| --- | --- |
| Boîte de réception | Vue par défaut ; ordre chronologique ascendant/descendant, insertion incrémentale des nouveaux courriels par scrutation, liste virtualisée, points non lus, groupement par conversations |
| Tous les courriels | Agrégation tous dossiers confondus ; cliquer une étiquette de la barre latérale filtre aussitôt selon cette étiquette |
| Envoyés | Courriels envoyés par le compte |
| Brouillons | Enregistrements locaux `draft` et pièces jointes `att` dans IndexedDB ; une déconnexion ordinaire conserve les brouillons, tandis que supprimer une entrée efface les deux dans une même transaction |
| Étoilés | Collection des courriels marqués d'une étoile |
| Reportés | Deux paliers, urgent et en attente ; retour automatique dans la boîte de réception à l'échéance |
| Pourriels | La tâche planifiée se fonde sur la date de création du courriel et le déplace par défaut vers la corbeille après plus de 7 jours ; aucune conservation supplémentaire de 7 jours après son classement comme indésirable n'est garantie |
| Corbeille | Le seuil fixe de 7 jours est également calculé depuis la création ; la suppression peut intervenir lors du même passage que le déplacement depuis les indésirables ; une suppression demandée lorsque le quota est utilisé à plus de 90 % peut aussi entraîner un effacement physique direct |

## 2. Actions de la page de détail des courriels

| Groupe | Actions |
| --- | --- |
| Réponses | Répondre, répondre à tous, transférer ; réponse en ligne et réactions par émoji |
| Organisation | Étoile, lu／non lu, déplacer vers (boîte de réception／pourriels／corbeille), archiver, reporter (heure préréglée ou au choix), étiqueter, signaler comme pourriel／non-pourriel |
| IA | Traduction intégrale avec information sur la destination des données et confirmation à chaque demande ; OCR désactivé par défaut. La reconnaissance automatique des codes est désactivée par défaut et exige un choix individuel et un service configuré |
| Sortie | Imprimer un courriel ou une conversation, reconstruire et télécharger un .eml depuis les champs existants et consulter les en-têtes fournis ; l’export en libre-service exclut le MIME brut complet conservé temporairement pour reprendre les livraisons |
| Gouvernance | Bloquer l'expéditeur, créer un filtre depuis la vue (étiqueter／marquer comme lu／vers les pourriels／vers la corbeille) |

## 3. La fenêtre de rédaction en surimpression

La rédaction est une surimpression (et non une route indépendante) ; points d'entrée : le bouton « Compose » de la barre latérale, le bouton flottant mobile (permission d'envoi requise) et le lien profond `?composeTo=<adresse>` (destinataire prérempli).

- Les destinataires se choisissent parmi les contacts ; livraison directe aux boîtes du site, et acheminement par les canaux configurés par l'opérateur pour l'extérieur du site ;
- Barre d'outils de texte enrichi à 17 outils : paragraphes, taille de police, gras, italique, souligné, barré, couleurs, alignement, listes ordonnées et non ordonnées, citation, séparateur, lien, image, tableau, émoji, traduction et mode code source ;
- La capacité de pièces jointes s'active selon le rôle du compte ; la taille maximale d'une pièce jointe unique suit le réglage de l'instance.

## 4. Conversations et mise en page

Le détail des courriels prend en charge les fils de conversation, la mise en page hiérarchisée et la réponse rapide flottante. Les en-têtes affichés et les .eml téléchargés restent reconstruits à partir des champs, et ne constituent pas un téléchargement du MIME brut complet ; voir [Export et stockage](/fr/mail/data/) pour la copie chiffrée de reprise des livraisons et son échéance de nettoyage. L’implémentation locale de cette révision bloque par défaut les images distantes, les styles chargeant des ressources réseau et le contenu actif. En lecture ordinaire, les images peuvent être autorisées pour le seul message courant après information sur la divulgation possible de l’adresse IP et de son ouverture. L’impression bloque toujours les contenus distants par défaut et la lecture partagée Telegram ne propose pas leur chargement. Les images intégrées sûres et les pièces jointes vérifiées du site se distinguent des ressources de suivi tierces.

Une déconnexion ordinaire efface la session courante, le cache du message ouvert et l’historique des destinataires, mais conserve les sessions des autres comptes et les brouillons locaux. L’effacement de toutes les données locales du site exige une confirmation distincte via [l’action de nettoyage de la page Données](/fr/mail/data/). Ces comportements décrivent le code local, sans confirmer la mise à jour de toutes les instances en ligne. Voir la section 4.3 de la [Politique de confidentialité](/fr/mail/privacy-policy/) pour les limites du stockage et [Anti-falsification et normes officielles](/fr/mail/tamper-proof/) pour les marques des courriels officiels.

<details>
<summary>Guide visuel : les vues de la boîte et le détail des courriels</summary>

![Les vues de la boîte et le détail des courriels](/images/mail/fr/ui/views.png)

1. Après la connexion, vous arrivez par défaut dans la boîte de réception (`/mail/u/0/#inbox`) ; les boutons de la barre supérieure basculent entre l'ordre chronologique ascendant et descendant.
2. Les nouveaux courriels sont insérés en haut de la liste automatiquement par scrutation, et les non lus portent un point rouge ; l'arborescence des dossiers de la barre latérale bascule entre les huit vues.
3. Un clic sur une étiquette de la barre latérale bascule aussitôt la liste vers « Tous les courriels », filtrée selon cette étiquette.
4. Un clic sur n'importe quel courriel ouvre la vue de détail (`#message/<hash>`) ; répondre, étoiler, reporter, étiqueter, traduire et télécharger en .eml se trouvent dans la barre d'actions de la page.

</details>

## 5. Documents connexes

| Ressource | Lien |
| --- | --- |
| Routes des vues et squelette de l'interface | [Interface et plan des routes](/fr/mail/interface/) |
| Opérateurs de recherche et conditions de filtres | [Référence de la recherche et des règles](/fr/mail/search/) |
| Étiquettes et constructeur de règles | [Gestion des étiquettes et du classement](/fr/mail/labels/) |
| Traitement des données de la traduction | [Politique de confidentialité](/fr/mail/privacy-policy/), section 6 |
