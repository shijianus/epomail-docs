---
title: Gegevensverwerking en Beveiligingsonderhoud
description: EpoCanvas Mail end-to-end gegevensbeveiliging, dubbele bestuursstructuur van cloud en open source, en wereldwijde naleving.
---

**Ingangsdatum: 1 oktober 2026 | Gearchiveerde versies | Versie: 5.6**

Wanneer u EpoCanvas Mail gebruikt, vertrouwt u ons uw persoonlijke communicatie en gegevens toe. Wij begrijpen dat dit een grote verantwoordelijkheid is en doen er alles aan om uw gegevens te beveiligen, absolute transparantie te waarborgen en ervoor te zorgen dat u te allen tijde de volledige controle en soevereiniteit over uw informatie behoudt.

Dit document valt onder ons [Privacybeleid](/nl/mail/privacy-policy/) en onze [Servicevoorwaarden](/nl/mail/terms-of-service/). Het dient als gezaghebbende handleiding voor gebruikers van ons officiële gehoste platform (mail.epocanvas.com), terwijl het duidelijke juridische grenzen stelt voor het open-sourceproject (epocanvas-mail) en de exclusieve verantwoordelijkheid van zelf-hostende beheerders als onafhankelijke verwerkingsverantwoordelijken definieert.

<div class="privacy-checkup-row">
  <div class="privacy-checkup-icon">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#E8F0FE"/>
      <path d="M20 9L29 13V19C29 24.5 25.2 29.6 20 31C14.8 29.6 11 24.5 11 19V13L20 9Z" fill="#1967D2"/>
      <path d="M17 20L19.2 22.2L23.8 17.6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="privacy-checkup-content">
    <div class="privacy-checkup-title">Beknopte privacy- en beveiligingsgids</div>
    <div class="privacy-checkup-desc">Wilt u de beveiligingsstatus van uw mailbox controleren, FIDO2-toegangssleutels instellen, tweestapsverificatie (TOTP) inschakelen of uw gegevens exporteren?</div>
    <a href="/nl/mail/overview/" class="privacy-checkup-link">Naar het beveiligingsoverzicht ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. Wij bouwen beveiliging in onze diensten in om uw gegevens te beschermen

Alle gegevens die worden verwerkt op ons officiële gehoste cloudplatform (mail.epocanvas.com) worden continu beschermd door meerdere lagen van diepgaande verdediging. Wij leggen de volledige verwerkingscyclus openbaar uit, zodat u onze technische garanties kunt verifiëren.

<div class="google-illustration-container">
  <img src="/images/mail/security-trust-shield.svg" alt="Beveiligings- en vertrouwensgaranties van EpoCanvas Mail" width="416" height="276" />
</div>

### 1.1 Versleuteling tijdens overdracht en netwerkbeveiliging

Wij dwingen het moderne Transport Layer Security-protocol (TLS 1.3) af met HSTS-preloadbeleid voor alle inkomende en uitgaande netwerkverbindingen. Of u nu via de webinterface interacteert, de beveiligde REST API aanroept of e-mail tussen knooppunten verzendt, uw communicatie blijft tijdens de overdracht versleuteld om afluisteren en manipulatie te voorkomen.

### 1.2 Vluchtige edge-uitvoering en geheugenscheiding

Wanneer u e-mails verzendt of ontvangt, wordt de bedrijfslogica onmiddellijk uitgevoerd in de Cloudflare Workers edge-knooppunten (V8-isolaten) die zich fysiek het dichtst bij uw locatie bevinden. Ontsleutelde gegevens bevinden zich tijdens de verwerking uitsluitend in het vluchtige RAM-geheugen en de omgeving wordt na voltooiing binnen nanoseconden fysiek vernietigd, zonder residu op fysieke schijven.

### 1.3 Industriële versleuteling in rust (AES-256-GCM)

Voordat e-mailberichten en gevoelige metagegevens worden opgeslagen in de Cloudflare D1-database, worden de gegevens verzegeld met dynamische initialisatievectoren (IV) via het AES-256-GCM-algoritme met authenticatielabel (Auth Tag). Versleutelingssleutels worden dynamisch geïnjecteerd via beveiligde runtime-omgevingsvariabelen, zonder ooit op schijf of in code-opslagplaatsen te worden bewaard.

