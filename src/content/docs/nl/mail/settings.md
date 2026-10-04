---
title: Instellingengids
description: Instellingengids van EpoCanvas Mail — de vijf secties van de persoonlijke instellingen (profiel, algemeen, beveiliging, gegevens, labels) en een volledige rondleiding langs de negen secties van de beheerconsole en de kaarten van de systeeminstellingen.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.11**

EpoCanvas Mail verdeelt zijn instellingen over twee zones: de zone «instellingen» van de zijbalk bevat de persoonlijke instellingen die elk account zelf kan aanpassen, in vijf secties — profiel, algemeen, beveiliging, gegevens en labels; de zone «beheer» verschijnt alleen voor identiteitsgroepen met beheerrechten en draagt de configuratie op instantieniveau. Deze pagina loopt elke zone langs en laat zien hoe de instellingen samenhangen. Voor het gedrag op werkingsniveau — multi-account, e-mailmodi, aanmelding — zie [Werkingsmodi](/nl/mail/modes/).

## 1. Secties van de persoonlijke instellingen

| Sectie | Inhoud |
| --- | --- |
| Profiel | Avatar, bijnaam, geslacht, verjaardag en contactgegevens |
| Algemeen | Bio, uiterlijkpalet, themaachtergrond, leesvoorkeuren, interfacetaal en doeltaal van vertaling |
| Beveiliging | Gebruikersnaam en wachtwoord, tweestapscentrum, account verwijderen |
| Gegevens | Data-export, meldingen en doorsturen, opslagruimte en persoonlijke cloudopslag |
| Labels | Aangepaste labels en classificatieregels |

## 2. Profiel: persoonlijke gegevens

