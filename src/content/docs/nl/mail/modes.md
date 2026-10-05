---
title: Werkingsmodi
description: Werkingsmodi van EpoCanvas Mail — implementatievormen, de drie privacy niveaus van de e-mailmodus, identiteitsgroepen en quota's, aanmelding en tweestapsverificatie, meerdere accounts en weergavemodi van de interface.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.14**

Dezelfde codebasis van EpoCanvas Mail neemt bij verschillende configuraties verschillende werkingsvormen aan: een instantie kan gehost of zelf uitgerold worden; de beheerder kiest tussen privacy en controleerbaarheid in drie e-mailmodi; accounts krijgen quota's en rechten naar gelang hun identiteitsgroep; en aanmelding, meerdere accounts en de weergave bieden elk verschillende opties. Deze pagina beschrijft het gedrag van en de verschillen tussen elke modus. Voor de gegevensverwerking die erbij hoort, zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/); voor het gebruik van de functies, zie de [Functiegids](/nl/mail/features/); voor de instellingen zelf, zie de [Instellingengids](/nl/mail/settings/).

## 1. Implementatievormen: gehoste instantie en eigen uitrol

De dienst bestaat in de volgende twee vormen; de aanwijzing van de gegevensbeheerder in elk geval staat in sectie 2 van het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/):