### 1.4 Robuuste wachtwoordhashing en fysieke toegangssleutels

Wachtwoorden worden nooit in platte tekst of als eenvoudige hashes bewaard. Het systeem past 100.000 rondes van het PBKDF2-algoritme toe in combinatie met willekeurige cryptografische salts. Tweefactorverificatiesleutels (TOTP) worden in rust versleuteld met de hoofdsleutel. Het systeem ondersteunt standaard WebAuthn / FIDO2-toegangssleutels (Passkeys), waarbij privésleutels veilig zijn opgeslagen in de hardware-chip van de gebruiker.

### 1.5 Uitgebreide gegevensverwerkingsmatrix

De volgende tabel geeft een overzicht van alle verzamelde gegevenscategorieën, specifieke velden, verwerkingsdoeleinden, opslagmedia en bewaartermijnen:

| Gegevenscategorie | Specifieke verzamelde velden | Primair verwerkingsdoel | Opslagmedium en beveiliging | Bewaartermijn en vernietiging |
| --- | --- | --- | --- | --- |
| **Accountreferenties** | E-mailadres, gebruikersnaam, wachtwoordhash en salt, TOTP-sleutel, Passkey-publieke sleutel | Registratie, inloggen, tweestapsverificatie, herstel | Cloudflare D1; PBKDF2 (100k iteraties), TOTP AES-versleuteld | Bewaard tot beëindiging; fysiek overschreven bij accountverwijdering |
| **Communicatie** | Afzender, ontvangers, CC/BCC, onderwerp, tijdstempels, labels, inhoud van berichten | E-mailbezorging, mailboxbeheer, zoekfunctionaliteit | Cloudflare D1 (metagegevens); inhoud verzegeld met AES-256-GCM | Beheerd door gebruiker; prullenbak bewaart 7 dagen voor definitieve wisactie |
| **Netwerk- en apparaatdata** | Registratie-IP, recent login-IP, besturingssysteem, User-Agent, model | Beveiligingsaudits, anomaliedetectie, snelheidsbeperking | Cloudflare D1; strikt beperkt tot administratieve audits; nooit voor profilering | Bewaard tot accountverwijdering |
| **Sessie en autorisatie** | JWT-sessietokens, RBAC-rollen, actieve mailboxcontext | Autorisatie bij edge API-gateway, routering | Cloudflare KV; maximale geldigheidsduur 30 dagen | Direct ingetrokken bij uitloggen; verloopt na 30 dagen inactiviteit |
| **Bijlagen** | Oorspronkelijke bestandsnaam, MIME-type, bestandsgrootte, binaire data | Veilige bestandsoverdracht, inline weergave, downloads | Configureerbare S3, Cloudflare R2 of KV; geserveerd met defensieve headers | Volgt levenscyclus van e-mail; verwijderd bij definitieve wisactie |
| **Veiligheidsvingerafdrukken** | Bekende apparaten, geografische ASN-voetafdruk, anti-alarmtijdstempels | Ongebruikelijke inlogpogingen herkennen, accountbeveiliging | Cloudflare KV (`USER_KNOWN_ENV_`-voorvoegsel); laatste 15 patronen | Opgeschoond na 90 dagen inactiviteit of bij uitschrijving |

:::caution[Reikwijdte van versleuteling, technische beperkingen en risicobewustzijn]
De versleuteling op het officiële gehoste cloudplatform betreft **versleuteling in rust aan de serverzijde (Server-side Encryption at Rest)**. Ontsleutelingssleutels worden tijdens de actieve verwerking in het vluchtige werkgeheugen geladen. Dit beschermt tegen diefstal van databases of fysieke schijven, maar is geen end-to-end versleuteling (E2EE).

Beheerders met root-infrastructuurtoegang hebben technisch gezien de theoretische mogelijkheid tot inzage in het geheugen. Wij leggen niemand belemmeringen op om de dienst te gebruiken, maar gebruikers dienen zich bewust te zijn van hun risico's: als uw communicatie staatsgeheimen bevat of absolute zero-trust vertrouwelijkheid vereist, **moet u zelfstandig cryptografische hulpmiddelen aan de clientzijde (zoals GPG / OpenPGP) gebruiken om berichten lokaal te versleutelen vóór verzending**.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Bestuursmodel met dubbele aard: Gehoste dienst en open-source codebase

