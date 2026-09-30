---
title: Gegevensverwerking en beveiliging
description: Gegevenslevenscyclus van EpoCanvas Mail, verwerkingsmatrix, beveiligingsmaatregelen, incidentrespons en medewerking aan controles.
---

# Gegevensverwerking en beveiliging

**Datum van inwerkingtreding: 30 september 2026 | Versie: 5.2**

Dit document sluit aan bij paragraaf 10 van het [Privacybeleid](/nl/mail/privacy-policy/) en beschrijft de levenscyclus van de persoonsgegevens in de Dienst, de verwerkingsmatrix per gegevenscategorie en de beveiligingsmaatregelen die de Exploitant heeft opgesteld om te voorkomen dat persoonsgegevens worden gestolen, gewijzigd, beschadigd, verloren of gelekt. Dit document dient tevens als basisdocument voor inzage door betrokkenen en voor de controle die de autoriteit overeenkomstig de wet uitvoert.

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend.

## 1. Gegevenslevenscyclus

![Gegevenslevenscyclus van EpoCanvas Mail: verzamelen (registratie en verzenden en ontvangen van e-mail), verwerken (parsen en versleutelen op edge-knooppunten), gebruiken (verlenen van de dienst en beveiligingsbescherming), doorgifte (verwerkers en door de betrokkene geactiveerde functionaliteit), bewaren (D1/KV/R2) en vernietigen (routinematige opschoning na 7 dagen en fysieke verwijdering), waarbij elke fase correspondeert met de vermeldingen en de verwerkingsnormen](/images/mail/data-flow.svg)

*Figuur: de levenscyclus van persoonsgegevens binnen de Dienst. De aard van de verwerking per fase staat in paragraaf 5 van het [Privacybeleid](/nl/mail/privacy-policy/).*

## 2. Verwerkingsmatrix

| Gegevenscategorie | Specifieke items | Doel van de verwerking | Opslagmedium en beveiligingsniveau | Bewaring en vernietiging |
| --- | --- | --- | --- | --- |
| Accountreferenties | e-mailadres, gebruikersnaam, wachtwoordhash en salt, TOTP-sleutel (versleuteld met AES-GCM), hashes van back-upcodes, openbare passkeysleutels | registratie, verificatie, tweestapsverificatie, herstel van referenties | Cloudflare D1; wachtwoorden PBKDF2 (100.000 iteraties, met salt); TOTP versleuteld opgeslagen | bewaard tot beëindiging van het account; bij fysieke verwijdering onmiddellijk gewist |
| Netwerk- en apparaatgegevens | registratie-IP, meest recente inlog-IP, besturingssysteem, browser-User-Agent, apparaattype | beveiligingsaudit, identificatie van afwijkende aanmeldingen, frequentiebeperking | Cloudflare D1; toegang beperkt tot beheerdersaudit | bewaard tot fysieke verwijdering van het account |
| Sessiestatus | JWT-tokens, RBAC-rolidentificatoren, geselecteerde mailbox | autorisatie aan de edge-gateway, routering van verzoeken | Cloudflare KV; maximale geldigheid 30 dagen | ingetrokken bij uitloggen; vervalt vanzelf na 30 dagen zonder activiteit |
| Communicatiegegevens | afzender en ontvanger, CC/BCC, onderwerp, tijdstempels, leesstatus, labels, sterren, berichttekst | aflevering van e-mail, ordening van gesprekken, zoeken | Cloudflare D1 (metadata); afhankelijk van de modus versleuteld opgeslagen met AES-256-GCM | onder controle van de betrokkene; prullenbak na 7 dagen fysiek gewist; bij gebruik boven 90 % wordt reeds als verwijderd gemarkeerde e-mail rechtstreeks fysiek verwijderd |
| Bijlagen | oorspronkelijke bestandsnaam, MIME-type, bestandsgrootte, binaire inhoud | overdracht van bijlagen, inline weergave, veilig downloaden | Cloudflare R2 of S3-compatibele opslag; downloads met defensieve headers | volgen de levenscyclus van de bijbehorende e-mail; bij fysieke verwijdering gezamenlijk gewist |
| Beveiligings- en frequentiebeperkingsrecords | aantallen mislukte aanmeldingen, status van mensverificatie, verzoektellers per schuivend venster | bescherming tegen brute force, preventie van misbruik | Cloudflare KV; tellers per schuivend venster | vervallen automatisch en worden binnen 12 uur na drempeloverschrijding gereset |
| Interfacevoorkeuren | taal (6 talen), lichte en donkere modus, meldingsvlaggen | consistentie van de interface | localStorage van de browser, selectief gesynchroniseerd naar D1 | bewaard tot de cache wordt gewist of handmatig wordt gereset |

## 3. Beveiligingsmaatregelen

De Exploitant stelt de volgende beveiligingsmaatregelen op en verbetert die doorloend; deze dekken de aspecten personeel, processen, techniek en audit:

