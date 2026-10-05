---
title: Spécifications des courriels officiels et vérification anti-falsification
description: Comment les courriels système officiels d'EpoCanvas Mail sont émis et identifiés — marque officielle, livraison immuable, isolation du rendu côté client et vérification anti-falsification des documents.
---

**Date d'entrée en vigueur : 5 octobre 2026 | Version : 5.15**

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

Les documents juridiques de ce site sont scellés cryptographiquement lors de leur publication, afin que chacun puisse vérifier que ce qu'il lit correspond à la version publiée dans le dépôt open source :

| Voie de vérification | Mécanisme | Description |
| --- | --- | --- |
| Manifeste d'intégrité | `tamper-proof.json` | généré par la chaîne de build à partir du dépôt git ; enregistre pour chaque document le haché SHA-256, la taille en octets et le commit figé |
| Panneau intégré à la page | « Sceau officielle et vérification d'intégrité » au bas de chaque page | affiche le haché officiel et le commit figé du présent document ; cliquer sur « Vérifier cette page » récupère à nouveau le manifeste et le compare au haché intégré dans la page |
| Vérification hors ligne | `sha256sum` / OpenSSL | hacher les sources Markdown du dépôt open source et les comparer au manifeste élément par élément |
| Origine faisant autorité | `docs.epocanvas.com/epomail` | servi en HTTPS ; le contenu lu depuis un autre domaine ou un miroir doit être vérifié à l'aune des hachés du manifeste |

:::tip[Comment vérifier en ligne]
Cliquez sur « Vérifier cette page » au bas de n'importe quelle page de document : le panneau récupère à nouveau le manifeste officiel et le compare au haché intégré dans la page. Vous pouvez aussi exécuter `curl -sSL https://docs.epocanvas.com/epomail/tamper-proof.json` dans un terminal pour obtenir le manifeste, puis `sha256sum` sur les fichiers Markdown du dépôt pour une vérification élément par élément.
:::

## 6. Frontières de responsabilité et canaux de signalement

1. **Instance hébergée** : l'émission des courriels officiels, l'identité de l'expéditeur et les scellés documentaires sont maintenus par l'équipe d'exploitation officielle ;
2. **Instances auto-hébergées** : les auto-hébergeurs configurent leurs propres canaux de distribution et clés, et doivent protéger leur instance comme décrit dans [Traitement des Données et Maintien de la Sécurité](/fr/mail/data-security/) ; les communications officielles d'une instance auto-hébergée relèvent de l'exploitant de cette instance ;
3. **Canaux de signalement** : pour signaler un courriel usurpant l'identité officielle, une anomalie de vérification ou une vulnérabilité de sécurité, contactez :
   - Canal officiel d'envoi et de sécurité : `announcement@epocanvas.com`
   - Canal de confidentialité et de protection des données : `privacy@epocanvas.com`
