---
title: Inleiding EpoCanvas Mail documentatiesite
description: Inleiding EpoCanvas Mail documentatiesite — positionering van de site, documentatiearchitectuur, leesroutes, meertalige structuur en volledige navigatie.
---

**Site-lancering: 28 september 2026 | Huidige versie: v5.17 | Site-URL: docs.epocanvas.com/epomail**

**Datum van kracht: 5 oktober 2026 | Versie: 5.17**

De EpoCanvas Mail documentatiesite (hierna "deze site") is het officiële documentatiecentrum voor de open-source e-maildienst EpoCanvas Mail, met juridische voorwaarden, technische specificaties, gebruikershandleidingen en ontwikkelingsdocumentatie. Gebouwd met Astro 5 + Starlight, behoudt de site volledige structurele symmetrie over zes talen (vereenvoudigd Chinees, traditioneel Chinees, English, Français, Español, Nederlands), waarbij elk document woord voor woord is geverifieerd tegen de code-implementatie, wat gebruikers van gehoste instanties, zelf-hosters en auditdeelnemers een enkele bron van waarheid biedt. Deze pagina legt de positionering van de site, documentatiearchitectuur, leesroutes en navigatie-ingangspunten uit.

De juridische documenten op deze site zijn gezaghebbend in hun traditionele Chinese (Taiwan) versie; andere taalversies zijn referentievertalingen. Bij discrepantie prevaleert de gezaghebbende versie.

![EpoCanvas Mail documentatiearchitectuur: de juridische-documentatielaag (privacybeleid, servicevoorwaarden, acceptabel-gebruiksbeleid en data-governancedocumenten) en de technische-documentatielaag (projectintroductie, functiegids, technische architectuur, operationele modi en gebruikershandleidingen) vormen samen een compleet documentatiesysteem, allemaal gefundeerd in open-source code en transparante specificaties](/images/mail/nl/legal-architecture.svg)

*Figuur: Documentatiearchitectuur. De juridische-documentatielaag definieert gegevensverwerking en servicegrenzen; de technische-documentatielaag legt functies, architectuur en gebruik uit; beide lagen zijn gefundeerd in de open-source code-implementatie.*

## 1. Positionering van de site

Deze site is de enige officiële documentatie voor het EpoCanvas Mail open-source project, met drie functies:

- **Juridische kennisgeving**: privacybeleid, servicevoorwaarden, acceptabel-gebruiksbeleid en gegevensverwerkingsspecificaties, waarbij wettelijke kennisgevingsverplichtingen aan gebruikers van gehoste instanties worden vervuld; zelf-hosters kunnen de documentatie van deze site gebruiken als basissjabloon voor hun eigen kennisgevingen en voorwaarden;
- **Technische specificatie**: technische architectuur, beveiligingsontwerp, ontwikkelingsgeschiedenis en volledig commit-spoor, waardoor auditdeelnemers de consistentie tussen code-implementatie en gedocumenteerde toezeggingen kunnen verifiëren;
- **Gebruikershandleiding**: functiebeschrijvingen, interfacenavigatie, zoeksyntaxis, implementatiestappen en ontwikkelingsworkflow, waarbij gebruikers, operators en ontwikkelaars worden geholpen de dienst te begrijpen en te gebruiken.

De documentatie van deze site is gefundeerd in de feitelijke implementatie van de open-source code en verbiedt fabricage; juridische citaten gebruiken de `doc/legal-reference.md` verificatie-whitelist; technische feiten (versleutelingssemantiek, retentieperiodes, subverwerkers-lijst) worden continu geverifieerd door geautomatiseerde tests en auditscripts.

## 2. Documentatiearchitectuur

Deze site is georganiseerd in drie groepen documenten, die naar elkaar verwijzen en samen een complete set overeenkomsten vormen:

### 2.1 Product en overzicht

