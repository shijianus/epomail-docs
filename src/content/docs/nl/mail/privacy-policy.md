---
title: Privacybeleid
description: Privacybeleid van EpoCanvas Mail — de normen en toezeggingen voor de verzameling en het gebruik van gegevens, de aard van de verwerking, de rechten van de betrokkene, internationale doorgifte en de beveiligingsmaatregelen.
---

# Privacybeleid

**Datum van inwerkingtreding: 29 september 2026 | Versie: 5.0**

Dit beleid beschrijft hoe de dienst EpoCanvas Mail (hierna «de Dienst») uw persoonsgegevens verzamelt, verwerkt en doorgeeft, evenals de normen en toezeggingen waarop de Exploitant zich bij de bescherming van gegevens baseert. U dient dit beleid te lezen voordat u zich registreert voor de Dienst of deze gebruikt; indien u met enig onderdeel van dit beleid niet instemt, gebruik de Dienst dan niet.

De technische feiten in dit document volgen de daadwerkelijke implementatie in de open source-broncode van de Dienst. De juridische documenten op deze site zijn vastgesteld in het traditioneel Chinees (Taiwan) als officiële versies; versies in andere talen worden uitsluitend ter referentie verstrekt, en bij discrepantie is de versie in het traditioneel Chinees leidend. Het toepasselijke recht van de instance die u gebruikt, wordt bepaald door de vestigingsplaats van de Exploitant (zie paragraaf 12).

![De vijf zuilen van het Privacybeleid van EpoCanvas Mail: verzamelen, gebruiken, doorgifte, beveiliging en rechten van de betrokkene, inhoudelijk gekleurd door contract en toestemming, het doelbindingsbeginsel, de waarborgen bij doorgifte, het beveiligingsonderhoud en de rechten en rechtsmiddelen, gezamenlijk rustend op de basis van toezicht door de autoriteit](/images/mail/privacy-pillars.svg)

*Figuur: de vijf hoofdlijnen van dit beleid. Verzamelen en gebruiken blijven beperkt tot het bestek dat voor het specifieke doel noodzakelijk is; internationale doorgifte volgt de eisen van het toepasselijke recht en de standaardwaarborgmechanismen; het beveiligingsonderhoud wordt doorloend verbeterd; de rechten van de betrokkene worden uitgeoefend overeenkomstig paragraaf 9; alle vijf rusten op het toezicht door de autoriteit.*

## 1. Toepassingsbereik

Dit beleid is van toepassing op de persoonsgegevens die ontstaan wanneer u de Dienst op enigerlei wijze gebruikt, waaronder:

1. een bezoek aan de website van de Dienst (`mail.epocanvas.com` of het domein van een zelfgehoste instance);
2. het gebruik van de mobiele app (epomail);
3. de toegang tot de Dienst via de open API.

Dit beleid is niet van toepassing op websites en diensten van derden waarnaar de Dienst verwijst of die de Dienst integreert; die derden hebben hun eigen privacybeleid en dragen daar zelf de verantwoordelijkheid voor.

De exploitant die EpoCanvas Mail zelf host, wordt vanaf het moment van implementatie de verwerkingsverantwoordelijke van zijn gebruikers en dient zelf de informatieverplichtingen jegens zijn gebruikers na te komen krachtens het toepasselijke recht op zijn vestigingsplaats; dit beleid kan als basistekst voor die informatieverstrekking dienen.

## 2. Verwerkingsverantwoordelijke en verwerkers

| De instance die u gebruikt | Verwerkingsverantwoordelijke | Toelichting |
| --- | --- | --- |
| Gehoste instance `mail.epocanvas.com` | Het EpoCanvas-exploitatieteam | Wat betreft accountgegevens, authenticatierecords en beveiligingsauditlogs is het exploitatieteam de verwerkingsverantwoordelijke; wat betreft de inhoud van de e-mail die u verzendt en ontvangt, verwerkt het exploitatieteam die binnen het bestek dat nodig is voor het verlenen van de communicatiedienst |
| Zelfgehoste instance | De implementateur van die instance | De implementateur is vanaf het moment van implementatie verwerkingsverantwoordelijke en draagt zelfstandig alle verplichtingen krachtens het toepasselijke recht ter plaatse; de open source-broncode bevat geen telemetriemechanisme en zendt geen instancegegevens terug naar de upstream-auteurs of enige derde |

