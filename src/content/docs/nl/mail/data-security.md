---
title: Gegevensverwerking en Beveiligingsonderhoud
description: Gegevenslevenscyclus, verwerkingsmatrix, diepgaande verdedigingsarchitectuur, dubbele bestuursstructuur en wereldwijde naleving van EpoCanvas Mail.
---

**Ingangsdatum: 1 oktober 2026 | Versie: 5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail hanteert de kernfilosofie dat «privacy een fundamenteel mensenrecht is» en «code het contract vormt». Wij hebben een bestuursmodel met een «dubbele aard» opgezet, waarbij een beheerde clouddienst harmonieus samengaat met een autonoom open-sourcesoftwareproject. Dit document beschrijft de volledige levenscyclus van persoonsgegevens, onze cryptografische opslagmatrix, onze diepgaande verdediging in vier lagen en de wettelijke kaders in verschillende rechtsgebieden.
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ Nul telemetrie (Zero Telemetry)</span>
    <span class="google-pill">🔐 AES-256-GCM versleuteling in rust</span>
    <span class="google-pill">⚡ Vluchtige edge-uitvoering (V8)</span>
    <span class="google-pill">🌐 Wereldwijde naleving (AVG / CCPA)</span>
  </div>
</div>

Dit document valt onder ons [Privacybeleid](/nl/mail/privacy-policy/) en onze [Servicevoorwaarden](/nl/mail/terms-of-service/). Het dient als gezaghebbende leidraad voor gebruikers die onze privacygaranties willen verifiëren, als operationele basis voor zelfstandige nodebeheerders en als toetsingskader voor toezichthoudende autoriteiten.

## 1. Volledige gegevenslevenscyclus en edge-verwerkingsmodel

Persoonsgegevens en berichtenstromen worden strikt ingedeeld in zes fasen: Verzameling, Verwerking, Gebruik, Doorgifte, Bewaring en Cryptografische vernietiging. Alle fasen worden staatloos uitgevoerd op het wereldwijde Anycast-edgenetwerk van Cloudflare, waardoor persistentie op fysieke schijven en ongeoorloofde zijwaartse toegang worden uitgesloten.

![Gegevensverwerking en end-to-end levenscyclus van EpoCanvas Mail: Staatloze verzameling, edge V8-isolatie, AES-256-GCM envelopversleuteling, gelaagde opslag en cryptografische vernietiging](/images/mail/data-security-pipeline.svg)

*Figuur 1: Volledige levenscyclus van persoonsgegevens. Minimale gegevensverzameling en strikte cryptografische isolatie worden in elke fase gehandhaafd; zie sectie 5 van het [Privacybeleid](/nl/mail/privacy-policy/) voor juridische definities.*

### 1.1 Minimale verzameling en belofte van nul telemetrie

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Minimale gegevensverzameling en absolute nul telemetrie</div>
    <span class="google-pill">Gegevensminimalisatie · Geen profilering</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Strikte minimalisatie</strong>: Naast de accountgegevens die strikt noodzakelijk zijn voor registratie en routering (gebruikersnaam, e-mailalias) en authenticatiereferenties, verzamelt het systeem nooit adresboeken, klemborden, gyroscopen of browseroverstijgende trackinggegevens.</p>
    <p><strong>Nul telemetrie zonder compromis</strong>: EpoCanvas Mail handhaaft een onvoorwaardelijk beleid van «nul gedragstelemetrie», zowel op het beheerde platform als in de open-source codebase. Er zijn geen commerciële analytics-SDK's, advertentiepixels of monitorscripts van derden aanwezig; alle interacties vinden uitsluitend plaats in uw lokale geïsoleerde mailbox.</p>
  </div>
</div>

