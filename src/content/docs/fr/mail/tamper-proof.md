---
title: Spécifications des courriels officiels et vérification anti-falsification
description: Comment les courriels système officiels d'EpoCanvas Mail sont émis et identifiés — marque officielle, livraison immuable, isolation du rendu côté client et vérification anti-falsification des documents.
---

**Date de mise à jour : 2 novembre 2026 | Version : 5.25**

Le présent document explique comment les courriels système officiels sont émis et comment les identifier, et décrit le mécanisme de vérification anti-falsification des documents juridiques de ce site, afin que vous puissiez confirmer l'authenticité des communications et des documents officiels. Il est établi en vertu de la [Vue d'ensemble Confidentialité et conditions](/fr/mail/overview/) et du document [Traitement des Données et Maintien de la Sécurité](/fr/mail/data-security/).

Les versions en chinois traditionnel (Taïwan) des documents juridiques du présent site constituent les versions faisant autorité ; les traductions dans les autres langues sont fournies à titre de référence uniquement et, en cas de divergence, la version en chinois traditionnel prévaut. Les documents juridiques et techniques de ce site suivent l'implémentation open source du service et visent à établir des normes de communication communautaires transparentes, rigoureuses et non commerciales.

![Architecture en trois couches des courriels officiels d'EpoCanvas Mail : la couche d'émission verrouille l'adresse officielle d'expédition et injecte la marque officielle ; la couche de livraison fige un instantané immuable avec repli de traduction prédéfinie ; la couche client isole le rendu avec Shadow DOM et assainissement du contenu](/images/mail/fr/anti-tamper-architecture.svg)

*Figure : les trois couches du traitement des courriels officiels. La couche d'émission verrouille l'adresse officielle d'expédition et injecte la marque officielle ; la couche de livraison fige un instantané immuable avec repli de traduction prédéfinie ; la couche client isole le rendu et prend en charge la vérification documentaire.*

## 1. Identité officielle de l'expéditeur et marque officielle

Les communications système officielles se distinguent du courrier ordinaire des utilisateurs comme suit :

1. **Une adresse d'expédition officielle unique** : les courriels de bienvenue et les annonces globales sont émis par le système depuis `announcement@epocanvas.com`. Cette adresse est intégrée au programme ; les courriels officiels ne sont générés que par le canal privilégié du système ;
2. **La marque officielle (isOfficial)** : les courriels dont l'expéditeur est `announcement@epocanvas.com` ou `admin@epocanvas.com`, ou qui portent l'étiquette « officiel », reçoivent la marque du système ; le volet de lecture affiche un badge et une bannière officiels afin de les distinguer du courrier ordinaire ;
3. **Cycle de vie** : les courriels de bienvenue et les annonces globales expirent après un nombre de jours configurable (7 par défaut) à compter de la livraison, puis sont nettoyés par une tâche planifiée.

## 2. Catalogue des courriels officiels

Les courriels système officiels du service se limitent aux types suivants, tous générés à partir de modèles intégrés :

| Type | Déclencheur | Description |
| --- | --- | --- |
| Courriel de bienvenue | création d'une nouvelle boîte | modèle officiel en six langues intégré ; expire après le nombre de jours configuré (7 par défaut) |
| Annonce globale | publication d'une annonce système par un administrateur | modèle officiel en six langues intégré ; durée de vie identique au courriel de bienvenue |

Au-delà de ce tableau, le système n'envoie jamais, depuis aucune adresse, de courriels du type « compte anormal », « vous avez gagné » ou « vérification expirée ». Si vous recevez un courriel se réclamant du caractère officiel depuis une autre adresse, signalez-le par le canal de la section 6.

## 3. Livraison immuable et traduction prédéfinie

1. **Livraison par instantané immuable** : les variables des courriels officiels sont substituées et leur contenu figé en un instantané au moment de l'envoi ; il n'est pas régénéré lorsque le destinataire change ensuite la langue de l'interface, ce qui préserve le caractère objectivement unique des communications officielles ;
2. **Repli de traduction prédéfinie** : lorsque vous utilisez « Traduire » sur un courriel officiel non modifié, le modèle officiel prédéfini dans votre langue est rendu localement et aucun contenu n'est transmis à un service d'IA ; seuls les courriels dont le corps a été modifié par un administrateur passent par la traduction IA intégrale (voir la section 6 de la [Politique de confidentialité](/fr/mail/privacy-policy/)).