| Beveiligingsonderwerp | Realisatie in de Dienst |
| --- | --- |
| aanwijzing van beherend personeel en toereikende middelen | de exploitant van de instance wijst beheerders aan en verdeelt de bevoegdheden via meerlagige RBAC-rollen |
| afbakening van het bereik van de persoonsgegevens | de verwerkingsmatrix in paragraaf 2 van dit document begrenst elke gegevenscategorie |
| mechanisme voor risicobeoordeling en -beheer van persoonsgegevens | versleutelingskeuze tussen de drie e-mailmodi, blokkering na mislukte aanmelding, frequentiebeperking en quota's; de open source-broncode staat openlijk ter beoordeling aan de gemeenschap |
| mechanisme voor preventie, melding en afhandeling van incidenten | zie paragraaf 4 van dit document |
| interne beheerprocedures voor verzameling, verwerking en gebruik | de tabel met verwerkingsactiviteiten in paragraaf 5 van het [Privacybeleid](/nl/mail/privacy-policy/) |
| beheer van gegevensbeveiliging en van personeel | routering met cryptografische hashes (tegen ongeautoriseerde toegang), machtigingscontroles volgens het principe van standaard weigeren (fail-closed), verwijdering van parameters die niet op de allowlist staan aan de gateway |
| bewustwording, scholing en opleiding | zelfhostende exploitanten organiseren dit zelf; de documenten op deze site kunnen als lesmateriaal dienen |
| beveiligingsbeheer van apparatuur | de edge-infrastructuur van Cloudflare draagt de fysieke en virtuele beveiliging van de apparatuur (SOC 2 Type II, ISO/IEC 27001); sleutels worden via omgevingsvariabelen geïnjecteerd en komen niet in de codebase |
| auditmechanisme voor gegevensbeveiliging | beveiligingslogs (inlog-IP, apparaat, mislukte pogingen) worden bewaard met toegang beperkt tot audit; sessies kunnen onmiddellijk worden ingetrokken |
| bewaring van gebruikslogs, sporgegevens en bewijsmateriaal | aanmeld- en beveiligingslogs worden bewaard tot fysieke verwijdering van het account; bewijs van misbruikincidenten wordt bewaard overeenkomstig het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
| doorlopende verbetering van het beveiligingsonderhoud in zijn geheel | het open source-project ontwikkelt zich doorlopend; wezenlijke beveiligingsfixes verschijnen met releases en worden aangekondigd |

Kern van de technische maatregelen: HTTPS/TLS voor de gehele site; HTML-e-mail wordt na opschoning met DOMPurify in een geïsoleerde Shadow DOM weergegeven (blokkering van scripts, inline event handlers en externe imports); downloads van bijlagen forceren `Content-Disposition: attachment` en `X-Content-Type-Options: nosniff`; SSRF-bescherming voor webhook- en externe opslageindpunten (blokkade van privénetwerkbereiken en cloud-metadata-adressen); e-mail-ID's worden met HMAC-geobfusceerde routering afgehandeld om ongeautoriseerde opsomming te voorkomen.

:::caution[Reikwijdte en grenzen van de versleuteling]
De versleuteling van de drie e-mailmodi van de Dienst («alles», «privé» en «versleuteld») is server-side versleuteling in rust: de sleutels worden afgeleid uit de omgevingsvariabelen van de instanceserver en de gebruikersidentificatie. Dit mechanisme beschermt tegen het risico dat databasebestanden worden gestolen of snapshots lekken; het is geen end-to-end-versleuteling. De Exploitant die de server en de sleutels beheert, heeft technisch de mogelijkheid tot ontsleuteling. Wie een vertrouwelijkheidsniveau nodig heeft waarbij ook de Exploitant niets kan lezen, versleutelt de berichttekst vooraf zelf met een end-to-end-versleutelingshulpmiddel zoals GPG, alvorens die te verzenden.
:::

## 4. Incidentrespons en melding

Wanneer de Exploitant bekend wordt met het feit dat persoonsgegevens worden gestolen, gewijzigd, beschadigd, verloren of gelekt, neemt hij de volgende maatregelen:

1. onmiddellijke blokkade van de bron van de inbreuk (intrekken van sessies, blokkeren van de bron, rouleren van sleutels);
2. beoordeling van de omvang van de gevolgen en bewaren van records (sporgegevens en bewijsbewaring);
3. in kennis stellen van de getroffen betrokkenen en rapporteren aan de autoriteit overeenkomstig het toepasselijke recht en de voorschriften van de autoriteit; de kennisgeving omvat de feiten van de inbreuk, de mogelijke schade, de reeds genomen afhandelingsmaatregelen en de zelfbeschermingsmaatregelen die de betrokkene kan nemen;
4. evaluatie van de oorzaak van het incident en versterking van de bijbehorende beveiligingsmaatregelen (doorlopende verbetering in zijn geheel).

## 5. Medewerking aan controles

Het open source-project exploiteert zelf geen enkele instance; de controle en het toezicht op elke instance worden door de Exploitant ervan aanvaard krachtens het toepasselijke recht op zijn vestigingsplaats. De gehoste instance `mail.epocanvas.com` wordt vanuit Taiwan uitgebaat; de Exploitant aanvaardt de controle en de audit die de Taiwanese autoriteit overeenkomstig de wet uitvoert. Dit document en het [Privacybeleid](/nl/mail/privacy-policy/) dienen als basisdocumenten voor die controle, en de Exploitant werkt de beschikkingen die de autoriteit overeenkomstig de wet neemt, na.

Exploitanten van zelfgehoste instances vervullen zelfstandig alle verplichtingen die in deze paragraaf staan voor hun eigen instance en staan zelf de audit door het bevoegd gezag op hun locatie uit; dit document kan als sjabloon dienen voor het opstellen van hun beveiligingsplan.
