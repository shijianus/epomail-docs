---
title: Projectoverzicht EpoCanvas Mail
description: Een complete introductie van het EpoCanvas Mail-project—positionering, kernfuncties, technische architectuur, beveiligingsontwerp, ontwikkelgeschiedenis en de volledige commit-keten.
---

**Eerste commit: 21 juli 2026 | Huidige versie: v1.1.0 | Licentie: MIT**

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

EpoCanvas Mail is een open source e-mailservice die draait op het Cloudflare-edge-netwerk. Met één domein en één Cloudflare-account richt u een eigen mailboxdienst op met verzending en ontvangst van e-mail, bijlagen en toegang vanaf meerdere apparaten. Het project wordt geëxploiteerd als gehoste instantie op [mail.epocanvas.com](https://mail.epocanvas.com), publiceert zijn volledige broncode voor zelf-hosting en levert een bijbehorende Android-app (epomail). Deze pagina beschrijft de positionering, de functies, de technische architectuur, het beveiligingsontwerp en de ontwikkelgeschiedenis van het project; de juridische voorwaarden van de dienst en de privacypraktijken staan in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/).

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. De juridische en technische documenten op deze site volgen de open-sourceimplementatie van de dienst en beogen transparante, strenge, niet-commerciële normen voor gemeenschapscommunicatie.

![Systeemarchitectuur van EpoCanvas Mail: de clientlaag (webapp, Android-app, OAuth-apps van derden) verbindt via de Cloudflare-edge; Workers dragen de API, de verwerking van inkomende e-mail en de AI-mogelijkheden, met uitgaande verzending via Resend en Telegram; gegevens worden opgeslagen in dubbele D1-databases, KV en objectopslag](/images/mail/nl/project-architecture.svg)

*Figuur: Email Routing verwerkt inkomende mail en ingestelde kanalen bezorgen uitgaande mail. Gegevens kunnen ook externe opslag, identiteits-, meldings- of AI-diensten bereiken; zie de [Verwerkerslijst](/nl/mail/sub-processors/).*

## 1. Positionering

Een eigen mailsysteem draaien vraagt om een server die langdurig onderhouden wordt, een vast IP-adres en anti-spambeheer; commerciële mailboxdiensten concentreren uw gegevens juist in handen van de aanbieder, en als gebruiker kunt u nauwelijks verifiëren hoe ze worden behandeld. EpoCanvas Mail kiest een derde pad: de complete dienst past binnen de gemeterde gratis tier van Cloudflare (Workers-rekenkracht, D1-databases, KV-cache, R2-objectopslag), wordt serverloos geleverd, met nul vaste serverkosten en volledig open source code.

- Geen beheerlast: na uitrol is er geen onderhoud van besturingssysteem of certificaten; schalen en wereldwijde versnelling worden door Cloudflare verzorgd;
- Zeggenschap: de beheerder kiest middelen en externe diensten. De code verwerkt beveiligingssignalen en bewaart records. Er is geen speciaal kanaal gevonden dat gebruikstelemetrie naar de oorspronkelijke auteur stuurt; logs en externe verzoeken bestaan wel. Zie het [Privacybeleid](/nl/mail/privacy-policy/);
- Twee manieren van gebruik: registreren op de gehoste instantie, of de broncode nemen en uitrollen op uw eigen domein. De toewijzing van de verwerkingsverantwoordelijke rol in elk scenario staat in sectie 2 van het [Overzicht](/nl/mail/overview/).

## 2. Functieoverzicht

Het project omvat verzenden en ontvangen, indeling, zoeken, automatisering en een open platform; de per-functie toelichting met echte interface-screenshots staat in de [Functiegids](/nl/mail/features/). Kernpunten: ontvangst via Cloudflare Email Routing en multikanaal verzenden; een inbox met acht weergaven, conversatiedraden en drie-paneelweergave; geavanceerde zoeksyntaxis en de classificatieregelengine; verificatiecode-extractie via Workers AI en indeling-bewarende volledige vertaling; een OAuth 2.0 / OIDC-centrum en persoonlijke API-tokens; en gegevensexport (JSON en .eml).

Elke interface en route wordt doorlopen in de [Interface en routekaart](/nl/mail/interface/); de volledige referentie van zoekoperators en de classificatieregelengine staat in de [Zoek- en regelreferentie](/nl/mail/search/).

De documentatiesite biedt zeven talen; de productinterface biedt er momenteel zes, zonder Duits. Duitse documenten gebruiken daarom screenshots van de Engelse interface uit `/images/mail/en/ui/` voor gelokaliseerde rondleidingen. Bestaande gedeelde screenshots onder `/images/mail/ui/` behouden hun oorspronkelijke interfacetaal, vermeld in het bijschrift of de alternatieve tekst. De lopende tekst, bijschriften en diagrammen blijven Duits. Deze gedocumenteerde uitzonderingen voor screenshots betekenen niet dat er een Duitse productinterface bestaat.

De Chinese tekenreeks `重要` is een letterlijk productlabel dat ‘belangrijk’ betekent, geen onvertaalde lopende tekst. Ook de zoekaliassen `$发件人`, `$用户`, `$收件人` en `$主题` moeten letterlijk behouden blijven; ze komen respectievelijk overeen met `$sender`, `$user`, `$to` en `$subject`. De interfacetaalnamen `简体中文` (vereenvoudigd Chinees) en `繁體中文` (traditioneel Chinees) behouden hun oorspronkelijke spelling. Configuratiesleutels, routes, bestandsnamen en andere technische constanten veranderen niet met de documentatietaal.

## 3. Architectuuroverzicht

De server draait op Cloudflare Workers (stateless V8 Isolate-sandboxen); gegevens staan in twee fysiek gescheiden D1-databases (een gebruikers- en een maildatabase, met 100% achterwaartse compatibiliteit in single-database-uitrol), KV en objectopslag (een keten van vier niveaus: eigen S3, geconfigureerde S3, R2, KV); inkomende post komt via Email Routing, uitgaande post via kanalen als Resend / Mailjet, en AI draait op Workers AI. De volledige topologie, het versleutelingssysteem, rolquota en de levenscyclus van e-mail: zie [Technische architectuur](/nl/mail/architecture/).

## 4. Voor wie dit project geschikt is en voor wie niet

Het project is geschikt voor de volgende situaties:

- particulieren of kleine teams die al een domein en een Cloudflare-account hebben en een mailbox willen zonder vaste serverkosten;
- zelfhosters die controleerbare code willen en zelf hun opslag en externe diensten willen kiezen;
- individuele gebruikers die geïsoleerde mailboxen, automatische classificatie en directe extractie van verificatiecodes voor registratiemail nodig hebben.

Overweeg een alternatief in de volgende situaties:

- bedrijfsgebruik met beschikbaarheidsgarantie, formele ondersteuning of langdurige archivering: geen SLA; prullenbakopschoning gebruikt een aanmaaktijd ouder dan 7 dagen, zonder 7 extra dagen na verplaatsing te garanderen. Zie het [Privacybeleid](/nl/mail/privacy-policy/);
- toepassingen gericht op massale uitgaande marketing: het beleid voor acceptabel gebruik verbiedt ongevraagde commerciële massamail (zie [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/), Sectie 3);
- communicatie die end-to-end-versleuteling vereist: de versleuteling van de dienst is statisch aan serverzijde en omvat geen bijlagen (zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/), Sectie 3);
- gebruikers die Cloudflare-resources, het domein en de sleutelconfiguratie niet willen beheren: selfhosting vereist nog steeds het injecteren van de sleutels en initialisatie (zie Sectie 8).

