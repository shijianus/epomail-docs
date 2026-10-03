---
title: Technische architectuur van EpoCanvas Mail
description: Technische architectuur van EpoCanvas Mail — Cloudflare-uitroltopologie aan de rand, scheiding van dubbele database, versleuteling in drie modi, bijlagenopslagketen, rol- en machtigingsmodel, levenscyclus van e-mail en beveiligingsontwerp van de applicatie.
---

**Datum van inwerkingtreding: 4 oktober 2026 | Versie: 5.10**

Deze pagina beschrijft de technische implementatie van EpoCanvas Mail: uitroltopologie, gegevensversleuteling, opslagketen, machtigingsmodel en de levenscyclus van e-mail. Alle technische feiten volgen de werkelijke implementatie in de open-sourcecode en zijn zelfstandig te controleren; de gevolgen voor uw privacy en de wettelijke informatie staan in [Gegevensverwerking en beveiliging](/nl/mail/data-security/) en het [Privacybeleid](/nl/mail/privacy-policy/).

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend.

![Systeemarchitectuur van EpoCanvas Mail: de clientlaag (webapp, Android-app, OAuth-apps van derden) benadert de rand van Cloudflare; de Workers dragen de API, de analyse van inkomende e-mail en de AI-mogelijkheden, uitgaande e-mail loopt via Resend en Telegram; gegevens rusten in de dubbele D1-databases, KV en objectopslag](/images/mail/nl/project-architecture.svg)

*Figuur: systeemarchitectuur. Clients benaderen via de rand, zonder server op één punt; inkomende e-mail wordt ontvangen en geanalyseerd door Email Routing, uitgaande e-mail loopt via de afleverkanalen; alle status rust in de eigen Cloudflare-resources van de exploitant.*

## 1. Uitroltopologie

| Onderdeel | Implementatie |
| --- | --- |
| Rekenwerk | Cloudflare Workers (V8 Isolate-sandbox): de bedrijfslogica is staatloos, platte tekst bestaat alleen in het verzoekgeheugen en wordt aan het einde van het verzoek vrijgegeven |
| Inkomend | Cloudflare Email Routing ontvangt e-mail; postal-mime analyseert body, headers en bijlagen |
| Uitgaand | sequentiële keuze uit drie kanalen: Cloudflare Email Workers-koppeling, Resend API, Mailjet; intern verkeer tussen accounts schrijft rechtstreeks naar de database |
| Gestructureerde opslag | Cloudflare D1 (fysiek gescheiden dubbele database: de gebruikersdatabase bevat accounts, rollen en instellingen; de e-maildatabase bevat e-mail, sterren en bijlagen-metadata; uitrol met één database blijft 100% achterwaarts compatibel; de gehoste instantie draait momenteel op één database) |
| Sleutel-waardeopslag | Workers KV: sessietokens, tellers voor aanmeldrisicobeheer, tussenstatus van TOTP, gebruikersprofielen en terugvaloptie voor objectopslag |
| Inferentie aan de rand | Workers AI (captcha-extractie enz., standaard llama-3.1-8b-instruct) |
| Geplande taken | Cron-triggers voeren uit: elke 30 minuten vernieuwing van de cache van de gegevensanalyse; dagelijks nulstelling van risicotellers, reset van verzendtellers, opschoning van prullenbak en spam, verwijdering van niet-gekoppelde OAuth-accounts |
| Menselijke verificatie | Cloudflare Turnstile (verificatie via HTTP-API, bij registratie en het toevoegen van mailboxen) |

## 2. Technologiestack

| Laag | Technologie |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (lokale concepten, niets naar de server), Vite 7, vite-plugin-pwa |
| Aanmeldinterface | React 18, Tailwind CSS 4, Vite 6 (aparte build, samen met de front-endproducten uitgebracht) |
| Serverzijde | Hono 4.12, Drizzle ORM, postal-mime, i18next, Resend SDK |
| Interface-elementen | 300+ offline vectorpictogrammen (nul externe verzoeken), licht en donker thema, woordenboeken in zes talen |

## 3. Versleutelingssysteem voor gegevens

- **Versleuteling in rust in drie modi**: modus Alles (geen versleuteling), modus Privé (alles versleuteld behalve spam en prullenbak), modus Versleuteld (alles versleuteld); de semantiek van de modi en wat beheerders kunnen zien, staan in sectie 1.3 van [Gegevensverwerking en beveiliging](/nl/mail/data-security/);
- **Versleuteling van e-mail**: onderwerp en body worden versleuteld met AES-256-GCM (met authenticatietags), elke record met een willekeurige initialisatievector; de sleutels worden met HKDF-SHA256 afgeleid van de instantiebrede omgevingsvariabele met hoofdgeheim, met een zout per gebruiker; het hoofdgeheim komt niet in de database en wordt niet in de code ingecheckt;
- **Bescherming van referentiegegevens**: wachtwoorden worden gehasht met PBKDF2-HMAC-SHA256 bij 100.000 iteraties met zout; het TOTP-geheim wordt versleuteld in rust met AES-256-GCM opgeslagen; herstelcodes worden alleen als SHA-256-hash bewaard; toegangssleutels slaan alleen de publieke sleutel op;
- **Grens**: het bovenstaande is serverside-versleuteling in rust, geen end-to-end-versleuteling; bijlagen vallen buiten de versleutelingsomvang.

## 4. Opslagketen van bijlagen

