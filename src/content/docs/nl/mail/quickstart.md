---
title: Snelstart
description: Snelstart van EpoCanvas Mail — het kortste pad van registratie naar uw eerste verzonden e-mail op de gehoste instantie, en de volledige reeks van het klonen van de repository tot de verzend- en ontvangstcontrole op een zelfgehoste instantie.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.21**

Deze pagina geeft de kortste reeksen handelingen voor twee paden: pad A registreert op de gehoste instantie en loopt van aanmelding tot een eerste verzonden e-mail in zo'n tien minuten; pad B zet de hele dienst uit op uw eigen domein en Cloudflare-account, van het klonen van de repository tot de verzend- en ontvangstcontrole in zo'n dertig minuten. Beide paden draaien dezelfde code met dezelfde interface; deze pagina noemt alleen acties en resultaten, met links naar de speciale pagina's voor functiesemantiek en configuratie, en alles volgt de open-sourceimplementatie.

De Traditioneel Chinese (Taiwan) versie van de juridische documenten van deze site is de officiële versie; de andere talen zijn referentievertalingen en bij twijfel geldt de officiële versie.

![Twee EpoCanvas Mail-paden: dezelfde open code, met middelen en externe diensten gekozen door de werkelijke beheerder van elke instantie](/images/mail/nl/dual-nature-scale.svg)

*Figuur: beide paden draaien dezelfde code. Voor de gehoste instantie kiest u haar [Privacybeleid](/nl/mail/privacy-policy/) en [Servicevoorwaarden](/nl/mail/terms-of-service/); vanaf het moment van zelfuitrol wordt de uitroller de verwerkingsverantwoordelijke voor zijn gebruikers (zie [Overzicht van privacy en voorwaarden](/nl/mail/overview/), sectie 2).*

## 1. Kies een pad