## 5. Beveiligingsontwerp in het kort

Nieuwe wachtwoorden gebruiken standaard gezouten PBKDF2-HMAC-SHA256 (210.000 iteraties, instelbaar); oudere hashes worden bij aanmelden bijgewerkt en actieve TOTP-geheimen gebruiken AES-256-GCM. Andere maatregelen omvatten ondertekende links, XSS-filters, uitgaande adrescontroles en officiële mailsnapshots. De 43 controles van 22 september 2026 zijn historische verificatie, geen beveiligingscertificering van de huidige versie of productie. Zie [Architectuur](/nl/mail/architecture/) en [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

## 6. Ontwikkelgeschiedenis en de commit-keten

Het project wordt doorlopend ontwikkeld sinds de eerste commit van 21 juli 2026 (`2bbb582`). Per 5 oktober 2026 telt de hoofdrepository meer dan 660 commits; deze site (EpomailDocs, een aparte git-repository) komt daar nog eens meer dan 50 commits bij (de onderstaande lijsten hebben mijlpaalgranulariteit; tussenliggende en latere commits staan op GitHub). De tabel hieronder somt de mijlpalen per fase op met hun ankercommits (korte hashes):

| Fase | Periode | Opgeleverd | Ankercommits |
| --- | --- | --- | --- |
| 1. Fundament | 2026-07-21 → 07-23 | Initialisatie van de repository; Vue 3-interface fase één (globaal palet, typografie, lichte en donkere zijbalk); driedelig gesplitst leesaanzicht in Outlook-stijl | `2bbb582` `29f9896` `a531341` |
| 2. Merk en aanmeldschil | 2026-08-05 → 08-09 | Transparant logo en favicon geharmoniseerd; donker thema als standaard en merklaadanimatie; React-aanmeldschil met de ruimte-warp-animatie | `6572695` `e3e57c6` |
| 3. Prototype en regelengine | 2026-08-12 → 08-17 | Prototype-interface volledig toegepast; labelsysteem gesynchroniseerd met de backend; uitstellen／spam／prullenbak; regelengine voor classificatie (standaardsjablonen, heuristiek, harde onderschepping via lijsten); geavanceerde zoeksyntaxis; analytedashboard voor classificatie; brute-forceblokkade | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. Editor en welkomstmail | 2026-08-28 → 08-30 | Volledig schermomvattende welkomstmail-dialoog; TinyMCE Alloy-werkbalk herbouwd rond 17 Markdown-hulpmiddelen | `9f6ece8` `59bfe60` |
| 5. Open platform en opslag | 2026-09-03 → 09-06 | OAuth 2.0／OIDC-authenticatiecentrum; fysieke scheiding van dubbele D1; B2／S3-eigen opslag met quotummeting; beheercentrum voor opslag en databases; 6 kernrolgroepen en de bezoekers-sandbox | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. AI-mogelijkheden | 2026-09-06 → 09-13 | Gmail-achtige inboxarchitectuur en AI-volledige vertaling; meer dan 300 offline vectorpictogrammen; AI Hub-modellenpool met tokenloze snelheidstests; gelijktijdige vertaling per segment en OCR-ondertitels | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. Verscherping van rechten en beveiligingsfixes | 2026-09-09 → 09-11 | GitHub Release v1.1.0; fix van de cross-domain privilege escalation zero-day; multidomein-beheerdersaanmelding; paneel voor apps van derden en gegevensdeling | `7558fc8` `5855db1` `3234d69` |
| 8. Zestalige internationalisering | 2026-09-14 → 09-17 | Zes talen in het hele project met lekvrije woordenboeken; e-mailsjablonen verzonden in de taal van de ontvanger; volledige push naar GitHub; productielancering op Cloudflare | `aa1955e` `42c33f1` `25985b1` |
| 9. Tweestapsverificatie en audits | 2026-09-18 → 09-22 | TOTP／Passkey-aanmelding; herbouwde uitrol-bootstrapketen en scheiding van secrets; UI-audit-fixbatches; volledige beveiligingsverharding | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Gmail-achtige beleving | 2026-09-25 → 09-27 | Gelaagde berichtdetailopmaak; inline beantwoorden en emoji-reacties; verbeterde gespreksthreads; Gmail-stijl routering en diepe links; cryptografische hash-routering tegen manipulatie | `a8d841a` `4af2985` `4b371a8` |
| 11. Site met juridische documenten | 2026-09-27 → 09-29 | Juridisch geheel van deze site in zes talen en zeven documenten; uitbreiding volgens het Google-beleidsparadigma; bouw van de site met Astro 5 + Starlight; aparte git-repository | `2bed02b` `617cccf` |
| 12. Finalesering en audit vóór de lancering | 2026-09-29 → 09-30 | Integratie van de projectpagina en het officiële privacybeleid; volledige v5.0-herziening zonder artikelnummerverwijzingen; kalibratie van technische feiten en aanvulling van de verwerkerslijst vóór de lancering | `7ad5ebc` `05c222c` `5197f50` |
| 13. Duurzame exploitatie van de documentatiesite | 2026-10-01 → 10-04 | lokale demo-instantie en seedtool; v5.8 visuele en ingangspolijsting; v5.9 uitbreiding van functiegids/architectuur (×6 talen) met echte productscreenshots; v5.9 onafhankelijke audit met volledige verificatie van claims tegen de broncode | `26f6c3b` `8a60539` |
| 14. Auditgovernance en uitbreiding van de projectintroductie | 2026-10-04 → 10-05 | v5.10 onafhankelijke auditgovernance (volledige claim-tot-broncorrecties, «en» opgenomen in de structuursymmetrie); v5.11 pagina's voor bedrijfsmodi en instellingsgids (×6 talen, echte productscreenshots); herbouw van de auditconsole (RBAC en D1-persistentie) en OAuth-functievlag | `08448fb` `ff4e93f` `596e7c1` |

Hieronder staat de volledige keten van mijlpaalankercommits uit de hoofdrepository, met hashes van 40 tekens die in GitHub controleerbaar zijn. In beide ketens zijn Chinese commitonderwerpen in het Nederlands samengevat; oorspronkelijk Engelse onderwerpen blijven behouden. Dit zijn historische samenvattingen, geen beschrijvingen van de huidige versie. Via de hashes zijn de oorspronkelijke commits en exacte onderwerpen terug te vinden.

```text
2bbb582e19b8a1aca410767a5b5c52ae5d7f4423  2026-07-21  init: initial commit before UI/UX updates
29f98962399ec85c894fbc02ff6ef69d7d496222  2026-07-23  feat(ui): implement 3-column split view layout for mail reading
65726950939d72d82dbaccd974ff1a75ffe1b226  2026-08-06  feat: default dark theme & apply brand loading animation
e3e57c69a6154bc13218be27a6537711e0a21527  2026-08-09  Enhance: Upgrade collision warning to a high-tech sci-fi HUD
8664f84cce7d2fdb038322f8bf66c5189f93f33d  2026-08-12  Phase 1: Refactor UI/UX colors and layout to match prototype style
803b0e05d2d55bbcbb3b0f4d4279524c31524c21  2026-08-13  feat: implement advanced search syntax and highlighting
0b7e37d953e2a25ff74dcf313272632fb60ba9c8  2026-08-13  fix(labels): ensureDefaultRules injection + system rule lock UI + real heuristic engine
643edea268fb8dc4f67b4bfe17db49025f6c7662  2026-08-15  feat(ui): phase 3 - classification management analytics dashboard
79f200fcb1a401e08c4d89ff94b8c3a65b51aef0  2026-08-16  feat: enhance login UX with toast and 12h anti-brute force lockout
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): een OAuth-platform voor beheerders en afzonderlijk appbeheer toevoegen; deze functies uit persoonlijke profielen verwijderen
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): het beheercentrum Opslag en kerndatabases aan systeeminstellingen toevoegen en de configuratie van externe databases herbouwen
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): rechten voor zes kernbeheergroepen verfijnen; interactie in de bezoekerssandbox, koppeling met blogniveaus en een UI-architectuuroverzicht toevoegen
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): een Gmail-achtige inbox invoeren; de to-me-detailkaart, bovenste actiebalk, volledige AI-vertaling en API-sleutelintegratie in het beheerpaneel verbeteren
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): ruim 300 pictogrammen vervangen door offline vectoren; laden zonder netwerkverzoeken en alle pictogramstatussen afdekken
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: projectbreed traditioneel Chinees, Frans, Spaans en Nederlands toevoegen, met meertalige welkomstmail en aankondigingsmail voor de hele site
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): productie op Cloudflare starten; de visuele keten met Playwright op echte apparaten controleren; Vue-i18n-escaping en fouten in het zijpaneel herstellen
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): tweestapsverificatie bij aanmelden (TOTP/Passkey) herbouwen met vloeiende animaties en verbeterde interactie
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): drie verificatiegebreken oplossen, de bootstrapketen voor nieuwe uitrol herbouwen en het geheimenbeheer isoleren
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): beveiliging versterken en kwetsbaarheden sluiten met P0/P1/P2-bescherming, SSRF-blokkering, drievoudige XSS-verdediging, afscherming van sessiegegevens en afgestemde rechten
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): de gelaagde berichtdetailweergave en zwevende snelle reactie op Gmail afstemmen
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): multi-accountisolatie op Gmail afstemmen en cryptografische hash-routering tegen onbevoegde toegang invoeren
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): EpomailDocs een eigen git-repository geven en het volgen vanuit de bovenliggende repository beëindigen
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): visuele en ingangsverbeteringen van EpomailDocs v5.8 archiveren (EpomailDocs a1c1e89: paginatiepictogrammen, gecentreerde tabellen en Accept-Language-onderhandeling)
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): de documentatie-uitbreiding EpomailDocs v5.9 archiveren (EpomailDocs beb956a: functie- en architectuurgidsen in zes talen, echte screenshots, herstelde inhoudscentrering en lokale demo)
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): lokale demogegevens toevoegen met de mailgenerator seed-demo.py en de lokale configuratie wrangler-demo.toml negeren
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 onafhankelijk auditen; alle introductie- en juridische inhoud aan de broncode toetsen en op volledigheid controleren
21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  feat(sys-setting): de functievlag ENABLE_OAUTH_INTEGRATION toevoegen, standaard uitgeschakeld om externe authenticatie-instellingen te verbergen
73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence
596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  docs(checklist): de uitbreiding EpomailDocs v5.11 archiveren (EpomailDocs ff4e93f+c597fca: modus- en instellingengidsen in zes talen, negen echte screenshots, versie 5.11 op de hele site en geslaagde lokale visuele controles)
```

De commit-keten van deze site (de aparte EpomailDocs-repository):

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): de juridische site v4.1 voor Taiwan afronden (zes talen, zeven documenten, 42 pagina's)
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: de indeling van aup-ladder.svg herbouwen om overlap weg te nemen; visuele goedkeuring vastleggen en het werk archiveren
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): de omleidingspagina voor het hoofdpad toevoegen en de 404 op / vervangen door overzichtsingangen in zes talen
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): een projectoverzicht in zes talen toevoegen met positionering, functies, architectuur, beveiliging en de volledige commit-keten
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): de oude externe documentatietak als voorouder behouden en de lokale juridische site in zes talen als leidende bestandsstructuur gebruiken
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): v5.0 verwijdert artikelnummers uit verwijzingen en synchroniseert zeven documenten en SVG-illustraties in zes talen
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): onafhankelijke auditcorrecties v5.1; blogniveaukoppeling aan de verwerkersinformatie toevoegen, tijdsgegevens corrigeren en hiaten in hulpmiddelen dichten
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): auditcorrecties vóór lancering; feiten over onveranderlijke bezorging van systeemmail corrigeren en vaste AI-vertaalsjablonen en robots.txt documenteren
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 voegt de bepaling over de officiële versie sitebreed toe en breidt het projectoverzicht uit met gebruiksgrenzen en veelgestelde vragen
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3 lost bevindingen uit de onafhankelijke herbeoordeling op en legt de publicatieroute docs.epocanvas.com/epomail vast
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 vult illustraties, begripsdefinities en ontbrekende bewaartermijnen aan en maakt verwijzingen nauwkeuriger
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 verwijdert ongefundeerde claims en harmoniseert zes talen; feiten aan broncode toetsen, negen en-documenten één-op-één hervertalen en vlakke diagrammen hertekenen
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): twaalf diagrammen naar zes talen lokaliseren zodat elk document afbeeldingen in de eigen taal gebruikt
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 lost alle P1/P2-bevindingen op, voegt acht secties toe, gebruikt één h1 per pagina en verzorgt de eerste openbare publicatie
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 verbetert vormgeving en ingangen met documentpictogrammen op paginatiekaarten, gecentreerde tabellen en Accept-Language-onderhandeling
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 splitst en verruimt de functie- en architectuurgidsen in zes talen, met echte productscreenshots en een gecentreerde inhoudskolom
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  chore: sync manifest commit hash for 08448fb
08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  feat(docs): v5.10 corrigeert drie P1-bevindingen tegen de broncode en alle P2-bevindingen van de onafhankelijke audit; de Engelse versie (en) aan de structuursymmetriecontrole toevoegen
ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  feat(docs): v5.11 breidt de projectintroductie uit met modus- en instellingengidsen in zes talen en neemt alle echte screenshots op in de repository
c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  chore: sync manifest commit hash for ff4e93f
```

De tabel en ankerketen hierboven zijn op mijlpaalniveau; elke reguliere fix, test en documentatiecommit tussen de fasen is bewaard in de git-geschiedenis en is één voor één te volgen via de [GitHub-commitgeschiedenis](https://github.com/shijianus/epomail/commits). De hoofdrepository bewaart daarnaast twee archiefbestanden, `CHECKLIST.log` (taakuitvoeringslog) en `REPORTS.md` (diepgaande auditrapporten), één-op-één gekoppeld aan de commits.

## 7. Kwaliteitsborging

- De map `tests/` bevat ruim honderd geautomatiseerde test-, audit- en inspectiescripts, met dekking van Playwright full-stack browserregressie, publieke end-to-end asserties tegen productie en statische scans van de hele repository;
- Historische controles: beveiliging 43/43, publieke routes 32/32, aanmelden in zes talen 62/62, visuele inspectie 33/33 en 369 integriteitsvergelijkingen; deze gelden voor de destijds geteste versies en omgevingen, niet als verificatie van de huidige versie of productie;
- De driedelige statische i18n-audit: `i18n-symmetry` (absoluut symmetrische sleutelsets over zes talen), `i18n-audit` (nul ontbrekende letterlijke verwijzingen) en `i18n-hardcoded` (nul ongeünpackte hardgecodeerde gebruikerszichtbare tekst);
- Testregels vereisen opruimen via `finally`; werkelijke resten moeten in uitvoeringsverslagen worden gecontroleerd. De regel garandeert niet dat database en KV altijd vrij van testgegevens zijn;
- De ontwikkeling volgt een vijfstaps-SOP (bereikbevestiging, gedisciplineerd coderen, full-stack testen, gedisciplineerde commits, rapportage bovenaan het antwoord), met uitvoer gesplitst naar `CHECKLIST.log` en `REPORTS.md`.

## 8. Het project ophalen en uitrollen

| Kanaal | Beschrijving |
| --- | --- |
| Gehoste instantie | Direct registreren en gebruiken op [mail.epocanvas.com](https://mail.epocanvas.com) |
| Zelf-hosting | Uitrollen op eigen domein en Cloudflare-account in drie stappen |
| Broncode | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) (MIT-licentie) |
| Mobiele app | De Android-app, epomail |

Minimale stappen voor zelf-hosting:

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

Bezoek na de eerste uitrol `/api/init/<jwt_secret>` om de database-initialisatie en het zaaien van de zes standaardrollen af te ronden; productiegeheimen worden altijd geïnjecteerd met `npx wrangler secret put`, en lokaal gebruik is `.dev.vars` (nooit ingecheckt).

De volledige randvoorwaarden, de initialisatieketen en de sleutelinjectie voor zelfhosting staan in de [Uitrolgids](/nl/mail/deployment/); bijdragen, auditen en ontwikkelen volgen de [Ontwikkelgids](/nl/mail/development/).
## 9. Veelgestelde vragen

**Kost het gebruik van deze dienst geld?**
De software is gratis onder de MIT-licentie; de kosten van selfhosting zijn uw eigen Cloudflare-verbruik. De gehoste instantie heeft momenteel geen betaalfuncties; het aantal mailboxen, het verzendvolume en de opslagquota worden per accountrol vastgesteld.

**Kan de beheerder mijn e-mail lezen?**
Beheerderszicht hangt af van de modus: Alles staat alle mail toe, Privé alleen spam, verwijderde en eigenaarloze mail, Versleuteld blokkeert deze leestoegang in de interface. De server behoudt ontsleutelmogelijkheden; dit is geen end-to-end-versleuteling. Zie het [Privacybeleid](/nl/mail/privacy-policy/) en [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

**Kan verwijderde e-mail worden hersteld?**
Prullenbakopschoning gebruikt een aanmaaktijd ouder dan 7 dagen; verplaatsen begint geen nieuwe termijn. Export bevat geselecteerde profiel- en niet-verwijderde mailvelden, zonder bijlagebestanden of volledige oorspronkelijke MIME. Bewaar bijlagen apart vóór verwijdering en controleer de export; zie het [Privacybeleid](/nl/mail/privacy-policy/).

**Wat is er nodig voor selfhosting?**
Nodig zijn een domein, Cloudflare-account en passende instellingen; zie sectie 8. Externe bezorging, opslag, identiteit, meldingen en AI kunnen gegevens verwerken; niet alles blijft gegarandeerd binnen Cloudflare. Zie de [Verwerkerslijst](/nl/mail/sub-processors/).

## 10. Gerelateerde documenten

| Bron | Link |
| --- | --- |
| De kortste snelstartreeksen en de verzend- en ontvangstcontrole van beide paden | [Snelstart](/nl/mail/quickstart/) |
| De route en elementen van elke interface | [Interface en routekaart](/nl/mail/interface/) |
| Zoekoperators en classificatieregelvoorwaarden | [Zoek- en regelreferentie](/nl/mail/search/) |
| Volledige stappen voor zelfhosting | [Uitrolgids](/nl/mail/deployment/) |
| Ontwikkelomgeving en engineeringproces | [Ontwikkelgids](/nl/mail/development/) |
| Wat de gehoste instantie biedt en haar ondersteuningskanalen | [Dienstomvang en ondersteuning](/nl/mail/service-scope/) |
| De open-sourcelicentie en de juridische positie van zelfhosting | [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/) |
| Werkingsmodi: implementatievormen, e-mailmodi en aanmelding | [Werkingsmodi](/nl/mail/modes/) |
| Instellingengids: persoonlijke instellingen en de beheerconsole | [Instellingengids](/nl/mail/settings/) |
| Privacy- en voorwaardenoverzicht | [Overzicht](/nl/mail/overview/) |
| Privacybeleid | [Privacybeleid](/nl/mail/privacy-policy/) |
| Servicevoorwaarden | [Servicevoorwaarden](/nl/mail/terms-of-service/) |
| Beleid voor acceptabel gebruik | [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
| Gegevensverwerking en beveiliging | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Verwerkerslijst | [Verwerkerslijst](/nl/mail/sub-processors/) |
| Begrippenlijst | [Begrippenlijst](/nl/mail/key-terms/) |