| Document | Inhoud |
| --- | --- |
| [Projectoverzicht](/nl/mail/project/) | Positionering, kernfuncties, technische architectuuroverzicht, ontwikkelingsgeschiedenis en volledig commit-spoor |
| [Servicebereik en ondersteuning](/nl/mail/service-scope/) | Servicegrenzen, disclaimer en contactkanalen voor de gehoste instantie |
| [Interface- en routekaart](/nl/mail/interface/) | Volledige interfacenavigatie en routemapping voor inbox, opstellen, instellingen en beheerconsole |

### 2.2 Gebruikershandleiding

| Document | Inhoud |
| --- | --- |
| [Functiegids](/nl/mail/features/) | Inbox-organisatie, opstellen en verzenden, zoeksyntaxis, labelregels, verificatiecode-extractie, doorsturen/push en AI-mogelijkheden |
| [Operationele modi](/nl/mail/modes/) | Implementatievormen, drie-traps mail-modus privacyniveaus, identiteitsgroepen en quota, inloggen en tweestapsverificatie |
| [Instellingengids](/nl/mail/settings/) | Vijf persoonlijke-instellingensecties (profiel, algemeen, beveiliging, gegevens, labels) en negen beheerconsole-secties |
| [Zoek- en regelsreferentie](/nl/mail/search/) | Volledige referentie voor zoekoperators, beheerderzijde ophalen en classificatieregel-voorwaarden |
| [Mailbox-interface en berichtdetail](/nl/mail/mailbox/) | Inbox-weergaven, driekolomsverdeling, conversatiedraden en berichtdetailpagina item voor item |
| [Labels en classificatiebeheer](/nl/mail/labels/) | Labeltaxonomie, classificatieregelmotor, zwart/wit-lijsten en wereldwijde governance-tools |
| [Persoonlijke gegevens en algemene instellingen](/nl/mail/preferences/) | Profielkaarten, adreskaarten, interfacetaal, themabehang en leesvoorkeuren |
| [Gegevensexport en opslag](/nl/mail/data/) | JSON volledige-kopie-export, .eml enkel-berichtdownload en opslaggebruikbeheer |
| [Accountbeveiligingsgids](/nl/mail/security/) | Gebruikersnaam en wachtwoord, tweestapsverificatiecentrum (TOTP, backup-herstelcodes, toegangssleutels) en vertrouwde apparaten |
| [Meldingen en doorsturgids](/nl/mail/notify/) | Persoonlijk doorsturen, Telegram-push en configuratie en gedrag van wereldwijde doorstuurregels |
| [Analyses](/nl/mail/analysis/) | Datavisualisatiedashboards, gebruikersgroei en mailclassificatiestatistieken |
| [Gebruikerslijst](/nl/mail/users/) | Accountbeheer, rolgroepen, verzendquota en verbannen/herstellen-operaties |
| [Volledige-store mailbeoordeling](/nl/mail/review/) | Beheerderzijde mailophalingen, spambeheer en zichtbaar bereik beperkt door mailmodus |
| [Machtigingen](/nl/mail/roles/) | Zes identiteitsgroepen, opslagquota, verzendlimieten en geautoriseerde AI-modellen |
| [Registratiesleutels](/nl/mail/regkeys/) | Uitnodigingscodegeneratie, gebruiksaantallimieten en verlopbeheer |
| [Systeeminstellingenkaarten](/nl/mail/system/) | Item-voor-item beschrijving van negen configuratiekaarten: site-instellingen, personalisatie, opslag, push en open platform |
| [Open platform en API-toegang](/nl/mail/api/) | OAuth 2.0 / OIDC-authenticatiecentrum, applicatieregistratie, eindpunt-toegang en persoonlijke API-tokens |
| [Classificatie](/nl/mail/category/) | Wereldwijde classificatieregels, verzender-zwartelijst en onderwerp-trefwoord-zwartelijst |
| [Operatierapporten](/nl/mail/audit/) | Auditwaarschuwingstickets, risicobeheersing-beoordeling, verbanningsappèls en tijdstempelverwijdering gekoppeld aan mailmodus |

### 2.3 Technologie en vertrouwen