### 1.2 Vluchtige edge-uitvoering en geheugenisolatie

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚡ Vluchtige edge-rekenkracht en nanoseconde-zandbakken</div>
    <span class="google-pill">Cloudflare V8 · Geen fysieke schijfopslag</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Staatloze V8-isolaten</strong>: Zodra e-mails binnenkomen of gebruikers verzoeken indienen, wordt de bedrijfslogica direct uitgevoerd op het dichtstbijzijnde Cloudflare Workers edge-knooppunt (V8 Isolate), waarna de zandbakomgeving binnen nanoseconden fysiek wordt vernietigd.</p>
    <p><strong>Geen persistentie op fysieke schijven</strong>: Ontsleutelde payloads en routeringsparameters verblijven uitsluitend in het vluchtige RAM-geheugen en worden nooit weggeschreven naar fysieke schijven van de hostserver, wat risico's op achterblijvende processen of zijdelingse aanvallen tussen huurders uitsluit.</p>
  </div>
</div>

### 1.3 Cryptografische vernietiging en onherroepelijk recht op vergetelheid

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🗑️ Cryptografische vernietiging en permanent wissen</div>
    <span class="google-pill">7 dagen herstelperiode · Sleuteloverschrijving</span>
  </div>
  <div class="google-card-desc">
    <p><strong>7 dagen veiligheidsbuffer en periodieke opschoning</strong>: Berichten in de prullenbak worden gedurende een veiligheidsperiode van 7 dagen bewaard tegen per ongeluk wissen, waarna ze onomkeerbaar fysiek worden overschreven door edge-Cron-taken; bij een mailboxbezetting boven 90% volgt automatische fysieke verwijdering.</p>
    <p><strong>Onherroepelijke sleuteloverschrijving</strong>: Bij accountbeëindiging worden niet alleen de records in de D1-database en KV-opslag gewist, maar worden ook de hoofdsleutels in de hardwarematige opslag overschreven, waardoor gegevens mathematisch en fysiek voorgoed onherstelbaar zijn.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Gegevensverwerkingsmatrix en opslagmediaspecificaties

In de onderstaande tabel zijn alle gegevenscategorieën, verzamelde velden, verwerkingsdoeleinden, onderliggende opslagmedia en bewaartermijnen gecatalogiseerd onder gelaagde cryptografische beveiliging:

| Gegevenscategorie | Specifieke elementen | Verwerkingsdoel | Opslagmedium en beveiligingsstandaard | Bewaring en verwijdering |
| --- | --- | --- | --- | --- |
| Accountreferenties | E-mailadres, gebruikersnaam, wachtwoordhash & zout, TOTP-sleutel (AES-GCM), backuphash, Passkey-publieke sleutel | Registratie, verificatie, tweestapsverificatie, herstel | Cloudflare D1; wachtwoord PBKDF2 (100.000 iteraties met zout), statische TOTP-versleuteling | Tot beëindiging van account; direct fysiek gewist |
| Netwerk- en apparaatgegevens | Registratie-IP, laatste login-IP, besturingssysteem, User-Agent, apparaattype | Beveiligingsaudit, anomaliedetectie, snelheidsbeperking | Cloudflare D1; strikt beperkt tot administratieve audits | Tot fysieke verwijdering van het account |
| Sessiestatus | JWT-token, RBAC-rolclaims, geselecteerde mailbox | Autorisatie bij edge-gateway, routering | Cloudflare KV; maximale geldigheidsduur van 30 dagen | Ingetrokken bij uitloggen; verloopt na 30 dagen inactiviteit |
| Communicatiegegevens | Afzender/ontvanger, CC/BCC, onderwerp, tijdstempels, leesstatus, labels, sterren, inhoud | E-mailaflevering, conversatieweergave, zoekfunctie | Cloudflare D1 (metadata); inhoud versleuteld in rust met AES-256-GCM | Beheerd door betrokkene; prullenbak na 7d geleegd; auto-wis bij >90% opslag |
| Bijlagen | Oorspronkelijke bestandsnaam, MIME-type, bestandsgrootte, binaire inhoud | Bijlageoverdracht, voorbeeldweergave, veilige download | Eigen objectopslag (volgorde: eigen S3, Cloudflare R2, fallback KV); defensieve headers | Gekoppeld aan levenscyclus van e-mail; tegelijk fysiek gewist |
| Beveiligingslogs | Mislukte inlogpogingen, registratiefrequentie, AI-gebruiksstatistieken | Bescherming tegen brute-force, misbruikpreventie | Cloudflare KV; schuivende-venstertellers | Mislukte logins verlopen na 12u; registratielogs dagelijks gewist; AI 60d |
| Afwijkende omgevingsvingerafdrukken | Bekende apparaten, geolocatie (Geo), netwerk-ASN, tijdstempels van 1 uur | Detectie van verdachte logins, alarmontdubbeling | Cloudflare KV (voorvoegsel `USER_KNOWN_ENV_`); 15 recente vingerafdrukken | Gewist na 90 dagen inactiviteit of bij accountverwijdering |
| Interfacevoorkeuren | Taal (6 talen), donker/licht thema, notificatievlaggen | Visuele consistentie | Browser localStorage, optionele synchronisatie naar D1 | Bewaard tot cachewissing of handmatige reset |