![Profielpagina van EpoCanvas Mail: de kaart basisinformatie bevat avatar-upload, bijnaam, geslacht en verjaardag; de contactkaart toont het e-mailadres met zijn hoofdmailbox-tag, de knop om e-mail toe te voegen en telefoonnummers; de adreskaarten voor thuis, bedrijf en overig volgen eronder (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-settings-profile.png)

*Figuur: de profielpagina. De hoofdmailbox draagt een «hoofdmailbox»-tag; extra e-mailadressen kunnen er meerdere zijn en zijn op elk moment te verwijderen.*

De kaart basisinformatie beheert avatar, bijnaam, geslacht en verjaardag. De contactkaart somt de hoofdmailbox van aanmelding op en de extra e-mailadressen die de houder zelf toevoegt, plus telefoonnummers met landcode. De adreskaarten bewaren het thuisadres, het zakelijke adres en andere adressen apart. Hoeveel daarvan openbaar is, wordt bepaald door de schakelaar «openbaar profiel» van de exploitant.

## 3. Algemeen: uiterlijk en taal

![Algemene pagina van EpoCanvas Mail: een bio-tekstvak; het uiterlijkgedeelte biedt de paletten donker, licht en systeem volgen; de globale themaachtergrond biedt acht presets plus een eigen achtergrond, met de persoonlijke achtergrond en verdere instellingen eronder (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-settings-general.png)

*Figuur: keuze van uiterlijkpalet en themaachtergrond op de algemene pagina, getoond met «systeem volgen» en de standaard egale achtergrond.*

- Uiterlijk: donker, licht en systeem volgen als paletten; acht achtergrondpresets plus eigen achtergronden; de persoonlijke achtergrond en de interfacedichtheid worden apart ingesteld;
- Leesvoorkeuren: type postvak IN, positie van het leesvenster en de schakelaar voor gespreksweergave;
- Taal: één interfacetaal uit zes; de doeltaal van vertaling wordt apart ingesteld, met 17 opties, en bepaalt het doel van de volledige AI-vertaling; vertaling via tekstherkenning in afbeeldingen kan apart worden uitgezet;
- Het privacygedeelte voor gegevens bundelt de ingangen voor voorkeuren over persoonlijke gegevens en AI-verwerking.

## 4. Beveiliging: wachtwoord en tweestapsverificatie

De beveiligingspagina wijzigt de gebruikersnaam en het wachtwoord (met de datum van de laatste wijziging). Het tweestapscentrum bevat de hoofdschakelaar en de onafhankelijke configuratie van de drie tweede factoren: authenticator-app (TOTP), back-upherstelcodes (10 eenmalige codes) en toegangssleutels (Passkey). Voor het aanmeldgedrag en de regels voor vertrouwde apparaten, zie sectie 4 van [Werkingsmodi](/nl/mail/modes/). Onderaan de pagina staat de ingang om het account te verwijderen; na verwijdering worden de accountgegevens verwerkt volgens de verwijderbepalingen van het [Privacybeleid](/nl/mail/privacy-policy/).

## 5. Gegevens: export, meldingen en opslag

![Gegevenspagina van EpoCanvas Mail: de exportkaart biedt de volledige JSON-export, het e-mailarchief (MBOX, JSON of CSV met periode) en de export van contacten en configuratie; de opslagkaart eronder toont de verbruiksmeter voor bijlagen en de ingang van persoonlijke objectopslag (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-settings-data.png)

*Figuur: de gegevenspagina. Export en opslagbeheer staan op één pagina; het bijlagenverbruik telt mee voor de quota van de identiteitsgroep.*

| Export | Formaat | Bereik |
| --- | --- | --- |
| Volledige data-export | JSON | Volledige back-up: accountgegevens, e-mailgeschiedenis, contacten, classificatie- en labelregels, en beveiligingsinstellingen |
| Archief van de e-mailgeschiedenis | MBOX (universeel), JSON of CSV | Alleen verzonden en ontvangen e-mail, met optionele periode |
| Contacten en configuratie | JSON | Contactenlijst, eigen aliasregels en personalisatievoorkeuren |

Een los bericht wordt rechtstreeks in het leesvenster als .eml gedownload. Het gedeelte meldingen en doorsturen biedt Telegram-push (een bot en chat-ID koppelen) en regels voor het doorsturen van e-mail (eigen bestemmingsadres; triggers zijn alle e-mail, aliasvoorvoegsel en slimme regels, met opties voor een kopie en een voorvoegsel bij het onderwerp); of deze twee aan gebruikers worden aangeboden, beslissen de schakelaars voor gebruikersgegevensbeheer van de exploitant. Het opslaggedeelte toont de verbruiksmeter voor bijlagen en maakt het mogelijk een eigen objectopslag te koppelen (een eigen Backblaze B2- of S3-bucket); eenmaal gekoppeld gaan bijlagen rechtstreeks naar de persoonlijke cloud, buiten de quota van de instantie.

## 6. Labelbeheer

De labelsectie beheert de kleuren en iconen van aangepaste labels en stelt de voorwaarden, uitzonderingen en prioriteiten van regels in; de vier fabriekslabels zijn Gemeenschap, Abonnementen, Promoties en Werk. Het gedrag van de regelemotor en de zoeksyntax staan in sectie 3 en 4 van de [Functiegids](/nl/mail/features/).

## 7. Beheerconsole

De beheerzone wordt onderdeel voor onderdeel getoond naar gelang de rechten van de identiteitsgroep, en de interfacepaden zijn gebonden aan de groep om misbruik van rechten te voorkomen. De negen beheersecties:

| Sectie | Verantwoordelijkheid |
| --- | --- |
| Analyse | Dashboards van e-mailvolume, classificatie en labels |
| Gebruikerslijst | Zoeken van accounts, wachtwoord herstellen, identiteitsgroep wijzigen, tweestaps herstellen, blokkeren en herstellen, mailbox legen |
| Spam / Alle e-mail | De sectie voor e-mailcontrole op siteniveau; naam en bereik volgen de e-mailmodus (Level 1 toont Alle e-mail, Level 2 de spamsectie, Level 3 verbergt de ingang) |
| Rechten | Quota- en rechtenmalplaatjes voor de zes identiteitsgroepen, de standaardgroep en AI-modelautorisatie; de groepen Bezoeker en Meester zijn tegen verwijdering beschermd |
| Registratiesleutels | Uitgeven en controleren van uitnodigingscodes |
| Systeeminstellingen | Configuratie op instantieniveau — zie de kaartenlijst hieronder |
| Appbeheer | Uitgeven en beheren van de toegangsreferenties van OAuth 2.0 / OIDC-applicaties van derden |
| Classificatie | Schakelaars voor ontvangen en verzenden, configuratie van AI-herkenning, blacklists en whitelists en harde blokkeerregels |
| Auditrapport | Beoordeling, afhandeling en arbitrage van de vier waarschuwingsklassen |

De pagina systeeminstellingen ordent de configuratie op instantieniveau in kaarten:

| Kaart | Inhoud |
| --- | --- |
| Website-instellingen | Open registratie, openbare profielen, e-mailmodus, tweestapsverificatie, verborgen aanmelddomein, registratiecodes, extra mailboxen, snel wisselen tussen accounts, regels voor mailboxvoorvoegsel |
| Interface-aanpassing | Sitetitel, pop-upmeldingen, dynamische/statische interface |
| Derdenauthenticatie en SSO | De hoofdschakelaar voor snelle aanmelding via derden en referenties per aanbieder (getoond onder een functievlag) |
| Opslag en kerndatabase | Objectopslag (B2 / S3, standaard met terugval op R2 / KV), architectuur van kerndatabase en externe database, limiet voor enkele bijlage en trapsgewijs wissen, KV-cachegezondheidscheck |
| E-mail-push | Telegram-bot, globaal doorsturen en doorsturen via regels (in de versleutelde modus vergrendeld op uit) |
| AI Hub | AI-aanbieder (eigen OpenAI-compatibel eindpunt of Cloudflare Workers AI), inschakelaar, dagquotum en ratelimiet, modelautorisatie |
| Gebruikersgegevensbeheer | Telegram-push van gebruikers, e-mail doorsturen, API en eigen opslag, en de standaard opslagquota |
| Turnstile | Sitesleutel van de mensverificatie en schakelaar |
| Meldingen op de site en welkomstmail | Meldingpop-ups, aankondigingsverzendingen en welkomstmail-sjablonen (meertalig) |
| Beleid van het auditrapport | Operationele drempels die waarschuwingen uitlokken |
| Over | Versie-informatie en updatecontrole |

De pagina auditrapport toont de risicogebeurtenissen van de site als waarschuwingstickets, elk met klasse, prioriteit, status en de volledige omgevingsdetails (IP, geolocatie, apparaat en vingerafdruk):

| Waarschuwingsklasse | Uitlokker | Gebruikelijke afhandeling |
| --- | --- | --- |
| Auditwaarschuwing | Een gemelde overtreding die door andere gebruikers is gesignaleerd en na toetsing stand houdt | Verifiëren en dan vrijgeven of optreden |
| Risicowaarschuwing | Een rode lijn van veiligheid of een afwijkende aanmeldomgeving (bijv. gelijktijdige multi-IP- en multilocatie-aanmeldingen) | Scherp volgen, gesprek of blokkeren |
| Blokkeerwaarschuwing | Het account is automatisch door het systeem of handmatig door een beheerder geblokkeerd | Waarschuwing opheffen of de blokkade houden |
| Beroepswaarschuwing | De gebruiker heeft beroep gedaan op een afhandelingsbeslissing | Vrijgeven (blokkade opheffen) of verwerpen |

![Auditrapportpagina van EpoCanvas Mail: de tabel toont waarschuwingstickets van de vier klassen — beroep, blokkade, audit en risico — met prioriteit, statuslabel, details van de actieve omgeving en afhandelknoppen zoals vrijgeven en waarschuwing opheffen (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-audit-report.png)

*Figuur: het auditrapport. De vier waarschuwingsklassen worden in één lijst beoordeeld, met afhandelknoppen per klasse; in de versleutelde modus worden de tijdstempels uit de records gehaald.*

## 8. Verwante documenten

| Bron | Link |
| --- | --- |
| Implementatievormen, e-mailmodi en aanmelding | [Werkingsmodi](/nl/mail/modes/) |
| Functies in detail met schermafbeeldingen | [Functiegids](/nl/mail/features/) |
| Technische topologie en versleuteling | [Technische architectuur](/nl/mail/architecture/) |
| Gegevensverwerking en bewaartermijnen achter de instellingen | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
