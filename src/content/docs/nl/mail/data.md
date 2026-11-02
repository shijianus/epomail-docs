---
title: Gegevensexport en opslag
description: Gegevensexport en opslag van EpoCanvas Mail — werkelijke velden en beperkingen van drie exporten en het koppelen van persoonlijke opslag.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.21**

Deze pagina behandelt de twee delen van de pagina «Instellingen → Gegevens»: export en opslag. De meldingen en het doorsturen op dezelfde pagina staan in de [Gids voor meldingen en doorsturen](/nl/mail/notify/); de juridische status van geëxporteerde gegevens staat in [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

![Gegevenspagina van EpoCanvas Mail: de drie exportkaarten, de verbruiksmeter voor opslag en de koppeling van persoonlijke objectopslag (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/data-guide.png)

*Figuur: de gegevenspagina. Export en opslagbeheer staan op één pagina; het bijlagenverbruik telt mee voor de quota van de identiteitsgroep.*

<details>
<summary>Visuele handleiding: Gegevens —  vier regio's van zeggenschap over je eigen data</summary>

De vier kaarten van de pagina Gegevens: drie exportformaten, een doorstuurgebied, een opslaggebied en een gebied voor autorisaties van derden — persoonlijke data-autonomie op één scherm.

1. **Exportkaart**: JSON-gegevens, mailarchieven (MBOX/JSON/CSV) en profiel- en labelexport gebruiken hetzelfde serverantwoord. De gekozen periode wordt niet toegepast; ook .eml-bestanden worden uit bestaande velden opgebouwd.
2. **Kaart E-mail en berichten doorsturen**: De instellingen van Telegram-push en automatisch doorsturen, punt voor punt; of een account ze mag gebruiken, bepaalt de schakelaar «Gebruikersgegevensbeheer» van de beheerder.
3. **Opslagkaart**: toont gemeten mail- en bijlagegebruik en het effectieve quotum. Eigen Backblaze B2/S3 ontvangt nieuwe bijlagen en omzeilt quotumcontroles in hun opslagpad; andere mailbeperkingen blijven gelden. Ontkoppelen migreert oude objecten niet.
4. **Apps van derden**: toont OAuth-autorisaties en intrekking. De server verwijdert de autorisatie en registreert intrekking, die userinfo controleert om toegang te weigeren. Dit garandeert niet dat externe sessies en alle tokens tegelijk vervallen of dat al verkregen gegevens worden teruggehaald.

</details>

## 1. De drie exporten

| Export | Formaat | Bereik |
| --- | --- | --- |
| Volledige data-export | JSON | Geselecteerde account- en profielvelden, velden van `is_del=0`-mail en `customLabels`; zonder bijlagebestanden, oorspronkelijke MIME, volledige contacten/aliassen, beveiligingsinstellingen of auditrecords |
| Archief van de e-mailgeschiedenis | MBOX, JSON of CSV | De browser converteert velden uit hetzelfde antwoord; de server negeert `type/format/range`, filtert niet op de gekozen periode en sluit prullenbakmail uit |
| Contacten en configuratie | JSON | Alleen de teruggegeven profile-deelverzameling, customLabels en exporttijd; geen volledige back-up van contacten, aliasregels of voorkeuren |

Losse .eml-bestanden en MBOX-archieven worden uit bestaande velden opgebouwd, zonder volledige oorspronkelijke MIME of bijlagebestanden. Prullenbakopschoning gebruikt een aanmaaktijd ouder dan 7 dagen, zonder 7 extra dagen na verplaatsen te garanderen. Bewaar bijlagen apart vóór verwijderen en controleer de export; zie het [Privacybeleid](/nl/mail/privacy-policy/).

## 2. Opslagruimte

- De verbruiksmeter voor bijlagen toont in realtime verbruik en quota; de quota volgt de identiteitsgroep (de fabrieksstandaardwaarden staan in sectie 3 van [Werkingsmodi](/nl/mail/modes/));
- Een eigen Backblaze B2/S3-bucket ontvangt nieuwe bijlagen volgens uw instellingen. Bijlageopslag omzeilt systeemquota, maar meting en andere mailbeperkingen blijven gelden. Kosten en externe bewaartermijnen vereisen aparte bevestiging; zie de [Verwerkerslijst](/nl/mail/sub-processors/);
- Ontkoppelen herstelt de opslagkeuze via systeeminstellingen; oude objecten worden niet gemigreerd of verwijderd en blijven niet gegarandeerd leesbaar. Zie verwijderbeperkingen in [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

<details>
<summary>Visuele handleiding: de export en de opslag in stappen</summary>

![De export en de opslag in stappen](/images/mail/nl/ui/data.png)

1. Ga naar «Instellingen → Gegevens».
2. «Volledige data-export» downloadt geselecteerde profielvelden, niet-verwijderde mailvelden en customLabels als JSON; regel bijlagen, volledige contacten en beveiligingsinstellingen apart.
3. «Archief van de e-mailgeschiedenis»: kies MBOX/JSON/CSV en download; de browser converteert het formaat, de server past de periode niet toe.
4. «Contacten en configuratie» exporteert de teruggegeven profile-deelverzameling en customLabels; controleer of de benodigde contacten en voorkeuren aanwezig zijn.
5. De opslagkaart toont het bijlagenverbruik; klik op «persoonlijke objectopslag koppelen» om een eigen Backblaze B2- of S3-bucket te binden — nieuwe bijlagen gaan daarna rechtstreeks naar uw eigen cloud.

</details>

## 3. Verwante documenten

| Bron | Link |
| --- | --- |
| Meldingen en doorsturen (de andere helft van dezelfde pagina) | [Gids voor meldingen en doorsturen](/nl/mail/notify/) |
| De opslaglagen en hoe quota wordt gemeten | [Technische architectuur](/nl/mail/architecture/) |
| De rechten van de betrokkene en de exportfrequentie | [Privacybeleid](/nl/mail/privacy-policy/) |
| De beheerconfiguratie rond opslag | [De configuratiekaarten van de systeeminstellingen](/nl/mail/system/) |
