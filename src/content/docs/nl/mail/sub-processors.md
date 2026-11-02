---
title: Lijst van verwerkers
description: Bekende configureerbare routes voor doorgifte aan derden, ontvangen gegevens en rollen, en de locaties, overeenkomsten, bewaring en grensoverschrijdende waarborgen die de instantie moet controleren.
---

**Bijgewerkt op: 2 november 2026 | Versie: 5.21**


<!-- legal-review-draft -->
:::caution[Juridisch beoordelingsconcept: niet de geldende kennisgeving]
Dit concept bevat voorgestelde voorwaarden en nog te verifiëren punten. Het vervangt de huidige kennisgeving niet en certificeert geen naleving. Het mag niet worden gebruikt om verwerking te activeren voordat de identiteit en wettelijk vereiste contactgegevens van de exploitant, de werkelijke rechtsgronden, ontvangers en doorgiftewaarborgen, bewaartermijnen en verwijdering zijn geverifieerd en de vereiste informatie is verstrekt. De gezaghebbende versie is de Traditioneel-Chinese tekstbasis, niet een inwerkingtreding. Bestaande wettelijke plichten en gebruikersrechten blijven onaangetast.
:::

Deze pagina beschrijft overeenkomstig het [Privacybeleid](/nl/mail/privacy-policy/) de gegevensstromen naar derden die in de opensource-implementatie kunnen voorkomen. De lijst omvat infrastructuurverwerkers, onafhankelijke diensten, correspondenten en door u gekozen integraties; zij betekent niet dat alle onderstaande diensten in de gehoste instantie zijn ingeschakeld en vervangt evenmin feitelijke leveranciersovereenkomsten en configuratieregistraties.

De versie in het traditioneel Chinees (Taiwan) is de officiële versie; vertalingen beperken het toepasselijke recht en de rechten van betrokkenen niet. De exploitant mag alleen routes inschakelen waarvoor een geldige verwerkingsgrondslag, noodzakelijke informatieverstrekking en passende waarborgen bestaan; gratis dienstverlening of leren en testen is geen algemene toestemming om echte gegevens aan derden door te geven.

![Gegevensstromen tussen de instantie en infrastructuur, optionele integraties, inhoudsverwerking en ontvangers op grond van wettelijke vereisten](/images/mail/nl/subprocessor-map.svg)

*Figuur: de rol van ontvangers en de waarborgen moeten per route worden vastgesteld; certificeringen of contractmodellen van een dienstverlener betekenen niet dat elke doorgifte al aan de toepasselijke vereisten voldoet.*

## 1. Infrastructuur en e-mailaflevering

| Ontvanger of configuratie | Aanleiding | Toegankelijke gegevens | Rol en te controleren punten |
| --- | --- | --- | --- |
| Cloudflare | Workers, D1, KV, R2, Email Routing, Turnstile, Workers AI en platformlogboeken, ingeschakeld volgens de koppelingen | Verzoek- en verificatiegegevens, opgeslagen accounts en e-mails, routering, bijlagen en inhoud die per functie wordt aangeleverd | Contracterende entiteit, verwerkingsvoorwaarden per dienst, logboekdoeleinden, opslag- en verwerkingsregio's en subverwerking controleren; geen garantie dat verwerking uitsluitend in Europa plaatsvindt |
| Resend, Mailjet of een geconfigureerd kanaal voor uitgaande e-mail | E-mail buiten de site of concrete systeemmeldingen verzenden | Adressen, onderwerpen, berichtteksten, bijlagen en gegevens die voor afleverrapporten nodig zijn | Verwerkersafspraken, bewaring van registraties en grensoverschrijdende waarborgen voor het feitelijke kanaal vaststellen; regio's niet alleen uit productnamen afleiden |
| Ontvangers en hun e-mailproviders | Verzenden of doorsturen door u of door rechtmatig geconfigureerde regels | Verzonden inhoud, routeringsvelden en bijlagen | De ontvangende kant bepaalt doorgaans zelfstandig de verdere verwerking; is niet altijd verwerker van deze instantie en na verzending kan intrekking onmogelijk zijn |

## 2. Identiteit, meldingen en openbare functies

