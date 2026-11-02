---
title: Technische architectuur van EpoCanvas Mail
description: Technische architectuur van EpoCanvas Mail — Cloudflare-uitroltopologie aan de rand, scheiding van dubbele database, versleuteling in drie modi, bijlagenopslagketen, rol- en machtigingsmodel, levenscyclus van e-mail en beveiligingsontwerp van de applicatie.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Deze pagina beschrijft de technische implementatie van EpoCanvas Mail: uitroltopologie, gegevensversleuteling, opslagketen, machtigingsmodel en de levenscyclus van e-mail. Alle technische feiten volgen de werkelijke implementatie in de open-sourcecode en zijn zelfstandig te controleren; de gevolgen voor uw privacy en de wettelijke informatie staan in [Gegevensverwerking en beveiliging](/nl/mail/data-security/) en het [Privacybeleid](/nl/mail/privacy-policy/).

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend.

![Systeemarchitectuur van EpoCanvas Mail: de clientlaag (webapp, Android-app, OAuth-apps van derden) benadert de rand van Cloudflare; de Workers dragen de API, de analyse van inkomende e-mail en de AI-mogelijkheden, uitgaande e-mail loopt via Resend en Telegram; gegevens rusten in de dubbele D1-databases, KV en objectopslag](/images/mail/nl/project-architecture.svg)

*Figuur: Email Routing ontvangt en verwerkt inkomende mail; ingestelde kanalen bezorgen uitgaande mail. Gegevens kunnen ook externe opslag en diensten bereiken; zie de [Verwerkerslijst](/nl/mail/sub-processors/).*

## 1. Uitroltopologie

| Onderdeel | Implementatie |
| --- | --- |
| Rekenwerk | Cloudflare Workers (V8 Isolate) verwerkt verzoeken en kan daarbij platte tekst lezen. De broncode garandeert niet dat de sandbox of alle platte tekst na ieder verzoek wordt vernietigd |
| Inkomend | Cloudflare Email Routing ontvangt e-mail; postal-mime analyseert body, headers en bijlagen |
| Uitgaand | sequentiële keuze uit drie kanalen: Cloudflare Email Workers-koppeling, Resend API, Mailjet; intern verkeer tussen accounts schrijft rechtstreeks naar de database |
| Gestructureerde opslag | Cloudflare D1 ondersteunt aparte gebruikers- en maildatabases, met terugval naar één database; de eerste bevat accounts, rollen en instellingen, de tweede mail, sterren en bijlagemetadata. Productiekoppelingen moeten apart worden gecontroleerd |
| Sleutel-waardeopslag | Workers KV: sessietokens, tellers voor aanmeldrisicobeheer, tussenstatus van TOTP, gebruikersprofielen en terugvaloptie voor objectopslag |
| Inferentie aan de rand | Workers AI (captcha-extractie enz., standaard llama-3.1-8b-instruct) |
| Geplande taken | Repositoryconfiguratie: dagelijks om 16:00 UTC (00:00 de volgende dag in Taiwan) verificatie- en verzendtellers wissen, prullenbak en niet-gekoppelde OAuth-identiteiten opruimen en statistieken vernieuwen; elke 5 minuten meldingen en objectverwijderingen verwerken. De code heeft een 30-minutentak, maar die is hier niet geregistreerd |
| Menselijke verificatie | Cloudflare Turnstile (verificatie via HTTP-API, bij registratie en het toevoegen van mailboxen) |

## 2. Technologiestack

| Laag | Technologie |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (lokale concepten, niets naar de server), Vite 7, vite-plugin-pwa |
| Aanmeldinterface | React 18, Tailwind CSS 4, Vite 6 (aparte build, samen met de front-endproducten uitgebracht) |
| Serverzijde | Hono 4.12, Drizzle ORM, postal-mime, i18next, Resend SDK |
| Interface-elementen | 300+ offline vectorpictogrammen (nul externe verzoeken), licht en donker thema, woordenboeken in zes talen |

## 3. Versleutelingssysteem voor gegevens