| | Pad A: gehoste instantie | Pad B: zelf uitrollen |
| --- | --- | --- |
| Geschikt voor | Het product eerst uitproberen, zonder eigen infrastructuur | Al een domein en Cloudflare-account hebben en volledige datasoevereiniteit willen |
| Vereisten | Een browser | Een domein, een Cloudflare-account, Node.js en pnpm; uitgaande post vereist bovendien een afleverkanaal-account |
| Tijd | Ongeveer 10 minuten | Ongeveer 30 minuten |
| Kosten | Vooralsnog geen betaalfuncties | Het eigen Cloudflare-verbruik van de uitroller |
| Toegang | [mail.epocanvas.com](https://mail.epocanvas.com) | [Uitrolgids](/nl/mail/deployment/) |

## 2. Pad A: gehoste instantie

1. **Maak een account aan**: open [mail.epocanvas.com](https://mail.epocanvas.com), ga op de aanmeldpagina naar het registratieformulier en dien een adres «voorvoegsel @ domein van de instantie» met een wachtwoord (6–30 tekens) in. Of registratie een uitnodigingscode vereist en of een menselijke controle meekomt, beslist de instantieconfiguratie; vraag zo nodig de code aan de exploitant, of bereik het formulier rechtstreeks met de parameter `?code=`. Registratie werkt direct, zonder e-mailverificatielus.
2. **Controleer uw identiteitsgroep**: na registratie komt u in de standaardgroep van de instantie; registreert u met een uitnodigingscode, dan komt u in de groep waaraan die code is gebonden. De groep bepaalt het dagelijkse verzendquotum, het aantal mailboxen, de opslagquota en de bijlagerechten; de fabrieksstandaardwaarden staan in de [Werkingsmodi](/nl/mail/modes/), sectie 3.
3. **Ontvang uw eerste e-mail**: zodra de registratie slaagt, wordt automatisch een welkomstmail afgeleverd; die staat bij het aanmelden al voor u klaar. Stuur daarna vanuit een willekeurige externe mailbox een teste-mail met een verificatiecode naar uw nieuwe adres: de code wordt automatisch door Workers AI geëxtraheerd en in grote letters met een groene badge getoond in de lijst en de detailweergave (zie de [Functiegids](/nl/mail/features/), sectie 5).
4. **Verstuur uw eerste e-mail**: open de schrijflaag via de schrijf-ingang in de zijbalk. Geadresseerden op de instantie krijgen de mail rechtstreeks afgeleverd; externe adressen gaan via het afleverkanaal dat de exploitant heeft ingesteld. Het uitgaande volume is begrensd door het dagelijkse verzendquotum, waarvan de teller elke dag herstelt.
5. **Zet automatisch sorteren aan**: vier labels staan fabrieksstandaard klaar — Gemeenschap, Abonnementen, Promoties en Werk — en nieuwe post wordt door ingebouwde heuristiek gesorteerd; eigen regels, uitzonderingen en prioriteiten staan in [Label- en classificatiebeheer](/nl/mail/labels/).
6. **Zet tweestapsverificatie aan**: onder «Instellingen → Beveiliging» koppelt u in drie stappen een authenticator-app (TOTP); na afloop verschijnen 10 eenmalige herstelcodes, die u offline bewaart. Stappen in de [Accountbeveiligingsgids](/nl/mail/security/).
7. **Koppel Telegram-push (optioneel)**: ontvang nieuwe mail in realtime via uw eigen bot, met een 7 dagen geldige leeslink op de site. Stappen in de [Gids voor meldingen en doorsturen](/nl/mail/notify/).
8. **Gegevens exporteren (optioneel)**: download onder «Instellingen → Gegevens» geselecteerde profiel- en niet-verwijderde mailvelden als JSON, zonder bijlagen, volledige oorspronkelijke MIME of alle beveiligingsinstellingen. Prullenbakopschoning gebruikt een aanmaaktijd ouder dan 7 dagen; bewaar bijlagen apart vóór verwijdering. Zie [Export](/nl/mail/data/), [Privacy](/nl/mail/privacy-policy/), [Beveiliging](/nl/mail/data-security/) en de [Verwerkerslijst](/nl/mail/sub-processors/).

## 3. Pad B: zelf uitrollen

1. **Loop de vereisten na**: een domein, een Cloudflare-account, Node.js en pnpm; uitgaande post vereist een afleverkanaal-account zoals Resend of Mailjet. De volledige lijst staat in de [Uitrolgids](/nl/mail/deployment/), sectie 1.
2. **Rol uit in drie commando's**: voer het volgende in een terminal uit (het uitroldoel en aangepaste domeinen stelt u in `wrangler.toml` in):

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

3. **Initialiseer**: bezoek na de eerste uitrol `/api/init/<jwt_secret>` om alle tabellen aan te maken, de zes standaardidentiteitsgroepen te zaaien en het primaire meesteraccount te initialiseren; de bootstrapketen is idempotent en veilig te herhalen.
4. **Injecteer de geheimen**: in productie injecteert u `jwt_secret` en `totp_enc_key` via `npx wrangler secret put`; voor lokale ontwikkeling gebruikt u `.dev.vars` (nooit in de repository). De geheimwaarde in het initialisatiepad moet gelijk zijn aan het sessieondertekeningsgeheim.
5. **Sluit de ontvangst aan**: zet Email Routing voor het domein aan in het Cloudflare-dashboard en routeer de doeladressen naar de Worker; inkomende post wordt bij aankomst geparseerd.
6. **Sluit de verzending aan**: stel het afleverkanaal in de systeeminstellingen in; tot die tijd kunnen mailboxen op de instantie elkaar nog wel direct afleveren.
7. **Controleer verzenden en ontvangen**: registreer een testaccount en bevestig de welkomstmail; wissel één interne e-mail uit tussen het testaccount en het primaire meesteraccount; stuur na het instellen van het afleverkanaal één externe e-mail en bevestig de aflevering. Zijn de vier controles geslaagd, dan is de uitrol voltooid.
8. **Bevestig uw juridische positie**: vanaf het moment van zelfuitrol is de uitroller de verwerkingsverantwoordelijke voor zijn gebruikers en is hij hen informatie- en beveiligingsplichten verschuldigd; de juridische documenten van deze site kunnen als basissjabloon dienen (zie [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/)).

## 4. En daarna

- Volledig functieoverzicht en bediening per interface: de [Functiegids](/nl/mail/features/), de [Interface en routekaart](/nl/mail/interface/);
- Zoeken en automatisering: de [Zoek- en regelreferentie](/nl/mail/search/), [Label- en classificatiebeheer](/nl/mail/labels/);
- Beheerconfiguratie en werkingsmodi: de [Instellingengids](/nl/mail/settings/), de [Werkingsmodi](/nl/mail/modes/);
- Bij problemen: ondersteuningskanalen in [Dienstomvang en ondersteuning](/nl/mail/service-scope/), sectie 4; dienstgrenzen en bewaartermijnen in sectie 2 van die pagina.
