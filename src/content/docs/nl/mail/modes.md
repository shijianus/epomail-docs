---
title: Werkingsmodi
description: Werkingsmodi van EpoCanvas Mail — implementatievormen, de drie privacy niveaus van de e-mailmodus, identiteitsgroepen en quota's, aanmelding en tweestapsverificatie, meerdere accounts en weergavemodi van de interface.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.25**

Dezelfde codebasis van EpoCanvas Mail neemt bij verschillende configuraties verschillende werkingsvormen aan: een instantie kan gehost of zelf uitgerold worden; de beheerder kiest tussen privacy en controleerbaarheid in drie e-mailmodi; accounts krijgen quota's en rechten naar gelang hun identiteitsgroep; en aanmelding, meerdere accounts en de weergave bieden elk verschillende opties. Deze pagina beschrijft het gedrag van en de verschillen tussen elke modus. Voor de gegevensverwerking die erbij hoort, zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/); voor het gebruik van de functies, zie de [Functiegids](/nl/mail/features/); voor de instellingen zelf, zie de [Instellingengids](/nl/mail/settings/).

## 1. Implementatievormen: gehoste instantie en eigen uitrol

De dienst bestaat in de volgende twee vormen; de aanwijzing van de gegevensbeheerder in elk geval staat in sectie 2 van het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/):

