---
title: Gegevensverwerking en beveiliging
description: Gegevenslevenscyclus, opslagmatrix, diepgaande verdedigingsmechanismen, tweeledige governance en wereldwijde compliance bij EpoCanvas Mail.
---

**Ingangsdatum: 1 oktober 2026 | Versie: 5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail hanteert twee centrale ontwerpprincipes: «Privacy is een fundamenteel mensenrecht» en «Code is het contract». Ons platform combineert een gratis gehoste clouddienst zonder telemetrie en zonder advertenties met een autonoom opensourceproject in een evenwichtig tweeledig governancemodel. Dit document biedt volledig inzicht in de levenscyclus van gegevens, onze versleutelde opslagmatrix, onze vierlaagse beveiligingsarchitectuur en de verdeling van wettelijke verantwoordelijkheden wereldwijd.
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ Nul telemetrie (Zero Telemetry)</span>
    <span class="google-pill">🔐 AES-256-GCM-versleuteling in rust</span>
    <span class="google-pill">⚡ Vluchtige edge-uitvoering (V8)</span>
    <span class="google-pill">🌐 Wereldwijde compliance (AVG / CCPA)</span>
  </div>
</div>

Dit document is opgesteld krachtens ons [Privacybeleid](/nl/mail/privacy-policy/) en onze [Servicevoorwaarden](/nl/mail/terms-of-service/). Het dient als betrouwbaar naslagwerk voor gebruikers die onze privacygaranties verifiëren, als operationele richtlijn voor beheerders van zelf gehoste knooppunten en als toetsingskader voor toezichthoudende autoriteiten.

## 1. Gegevenslevenscyclus en edge-verwerkingsmodel

De levenscyclus van persoonlijke communicatie binnen EpoCanvas Mail verloopt via zes duidelijk afgebakende fasen: Verzameling, Verwerking, Gebruik, Doorgifte, Bewaring en Onomkeerbare vernietiging. Elke fase wordt staatloos uitgevoerd op het wereldwijde Anycast-netwerk van Cloudflare, waardoor ongeoorloofde persistentie en datalekken tussen gebruikers worden uitgesloten.

![EpoCanvas Mail Gegevenslevenscyclus: Verzamelen -> Verwerken -> Gebruiken -> Doorgeven -> Bewaren -> Vernietigen](/images/mail/data-flow.svg)

*Afbeelding 1: Volledige levenscyclus van persoonsgegevens. In elke fase worden dataminimalisatie en cryptografische scheiding strikt gehandhaafd; zie artikel 5 van het [Privacybeleid](/nl/mail/privacy-policy/) voor de wettelijke grondslagen.*

### 1.1 Minimale gegevensverzameling en nultelmetriegarantie

Bij het verzamelen van gegevens geldt een uiterst strenge dataminimalisatie. Het systeem verzamelt uitsluitend de identificatiegegevens die noodzakelijk zijn voor gebruikersauthenticatie (gebruikersnaam en e-mailaliassen). Er worden nooit adresboeken, gyroscoopdata, klembordinhoud of volgmarkers geregistreerd. Wij garanderen ondubbelzinnig: **EpoCanvas Mail handhaaft een strikt Nul-Telemetriebeleid, zowel op de officiële instantie als in de opensourcecode**. Er zijn geen commerciële analytics-SDK's, advertentietrackers of externe bakens aanwezig; interacties blijven beperkt tot de lokale clientomgeving.

### 1.2 Vluchtige uitvoering en geheugenisolatie in V8

Bij binnenkomende e-mails of gebruikersacties wordt de programmastructuur onmiddellijk uitgevoerd in geïsoleerde V8-omgevingen (Cloudflare Workers) op het dichtstbijzijnde edge-knooppunt. Deze V8-isolates starten in nanoseconden op en worden na afhandeling direct vernietigd. Ontsleutelde gegevens bestaan uitsluitend in het vluchtige werkgeheugen en worden nooit weggeschreven naar fysieke schijven. Deze staatloze architectuur voorkomt geheugenlekken en nevenkanaalaanvallen tussen verschillende gebruikers.