| Ontvanger of configuratie | Aanleiding | Gegevens die kunnen worden verzonden of openbaar gemaakt | Gebruiks- en intrekkingsbeperkingen |
| --- | --- | --- | --- |
| Linux DO, GitHub, Google, Microsoft, Apple of een eigen SSO-identiteitsbron | Aanmelden via de betreffende SSO; externe aanmelding voor de hele site is in de gecontroleerde versie standaard uitgeschakeld | OAuth- en OIDC-uitwisseling, identificatoren, naam, avatar, e-mailadres, vertrouwensniveau en feitelijk teruggegeven kenmerken | De bron en deze instantie verwerken elk volgens hun feitelijke rol; aanmeldautorisatie is geen toestemming voor willekeurige latere doeleinden |
| Geautoriseerde OAuth- en OIDC-apps | Deze instantie levert autorisatie en aanmelding aan apps | De implementatie kan sub, email, verificatiestatus, naam, gebruikersnaam, avatar en rolvelden zoals is_admin en role teruggeven, niet noodzakelijk per veld beperkt tot de gevraagde scope | Niet uitsluitend stellen dat openid, profile en email worden gedeeld; feitelijke velden meedelen en verstrekking buiten de noodzakelijke omvang corrigeren. Intrekking haalt reeds uitgegeven ID-tokens of door de andere partij verkregen gegevens niet terug |
| Telegram en botdiensten | Koppeling op systeem- of persoonlijk niveau en inschakeling van meldingen of doorsturen; meldingen voor de hele site zijn in de gecontroleerde versie standaard uitgeschakeld | Chatidentificatie en onderwerp; afhankelijk van de instellingen ook afzender, ontvanger en berichttekst; bij een extractieresultaat de verificatiecode, plus een JWT-leeslink die 7 dagen geldig is en waarvan bezit toegang geeft | Sommige velden en de link worden standaard toegevoegd en mogen niet worden beschreven als afzonderlijk te kiezen voor elk veld; kopieën en doorgestuurde berichten aan de chatkant staan niet onder controle van de instantie. Stoppen met pushmeldingen verwijdert bestaande berichten niet |
| Blog of geconfigureerd eindpunt voor niveaukoppeling | Aanmelding, quotumsynchronisatie of bijbehorende opvraagprocessen volgens de configuratie | E-mailidentificatie en niveau- of koppelingsinformatie | Niet beschrijven alsof doorgifte alleen bij het handmatig openen van de niveaupagina plaatsvindt; eindpunt, noodzakelijkheid, rechtsgrondslag en bijwerkfrequentie vaststellen |
| Afbeeldingshosts, avatarbronnen en bezoekers van openbare profielpagina's | Uploaden, externe afbeeldingen tonen of een openbare pagina inschakelen | Afbeeldingen en verzoekgegevens; een openbare pagina kan de primaire mailbox, rol, profielvelden en activiteit- en bronstatistieken bevatten | Standaardopslag en externe afbeeldingshosts volgens de configuratie controleren; statistieken in de interface verbergen beperkt de API niet noodzakelijk. Zie paragraaf 4 van het privacybeleid |

Leeslinks kunnen toegang geven aan iedereen die de link bezit en mogen niet als aanmeldverificatie of end-to-end-vertrouwelijkheid worden beschouwd. Geldigheid en intrekking hangen af van de feitelijke uitgifte- en verificatiemechanismen; zonder bevestiging mag niet worden toegezegd dat alle links een vaste geldigheid van 7 dagen hebben of vervallen zodra het account wordt gedeactiveerd.

## 3. AI, vertaling en beeldherkenning

| Ontvanger of configuratie | Aanleiding | Gegevens die kunnen worden verzonden | Gecontroleerde reikwijdte en beperkingen |
| --- | --- | --- | --- |
| Model voor verificatiecodes van Cloudflare Workers AI | Ontvangst van nieuwe e-mail nadat de schakelaar voor verificatiecodes voor de hele site is ingeschakeld; standaard uitgeschakeld in de gecontroleerde versie | Het volledige onderwerp en maximaal 6.000 JavaScript-tekens van de berichttekst | Het onderwerp telt niet mee voor de limiet van de berichttekst; er is geen controle aangetroffen op een opt-out per gebruiker. Een algemene schakelaar is geen individuele toestemming |
| Geconfigureerd OpenAI-compatibel tekstmodel en Workers AI | Gebruik van vertaling en de bijbehorende modelroutering of alternatieve routes | Vertaaltekst, prompts en mogelijk daarin aanwezige persoonsgegevens of gevoelige gegevens | Een compatibel protocol betekent niet dat de ontvanger OpenAI is; de feitelijke entiteit, het eindpunt en de bewaarvoorwaarden moeten worden vermeld |
| Openbare interfaces van MyMemory en Google Translate | Alternatieve vertaling of aanvulling van ontbrekende tekstfragmenten | Tekst- en promptfragmenten, deels verzonden via URL-queryparameters | Niet uitsluitend bij uitval van het volledige modeleindpunt; URL-inhoud kan in logboeken van de dienst en tussenlagen terechtkomen. Geen echte vertrouwelijke gegevens verzenden voordat de waarborgen zijn gecontroleerd |
| Workers AI of een geconfigureerd extern beeldmodel | OCR ingeschakeld in het vertaalproces; API-aanroepen die de parameter weglaten, kunnen andere standaardwaarden gebruiken | Bytes van ingesloten afbeeldingen of externe afbeeldings-URL's met het volledige pad en queryparameters; herkende tekst gaat vervolgens de vertaalketen in | Niet uitsluitend afbeeldingen die de gebruiker afzonderlijk uploadt; filtering van pictogrammen en trackingpixels is heuristisch en garandeert niet dat ze allemaal worden overgeslagen |