Verwerkers verwerken de gegevens op instructie van de verwerkingsverantwoordelijke; de volledige lijst staat in de [Lijst van verwerkers](/nl/mail/sub-processors/).

## 3. Informatieverplichting bij het verzamelen

Bij het verzamelen van uw persoonsgegevens deelt de Dienst u uitdrukkelijk het volgende mee:

| Vermeldingen | Informatie van de Dienst |
| --- | --- |
| 1. Identiteit van de verzamelaar | De Exploitant (zie paragraaf 2; bij een zelfgehoste instance is dat de implementateur ervan) |
| 2. Doeleinden van de verzameling | Verlenen van de e-mailcommunicatiedienst; beheer van het account en de informatiebeveiliging; preventie van misbruik en fraude; verzending van systeemmededelingen; naleving van wettelijke verplichtingen (zie de tabel met verwerkingsactiviteiten in paragraaf 5) |
| 3. Categorieën van persoonsgegevens | Identificatiegegevens (e-mailadres, gebruikersnaam); accountbeveiligingsgegevens (wachtwoordhash, tweestapsverificatiereferenties); interfacevoorkeuren (taal, lichte en donkere modus); netwerkactiviteitsgegevens (e-mailrecords, labels, sterren, leesstatus); en andere gegevens waarmee een persoon direct of indirect kan worden geïdentificeerd (inlog-IP en het uit de User-Agent afgeleide besturingssysteem, browser en apparaattype), zie paragraaf 4 |
| 4. Termijn, regio, ontvangers en wijze van gebruik | Termijn: zolang het account bestaat, met vaste bewaartermijnen voor enkele items (zie de verwerkingsmatrix in [Gegevensverwerking en beveiliging](/nl/mail/data-security/)); regio: de Dienst draait op het wereldwijde edge-netwerk van Cloudflare, gegevens kunnen op elk edge-knooppunt ter wereld worden verwerkt (zie paragraaf 7); ontvangers: de Exploitant en diens verwerkers, door u geautoriseerde apps van derden en op grond van de wet bevoegde organen (zie paragraaf 7); wijze: geautomatiseerde opslag, overdracht, raadpleging, pushbezorging en edge-inferentie, zonder handmatige beoordeling behoudens op grond van wetgeving of gerechtelijke procedures |
| 5. Rechten van de betrokkene en de wijze van uitoefening | De rechten van raadpleging en inzage, verkrijging van een kopie, aanvulling en rectificatie, stopzetting van verzameling, verwerking en gebruik, en verwijdering; de wijze van uitoefening staat in paragraaf 9 |
| 6. Gevolgen van het niet verstrekken van de gegevens | E-mailadres en wachtwoord zijn noodzakelijk voor registratie en aanmelding; zonder deze gegevens kan geen account worden aangemaakt. Alle overige velden (nickname, avatar, persoonlijke omschrijving en dergelijke) zijn optioneel; het niet verstrekken ervan belemmert het gebruik van de Dienst niet |

Wanneer u zich met een Linux DO-account aanmeldt, verkrijgt de Dienst van die identiteitsbron uw gebruikersidentificator, nickname, avatar en andere identificatiegegevens; dit is de verzameling van persoonsgegevens die niet rechtstreeks door u zijn verstrekt. De bron van deze gegevens is het Linux DO-account waarmee u zich aanmeldt; voor de termijn, regio, ontvangers en wijze van gebruik, en voor de rechten die u kunt uitoefenen en de wijze waarop, geldt de informatie van onderdeel 2 tot en met onderdeel 5 van de voorgaande tabel. De Dienst kent geen andere gevallen waarin persoonsgegevens worden verzameld die niet door u zijn verstrekt.

## 4. Verzamelde persoonsgegevens

### 4.1 Gegevens die u zelf verstrekt

- **E-mailadres en wachtwoord**: noodzakelijk voor de registratie. Het wachtwoord wordt uitsluitend bewaard als PBKDF2-HMAC-SHA256-hash (100.000 iteraties, per gebruiker een onafhankelijk willekeurig salt); uit de hash kan het oorspronkelijke wachtwoord niet worden gereconstrueerd.
- **Referenties voor tweestapsverificatie (optioneel)**: de TOTP-sleutel wordt versleuteld bewaard met AES-256-GCM; back-upherstelcodes worden uitsluitend bewaard als SHA-256-hash; passkeys bewaren uitsluitend de publieke sleutel, de privésleutel blijft op uw apparaat.
- **Profielgegevens (optioneel)**: nickname, avatar en persoonlijke omschrijving; avatars worden geüpload naar de door de Exploitant geconfigureerde afbeeldingsopslagdienst.