### 1.3 Cryptografische vernietiging en recht op vergetelheid

Om het recht op gegevenswissing («recht op vergetelheid») te waarborgen, hanteert het systeem een geautomatiseerd opschoonbeleid. E-mails in de Prullenbak worden 7 dagen bewaard als herstelbuffer, waarna een geplande taak (Cron Trigger) ze fysiek uit de database verwijdert. Indien een mailbox meer dan 90% van de capaciteit benut, worden verwijderde berichten proactief gewist om de continuïteit te garanderen. Bij beëindiging van een account worden alle gegevens in D1 en KV gewist en worden de bijbehorende cryptografische sleutels vernietigd, zodat herstel onmogelijk is.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Gegevensverwerkingsmatrix en opslagmedia

De onderstaande tabel specificeert alle categorieën van verwerkte gegevens, de verwerkingsdoeleinden, de gebruikte opslagmedia en de toepasselijke bewaartermijnen:

| Gegevenscategorie | Specifieke gegevenselementen | Doel van de verwerking | Opslagmedium en beveiligingsnorm | Bewaartermijn en verwijdering |
| --- | --- | --- | --- | --- |
| Accountreferenties | E-mailadres, gebruikersnaam, gezouten wachtwoordhash, TOTP-sleutel (AES-GCM), back-upcodes, Passkey-publiekesleutel | Registratie, authenticatie, tweefactorauthenticatie, accountherstel | Cloudflare D1; PBKDF2 (100.000 iteraties met zout), statische TOTP-versleuteling | Bewaard tot opzegging van account; fysiek gewist bij verwijdering |
| Netwerk- en apparaatgegevens | Registratie-IP, IP recentste aanmelding, besturingssysteem, User-Agent, apparaattype | Beveiligingsaudit, detectie van verdachte aanmeldingen, snelheidsbeperking | Cloudflare D1; strikt beperkt tot administratieve audits | Bewaard tot definitieve accountverwijdering |
| Sessiestatus | JWT-tokens, RBAC-gebruikersrollen, actieve mailboxbinding | Autorisatie op edge-gateway, routering van API-verzoeken | Cloudflare KV; maximale glijdende geldigheid van 30 dagen | Ingetrokken bij uitloggen; verloopt automatisch na 30 dagen |
| Communicatiegegevens | Afzender, ontvangers, CC/BCC, onderwerp, tijdstempels, leesstatus, labels, sterren, berichtinhoud | E-mailbezorging, conversatiebeheer, zoekfunctionaliteit | Cloudflare D1 (metadata); inhoud versleuteld met AES-256-GCM | Beheerd door gebruiker; prullenbak leeggemaakt na 7 dagen; noodwissing bij 90% |
| Bijlagen | Oorspronkelijke bestandsnaam, MIME-type, bestandsgrootte, binaire gegevens | Transport van bijlagen, inline weergave, veilige downloads | Objectopslag (S3 BYO > Cloudflare R2 > Cloudflare KV) | Gekoppeld aan e-maillevenscyclus; verwijderd met het moederbericht |
| Beveiligingslogboeken | Teller mislukte inlogpogingen, registratiefrequentie, AI-gebruiksstatistieken | Bescherming tegen brute-force-aanvallen, misbruikpreventie | Cloudflare KV; tellers met vast tijdsvenster | Mislukte logins verlopen na 12 uur; registratielogs dagelijks; AI 60 dagen |
| Omgevingsvingerafdrukken | Bekende apparaten, geolocatie (Geo), netwerk-ASN, tijdstempel van 1 uur | Detectie van afwijkende aanmeldlocaties, voorkoming alarmmoeheid | Cloudflare KV (`USER_KNOWN_ENV_`); bewaart 15 recente afdrukken | Verwijderd na 90 dagen inactiviteit of bij accountopzegging |
| Interfacevoorkeuren | Taal (6 talen), lichte/donkere modus, weergave-indicatoren | Consistente gebruikerservaring | Browser localStorage, optionele synchronisatie met D1 | Bewaard tot leegmaken van browsercache of handmatige reset |

