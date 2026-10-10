---
title: Gegevensexport en opslag
description: Gegevensexport en opslag van EpoCanvas Mail — de drie exporten (volledige back-up, e-mailarchief, contacten en configuratie) en het koppelen van persoonlijke objectopslag.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.17**

Deze pagina behandelt de twee delen van de pagina «Instellingen → Gegevens»: export en opslag. De meldingen en het doorsturen op dezelfde pagina staan in de [Gids voor meldingen en doorsturen](/nl/mail/notify/); de juridische status van geëxporteerde gegevens staat in [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

![Gegevenspagina van EpoCanvas Mail: de drie exportkaarten, de verbruiksmeter voor opslag en de koppeling van persoonlijke objectopslag (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/data-guide.png)

*Figuur: de gegevenspagina. Export en opslagbeheer staan op één pagina; het bijlagenverbruik telt mee voor de quota van de identiteitsgroep.*

<details>
<summary>Visuele handleiding: Gegevens —  vier regio's van zeggenschap over je eigen data</summary>

De vier kaarten van de pagina Gegevens: drie exportformaten, een doorstuurgebied, een opslaggebied en een gebied voor autorisaties van derden — persoonlijke data-autonomie op één scherm.

1. **Kaart gebruikersgegevens en data-export**: Drie exporten naast elkaar: de volledige back-up in JSON, het archief van de e-mailgeschiedenis (MBOX/JSON/CSV met periode) en contacten en configuratie; een los bericht is daarnaast in het leesvenster als .eml te downloaden.
2. **Kaart E-mail en berichten doorsturen**: De instellingen van Telegram-push en automatisch doorsturen, punt voor punt; of een account ze mag gebruiken, bepaalt de schakelaar «Gebruikersgegevensbeheer» van de beheerder.
3. **Kaart opslagruimte**: De verbruiksmeter voor bijlagen naast de quota, realtime. Je kunt je eigen Backblaze B2-/S3-bucket koppelen: nieuwe bijlagen gaan dan rechtstreeks naar je eigen cloud, buiten de quota van de instantie, en bij ontkoppelen valt het terug.
4. **Kaart apps en diensten van derden**: Alle OAuth-autorisaties op het account: per app de toegang intrekken, of met één klik alles via het detailvenster. Intrekking werkt onmiddellijk — de bestaande tokens van de app vervallen ter plekke.

</details>

## 1. De drie exporten

| Export | Formaat | Bereik |
| --- | --- | --- |
| Volledige data-export | JSON | Volledige back-up: accountgegevens, e-mailgeschiedenis, contacten, classificatie- en labelregels en beveiligingsinstellingen |
| Archief van de e-mailgeschiedenis | MBOX (universeel), JSON of CSV | Alleen verzonden en ontvangen e-mail, met optionele periode |
| Contacten en configuratie | JSON | Contactenlijst, eigen aliasregels en personalisatievoorkeuren |

Een los bericht kan in het leesvenster rechtstreeks als .eml worden gedownload. Mail in de prullenbak wordt na 7 dagen fysiek gewist en is niet herstelbaar; wie iets wil bewaren, exporteert het eerst (zie sectie 8 van de [Servicevoorwaarden](/nl/mail/terms-of-service/)).

## 2. Opslagruimte

- De verbruiksmeter voor bijlagen toont in realtime verbruik en quota; de quota volgt de identiteitsgroep (de fabrieksstandaardwaarden staan in sectie 3 van [Werkingsmodi](/nl/mail/modes/));
- Er kan een persoonlijke objectopslag worden gekoppeld (een eigen Backblaze B2- of S3-bucket): na koppeling worden nieuwe bijlagen rechtstreeks in uw eigen cloud bewaard en tellen ze niet meer mee voor de quota van de instantie; het platform beveelt B2 aan vanwege het gratis quotum en de kosten van nul voor uitgaand verkeer;
- De koppeling kan op elk moment worden opgeheven; daarna belanden nieuwe bijlagen weer in de opslag van de instantie.

<details>
<summary>Visuele handleiding: de export en de opslag in stappen</summary>

![De export en de opslag in stappen](/images/mail/nl/ui/data.png)

1. Ga naar «Instellingen → Gegevens».
2. «Volledige data-export» downloadt in één pakket een volledige JSON-back-up (accountgegevens, e-mailgeschiedenis, contacten, classificatie- en labelregels en beveiligingsinstellingen).
3. «Archief van de e-mailgeschiedenis» downloadt u na keuze van het formaat MBOX／JSON／CSV en een periode.
4. «Contacten en configuratie» exporteert de contactenlijst en de personalisatievoorkeuren.
5. De opslagkaart toont het bijlagenverbruik; klik op «persoonlijke objectopslag koppelen» om een eigen Backblaze B2- of S3-bucket te binden — nieuwe bijlagen gaan daarna rechtstreeks naar uw eigen cloud.

</details>

## 3. Verwante documenten

| Bron | Link |
| --- | --- |
| Meldingen en doorsturen (de andere helft van dezelfde pagina) | [Gids voor meldingen en doorsturen](/nl/mail/notify/) |
| De opslaglagen en hoe quota wordt gemeten | [Technische architectuur](/nl/mail/architecture/) |
| De rechten van de betrokkene en de exportfrequentie | [Privacybeleid](/nl/mail/privacy-policy/) |
| De beheerconfiguratie rond opslag | [De configuratiekaarten van de systeeminstellingen](/nl/mail/system/) |