De binaire inhoud van bijlagen wordt in deze volgorde opgelost en opgeslagen: eigen S3-compatibele opslag (BYOS, met ondersteuning voor AWS S3, Backblaze B2, MinIO enz.) → S3-compatibele opslag zoals geconfigureerd door de exploitant → Cloudflare R2-koppeling → standaard Cloudflare KV. De metadata (bestandsnaam, MIME, grootte) staan in D1; downloads bevatten defensieve koppen en een MIME-toestaanlijst; bij het verwijderen van e-mail worden bijlagen in cascade opgeruimd via referentietelling.

## 5. Sessies en rolmachtigingen

Sessies zijn JWT's (HS256) met een geldigheid van 30 dagen, die sterk gemaskeerd in KV staan; hooguit 10 actieve sessies per account, direct ingetrokken bij uitloggen en deactivering. Machtigingen volgen RBAC, met zes standaardrollen:

| Rol | Dagelijkse verzending | Opslagquotum | Bijlagen | Extra mogelijkheden |
| --- | --- | --- | --- | --- |
| Bezoeker | Verboden | 0 | Nee | alleen-lezen sandbox |
| Gewone gebruiker | 5 berichten | 5 MB | Nee | basisverzending en -ontvangst |
| Gewone gebruiker LV.0 | 8 berichten | 10 MB | Nee | groei gekoppeld aan blogniveau |
| Gewone gebruiker LV.1 | 10 berichten | 25 MB | Ja | basisverzending, -ontvangst en bijlagen |
| Beheerder | 100 berichten | 500 MB | Ja | gebruikersbeheer, beheer van alle e-mail (volgens de e-mailmodus) |
| Masteraccount | Onbeperkt | 1024 MB | Ja | alle machtigingen |

Alle beheer- en bedrijfsroutes worden gecontroleerd door één authenticatiegateway; openbare eindpunten (aanmelding, registratie, OAuth, initialisatie) zijn uitgezonderd; bij het verwijderen van een account worden de sessies onmiddellijk ingetrokken.

## 6. Levenscyclus van e-mail

| Fase | Gedrag |
| --- | --- |
| Verwijderen | e-mail gaat eerst naar de prullenbak (zachte verwijdering); 7 dagen na ontvangst verwijdert een geplande taak deze fysiek (bijlagen en indexen inbegrepen) |
| Spamquarantaine | spam blijft 7 dagen staan en gaat daarna naar de prullenbak; de quarantainetermijn is instelbaar |
| Quotumopschoning | bij mailboxgebruik boven 90 % van de quota wordt e-mail die al als verwijderd is gemarkeerd onmiddellijk fysiek verwijderd |
| Officiële e-mail | welkomstmails en systeembrede aankondigingen verlopen standaard na 7 dagen (instelbaar) |
| Verwijdering in cascade | fysieke verwijdering gebeurt in blokken (om de limiet op gebonden parameters per D1-instructie te respecteren); bijlagen en sterren worden met de e-mail in cascade verwijderd |
| Accountdeactivering | sessies vervallen onmiddellijk; gegevens komen in een zacht-verwijderde staat tot een beheerder de fysieke verwijdering uitvoert (de termijnverbintenis staat in sectie 8 van het [Privacybeleid](/nl/mail/privacy-policy/)) |

## 7. Beveiligingsontwerp van de applicatie

- **Routes tegen onbevoegde toegang**: e-mail-URL's gebruiken altijd een willekeurige hash van 20 tekens, ondertekend met HMAC-SHA256, gebonden aan gebruiker en tenant, zonder prijsgeving van oplopende ID's, wat enumeratie en BOLA／IDOR uitsluit;
- **Driedubbele XSS-verdediging**: sanitisering via de DOMPurify-toestaanlijst, filtering van body style-injecties, MIME-toestaanlijst voor bijlagen bij uitvoer met strikte CSP en `nosniff`;
- **SSRF-blokkade**: uitgaande verzoeken passen door validatie van publieke adressen; loopback-, RFC 1918- en cloud-metadata-adressen worden altijd geweigerd;
- **Aanmeldbeveiliging**: na 5 opeenvolgende mislukte pogingen volgt een blokkade van 12 uur; menselijke verificatie via Turnstile; tweestapsverificatie met TOTP／toegangssleutel;
- **Integriteit van officiële e-mail**: vergrendeling van de officiële verzendidentiteit, aflevering als onveranderlijke momentopname en manipulatievrije verificatie van documenten; zie [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/).

## 8. Observeerbaarheid en kwaliteitsborging

- Runtime-logs worden verzameld via Cloudflare Workers Logs (de applicatie houdt geen eigen logs bij naast de IP-logs); de gegevensanalysepagina toont alleen statistische aggregaties, geen inhoudelijke gegevens;
- Meer dan honderd scripts voor geautomatiseerde tests, audits en controles: Playwright-browserregressies op de volledige stack, end-to-end-beweringen op het publieke netwerk, statische scan van de hele repository en de i18n-drie-eenheid in zes talen (zie sectie 7 van [Projectoverzicht](/nl/mail/project/)).

## 9. Gerelateerde documenten

| Bron | Link |
| --- | --- |
| Functies in detail en schermafbeeldingen | [Functiegids](/nl/mail/features/) |
| Positionering van het project en ontwikkelgeschiedenis | [Projectoverzicht](/nl/mail/project/) |
| Versleutelingssemantiek, bewaartermijnen en rechten van betrokkenen | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Officiële e-mailspecificaties en verificatie tegen manipulatie | [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/) |
