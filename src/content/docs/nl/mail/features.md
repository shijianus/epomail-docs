---
title: Functiegids van EpoCanvas Mail
description: Functiegids van EpoCanvas Mail — indeling van de postvak IN, opstellen en verzenden, zoeksyntaxis, labelregelengine, extractie van verificatiecodes, spamaanpak, doorsturen en pushmeldingen, AI-mogelijkheden en het open platform.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.16**

Deze pagina beschrijft de daadwerkelijke functies van EpoCanvas Mail één voor één; alle inhoud is punt voor punt geverifieerd aan de hand van de open-sourcecode, en de interface-screenshots komen uit de echte werking van de officieel gehoste instantie. Voor de positionering van het project, de ontwikkelgeschiedenis en de implementatie, zie [Projectoverzicht](/nl/mail/project/); voor de gegevensverwerking en bewaartermijnen per functie, zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend.

![Panorama van de postvak IN van EpoCanvas Mail: links de toegang voor het schrijven van mail, de mappenboom (Primair, Met ster, Uitgesteld, Verzonden, Concepten, Alle e-mail, Spam, Prullenbak) en de gekleurde labels (Gemeenschap, Abonnementen, Promoties, Werk); rechts de lijst met afzender, onderwerp, samenvatting, verificatiecodebadge en officiële verificatiemarkering (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/views-guide.png)

*Figuur: postvak IN (screenshot in vereenvoudigd Chinees). De lijst toont direct de verificatiecodebadge (groene rand) en de verificatiemarkering van officiële e-mail (blauw vinkje); de tellers van mappen en labels synchroniseren in realtime.*
*Aantekeningen: 1. Opstellen　2. Met ster　3. Uitgesteld1　4. Verzonden*

## 1. Postvak IN en indeling

| Mogelijkheid | Beschrijving |
| --- | --- |
| E-mailweergaven | Acht weergaven: Primair, Met ster, Uitgesteld, Verzonden, Concepten, Alle e-mail, Spam, Prullenbak; tellers worden in realtime bijgewerkt |
| Leesindeling | Driedelig gesplitst aanzicht, gespreksthreads, inline beantwoorden en emoji-reacties; in de e-maildetails zijn de originele headers in te zien |
| Sorteeracties | Ster geven, uitstellen (op een zelfgekozen tijdstip), melden als spam／geen spam, naar de prullenbak verplaatsen, definitief verwijderen |
| Verificatiecodebadge | Verificatiecodes die door Workers AI zijn geëxtraheerd, verschijnen rechtstreeks in de lijst en de details (zie sectie 5) |
| Markering van officiële e-mail | E-mail van officiële afzenders zoals announcement@epocanvas.com draagt de verificatiemarkering en een uitlegbalk (zie [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/)) |

## 2. Opstellen en verzenden

![Schrijvenster van EpoCanvas Mail: de afzender is vastgezet op de huidige mailbox, geadresseerden kunnen uit de contacten worden gekozen; onder het onderwerpveld staat de werkbalk voor tekstopmaak (alinea, tekengrootte, vet, lijsten, citatie, scheidingslijn, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus), onderaan de bijlagen en de verzendknop](/images/mail/nl/ui/compose-guide.png)

*Figuur: schrijven (screenshot in vereenvoudigd Chinees). De teksteditor biedt 17 opmaakhulpmiddelen; geadresseerden op de site krijgen de mail rechtstreeks afgeleverd, e-mail naar buiten gaat via het afleverkanaal.*
*Aantekeningen: 1. Paragraph14pxTo 　2. Opstellen*

- **Teksteditor met opmaak**: alinea's, tekengrootte, vet, cursief, onderstreept, doorgehaald, kleuren, uitlijning, geordende en ongeordende lijsten, citatie, scheidingslijn, koppeling, afbeelding, tabel, emoji, vertaling en broncodemodus;
- **Bijlagen**: de mogelijkheid om bijlagen te versturen en te ontvangen wordt per accountrol ingeschakeld; de maximale grootte van één bijlage volgt de instelling van de instantie (standaard 25 MB; dit beperkt alleen gebruikers die de openbare opslag van de exploitant gebruiken, gebruikers met eigen opslag zijn niet beperkt); de opslagquota is per rol ingesteld;
- **Verzendbereik**: directe aflevering in mailboxen op de site (geen extern transport); e-mail naar buiten de site wordt afgeleverd via de kanalen die de Exploitant heeft geconfigureerd (Resend／Mailjet en dergelijke); de betrokken derden staan in de [Lijst van verwerkers](/nl/mail/sub-processors/);
- **Verzendbeheer**: in te zien in de weergave «Verzonden»; het uitgaande volume is begrensd door de dagelijkse verzendquota van de accountrol (zie sectie 6).

## 3. Zoeksyntaxis

![Resultaatweergave van EpoCanvas Mail na invoer van from:github in de zoekbalk: de lijst toont uitsluitend de overeenkomende GitHub-meldingen; de tellers in de zijbalk blijven gesynchroniseerd (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/search-guide.png)

*Figuur: zoeken (screenshot in vereenvoudigd Chinees). Veldoperators kunnen met vrije trefwoorden worden gecombineerd; de trefferslijst wordt in realtime vernieuwd.*
*Aantekeningen: 1. E-mail zoeken...*

| Operator | Voorbeeld | Beschrijving |
| --- | --- | --- |
| `from:` | `from:github` | filteren op afzender |
| `to:` | `to:baas` | filteren op geadresseerde |
| `subject:` | `subject:code` | filteren op onderwerp |
| `body:` / `subject_or_body:` | `body:factuur` | filteren op body／op onderwerp of body |
| `larger:` / `smaller:` | `larger:10M` | filteren op grootte van de e-mail |
| `before:` / `after:` | `after:2026-10-01` | filteren op datum |
| `label:` | `label:Werk` | filteren op label |
| `global:` | `global:project` | zoeken op de hele site, alle mailboxen meegenomen |
| `is:` | `is:sent`, `is:spam`, `is:trash` | filteren op status |

De markering van treffers is gebaseerd op de CSS Highlights API; zoeken op de hele site en zoeken op de pagina bestaan naast elkaar op twee niveaus.De volledige referentie van elke veldoperator, vlag en regelvoorwaarde staat in de [Zoek- en regelreferentie](/nl/mail/search/).

## 4. Labels en de regelengine voor classificatie

- Vier labels staan standaard voorgeconfigureerd: **Gemeenschap** (automatische classificatie op veelvoorkomende openbare mailboxdomeinen), **Abonnementen**, **Promoties**, **Werk**; kleuren en pictogrammen van labels zijn aanpasbaar;
- Regelvoorwaarden zijn combineerbaar (bevat in het afzenderadres, trefwoorden in het onderwerp, systeeminstellingen en dergelijke), met uitzonderingen en prioriteiten; labels worden automatisch bij ontvangst toegepast, of handmatig;
- Globale beheerinstrumenten: zwarte lijst van afzenders, zwarte lijst van trefwoorden in onderwerp en inhoud, witte-lijstmodus, onderschepping van afzenders zonder naam, onderschepping van niet-geadresseerden, onderschepping van uitvoerbare bijlagen en telling van afwijzingen door harde onderschepping;
- Labelstatistieken (totaal, ongelezen) worden in realtime in de zijbalk getoond; de classificatieresultaten zijn op de analysepagina te controleren.

## 5. Automatische extractie van verificatiecodes

![Detail van een e-mail in EpoCanvas Mail: de 6-cijferige verificatiecode uit een Cloudflare-mail wordt in groot lettertype getoond; zowel lijst als detail dragen de groene verificatiecodebadge](/images/mail/ui/ui-detail-verification.png)

*Figuur: extractie van verificatiecodes (screenshot in vereenvoudigd Chinees). Dit is de enige AI-verwerking die niet handmatig wordt getriggerd; alleen het onderwerp en de eerste 6,000 tekens van de body worden naar Workers AI gestuurd. De reikwijdte van de verwerking en de manier om deze uit te zetten staan in sectie 6 van het [Privacybeleid](/nl/mail/privacy-policy/).*

## 6. Spambeheer

- Quarantaine en bewaring: spam blijft 7 dagen in quarantaine en gaat daarna automatisch naar de prullenbak; het melden van spam／geen spam houdt, na bevestiging door de gebruiker, automatisch de persoonlijke vertrouwenslijst bij;
- Beperkingen op uitgaande e-mail: de dagelijkse verzendquota is per rol vastgesteld (gewone gebruikers 5 berichten, LV.0 8, LV.1 10, beheerders 100, het masteraccount is onbeperkt), met tellers die dagelijks worden gereset; de aanpak van quotummisbruik staat in sectie 6 van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/);
- De verantwoordelijkheid voor het verzenden van betaalde en marketinginhoud ligt bij de afzender; het ongevraagd bulkversturen van commerciële e-mail is verboden gedrag (zie sectie 3 van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/)).