### 2.1 Beveiliging van inloggegevens en standaarden voor PBKDF2 en WebAuthn

Inloggegevens worden beschermd met eenzijdige cryptografische technieken van het hoogste niveau. Wachtwoorden worden nooit in platte tekst of verouderde hashformaten opgeslagen, maar verwerkt met PBKDF2 en een hoogwaardig zout over 100.000 iteraties ter afweer van GPU-aanvallen met regenboogtabellen. Voor tweefactorauthenticatie (TOTP RFC 6238) worden geheime sleutels symmetrisch versleuteld met AES-256-GCM voordat ze in D1 worden opgeslagen. Toegangssleutels (Passkeys FIDO2 / WebAuthn) steunen op asymmetrische cryptografie: de server bewaart uitsluitend de openbare sleutel, terwijl de privésleutel de veilige hardware-enclave van het apparaat nooit verlaat.

### 2.2 Gelaagde opslag en Bring-Your-Own Storage (BYO Storage)

Voor bijlagen en grote bestanden beschikt het systeem over een ontkoppelde opslaglaag. Opslagkanalen worden hiërarchisch geselecteerd: primair een door de gebruiker verstrekte S3-compatibele bucket (Bring-Your-Own Storage), secundair Cloudflare R2 edge-opslag, met een veilige terugvaloptie naar Cloudflare KV. Eigen opslagfaciliteiten opereren met gescheiden inloggegevens, waardoor volledige gegevenssoevereiniteit wordt gegarandeerd. Alle bestanden worden verstrekt met de verplichte beveiligingsheaders `Content-Disposition: attachment` en `X-Content-Type-Options: nosniff`.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Vierlaagse diepgaande verdedigingsarchitectuur

Om communicatie te beschermen tegen kwaadwillende invloeden op het openbare internet, hanteert EpoCanvas Mail een gelaagde beveiligingsstrategie die zich uitstrekt van het netwerk tot de clientinterface:

![EpoCanvas Mail Vierlaagse diepgaande verdedigingsarchitectuur](/images/mail/partition-security.svg)

*Afbeelding 2: Vierlaagse beveiligingsarchitectuur. Elke laag functioneert zelfstandig en redundant om de integriteit van gegevens onder alle omstandigheden veilig te stellen.*

Onderstaande tabel vat 11 centrale normen samen op het gebied van techniek, beheer en controle:

| Beveiligingsnorm | Technische uitvoering en governancestructuur |
| --- | --- |
| Toegangs- en personeelsbeheer | Aangewezen beheerders met strikte taakscheiding conform RBAC |
| Afbakening van persoonsgegevens | Uitputtend gegevensinventaris beschreven in artikel 2 van dit document |
| Risicobeoordeling en -beheer | Instelbare versleuteling, vergrendeling na mislukte pogingen, openbare code-audits |
| Incidentpreventie en -afhandeling | Gestandaardiseerd stappenplan in 4 fasen beschreven in artikel 6 |
| Interne beheerprocedures | Overzicht van verwerkingsactiviteiten vastgelegd in artikel 5 van het Privacybeleid |
| Autorisatie en toegangscontrole | HMAC-routering, fail-closed-autorisatie en parameterfiltering op gateway |
| Opleiding en bewustwording | Praktische richtlijnen voor zelfstandige beheerders en officiële documentatie |
| Fysieke beveiliging faciliteiten | Certificeringen van Cloudflare-datacenters (SOC 2 Type II, ISO/IEC 27001) |
| Beveiligingsaudit en verificatie | Tijdgebonden beveiligingslogs (IP, apparaat, fouten); onmiddellijke sessie-intrekking |
| Bewaring van bewijsmateriaal | Authenticatiesporen bewaard; handhaving conform Beleid voor acceptabel gebruik |
| Continue kwaliteitsverbetering | Regelmatige software-updates en transparante publicatie van beveiligingsadviezen |

