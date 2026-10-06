---
title: Ontwikkelgids
description: De ontwikkelgids van EpoCanvas Mail — repositorystructuur, lokale omgeving, test- en inspectiesuites, de zestaligheidsdiscipline, migratiediscipline, de vijfstapsworkflow en hoe u bijdraagt.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.16**

Deze pagina is voor beheerders en ontwikkelaars die aan EpoCanvas Mail werken, deze auditen of erop voortbouwen: de repositorystructuur, de lokale omgeving, het kwaliteitsborgingssysteem en de werkwijze. De stappen voor het uitvoeren van een uitrol staan in de [Uitrolgids](/nl/mail/deployment/); die worden hier niet herhaald.

## 1. Repositorystructuur

```text
epomail/
├── mail-vue/        Front end: Vue 3 + Vite + Element Plus (interface, i18n dictionaries, PWA)
├── mail-worker/     Back end: Cloudflare Worker (API, inbound parsing, AI, D1/KV/R2)
├── temp_login_ui/   Login surface: React app (folded into mail-worker/dist/login at build time)
├── tests/           Automated tests, public end-to-end assertions and inspection scripts
├── scripts/         Tooling (the i18n audit trio, seeding, build helpers)
├── doc/             Archive of long-form analyses
├── EpomailDocs/     This documentation site (a separate git repository)
└── CHECKLIST.log / REPORTS.md   Task log and audit archive
```

## 2. Lokale omgeving

```bash
pnpm install                      # install dependencies at the repository root
cd mail-vue && npm run dev        # front-end dev server
cd mail-vue && npm run build      # front-end build (delivery gate: zero warnings, zero errors)
cd mail-worker && npx wrangler dev  # local full stack (127.0.0.1:8787)
```

Lokale geheimen leven in `mail-worker/.dev.vars` (nooit gecommit; malplaatje in `.dev.vars.example`); na het wissen van `.wrangler/state` zaait een bezoek aan `/api/init/<jwt_secret>` een complete demodataset vanaf nul, zie de [Uitrolgids](/nl/mail/deployment/), sectie 3.

## 3. Tests en inspecties

- De map `tests/` bevat meer dan honderd geautomatiseerde scripts: Playwright-full-stack-browserregressies, end-to-end-asserties tegen productie over het publieke netwerk, statische scans over de hele repository en integriteitsvergelijkingen byte voor byte;
- Representatieve cijfers: beveiligingsverharding 43／43 asserties, publieke routering end-to-end 32／32, aanmeldpagina in zes talen 62／62, productie-integriteit 369 vergelijkingen byte voor byte;
- Interface- of API-wijzigingen moeten eerst bouwen (`vite build` plus een compileercontrole van de Worker) en daarna een lokale full-stack-run doorstaan; testgegevens worden altijd fysiek opgeruimd in `finally`-blokken, zodat er nul nepgegevens achterblijven in databases of KV.

## 4. De zestaligheidsdiscipline

De interface- en backendwoordenboeken ondersteunen zh, zh-Hant, en, es, fr en nl met absoluut symmetrische sleutelsets. Na het toevoegen of wijzigen van ingangen moet de driedelige statische audit slagen:

```bash
node scripts/i18n-symmetry.mjs      # six-language key sets absolutely symmetric
node scripts/i18n-audit.mjs         # zero missing literal references in code
node scripts/i18n-hardcoded.mjs     # zero unwrapped user-visible strings
```

Systeemmail en welkomstmail worden afgeleverd in de taal van de ontvanger; nieuwe voor gebruikers zichtbare tekst gaat altijd via een woordenboeksleutel en wordt nooit hardgecodeerd.

## 5. Migratiediscipline

- Tabeldefinities worden op één plaats onderhouden: de `CREATE TABLE`-statements in het initialisatiemodule van de backend;
- Elke kolomwijziging gaat vergezeld van een upgradefunctie (`vN_NDB`) die met `PRAGMA table_info` controleert voordat zij `ALTER TABLE ADD COLUMN` uitvoert, zodat deze idempotent blijft;
- Een verse koude start voltooit alle tabelcreatie en het zaaien van de zes standaardrollen uitsluitend via `/api/init/<jwt_secret>` — migraties mogen nooit afhangen van met de hand gedraaide SQL.

## 6. Werkwijze

De ontwikkeling volgt een SOP in vijf stappen:

1. Bereik: begrens de impactradius over API's, tabellen, componenten, woordenboeken en stijlen;
2. Implementatie: volg de bestaande architectuur, met eerbiediging van de donkere modus en de mobiele indeling, met nette degradatie en defensieve standaardinstellingen;
3. Full-stackverificatie: bouwcontroles, het regressiepakket, browsertests en opruiming van nepgegevens;
4. Gedisciplineerde commits: gestructureerde commitberichten; uitvoeringsdossiers gaan naar `CHECKLIST.log` (routinelog) of `REPORTS.md` (specifieke audits) — de governancedocumenten zelf dragen nooit logs;
5. Gerapporteerde hashes: elk rapport naar buiten begint met de volledige commit-hash, voor traceerbaarheid.

## 7. Ontwikkeling van de documentatiesite

Deze site (EpomailDocs) is een aparte git-repository, gebouwd op Astro 5 en Starlight, per document structureel symmetrisch over de zes talen (met het traditioneel Chinees als formele basis):

```bash
pnpm build                          # build (regenerates the anti-tampering manifest)
node scripts/validate-anchors.cjs   # zero broken anchors site-wide
python scripts/check-structure.py   # six-language structural symmetry
python scripts/verify-laws.py       # legal citations match the verified register
```

Elke build regenereert het `tamper-proof.json`-manifest; een documentatiewijziging wordt in twee stappen gecommit — de inhoudscommit, daarna een commit die het manifest op die hash vastzet.

## 8. Bijdragen

- Bugrapporten en functievoorstellen gaan via de Issues van de GitHub-repository; codebijdragen via Pull Requests (`github.com/shijianus/epomail`);
- Bijdragen volgen de bestaande conventies voor commitberichten en de toegangspoorten op deze pagina;
- Beveiligingskwetsbaarheden mogen niet in openbare issues worden onthuld — meld ze privé via de contactpunten in het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/), sectie 5;
- De licentiestelling van bijdragen en van het project staat in [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/).

## 9. Verwante documenten

| Bron | Link |
| --- | --- |
| Stappen om een uitrol uit te voeren | [Uitrolgids](/nl/mail/deployment/) |
| Technische topologie en beveiligingsontwerp | [Technische architectuur](/nl/mail/architecture/) |
| Dienstomvang en ondersteuningskanalen | [Dienstomvang en ondersteuning](/nl/mail/service-scope/) |
| Positionering van het project en de commitketen | [Projectoverzicht](/nl/mail/project/) |