## 4. Isolation du rendu côté client

Le contenu des courriels (officiels comme entrants) est rendu dans le navigateur sous les mesures d'isolation suivantes :

1. **Isolation Shadow DOM** : le corps est rendu dans son propre Shadow DOM ; les styles et scripts globaux de la page ne peuvent affecter le contenu du courriel, et les styles du courriel ne peuvent s'étendre à la page ;
2. **Assainissement par liste blanche** : le corps est assaini par DOMPurify ; les balises `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>` et `<style>` ainsi que les gestionnaires d'événements en ligne sont supprimés, ce qui bloque l'injection de scripts et l'usurpation d'interface.

## 5. Vérification anti-falsification des documents

Ce site propose une comparaison SHA-256 entre les fichiers sources Markdown et un manifeste d’intégrité. Le manifeste et la page proviennent du même site et ne constituent pas une signature numérique indépendante ; tous deux pourraient être modifiés ensemble. Une empreinte identique signifie seulement que le fichier choisi correspond au manifeste chargé. Elle ne prouve ni le contenu de la page web, ni l’identité de l’éditeur, ni l’authenticité du document, ni la conformité juridique.

| Voie de vérification | Mécanisme | Description |
| --- | --- | --- |
| Manifeste d’intégrité des fichiers | `tamper-proof.json` | Lit les fichiers de l’arbre de travail documentaire lors de la génération et enregistre SHA-256, le nombre d’octets, l’heure de génération, une référence Git HEAD et l’état local des documents |
| Panneau de cette page | « Comparaison de l’intégrité du fichier source », uniquement sur cette page de spécification | Calcule le SHA-256 d’un fichier source local choisi et le compare au manifeste chargé ; aucun fichier n’est envoyé et la page web rendue n’est pas hachée |
| Comparaison en ligne de commande | Commande Node.js du panneau | Convertit seulement CRLF en LF avant le calcul SHA-256 en UTF-8 ; exécuter `sha256sum` ou OpenSSL directement sur les octets CRLF utilise une entrée différente |
| Source du manifeste | `docs.epocanvas.com/epomail/tamper-proof.json` | HTTPS protège la connexion ; un manifeste du même site n’est pas en soi une signature ou une certification de publication vérifiée par un canal de confiance indépendant |

Le manifeste utilise les fichiers de l’arbre de travail lors de sa génération, sans lire automatiquement les fichiers validés dans HEAD. Si les documents comprennent des contenus non validés ou non suivis, leurs empreintes ne peuvent pas être attribuées à la version validée de HEAD ; un état non enregistré ne permet pas non plus de conclure à une correspondance. La date de HEAD est celle d’un commit du dépôt, pas la date de publication de cette page.

:::tip[Comparer un fichier]
Dans le panneau « Comparaison de l’intégrité du fichier source » de cette page, choisissez le fichier Markdown local au chemin indiqué, puis cliquez sur « Calculer et comparer le fichier ». Les comparaisons en ligne de commande doivent appliquer la même normalisation des fins de ligne. Une différence peut résulter de la version, du contenu ou du manifeste. Un manifeste indisponible ou un échec de lecture ou de calcul ne constitue pas une comparaison réussie.
:::

## 6. Frontières de responsabilité et canaux de signalement

1. **Instance hébergée** : l'émission des courriels officiels, l'identité de l'expéditeur et les scellés documentaires sont maintenus par l'équipe d'exploitation officielle ;
2. **Instances auto-hébergées** : les auto-hébergeurs configurent leurs propres canaux de distribution et clés, et doivent protéger leur instance comme décrit dans [Traitement des Données et Maintien de la Sécurité](/fr/mail/data-security/) ; les communications officielles d'une instance auto-hébergée relèvent de l'exploitant de cette instance ;
3. **Canaux de signalement** : pour signaler un courriel usurpant l'identité officielle, une anomalie de vérification ou une vulnérabilité de sécurité, contactez :
   - Canal officiel d'envoi et de sécurité : `announcement@epocanvas.com`
   - Canal de confidentialité et de protection des données : `privacy@epocanvas.com`