### 3.1 Laag 1: Edge-gateway en netwerkbeveiliging

Als voorste verdedigingslinie neutraliseert het Anycast-netwerk van Cloudflare DDoS-aanvallen en dwingt het TLS 1.3-verbindingen met HSTS-preload af om afluisteren en downgrade-aanvallen te voorkomen. De edge-gateways beschikken over strikte anti-SSRF-filters: verzoeken naar lokale privénetwerken (RFC 1918) of interne metadatakoppelingen van clouddiensten (zoals 169.254.169.254) worden aan de rand geblokkeerd.

### 3.2 Laag 2: Phishingbestendige inloggegevens en WebAuthn

Het inlogsysteem vervangt kwetsbare wachtwoorden door FIDO2 / WebAuthn-technologie. Toegangssleutels zijn cryptografisch gebonden aan het specifieke domein, waardoor phishing via reverse proxy's doeltreffend wordt verijdeld. Bij wachtwoordauthenticatie treedt na opeenvolgende mislukte pogingen een tijdelijke blokkade van 12 uur in werking, waarbij aanmeldingen worden vergeleken met 15 bekende omgevingskenmerken (apparaten en netwerk-ASN) om ongewone logins tijdig te signaleren.

### 3.3 Laag 3: AES-256-GCM-versleuteling in rust en sleutelscheiding

Alle persistente gegevens worden in rust versleuteld met het robuuste AES-256-GCM-algoritme. Voordat e-mails in de D1-database worden opgeslagen, wordt de inhoud versleuteld met contextuele sleutels en voorzien van een authenticatietag ter bescherming tegen diefstal van back-ups of databasedumps. Sleutels worden via beveiligde omgevingsvariabelen ingevoerd en gescheiden gehouden van de tabellen, zodat data onleesbaar blijft bij eventuele fysieke toegang tot de opslag.

### 3.4 Laag 4: Shadow DOM-sandbox en documentintegriteit

De gebruikersinterface dwingt strikte isolatie af in de browser. HTML-berichten worden gefilterd met DOMPurify om tags zoals `<script>`, `<style>`, `<iframe>`, `<form>` en inline-scripts te verwijderen, waarna ze worden weergegeven in een afgesloten Shadow DOM-container die manipulatie van de interface en sessiediefstal uitsluit. Bovendien is de officiële documentatie verankerd met SHA-256-hashes en Git-commits om onweerlegbare authenticiteit te waarborgen.

:::caution[Reikwijdte en technische beperkingen van versleuteling]
De versleutelingsopties binnen de dienst betreffen server-side versleuteling in rust (Server-side Encryption at Rest). De sleutels worden gegenereerd op basis van omgevingsvariabelen van de instantie en de identiteit van de gebruiker. Dit beschermt tegen ongeoorloofde toegang tot de infrastructuur en schijfkopieën; het betreft geen end-to-end versleuteling (E2EE). Beheerders met root-toegang tot de serveromgeving bezitten theoretisch de mogelijkheid berichten te ontcijferen. Voor correspondentie die absolute geheimhouding vereist, dienen gebruikers hun berichten vooraf lokaal te versleutelen met GPG/PGP alvorens deze te verzenden.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Tweeledige governance en opensourceverantwoordelijkheden

EpoCanvas Mail bezit een uitgesproken «Tweeledig Karakter»: het functioneert enerzijds als een gratis gehoste publieke e-maildienst en anderzijds als een zelfstandig opensourcesoftwareproject onder de MIT-licentie. Een heldere juridische afbakening tussen beide facetten is cruciaal voor een gezonde gemeenschap:

![EpoCanvas Mail Verantwoordelijkheidsgrenzen: Opensourceproject -> Instantiebeheerder -> Eindgebruiker](/images/mail/self-host-responsibilities.svg)