De exploitant gebruikt e-mails niet zelf als dataset voor modeltraining. Of ontvangers gegevens bewaren, voor training gebruiken, handmatig inzien of verder uitbesteden, moet op basis van de feitelijke dienst en overeenkomsten worden gecontroleerd; dit kan niet uit «AI», «edge» of verklaringen op deze pagina worden afgeleid. Als een geldige grondslag, keuzemogelijkheden, intrekking of de voorwaarden voor grensoverschrijdende doorgifte ontbreken, moet de betreffende doorgifte worden uitgeschakeld.

## 4. Zelf aangebrachte opslag en externe databases

| Ontvanger of configuratie | Gegevens die kunnen worden verwerkt | Verantwoordelijkheden en verwijderingsbeperkingen |
| --- | --- | --- |
| Door de gebruiker of exploitant gekozen S3-compatibele opslag, R2 of andere objectbackends | Bijlagen, objectidentificatoren en authenticatiegegevens voor toegang en configuratie | De feitelijke regio, accountcontrole en overeenkomst hangen af van de instellingen; het backend van deze instantie kan toegangsgegevens ontvangen, zodat niet mag worden gesteld dat die alleen op het apparaat van de gebruiker blijven |
| Eindpunten voor verbindingstests met Turso, LibSQL of HTTP SQL | Bij verbindingstests verzonden authenticatiegegevens en testquery's, mogelijk inclusief gegevens in eindpuntlogboeken | Bij deze controle zijn alleen configuratie en verbindingsproeven aangetroffen; voor bedrijfsgegevens wordt nog steeds D1 geselecteerd. Externe replicatie of routering van bedrijfsgegevens is niet geïmplementeerd en mag niet als reeds bestaande redundante kopieën worden beschreven |

De zelfstandige keuze van een leverancier door de gebruiker ontheft de exploitant niet automatisch van verantwoordelijkheid voor doorgiften, bewaring van authenticatiegegevens en verwijdering die de exploitant zelf uitvoert. Fysieke verwijdering van back-ups en externe objecten moet per backend worden gecontroleerd; zie [Gegevensverwerking en beveiliging](/nl/mail/data-security/).

## 5. Browserverzoeken en externe inhoud

| Ontvanger of bron | Situatie | Mogelijk ontvangen gegevens en beperkingen |
| --- | --- | --- |
| Google Fonts of een geconfigureerd CDN voor lettertypen en statische bronnen | Laden van de interface en externe bronnen | IP-adres, User-Agent, tijdstip en mogelijke verwijzingsinformatie; het is raadzaam zelfhosting en de noodzaak van doorgifte te beoordelen |
| Cloudflare Turnstile | Laden van de betreffende registratie-, verificatie- of beveiligingspagina's en uitvoeren van challenges | Apparaat-, netwerk- en verzoekgegevens die voor verificatie nodig zijn; opslag op eindapparatuur en rechtsgrondslag volgens de feitelijke configuratie controleren |
| Externe e-mailafbeeldingen, pictogrammen van afzenderdomeinen, externe avatars of afbeeldingshosts | E-mails en interface weergeven, afbeeldingen laden of links openen | IP-adres, verzoektijdstip en volledige afbeeldings-URL, mogelijk met ontvangeridentificatie en trackingparameters; een weergave-instelling die afbeeldingen verbergt, betekent niet dat alle externe routes zijn geblokkeerd |
| Hosts van de documentatiesite, projectwebsites en externe links | U opent de betreffende website of link | Verzoek- en logboekgegevens van de betreffende website; onafhankelijke doeleinden van externe websites volgen hun eigen informatieverstrekking. Voor onderdelen die deze instantie insluit of actief opvraagt, blijft de wettelijke verantwoordelijkheid bestaan |

