---
title: Snelstart
description: Snelstart van EpoCanvas Mail — het kortste pad van registratie naar uw eerste verzonden e-mail op de gehoste instantie, en de volledige reeks van het klonen van de repository tot de verzend- en ontvangstcontrole op een zelfgehoste instantie.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Deze pagina behandelt registratie op de gehoste instantie (pad A) en zelf uitrollen (pad B). De onderstaande tijden zijn schattingen voor functionele ingebruikname, zonder juridische of beveiligingsvoorbereiding. De beschreven nieuwe registratie- en gegevenscontroles vereisen dat de bijgewerkte Worker, React-aanmeldinterface en Vue-instellingeninterface samen worden uitgerold en geconfigureerd; deze pagina bewijst niet dat een live-instantie is bijgewerkt of geverifieerd. Andere functies en instellingen staan in de afzonderlijke gidsen.

De Traditioneel Chinese (Taiwan) versie van de juridische documenten van deze site is de officiële versie; de andere talen zijn referentievertalingen en bij twijfel geldt de officiële versie.

![Twee EpoCanvas Mail-paden: dezelfde open code, met middelen en externe diensten gekozen door de werkelijke beheerder van elke instantie](/images/mail/nl/dual-nature-scale.svg)

*Figuur: beide paden draaien dezelfde code. Op de gehoste instantie moet de gebruiker zich bij registratie uitdrukkelijk akkoord verklaren door het vakje voor de [Servicevoorwaarden](/nl/mail/terms-of-service/) aan te vinken; het [Privacybeleid](/nl/mail/privacy-policy/) informeert over verwerking en is geen algemene toestemming. Vanaf het zelf uitrollen moet de uitroller de eigen rol beoordelen aan de hand van de feitelijke verwerking (zie [Overzicht van privacy en voorwaarden](/nl/mail/overview/), sectie 2).*

## 1. Kies een pad