- **Drie opslagmodi**: Alles laat mailvelden onversleuteld; Privé kiest volgens spam-, prullenbak- en eigenaarloze status; Versleuteld versleutelt geselecteerde velden. Het bereik is `subject/content/text/code`, niet alle gegevens; zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/);
- **Mailversleuteling**: AES-256-GCM gebruikt een willekeurige IV van 12 bytes en gebruikerssleutels afgeleid met HKDF-SHA256. De bronnen zijn `email_enc_key`, daarna `totp_enc_key`, daarna `jwt_secret`; ontbreken ze allemaal, dan volgt een fout zonder ingebouwde standaardsleutel;
- **Aanmeldgegevens**: nieuwe wachtwoorden gebruiken standaard gezouten PBKDF2-HMAC-SHA256 met 210.000 instelbare iteraties; oudere hashes worden bij aanmelden bijgewerkt. Actieve TOTP-geheimen gebruiken AES-256-GCM; herstelcodes hebben SHA-256-hashes én een versleutelde kopie van de oorspronkelijke codes; passkeys bewaren publieke sleutels en metadata. Tijdelijke gegevens en andere uitzonderingen staan in [Gegevensverwerking en beveiliging](/nl/mail/data-security/);
- **Grens**: het bovenstaande is serverside-versleuteling in rust, geen end-to-end-versleuteling; bijlagen vallen buiten de versleutelingsomvang.

## 4. Opslagketen van bijlagen

De opslagvolgorde voor bijlagen is: gebruikers-S3 → beheerders-S3 → Cloudflare R2 → KV. Metadata staat in D1; downloads gebruiken ondertekende links en defensieve headers. Fysieke mailverwijdering wist bijlagemetadata en zet objecten in een wachtrij, met controle op resterende verwijzingen; automatische pogingen stoppen na 10 mislukkingen. Gelijktijdige verwijdering van alle objecten is niet gegarandeerd. Externe kopieën: [Verwerkerslijst](/nl/mail/sub-processors/).

## 5. Sessies en rolmachtigingen

JWT’s (HS256) zijn standaard 30 dagen geldig. KV bewaart toegestane sessies en een gebruikerskopie zonder bepaalde gevoelige velden. De code controleert vóór toevoegen of er meer dan 10 zijn: normaal kunnen er 11 blijven, geen strikte limiet van 10. Activiteit en sommige acties verlengen of verkorten de KV-termijn. Uitloggen verwijdert de huidige sessie; deactivering verwijdert het sessierecord van het account. RBAC kent zes rollen:

| Rol | Dagelijkse verzending | Opslagquotum | Bijlagen | Extra mogelijkheden |
| --- | --- | --- | --- | --- |
| Bezoeker | Verboden | 0 | Nee | alleen-lezen sandbox |
| Gewone gebruiker | 5 berichten | 5 MB | Nee | basisverzending en -ontvangst |
| Gewone gebruiker LV.0 | 8 berichten | 10 MB | Nee | groei gekoppeld aan blogniveau |
| Gewone gebruiker LV.1 | 10 berichten | 25 MB | Ja | basisverzending, -ontvangst en bijlagen |
| Beheerder | 100 berichten | 500 MB | Ja | gebruikersbeheer, beheer van alle e-mail (volgens de e-mailmodus) |
| Masteraccount | Onbeperkt | 1024 MB | Ja | alle machtigingen |

Beschermde routes controleren JWT, KV-sessies en rolrechten; sommige publieke endpoints hebben eigen verificatie. Deactivering verwijdert gewone sessies zonder alle autorisaties, gegevens of externe kopieën tegelijk te wissen.

## 6. Levenscyclus van e-mail