### 4.2 De inhoud van uw communicatie

De e-mail die u verzendt en ontvangt (inclusief metadata zoals afzender en ontvanger, onderwerp, berichttekst en tijdstempels) en de bijlagen, evenals de labels, sterren, leesstatussen en uitgestelde herinneringen die u toepast, worden bewaard in de database van de instance (Cloudflare D1) en de objectopslag (Cloudflare R2 of S3-compatibele opslag geconfigureerd door de Exploitant). Het eigendom van en de verantwoordelijkheid voor de e-mailinhoud rust bij u; de Exploitant verkoopt de e-mailinhoud niet, gebruikt die niet voor advertentiedoeleinden en koppelt geen statistiek of tracking van derden.

### 4.3 Automatisch geregistreerde technische gegevens

- **Aanmeld- en beveiligingslogboeken**: het IP-adres, de browser-User-Agent en het daaruit afgeleide besturingssysteem, de browser en het apparaattype, geregistreerd bij registratie en aanmelding, gebruikt voor de beveiligingsaudit en de identificatie van afwijkende aanmeldingen.
- **Sessietokens**: de na aanmelding uitgegeven JWT (30 dagen geldig) wordt bewaard in de localStorage van uw browser. De Dienst gebruikt geen cookies en doet geen cross-site-tracking.
- **Edge-netwerklogboeken**: Cloudflare verwerkt de requestmetadata overeenkomstig het eigen beleid.

### 4.4 Gegevens die de Dienst niet verzamelt

De Dienst bevat geen advertentie-tracking-SDK, geen gedragsprofilering, geen cross-site-cookies en geen Google Analytics of andere statistiek van derden; de Dienst leest ook de contacten, de fotobibliotheek, de locatie of de gegevens van andere apps op uw apparaat niet.

### 4.5 Zeer gevoelige persoonsgegevens

Persoonsgegevens over medische dossiers, medische behandeling, genetica, seksueel leven, gezondheidsonderzoeken en strafrechtelijk verleden behoren tot de categorie zeer gevoelige persoonsgegevens; de verzameling en verwerking ervan zijn in de meeste rechtsgebieden aan strikte beperkingen onderworpen. De account- en systeemvelden van de Dienst verzamelen dergelijke gegevens niet. De inhoud die u zelf per e-mail doorgeeft, kan deze evenwel bevatten; de Exploitant slaat die op en geeft die uitsluitend passief door binnen het bestek dat nodig is voor het verlenen van de communicatiedienst, zonder inhoudsanalyse of profilering. U dient zelf zorgvuldig af te wegen of u zeer gevoelige gegevens per e-mail doorgeeft.

## 5. Aard van de verwerking bij verzameling, verwerking en gebruik

De aard van de verwerkingsactiviteiten van de Dienst is als volgt:

| Verwerkingsactiviteit | Specifiek doel | Aard van de verwerking |
| --- | --- | --- |
| Registratie van het account, aanmelding, mailboxbeheer | Verlenen van de e-maildienst | Noodzakelijke verwerking voor de uitvoering van de overeenkomst, met passende beveiligingsmaatregelen |
| Aanmeldlogboeken, blokkering na mislukte aanmelding, tweestapsverificatie | Instandhouding van de informatiebeveiliging | Noodzakelijke verwerking voor de uitvoering van de overeenkomst, met inachtneming van het proportionaliteitsbeginsel |
| Automatische extractie van verificatiecodes (optioneel in te schakelen door de Exploitant) | Verbetering van het gebruiksgemak van de dienst | Met uw toestemming; u kunt verzoeken de functie uit te schakelen, of overstappen op een instance waar deze functie niet is ingeschakeld |
| E-mailvertaling, tekstherkenning in afbeeldingen (door u geactiveerd) | Ondersteuning bij inhoud | Met uw toestemming; zonder uw activering wordt niets doorgestuurd |
| Openbare profielpagina (standaard uitgeschakeld) | Sociale presentatie | Gegevens die u zelf openbaar heeft gemaakt |
| Systeemmededelingen, officiële welkomstmail | Contractuitvoering en communicatie met gebruikers | Noodzakelijke verwerking voor de uitvoering van de overeenkomst |

