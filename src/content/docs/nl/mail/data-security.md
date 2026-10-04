---
title: Gegevensverwerking en Beveiligingsonderhoud
description: Gegevensbeveiliging en bescherming van persoonsgegevens van EpoCanvas Mail — beveiligingsmaatregelen, verantwoordelijkheidsgrenzen van de dubbele exploitatiesporen, uitoefening van uw rechten en reactie op beveiligingsincidenten.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.11**

Dit document beschrijft de maatregelen waarmee de officiële gehoste instantie (mail.epocanvas.com) gegevens beschermt, de verantwoordelijkheidsgrenzen tussen de gehoste dienst en het open-sourceproject, en hoe u uw eigen gegevens kunt inzien, exporteren en verwijderen. Het is opgesteld krachtens het [Privacybeleid](/nl/mail/privacy-policy/) en de [Servicevoorwaarden](/nl/mail/terms-of-service/); de technische feiten volgen de werkelijke implementatie in de open-sourcecode.

De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. De juridische en technische documenten op deze site volgen de open-sourceimplementatie van de dienst en beogen transparante, strenge, niet-commerciële normen voor gemeenschapscommunicatie.

<div class="privacy-checkup-row">
  <div class="privacy-checkup-icon">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#E8F0FE"/>
      <path d="M20 9L29 13V19C29 24.5 25.2 29.6 20 31C14.8 29.6 11 24.5 11 19V13L20 9Z" fill="#1967D2"/>
      <path d="M17 20L19.2 22.2L23.8 17.6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="privacy-checkup-content">
    <div class="privacy-checkup-title">Snelle gids voor beveiliging en privacy</div>
    <div class="privacy-checkup-desc">Wilt u weten hoe gegevens worden verzameld en beschermd, hoe u uw rechten uitoefent of hoe u deze documenten verifieert?</div>
    <a href="/nl/mail/overview/" class="privacy-checkup-link">Naar het documentenoverzicht ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. In de dienst ingebouwde beveiliging

De bescherming van gegevens op de officiële gehoste instantie is georganiseerd in vier lagen: transport, verwerking aan de rand, opslag in rust en referentiegegevens. Elke maatregel is in de open-sourcecode geïmplementeerd en onafhankelijk te controleren.

<div class="google-illustration-container">
  <img src="/images/mail/nl/security-trust-shield.svg" alt="Defensie in diepte van EpoCanvas Mail: versleuteld transport, staatloze randverwerking, versleuteling in rust en bescherming van referentiegegevens, rustend op de controle door de gebruiker" width="416" height="276" />
</div>

*Figuur: vier beschermingslagen — transport, rand, opslag in rust en referentiegegevens; de basis is uw eigen controle (zelfservice-export, verwijdering en tweestapsverificatie).*

### 1.1 Versleuteling van het transport

Wanneer u de dienst via een browser of de mobiele app benadert, worden alle verbindingen versleuteld met HTTPS/TLS, zodat de inhoud van de communicatie voor tussenliggende knooppunten op openbare netwerken onleesbaar blijft. Statische sitebestanden worden geleverd via een inhoudsnetwerk, met cache- en beveiligingskoppen.

### 1.2 Staatloze verwerking aan de rand

De bedrijfslogica draait op Cloudflare Workers (V8 Isolate-sandboxes): de tijdens de verwerking ontsleutelde platte tekst van een e-mail bestaat alleen in het geheugen van dat verzoek; als het verzoek eindigt, wordt de sandbox vrijgegeven en blijft er geen platte tekst achter op de fysieke schijven van de hostmachine. De dienst draait geen eigen permanente servers en geen altijd-doorlopende achtergrondprocessen.

### 1.3 Versleuteling in rust

Of onderwerpen en bodies van e-mails worden versleuteld, hangt af van de e-mailmodus van de instantie: in de modus «Versleuteld» worden onderwerp en body van elke e-mail opgeslagen met AES-256-GCM (met authenticatietags); in de modus «Privé» wordt alles versleuteld behalve spam en prullenbak; in de modus «Alles» wordt niet versleuteld. Elke record gebruikt een willekeurige initialisatievector. De versleutelingssleutels worden met HKDF-SHA256 afgeleid van een instantiebrede omgevingsvariabele met hoofdgeheim (`jwt_secret` / `totp_enc_key`) met een zout per gebruiker; het hoofdgeheim wordt nooit in de database geschreven noch in de repository vastgelegd. Als een instantie de omgevingsvariabelen met het hoofdgeheim niet configureert, degradeert de versleuteling naar een in de code ingebouwde standaardsleutel; de implementator moet de configuratie via de initialisatiepoort voltooien om dit te voorkomen. Bijlagen vallen buiten de versleutelingsomvang.