*Afbeelding 3: Tweeledig governancemodel. Het opensourceproject verstrekt uitsluitend programmacode; instantiebeheerders treden op als zelfstandige verwerkingsverantwoordelijken; gebruikers hebben de vrijheid te kiezen tussen een gehoste dienst en eigen beheer.*

### 4.1 Operationele afspraken en aansprakelijkheid van de gehoste dienst

De officiële gehoste instantie op `mail.epocanvas.com` wordt beheerd door het kernteam als onafhankelijke exploitant. Wij spannen ons in om beschikbaarheid, nultelmetrie en cryptografische integriteit te handhaven. Aangezien het een niet-commerciële gemeenschapsdienst betreft, worden er geen commerciële Service Level Agreements (SLA's) geboden en aanvaarden wij geen aansprakelijkheid voor indirecte schade door overmacht, externe netwerkstoringen of onzorgvuldig beheer van inloggegevens door de gebruiker. Gebruikers zijn zelf verantwoordelijk voor regelmatige back-ups van hun e-mails.

### 4.2 Opensourcelicentie, forks en distributierichtlijnen

De broncode van EpoCanvas Mail is wereldwijd beschikbaar onder de MIT-licentie. Iedereen heeft het wettelijke recht de code te inspecteren, te auditen, af te splitsen (forken) of zelfstandige private e-mailservers in te richten. Bij verdere verspreiding van afgeleide werken gelden de volgende bindende richtlijnen:
1. **Merkbescherming**: Externe installaties mogen geen gebruikmaken van aanduidingen zoals «EpoCanvas Mail Officieel» of soortgelijke benamingen die de indruk wekken dat er sprake is van een formele band met het oorspronkelijke projectteam;
2. **Behoud van auteursrechtvermeldingen**: Bij herverspreiding van de broncode dienen de oorspronkelijke auteursrechtvermelding en de volledige MIT-licentietekst behouden te blijven;
3. **Zelfstandige voorwaarden**: Beheerders die accounts openstellen voor derden moeten hun eigen gebruiksvoorwaarden en privacyverklaringen publiceren, zonder te verwijzen naar de projectwebsites voor hun juridische dekking.

### 4.3 Verplichtingen van zelfstandige instantiebeheerders

Wanneer een externe partij EpoCanvas Mail installeert op een eigen Cloudflare-account of server, **treedt deze beheerder op als de enige en exclusieve «Verwerkingsverantwoordelijke» (Data Controller)** voor die specifieke instantie. De medewerkers van het oorspronkelijke opensourceproject hebben geen toegang tot die gegevens en dragen geen wettelijke medeaansprakelijkheid. Zelfstandige beheerders moeten zelfstandig voldoen aan de toepasselijke wetgeving inzake gegevensbescherming, hun sleutels beveiligen en verzoeken van hun gebruikers afhandelen.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Wereldwijde compliance en grensoverschrijdend dataverkeer

EpoCanvas Mail is wereldwijd toegankelijk. Om ervoor te zorgen dat gebruikers ongehinderd toegang hebben en tegelijkertijd inzicht hebben in de juridische context van verschillende rechtsgebieden, sluiten onze processen aan op toonaangevende internationale standaarden:

### 5.1 Algemene verordening gegevensbescherming (AVG) in de EER

Voor gebruikers in de Europese Unie (EU) en de Europese Economische Ruimte (EER) voldoet de dienst aan de bepalingen van de AVG:
- **Rechten van betrokkenen (artikelen 15 tot en met 22)**: Recht op inzage, rectificatie, overdraagbaarheid, beperking van de verwerking en definitieve gegevenswissing;
- **Rechtmatige grondslagen (artikel 6)**: De gegevensverwerking berust op de noodzaak voor de uitvoering van de overeenkomst (art. 6 lid 1 sub b) of op uitdrukkelijke toestemming (art. 6 lid 1 sub a);
- **Internationale doorgifte (hoofdstuk V)**: Omdat het Anycast-netwerk van Cloudflare verzoeken via internationale knooppunten kan routeren, is deze doorgifte juridisch gedekt door de toepasselijke Europese Standaardcontractbepalingen (SCC's).

### 5.2 Bepalingen voor de Verenigde Staten (CCPA / CPRA)

Ter naleving van de privacywetgeving in diverse Amerikaanse staten (in het bijzonder Californië):
- **Geen verkoop van persoonsgegevens**: Wij verklaren uitdrukkelijk dat wij in de afgelopen 12 maanden geen persoonsgegevens hebben verkocht of gedeeld voor commerciële doeleinden, en dit ook in de toekomst niet zullen doen;
- **Recht op inzage en non-discriminatie**: Gebruikers hebben het recht opgave te verlangen van verwerkte gegevenscategorieën en verwijdering te verzoeken, zonder dat de uitoefening van deze rechten leidt tot nadelige beïnvloeding van de dienstverlening.

### 5.3 Regelgeving in Azië-Pacific en risicobewustzijn

Voor gebruikers in Azië-Pacific (waaronder de Taiwanese PDPA, de Singaporese PDPA en de Japanse APPI) wordt de instantie `mail.epocanvas.com` beheerd door een team in Taiwan met inachtneming van de lokale wetgeving. In een gedecentraliseerde internetomgeving erkennen en aanvaarden gebruikers dat:
1. **Grensoverschrijdend dataverkeer**: Internationaal e-mailverkeer passeert tussenliggende SMTP-knooppunten in verschillende landen en valt onder de lokale telecomwetgeving aldaar;
2. **Beveiliging van apparatuur**: Gebruikers dragen zelf de verantwoordelijkheid voor het up-to-date houden van hun eindapparaten (beveiligingsupdates, virusscanners en gebruik van Passkeys of TOTP);
3. **Optreden tegen misbruik**: Activiteiten die gericht zijn op computervredebreuk, spamming of oplichting leiden tot onmiddellijke beëindiging van de account conform ons [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/).

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Incidentenrespons en toezicht door autoriteiten

Om incidenten doeltreffend te bezweren en openheid van zaken te geven, volgt EpoCanvas Mail een vast protocol voor incidentenbeheer:

### 6.1 Protocol voor risicobeperking en melding binnen 72 uur

Zodra een incident wordt geconstateerd dat de vertrouwelijkheid, integriteit of beschikbaarheid van persoonsgegevens bedreigt, hanteert het team een vierstappenplan:
1. **Onmiddellijke dreigingsisolatie**: Binnen enkele minuten blokkeren van aanvallende IP-adressen op de gateway, intrekken van getroffen JWT-tokens en rotatie van encryptiesleutels;
2. **Forensisch onderzoek en impactanalyse**: Analyseren van netwerklogboeken om vast te stellen welke accounts en gegevens zijn geraakt en hoe ernstig het incident is;
3. **Kennisgeving binnen 72 uur**: Indien het incident een risico vormt voor de rechten van betrokkenen, worden zij binnen 72 uur geïnformeerd en wordt melding gedaan bij de bevoegde toezichthouder;
4. **Oplossen van oorzaken en gemeenschapsberichtgeving**: Publicatie van een patch in het opensourceproject en verspreiding van een beveiligingswaarschuwing voor zelfstandige beheerders.

### 6.2 Officiële meldkanalen en samenwerking met toezichthouders

De gehoste dienst `mail.epocanvas.com` verleent medewerking aan rechtmatige verzoeken van toezichthoudende autoriteiten. Dit document vormt met ons beleidskader het formele uitgangspunt. Beheerders van zelf gehoste servers staan zelfstandig in contact met de autoriteiten in hun eigen rechtsgebied. Vermoedt u een beveiligingslek of signaleert u verdachte berichten, meld dit dan via onze officiële kanalen:
- **Centrum voor Incidentenrespons**: `announcement@epocanvas.com`
- **Bureau voor Gegevensbescherming en Privacy**: `privacy@epocanvas.com`
