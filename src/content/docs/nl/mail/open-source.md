---
title: "Open source en zelfhosting: juridisch kader"
description: De juridische voorwaarden voor open source en zelfhosting van EpoCanvas Mail — de reikwijdte van de MIT-licentie, wat erbuiten valt, de positie van de zelf-uitroller als gegevensbeheerder, constructies met derden en bijdragen.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.13**

Deze pagina zet de reikwijdte van de open-sourcelicentie van EpoCanvas Mail uiteen en de juridische positie van zelfhosting. Zij vormt geen gebruikerscontract voor enige instantie: gebruikers van de gehoste instantie vallen onder de [Servicevoorwaarden](/nl/mail/terms-of-service/) en het [Privacybeleid](/nl/mail/privacy-policy/); gebruikers van een zelf gehoste instantie vallen onder de voorwaarden die diens uitroller publiceert.

![Verantwoordelijkheidsgrenzen van EpoCanvas Mail: het upstream open source-project levert de broncode; de instantie wordt onafhankelijk uitgebaat door diens exploitant, die de verantwoordelijkheid van gegevensbeheerder draagt](/images/mail/nl/self-host-responsibilities.svg)

*Figuur: de verantwoordelijkheidsgrenzen tussen software, exploitant en gebruikers. De upstream auteurs exploiteren geen enkele e-maildienst en staan niet in voor het handelen van enige instantie.*

## 1. De licentie

De broncode van dit project wordt vrijgegeven onder de MIT-licentie. Eenieder kan haar kosteloos verkrijgen en:

1. de software gebruiken, kopiëren, wijzigen, samenvoegen, publiceren, verspreiden, in sublicentie geven en kopieën ervan verkopen;
2. onder voorbehoud dat de oorspronkelijke auteursrechtvermelding en deze licentie in alle kopieën of wezenlijke delen van de software worden opgenomen;
3. de software wordt geleverd «as is», zonder enige garantie, uitdrukkelijk of stilzwijgend, waaronder de garanties van verkoopbaarheid, geschiktheid voor een bepaald doel en niet-schending van rechten;
4. de auteurs of auteursrechtenhouders zijn niet aansprakelijk voor enige vordering, schade of andere aansprakelijkheid die voortvloeit uit de software of het gebruik ervan.

## 2. Buiten de licentie

- De MIT-licentie verleent geen merk- of handelsnaamrechten: de namen EpoCanvas en Epomail, hun logo's en visuele middelen worden door de publicatie van de broncode niet in licentie gegeven;
- Er mag geen verklaring worden gedaan die steun van, of partnerschap met, het upstreamproject suggereert;
- Afgeleide distributies dragen zelf de naleving voor naamgeving en branding en onderhouden hun eigen verklaring van verschillen met de upstreamcode.

## 3. De juridische positie van de zelf-uitroller

- Vanaf het moment van uitrol is de uitroller de gegevensbeheerder voor de gebruikers van diens instantie, en hebben de upstream auteurs geen toegang tot instantiegegevens (de verdeling staat in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/), sectie 2);
- De uitroller is aan diens gebruikers informatieplicht, afhandeling van de rechten van betrokkenen, beveiligingsonderhoud en naleving van internationale doorgifte verschuldigd, krachtens het recht dat op diens vestigingsplaats geldt;
- De juridische documenten van deze site (privacybeleid, servicevoorwaarden, beleid voor acceptabel gebruik, gegevensverwerking, verwerkerslijst) kunnen als malplaatje dienen voor de gebruikers van een uitroller; ze moeten worden herzien naar de werkelijke configuratie van de uitroller, en bij overname gaat de verantwoordelijkheid naar de uitroller over;
- Diensten van derden die de uitroller configureert (Cloudflare, Resend, Backblaze, Turso en anderen) worden gecontracteerd door de uitroller, en diens voorwaarden binden dan de uitroller en diens gebruikers — onafhankelijk van de [lijst van verwerkers](/nl/mail/sub-processors/) van de gehoste instantie.

## 4. Technische drempel en beveiligingsverantwoordelijkheid

De uitroller is verantwoordelijk voor het voltooien van de injectie van geheimen en de initialisatie-bootstrap (de stappen staan in de [Uitrolgids](/nl/mail/deployment/)), en voor het toegangsbeheer van de instantie, het bewaren van de sleutels en de vervolgupdates; upstream gepubliceerde beveiligingsfixes bereiken een uitrol die niet wordt bijgewerkt niet automatisch.

## 5. Bijdragen

- Bugrapporten en voorstellen gaan via de Issues van de GitHub-repository; code via Pull Requests;
- Bijdragers moeten gerechtigd zijn tot wat zij inzenden; eenmaal samengevoegd wordt een bijdrage onder de MIT-licentie met de bron verspreid;
- Beveiligingskwetsbaarheden mogen niet in een openbaar issue worden onthuld — meld ze privé via de contactpunten in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/), sectie 5.

## 6. Verwante documenten

| Bron | Link |
| --- | --- |
| Rondleiding langs de juridische documenten en hun rangorde | [Privacy- en voorwaardenoverzicht](/nl/mail/overview/) |
| Volledige stappen om een eigen instantie uit te rollen | [Uitrolgids](/nl/mail/deployment/) |
| Dienstomvang en ondersteuning van de gehoste instantie | [Dienstomvang en ondersteuning](/nl/mail/service-scope/) |
| Begrippen | [Begrippenlijst](/nl/mail/key-terms/) |