## 7. Doorsturen en pushmeldingen

- **Persoonlijk doorsturen**: e-mail uit de mailbox kan automatisch naar andere adressen worden doorgestuurd, met ondersteuning voor cc;
- **Globaal doorsturen**: de beheerder kan doorstuurregels op systeemniveau configureren, afhankelijk van de e-mailmodus (uitgeschakeld in de modus «Versleuteld»);
- **Telegram-pushmeldingen**: na koppeling van de bot worden onderwerp, afzender, body en verificatiecode volgens de configuratie gepusht, met een leeslink op de site die 7 dagen geldig is; de pushvelden kunnen per stuk worden verborgen.

## 8. AI-mogelijkheden

| Mogelijkheid | Trigger | Beschrijving |
| --- | --- | --- |
| Extractie van verificatiecodes | automatisch bij nieuwe e-mail (uitschakelbaar) | inferentie aan de rand door Workers AI, zie sectie 5 |
| Volledige vertaling | handmatige klik | meertalige vertaling die de opmaak van de originele e-mail behoudt, segmenten gelijktijdig verwerkt; de modeleindpunten en het back-upkanaal staan in sectie 6 van het [Privacybeleid](/nl/mail/privacy-policy/) |
| Tekstherkenning in afbeeldingen | handmatige upload | ondertitels via OCR; puur decoratieve afbeeldingen worden automatisch overgeslagen |
| AI Hub | beheerdersconfiguratie | verbinding met multimodel-eindpunten die OpenAI-compatibel zijn, snelheidstests zonder tokens, modelautorisatie per rol |