| Vorm | Exploitant | Geschikt voor |
| --- | --- | --- |
| Gehoste instantie | Het EpoCanvas-exploitatieteam ([mail.epocanvas.com](https://mail.epocanvas.com)) | Registreren en gebruiken, zonder eigen domein of Cloudflare-account |
| Zelf uitgerolde instantie | De persoon of organisatie die uitrolt | Alle gegevens blijven binnen de eigen Cloudflare-bronnen van de uitrolder, met controleerbare broncode |

## 2. E-mailmodus: drie privacy niveaus

De beheerder kiest de e-mailmodus van de instantie op de website-instellingenkaart van de systeeminstellingen. De modus bepaalt het versleutelingsbeleid bij opslag en in welke mate de beheerkant de e-mailinhoud van gebruikers kan zien:

![Systeeminstellingen van EpoCanvas Mail, kaart website-instellingen: het keuzemenu van de e-mailmodus is open en toont Alle e-mail-modus (Level 1), Privé-e-mailmodus (Level 2 [Aanbevolen]) en Versleutelde e-mailmodus (Level 3 [E2EE]); de huidige waarde is de privée-mail-modus met een Level 2-badge voor versterkte privacy (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-mail-mode-select.png)

*Figuur: keuze van de e-mailmodus. De getoonde instantie draait in de privée-mail-modus; de personalisatiekaart rechts en de opslag- en pushkaarten eronder staan op dezelfde pagina.*

| Modus | E-mailopslag | Zichtbaarheid beheerkant | Hoofdschakelaar tweestaps | Globaal doorsturen en bot-push |
| --- | --- | --- | --- | --- |
| Alle e-mail-modus (Level 1) | Alles in platte tekst | Alle e-mail | Kan uit | Kan aan |
| Privé-e-mailmodus (Level 2, fabrieksinstelling) | Correspondentie van gebruikers versleuteld in rust met AES-256-GCM; prullenbak blijft in platte tekst voor herstel | Alleen spam, prullenbak en email zonder eigenaar | Vergrendeld op aan | Kan aan |
| Versleutelde e-mailmodus (Level 3 [E2EE]) | Alle e-mail (prullenbak meegerekend) volledig versleuteld | Levert helemaal geen emaillijsten van gebruikers | Vergrendeld op aan | Vergrendeld op uit |

Een moduswijziging werkt onmiddellijk door. In de versleutelde modus blijft de beheerlijst van e-mail permanent leeg, worden tijdstempels uit de auditrapporten gehaald en verdwijnt de e-mailcontrole-ingang uit de beheerzijbalk. Individueel doorsturen en Telegram-push die gebruikers zelf instellen volgen de sitewijde modus niet; die vallen onder de schakelaars voor gebruikersgegevensbeheer van de exploitant en de eigen instellingen van de gebruiker. In de privémodus wordt een bericht dat uit de prullenbak teruggehaald wordt eerst ontsleuteld voordat het terug in de mailbox belandt, en daarna opnieuw versleuteld.

## 3. Identiteitsgroepen en quota's

Elk account hoort bij één identiteitsgroep, die het verzendquotum, het aantal mailboxen, de opslagquota en de bijlagerechten bepaalt:

![Permissionspagina van EpoCanvas Mail: de tabel noemt de zes identiteitsgroepen — Gewone gebruiker, Bezoeker, Gewone gebruiker LV.0, Gewone gebruiker LV.1, Moderator en Meester — elk met positietag, opslagquota, verzendlimiet, bijlagerecht en AI-modelautorisatiekolommen (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-roles.png)

*Figuur: het architectuur- en gradatieoverzicht op de permissionspagina. Opslagquota, verzendlimiet en bijlagerecht worden per groep ingesteld; de groep Meester heeft geen verzend- of mailboxplafond.*

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

![Aanmeldpagina van EpoCanvas Mail: velden voor e-mailadres en wachtwoord, een selectievakje om de baanverbinding te houden en de aanmeldknop, met daaronder de snelle aanmeldknoppen van Google en GitHub, beide grijs met een «binnenkort»-badge (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-login-oauth.png)

*Figuur: de aanmeldpagina. Aanmelden met wachtwoord is de basisweg; snelle-aanmeldknoppen van derden die door de beheerder zijn ingeschakeld zonder sleutels staan grijs als «binnenkort», uitgeschakelde worden niet getoond.*

- Aanmelden met wachtwoord: de basisweg op elke instantie; de wachtzin wordt als gezouten hash opgeslagen, en herhaalde mislukkingen lokken een anti-bruteforce-blokkade uit;
- Tweestapsverificatie: wordt door de accounthouder ingeschakeld in het tweestapscentrum van de beveiligingsinstellingen; er zijn drie tweede factoren: een authenticator-app (TOTP dynamische codes), back-upherstelcodes (10 eenmalige codes) en toegangssleutels (Passkey, hardwarebeveiligingssleutels of biometrie van het apparaat);
- Vertrouwde apparaten: na het aanvinken van «Niet opnieuw vragen op dit apparaat» tijdens de tweestapsverificatie blijft het apparaat 30 dagen van herverificatie vrijgesteld; tussen 30 en 60 dagen wordt de verificatie opnieuw gevraagd, en na 60 dagen vervalt het vertrouwen; automatisering of manipulatie van de omgeving krijgt de vrijstelling altijd geweigerd;
- Snelle aanmelding via derden: de beheerder schakelt en configureert aanbieders één voor één in uit GitHub, Google, Microsoft, Apple en een eigen SSO; een ingeschakelde aanbieder zonder sleutels staat grijs als «binnenkort», een uitgeschakelde wordt niet getoond. De gegevens die bij aanmelding via derden meekomen, staan in de [Verwerkerslijst](/nl/mail/sub-processors/).

![Beveiligingsinstellingenpagina van EpoCanvas Mail: de bovenste kaart bevat gebruikersnaam, mailbox en wachtwoordwijziging; eronder somt het tweestapscentrum de drie tweede factoren op — authenticator-app, back-upherstelcodes en toegangssleutels — elk met configuratiestatus en actieknoppen (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-security-2fa.png)

*Figuur: het tweestapscentrum op de beveiligingsinstellingenpagina. Elke tweede factor wordt onafhankelijk ingesteld en ze kunnen gecombineerd worden.*

## 5. Multi-accountmodus

De beheerder kan «snel wisselen tussen meerdere accounts» aanzetten (standaard uit). Eenmaal aan, toont het avatarmenu de aangemelde accounts met een wisselinvul, en «uw Epomail-accounts beheren» opent het toevoegtraject; elk account houdt een onafhankelijke sessie, en de interfacepaden zijn geïsoleerd met het voorvoegsel `/mail/u/index/`: wisselen van account overschrijft nooit de aanmeldstatus van een ander. Wisselen tussen mailboxaliassen binnen één account maakt geen nieuwe sessie aan.

![Avatarmenu van EpoCanvas Mail geopend rechtsboven in de postvak IN: het huidige account admin (Meester) met pijl, de knop «uw Epomail-accounts beheren» en de opslagverbruikbalk (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-account-menu.png)

*Figuur: snel wisselen tussen accounts. Het menu verzamelt de aangemelde accounts; het toevoegen van een account verloopt via het eigen traject op de aanmeldpagina, en sessies overschrijven elkaar nooit.*

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
| Zichtbaarheid van het beheer op e-mailinhoud | [Privacybeleid](/nl/mail/privacy-policy/), sectie 10 |