| | Pad A: gehoste instantie | Pad B: zelf uitrollen |
| --- | --- | --- |
| Geschikt voor | Het product eerst uitproberen, zonder eigen infrastructuur | Al een domein en Cloudflare-account hebben en volledige datasoevereiniteit willen |
| Vereisten | Een browser | Een domein, een Cloudflare-account, Node.js en pnpm; uitgaande post vereist bovendien een afleverkanaal-account |
| Tijd | Ongeveer 10 minuten | Ongeveer 30 minuten |
| Kosten | Vooralsnog geen betaalfuncties | Het eigen Cloudflare-verbruik van de uitroller |
| Toegang | [mail.epocanvas.com](https://mail.epocanvas.com) | [Uitrolgids](/nl/mail/deployment/) |

## 2. Pad A: gehoste instantie

1. **Maak een account aan**: open [mail.epocanvas.com](https://mail.epocanvas.com), ga op de aanmeldpagina naar het registratieformulier, lees de door de instantie getoonde gegevens van de exploitant, de actuele versie van de voorwaarden en de [Servicevoorwaarden](/nl/mail/terms-of-service/), en vink het niet vooraf aangevinkte vakje «Ik aanvaard de servicevoorwaarden» aan voordat u een adres «voorvoegsel @ domein van de instantie» met een wachtwoord (6–30 tekens) indient. Het [Privacybeleid](/nl/mail/privacy-policy/) geeft hierbij informatie over de verwerking; één vakje is geen algemene privacytoestemming. Bij ontbrekende vereiste juridische informatie of voorwaardenversie wordt nieuwe registratie gesloten. Deze controle geldt alleen voor nieuwe registratie; bestaande aanmelding en administratieve initialisatie blijven beschikbaar. Of een uitnodigingscode of menselijke controle vereist is, beslist de instantieconfiguratie; vraag zo nodig de code aan de exploitant, of bereik het formulier rechtstreeks met de parameter `?code=`. Registratie werkt direct, zonder e-mailverificatielus.
2. **Controleer uw identiteitsgroep**: na registratie komt u in de standaardgroep van de instantie; registreert u met een uitnodigingscode, dan komt u in de groep waaraan die code is gebonden. De groep bepaalt het dagelijkse verzendquotum, het aantal mailboxen, de opslagquota en de bijlagerechten; de fabrieksstandaardwaarden staan in de [Werkingsmodi](/nl/mail/modes/), sectie 3.
3. **Ontvang uw eerste e-mail**: bekijk na registratie het welkomstbericht en stuur synthetische testinhoud vanuit een externe mailbox die u beheert om ontvangst te controleren. Extractie van verificatiecodes staat niet standaard aan: de instantie moet `verificationCodeEnabled` inschakelen en actuele verwerkingsinformatie verstrekken, en u moet uw standaard uitgeschakelde persoonlijke voorkeur aanzetten. Vertalen vereist per verzoek bevestiging van de actuele informatie; OCR van afbeeldingen vereist daarnaast een uitdrukkelijke keuze voor dat verzoek en inschakeling op de server. Terugval op openbare vertaling staat standaard uit. Zie de [Instellingengids](/nl/mail/settings/#optional-processing).
4. **Verstuur uw eerste e-mail**: open de schrijflaag via de schrijf-ingang in de zijbalk. Geadresseerden op de instantie krijgen de mail rechtstreeks afgeleverd; externe adressen gaan via het afleverkanaal dat de exploitant heeft ingesteld. Het uitgaande volume is begrensd door het dagelijkse verzendquotum, waarvan de teller elke dag herstelt.
5. **Zet automatisch sorteren aan**: vier labels staan fabrieksstandaard klaar — Gemeenschap, Abonnementen, Promoties en Werk — en nieuwe post wordt door ingebouwde heuristiek gesorteerd; eigen regels, uitzonderingen en prioriteiten staan in [Label- en classificatiebeheer](/nl/mail/labels/).
6. **Zet tweestapsverificatie aan**: onder «Instellingen → Beveiliging» koppelt u in drie stappen een authenticator-app (TOTP); na afloop verschijnen 10 eenmalige herstelcodes, die u offline bewaart. Stappen in de [Accountbeveiligingsgids](/nl/mail/security/).
7. **Koppel Telegram-push (optioneel)**: ontvang nieuwe mail in realtime via uw eigen bot, met een 7 dagen geldige leeslink op de site. Stappen in de [Gids voor meldingen en doorsturen](/nl/mail/notify/).
8. **Gegevens exporteren (optioneel)**: download onder «Instellingen → Gegevens» geselecteerde profiel- en niet-verwijderde mailvelden als JSON, zonder bijlagen, volledige oorspronkelijke MIME of alle beveiligingsinstellingen. Prullenbakopschoning gebruikt een aanmaaktijd ouder dan 7 dagen; bewaar bijlagen apart vóór verwijdering. Zie [Export](/nl/mail/data/), [Privacy](/nl/mail/privacy-policy/), [Beveiliging](/nl/mail/data-security/) en de [Verwerkerslijst](/nl/mail/sub-processors/).

## 3. Pad B: zelf uitrollen

1. **Loop de vereisten na**: een domein, een Cloudflare-account, Node.js en pnpm; uitgaande post vereist een afleverkanaal-account zoals Resend of Mailjet. De volledige lijst staat in de [Uitrolgids](/nl/mail/deployment/), sectie 1. Bouw vóór een koude uitrol eerst `temp_login_ui` (React) en daarna `mail-vue` (Vue); de `mail-vue`-build kopieert het aanmeldscherm naar de statische Worker-assets.
2. **Bouwen en uitrollen**: bouw de interfaces en rol de Worker in deze volgorde uit (het uitroldoel en aangepaste domeinen stelt u in `wrangler.toml` in):

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail
pnpm --dir mail-worker install --frozen-lockfile
node scripts/build-prod.mjs
```

3. **Stel geheimen in en rol uit**: voer vanuit de repositoryroot `pnpm --dir mail-worker exec wrangler secret put jwt_secret` en `pnpm --dir mail-worker exec wrangler secret put totp_enc_key` uit; een afzonderlijk `init_secret`, op dezelfde manier ingesteld, wordt aanbevolen. Voer daarna `pnpm --dir mail-worker exec wrangler deploy` uit. Geef waarden via de interactieve vragen op, nooit in URL's, versiebeheerde bestanden of openbare voorbeelden.
4. **Initialiseer en configureer informatie**: stuur `POST /api/init` via HTTPS met `init_secret` in de header `x-init-secret` (alleen terugval op `jwt_secret` als geen apart geheim is ingesteld) om tabellen, standaardgroepen en het hoofdaccount aan te maken. Houd een eventueel initieel wachtwoord uit het antwoord privé en wijzig het meteen. Meld u aan bij beheer en vul de [informatie van de exploitant](/nl/mail/settings/#operator-notice) in voordat u registratie opent; ontbrekende gegevens blokkeren de beheerinitialisatie of bestaande aanmelding niet.
5. **Sluit de ontvangst aan**: zet Email Routing voor het domein aan in het Cloudflare-dashboard en routeer de doeladressen naar de Worker; inkomende post wordt bij aankomst geparseerd.
6. **Sluit de verzending aan**: stel het afleverkanaal in de systeeminstellingen in; tot die tijd kunnen mailboxen op de instantie elkaar nog wel direct afleveren.
7. **Controleer verzenden en ontvangen**: gebruik in een geïsoleerde testomgeving speciale accounts en synthetische gegevens voor de aanvaarding van voorwaarden bij registratie, welkomstmail, interne uitwisseling en extern verzenden en ontvangen; publiceer geen productiegegevens voor toegang. Dit zijn functionele rooktests, geen bewijs dat beveiliging, privacy, verwijdering of juridische voorbereiding voltooid zijn of dat de dienst direct voor echte gebruikers kan worden geopend.
8. **Bevestig uw juridische positie**: beoordeel rollen volgens wie feitelijk doelen en middelen bepaalt; zelfhosting maakt u niet automatisch de enige verwerkingsverantwoordelijke. Publiceer werkelijke identiteit, locatie, contactgegevens en het wettelijk vereiste adres, en controleer ontvangers, geldige contracten, doorgifte en bewaartermijnen. Sjablonen of ingevulde instellingen bewijzen deze feiten niet. Zie [Open source en zelfhosting: juridisch kader](/nl/mail/open-source/).

## 4. En daarna

- Volledig functieoverzicht en bediening per interface: de [Functiegids](/nl/mail/features/), de [Interface en routekaart](/nl/mail/interface/);
- Zoeken en automatisering: de [Zoek- en regelreferentie](/nl/mail/search/), [Label- en classificatiebeheer](/nl/mail/labels/);
- Beheerconfiguratie en werkingsmodi: de [Instellingengids](/nl/mail/settings/), de [Werkingsmodi](/nl/mail/modes/);
- Bij problemen: ondersteuningskanalen in [Dienstomvang en ondersteuning](/nl/mail/service-scope/), sectie 4; dienstgrenzen en bewaartermijnen in sectie 2 van die pagina.
