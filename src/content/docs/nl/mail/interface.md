---
title: Interface en routekaart
description: Interface en routekaart van EpoCanvas Mail — de acht mailboxweergaven, het schrijfvenster als overlay, elke instellings- en beheerroute, de aanmeldflows, de OAuth-toestemmingspagina en openbare profielen.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.17**

Deze pagina loopt elke interface van EpoCanvas Mail langs met de bijbehorende route. Een locatie bestaat uit twee delen: het padvoorvoegsel `/mail/u/N/` (N is de sessie-index voor meerdere accounts; bij één account altijd 0) en de weergaveroute na `#` (bijvoorbeeld `#inbox`). Oudere directe paden zoals `/inbox` worden automatisch genormaliseerd. De aanmeldpagina wordt apart uitgerold onder `/login/`. Wat elke route toestaat, wordt bepaald door de rechten van de identiteitsgroep, zie [Werkingsmodi](/nl/mail/modes/); het effect van elke instelling staat beschreven in de [Instellingengids](/nl/mail/settings/).

![Panorama van de postvak IN van EpoCanvas Mail: links de toegang voor het schrijven van mail en de mappenboom, rechts de lijst met verificatiecodebadges en officiële markeringen (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/views-guide.png)

*Figuur: de postvak IN (`#inbox`). De acht weergaven delen één lijststructuur; tellers en labels blijven gesynchroniseerd.*

<details>
<summary>Visuele handleiding: De inbox in één oogopslag —  de vier meestgebruikte ingangen</summary>

De vier gemarkeerde gebieden van deze panoramafoto van het postvak IN komen overeen met de vier ingangen die dagelijks het meest worden gebruikt: een nieuw bericht schrijven, belangrijke mail terugvinden, uitgestelde zaken nakijken en controleren wat er verzonden is.

1. **Schrijven (hoofdknop boven in de zijbalk)**: De enige ingang voor nieuwe mail: een klik opent het schrijfvenster als overlay (geen eigen route). Op mobiel wordt het een zwevende knop, en de diepe link `?composeTo=<address>` vult de geadresseerde alvast in. Vanuit elke weergave te gebruiken.
2. **Met ster (map in de zijbalk)**: Alle mail met een ster komt hier ongeacht de map samen: klik op het sterpictogram in een lijstrij om een bericht toe te voegen. Gebruik het voor mail die je bij de hand wilt houden; de teller in de zijbalk werkt realtime bij.
3. **Uitgesteld (map in de zijbalk)**: Een wachtruimte voor uitgestelde opvolging, met twee niveaus («dringend» en «wachtend»). Kies bij een bericht «Uitstellen» met een tijdstip; zodra die tijd aanbreekt, keert het automatisch terug bovenaan het postvak IN, zodat belangrijke zaken niet wegzakken.
4. **Verzonden (map in de zijbalk)**: Het archief van alles wat dit account heeft verzonden. Het uitgaande volume is begrensd door het dagelijkse quotum van de rol; mail binnen de site wordt rechtstreeks afgeleverd, mail naar buiten gaat via het afleverkanaal.

</details>

## 1. Hoofdinterface van de mailbox

Na het aanmelden is de hoofdinterface naar weergaveroute georganiseerd. De negen routes:

| Weergaveroute | Interface | Hoofdinhoud |
| --- | --- | --- |
| `#inbox` | Postvak IN | Standaardweergave; tijdsvolgorde op- of aflopend, gepeilde incrementele invoeging van nieuwe mail, gevirtualiseerde lijst, ongelezenstipjes, gespreksgroepering |
| `#all` | Alle e-mail | Geaggregeerde weergave over mappen heen; klikken op een zijbalklabel springt hierheen, gefilterd op dat label |
| `#message` | Berichtdetail | Beantwoorden／allen beantwoorden／doorsturen, ster geven, gelezen／ongelezen, verplaatsen naar, melden als spam, uitstellen, labelen, emoji-reacties, AI-volledige vertaling, afdrukken van een bericht of gesprek, .eml-download, originele headers, blokkeren van de afzender, aanmaken van filters vanaf hier |
| `#sent` | Verzonden | Mail verzonden door het account |
| `#drafts` | Concepten | Lokale concepten; leeg gelaten geadresseerden tonen een plaatsvervangende markering |
| `#starred` | Met ster | Verzameling van mail met ster |
| `#snoozed` | Uitgesteld | Niveaus «dringend» en «wachtend»; keert automatisch terug in de postvak IN wanneer het zover is |
| `#spam` | Spam | Mail die door het systeem of door gebruikers als spam is beoordeeld |
| `#trash` | Prullenbak | Verwijderde mail; zeven dagen na ontvangst fysiek gewist |

Schrijven is een overlay in plaats van een route, getriggerd vanaf drie plaatsen: de knop «Schrijven» in de zijbalk, de zwevende knop op mobiel (verzendrecht vereist) en de diepe link `?composeTo=<address>` (opent het schrijfvenster met de geadresseerde al ingevuld).

![Schrijfvenster van EpoCanvas Mail: de afzender is vastgezet op de huidige mailbox, de werkbalk voor tekstopmaak met bijlagen en de verzendknop](/images/mail/ui/ui-compose.png)

*Figuur: het schrijfvenster als overlay. Mailboxen op de instantie krijgen de mail rechtstreeks afgeleverd; e-mail naar buiten gaat via het afleverkanaal van de exploitant.*

<details>
<summary>Visuele handleiding: Het schrijfvenster regio voor regio, van boven naar beneden</summary>

Het schrijfvenster van boven naar beneden: de vastgezette afzender, geadresseerden en onderwerp, de werkbalk voor tekstopmaak, het gebied om de body te bewerken en de actiebalk onderaan.

- **Afzenderregel**: De afzender is vergrendeld op de mailbox waarmee je bent aangemeld en is tijdens het schrijven niet te bewerken, dus mail vanaf dit platform kan geen vervalste From dragen. Accounts met meerdere mailboxen wisselen hier van verzendidentiteit; de ontvanger ziet de gekozen mailbox. Het afzenderadres bepaalt ook via welk afleverkanaal de uitgaande mail gaat.
- **Regels voor geadresseerden en onderwerp**: Geadresseerden accepteren contactselectie en de diepe link `?composeTo=`; het onderwerp verschijnt in de lijst en is doorzoekbaar met `subject:`.
- **Werkbalk en body**: 17 opmaakhulpmiddelen: alinea, tekengrootte, tekststijlen, kleur, uitlijning, lijsten, citatie, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus.
- **Actiebalk onderaan**: De knop voor bijlagen (per rol ingeschakeld, met een limiet per bestand die per instantie is ingesteld) en de verzendknop; aflevering binnen de site is direct, naar buiten gaat het via het kanaal van de exploitant.

</details>

## 2. Opbouw van de interface

De hoofdinterface bestaat uit vier gebieden:

| Gebied | Onderdelen |
| --- | --- |
| Bovenbalk | Zoekvak (mailzoeken op mailpagina's, instellingenzoeken op instellingenpagina's, zie de [Zoek- en regelreferentie](/nl/mail/search/)), schakelaar licht／donker, hulp, meldingsbel (getoond wanneer er ongelezen meldingen zijn), accountmenu (avatar, opslagbalk, accountgegevens, instellingen, afmelden; de voettekst van het menu draagt externe koppelingen naar de projectintroductie, het privacybeleid en de servicevoorwaarden; de multi-accountmodus voegt wisselen, toevoegen en overal afmelden toe) |
| Zijbalk | Knop «Schrijven», acht mappenavigatie-items met ongelezentellers, het labelgebied (tot 7) en de ingang voor nieuwe labels |
| Statusbalk | Verbindingsstatus, tijdstip van de laatste synchronisatie, ongelezenteller, badge van de e-mailmodus (aangegeven in de versleutelde modus) en versienummer |
| Hoofdgebied | De lijst of het detail van de huidige weergave |

Onder een breedte van 1025 pixels klapt de zijbalk in tot een lade die met een afschermvlak wordt opgeroepen en bij routewissel automatisch sluit.

## 3. Instellingszone

Bij het binnengaan van de instellingen wisselt het hoofdgebied naar instellingspanelen en verdwijnt de mailzijbalk. Vijf sectieroutes:

| Sectieroute | Sectie | Inhoud |
| --- | --- | --- |
| `#settings/profile` | Persoonlijk | Avatar, bijnaam, geslacht, verjaardag, e-mail, telefoon en adressen |
| `#settings/general` | Algemeen | Bio, uiterlijkpalet, themaachtergrond, leesvoorkeuren, taal en gegevensprivacy |
| `#settings/security` | Beveiliging | Gebruikersnaam en wachtwoord, tweestapscentrum, toegangssleutels, account verwijderen |
| `#settings/data` | Gegevens | Data-export, meldingen en doorsturen, autorisaties van apps van derden, opslag |
| `#settings/labels` | Labels | Labelbeheer en de regeleditor voor classificatie |

![Algemene instellingenpagina van EpoCanvas Mail: personalisatiegedeelte, themaachtergrond en uiterlijkpalet](/images/mail/ui/ui-settings-general.png)

*Figuur: de sectie Algemeen. De vijf instellingssecties delen één structuur; de linkerkolom is de sectienavigatie.*

<details>
<summary>Visuele handleiding: De instellingenomlijsting —  de linkerkolom en het rechterpaneel</summary>

Zo ziet de sectie Algemeen in de instellingen eruit: de linkerkolom navigeert de vijf instellingssecties, het rechterpaneel bevat de algemene items (uiterlijkpalet, themaachtergrond, …).

- **Sectienavigatie links**: Wisselt tussen de vijf secties Profiel/Algemeen/Beveiliging/Gegevens/Labels; zodra je de instellingen binnengaat, verdwijnt de mailzijbalk, tot je met «Terug naar mail» terugkeert.
- **Gebied persoonlijke aankleding**: Drie themamodi (donker, licht, systeem) en de globale achtergrond (acht presets plus een eigen afbeelding of URL). De reikwijdte is elke weergave in de app — anders dan de "persoonlijke achtergrond", die alleen het mailboxgebied bestrijkt. De bovenbalk heeft bovendien een snelle themaknop, dus je hoeft niet terug naar deze pagina.
- **Overige groepen**: De drie overige groepen op deze pagina: leesvoorkeuren (inboxtype, positie van het leesvenster, gespreksweergave), taal (één van zes interfacetalen, één van zestien AI-vertaaldoelen) en gegevensprivacy (het centrale loket voor voorkeuren over persoonsgegevens en AI-verwerking). Deze afbeelding toont alleen de kolom en het aanzien; sectie 3 van de instellingengids legt elk item uit.

</details>

## 4. Beheerzone

Beheerroutes hebben de vorm `#manage/admin/<sectie>`; het rolgroepsegment van het pad moet overeenkomen met de identiteit van het account (`admin` voor de meester, `moderator` voor moderators) en wordt anders genormaliseerd naar een beschikbare sectie. Elke sectie is gebonden aan een onafhankelijke permissiesleutel, verleend per groep op de permissionspagina:

| Sectieroute | Sectie | Permissiesleutel | Verantwoordelijkheid |
| --- | --- | --- | --- |
| `#manage/admin/analysis` | Analyse | `analysis:query` | Dashboards voor volume, onderscheppingspercentage, bronverdeling, groeicurves en AI-gebruik |
| `#manage/admin/users` | Gebruikerslijst | `user:query` | Opzoeken van accounts, wachtwoord herstellen, groepswijzigingen, blokkeren en herstellen |
| `#manage/admin/mail` | Alle e-mail | `all-email:query` | E-mailcontrole over de hele opslag, geavanceerd zoeken met `$`, de detail-lade en fysieke verwijdering |
| `#manage/admin/roles` | Rechten | `role:query` | Identiteitsgroepen, quotamalplaatjes en AI-modelautorisatie |
| `#manage/admin/reg-keys` | Registratiesleutels | `reg-key:query` | Uitgeven en controleren van uitnodigingscodes |
| `#manage/admin/system` | Systeeminstellingen | `setting:query` | Configuratie op instantieniveau; de kaartenlijst staat in de [Instellingengids](/nl/mail/settings/) |
| `#manage/admin/apps` | Appbeheer | `setting:query` | Toegangsreferenties van OAuth 2.0 / OIDC-applicaties van derden |
| `#manage/admin/rules` | Classificatie | `setting:query` | Schakelaars voor verzenden en ontvangen, AI-herkenning, witte en zwarte lijsten en harde onderschepping |
| `#manage/admin/audit` | Auditrapport | `setting:query` | Triage, afhandeling en arbitrage van beroepen over de vier waarschuwingsklassen |

![Auditrapportpagina van EpoCanvas Mail: waarschuwingstickets van vier klassen met afhandelknoppen](/images/mail/ui/ui-audit-report.png)

*Figuur: het auditrapport (`#manage/admin/audit`). De triage gebeurt in één lijst; de afhandelknoppen zijn gesplitst per waarschuwingsklasse.*

<details>
<summary>Visuele handleiding: Het rapport als tabel aan de beheerkant</summary>

De pagina Operatierapporten zoals de beheerder die ziet: waarschuwingstickets in tabelvorm, met afhandelknoppen die per ticketklasse vertakken.

- **Ticketstabel**: Eén waarschuwing per rij, met kolommen voor categorie (audit, risicobeheersing, blokkade, beroep), prioriteit (P0/P1), huidige status en de actieve omgevingspool in platte tekst — IP, geografie, apparaat en vingerafdruk. De pool aggregeert op verzoekgedrag: de afwijking wordt pas zichtbaar als één account zich gelijktijdig vanaf vele IP's aanmeldt.
- **Afhandelknoppen**: De knoppen splitsen per ticketcategorie: beroepswaarschuwingen zetten "na beoordeling vrijgeven" het meest in het oog (vrijgeven herstelt het account), blokkeerwaarschuwingen benadrukken "waarschuwing opheffen", en de rest gebruikt het standaardactiemenu. De knop legt alleen het oordeel vast; de feitelijke blokkade of het herstel gebeurt vanaf de gebruikerslijst, en beide pagina's blijven gesynchroniseerd.
- **Koppeling met de modus**: Dezelfde tabel verandert van gedaante per mailmodus: in de alles-mailmodus (L1) is de informatie het volledigst; in de privacymodus (L2) ziet de pagina eruit als op deze afbeelding; in de versleutelde modus (L3) worden tijdstempels ontkoppeld en verdwijnt de tijdskolom — de beheerder oordeelt dan alleen op categorie en omgevingspool, zonder de volgorde van gebeurtenissen te kunnen reconstrueren.

</details>

## 5. Aanmeldscherm

`/login/` is een aparte aanmeldapplicatie, uitgerold los van de hoofdinterface. Eén aanmeldkaart draagt alle trajecten:

| Traject | Gedrag |
| --- | --- |
| Aanmelden met wachtwoord | Account (e-mail) en wachtwoord worden ingediend; herhaalde mislukkingen lokken een anti-bruteforce-blokkade uit |
| Tweestapsverificatie | Authenticator-app (TOTP met zes cijfers), back-upherstelcodes en toegangssleutels — één factor of meerdere in stapsgewijze combinatie; het aanvinken van «Niet opnieuw vragen op dit apparaat» verleent 30 dagen vertrouwen |
| Aanmelden via derden | Aanbieders die door de beheerder zijn ingeschakeld en geconfigureerd, verschijnen als knoppen; ingeschakelde aanbieders zonder sleutels staan grijs als «binnenkort» |
| Registratie | E-mail (optioneel vooraf ingesteld domeinachtervoegsel), wachtwoord en registratiecode; de codemodi zijn verplicht, uit en optioneel, en de URL kan uitnodigingsparameters meedragen |
| Wachtwoord vergeten | Een dialoog springt naar het externe beroepsportaal, met het beroeptype, de interfacetaal en het e-mailadres mee |
| Account toevoegen | Bereikt via `?action=addAccount&u=N` in de multi-accountmodus; na aanmelden belandt de sessie in de bijbehorende sleuf |

![Aanmeldpagina van EpoCanvas Mail: velden voor e-mailadres en wachtwoord, het selectievakje om in een baan te blijven en de snelle aanmeldknoppen van derden](/images/mail/ui/ui-login-oauth.png)

*Figuur: de aanmeldpagina. De driedelige toonregel voor knoppen van derden staat in [Werkingsmodi](/nl/mail/modes/), sectie 4.*

<details>
<summary>Visuele handleiding: Alle trajecten die de aanmeldpagina draagt</summary>

Het aanmeldscherm in zijn geheel: één aanmeldkaart draagt aanmelden met wachtwoord, tweestapsverificatie, snelle aanmelding via derden, registratie en wachtwoord vergeten.

- **Invoergebied**: Het meest gevolgde pad van de pagina: het e-mailadres is het account en het wachtwoord wordt als gezouten hash bewaard — de server ziet nooit platte tekst. Herhaalde mislukkingen lokken een blokkade tegen brute force uit, waarvan de granulariteit en duur door de backend worden bepaald; met "dit apparaat vertrouwd houden" blijft herhaalde verificatie 30 dagen achterwege.
- **Gebied met knoppen van derden**: Aanbieders die de beheerder heeft ingeschakeld en van sleutels voorzien, verschijnen als knoppen; ingeschakelde aanbieders zonder sleutels staan grijs als «binnenkort»; uitgeschakelde worden niet getoond.
- **Overige trajecten**: Dezelfde kaart draagt nog drie paden: een account met tweestapsverificatie gaat door naar een tweede factor (TOTP, een herstelcode of een passkey); in registratiesleutelmodus pre-vult een code-parameter het registratieformulier; en "wachtwoord vergeten" springt naar het externe beroepsportaal met het beroepstype, de interfacetaal en het e-mailadres. Sectie 4 van de modi-pagina bevat de regels.

</details>

## 6. Zelfstandige pagina's en globale mogelijkheden

| Interface | Route | Beschrijving |
| --- | --- | --- |
| OAuth-toestemmingspagina | `#/oauth/authorize` | Getoond wanneer een app van derden autorisatie vraagt: appinformatie, officiële badge, lijst van scopes, en autoriseren／annuleren |
| Openbaar profiel | `/<username>` | Toegankelijk zonder aanmelding; toont avatar, tijdzone, identiteitsgroep, datum van registratie, een persoonlijk gegevensbord en «mail mij»; afgeschermd door de schakelaar «openbare profielen» van de beheerder |
| 404-pagina | andere paden | Lege-staatpagina voor onbekende paden, met een weg terug |
| PWA | — | De webapp kan worden geïnstalleerd; er wordt ook een Android-app (epomail) geleverd |

De e-mailmodus vormt ook de beheerinterface om: in de versleutelde modus (Level 3) is de ingang voor e-mailcontrole over de hele opslag verborgen en verliezen de auditrapporten hun tijdstempels, zie [Werkingsmodi](/nl/mail/modes/), sectie 2.

## 7. Verwante documenten

| Bron | Link |
| --- | --- |
| OAuth-appregistratie en eindpuntintegratietutorial | [Open platform en API-toegang](/nl/mail/api/) |
| Zoekoperators, beheerderszoeken en regelvoorwaarden | [Zoek- en regelreferentie](/nl/mail/search/) |
| Elke instellingssectie in detail | [Instellingengids](/nl/mail/settings/) |
| Functies in detail met schermafbeeldingen | [Functiegids](/nl/mail/features/) |
| Werkingsvormen en identiteitsgroepen | [Werkingsmodi](/nl/mail/modes/) |
| Positionering en uitrol van het project | [Projectoverzicht](/nl/mail/project/) |