### 2.1 Pseudonimisering van inloggegevens en PBKDF2 / WebAuthn-standaarden

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔐 Eenrichtingscryptografie en hardwarematige sleutelisolatie</div>
    <span class="google-pill">PBKDF2 100k · WebAuthn FIDO2</span>
  </div>
  <div class="google-card-desc">
    <p><strong>PBKDF2 met 100.000 iteraties</strong>: Wachtwoorden worden nooit in platte tekst opgeslagen. Het systeem dwingt een uniek willekeurig zout af in combinatie met 100.000 PBKDF2-iteraties, wat krachtige mathematische bescherming biedt tegen regenboogtabellen en brute-force-aanvallen via gespecialiseerde GPU's.</p>
    <p><strong>Hardwarematige bescherming met TOTP en Passkeys</strong>: TOTP-sleutels worden versleuteld via AES-256-GCM voor opslag; Passkeys rusten op asymmetrische cryptografie waarbij de privésleutel het beveiligde hardware-element (Secure Enclave) van het apparaat nooit verlaat, wat phishing en identiteitsdiefstal onmogelijk maakt.</p>
  </div>
</div>

### 2.2 Ontkoppeling van opslag en BYO-Storage-architectuur

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📦 Modulaire opslag en defensieve HTTP-headers</div>
    <span class="google-pill">BYO-S3 · Native R2 · KV-noodoplossing</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Dynamische opslagroutering in drie niveaus</strong>: Bijlagen worden intelligent toegewezen: primair naar eigen S3-compatibele buckets van de gebruiker of organisatie (BYO-Storage), secundair naar Cloudflare R2, en als lichte noodvoorziening naar KV. BYO biedt gebruikers volledige soevereiniteit over hun bestanden.</p>
    <p><strong>Defensieve headers voor webbrowsers</strong>: Downloads van bijlagen worden verplicht vergezeld van de headers <code>Content-Disposition: attachment</code> en <code>X-Content-Type-Options: nosniff</code>, waardoor kwaadaardige inline-uitvoering en drive-by-download-aanvallen effectief worden geblokkeerd.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Diepgaande verdediging in vier lagen en cryptografische implementatie

Om communicatie te beschermen tegen complexe internetbedreigingen, hanteert EpoCanvas Mail een defensiemodel in vier onafhankelijke lagen:

![EpoCanvas Mail diepgaande verdedigingsarchitectuur in vier niveaus: Niveau 1 Edge-gateway en anti-SSRF, Niveau 2 FIDO2 Passkeys-authenticatie, Niveau 3 AES-256-GCM versleuteling in rust, Niveau 4 Shadow DOM-zandbak en integriteitsaudit](/images/mail/defense-layers-architecture.svg)

*Figuur 2: Vierlagig diepgaand verdedigingsmodel. Elke laag functioneert autonoom om gegevens veilig te houden onder extreme omstandigheden.*

De onderstaande tabel specificeert onze technische, organisatorische en auditnormen op basis van 11 fundamentele beveiligingscontroles:

| Beveiligingscontrole | Toepassing binnen de dienst |
| --- | --- |
| Toewijzing van personeel en rechten | Beheerders aangewezen met strikt op rollen gebaseerd toegangsbeheer (RBAC) |
| Afbakening van persoonsgegevens | Reikwijdte nauwkeurig gedefinieerd in de matrix van sectie 2 |
| Risicobeoordeling en -beheer | Drie versleutelingsmodi, accountvergrendeling, snelheidslimieten en openbare code |
| Incidentpreventie en -afhandeling | Geformaliseerd in het protocol van sectie 4 |
| Interne beheerprocedures | Operationeel kader vastgelegd in sectie 5 van het [Privacybeleid](/nl/mail/privacy-policy/) |
| Toegangscontrole en integriteit | Cryptografische hash-routering, standaard restrictief beleid en parameterfiltering |
| Beveiligingsbewustzijn en training | Verantwoordelijkheid van zelfstandige beheerders; documentatie dient als lesmateriaal |
| Fysieke beveiliging van apparatuur | Cloudflare-infrastructuur gecertificeerd volgens SOC 2 Type II en ISO/IEC 27001 |
| Beveiligingsaudits en traceerbaarheid | Auditlogs met strikte autorisatie en onmiddellijke sessie-intrekking |
| Bewaring van bewijsmateriaal | Logs bewaard tot verwijdering van account of conform het [Beleid voor Toegestaan Gebruik](/nl/mail/acceptable-use/) |
| Continue beveiligingsverbetering | Voortdurende open-sourceontwikkeling en gecoördineerde beveiligingsbulletins |

### 3.1 Edge-infrastructuur en anti-SSRF-gateway

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌐 Anycast edge-verkeersfiltering en intelligente anti-SSRF-bescherming</div>
    <span class="google-pill">Laag 1 · TLS 1.3 / HSTS</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Wereldwijde Anycast DDoS-mitigatie</strong>: Het Cloudflare-edgenetwerk absorbeert en neutraliseert grootschalige DDoS-aanvallen en dwingt TLS 1.3-versleuteling met HSTS-preload af om man-in-the-middle-onderschepping en protocoldegradatie uit te bannen.</p>
    <p><strong>Inkomend anti-SSRF-inspectiefilter</strong>: Uitgaande webhooks, afbeeldingsproxy's en crawlers ondergaan strenge IP-validatie. Elk verzoek gericht op privénetwerken (RFC 1918) of interne metadata-eindpunten van cloudproviders (zoals 169.254.169.254) wordt aan de edge geblokkeerd.</p>
  </div>
</div>

### 3.2 Sterke authenticatie en wachtwoordloze Passkeys

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔑 Domeingebonden Passkeys en aanpasbare snelheidsbeperking</div>
    <span class="google-pill">Laag 2 · Omgevingsdetectie</span>
  </div>
  <div class="google-card-desc">
    <p><strong>FIDO2 WebAuthn-integratie</strong>: Moderne passkeys zijn cryptografisch gebonden aan de hoofddomeinoorsprong, waardoor phishing effectief wordt voorkomen; fysieke beveiligingssleutels (YubiKey) en ingebouwde biometrische sensoren worden volledig ondersteund.</p>
    <p><strong>Exponentiële vertraging en waarschuwingen</strong>: Opeenvolgende mislukte inlogpogingen triggeren een exponentiële vertraging en een uitsluiting van 12 uur; aanmeldingen worden vergeleken met de 15 bekende apparaat- en netwerkvingerafdrukken voor onmiddellijke alarmering bij afwijkingen.</p>
  </div>
</div>

### 3.3 Gegevensversleuteling in rust en sleutelscheiding

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔒 Industriële AES-256-GCM envelopversleuteling</div>
    <span class="google-pill">Laag 3 · Fysieke scheiding</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Berichtspecifieke authenticatietags (Tag)</strong>: Voordat e-mailinhoud in de D1-database wordt opgeslagen, wordt deze versleuteld met afgeleide sleutels (AES-256-GCM), wat bescherming biedt tegen offline databasediefstal of ongeoorloofde snapshots.</p>
    <p><strong>Beveiligde omgevingsvariabelen tijdens runtime</strong>: Hoofdversleutelingssleutels worden uitsluitend geïnjecteerd via versleutelde Cloudflare Workers-runtimevariabelen, zonder ooit op schijf of in de code te belanden, wat strikte fysieke scheiding garandeert.</p>
  </div>