| Vorm | Exploitant | Geschikt voor |
| --- | --- | --- |
| Gehoste instantie | Het EpoCanvas-exploitatieteam ([mail.epocanvas.com](https://mail.epocanvas.com)) | Registreren en gebruiken, zonder eigen domein of Cloudflare-account |
| Zelf uitgerolde instantie | De persoon of organisatie die uitrolt | De belangrijkste resources worden door de uitrolder geconfigureerd; uitgaande e-mail, identiteitsbronnen, objectopslag, AI en meldingen kunnen nog steeds andere dienstverleners betrekken. Zie de lijst van verwerkers |

## 2. E-mailmodus: drie privacy niveaus

De beheerder kiest de e-mailmodus van de instantie op de website-instellingenkaart van de systeeminstellingen. De modus bepaalt het versleutelingsbeleid bij opslag en in welke mate de beheerkant de e-mailinhoud van gebruikers kan zien:

![Systeeminstellingen van EpoCanvas Mail, kaart website-instellingen: het keuzemenu van de e-mailmodus is open en toont Alle e-mail-modus (Level 1), Privé-e-mailmodus (Level 2 [Aanbevolen]) en Versleutelde e-mailmodus (Level 3 [E2EE]); de huidige waarde is de privée-mail-modus met een Level 2-badge voor versterkte privacy (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/mode-guide.png)

*Figuur: een interfacevoorbeeld van de keuze van de e-mailmodus; de moduswaarde en badges op de schermafbeelding bewijzen niet hoe de online instantie momenteel is geconfigureerd en staan niet voor end-to-end-versleuteling.*

<details>
<summary>Visuele handleiding: De mailmodus —  hoe één dropdown de privacy van de hele instantie bepaalt</summary>

Het gebied e-mailmodus op de kaart Website-instellingen in de systeeminstellingen: het keuzemenu beïnvloedt de versleuteling van velden bij latere verwerking en de zichtbaarheid in de beheerinterface; het bewijst niet dat historische gegevens volledig zijn gemigreerd.

1. **Keuzemenu voor de e-mailmodus**: Level 1 slaat e-mails onversleuteld op; Level 2, de privémodus en fabrieksstandaard, past serverzijdige versleuteling in rust toe op een deel van de berichtteksten en onderwerpen van gebruikers; Level 3, de versleutelde modus, breidt die versleuteling uit en zorgt ervoor dat de beheerlijst geen e-mails van gebruikers teruggeeft. Geen van deze modi biedt end-to-end-versleuteling; de server kan ontsleutelen.
2. **Badge voor versterkte privacy op Level 2**: In de privémodus kan de beheerlijst spam, de prullenbak en e-mails zonder eigenaar tonen; de hoofdschakelaar voor tweestapsverificatie is vergrendeld op aan. De badge bewijst niet dat beheerders technisch geen toegang tot andere gegevens kunnen krijgen.
3. **De drie uitgeklapte opties**: Een E2EE-label in de interface of op een schermafbeelding verandert het feitelijke ontwerp met serverzijdige versleuteling niet. De versleutelde modus verbergt de ingang voor controle over de hele opslag, verwijdert tijdstempels uit handelingenrapporten en schakelt doorsturen en botmeldingen op systeemniveau uit; persoonlijk ingestelde doorgiften worden daardoor niet automatisch uitgeschakeld.

</details>

| Modus | E-mailopslag | Zichtbaarheid beheerkant | Hoofdschakelaar tweestaps | Globaal doorsturen en bot-push |
| --- | --- | --- | --- | --- |
| Alle e-mail-modus (Level 1) | Alles in platte tekst | Alle e-mail | Kan uit | Kan aan |
| Privé-e-mailmodus (Level 2, fabrieksinstelling) | Correspondentie van gebruikers versleuteld in rust met AES-256-GCM; prullenbak blijft in platte tekst voor herstel | Alleen spam, prullenbak en email zonder eigenaar | Vergrendeld op aan | Kan aan |
| Versleutelde e-mailmodus (Level 3, in de interface aangeduid als E2EE) | Breidt de serverzijdige versleuteling in rust van onderwerpen en berichtteksten uit; bijlagen en routeringsmetadata zijn niet automatisch inbegrepen | Levert helemaal geen emaillijsten van gebruikers | Vergrendeld op aan | Op systeemniveau vergrendeld op uit; persoonlijke instellingen afzonderlijk controleren |

Een moduswijziging beïnvloedt de latere verwerking en beheerlijsten, maar bewijst niet dat alle historische registraties, kopieën of bijlagen zijn gemigreerd. In de versleutelde modus blijft de beheerlijst van e-mail leeg, worden sommige tijdstempels uit handelingenrapporten verwijderd en verdwijnt de controle-ingang uit de beheerzijbalk. Persoonlijk doorsturen en Telegram-push worden niet automatisch door de sitebrede modus uitgeschakeld; daarvoor gelden de betreffende controles en persoonlijke instellingen. In de privémodus worden het onderwerp, de berichttekst en de verificatiecode bij verplaatsing naar de prullenbak eerst ontsleuteld opgeslagen en zichtbaar voor beheerders; na herstel wordt het bericht opnieuw volgens de modus versleuteld.

## 3. Identiteitsgroepen en quota's

Elk account hoort bij één identiteitsgroep, die het verzendquotum, het aantal mailboxen, de opslagquota en de bijlagerechten bepaalt:

![Permissionspagina van EpoCanvas Mail: de tabel noemt de zes identiteitsgroepen — Gewone gebruiker, Bezoeker, Gewone gebruiker LV.0, Gewone gebruiker LV.1, Moderator en Meester — elk met positietag, opslagquota, verzendlimiet, bijlagerecht en AI-modelautorisatiekolommen (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/roles-guide.png)

*Figuur: het architectuur- en gradatieoverzicht op de permissionspagina. Opslagquota, verzendlimiet en bijlagerecht worden per groep ingesteld; de groep Meester heeft geen verzend- of mailboxplafond.*

<details>
<summary>Visuele handleiding: Rollen —  vijf kolommen bepalen wat een rol mag doen</summary>

De tabel met de zes identiteitsgroepen op de pagina Rechtenbeheer: vijf gemarkeerde kolommen voor de vijf dimensies die per groep instelbaar zijn.

1. **Kolom identiteitsgroep**: Zes groepen — Gewone gebruiker, Bezoeker, Gewone gebruiker LV.0, LV.1, Moderator en Meester — elk met een positietag. De groep bepaalt de standaardwaarden van de andere vier kolommen; Bezoeker en Meester zijn beschermd en kunnen niet worden verwijderd.
2. **Kolom opslagquota**: Eén opslagquota voor bijlagen per groep (Bezoeker 0 MB tot Meester 1024 MB, in de interface als «onbeperkt» gelabeld). Met gekoppelde persoonlijke objectopslag tellen nieuwe bijlagen niet meer mee voor deze quota.
3. **Kolom verzendlimiet**: Het dagelijkse verzendquotum (Gewone gebruiker 5 tot Moderator 100; Meester zonder plafond), dat elke dag opnieuw begint. Groepen die niet mogen verzenden — de Bezoeker — krijgen hier de markering «verzenden verboden».
4. **Kolom bijlagerecht**: Of bijlagen verzonden en ontvangen mogen worden. Groepen met «alleen platte tekst» versturen zonder bijlagen; bij open groepen blijven de opslagquota en de limiet per bestand van kracht.
5. **Kolom geautoriseerde AI-modellen**: Welke AI-modellen de groep mag aanroepen, in samenspel met het dagquotum en de ratelimiet van de AI Hub in de systeeminstellingen — AI-capaciteit getrapt per identiteit.

</details>

| Identiteitsgroep | Positionering | Dagelijkse verzending | Mailboxen | Opslagquota | Bijlagen |
| --- | --- | --- | --- | --- | --- |
| Bezoeker | Alleen-lezen zandbak voor open-sourcerondes en inspectie | Verboden | 0 | 0 MB | Niet toegestaan |
| Gewone gebruiker | Basislid | 5 | 1 | 5 MB | Niet toegestaan |
| Gewone gebruiker LV.0 | Gecertificeerde vriend | 8 | 2 | 10 MB | Niet toegestaan |
| Gewone gebruiker LV.1 | Actieve geleerde | 10 | 3 | 25 MB | Toegestaan |
| Moderator | Medebeheer | 100 | 10 | 500 MB | Toegestaan |
| Meester | Hoogste gezag | Geen plafond | Geen plafond | 1024 MB | Toegestaan |

Nieuwe registraties belanden in de fabrieksstandaardgroep, de Bezoeker; de exploitant kan de standaardgroep op de permissionspagina wijzigen. De niveaus LV.0 en LV.1 synchroniseren automatisch via de blogniveaus: een blogaccount koppelen tilt het account naar LV.0, en actieve blogdeelname naar LV.1. De Bezoeker is een alleen-lezen zandbak met de volledige interface: de alleen-lezen beheersecties zijn te bekijken, maar het versturen van e-mail is verboden. Quota's en rechten blijven per instantie instelbaar op de permissionspagina; de tabel hierboven toont de fabrieksstandaardwaarden. Verzending en het aantal mailboxen van de groep Meester hebben geen plafond (nulwaarden); de opslag staat fabrieksstandaard op 1024 MB (de permissionspagina labelt deze als «onbeperkt») en blijft naar behoefte instelbaar.

## 4. Aanmelding en tweestapsverificatie

![Aanmeldpagina van EpoCanvas Mail: velden voor e-mailadres en wachtwoord, een selectievakje om de baanverbinding te houden en de aanmeldknop, met daaronder de snelle aanmeldknoppen van Google en GitHub, beide grijs met een «binnenkort»-badge (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/login-guide.png)

*Figuur: de aanmeldpagina. Aanmelden met wachtwoord is de basisweg; snelle-aanmeldknoppen van derden die door de beheerder zijn ingeschakeld zonder sleutels staan grijs als «binnenkort», uitgeschakelde worden niet getoond.*

<details>
<summary>Visuele handleiding: Aanmelden —  drie stappen van één wachtwoordlogin</summary>

De drie kerngebieden van het aanmeldscherm: één volledig traject voor aanmelden met wachtwoord; de knoppen voor snelle aanmelding via derden staan onder de kaart.

1. **Veld voor het e-mailadres**: Het account is het e-mailadres zelf. In de registratiesleutelmodus accepteert deze pagina ook een uitnodigingsparameter `?code=` die het registratieformulier alvast invult.
2. **Veld voor het wachtwoord**: Het wachtwoord wordt via TLS aan de server doorgegeven voor verificatie; de server ontvangt dus de ingevoerde waarde. Blijvende verificatieregistraties gebruiken een gezouten hash, maar sommige nog niet afgeronde MFA-processen bewaren het wachtwoord kortstondig onversleuteld; zie het document over gegevensbeveiliging. «Wachtwoord vergeten» kan het type bezwaar, de taal en het e-mailadres doorgeven aan het geconfigureerde beroepsportaal.
3. **Aanmeldknop**: Na verzending gaan accounts met tweestapsverificatie door naar de tweede factor; herhaalde mislukkingen lokken een anti-bruteforce-blokkade uit. Vink «Niet opnieuw vragen op dit apparaat» aan om 30 dagen van herverificatie vrijgesteld te zijn.

</details>

- Aanmelden met wachtwoord: de basisweg op elke instantie; de wachtzin wordt als gezouten hash opgeslagen, en herhaalde mislukkingen lokken een anti-bruteforce-blokkade uit;
- Tweestapsverificatie: wordt door de accounthouder ingeschakeld in het tweestapscentrum van de beveiligingsinstellingen; er zijn drie tweede factoren: een authenticator-app (TOTP dynamische codes), back-upherstelcodes (10 eenmalige codes) en toegangssleutels (Passkey, hardwarebeveiligingssleutels of biometrie van het apparaat);
- Vertrouwde apparaten: na het aanvinken van «Niet opnieuw vragen op dit apparaat» tijdens de tweestapsverificatie blijft het apparaat 30 dagen van herverificatie vrijgesteld; tussen 30 en 60 dagen wordt de verificatie opnieuw gevraagd, en na 60 dagen vervalt het vertrouwen; automatisering of manipulatie van de omgeving krijgt de vrijstelling altijd geweigerd;
- Snelle aanmelding via derden: de beheerder schakelt en configureert aanbieders één voor één in uit GitHub, Google, Microsoft, Apple en een eigen SSO; een ingeschakelde aanbieder zonder sleutels staat grijs als «binnenkort», een uitgeschakelde wordt niet getoond. De gegevens die bij aanmelding via derden meekomen, staan in de [Verwerkerslijst](/nl/mail/sub-processors/).

![Beveiligingsinstellingenpagina van EpoCanvas Mail: de bovenste kaart bevat gebruikersnaam, mailbox en wachtwoordwijziging; eronder somt het tweestapscentrum de drie tweede factoren op — authenticator-app, back-upherstelcodes en toegangssleutels — elk met configuratiestatus en actieknoppen (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/twofa-guide.png)

*Figuur: het tweestapscentrum op de beveiligingsinstellingenpagina. Elke tweede factor wordt onafhankelijk ingesteld en ze kunnen gecombineerd worden.*

<details>
<summary>Visuele handleiding: Het tweestapscentrum —  vier kaarten, drie tweede factoren</summary>

Vier gebieden van de beveiligingspagina: bovenaan de ingangen om de accountgegevens te wijzigen, onderaan het tweestapscentrum met drie tweede factoren die gecombineerd kunnen worden.

1. **Kaart gebruikersnaam en wachtwoord**: Wijzig de gebruikersnaam en het wachtwoord, met de datum van de laatste wijziging erbij. Ook het uitzetten van tweestapsverificatie vereist hier het wachtwoord plus een dynamische code.
2. **Authenticator-app (TOTP)**: Na het scannen van de QR-code geeft de app elke 30 seconden een code van 6 cijfers. Zodra de koppeling klaar is, verschijnen onmiddellijk 10 back-upherstelcodes, elk eenmalig bruikbaar om aan te melden wanneer de authenticator niet beschikbaar is.
3. **Back-upherstelcodes**: De terugvaloptie wanneer de authenticator weg is. De kaart toont hoeveel codes er nog zijn; het bekijken van de volledige codes of het opnieuw genereren vereist het wachtwoord van het account, en na een herstel vervallen alle oude codes.
4. **Toegangssleutels (Passkey)**: Hardwarebeveiligingssleutels of biometrie van het apparaat. Een nieuw geregistreerde sleutel wordt actief zodra de gekoppelde authenticator goedkeurt (of automatisch na een tijdslimiet van 30 dagen); met «Testen» controleer je daarna het ontgrendeltraject.

</details>

## 5. Multi-accountmodus

De beheerder kan snel wisselen tussen meerdere accounts inschakelen; dit staat standaard uit. Het avatarmenu toont dan de aangemelde accounts en opties om te wisselen of accounts toe te voegen; `/mail/u/index/` selecteert het account. Accounts kunnen afzonderlijke sessies hebben en lokale conceptdatabases worden op mailboxadres gekozen, maar opslag binnen dezelfde origin vormt geen afzonderlijk browserprofiel. In de lokale implementatie van deze ronde beëindigt gewoon uitloggen alleen de huidige sessie en wist het de cache van het geopende bericht en de ontvangersgeschiedenis; sessies van andere accounts en concepten blijven behouden. Het trekt niet alle tokens of deellinks in. Wisselen tussen mailboxaliassen van hetzelfde account maakt geen nieuwe sessie. Dit bevestigt geen uitrol naar alle online instanties; zie paragraaf 4.3 van het privacybeleid voor gedeelde apparaten.

![Avatarmenu van EpoCanvas Mail geopend rechtsboven in de postvak IN: het huidige account admin (Meester) met pijl, de knop «uw Epomail-accounts beheren» en de opslagverbruikbalk (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-account-menu.png)

*Figuur: snel wisselen tussen accounts. Het menu verzamelt de aangemelde accounts; het toevoegen van een account verloopt via het eigen traject op de aanmeldpagina, en sessies overschrijven elkaar nooit.*

<details>
<summary>Visuele handleiding: Het avatarmenu —  het knooppunt van accounts en accountdetails</summary>

Het avatarmenu dat rechtsboven in het postvak IN wordt uitgeklapt: het verzamelpunt voor het wisselen tussen meerdere accounts en de accountgegevens.

- **Accountrij**: Het huidige account (admin · Meester) met een wisselpijl; in de multi-accountmodus worden aangemelde sessies getoond. `/mail/u/N/` selecteert het account, maar het pad zelf vormt geen scheiding van opslag of apparaattoegang.
- **Knop «uw Epomail-accounts beheren»**: Voegt via de aanmeldpagina een account toe en keert terug naar de wissellijst; de route scheidt de opslag niet. Bevestig apparaatopruiming afzonderlijk onder Instellingen → Gegevens om gegevens van alle accounts van deze site uit deze browser te verwijderen. Gewoon uitloggen wist niet stilzwijgend concepten van andere accounts.
- **Opslagverbruikbalk**: De voortgangsbalk voor de bijlagenopslag van dit account: de teller is de gebruikte ruimte, de noemer het quotum van de rol (per-rol fabriekswaarden op de rollenpagina). Nadat persoonlijke objectopslag is gekoppeld, tellen nieuwe bijlagen hier niet meer mee — een balk die stopt met groeien betekent dus niet dat er geen bijlagen meer aankomen.

</details>

## 6. Interfacetalen en weergavemodi

De interface bestaat in zes talen — 简体中文, 繁體中文, English, Français, Español en Nederlands — om te wisselen in de algemene instellingen; systeempost en welkomstpost gaan naar elke ontvanger in diens taal. De weergave kent drie standen — donker, licht en systeem volgen — aangevuld met wereldwijde themaachtergronden en een persoonlijke achtergrond. De webapp kan als PWA geïnstalleerd worden, en er is ook een Android-app (epomail).

## 7. Verwante documenten

| Bron | Link |
| --- | --- |
| Volledige stappen voor zelfhosting | [Uitrolgids](/nl/mail/deployment/) |
| De dienstgrenzen van de gehoste instantie en haar ondersteuningskanalen | [Dienstomvang en ondersteuning](/nl/mail/service-scope/) |
| Positionering van het project en uitrol | [Projectoverzicht](/nl/mail/project/) |
| Rondleiding langs persoonlijke instellingen en de beheerconsole | [Instellingengids](/nl/mail/settings/) |
| Functies in detail met schermafbeeldingen | [Functiegids](/nl/mail/features/) |
| Privacybetekenis en bewaartermijnen van de e-mailmodi | [Gegevensverwerking en beveiliging](/nl/mail/data-security/) |
| Zichtbaarheid van het beheer op e-mailinhoud | [Privacybeleid](/nl/mail/privacy-policy/), sectie 4 |