| Fase | Gedrag |
| --- | --- |
| Verwijderen | Gewone verwijdering zet `is_del=1`; de dagelijkse taak ruimt prullenbakmail op als `email.create_time` ouder is dan 7 dagen, niet 7 dagen na verplaatsing. Expliciet definitief verwijderen of quotumvoorwaarden kunnen direct fysiek verwijderen |
| Spamquarantaine | `spamRetentionDays` is standaard 7 dagen vanaf aanmaak; mail gaat naar de prullenbak en kan in dezelfde uitvoering fysiek worden verwijderd |
| Quotumopschoning | Bij een verwijderverzoek en bestaand opslaggebruik strikt boven 90% van het quotum worden de geselecteerde berichten fysiek verwijderd; alleen 90% bereiken start geen achtergrondopschoning |
| Officiële mail | Bij het lezen van de lijst worden verlopen berichten van aangewezen officiële afzenders als verwijderd gemarkeerd, op basis van aanmaak en `welcomeExpireDays` (standaard 7 dagen); de prullenbaktaak verzorgt latere fysieke opschoning |
| Cascadeverwijdering | Gewone definitieve verwijdering en prullenbakopschoning wissen bijlagemetadata en sterren en plannen nieuwe objectverwijderpogingen; beheerderpaden voor bulkverwijdering hebben niet dezelfde dekking |
| Accountdeactivering | Alleen de gebruikersrij wordt als verwijderd gemarkeerd en sessies vervallen; mailboxen, mail en profielen worden niet samen gemarkeerd. Er is geen automatische fysieke verwijdering na 90 dagen; zie het [Privacybeleid](/nl/mail/privacy-policy/) |

## 7. Beveiligingsontwerp van de applicatie

- **Routes tegen onbevoegde toegang**: e-mail-URL's gebruiken altijd een willekeurige hash van 20 tekens, ondertekend met HMAC-SHA256, gebonden aan gebruiker en tenant, zonder prijsgeving van oplopende ID's, wat enumeratie en BOLA／IDOR uitsluit;
- **Driedubbele XSS-verdediging**: sanitisering via de DOMPurify-toestaanlijst, filtering van body style-injecties, MIME-toestaanlijst voor bijlagen bij uitvoer met strikte CSP en `nosniff`;
- **SSRF-blokkade**: uitgaande verzoeken passen door validatie van publieke adressen; loopback-, RFC 1918- en cloud-metadata-adressen worden altijd geweigerd;
- **Aanmeldbeveiliging**: mislukte pogingen tellen per ingevoerde aanmeldnaam; 5 pogingen blokkeren aanmelden en iedere mislukking schrijft een TTL van 12 uur. Dit is geen atomaire accountblokkade voor alle aliassen samen. Ook Turnstile en TOTP / Passkey zijn aanwezig;
- **Integriteit van officiële e-mail**: vergrendeling van de officiële verzendidentiteit, aflevering als onveranderlijke momentopname en manipulatievrije verificatie van documenten; zie [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/).

## 8. Observeerbaarheid en kwaliteitsborging

- Cloudflare observability staat aan in de repository; D1 / KV bewaren ook identiteitsacties, meldingen, besluiten en aanmeldomgevingen. De meeste auditrecords hebben geen vervaltaak; bewaartermijnen van platformlogs vereisen controle. Zie het [Privacybeleid](/nl/mail/privacy-policy/);
- Meer dan honderd scripts voor geautomatiseerde tests, audits en controles: Playwright-browserregressies op de volledige stack, end-to-end-beweringen op het publieke netwerk, statische scan van de hele repository en de i18n-drie-eenheid in zes talen (zie sectie 7 van [Projectoverzicht](/nl/mail/project/)).

## 9. Gerelateerde documenten

| Bron | Link |
| --- | --- |
| Werkingsmodi: implementatievormen, e-mailmodi en aanmelding | [Werkingsmodi](/nl/mail/modes/) |
| Instellingengids: persoonlijke instellingen en de beheerconsole | [Instellingengids](/nl/mail/settings/) |
| Functies in detail en schermafbeeldingen | [Functiegids](/nl/mail/features/) |
| Positionering van het project en ontwikkelgeschiedenis | [Projectoverzicht](/nl/mail/project/) |
| Versleutelingssemantiek, bewaartermijnen en rechten van betrokkenen | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Officiële e-mailspecificaties en verificatie tegen manipulatie | [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/) |