Uw persoonsgegevens worden uitsluitend gebruikt voor het doel van de verzameling en binnen het daarmee nauw verwante bereik. De Dienst gebruikt uw persoonsgegevens niet voor geautomatiseerde besluitvorming, profilering van gebruikers of enig commercieel doel dat niet verband houdt met het verlenen van de dienst. Gebruikt de Exploitant persoonsgegevens voor marketing, dan stopt de Exploitant dat gebruik onmiddellijk zodra u kenbaar maakt geen marketing te willen ontvangen; bij de eerste marketing verstrekt de Exploitant tevens de wijze waarop u uw weigering kenbaar kunt maken.

## 6. Bijzondere informatie over AI-verwerking

De Dienst omvat drie vormen van AI-verwerking; de activeringsvoorwaarden en de omvang van de gegevens zijn als volgt:

1. **Automatische extractie van verificatiecodes** (optioneel in te schakelen door de Exploitant): bij ontvangst van een nieuwe e-mail zendt het systeem het onderwerp en de eerste 6.000 tekens van de berichttekst naar Cloudflare Workers AI voor inferentie op edge-knooppunten, om de verificatiecode in de e-mail te extraheren. Dit is de enige AI-verwerking die niet door u handmatig wordt geactiveerd; wie deze verwerking niet wenst, kan de Exploitant verzoeken de functie uit te schakelen, of overstappen op een instance waar deze functie niet is ingeschakeld.
2. **E-mailvertaling** (door u geactiveerd): nadat u op «Vertalen» klikt, wordt de e-mailtekst in segmenten gezonden naar het door de instance geconfigureerde endpoint van het grote taalmodel (standaard OpenAI-compatibel protocol), met de openbare API's van MyMemory en Google Translate als back-up. Zolang u de vertaling niet activeert, wordt de e-mailinhoud naar geen enkele AI-dienst gezonden.
3. **Tekstherkenning in afbeeldingen** (door u geactiveerd): een afbeelding met tekst wordt pas naar de voornoemde AI-diensten gezonden wanneer u die uploadt; zuiver decoratieve afbeeldingen, logo's en pictogrammen worden automatisch overgeslagen.

De Exploitant traint geen enkel model met e-mailinhoud en zendt naar AI-diensten geen identiteitsgegevens dan de tekst die voor vertaling of herkenning nodig is. Voor de bovengenoemde verwerkingen die op toestemming berusten, kunt u uw toestemming op elk moment intrekken via de in paragraaf 9 genoemde wijzen; intrekking laat verwerkingen die vóór de intrekking zijn verricht onverlet.

## 7. Delen met derden en internationale doorgifte

De Dienst deelt persoonsgegevens volgens het beginsel van minimale noodzakelijkheid met derden, uitsluitend in de volgende gevallen (de volledige lijst en de waarborgmechanismen staan in de [Lijst van verwerkers](/nl/mail/sub-processors/)):

1. **Verwerking door verwerkers**: Cloudflare (rekenkracht, opslag, e-mailroutering, mensverificatie, edge-AI) en Resend of Mailjet (uitgaande aflevering; alleen e-mail die naar buiten de site wordt verzonden betreft de volledige e-mail);
2. **Op uw autorisatie**: Telegram-meldingen (uitsluitend de door u geconfigureerde velden worden gepusht), OAuth-apps van derden (beperkt tot openid / profile / email, op elk moment in te trekken) en aanmelding via Linux DO;
3. **Door u geactiveerd**: AI-vertaling en tekstherkenning in afbeeldingen (zie paragraaf 6);
4. **Wettelijke vereisten**: verstrekt uitsluitend wanneer een bevoegd orgaan dat op grond van wettelijke procedures verlangt, met kennisgeving aan u voor zover de wet dat toelaat.