De Exploitant traint geen enkel model op de inhoud van e-mail; de toegestemde AI-verwerking kan op elk moment worden ingetrokken (zie sectie 6 van het [Privacybeleid](/nl/mail/privacy-policy/)).

## 9. Open platform en gegevensautonomie

- **OAuth 2.0 / OIDC-authenticatiecentrum**: de beheerder kan apps van derden registreren, met autorisatiebereiken beperkt tot openid / profile / email en toegangstokens die 2 uur geldig zijn; de betrokkene kan de autorisaties op de pagina «Apps van derden» in realtime bekijken en op elk moment intrekken;
- **Integratiegids**: het registreren van apps aan beheerderskant, eindpunten en integratiecode staan in [Open platform en API-toegang](/nl/mail/api/);
- **Gegevensexport**: met één klik exporteert de instellingenpagina een volledige kopie in JSON-formaat (profiel en volledige tekst van niet-verwijderde e-mail); afzonderlijke e-mails kunnen als .eml worden gedownload;

## 10. Interface en mobiel

- Zes interfacetalen (Vereenvoudigd Chinees, Traditioneel Chinees, English, Français, Español, Nederlands), met volledig symmetrische woordenboeken in zes talen, zowel aan de front-end als aan de back-end;
- Lichte en donkere modus, 300+ offline vectorpictogrammen (nul externe verzoeken), responsieve indeling en PWA-installatie; er is ook een Android-app (epomail) beschikbaar.

![Postvak IN van de Engelse interface van EpoCanvas Mail: volledige meertaligheid; de zijbalk toont Compose, Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash en de labels Social, Subscriptions, Promotions, Work](/images/mail/ui/ui-inbox-en.png)

*Figuur: interface in het English. De interfacetaal is in te stellen; de symmetrie van de woordenboeken in zes talen wordt gewaarborgd door statische auditscripts.*

![Mobiele postvak IN van EpoCanvas Mail: responsieve indeling bij een breedte van 375, de zijbalk klapt in als lade en de lijst blijft volledig leesbaar (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-inbox-mobile.png)

*Figuur: mobiel (screenshot in vereenvoudigd Chinees). Dezelfde instantie past zich aan aan desktop- en mobiele browsers; installeren kan ook via een PWA of de Android-app.*

## 11. Gerelateerde documenten

| Resource | Link |
| --- | --- |
| OAuth-appregistratie en eindpuntintegratietutorial | [OAuth-appregistratie en eindpuntintegratietutorial](/nl/mail/api/) |
| Zoekoperators, beheerderszoek en regelvoorwaarden | [Zoek- en regelreferentie](/nl/mail/search/) |
| Interfaceroutes en locatie van de instellingensecties | [Interface en routekaart](/nl/mail/interface/) |
| Werkingsmodi: implementatievormen, e-mailmodi en aanmelding | [Werkingsmodi](/nl/mail/modes/) |
| Instellingengids: persoonlijke instellingen en de beheerconsole | [Instellingengids](/nl/mail/settings/) |
| Positionering en implementatie van het project | [Projectoverzicht](/nl/mail/project/) |
| Technische architectuur en beveiligingsontwerp | [Technische architectuur](/nl/mail/architecture/) |
| Officiële e-mail en verificatie tegen manipulatie | [Beveiliging tegen manipulatie en normen](/nl/mail/tamper-proof/) |
| Gegevensverwerking en bewaartermijnen | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Privacybeleid (AI-informatie en rechten) | [Privacybeleid](/nl/mail/privacy-policy/) |
