---
title: Gids voor meldingen en doorsturen
description: De gids voor meldingen en doorsturen van EpoCanvas Mail — Telegram-push koppelen, pushvoorkeuren en de zichtbaarheid van velden, en de bestemmingen en triggertypes van automatisch doorsturen.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.16**

Deze pagina loopt de twee mogelijkheden van het gebied «E-mail en berichten doorsturen» op de pagina «Instellingen → Gegevens» langs: Telegram-berichtpush en automatisch doorsturen. Of een account ze te zien krijgt, wordt beslist door de kaart «Gebruikersgegevensbeheer» van de beheerder; staan ze uit, dan zijn de bijbehorende blokken verborgen. Gegevensexport en opslag staan op dezelfde pagina, zie de [Instellingengids](/nl/mail/settings/), sectie 5.

![Gebied e-mail en berichtdoorsturen van EpoCanvas Mail: de Telegram-pushstatus en de instellingen voor automatisch doorsturen (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-notify-forward.png)

*Figuur: het gebied e-mail en berichtdoorsturen. Telegram-push toont de status en de instel-ingang; automatisch doorsturen toont bestemmingen en geavanceerde opties.*

## 1. Telegram-berichtpush

Push gebruikt je eigen privé-Telegrambot; nieuwe mail komt in realtime in je chat aan:

1. Maak een privébot aan bij @BotFather en neem het Bot Token (van de vorm `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`);
2. Verkrijg het Chat ID tussen jou en die bot (stuur de bot een willekeurig bericht en lees het uit via getUpdates; groepen zijn negatief, kanalen zien eruit als `-100123456789`);
3. Druk bij het item «Telegram-berichtpush» op het tandwiel en vul het Bot Token en het Chat ID in; ontvang je binnen een groepsthema, vul dan ook het Topic ID in;
4. Kies de pushvoorkeur: alle mail, of alleen belangrijke mail en mail met verificatiecodes;
5. Druk op «Testbericht sturen» om de verbinding te controleren en zet daarna de push aan.

De voorkeuren voor de zichtbaarheid van velden in de pushinhoud (afzender, ontvanger, inhoud) worden globaal door de beheerder ingesteld in de kaart E-mail-push van de systeeminstellingen; de officiële sitewijde bot en je privébot conflicteren niet.

## 2. Automatisch doorsturen

| Instelling | Beschrijving |
| --- | --- |
| Automatisch doorsturen inschakelen | Hoofdschakelaar; de opties hieronder verschijnen wanneer hij aan staat |
| Doorstuurbestemmingen | Eén of meer doeladressen, gescheiden door komma's |
| Triggertype | Elk bericht doorsturen als CC; of alleen doorsturen wanneer de ontvangende mailbox overeenkomt met een opgegeven voorvoegsel of letteralias (zoals `billing`, `dev-*`) |
| Voorvoegsel bij het onderwerp | Voeg optioneel een `[Fwd]`-markering toe aan het doorgestuurde onderwerp zodat het herkenbaar is in de doelmailbox |

:::note
De interface biedt ook «doorsturen gefilterd op slimme regels» en «het origineel in de postvak IN houden» aan; de huidige doorstuurengine behandelt de modus met slimme regels als alle mail en honoreert de optie om het origineel te behouden nog niet — test dit gedrag voordat je erop vertrouwt.
:::

## 3. Afleverpad en bescherming tegen lussen

Doorsturen verloopt eerst via het native doorstuurkanaal van het platform, met bij mislukking terugval op het systeemafleverkanaal en de optionele `[Fwd]`-markering; bestemmingen die gelijk zijn aan de ontvanger of de oorspronkelijke afzender worden overgeslagen om lussen te voorkomen. De regelsemantiek van de triggertypes staat ook in de [Zoek- en regelreferentie](/nl/mail/search/), sectie 7.

## 4. Verwante documenten

| Bron | Link |
| --- | --- |
| Waar de gegevenspagina in de instellingen zit | [Instellingengids](/nl/mail/settings/) |
| Gegevensverwerking van doorsturen en push | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Tweestapsverificatie en accountbeveiliging | [Accountbeveiligingsgids](/nl/mail/security/) |
| De schakelaars voor gebruikersgegevensbeheer van de beheerder | [Werkingsmodi](/nl/mail/modes/) |
