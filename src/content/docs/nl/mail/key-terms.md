---
title: Begrippenlijst
description: Definities van de juridische en technische begrippen die in de juridische documenten van EpoCanvas Mail worden gebruikt — uitgelegd naar de PDPA en de architectuur van de dienst.
---

# Begrippenlijst

**Datum van inwerkingtreding: 29 september 2026 | Versie: 4.1**

Deze pagina definieert de begrippen die in de juridische documenten op deze site worden gebruikt. De juridische begrippen volgen de definities in de thans geldende bepalingen van de Taiwaneese Persoonsgegevenswet (個人資料保護法, "PDPA") en de daarop betrekking hebbende wetgeving; de technische begrippen worden uitgelegd naar de daadwerkelijke implementatie in de open source-broncode van de Dienst.

## 1. Juridische begrippen

| Begrip | Definitie |
| --- | --- |
| Persoonsgegevens | overeenkomstig artikel 2 van de PDPA: de naam, geboortedatum, contactgegevens, sociale activiteiten en andere gegevens van een natuurlijke persoon waarmee die persoon direct of indirect kan worden geïdentificeerd. Bij de Dienst gaat het vooral om e-mailadressen, accountreferenties en records van netwerkactiviteit |
| Speciale persoonsgegevens | de in artikel 6 van dezelfde wet opgesomde persoonsgegevens over medische dossiers, medische behandeling, genetica, seksueel leven, gezondheidsonderzoeken en strafrechtelijk verleden; behoudens de wettelijke uitzonderingen mogen die niet worden verzameld, verwerkt of gebruikt |
| Verzamelen / verwerken / gebruiken | artikel 2 van dezelfde wet: verzamelen is het op enigerlei wijze verkrijgen van persoonsgegevens; verwerken is het opnemen, invoeren, opslaan, bewerken, corrigeren, verveelvoudigen, raadplegen, verwijderen, uitvoeren, koppelen of intern doorsturen van gegevens ten behoeve van het opzetten of gebruiken van een persoonsgegevensbestand; gebruiken is het aanwenden van verzamelde persoonsgegevens voor doeleinden anders dan verwerking |
| Verwerkingsverantwoordelijke | de entiteit die de doeleinden en wijzen van verzameling, verwerking en gebruik van persoonsgegevens bepaalt; zowel de Exploitant van een gehoste instance als de implementateur van een zelfgehoste instance |
| Verwerker | een entiteit die persoonsgegevens namens de verwerkingsverantwoordelijke en op diens instructie verwerkt (zoals Cloudflare en Resend) |
| Betrokkene | de natuurlijke persoon die door de persoonsgegevens wordt geïdentificeerd; de «u» waarnaar de documenten op deze site verwijzen |
| Internationale doorgifte | overeenkomstig artikel 2 van dezelfde wet: de verwerking of het gebruik van persoonsgegevens over de landsgrenzen heen; gereguleerd door artikel 21 van de PDPA en door beperkende bevelen van het bevoegd gezag |
| Informatieverplichting | overeenkomstig artikel 8 van dezelfde wet dient de verzamelaar bij het verzamelen van persoonsgegevens bij de betrokkene uitdrukkelijk zes punten mee te delen: de identiteit van de verzamelaar, de doeleinden van de verzameling, de categorieën van gegevens, de termijn, regio, ontvangers en wijze van gebruik, de rechten die de betrokkene kan uitoefenen en de gevolgen van het niet verstrekken van de gegevens; worden persoonsgegevens verzameld die niet van de betrokkene zelf afkomstig zijn, dan wordt op grond van artikel 9 vóór verwerking of gebruik de bron en het bijbehorende kenbaar gemaakt |
| Specifiek doel | overeenkomstig artikel 19 van dezelfde wet het specifieke doel dat een niet-overheidsorgaan moet hebben bij het verzamelen of verwerken van persoonsgegevens; het gebruik moet bovendien binnen het bestek blijven dat voor dat specifieke doel noodzakelijk is (artikel 20) |
| Recht zich te verzetten tegen marketing | overeenkomstig artikel 20, tweede lid, van dezelfde wet dient het gebruik van persoonsgegevens voor marketing onmiddellijk te worden gestaakt zodra de betrokkene kenbaar maakt geen marketing te willen ontvangen; bij de eerste marketing dient de wijze van weigering te worden verstrekt en worden de benodigde kosten gedragen (derde lid) |
| Bevoegd gezag | overeenkomstig artikel 1-1 van de PDPA is het bevoegd gezag voor deze wet de Commissie voor de Bescherming van Persoonsgegevens (PDPC) |
| Seksuele beelden zonder toestemming | seksuele beelden van een ander die zonder toestemming zijn opgenomen, verveelvoudigd of verspreid, en valse seksuele beelden die door middel van computersynthese of vergelijkbare methoden zijn vervaardigd; het opnemen en verspreiden ervan vormt respectievelijk strafbare feiten op grond van artikel 319-1 tot en met artikel 319-4 van het Strafwetboek (刑法), en de verwijderingsverplichting van platforms volgt artikel 13 van de Wet op bestrijding seksueel geweld (性侵害犯罪防治法) |
| Seksuele uitbuiting van kinderen en jongeren | het gedrag als gedefinieerd in artikel 2 van de Wet ter voorkoming van seksuele uitbuiting van kinderen en jongeren (兒童及少年性剝削防制條例), waaronder het fotograferen, vervaardigen, verveelvoudigen, in bezit hebben, verspreiden, uitzenden, overdragen, openlijk tentoonstellen, verkopen of tegen betaling laten bekijken van seksuele beelden van kinderen of jongeren |
| Toepasselijk recht | het recht waaraan partijen hun overeenkomst onderwerpen; de [Servicevoorwaarden](/nl/mail/terms-of-service/) wijzen het recht van de Republiek China aan |
| Standaardcontract (algemene voorwaarden) | een overeenkomst die door middel van algemene bedingen ten aanzien van een groot aantal onbepaalde personen wordt gesloten; gereguleerd door artikel 247-1 van het Burgerlijk Wetboek (民法) (nietigheid van kennelijk onredelijk bezwarende bedingen) en artikel 11-1 (leestijd) en artikel 17 (verplichte en verboden bedingen) van de Wet inzake consumentenbescherming (消費者保護法) |
| Vervolging alleen op klacht | de vervolgingsvoorwaarde van de titel over strafbare feiten met betrekking tot computergebruik (artikel 358 tot en met artikel 360) zoals bepaald in artikel 363 van het Strafwetboek: vervolging vindt pas plaats nadat het geschaadde slachtoffer klacht heeft ingediend; dit laat de afhandeling door de Exploitant via civiel- en bestuursrechtelijke wegen en op grond van het beleid van deze site onverlet |