</div>

### 3.4 Zandbak aan clientzijde en onveranderlijke audit

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Shadow DOM-isolatie en controle via onveranderlijke vingerafdrukken</div>
    <span class="google-pill">Laag 4 · DOMPurify-whitelisting</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Dubbele HTML-zandbak</strong>: Alle externe opgemaakte HTML-berichten worden gezuiverd via DOMPurify, waarbij <code>&lt;script&gt;</code>-, <code>&lt;iframe&gt;</code>- en inline-eventhandlers worden verwijderd, en weergegeven in een afgesloten Shadow DOM om stijlinbreuk en sessiediefstal tegen te gaan.</p>
    <p><strong>Openbaar controlemanifest</strong>: Documentatiespecificaties zijn gekoppeld aan Git-commits en SHA-256-hashes, waardoor onveranderlijke traceerbaarheid en openbare verifieerbaarheid zijn gewaarborgd.</p>
  </div>
</div>

:::caution[Reikwijdte en technische beperkingen van versleuteling]
De opslagmodi «Alles / Privacy / Versleuteld» hebben betrekking op statische versleuteling aan de serverzijde (Server-side Encryption at Rest). De sleutels worden afgeleid van omgevingsvariabelen van de instantie en de geauthenticeerde gebruikerssessie. Deze opzet beschermt tegen fysieke diefstal van back-ups of datalekken op schijfniveau, maar vormt geen end-to-end versleuteling (E2EE); de beheerder van de instantie behoudt technisch de mogelijkheid om gegevens tijdens verwerking in te zien. Voor vertrouwelijke communicatie die absolute geheimhouding vereist, dienen gebruikers asymmetrische encryptietools zoals GPG / PGP lokaal toe te passen voorafgaand aan verzending.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Dubbele aard en bestuurskaders voor open source

EpoCanvas Mail bezit een uitgesproken «dubbele aard»: het fungeert als een gratis openbare beheerde clouddienst en tegelijkertijd als een open-sourcesoftwareproject onder de MIT-licentie. Een duidelijke scheiding tussen beide aspecten is essentieel voor het ecosysteem:

![EpoCanvas Mail bestuursmatrix en wereldwijde naleving: Afbakening tussen beheerde clouddienst en open-sourceproject, afgestemd op AVG, CCPA en APAC-kaders](/images/mail/dual-nature-compliance-matrix.svg)

*Figuur 3: Bestuursgrenzen en internationale nalevingsmatrix. Het upstream-project levert de broncode; zelfstandige nodebeheerders treden op als exclusieve verwerkingsverantwoordelijken met volledige wettelijke aansprakelijkheid.*

### 4.1 Verplichtingen en aansprakelijkheidsbeperkingen van de beheerde dienst

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">☁️ Operationeel kader van de officiële clouddienst</div>
    <span class="google-pill">mail.epocanvas.com · Niet-commerciële SLA</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Kwaliteit van de openbare dienst</strong>: Het officiële platform <code>mail.epocanvas.com</code> wordt beheerd door het kernteam als onafhankelijke operator. Wij streven naar hoge beschikbaarheid van de nodes, strikte naleving van nul telemetrie en cryptografische integriteit.</p>
    <p><strong>Uitsluiting van aansprakelijkheid en back-upverplichting</strong>: Aangezien dit een gratis gemeenschapsdienst betreft, worden er geen commerciële enterprise-SLA's verstrekt en aanvaarden wij geen aansprakelijkheid voor netwerkstoringen bij Cloudflare of verlies van inloggegevens door onzorgvuldigheid. Gebruikers blijven de uiteindelijke bewaarders van hun gegevens en dienen periodiek back-ups te maken.</p>
  </div>
</div>