EpoCanvas Mail kent een duidelijke dubbele identiteit: het is zowel een gratis toegankelijke gehoste e-maildienst voor het publiek als een autonoom open-sourcesoftwareproject onder de MIT-licentie. Het duidelijk afbakenen van de verantwoordelijkheden en juridische grenzen van beide is essentieel voor een gezond ecosysteem.

<div class="google-illustration-container">
  <img src="/images/mail/dual-nature-scale.svg" alt="Evenwicht in het bestuursmodel met dubbele aard van EpoCanvas Mail" width="416" height="276" />
</div>

### 2.1 Verbintenissen van het officiële platform (mail.epocanvas.com)

Het officiële platform `mail.epocanvas.com` wordt door het kernteam beheerd als een dienst van algemeen nut. Wij verplichten ons tot het handhaven van een hoge beschikbaarheid, de volledige afwezigheid van commerciële advertenties, een strikt beleid van nul tracking en het naleven van cryptografische integriteitsnormen.

Aangezien het platform kosteloos wordt aangeboden, zijn er geen commerciële Service Level Agreements (SLA's) van toepassing. Wij wijzen aansprakelijkheid voor indirecte schade ten gevolge van netwerkstoringen bij upstream-infrastructuur (zoals Cloudflare-storingen) of onveilige gebruikersapparaten af. Gebruikers zijn zelf verantwoordelijk voor het regelmatig maken van offline back-ups.

### 2.2 Wat wij van u verwachten en anti-misbruikregels

Wij willen een veilige en betrouwbare communicatieomgeving bieden. Door gebruik te maken van onze gehoste dienst stemt u in met de volgende basisregels:

*   **Toepasselijke wetgeving naleven**: De dienst niet gebruiken om exportcontroles, economische sancties of wettelijke rechten van derden te schenden;
*   **Nultolerantie voor spam**: Het is ten strengste verboden ongevraagde commerciële bulkmail, marketingberichten of intimidatie te verzenden;
*   **Verbod op phishing en aanvallen**: Geen kwaadaardige software verspreiden, geen identiteitsfraude plegen en geen injectie-aanvallen op onze systemen uitvoeren;
*   **Geen geautomatiseerde exploitatie**: Geen accounts massaal registreren via scripts of snelheidslimieten omzeilen. Accounts die deze regels overtreden, worden per direct beëindigd.

### 2.3 Open-sourcelicentie, aanpassingen en distributie

De volledige broncode van EpoCanvas Mail is gepubliceerd onder de MIT-licentie. Iedereen heeft het onbeperkte wettelijke recht om de code te inspecteren, te auditen, te forken, aan te passen of onafhankelijke privé-knooppunten te implementeren.

Bij herdistributie of aanpassing moeten drie strikte grenzen in acht worden genomen:

*   **Bescherming van het officiële merk**: Zonder voorafgaande schriftelijke toestemming mag geen enkele externe instantie de aanduiding «EpoCanvas Mail Officieel» of officiële logo's gebruiken in domeinen of promotie;
*   **Behoud van auteursrechten**: Alle kopieën of substantiële wijzigingen moeten de oorspronkelijke auteursrechtvermelding en de volledige MIT-licentietekst behouden;
*   **Duidelijkheid over de onafhankelijke beheerder**: Elke partij die e-maildiensten aanbiedt op basis van deze code, moet haar eigen juridische identiteit, voorwaarden en privacybeleid publiceren.

### 2.4 Exclusieve verantwoordelijkheid voor zelf-hostende beheerders

Dit is een fundamentele juridische scheidslijn:

Wanneer een derde partij de broncode implementeert op een eigen Cloudflare-account of eigen server, **wordt die beheerder de enige en exclusieve verwerkingsverantwoordelijke (Data Controller) voor die instantie**.

De oorspronkelijke softwareontwikkelaars hebben geen achterdeurtjes, verzamelen geen telemetrie en hebben geen toegang tot gegevens van externe instanties. Elk gegevenslek of juridisch geschil op een zelf-gehoste server **valt onder de uitsluitende verantwoordelijkheid van de betreffende beheerder; de oorspronkelijke auteurs dragen geen enkele hoofdelijke aansprakelijkheid**.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Controle over uw gegevens: Export, verwijdering en wereldwijde naleving

EpoCanvas Mail is wereldwijd toegankelijk. Ongeacht waar u woont, behoudt u het volledige eigendom en de controle over uw gegevens.

<div class="google-illustration-container">
  <img src="/images/mail/data-sovereignty-export.svg" alt="Gegevenssoevereiniteit en exportrechten in EpoCanvas Mail" width="416" height="276" />
</div>

### 3.1 Volledige uitoefening van rechten onder de Europese AVG

Voor gebruikers in de Europese Economische Ruimte (EER) waarborgen wij de rechten uit artikelen 15 tot en met 22 van de AVG:

*   **Recht op inzage (Artikel 15)**: U kunt te allen tijde uw accountgegevens, inloggeschiedenis en opgeslagen e-mails inzien;
*   **Gegevensoverdraagbaarheid en export (Artikel 20)**: U kunt een volledige kopie van uw e-mails downloaden in het standaardformaat `.eml` met gestructureerde JSON-metagegevens;
*   **Recht op gegevenswissing / vergetelheid (Artikel 17)**: Wanneer u uw account verwijdert, beëindigt het systeem actieve sessies en wordt de versleutelingssleutel op fysiek niveau cryptografisch overschreven, waardoor herstel onmogelijk is;
*   **Standaardcontractbepalingen (SCC's)**: Doorgiften via het wereldwijde edgenetwerk zijn gebaseerd op de modelcontractbepalingen van de Europese Commissie.

### 3.2 Toezeggingen onder de California Consumer Privacy Act (CCPA / CPRA)

Voor inwoners van Californië en de Verenigde Staten verklaren wij:

*   **Geen verkoop of deling van persoonsgegevens (Do Not Sell or Share)**: In de afgelopen 12 maanden hebben wij geen persoonsgegevens van gebruikers verkocht of gedeeld met databrokers of adverteerders, en wij zullen dit ook nooit doen;
*   **Beperking van gevoelige gegevens**: Gegevens worden uitsluitend gebruikt om de e-maildienst te leveren en nooit voor gedragsadvertenties of ongeautoriseerde AI-training;
*   **Verbod op discriminatie**: Wij zullen de dienstverlening of opslagcapaciteit nooit beperken wanneer u uw privacyrechten uitoefent.

### 3.3 Regio Azië-Pacific en internationale doorgifte

Het officiële team opereert vanuit Taiwan en voldoet aan de Wet bescherming persoonsgegevens (PDPA). Gebruikers dienen rekening te houden met de aard van het internet:

E-mail is een gedistribueerd protocol op basis van SMTP. Bij communicatie met internationale ontvangers doorkruisen datapakketten wereldwijde netwerkknooppunten die vallen onder de telecomwetgeving van de transitlanden. Het wordt aangeraden lokale apparaten te beveiligen en FIDO2-toegangssleutels te gebruiken.

### 3.4 Incidentrespons binnen 72 uur en officiële contactkanalen

Wij hanteren een gestandaardiseerde werkwijze (SOP) voor incidentrespons:

*   **Snelle beheersing**: Bij dreigingen blokkeert de gateway verdachte IP-adressen en trekt sessietokens binnen enkele minuten in;
*   **Wettelijke melding binnen 72 uur**: Als een geverifieerd incident persoonsgegevens raakt, stellen wij getroffenen binnen 72 uur per e-mail en via de website op de hoogte, en melden wij dit bij de toezichthouder;
*   **Open-source patches**: Oplossingen worden gepubliceerd in de openbare repository, vergezeld van beveiligingsadviezen (Security Advisories).

Voor beveiligingsmeldingen, kwetsbaarheden of privacyvragen kunt u contact opnemen via onze officiële kanalen:

*   **Veiligheidsresponscentrum**: `announcement@epocanvas.com`
*   **Privacy- en gegevensbeschermingsbureau**: `privacy@epocanvas.com`
