---
title: Overzicht van privacy en voorwaarden
description: Overzicht van de juridische documenten van EpoCanvas Mail — identiteit van het platform, rollen bij gegevensverwerking, documentstructuur, rangorde en contactpunten.
---

**Datum van inwerkingtreding: 3 oktober 2026 | Versie: 5.8**

Deze pagina is de gids van alle juridische documenten van de dienst EpoCanvas Mail (hierna «de Dienst») en beschrijft de rollen van de partijen, de documentstructuur en de volgorde van toepassing. Voordat u zich registreert voor de Dienst of deze gebruikt, dient u deze pagina te lezen, samen met het [Privacybeleid](/nl/mail/privacy-policy/) en de [Servicevoorwaarden](/nl/mail/terms-of-service/).

![Juridische documentarchitectuur van EpoCanvas Mail: de Servicevoorwaarden als contractlaag, het Privacybeleid en het Beleid voor acceptabel gebruik als beleidslaag, Gegevensverwerking en beveiliging, de Lijst van verwerkers en de Begrippenlijst als ondersteunende documenten; alles rustend op de basis van het toepasselijke recht en de veiligheidsverplichtingen](/images/mail/nl/legal-architecture.svg)

*Figuur: de architectuur van de juridische documenten op deze site. De Servicevoorwaarden stellen de contractuele voorwaarden vast; het Privacybeleid bevat de informatieverplichtingen en verwerkingsnormen voor persoonsgegevens; het Beleid voor acceptabel gebruik stelt de grenzen van gedrag vast; Gegevensverwerking en beveiliging, de Lijst van verwerkers en de Begrippenlijst zijn ondersteunende documenten. Het toepasselijke recht van elke instantie wordt bepaald door de vestigingsplaats van de Exploitant.*

## 1. Platformidentiteit

EpoCanvas Mail is een open source-e-maildienst gebouwd op de edge-computingarchitectuur van Cloudflare (Workers, D1, KV, R2); de broncode wordt uitgegeven onder de MIT-licentie. De Dienst kan in de volgende twee vormen worden aangeboden:

1. **Gehoste instantie**: een openbare site (`mail.epocanvas.com`) die door het exploitatieteam wordt uitgebaat, met een bijbehorende mobiele app (epomail);
2. **Zelfgehoste instantie**: een privésite die door een ieder, zij het een persoon, team of organisatie, op basis van de open source-broncode wordt geïmplementeerd onder het eigen domein en binnen het eigen Cloudflare-account.

## 2. Bepaling van de rollen bij gegevensverwerking

De juridische documenten van de Dienst hanteren de rolverdeling tussen «verwerkingsverantwoordelijke» en «verwerker»; die komt overeen met de algemene indeling die in rechtstelsels zoals de Algemene verordening gegevensbescherming (AVG) van de Europese Unie bestaat. Het toepasselijke recht van elke instantie wordt bepaald door de vestigingsplaats van de Exploitant.

![Verantwoordelijkheidsgrenzen van EpoCanvas Mail: het upstream open source-project (MIT-licentie) levert de broncode; de instantie die u gebruikt wordt onafhankelijk uitgebaat door de Exploitant, die de verantwoordelijkheid van verwerkingsverantwoordelijke draagt; uw account en uw e-mailgegevens worden bewaard in de Cloudflare-resources van die instantie](/images/mail/nl/self-host-responsibilities.svg)

*Figuur: de verantwoordelijkheidsgrenzen tussen software, Exploitant en gebruikers. De upstream open source-auteurs exploiteren geen enkele e-maildienst en zijn niet aansprakelijk voor het handelen van enige instantie.*

| Situatie | Verwerkingsverantwoordelijke | Verwerker |
| --- | --- | --- |
| Gehoste instantie | Het exploitatieteam (wat betreft accountgegevens en beveiligingsauditrecords); wat betreft de e-mailinhoud die gebruikers uitwisselen, verwerkt de Exploitant die binnen het bestek dat nodig is voor het verlenen van de communicatiedienst | Verwerkers zoals Cloudflare en Resend |
| Zelfgehoste instantie | De persoon of organisatie die de instantie implementeert (de enige en exclusieve verwerkingsverantwoordelijke) | De infrastructuurdienstenaanbieders die die implementateur configureert |

De open source-broncode zelf verzamelt, uploadt en retourneert geen enkele telemetrie; afgezien van externe diensten die door de Exploitant van de instantie zelf worden geconfigureerd, komen de upstream-auteurs niet in aanraking met de operationele gegevens van enige instantie. Het open source-project verleent zelf geen dienst en draagt evenmin enige nalevingsverplichting van instanties: vanaf het moment van implementatie wordt de implementateur de verwerkingsverantwoordelijke van zijn gebruikers en dient hij de verplichtingen inzake informatieplicht, beveiligingsonderhoud en toezicht na te komen krachtens het toepasselijke recht op zijn vestigingsplaats; de documenten op deze site kunnen daarbij als basismodel voor zijn informatieverstrekking en voorwaarden dienen.

## 3. Documentstructuur

De juridische documenten op deze site zijn per thema ingedeeld; de documenten verwijzen naar elkaar en vormen samen het volledige geheel van afspraken:

| Document | Inhoud |
| --- | --- |
| [Privacybeleid](/nl/mail/privacy-policy/) | Het verzamelen, verwerken en gebruiken van persoonsgegevens; de verwerkingsnormen; de rechten van de betrokkene; internationale doorgifte |
| [Servicevoorwaarden](/nl/mail/terms-of-service/) | De contractuele voorwaarden voor het gebruik van de Dienst; rechten en verplichtingen; beperking van aansprakelijkheid; toepasselijk recht en bevoegde rechter |
| [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) | De grenzen van gebruikersgedrag; de lijst van verboden gedragingen en de maatregelen van de Exploitant; handhavingsprocedures |
| [Gegevensverwerking en beveiliging](/nl/mail/data-security/) | De gegevenslevenscyclus; de verwerkingsmatrix; de beveiligingsmaatregelen; incidentrespons; medewerking aan controles |
| [Lijst van verwerkers](/nl/mail/sub-processors/) | Verwerkers, ontvangers van gegevens, betrokken gegevens en waarborgmechanismen voor internationale doorgifte |
| [Begrippenlijst](/nl/mail/key-terms/) | De definities van de technische en juridische termen die in de juridische documenten op deze site worden gebruikt |
| [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/) | Officiële e-mailnormen, 16 beveiligingsmeldingen, afzenderbescherming en integriteitsverificatie |

## 4. Rangorde

1. Voor privacykwesties vormt het [Privacybeleid](/nl/mail/privacy-policy/) de bijzondere regeling; voor de voorwaarden voor het gebruik van de Dienst vormen de [Servicevoorwaarden](/nl/mail/terms-of-service/) de bijzondere regeling; overige kwesties worden uitgelegd naar de structuur die op deze pagina staat.
2. Bij tegenstrijdigheden tussen de documenten gaat het document dat rechtstreeks betrekking heeft op het betreffende onderwerp voor.
3. De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. Het toepasselijke recht van elke instantie wordt bepaald door de vestigingsplaats van de Exploitant (zie paragraaf 2).

## 5. Contactpunten

- **Privacykwesties en klachten over gegevensbescherming**: `privacy@epocanvas.com`
- **Contact binnen het product**: intern bericht of `admin@epocanvas.com`
- **Open source-project**: Issues in de GitHub-repository (`github.com/shijianus/epomail`)
- **Zelfgehoste sites**: neem contact op met de Exploitant via de door die site gepubliceerde contactgegevens
