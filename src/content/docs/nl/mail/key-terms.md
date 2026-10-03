---
title: Begrippenlijst
description: Definities van de juridische en technische begrippen die in de juridische documenten van EpoCanvas Mail worden gebruikt — algemene definities uit het gegevensbeschermingsrecht, uitgelegd naar de architectuur van de dienst.
---

**Datum van inwerkingtreding: 4 oktober 2026 | Versie: 5.10**

Deze pagina definieert de begrippen die in de juridische documenten op deze site worden gebruikt. De juridische begrippen volgen de algemene definities uit het gegevensbeschermingsrecht; de technische begrippen worden uitgelegd naar de daadwerkelijke implementatie in de open source-broncode van de Dienst.

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. De juridische en technische documenten op deze site volgen de open-sourceimplementatie van de dienst en beogen transparante, strenge, niet-commerciële normen voor gemeenschapscommunicatie.

![Woordenlijstkaart: juridische termen (verwerkingsverantwoordelijke, verwerker, betrokkene, bepaald doel, enz.) en technische termen (instantie, D1/KV/R2, versleuteling in rust, nul telemetrie, enz.): twee families definities die consistent in alle documenten worden gebruikt, uitgelegd naar algemeen gegevensbeschermingsgebruik en de werkelijke open-source-implementatie](/images/mail/nl/key-terms-glossary.svg)

*Figuur: hoe de twee families definities op deze pagina zich verhouden. Juridische termen volgen het algemene gegevensbeschermingsgebruik; technische termen worden uitgelegd naar de werkelijke open-source-implementatie; niet-genoemde termen worden gelezen in de context van het Privacybeleid en de Servicevoorwaarden.*
## 1. Juridische begrippen

| Begrip | Definitie |
| --- | --- |
| Persoonsgegevens | de naam, geboortedatum, contactgegevens, sociale activiteiten en andere gegevens van een natuurlijke persoon waarmee die persoon direct of indirect kan worden geïdentificeerd. Bij de Dienst gaat het vooral om e-mailadressen, accountreferenties en records van netwerkactiviteit |
| Zeer gevoelige persoonsgegevens | persoonsgegevens over medische dossiers, medische behandeling, genetica, seksueel leven, gezondheidsonderzoeken en strafrechtelijk verleden; de verwerking ervan is in de meeste rechtsgebieden aan strikte beperkingen onderworpen |
| Verzamelen / verwerken / gebruiken | verzamelen is het op enigerlei wijze verkrijgen van persoonsgegevens; verwerken is het opnemen, invoeren, opslaan, bewerken, corrigeren, verveelvoudigen, raadplegen, verwijderen, uitvoeren, koppelen of intern doorsturen van gegevens ten behoeve van het opzetten of gebruiken van een persoonsgegevensbestand; gebruiken is het aanwenden van verzamelde persoonsgegevens voor doeleinden anders dan verwerking |
| Verwerkingsverantwoordelijke | de entiteit die de doeleinden en wijzen van verzameling, verwerking en gebruik van persoonsgegevens bepaalt; zowel de Exploitant van een gehoste instantie als de implementateur van een zelfgehoste instantie |
| Verwerker | een entiteit die persoonsgegevens namens de verwerkingsverantwoordelijke en op diens instructie verwerkt (zoals Cloudflare en Resend) |
| Betrokkene | de natuurlijke persoon die door de persoonsgegevens wordt geïdentificeerd; de «u» waarnaar de documenten op deze site verwijzen |
| Internationale doorgifte | de verwerking of het gebruik van persoonsgegevens over de landsgrenzen heen; volgt de eisen van het toepasselijke recht en waarborgmechanismen zoals standaardcontractbepalingen |
| Informatieverplichting | de verplichting om bij het verzamelen van persoonsgegevens bij de betrokkene uitdrukkelijk de identiteit van de verzamelaar, de doeleinden van de verzameling, de categorieën van gegevens, de termijn, regio, ontvangers en wijze van gebruik, de rechten die de betrokkene kan uitoefenen en de gevolgen van het niet verstrekken van de gegevens mee te delen; worden persoonsgegevens verzameld die niet van de betrokkene zelf afkomstig zijn, dan wordt vóór verwerking of gebruik de bron kenbaar gemaakt |
| Specifiek doel | het specifieke doel dat bij het verzamelen of verwerken van persoonsgegevens moet bestaan; het gebruik geschiedt bovendien binnen het bestek dat voor dat specifieke doel noodzakelijk is |
| Recht zich te verzetten tegen marketing | zodra de betrokkene kenbaar maakt geen marketing te willen ontvangen, wordt het gebruik van diens persoonsgegevens voor marketing onmiddellijk gestaakt; bij de eerste marketing wordt tevens de wijze verstrekt waarop de betrokkene weigering kenbaar kan maken |
| Bevoegd gezag | het orgaan dat krachtens het toepasselijke recht toeziet op de bescherming van persoonsgegevens; voor de gehoste instantie, die in Taiwan is gevestigd, is dat de Commissie voor de Bescherming van Persoonsgegevens |
| Seksuele beelden zonder toestemming | seksuele beelden van een ander die zonder toestemming zijn opgenomen, verveelvoudigd of verspreid, en valse seksuele beelden die door middel van computersynthese of vergelijkbare methoden zijn vervaardigd; het opnemen, verveelvoudigen of verspreiden van dergelijke beelden zonder toestemming vormt in de meeste rechtsgebieden een strafbaar feit, en het platform beperkt de toegang of verwijdert ze vooraf na een melding |
| Seksuele uitbuiting van kinderen en jongeren | seksuele uitbuiting van kinderen of jongeren, waaronder het fotograferen, vervaardigen, verveelvoudigen, in bezit hebben, verspreiden, uitzenden, overdragen, openlijk tentoonstellen, verkopen of tegen betaling laten bekijken van seksuele beelden van kinderen of jongeren |
| Toepasselijk recht | het recht dat op de overeenkomst van toepassing is, bepaald door de vestigingsplaats van de Exploitant; de [Servicevoorwaarden](/nl/mail/terms-of-service/) vermelden in paragraaf 11 het toepasselijk recht van elke instantie |
| Standaardcontract (algemene voorwaarden) | een overeenkomst die door middel van algemene bedingen ten aanzien van een groot aantal onbepaalde personen wordt gesloten; delen die kennelijk onredelijk zijn, verbinden niet onder het toepasselijke recht |