## 2. Technische begrippen

| Begrip | Definitie |
| --- | --- |
| Instance (site) | één EpoCanvas Mail-implementatie binnen het Cloudflare-account van een bepaalde persoon of organisatie, zoals `mail.epocanvas.com` |
| Exploitant | de persoon of het team dat de instance implementeert en beheert; de «wij» waarnaar de documenten verwijzen |
| PBKDF2 | een algoritme voor het hashen van wachtwoorden. De Dienst voert 100.000 iteraties uit met HMAC-SHA256 en voegt een per gebruiker onafhankelijk willekeurig salt toe, zodat het oorspronkelijke wachtwoord niet uit de hash kan worden afgeleid |
| TOTP | tijdsgebonden eenmalige wachtwoorden volgens RFC 6238; de sleutel wordt in de database versleuteld bewaard met AES-256-GCM |
| Passkey | een publieke-sleutelreferentie volgens de FIDO2/WebAuthn-standaarden; de Dienst bewaart uitsluitend de publieke sleutel, de privésleutel blijft op het apparaat van de betrokkene |
| JWT (sessietoken) | een digitaal ondertekende referentie die na aanmelding wordt uitgegeven en 30 dagen geldig is; maximaal 10 gelijktijdige sessies per account; bij uitloggen onmiddellijk serverzijdig ingetrokken |
| localStorage | een webopslagmechanisme dat browsers aanbieden; gegevens blijven op het apparaat van de betrokkene en overleven sessies. De sessietokens van de Dienst worden hier bewaard; er worden geen cookies gebruikt |
| Versleuteling in rust (encryption at rest) | versleuteling die wordt toegepast wanneer gegevens naar opslagmedia worden geschreven. De sleutels van de Dienst zijn afgeleid uit de omgevingsvariabelen van de instanceserver; het gaat om server-side versleuteling en niet om end-to-end-versleuteling |
| End-to-end-versleuteling (E2EE) | een vorm van versleuteling waarbij uitsluitend verzender en ontvanger kunnen ontsleutelen. De Dienst biedt dit niet; wie dit nodig heeft, versleutelt vooraf zelf met hulpmiddelen zoals GPG |
| HMAC-geobfusceerde routering | een mechanisme dat e-mailidentificatoren met een hash-based message authentication code aan de gebruikersidentiteit koppelt, ter voorkoming van ongeautoriseerde toegang (IDOR) en opsomming van bronnen |
| RBAC | op rollen gebaseerde toegangscontrole. De Dienst hanteert een meerlagig machtigingsmodel dat standaard weigert (fail-closed); parameters die niet op de allowlist staan, worden aan de gateway verwijderd |
| D1 / KV / R2 | de edge-SQLite-database, de wereldwijd gerepliceerde key-value-opslag en de S3-compatibele objectopslag van Cloudflare, respectievelijk voor gestructureerde gegevens, sessiecache en bijlage-blobs |
| Telemetrie | het automatisch terugmelden van gebruiksgegevens aan de ontwikkelaar door software. De broncode van de Dienst bevat geen enkele telemetrie en meldt geen instancegegevens terug naar het upstream-project |
| Zacht verwijderen / fysiek verwijderen | zacht verwijderen is het markeren als verwijderd, herstelbaar door de beheerder; fysiek verwijderen is het samen met de bijlagen en indexen uit de opslag verwijderen, onherstelbaar |

## 3. Overige

Begrippen die op deze pagina niet zijn gedefinieerd, worden uitgelegd naar de context van het [Privacybeleid](/nl/mail/privacy-policy/) en de [Servicevoorwaarden](/nl/mail/terms-of-service/) en naar gebruikelijk juridisch en technisch taalgebruik. Heeft u twijfels over een definitie, dan kunt u die stellen via de kanalen die in paragraaf 14 van het [Privacybeleid](/nl/mail/privacy-policy/) staan.
