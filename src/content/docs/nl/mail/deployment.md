---
title: Uitrolgids
description: De uitrolgids van EpoCanvas Mail — vereisten, de uitrol in drie stappen, initialisatie en de bootstrapketen, injectie van geheimen, mailconfiguratie, opslagkeuzes, de demo-instantie en upgrades.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.15**

Deze pagina is voor gebruikers en beheerders die EpoCanvas Mail zelf willen uitrollen; zij beslaat het volledige pad van nul tot een werkende instantie. Eenmaal uitgerold leven alle instantiegegevens in de eigen Cloudflare-bronnen van de uitroller, en wordt de uitroller de gegevensbeheerder voor diens gebruikers — de juridische positie staat uiteengezet in [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/). Het gebruik van de gehoste instantie ([mail.epocanvas.com](https://mail.epocanvas.com)) vraagt om geen van deze stappen.

![Systeemarchitectuur van EpoCanvas Mail: de clientlaag (webapp, Android-app, OAuth-apps van derden) verbindt via de Cloudflare-edge; Workers dragen de API, de verwerking van inkomende e-mail en de AI-mogelijkheden, met uitgaande verzending via Resend en Telegram; gegevens worden opgeslagen in dubbele D1-databases, KV en objectopslag](/images/mail/nl/project-architecture.svg)

*Figuur: de draaiende topologie na uitrol. Geen server als single point of failure; elke component draait binnen de gemeterde quota's van Cloudflare.*

## 1. Vereisten

| Categorie | Vereiste |
| --- | --- |
| Verplicht | Eén domein; één Cloudflare-account; Node.js en pnpm |
| Uitgaande mail | Een afleverkanaalaccount zoals Resend of Mailjet (vereist voor verzending naar buiten de instantie) |
| Inkomende mail | Cloudflare Email Routing (het aanzetten van de e-mailroutering van het domein is voldoende) |
| Optioneel | Backblaze B2 of S3-eigen opslag, een externe Turso-database, een Telegram-bot, Turnstile, sleutels van AI-aanbieders |

## 2. Uitrol in drie stappen

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

De front-endbuild vouwt de aanmeldpagina in de statische middelen van de Worker, zodat één uitrol de complete site oplevert; het uitroldoel en eigen domeinen worden in `wrangler.toml` geconfigureerd.

## 3. Initialisatie en de bootstrapketen

Na de eerste uitrol bezoekt u `/api/init/<jwt_secret>` (waarbij de padparameter wordt vervangen door de geheimwaarde die de uitroller kiest). Deze ingang maakt elke databasetabel aan, zaait de zes standaardidentiteitsgroepen (Bezoeker, Gewone gebruiker, Gewone gebruiker LV.0, Gewone gebruiker LV.1, Moderator, Meester) en initialiseert het primaire meesteraccount.

- De bootstrapketen is ontwerpshalve idempotent: upgradefuncties controleren kolommen met `PRAGMA table_info` voordat zij `ALTER TABLE` uitvoeren, dus herhaalde bezoeken hebben geen neveneffecten;
- Na het wissen van `.wrangler/state` voor een koude start voltooit die ene ingang het volledige zaaien end-to-end — met de hand gedraaide SQL is nooit nodig.

## 4. Geheimensysteem

| Geheim | Injectie in productie | Lokale ontwikkeling |
| --- | --- | --- |
| `jwt_secret` (sessieondertekening) | `npx wrangler secret put jwt_secret` | bestand `.dev.vars` |
| `totp_enc_key` (versleuteling van 2FA-geheimen) | `npx wrangler secret put totp_enc_key` | bestand `.dev.vars` |

- `.dev.vars` wordt door `.gitignore` uitgesloten en nooit gecommit; het ingecheckte malplaatje is `.dev.vars.example`;
- Schrijf nooit een productiegeheim in platte tekst in `wrangler.toml` of enig ander versiebeheerd bestand;
- De `jwt_secret` in het initialisatiepad is het geheim voor sessieondertekening; de twee moeten overeenkomen.

## 5. Mailstromen en systeemmail

- Inkomend: zet Email Routing voor het domein aan in het Cloudflare-dashboard en routeer de doeladressen naar de Worker; mail wordt bij aankomst geparseerd;
- Uitgaand: zodra een afleverkanaal (zoals Resend) in de systeeminstellingen is geconfigureerd, wordt mail naar buiten de instantie erdoorheen verzonden; zonder zo'n kanaal werkt alleen directe aflevering binnen de instantie;
- Systeemmail (welkomstmail, beveiligingskennisgevingen, aankondigingsmail) wordt vanuit ingebouwde sjablonen opgemaakt in de taal van de ontvanger: knoppen in de welkomstmail zoals «open de postvak IN» zijn relatieve paden binnen de site waarvan het landingsgedrag afhangt van hoe de mailclient relatieve koppelingen behandelt, terwijl beveiligingskennisgevingen absolute koppelingen op het domein van de instantie gebruiken. Zelfhosters kunnen de formuleringen en de afzendersignatuur via de sjabloonconstanten aanpassen; de afleversemantiek van officiële mail staat in [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/).

## 6. Opslag- en databasekeuzes

| Component | Standaard | Alternatieven |
| --- | --- | --- |
| Gebruikers- en maildatabases | Cloudflare D1 met fysieke scheiding van dubbele databases (100% achterwaarts compatibel met één database) | Turso of een andere externe database (geconfigureerd in de systeeminstellingen) |
| Bijlagen en objecten | Cloudflare R2 | Backblaze B2 of een eigen S3-bucket |
| Cache | Workers KV | — |

De opslaghiërarchie en quotummeting staan beschreven in [Technische architectuur](/nl/mail/architecture/); individuen kunnen bovendien hun eigen opslag koppelen zodat bijlagen rechtstreeks in hun cloud belanden, zie de [Instellingengids](/nl/mail/settings/), sectie 5.

## 7. Demo-instantie

Voor lokale repetitie kan een demostack zonder publieke blootstelling worden gedraaid: start `mail-worker` met `wrangler dev` en zaai demomail en multi-accountstatus met het demo-seedscript van de repository. Demogegevens leven alleen in lokale `.wrangler/state` (uitgesloten door `.gitignore`) en bereiken nooit de repository of productie; de productscreenshots op deze site zijn afkomstig uit die demo-instantie.

## 8. Upgrades en terugrol

- Upgrade: `git pull` voor de nieuwste code → de front-end opnieuw bouwen → `wrangler deploy`; datamigraties lopen idempotent met de bootstrapketen mee en kunnen veilig worden herhaald;
- Versiecontrole: de kaart «Over» in de systeeminstellingen toont de instantieversie en controleert op updates;
- Terugrol: direct terugdraaien via de uitrolgeschiedenis van Cloudflare Workers, of een oudere commit opnieuw uitrollen.

## 9. Verwante documenten

| Bron | Link |
| --- | --- |
| Werkingsvormen en rolquota na initialisatie | [Werkingsmodi](/nl/mail/modes/) |
| Ontwikkelomgeving, testsuites en engineerediscipline | [Ontwikkelgids](/nl/mail/development/) |
| Configuratie op instantieniveau in detail | [Instellingengids](/nl/mail/settings/) |
| De juridische positie van de uitroller en de licentie | [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/) |
| Technische topologie en versleuteling | [Technische architectuur](/nl/mail/architecture/) |