### 4.2 Open-sourcelicentie, afgeleide projecten en distributieregels

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📜 MIT-licentie en rode lijnen voor secundaire ontwikkeling</div>
    <span class="google-pill">MIT-licentie · Merkbescherming · Eigen verklaring</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Vrijheid van broncode en auditrecht</strong>: De onderliggende code is vrijgegeven onder de MIT-licentie. Eenieder heeft het wettelijke recht om de code te inspecteren, te auditeren, af te splitsen (forken) of toe te passen in private commerciële implementaties.</p>
    <p><strong>Drie bindende distributierichtlijnen</strong>:</p>
    <ul>
      <li><strong>Strikte merkscheiding</strong>: Zonder schriftelijke toestemming mogen externe implementaties of afgeleide versies nooit termen als «EpoCanvas Mail Officieel» of «Officiële Node» gebruiken in domeinen of marketing;</li>
      <li><strong>Behoud van auteursrechten en licentietekst</strong>: Bij alle herdistributies van de broncode moeten de oorspronkelijke auteursrechtvermelding en de volledige MIT-licentietekst behouden blijven;</li>
      <li><strong>Zelfstandige serviceverklaring</strong>: Ontwikkelaars die diensten aanbieden aan het publiek moeten hun eigen entiteitsgegevens en privacybeleid publiceren en mogen niet verwijzen naar officiële documenten als juridische dekking.</li>
    </ul>
  </div>
</div>

### 4.3 Wettelijke verplichtingen van zelfstandige nodebeheerders

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚖️ Exclusieve rol als verwerkingsverantwoordelijke voor zelfstandige nodes</div>
    <span class="google-pill">Enige verwerkingsverantwoordelijke · Geen hoofdelijke aansprakelijkheid</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Exclusieve status als verwerkingsverantwoordelijke</strong>: Wanneer een derde een instantie uitrolt op een eigen Cloudflare-account of server, <strong>treedt deze beheerder op als enige en exclusieve «Verwerkingsverantwoordelijke» (Data Controller)</strong>. De upstream-ontwikkelaars hebben geen toegang tot gegevens en aanvaarden geen hoofdelijke aansprakelijkheid.</p>
    <p><strong>Regionale nalevingsplichten</strong>: Zelfstandige beheerders moeten zelf veilige omgevingsvariabelen instellen, een lokaal privacybeleid opstellen, verzoeken tot verwijdering of export van gebruikers afhandelen en zelfstandig reageren op wettelijke bevelen van autoriteiten.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Internationale wetgeving en grensoverschrijdende gegevensstromen

EpoCanvas Mail is wereldwijd toegankelijk. Om ervoor te zorgen dat gebruikers een duidelijk begrip hebben van hun juridische rechten en gegevenssoevereiniteit zonder belemmering van toegang, hanteren wij een gestandaardiseerd nalevingskader:

### 5.1 Rechten binnen de Europese Economische Ruimte (AVG) en doorgiftegaranties

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇪🇺 Wettelijke rechten onder de AVG en standaardcontractbepalingen</div>
    <span class="google-pill">AVG Art. 15-22 · Art. 6 · SCC's</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Rechten van betrokkenen (Artikelen 15–22)</strong>: Gebruikers in de EU en de EER hebben te allen tijde het recht op inzage, rectificatie, gegevensoverdraagbaarheid, beperking van de verwerking en definitieve verwijdering van hun account.</p>
    <p><strong>Grondslagen en internationale doorgifte</strong>: De verwerking is gebaseerd op de noodzaak voor de uitvoering van de overeenkomst (Art. 6(1)(b)) of op uitdrukkelijke toestemming (Art. 6(1)(a)); doorgifte via het wereldwijde netwerk van Cloudflare wordt gewaarborgd door Standaardcontractbepalingen (SCC's) en gegevensverwerkingsbijlagen conform de AVG.</p>
  </div>
</div>

### 5.2 Amerikaanse wetgeving (CCPA / CPRA) en toezegging van niet-verkoop

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇺🇸 Privacyverklaring voor Californië (CCPA / CPRA)</div>
    <span class="google-pill">Geen verkoop of deling · Non-discriminatie</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Garantie tegen verkoop of delen van gegevens</strong>: Wij verklaren uitdrukkelijk dat wij in de afgelopen 12 maanden nooit persoonsgegevens of e-mailinhoud hebben verkocht, verhuurd of gedeeld met databrokers, advertentienetwerken of commerciële entiteiten (Do Not Sell or Share My Personal Information).</p>
    <p><strong>Inzagerecht en gelijke behandeling</strong>: Inwoners van Californië hebben het recht om te weten welke categorieën gegevens zijn verzameld en om verwijdering te verzoeken; wij zullen gebruikers op geen enkele wijze benadelen in prestaties, capaciteit of snelheid wegens het uitoefenen van hun rechten.</p>
  </div>
</div>

### 5.3 Kaders in Azië-Pacific en eigen verantwoordelijkheid voor eindpuntbeveiliging

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌏 Regelgeving in Azië-Pacific en beveiliging van het eindpunt</div>
    <span class="google-pill">Taiwanese PDPA · SMTP-routering · Lokale beveiliging</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Rechtsgebied en internationale routering</strong>: De officiële beheerde instantie wordt geëxploiteerd vanuit Taiwan en voldoet aan de Wet bescherming persoonsgegevens (PDPA). Gebruikers dienen te begrijpen dat internationale e-mails via openbare SMTP-knooppunten worden getransporteerd en onderhevig kunnen zijn aan lokale telecommunicatiewetgeving.</p>
    <p><strong>Verantwoordelijkheid voor eindpuntbeveiliging</strong>: Gebruikers zijn zelf verantwoordelijk voor de beveiliging van hun apparaten (regelmatige updates, weren van malware, inschakelen van Passkeys/TOTP); misbruik van de dienst voor cyberaanvallen of bulk-spam leidt tot onmiddellijke beëindiging conform het [Beleid voor Toegestaan Gebruik](/nl/mail/acceptable-use/).</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Respons op beveiligingsincidenten en medewerking aan toezichthouders

Om direct te kunnen reageren op beveiligingsincidenten en volledige transparantie te bieden, hanteert EpoCanvas Mail een gestandaardiseerde noodprocedure:

### 6.1 Containment en meldplicht bij datalekken binnen 72 uur

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🚨 Noodrespons volgens gestandaardiseerde operationele procedures</div>
    <span class="google-pill">72-uursmelding · Snelle isolatie · Upstream-patch</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Vierfasenprotocol bij incidenten</strong>:</p>
    <ul>
      <li><strong>Directe isolatie en dreigingsblokkade</strong>: Binnen enkele minuten worden kwaadaardige IP-adressen aan de edge geblokkeerd, aangetaste JWT-sessies ingetrokken en hoofdsleutels geroteerd;</li>
      <li><strong>Digitaal sporenonderzoek en impactanalyse</strong>: Isolatie van auditlogs om de reikwijdte van getroffen accounts en de ernst van het incident vast te stellen;</li>
      <li><strong>Wettelijke melding binnen 72 uur</strong>: Bij een ernstig incident worden betrokkenen en toezichthoudende autoriteiten binnen 72 uur formeel op de hoogte gesteld;</li>
      <li><strong>Oplossing in de broncode en openbaar advies</strong>: Snelle integratie van patches in de open-source repository en publicatie van een beveiligingsadvies voor zelfstandige beheerders.</li>
    </ul>
  </div>
</div>

### 6.2 Officiële communicatiekanalen en medewerking aan toezicht

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📮 Officiële contactpunten voor kwetsbaarheden en toezicht</div>
    <span class="google-pill">Officieel contact · Melding van kwetsbaarheden</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Medewerking aan audits en scheiding van verantwoordelijkheden</strong>: Het officiële platform <code>mail.epocanvas.com</code> verleent medewerking aan rechtmatige inspecties door bevoegde autoriteiten. Beheerders van zelfstandige nodes dienen zelfstandig verantwoording af te leggen aan hun lokale toezichthouders. Beveiligingsonderzoekers die een kwetsbaarheid ontdekken, kunnen contact opnemen via:</p>
    <ul>
      <li><strong>Centrum voor Beveiligingsincidenten</strong>: <code>announcement@epocanvas.com</code></li>
      <li><strong>Kantoor voor Gegevensbescherming en Naleving</strong>: <code>privacy@epocanvas.com</code></li>
    </ul>
  </div>
</div>