| Document | Inhoud |
| --- | --- |
| [Technische architectuur](/nl/mail/architecture/) | Cloudflare edge-implementatietopologie, dual-database-isolatie, driemodusversleutelingssysteem, bijlageopslag-keten en applicatiebeveiligingsontwerp |
| [Anti-manipulatie en officiële specificaties](/nl/mail/tamper-proof/) | Officiële mailspecificaties en identificatie, officieel authenticatiemerk, onveranderbare levering en document-anti-manipulatieverificatie |

### 2.4 Zelf-hosting en ontwikkeling

| Document | Inhoud |
| --- | --- |
| [Implementatiegids](/nl/mail/deployment/) | Volledige stappen voor zelf-hosting, vereisten, initialisatiestroom en geheimen-injectie |
| [Ontwikkelingsgids](/nl/mail/development/) | Ontwikkelomgeving, engineeringworkflow, test- en auditscripts, commit-conventies en contributierichtlijnen |

### 2.5 Privacy en gegevensgovernance

| Document | Inhoud |
| --- | --- |
| [Overzicht](/nl/mail/overview/) | Platformidentiteit, gegevensverwerkingsroldefinitie, documentatiearchitectuur, volgorde van voorrang en contactpunten |
| [Privacybeleid](/nl/mail/privacy-policy/) | Verzameling, verwerking en gebruik van persoonsgegevens, verwerkingsaard, rechten van betrokkenen en internationale overdrachten |
| [Gegevensverwerking en beveiliging](/nl/mail/data-security/) | Gegevenslevenscyclus, verwerkingsmatrix, beveiligingsonderhoudsmaatregelen, incidentrespons en inspectiesamenwerking |
| [Subverwerkers](/nl/mail/sub-processors/) | Subverwerkers, delingsontvangers, betrokken gegevens en internationale-overdracht-waarborgen |

### 2.6 Voorwaarden en naleving

| Document | Inhoud |
| --- | --- |
| [Servicevoorwaarden](/nl/mail/terms-of-service/) | Contractuele voorwaarden voor servicegebruik, rechten en plichten, aansprakelijkheidsbeperking, toepasselijk recht en jurisdictie |
| [Acceptabel-gebruiksbeleid](/nl/mail/acceptable-use/) | Gedragsgrenzen, lijst met verboden gedragingen en operator-handhavingsprocedures |
| [Open-source en zelf-hosting juridisch](/nl/mail/open-source/) | MIT-licentie-toepasbaarheid, data-controller-verantwoordelijkheid voor zelf-hosting en disclaimer |
| [Belangrijke termen](/nl/mail/key-terms/) | Definities van technische en juridische termen gebruikt in de juridische documentatie van deze site |

## 3. Leesroutes

Deze site is georganiseerd rond twee complementaire routes:

**Route 1: Het project begrijpen, voorbereiden op implementatie of leren gebruiken**

[Projectoverzicht](/nl/mail/project/) → [Functiegids](/nl/mail/features/) → [Operationele modi](/nl/mail/modes/) → [Interface- en routekaart](/nl/mail/interface/) → [Zoek- en regelsreferentie](/nl/mail/search/) → [Instellingengids](/nl/mail/settings/) → [Implementatiegids](/nl/mail/deployment/) → [Ontwikkelingsgids](/nl/mail/development/)

**Route 2: Privacy-juridische overeenkomsten en servicegrenzen begrijpen**

[Overzicht](/nl/mail/overview/) → [Privacybeleid](/nl/mail/privacy-policy/) → [Servicevoorwaarden](/nl/mail/terms-of-service/) → [Acceptabel-gebruiksbeleid](/nl/mail/acceptable-use/) → [Gegevensverwerking en beveiliging](/nl/mail/data-security/) → [Subverwerkers](/nl/mail/sub-processors/)

De twee routes komen samen bij [Functiegids](/nl/mail/features/) en [Operationele modi](/nl/mail/modes/).

## 4. Meertalige structuur

Deze site biedt zes talen met 1:1 structurele symmetrie:

| Taal | Identificatie | Beschrijving |
| --- | --- | --- |
| Vereenvoudigd Chinees | `zh` | Site-standaardtaal, bezet URL-rootpad (`/epomail/mail/...`) |
| Traditioneel Chinees (Taiwan) | `zh-tw` | Gezaghebbende versie voor juridische documenten; andere talen zijn referentievertalingen (`/epomail/zh-tw/mail/...`) |
| English | `en` | Referentievertaling (`/epomail/en/mail/...`) |
| Français | `fr` | Referentievertaling (`/epomail/fr/mail/...`) |
| Español | `es` | Referentievertaling (`/epomail/es/mail/...`) |
| Nederlands | `nl` | Referentievertaling (`/epomail/nl/mail/...`) |

De site-homepage (`/` en `/epomail/`) onderhandelt taal via Cloudflare Pages Functions op basis van de `Accept-Language` header van de browser, automatisch omleidend naar de [Overzicht](/nl/mail/overview/)-pagina van de corresponderende taal. Het oude rootpad `/mail/...` leidt om naar het canonieke pad met taalonderhandeling.

Het aantal documenten, koppenstructuur, tabelrijen en -kolommen, aantal afbeeldingen en waarschuwingsboxen moeten strikt identiek zijn voor elke taal, automatisch geverifieerd door `scripts/check-structure.py`. Versienummers en ingangsdatums zijn site-breed verenigd.

## 5. Documentatiekwaliteitsborging

De documentatie van deze site wordt gewaarborgd door de volgende mechanismen:

- **Code-implementatieverificatie**: technische feiten (versleutelingssemantiek, retentieperiodes, subverwerkers-lijst, rolquota) zijn gefundeerd in de epomail-repository-broncode en fabricage is verboden;
- **Juridische citatie-whitelist**: `doc/legal-reference.md` is de enige bron voor juridische citaties site-breed; alleen artikelnummers geverifieerd in deze lijst mogen worden geciteerd;
- **Structurele symmetrieverificatie**: `scripts/check-structure.py` verifieert dat de koppen, tabellen, afbeeldingen en waarschuwingsbox-tellingen van de zestalige documenten strikt identiek zijn;
- **Anker-integriteit**: `scripts/validate-anchors.cjs` scant site-wijde ankers en afbeeldingsverwijzingen, waarbij nul gebroken links worden gegarandeerd;
- **Foutloze bouw**: `pnpm build` moet slagen zonder fouten; eventuele waarschuwingen of fouten blokkeren publicatie;
- **Anti-manipulatieverificatie**: officiële documenten zijn HMAC-SHA256 ondertekend en geleverd via onveranderbare snapshots, zie [Anti-manipulatie en officiële specificaties](/nl/mail/tamper-proof/).

## 6. Site-technologiestack

| Component | Implementatie |
| --- | --- |
| Statische generatie | Astro 5.0 + Starlight 0.32 |
| Route-onderhandeling | Cloudflare Pages Functions (gedeelde taalonderhandelingslogica `functions/_lib.js`) |
| Implementatie | Cloudflare Pages (`npx wrangler pages deploy dist --project-name epomail-docs`) |
| Bouwartefacten | Dubbelsporige publicatie: rootpad `dist/*` en subpad-mirror `dist/epomail/*` (uitgevoerd door `scripts/post-build.mjs`) |
| Stijlsysteem | Aangepaste CSS (`src/styles/custom.css`, 627 regels), afgestemd op EpoCanvasDocs indigo-tech kleurenschema |
| Pictogrammen en assets | 300+ offline vectorpictogrammen, lichte/donkere dubbele thema's, zestalige gelokaliseerde illustraties (`/images/mail/{zh-tw,en,es,fr,nl}/*.svg`) |

## 7. Gerelateerde bronnen

| Bron | Link |
| --- | --- |
| Gehoste instantie | [mail.epocanvas.com](https://mail.epocanvas.com) |
| Broncode | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) |
| Documentatiesite-broncode | Onafhankelijke git-repository EpomailDocs (bouwartefact van deze site) |
| Privacycontact | privacy@epocanvas.com |
| In-productcontact | In-site bericht of admin@epocanvas.com |
| Open-source projectissues | GitHub-repository Issues |