## 2. Technische begrippen

| Begrip | Definitie |
| --- | --- |
| Instance (site) | één EpoCanvas Mail-implementatie binnen het Cloudflare-account van een bepaalde persoon of organisatie, zoals `mail.epocanvas.com` |
| Exploitant | de persoon of het team dat de instantie implementeert en beheert; de «wij» waarnaar de documenten verwijzen |
| PBKDF2 | een algoritme voor het hashen van wachtwoorden. De Dienst voert 100.000 iteraties uit met HMAC-SHA256 en voegt een per gebruiker onafhankelijk willekeurig salt toe, zodat het oorspronkelijke wachtwoord niet uit de hash kan worden afgeleid |
| TOTP | tijdsgebonden eenmalige wachtwoorden volgens RFC 6238; de sleutel wordt in de database versleuteld bewaard met AES-256-GCM |
| Passkey | een publieke-sleutelreferentie volgens de FIDO2/WebAuthn-standaarden; de Dienst bewaart uitsluitend de publieke sleutel, de privésleutel blijft op het apparaat van de betrokkene |
| JWT (sessietoken) | een digitaal ondertekende referentie die na aanmelding wordt uitgegeven en 30 dagen geldig is; maximaal 10 gelijktijdige sessies per account; bij uitloggen onmiddellijk serverzijdig ingetrokken |
| localStorage | een webopslagmechanisme dat browsers aanbieden; gegevens blijven op het apparaat van de betrokkene en overleven sessies. De sessietokens van de Dienst worden hier bewaard; er worden geen cookies gebruikt |
| Versleuteling in rust (encryption at rest) | versleuteling die wordt toegepast wanneer gegevens naar opslagmedia worden geschreven. De sleutels van de Dienst zijn afgeleid uit de omgevingsvariabelen van de instantieserver; het gaat om server-side versleuteling en niet om end-to-end-versleuteling |
| End-to-end-versleuteling (E2EE) | een vorm van versleuteling waarbij uitsluitend verzender en ontvanger kunnen ontsleutelen. De Dienst biedt dit niet; wie dit nodig heeft, versleutelt vooraf zelf met hulpmiddelen zoals GPG |
| HMAC-geobfusceerde routering | een mechanisme dat e-mailidentificatoren met een hash-based message authentication code aan de gebruikersidentiteit koppelt, ter voorkoming van ongeautoriseerde toegang (IDOR) en opsomming van bronnen |
| RBAC | op rollen gebaseerde toegangscontrole. De Dienst hanteert een meerlagig machtigingsmodel dat standaard weigert (fail-closed); parameters die niet op de allowlist staan, worden aan de gateway verwijderd |
| D1 / KV / R2 | de edge-SQLite-database, de wereldwijd gerepliceerde key-value-opslag en de S3-compatibele objectopslag van Cloudflare, respectievelijk voor gestructureerde gegevens, sessiecache en bijlage-blobs |
| Telemetrie | het automatisch terugmelden van gebruiksgegevens aan de ontwikkelaar door software. De broncode van de Dienst bevat geen enkele telemetrie en meldt geen instantiegegevens terug naar het upstream-project |
| Zacht verwijderen / fysiek verwijderen | zacht verwijderen is het markeren als verwijderd, herstelbaar door de beheerder; fysiek verwijderen is het samen met de bijlagen en indexen uit de opslag verwijderen, onherstelbaar |
| BYOS (eigen opslag meebrengen) | mechanisme om bijlagen op te slaan in een S3-compatibele objectopslag van de Exploitant of de betrokken persoon (Backblaze B2, Wasabi, enz.); opslagreferenties worden bewaard door wie de configuratie uitvoert |
| Workers AI | Cloudflare’s inferentiedienst aan de rand; gebruikt voor het extraheren van verificatiecodes en andere AI-verwerking — triggers en gegevensbereik in paragraaf 6 van het [Privacybeleid](/nl/mail/privacy-policy/) |
| Turnstile | Cloudflare’s mensverificatiemechanisme; beoordeelt de betrouwbaarheid van de browser bij registratie en het aanmaken van bussen, zonder advertentiecookies of cross-site tracking |
| SSRF-bescherming | blokkade van server-side request forgery; verzoeken aan externe eindpunten worden altijd gevalideerd tegen openbare adressen, en loopback-, privénetwerk- en cloudmetadata-adressen worden geweigerd |

## 3. Overige

Begrippen die op deze pagina niet zijn gedefinieerd, worden uitgelegd naar de context van het [Privacybeleid](/nl/mail/privacy-policy/) en de [Servicevoorwaarden](/nl/mail/terms-of-service/) en naar gebruikelijk juridisch en technisch taalgebruik. Heeft u twijfels over een definitie, dan kunt u die stellen via de kanalen die in paragraaf 14 van het [Privacybeleid](/nl/mail/privacy-policy/) staan.