:::caution[Omvang en grenzen van de versleuteling]
Bovenstaande versleuteling is serverside-versleuteling in rust: zij beschermt tegen infrastructuurrisico's zoals gestolen databasebestanden of gelekte momentopnamen; het is geen end-to-end-versleuteling. Een exploitant die de server van de instantie en het hoofdgeheim beheerst, kan inhoud technisch ontsleutelen. Wat beheerders kunnen zien, hangt af van de e-mailmodus: in de modus «Alles» kan de beheerder elke e-mail lezen; in de modus «Privé» alleen spam, verwijderde en niet-toegewezen e-mail; in de modus «Versleuteld» geeft de beheerinterface de inhoud van gebruikersmail niet terug. Wilt u vertrouwelijkheid tegenover elke derde, inclusief de exploitant, versleutel dan zelf de body met GPG/OpenPGP of een vergelijkbaar clienthulpmiddel vóór het verzenden.
:::

### 1.4 Bescherming van referentiegegevens

- **Wachtwoorden**: gehasht met PBKDF2-HMAC-SHA256 bij 100.000 iteraties met een uniek willekeurig zout per gebruiker; nooit in platte tekst of omkeerbare vorm opgeslagen;
- **Tweestapsverificatie**: het TOTP-geheim wordt versleuteld met AES-256-GCM opgeslagen; herstelcodes worden alleen als SHA-256-hash bewaard;
- **Toegangssleutels (Passkey/WebAuthn)**: de server slaat alleen de publieke sleutel en de referentie-id op; de privésleutel blijft in de authenticator op uw apparaat en reist nooit over het netwerk.

### 1.5 Matrix van gegevensverwerking

De gegevenscategorieën, verzamelde velden, doelen, opslagmedia en bewaartermijnen van de dienst zijn als volgt:

| Gegevenscategorie | Verzamelde velden | Doel | Opslag en bescherming | Bewaring |
| --- | --- | --- | --- | --- |
| Accountreferenties | e-mailadres, gebruikersnaam, wachtwoordhash en zout, TOTP-geheim (versleuteld), hashes van herstelcodes, publieke sleutels van toegangssleutels | registratie, aanmelding, tweestapsverificatie | Cloudflare D1; PBKDF2 (100.000 iteraties), TOTP versleuteld in rust | zolang het account bestaat; sessies ingetrokken bij deactivering, onherstelbaar na fysieke verwijdering |
| Communicatiegegevens | afzender en ontvangers, CC/BCC, onderwerp, tijdstempels, leesstatus, labels, e-mailbody | verzenden, ontvangen, gesprekken organiseren, trefwoordzoekopdrachten | Cloudflare D1 (metadata); onderwerp en body versleuteld volgens de e-mailmodus | onder uw controle; prullenbak 7 dagen bewaard en daarna fysiek verwijderd |
| Netwerk- en apparaatgegevens | registratie-IP, IP van de laatste aanmelding, besturingssysteem, browser- en apparaattype | beveiligingsaudit, opsporing van ongebruikelijke aanmeldingen | Cloudflare D1; alleen in te zien door beheerdersaudits, nooit voor commercieel profileren | tot de fysieke verwijdering van het account |
| Randomgeving-gegevens | land/regiocode van het verzoek (`cf-ipcountry`) | interface-preselectie (zoals de standaard telefoonlandcode) | niet persistent; wordt alleen met het antwoord naar de browser teruggegeven | niet opgeslagen; vernietigd zodra het antwoord eindigt |
| Sessies en autorisaties | JWT-sessietokens, rolmachtigingen | rand-API-authenticatie | toestaanlijst in Cloudflare KV; hooguit 10 actieve sessies per account | 30 dagen geldig; direct verwijderd bij uitloggen |
| Bijlagen | originele bestandsnaam, MIME-type, bestandsgrootte, binaire inhoud | overdracht, voorbeeld en download van bijlagen | objectopslag van de instantie (opgelost in deze volgorde: eigen S3-compatibele opslag, R2-koppeling, standaard KV); defensieve koppen bij download | samen met de bijbehorende e-mail verwijderd |

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Verantwoordelijkheidsgrenzen van het dubbele exploitatiespoor

