---
title: Gegevensverwerking en beveiliging
description: Gegevenslevenscyclus van EpoCanvas Mail, verwerkingsmatrix, beveiligingsmaatregelen opgesteld overeenkomstig artikel 20-1 van de PDPA en artikel 12 van de Uitvoeringsregeling, incidentrespons en medewerking aan controles.
---

# Gegevensverwerking en beveiliging

**Datum van inwerkingtreding: 29 september 2026 | Versie: 4.1**

Dit document sluit aan bij paragraaf 10 van het [Privacybeleid](/nl/mail/privacy-policy/) en beschrijft de levenscyclus van de persoonsgegevens in de Dienst, de verwerkingsmatrix per gegevenscategorie en de beveiligingsmaatregelen die de Exploitant heeft opgesteld overeenkomstig artikel 20-1 van de Taiwaneese Persoonsgegevenswet (個人資料保護法, "PDPA") (een niet-overheidsorgaan dat persoonsgegevensbestanden bijhoudt, dient beveiligingsmaatregelen te treffen om te voorkomen dat persoonsgegevens worden gestolen, gewijzigd, beschadigd, verloren of gelekt) en artikel 12 van de Uitvoeringsregeling (個人資料保護法施行細則). Dit document dient tevens als basisdocument voor de controle door het bevoegd gezag overeenkomstig artikel 22 van de PDPA en voor inzage door betrokkenen.

## 1. Gegevenslevenscyclus

![Gegevenslevenscyclus van EpoCanvas Mail: verzamelen (registratie en verzenden en ontvangen van e-mail), verwerken (parsen en versleutelen op edge-knooppunten), gebruiken (verlenen van de dienst en beveiligingsbescherming), doorgifte (verwerkers en door de betrokkene geactiveerde functionaliteit), bewaren (D1/KV/R2) en vernietigen (routinematige opschoning na 7 dagen en fysieke verwijdering), met elke fase verankerd in artikel 19, artikel 20 en artikel 21 van de PDPA](/images/mail/data-flow.svg)

*Figuur: de levenscyclus van persoonsgegevens binnen de Dienst. De wettelijke grondslag per fase staat in paragraaf 5 van het [Privacybeleid](/nl/mail/privacy-policy/).*

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

## 3. Beveiligingsmaatregelen (afgezet tegen artikel 12 van de Uitvoeringsregeling)

Artikel 12 van de Uitvoeringsregeling (個人資料保護法施行細則) somt de punten op die «passende beveiligingsmaatregelen» kunnen omvatten. De Exploitant stelt op grond van dat artikel de volgende maatregelen op; alle elf punten zijn gedekt:

| Punt uit artikel 12 van de Uitvoeringsregeling | Realisatie in de Dienst |
| --- | --- |
| 1. aanwijzing van beherend personeel en toereikende middelen | de exploitant van de instance wijst beheerders aan en verdeelt de bevoegdheden via meerlagige RBAC-rollen |
| 2. afbakening van het bereik van de persoonsgegevens | de verwerkingsmatrix in paragraaf 2 van dit document begrenst elke gegevenscategorie |
| 3. mechanisme voor risicobeoordeling en -beheer van persoonsgegevens | versleutelingskeuze tussen de drie e-mailmodi, blokkering na mislukte aanmelding, frequentiebeperking en quota's; de open source-broncode staat openlijk ter beoordeling aan de gemeenschap |
| 4. mechanisme voor preventie, melding en afhandeling van incidenten | zie paragraaf 4 van dit document |
| 5. interne beheerprocedures voor verzameling, verwerking en gebruik | de tabel met verwerkingsactiviteiten en grondslagen in paragraaf 5 van het [Privacybeleid](/nl/mail/privacy-policy/) |
| 6. beheer van gegevensbeveiliging en van personeel | routering met cryptografische hashes (tegen ongeautoriseerde toegang), machtigingscontroles volgens het principe van standaard weigeren (fail-closed), verwijdering van parameters die niet op de allowlist staan aan de gateway |
| 7. bewustwording, scholing en opleiding | zelfhostende exploitanten organiseren dit zelf; de documenten op deze site kunnen als lesmateriaal dienen |
| 8. beveiligingsbeheer van apparatuur | de edge-infrastructuur van Cloudflare draagt de fysieke en virtuele beveiliging van de apparatuur (SOC 2 Type II, ISO/IEC 27001); sleutels worden via omgevingsvariabelen geïnjecteerd en komen niet in de codebase |
| 9. auditmechanisme voor gegevensbeveiliging | beveiligingslogs (inlog-IP, apparaat, mislukte pogingen) worden bewaard met toegang beperkt tot audit; sessies kunnen onmiddellijk worden ingetrokken |
| 10. bewaring van gebruikslogs, sporgegevens en bewijsmateriaal | aanmeld- en beveiligingslogs worden bewaard tot fysieke verwijdering van het account; bewijs van misbruikincidenten wordt bewaard overeenkomstig het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
| 11. doorlopende verbetering van het beveiligingsonderhoud in zijn geheel | het open source-project ontwikkelt zich doorlopend; wezenlijke beveiligingsfixes verschijnen met releases en worden aangekondigd |