De Dienst draait op het wereldwijde edge-netwerk van Cloudflare; uw persoonsgegevens kunnen worden verwerkt op knooppunten buiten het land waar de Exploitant is gevestigd. De Exploitant volgt de eisen van het toepasselijke recht voor internationale doorgifte en de beperkingen die het bevoegd gezag overeenkomstig de wet oplegt, en steunt op de beschermende maatregelen van Cloudflare (certificeringen SOC 2 Type II en ISO/IEC 27001, en het mechanisme van de Europese standaardcontractbepalingen) voor de beveiliging van de doorgifte. Exploitanten van zelfgehoste instances beoordelen zelf en waarborgen zelf dat hun internationale doorgifte voldoet aan de wettelijke eisen op hun vestigingsplaats.

## 8. Bewaartermijnen en vernietiging

| Gegevenscategorie | Bewaarbeleid |
| --- | --- |
| E-mail in de inbox | bewaard tot u die verwijdert, of tot opschoning wegens quotum wordt geactiveerd |
| Spam | zeven dagen in quarantaine, daarna verplaatst naar de prullenbak |
| E-mail in de prullenbak | zeven dagen na ontvangst fysiek verwijderd door een routinetaak van het systeem (inclusief bijlagen en indexen) |
| Mailboxgebruik boven 90 % | het systeem verwijdert fysiek de e-mail die al als verwijderd is gemarkeerd, om ruimte vrij te maken |
| Opzegging van het account | sessies vervallen onmiddellijk; de e-mail komt in een zacht-verwijderde staat totdat een beheerder de fysieke verwijdering uitvoert |
| Fysieke verwijdering | accountgegevens, mailboxen, e-mail, bijlagen, OAuth-autorisaties en sessies worden gezamenlijk verwijderd en kunnen niet worden hersteld |
| Beëindiging van de instance | de Exploitant dient dit vooraf aan te kondigen en een periode voor gegevensexport aan te bieden; na beëindiging worden de gegevens vernietigd samen met de Cloudflare-resources |