EpoCanvas Mail is tegelijk een officiële gehoste dienst en een open-sourceproject. De definitie van de verwerkingsverantwoordelijke en de verdeling van verantwoordelijkheid tussen de drie partijen staan in paragraaf 2 van het [Privacy- en voorwaardenoverzicht](/nl/mail/overview/); dit hoofdstuk vult aan met de positionering van de gehoste instantie en de regels voor het verspreiden van de open-sourcecode.

<div class="google-illustration-container">
  <img src="/images/mail/nl/dual-nature-scale.svg" alt="Dubbele bestuursstructuur van EpoCanvas Mail: één open-sourcecodebase, met de verwerkingsverantwoordelijke en verantwoordelijkheidsgrenzen van gehoste en zelfgehoste instanties" width="416" height="276" />
</div>

*Figuur: twee exploitatiesporen op één open-sourcecodebase. Het exploitatieteam is de verwerkingsverantwoordelijke van de gehoste instantie; de deployer is de enige verwerkingsverantwoordelijke van een zelfgehoste instantie; de oorspronkelijke auteurs exploiteren geen dienst en houden geen gegevens bij.*

### 2.1 Positionering van de officiële gehoste instantie

De gehoste instantie mail.epocanvas.com wordt door het exploitatieteam niet-commercieel geëxploiteerd: geen advertenties, geen verkoop of verhuur van gebruikersgegevens, en geen enterpriseniveau-serviceovereenkomst (SLA). De beschikbaarheid hangt af van upstreamdiensten zoals Cloudflare en de bezorgkanalen; exporteer zelf regelmatig back-ups van belangrijke correspondentie (zie paragraaf 3).

### 2.2 Gedragsgrenzen

Gebruik van de gehoste instantie is onderworpen aan het volledige [beleid voor acceptabel gebruik](/nl/mail/acceptable-use/), waaronder het verbod op massale ongevraagde e-mail, phishing en het verspreiden van malware, bulkaanmeldingen en misbruik van bronnen. Overtredingen worden volgens de uitvoeringsladder van dat beleid afgehandeld, tot aan fysieke verwijdering.

### 2.3 Verspreiden en bewerken van de open-sourcecode

De broncode is gepubliceerd onder de MIT-licentie; iedereen mag haar inzien, auditen, wijzigen en zelf hosten. Bij verspreiding of bewerking van de code:

1. laat de oorspronkelijke auteursrechtvermelding en de volledige MIT-licentietekst onaangetast;
2. suggereer niet in domeinen, interfaces of promotiemateriaal dat een instantie door het officiële team wordt geëxploiteerd of goedgekeurd;
3. wie publieke e-mailregistratie aanbiedt, publiceert een eigen exploitant, servicevoorwaarden en privacybeleid. De documenten op deze site kunnen als voorbeeld dienen; dat is geen goedkeuring.

### 2.4 Onafhankelijke verantwoordelijkheid van zelfgehoste instanties

Een derde die de open-sourcecode deployt, wordt vanaf het moment van deployen de enige en exclusieve verwerkingsverantwoordelijke voor de gebruikers van die instantie, en moet zelf de informatie-, beveiligings- en toezichtsverplichtingen nakomen die het recht op haar locatie vereist. De oorspronkelijke auteurs en bijdragers exploiteren geen enkele instantie, hebben geen toegang tot gegevens van zelfgehoste instanties en dragen geen deelverantwoordelijkheid voor de exploitatie, beveiligingsincidenten of geschillen van een instantie.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. De controle over uw gegevens

U heeft met betrekking tot uw eigen gegevens recht op inzage, kopie, verbetering, het stopzetten van verwerking en verwijdering. Dit hoofdstuk legt uit via welke functie elk recht wordt gerealiseerd; de volledige definities staan in paragraaf 9 van het [Privacybeleid](/nl/mail/privacy-policy/).