Uit het ontbreken van advertentie-SDK's of analysetools van derden kan niet worden afgeleid dat deze verzoeken niet plaatsvinden. Voor de voorwaarden voor localStorage in de browser, noodzakelijke verificatie en niet-noodzakelijke toegang tot eindapparatuur, zie paragraaf 4 van het privacybeleid.

## 6. Wettelijke vereisten, verwerkersovereenkomsten en grensoverschrijdende waarborgen

Noodzakelijke gegevens mogen alleen met een geldige grondslag aan bevoegde autoriteiten worden verstrekt, na controle van het verzoek en de omvang, en met kennisgeving aan betrokkenen waar de wet dit toelaat; buitenlandse verzoeken sluiten toetsing aan de AVG en de vertrouwelijkheid van communicatie niet automatisch uit.

Wanneer een ontvanger verwerker is, moet de exploitant voor zover het toepasselijke recht dit vereist met die ontvanger schriftelijke afspraken maken over instructies, vertrouwelijkheid, beveiliging, subverwerking, ondersteuning bij rechten van betrokkenen en incidenten, teruggave of verwijdering bij afloop en noodzakelijke auditregelingen. Algemene gebruiksvoorwaarden of deze lijst vormen niet automatisch een door alle dienstverleners ondertekende verwerkersovereenkomst.

Voor buitenlandse doorgiften die onder de beperkingen van de AVG vallen, moet een adequaatheidsbesluit of een andere geldige waarborg worden vastgesteld op basis van de feitelijke ontvangende entiteit, bestemming en het dienstenbereik. Bij gebruik van SCC's moeten de passende bepalingen daadwerkelijk worden opgenomen en moeten de gevolgen van de doorgifte en noodzakelijke aanvullende maatregelen worden beoordeeld; bij een adequaatheidsregeling op basis van een certificeringskader moeten ook de momenteel geldige deelname van de ontvangende entiteit en de gedekte diensten worden gecontroleerd. SOC- of ISO-certificeringen, HTTPS, een wereldwijd edgenetwerk of het aanbieden van SCC-modellen bewijzen op zichzelf niet dat de doorgifte rechtmatig is. Overzichten en kopieën van waarborgen die volgens de wet kunnen worden verstrekt, zijn op te vragen via `privacy@epocanvas.com`.

## 7. Instantieregistraties en bijwerken van de lijst

| Informatie die de instantie openbaar moet maken of volgens de wet moet kunnen verstrekken | Status bij deze documentcontrole |
| --- | --- |
| Ingeschakelde leveranciers, contracterende entiteiten, functies en gegevensbereik | De broncode bevestigt beschikbare routes; de feitelijke lijst van ingeschakelde diensten van de gehoste instantie is niet gecontroleerd |
| Regio's voor gegevensopslag, inferentie, logboeken en subverwerking | Niet geverifieerd aan de hand van implementatie- en leveranciersregistraties; geen toezegging van beperking tot specifieke regio's |
| Concrete bewaartermijnen voor gegevenscategorieën, leverancierslogboeken en back-ups | Moeten nog door de instantie worden aangevuld en geverifieerd; «volgens het beleid van de dienstverlener» mag reeds vast te stellen termijnen niet verhullen |
| Verwerkersovereenkomsten, grensoverschrijdende mechanismen en effectbeoordelingen | Niet bevestigd of deze zijn ondertekend of voltooid; deze tekst betekent niet dat zij al van kracht zijn |
| Informatie, geldige toestemming en intrekking voor optionele functies | Schakelaars en knoppen in de broncode zijn geen volledig bewijs; de feitelijke procedures en registraties moeten worden gecontroleerd |

De exploitant moet de noodzakelijke controles voltooien voordat de betreffende gegevensstromen worden ingeschakeld, en passend informeren vóór toevoeging van ontvangers of doeleinden of wezenlijke wijzigingen in waarborgen; wanneer de wet hernieuwde toestemming vereist, moet die afzonderlijk worden verkregen. De bijwerkdatum duidt alleen een tekstherziening aan en betekent niet dat alle gebruikers zijn geïnformeerd of nieuwe verwerking hebben aanvaard. Zie ook paragraaf 13 van het [Privacybeleid](/nl/mail/privacy-policy/) voor de basis van de lijst en de afhandeling van nog niet uitgevoerde maatregelen.