Na fysieke verwijdering kunnen gegevens niet worden hersteld. Vóór verwijdering kunt u via «Instellingen → Gegevensexport» een volledige kopie in JSON-formaat verkrijgen (inclusief uw persoonsgegevens en de volledige tekst van nog niet verwijderde e-mail). De volledige beschrijving van de technische maatregelen staat in [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

## 9. Rechten van de betrokkene en de wijze van uitoefening

Met betrekking tot uw persoonsgegevens heeft u de volgende rechten:

1. raadpleging of inzage vragen;
2. een kopie vragen (de Dienst realiseert dit met de functie «Gegevensexport»);
3. aanvulling of rectificatie vragen;
4. stopzetting van de verzameling, de verwerking of het gebruik vragen;
5. verwijdering vragen.

Wijze van uitoefening: de zelfservicefuncties in de interface (export, opzegging van het account, intrekken van OAuth-autorisaties, uitloggen) werken onmiddellijk; verzoeken die handmatige verwerking vereisen, beantwoordt en verwerkt de Exploitant binnen 30 dagen na ontvangst. Contactpunt: `privacy@epocanvas.com`.

Meent u dat de verwerking door de Dienst uw rechten heeft geschaad, dan kunt u bij de Exploitant herstel van schade vragen; de Exploitant is verantwoordelijk voor de uitleg en onderbouwing van de rechtmatigheid van de verwerking. U kunt tevens een klacht indienen bij het bevoegd gezag op de vestigingsplaats van de Exploitant of een juridisch middel aanwenden (het toepasselijke recht staat in paragraaf 12).

## 10. Beveiligingsmaatregelen

De Exploitant stelt de volgende beveiligingsmaatregelen op en verbetert die doorloend, om te voorkomen dat persoonsgegevens worden gestolen, gewijzigd, beschadigd, verloren of gelekt; daaronder: versleutelde overdracht via HTTPS/TLS voor de gehele site; PBKDF2-hashing van wachtwoorden met salt; versleutelde opslag van TOTP-sleutels met AES-256-GCM; blokkering na mislukte aanmeldingen (na vijf opeenvolgende mislukte pogingen twaalf uur geblokkeerd); een limiet van tien sessies met de mogelijkheid van onmiddellijke intrekking; e-mailroutering op basis van cryptografische hashes (tegen ongeautoriseerde toegang en opsomming van bronnen); en defensieve headers en een MIME-allowlist bij het downloaden van bijlagen. De volledige lijst staat in [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

:::caution[Reikwijdte en grenzen van de versleuteling]
De versleuteling van de drie e-mailmodi van de Dienst («alles», «privé» en «versleuteld») is server-side versleuteling in rust: de sleutels worden afgeleid uit de omgevingsvariabelen van de instanceserver en de gebruikersidentificatie. Dit mechanisme beschermt tegen het risico dat databasebestanden worden gestolen of snapshots lekken; het is geen end-to-end-versleuteling. De Exploitant die de server en de sleutels beheert, heeft technisch de mogelijkheid tot ontsleuteling. De toegang voor beheerders verschilt per modus: in de modus «alles» kan de beheerder alle e-mail lezen; in de modus «privé» uitsluitend spam, verwijderde en onbeheerde e-mail; in de modus «versleuteld» levert de beheerinterface geen gebruikersmail terug. Wie een vertrouwelijkheidsniveau nodig heeft waarbij ook de Exploitant niets kan lezen, versleutelt de berichttekst vooraf zelf met een end-to-end-versleutelingshulpmiddel zoals GPG, alvorens die te verzenden.
:::

## 11. Bescherming van kinderen en jongeren

De Dienst richt zich niet op kinderen jonger dan 14 jaar en verzamelt bewust geen persoonsgegevens van kinderen. Een voogd die meent dat een kind persoonsgegevens heeft verstrekt, kan contact opnemen met de Exploitant om verwijdering te verzoeken; na verificatie wordt dat onmiddellijk verwerkt. Niemand mag de Dienst gebruiken om aan kinderen en jongeren inhoud te verspreiden die schadelijk is voor hun lichamelijke of geestelijke gezondheid; de bijbehorende beperkingen op het gebruik staan in het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/). Exploitanten van zelfgehoste instances stellen zelf een leeftijdsgrens vast overeenkomstig het recht van hun rechtsgebied.

## 12. Toepasselijk recht en toezicht door de autoriteit

Het open source-project verleent zelf geen dienst en is evenmin verantwoordelijk voor de naleving van enige instance; de wettelijke verplichtingen rusten op de entiteit die de Dienst exploiteert. Het toepasselijke recht van elke instance wordt bepaald door de vestigingsplaats van de Exploitant: de gehoste instance `mail.epocanvas.com` wordt door het exploitatieteam vanuit Taiwan uitgebaat; voor de verwerking van persoonsgegevens geldt het recht dat in Taiwan van kracht is (met inbegrip van de Persoonsgegevenswet (PDPA)), en de Exploitant aanvaardt de controle en het toezicht die het bevoegd gezag voor die wet overeenkomstig de wet uitvoert. Dit beleid en [Gegevensverwerking en beveiliging](/nl/mail/data-security/) dienen als basisdocumenten voor die controle. Voor zelfgehoste instances geldt als toepasselijk recht het recht op de vestigingsplaats van de implementateur; de verplichtingen inzake informatieplicht, beveiligingsonderhoud en toezicht worden door de implementateur zelf nagekomen.

## 13. Wijzigingen van dit beleid

Dit beleid kan worden herzien wanneer de dienst of de wetgeving verandert. Wezenlijke wijzigingen (zoals het toevoegen van een verwerker, of het wijzigen van bewaarbeleid of versleutelingsmodi) worden vooraf aangekondigd via een bericht op de site of een systeemmail, en de datum van inwerkingtreding en het versienummer bovenaan deze pagina worden bijgewerkt. Gebruikt u de Dienst na de inwerkingtreding van een wijziging voort, dan wordt u geacht het herziene beleid te hebben aanvaard; indien u niet instemt, kunt u het gebruik staken en uw gegevens exporteren of verwijderen. Historische versies van wezenlijke herzieningen worden gearchiveerd in de versiegeschiedenis van de open source-repository.

## 14. Contactpunten

- **Privacykwesties, uitoefening van rechten en klachten**: `privacy@epocanvas.com`
- **Contact binnen het product**: intern bericht of `admin@epocanvas.com`
- **Zelfgehoste sites**: neem contact op met de Exploitant van de betreffende site

---

*Dit document is een nalevingsdocument opgesteld door het exploitatieteam van EpoCanvas Mail; het vormt geen juridisch advies. Het toepasselijke recht van elke instance wordt bepaald door de vestigingsplaats van de Exploitant.*
