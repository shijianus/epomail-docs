---
title: Gids voor meldingen en doorsturen
description: De gids voor meldingen en doorsturen van EpoCanvas Mail — Telegram-push koppelen, pushvoorkeuren en de zichtbaarheid van velden, en de bestemmingen en triggertypes van automatisch doorsturen.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Deze pagina loopt de twee mogelijkheden van het gebied «E-mail en berichten doorsturen» op de pagina «Instellingen → Gegevens» langs: Telegram-berichtpush en automatisch doorsturen. Of een account ze te zien krijgt, wordt beslist door de kaart «Gebruikersgegevensbeheer» van de beheerder; staan ze uit, dan zijn de bijbehorende blokken verborgen. Gegevensexport en opslag staan op dezelfde pagina, zie de [Instellingengids](/nl/mail/settings/), sectie 5.

![Gebied e-mail en berichtdoorsturen van EpoCanvas Mail: de Telegram-pushstatus en de instellingen voor automatisch doorsturen (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/notify-guide.png)

*Figuur: het gebied e-mail en berichtdoorsturen. Telegram-push toont de status en de instel-ingang; automatisch doorsturen toont bestemmingen en geavanceerde opties.*

<details>
<summary>Visuele handleiding: Exporteren en doorsturen —  hoe je data meeneemt en nieuwe mail je bereikt</summary>

Drie exportkaarten en het kopgebied «E-mail en berichten doorsturen» op de pagina Gegevens: het bovenste deel bepaalt hoe gegevens naar buiten gaan, het onderste hoe nieuwe mail je in realtime bereikt.

1. **Kaart voor JSON-gegevensexport**: Downloadt een deel van de accountvelden, velden van e-mails die niet als verwijderd zijn gemarkeerd en aangepaste labels; bevat geen bijlagebestanden, volledige beveiligingsinstellingen of alle persoonsgegevens.
2. **Kaart voor het archief van de e-mailgeschiedenis**: De browser zet hetzelfde backendantwoord om in MBOX, JSON of CSV; de backend past de gekozen periode niet toe en de export bevat geen volledige oorspronkelijke MIME of bijlagebestanden.
3. **Kaart voor contacten en configuratie**: Exporteert de teruggegeven deelverzameling van profielvelden en aangepaste labels; vormt geen volledige back-up van contacten, aliasregels of alle voorkeuren.
4. **Kopgebied E-mail en berichten doorsturen**: Toegang tot Telegram-meldingen en automatisch doorsturen. Persoonlijke meldingen kunnen alle of belangrijke berichten selecteren; voorvertoning en codes kopiëren zijn afzonderlijke keuzes. Elk bezoek aan een lees- of bijlagelink controleert de actuele status en intrekkingsversie; zie de grenzen hieronder.

</details>

## 1. Telegram-berichtpush

Push gebruikt je eigen privé-Telegrambot; nieuwe mail komt in realtime in je chat aan:

1. Maak een privébot aan bij @BotFather en neem het Bot Token (van de vorm `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`);
2. Verkrijg het Chat ID tussen jou en die bot (stuur de bot een willekeurig bericht en lees het uit via getUpdates; groepen zijn negatief, kanalen zien eruit als `-100123456789`);
3. Druk bij het item «Telegram-berichtpush» op het tandwiel en vul het Bot Token en het Chat ID in; ontvang je binnen een groepsthema, vul dan ook het Topic ID in;
4. Kies `all` of `important` voor persoonlijke meldingen. Belangrijk betekent uitsluitend de exacte labels `重要` / `important`, een daadwerkelijk opgeslagen ster of een al aanwezige verificatiecode, niet bepaalde woorden in het onderwerp. `notifyCodeOnly` staat standaard op `false` en bepaalt alleen of een knop voor het kopiëren van de code wordt toegevoegd; de knop verschijnt alleen voor een bestaande geëxtraheerde code van maximaal 256 tekens en is geen filter op uitsluitend berichten met codes;
5. Druk op «Testbericht sturen» om de doelchat te controleren en schakel de meldingen pas in nadat u de verzonden velden en de leeslink hebt gecontroleerd.

Bij persoonlijke meldingen staat `includePreview` standaard op `false`. In `all` en `important` gebruikt de melding ook zonder voorbeeld het onderwerp (of een algemene titel als het ontbreekt), maximaal 200 tekens; expliciet `true` voegt daarnaast een voorbeeld van maximaal 400 tekens en een leeslink toe wanneer de configuratie dit toelaat. De modus `privacy` stuurt ongeacht de andere opties alleen een algemene titel, zonder onderwerp, afzender, ontvanger, code of link. Systeemmeldingen volgen onafhankelijk de door de beheerder ingestelde systeemvelden; de persoonlijke voorvertoningsschakelaar zet ze niet uit. Het Bot Token en Chat ID gaan naar de backend en blijven niet alleen op het apparaat. Automatische AI-codeherkenning staat standaard uit en vereist afzonderlijk een individuele keuze en een geconfigureerde dienst; dit staat los van de meldingsfilters en de kopieeroptie voor codes.

De lokale implementatie van deze ronde controleert bij elk Telegram-lees- of bijlageverzoek de vervaltijd, de status van eigenaar, mailbox en bericht en de intrekkingsversie. Persoonlijke voorvertoning uitzetten blokkeert ook oude persoonlijke links. Gedeeld lezen laadt geen externe inhoud. Persoonlijke meldingen uitschakelen of relevante instellingen wijzigen trekt oude links in. De knop voor bestaande leeslinks onder Instellingen → Gegevens trekt eerder voor dit account uitgegeven links uit zowel persoonlijke als systeemmeldingen in; toekomstige meldingen kunnen onafhankelijk nieuwe links maken. Gewoon uitloggen trekt deze links niet in; uitschakeling van het account blokkeert de toegang via actuele statuscontroles. Intrekking verwijdert geen inhoud die al in Telegram-chats staat of gedownloade kopieën. Deze mechanismen bevestigen geen uitrol naar alle online instanties; zie de [Lijst van verwerkers](/nl/mail/sub-processors/).

## 2. Automatisch doorsturen

| Instelling | Beschrijving |
| --- | --- |
| Automatisch doorsturen inschakelen | Hoofdschakelaar; de opties hieronder verschijnen wanneer hij aan staat |
| Doorstuurbestemmingen | Eén of meer doeladressen, gescheiden door komma's |
| Triggertype | Alle berichten of een letterlijk voorvoegsel van de ontvangende mailbox, bijvoorbeeld `billing`; `*` is geen jokerteken en een lege lijst met aliasvoorvoegsels stuurt niets door |
| Voorvoegsel bij het onderwerp | Voeg optioneel een `[Fwd]`-markering toe aan het doorgestuurde onderwerp zodat het herkenbaar is in de doelmailbox |

:::note
Persoonlijk doorsturen via slimme regels (`rules`) is momenteel niet beschikbaar: tijdens uitvoering wordt niets doorgestuurd, zonder terugval op alle mail; opslaan van een ingeschakelde `rules`-configuratie wordt geweigerd. De opgeslagen `keepCopy` wordt genormaliseerd naar `true`: `keepCopy=false` wordt alleen geweigerd wanneer doorsturen is ingeschakeld en een uitgeschakelde configuratie wordt ook als `true` opgeslagen. Doorsturen verwijdert het origineel niet automatisch. Dit beschrijft de huidige lokale broncode; tests worden nog herhaald en dit bevestigt geen online uitrol.
:::

## 3. Afleverpad en bescherming tegen lussen

Doorsturen verloopt bij voorkeur via het native platformkanaal; bij mislukking kan het systeemafleverkanaal worden gebruikt met een `[Fwd]`-voorvoegsel volgens de instellingen. Die terugvalaanroep bevat alleen velden zoals onderwerp en berichttekst, zonder gewone bijlagen, zodat niet is gegarandeerd dat de bestemming de volledige oorspronkelijke e-mail ontvangt. Bestemmingen die gelijk zijn aan de ontvanger of oorspronkelijke afzender worden overgeslagen; dit garandeert niet dat alle lussen via meerdere tussenstappen worden voorkomen. Voorafgaande systeemregels kunnen de verwerking van inkomende e-mail ook direct beëindigen, waardoor persoonlijke meldingen en doorsturen worden overgeslagen. Zie de [Zoek- en regelreferentie](/nl/mail/search/), paragraaf 7, voor de regelsemantiek.

## 4. Verwante documenten

| Bron | Link |
| --- | --- |
| Waar de gegevenspagina in de instellingen zit | [Instellingengids](/nl/mail/settings/) |
| Gegevensverwerking van doorsturen en push | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Tweestapsverificatie en accountbeveiliging | [Accountbeveiligingsgids](/nl/mail/security/) |
| De schakelaars voor gebruikersgegevensbeheer van de beheerder | [Werkingsmodi](/nl/mail/modes/) |
