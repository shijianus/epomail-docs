---
title: De configuratiekaarten van de systeeminstellingen
description: De configuratiekaarten van de systeeminstellingen van EpoCanvas Mail — elf kaarten één voor één, van website-instellingen en personalisatie via derdenauthenticatie, opslag, e-mail-push, AI-engine en gebruikersgegevensbeheer tot Turnstile, aankondigingen, operatierapporten en de kaart Over.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

De pagina systeeminstellingen (`#manage/admin/system`, rechten-sleutels `setting:query`／`setting:set`) ordent alle configuratie op instantieniveau in kaarten. Deze pagina loopt elke kaart langs; de kaartnamen zijn identiek aan de interface.

## 1. Website-instellingen

Open registratie, openbare profielen, de e-mailmodus (drie niveaus, zie sectie 2 van [Werkingsmodi](/nl/mail/modes/)), tweestapsverificatie, verborgen aanmelddomein, registratiecodes, extra mailboxen, snel wisselen tussen accounts en de regels voor het mailboxvoorvoegsel — allemaal schakelaars op instantieniveau.

## 2. Personalisatie

Sitetitel, pop-upmeldingen en de dynamische／statische interface sturen de merkpresentatie van het aanmeldscherm en van de interface.

## 3. Derdenauthenticatie en SSO

De hoofdschakelaar voor snelle aanmelding via derden en de sleutelconfiguratie per aanbieder (GitHub, Google, Microsoft, Apple, eigen SSO); de driedelige toonregel voor de knoppen op het aanmeldscherm staat in sectie 4 van [Werkingsmodi](/nl/mail/modes/). Deze kaart is zichtbaar onder een onderliggende functievlag en rendert niet in een standaarduitrol.

## 4. Opslag en kerndatabase

Objectopslag (B2／S3, fabrieksstandaard met terugval op R2／KV), de architectuur van de kerndatabase en externe databases (Turso en dergelijke), de limiet voor één bijlage met trapsgewijs wissen en de KV-cachegezondheidscheck. De technische details staan in de [Technische architectuur](/nl/mail/architecture/).

## 5. E-mail-push

De officiële Telegram-bot (sitewijde push), de voorkeuren voor de zichtbaarheid van de pushvelden (afzender／ontvanger／inhoud per stuk aan- of uit te zetten), globaal doorsturen en doorsturen via regels; in de versleutelde modus vergrendeld op uit. De privébot aan gebruikerskant staat in de [Gids voor meldingen en doorsturen](/nl/mail/notify/).

## 6. AI-engine en modelintegratie

Keuze uit twee AI-aanbieders (een eigen OpenAI-compatibel eindpunt of Cloudflare Workers AI), de inschakelaar, dagquotum en ratelimiet, en de modelautorisatie per identiteitsgroep (in samenspel met [Rechtenbeheer](/nl/mail/roles/)).

## 7. Gebruikersgegevensbeheer

Beheert de schakelaars waarmee gewone gebruikers de pagina «Gegevens» kunnen gebruiken: Telegram-push, e-mail doorsturen, ondersteuning voor API's van derden, eigen opslag en de standaard opslagquota; de data-export blijft altijd open en is niet door deze kaart te beperken.

## 8. Turnstile-mensverificatie

De sitesleutel en de schakelaar van de mensverificatie, van kracht op openbare ingangen zoals registratie.

## 9. Aankondigingen

Aankondigingspop-ups op het aanmeldscherm, aankondigingsmail in bulk aan alle accounts en welkomstmail-sjablonen (meertalig, afgeleverd in de taal van de ontvanger); de afleversemantiek van officiële e-mail staat in [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/).

## 10. Operatierapporten

De operationele drempels die waarschuwingen uitlokken (de ticketgeneratie van het [Auditrapport](/nl/mail/audit/)).

## 11. Over

Versie-informatie van de instantie en updatecontrole (tegenover GitHub Releases).

<details>
<summary>Visuele handleiding: de elf configuratiekaarten in één oogopslag (nummering volgens de interface)</summary>

![De elf configuratiekaarten in één oogopslag (nummering volgens de interface)](/images/mail/nl/ui/system.png)

1. ① Website-instellingen: open registratie, openbare profielen, e-mailmodus, tweestapsverificatie, registratiecodes, extra mailboxen, snel wisselen tussen accounts en het mailboxvoorvoegsel.
2. ② Personalisatie: sitetitel, pop-upmeldingen en de dynamische／statische interface. ③ Opslag en kerndatabase: B2／S3, de kerndatabase en externe databases, de limiet voor één bijlage.
3. ④ E-mail-push: de officiële Telegram-bot, de zichtbaarheid van de pushvelden, globaal doorsturen en doorsturen via regels. ⑤ AI-engine: aanbieder, dagquotum en ratelimiet, modelautorisatie.
4. ⑥ Gebruikersgegevensbeheer: de schakelaars aan gebruikerskant voor push, doorsturen, API's van derden en eigen opslag, plus de standaard opslagquota. ⑦ Turnstile-mensverificatie. ⑧ Aankondigingen: pop-ups, bulkverzending en welkomstmail-sjablonen.
5. ⑨ Operatierapporten: de drempels die waarschuwingen uitlokken. ⑩ Over: versie-informatie en updatecontrole. De kaart Derdenauthenticatie en SSO is zichtbaar onder een onderliggende functievlag en rendert niet in een standaarduitrol.

</details>

## 12. Verwante documenten

| Bron | Link |
| --- | --- |
| De plek aan gebruikerskant waar accountmogelijkheden doorwerken | [Gegevensexport en opslag](/nl/mail/data/) |
| Groepsquota en modelautorisatie | [Rechtenbeheer](/nl/mail/roles/) |
| Uitrol en injectie van geheimen | [Uitrolgids](/nl/mail/deployment/) |
| Hoe de schakelaars in de interface doorwerken | [Werkingsmodi](/nl/mail/modes/) |
