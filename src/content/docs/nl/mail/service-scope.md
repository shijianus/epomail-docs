---
title: Dienstomvang en ondersteuning
description: Dienstomvang en ondersteuning van EpoCanvas Mail — wat de gehoste instantie biedt, waar die dienst eindigt, de officiële links, de ondersteuningskanalen en de beroeps- en herstelroutes.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.16**

Deze pagina beschrijft wat de gehoste instantie ([mail.epocanvas.com](https://mail.epocanvas.com)) biedt, waar die dienst eindigt, en de ondersteuningskanalen. Zelf gehoste instanties vallen buiten de «dienst» die hier beschreven wordt: de software wordt onder de MIT-licentie verstrekt en het upstreamproject draagt geen enkele verantwoordelijkheid voor de exploitatie van enige instantie — de juridische positie staat in [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/); de verdeling van de rol van gegevensbeheerder tussen de beide vormen staat in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/), sectie 2.

![Juridische architectuur van EpoCanvas Mail: de Servicevoorwaarden en het Privacybeleid rusten op het toepasselijke recht en de veiligheidsverplichtingen](/images/mail/nl/legal-architecture.svg)

*Figuur: de architectuur van de afspraken in deze dienst. Deze pagina beschrijft de dienst zelf; het contract en de normen voor informatieverstrekking worden gedragen door de juridische documenten daarboven.*

## 1. Wat de dienst biedt

| Onderdeel | Beschrijving |
| --- | --- |
| Accounts en registratie | Accounts verkregen via registratiecodes of open registratie, naar gelang de configuratie; zes identiteitsgroepen bepalen quota's en rechten |
| Verzenden en ontvangen | Inkomend via Cloudflare Email Routing, geparseerd bij aankomst; directe aflevering binnen de instantie; naar buiten de instantie via het afleverkanaal van de exploitant |
| Opslag | Opslagquota per identiteitsgroep; persoonlijke objectopslag kan worden gekoppeld zodat bijlagen er rechtstreeks in belanden |
| Organisatie en automatisering | Mailbox met acht weergaven, labels en de classificatieregelengine, geavanceerd zoeken, extractie van verificatiecodes |
| AI-mogelijkheden | Volledige vertaling en tekstherkenning in afbeeldingen (naar gelang de configuratie van de AI-engine en de modelautorisatie van de instantie) |
| Meldingen en doorsturen | Telegram-push en doorsturen via regels (naar gelang de schakelaars voor gebruikersgegevensbeheer van de beheerder) |
| Clients | Web (te installeren als PWA) en de Android-app (epomail) |
| Talen | Zes interfacetalen; systeemmail en welkomstmail afgeleverd in de taal van de ontvanger |

Details op functieniveau staan in de [Functiegids](/nl/mail/features/); een rondleiding langs elke interface en route staat in de [Interface en routekaart](/nl/mail/interface/).

## 2. Grenzen van de dienst

| Onderwerp | Grens |
| --- | --- |
| Beschikbaarheid | Er wordt geen service-level agreement aangeboden; de beschikbaarheid rust op het Cloudflare-platform |
| Bewaring | De prullenbak wordt zeven dagen na ontvangst fysiek gewist; spam blijft zeven dagen in quarantaine en gaat daarna naar de prullenbak |
| Quota's | Verzending, mailboxen en opslag volgen de fabriekswaarden van de identiteitsgroep, instelbaar door de meester op de permissionspagina |
| Kosten | De gehoste instantie biedt momenteel geen betaalfuncties |
| Functiewijziging | Functies ontwikkelen mee met releases; belangrijke wijzigingen worden aangekondigd in de melding binnen de site en per aankondigingsmail |
| Bijlagelimiet | De limiet per bijlage volgt de instelling van de instantie en bindt alleen gebruikers van de gedeelde opslag van de exploitant |

De volledige semantiek van bewaring staat in [Gegevensverwerking en beveiliging](/nl/mail/data-security/); de gedragsgrenzen in het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/).

## 3. Officiële links in de app

De standaarddoelen van de officiële links in de hele app staan hieronder opgesomd; een exploitant van een instantie kan ze in de systeeminstellingen overschrijven:

| Link | Standaarddoel | Waar |
| --- | --- | --- |
| Projectintroductie | De pagina Projectoverzicht van deze site | Voettekst van het accountmenu |
| Privacybeleid／Servicevoorwaarden | De bijbehorende juridische documenten op deze site | Voettekst van het accountmenu |
| Documentatie | Deze site (binnengekomen via taalonderhandeling met de browser) | Systeeminstellingen, kaart «Over» |
| Ondersteuning | De pagina Dienstomvang en ondersteuning van deze site | Systeeminstellingen, kaart «Over» |
| Releases | GitHub Releases | Systeeminstellingen, kaart «Over» |
| Telegram | `t.me/epomail` | Systeeminstellingen, kaart «Over» |

## 4. Ondersteuningskanalen

| Kanaal | Voor |
| --- | --- |
| Contact binnen het product | Bericht binnen de site of `admin@epocanvas.com` |
| Privacy en gegevensbescherming | `privacy@epocanvas.com` (uitoefenen van de rechten van betrokkenen, beroepen inzake gegevensbescherming) |
| GitHub Issues | Bugrapporten en functievoorstellen (`github.com/shijianus/epomail`) |
| Telegram | Gemeenschapschat op `t.me/epomail` |

## 5. Beroep en herstel

- Wachtwoord vergeten: het dialoog «wachtwoord vergeten» op de aanmeldpagina springt naar het beroepsportaal (met het beroeptype, de interfacetaal en het e-mailadres mee); de toegang wordt na verificatie hersteld;
- Beroep tegen blokkades en waarschuwingen: een beroep tegen een afhandelingsbeslissing komt als beroepswaarschuwingsticket in het auditrapport terecht, dat een beheerder arbitreert door vrij te geven of te verwerpen; de handhavingsladder staat in het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/), sectie 6;
- Gegevens in eigen beheer: de volledige JSON-export, archieven van de e-mailgeschiedenis en .eml-downloads van losse berichten zijn op elk moment beschikbaar onder «Instellingen → Gegevens», zie de [Instellingengids](/nl/mail/settings/), sectie 5.

## 6. Ondersteuningsgrens voor zelf gehoste instanties

Het upstream open-sourceproject biedt geen dienst, ondersteuning of beschikbaarheidsverbintenis voor enige uitrol van zijn code; de uitroller draagt de ondersteunings-, informatie- en nalevingsplichten jegens de eigen gebruikers. De documenten op deze site (de juridische set daaronder begrepen) kunnen dienen als basis voor de gebruikersgerichte materialen van een uitroller, en wie ze overneemt wordt ervoor verantwoordelijk.

## 7. Verwante documenten

| Bron | Link |
| --- | --- |
| Het contract en de beperking van aansprakelijkheid voor de dienst | [Servicevoorwaarden](/nl/mail/terms-of-service/) |
| Privacyinformatie en rechten van betrokkenen | [Privacybeleid](/nl/mail/privacy-policy/) |
| De open-sourcelicentie en het recht rond zelfhosting | [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/) |
| Volledige stappen om een eigen instantie uit te rollen | [Uitrolgids](/nl/mail/deployment/) |