Kern van de technische maatregelen: HTTPS/TLS voor de gehele site; HTML-e-mail wordt na opschoning met DOMPurify in een geïsoleerde Shadow DOM weergegeven (blokkering van scripts, inline event handlers en externe imports); downloads van bijlagen forceren `Content-Disposition: attachment` en `X-Content-Type-Options: nosniff`; SSRF-bescherming voor webhook- en externe opslageindpunten (blokkade van privénetwerkbereiken en cloud-metadata-adressen); e-mail-ID's worden met HMAC-geobfusceerde routering afgehandeld om ongeautoriseerde opsomming te voorkomen.

:::caution[Reikwijdte en grenzen van de versleuteling]
De versleuteling van de drie e-mailmodi van de Dienst («alles», «privé» en «versleuteld») is server-side versleuteling in rust: de sleutels worden afgeleid uit de omgevingsvariabelen van de instanceserver en de gebruikersidentificatie. Dit mechanisme beschermt tegen het risico dat databasebestanden worden gestolen of snapshots lekken; het is geen end-to-end-versleuteling. De Exploitant die de server en de sleutels beheert, heeft technisch de mogelijkheid tot ontsleuteling. Wie een vertrouwelijkheidsniveau nodig heeft waarbij ook de Exploitant niets kan lezen, versleutelt de berichttekst vooraf zelf met een end-to-end-versleutelingshulpmiddel zoals GPG, alvorens die te verzenden.
:::

## 4. Incidentrespons en melding

Wanneer de Exploitant bekend wordt met het feit dat persoonsgegevens worden gestolen, gewijzigd, beschadigd, verloren of gelekt, neemt hij de volgende maatregelen:

1. onmiddellijke blokkade van de bron van de inbreuk (intrekken van sessies, blokkeren van de bron, rouleren van sleutels);
2. beoordeling van de omvang van de gevolgen en bewaren van records (sporgegevens en bewijsbewaring overeenkomstig artikel 12, onderdeel 10, van de Uitvoeringsregeling);
3. in kennis stellen van de getroffen betrokkenen en rapporteren aan het bevoegd gezag overeenkomstig de beveiligingsregeling die op grond van artikel 20-1, tweede lid, van de PDPA is vastgesteld, en de voorschriften van het bevoegd gezag; de kennisgeving omvat de feiten van de inbreuk, de mogelijke schade, de reeds genomen afhandelingsmaatregelen en de zelfbeschermingsmaatregelen die de betrokkene kan nemen;
4. evaluatie van de oorzaak van het incident en versterking van de bijbehorende beveiligingsmaatregelen (doorlopende verbetering overeenkomstig artikel 12, onderdeel 11, van de Uitvoeringsregeling).

## 5. Medewerking aan controles

Overeenkomstig artikel 1-1 van de PDPA is het bevoegd gezag voor deze wet de Commissie voor de Bescherming van Persoonsgegevens (PDPC). Overeenkomstig artikel 22 van dezelfde wet kan het bevoegd gezag, wanneer het vermoedt dat een niet-overheidsorgaan de wet schendt, of wanneer het dat noodzakelijk acht om de naleving van de wet te toetsen, het orgaan oproepen om zijn standpunt toe te lichten, het vragen om de noodzakelijke documenten, gegevens en voorwerpen, of zelf of samen met het centrale bevoegde orgaan voor de betreffende bedrijfstak en de regeringen van speciale gemeenten en county's personen met een bewijs van hun ambtsuitoefening sturen om ter plaatse een controle uit te voeren. De Exploitant van de Dienst accepteert de controle en audit door het bevoegd gezag en kan zich daar zonder geldige reden niet aan onttrekken, die bemoeilijken of weigeren; dit document en het [Privacybeleid](/nl/mail/privacy-policy/) dienen als basisdocumenten voor die controle.

Overeenkomstig artikel 25 van de PDPA kan het bevoegd gezag bij schendingen, naast het opleggen van bestuurlijke boetes, onder meer de verzameling, verwerking of het gebruik verbieden, de verwijdering van persoonsgegevensbestanden bevelen, onrechtmatig verzamelde persoonsgegevens confisqueren of de vernietiging ervan bevelen, en de schending publiceren; de Exploitant werkt aan de uitvoering van dergelijke beschikkingen mee.

Exploitanten van zelfgehoste instances vervullen zelfstandig alle verplichtingen die in deze paragraaf staan voor hun eigen instance en staan zelf de audit door het bevoegd gezag op hun locatie uit; dit document kan als sjabloon dienen voor het opstellen van hun beveiligingsplan.