<div class="google-illustration-container">
  <img src="/images/mail/nl/data-sovereignty-export.svg" alt="Gegevenscontrole van EpoCanvas Mail: zelfservice-export, verwijderen met prullenbakbuffer en afdwingbare rechten" width="416" height="276" />
</div>

*Figuur: drie controlevanen: zelfservice-export (JSON), verwijdering (prullenbakbuffer, daarna fysieke verwijdering) en rechtenuitoefening (antwoord binnen 30 dagen).*

### 3.1 Inzage, export en verbetering

- **Zelfservice in de interface**: u kunt op elk moment uw profiel, uw aanmeldgeschiedenis en al uw e-mail in de mailboxinterface inzien;
- **Gegevensexport**: «Instellingen → Gegevensexport» levert een complete kopie in JSON-opmaak (profiel en volledige tekst van niet-verwijderde e-mail); een enkele e-mail kan ook als .eml-bestand worden gedownload;
- **Handmatige verzoeken**: verzoeken die menselijke afhandeling vragen, zoals verbetering of het stopzetten van verwerking, worden binnen 30 dagen na ontvangst beantwoord en verwerkt, via `privacy@epocanvas.com`.

### 3.2 Verwijdering

- **E-mail verwijderen**: verwijderde e-mail gaat eerst naar de prullenbak en wordt 7 dagen later door een geplande taak fysiek verwijderd (bijlagen en indexen inbegrepen); verwijdering is onomkeerbaar. Bij mailboxgebruik boven 90 % van de quota wordt wat u verwijdert onmiddellijk fysiek verwijderd om ruimte vrij te maken;
- **Account deactiveren**: dat kunt u zelf in de instellingen doen. Sessies vervallen onmiddellijk en e-mail en gegevens komen in een zacht-verwijderde staat; tenzij de wet bewaring vereist, voert een beheerder de fysieke verwijdering binnen 90 dagen na deactivering uit. Daarna zijn accountgegevens, e-mail, bijlagen en machtigingen uit de database en objectopslag verwijderd en niet herstelbaar;
- **Overeenkomende wettelijke rechten**: de rechten op inzage, kopie en verwijdering die het AVG gebruikers in de Europese Economische Ruimte geeft, en de rechten op informatie, verwijdering en non-discriminatie die de CCPA/CPRA inwoners van Californië geeft, worden via bovengenoemde zelfservicefuncties en het handmatige verzoekkanaal gerealiseerd; gebruikers elders oefenen gelijkwaardige rechten uit krachtens het recht op hun locatie.

### 3.3 Uitsluiting van verkoop en tracking

- De exploitant verkoopt, verhuurt of verhandelt uw persoonsgegevens en communicatie-inhoud niet;
- Gegevens worden niet gebruikt voor cross-contextuele gedragsreclame, gebruikersprofilering of het trainen van commerciële modellen;
- Het uitoefenen van uw privacyrechten leidt niet tot minder functionaliteit, kwaliteit of beschikbaarheid van de dienst.

### 3.4 Reactie op beveiligingsincidenten

Als persoonsgegevens worden gestolen, gelekt, gewijzigd of verloren, gaat de exploitant als volgt te werk:

1. **Onmiddellijke insluiting**: betrokken sessies gedwongen afmelden en getroffen inhoud in quarantaine, met zo nodig gedeeltelijke stillegging van de dienst om ergere schade te voorkomen;
2. **Wettelijke melding**: melding bij de toezichthouder binnen 72 uur nadat het incident bekend is geworden (voor zover het toepasselijke recht een andere termijn stelt, geldt die termijn en wordt zo snel mogelijk gemeld), en informering van getroffenen via een aankondiging op de site of systeemmail;
3. **Gepubliceerde herstelmaatregelen**: nadat de oorzaak duidelijk is, publicatie van fixes en een beveiligingsbericht in de open-sourcebron, zodat zelfhosters gelijktijdig kunnen patchen.

Om een beveiligingsprobleem of kwetsbaarheid te melden, gebruikt u:

- **Beveiliging en officiële communicatie**: `announcement@epocanvas.com`
- **Privacy en gegevensbescherming**: `privacy@epocanvas.com`
